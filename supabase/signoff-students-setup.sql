-- AR skill sign-off navigator: student picker (21 Nov 2026).
-- One row per AR student: their station and their saaslearn (Moodle) user number, so /ar/signoff/ can open
-- report.php?id=<skill>&studentid=<moodle_id> for the exact students a facilitator is signing off.
-- Facilitators and leaders only (is_facilitator()); students never see this list.

create table if not exists public.signoff_students (
  id uuid primary key default gen_random_uuid(),
  station text not null check (station in ('tumby', 'cummins', 'coffin', 'portneill')),
  name text not null check (length(trim(name)) > 0),
  moodle_id integer not null check (moodle_id > 0),
  active boolean not null default true,
  added_at timestamptz not null default now(),
  unique (moodle_id)
);

alter table public.signoff_students enable row level security;
revoke all on public.signoff_students from anon;
grant select, insert, update, delete on public.signoff_students to authenticated;
drop policy if exists signoff_students_fac_all on public.signoff_students;
create policy signoff_students_fac_all on public.signoff_students for all to authenticated
  using (public.is_facilitator()) with check (public.is_facilitator());
