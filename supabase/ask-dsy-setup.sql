-- Ask DSY (17 Nov 2026): log of the questions Team Leaders ask the dashboard helper (edge function ask-dsy).
-- The edge function writes with the service role. A leader reads only their own rows; the lead instructor
-- (a real leader with no cluster = all clusters) reads all, to see what the guide is missing. Nobody else.
create table if not exists public.ask_dsy_log (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  asked_at timestamptz not null default now(),
  question text not null,
  answer text,
  model text,
  input_tokens integer,
  output_tokens integer,
  cache_read_tokens integer,
  error text
);
create index if not exists ask_dsy_log_user_time on public.ask_dsy_log (user_id, asked_at desc);

alter table public.ask_dsy_log enable row level security;
revoke all on public.ask_dsy_log from anon, authenticated;
grant select on public.ask_dsy_log to authenticated;

drop policy if exists ask_dsy_log_read on public.ask_dsy_log;
create policy ask_dsy_log_read on public.ask_dsy_log for select to authenticated
  using (user_id = (select auth.uid()) or (public.is_real_leader() and public.my_cluster() is null));
