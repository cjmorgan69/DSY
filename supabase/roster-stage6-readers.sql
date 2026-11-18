-- Supabase roster, stage 6 (18 Nov 2026): the pages that READ rosters (leader dashboards, car dash, operations,
-- manager dashboards, Team Leader crewing gaps, volunteer contribution) can read a team from Supabase once that team
-- has moved. Which teams have moved is decided in ONE place: `backend: "supabase"` on the team in
-- modules/rosters/shared/teams.js. The pages pass those team names to these functions; until a real team moves
-- (switch day, stage 7) every page reads exactly what it reads today. Applied by Claude 18 Nov 2026
-- (migration roster_stage6_readers).

-- 1. "coverage": the same answer as the Apps Script manager-dashboard request (action=coverage): for one roster day
--    (08:00 to 08:00 Adelaide, 23 or 25 hours on daylight-saving days), how many people are booked per team per
--    hour. Counts only, no names, so anyone may call it (the Apps Script answer is public too). Recruits count, as
--    in the Apps Script (checked against the live Lower Eyre answer for Thu 19 Nov 2026: identical apart from one
--    booking made after the last copy). Real teams only (type 'team'); unknown names are left out.
create or replace function public.roster_coverage(p_teams text[], p_date date) returns jsonb
language sql stable security definer set search_path to 'public' as $$
  with t as (
    select g.id, g.name, coalesce(rt.short_name, g.call_sign, left(g.name, 2)) short_name, x.ord
    from unnest(p_teams) with ordinality x(name, ord)
    join public.groups g on g.name = x.name and g.type = 'team'
    left join public.roster_teams rt on rt.team = g.name),
  h as (
    select gs h from generate_series((p_date + time '08:00') at time zone 'Australia/Adelaide',
                                     ((p_date + 1) + time '08:00') at time zone 'Australia/Adelaide' - interval '1 hour', interval '1 hour') gs),
  off as (select h.h, extract(epoch from (h.h at time zone 'Australia/Adelaide') - (h.h at time zone 'UTC'))::int / 60 m from h)
  select jsonb_build_object(
    'ok', true, 'success', true, 'source', 'supabase',
    'operationalDate', to_char(p_date, 'YYYY-MM-DD'), 'nextDate', to_char(p_date + 1, 'YYYY-MM-DD'),
    'timeZone', 'Australia/Adelaide', 'generatedAt', to_char(now() at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
    'teams', coalesce((select jsonb_agg(jsonb_build_object('name', t.name, 'shortName', t.short_name) order by t.ord) from t), '[]'::jsonb),
    'hours', coalesce((select jsonb_agg(jsonb_build_object(
        'start', to_char(h.h at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
        'end', to_char((h.h + interval '1 hour') at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
        'label', to_char(h.h at time zone 'Australia/Adelaide', 'HH24:MI'),
        'calendarDate', to_char(h.h at time zone 'Australia/Adelaide', 'YYYY-MM-DD'),
        'detail', to_char(h.h at time zone 'Australia/Adelaide', 'Dy DD Mon HH24:MI') || ' ' || o.z || ' to ' ||
                  to_char((h.h + interval '1 hour') at time zone 'Australia/Adelaide', 'Dy DD Mon HH24:MI') || ' ' || o.z,
        'counts', coalesce((select jsonb_agg((select count(*) from public.roster_shifts r where r.group_id = t.id and r.status = 'active'
                                              and r.starts_at < h.h + interval '1 hour' and r.ends_at > h.h) order by t.ord) from t), '[]'::jsonb))
      order by h.h) from h join lateral (select '+' || lpad((off.m / 60)::text, 2, '0') || lpad((off.m % 60)::text, 2, '0') z from off where off.h = h.h) o on true), '[]'::jsonb))
$$;

-- 2. "getBookings": one team's shifts in the same shape as the Apps Script answer, for people who may see that
--    roster (its members, its managers, leaders). Leaders and managers get full names; placeholders as typed.
create or replace function public.roster_team_bookings(p_team text, p_from timestamptz default null, p_to timestamptz default null) returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare g public.groups;
begin
  select * into g from public.groups where name = p_team and type in ('team', 'test');
  if g.id is null then raise exception 'Team not found: %', p_team; end if;
  return jsonb_build_object('success', true, 'source', 'supabase', 'team', g.name,
    'bookings', coalesce((select jsonb_agg(jsonb_build_object(
        'id', r.id, 'team', g.name, 'user', coalesce(r.full_name, r.name), 'restriction', r.flexibility,
        'clinicalLevel', r.clinical_level,
        'start', to_char(r.starts_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
        'end', to_char(r.ends_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'), 'createdAt', '')
      order by r.starts_at, r.id)
      from public.roster_list(g.id, coalesce(p_from, now() - interval '60 days'), coalesce(p_to, now() + interval '180 days')) r), '[]'::jsonb));
end $$;

-- 3. Volunteer contribution: member_contribution_v2 is member_contribution plus p_supabase_teams: those teams are read
--    from roster_shifts (people by account; placeholders such as LEP40 are left out of hours, as decided 15 Nov 2026)
--    instead of the old copy. A new name, so the old member_contribution is left untouched (replacing it needs a
--    confirmation that could not reach the owner's phone, 18 Nov 2026). Drop the old one once every team has moved.
create or replace function public.member_contribution_v2(p_from timestamptz default null, p_to timestamptz default null, p_supabase_teams text[] default '{}')
returns table (member_name text, teams text, levels text, shifts integer, hours numeric, jobs integer, p1_jobs integer, first_shift timestamptz, last_shift timestamptz)
language sql stable set search_path to 'public' as $function$
  with w as (
    select coalesce(p_from, '-infinity'::timestamptz) as f, least(coalesce(p_to, now()), now()) as t
  ), src as (
    select r.team, r.member_name, r.start_time, r.finish_time, r.clinical_level
    from public.roster_bookings_named r
    where r.status = 'Active' and not (r.team = any(coalesce(p_supabase_teams, '{}')))
    union all
    select g.name, p.full_name, s.starts_at, s.ends_at, s.clinical_level
    from public.roster_shifts s join public.groups g on g.id = s.group_id and g.type = 'team'
    join public.profiles p on p.id = s.member_id
    where s.status = 'active' and g.name = any(coalesce(p_supabase_teams, '{}'))
  ), b as (
    select r.*, greatest(r.start_time, w.f) as s, least(r.finish_time, w.t) as e
    from src r, w
    where r.start_time < w.t and r.finish_time > w.f
  ), h as (
    select b.member_name,
           string_agg(distinct b.team, ', ') as teams,
           string_agg(distinct b.clinical_level, ', ') as levels,
           count(*)::int as shifts,
           round(sum(extract(epoch from (b.e - b.s))) / 3600.0, 1) as hours,
           min(b.start_time) as first_shift, max(b.start_time) as last_shift
    from b group by b.member_name
  ), j as (
    select b.member_name, count(distinct j.job_key)::int as jobs,
           count(distinct j.job_key) filter (where j.priority = 1)::int as p1_jobs
    from b join public.paging_jobs j
      on coalesce(j.team, public.paging_team(j.unit)) = b.team
     and j.dispatched_at >= b.s and j.dispatched_at < b.e
    group by b.member_name
  )
  select h.member_name, h.teams, h.levels, h.shifts, h.hours,
         coalesce(j.jobs, 0), coalesce(j.p1_jobs, 0), h.first_shift, h.last_shift
  from h left join j using (member_name)
  order by h.hours desc;
$function$;

revoke all on function public.roster_coverage(text[], date), public.roster_team_bookings(text, timestamptz, timestamptz),
  public.member_contribution_v2(timestamptz, timestamptz, text[]) from public, anon, authenticated;
grant execute on function public.roster_coverage(text[], date) to anon, authenticated;
grant execute on function public.roster_team_bookings(text, timestamptz, timestamptz), public.member_contribution_v2(timestamptz, timestamptz, text[]) to authenticated;
