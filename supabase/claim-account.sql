-- "First time here?" without a starter password (owner, 17 Nov 2026).
-- Accounts that were made for people in bulk (the Lower Eyre accounts of 14 Oct 2026, and any made on a roster switch
-- day) can be claimed once: the person enters their ambulance ID and chooses a password on /signin/. After that the
-- account is closed to claiming for good; a forgotten password still goes through a leader's reset (temporary
-- password, then choose your own). Same trust as signing up: knowing your ambulance ID is what lets you in the first
-- time. Applied by Claude 17 Nov 2026 (migration claim_account).

-- claim_open: true while the account still has only the password it was made with.
alter table public.profiles add column if not exists claim_open boolean not null default false;
update public.profiles set claim_open = true where must_change_password and role <> 'leader';

create table if not exists public.account_claims (
  id         bigint generated always as identity primary key,
  staff_id   text not null,
  claimed_at timestamptz not null default now()
);
alter table public.account_claims enable row level security;
revoke all on public.account_claims from anon, authenticated;
grant select on public.account_claims to authenticated;
create policy account_claims_read on public.account_claims for select to authenticated using (public.is_leader());

-- Returns 'ok', 'none' (no account for that ID), 'closed' (already has its own password) or 'off' (switched off).
create or replace function public.claim_account(p_staff_id text, p_password text) returns text
language plpgsql security definer set search_path to 'public', 'auth', 'extensions' as $$
declare sid text := public.norm_id(p_staff_id); p public.profiles;
begin
  if length(coalesce(p_password, '')) < 8 then raise exception 'Password must be at least 8 characters'; end if;
  if length(p_password) > 200 then raise exception 'That password is too long'; end if;
  if sid = '' then return 'none'; end if;
  select * into p from public.profiles where public.norm_id(staff_id) = sid for update;
  if p.id is null then return 'none'; end if;
  if p.role = 'leader' or not p.claim_open then return 'closed'; end if;
  if exists (select 1 from auth.users u where u.id = p.id and u.banned_until is not null and u.banned_until > now()) then return 'off'; end if;
  update auth.users set encrypted_password = extensions.crypt(p_password, extensions.gen_salt('bf')), updated_at = now() where id = p.id;
  if not found then return 'none'; end if;
  update public.profiles set claim_open = false, must_change_password = false where id = p.id;
  insert into public.account_claims (staff_id) values (sid);
  return 'ok';
end $$;
revoke all on function public.claim_account(text, text) from public;
grant execute on function public.claim_account(text, text) to anon, authenticated;

-- Choosing your own password after a starter or temporary one also closes the claim.
create or replace function public.password_changed() returns void
language plpgsql security definer set search_path to 'public' as $function$
begin
  perform set_config('dsy.password_changed', '1', true);
  update public.profiles set must_change_password = false, claim_open = false where id = (select auth.uid());
end;
$function$;

-- A person may not reopen their own account to claiming.
create or replace function public.protect_claim_open() returns trigger
language plpgsql security definer set search_path to 'public' as $$
begin
  if new.claim_open and not old.claim_open and auth.uid() is not null and not public.is_leader() then
    raise exception 'Only a leader can change that';
  end if;
  return new;
end $$;
drop trigger if exists protect_claim_open on public.profiles;
create trigger protect_claim_open before update on public.profiles for each row execute function public.protect_claim_open();
