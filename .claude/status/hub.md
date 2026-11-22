# Main page, Run a session, glossaries, feedback

`/`, `/hub/learn/`, `/hub/run/`, `hub/topics.js`, `hub/glossary.js`, `/feedback/`.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## Main page, Learn on your own, Run a session

Main page (`/`, was the hub draft): two doors over one topic list `hub/topics.js`: Learn on your own (`/hub/learn/`:
per topic Learn = microlearning, Practise = student walk-through, Drill the MDT = `/mdt/#job=<id>&self=1`; ticks
saved on the device) and Run a session (`/hub/run/`: DSY-written session guide for review, per-topic kit:
facilitator walk-through, customise, `/mdt/#job=<id>`, copy student links, log in /training/). Add a topic to
`hub/topics.js` when a module, walk-through or MDT job is made.

Favicon (18 Nov 2026): `shared/dsy-favicon-32.png`, `-192.png` and `shared/dsy-touch-180.png` (green circle, white
DSY, heartbeat line; drawn by Claude from the logo). On every page (PR #269), replacing the old `cdn.simtheory.ai` tab icons.
Not on: roster pages (own roster tile), `/LOGO files/`, video `scene.html` sources. `/mdt/` keeps its own
home-screen icon. A new page needs the same three `<link>` lines after `<title>`.
The `/dashboard/` pages have their own icon instead (`shared/dsy-dashboard-32.png`, `-192.png`, `-touch-180.png`:
gauge with needle and heartbeat line on a green tile, 18 Nov 2026).
The three Roster Manager pages (`/modules/rosters/<cluster>/manager/`) have a green calendar icon with the cluster's
letters under it: LEP (Lower Eyre), CEP (Central Eyre), WC (West Coast) (`shared/roster-manager-<cluster>-32/-192/-touch-180.png`).

## Run a session glossaries

Run a session glossaries (`hub/glossary.js`, keyed by topic id, 10 Nov 2026): a fold-out "Glossary (n terms)" in
each topic on `/hub/run/`; each term is tagged with its source (protocol code, Lead instructor, or unmarked = DSY
plain-English meaning for review). Chest pain first (37 terms from CPP-007-AO v4.2 and the Graham walk-through); add
other topics when the owner asks; bump the `glossary.js?v=` tag in `hub/run/index.html`.

## Feedback

Feedback (`/feedback/`, 11 Nov 2026, live, PR #204): one form per topic (`?t=<topic id>&from=qr|link|slides`):
overall stars, tick boxes for the parts the topic has (microlearning, walk-through, stations, MDT, PCR trainer,
slides; from `hub/topics.js`) each with stars and a comment, what worked, what to change, role, optional name; no
sign-in needed. `?show=1` = big QR for the room. Run a session has a Feedback QR and Copy feedback link per topic
and a Feedback panel; the case-night decks end with a feedback QR slide (add one to each new deck).
`/feedback/review/` (facilitator gate): per-topic averages per part, filters, replies, CSV. Supabase
`public.feedback` (`supabase/feedback-setup.sql`, run by the owner): anon/authenticated insert only, select via
`is_facilitator()`. One test row (source `test`) may still be there for the owner to delete.

## Topic categories and AO coverage

Topic categories and AO coverage (11 Nov 2026, owner): Run a session shows six category tiles (Cardiac and
respiratory, Trauma and injury, Brain and behaviour, Medical, Birth and newborns, Decisions; `DSY_GROUPS` and
`group` in `hub/topics.js`); three screens on one page by address (`#` categories, `#g=<group>` its topics plus
"Coming soon" entries from `DSY_PLANNED`, `#t=<topic>` the topic tiles; back buttons and the phone back button step
up a level; Feedback and Session planner only on the first screen) (move an entry into `DSY_TOPICS` with its group
when it is made). Layout inside a topic: the same eight tiles every time (Presentation, Scenario, MDT, PCR /
Stations, Microlearning, Customise, Feedback QR) plus Student link and Feedback link; missing parts show "Not made
yet" (PR #206). The full list of the 34 AO protocols, what is covered, the suggested build order and which CPPROs
apply to AOs is in `.claude/references/ao-protocols.md`.

## Team Page photos and learning (18 Nov 2026, owner)

`/teams/` (Team Page in Training) now has: a "Learn on your own" button (to `/hub/learn/`); a swipe row of team photos
(`groups.photos` jsonb `[{path, caption}]`, files in storage bucket `team-photos` under `<group id>/gallery/`;
migration `groups_photo_gallery`); and a swipe row of learning topics from `hub/topics.js` (topics with a module or
walk-through), each card showing the phone's Learn on your own ticks and opening `/hub/learn/#<topic id>` (the Learn
page now gives each topic card an id and scrolls to it). Leaders add, caption, reorder (Move up) and remove gallery
photos in Training, People, Team pages, below the main photo. A team with only gallery photos counts as having a page.
Tested with stand-in data in a headless browser (phone width); not yet seen with a real sign-in.
A gallery entry can also be `{url, caption, credit, source}` (a picture not in storage; credit shown under it).
Town photos (owner, 18 Nov 2026: "one for each team"): one free-licence Wikimedia Commons photo per team (the lead
photo of each town's Wikipedia article, licence and photographer in the credit line), loaded straight from
upload.wikimedia.org (this cloud machine was rate-limited by Wikimedia, so they are not copied into the repo).
Elliston's is the main-street shops, Cleve's the folk museum: swap for better ones if the owner has them. Every team
now has page content, so members land on the Team Page instead of going straight to the schedule.
Merged with PR #273 (owner: "merge every thing", 18 Nov 2026).

Learning swipe row removed from the Team Page (owner, 18 Nov 2026: "just have photo tiles"); the photo row and the
Learn on your own button stay. Merged (PR #274, 18 Nov 2026).

Main page "Other groups and pages" (18 Nov 2026, owner): the row of links (All AO walk-throughs, Paramedic, Rural ED,
GP clinic, Rural nursing microlearning, Classic hub, Ambulance Responder course) is hidden from everyone. Leaders
(role `leader`: Chris Morgan, Campbell Forsyth, David Coombe) see an "Other groups and pages" link next to Dashboard
and Grant access at the bottom, which shows and hides the row. Uses the same `dsy-gate-role` cache as the leader
links, so it is a display choice only: the pages themselves are still open to anyone with the address.
Town photos moved into the team name banner (owner, 18 Nov 2026: "the same way the Tumby Bay page has been set up"):
new column `groups.hero` jsonb `{url, credit, source}`, used only when `photo_path` is empty; the credit sits small in
the banner's top corner. The 11 other teams' Wikimedia photos were copied into `hero`; the Team Page leaves a slide out when
it is the banner photo, so their slide rows are empty (the `photos` entries can be cleared later); Tumby Bay keeps its uploaded banner and its Wikimedia photo in the slides. Uploading a banner photo in
Training overrides the town photo; Remove photo clears both. Merged (PR #277).
Editing path for leaders (owner asked for an obvious one, 18 Nov 2026): team pages are edited on the Region page
(`/region/`, Edit page on a team tile), not in Training (Training's People tab only points there; the page editor and
gallery code left in `training/index.html` from PR #273 is unreachable). The Region page team form now has Banner photo
(shows when a town photo is in use; Remove clears `photo_path` and `hero`) and Photo slides (add several, caption,
Move up, Remove; files under `<group id>/slides/`). Team Page: leaders get an "Edit this page" button that opens
`/region/#edit=<group id>`. Region tiles show the town photo when no photo is uploaded. Leader guide section 9 has a
"Team pages: banner photo and photo slides" part. Tested with stand-in data; not yet seen signed in. Merged (PR #277, 18 Nov 2026), checked live with no errors.
Banner position (owner, 18 Nov 2026: Kimba's galah lost its head): column `groups.banner_y` (0 top to 100 bottom, null
centre) sets the banner photo's `object-position`; slider with a live preview in the Region page team form (saves on
release; a new upload resets it). Kimba set to 10. Merged (PR #278, 18 Nov 2026), checked live.

## User guide links (21 Nov 2026)
Owner asked where the user guides are linked. Added: a "User guides" tile in Tools on the main page (/userguides/), "How to
use this" (Getting started) in the team page header, and in the training app header "How to use this" for members or
"Leader guide" (/userguides/leaders/#training) for leaders. Already linked before: sign-in (Getting started), dashboard
(Team Leader guide), /hub/run/ (Running a session), MDT (MDT guide), roster manager pages (roster guide). Crew roster
pages and Learn on your own still have no guide link.

## Region page: cluster filter and banner position (22 Nov 2026)
Owner: filter the Region page by cluster, and moving the banner photo did not keep. Supabase logs showed the slider saves
were reaching `groups.banner_y` (Kimba 27); the Region page tiles ignored the position, so it looked lost. Now: tiles use
`banner_y`; the slider also saves 0.8 s after the last move, checks a row came back (no silent RLS miss) and says "Saved".
Cluster chips (All, Lower Eyre, Central Eyre, West Coast) filter the Teams tiles from `groups.cluster`; the choice is kept
on the device (`dsy-region-cluster`), starting on the leader's own `profiles.cluster`. Tested with stand-in data. Merged (PR #331, 22 Nov 2026).
