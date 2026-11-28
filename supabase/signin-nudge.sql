-- Weekly sign-in reminder to cluster Team Leaders (owner, 28 Nov 2026).
-- Every Monday morning the edge function signin-nudge (supabase/functions/signin-nudge) emails each listed cluster's
-- Team Leader (roster_contacts.area_manager_email) the people in their teams who have never set up their sign-in
-- (claim_open, not switched off), and explains sign up versus switch off and the risk of leaving an account unclaimed.
-- No email when a cluster has nobody left. Applied by Claude (migration signin_nudge).

create table if not exists public.signin_nudge_log (
  id bigserial primary key,
  cluster text not null,
  mode text not null,            -- weekly or preview
  sent_to text,
  open_count int,
  sent_at timestamptz not null default now(),
  error text
);
alter table public.signin_nudge_log enable row level security;
revoke all on public.signin_nudge_log from anon, authenticated;
grant select on public.signin_nudge_log to authenticated;
drop policy if exists signin_nudge_log_leaders_read on public.signin_nudge_log;
create policy signin_nudge_log_leaders_read on public.signin_nudge_log for select to authenticated using (public.is_leader());

-- People in a cluster's teams whose account is still open to claiming. Service role only.
create or replace function public.signin_nudge_list(p_cluster text)
returns table(team text, name text, staff_id text, role text, vtl boolean, roster_mgr boolean, shifts int)
language sql stable security definer set search_path to 'public'
as $$
  select g.name,
         coalesce(nullif(btrim(p.preferred_name), ''), p.full_name),
         p.staff_id, p.role,
         exists (select 1 from public.team_vtls v where v.member_id = p.id and v.group_id = g.id),
         exists (select 1 from public.roster_managers r where r.member_id = p.id and r.group_id = g.id),
         (select count(*)::int from public.roster_shifts s
           where s.member_id = p.id and s.group_id = g.id and s.cancelled_at is null and s.starts_at >= now())
  from public.profiles p
  join auth.users u on u.id = p.id
  join public.memberships m on m.member_id = p.id
  join public.groups g on g.id = m.group_id
  where g.cluster = p_cluster and g.type = 'team'
    and p.claim_open and p.role <> 'leader'
    and (u.banned_until is null or u.banned_until <= now())
  order by 1, 2
$$;
revoke execute on function public.signin_nudge_list(text) from public, anon, authenticated;
grant execute on function public.signin_nudge_list(text) to service_role;

-- Schedule (run only after the owner approves the preview): Mondays 22:13 UTC Sunday = 8:43 am Adelaide in summer
-- (7:43 am in winter). The key is the public anon key, as for the other jobs; the function itself refuses a
-- second weekly email to the same cluster within 6 days, so extra calls send nothing.
-- select cron.schedule('signin-nudge', '13 22 * * 0', $job$
--   select net.http_post(
--     url := 'https://ekaodnbnpsuayvmxvxbm.supabase.co/functions/v1/signin-nudge',
--     headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer <anon key>'),
--     body := '{"mode":"weekly"}'::jsonb, timeout_milliseconds := 60000)
-- $job$);
-- Stop it: select cron.unschedule('signin-nudge');
