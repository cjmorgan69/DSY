-- DSY feedback (11 Nov 2026). One form per topic: /feedback/?t=<topic id>.
-- Anyone with the link can send feedback (signed in or not, so a QR code on a phone just works).
-- Only facilitators and leaders can read it (/feedback/review/). Nobody can edit it from the site;
-- remove rows in the Supabase dashboard if needed.
create table if not exists public.feedback (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  topic text not null check (char_length(topic) between 1 and 60),
  overall smallint check (overall between 1 and 5),
  parts jsonb not null default '{}'::jsonb check (jsonb_typeof(parts) = 'object' and pg_column_size(parts) < 20000),
  liked text check (char_length(liked) <= 2000),
  change text check (char_length(change) <= 2000),
  role text check (char_length(role) <= 40),
  name text check (char_length(name) <= 80),
  source text check (char_length(source) <= 40)
);
alter table public.feedback enable row level security;

drop policy if exists feedback_insert_anyone on public.feedback;
create policy feedback_insert_anyone on public.feedback
  for insert to anon, authenticated with check (true);

drop policy if exists feedback_read_facilitators on public.feedback;
create policy feedback_read_facilitators on public.feedback
  for select to authenticated using ((select public.is_facilitator()));

grant insert on public.feedback to anon, authenticated;
grant select on public.feedback to authenticated;
