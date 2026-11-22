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

## Retro car dash

`/dashboard/car/` (15 Nov 2026, the owner's just-for-fun idea; leader gate; linked from both dashboard footers): an
old-school instrument cluster (walnut panel, chrome-rimmed cream dials, ignition needle sweep on load). Its own inline
script reads the same live sources as `dash.js`: fuel = share of team-hours left in today's operational day with crew,
speedometer = crew on shift now (0 to 24), tacho = jobs in the last 24 h without Port Lincoln and Ceduna crews (red
from 6), tasks gauge = open tasks (green 0-5, amber 5-10, red 10-15), temperature = today's top for the chosen town
(tap to change; shares `dsy-dash-town`). Warning lights: low crew (cover under 25%), P1 in 24 h, overdue task, lessons
needed in the next 4 weeks, hot and windy day in 7, no signal (a source failed), lights (after 6 pm), all good.
Odometer = jobs in 7 days, trip = next training session, DSY FM radio cycles messages. Gauges link to their pages.

## All three clusters in volunteer contribution (16 Nov 2026)

Owner asked to toggle Lower Eyre / Central Eyre / West Coast on `/dashboard/contribution/` (Cluster chips above the
Team chips; team -> cluster from `modules/rosters/shared/teams.js`; remembered in `dsy-contrib-cluster`).
- Rosters: Lower Eyre is still copied into `roster_bookings` by the owner's scheduled run on their PC. The 8 Central
  Eyre and West Coast teams are copied by the Supabase edge function `roster-sync` (source
  `supabase/functions/roster-sync/index.ts`, verify_jwt on), run every 2 hours by pg_cron job `roster-sync`
  (`17 */2 * * *` UTC, pg_net call with the anon key; SQL in `supabase/roster-sync-setup.sql`). It saves each team's
  `getBookings` list as Active and marks Active rows that vanished as Cancelled, only from the earliest start the
  roster still returns (history kept). First run 16 Nov 2026: 163 bookings. Those rosters hold little history, so
  their hours start from mid-Nov 2026.
- Call signs (owner, 16 Nov 2026): CL Cleve, CW Cowell, KI Kimba, LK Lock, SB Streaky Bay, PK Port Kenny, WU Wudinna,
  EL Elliston (plus TB, CU, PT, CF) in `paging_team()`, and as team names and colours on `/dispatch/` and the
  dashboard dispatch tile. CO is NOT Cowell: it is the team leader call sign, the number
  being the person (CO81, CO85, CO86...); CO jobs are not matched to a team (shown as "Team leader" on the dispatch
  screens). Cowell = CW only: 88 jobs Jun to Nov 2026.
- The pager feed now covers all Eyre Peninsula postcodes (owner): the old "postcodes 5605, 5606, 5607, 5631" note on
  the dashboard was replaced.
- Later: move Lower Eyre's copy to `roster-sync` too so nothing depends on the owner's PC.

## Tasks are per leader (16 Nov 2026)

Owner: each Team Leader has their own task list. `dashboard_tasks` policies now allow a leader to read, add, change and
delete only rows where `created_by` = themselves (the column defaults to the signed-in user). `quick_add_keys.owner_id`
says whose list a key adds to; the Siri key belongs to the lead instructor, and `quick_add_task` writes
`created_by = owner_id`. The 3 existing tasks (all the lead instructor's) were given to them. Checked: the lead
instructor sees 3, Campbell 0; Siri still answers. SQL `supabase/tasks-per-leader.sql`, applied by Claude 16 Nov 2026.
Another leader who wants Siri needs their own key (a new `quick_add_keys` row with their `owner_id`).

## Google Calendar link per account (16 Nov 2026)

Owner asked that the calendar link be unique to each user. It is now saved in the private table `user_settings`
(`gcal_url`, https only, up to 1000 characters; each person reads and writes only their own row; it was briefly a
`profiles` column, moved because leaders can read every profile) instead of on the device, so it
follows the leader to any device and two leaders on one computer don't share it. `dash.js` moves an old on-device link
(`dsy-dash-gcal`) to the account once and removes it. Blank = Google Calendar for whoever is signed into Google.
Column added by Claude 16 Nov 2026.

## Relief cover (16 Nov 2026)

`/dashboard/relief/` (leader gate; linked from both dashboard footers). Owner: a leader can hand their access to a
relief Team Leader until an end date; Campbell and David can set up their own; relievers get Grant access and password
resets but NOT the leader's Google Calendar link. Table `public.leader_relief` (leader_id, reliever_id, starts_at,
ends_at, ended_at): only a real leader inserts, for themselves; no updates, `relief_end(id)` ends early (leader,
reliever or an all-clusters leader); readable by both people and all-clusters leaders. While active,
`covering_ids()` makes `is_leader()` and `is_facilitator()` true for the reliever, `my_cluster()` = the covered
leader's cluster, `can_edit_cluster()` / `can_edit_group()` allow the covered cluster, and the tasks policies include
the covered leader's tasks. Guards: only a real leader can change leader roles (trigger `protect_profile_leader_role`)
or reset a leader's password (`leader_set_password`), only a real all-clusters leader can change clusters, and a
reliever can't hand cover on. `my_access()` returns role, real_leader, cluster and covering for the pages:
`shared/gate.js` (lets a reliever into leader pages), `/training/` (works as a leader, header "covering for", no
Role or Cluster settings), `dash.js` (banner, covered leader's tasks labelled with their name), car dash. SQL
`supabase/relief-setup.sql`, applied by Claude 16 Nov 2026; rehearsed in a rolled-back transaction (Chris -> Dave
Chapman): Dave got leader access and Chris's 3 tasks, was blocked from resetting Chris's password, making himself a
leader and handing cover on, could not read calendar links, and lost everything when the cover ended.
Search box above the relief Team Leader list (owner, 22 Nov 2026): filters by name or staff ID, picks the person when
only one matches (rebuilds the options; hidden options don't hide on iPhone Safari). Live (PR #311, merged 22 Nov 2026).
Training app and relief (owner, 22 Nov 2026): `/training/` loads the leader's own open covers; new leader-led nights
(one session or Set up training nights) whose start falls inside a cover get the reliever as facilitator (preview shows
"Led by"), and the session's Facilitator list adds current and coming relievers as "(relief team leader)". Existing
sessions are not changed. Live (PR #312, merged 22 Nov 2026).

## User guides and Ask DSY (17 Nov 2026, owner)

Owner asked for a user guide for the whole DSY system, Team Leader section first, and a help chat for Team Leaders only
on the dashboard (an AI helper, NOT leader-to-leader messaging: "we already have enough message medium").
- `/userguides/` (student gate): guides home with tiles; Getting started, Learning on your own and Running a session
  are shown as "Coming next" (not built). Shared styles `userguides/guide.css`.
- `/userguides/leaders/` (leader gate): the Team Leader guide, 14 sections (sign-in and cluster, dashboard panels, tasks
  and Siri, Ask DSY, crewing gaps, contribution, dispatch, relief cover, training app, Grant access and passwords,
  rosters, roster email settings, car dash, troubleshooting). Written by Claude from the pages and these notes: owner
  to review. Keep it true when a leader page changes: Ask DSY answers from it.
- Ask DSY panel on both dashboards (after Tasks; `dash.js`): question box, answers with links, last 6 turns kept on the
  page only, Start again. Edge function `ask-dsy` (`supabase/functions/ask-dsy/index.ts`, verify_jwt on, deployed v2):
  leaders only (`my_access().role = 'leader'`, so relief TLs too), reads the live leader and roster guides from
  dsytraining.com (30-minute cache), calls Google Gemini (owner's choice: their Gemini key is already a Supabase Edge
  Function secret; the function looks for GEMINI_API_KEY, GOOGLE_API_KEY, GOOGLE_GEMINI_API_KEY or GOOGLE_AI_API_KEY;
  models `gemini-flash-latest`, `gemini-flash-lite-latest`, `gemini-3.5-flash-lite` in turn when one is overloaded; the 2.5 models are closed to new accounts). Rules: guides only, no clinical answers, short, ends with the
  guide link. 40 questions per leader per 24 h. Log table `public.ask_dsy_log` (`supabase/ask-dsy-setup.sql`, migration
  `ask_dsy_log`, applied by Claude): a leader reads own rows, the lead instructor reads all, service role writes.
- Tested: signed-out calls refused; the panel in a headless browser with a stand-in answer (phone and wide). NOT yet
  tried with a real sign-in and the real Gemini key. Live (PR #254, merged 17 Nov 2026; guides and dashboard checked on
  the live site). The owner's Gemini key is in a different Supabase project: they are adding it to training-sessions as
  GEMINI_API_KEY.

## Suggestions panel (18 Nov 2026)

Owner asked for a place on the dashboard where the three Team Leaders suggest improvements. A "Suggestions" card on both
dashboards (phone: after Weather; widescreen: middle column under Weather): text, which part (Dashboard, Rosters,
Training app, Learning pages, Sessions and stations, Other), Send. Every leader (and anyone on relief cover) sees all
suggestions with name, part, date and status; the lead instructor (a real leader with no cluster,
`is_lead_instructor()`) sets the status (New, Planned, Done, Not now), replies and deletes; an author can withdraw
their own while it is still New. Table `public.platform_suggestions`; SQL `supabase/suggestions-setup.sql`, run by the owner in the SQL Editor 18 Nov 2026 (the apply_migration approval timed out three times, even after the owner edited the connector). Checked: a Team Leader can add one but not set its status, the lead instructor can set status and reply, a member sees none. Live: PR #265 (replaced #263), merged 18 Nov 2026.

## Ask DSY switched to Claude (18 Nov 2026, owner)

Owner: "I'd rather pay for reliable answers than use Google" (on 17 Nov Gemini Flash was overloaded, the 2.5 models are
closed to new accounts, and Flash-Lite answered a team question as if it were clinical). The owner made a Claude API
account and saved the key as the Edge Function secret `ANTHROPIC_API_KEY` in training-sessions. `ask-dsy` (deployed v10)
now calls Claude (`claude-opus-5-5`, low effort, server-side refusal fallback, guide text prompt-cached), timeout 60 s with
one retry. Error messages: key not working, out of credit, busy. Guide line now says answers are by Claude. The Gemini
secret is no longer used. Working with a real sign-in 18 Nov 2026 (owner).
- Fix (18 Nov 2026, deployed v11): the first three Claude questions failed with "Could not resolve authentication
  method": the Anthropic npm SDK 1.6.0 did not attach the key inside Supabase's Deno runtime (it did in Node). `ask-dsy`
  now calls the Messages API with a plain fetch and the `x-api-key` header (one retry on 429/529/5xx).

## Getting started guide (18 Nov 2026, owner)

`/userguides/start/`: for crews. OPEN (no gate; owner chose 18 Nov 2026 so people who cannot sign in yet can read it; on
the OPEN list in check.js). 8 sections: first sign-in (set up with ambulance ID, no starter password; pre-loaded crews
join their team), signing in, forgotten password and the sign-in error messages, home page, Learn on your own (4 steps),
Training sessions (Book a spot, Shared with you), roster (points to the roster guide), shared phones and privacy.
Linked from the guides home (first tile) and from `/signin/` ("Help with signing in"). `ask-dsy` (v12) reads it too.
Written by Claude from the pages: owner to review.

## Running a session guide (18 Nov 2026, owner)

`/userguides/run/` (facilitator gate): 9 sections: finding a topic on Run a session (categories, the two tile rows, "Not
made yet", glossary), before the night (student link, read the facilitator version, plan in /training/, gear),
walk-through (Facilitator / Student switch, break points, decision tiles, flash cards), case-night slides (arrows, Notes,
Presenter view, Full screen, Guide, feedback QR slide), MDT and PCR tiles (points to the MDT guide), stations (Before you
start, partner ticks, setup sheet, print pack), customiser (local details only), after the night (Feedback QR and link,
Feedback review, Team list ticks / Attendance), ground rules. Linked from the guides home and a "How to run a session"
panel at the bottom of Run a session. `ask-dsy` v13 reads it. Written by Claude from the pages: owner to review.

- Grant access link (owner, 19 Nov 2026): `/access/` added to the footer links of `/dashboard/` and `/dashboard/wide/`,
  after Roster emails; leader guide section 2 lists it. Merged (PR #283, 19 Nov 2026), checked live.

## Training month view (22 Nov 2026, owner)

`/training/` Calendar: on screens 900px or wider a Month / List switch (Month by default, choice kept on the device);
the month grid (Mon to Sun, Prev / This month / Next) uses the same cluster, team and leader/team filters. Click a session
to open it; drag it to a day to COPY it there (owner: a copy, not a move): a box asks which team the copy is for
(only teams you can change with no session that day; the original team is preselected when free). The copy keeps times,
lessons, topic, location and who leads; no bookings, attendance or reflection; a team-led copy for another team has no
facilitator. The session page has a Team field (teams you can change, not courses); bookings
and attendance stay with the session. Phones keep the list. On a branch, not merged.

## Team dashboard for Volunteer Team Leaders (owner, 22 Nov 2026)

`/dashboard/team/` (gate `vtl`; own script `dashboard/team/team.js`, styles copied from `/dashboard/`). Roster today
and Dispatch show EVERY team, the same as the Team Leader dashboard (owner, 22 Nov 2026: "broader situational awareness";
those two sections are copied from `dash.js`: keep them in step), except the dispatch note does not point to `/dispatch/`
(leaders only). Volunteer contribution (`team_contribution`, This month / Last month / 30 days / All, PARA hidden unless
ticked) and Training (the team's sessions for 2 months) are the VTL's own team only. Weather starts on the team's town.
Only the VTL's own team name links to its roster (owner, 22 Nov 2026); other team names are plain text. No footer links, tasks, Ask DSY or suggestions. A leader sees a team picker to preview any team. Linked from the VTL's Team Page. Access details in `access.md`. Tested in a headless browser
with stand-in sign-in data (phone and wide). Live (PR #320, merged 22 Nov 2026), checked on the live site.

## Training app: Attending? (22 Nov 2026)

Members' session rows no longer say Book a spot / Cancel. Each shows **Attending?** with two buttons, "Yes, absolutely! 😀" and
"Sorry, not this time 😢" (owner's wording); tap the other to change. Both stay pale until answered. Stored in `bookings.status`
(`booked` = yes, `cancelled` = not this time; no schema change to the table). Leaders see "n coming" and "n not coming" chips and a
Coming / Not this time chip per person in Attendance; `session_roster()` now also returns `not_coming` for the facilitator's Team
list. Members can still just turn up. User guides (Getting started, Running a session) updated. Live (PR #323, merged 22 Nov 2026).

## Training app: Open lesson links (22 Nov 2026)

Session screen in the leader / VTL calendar: each chosen lesson has an **Open lesson** link (first web link in the lesson's
Resources and links). Member list: on sessions you are facilitating, an Open lesson link under the chips (one per lesson,
named, when there are several). `upcoming_sessions` view now adds `url` to each item in `lessons` (same regex). All 66
lessons had a link on 22 Nov 2026. Live (PR #325, merged 22 Nov 2026).

## Reminders: one switch for the whole site, and training session reminders (22 Nov 2026)

Owner: one reminder switch for the whole DSY platform. App notification 12 hours before each training session to the
members of the session's team who turned reminders on, except those who answered "Sorry, not this time". Title
"<Team> training today, 7:00 pm"; body "<lesson titles or topic>. Led by <facilitator>. 7:00 pm to 9:00 pm at
<location>. Tap to say if you're coming." (wording is Claude's draft). The roster reminder is unchanged.
- One switch: `/shared/reminders.js` draws "🔔 Turn on reminders" (Send a test / Turn off) into any
  `<div class="dsy-reminders">`: on the main page (signed in only), Team Training (under the header) and every roster
  page (under the name, replacing the roster-only controls), and the Team page. Service worker `/sw.js` (scope "/").
- Home Screen (owner, 22 Nov 2026): the one **DSY Training** icon is the Team page (`/dsy.webmanifest`, start_url and
  id `/teams/`, scope "/", linked from `/teams/` only). From the Team page people can save their own shortcuts to
  Training schedule, Your roster or Learn on your own (roster pages keep `roster.webmanifest`; training and home have
  none). On iPhone each icon is its own app, so reminders are turned on in the DSY Training icon.
- Devices: `roster_push_subs.sw_scope` ('/' whole site, '/modules/rosters/' older roster-only). `push_devices()`
  sends to a person's whole-site devices if they have any, else their roster ones (no doubles). A roster-only device
  counts as on, is moved to the whole-site worker quietly on the next page load when the phone allows, and Turn off
  removes both. Roster reminders on a whole-site device open the team's `groups.roster_url`.
- Edge function `roster-remind` (v6, 22 Nov 2026): modes `sessions` and `test` + `kind: "dsy"`.
- SQL: `supabase/session-reminders.sql` (migration `session_reminders`: `sessions.reminded_at`, cleared when the date
  or start time changes; `session_reminder_claim()`) and `supabase/dsy-reminders.sql` (migration
  `dsy_reminders_one_switch`). Both applied.
- pg_cron job `session-remind` every 10 minutes: created 22 Nov 2026 on merge. Live (PR #326, merged 22 Nov 2026);
  first reminders due Mon 23 Nov 7:00 am (Tumby Bay, Port Neill).
- Not yet tried on a real phone (headless Chrome has no push service): owner to turn it on and Send a test.
- DSY Training icon (owner, 22 Nov 2026): a side-on ambulance in the SAAS look (white, yellow and green check band,
  red and blue roof lights) on a green background, drawn by Claude; no SAAS logo or name. Source
  `shared/dsy-app-icon.svg`, PNGs `shared/dsy-app-180/192/512.png` (Team page apple-touch-icon, `/dsy.webmanifest`,
  notification icon in `/sw.js`).
