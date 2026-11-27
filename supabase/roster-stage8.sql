-- Stage 8 of the Supabase roster move: tidy up (28 Nov 2026, owner: "can you do stage 8 now?").
-- Applied by Claude as migration roster_stage8_stop_sync.

-- Every team books in roster_shifts, so the 2-hourly copy of the old Google Sheets stops.
-- roster_bookings stays as a read-only archive of the sheet era (volunteer hours before the switch still read it).
select cron.unschedule('roster-sync');
comment on table public.roster_bookings is 'Archive: copy of the old Google Sheet rosters, frozen 28 Nov 2026 (stage 8). Every team books in roster_shifts.';

-- NOT yet done: the confirmation prompt got no answer (owner on the phone). Run when the owner can approve it.
-- Nothing calls it: the volunteer-hours page uses member_contribution_v2.
-- drop function if exists public.member_contribution(timestamptz, timestamptz);
