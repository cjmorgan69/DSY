-- DSY vehicle check (15 Nov 2026). Page: /vehicle-check/ (signed-in members).
-- The checklist itself (sections and items of FRM-384) is in vehicle-check/checklist.js, not in the database.
--   vehicles              one row per ambulance; facilitators and leaders add or change them
--   vehicle_checks        one row each time a person checks one section (locker, drawer, door ...).
--                         A row with no completed_at means "being checked now" (ignored after 20 minutes).
--   vehicle_stock_needs   the stock-to-order list: a line is opened when an item is marked short and
--                         closed (restocked) when it is next checked as present, or by hand.
--   vehicle_section_status (view) the latest completed check of each section of each vehicle.
-- Any signed-in member can read all of it and record checks; nobody who is not signed in can see anything.

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(name) between 1 and 60),
  checklist text not null default 'vs30',
  check_every_days int not null default 7 check (check_every_days between 1 and 90),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.vehicle_checks (
  id bigint generated always as identity primary key,
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  section text not null check (char_length(section) between 1 and 60),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  checked_by uuid not null default auth.uid() references public.profiles(id),
  checked_by_name text check (char_length(checked_by_name) <= 80),
  results jsonb not null default '{}'::jsonb check (jsonb_typeof(results) = 'object' and pg_column_size(results) < 30000),
  short_count int not null default 0,
  note text check (char_length(note) <= 1000)
);
create index if not exists vehicle_checks_latest on public.vehicle_checks (vehicle_id, section, completed_at desc);

create table if not exists public.vehicle_stock_needs (
  id bigint generated always as identity primary key,
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  section text not null check (char_length(section) <= 60),
  item_key text not null check (char_length(item_key) <= 160),
  item text not null check (char_length(item) between 1 and 200),
  qty int not null default 1 check (qty between 1 and 999),
  note text check (char_length(note) <= 300),
  status text not null default 'open' check (status in ('open', 'ordered', 'restocked')),
  check_id bigint references public.vehicle_checks(id) on delete set null,
  reported_by uuid not null default auth.uid() references public.profiles(id),
  reported_by_name text check (char_length(reported_by_name) <= 80),
  reported_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by_name text check (char_length(updated_by_name) <= 80)
);
create index if not exists vehicle_stock_needs_open on public.vehicle_stock_needs (vehicle_id, status);

create or replace view public.vehicle_section_status with (security_invoker = true) as
  select distinct on (vehicle_id, section) vehicle_id, section, id as check_id, completed_at, checked_by_name, short_count
    from public.vehicle_checks
   where completed_at is not null
   order by vehicle_id, section, completed_at desc;

alter table public.vehicles enable row level security;
alter table public.vehicle_checks enable row level security;
alter table public.vehicle_stock_needs enable row level security;

drop policy if exists vehicles_read on public.vehicles;
create policy vehicles_read on public.vehicles for select to authenticated using (true);
drop policy if exists vehicles_fac_insert on public.vehicles;
create policy vehicles_fac_insert on public.vehicles for insert to authenticated with check ((select public.is_facilitator()));
drop policy if exists vehicles_fac_update on public.vehicles;
create policy vehicles_fac_update on public.vehicles for update to authenticated
  using ((select public.is_facilitator())) with check ((select public.is_facilitator()));

drop policy if exists vehicle_checks_read on public.vehicle_checks;
create policy vehicle_checks_read on public.vehicle_checks for select to authenticated using (true);
drop policy if exists vehicle_checks_insert_own on public.vehicle_checks;
create policy vehicle_checks_insert_own on public.vehicle_checks for insert to authenticated
  with check (checked_by = (select auth.uid()));
-- a person finishes their own check; a finished check cannot be changed afterwards
drop policy if exists vehicle_checks_finish_own on public.vehicle_checks;
create policy vehicle_checks_finish_own on public.vehicle_checks for update to authenticated
  using (checked_by = (select auth.uid()) and completed_at is null) with check (checked_by = (select auth.uid()));
-- leaving a section without saving removes the "being checked now" row
drop policy if exists vehicle_checks_cancel_own on public.vehicle_checks;
create policy vehicle_checks_cancel_own on public.vehicle_checks for delete to authenticated
  using (checked_by = (select auth.uid()) and completed_at is null);

drop policy if exists vehicle_stock_read on public.vehicle_stock_needs;
create policy vehicle_stock_read on public.vehicle_stock_needs for select to authenticated using (true);
drop policy if exists vehicle_stock_insert on public.vehicle_stock_needs;
create policy vehicle_stock_insert on public.vehicle_stock_needs for insert to authenticated
  with check (reported_by = (select auth.uid()));
-- the whole crew works on one order list, so any signed-in member can change a line
drop policy if exists vehicle_stock_update on public.vehicle_stock_needs;
create policy vehicle_stock_update on public.vehicle_stock_needs for update to authenticated using (true) with check (true);

revoke all on public.vehicles, public.vehicle_checks, public.vehicle_stock_needs, public.vehicle_section_status from anon, public;
revoke all on public.vehicles, public.vehicle_checks, public.vehicle_stock_needs, public.vehicle_section_status from authenticated;
grant select, insert, update on public.vehicles to authenticated;
grant select, insert, update, delete on public.vehicle_checks to authenticated;
grant select, insert, update on public.vehicle_stock_needs to authenticated;
grant select on public.vehicle_section_status to authenticated;

-- one vehicle per team to start with; rename or add more on the page (facilitators and leaders)
insert into public.vehicles (name)
select g.name || ' ambulance' from public.groups g
 where g.type = 'team' and not exists (select 1 from public.vehicles);
