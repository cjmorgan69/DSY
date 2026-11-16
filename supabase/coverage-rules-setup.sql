-- Crewing gaps: each Team Leader's own rules (owner, 16 Nov 2026). Used by /dashboard/coverage/.
-- One row per leader. `groups` is a list of coverage groups, each:
--   { "name": text, "teams": [team names], "min": number of crew needed across those teams,
--     "levels": { "AR": "full" | "with" | "no", ... }   full = counts; with = counts only with a "full"
--                                                       person booked in the same town; no = doesn't count
--     "minHours": only gaps this long or longer are listed (0 = every gap) }
-- A leader reads and changes only their own row. A relief Team Leader can read (not change) the rules of the
-- leader they are covering.

create table if not exists public.coverage_rules (
  owner_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  groups jsonb not null default '[]'::jsonb check (jsonb_typeof(groups) = 'array'),
  updated_at timestamptz not null default now()
);

alter table public.coverage_rules enable row level security;
revoke all on public.coverage_rules from anon;
grant select, insert, update, delete on public.coverage_rules to authenticated;

drop policy if exists coverage_rules_read on public.coverage_rules;
create policy coverage_rules_read on public.coverage_rules for select to authenticated
  using (public.is_leader() and (owner_id = (select auth.uid()) or owner_id in (select public.covering_ids())));
drop policy if exists coverage_rules_insert on public.coverage_rules;
create policy coverage_rules_insert on public.coverage_rules for insert to authenticated
  with check (public.is_leader() and owner_id = (select auth.uid()));
drop policy if exists coverage_rules_update on public.coverage_rules;
create policy coverage_rules_update on public.coverage_rules for update to authenticated
  using (public.is_leader() and owner_id = (select auth.uid()))
  with check (public.is_leader() and owner_id = (select auth.uid()));
drop policy if exists coverage_rules_delete on public.coverage_rules;
create policy coverage_rules_delete on public.coverage_rules for delete to authenticated
  using (public.is_leader() and owner_id = (select auth.uid()));
