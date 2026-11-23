-- Volunteer Team Leader (VTL) access (owner, 22 Nov 2026).
-- One VTL per team. A VTL gets facilitator access and roster manager rights for their own team (NOT Team Leader:
-- no Grant access, no other teams, no tasks or Ask DSY), plus their own team dashboard (/dashboard/team/) with the
-- roster, dispatches, volunteer contribution and training for their team only, and the weather.
-- Nothing here changes profiles.role: removing the VTL row takes the extra access away again.
-- Migration name: vtl_access.

create table if not exists public.team_vtls (
  group_id  uuid primary key references public.groups(id) on delete cascade,      -- one VTL per team
  member_id uuid not null unique references public.profiles(id) on delete cascade, -- one team per VTL
  set_by    uuid default auth.uid(),
  set_at    timestamptz not null default now()
);
alter table public.team_vtls enable row level security;
revoke all on public.team_vtls from anon, public;
grant select, insert, update, delete on public.team_vtls to authenticated;

create or replace function public.my_vtl_group() returns uuid
language sql stable security definer set search_path to 'public' as $$
  select group_id from public.team_vtls where member_id = (select auth.uid())
$$;

create or replace function public.is_vtl_of(g uuid) returns boolean
language sql stable security definer set search_path to 'public' as $$
  select exists (select 1 from public.team_vtls where group_id = g and member_id = (select auth.uid()))
$$;
revoke execute on function public.my_vtl_group(), public.is_vtl_of(uuid) from public, anon;
grant execute on function public.my_vtl_group(), public.is_vtl_of(uuid) to authenticated;

drop policy if exists team_vtls_read on public.team_vtls;
create policy team_vtls_read on public.team_vtls for select to authenticated
  using (public.is_leader() or member_id = (select auth.uid()) or public.in_group(group_id));
drop policy if exists team_vtls_write on public.team_vtls;
create policy team_vtls_write on public.team_vtls for all to authenticated
  using (public.can_edit_group(group_id)) with check (public.can_edit_group(group_id));

-- facilitator level
create or replace function public.is_facilitator() returns boolean
language sql stable security definer set search_path to 'public' as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role in ('facilitator', 'leader'))
      or exists (select 1 from public.covering_ids())
      or exists (select 1 from public.team_vtls where member_id = (select auth.uid()))
$$;

-- roster manager for their own team
create or replace function public.roster_can_manage(g uuid) returns boolean
language sql stable security definer set search_path to 'public' as $$
  select exists (select 1 from public.roster_managers where group_id = g and member_id = (select auth.uid()))
      or public.is_vtl_of(g)
      or public.can_edit_group(g)
$$;

-- their team's training sessions and team name
drop policy if exists sessions_read on public.sessions;
create policy sessions_read on public.sessions for select to authenticated
  using (public.is_leader() or public.in_group(group_id) or public.is_vtl_of(group_id));
drop policy if exists groups_read on public.groups;
create policy groups_read on public.groups for select to authenticated
  using (public.is_leader() or public.in_group(id) or public.is_vtl_of(id));

-- my_access: a VTL reports as facilitator (unless already a leader) and gets a vtl block for the pages
create or replace function public.my_access() returns jsonb
language sql stable security definer set search_path to 'public' as $$
  select jsonb_build_object(
    'role', case when public.is_leader() then 'leader'
                 when public.my_vtl_group() is not null and coalesce((select role from public.profiles where id = (select auth.uid())), 'member') = 'member' then 'facilitator'
                 else coalesce((select role from public.profiles where id = (select auth.uid())), 'member') end,
    'real_leader', public.is_real_leader(),
    'cluster', public.my_cluster(),
    'vtl', (select jsonb_build_object('group_id', g.id, 'team', g.name, 'cluster', g.cluster)
              from public.team_vtls v join public.groups g on g.id = v.group_id where v.member_id = (select auth.uid())),
    'covering', coalesce((select jsonb_agg(jsonb_build_object('id', p.id, 'name', p.full_name, 'cluster', p.cluster, 'until', r.ends_at) order by r.ends_at)
                          from public.leader_relief r join public.profiles p on p.id = r.leader_id and p.role = 'leader'
                          where r.reliever_id = (select auth.uid()) and r.ended_at is null and now() >= r.starts_at and now() < r.ends_at), '[]'::jsonb))
$$;

-- the team the caller may see on the team dashboard: a VTL their own team; a leader any team (to preview)
create or replace function public.team_dash_group(p_group uuid) returns public.groups
language plpgsql stable security definer set search_path to 'public' as $$
declare g public.groups;
begin
  select * into g from public.groups where id = coalesce(p_group, public.my_vtl_group()) and type = 'team';
  if g.id is null then raise exception 'No team found for your account.'; end if;
  if not (public.is_vtl_of(g.id) or public.is_leader()) then raise exception 'Only this team''s Volunteer Team Leader can see this.'; end if;
  return g;
end $$;

-- dispatches for one team (paging feed), by date
create or replace function public.team_dispatch(p_group uuid, p_from date, p_to date)
returns table(job_key text, job_date date, job_time time, locality text, job_type text, priority integer, unit text)
language plpgsql stable security definer set search_path to 'public' as $$
declare g public.groups := public.team_dash_group(p_group);
begin
  return query
  select j.job_key::text, j.job_date::date, j.job_time::time, j.locality::text, j.job_type::text, j.priority::int, j.unit::text
  from public.paging_jobs j
  where coalesce(j.team, public.paging_team(j.unit)) = g.name and j.job_date >= p_from and j.job_date <= p_to
  order by j.job_date, j.job_time;
end $$;

-- volunteer contribution for one team (same sums as member_contribution_v2, only that team's shifts and jobs)
create or replace function public.team_contribution(p_group uuid, p_from timestamptz default null, p_to timestamptz default null)
returns table(member_name text, levels text, shifts integer, hours numeric, jobs integer, p1_jobs integer, last_shift timestamptz)
language plpgsql stable security definer set search_path to 'public' as $$
declare g public.groups := public.team_dash_group(p_group);
        moved boolean := exists (select 1 from public.roster_shifts s where s.group_id = g.id);
begin
  return query
  with w as (select coalesce(p_from, '-infinity'::timestamptz) as f, least(coalesce(p_to, now()), now()) as t),
  src as (
    select r.member_name, r.start_time, r.finish_time, r.clinical_level from public.roster_bookings_named r
    where not moved and r.status = 'Active' and r.team = g.name
    union all
    select p.full_name, s.starts_at, s.ends_at, s.clinical_level
    from public.roster_shifts s join public.profiles p on p.id = s.member_id
    where moved and s.status = 'active' and s.group_id = g.id),
  b as (select r.*, greatest(r.start_time, w.f) as s, least(r.finish_time, w.t) as e from src r, w where r.start_time < w.t and r.finish_time > w.f),
  h as (select b.member_name, string_agg(distinct b.clinical_level, ', ') as levels, count(*)::int as shifts,
           round(sum(extract(epoch from (b.e - b.s))) / 3600.0, 1) as hours, max(b.start_time) as last_shift from b group by b.member_name),
  j as (select b.member_name, count(distinct pj.job_key)::int as jobs, count(distinct pj.job_key) filter (where pj.priority = 1)::int as p1_jobs
    from b join public.paging_jobs pj on coalesce(pj.team, public.paging_team(pj.unit)) = g.name and pj.dispatched_at >= b.s and pj.dispatched_at < b.e
    group by b.member_name)
  select h.member_name, h.levels, h.shifts, h.hours, coalesce(j.jobs, 0), coalesce(j.p1_jobs, 0), h.last_shift
  from h left join j using (member_name) order by h.hours desc;
end $$;

revoke execute on function public.team_dash_group(uuid), public.team_dispatch(uuid, date, date), public.team_contribution(uuid, timestamptz, timestamptz) from public, anon;
grant execute on function public.team_dash_group(uuid), public.team_dispatch(uuid, date, date), public.team_contribution(uuid, timestamptz, timestamptz) to authenticated;

-- Migration vtl_wide_view (owner, 22 Nov 2026): roster and dispatch on the team dashboard show every team, the same as
-- the Team Leader dashboard, so a VTL may read paging_jobs and see any team's roster names.
create or replace function public.is_vtl() returns boolean
language sql stable security definer set search_path to 'public' as $$
  select exists (select 1 from public.team_vtls where member_id = (select auth.uid()))
$$;
revoke execute on function public.is_vtl() from public, anon;
grant execute on function public.is_vtl() to authenticated;
drop policy if exists vtl_read on public.paging_jobs;
create policy vtl_read on public.paging_jobs for select to authenticated using ((select public.is_vtl()));
create or replace function public.roster_can_view(g uuid) returns boolean
language sql stable security definer set search_path to 'public' as $$
  select public.roster_is_member(g) or public.roster_can_manage(g) or public.is_leader() or public.is_vtl()
$$;
