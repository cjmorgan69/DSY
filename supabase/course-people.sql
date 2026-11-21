-- AR course: people picker for Workshop bookings (/ar/course/, Students tab), 21 Nov 2026.
-- Facilitators can't read profiles directly (leaders only), so this returns just what the picker needs:
-- ambulance ID, name, team(s) and whether they have signed up. Signed-up people come from profiles + memberships,
-- people not signed up yet from expected_members.

create or replace function public.course_people()
returns table (staff_id text, full_name text, teams text[], signed_up boolean)
language sql stable security definer set search_path = public as $$
  select p.staff_id, coalesce(nullif(p.preferred_name, ''), p.full_name, ''),
         coalesce(array_agg(distinct g.name order by g.name) filter (where g.name is not null), '{}'), true
  from profiles p
  left join memberships m on m.member_id = p.id
  left join groups g on g.id = m.group_id
  where is_facilitator() and coalesce(p.staff_id, '') <> ''
  group by p.id
  union all
  select e.staff_id, coalesce(e.full_name, ''), coalesce(array_agg(distinct g.name order by g.name) filter (where g.name is not null), '{}'), false
  from expected_members e
  left join groups g on g.id = e.group_id
  where is_facilitator() and not exists (select 1 from profiles p where norm_id(p.staff_id) = norm_id(e.staff_id))
  group by e.staff_id, e.full_name
$$;

revoke execute on function public.course_people() from public, anon;
grant execute on function public.course_people() to authenticated;
