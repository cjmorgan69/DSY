-- Member contribution: rostered hours and jobs paged during each person's shifts (13 Nov 2026).
-- Applied by Claude 13 Nov 2026. Leaders only (row-level security on paging_jobs and roster_bookings;
-- the views and function run as the caller).
--
-- 1. Fix the matching views: paging_jobs.team was blank for most jobs captured before 7 Nov 2026,
--    so fall back to the unit code (paging_team: TB, CU, PT, CF).
create or replace view public.paging_jobs_by_member with (security_invoker = true) as
select j.job_date, b.team, b.member_name, count(*) as jobs
from public.paging_jobs j
join public.roster_bookings b
  on b.team = coalesce(j.team, public.paging_team(j.unit)) and b.status = 'Active'
 and j.dispatched_at >= b.start_time and j.dispatched_at < b.finish_time
group by j.job_date, b.team, b.member_name;

create or replace view public.paging_jobs_by_member_detail with (security_invoker = true) as
select j.job_date, j.job_time, b.team, b.member_name, j.locality, j.job_type, j.priority, j.unit, j.job_no, j.job_key
from public.paging_jobs j
join public.roster_bookings b
  on b.team = coalesce(j.team, public.paging_team(j.unit)) and b.status = 'Active'
 and j.dispatched_at >= b.start_time and j.dispatched_at < b.finish_time;

-- 2. Totals per person for a period (default: everything up to now).
--    hours = the part of each Active booking inside the period and before now (future shifts don't count yet).
--    jobs  = distinct jobs paged to that person's team while they were rostered on, including jobs later
--            cancelled or stood down (the paging feed can't tell which).
create or replace function public.member_contribution(p_from timestamptz default null, p_to timestamptz default null)
returns table (member_name text, teams text, levels text, shifts int, hours numeric, jobs int, p1_jobs int,
               first_shift timestamptz, last_shift timestamptz)
language sql stable security invoker set search_path = public
as $$
  with w as (
    select coalesce(p_from, '-infinity'::timestamptz) as f, least(coalesce(p_to, now()), now()) as t
  ), b as (
    select r.*, greatest(r.start_time, w.f) as s, least(r.finish_time, w.t) as e
    from public.roster_bookings r, w
    where r.status = 'Active' and r.start_time < w.t and r.finish_time > w.f
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
$$;

revoke all on function public.member_contribution(timestamptz, timestamptz) from public, anon;
grant execute on function public.member_contribution(timestamptz, timestamptz) to authenticated;

-- 3. History backfill (13 Nov 2026): the Supabase copy of the rosters only started on 3 Nov 2026. The 436 active
--    bookings before then (from 12 Sep 2026) were copied in by Claude from each team's Apps Script getBookings,
--    same booking ids, insert only (on conflict do nothing). To undo: delete where start_time < '2026-11-02 21:30+00'.

-- 4. Name spellings: names are typed by hand in the rosters, so one person can appear under several spellings.
--    alias -> the name to count it under. Leaders can add rows in the Supabase table editor.
create table if not exists public.roster_name_aliases (
  alias text primary key,
  member_name text not null
);
alter table public.roster_name_aliases enable row level security;
drop policy if exists leaders_all on public.roster_name_aliases;
create policy leaders_all on public.roster_name_aliases for all to authenticated using (public.is_leader()) with check (public.is_leader());
insert into public.roster_name_aliases (alias, member_name) values
  ('Ann Auld', 'Anne Auld'),
  ('Bernie Crettenden', 'Bernadette Crettenden'),
  ('Brianna Rigdone', 'Brianna Rigden'),
  ('Brooka Pedler', 'Brooke Pedler'),
  ('Catherine Haarsma', 'Cathy Haarsma'),
  ('Cathy Harrsma', 'Cathy Haarsma'),
  ('Evelyn', 'Evelyn Chin'),
  ('Lemmy Secker', 'Lynette Lemmey-Secker'),
  ('Meg Haensel Fuss', 'Meg Haensel-Fuss'),
  ('Vicky Devries', 'Vicky DeVries')
on conflict (alias) do update set member_name = excluded.member_name;

-- Bookings with the alias applied; the views and the function read from this.
create or replace view public.roster_bookings_named with (security_invoker = true) as
select r.booking_id, r.team, coalesce(a.member_name, btrim(r.member_name)) as member_name, r.start_time, r.finish_time,
       r.status, r.restriction, r.clinical_level
from public.roster_bookings r
left join public.roster_name_aliases a on lower(a.alias) = lower(btrim(r.member_name));

create or replace view public.paging_jobs_by_member with (security_invoker = true) as
select j.job_date, b.team, b.member_name, count(*) as jobs
from public.paging_jobs j
join public.roster_bookings_named b
  on b.team = coalesce(j.team, public.paging_team(j.unit)) and b.status = 'Active'
 and j.dispatched_at >= b.start_time and j.dispatched_at < b.finish_time
group by j.job_date, b.team, b.member_name;

create or replace view public.paging_jobs_by_member_detail with (security_invoker = true) as
select j.job_date, j.job_time, b.team, b.member_name, j.locality, j.job_type, j.priority, j.unit, j.job_no, j.job_key
from public.paging_jobs j
join public.roster_bookings_named b
  on b.team = coalesce(j.team, public.paging_team(j.unit)) and b.status = 'Active'
 and j.dispatched_at >= b.start_time and j.dispatched_at < b.finish_time;

create or replace function public.member_contribution(p_from timestamptz default null, p_to timestamptz default null)
returns table (member_name text, teams text, levels text, shifts int, hours numeric, jobs int, p1_jobs int,
               first_shift timestamptz, last_shift timestamptz)
language sql stable security invoker set search_path = public
as $$
  with w as (
    select coalesce(p_from, '-infinity'::timestamptz) as f, least(coalesce(p_to, now()), now()) as t
  ), b as (
    select r.*, greatest(r.start_time, w.f) as s, least(r.finish_time, w.t) as e
    from public.roster_bookings_named r, w
    where r.status = 'Active' and r.start_time < w.t and r.finish_time > w.f
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
$$;
