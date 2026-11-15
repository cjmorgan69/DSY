# Lead instructor dashboard

`/dashboard/`, `/dashboard/wide/`, `/dashboard/contribution/`, tasks and the Siri quick add.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## Lead instructor dashboard

Lead instructor dashboard (`/dashboard/`, 13 Nov 2026, leader gate; link in the home page leader links): live clock
and date (Adelaide), roster today (all three clusters' Apps Script `coverage`, same as
`/modules/rosters/operations/`, hourly heat grid with this hour outlined), training sessions (Supabase `sessions` +
`groups`, next session banner, count of sessions in the next 4 weeks with no lesson (`lesson_id` and `lesson_ids`
empty) linking to `/training/`, 4-week calendar), dispatch last 7 days (`paging_jobs`, mini roads like
`/dispatch/`), 7-day weather (Open-Meteo, town chips, hot-and-windy flag pointing to CFS), DSY home and Google
Calendar buttons (calendar link set on the device). Live 13 Nov 2026 (PR #222). On shift (13 Nov 2026, owner): each
team's roster Apps Script `getBookings` (team list from `modules/rosters/shared/teams.js`) gives names, level,
flexibility code and finish time; shows who is on now, or at any hour square tapped; team names link to their roster
pages; equal-size squares (fixed table layout, names pinned when scrolling). Tasks panel (13 Nov 2026, owner):
shared leaders-only to-do list in Supabase `public.dashboard_tasks` (title, due_date, done, done_at, created_by; RLS
`is_leader()` for read/add/change/delete, anon has no access; SQL in `supabase/dashboard-tasks-setup.sql`, applied
by Claude 13 Nov 2026): add with optional due date, tick off, tap to edit, delete, overdue/soon tags, last 20 done
behind "Show done". Desktop: two columns (roster and dispatch left; tasks, training, weather right); phone order
roster, tasks, training, dispatch, weather. Shortcut tiles (13 Nov 2026, owner) below the Dispatch panel (left
column; on phones between Dispatch and Weather): Microlearning (`/microlearning/`) and Lessons
(`/training/#lessons`, shows the lesson count); the training app opens on its Lessons tab when the address ends in
`#lessons`. Widescreen version (`/dashboard/wide/`, 13 Nov 2026, owner; leader gate): same data in a cleaner desktop
look (Inter font, lighter weights, slim top bar with the shortcuts and clock, three columns: roster | dispatch and
weather | tasks and training); `/dashboard/` kept as the phone and tablet version, each links to the other in its
footer. Both pages share `dashboard/dash.js` (logic moved out of `/dashboard/index.html`; same element ids, each
page has its own CSS): bump its `?v=` tag in both pages when it changes. Dispatch tile (13 Nov 2026, owner): jobs
run by Port Lincoln (call sign PL) and Ceduna (CD) crews are hidden when the page loads, by crew not by town; a
button in the tile shows or hides them (not remembered). dash.js tag 20261113b. Siri quick add (13 Nov 2026, owner):
an iPhone Shortcut ("Hey Siri, DSY task") asks for the task aloud and POSTs it to the Supabase function
`quick_add_task(p_key, p_title, p_due)` (anon can call it; it checks the SHA-256 of the private key against
`public.quick_add_keys`, adds a row to `dashboard_tasks` with `source` = the key's label, max 20 a minute;
`quick_add_keys` is closed to everyone). The key is NEVER written in the repo (public): it lives only in the owner's
Shortcut; revoke with `update quick_add_keys set revoked_at = now() where label = 'siri'`. SQL in
`supabase/quick-add-setup.sql`, applied by Claude 13 Nov 2026 (the key row was inserted by hash only). The Shortcut
uses the short address of the Supabase edge function `task`
(`https://ekaodnbnpsuayvmxvxbm.supabase.co/functions/v1/task`, verify_jwt off, source in
`supabase/functions/task/index.ts`; JSON body `key` and `title`) because iOS would not take the long REST address
with the anon key in it. Next planned: a request portal (`/request/`) with an inbox panel and AI sorting on request.

## Volunteer contribution

Volunteer contribution (`/dashboard/contribution/`, 13 Nov 2026, owner; leader gate; linked from both dashboards):
per person, rostered hours (Active `roster_bookings`, past part only), shifts and jobs paged to their team while
rostered on (`paging_jobs`; includes jobs later cancelled or stood down, and the pager feed can't tell who turned
out), P1 count, tap for the job list; period (all, this month, last month, 30 or 7 days) and team chips; PARA
bookings (paramedic cover, placeholders like "LEP40") hidden unless ticked. Supabase function
`member_contribution(p_from, p_to)` and the views `paging_jobs_by_member(_detail)`, all security invoker (leaders
only through table RLS); SQL in `supabase/contribution-setup.sql`, applied by Claude 13 Nov 2026. `paging_jobs.team`
is blank for most jobs before 7 Nov 2026, so matching falls back to `paging_team(unit)` (TB, CU, PT, CF). Roster
history in Supabase starts 3 Nov 2026 (the sync keeps past bookings).
