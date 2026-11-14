-- DSY Team News: all the data for one issue as a single JSON object.
-- Replace {{FROM}} and {{TO}} (inclusive dates, e.g. 2026-11-01 and 2026-11-30) and run in Supabase project
-- ekaodnbnpsuayvmxvxbm (execute_sql). Save the "data" value to <scratchpad>/data.json for make.js.
with p as (
  select date '{{FROM}}' d0, date '{{TO}}' d1,
         (date '{{FROM}}')::timestamp at time zone 'Australia/Adelaide' t0,
         least(((date '{{TO}}') + 1)::timestamp at time zone 'Australia/Adelaide', now()) t1
),
b as (  -- rostered bookings clipped to the period; PARA (paramedic cover placeholders) kept but flagged
  select r.team, r.member_name, r.clinical_level lvl,
         greatest(r.start_time, p.t0) s, least(r.finish_time, p.t1) f
  from roster_bookings r, p
  where r.status = 'Active' and r.start_time < p.t1 and r.finish_time > p.t0
    and r.member_name not ilike '%test only%'
),
j as (
  select pj.*, coalesce(nullif(pj.team, ''), paging_team(pj.unit)) t,
         coalesce(pj.dispatched_at, (pj.job_date + pj.job_time) at time zone 'Australia/Adelaide') ts
  from paging_jobs pj, p where pj.job_date between p.d0 and p.d1
)
select json_build_object(
  'from', (select d0 from p), 'to', (select d1 from p),
  'roster', (select json_agg(x order by x.team, x.hrs desc) from (
      select team, member_name name, max(lvl) lvl, count(*) shifts,
             round(sum(extract(epoch from (f - s)) / 3600)::numeric, 1) hrs
      from b group by 1, 2) x),
  'jobs', (select json_agg(x order by x.ts) from (
      select j.t team, j.job_no, j.ts, j.job_type type, j.priority,
             (select json_agg(distinct r.member_name) from roster_bookings r
               where r.status = 'Active' and r.team = j.t and r.clinical_level <> 'PARA'
                 and j.ts between r.start_time and r.finish_time) on_roster
      from j where j.t in ('Coffin Bay', 'Cummins', 'Tumby Bay', 'Port Neill')) x),
  'training', (select json_agg(x order by x.date, x.team) from (
      select s.session_date date, to_char(s.start_time, 'HH24:MI') time, g.name team, s.topic,
             s.facilitator_name lead,
             (select string_agg(l.title, '; ') from lessons l
               where l.id = s.lesson_id or l.id = any(coalesce(s.lesson_ids, '{}'))) lessons,
             (select json_agg(coalesce(pr.full_name, '?')) from attendance a left join profiles pr on pr.id = a.member_id
               where a.session_id = s.id and a.attended) came
      from sessions s join groups g on g.id = s.group_id, p
      where s.session_date between p.d0 and p.d1 + 35
        and g.name in ('Coffin Bay', 'Cummins', 'Tumby Bay', 'Port Neill')) x)
) data;
