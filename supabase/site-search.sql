-- Dashboard search: people (27 Nov 2026, owner). Migration `site_search_people`.
-- The search box on /dashboard/, /dashboard/wide/ and /dashboard/team/ calls this for names and ambulance IDs.
--   Team Leaders (is_leader(), so relief Team Leaders on cover too): anyone, the same people the People page shows.
--   Volunteer Team Leaders: only the members of their own team (no ambulance IDs).
--   Anyone else: nothing.
-- Every word typed must match the name, preferred name, ambulance ID or a team name. At most 25 rows.
create or replace function public.site_search_people(p_q text)
returns table (id uuid, name text, full_name text, staff_id text, clinical_level text, role text, teams text, roster_url text, vtl_team text)
language sql stable security definer set search_path = public
as $$
  with me as (
    select public.is_leader() as leader,
           (select v.group_id from public.team_vtls v where v.member_id = (select auth.uid())) as vtl_group
  ), words as (
    select w from regexp_split_to_table(lower(trim(coalesce(p_q, ''))), '\s+') w where length(w) > 0 limit 6
  ), people as (
    select p.id, p.full_name, p.preferred_name, p.staff_id, p.clinical_level, p.role,
           string_agg(g.name, ', ' order by g.name) as teams,
           min(g.roster_url) as roster_url,
           (select g2.name from public.team_vtls v join public.groups g2 on g2.id = v.group_id where v.member_id = p.id) as vtl_team
    from public.profiles p
    left join public.memberships m on m.member_id = p.id
    left join public.groups g on g.id = m.group_id and g.type = 'team'
    cross join me
    where length(trim(coalesce(p_q, ''))) >= 2
      and (me.leader or (me.vtl_group is not null and exists (
            select 1 from public.memberships m2 where m2.member_id = p.id and m2.group_id = me.vtl_group)))
    group by p.id
  )
  select x.id, coalesce(nullif(x.preferred_name, ''), x.full_name), x.full_name,
         case when (select leader from me) then x.staff_id end, x.clinical_level, x.role, x.teams, x.roster_url, x.vtl_team
  from people x
  where not exists (
    select 1 from words where position(words.w in lower(concat_ws(' ', x.full_name, x.preferred_name,
      case when (select leader from me) then x.staff_id end, x.teams))) = 0)
  order by (lower(coalesce(x.full_name, '')) like (select w from words limit 1) || '%') desc, x.full_name
  limit 25
$$;
revoke all on function public.site_search_people(text) from public, anon;
grant execute on function public.site_search_people(text) to authenticated;
