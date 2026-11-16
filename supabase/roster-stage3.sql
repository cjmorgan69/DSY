-- Supabase roster, stage 3: emails from "<Team> Team Roster" <EProsters@dsytraining.com> (16 Nov 2026).
-- Sending is done by the edge function roster-email (supabase/functions/roster-email) through Resend; the key is the
-- Edge Function secret RESEND_API_KEY (never in this repo). Addresses live in roster_contacts (leaders only) and
-- roster_managers.notify_email, set on /dashboard/roster-settings/. This public file holds no email addresses.
-- Rules, as in modules/rosters/backend/Code.gs: a booking, change or cancellation that touches a shift before the
-- team's sent cut-off emails the team manager(s) and area manager; Country Rostering is emailed only when the shift
-- starts more than 24 hours away (otherwise the crew member is asked to phone). While a cluster is on trial (no
-- "live from" date yet, or before it) everything goes ONLY to that cluster's trial address, marked TRIAL.

-- ---------------------------------------------------------------- addresses
create table if not exists public.roster_contacts (
  cluster                 text primary key references public.roster_clusters(cluster),
  trial_email             text,
  area_manager_email      text,
  country_rostering_email text,
  country_rostering_cc    text,
  updated_at              timestamptz not null default now(),
  updated_by              uuid references public.profiles(id)
);
insert into public.roster_contacts (cluster) select cluster from public.roster_clusters on conflict do nothing;

alter table public.roster_managers add column if not exists notify_email text;

create or replace function public.roster_email_ok(e text) returns boolean
language sql immutable set search_path to '' as $$
  select e is null or (char_length(e) <= 200 and e ~* '^[^@[:space:],;<>]+@[^@[:space:],;<>]+\.[^@[:space:],;<>]+$')
$$;

-- ---------------------------------------------------------------- email queue
create table if not exists public.roster_email_queue (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  kind       text not null check (kind in ('change','test')),
  group_id   uuid references public.groups(id),
  cluster    text,
  payload    jsonb not null default '{}'::jsonb,
  attempts   int not null default 0,
  claimed_at timestamptz,
  sent_at    timestamptz,
  error      text
);

-- Operational restriction for each hour from f up to t (internal; no viewer check)
create or replace function public.roster_op_codes(g uuid, f timestamptz, t timestamptz) returns text[]
language sql stable security definer set search_path to 'public' as $$
  select coalesce(array_agg(
           (select public.roster_op_code(coalesce(array_agg(r.clinical_level order by r.id), '{}'), coalesce(array_agg(r.flexibility order by r.id), '{}'))
            from public.roster_shifts r
            where r.group_id = g and r.status = 'active' and r.starts_at < h + interval '1 hour' and r.ends_at > h)
           order by h), '{}')
  from generate_series(f, t - interval '1 hour', interval '1 hour') h
  where t > f
$$;

-- Queue a change email. f..t_full is the whole range the change touches; codes are kept up to the sent cut-off.
create or replace function public.roster_queue_change(p_shift uuid, p_action text, f timestamptz, t_full timestamptz,
  p_before text[], p_prev_start timestamptz, p_prev_end timestamptz, p_notice timestamptz) returns void
language plpgsql security definer set search_path to 'public' as $$
declare r public.roster_shifts; p public.profiles; t_lim timestamptz; cl text;
begin
  select * into r from public.roster_shifts where id = p_shift;
  select * into p from public.profiles where id = r.member_id;
  select least(t_full, sent_until) into t_lim from public.roster_sent where group_id = r.group_id;
  select cluster into cl from public.groups where id = r.group_id;
  insert into public.roster_email_queue (kind, group_id, cluster, payload) values ('change', r.group_id, cl, jsonb_build_object(
    'action', p_action, 'member', coalesce(r.placeholder_name, p.full_name), 'staff_id', p.staff_id,
    'level', r.clinical_level, 'start', r.starts_at, 'end', r.ends_at, 'prev_start', p_prev_start, 'prev_end', p_prev_end,
    'notice', p_notice, 'from', f, 'to', t_full, 'to_limited', coalesce(t_lim, t_full),
    'before', to_jsonb(coalesce(p_before, '{}')), 'after', to_jsonb(public.roster_op_codes(r.group_id, f, coalesce(t_lim, t_full))),
    'made_at', now()));
end $$;

-- ---------------------------------------------------------------- book, change, cancel now queue emails
create or replace function public.roster_book(p_request_id text, p_group uuid, p_start timestamptz, p_end timestamptz,
  p_flexibility text default 'N', p_member uuid default null, p_placeholder text default null, p_level text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare uid uuid := auth.uid(); m uuid; lvl text; flex text := upper(coalesce(nullif(btrim(p_flexibility), ''), 'N'));
        ph text := nullif(btrim(p_placeholder), ''); r public.roster_shifts; nb text[]; notify boolean;
begin
  if uid is null then raise exception 'Please sign in first.'; end if;
  if p_request_id is null or char_length(p_request_id) not between 10 and 120 then raise exception 'A valid request ID is required.'; end if;
  select * into r from public.roster_shifts where request_id = p_request_id;
  if found then
    return jsonb_build_object('shift', to_jsonb(r), 'already_applied', true,
      'requires_notification', public.roster_before_cutoff(r.group_id, r.starts_at));
  end if;
  if not exists (select 1 from public.groups where id = p_group and type = 'team') then raise exception 'Team not found.'; end if;
  if flex not in ('N','A','B','C','Z') then raise exception 'Flexibility must be N, A, B, C or Z.'; end if;
  if ph is not null then
    if p_member is not null then raise exception 'Choose a person or a placeholder, not both.'; end if;
    if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can add a placeholder.'; end if;
    lvl := upper(btrim(p_level));
  else
    m := coalesce(p_member, uid);
    if m <> uid and not public.roster_can_manage(p_group) then
      raise exception 'Only a manager or Team Leader can book someone else.';
    end if;
    if not exists (select 1 from public.memberships where group_id = p_group and member_id = m) then
      raise exception 'That person is not on this team''s list. Use "Not on the list" instead.';
    end if;
    -- Level chosen on the booking form wins; otherwise the level saved on the person (owner, 16 Nov 2026)
    select coalesce(upper(nullif(btrim(p_level), '')), clinical_level) into lvl from public.profiles where id = m;
  end if;
  if lvl is null or lvl not in ('PARA','AO','AR','AA','REC') then raise exception 'Clinical level must be PARA, AO, AR, AA or REC.'; end if;
  perform public.roster_check_times(p_start, p_end);
  if p_start < public.roster_current_hour() then raise exception 'A shift cannot start in the past.'; end if;
  perform public.roster_lock(p_group);
  perform public.roster_check_capacity(p_group, m, ph, lvl, p_start, p_end, null);
  notify := public.roster_before_cutoff(p_group, p_start);
  if notify then nb := public.roster_op_codes(p_group, p_start, least(p_end, (select sent_until from public.roster_sent where group_id = p_group))); end if;
  insert into public.roster_shifts (request_id, group_id, member_id, placeholder_name, clinical_level, flexibility, starts_at, ends_at, created_by)
  values (p_request_id, p_group, m, ph, lvl, flex, p_start, p_end, uid) returning * into r;
  -- Booking for yourself saves your level to your account, so it is filled in next time on any device
  if m = uid then update public.profiles set clinical_level = lvl where id = uid and clinical_level is distinct from lvl; end if;
  insert into public.roster_change_log (group_id, by_id, action, shift_id, details)
  values (p_group, uid, 'Booking added', r.id, jsonb_build_object('start', p_start, 'end', p_end, 'level', lvl, 'flexibility', flex,
          'member', m, 'placeholder', ph, 'before_cutoff', notify));
  if notify then perform public.roster_queue_change(r.id, 'Booking added', p_start, p_end, nb, null, null, p_start); end if;
  return jsonb_build_object('shift', to_jsonb(r), 'already_applied', false, 'requires_notification', notify);
end $$;

create or replace function public.roster_edit(p_id uuid, p_start timestamptz, p_end timestamptz, p_flexibility text,
  p_prev_start timestamptz default null, p_prev_end timestamptz default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare uid uuid := auth.uid(); r public.roster_shifts; old public.roster_shifts; g uuid; now_h timestamptz := public.roster_current_hour();
        flex text := upper(coalesce(nullif(btrim(p_flexibility), ''), 'N')); notify boolean; f timestamptz; tf timestamptz; nb text[];
begin
  if uid is null then raise exception 'Please sign in first.'; end if;
  select group_id into g from public.roster_shifts where id = p_id;
  if g is null then raise exception 'The booking was not found.'; end if;
  perform public.roster_lock(g);
  select * into old from public.roster_shifts where id = p_id for update;
  if not (old.member_id = uid or public.roster_can_manage(g)) then raise exception 'You can only change your own shifts.'; end if;
  if old.status <> 'active' then raise exception 'This booking has been cancelled, so it can''t be changed.'; end if;
  if flex not in ('N','A','B','C','Z') then raise exception 'Flexibility must be N, A, B, C or Z.'; end if;
  perform public.roster_check_times(p_start, p_end);
  if old.starts_at = p_start and old.ends_at = p_end and old.flexibility = flex then
    return jsonb_build_object('shift', to_jsonb(old), 'already_applied', true,
      'requires_notification', public.roster_before_cutoff(g, p_start));
  end if;
  if (p_prev_start is not null and p_prev_start <> old.starts_at) or (p_prev_end is not null and p_prev_end <> old.ends_at) then
    raise exception 'This shift was changed somewhere else in the meantime. Refresh the roster and try again.';
  end if;
  if old.ends_at <= now() then raise exception 'This shift has finished, so it can''t be changed.'; end if;
  if old.starts_at < now_h then
    if p_start <> old.starts_at then raise exception 'This shift has already started, so its start time can''t change.'; end if;
  elsif p_start < now_h then raise exception 'A shift cannot start in the past.'; end if;
  if p_end <= now_h then raise exception 'The new finish time has already passed.'; end if;
  perform public.roster_check_capacity(g, old.member_id, old.placeholder_name, old.clinical_level, p_start, p_end, p_id);
  notify := public.roster_before_cutoff(g, old.starts_at) or public.roster_before_cutoff(g, p_start);
  f := least(old.starts_at, p_start); tf := greatest(old.ends_at, p_end);
  if notify then nb := public.roster_op_codes(g, f, least(tf, (select sent_until from public.roster_sent where group_id = g))); end if;
  update public.roster_shifts set starts_at = p_start, ends_at = p_end, flexibility = flex, updated_at = now(), updated_by = uid
  where id = p_id returning * into r;
  insert into public.roster_change_log (group_id, by_id, action, shift_id, details)
  values (g, uid, 'Booking changed', p_id, jsonb_build_object('start', p_start, 'end', p_end, 'flexibility', flex,
          'was_start', old.starts_at, 'was_end', old.ends_at, 'was_flexibility', old.flexibility, 'before_cutoff', notify));
  if notify then perform public.roster_queue_change(p_id, 'Booking changed', f, tf, nb, old.starts_at, old.ends_at, f); end if;
  return jsonb_build_object('shift', to_jsonb(r), 'already_applied', false, 'requires_notification', notify);
end $$;

create or replace function public.roster_cancel(p_id uuid)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare uid uuid := auth.uid(); old public.roster_shifts; r public.roster_shifts; g uuid; notify boolean; nb text[];
begin
  if uid is null then raise exception 'Please sign in first.'; end if;
  select group_id into g from public.roster_shifts where id = p_id;
  if g is null then raise exception 'The booking was not found.'; end if;
  perform public.roster_lock(g);
  select * into old from public.roster_shifts where id = p_id for update;
  if not (old.member_id = uid or public.roster_can_manage(g)) then raise exception 'You can only cancel your own shifts.'; end if;
  if old.status = 'cancelled' then
    return jsonb_build_object('shift', to_jsonb(old), 'already_applied', true, 'requires_notification', false);
  end if;
  notify := public.roster_before_cutoff(g, old.starts_at);
  if notify then nb := public.roster_op_codes(g, old.starts_at, least(old.ends_at, (select sent_until from public.roster_sent where group_id = g))); end if;
  update public.roster_shifts set status = 'cancelled', cancelled_at = now(), cancelled_by = uid where id = p_id returning * into r;
  insert into public.roster_change_log (group_id, by_id, action, shift_id, details)
  values (g, uid, 'Booking cancelled', p_id, jsonb_build_object('start', old.starts_at, 'end', old.ends_at, 'before_cutoff', notify));
  if notify then perform public.roster_queue_change(p_id, 'Booking cancelled', old.starts_at, old.ends_at, nb, null, null, old.starts_at); end if;
  return jsonb_build_object('shift', to_jsonb(r), 'already_applied', false, 'requires_notification', notify);
end $$;

-- ---------------------------------------------------------------- the sender picks up the queue
-- Wake the edge function when an email is queued, and every 15 minutes while anything is still unsent (retries, 3 tries).
create or replace function public.roster_email_wake() returns void
language sql security definer set search_path to 'public' as $$
  select net.http_post(
    url := 'https://ekaodnbnpsuayvmxvxbm.supabase.co/functions/v1/roster-email',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYW9kbmJucHN1YXl2bXh2eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxMzQsImV4cCI6MjEwNzM0ODEzNH0.q3lTeCQAQjYeMUNl6lwsrxUAsTijJikABW4Ua2N4bmI'),
    body := '{}'::jsonb, timeout_milliseconds := 60000);
$$;

create or replace function public.roster_email_queued() returns trigger
language plpgsql security definer set search_path to 'public' as $$
begin perform public.roster_email_wake(); return null; end $$;
drop trigger if exists roster_email_queued on public.roster_email_queue;
create trigger roster_email_queued after insert on public.roster_email_queue for each statement execute function public.roster_email_queued();

select cron.unschedule('roster-email-retry') where exists (select 1 from cron.job where jobname = 'roster-email-retry');
select cron.schedule('roster-email-retry', '*/15 * * * *', $job$
  select public.roster_email_wake() where exists (select 1 from public.roster_email_queue where sent_at is null and attempts < 3)
$job$);

create or replace function public.roster_email_claim() returns setof public.roster_email_queue
language sql security definer set search_path to 'public' as $$
  update public.roster_email_queue q set attempts = q.attempts + 1, claimed_at = now()
  where q.id in (select id from public.roster_email_queue
                 where sent_at is null and attempts < 3 and (claimed_at is null or claimed_at < now() - interval '5 minutes')
                 order by id limit 20 for update skip locked)
  returning q.*
$$;

create or replace function public.roster_email_done(p_id bigint, p_error text) returns void
language sql security definer set search_path to 'public' as $$
  update public.roster_email_queue set sent_at = case when p_error is null then now() end, error = p_error where id = p_id
$$;

-- ---------------------------------------------------------------- settings page (/dashboard/roster-settings/)
create or replace function public.roster_settings_get() returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
begin
  if not public.is_leader() then raise exception 'Leaders only.'; end if;
  return jsonb_build_object(
    'all_clusters', public.is_real_leader() and public.my_cluster() is null,
    'clusters', (select jsonb_agg(jsonb_build_object('cluster', c.cluster, 'live_from', c.live_from,
        'trial_email', k.trial_email, 'area_manager_email', k.area_manager_email,
        'country_rostering_email', k.country_rostering_email, 'country_rostering_cc', k.country_rostering_cc,
        'can_edit', public.can_edit_cluster(c.cluster)) order by array_position(array['Lower Eyre','Central Eyre','West Coast'], c.cluster))
      from public.roster_clusters c left join public.roster_contacts k on k.cluster = c.cluster),
    'teams', (select jsonb_agg(jsonb_build_object('group_id', g.id, 'team', g.name, 'cluster', g.cluster, 'can_edit', public.can_edit_group(g.id),
        'managers', coalesce((select jsonb_agg(jsonb_build_object('member_id', p.id, 'name', p.full_name, 'staff_id', p.staff_id, 'notify_email', m.notify_email) order by p.full_name)
                              from public.roster_managers m join public.profiles p on p.id = m.member_id where m.group_id = g.id), '[]'::jsonb),
        'members', case when public.can_edit_group(g.id) then coalesce((select jsonb_agg(jsonb_build_object('member_id', p.id, 'name', p.full_name, 'staff_id', p.staff_id) order by p.full_name)
                              from public.memberships ms join public.profiles p on p.id = ms.member_id where ms.group_id = g.id), '[]'::jsonb) end)
        order by g.cluster, g.name)
      from public.groups g where g.type = 'team'),
    'recent', (select jsonb_agg(x order by x.id desc) from (select q.id, q.kind, q.cluster, g.name as team, q.created_at, q.sent_at, q.error, q.attempts,
        q.payload->>'action' as action from public.roster_email_queue q left join public.groups g on g.id = q.group_id order by q.id desc limit 15) x));
end $$;

create or replace function public.roster_settings_save_cluster(p_cluster text, p_trial text, p_area text, p_cr text, p_cc text) returns void
language plpgsql security definer set search_path to 'public' as $$
declare a text := nullif(btrim(p_trial), ''); b text := nullif(btrim(p_area), ''); c text := nullif(btrim(p_cr), ''); d text := nullif(btrim(p_cc), '');
begin
  if not public.can_edit_cluster(p_cluster) or p_cluster is null then raise exception 'You can only change your own cluster.'; end if;
  if not (public.roster_email_ok(a) and public.roster_email_ok(b) and public.roster_email_ok(c) and public.roster_email_ok(d)) then
    raise exception 'One of the email addresses doesn''t look right (one address per box).';
  end if;
  insert into public.roster_contacts (cluster, trial_email, area_manager_email, country_rostering_email, country_rostering_cc, updated_at, updated_by)
  values (p_cluster, a, b, c, d, now(), auth.uid())
  on conflict (cluster) do update set trial_email = a, area_manager_email = b, country_rostering_email = c, country_rostering_cc = d,
    updated_at = now(), updated_by = auth.uid();
end $$;

create or replace function public.roster_settings_save_manager(p_group uuid, p_member uuid, p_email text) returns void
language plpgsql security definer set search_path to 'public' as $$
declare e text := nullif(btrim(p_email), '');
begin
  if not public.can_edit_group(p_group) then raise exception 'You can only change your own cluster''s teams.'; end if;
  if not public.roster_email_ok(e) then raise exception 'That email address doesn''t look right.'; end if;
  update public.roster_managers set notify_email = e where group_id = p_group and member_id = p_member;
  if not found then raise exception 'That person is not a manager of this team.'; end if;
end $$;

create or replace function public.roster_settings_set_live(p_cluster text, p_date date) returns void
language plpgsql security definer set search_path to 'public' as $$
begin
  if not (public.is_real_leader() and public.my_cluster() is null) then raise exception 'Only the lead instructor sets the live date.'; end if;
  update public.roster_clusters set live_from = p_date, updated_at = now(), updated_by = auth.uid() where cluster = p_cluster;
end $$;

create or replace function public.roster_send_test(p_cluster text) returns void
language plpgsql security definer set search_path to 'public' as $$
begin
  if not public.can_edit_cluster(p_cluster) or p_cluster is null then raise exception 'You can only test your own cluster.'; end if;
  insert into public.roster_email_queue (kind, cluster, payload) values ('test', p_cluster, jsonb_build_object('by', auth.uid(), 'at', now()));
end $$;

-- ---------------------------------------------------------------- security
alter table public.roster_contacts enable row level security;
alter table public.roster_email_queue enable row level security;
revoke all on public.roster_contacts, public.roster_email_queue from anon, authenticated;
-- notify_email is read and written only through the settings functions
revoke select on public.roster_managers from authenticated;
grant select (group_id, member_id, created_at) on public.roster_managers to authenticated;

do $$
declare f text;
begin
  foreach f in array array['roster_email_ok(text)','roster_op_codes(uuid,timestamptz,timestamptz)',
    'roster_queue_change(uuid,text,timestamptz,timestamptz,text[],timestamptz,timestamptz,timestamptz)',
    'roster_email_wake()','roster_email_queued()','roster_email_claim()','roster_email_done(bigint,text)',
    'roster_settings_get()','roster_settings_save_cluster(text,text,text,text,text)','roster_settings_save_manager(uuid,uuid,text)',
    'roster_settings_set_live(text,date)','roster_send_test(text)',
    'roster_book(text,uuid,timestamptz,timestamptz,text,uuid,text,text)','roster_edit(uuid,timestamptz,timestamptz,text,timestamptz,timestamptz)',
    'roster_cancel(uuid)']
  loop
    execute format('revoke all on function public.%s from public, anon, authenticated', f);
  end loop;
end $$;
grant execute on function public.roster_email_claim(), public.roster_email_done(bigint,text) to service_role;
grant execute on function public.roster_settings_get(), public.roster_settings_save_cluster(text,text,text,text,text),
  public.roster_settings_save_manager(uuid,uuid,text), public.roster_settings_set_live(text,date), public.roster_send_test(text),
  public.roster_book(text,uuid,timestamptz,timestamptz,text,uuid,text,text),
  public.roster_edit(uuid,timestamptz,timestamptz,text,timestamptz,timestamptz), public.roster_cancel(uuid) to authenticated;
