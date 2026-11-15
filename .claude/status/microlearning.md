# Microlearning modules

The modules under `/microlearning/` (AO, paramedic and RN), the Protocol Chase game, and each module's sources and
owner decisions. Read `microlearning/README.md` before changing a module.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## The first six modules

Microlearning modules live: stroke, envenomation, hypoglycaemia, chest pain, anaphylaxis, asthma (all flow layout;
all but envenomation narrated by Lee). Each is a Supabase lesson.

## Sepsis

Sepsis (`/microlearning/sepsis/`, CPP-062-AO v1.0, assumes the crew carries ceftriaxone, narrated by Lee, Khan
Academy septic shock video embedded) is live, lesson added.

## Sepsis for rural nursing staff (RN)

Sepsis for rural nursing staff (`/microlearning/sepsis-nursing/`, navy theme, from the NSW CEC Adult Sepsis Pathway
SMR060.400 and ACI ECAT A3.4 "Sepsis (suspected)"; ECAT review date Jan 2026 has passed; ECAT page is behind
Cloudflare, the owner pasted its HTML) is live and listed on the RN page; the owner did not want it added as a
lesson.

## Falls

Falls (`/microlearning/falls/`, CPP-045-AO v1.0 with CTL-003 FROP, CTL-010 Braden, CPPRO-001/002/003, all CPPROs
past their Dec 2019 review date; Country SA referral (CRU) only, as the owner asked; narrated by Lee, Resus Room hip
fracture episode linked) is live.

## Pain management

Pain management (`/microlearning/pain/`, CPP-013-AO v7.2 with CTL-097 sedation score and CPPRO-013 (review date Mar
2021 passed); owner chose: crew authorised for IN fentanyl via MAD only (adult dose from the SAAS app: up to 180
microg, 90 per nostril, total 400), children's fentanyl dose left to the EOC Clinician, SL ketamine included;
narrated by Lee) is live.

## ACPO

ACPO (`/microlearning/acpo/`, CPP-001-AO v4.2 with CPPRO-009 (review date June 2020 passed); GTN 300 microg tablet
or 400 microg spray; CPAP is ICP only; narrated by Lee) is live, lesson added.

## Headache

Headache (`/microlearning/headache/`, CPP-061-AO v1.0 (new Dec 2025) with CPP-047-AO ondansetron; red flag checker;
narrated by Lee) is live, lesson added.

## Nausea and vomiting

Nausea and vomiting (`/microlearning/nausea/`, CPP-047-AO v2.3, ondansetron checker; narrated by Lee) is live,
lesson added.

## Traumatic or hypoxic brain injury (paramedic)

First PARAMEDIC module: Traumatic or hypoxic brain injury (`/microlearning/tbi/`, CPG-144-P v1.0 June 2021, no
review date shown; saline aliquot checker; video pitched at paramedic level; narrated by Lee from three joined takes
because long takes developed hiss; video built). Owner chose: no midazolam or ketamine doses (early clinical support
for sedation only); Eyre Peninsula notification = local hospital or trauma bypass, MedSTAR notified via the EOC.
Live.

## Crush syndrome (paramedic)

Second PARAMEDIC module: Crush syndrome (`/microlearning/crush/`, CPG-135-P v1.0 Mar 2020, no review date shown; ICP
scope shown for reference from CPG-136-ICP v1.1 May 2026 and Hyperkalaemia CPG-179-ICP v1.0; paramedic salbutamol 5
mg neb on consult from the SAAS app; first narrated on eleven_v3 as an owner trial, which did not sound like Lee, so
re-narrated by Lee on eleven_v4 from two joined takes). Live, lesson added; the TBI module is also a lesson now.

## Burns (module, walk-through and customiser)

Burns (`/microlearning/burns/`, CPP-006-AO v5.0 Dec 2016, no review date shown, with CTL-050/051 rule of nines
tables; narrated by Lee, two takes) and the converted walk-through `/modules/burns/` (Daniel 42, diesel flash burn
near Port Neill, Tumby Bay Hospital 25 min). Owner chose: facial burns + singed eyebrows = suspected airway burn
(request clinical support, consult EOC, cover and transport urgently rather than finish cooling); paracetamol +
methoxyflurane, ibuprofen for trained crews, IN fentanyl/ketamine as a variation. Hub topic added (no MDT job yet).
Live 19 Oct 2026; both added as lessons 27 Oct 2026. Customiser template `burns-ao` (10 fields; page 17:00 to 18:45
autumn evening, transport 15 to 60 min so the en-route obs come before arrival, patient stays male, paramedic backup
fixed at 45 min); row published (checked 15 Nov 2026).

## Faint or fit? (paramedic)

Third PARAMEDIC module: Faint or fit? (`/microlearning/faint-or-fit/`, 24 Oct 2026, from the owner's job:
13-year-old, brief tonic-clonic jerking after syncope). Sources: CPG-022-P Seizures v6.0, CPG-137-P Universal Care
v1.1, CPG-154-P Treat and Refer v1.0, CPG-160-P Refusal Against Advice v1.0, plus RCH Melbourne CPGs (owner chose
RCH for the syncope part; SAAS has no syncope guideline): Syncope (Nov 2023), Seizures - acute management (June
2025), Basic paediatric ECG interpretation (Sept 2023); RCH "Afebrile seizures" is retired. Red flag checker,
faint-vs-seizure table, 12-lead box; narrated by Lee (two takes). Paramedic only for now (owner). Live 24 Oct 2026,
lesson added.

## Asthma or COPD? (paramedic)

Fourth PARAMEDIC module: Asthma or COPD? (`/microlearning/asthma-copd/`, 25 Oct 2026, from the owner's job: 67F,
COPD on home oxygen, asthma treated with nebs, ICP hydrocortisone and magnesium, CPAP under the COPD guideline; the
page calls it a hypothetical job with a paramedic and an ICP, as the owner asked). Sources: CPG-113-P v3.0 and
CPG-113-ICP (no version shown), CPG-115-P v2.0 and CPG-115-ICP v2.0, CTL-049 severity table, CPPRO-014 CPAP v1.0
(review date Apr 2021 passed); doses from the SAAS app. Magnesium is asthma only, CPAP is COPD only, adrenaline:
asthma says consider, COPD says may be harmful; the page does not choose between high-flow oxygen and 88 to 92%.
Severity and pathway checker; narrated by Lee (two takes). Live 25 Oct 2026, lesson added.

## Asthma or COPD? In the rural ED (RN)

Rural ED nursing module: Asthma or COPD? In the rural ED (`/microlearning/asthma-copd-ed/`, navy theme, listed on
the RN page, 25 Oct 2026). Sources: Australian Asthma Handbook v3.0 (2025) ED page (quotes TSANZ 2022 oxygen: 88 to
92% if at risk of hypercapnoea, including asthma with COPD), CARPA Standard Treatment Manual 8th ed (free PDF from
remotephcmanuals.com.au), COPD-X v2.78 (Dec 2025, read via the web fetch tool; copdx.org.au blocks curl). NSW ECAT
A2.2 (asthma) and A2.4 (COPD) added 25 Oct 2026 from PDFs the owner uploaded (ACI blocks automated access; PR #119,
folded into the 15 Nov 2026 health check PR #236): each protocol switches to the other for asthma with COPD, the
A2.4 oxygen caveat (88 to 92% only without distress; under 88% or distressed = more oxygen), no prednisolone after
hydrocortisone, no magnesium in either and no steroid in A2.4, plus ECAT doses, red flags and tests tables. The
LearnEM EDcare handbook (free login) was not read. Severity and
oxygen checker, ambulance handover section; narrated by Lee (two takes). On main and listed on the RN page (checked
15 Nov 2026); the owner did not want it added as a lesson.

## Notes and next modules

Note: Seizures - ICP (CPG-054-ICP) sends metro paediatric first-time seizures to WCH/FMC/LMH; the P version does
not. Next: seizures and amputation and haemorrhage modules (no walk-throughs exist for these). Print or save as PDF
button on scenario pages is live (19 Oct 2026).

## Protocol Chase game

Protocol Chase game (`/microlearning/game/`, 23 Oct 2026, maze-chase game for phones): a ghost catch or a power dot
pops a question from the chosen modules' Knowledge check quizzes (no new clinical content; options shuffled unless
one says "both"/"above"), 5, 8 or 12 s to answer; right = immunity and dots x2 for 10 s, or power-up; wrong = life
lost or no power, with the answer and why shown; missed questions listed at game over with module links.
`?m=slug,slug` preselects modules. Tile on the microlearning hub (`microlearning/index.html`, `chip`/`go` tile
options in `landing.js`); answer time defaults to 12 s (owner). Leaderboard (24 Oct 2026): Supabase
`public.game_scores` (player name or nickname, score, level, right of asked, answer secs, protocols = module folder
names; anon can read and insert only, owner removes rows in the dashboard); top 20 all time or this month on the
start screen and after saving at game over, protocols shown with codes.

## Baseline obs at a high-speed MVA

Baseline obs at a high-speed MVA (`/microlearning/mva-baseline/`, AO, 26 Oct 2026): new theme for the classic
`/modules/rural-mva/` page (kept as it is, owner). Sources: CPP-063-AO Prolonged Care v1.0 (two full sets in the
first hour, obs every 15 min, RDR escalation triggers), CTL-070 Adult RDR Chart, CTL-042 Major Trauma Tool v1.2
(adult tool has no speed criterion; only the children's has MVC 60 km/h), CPP-004-AO, CPP-042-AO, CPP-018-AO,
CPP-158-AO, CPPRO-045 (CPPRO-004 review date Aug 2018 passed). Owner chose: no Shock Index, no paramedic items;
compensated-shock wording is DSY's from the Khan Academy video (approved). Keeps the old page's Khan Academy shock
and tootRN lethal triad videos; the old Google Drive podcast was not carried over. Obs trend checker (baseline vs
latest set: RDR zones, escalation, MTT Level 1); white-to-red jumps treated as a trend (DSY reading). Narrated by
Lee (two takes). Hub topic added (module only). Live 26 Oct 2026, lesson added. 27 Oct 2026: owner felt "at least
two complete sets in the first hour" (CPP-063-AO) is too few for trauma, so the page no longer quotes it (or the RDR
chart's "min. 2 sets"): obs at least every 15 min, more often if concerned or in a trigger zone; that sentence was
cut from the intro audio (no new take).

## Spinal precautions

Spinal precautions (`/microlearning/spinal/`, "Walked in, still not cleared", AO, 3 Nov 2026): owner's case (Neil
67, ladder fall onto decking, ~2 min LOC, walked to the kitchen table, left hip pain, denies neck pain, concussed
and amnesic). Sources CPP-018-AO v5.0, CPPRO-021 v1.2 (review date Mar 2023 passed), CPP-013-AO v7.2, CPP-047-AO
v2.3, CPPRO-001. Owner chose: protocol's "fall over 1 m / 5 stairs" (not 1.5 m), modified towel roll not collar
(raised ICP concern), SAAS wording only (no NEXUS / Canadian C-spine), AOs don't clear a C-spine when risk factors
are present, module only. Red flag checker, towel roll tile row, ketamine wafer out (GCS, over 64).
Chair-to-stretcher move is DSY-written (owner to give team method). Narrated by Lee (two takes), video built. Live 3
Nov 2026 (PR #150). Lesson added 3 Nov 2026.

## Dementia and changed behaviours

Dementia and changed behaviours (`/microlearning/dementia/`, AO, 10 Nov 2026): CPP-017-AO Acute Behavioural
Disturbance - AO v7.1 (Jan 2025, no review date shown) with CTL-011, CTL-052, CTL-053 SAT, CTL-056 MSE, CTL-122
STAMP, CTL-123 LOWLINE, CTL-125 and CTL-094 PAINAD v1.0; PLST and NDB models and de-escalation points from the SAAS
CEP Semester 2 2026 Dementia session (owner's facilitator guide and PowerPoint, not in the repo); words from the
Dementia Australia Dementia Language Guidelines (2021). PAINAD scorer (no severity bands: CTL-094 has none).
Narrated by Lee (two takes). The session's de-escalation video (owner's YouTube, "dementia de escalation part 1",
vWBHc2wJUh8) is embedded in the De-escalate section (10 Nov 2026).

## Bushfire and burnover (presentation, module, burnover and health check stations)

Bushfire and burnover (13 Nov 2026, owner): the SAAS EMAP presentation "Bushfire Preparedness for SAAS Clinicians"
V3.0 (Oct 2025, owner's Google Slides link, anyone with the link; read via the drive.usercontent.google.com
download, the Drive connector can't see it) is a Supabase lesson (resources = the Slides link) and the Presentation
tile of hub topic `bushfire` (new category `safety` "Crew safety"; `slides` may now be a full https link). Module
`/microlearning/bushfire/` (AO list) and stations `/stations/burnover/` (real ambulance, pairs, Ambulance A stations
1-2, B stations 3-4, station 5 beside either, then a timed full drill) are built on PRO-239 Bushfire Burnover v2.6
(EMAP, effective 30 Sep 2026, review Oct 2027; owner's PDF, OFFICIAL, not in the repo), with the deck for fire
ratings, shift preparation, driving and the Pinery case. PRO-239 followed where the deck differs (recall =
continuous siren/horn blasts not yelp; hazard lights; patient under standard blankets + offered P2; light fleet rear
seat or footwell; exit when the sound of the fire has passed; side or back window; shift decided after the medical
officer's review; D-size oxygen off on entering a fireground; EOC directs all responses into fire areas). DSY
training rules: never press the GRN emergency call button, burnover blankets stay sealed, ambulance stays parked.
PRO-082 Response to Rural Fires v3.5 (Jan 2023, review Oct 2024 passed) added at the owner's request: warning
levels, ratings by 1700 for 4 days (replaces the deck's 4:30 pm), CFS SOP 2.21, aged care shelter in place,
Catastrophic days and personal bushfire plans. PRO-081 not read. Health check stations `/stations/health-checks/`
(13 Nov 2026, hub topic `health-checks` in Crew safety, stations only; hub pages now allow a topic with no
`module`): PRO-384 Health Checks for Emergency Service Personnel v1.0 (Mar 2025, review Jan 2026 passed; owner's
PDF, not in the repo) and its Health Check Form (owner's screenshot; wording quoted, form not reproduced), zones
from CTL-070 (live chart, exported 31.08.2026). Flagged: SpO2 89 or less is PURPLE on the form but RED on CTL-070
(instructor decides on the night). 4 table stations (request and set-up, obs on the form, rest 20 min with SCBA / 40
without and the form's four steps with six DSY firefighter cards, confidentiality and paperwork) and a health check
post finish. Bushfire module, burnover and health check stations live 13 Nov 2026 (PR #231). Narrated intro video
(Lee, two takes, 2:41) added 13 Nov 2026; cache tag 20261113b.
