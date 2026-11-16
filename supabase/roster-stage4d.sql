-- Supabase roster, stage 4d: the 24-hour reminder as an app notification (web push) (17 Nov 2026).
-- Owner, 16 Nov 2026: a message to the team 24 hours before the roster is sent, listing the hours with no crew.
-- People opt in on the roster page ("Turn on reminders"); each device is one row in roster_push_subs.
-- The edge function roster-remind (supabase/functions/roster-remind) sends them. Its signing keys are made by the
-- function the first time it runs and kept in roster_push_keys: no page, person or role but the function's service
-- role can read the private key, and it is not in the repo.

create table if not exists public.roster_push_subs (
  id         uuid primary key default gen_random_uuid(),
  member_id  uuid not null references public.profiles(id) on delete cascade,
  endpoint   text not null unique check (endpoint ~ '^https://' and char_length(endpoint) < 1000),
  p256dh     text not null check (char_length(p256dh) < 300),
  auth       text not null check (char_length(auth) < 100),
  page_url   text check (page_url is null or (page_url ~ '^/modules/rosters/' and char_length(page_url) < 200)),
  created_at timestamptz not null default now()
);
create index if not exists roster_push_subs_member on public.roster_push_subs (member_id);

create table if not exists public.roster_push_keys (
  id          int primary key default 1 check (id = 1),
  public_key  text not null,
  private_key text not null,
  created_at  timestamptz not null default now()
);
alter table public.roster_push_subs enable row level security;
alter table public.roster_push_keys enable row level security;
revoke all on public.roster_push_subs, public.roster_push_keys from anon, authenticated;

alter table public.roster_schedules add column if not exists remind boolean not null default true;
alter table public.roster_schedules add column if not exists reminded_for timestamptz;

-- The page asks for the public key to subscribe with (blank until the function has made the keys).
create or replace function public.roster_push_public_key() returns text
language sql stable security definer set search_path to 'public' as $$ select public_key from public.roster_push_keys where id = 1 $$;

create or replace function public.roster_push_keys_get() returns jsonb
language sql stable security definer set search_path to 'public' as $$
  select jsonb_build_object('public_key', public_key, 'private_key', private_key) from public.roster_push_keys where id = 1 $$;

-- First writer wins; returns the keys that are stored.
create or replace function public.roster_push_keys_init(p_public text, p_private text) returns jsonb
language plpgsql security definer set search_path to 'public' as $$
begin
  insert into public.roster_push_keys (id, public_key, private_key) values (1, p_public, p_private) on conflict (id) do nothing;
  return public.roster_push_keys_get();
end $$;

create or replace function public.roster_push_subscribe(p_endpoint text, p_p256dh text, p_auth text, p_page text) returns void
language plpgsql security definer set search_path to 'public' as $$
begin
  if auth.uid() is null then raise exception 'Please sign in first.'; end if;
  insert into public.roster_push_subs (member_id, endpoint, p256dh, auth, page_url) values (auth.uid(), p_endpoint, p_p256dh, p_auth, p_page)
  on conflict (endpoint) do update set member_id = auth.uid(), p256dh = excluded.p256dh, auth = excluded.auth, page_url = excluded.page_url;
end $$;

create or replace function public.roster_push_unsubscribe(p_endpoint text) returns void
language sql security definer set search_path to 'public' as $$
  delete from public.roster_push_subs where endpoint = p_endpoint and member_id = (select auth.uid()) $$;

-- My own devices (for "Send me a test").
create or replace function public.roster_push_mine() returns table (endpoint text, p256dh text, auth text, page_url text)
language sql stable security definer set search_path to 'public' as $$
  select s.endpoint, s.p256dh, s.auth, s.page_url from public.roster_push_subs s where s.member_id = (select auth.uid()) $$;

-- Devices of a team's members (service role only).
create or replace function public.roster_push_targets(p_group uuid) returns table (endpoint text, p256dh text, auth text, page_url text)
language sql stable security definer set search_path to 'public' as $$
  select s.endpoint, s.p256dh, s.auth, s.page_url from public.roster_push_subs s
  where s.member_id in (select m.member_id from public.memberships m where m.group_id = p_group) $$;

create or replace function public.roster_push_drop(p_endpoints text[]) returns void
language sql security definer set search_path to 'public' as $$ delete from public.roster_push_subs where endpoint = any(p_endpoints) $$;

-- Teams whose roster goes within the next 24 hours and haven't been reminded for that send. Each is handed out once.
create or replace function public.roster_reminder_claim() returns table (group_id uuid, team text, send_at timestamptz, first date, days int)
language plpgsql security definer set search_path to 'public' as $$
#variable_conflict use_column
begin
  return query
  update public.roster_schedules s set reminded_for = s.next_send_at
  from public.groups g
  where g.id = s.group_id and s.enabled and s.remind and s.next_send_at > now() and s.next_send_at <= now() + interval '24 hours'
    and s.skip_send_at is distinct from s.next_send_at and s.reminded_for is distinct from s.next_send_at
  returning s.group_id, g.name, s.next_send_at, public.roster_schedule_first(s.group_id, s.first_dow, s.next_send_at), s.days;
end $$;

-- Schedule save and get now carry the reminder switch.
drop function if exists public.roster_schedule_save(uuid, boolean, int, int, int, int);
create or replace function public.roster_schedule_save(p_group uuid, p_enabled boolean, p_send_dow int, p_send_hour int, p_first_dow int, p_days int, p_remind boolean default true)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
begin
  if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can change the schedule.'; end if;
  if p_send_dow not between 0 and 6 or p_first_dow not between 0 and 6 or p_send_hour not between 0 and 23 or p_days not between 1 and 28 then
    raise exception 'Choose a day, an hour and 1 to 28 days.';
  end if;
  insert into public.roster_schedules (group_id, enabled, send_dow, send_hour, first_dow, days, remind, next_send_at, updated_by)
  values (p_group, p_enabled, p_send_dow, p_send_hour, p_first_dow, p_days, coalesce(p_remind, true), public.roster_next_send(p_send_dow, p_send_hour, now()), auth.uid())
  on conflict (group_id) do update set enabled = excluded.enabled, send_dow = excluded.send_dow, send_hour = excluded.send_hour,
    first_dow = excluded.first_dow, days = excluded.days, remind = excluded.remind, next_send_at = excluded.next_send_at, skip_send_at = null,
    attempts = 0, claimed_at = null, updated_at = now(), updated_by = auth.uid();
  insert into public.roster_change_log (group_id, by_id, action, details)
  values (p_group, auth.uid(), case when p_enabled then 'Schedule saved' else 'Schedule paused' end,
          jsonb_build_object('send_dow', p_send_dow, 'send_hour', p_send_hour, 'first_dow', p_first_dow, 'days', p_days, 'remind', coalesce(p_remind, true)));
  return public.roster_schedule_get(p_group);
end $$;

create or replace function public.roster_schedule_get(p_group uuid) returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare s public.roster_schedules; f date;
begin
  if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can see the schedule.'; end if;
  select * into s from public.roster_schedules where group_id = p_group;
  if s.group_id is null then
    return jsonb_build_object('enabled', false, 'send_dow', 4, 'send_hour', 12, 'first_dow', 1, 'days', 7, 'remind', true, 'exists', false, 'people', 0);
  end if;
  f := case when s.enabled and s.next_send_at is not null then public.roster_schedule_first(p_group, s.first_dow, s.next_send_at) end;
  return jsonb_build_object('exists', true, 'enabled', s.enabled, 'send_dow', s.send_dow, 'send_hour', s.send_hour, 'first_dow', s.first_dow,
    'days', s.days, 'remind', s.remind, 'next_send_at', case when s.enabled then s.next_send_at end,
    'skipped', s.enabled and s.skip_send_at is not null and s.skip_send_at = s.next_send_at,
    'next_first', f, 'next_last', f + (s.days - 1), 'last_run_at', s.last_run_at, 'last_result', s.last_result,
    'people', (select count(distinct x.member_id) from public.roster_push_subs x join public.memberships m on m.member_id = x.member_id where m.group_id = p_group));
end $$;

do $$
declare f text;
begin
  foreach f in array array['roster_push_public_key()','roster_push_keys_get()','roster_push_keys_init(text,text)','roster_push_subscribe(text,text,text,text)',
    'roster_push_unsubscribe(text)','roster_push_mine()','roster_push_targets(uuid)','roster_push_drop(text[])','roster_reminder_claim()',
    'roster_schedule_save(uuid,boolean,int,int,int,int,boolean)','roster_schedule_get(uuid)']
  loop execute format('revoke all on function public.%s from public, anon, authenticated', f); end loop;
end $$;
grant execute on function public.roster_push_public_key(), public.roster_push_subscribe(text,text,text,text), public.roster_push_unsubscribe(text),
  public.roster_push_mine(), public.roster_schedule_save(uuid,boolean,int,int,int,int,boolean), public.roster_schedule_get(uuid) to authenticated;
grant execute on function public.roster_push_keys_get(), public.roster_push_keys_init(text,text), public.roster_push_targets(uuid),
  public.roster_push_drop(text[]), public.roster_reminder_claim() to service_role;

-- Every hour, 4 minutes past: wake the reminder sender if a roster goes within 24 hours.
select cron.unschedule('roster-remind') where exists (select 1 from cron.job where jobname = 'roster-remind');
select cron.schedule('roster-remind', '4 * * * *', $job$
  select net.http_post(
    url := 'https://ekaodnbnpsuayvmxvxbm.supabase.co/functions/v1/roster-remind',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYW9kbmJucHN1YXl2bXh2eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxMzQsImV4cCI6MjEwNzM0ODEzNH0.q3lTeCQAQjYeMUNl6lwsrxUAsTijJikABW4Ua2N4bmI'),
    body := '{"mode":"scheduled"}'::jsonb, timeout_milliseconds := 120000)
  where exists (select 1 from public.roster_schedules where enabled and remind and next_send_at > now() and next_send_at <= now() + interval '24 hours'
                and reminded_for is distinct from next_send_at)
$job$);
