-- Supabase roster, stage 7: switch day for Lower Eyre and Central Eyre (18 Nov 2026, owner: "go live now").
-- Run by Claude step by step (execute_sql); kept here as the record. West Coast is NOT switched (waiting on Dave's list).
--
-- 1. Fresh copy: edge function roster-sync (now including the 4 Lower Eyre teams) refreshed public.roster_bookings
--    from every team's Apps Script at 06:15 UTC (789 active bookings for the 8 teams).
-- 2. Names: roster_import_match() re-run; one new name ("Prue Holly", Cleve) brought across as a placeholder.
-- 3. Accounts made for everyone on a leader's list who had not signed up (42, Central Eyre), with
--    public.roster_make_account(staff_id, full_name): the account cannot be signed in to until the person claims it
--    on /signin/ ("First time here?"), which sets their own password. Proven first on a test account (999123,
--    "Claude Testaccount", Summer Bay, switched off afterwards): made, refused sign-in, claimed, signed in, roster
--    loaded, second claim refused.
-- 4. Copy: every active booking of the 8 teams into public.roster_shifts (request_id and legacy_ref = the old booking
--    ID, legacy_name = the typed name), linked to the person, or as a placeholder (LEP40, CO85 ...); test entries left
--    out. Lower Eyre sent cut-offs copied into roster_sent (Coffin Bay and Cummins Thu 26 Nov 08:00, Port Neill Mon 23
--    Nov 08:00, Tumby Bay Wed 25 Nov 08:00; Central Eyre had none). Both clusters live from 2026-11-18.
-- 5. Pages: backend "supabase" on the 8 teams in teams.js; their pages need sign-in and load roster-supabase.js.
-- 6. After the pages go live: a catch-up copy of anything booked, changed or cancelled on an old page still open.

create or replace function public.roster_make_account(p_staff_id text, p_full_name text) returns uuid
language plpgsql security definer set search_path to 'public', 'auth', 'extensions' as $$
declare sid text := public.norm_id(p_staff_id); uid uuid := gen_random_uuid(); em text;
begin
  if sid = '' then raise exception 'No ID'; end if;
  if exists (select 1 from public.profiles where public.norm_id(staff_id) = sid) then return null; end if;
  em := sid || '@id.dsytraining.com';
  insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, recovery_token, email_change, email_change_token_new, email_change_token_current,
    phone_change, phone_change_token, reauthentication_token, is_sso_user, is_anonymous)
  values (uid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', em,
    extensions.crypt(encode(extensions.gen_random_bytes(24), 'hex'), extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    jsonb_build_object('sub', uid::text, 'staff_id', sid, 'full_name', p_full_name, 'email_verified', true, 'phone_verified', false),
    now(), now(), '', '', '', '', '', '', '', '', false, false);
  insert into auth.identities (id, user_id, provider, provider_id, identity_data, created_at, updated_at)
  values (gen_random_uuid(), uid, 'email', uid::text,
    jsonb_build_object('sub', uid::text, 'email', em, 'staff_id', sid, 'full_name', p_full_name, 'email_verified', false, 'phone_verified', false), now(), now());
  update public.profiles set claim_open = true, must_change_password = true where id = uid;
  return uid;
end $$;
revoke all on function public.roster_make_account(text, text) from public, anon, authenticated;
