# DSY Training: notes for Claude

DSY Training (dsytraining.com, GitHub Pages from `main` of `cjmorgan69/DSY`) builds training for volunteer
Ambulance Officers (AOs) of SA Ambulance Service (SAAS) on the Eyre Peninsula, plus rural ED and GP clinic material.
The owner is the lead instructor. They usually work from an iPhone (Claude app), so they cannot see permission
settings or play files you leave in the container: send files with the file tool and keep explanations short.

## What lives where

- `/index.html` - the main page (since 17 Oct 2026): two doors, Learn on your own (`/hub/learn/`) and Run a session
  (`/hub/run/`), over one topic list `hub/topics.js`. The old dark Clinical Training Hub is at `/classic/`; `/hub/`
  forwards to `/`. `/ao/index.html` lists the AO walk-through scenarios in `/modules/<name>/`.
- `/microlearning/` - hub with AO, Paramedic and RN tiles; group pages `/microlearning/ao/`, `/paramedic/`, `/rn/`
  (navy theme for RN) list the modules from `MODULE_LISTS` in `modules.js`. The microlearning modules use one template for all. Read `microlearning/README.md` (content keys,
  flow layout, scenario pages, related links, cache tag) before changing anything there.
- `/microlearning/shared/` - `module.js`, `module.css`, `landing.js`, `related.js` (pages on the same protocol link to
  each other), `dsy-logo.png`. `/training/theme.css` is the shared colour and type theme.
- `/microlearning/tools/video/` - the narrated intro-video pipeline (`make.sh`, `align.py`, `render.js`, `voice.json`).
- `/modules/` - walk-through scenarios. 16 are rebuilt on the microlearning template with facilitator and student
  versions (their `index.html` loads `microlearning/shared/module.js`); the rest are the old standalone style.
- `/scenarios/` - trial scenario customiser: pick a walk-through and change its local details (names, places, times).
  Templates are in Supabase `public.scenarios`. Read `scenarios/README.md`. 15 templates (every converted walk-through except spinal).
- `/training/` - the training-session app (Supabase). `/teams/`, `/region/` - team and region pages. A session can
  have several lessons (`sessions.lesson_ids`, in order; a trigger keeps `lesson_id` = the first one).
- `/userguides/` - user guides: home, Team Leaders (`leaders/`, source for the dashboard's Ask DSY helper), rosters, MDT.
- `/vehicle-check/` - the crew's ambulance check (FRM-384, Mercedes VS30) with a stock-to-order list (Supabase).
- `/.claude/tools/` - `stamp.js` (cache tag) and `check.js` (site check). `/.claude/status/` - notes per area.

## Owner's monthly vehicle log

Not part of the website. When the owner pastes a month of travel rows, pastes an "End of month" message from the Travel
Diary, or asks for a month's vehicle log / log book sheets ("print November's log book sheets": read that month's trips from the
Travel Diary page, URL in the README), read `.claude/vehicle-log/README.md`, run
`make.js` and send the PDF (serials run on; update the README).

## Skills

- `build-microlearning-module` - build or update a microlearning module from a SAAS protocol.
- `convert-walkthrough-scenario` - check an old `/modules/` walk-through against its protocol and rebuild it on the
  template with facilitator and student versions.

## How the owner likes to work

- **Protocol only.** Every clinical statement comes from the SAAS protocol, table or procedure (CPPRO). Anything
  written by Claude (scenarios, quiz, flash cards, practicals, EOC Clinician replies in a story) is labelled and the
  owner is asked to review it. Say plainly when a document's review date has passed or the documents disagree.
- **List clinical changes before making them** when correcting existing content, so the owner can approve them.
- **Light layout.** Flow layout on every module. At most one swipe-tile row and about three single quick-check cards
  per module. Keep the full quiz. Do not add more tiles or cards without asking.
- **Narration.** Lee (ElevenLabs, `eleven_v4`, `[calmly]` prefix, short conversational sentences). See `voice.json`.
  Generation costs credits: one take per script, never regenerate without asking.
- **Going live.** Work on the session branch, open a PR, and merge only when the owner says so ("merge it"). Then
  wait for the live site to update and check it in a fresh browser.
- **Database lesson.** After a module or scenario is live, the owner usually asks to add it as a lesson: insert into
  Supabase project `ekaodnbnpsuayvmxvxbm` ("training-sessions"), table `public.lessons`, columns `title`, `summary`,
  `resources` (the live URL). Do not create sessions. Use `where not exists` to avoid duplicates, then select it back.
- **Cache tag.** Scripts are cached for about 4 hours. Whenever any script, stylesheet or content file changes, run
  `node .claude/tools/stamp.js` before the PR: it puts one new tag on every page (and the classroom manifests). Do
  not edit `?v=` tags by hand. Video tags such as `intro.mp4?v=2` are the exception: bump those by hand on a re-render.
- **Check before a PR.** Run `node .claude/tools/check.js` (cache tags, broken links, sign-in gates, hub topics,
  walk-through wiring, module lists, case-night feedback slides). Fix anything under PROBLEMS. A new page that should
  be open to everyone goes on the OPEN list in that file, only when the owner says so.
- **Keep the notes true.** When work is done, update the matching file in `.claude/status/` and the Open work list
  below. Write "on a branch, not merged" only while that is true, and correct it when the PR merges.
- **Supabase tools are pre-approved** (owner, 17 Nov 2026: `.claude/settings.json` allows every `mcp__Supabase` tool, so
  SQL, migrations and function deploys run without a prompt). Still list changes to people's data in chat first, and
  never delete rows without the owner's say-so.
- **Names.** Avoid real local surnames for invented patients (Pedler is a common Cummins-district name).

## SAAS clinical site

- Protocol PDFs: `https://clinical.saambulance.sa.gov.au/assets/pdf/home/<Name - AO>.pdf` (spaces as `%20`).
- Severity and treatment tables (checklists): `.../assets/pdf/checklists/<Title>.pdf` (for example
  `AO%20Asthma%20Severity%20and%20Treatment.pdf`). These are images: render with `pdftoppm` and read the picture.
- Procedures: `.../assets/files/<CPPRO-0xx Name>.pdf`. Names and section codes are listed in the site's `main.*.js`.
- Do not click the site's disclaimer button. The menu data server (`bundles.media4learning.com`) refuses access:
  ask the owner for a link or PDF instead.
- Paramedic guidelines: `.../assets/pdf/home/<Title> - P.pdf`, with any "/" in the title dropped (e.g.
  `Chest%20PainAcute%20Coronary%20Syndromes%20-%20P.pdf`). Titles are in `main.*.js`. Postpartum Haemorrhage - P and
  Severe Head Injury - P have no PDF ("Missing doc"). Most P PDFs have no doses: those are in the app.
- SAAS app dose tables: `main.*.js` holds the dose calculator data as one `JSON.parse('[...]')` array (find
  `"monograph":"DMO-`): 371 rows, 38 medicines (31 Aug 2026), each with medicine, indication, route, age group, formula,
  presentation, doses by age and weight, repeat, info, `scope` per level (aa, ar, ao, aoext = authorised AO, p, icp, ecp:
  "Y" or "Consult") and the linked guideline per level (`cpg`). Use it for doses the protocol PDFs leave out.
- GTN for AO chest pain: the app lists it as "Consult", but the owner confirmed (8 Nov 2026) that the AO crew may still
  give the FIRST dose without a consult if SBP and HR are within the protocol limits, then consult for further doses.
  Only when the patient's own GTN is prescribed; not prescribed = consult first (owner, 22 Nov 2026).
- Salbutamol MDI for AO asthma: give without a consult, as CPP-050-AO says (owner, 22 Nov 2026; the app lists Consult).
- Benzylpenicillin: follow CPP-062-AO Sepsis (ceftriaxone); benzylpenicillin is to be changed over for ceftriaxone
  (owner, 22 Nov 2026).
- Co-Phenylcaine Forte: AOs may use it to insert an NPA (owner, 22 Nov 2026; the app lists paramedic and above).
- Ipratropium MDI for AO asthma: on EOC Clinician consult, doses as per the paramedic guideline (owner, 22 Nov 2026).
- Nasal cannula: AOs may use it, up to 4 L/min, whenever a protocol says oxygen may be needed (owner, 22 Nov 2026).
  CPP-004-AO lists face mask, NRB or IPPV; where a protocol says high-flow oxygen, the mask it names is used.
  ACPO GTN stays consult-first.
- Eyre Peninsula call signs (owner, 11 Nov 2026): XX81 for jobs between 0800 and 1800, XX181 between 1800 and 0800
  (Tumby Bay TB81 / TB181, Cleve CL81 / CL181, Port Neill PT181 at night). Use them in MDT screenshots and jobs.
  Team letters (owner, 16 Nov 2026): TB Tumby Bay, CU Cummins, PT Port Neill, CF Coffin Bay, CL Cleve, CW Cowell,
  KI Kimba, LK Lock, SB Streaky Bay, PK Port Kenny, WU Wudinna, EL Elliston. CO is the team leader call sign (the
  number is the person), not Cowell.
- Resus Room podcast RSS: `https://theresusroom.libsyn.com/rss` (follow redirects). Link only episodes found there.

## Where the detail is

History, sources and the owner's decisions for each area are in `.claude/status/`. Read the file for the area you are
working in before changing anything there; do not load them all.

| File | Covers |
|---|---|
| `microlearning.md` | Every module under `/microlearning/` (AO, paramedic, RN), the Protocol Chase game, bushfire and burnover |
| `walkthroughs.md` | The converted walk-throughs under `/modules/`: patient, setting, owner's clinical choices |
| `stations.md` | Skills stations under `/stations/` |
| `mdt.md` | MDT simulator, job library, saved jobs, queue, GPS, user guide |
| `customiser.md` | Scenario customiser and its Supabase templates |
| `pcr.md` | PCR trainer, job builder, the owner's scenario writer |
| `classroom.md` | Case-night slide decks |
| `hub.md` | Main page, Learn, Run a session, glossaries, topic categories, feedback |
| `access.md` | Sign-in, gates, roles, Grant access, password rules |
| `dashboard.md` | Lead instructor dashboard, tasks, Siri quick add, volunteer contribution |
| `rosters.md` | Roster Apps Script backend and the decisions for the Supabase roster move |
| `ar-course.md` | Ambulance Responder course page, bookings, Day 6 stations and slides |
| `tools.md` | Obstetric companion, treatment simulator |
| `vehicle-check.md` | Vehicle check app (`/vehicle-check/`), FRM-384 checklist data, stock-to-order list, Supabase tables |

What exists for each topic (module, walk-through, MDT job, customiser, stations, PCR job, slides) is listed in
`hub/topics.js`; the check script confirms each entry points at something real. The 34 AO protocols, what is covered
and the suggested build order are in `.claude/references/ao-protocols.md`.

For a new walk-through, wire up all of: a topic in `hub/topics.js`, a line in `microlearning/shared/related.js`, a card
on `/ao/`, an MDT job in `mdt/jobs.js`, a PCR job in `tools/pcr/jobs.js` (and `pcr:` on the topic), a customiser
template, and a feedback slide if it gets a case-night deck. The check script lists what is missing.

## Health check (15 Nov 2026)

A whole-repo and Supabase review was done on 15 Nov 2026. Done from it: one cache tag and the stamp script, the check
script, this file split into `.claude/status/`, PR #87 closed, two dead links on `/gp-clinic/` turned into "In
Development" cards. Raised with the owner and NOT yet decided or done:

- 44 active accounts (38 students, 6 facilitators) are still on the shared starter password; "must change password" is
  enforced by the pages only.
- Pager copy in Supabase (`paging_jobs`): fed by the claude.ai scheduled task "DSY pager capture" at 5:35 am, 11:35 am
  and 5:35 pm Adelaide (19 Nov 2026); not in this repo. It no longer copies rosters (see `rosters.md`).
- Supabase advisor tidy-up: leaked-password protection off; `protect_profile_fields()` and `require_allowed_id()`
  callable by anon (trigger functions, harmless); `norm_id`, `course_today`, `course_starts_at` have no fixed search
  path; anon holds full grants on most tables, so RLS is the only barrier. The `upcoming_sessions` view is security
  definer on purpose (members see lesson titles through it).
- `.claude/vehicle-log/` (rego, odometer, private diary link) sits in this public repo.
- Roster pages are open to anyone with the address (planned to close with the Supabase roster move).
- 17 old pages (`/ao/`, `/classic/`, `/paramedic/`, `/rural-ed/`, `/gp-clinic/` and old `/modules/*`) load pictures from
  `cdn.simtheory.ai`.
- Not linked from anywhere, owner to say which can go: `/LOGO files/`, `/modules/asthma/`, `/modules/rural-ed/`,
  `/tools/roster-share/`, `/modules/rosters/lowereyre/test/`, `/modules/rosters/lowereyre/coverage-gaps-6h/`.
  `/modules/hypoglycaemia/` is an old page replaced by the new module and walk-through.
- Old branches: 50 are fully merged into main and safe to delete, 41 more hold one or two commits that never reached
  main (mostly notes or superseded roster work). Claude's session is not allowed to delete branches: the owner
  deletes them on GitHub (Branches page), or turns on "Automatically delete head branches" in the repo settings.
- The test row in `public.feedback` (id 1, source `test`) is still there: the delete needs the owner's approval prompt.

## Open work

- PRs #155 (more than one lesson per session), #133 (sepsis skills stations) and #119 (NSW ECAT protocols in the
  rural ED asthma/COPD module) were folded into the health check PR #236 on 15 Nov 2026 (owner: merge them as long
  as nothing newer is overwritten). The rural ED module's intro video was narrated before the ECAT additions.
- Team Leader microlearning (`/microlearning/leaders/`, started 21 Nov 2026): module 1 Your dashboard live
  (PR #305, merged 21 Nov 2026). Module 3 Training nights live
  (PR #306, merged 21 Nov 2026). Modules 4 People and passwords and 6 Your team page live (21 Nov 2026).
  Modules 2 Crewing gaps and 5 Relief cover live (on main). All six are linked from the user guides.
  Learning order for a new Team Leader (23 Nov 2026): dashboard, people, gaps, training nights, relief, team page,
  with Next links, a Start here card on `/userguides/` and the guide in the same order (on a branch, not merged).
- Volunteer Team Leader level (22 Nov 2026): one per team, facilitator + roster manager for their team, team dashboard
  `/dashboard/team/`, set on Grant access (see `access.md`). Live (PR #320, merged 22 Nov 2026). Owner to name the VTLs.
- Stations still to build: snake bite, pain. The sepsis stations are not a lesson yet.
- No MDT job yet: burns, spinal. No customiser yet: spinal.
- Next modules: seizures, amputation and haemorrhage (no walk-throughs exist for these). The MVA hypo scenario
  (`/modules/hypo/`) is to be converted when asked.
- Retire `/course/` (Google Sheet app) once the current AR group finishes; `/ar/course/` replaces it.
- Planned: a request portal (`/request/`) with an inbox panel on the dashboard; the Supabase roster (see `rosters.md`; stages 1 to 6 done by 18 Nov 2026 (database, people, emails, new roster page on the Summer Bay test roster, import rehearsal, dashboards); all 12 teams on the new roster: Lower Eyre and Central Eyre since 18 Nov 2026, West Coast since 19 Nov 2026 (stage 7); still to do: stage 8 tidy up).

- User guide (17 Nov 2026): Team Leader section, roster guide Part 3, Getting started and Running a session done;
  still to write: Learning on your own. Ask DSY on the dashboard: live, on Claude since 18 Nov 2026 (key `ANTHROPIC_API_KEY` in
  Supabase secrets); working (owner, 18 Nov 2026).
- Crewing gaps for Team Leaders (`/dashboard/coverage/`, own rules per leader; see `rosters.md`): live (PR #252,
  merged 16 Nov 2026); owner to try it with a real sign-in. Reads each team from the Apps Script or, once the team has moved, Supabase (stage 6, 18 Nov 2026).

Update this list as work is done.
