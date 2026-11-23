# Walk-through scenarios

The converted walk-throughs under `/modules/` (facilitator and student versions), with each patient, setting and the
owner's clinical choices.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## Asthma (Karen)

Walk-through scenarios: asthma-ao rebuilt and linked with the asthma module (lesson added).

## Chest pain (Graham)

Chest pain (`/modules/chest-pain/`, Graham 62) rebuilt and linked with the chest pain module (live, lesson added).
Owner's chest pain guidance: GTN 300 microg tablet or 400 microg spray both acceptable (SAAS changing back to spray;
protocol still says 300 microg); patient who used own GTN: crew may give the first dose if BP and HR are in limits,
then consult the EOC Clinician for a plan; adequate oxygenation = SpO2 above 94% on air, else nasal cannula to bring
it above 94%; no CPR detail in scenarios.

## Envenomation (Greg)

Envenomation (`/modules/envenomation/`, Greg 52, brown snake) rebuilt and linked with the envenomation module (live,
lesson added); owner: longboard or carry chair both fine, chosen by helpers and distance, as long as movement is
minimal and timely. Owner (22 Nov 2026): the crew is paged from Cummins, not Port Lincoln (25 minutes to
scene and Port Lincoln Hospital 30 minutes unchanged); live (PR #317, merged 22 Nov 2026).

## Anaphylaxis (David)

Anaphylaxis (`/modules/anaphylaxis/`, David 54, bee sting) rebuilt from the paramedic CPG onto CPP-003-AO and linked
with the module (live, lesson added); owner: driver calls the EOC Clinician as soon as possible; if the patient
looks really sick use an expired EpiPen immediately, otherwise follow EOC directions; the Red Kit carries adrenaline
1000 microg in 1 mL.

## Stroke (Frank)

Stroke (`/modules/stroke-AO/`, Frank 78, Coffin Bay) rebuilt on CPP-016-AO v6.0 (9-hour window) with ROSIER+ACT
(CTL-066) and linked with the module (live, lesson added); owner: local Code Stroke notification is that the EOC
Clinician may contact Port Lincoln Hospital and/or the crew notifies by GRN radio.

## Hypoglycaemia (Ron)

Hypoglycaemia: `/modules/hypo/` is an MVA walk-through (convert separately, later) and `/modules/hypoglycaemia` is
an old short learning page, not a scenario. Owner chose a new non-trauma walk-through: `/modules/hypoglycaemia-ao/`
(Ron 67, near Cummins; not Port Lincoln, which has paramedics), all DSY-written on CPP-009-AO (live, lesson added).

## Sepsis (Robert)

Sepsis (`/modules/sepsis/`, Robert 71, near Tumby Bay) rebuilt on CPP-062-AO and linked with the sepsis module
(live, lesson added); owner chose: the crew raises ceftriaxone (febrile, altered conscious state) and the EOC
Clinician declines; preparation is practised.

## Pain (Gary)

Pain (`/modules/pain-management/`, Gary 58, shed-roof fall near Cummins) rebuilt on CPP-013-AO v7.2 and linked with
the pain module (live, lesson added); owner chose: ibuprofen withheld and raised with the EOC Clinician (on
perindopril, any ambiguity = withhold), ketamine wafer as the main escalation, IN fentanyl as a variation.

## ACPO (Kevin)

ACPO (`/modules/APO/`, Kevin 72, 3am, small Eyre Peninsula township) rebuilt on CPP-001-AO v4.2 and linked with the
ACPO module (live, lesson added); GTN 400 microg spray x2 on EOC advice, spray technique per CPPRO-009, aspirin and
CPAP removed.

## Headache (Ian)

Headache (`/modules/headache -ao/`, URL has a space: /modules/headache%20-ao/; Ian 62, Coffin Bay caravan park,
renamed from Graham) rebuilt on CPP-061-AO v1.0 and linked with the headache module (live, lesson added); protocol's
ten red flags, request clinical support (Port Lincoln paramedics), ondansetron per CPP-047-AO, ibuprofen withheld
(perindopril).

## Nausea and vomiting (Helen)

Nausea and vomiting (`/modules/nausea-vomiting/`, Helen 62 near Cummins, renamed from Margaret) rebuilt on
CPP-047-AO v2.3 and linked with the nausea module (live, lesson added); AF as one precaution, second 4 mg on EOC
advice, BGL thresholds per CPP-009-AO (3.5).

## High-speed MVA (Jason)

Walk-through `/modules/mva-ao/` (Jason 34, rollover on the Tod Highway 9 km south of Cummins, 27 Oct 2026, all
DSY-written on CPP-063-AO, CTL-070, CTL-042, CPP-004/018/158-AO; owner approved the outline): walking after
self-extrication (CPP-018-AO), baseline set at a+6 all white (pain 4/10 kept white so the 3-yellow trigger is not
met at set 2), set 2 RR and pulse yellow, set 3 yellow to red + GCS 14 + HR 124 = escalate and MTT Level 1, BP falls
to 100 en route; Port Lincoln Hospital with the EOC Clinician arranging retrieval and MedSTAR (owner); paramedics
from Port Lincoln meet the crew at a+61. Linked both ways with the module, card on `/ao/`, hub topic has
walk/mdt/custom. MDT job `mva` (P1, own custom()), customiser template `mva-ao` (14 fields; page 17:00 to 18:00
winter evening, backup fixed at 40 min, patient stays male, age 18 to 60) published. On main (checked 15 Nov 2026).

## Falls (Mavis)

Falls walk-through `/modules/falls-ao/` (Mavis, 81, Cummins, pendant alarm 0630 winter, long lie on the bathroom
floor since 3 am, 27 Oct 2026, all DSY-written; owner approved the outline and chose transport): no injury, no
anticoagulant, perindopril dose increased last week; can't bridge, so the Raizer (tile row); sitting up she is
dizzy, BP 132 to 104, and says she felt the same before the fall = possible medical cause, transport to Cummins
Hospital; Braden 14 handed over. Stay-home path (FROP 4, urgent CRU) is variation 1. Sources CPP-045-AO,
CPPRO-001/002/003, CTL-003, CTL-010, CTL-070, Raizer II manual. Linked with the module (related.js), card on `/ao/`,
hub topic has walk/mdt/custom/stations. MDT job `falls` (P2, generic custom mapping), customiser template `falls-ao`
(10 fields; page 06:15 to 06:45, patient stays female, age 70 to 95, sceneMinutes 45), published. Live 27 Oct 2026,
lesson added.

## Spinal precautions (Neil)

Walk-through `/modules/spinal-ao/` (Neil Haddon 67, Tumby Bay, Saturday in April 1426, all DSY-written): stop him
moving at the kitchen table, GCS 14 (V4), red flags, towel roll not collar, paracetamol + methoxyflurane for the
move, no ibuprofen (taken at 1230), no ketamine (GCS, over 64), ondansetron before transport, EOC Clinician sends
him to Tumby Bay Hospital for assessment, with transfer on to Port Lincoln arranged by the hospital (owner, 3 Nov
2026); handover at Tumby Bay Hospital at 1512. Card on `/ao/`, related.js, hub topic `spinal` (module, walk,
stations; no MDT job or customiser yet).

## Dementia (Jo-Anne)

Walk-through `/modules/dementia-ao/` (Jo-Anne Smith 84, farmhouse near Cummins, 1840 in May, husband Ray; owner
chose home setting and pain + possible infection; all DSY-written): risk assessment, one voice, LOWLINE, acknowledge
and redirect, hearing aids, toilet, PAINAD 7 to 2, SAT +2 to 0, MSE, NEWS2 4 (new confusion), paracetamol 1 g
(CPP-013-AO), EOC Clinician: no medication, voluntary transport to Cummins Hospital with Ray. Variations: knife
(CTL-011), de-escalation fails (lorazepam/olanzapine on EOC advice, care and control), low BGL. Linked via
related.js, card on `/ao/`, hub topic `dementia`. Live 10 Nov 2026 (PR #194).

## Dementia extras: MDT job, customiser, PCR job, stations

Extras (10 Nov 2026, owner asked; all DSY-written, owner to review): MDT job `dementia` (P2, generic custom
mapping), customiser template `dementia-ao` (11 fields; page 17:00 to 20:30 (end of her day; morning paracetamol
over 4 h ago), age 80 to 89 so "An 8x-year-old" reads right, husband stays 86, sceneMinutes 56;
`scenarios/tools/convert-dementia.js`) published 10 Nov 2026; PCR job `joan` (PAINAD on the pain line, MSE in CNS);
stations `/stations/dementia/` (1 risk, STAMP, SAT; 2 LOWLINE role play with acknowledge-and-redirect lines; 3
PAINAD cards + paracetamol; 4 obs with consent, NEWS2, MSE; 5 when de-escalation fails, EOC call, CTL-125 statement;
no restraint practice). Extras live 10 Nov 2026 (PR #195).

## Dementia patient renamed

Dementia patient renamed 10 Nov 2026 (owner): Joan Pedler -> Jo-Anne Smith everywhere (Pedler is a common
Cummins-district name; avoid real local surnames); PCR job id `joanne`; customiser row updated in place (md5
checked). The narrated intro video of `/microlearning/dementia/` still says "Joan" (not re-recorded).
