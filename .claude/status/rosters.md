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
  On main and live (PR #251, merged 17 Nov 2026). Stage 4 is complete on the Summer Bay test roster.

## Stage 5 rehearsal (17 Nov 2026): name matching

- The owner gave the three sheet links (17 Nov 2026; IDs kept out of this public repo, they are in the
  conversation only): Lower Eyre "Bookings", "Central Eyre Bookings", "West Coast Bookings", each with tabs
  Bookings, Change Log, Messages, Teams. Claude can read them through the Google Sheets connector.
- The Supabase copy `roster_bookings` already holds every team's ACTIVE bookings back to Sept 2026, so the import
  runs inside the database from that copy. Only in the sheets: cancelled bookings (not needed) and the Change Log
  (stays in the sheets as the archive unless the owner wants it copied).
- `roster_import_names` + `roster_import_match()` (migration `roster_stage5_import_rehearsal`; notes in
  `supabase/roster-stage5-rehearsal.sql`). First run: Lower Eyre 37 names sure (459 shifts), 6 to check
  (68 shifts), 20 unmatched (93 shifts, about half are placeholders such as LEP40 and CO85). Central Eyre and West
  Coast: almost nothing matches yet (56 unmatched names) because those crews have no accounts (stage 2).
- The old alias list points at spellings that no longer match the account names (e.g. Cathy / Catherine Haarsma),
  so those came out as "check" or "none". The doubtful Lower Eyre names were put to the owner on 17 Nov 2026:
  decisions not yet given. Nothing has been copied into `roster_shifts`.
- Owner's decisions on the Lower Eyre names (17 Nov 2026, "all yes"), applied by Claude: 15 typed names accepted
  as their accounts (Bernadette = Bernie Crettenden, Cathy Haarsma / Harrsma = Catherine Haarsma, David = Dave
  Chapman, Midge = Michelle Guidera, Fi = Fiona Dahlitz, Vicky DeVries = Victoria De Vries, Bec = Rebecca
  Rutherford, and the people below); 10 placeholders (LEP40 and CO85 variants, J Wadsworth, TT); "RTL Test Only"
  left out. Accounts given full names: Anike Helder, Peter Foster, Michelle Parker (were first names only).
  Added to team lists: Pauline Britza and Paul Rice to Tumby Bay (also Coffin Bay), Ian MacCrimmon to Cummins.
- Dry run of the Lower Eyre import: 618 of 620 active shifts ready (the 2 left out are the test entry); every
  shift is on whole hours, a valid length, level and flexibility; nobody overlaps themselves; no hour has more than
  3 people. Still nothing copied into `roster_shifts`: the real copy happens on switch day (stage 7).

## Stage 2 (people): Central Eyre list from Campbell (17 Nov 2026)

- The owner passed on Campbell's list: 49 people (Cleve 13, Cowell 16, Elliston 13, Lock 7) with ambulance ID, name
  and station. None had an account. Applied by Claude (migration `roster_stage2_expected_members`; notes in
  `supabase/roster-stage2-expected-members.sql`): the list is in `public.expected_members` (not in this public
  repo), every ID is on `allowed_ids`, and the sign-up trigger `handle_new_user()` now gives a listed person their
  listed full name and team when they sign up at `/signin/` (what they typed becomes their name shown if it
  differs). Rehearsed in a rolled-back run. NO accounts were created and no shared starter password was used:
  each person chooses their own password when they sign up.
- Name matching now also matches by ambulance ID to people who have not signed up yet (migration
  `roster_stage5_match_expected`). Central Eyre after the list: 28 typed names sure, 7 to check, 6 unmatched
  (5 look like test or joke entries: Norma Gene, Juicy Lucy, Julia Gulia, Boof, Tay Tay; plus "Graeme" at Lock).
  Put to the owner 17 Nov 2026: decisions not yet given.
- Open for switch day: a shift can only be linked to a person once they have an account, so anyone who has not
  signed up by then needs an account made for them (or their shifts come across as placeholders). Owner to decide.
- West Coast: still waiting on Dave's list.
- Owner's decisions (17 Nov 2026, "all yes"), applied by Claude: Central Eyre typed names accepted: Lorna = Lorna
  Lush, Julie = Julie Magnay, Jessie = Jessica Jacobs, Tim = Timothy Brierley, Campbell = Campbell Forsyth,
  Gabriel = Gabby Zerk, Lisa Kammerman = Lisa Kammermann, Graeme = Graham Spiers; left out as test entries:
  Norma Gene, Juicy Lucy, Julia Gulia, Boof, Tay Tay. All 37 Central Eyre names are now resolved (24 exact, 8
  confirmed, 5 left out; an earlier message to the owner said 28 exact, which was a miscount).
- Dry run of the Central Eyre import: 102 of 107 active shifts ready (5 are the test entries); whole hours, valid
  lengths and levels, nobody overlapping themselves, no hour over 3 people.
- Switch day decision (owner, 17 Nov 2026): anyone on a leader's list who has NOT signed up by switch day gets an
  account made for them on the day, so their shifts and hours link properly; their Team Leader gives them a
  temporary password when they first sign in. Today that would be 25 Central Eyre people with shifts on the roster.
  Not built yet: do it as part of stage 7.
- Summer Bay open to every Team Leader (owner, 17 Nov 2026): `can_edit_group()` returns true for any leader on a
  group of type `test` (migration `roster_test_team_open_to_leaders`, `supabase/roster-test-team-leaders.sql`), so
  Campbell and David can tick "Summer Bay" for their people in `/training/` People and use its Manager controls;
  `canEdit()` in `training/index.html` matches. Checked in SQL: Campbell and David can manage Summer Bay and their
  own cluster's teams only; a member can manage nothing. A person still needs an account before they can be added,
  and a leader must tick Summer Bay for themselves to book their own shifts on it.

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
- Tested in a headless browser with stand-in rosters and database. On main and live (PR #252, merged 16 Nov 2026);
  signed out, the live page goes to the sign-in. NOT yet tried with a real sign-in: owner to try. The table is in Supabase
  (migration `coverage_rules`, applied by Claude 16 Nov 2026; checked in a rolled-back run: a leader sees only their
  own row, another leader and a student see none).
- Counted by 12-hour segment (owner, 16 Nov 2026, after the first real try, which worked): the rule's gap length
  is still judged on the whole joined gap, but each gap is then listed and counted once per segment it touches,
  Day 08:00-20:00 and Night 20:00-08:00 (a 36-hour gap shows as 3). A part-segment shows its real length and "Part
  of a longer gap". The segment times are fixed, not a rule. Claude's reading of "a gap length in hours is
  determined by the rules": owner to confirm. On a branch, not merged.
- Segment times changed to the volunteer shifts (owner, 16 Nov 2026): Day 08:00-18:00 and Night 18:00-08:00,
  replacing 08:00-20:00 and 20:00-08:00. On a branch, not merged (PR #253).

## Roster user guide updated for the Supabase roster (17 Nov 2026, owner asked)

`/userguides/rosters/` Part 3 "The new roster (sign-in)", sections 16 to 21: sign-in instead of a typed name, preferred
name, Switch person, level saved to the account, own shifts only for crew; reminders (Home Screen on iPhone, Send a
test, Focus note); manager controls without a password, Booking for and Not on the list (placeholders); Send roster to
Country Rostering (Preview, Open the PDF, Send now, cut-off moves); Schedule set-up (pause, skip, retries); change emails
and trial rosters. Parts 1 and 2 still describe the Apps Script rosters. On switch day (stage 7) rewrite Parts 1 and 2
from Part 3 and drop the password, saved-roster, PDF-view and Google Sheet Change Log sections.
- The Summer Bay tick box for other clusters' Team Leaders is on main and live (PR #258, merged 17 Nov 2026).
  Central Eyre people sign up themselves and choose their own password: no temporary password is involved unless
  an account has to be made for someone on switch day.
- Sign-in for people whose account was made for them (Lower Eyre now, anyone on a switch day later): no starter
  password, they claim the account once on `/signin/` (see `access.md`, 17 Nov 2026).

## Operations overview: team names link to their rosters (17 Nov 2026)

Owner asked for a quick link to each team's roster without new buttons. On `/modules/rosters/operations/` the team
names are now links (dotted underline): the column headings (CU, TB…), the "Needs attention" list and the team key.
Addresses come from `modules/rosters/shared/teams.js` (cluster folder + team id); the page now loads that file.

## Stage 6 (dashboards on the new roster): 18 Nov 2026

- Pages that read rosters: `dashboard/dash.js` and the car dash (coverage + getBookings), `dashboard/coverage/`
  (getBookings), `modules/rosters/operations/` and the three `*/manager/dashboard/` pages (coverage),
  `dashboard/contribution/` (`member_contribution`). The old `lowereyre/coverage-gaps*` pages are left on the
  Apps Script (not linked; owner to say if they go).
- The Apps Script "coverage" answer = people booked per team per hour for one 08:00-08:00 roster day (recruits
  count); rebuilt from `roster_bookings` it matched the live Lower Eyre answer for Thu 19 Nov 2026.
- Drafted `supabase/roster-stage6-readers.sql`: `roster_coverage(teams, date)` (counts only, anyone),
  `roster_team_bookings(team, from, to)` (getBookings shape, signed in), `member_contribution(from, to,
  supabase_teams)`. Which teams have moved stays in one place: `backend: "supabase"` in `teams.js`, passed by the
  pages. A rolled-back rehearsal was sent on 18 Nov 2026 but Supabase stopped to ask the owner to confirm it
  (it replaces `member_contribution`) and the question timed out: nothing applied. Waiting for the owner.
- Still to do: rehearse and apply the SQL, a shared page helper, switch each page over, compare old and new.
- Done 18 Nov 2026 (supersedes the "NOT applied" lines above): Supabase kept asking the owner to confirm replacing
  `member_contribution`, and the question never reached their phone (3 timeouts), so the owner chose a new name:
  `member_contribution_v2(from, to, supabase_teams)`; the old function is untouched (drop it once every team has
  moved). Migration `roster_stage6_readers` applied: `roster_coverage`, `roster_team_bookings`,
  `member_contribution_v2`. Rehearsed first: v2 gives identical hours to the old function with no moved teams;
  coverage counts include recruits and placeholders, 23/25 hours on daylight-saving days, test and unknown teams
  left out; bookings give full names and refuse other teams' members; with a team "moved" its hours come from
  `roster_shifts` and placeholders are left out.
- New `modules/rosters/shared/roster-data.js` (`DSY_ROSTER_DATA.coverage / bookings / movedTeams`): per team, the
  Apps Script or Supabase (`backend: "supabase"` in teams.js, never the test team); a fully moved cluster no longer
  asks its Apps Script. Switched over: `dashboard/dash.js` (dashboard and widescreen), car dash, `dashboard/coverage/`,
  `dashboard/contribution/` (v2 with the moved team names), `modules/rosters/operations/`, the three
  `*/manager/dashboard/` pages. Not switched: the old unlinked `lowereyre/coverage-gaps*` pages.
- Tested in a headless browser against the live rosters: with no team moved every page asks only the Apps Scripts
  and shows the same numbers; with Tumby Bay pretended moved, its column came from Supabase and the other three
  from the sheet; Tumby Bay names were refused without sign-in. Not yet seen signed in by the owner.
- Gap to know about: the manager dashboards and operations page are open pages (no sign-in); counts still work
  for moved teams, but nothing on them needs names. The leader pages (dashboard, crewing gaps, contribution) are
  signed in.
- Stage 6 is on main and live (PR #262, merged 18 Nov 2026). Checked on the live site in a fresh browser: the
  operations page and all three manager dashboards load with no errors and ask only the Apps Scripts (no team has
  moved); Tumby Bay's roster page unchanged; the leader dashboard and contribution page ask for sign-in. Not yet
  seen signed in. Remaining: stage 7 (switch day) and stage 8 (tidy up).

## Stage 7: SWITCH DAY for Lower Eyre and Central Eyre (18 Nov 2026, owner: "go live now")

- Owner filled the addresses first: Lower Eyre has Country Rostering (sa.gov.au), CC, area manager and all four
  managers; Central Eyre has its four managers (Lorna Lush Cleve, Julie Magnay Cowell, Tim Wilson Elliston, Graham
  Spiers Lock) but NO Country Rostering address, the same as its Apps Script: managers get alerts, crews are told
  to phone for changes before the cut-off. West Coast NOT switched (owner to load Dave's list).
- Steps and SQL record: `supabase/roster-switch-day.sql`. `roster-sync` now also copies Lower Eyre (version 4).
  Accounts made for all 42 Central Eyre people who had not signed up (claim on /signin/). 782 shifts copied
  (755 linked to people, 27 placeholders; 7 test entries left out); per team copied + left out = old active count.
  Lower Eyre sent cut-offs copied. Both clusters live from 2026-11-18.
- "Prue Holly" (Cleve, AR, Sat 21 Nov) matched nobody at first; owner (18 Nov 2026): it is Prue Stringer (100173),
  so the shift was linked to her account.
- Pages: 8 team pages switched (sign-in, roster-supabase.js, Home Screen tags); teams.js `backend: "supabase"`,
  features without `savedRoster`. Checked locally against the real database with the test account (999123, switched
  off afterwards): the team pages call only Supabase and refuse non-members; Summer Bay still loads.
- Not carried over: team messages (they stay in the sheets) and the old Change Log tabs.
- LIVE: PR #264 merged 18 Nov 2026; all 8 Lower Eyre and Central Eyre pages on the new roster from about 06:24 UTC
  (4:54 pm Adelaide). First catch-up at 06:24 UTC: nothing booked, changed or cancelled on the old pages since the
  copy. Checked on the live site in a fresh browser: the 8 team pages ask for sign-in; Kimba (West Coast) unchanged on
  its Apps Script; operations page reads Lower Eyre and Central Eyre from Supabase and West Coast from its sheet; the
  Lower Eyre and Central Eyre manager dashboards read Supabase only (numbers match the old sheet; the team column
  order now follows teams.js). A second catch-up is scheduled for 07:26 UTC.

## 7-day roster table (18 Nov 2026)

Owner asked for the 14-day roster table to show 7 days. `shared/roster.js`: the table opens on today plus 6 days, the
tab and launch button say "7 days", and the top buttons are "Previous 7 days" / "Next 7 days" (step 7 days). Roster
user guide section updated to match.
- Second catch-up (18 Nov 2026, 08:07 UTC, by the scheduled task): nothing new or cancelled on the old pages. One
  difference (Lou Rossi, Elliston, Fri 20 Nov) was an edit Lou made on the NEW roster at 6:23 pm, so the new roster was
  kept. Already in use: Jay Forsyth (Elliston) and Lauren Foster (Tumby Bay) booked 2 shifts each on the new roster;
  the two Tumby Bay bookings were before the sent cut-off and their change emails were sent. No catch-up needed from
  now on: crews can no longer reach the old pages.
- Roster tile (owner, 18 Nov 2026): the owner's green calendar picture (1024x1024 PNG) is the roster's browser-tab
  icon and Home Screen tile: `shared/roster-tile-32/180/192/512.png`, on all 13 team pages (favicon and
  apple-touch-icon), in `roster.webmanifest` and as the reminder notification icon in `sw.js`. It replaces the
  calendar icon Claude drew (roster-icon-*.png, removed). New file names so phones don't keep the old picture; a
  tile already on a Home Screen must be deleted and added again to change.
  On main and live (PR #268, merged 18 Nov 2026): all 13 team pages, the manifest and the service worker point at
  the new tile; the four tile sizes are served.

## Switch day for West Coast (19 Nov 2026)

- The owner passed on Dave's list: 44 people (Kimba 12, Port Kenny 9, Streaky Bay 14, Wudinna 9), none with an
  account. Loaded into `expected_members` and `allowed_ids` (not in this repo).
- Owner's decisions (19 Nov 2026): "Dianne McKenna" = Di McKenna; "David Coombe" and "Dave" = David Coombe (1002517,
  West Coast TL), who is now on all four West Coast team lists ("as a TL he should have access to all teams");
  "Chris Morgan" (Kimba), "Christopher Morgan" (Port Kenny) and "Ben Dover" (Wudinna) were tests and were left out.
  The "Ben Dover" account (100100) is a test account: not deleted, owner to say.
- Done in the same way as 18 Nov: fresh copy (roster-sync), accounts made for all 44 (claim on /signin/), 79 shifts
  copied, all linked to people (3 test entries left out; per team copied + left out = old active), sent cut-offs
  copied for Kimba (9 Nov) and Port Kenny (16 Nov; both already past), West Coast live from 2026-11-19.
- West Coast has no roster managers, manager emails or Country Rostering address yet: Dave will set them up (owner).
  Until then change alerts reach nobody and crews are told to phone for changes before the cut-off (as with the old
  West Coast script, which had no Country Rostering address). Dave, as Team Leader, has Manager controls on all four.
- Pages: the 4 West Coast pages switched like the others; teams.js `backend: "supabase"` on all 12 real teams, so
  the Apps Scripts are no longer read by any page. Checked locally against the real database with the test account
  (switched off again): the West Coast pages and manager dashboard call only Supabase.

## Pager task after the switch (19 Nov 2026)

- The scheduled task "DSY pager capture" (claude.ai cloud scheduled task, was "DSY pager and roster capture") now runs
  at 5:35 am, 11:35 am and 5:35 pm Adelaide (owner asked for 6, 12 and 6). It only captures the paging list: the
  Google Sheet roster copy step was removed, as every team books on the new roster.
- `paging_jobs_by_member(_detail)` read `roster_shifts` (see dashboard.md).
- Still copying from the old sheets: the edge function `roster-sync` (every 2 hours into `roster_bookings`). Stage 8:
  stop it once nothing reads `roster_bookings` (`member_contribution_v2` still reads it for teams not passed as moved).
