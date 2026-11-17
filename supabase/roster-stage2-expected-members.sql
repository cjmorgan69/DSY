-- Supabase roster, stage 2 (people), 17 Nov 2026. Applied by Claude as migration roster_stage2_expected_members.
-- Crews who have no account yet come from a leader's list (ambulance ID, full name, team). The list itself is NOT
-- in this public repo: it is in public.expected_members (leaders can read it).
--   * each ID is added to public.allowed_ids, so the person can sign up at /signin/ with their own password;
--   * public.handle_new_user() (the sign-up trigger) now gives a listed person their listed full name, puts them on
--     their team, and keeps what they typed as the name shown on the roster if it differs. This extra step can
--     never stop a sign-up (errors in it are ignored).
-- Migration roster_stage5_match_expected: the name matching (roster_import_match) also matches typed roster names
-- to expected people by ambulance ID (roster_import_names.staff_id, matched_name), before they have an account.
create table if not exists public.expected_members (
  staff_id  text primary key,
  full_name text not null,
  group_id  uuid not null references public.groups(id) on delete cascade,
  added_at  timestamptz not null default now()
);
