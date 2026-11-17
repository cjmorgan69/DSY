-- The test roster (group type 'test', Summer Bay) can be managed by any Team Leader, whatever their cluster, so each
-- can run their own trial: add people to it and use its Manager controls (owner, 17 Nov 2026). Real teams unchanged.
-- Applied by Claude 17 Nov 2026 (migration roster_test_team_open_to_leaders). The training page's canEdit() matches.
create or replace function public.can_edit_group(g uuid) returns boolean
language sql stable security definer set search_path to 'public' as $function$
  select case when (select type from public.groups where id = g) = 'test' then public.is_leader()
              else public.can_edit_cluster((select cluster from public.groups where id = g)) end
$function$;
