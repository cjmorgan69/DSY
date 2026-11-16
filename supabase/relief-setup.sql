-- Relief cover (16 Nov 2026, owner). A leader hands their access to a relief Team Leader until an end date.
-- While a cover is active the reliever counts as a leader for the covered leader's cluster: dashboards, training
-- (with editing), volunteer contribution, dispatch, Grant access and password resets, and the covered leader's task
-- list. NOT included: the covered leader's Google Calendar link (owner), resetting a leader's password, and making
-- anyone a leader or changing anyone's leader status (so access always ends with the cover). It ends by itself at the
-- end date; the leader, the reliever or an all-clusters leader can end it early. Any real leader can set one up for
-- themselves (owner: Campbell and David too).

-- 1. The covers.
create table if not exists public.leader_relief (
  id uuid primary key default gen_random_uuid(),
  leader_id uuid not null references auth.users(id) on delete cascade,
  reliever_id uuid not null references auth.users(id) on delete cascade,
  starts_at timestamptz not null default now(),
  ends_at timestamptz not null,
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  constraint leader_relief_dates check (ends_at > starts_at),
  constraint leader_relief_two_people check (leader_id <> reliever_id)
);
alter table public.leader_relief enable row level security;
revoke all on public.leader_relief from anon, authenticated;
grant select, insert on public.leader_relief to authenticated;

-- A real leader (role = leader), as opposed to someone covering.
create or replace function public.is_real_leader() returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'leader') $$;

-- Leaders the signed-in person is covering right now.
create or replace function public.covering_ids() returns setof uuid
language sql stable security definer set search_path = public
as $$
  select r.leader_id from public.leader_relief r join public.profiles p on p.id = r.leader_id and p.role = 'leader'
  where r.reliever_id = (select auth.uid()) and r.ended_at is null and now() >= r.starts_at and now() < r.ends_at
$$;

drop policy if exists relief_read on public.leader_relief;
create policy relief_read on public.leader_relief for select to authenticated
  using (leader_id = (select auth.uid()) or reliever_id = (select auth.uid())
         or exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'leader' and cluster is null));
drop policy if exists relief_add on public.leader_relief;
create policy relief_add on public.leader_relief for insert to authenticated
  with check (leader_id = (select auth.uid()) and public.is_real_leader());

-- End a cover early (no direct updates, so a reliever can't extend their own cover).
create or replace function public.relief_end(p_id uuid) returns void
language plpgsql security definer set search_path = public
as $$
begin
  update public.leader_relief set ended_at = now()
   where id = p_id and ended_at is null
     and (leader_id = auth.uid() or reliever_id = auth.uid()
          or exists (select 1 from public.profiles where id = auth.uid() and role = 'leader' and cluster is null));
  if not found then raise exception 'That cover is not yours to end, or it has already ended'; end if;
end $$;
revoke execute on function public.relief_end(uuid) from public, anon;
grant execute on function public.relief_end(uuid) to authenticated;

-- 2. Someone covering counts as a leader (and so as a facilitator).
create or replace function public.is_leader() returns boolean
language sql stable security definer set search_path = public
as $$ select public.is_real_leader() or exists (select 1 from public.covering_ids()) $$;
create or replace function public.is_facilitator() returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = (select auth.uid()) and role in ('facilitator', 'leader')) or exists (select 1 from public.covering_ids()) $$;

-- Cluster for display: a real leader's own; for a reliever, the covered leader's (blank if any covered leader is blank).
create or replace function public.my_cluster() returns text
language sql stable security definer set search_path = public
as $$
  select case
    when public.is_real_leader() then (select cluster from public.profiles where id = (select auth.uid()))
    when exists (select 1 from public.profiles p where p.id in (select public.covering_ids()) and p.cluster is null) then null
    else (select min(p.cluster) from public.profiles p where p.id in (select public.covering_ids()))
  end
$$;

-- May the signed-in person change things in a group of this cluster? (null cluster = any leader)
create or replace function public.can_edit_cluster(c text) returns boolean
language sql stable security definer set search_path = public
as $$
  select public.is_leader() and (
    c is null
    or exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'leader' and (cluster is null or cluster = c))
    or exists (select 1 from public.profiles p where p.id in (select public.covering_ids()) and (p.cluster is null or p.cluster = c)))
$$;
create or replace function public.can_edit_group(g uuid) returns boolean
language sql stable security definer set search_path = public
as $$ select public.can_edit_cluster((select cluster from public.groups where id = g)) $$;
revoke execute on function public.is_real_leader(), public.covering_ids(), public.can_edit_cluster(text) from public, anon;
grant execute on function public.is_real_leader(), public.covering_ids(), public.can_edit_cluster(text) to authenticated;

drop policy if exists groups_leader_write on public.groups;
create policy groups_leader_write on public.groups for all to authenticated
  using (public.can_edit_cluster(cluster)) with check (public.can_edit_cluster(cluster));

-- 3. Things a reliever must not do.
-- Only a real all-clusters leader can change anyone's cluster.
create or replace function public.protect_profile_cluster() returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if new.cluster is distinct from old.cluster and auth.uid() is not null
     and not exists (select 1 from public.profiles where id = auth.uid() and role = 'leader' and cluster is null) then
    raise exception 'Only an all-clusters leader can change a cluster';
  end if;
  return new;
end $$;
-- Only a real leader can make someone a leader or change a leader's role.
create or replace function public.protect_profile_leader_role() returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role and (new.role = 'leader' or old.role = 'leader')
     and auth.uid() is not null and not public.is_real_leader() then
    raise exception 'Only a team leader can change leader access';
  end if;
  return new;
end $$;
drop trigger if exists protect_profile_leader_role on public.profiles;
create trigger protect_profile_leader_role before update on public.profiles for each row execute function public.protect_profile_leader_role();
-- Only a real leader can reset a leader's password.
create or replace function public.leader_set_password(member uuid, new_password text)
returns void language plpgsql security definer set search_path = public, auth, extensions
as $$
begin
  if not public.is_leader() then raise exception 'Only a team leader can reset passwords'; end if;
  if exists (select 1 from public.profiles where id = member and role = 'leader') and not public.is_real_leader() then
    raise exception 'A relief team leader cannot reset a leader''s password';
  end if;
  if length(coalesce(new_password, '')) < 8 then raise exception 'Password must be at least 8 characters'; end if;
  update auth.users set encrypted_password = extensions.crypt(new_password, extensions.gen_salt('bf')), updated_at = now() where id = member;
  if not found then raise exception 'No such account'; end if;
  update public.profiles set must_change_password = true where id = member and role <> 'leader';
end $$;

-- 4. Tasks: a reliever sees and works on the covered leader's list as well as their own.
drop policy if exists "leaders read own tasks" on public.dashboard_tasks;
drop policy if exists "leaders add own tasks" on public.dashboard_tasks;
drop policy if exists "leaders change own tasks" on public.dashboard_tasks;
drop policy if exists "leaders delete own tasks" on public.dashboard_tasks;
create policy "leaders read own tasks" on public.dashboard_tasks for select to authenticated
  using (public.is_leader() and (created_by = (select auth.uid()) or created_by in (select public.covering_ids())));
create policy "leaders add own tasks" on public.dashboard_tasks for insert to authenticated
  with check (public.is_leader() and (created_by = (select auth.uid()) or created_by in (select public.covering_ids())));
create policy "leaders change own tasks" on public.dashboard_tasks for update to authenticated
  using (public.is_leader() and (created_by = (select auth.uid()) or created_by in (select public.covering_ids())))
  with check (created_by = (select auth.uid()) or created_by in (select public.covering_ids()));
create policy "leaders delete own tasks" on public.dashboard_tasks for delete to authenticated
  using (public.is_leader() and (created_by = (select auth.uid()) or created_by in (select public.covering_ids())));

-- 5. The Google Calendar link moves to a private table: only its owner can read or change it (leaders can read every
--    profile, so it can't stay on profiles).
create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade default auth.uid(),
  gcal_url text check (gcal_url is null or (gcal_url ~ '^https://' and length(gcal_url) <= 1000)),
  updated_at timestamptz not null default now()
);
alter table public.user_settings enable row level security;
revoke all on public.user_settings from anon, authenticated;
grant select, insert, update, delete on public.user_settings to authenticated;
drop policy if exists user_settings_own on public.user_settings;
create policy user_settings_own on public.user_settings for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
insert into public.user_settings (user_id, gcal_url)
  select id, gcal_url from public.profiles where gcal_url is not null on conflict (user_id) do nothing;
alter table public.profiles drop column if exists gcal_url;

-- 6. What the pages need to know about the signed-in person.
create or replace function public.my_access() returns jsonb
language sql stable security definer set search_path = public
as $$
  select jsonb_build_object(
    'role', case when public.is_leader() then 'leader' else coalesce((select role from public.profiles where id = (select auth.uid())), 'member') end,
    'real_leader', public.is_real_leader(),
    'cluster', public.my_cluster(),
    'covering', coalesce((select jsonb_agg(jsonb_build_object('id', p.id, 'name', p.full_name, 'cluster', p.cluster, 'until', r.ends_at) order by r.ends_at)
                          from public.leader_relief r join public.profiles p on p.id = r.leader_id and p.role = 'leader'
                          where r.reliever_id = (select auth.uid()) and r.ended_at is null and now() >= r.starts_at and now() < r.ends_at), '[]'::jsonb))
$$;
revoke execute on function public.my_access() from public, anon;
grant execute on function public.my_access() to authenticated;
