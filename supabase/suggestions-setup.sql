-- Platform suggestions from Team Leaders (18 Nov 2026, owner). Shown on both dashboards.
-- Any leader (including someone on relief cover) can add one and read them all; the lead instructor (a real leader
-- with no cluster) sets the status and replies; a leader can withdraw their own while it is still new.
create table if not exists public.platform_suggestions (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null default auth.uid() references auth.users(id) on delete cascade,
  area text not null default 'Other' check (area in ('Dashboard', 'Rosters', 'Training app', 'Learning pages', 'Sessions and stations', 'Other')),
  body text not null check (char_length(btrim(body)) between 3 and 2000),
  status text not null default 'new' check (status in ('new', 'planned', 'done', 'not now')),
  reply text check (reply is null or char_length(reply) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.platform_suggestions enable row level security;
revoke all on public.platform_suggestions from anon, authenticated;
grant select, insert, update, delete on public.platform_suggestions to authenticated;

create or replace function public.is_lead_instructor() returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'leader' and cluster is null) $$;
revoke execute on function public.is_lead_instructor() from public, anon;
grant execute on function public.is_lead_instructor() to authenticated;

drop policy if exists sugg_read on public.platform_suggestions;
drop policy if exists sugg_add on public.platform_suggestions;
drop policy if exists sugg_manage on public.platform_suggestions;
drop policy if exists sugg_withdraw on public.platform_suggestions;
create policy sugg_read on public.platform_suggestions for select to authenticated using (public.is_leader());
create policy sugg_add on public.platform_suggestions for insert to authenticated
  with check (public.is_leader() and created_by = (select auth.uid()) and status = 'new' and reply is null);
create policy sugg_manage on public.platform_suggestions for update to authenticated
  using (public.is_lead_instructor()) with check (public.is_lead_instructor());
create policy sugg_withdraw on public.platform_suggestions for delete to authenticated
  using ((created_by = (select auth.uid()) and status = 'new') or public.is_lead_instructor());
