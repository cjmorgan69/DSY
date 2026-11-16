-- Applied by Claude 16 Nov 2026 (apply_migration).
-- Dashboard tasks are per leader (owner, 16 Nov 2026): each leader sees and changes only their own tasks.
-- Siri tasks belong to the owner of the Siri key. Existing tasks (all the lead instructor's) are given to them.
alter table public.quick_add_keys add column if not exists owner_id uuid references auth.users(id) on delete cascade;
update public.quick_add_keys set owner_id = (select id from public.profiles where staff_id = '1003463') where label = 'siri' and owner_id is null;
update public.dashboard_tasks set created_by = (select id from public.profiles where staff_id = '1003463') where created_by is null;

drop policy if exists "leaders read tasks" on public.dashboard_tasks;
drop policy if exists "leaders add tasks" on public.dashboard_tasks;
drop policy if exists "leaders change tasks" on public.dashboard_tasks;
drop policy if exists "leaders delete tasks" on public.dashboard_tasks;
create policy "leaders read own tasks" on public.dashboard_tasks for select to authenticated using (public.is_leader() and created_by = (select auth.uid()));
create policy "leaders add own tasks" on public.dashboard_tasks for insert to authenticated with check (public.is_leader() and created_by = (select auth.uid()));
create policy "leaders change own tasks" on public.dashboard_tasks for update to authenticated using (public.is_leader() and created_by = (select auth.uid())) with check (created_by = (select auth.uid()));
create policy "leaders delete own tasks" on public.dashboard_tasks for delete to authenticated using (public.is_leader() and created_by = (select auth.uid()));

create or replace function public.quick_add_task(p_key text, p_title text, p_due date default null)
returns jsonb language plpgsql security definer set search_path = public
as $$
declare
  k public.quick_add_keys;
  t text := btrim(coalesce(p_title, ''));
begin
  select * into k from public.quick_add_keys
   where key_hash = encode(sha256(convert_to(coalesce(p_key, ''), 'utf8')), 'hex') and revoked_at is null;
  if not found then return jsonb_build_object('ok', false, 'message', 'That key is not allowed.'); end if;
  if t = '' then return jsonb_build_object('ok', false, 'message', 'I did not catch a task.'); end if;
  if (select count(*) from public.dashboard_tasks where source = k.label and created_at > now() - interval '1 minute') >= 20 then
    return jsonb_build_object('ok', false, 'message', 'Too many tasks at once. Try again in a minute.');
  end if;
  insert into public.dashboard_tasks (title, due_date, source, created_by) values (left(t, 300), p_due, k.label, k.owner_id);
  return jsonb_build_object('ok', true, 'message', 'Added to your dashboard: ' || left(t, 300));
end;
$$;
