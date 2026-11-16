-- Supabase roster, stage 4c: Schedule set-up (17 Nov 2026). Each team's manager sets a weekly time for the roster to
-- be sent to Country Rostering by itself (owner, 16 Nov 2026): send day and hour (Adelaide), the weekday the roster
-- period starts, the number of days (7 by default), on/paused, and "skip the next send". The hourly pg_cron job
-- roster-schedule wakes the edge function roster-send in "scheduled" mode; it sends exactly what the Send button
-- sends, then moves the sent cut-off. A failed send is tried again each hour, three times, then waits for next week.

create table if not exists public.roster_schedules (
  group_id     uuid primary key references public.groups(id) on delete cascade,
  enabled      boolean not null default false,
  send_dow     int not null default 4 check (send_dow between 0 and 6),      -- 0 = Sunday ... 6 = Saturday (Adelaide)
  send_hour    int not null default 12 check (send_hour between 0 and 23),
  first_dow    int not null default 1 check (first_dow between 0 and 6),     -- weekday the roster period starts (08:00)
  days         int not null default 7 check (days between 1 and 28),
  next_send_at timestamptz,
  skip_send_at timestamptz,          -- the send at this time is skipped
  attempts     int not null default 0,
  claimed_at   timestamptz,
  last_run_at  timestamptz,
  last_result  text,
  updated_at   timestamptz not null default now(),
  updated_by   uuid references public.profiles(id)
);
alter table public.roster_schedules enable row level security;
revoke all on public.roster_schedules from anon, authenticated;

-- The next time it is `hour`:00 on weekday `dow` in Adelaide, after `after`.
create or replace function public.roster_next_send(dow int, hour int, after timestamptz) returns timestamptz
language sql stable set search_path to '' as $$
  select min(c) from (
    select ((d::date + make_time(hour, 0, 0)) at time zone 'Australia/Adelaide') as c
    from generate_series((after at time zone 'Australia/Adelaide')::date, (after at time zone 'Australia/Adelaide')::date + 8, interval '1 day') d
    where extract(dow from d) = dow) x
  where c > after
$$;

-- First roster day of the period a send at `at` covers: where the last roster sent ended if that is still ahead,
-- otherwise the next `first_dow` after the send day.
create or replace function public.roster_schedule_first(p_group uuid, p_first_dow int, at timestamptz) returns date
language sql stable security definer set search_path to 'public' as $$
  select coalesce(
    (select ((sent_until at time zone 'Australia/Adelaide') - interval '8 hours')::date from public.roster_sent where group_id = p_group and sent_until > at),
    (select min(d::date) from generate_series((at at time zone 'Australia/Adelaide')::date + 1, (at at time zone 'Australia/Adelaide')::date + 7, interval '1 day') d
     where extract(dow from d) = p_first_dow))
$$;

create or replace function public.roster_schedule_get(p_group uuid) returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare s public.roster_schedules; f date;
begin
  if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can see the schedule.'; end if;
  select * into s from public.roster_schedules where group_id = p_group;
  if s.group_id is null then
    return jsonb_build_object('enabled', false, 'send_dow', 4, 'send_hour', 12, 'first_dow', 1, 'days', 7, 'exists', false);
  end if;
  f := case when s.enabled and s.next_send_at is not null then public.roster_schedule_first(p_group, s.first_dow, s.next_send_at) end;
  return jsonb_build_object('exists', true, 'enabled', s.enabled, 'send_dow', s.send_dow, 'send_hour', s.send_hour, 'first_dow', s.first_dow,
    'days', s.days, 'next_send_at', case when s.enabled then s.next_send_at end,
    'skipped', s.enabled and s.skip_send_at is not null and s.skip_send_at = s.next_send_at,
    'next_first', f, 'next_last', f + (s.days - 1), 'last_run_at', s.last_run_at, 'last_result', s.last_result);
end $$;

create or replace function public.roster_schedule_save(p_group uuid, p_enabled boolean, p_send_dow int, p_send_hour int, p_first_dow int, p_days int)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
begin
  if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can change the schedule.'; end if;
  if p_send_dow not between 0 and 6 or p_first_dow not between 0 and 6 or p_send_hour not between 0 and 23 or p_days not between 1 and 28 then
    raise exception 'Choose a day, an hour and 1 to 28 days.';
  end if;
  insert into public.roster_schedules (group_id, enabled, send_dow, send_hour, first_dow, days, next_send_at, updated_by)
  values (p_group, p_enabled, p_send_dow, p_send_hour, p_first_dow, p_days, public.roster_next_send(p_send_dow, p_send_hour, now()), auth.uid())
  on conflict (group_id) do update set enabled = excluded.enabled, send_dow = excluded.send_dow, send_hour = excluded.send_hour,
    first_dow = excluded.first_dow, days = excluded.days, next_send_at = excluded.next_send_at, skip_send_at = null, attempts = 0,
    claimed_at = null, updated_at = now(), updated_by = auth.uid();
  insert into public.roster_change_log (group_id, by_id, action, details)
  values (p_group, auth.uid(), case when p_enabled then 'Schedule saved' else 'Schedule paused' end,
          jsonb_build_object('send_dow', p_send_dow, 'send_hour', p_send_hour, 'first_dow', p_first_dow, 'days', p_days));
  return public.roster_schedule_get(p_group);
end $$;

-- Skip (or un-skip) the next send only.
create or replace function public.roster_schedule_skip(p_group uuid, p_skip boolean) returns jsonb
language plpgsql security definer set search_path to 'public' as $$
begin
  if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can change the schedule.'; end if;
  update public.roster_schedules set skip_send_at = case when p_skip then next_send_at end, updated_at = now(), updated_by = auth.uid()
  where group_id = p_group and enabled;
  if not found then raise exception 'The schedule is not switched on.'; end if;
  insert into public.roster_change_log (group_id, by_id, action) values (p_group, auth.uid(), case when p_skip then 'Next scheduled send skipped' else 'Next scheduled send restored' end);
  return public.roster_schedule_get(p_group);
end $$;

-- The data for a send, with no check on who asks: only the edge function's service role may call it.
create or replace function public.roster_send_data(p_group uuid, p_first date, p_days int, p_sender text) returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare g public.groups; c public.roster_clusters; k public.roster_contacts; f timestamptz; t timestamptz;
begin
  if p_first is null or p_days is null or p_days < 1 or p_days > 28 then raise exception 'Choose 1 to 28 days.'; end if;
  select * into g from public.groups where id = p_group;
  select * into c from public.roster_clusters where cluster = g.cluster;
  select * into k from public.roster_contacts where cluster = g.cluster;
  f := (p_first + time '08:00') at time zone 'Australia/Adelaide';
  t := ((p_first + p_days) + time '08:00') at time zone 'Australia/Adelaide';
  return jsonb_build_object(
    'team', g.name, 'cluster', g.cluster, 'from', f, 'to', t, 'first', p_first, 'days', p_days,
    'trial', g.type = 'test' or c.live_from is null or (now() at time zone 'Australia/Adelaide')::date < c.live_from,
    'sent_until', (select sent_until from public.roster_sent where group_id = p_group),
    'trial_email', k.trial_email, 'country_rostering_email', k.country_rostering_email, 'country_rostering_cc', k.country_rostering_cc,
    'manager_emails', (select coalesce(jsonb_agg(distinct m.notify_email), '[]'::jsonb) from public.roster_managers m
                       where m.group_id = p_group and nullif(btrim(m.notify_email), '') is not null),
    'sender', p_sender,
    'hours', (select coalesce(jsonb_agg(jsonb_build_object('t', h,
                 'day', ((h at time zone 'Australia/Adelaide') - interval '8 hours')::date,
                 'hour', extract(hour from h at time zone 'Australia/Adelaide')::int) order by h), '[]'::jsonb)
              from generate_series(f, t - interval '1 hour', interval '1 hour') h),
    'codes', to_jsonb(public.roster_op_codes(p_group, f, t)),
    'shifts', (select coalesce(jsonb_agg(jsonb_build_object('name', coalesce(r.placeholder_name, p.full_name), 'staff_id', p.staff_id,
                 'level', r.clinical_level, 'flexibility', r.flexibility, 'start', r.starts_at, 'end', r.ends_at) order by r.starts_at, r.id), '[]'::jsonb)
               from public.roster_shifts r left join public.profiles p on p.id = r.member_id
               where r.group_id = p_group and r.status = 'active' and r.starts_at < t and r.ends_at > f));
end $$;

create or replace function public.roster_send_prepare(p_group uuid, p_first date, p_days int) returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
begin
  if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can send the roster.'; end if;
  return public.roster_send_data(p_group, p_first, p_days, (select full_name from public.profiles where id = auth.uid()));
end $$;

-- Schedules that are due now. Skipped sends are moved on here. Each due schedule is handed out once per 10 minutes.
create or replace function public.roster_schedule_claim() returns table (group_id uuid, first date, days int)
language plpgsql security definer set search_path to 'public' as $$
#variable_conflict use_column
begin
  update public.roster_schedules s set next_send_at = public.roster_next_send(s.send_dow, s.send_hour, now()), skip_send_at = null, attempts = 0,
    last_run_at = now(), last_result = 'Skipped (as asked)'
  where s.enabled and s.next_send_at <= now() and s.skip_send_at = s.next_send_at;
  return query
  update public.roster_schedules s set claimed_at = now()
  where s.group_id in (select x.group_id from public.roster_schedules x
                       where x.enabled and x.next_send_at <= now() and (x.claimed_at is null or x.claimed_at < now() - interval '10 minutes')
                       for update skip locked)
  returning s.group_id, public.roster_schedule_first(s.group_id, s.first_dow, s.next_send_at), s.days;
end $$;

-- After a scheduled send: on success move the cut-off (never backwards), log it and set the next send.
create or replace function public.roster_schedule_done(p_group uuid, p_ok boolean, p_until timestamptz, p_result text, p_details jsonb) returns void
language plpgsql security definer set search_path to 'public' as $$
declare s public.roster_schedules; final boolean;
begin
  select * into s from public.roster_schedules where group_id = p_group for update;
  final := p_ok or s.attempts >= 2;
  if p_ok then
    perform public.roster_lock(p_group);
    insert into public.roster_sent (group_id, sent_until) values (p_group, p_until)
    on conflict (group_id) do update set sent_until = greatest(public.roster_sent.sent_until, excluded.sent_until), updated_at = now(), updated_by = null;
    insert into public.roster_change_log (group_id, action, details) values (p_group, 'Roster sent to Country Rostering (schedule)', coalesce(p_details, '{}'::jsonb));
  end if;
  update public.roster_schedules set last_run_at = now(), claimed_at = null,
    last_result = left(case when p_ok then 'Sent. ' else case when final then 'NOT sent after 3 tries: ' else 'Not sent yet, trying again within the hour: ' end end || coalesce(p_result, ''), 400),
    attempts = case when final then 0 else attempts + 1 end,
    next_send_at = case when final then public.roster_next_send(send_dow, send_hour, now()) else next_send_at end
  where group_id = p_group;
end $$;

do $$
declare f text;
begin
  foreach f in array array['roster_next_send(int,int,timestamptz)','roster_schedule_first(uuid,int,timestamptz)','roster_schedule_get(uuid)',
    'roster_schedule_save(uuid,boolean,int,int,int,int)','roster_schedule_skip(uuid,boolean)','roster_send_data(uuid,date,int,text)',
    'roster_send_prepare(uuid,date,int)','roster_schedule_claim()','roster_schedule_done(uuid,boolean,timestamptz,text,jsonb)']
  loop execute format('revoke all on function public.%s from public, anon, authenticated', f); end loop;
end $$;
grant execute on function public.roster_schedule_get(uuid), public.roster_schedule_save(uuid,boolean,int,int,int,int),
  public.roster_schedule_skip(uuid,boolean), public.roster_send_prepare(uuid,date,int) to authenticated;
grant execute on function public.roster_send_data(uuid,date,int,text), public.roster_schedule_claim(),
  public.roster_schedule_done(uuid,boolean,timestamptz,text,jsonb) to service_role;

-- Every hour, 2 minutes past: wake the sender if a schedule is due.
select cron.unschedule('roster-schedule') where exists (select 1 from cron.job where jobname = 'roster-schedule');
select cron.schedule('roster-schedule', '2 * * * *', $job$
  select net.http_post(
    url := 'https://ekaodnbnpsuayvmxvxbm.supabase.co/functions/v1/roster-send',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYW9kbmJucHN1YXl2bXh2eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxMzQsImV4cCI6MjEwNzM0ODEzNH0.q3lTeCQAQjYeMUNl6lwsrxUAsTijJikABW4Ua2N4bmI'),
    body := '{"mode":"scheduled"}'::jsonb, timeout_milliseconds := 120000)
  where exists (select 1 from public.roster_schedules where enabled and next_send_at <= now())
$job$);
