-- People page rules (owner, 25 Nov 2026). Migration people_page_rules.
-- One People page (/access/) for Team Leaders. The database now matches what the page offers:
--   * relief Team Leaders on cover are add only: no role changes, no switching accounts off or on, no removing IDs
--     from the approved list, no Volunteer Team Leader changes (they can still add IDs as students, put people in
--     teams and reset passwords);
--   * only the lead instructor (a real leader with no cluster) makes someone a leader or changes a leader's role.
-- SQL Editor and server jobs (no signed-in user) are not affected.

create or replace function public.is_lead_instructor() returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'leader' and cluster is null) $$;
revoke execute on function public.is_lead_instructor() from public, anon;
grant execute on function public.is_lead_instructor() to authenticated;

create or replace function public.protect_profile_fields()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
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
    if new.must_change_password is distinct from old.must_change_password
       and not (old.must_change_password and not new.must_change_password
                and coalesce(current_setting('dsy.password_changed', true), '') = '1') then
      raise exception 'Only a leader can change that';
    end if;
  end if;
  -- people page rules (25 Nov 2026)
  if auth.uid() is not null and new.role is distinct from old.role then
    if not public.is_real_leader() then
      raise exception 'A relief Team Leader cannot change roles';
    end if;
    if (new.role = 'leader' or old.role = 'leader') and not public.is_lead_instructor() then
      raise exception 'Only the lead instructor can make or change a leader';
    end if;
  end if;
  return new;
end;
$function$;

create or replace function public.leader_set_access(member uuid, allowed boolean)
returns void language plpgsql security definer set search_path to 'public', 'auth'
as $function$
begin
  if not public.is_real_leader() then raise exception 'Only a Team Leader can switch an account off or on'; end if;
  if exists (select 1 from public.profiles where id = member and role = 'leader') then
    raise exception 'A leader account cannot be switched off here';
  end if;
  update auth.users set banned_until = case when allowed then null else 'infinity'::timestamptz end where id = member;
  if not found then raise exception 'No such account'; end if;
end;
$function$;

-- approved list: relief cover may add students only
create or replace function public.protect_allowed_ids() returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is null or public.is_real_leader() then
    return case when tg_op = 'DELETE' then old else new end;
  end if;
  if tg_op = 'DELETE' then raise exception 'A relief Team Leader cannot remove people'; end if;
  if tg_op = 'INSERT' and new.role <> 'member'
     and not exists (select 1 from public.allowed_ids a where a.staff_id = new.staff_id and a.role = new.role) then raise exception 'A relief Team Leader can add students only'; end if;
  if tg_op = 'UPDATE' and new.role is distinct from old.role then raise exception 'A relief Team Leader cannot change roles'; end if;
  return new;
end $$;
revoke execute on function public.protect_allowed_ids() from public, anon, authenticated;
drop trigger if exists protect_allowed_ids on public.allowed_ids;
create trigger protect_allowed_ids before insert or update or delete on public.allowed_ids
  for each row execute function public.protect_allowed_ids();

-- Volunteer Team Leaders: real leaders only (own cluster, as before)
drop policy if exists team_vtls_write on public.team_vtls;
create policy team_vtls_write on public.team_vtls for all to authenticated
  using (public.can_edit_group(group_id) and public.is_real_leader())
  with check (public.can_edit_group(group_id) and public.is_real_leader());
