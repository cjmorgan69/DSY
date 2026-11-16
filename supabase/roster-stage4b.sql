-- Supabase roster, stage 4b: "Send roster to Country Rostering" (17 Nov 2026).
-- The edge function roster-send (supabase/functions/roster-send) builds the PDF (full names and ambulance IDs),
-- emails it and sets the sent cut-off. This file gives it the data, as the signed-in manager, and a private bucket
-- for the copy that is kept of each roster sent.

-- Everything the send needs for a period of whole roster days (08:00 to 08:00 Adelaide). Managers and leaders only.
create or replace function public.roster_send_prepare(p_group uuid, p_first date, p_days int) returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare g public.groups; c public.roster_clusters; k public.roster_contacts; f timestamptz; t timestamptz;
begin
  if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can send the roster.'; end if;
  if p_first is null or p_days is null or p_days < 1 or p_days > 28 then raise exception 'Choose 1 to 28 days.'; end if;
  select * into g from public.groups where id = p_group;
  select * into c from public.roster_clusters where cluster = g.cluster;
  select * into k from public.roster_contacts where cluster = g.cluster;
  f := (p_first + time '08:00') at time zone 'Australia/Adelaide';
  t := ((p_first + p_days) + time '08:00') at time zone 'Australia/Adelaide';
  return jsonb_build_object(
    'team', g.name, 'cluster', g.cluster, 'from', f, 'to', t, 'first', p_first, 'days', p_days,
    'trial', g.type = 'test' or c.live_from is null or (now() at time zone 'Australia/Adelaide')::date < c.live_from,
    'sent_until', (select sent_until from public.roster_sent where group_id = p_group),
    'trial_email', k.trial_email, 'country_rostering_email', k.country_rostering_email, 'country_rostering_cc', k.country_rostering_cc,
    'manager_emails', (select coalesce(jsonb_agg(distinct m.notify_email), '[]'::jsonb) from public.roster_managers m
                       where m.group_id = p_group and nullif(btrim(m.notify_email), '') is not null),
    'sender', (select full_name from public.profiles where id = auth.uid()),
    'hours', (select coalesce(jsonb_agg(jsonb_build_object('t', h,
                 'day', ((h at time zone 'Australia/Adelaide') - interval '8 hours')::date,
                 'hour', extract(hour from h at time zone 'Australia/Adelaide')::int) order by h), '[]'::jsonb)
              from generate_series(f, t - interval '1 hour', interval '1 hour') h),
    'codes', to_jsonb(public.roster_op_codes(p_group, f, t)),
    'shifts', (select coalesce(jsonb_agg(jsonb_build_object('name', coalesce(r.placeholder_name, p.full_name), 'staff_id', p.staff_id,
                 'level', r.clinical_level, 'flexibility', r.flexibility, 'start', r.starts_at, 'end', r.ends_at) order by r.starts_at, r.id), '[]'::jsonb)
               from public.roster_shifts r left join public.profiles p on p.id = r.member_id
               where r.group_id = p_group and r.status = 'active' and r.starts_at < t and r.ends_at > f));
end $$;

-- Recorded by the edge function after the email has gone.
create or replace function public.roster_log_sent(p_group uuid, p_details jsonb) returns void
language plpgsql security definer set search_path to 'public' as $$
begin
  if not public.roster_can_manage(p_group) then raise exception 'Only a manager or Team Leader can send the roster.'; end if;
  insert into public.roster_change_log (group_id, by_id, action, details) values (p_group, auth.uid(), 'Roster sent to Country Rostering', p_details);
end $$;

revoke all on function public.roster_send_prepare(uuid,date,int), public.roster_log_sent(uuid,jsonb) from public, anon;
grant execute on function public.roster_send_prepare(uuid,date,int), public.roster_log_sent(uuid,jsonb) to authenticated;

-- Private bucket for the copy of each roster sent (written by the edge function only).
insert into storage.buckets (id, name, public) values ('roster-sent', 'roster-sent', false) on conflict (id) do nothing;
