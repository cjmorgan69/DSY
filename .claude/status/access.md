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
