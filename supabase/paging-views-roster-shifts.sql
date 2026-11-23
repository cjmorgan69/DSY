-- 19 Nov 2026: every team is on the new Supabase roster, so the jobs-per-member views read public.roster_shifts
-- (people by account, placeholders as typed) instead of the old sheet copy roster_bookings. Checked before the change:
-- jobs before 18 Nov 2026 gave the same 131 rows and 157 jobs both ways. Migration paging_views_roster_shifts.
create or replace view public.paging_jobs_by_member with (security_invoker = true) as
  select j.job_date, g.name as team, coalesce(p.full_name, s.placeholder_name) as member_name, count(*) as jobs
  from public.paging_jobs j
  join public.groups g on g.type = 'team' and g.name = coalesce(j.team, public.paging_team(j.unit))
  join public.roster_shifts s on s.group_id = g.id and s.status = 'active'
   and j.dispatched_at >= s.starts_at and j.dispatched_at < s.ends_at
  left join public.profiles p on p.id = s.member_id
  group by j.job_date, g.name, coalesce(p.full_name, s.placeholder_name);

create or replace view public.paging_jobs_by_member_detail with (security_invoker = true) as
  select j.job_date, j.job_time, g.name as team, coalesce(p.full_name, s.placeholder_name) as member_name,
         j.locality, j.job_type, j.priority, j.unit, j.job_no, j.job_key
  from public.paging_jobs j
  join public.groups g on g.type = 'team' and g.name = coalesce(j.team, public.paging_team(j.unit))
  join public.roster_shifts s on s.group_id = g.id and s.status = 'active'
   and j.dispatched_at >= s.starts_at and j.dispatched_at < s.ends_at
  left join public.profiles p on p.id = s.member_id;
