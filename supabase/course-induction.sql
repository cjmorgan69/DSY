-- AR course induction checklist (/ar/course/, Induction tab), 24 Nov 2026. Applied as migration `course_induction`.
-- One row per ticked item per student; the item list lives in ar/course/app.js (INDUCTION). Facilitators only.
create table if not exists public.course_induction (
  student_id uuid not null references public.course_students(id) on delete cascade,
  item text not null,
  done boolean not null default true,
  note text not null default '',
  done_at timestamptz not null default now(),
  done_by uuid default auth.uid(),
  primary key (student_id, item)
);
alter table public.course_induction enable row level security;
revoke all on public.course_induction from anon;
grant select, insert, update, delete on public.course_induction to authenticated;
drop policy if exists course_induction_fac_all on public.course_induction;
create policy course_induction_fac_all on public.course_induction for all to authenticated
  using (public.is_facilitator()) with check (public.is_facilitator());
