-- Training clusters (16 Nov 2026, owner). Applied by Claude 16 Nov 2026.
-- Every team belongs to a cluster: Lower Eyre, Central Eyre or West Coast. Each leader has a cluster
-- (blank = all clusters: the lead instructor and the operations manager). Leaders can SEE every cluster but can only
-- CHANGE sessions, attendance, bookings, reflections and team lists in their own cluster (owner, 15 Nov 2026).
-- Groups with no cluster (for example an AR course) can be changed by any leader.

alter table public.groups add column if not exists cluster text;
alter table public.groups drop constraint if exists groups_cluster_check;
alter table public.groups add constraint groups_cluster_check check (cluster in ('Lower Eyre', 'Central Eyre', 'West Coast'));
alter table public.profiles add column if not exists cluster text;
alter table public.profiles drop constraint if exists profiles_cluster_check;
alter table public.profiles add constraint profiles_cluster_check check (cluster in ('Lower Eyre', 'Central Eyre', 'West Coast'));

update public.groups set cluster = 'Lower Eyre' where type = 'team' and name in ('Tumby Bay', 'Port Neill', 'Cummins', 'Coffin Bay');
insert into public.groups (name, type, year, cluster, roster_url)
select v.name, 'team', 2026, v.cluster, v.url from (values
  ('Cleve', 'Central Eyre', '/modules/rosters/centraleyre/cleve/'),
  ('Cowell', 'Central Eyre', '/modules/rosters/centraleyre/cowell/'),
  ('Elliston', 'Central Eyre', '/modules/rosters/centraleyre/elliston/'),
  ('Lock', 'Central Eyre', '/modules/rosters/centraleyre/lock/'),
  ('Kimba', 'West Coast', '/modules/rosters/westcoast/kimba/'),
  ('Port Kenny', 'West Coast', '/modules/rosters/westcoast/port_kenny/'),
  ('Streaky Bay', 'West Coast', '/modules/rosters/westcoast/streakybay/'),
  ('Wudinna', 'West Coast', '/modules/rosters/westcoast/wudinna/')
) as v(name, cluster, url)
where not exists (select 1 from public.groups g where g.type = 'team' and g.name = v.name);

-- The signed-in person's cluster (null = all clusters).
create or replace function public.my_cluster() returns text
language sql stable security definer set search_path = public
as $$ select cluster from public.profiles where id = (select auth.uid()) $$;

-- May the signed-in leader change things in this group?
create or replace function public.can_edit_group(g uuid) returns boolean
language sql stable security definer set search_path = public
as $$
  select public.is_leader() and (
    public.my_cluster() is null
    or coalesce((select cluster from public.groups where id = g), public.my_cluster()) = public.my_cluster())
$$;
create or replace function public.can_edit_session(s uuid) returns boolean
language sql stable security definer set search_path = public
as $$ select public.can_edit_group((select group_id from public.sessions where id = s)) $$;
revoke execute on function public.my_cluster(), public.can_edit_group(uuid), public.can_edit_session(uuid) from public, anon;
grant execute on function public.my_cluster(), public.can_edit_group(uuid), public.can_edit_session(uuid) to authenticated;

-- Writes are limited to the leader's cluster; reading stays as it was (every leader reads everything).
drop policy if exists sessions_leader_write on public.sessions;
create policy sessions_leader_write on public.sessions for all to authenticated
  using (public.can_edit_group(group_id)) with check (public.can_edit_group(group_id));
drop policy if exists groups_leader_write on public.groups;
create policy groups_leader_write on public.groups for all to authenticated
  using (public.is_leader() and (public.my_cluster() is null or cluster is null or cluster = public.my_cluster()))
  with check (public.is_leader() and (public.my_cluster() is null or cluster is null or cluster = public.my_cluster()));
drop policy if exists memberships_leader_write on public.memberships;
create policy memberships_leader_write on public.memberships for all to authenticated
  using (public.can_edit_group(group_id)) with check (public.can_edit_group(group_id));
drop policy if exists attendance_leader_write on public.attendance;
create policy attendance_leader_write on public.attendance for all to authenticated
  using (public.can_edit_session(session_id)) with check (public.can_edit_session(session_id));
drop policy if exists bookings_leader_all on public.bookings;
create policy bookings_leader_all on public.bookings for all to authenticated
  using (public.can_edit_session(session_id)) with check (public.can_edit_session(session_id));
drop policy if exists "leader insert reflections" on public.session_reflections;
drop policy if exists "leader update reflections" on public.session_reflections;
drop policy if exists "leader delete reflections" on public.session_reflections;
create policy "leader insert reflections" on public.session_reflections for insert to authenticated with check (public.can_edit_session(session_id));
create policy "leader update reflections" on public.session_reflections for update to authenticated using (public.can_edit_session(session_id)) with check (public.can_edit_session(session_id));
create policy "leader delete reflections" on public.session_reflections for delete to authenticated using (public.can_edit_session(session_id));

-- Only an all-clusters leader can change anyone's cluster (a cluster leader can't widen their own access).
create or replace function public.protect_profile_cluster() returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if new.cluster is distinct from old.cluster and auth.uid() is not null
     and not (public.is_leader() and public.my_cluster() is null) then
    raise exception 'Only an all-clusters leader can change a cluster';
  end if;
  return new;
end $$;
drop trigger if exists protect_profile_cluster on public.profiles;
create trigger protect_profile_cluster before update on public.profiles for each row execute function public.protect_profile_cluster();

-- Leaders' clusters (owner, 16 Nov 2026): Campbell Forsyth = Central Eyre; David Coombe (1002517) = West Coast,
-- made a leader and his name completed (owner, 16 Nov 2026).
-- The lead instructor (1003463) stays blank = all clusters.
update public.profiles set cluster = 'Central Eyre' where staff_id = '1002112';
update public.profiles set cluster = 'West Coast', role = 'leader', full_name = 'David Coombe' where staff_id = '1002517';
