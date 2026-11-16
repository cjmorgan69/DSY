# Rosters

The three cluster Apps Scripts and the owner's decisions for moving rostering to Supabase.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## Roster backend and the planned move to Supabase

Roster backend (15 Nov 2026, owner): the three cluster Apps Scripts (Lower Eyre, Central Eyre, West Coast; one
Google Sheet each) now run ONE shared file, master copy `modules/rosters/backend/Code.gs` (public repo: no sheet
IDs, emails or passwords in it). Per-cluster settings are Script Properties: `SHEET_ID` (Central was once set to
West Coast's by mistake: check the dashboard team names after any change), manager/area/Country Rostering emails,
manager passwords. Keep its operational restriction rules in step with `getOperationalStatus` in
`modules/rosters/shared/roster.js`. Country Rostering change emails show the crew's operational restriction for the
hours affected below the shift times ("will be B" / "remains unchanged"), no flexibility, no code in the subject
(owner's wording; owner has asked Country Rostering for comments). To change: edit the master, the owner pastes it
into all three scripts and deploys a New version. Later plan: move rostering to Supabase, with notification
addresses on a leaders-only settings page. Decisions for that move (owner, 15 Nov 2026; nothing changes for crews
until it is ready): emails from a generic address on dsytraining.com via a sending service (now the owner's personal
Gmail); clusters: tag all 12 teams (only the 4 Lower Eyre teams are `groups` so far) to Lower Eyre, Central Eyre or
West Coast, link each cluster's Team Leader to it and the operations manager to all, leader views default to their
own cluster with an All clusters switch, leaders can view but NOT edit other clusters' training sessions (owner),
dispatch call-sign prefixes for all 12 teams, a "live from" date per cluster (blank = trial: data collected and
shown but marked trial and left out of combined totals; the owner sets the date later, no code change; all three
clusters move to the Supabase roster together; until a cluster is live its change emails go to a manager trial
address marked TRIAL, never to Country Rostering, and crews are not asked to phone Country Rostering (owner). Today
the Central Eyre and West Coast scripts have no Country Rostering address set, so nothing goes there); data model:
access list -> person (ambulance ID, clinical level on the person, role) -> team -> cluster, with roster shifts,
training attendance and course records linked by ID and dispatch by team and time; roster pages get sign-in,
bookings default to the signed-in person (name, ID, level pre-filled), managers pick a team member from a list, a
separate "Not on the list" option takes a free-text name for paramedics, LEP40 and other outside crew (no ID,
excluded from volunteer hours), old typed-name bookings matched to people once with doubtful ones shown to the
owner. Planned order: a whole-repo health check thread (report first, no changes), then the Supabase roster thread.

## Supabase roster move: staged plan and decisions (15 Nov 2026)

Plan agreed with the owner on 15 Nov 2026. NOTHING BUILT YET. Stages: 1 database foundation (clusters, 12 teams,
call-sign prefixes, live-from date, roster tables, booking rules in the database); 2 people (accounts for Central
Eyre and West Coast crews, clinical level on the person); 3 email (sending service on dsytraining.com, leaders-only
settings page, all TRIAL-addressed); 4 new roster on the test team (Summer Bay) only; 5 import rehearsal from the
three sheets and one-off name matching; 6 dashboards (manager, operations, coverage gaps, lead dashboard) rebuilt
beside the current ones and compared; 7 switch day, all three clusters together, sheets left untouched so going back
is one line per cluster in `teams.js`; 8 tidy up (stop the daily PC copy, archive the Apps Scripts, sheets read-only).

Owner's decisions (15 Nov 2026):

- Lower Eyre's "live from" date is set on switch day (it already emails Country Rostering); Central Eyre and West
  Coast start as trial.
- Manager passwords go: a manager is a signed-in person with a manager role for their team.
- "Must change password" is enforced in the database in stage 2, before more accounts are made.
- A Team Leader (TL) must be able to enter someone else on the roster, and to enter placeholders such as "LEP40"
  (the "Not on the list" free-text entry: no ID, excluded from volunteer hours). Claude's reading, not yet confirmed
  by the owner: placeholders are for TLs and managers only, and the page also gets a "Not you? Switch person" step
  for shared devices.

Still needed from the owner before stage 1: call-sign prefixes for the 12 teams, the TL for each cluster and the
operations manager, the managers for each team. The manager dashboard file (`getManagerDashboard`) is not in the
repo: the owner pastes it for stage 6.

Names (owner, 16 Nov 2026): every shift, hour and record is keyed to the ambulance ID (`profiles.staff_id`), never
a name. Each person may set a preferred name in the roster app (blank = full name); a change shows on all past and
future shifts. The team roster shows the preferred name only; the ambulance ID is NOT shown on the roster. Managers,
TLs and the change log see full name and ID beside it. The roster sent to Country Rostering and the change emails use
the FULL name. The ambulance ID appears ONLY on the roster document prepared for Country Rostering, beside the full
name (owner, 16 Nov 2026); not on the team roster or the change emails. Placeholders (LEP40 etc.) stay free text with no ID.

Stage 1 inputs (owner, 16 Nov 2026):

- Call-sign letters: already on main from the dashboard thread (CLAUDE.md, `paging_team()`): TB, CU, PT, CF, CL, CW,
  KI, LK, SB, PK, WU, EL. CO is the team leader call sign, not a team.
- Clusters and leaders: already on main (`groups.cluster`, `profiles.cluster`, `my_cluster()`, `can_edit_group()`,
  relief cover). Campbell Forsyth (1002112) Central Eyre, David Coombe (1002517) West Coast, the lead instructor
  (1003463, cluster blank = all clusters) Lower Eyre and proxy operations manager for now.
- Lower Eyre roster managers: Cummins John Treloar (900469), Port Neill Christine Snowden (400928), Coffin Bay Kaye
  Ferguson (400534), Tumby Bay the lead instructor (1003463). Central Eyre and West Coast managers: not yet known.
- Central Eyre and West Coast rosters are already copied into `roster_bookings` every 2 hours by the edge function
  `roster-sync`; Lower Eyre still by the owner's PC run.

## Stage 1 done (16 Nov 2026): database foundation, applied by Claude; notes and SQL on main (PR #244, merged 16 Nov 2026)

SQL `supabase/roster-stage1.sql` (migration `roster_stage1`), rehearsed first in a rolled-back run with 23 checks
(owner, a Port Neill manager and three Tumby Bay members). Nothing on the roster pages uses it yet; the Apps Scripts
still run every roster. Added:

- `profiles.preferred_name` and `profiles.clinical_level`, both self-editable (owner, 16 Nov 2026: clinical level
  self-edited too). `groups.call_sign` (TB, CU, PT, CF, CL, CW, KI, LK, SB, PK, WU, EL).
- `roster_clusters.live_from` (all blank = trial; only the all-clusters leader can set it). `roster_managers`
  (the 4 Lower Eyre managers; cluster leaders can add or remove; Central Eyre and West Coast leaders count as
  managers for their teams until names are given).
- `roster_shifts` (person by account, or a placeholder name; level and flexibility stored on the shift),
  `roster_sent` (cut-off), `roster_messages`, `roster_change_log`.
- Functions for the pages (signed-in only, never anon): `roster_book` (self; another member or a placeholder only
  for managers and leaders), `roster_edit`, `roster_cancel`, `roster_set_sent`, `roster_reset_sent`,
  `roster_post_message`, `roster_delete_message`, `roster_list` (preferred name for crew; full name and ID only for
  managers and leaders), `roster_team_members`, `roster_messages_list`, `roster_team_status`, `roster_op_code_at`.
  Same rules as Code.gs: whole Adelaide hours, 1-24 clock hours, no past starts, 3 people and 1 recruit an hour, no
  self-overlap in a team, cut-off forward only, safe to repeat. `roster_op_code` is a third copy of the operational
  restriction rules: keep it in step with roster.js and Code.gs.
- Choices Claude made, told to the owner: cancel and change are now own shift or manager/leader (today anyone on the
  page can cancel any booking); notes are not pruned (the list shows the latest 500).

Clinical level at booking (owner, 16 Nov 2026; applied by Claude, migration `roster_book_saves_level`): crews set
their level on the booking form, as they do now (today it is saved in the browser). The level chosen on the form is
used for that shift; booking for yourself saves it to your account, so it is pre-filled next time on any device.
Earlier shifts keep the level they were booked at. A first booking with no level is refused. So the stage 2 lists
only need ambulance ID and name (level optional). Rehearsed in a rolled-back run first.

Email sender name (owner, 16 Nov 2026): unique to each team, "<Team> Team Roster" (e.g. "Tumby Bay Team Roster",
"Port Kenny Team Roster"), replacing "Crew Shift Roster". Sending address on dsytraining.com: not chosen yet.
Email decisions (owner, 16 Nov 2026): sending address EProsters@dsytraining.com (owner changed it from roster@ later on 16 Nov 2026); Reply-To = that team's roster
manager; trial address = the owner's personal Gmail (goes in the Supabase settings in stage 3, never in this public
repo). Still to do by the owner, at a computer: Resend account, DNS records in Cloudflare (dsytraining.com is on
Cloudflare and has no email records yet), RESEND_API_KEY as a Supabase Edge Function secret.

Sending the roster to Country Rostering (owner, 16 Nov 2026), planned for stage 4: a "Send roster to Country
Rostering" button (preview, then the system builds the PDF with full names and IDs, emails it from "<Team> Team
Roster" <EProsters@dsytraining.com> with the manager copied and Reply-To the manager, sets the sent cut-off in the
same step, and keeps the PDF in the change log; Print stays as a backup). Then a weekly scheduled send per team that
does the same at a set time, so later changes follow the existing rules (more than 24 h away: change email to
Country Rostering; within 24 h: the person is asked to phone). Trial clusters send to the trial address only. The
owner is checking that Country Rostering accept rosters from EProsters@dsytraining.com. Still to decide: send day and
time, the period each send covers, a reminder to the manager beforehand, pausing a week, same for all teams or not.
Schedule decisions (owner, 16 Nov 2026): each team's manager sets up its own schedule in Manager controls ("Schedule
set-up": send day and time, period covered, default 7 days but the manager can change it, pause, skip a week, send
early). Tumby Bay (the owner's team) is the first to use it. Idea raised by the owner: a message to every team member
24 hours before the cut-off to check their availability, listing the open gaps. Decided (owner, 16 Nov 2026): web
push app notifications first (roster page installable as a Home Screen app with a "Turn on reminders" button; iPhone
needs iOS 16.4+ and the Home Screen icon; free), planned for stage 4 with the scheduled send. SMS (ClickSend or
MessageMedia, opt-in, own mobile number) only if too few people turn notifications on.

## Stage 3 done (16 Nov 2026): roster emails, applied by Claude

- Resend account and the dsytraining.com DNS records in Cloudflare set up by the owner; the key is the Supabase Edge
  Function secret `RESEND_API_KEY` (never in the repo).
- SQL `supabase/roster-stage3.sql` (migration `roster_stage3_email`), rehearsed first in a rolled-back run:
  `roster_contacts` per cluster (trial, area manager, Country Rostering, CC; leaders only), `roster_managers.notify_email`
  (hidden from crews), `roster_email_queue`. `roster_book` / `roster_edit` / `roster_cancel` queue a change email when
  the shift is before the team's sent cut-off, with the hour-by-hour restriction before and after (to the cut-off).
  A trigger wakes the edge function; pg_cron job `roster-email-retry` (every 15 min) retries anything unsent, 3 tries.
- Edge function `roster-email` (`supabase/functions/roster-email/index.ts`, verify_jwt on): same rules and wording as
  Code.gs. Live: Country Rostering only if the shift is more than 24 h away (Reply-To the team managers, optional CC),
  then one alert to the team managers and area manager. Trial (no live date, or before it): one email to the trial
  address only, subject "TRIAL — ...", showing what Country Rostering and the managers would get. Never emails Country
  Rostering twice.
- Trial address for all three clusters: the owner's personal Gmail (in Supabase only). Live dates, area manager,
  Country Rostering and manager emails still blank: fill on the settings page before a cluster goes live.
- `/dashboard/roster-settings/` (leader gate; "Roster emails" link in both dashboard footers): addresses per cluster,
  manager emails, add or remove team managers, "Send a test email", the live-from date (lead instructor only), and
  the last 15 roster emails with any error.
- Tested 16 Nov 2026: a test email and a sample TRIAL change email for Tumby Bay sent through Resend; the owner
  confirmed both arrived and look good. On main (PR #245, merged 16 Nov 2026); the settings page is live.
- Nothing calls this from the live roster pages yet: the change emails start with the new roster page (stage 4).

## Stage 4a (17 Nov 2026): the roster page on Supabase for the test team, Summer Bay

- `modules/rosters/shared/roster-supabase.js`: answers the same requests as the Apps Script (same shapes) from
  Supabase, for any team with `backend: "supabase"` in `teams.js` (only `test` = Summer Bay so far). Its page
  (`lowereyre/test/`) loads gate.js (student), supabase-js and the adapter before `roster.js`.
- `roster.js` changes are all behind `ROSTER_BACKEND`: requests go to the adapter; manager passwords are not asked
  (`askManagerPassword`); the name box is replaced by the signed-in person, or for managers and leaders a "Booking
  for" list (Me, each team member, "Not on the list…" with a free-text box for placeholders such as LEP40); own
  notes get Delete; the PDF window marks the roster sent with the manager's sign-in. Real team pages are unchanged.
- Names: unique per page; a second person showing the same name gets "(2)". "Change the name shown" saves
  `profiles.preferred_name`; "Not you? Switch person" signs out to `/signin/`. Manager controls are hidden for crew.
- While trial, nobody is told to phone Country Rostering (owner's decision).
- SQL `supabase/roster-stage4a.sql` (migration `roster_stage4a_test_team`, applied by Claude): group type `test`
  (Summer Bay, cluster Lower Eyre, the lead instructor as member and manager), `roster_me(team)`,
  `roster_snapshot(group, from, to)`, `roster_book` accepts test teams. The email function treats a test team as
  always trial (deployed, version 2).
- Tested with a stand-in database in a headless browser (book self, book another member, placeholder, cancel, post
  a note, crew view) and the database functions as the owner in SQL. NOT yet tried with a real sign-in: owner to try.
  On main and live (PR #246, merged 17 Nov 2026); real team pages checked still loading from the Apps Scripts.
- Still to build in stage 4: Send roster to Country Rostering (PDF, full names and IDs), Schedule set-up, the
  24-hour app-notification reminder, then moving the real teams (stage 7).
- Fix (17 Nov 2026, owner's first try): the Country Rostering PDF view showed the preferred name. It now shows
  "Full Name (ambulance ID)" for each person (placeholders as typed), as decided on 16 Nov; the team roster still
  shows the preferred name.
  On main and live (PR #247, merged 17 Nov 2026). The owner's account full name was changed from "Chris" to
  "Chris Morgan" at their request (17 Nov 2026).

## Stage 4b (17 Nov 2026): Send roster to Country Rostering, pretend-live switch (test roster only so far)

- Manager controls on a Supabase roster get "Send roster to Country Rostering": first roster day (defaults to where
  the last sent roster ended, else today), number of days (7; 1 to 28), Preview (period, who it goes to, "Open the
  PDF"), then Send now. Print from the PDF view stays as the backup.
- Edge function `roster-send` (`supabase/functions/roster-send/index.ts` and `pdf.ts`, verify_jwt on, deployed):
  runs as the signed-in manager (`roster_send_prepare` refuses anyone else), builds the PDF with pdf-lib (same
  layout and Op colours as the PDF view: 7 roster days a sheet, two pages, "Full Name (ID) (level)", placeholders as
  typed; long names are shortened, ID and level always kept), emails it from "<Team> Team Roster" with the PDF
  attached, keeps a copy in the private Storage bucket `roster-sent`, moves the sent cut-off to the end of the
  period (never backwards) and writes "Roster sent to Country Rostering" to the change log. Live: to Country
  Rostering, copy to the CC address and the team managers, replies to the managers. Trial or test team: only the
  trial address, subject "TRIAL — ...", PDF stamped "TRIAL - NOT AN OFFICIAL ROSTER".
- The email wording to Country Rostering is Claude's draft: owner to review.
- SQL `supabase/roster-stage4b.sql` (migration `roster_stage4b_send`, applied by Claude).
- Pretend live (owner, 17 Nov 2026): on the test roster only (`testTeam` in teams.js), managers get "Pretend this
  roster is live (test only)" under their name. It only changes the messages shown (emailed / phone Country
  Rostering); emails still go to the trial address. Remembered on the device.
- Saved roster dropped for Supabase rosters (owner, 17 Nov 2026: it was there because the Apps Script was slow):
  the test team's feature list leaves out `savedRoster`. Apps Script teams keep it until they move.
- Tested: PDF built locally and read back; `roster_send_prepare` as the owner in SQL; the function refuses a
  signed-out caller; the page flow in a headless browser with a stand-in database. NOT yet sent with a real sign-in.
- Still to build in stage 4: Schedule set-up (weekly send, pause, skip), the 24-hour app-notification reminder.
- Stage 4b is on main and live (PR #248, merged 17 Nov 2026); real team pages checked still loading.

## Stage 4c (17 Nov 2026): Schedule set-up (test roster only so far)

- Manager controls get "Schedule set-up": Send every [weekday] at [hour], Roster starts on the next [weekday],
  Number of days (7), Save and switch on / Save changes, Pause, Skip the next send (and undo). It shows the next
  send with the period it will cover, and how the last one went. "Send early" is the Send now button.
- The period continues from where the last roster sent finished (the cut-off) if that is still ahead; otherwise it
  starts on the chosen weekday after the send day.
- SQL `supabase/roster-stage4c.sql` (migration `roster_stage4c_schedule`, applied by Claude): `roster_schedules`,
  `roster_schedule_get/save/skip` (managers and leaders), `roster_schedule_claim/done` and `roster_send_data`
  (service role only), pg_cron job `roster-schedule` (hourly at :02, only calls out when something is due).
  A failed send is retried each hour, three tries, then waits for next week; the result shows on the panel.
- Edge function `roster-send` version 2: `mode: "scheduled"` (takes no input from the caller, so calling it early
  or twice sends nothing extra). Scheduled emails are signed "<Team> Team Roster" and say they were sent by the
  weekly schedule.
- Owner asked (17 Nov 2026) for no "dsytraining.com" in the email footer: removed from the roster email. (It is
  still in the small print on the PDF and in the leaders' test email.)
- Tested end to end on Summer Bay, 17 Nov 2026: a due schedule sent the TRIAL email with the PDF to the trial
  address, moved the cut-off to Wed 2 Dec 08:00, kept the copy and wrote the change log. That test schedule was then
  switched off (Summer Bay shows "Paused", Thursday 12:00, starts Monday, 7 days). Page tested in a headless
  browser with a stand-in database.
- Still to build in stage 4: the 24-hour app-notification reminder.
- Stage 4c is on main and live (PR #249, merged 17 Nov 2026). The owner then set a Summer Bay schedule themselves.

## Stage 4d (17 Nov 2026): 24-hour reminder as an app notification; Manager controls tidied (test roster only so far)

- Each person taps "🔔 Turn on reminders" under their name (per device; then "Send a test" and "Turn off"). On
  iPhone the roster must first be added to the Home Screen (iOS 16.4+), then opened from the icon and signed in
  again there; the page explains this when tapped in plain Safari. Android Chrome works in the browser.
- Page pieces: service worker `modules/rosters/sw.js` (scope `/modules/rosters/`, shows the notification and opens
  the roster; caches nothing), `shared/roster.webmanifest`, `shared/roster-icon-180/192/512.png`, manifest and
  Home Screen tags on the test page. Real team pages get these tags when they move.
- Edge function `roster-remind` (verify_jwt on, deployed): `scheduled` (hourly pg_cron job `roster-remind` at :04,
  only when a send is within 24 hours): once per send, a notification to the team's members who opted in:
  "The roster goes to Country Rostering Thu 12:00. No crew yet: Mon 18:00 to Tue 08:00, ... and N more. Can you
  help?" (wording is Claude's draft). `test`: to the caller's own devices. `key`: returns the public key. Devices
  the push service reports gone are removed. Signing (VAPID) keys are made by the function on first run and kept
  in `roster_push_keys` (service role only; not in the repo).
- SQL `supabase/roster-stage4d.sql` (migration `roster_stage4d_reminders`, applied by Claude): `roster_push_subs`,
  `roster_push_keys`, subscribe / unsubscribe / mine, `roster_reminder_claim`, `roster_schedules.remind` and
  `reminded_for`. Schedule set-up has a tick "Remind the team 24 hours before" (on by default) and shows how many
  people have reminders on. A reminder needs the schedule switched on (it is tied to the scheduled send).
- Tested: the function signed, encrypted and sent to Google's push service for a made-up device, was told it was
  gone and removed it; the claim ran once per send; page controls in a headless browser. NOT yet tried on a real
  phone: owner to turn reminders on and tap "Send a test".
- Manager controls (owner, 17 Nov 2026): on Supabase rosters the "Open Country Rostering PDF view" button and its
  instructions are hidden (managers no longer email the roster themselves), and "Send roster to Country Rostering"
  and "Schedule set-up" are fold-out sections, closed until tapped. Team hours, Booking list, Edit sent cut-off and
  Reset sent status stay. Apps Script teams keep the old arrangement until they move.
- Stage 4 is complete on the test roster. Next: stage 2 (people for Central Eyre and West Coast), stage 5 (import
  rehearsal), stage 6 (dashboards), stage 7 (switch day).
- Stage 4d is on main and live (PR #250, merged 17 Nov 2026); service worker, manifest and icons checked on the
  live site; real team pages checked still loading from the Apps Scripts.
- Reminders confirmed on the owner's iPhone (17 Nov 2026): Apple accepted the notification and it was in
  Notification Centre; the banner was hidden by a Focus (it was 3 am). Follow-up: the service worker no longer sets
  a notification `tag` (a same-tag replacement arrives silently on iPhone), and the "Send a test" message tells
  people to look in Notification Centre if a Focus is on.

## Crewing gaps for Team Leaders (16 Nov 2026, owner)

- Grown from the Tumby Bay + Cummins trial (`lowereyre/coverage-gaps/` and `coverage-gaps-6h/`, PR #201, still on
  main, not linked; they keep the Port Lincoln paramedic matching and the "Email the operations manager" draft,
  which apply to Lower Eyre only).
- Owner's decision: a generic step one back. The page only identifies the gaps; each Team Leader sets their own
  rules and decides what to do with a gap (paramedic or other support).
- `/dashboard/coverage/` (leader gate; "Crewing gaps" link in both dashboard footers). Rules per leader, in groups:
  teams checked together, minimum crew across the group (1 to 8), each level (PARA, AO, AR, AA, REC) set to Counts /
  Only with a counted person in the same town / Doesn't count, and the shortest gap listed (any, 1, 2, 3, 4, 6, 8 or
  12 h). A new group starts with the trial's rule: minimum 2, PARA/AO/AR count, AA only with one of those in the
  same town, REC doesn't count, gaps of 6 h or more. A cluster's leader picks from their own cluster's teams; the
  all-clusters leader from all 12.
- Shows, per group, 8 days from the chosen date: gap count and hours, a bar per day, each gap with how many were
  booked and who, towns with nobody counted in their own right (groups of two or more teams), and "Copy as text".
  Gaps are joined across shift changes and midnight; gaps already finished are left out. No paramedic matching and
  no email.
- Data: each team's live `getBookings` (Apps Script), like the trial. To move to the Supabase roster with the other
  dashboards in stage 6.
- Rules table `public.coverage_rules` (`supabase/coverage-rules-setup.sql`): own row only; a relief Team Leader can
  read the rules of the leader they cover.
- Tested in a headless browser with stand-in rosters and database. On a branch, not merged. The table is NOT yet in
  Supabase: the owner's approval prompt for the migration timed out.
