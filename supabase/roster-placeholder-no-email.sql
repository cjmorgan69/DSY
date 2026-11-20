-- Placeholder shifts without a change email (owner, 20 Nov 2026).
-- A manager or Team Leader booking a placeholder (LEP40 etc.) before the sent
-- cut-off can tick "Don't email Country Rostering": the shift is added and
-- logged (no_email true) but no change email is queued. Crew bookings and
-- edits/cancels always follow the normal rules.
-- Migration: roster_placeholder_no_email.

begin;

drop function if exists public.roster_book(text, uuid, timestamptz, timestamptz, text, uuid, text, text);

create or replace function public.roster_book(p_request_id text, p_group uuid, p_start timestamptz, p_end timestamptz,
  p_flexibility text default 'N', p_member uuid default null, p_placeholder text default null, p_level text default null,
  p_no_email boolean default false)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare uid uuid := auth.uid(); m uuid; lvl text; flex text := upper(coalesce(nullif(btrim(p_flexibility), ''), 'N'));
        ph text := nullif(btrim(p_placeholder), ''); r public.roster_shifts; nb text[]; notify boolean; quiet boolean := false;
begin
  if uid is null then raise exception 'Please sign in first.'; end if;
  if p_request_id is null or char_length(p_request_id) not between 10 and 120 then raise exception 'A valid request ID is required.'; end if;
  select * into r from public.roster_shifts where request_id = p_request_id;
  if found then
    return jsonb_build_object('shift', to_jsonb(r), 'already_applied', true,
      'requires_notification', public.roster_before_cutoff(r.group_id, r.starts_at)
        and not coalesce((select (details->>'no_email')::boolean from public.roster_change_log
                          where shift_id = r.id and action = 'Booking added' limit 1), false));
  end if;
  if not exists (select 1 from public.groups where id = p_group and type in ('team','test')) then raise exception 'Team not found.'; end if;
  if flex not in ('N','A','B','C','Z') then raise exception 'Flexibility must be N, A, B, C or Z.'; end if;
  if ph is not null then
    if p_member is not null then raise exception 'Choose a person or a placeholder, not both.'; end if;
    if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can add a placeholder.'; end if;
    lvl := upper(btrim(p_level));
    quiet := coalesce(p_no_email, false);
  else
    m := coalesce(p_member, uid);
    if m <> uid and not public.roster_can_manage(p_group) then
      raise exception 'Only a manager or Team Leader can book someone else.';
    end if;
    if not exists (select 1 from public.memberships where group_id = p_group and member_id = m) then
      raise exception 'That person is not on this team''s list. Use "Not on the list" instead.';
    end if;
    select coalesce(upper(nullif(btrim(p_level), '')), clinical_level) into lvl from public.profiles where id = m;
  end if;
  if lvl is null or lvl not in ('PARA','AO','AR','AA','REC') then raise exception 'Clinical level must be PARA, AO, AR, AA or REC.'; end if;
  perform public.roster_check_times(p_start, p_end);
  if p_start < public.roster_current_hour() then raise exception 'A shift cannot start in the past.'; end if;
  perform public.roster_lock(p_group);
  perform public.roster_check_capacity(p_group, m, ph, lvl, p_start, p_end, null);
  notify := public.roster_before_cutoff(p_group, p_start);
  if notify and not quiet then nb := public.roster_op_codes(p_group, p_start, least(p_end, (select sent_until from public.roster_sent where group_id = p_group))); end if;
  insert into public.roster_shifts (request_id, group_id, member_id, placeholder_name, clinical_level, flexibility, starts_at, ends_at, created_by)
  values (p_request_id, p_group, m, ph, lvl, flex, p_start, p_end, uid) returning * into r;
  if m = uid then update public.profiles set clinical_level = lvl where id = uid and clinical_level is distinct from lvl; end if;
  insert into public.roster_change_log (group_id, by_id, action, shift_id, details)
  values (p_group, uid, 'Booking added', r.id, jsonb_build_object('start', p_start, 'end', p_end, 'level', lvl, 'flexibility', flex,
          'member', m, 'placeholder', ph, 'before_cutoff', notify, 'no_email', quiet));
  if notify and not quiet then perform public.roster_queue_change(r.id, 'Booking added', p_start, p_end, nb, null, null, p_start); end if;
  return jsonb_build_object('shift', to_jsonb(r), 'already_applied', false, 'requires_notification', notify and not quiet,
    'no_email', quiet and notify);
end $function$;

revoke all on function public.roster_book(text, uuid, timestamptz, timestamptz, text, uuid, text, text, boolean) from public, anon;
grant execute on function public.roster_book(text, uuid, timestamptz, timestamptz, text, uuid, text, text, boolean) to authenticated, service_role;

commit;
