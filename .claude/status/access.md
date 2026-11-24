# Sign-in and access

`/shared/gate.js`, `/signin/`, `/access/`, roles and password rules. SQL in `supabase/access-setup.sql`.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## Sign-in and facilitator access

Sign-in and facilitator access (7 Nov 2026, live; PRs #181 and #182 merged; PART 0 to 3 of the SQL all run, PART 2
by Claude on 7 Nov 2026 and tested with an unlisted ID, which was refused; the owner's leader account now signs in
with ambulance ID 1003463 and the `/signin/` page also accepts an email; leaders see a Grant access link on the home
page and Run a session): one Supabase sign-in (ambulance ID + password, same accounts as `/training/`) for the whole
site. `/shared/gate.js` is the first script in the head of each protected page (`data-level` student, facilitator,
leader, `mdt` = student only for `#...self=1`, `stations` = facilitator for `#setup` and `#print`); it hides the
page until the check passes, redirects to `/signin/?next=...`, and shows "Facilitators only" otherwise. Student
gate: microlearning for AO (the AO group page, the 15 AO modules and the game; the microlearning home page, the
Paramedic and RN group pages and their 6 modules are OPEN, owner's split of 7 Nov 2026 so they can be sent to
anyone), `/hub/learn/`, `/modules/*` (not rosters), `/ao/`, stations, `/tools/pcr`, `/tools/obstetric`,
`/scenarios/view/`. Facilitator gate: `/hub/run/`, `/scenarios/`, `/classroom/*`, `/userguides/mdt/`, MDT setup.
Walk-through pages show the Facilitator/Student toggle only to facilitators (`module.js`). On Run a session the
"Copy the student link" button copies only the microlearning link, not the walk-through, MDT drill or PCR trainer
(owner, 7 Nov 2026). NOT gated yet: home page, `/signin/`, rosters and roster guide, `/paramedic/`, `/rural-ed/`,
`/gp-clinic/`, `/classic/`, `/course/`, `/teams/`, `/region/`, `/training/` (own sign-in). This is a front door, not
a vault: page files are public on GitHub, so answers are still readable by someone who looks; real protection means
serving facilitator text from Supabase. Roles on `profiles.role`: member (student), facilitator, leader. `/access/`
(Grant access, leaders only; link shown to leaders on the home page and Run a session): paste IDs or load a CSV, set
student or facilitator, remove (switches the account off with `leader_set_access`, which bans the auth user) or add
back; table `public.allowed_ids` (leader-only RLS). SQL is in `supabase/access-setup.sql`: PART 0 (trigger stopping
members changing their own role; found 7 Nov 2026, any member could set role to leader) and PART 1 (roles,
allowed_ids, grandfathers the existing accounts, access switch) are run by the owner in the SQL Editor because the
Supabase tool's approval prompt never reached the owner's phone; PART 2 (block new sign-ups whose ID is not on the
list) runs only after `/access/` is live. PART 3 (7 Nov 2026): the 54 accounts bulk-made on 14 Oct 2026 share a
starter password (the owner set it; only 2 had ever signed in), so `profiles.must_change_password` is set on them;
the gate and `/training/` send a flagged person to `/signin/?change=1` to choose their own password, then
`password_changed()` clears the flag. A leader's password reset in `/training/` also sets the flag. Not enforced by
the database, only by the pages. Password resets (7 Nov 2026): a student cannot reset their own (no email on file).
Only leaders reset passwords: Reset password on `/access/` (or the People tab in `/training/`); the leader types a
temporary password, it is never written in the repo (public), and the person must choose their own at next sign-in.
A facilitator reset page was built and removed as too complex (owner). The starter password for the bulk-made
accounts was reset because the original was unknown (stored passwords are hashed); on 7 Nov 2026 every account
except the leader's was reset to the starter password and flagged to change (the others were the owner's tests). The
leader account once shared the starter password, so it was flagged to change; keep the leader password different
from any shared starter password. 7 people are facilitators (set by the owner). Owner chose: approve all 61 existing
members, block unlisted sign-ups, gate facilitator walk-throughs and station instructor sheets.

## Training clusters (16 Nov 2026)

Owner asked that each cluster's Team Leader manages only their own cluster's training (decisions of 15 Nov 2026:
default to own cluster with an All clusters switch; view but not edit other clusters). `groups.cluster` (Lower Eyre,
Central Eyre, West Coast) on all 12 teams (the 8 Central Eyre and West Coast teams were created 16 Nov 2026, empty);
`profiles.cluster` on leaders, blank = all clusters (the lead instructor). Leaders: Campbell Forsyth (1002112) =
Central Eyre, David Coombe (1002517, made a leader and his name completed 16 Nov 2026) = West Coast. Functions
`my_cluster()`, `can_edit_group(g)`, `can_edit_session(s)`; write policies on sessions, groups, memberships,
attendance, bookings and session_reflections use them (reading unchanged; lessons stay one shared library); a
trigger lets only an all-clusters leader change anyone's cluster. SQL `supabase/clusters-setup.sql`, run by the owner
in the SQL Editor 16 Nov 2026 (the apply_migration approval prompt timed out twice). Checked as Campbell: edit on the
4 Central Eyre teams, view on the other 8. Pages: `/training/` opens on the leader's own cluster (Cluster chips on
Calendar and People, other clusters' sessions view-only with a notice, other clusters' team boxes locked, Cluster
select for leaders on a person's page for all-clusters leaders, a new course takes the creator's cluster); the
dashboards' training tile and the car dash trip/service light follow the leader's cluster (`dash.js`).

## First sign-in without a starter password (17 Nov 2026, owner)

- Owner: Lower Eyre people should not need a starter password (Central Eyre people sign up themselves). Accounts
  that were made for someone can now be claimed once: on `/signin/`, "First time here? Set up your sign-in", enter
  the ambulance ID and choose a password. If the ID has no account it signs up as before (ID must be on the
  approved list); if an account was made for it and nobody has set its password, `claim_account(id, password)` sets
  the chosen password and signs them in; if it already has its own password they are told to sign in or ask for a
  reset.
- SQL `supabase/claim-account.sql` (migration `claim_account`, applied by Claude, rehearsed in a rolled-back run):
  `profiles.claim_open` (true for the 44 non-leader accounts still on the starter password on 17 Nov 2026),
  `claim_account()` (anon may call it; returns ok / none / closed / off; never for leaders or switched-off
  accounts), audit table `account_claims` (leaders can read), `password_changed()` also closes the claim, trigger
  `protect_claim_open` stops a person reopening their own.
- A leader's password reset does NOT reopen claiming: a forgotten password still needs the temporary password from
  the leader. Risk told to the owner: until a person claims their account, anyone who knows their ambulance ID could
  claim it first (the shared starter password had the same weakness). The starter password still works on
  unclaimed accounts until they are claimed.
- Page text: the note on `/signin/` now says no starter password is needed; the button reads "First time here? Set
  up your sign-in".
- On main and live (PR #259, merged 17 Nov 2026). Checked on the live page: the new note and button show; a wrong
  password still gives the normal message; first-time set-up on an ID that already has its own password is refused.
  Not yet used by a real person on an unclaimed account.
- Owner (17 Nov 2026): the "Been given a temporary password?" line was taken out of the highlighted box on
  `/signin/`; the box now only explains first-time set-up. The small line under the buttons still says a forgotten
  password is reset by the instructor with a temporary one (that is still how resets work).
  The page also no longer mentions email: the ID box is labelled "Ambulance ID number" and the "No email address
  needed" sentence is gone. An email typed in the box still signs in an old email account.
  On main and live (PR #260, merged 17 Nov 2026); checked on the live page: no temporary-password line in the box,
  ID box labelled "Ambulance ID number", no email wording.

## Set up training nights (18 Nov 2026, owner)

Owner set up the 2027 Central Eyre calendar by hand (SQL): fortnightly Team Leader visits (leader-led, Campbell Forsyth)
Elliston Wed from 10 Feb, Lock Thu 11 Feb, Cleve Mon 15 Feb, Cowell Tue 16 Feb, and team-led training on the opposite
weeks (no facilitator, Campbell to allocate), all leaving out SA school holidays to 10 Dec 2027; the team weeks also
leave out public holidays. Cleve 29 Mar 2027 (Easter Monday) visit: owner to delete in the app (the SQL delete's
approval prompt timed out twice). Then, for West Coast (no dates yet), the owner asked for a panel so leaders do this
themselves: on `/training/` Calendar, **Set up training nights** (team, Team Leader visits or Team training, first night,
every 1-4 weeks, last date defaulting to the end of that school year, times, location, skip school / public holidays,
live preview with skipped dates and reasons, existing dates kept) and **Add one session**; delete stays on the session.
Holiday data is in `training/sa-dates.js` (2026, 2027, 2028 Terms 1-3; the department's page refuses automated reads,
2027 is from third-party calendars that agree): add each year when published. Leader guide section 9 updated.

## Sign-in lands on the Team Page (owner, 19 Nov 2026)

`/signin/` with no `next` now goes to `/teams/` (was `/hub/learn/`); a page that sent someone to sign in still gets
them back. `/teams/` no longer sends anyone on to `/training/` (owner: the page always has the schedule, learning and roster
buttons); someone in no team sees a note with the Training schedule and Learn on your own buttons. The Team Page now opens the person's
own team first (from `memberships`), which matters for leaders, who can see every team. Getting started guide
section 2 says so. Merged (PR #282, 19 Nov 2026), checked live.

## Team on Grant access (owner, 19 Nov 2026)

`/access/`: a Team picker beside "Add as" and a Team column on the list. A signed-up person goes straight into
`memberships`; an ID not signed up yet goes into `expected_members` (staff_id, full_name = the name typed or "",
group_id) and `handle_new_user` adds the membership at sign-up. Row picker: "Add to a team…" for signed-up people
(removal stays in Training, People), a team box for the not-signed-up (No team deletes the expected row). Teams outside
the leader's cluster are disabled. Migration `grant_access_team`: leader insert/update/delete policies on
`expected_members` using `can_edit_group`, and `handle_new_user` no longer overwrites the typed name when the expected
name is blank. Leader guide section 10 updated. Tested with stand-in data. Merged (PR #284, 19 Nov 2026), checked live. First live try failed "permission denied for table expected_members": the table had
no write grant for `authenticated` (only SELECT), so migration `expected_members_write_grant` grants insert, update,
delete (RLS still limits it to `can_edit_group`); rehearsed as a leader in a rolled-back transaction.

## Sign-up asks only for ID and password (owner, 19 Nov 2026)

The name comes from the leader's list. Migration `signup_name_from_access_list`: `handle_new_user` sets
`full_name` from `expected_members.full_name` (if not blank), else `allowed_ids.note`, else the typed name (older
forms), else blank. `/signin/` first-time mode has no name box and sends only `staff_id`; if the new profile's name is
blank it shows "One more thing: your name" once and saves it to `profiles.full_name`. `/signin/?first=1` opens in
first-time mode; the old "Create an account" links on `/teams/`, `/region/` and `/training/` now go to
`/signin/?first=1&next=<page>` (their own sign-up forms are no longer reachable). Getting started and leader guides
updated. Tested with stand-in data. On a branch, not merged.

## Volunteer Team Leader (VTL) (owner, 22 Nov 2026)

Owner asked for a VTL level: the same as roster manager plus facilitator, NOT Team Leader, one per team, with their own
team dashboard (roster, dispatches, volunteer contribution and training for their team only, and weather; no footer links).
- Table `public.team_vtls` (group_id primary key = one per team, member_id unique = one team per person); write policy
  `can_edit_group(group_id)` (cluster leaders), read by leaders, the VTL and the team's members. `profiles.role` is NOT
  changed: deleting the row takes the access away.
- `is_facilitator()` and `roster_can_manage(g)` include the VTL (`is_vtl_of(g)`); `sessions_read` and `groups_read` let a
  VTL read their team; `my_access()` returns `role` = facilitator for a VTL who is a member, plus `vtl` {group_id, team,
  cluster}. Team-only data through security definer functions `team_dash_group`, `team_dispatch(p_group, p_from, p_to)`,
  `team_contribution(p_group, p_from, p_to)` (a VTL their own team, a leader any team).
- SQL `supabase/vtl-setup.sql`, migration `vtl_access`, applied by Claude 22 Nov 2026 after a rolled-back rehearsal with
  a stand-in Cummins VTL (facilitator yes, leader no, manage Cummins roster yes, Tumby Bay no, sees only the Cummins
  group and sessions, no direct `paging_jobs` read, team dispatch and contribution work).
- `shared/gate.js`: new `data-level="vtl"` (VTL or leader); a VTL counts as facilitator on facilitator pages.
- `/access/`: "Volunteer Team Leaders" section, one row per team, picker of the team's signed-up members; the Role column
  shows "· VTL <team>". `/teams/`: a Team dashboard button for the VTL on their team.
- Migration `vtl_wide_view` (owner, 22 Nov 2026): the team dashboard's roster and dispatch show every team, so
  `is_vtl()`, a `vtl_read` select policy on `paging_jobs`, and `roster_can_view()` lets a VTL see any team's roster names
  (not staff IDs; roster pages are open anyway). `team_dispatch` is no longer used by the page.
- Training app People page (owner, 22 Nov 2026): the Role box on a person's page now offers Member, Facilitator,
  Volunteer Team Leader, <team> (each of the person's own teams in the leader's cluster; "replaces <name>" when the team
  has one) and Leader. Choosing VTL writes `team_vtls` and leaves the person's role alone (a leader made VTL goes back to
  member); choosing any other role removes their VTL row. The People list shows a VTL chip. Real leaders only (relief
  Team Leaders see the role as text). Facilitator was added because the box used to show facilitators as Member.
  Tested with stand-in data. Live (PR #321, merged 22 Nov 2026), checked on the live site.
- People search (owner, 22 Nov 2026): a search box at the top of the training app's People list filters in place by name,
  ambulance ID, team, "VTL" or "leader" (every word must match; kept while the app re-draws). On a branch, not merged.
- Not covered: VTLs do not get roster change emails (that is `roster_managers.notify_email`); in the training app
  (`/training/`) they are treated as facilitators already: the app has only a leader view and a member view, and
  facilitators use the member view too (checked 22 Nov 2026); database rules that use `is_facilitator()` include VTLs. No VTLs set yet: owner to name them. Live (PR #320, merged 22 Nov 2026; checked on the live site with stand-in sign-in data, and signed-out visits go to sign-in).

## Test accounts removed (22 Nov 2026)

On the owner's say-so, deleted from Supabase (sign-in, profile, memberships, bookings): "Test" (1003464, Tumby Bay),
"Test Member" (Summer Bay, owner's sa.gov.au email) and "Claude Testaccount" (999123, Summer Bay, also its expected_members
row). No test member accounts remain; make a new one if a signed-in check is needed.

## Show / hide password (22 Nov 2026)

`training/pwreveal.js` puts an eye button at the right of every password box (also boxes drawn later). Loaded on `/signin/`,
`/training/`, `/teams/`, `/region/`. The box goes back to hidden when the form is sent. Old roster manager password prompts
and the CP-* / presenter gates are not included.

## Dispatch page for VTLs and relief Team Leaders (owner, 24 Nov 2026)

`/dispatch/` let in only `profiles.role = 'leader'`, and the `paging_jobs` `leaders_read` policy checked the same, so
relief Team Leaders saw nothing there or in the main dashboard's Dispatch panel, and VTLs got "Leaders only" on the page.
The page now uses `my_access()` (role leader, which includes relievers on active cover, or `vtl` set). Migration
`paging_jobs_relief_read` (`supabase/paging-jobs-relief-read.sql`): `leaders_read` uses `is_leader()`. Rehearsed in a
rolled-back transaction with a stand-in cover: reliever 1556 jobs on cover, 0 after it ended, leader 1556. Database
change applied 24 Nov 2026; page change on a branch, not merged.
