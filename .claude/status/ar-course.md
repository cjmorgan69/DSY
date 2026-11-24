# Ambulance Responder course

`/ar/`, `/ar/course/`, the Day 6 stations and the classroom decks.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## Day 6 skills stations

AR course Day 6 stations (`/stations/ar-day6/`, 27 Oct 2026, for the owner's Day 6 of the Far North West Coast
Recruit to Ambulance Responder course checklist): eight stations on the AR protocols and scope (not AO): 1 asthma
severity and MDI (CPP-048-AR v3.2, CTL-083), 2 nebs under 6 and 6+, 3 anaphylaxis and IM adrenaline (CPP-022-AR: own
auto-injector first, ampoule only on EOC advice), 4 aspirin and GTN tablet (CPP-029-AR: GTN only on EOC advice), 5
BGL and oral glucose (CPP-031-AR, no glucagon), 6 prepare the IV line for the paramedic (CSSG p62 to 64 lists IV
set-up as AO scope only; owner chose this pitch), 7 assist a normal birth (CPP-060-AR v1.0), 8 newborn APGAR, warmth
and resus (CPP-035-AR v3.0, CTL-061, CPPRO-046). Flagged: CPP-048-AR says 12 puffs at 6 or over and 6 puffs at 1 to
6 while CTL-083 says under/over 6 (exactly 6 = consult); CPP-035-AR newborn BGL consult threshold reads 2.5 or below
in the protocol and 2.5 or above in the principle. On main (checked 15 Nov 2026); linked from `/ar/` (the panel on
Run a session was removed 11 Nov 2026).

## Day 6 classroom slides (Medical Conditions)

AR Day 6 classroom slides (`/classroom/medical-conditions/`, 28 Oct 2026): the SAAS Medical Conditions (AR) workshop
as a slide show (same engine as `/classroom/manual-tasks/`, plus table and station slides with QR codes to the Day 6
stations), from the Facilitator Guide and PowerPoint v3.0 260114 and the Study Guide v2.2 (owner's PDFs, OFFICIAL,
not in the repo). Flagged in the notes: APGAR (guide says ARs don't score it; deck, study guide and CPP-035-AR say
they do), cord clamps (3-5/10/15 cm vs CPP-060-AR 10/15/20 cm), breech (support vs all fours), IV set-up (assessed
for ARs vs CSSG AO scope). Live 28 Oct 2026, linked from the Day 6 stations page. SAAS gave permission to use their
pictures and videos: ten pictures from the PowerPoint, the deck's asthma video, and the study guide videos as
optional slides (older SAAS Vimeo videos are link-only because Vimeo blocks them on other sites; the five unlisted
birth and newborn videos and the Stroke Foundation YouTube clip embed).

## Course page

Ambulance Responder course page (`/ar/`, 11 Nov 2026, owner; facilitator gate): presentations (Day 6 Medical
Conditions, DRiVE, Manual Tasks: Slides / Presenter / Guide each), the Day 6 skills stations (Stations / Setup /
Print), and the `/course/` workshop bookings app. Linked by a small button at the bottom of the home page; the Day 6
panel was removed from Run a session. Add new AR course material here.

By day (21 Nov 2026, owner): the page now lists Day 1 to 7 as collapsible panels, topics taken from the course
completion checklist (the same Day/module list as `/ar/signoff/`), each with the skills, a Presentation row (Slides /
Presenter / Guide) and a Skills stations row (Stations / Setup / Print). Built: Manual Tasks deck (Day 1, and Day 2 as
"continued", same deck), DRiVE deck (Day 4), Medical Conditions deck and the Day 6 stations (Day 6). Everything else is
a grey "Coming soon" placeholder: swap a placeholder for links when its material is built. Live (PR #297, merged 21 Nov 2026).

## Course bookings (Supabase version)

AR course bookings, Supabase version (`/ar/course/`, 13 Nov 2026, student gate; the owner keeps the Google Sheet app
`/course/` for the current group and adds its extra dates in the sheet; the sheet is not visible to the Drive
connector): DSY sign-in, students matched to a group by ambulance ID (`course_students.staff_id` =
norm_id(profiles.staff_id)); tables `course_cohorts`, `course_days` (title + material links per day),
`course_workshops`, `course_students`, `course_bookings` (confirmed / waitlist / cancelled), `course_attendance`
(present / late / left early / absent + note; present and late = day done), `course_unavailable`, `course_events`
(Changes tab); RLS facilitator-only, students use the `course_*` functions (book or switch, waiting list with
automatic move-up, cancel cut-off per group, default 48 h; can't-make notes). Leaders adding students also put the
IDs on `allowed_ids`. SQL in `supabase/course-setup.sql`: the approval prompt for apply_migration timed out (13 Nov
2026), so the owner ran it in the SQL Editor (the tables exist; no groups set up yet, checked 15 Nov 2026). On main.

## Skill sign-off navigator

`/ar/signoff/` (21 Nov 2026, owner; facilitator gate): every Day 1 to 7 skill of the FNWC Recruit to AR course
checklist, grouped by day and module, each opening its saaslearn checklist report
(`saaslearn.com.au/moodle/mod/checklist/report.php?id=<id>&group=<group>[&editchecks=on]`). Stations and Moodle groups:
Tumby Bay 44930, Cummins 44935, Coffin Bay 44926, Port Neill 44932, or all. "Finished" ticks are per browser
(localStorage `fnwc-signoff-nav`), not sent to Moodle; no student names on the page. Moved in from the owner's
standalone artifact. Linked from `/ar/` under "Skill sign-off". Live (PR #288, merged 21 Nov 2026).

Stations (21 Nov 2026): multi-select; with several chosen each skill gets one Open button per station (its Moodle
group, with Edit checks); "All stations" = no group. Finished ticks are per station choice.

Student picker: built 21 Nov 2026 (PRs #290, #292, #294: pick students from the course group, open
`report.php?id=<skill>&studentid=<moodle_id>`), then removed the same day at the owner's request because the group
view gives Edit checks and individual sign-off does not. Left in place: `course_students.station` and `moodle_id`
columns (no page uses them now) and the test group "TEST: AR course Tumby Bay (sign-off trial)" (9 students,
placeholder staff IDs TEST-<n> so students do not see it). Live (PR #295, merged 21 Nov 2026). The test group was
deleted at the owner's request on 24 Nov 2026 (with its 9 students and 2 induction ticks); no course groups exist now.

## Build the course and the people picker (21 Nov 2026, owner)

`/ar/course/` facilitator view:
- Dates tab, "Build the course": one row per course day (the group's days, or the 7 AR days from the completion
  checklist when the group has none), each with a tick, date and start time (default 09:00; adding a date ticks the
  day), plus finish, location and places for all ticked days. Saves one `course_workshops` row per ticked day; for a
  group with no days yet it also saves the AR day titles to `course_days`. "+ Add a date" still adds single dates.
  "+ Another date for Day N" adds more date/time lines to a day (students book one of them). "+ Add a consolidation
  day" adds the next day number titled "Consolidation" (saved to `course_days`); it is extra: if the group has no
  days to complete set, saving sets it to the course days (excluding consolidation), and completion now counts only
  days up to `total_days` (student progress, Progress tab, printed record), so a consolidation day can't replace a
  missed course day.
- New group: "Start with the AR course days (Day 1 to 7)" (ticked by default; sets the titles and total days 7).
  "Copy the course days from <group>" is now unticked by default and wins when both are ticked.
- Students tab, "Add students from the people list": `course_people()` (security definer, facilitators only; SQL in
  `supabase/course-people.sql`, applied 21 Nov 2026) returns ID, name (preferred name first), teams and signed up, from
  profiles + memberships and from expected_members not yet signed up. Team filter, search, tick, "Add N students" calls
  `course_add_students` (name split: first word = first name). People already in the group show ticked "In group".
  The paste box stays below as "Or paste students".
Tested with stand-in data; rehearsed `course_people()` as a facilitator (160 people, 13 teams) and as a member (0).
Live (PR #298, merged 21 Nov 2026).

## AR course card in the training calendar (21 Nov 2026, owner)

`/training/` member view (not the leader view): `loadMember` also calls `course_home()`; if the person is enrolled
in an active AR course group, a separate "Your course" card sits above the team sessions (the owner first had the
dates mixed into the team list, then asked for a separate card as less crowded). The card (no days-done count: owner
asked to leave it out) shows the student's upcoming booked and waiting-list dates (Cancel / Leave list;
inside the group's cut-off it says to tell the facilitator; the roll result once marked: Attended, late, left early,
absent), a "Dates to book (n)" fold with the dates for days not booked or done (Book, or Join waiting list when full;
consolidation days marked Extra; the fold stays open after booking), and a link to `/ar/course/`. Bookings and
attendance stay in the `course_*` tables (`course_book`, `course_cancel`). Team sessions list unchanged. If
`course_home()` fails the calendar still loads. Team Page "next session" does not include AR dates. Tested with
stand-in data. Live (PR #299, merged 21 Nov 2026).

## User guide and dashboard link (21 Nov 2026, owner)

Team Leader Guide section 14 "Setting up an AR course" (`/userguides/leaders/#ar-course`; "If something isn't
working" is now 15): create the group, Build the course, add students from the people list, students book from the
training calendar card, roll and Progress, skill sign-off navigator, archive. Ask DSY reads this page, so keep it true
when `/ar/course/` changes. Dashboard footer (phone and wide) has an "AR course" link to `/ar/course/`.
Live (PR #301, merged 21 Nov 2026), checked on the live site.

Per-date locations (21 Nov 2026, owner): in Build the course every date line has its own Location box; the shared
"Location (any date left blank)" fills the blanks. Guide section 14 says so. Live (PR #303, merged 21 Nov 2026).

## AR days update (24 Nov 2026, owner)

Course builder days (`AR_DAYS` in `ar/course/app.js`): 1 Infection control, operational safety, manual tasks;
2 Manual tasks (continued); 3 Operational preparedness (GRN radio and MDT), DRiVE principles and knowledge; 4 DRiVE
practical assessments; 5 Foundations of care, cardiac arrest, resuscitation; 6 Medical conditions; 7 Traumatic
injuries; 8 and 9 Consolidation (extra); 10 Stress management (online webinar). "First aid" left out of the day
titles (owner). Days to complete for a new AR group = 8 (every day except consolidation).
Consolidation is now an explicit flag, `course_days.extra` (migration `course_days_extra`, 24 Nov 2026; `course_home()`
returns it), instead of "day number after total_days": completion everywhere (student view, Progress tab, printed
record, training calendar card) counts done days that are not extra; total = `total_days`, else the number of
non-extra days. "+ Add a consolidation day" saves extra = true.
`/ar/` page: Day 1 adds Operational Safety, Day 3 adds DRiVE Principles and Knowledge (the DRiVE deck moved there from
Day 4, which keeps placeholders), Days 8 and 9 Consolidation panels, Day 10 Stress Management (online webinar, presentation
placeholders only). The `/ar/` topics keep the checklist module names (First Aid and AA Protocols) because they list
the sign-off skills. Guide section 14 updated. Live (PR #345, merged 24 Nov 2026).

## Induction (24 Nov 2026, owner)

Pre-course induction, done as soon as a student has a SAAS ID. `/ar/course/` Induction tab: students with
"n / 27" (Not started / n of 26 done / Induction complete); tap one for the checklist (`#ind=<student id>`): Paperwork
and accounts (photo emailed to HealthSAASSecurity-Access@sa.gov.au for photo ID card and bi-lock key, pager, uniform on
wwgonline.com.au, AR course enrolment on VETenrol (permanent link `https://enrol.vetenrol.com.au/?clientid=vt-saas&occuID=75700`, from the SAAS welcome email, 24 Nov 2026: links with `(S(...))` in them carry a session code and expire; this one makes a fresh session each visit; `occuID` is this course occurrence, so a new intake may need a new one), vendor form and Ambulance Cover (welcome email), MFA,
SAAS login, eLearning login), Practical (infection control prac, link to the sign-off navigator; Adult CPR simulation, the Day 1 sign-off, linked to saaslearn checklist 26191, added 24 Nov 2026, so 27 items), Induction declaration
(15 statements in the owner's wording, Fatigue Management link `course/view.php?id=28`, and "Declaration submitted"
with the questionnaire link `mod/questionnaire/view.php?id=15344`). Items are `INDUCTION` in `ar/course/app.js`; ticks
in `public.course_induction` (student_id, item, done, note, done_at, done_by; facilitator-only RLS; migration
`course_induction`, SQL in `supabase/course-induction.sql`). Ticks save on change; Print. Scheduling: Day 0 "Induction
(pre-course)" is the first AR day in Build the course and new groups (extra = true, so not counted in the 8 days);
Day 0 shows as "Induction" everywhere (trackers show "I"). `/ar/` has an Induction panel linking to the checklist;
guide section 14 explains it. The welcome email itself is not built (vendor form and Ambulance Cover are ticks only).
Live (PR #345, merged 24 Nov 2026).

Forms (24 Nov 2026, owner): the blank Vendor Creation Form and Ambulance Cover Application (Volunteers) PDFs are stored
in Supabase `public.course_forms` (not in this public repo: the vendor form names a SAAS manager with contact details),
downloadable by any signed-in user through `course_form(key)` (keys `vendor`, `cover`; SQL and checksums in
`supabase/course-forms.sql`). Download buttons: the training calendar AR card ("Forms from your welcome email") and the
vendor and cover items on the induction checklist. Live (PR #345, merged 24 Nov 2026).

Induction station links (24 Nov 2026, owner): the student's station comes from their DSY team (`course_people()`
teams, matched on ambulance ID); teams Tumby Bay, Cummins, Coffin Bay and Port Neill map to the saaslearn groups
44930, 44935, 44926, 44932 (same as `/ar/signoff/`). Practical links go straight to saaslearn with that group and Edit
checks: infection control prac = Hand washing 32338, Hand rub 32337, PPE 32339; Adult CPR 26191. No team, or a team with
no saaslearn group: the links show all students and the page says why. Live (PR #350, merged 24 Nov 2026).

saaslearn groups are numbered per course (24 Nov 2026): the "First Aid and AA Protocols" skills (26xxx, e.g. Adult CPR
26191) are in a different saaslearn course from the infection control ones, so their station groups are Tumby Bay
29693, Cummins 29750, Coffin Bay 29747, Port Neill 29759 (owner, read from the Adult CPR sign-off page). The navigator
(`fa` on each station, used for that module) and the induction checklist (Adult CPR link) use them; every other skill
keeps 44930 / 44935 / 44926 / 44932. Only infection control (44930) and Adult CPR (29693) are confirmed by the owner;
the other modules (Manual Tasks, Operational Preparedness, DRiVE, Foundations of Care, Cardiac Arrest, SAAS
Resuscitation, Medical Conditions, Traumatic Injuries) may be in other courses with their own numbers: owner to
spot-check one of each. Live (PR #353, merged 24 Nov 2026).

saaslearn group finder (24 Nov 2026, owner): `/ar/signoff/groups/` (facilitator gate), linked from the navigator's
note. A bookmarklet (code embedded in the page; Copy button; iPhone Safari steps; drag link on a computer) that, run on
a saaslearn checklist page, lists the course (first breadcrumb), the page, the skill id and every group as
"Name = number" (from the group select options, group links or data-group-id), with Copy. Read-only, sends nothing.
The page links one skill from each of the 10 checklist modules. Purpose: get every Eyre Peninsula team's group number
per saaslearn course, then add the other teams as stations in the navigator and checklist. Tested on mock pages
(select, links, none); not yet tried on saaslearn itself. Live (PR #353, merged 24 Nov 2026).
