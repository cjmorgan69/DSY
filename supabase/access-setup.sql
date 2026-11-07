-- DSY access control: approved ambulance IDs, a facilitator role, and a leader-only way to turn access off.
-- Project "training-sessions" (ekaodnbnpsuayvmxvxbm). Run in the Supabase SQL Editor.
-- Order: PART 0 (role protection, already run), PART 1 now, PART 2 only after the Grant access page is live.

-- ===================== PART 0: members cannot change their own role (run first) =====================
create or replace function public.protect_profile_fields()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if auth.uid() is not null and not public.is_leader() then
    if new.role is distinct from old.role then
      raise exception 'Only a leader can change a role';
    end if;
    if new.staff_id is distinct from old.staff_id then
      raise exception 'Only a leader can change an ambulance ID';
    end if;
    if new.id is distinct from old.id then
      raise exception 'Cannot change the account id';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_fields on public.profiles;
create trigger protect_profile_fields
  before update on public.profiles
  for each row execute function public.protect_profile_fields();


-- ===================== PART 1: facilitator role, approved IDs, access switch =====================

-- 1a. Roles: member (student), facilitator, leader.
do $$
declare c text;
begin
  select conname into c from pg_constraint
   where conrelid = 'public.profiles'::regclass and contype = 'c' and pg_get_constraintdef(oid) like '%role%';
  if c is not null then execute format('alter table public.profiles drop constraint %I', c); end if;
end $$;
alter table public.profiles add constraint profiles_role_check check (role in ('member', 'facilitator', 'leader'));

create or replace function public.is_facilitator()
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role in ('facilitator', 'leader'));
$$;
revoke execute on function public.is_facilitator() from public, anon;
grant execute on function public.is_facilitator() to authenticated;

-- 1b. An ambulance ID as typed on the sign-in page: lower case letters and digits only.
create or replace function public.norm_id(t text)
returns text
language sql
immutable
as $$
  select regexp_replace(lower(coalesce(t, '')), '[^a-z0-9]', '', 'g');
$$;

-- 1c. The approved list. Only leaders can see or change it.
create table if not exists public.allowed_ids (
  staff_id text primary key,
  note text,
  role text not null default 'member' check (role in ('member', 'facilitator')),
  added_at timestamptz not null default now(),
  added_by uuid default auth.uid()
);
alter table public.allowed_ids enable row level security;
revoke all on public.allowed_ids from anon;
drop policy if exists allowed_ids_leader_all on public.allowed_ids;
create policy allowed_ids_leader_all on public.allowed_ids
  for all to authenticated
  using ((select public.is_leader()))
  with check ((select public.is_leader()));

-- 1d. Everyone who already has an account stays approved.
insert into public.allowed_ids (staff_id, note, role)
select public.norm_id(staff_id), nullif(full_name, ''), case when role = 'leader' then 'facilitator' else role end
from public.profiles
where public.norm_id(staff_id) <> ''
on conflict (staff_id) do nothing;

-- 1e. New accounts take their role from the approved list.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare sid text := nullif(new.raw_user_meta_data->>'staff_id', '');
begin
  insert into public.profiles (id, full_name, staff_id, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    sid,
    coalesce((select a.role from public.allowed_ids a where a.staff_id = public.norm_id(sid)), 'member')
  );
  return new;
end;
$$;

-- 1f. Leader-only switch to turn someone's access off or back on (they cannot sign in again; a session already open
--     ends within about an hour).
create or replace function public.leader_set_access(member uuid, allowed boolean)
returns void
language plpgsql
security definer
set search_path to 'public', 'auth'
as $$
begin
  if not public.is_leader() then raise exception 'Only a leader can change access'; end if;
  if exists (select 1 from public.profiles where id = member and role = 'leader') then
    raise exception 'A leader account cannot be switched off here';
  end if;
  update auth.users set banned_until = case when allowed then null else 'infinity'::timestamptz end where id = member;
  if not found then raise exception 'No such account'; end if;
end;
$$;
revoke execute on function public.leader_set_access(uuid, boolean) from public, anon;
grant execute on function public.leader_set_access(uuid, boolean) to authenticated;

-- 1g. Which accounts are switched off, for the Grant access page. Leader only.
create or replace function public.leader_access_status()
returns table (member_id uuid, switched_off boolean)
language plpgsql
stable
security definer
set search_path to 'public', 'auth'
as $$
begin
  if not public.is_leader() then raise exception 'Only a leader can see this'; end if;
  return query select u.id, (u.banned_until is not null and u.banned_until > now()) from auth.users u;
end;
$$;
revoke execute on function public.leader_access_status() from public, anon;
grant execute on function public.leader_access_status() to authenticated;


-- ===================== PART 2: block new sign-ups that are not on the list (run AFTER the Grant access page is live) =====================
create or replace function public.require_allowed_id()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare sid text := public.norm_id(new.raw_user_meta_data->>'staff_id');
begin
  if sid = '' or lower(new.email) <> sid || '@id.dsytraining.com' then
    raise exception 'Sign up with your ambulance ID number';
  end if;
  if not exists (select 1 from public.allowed_ids a where a.staff_id = sid) then
    raise exception 'That ambulance ID is not on the approved list yet. Ask your instructor to add it.';
  end if;
  return new;
end;
$$;

drop trigger if exists require_allowed_id on auth.users;
create trigger require_allowed_id
  before insert on auth.users
  for each row execute function public.require_allowed_id();
