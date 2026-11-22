-- One reminder switch for the whole DSY site (owner, 22 Nov 2026). Replaces the training-only devices of
-- session-reminders.sql before they went live.
-- A device turned on with the shared switch (/shared/reminders.js, service worker /sw.js, scope "/") gets every
-- reminder that applies to the person: the roster reminder (24 hours before the roster is sent) and the training
-- session reminder (12 hours before a session). Older roster-only devices (scope /modules/rosters/) keep working
-- until the person turns on the shared switch; from then on only their whole-site devices are used, so nobody gets
-- the same reminder twice.

alter table public.roster_push_subs add column if not exists sw_scope text not null default '/modules/rosters/'
  check (sw_scope in ('/', '/modules/rosters/'));
alter table public.roster_push_subs drop constraint if exists roster_push_subs_page_url_check;
alter table public.roster_push_subs add constraint roster_push_subs_page_url_check
  check (page_url is null or (page_url ~ '^/[A-Za-z0-9/_.%-]*$' and char_length(page_url) < 200));

drop function if exists public.roster_push_subscribe(text, text, text, text);
create or replace function public.roster_push_subscribe(p_endpoint text, p_p256dh text, p_auth text, p_page text, p_scope text default '/modules/rosters/')
returns void language plpgsql security definer set search_path to 'public' as $$
begin
  if auth.uid() is null then raise exception 'Please sign in first.'; end if;
  insert into public.roster_push_subs (member_id, endpoint, p256dh, auth, page_url, sw_scope)
  values (auth.uid(), p_endpoint, p_p256dh, p_auth, p_page, coalesce(p_scope, '/modules/rosters/'))
  on conflict (endpoint) do update set member_id = auth.uid(), p256dh = excluded.p256dh, auth = excluded.auth,
    page_url = excluded.page_url, sw_scope = excluded.sw_scope;
end $$;

-- The devices a person's reminders go to: their whole-site devices if they have any, otherwise their roster ones.
create or replace function public.push_devices(p_members uuid[]) returns setof public.roster_push_subs
language sql stable security definer set search_path to 'public' as $$
  select x.* from public.roster_push_subs x
  where x.member_id = any(p_members)
    and (x.sw_scope = '/' or not exists (select 1 from public.roster_push_subs y where y.member_id = x.member_id and y.sw_scope = '/')) $$;

drop function if exists public.roster_push_mine();
create function public.roster_push_mine() returns table (endpoint text, p256dh text, auth text, page_url text, sw_scope text)
language sql stable security definer set search_path to 'public' as $$
  select s.endpoint, s.p256dh, s.auth, s.page_url, s.sw_scope from public.roster_push_subs s where s.member_id = (select auth.uid()) $$;

-- Roster reminder: a whole-site device is sent to the team's roster page.
create or replace function public.roster_push_targets(p_group uuid) returns table (endpoint text, p256dh text, auth text, page_url text)
language sql stable security definer set search_path to 'public' as $$
  select d.endpoint, d.p256dh, d.auth,
         case when d.sw_scope = '/' then coalesce((select g.roster_url from public.groups g where g.id = p_group), '/') else d.page_url end
  from public.push_devices(array(select m.member_id from public.memberships m where m.group_id = p_group)) d $$;

-- Training session reminder: the team's members, minus those who said "Sorry, not this time".
create or replace function public.session_push_targets(p_session uuid) returns table (endpoint text, p256dh text, auth text, page_url text)
language sql stable security definer set search_path to 'public' as $$
  select d.endpoint, d.p256dh, d.auth, '/training/'::text
  from public.push_devices(array(
    select m.member_id from public.sessions s join public.memberships m on m.group_id = s.group_id
    where s.id = p_session
      and not exists (select 1 from public.bookings b where b.session_id = s.id and b.member_id = m.member_id and b.status = 'cancelled'))) d $$;

revoke all on function public.roster_push_subscribe(text, text, text, text, text), public.push_devices(uuid[]), public.roster_push_mine(),
  public.roster_push_targets(uuid), public.session_push_targets(uuid) from public, anon, authenticated;
grant execute on function public.roster_push_subscribe(text, text, text, text, text), public.roster_push_mine() to authenticated;
grant execute on function public.roster_push_targets(uuid), public.session_push_targets(uuid) to service_role;
