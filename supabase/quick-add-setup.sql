-- Quick add for the dashboard Tasks panel (13 Nov 2026): an iPhone Siri Shortcut (or anything else that can send a web request)
-- adds a task with a private key. Only the SHA-256 hash of each key is stored here; the key itself lives only in the Shortcut.
-- Revoke a key: update public.quick_add_keys set revoked_at = now() where label = '...';
alter table public.dashboard_tasks add column if not exists source text;

create table if not exists public.quick_add_keys (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  key_hash text not null unique,
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);
alter table public.quick_add_keys enable row level security;
revoke all on public.quick_add_keys from anon, authenticated;   -- no policies: only the function below reads it

create or replace function public.quick_add_task(p_key text, p_title text, p_due date default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  k public.quick_add_keys;
  t text := btrim(coalesce(p_title, ''));
begin
  select * into k from public.quick_add_keys
   where key_hash = encode(sha256(convert_to(coalesce(p_key, ''), 'utf8')), 'hex') and revoked_at is null;
  if not found then
    return jsonb_build_object('ok', false, 'message', 'That key is not allowed.');
  end if;
  if t = '' then
    return jsonb_build_object('ok', false, 'message', 'I did not catch a task.');
  end if;
  if (select count(*) from public.dashboard_tasks where source = k.label and created_at > now() - interval '1 minute') >= 20 then
    return jsonb_build_object('ok', false, 'message', 'Too many tasks at once. Try again in a minute.');
  end if;
  insert into public.dashboard_tasks (title, due_date, source, created_by) values (left(t, 300), p_due, k.label, null);
  return jsonb_build_object('ok', true, 'message', 'Added to your dashboard: ' || left(t, 300));
end;
$$;
revoke all on function public.quick_add_task(text, text, date) from public;
grant execute on function public.quick_add_task(text, text, date) to anon, authenticated;
