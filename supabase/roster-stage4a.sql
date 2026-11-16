-- Supabase roster, stage 4a: the roster page on Supabase for the test team, Summer Bay (17 Nov 2026).
-- Adds a 'test' group type (Summer Bay: never emails anyone but the trial address), one-call functions for the page
-- (roster_me, roster_snapshot), and lets roster_book take a test team. Real team pages still use the Apps Scripts.

alter table public.groups drop constraint if exists groups_type_check;
alter table public.groups add constraint groups_type_check check (type in ('team','course','test'));
insert into public.groups (name, type, year, cluster)
select 'Summer Bay', 'test', 2026, 'Lower Eyre' where not exists (select 1 from public.groups where name = 'Summer Bay');
insert into public.memberships (group_id, member_id)
select g.id, p.id from public.groups g, public.profiles p where g.name = 'Summer Bay' and p.staff_id = '1003463'
  and not exists (select 1 from public.memberships m where m.group_id = g.id and m.member_id = p.id);
insert into public.roster_managers (group_id, member_id)
select g.id, p.id from public.groups g, public.profiles p where g.name = 'Summer Bay' and p.staff_id = '1003463' on conflict do nothing;

-- Who am I on this team's roster (one call when the page opens). Managers and leaders also get the team list.
create or replace function public.roster_me(p_team text) returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare g public.groups; p public.profiles; manage boolean;
begin
  if auth.uid() is null then raise exception 'Please sign in first.'; end if;
  select * into g from public.groups where name = p_team and type in ('team','test');
  if g.id is null then raise exception 'This team is not set up on the new roster yet.'; end if;
  if not public.roster_can_view(g.id) then raise exception 'You can only see your own team''s roster. Ask your Team Leader to add you to %.', g.name; end if;
  select * into p from public.profiles where id = auth.uid();
  manage := public.roster_can_manage(g.id);
  return jsonb_build_object('group_id', g.id, 'team', g.name, 'cluster', g.cluster, 'call_sign', g.call_sign,
    'id', p.id, 'name', coalesce(nullif(btrim(p.preferred_name), ''), p.full_name), 'full_name', p.full_name,
    'preferred_name', p.preferred_name, 'level', p.clinical_level,
    'can_manage', manage, 'is_member', public.roster_is_member(g.id),
    'members', case when manage then (select coalesce(jsonb_agg(jsonb_build_object('id', m.member_id, 'name', m.name, 'full_name', m.full_name,
        'staff_id', m.staff_id, 'level', m.clinical_level)), '[]'::jsonb) from public.roster_team_members(g.id) m) end);
end $$;

-- The roster for a period plus the team's status, in one call.
create or replace function public.roster_snapshot(p_group uuid, p_from timestamptz, p_to timestamptz) returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare g public.groups; c public.roster_clusters; s public.roster_sent;
begin
  select * into g from public.groups where id = p_group;
  select * into c from public.roster_clusters where cluster = g.cluster;
  select * into s from public.roster_sent where group_id = p_group;
  return jsonb_build_object(
    'bookings', (select coalesce(jsonb_agg(to_jsonb(r)), '[]'::jsonb) from public.roster_list(p_group, p_from, p_to) r),   -- checks the viewer
    'sent_until', s.sent_until, 'marked_at', s.marked_at, 'updated_at', s.updated_at,
    'trial', g.type = 'test' or c.live_from is null or (now() at time zone 'Australia/Adelaide')::date < c.live_from,
    'cr_set', exists (select 1 from public.roster_contacts k where k.cluster = g.cluster and nullif(btrim(k.country_rostering_email), '') is not null));
end $$;

create or replace function public.roster_book(p_request_id text, p_group uuid, p_start timestamptz, p_end timestamptz,
  p_flexibility text default 'N', p_member uuid default null, p_placeholder text default null, p_level text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare uid uuid := auth.uid(); m uuid; lvl text; flex text := upper(coalesce(nullif(btrim(p_flexibility), ''), 'N'));
        ph text := nullif(btrim(p_placeholder), ''); r public.roster_shifts; nb text[]; notify boolean;
begin
  if uid is null then raise exception 'Please sign in first.'; end if;
  if p_request_id is null or char_length(p_request_id) not between 10 and 120 then raise exception 'A valid request ID is required.'; end if;
  select * into r from public.roster_shifts where request_id = p_request_id;
  if found then
    return jsonb_build_object('shift', to_jsonb(r), 'already_applied', true,
      'requires_notification', public.roster_before_cutoff(r.group_id, r.starts_at));
  end if;
  if not exists (select 1 from public.groups where id = p_group and type in ('team','test')) then raise exception 'Team not found.'; end if;
  if flex not in ('N','A','B','C','Z') then raise exception 'Flexibility must be N, A, B, C or Z.'; end if;
  if ph is not null then
    if p_member is not null then raise exception 'Choose a person or a placeholder, not both.'; end if;
    if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can add a placeholder.'; end if;
    lvl := upper(btrim(p_level));
  else
    m := coalesce(p_member, uid);
    if m <> uid and not public.roster_can_manage(p_group) then
      raise exception 'Only a manager or Team Leader can book someone else.';
    end if;
    if not exists (select 1 from public.memberships where group_id = p_group and member_id = m) then
      raise exception 'That person is not on this team''s list. Use "Not on the list" instead.';
    end if;
    -- Level chosen on the booking form wins; otherwise the level saved on the person (owner, 16 Nov 2026)
    select coalesce(upper(nullif(btrim(p_level), '')), clinical_level) into lvl from public.profiles where id = m;
  end if;
  if lvl is null or lvl not in ('PARA','AO','AR','AA','REC') then raise exception 'Clinical level must be PARA, AO, AR, AA or REC.'; end if;
  perform public.roster_check_times(p_start, p_end);
  if p_start < public.roster_current_hour() then raise exception 'A shift cannot start in the past.'; end if;
  perform public.roster_lock(p_group);
  perform public.roster_check_capacity(p_group, m, ph, lvl, p_start, p_end, null);
  notify := public.roster_before_cutoff(p_group, p_start);
  if notify then nb := public.roster_op_codes(p_group, p_start, least(p_end, (select sent_until from public.roster_sent where group_id = p_group))); end if;
  insert into public.roster_shifts (request_id, group_id, member_id, placeholder_name, clinical_level, flexibility, starts_at, ends_at, created_by)
  values (p_request_id, p_group, m, ph, lvl, flex, p_start, p_end, uid) returning * into r;
  -- Booking for yourself saves your level to your account, so it is filled in next time on any device
  if m = uid then update public.profiles set clinical_level = lvl where id = uid and clinical_level is distinct from lvl; end if;
  insert into public.roster_change_log (group_id, by_id, action, shift_id, details)
  values (p_group, uid, 'Booking added', r.id, jsonb_build_object('start', p_start, 'end', p_end, 'level', lvl, 'flexibility', flex,
          'member', m, 'placeholder', ph, 'before_cutoff', notify));
  if notify then perform public.roster_queue_change(r.id, 'Booking added', p_start, p_end, nb, null, null, p_start); end if;
  return jsonb_build_object('shift', to_jsonb(r), 'already_applied', false, 'requires_notification', notify);
end $$;

revoke all on function public.roster_me(text), public.roster_snapshot(uuid,timestamptz,timestamptz),
  public.roster_book(text,uuid,timestamptz,timestamptz,text,uuid,text,text) from public, anon;
grant execute on function public.roster_me(text), public.roster_snapshot(uuid,timestamptz,timestamptz),
  public.roster_book(text,uuid,timestamptz,timestamptz,text,uuid,text,text) to authenticated;
