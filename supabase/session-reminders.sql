-- Training session reminders as an app notification (web push) (owner, 22 Nov 2026).
-- 12 hours before a session starts, the members of the session's team who turned reminders on get:
-- the session name, who leads it, the time and the place. Members who answered "Sorry, not this time" are left out.
-- Reuses the roster's push set-up (stage 4d): the same devices table, keys and edge function (roster-remind, mode
-- "sessions"). A device turned on in the training app is saved with page_url /training/; a person's training-app
-- devices are used when they have any, otherwise their roster devices.

-- Devices may now be turned on from the training app too.
alter table public.roster_push_subs drop constraint if exists roster_push_subs_page_url_check;
alter table public.roster_push_subs add constraint roster_push_subs_page_url_check
  check (page_url is null or (page_url ~ '^/(modules/rosters|training)/' and char_length(page_url) < 200));

alter table public.sessions add column if not exists reminded_at timestamptz;

-- Moving a session to another date or time lets it be reminded again.
create or replace function public.session_reminder_reset() returns trigger
language plpgsql set search_path to 'public' as $$
begin
  if new.session_date is distinct from old.session_date or new.start_time is distinct from old.start_time then
    new.reminded_at := null;
  end if;
  return new;
end $$;
drop trigger if exists session_reminder_reset on public.sessions;
create trigger session_reminder_reset before update on public.sessions for each row execute function public.session_reminder_reset();

create or replace function public.session_starts_at(s public.sessions) returns timestamptz
language sql immutable set search_path to 'public' as $$
  select ((s.session_date + coalesce(s.start_time, time '19:00')) at time zone 'Australia/Adelaide') $$;

-- Sessions that start within the next 12 hours and have not been reminded. Each is handed out once.
create or replace function public.session_reminder_claim()
returns table (session_id uuid, group_id uuid, team text, title text, led_by text, session_date date, start_time time, end_time time, location text)
language plpgsql security definer set search_path to 'public' as $$
#variable_conflict use_column
begin
  return query
  with due as (
    update public.sessions s set reminded_at = now()
    where s.reminded_at is null and public.session_starts_at(s) > now() and public.session_starts_at(s) <= now() + interval '12 hours'
    returning s.*)
  select d.id, d.group_id, g.name,
         -- the session name first, else the lesson titles (owner, 22 Nov 2026)
         coalesce(nullif(btrim(d.topic), ''),
                  (select string_agg(l.title, ' + ' order by u.ord) from unnest(d.lesson_ids) with ordinality u(id, ord) join public.lessons l on l.id = u.id),
                  'Team training'),
         coalesce((select p.full_name from public.profiles p where p.id = d.facilitator_id), nullif(btrim(d.facilitator_name), '')),
         d.session_date, d.start_time, d.end_time, nullif(btrim(d.location), '')
  from due d join public.groups g on g.id = d.group_id;
end $$;

-- Devices to remind for a session: the team's members, minus those who said "Sorry, not this time".
create or replace function public.session_push_targets(p_session uuid) returns table (endpoint text, p256dh text, auth text, page_url text)
language sql stable security definer set search_path to 'public' as $$
  with people as (
    select m.member_id from public.sessions s join public.memberships m on m.group_id = s.group_id
    where s.id = p_session
      and not exists (select 1 from public.bookings b where b.session_id = s.id and b.member_id = m.member_id and b.status = 'cancelled'))
  select x.endpoint, x.p256dh, x.auth, x.page_url from public.roster_push_subs x join people p on p.member_id = x.member_id
  where x.page_url like '/training/%'
     or not exists (select 1 from public.roster_push_subs y where y.member_id = x.member_id and y.page_url like '/training/%') $$;

revoke all on function public.session_reminder_claim(), public.session_push_targets(uuid), public.session_starts_at(public.sessions) from public, anon, authenticated;
grant execute on function public.session_reminder_claim(), public.session_push_targets(uuid) to service_role;
