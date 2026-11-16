-- Supabase roster, stage 1: database foundation (planned 15-16 Nov 2026, see .claude/status/rosters.md).
-- Nothing here is used by the live roster pages yet: they still run on the three Apps Scripts.
-- Adds: preferred name and clinical level on each person (both self-editable), call-sign letters on each team,
-- a "live from" date per cluster (blank = trial), roster managers per team, shifts, team messages, the sent
-- cut-off, a change log, and the booking rules from modules/rosters/backend/Code.gs as database functions.
-- Existing tables (roster_bookings, roster_teams, roster_name_aliases) are left as they are.

-- ---------------------------------------------------------------- people and teams
alter table public.profiles
  add column if not exists preferred_name text check (preferred_name is null or char_length(btrim(preferred_name)) between 1 and 40),
  add column if not exists clinical_level text check (clinical_level is null or clinical_level in ('PARA','AO','AR','AA','REC'));
comment on column public.profiles.preferred_name is 'Name shown on the roster; blank = full name. Self-editable.';
comment on column public.profiles.clinical_level is 'PARA, AO, AR, AA or REC. Self-editable (owner, 16 Nov 2026).';

alter table public.groups add column if not exists call_sign text unique;
update public.groups g set call_sign = v.cs from (values
  ('Tumby Bay','TB'),('Cummins','CU'),('Port Neill','PT'),('Coffin Bay','CF'),('Cleve','CL'),('Cowell','CW'),
  ('Kimba','KI'),('Lock','LK'),('Streaky Bay','SB'),('Port Kenny','PK'),('Wudinna','WU'),('Elliston','EL')) v(name, cs)
where g.name = v.name and g.type = 'team';

create table if not exists public.roster_clusters (
  cluster    text primary key check (cluster in ('Lower Eyre','Central Eyre','West Coast')),
  live_from  date,           -- blank = trial: shown but marked trial, left out of combined totals, emails to the trial address
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);
insert into public.roster_clusters (cluster) values ('Lower Eyre'),('Central Eyre'),('West Coast') on conflict do nothing;

create table if not exists public.roster_managers (
  group_id   uuid not null references public.groups(id) on delete cascade,
  member_id  uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (group_id, member_id)
);
insert into public.roster_managers (group_id, member_id)
select g.id, p.id from (values ('Cummins','900469'),('Port Neill','400928'),('Coffin Bay','400534'),('Tumby Bay','1003463')) v(team, sid)
join public.groups g on g.name = v.team and g.type = 'team' join public.profiles p on p.staff_id = v.sid
on conflict do nothing;

-- ---------------------------------------------------------------- roster data
create table if not exists public.roster_shifts (
  id               uuid primary key default gen_random_uuid(),
  request_id       text unique check (request_id is null or char_length(request_id) between 10 and 120),
  group_id         uuid not null references public.groups(id),
  member_id        uuid references public.profiles(id),   -- the person (keyed by account, so by ambulance ID)
  placeholder_name text check (placeholder_name is null or char_length(btrim(placeholder_name)) between 1 and 80),
  clinical_level   text not null check (clinical_level in ('PARA','AO','AR','AA','REC')),
  flexibility      text not null default 'N' check (flexibility in ('N','A','B','C','Z')),
  starts_at        timestamptz not null,
  ends_at          timestamptz not null,
  status           text not null default 'active' check (status in ('active','cancelled')),
  created_at       timestamptz not null default now(),
  created_by       uuid references public.profiles(id),
  updated_at       timestamptz,
  updated_by       uuid references public.profiles(id),
  cancelled_at     timestamptz,
  cancelled_by     uuid references public.profiles(id),
  legacy_ref       text,       -- booking ID from the Google Sheet (stage 5 import)
  legacy_name      text,       -- name as typed in the sheet (stage 5 import)
  check (ends_at > starts_at),
  check ((member_id is null) <> (placeholder_name is null))  -- a person OR a placeholder (LEP40, paramedic...), never both
);
create index if not exists roster_shifts_group_time on public.roster_shifts (group_id, starts_at, ends_at) where status = 'active';
create index if not exists roster_shifts_member on public.roster_shifts (member_id, starts_at);
comment on table public.roster_shifts is 'Volunteer roster shifts. Placeholders have no member and are left out of volunteer hours. Write only through roster_book / roster_edit / roster_cancel.';

create table if not exists public.roster_sent (
  group_id   uuid primary key references public.groups(id),
  sent_until timestamptz not null,   -- exclusive: a shift starting exactly here is outside the sent roster
  marked_at  timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);

create table if not exists public.roster_messages (
  id         uuid primary key default gen_random_uuid(),
  request_id text unique,
  group_id   uuid not null references public.groups(id),
  author_id  uuid not null references public.profiles(id),
  body       text not null check (char_length(btrim(body)) between 1 and 2000),
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by uuid references public.profiles(id)
);
create index if not exists roster_messages_group on public.roster_messages (group_id, created_at desc);

create table if not exists public.roster_change_log (
  id       bigint generated always as identity primary key,
  at       timestamptz not null default now(),
  group_id uuid references public.groups(id),
  by_id    uuid references public.profiles(id),
  action   text not null,
  shift_id uuid references public.roster_shifts(id),
  details  jsonb not null default '{}'::jsonb
);
create index if not exists roster_change_log_group on public.roster_change_log (group_id, at desc);

-- ---------------------------------------------------------------- who may do what
create or replace function public.roster_is_member(g uuid) returns boolean
language sql stable security definer set search_path to 'public' as $$
  select exists (select 1 from public.memberships where group_id = g and member_id = (select auth.uid()))
$$;

create or replace function public.roster_can_manage(g uuid) returns boolean
language sql stable security definer set search_path to 'public' as $$
  select exists (select 1 from public.roster_managers where group_id = g and member_id = (select auth.uid()))
      or public.can_edit_group(g)
$$;

create or replace function public.roster_can_view(g uuid) returns boolean
language sql stable security definer set search_path to 'public' as $$
  select public.roster_is_member(g) or public.roster_can_manage(g) or public.is_leader()
$$;

-- ---------------------------------------------------------------- Adelaide clock helpers
create or replace function public.roster_on_hour(t timestamptz) returns boolean
language sql immutable set search_path to '' as $$
  select date_trunc('hour', t at time zone 'Australia/Adelaide') = (t at time zone 'Australia/Adelaide')
$$;

create or replace function public.roster_current_hour() returns timestamptz
language sql stable set search_path to '' as $$
  select date_trunc('hour', now() at time zone 'Australia/Adelaide') at time zone 'Australia/Adelaide'
$$;

create or replace function public.roster_label(t timestamptz) returns text
language sql stable set search_path to '' as $$
  select to_char(t at time zone 'Australia/Adelaide', 'Dy DD Mon HH24:MI')
$$;

create or replace function public.roster_check_times(s timestamptz, e timestamptz) returns void
language plpgsql stable set search_path to '' as $$
declare clock_h numeric; elapsed_h numeric;
begin
  if s is null or e is null then raise exception 'Start and finish are required.'; end if;
  if e <= s then raise exception 'The finish time must be after the start time.'; end if;
  if not public.roster_on_hour(s) or not public.roster_on_hour(e) then
    raise exception 'Shift times must begin and finish on an Adelaide clock hour.';
  end if;
  -- 1 to 24 local clock hours; daylight saving can make that 23 to 25 real hours
  clock_h := extract(epoch from (e at time zone 'Australia/Adelaide') - (s at time zone 'Australia/Adelaide')) / 3600;
  elapsed_h := extract(epoch from e - s) / 3600;
  if clock_h <> trunc(clock_h) or clock_h < 1 or clock_h > 24 or elapsed_h <> trunc(elapsed_h) or elapsed_h < 1 or elapsed_h > 25 then
    raise exception 'The shift must contain 1–24 Adelaide clock hours.';
  end if;
end $$;

-- ---------------------------------------------------------------- operational restriction
-- Same rules as getOperationalStatus in modules/rosters/shared/roster.js and operationalCodeForCrew in Code.gs.
-- Keep all three in step.
create or replace function public.roster_op_code(levels text[], flexes text[]) returns text
language plpgsql immutable set search_path to '' as $$
declare i int; ops int := 0; ao int := 0; ar int := 0; aa int := 0; ar_flex text; best text;
begin
  for i in 1 .. coalesce(array_length(levels, 1), 0) loop
    if levels[i] is null or levels[i] not in ('PARA','AO','AR','AA','REC') then return 'Review'; end if;
  end loop;
  for i in 1 .. coalesce(array_length(levels, 1), 0) loop
    continue when levels[i] = 'REC';          -- recruits are observers
    ops := ops + 1;
    if levels[i] in ('AO','PARA') then ao := ao + 1;
    elsif levels[i] = 'AR' then ar := ar + 1; ar_flex := coalesce(flexes[i], 'N');
    elsif levels[i] = 'AA' then aa := aa + 1; end if;
  end loop;
  if ops = 0 then return 'NC'; end if;
  if ao > 0 then
    if ops = 1 then return 'D'; end if;
    for i in 1 .. array_length(levels, 1) loop
      continue when levels[i] = 'REC';
      if coalesce(flexes[i], 'N') not in ('N','A','B','C','Z') then return 'Review'; end if;
      if best is null or coalesce(flexes[i], 'N') < best then best := coalesce(flexes[i], 'N'); end if;  -- order A, B, C, N, Z
    end loop;
    return best;
  end if;
  if ar >= 2 or (ar >= 1 and aa >= 1) then return 'E'; end if;
  if aa >= 1 and ar = 0 then return 'Z'; end if;
  if ar = 1 and aa = 0 then return case when ar_flex = 'Z' then 'Z' else 'D' end; end if;
  return 'Review';
end $$;

create or replace function public.roster_op_code_at(g uuid, hour_start timestamptz) returns text
language sql stable security definer set search_path to 'public' as $$
  select public.roster_op_code(coalesce(array_agg(clinical_level order by id), '{}'), coalesce(array_agg(flexibility order by id), '{}'))
  from public.roster_shifts
  where group_id = g and status = 'active' and starts_at < hour_start + interval '1 hour' and ends_at > hour_start
    and public.roster_can_view(g)
$$;

-- ---------------------------------------------------------------- capacity and duplicate checks
-- Within a team: the same person (or the same placeholder name) can't overlap themselves; at most three people and
-- one recruit in any hour.
create or replace function public.roster_check_capacity(g uuid, p_member uuid, p_placeholder text, p_level text,
  s timestamptz, e timestamptz, p_exclude uuid) returns void
language plpgsql stable security definer set search_path to 'public' as $$
declare h timestamptz; n int; recs int; who text;
begin
  if exists (select 1 from public.roster_shifts r where r.group_id = g and r.status = 'active' and r.id is distinct from p_exclude
             and r.starts_at < e and r.ends_at > s
             and ((p_member is not null and r.member_id = p_member)
               or (p_placeholder is not null and lower(btrim(r.placeholder_name)) = lower(btrim(p_placeholder))))) then
    select coalesce(p_placeholder, nullif(btrim(p.preferred_name), ''), p.full_name, 'This person') into who
    from (select 1) x left join public.profiles p on p.id = p_member;
    raise exception '% already has a booking overlapping this shift.', who;
  end if;
  h := s;
  while h < e loop
    select count(*), count(*) filter (where clinical_level = 'REC') into n, recs
    from public.roster_shifts r where r.group_id = g and r.status = 'active' and r.id is distinct from p_exclude
      and r.starts_at < h + interval '1 hour' and r.ends_at > h;
    if n >= 3 then raise exception '% already has three people booked.', public.roster_label(h); end if;
    if p_level = 'REC' and recs >= 1 then
      raise exception 'The recruit place is occupied during %. Only one recruit may be booked at a time.', public.roster_label(h);
    end if;
    h := h + interval '1 hour';
  end loop;
end $$;

create or replace function public.roster_lock(g uuid) returns void
language sql volatile set search_path to '' as $$ select pg_advisory_xact_lock(hashtextextended('roster:' || g::text, 0)) $$;

create or replace function public.roster_before_cutoff(g uuid, t timestamptz) returns boolean
language sql stable security definer set search_path to 'public' as $$
  select coalesce((select t < sent_until from public.roster_sent where group_id = g), false)
$$;

-- ---------------------------------------------------------------- book, change, cancel
-- Book: no p_member and no p_placeholder = the signed-in person. Another member, or a placeholder ("Not on the
-- list": LEP40, paramedics, outside crew), needs a manager or leader for that team.
create or replace function public.roster_book(p_request_id text, p_group uuid, p_start timestamptz, p_end timestamptz,
  p_flexibility text default 'N', p_member uuid default null, p_placeholder text default null, p_level text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare uid uuid := auth.uid(); m uuid; lvl text; flex text := upper(coalesce(nullif(btrim(p_flexibility), ''), 'N'));
        ph text := nullif(btrim(p_placeholder), ''); r public.roster_shifts;
begin
  if uid is null then raise exception 'Please sign in first.'; end if;
  if p_request_id is null or char_length(p_request_id) not between 10 and 120 then raise exception 'A valid request ID is required.'; end if;
  select * into r from public.roster_shifts where request_id = p_request_id;
  if found then  -- a repeat of a booking that already went through
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
  insert into public.roster_shifts (request_id, group_id, member_id, placeholder_name, clinical_level, flexibility, starts_at, ends_at, created_by)
  values (p_request_id, p_group, m, ph, lvl, flex, p_start, p_end, uid) returning * into r;
  -- Booking for yourself saves your level to your account, so it is filled in next time on any device
  if m = uid then update public.profiles set clinical_level = lvl where id = uid and clinical_level is distinct from lvl; end if;
  insert into public.roster_change_log (group_id, by_id, action, shift_id, details)
  values (p_group, uid, 'Booking added', r.id, jsonb_build_object('start', p_start, 'end', p_end, 'level', lvl, 'flexibility', flex,
          'member', m, 'placeholder', ph, 'before_cutoff', public.roster_before_cutoff(p_group, p_start)));
  return jsonb_build_object('shift', to_jsonb(r), 'already_applied', false,
    'requires_notification', public.roster_before_cutoff(p_group, p_start));
end $$;

-- Change: start, finish and flexibility of an active shift that hasn't finished. Once started, only finish and
-- flexibility. p_prev_start / p_prev_end (optional) refuse the change if the shift was changed elsewhere meanwhile.
create or replace function public.roster_edit(p_id uuid, p_start timestamptz, p_end timestamptz, p_flexibility text,
  p_prev_start timestamptz default null, p_prev_end timestamptz default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare uid uuid := auth.uid(); r public.roster_shifts; old public.roster_shifts; g uuid; now_h timestamptz := public.roster_current_hour();
        flex text := upper(coalesce(nullif(btrim(p_flexibility), ''), 'N'));
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
  update public.roster_shifts set starts_at = p_start, ends_at = p_end, flexibility = flex, updated_at = now(), updated_by = uid
  where id = p_id returning * into r;
  insert into public.roster_change_log (group_id, by_id, action, shift_id, details)
  values (g, uid, 'Booking changed', p_id, jsonb_build_object('start', p_start, 'end', p_end, 'flexibility', flex,
          'was_start', old.starts_at, 'was_end', old.ends_at, 'was_flexibility', old.flexibility));
  return jsonb_build_object('shift', to_jsonb(r), 'already_applied', false,
    'requires_notification', public.roster_before_cutoff(g, old.starts_at) or public.roster_before_cutoff(g, p_start));
end $$;

-- Cancel: your own shift, or any shift in a team you manage. Safe to repeat.
create or replace function public.roster_cancel(p_id uuid)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare uid uuid := auth.uid(); old public.roster_shifts; r public.roster_shifts; g uuid;
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
  update public.roster_shifts set status = 'cancelled', cancelled_at = now(), cancelled_by = uid where id = p_id returning * into r;
  insert into public.roster_change_log (group_id, by_id, action, shift_id, details)
  values (g, uid, 'Booking cancelled', p_id, jsonb_build_object('start', old.starts_at, 'end', old.ends_at));
  return jsonb_build_object('shift', to_jsonb(r), 'already_applied', false,
    'requires_notification', public.roster_before_cutoff(g, old.starts_at));
end $$;

-- ---------------------------------------------------------------- sent cut-off (managers)
create or replace function public.roster_set_sent(p_group uuid, p_until timestamptz, p_editing boolean default false)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare uid uuid := auth.uid(); old public.roster_sent; r public.roster_sent;
begin
  if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can change the sent cut-off.'; end if;
  if p_until is null or not public.roster_on_hour(p_until) then raise exception 'The sent-until cut-off must be on an Adelaide clock hour.'; end if;
  perform public.roster_lock(p_group);
  select * into old from public.roster_sent where group_id = p_group;
  if p_editing and old.group_id is null then raise exception 'There is no sent cut-off to edit for this team.'; end if;
  if old.group_id is not null and p_until < old.sent_until then
    raise exception 'The sent cut-off cannot be moved backwards. Use Reset sent status first if a genuine correction is required.';
  end if;
  insert into public.roster_sent (group_id, sent_until, updated_by) values (p_group, p_until, uid)
  on conflict (group_id) do update set sent_until = excluded.sent_until, updated_at = now(), updated_by = uid,
    marked_at = case when p_editing then public.roster_sent.marked_at else now() end
  returning * into r;
  insert into public.roster_change_log (group_id, by_id, action, details)
  values (p_group, uid, case when p_editing then 'Sent cut-off edited' else 'Marked as sent' end,
          jsonb_build_object('sent_until', p_until, 'was', old.sent_until));
  return to_jsonb(r);
end $$;

create or replace function public.roster_reset_sent(p_group uuid)
returns void language plpgsql security definer set search_path to 'public' as $$
declare was timestamptz;
begin
  if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can reset the sent status.'; end if;
  perform public.roster_lock(p_group);
  delete from public.roster_sent where group_id = p_group returning sent_until into was;
  insert into public.roster_change_log (group_id, by_id, action, details)
  values (p_group, auth.uid(), 'Sent status reset', jsonb_build_object('was', was));
end $$;

-- ---------------------------------------------------------------- team messages
create or replace function public.roster_post_message(p_group uuid, p_body text, p_request_id text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare r public.roster_messages;
begin
  if not (public.roster_is_member(p_group) or public.roster_can_manage(p_group)) then raise exception 'Only team members can post here.'; end if;
  if p_request_id is not null then
    select * into r from public.roster_messages where request_id = p_request_id;
    if found then return to_jsonb(r); end if;
  end if;
  insert into public.roster_messages (request_id, group_id, author_id, body)
  values (p_request_id, p_group, auth.uid(), btrim(p_body)) returning * into r;
  insert into public.roster_change_log (group_id, by_id, action, details)
  values (p_group, auth.uid(), 'Note posted', jsonb_build_object('message', r.id, 'preview', left(r.body, 60)));
  return to_jsonb(r);
end $$;

create or replace function public.roster_delete_message(p_id uuid)
returns void language plpgsql security definer set search_path to 'public' as $$
declare m public.roster_messages;
begin
  select * into m from public.roster_messages where id = p_id;
  if m.id is null then raise exception 'The note was not found.'; end if;
  if not (m.author_id = auth.uid() or public.roster_can_manage(m.group_id)) then raise exception 'You can only delete your own notes.'; end if;
  if m.deleted_at is not null then return; end if;
  update public.roster_messages set deleted_at = now(), deleted_by = auth.uid() where id = p_id;
  insert into public.roster_change_log (group_id, by_id, action, details)
  values (m.group_id, auth.uid(), 'Note deleted', jsonb_build_object('message', p_id));
end $$;

-- ---------------------------------------------------------------- reading the roster
-- Crew see the preferred name only. Full name and ambulance ID only for that team's managers and leaders.
create or replace function public.roster_list(p_group uuid, p_from timestamptz, p_to timestamptz)
returns table (id uuid, member_id uuid, name text, full_name text, staff_id text, placeholder boolean, clinical_level text,
  flexibility text, starts_at timestamptz, ends_at timestamptz, mine boolean)
language plpgsql stable security definer set search_path to 'public' as $$
declare can_see_ids boolean := public.roster_can_manage(p_group) or public.is_leader();
begin
  if not public.roster_can_view(p_group) then raise exception 'You can only see your own team''s roster.'; end if;
  return query
  select r.id, r.member_id,
         coalesce(r.placeholder_name, nullif(btrim(p.preferred_name), ''), p.full_name),
         case when can_see_ids then p.full_name end,
         case when can_see_ids then p.staff_id end,
         r.placeholder_name is not null, r.clinical_level, r.flexibility, r.starts_at, r.ends_at,
         r.member_id = auth.uid()
  from public.roster_shifts r left join public.profiles p on p.id = r.member_id
  where r.group_id = p_group and r.status = 'active' and r.starts_at < p_to and r.ends_at > p_from
  order by r.starts_at, r.id;
end $$;

-- Team list for the manager's "pick a member" box
create or replace function public.roster_team_members(p_group uuid)
returns table (member_id uuid, name text, full_name text, staff_id text, clinical_level text)
language plpgsql stable security definer set search_path to 'public' as $$
begin
  if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can see the team list.'; end if;
  return query
  select p.id, coalesce(nullif(btrim(p.preferred_name), ''), p.full_name), p.full_name, p.staff_id, p.clinical_level
  from public.memberships m join public.profiles p on p.id = m.member_id
  where m.group_id = p_group order by 2;
end $$;

create or replace function public.roster_messages_list(p_group uuid)
returns table (id uuid, author text, body text, created_at timestamptz, mine boolean)
language plpgsql stable security definer set search_path to 'public' as $$
begin
  if not public.roster_can_view(p_group) then raise exception 'You can only see your own team''s notes.'; end if;
  return query
  select m.id, coalesce(nullif(btrim(p.preferred_name), ''), p.full_name), m.body, m.created_at, m.author_id = auth.uid()
  from public.roster_messages m join public.profiles p on p.id = m.author_id
  where m.group_id = p_group and m.deleted_at is null order by m.created_at desc limit 500;
end $$;

-- Team header: name, call sign, cluster, live or trial, sent cut-off, whether the viewer manages it
create or replace function public.roster_team_status(p_group uuid)
returns jsonb language sql stable security definer set search_path to 'public' as $$
  select jsonb_build_object('team', g.name, 'call_sign', g.call_sign, 'cluster', g.cluster, 'live_from', c.live_from,
           'trial', c.live_from is null or current_date < c.live_from, 'sent_until', s.sent_until,
           'can_manage', public.roster_can_manage(g.id), 'is_member', public.roster_is_member(g.id))
  from public.groups g left join public.roster_clusters c on c.cluster = g.cluster left join public.roster_sent s on s.group_id = g.id
  where g.id = p_group and public.roster_can_view(g.id)
$$;

-- ---------------------------------------------------------------- row level security and grants
alter table public.roster_clusters   enable row level security;
alter table public.roster_managers   enable row level security;
alter table public.roster_shifts     enable row level security;
alter table public.roster_sent       enable row level security;
alter table public.roster_messages   enable row level security;
alter table public.roster_change_log enable row level security;

revoke all on public.roster_clusters, public.roster_managers, public.roster_shifts, public.roster_sent,
              public.roster_messages, public.roster_change_log from anon, authenticated;
grant select on public.roster_clusters, public.roster_managers, public.roster_shifts, public.roster_sent, public.roster_change_log to authenticated;
grant update (live_from, updated_at, updated_by) on public.roster_clusters to authenticated;
grant insert, delete on public.roster_managers to authenticated;

create policy roster_clusters_read on public.roster_clusters for select to authenticated using (true);
create policy roster_clusters_set on public.roster_clusters for update to authenticated   -- the all-clusters leader sets "live from"
  using (public.is_real_leader() and public.my_cluster() is null) with check (public.is_real_leader() and public.my_cluster() is null);
create policy roster_managers_read on public.roster_managers for select to authenticated using (true);
create policy roster_managers_add on public.roster_managers for insert to authenticated with check (public.can_edit_group(group_id));
create policy roster_managers_remove on public.roster_managers for delete to authenticated using (public.can_edit_group(group_id));
create policy roster_shifts_read on public.roster_shifts for select to authenticated   -- crews read through roster_list
  using (member_id = (select auth.uid()) or public.roster_can_manage(group_id) or public.is_leader());
create policy roster_sent_read on public.roster_sent for select to authenticated using (public.roster_can_view(group_id));
create policy roster_change_log_read on public.roster_change_log for select to authenticated
  using (public.roster_can_manage(group_id) or public.is_leader());
-- roster_messages: no direct access; read with roster_messages_list.

do $$
declare f text;
begin
  foreach f in array array[
    'roster_is_member(uuid)','roster_can_manage(uuid)','roster_can_view(uuid)','roster_op_code_at(uuid,timestamptz)',
    'roster_check_capacity(uuid,uuid,text,text,timestamptz,timestamptz,uuid)','roster_before_cutoff(uuid,timestamptz)',
    'roster_book(text,uuid,timestamptz,timestamptz,text,uuid,text,text)','roster_edit(uuid,timestamptz,timestamptz,text,timestamptz,timestamptz)',
    'roster_cancel(uuid)','roster_set_sent(uuid,timestamptz,boolean)','roster_reset_sent(uuid)',
    'roster_post_message(uuid,text,text)','roster_delete_message(uuid)','roster_list(uuid,timestamptz,timestamptz)',
    'roster_team_members(uuid)','roster_messages_list(uuid)','roster_team_status(uuid)',
    'roster_on_hour(timestamptz)','roster_current_hour()','roster_label(timestamptz)','roster_check_times(timestamptz,timestamptz)',
    'roster_op_code(text[],text[])','roster_lock(uuid)']
  loop
    execute format('revoke all on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;
-- Internal helpers: not callable from the pages.
revoke execute on function public.roster_check_capacity(uuid,uuid,text,text,timestamptz,timestamptz,uuid), public.roster_lock(uuid) from authenticated;
