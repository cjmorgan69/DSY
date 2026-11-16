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

## Stage 1 done (16 Nov 2026): database foundation, applied by Claude

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
