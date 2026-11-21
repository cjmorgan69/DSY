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
