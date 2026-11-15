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
