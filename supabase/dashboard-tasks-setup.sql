-- Dashboard tasks (13 Nov 2026). Shared to-do list on /dashboard/. Leaders only: read, add, edit, tick off, delete.
create table if not exists public.dashboard_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 300),
  due_date date,
  done boolean not null default false,
  done_at timestamptz,
  created_by uuid default auth.uid() references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.dashboard_tasks enable row level security;
revoke all on public.dashboard_tasks from anon;
grant select, insert, update, delete on public.dashboard_tasks to authenticated;
drop policy if exists "leaders read tasks" on public.dashboard_tasks;
drop policy if exists "leaders add tasks" on public.dashboard_tasks;
drop policy if exists "leaders change tasks" on public.dashboard_tasks;
drop policy if exists "leaders delete tasks" on public.dashboard_tasks;
create policy "leaders read tasks" on public.dashboard_tasks for select to authenticated using (public.is_leader());
create policy "leaders add tasks" on public.dashboard_tasks for insert to authenticated with check (public.is_leader());
create policy "leaders change tasks" on public.dashboard_tasks for update to authenticated using (public.is_leader()) with check (public.is_leader());
create policy "leaders delete tasks" on public.dashboard_tasks for delete to authenticated using (public.is_leader());
