-- Roster copy for Central Eyre and West Coast (16 Nov 2026). Applied by Claude 16 Nov 2026.
-- 1. Call sign letters -> team (owner, 16 Nov 2026), used to match pager jobs to rostered crews.
create or replace function public.paging_team(unit text)
returns text language sql immutable set search_path to ''
as $$
  select case upper(left(unit, 2))
    when 'TB' then 'Tumby Bay'   when 'CU' then 'Cummins'     when 'PT' then 'Port Neill' when 'CF' then 'Coffin Bay'
    when 'CL' then 'Cleve'       when 'CO' then 'Cowell'      when 'CW' then 'Cowell'      when 'KI' then 'Kimba'      when 'LK' then 'Lock'
    when 'SB' then 'Streaky Bay' when 'PK' then 'Port Kenny'  when 'WU' then 'Wudinna'    when 'EL' then 'Elliston'
  end
$$;

-- 2. Every 2 hours (at 17 past, UTC) call the edge function roster-sync (supabase/functions/roster-sync), which copies
--    the 8 Central Eyre and West Coast rosters into public.roster_bookings. The key below is the public anon key.
create extension if not exists pg_cron;
create extension if not exists pg_net;
select cron.schedule('roster-sync', '17 */2 * * *', $job$
  select net.http_post(
    url := 'https://ekaodnbnpsuayvmxvxbm.supabase.co/functions/v1/roster-sync',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYW9kbmJucHN1YXl2bXh2eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxMzQsImV4cCI6MjEwNzM0ODEzNH0.q3lTeCQAQjYeMUNl6lwsrxUAsTijJikABW4Ua2N4bmI'),
    body := '{}'::jsonb,
    timeout_milliseconds := 120000)
$job$);
-- Stop it: select cron.unschedule('roster-sync');
