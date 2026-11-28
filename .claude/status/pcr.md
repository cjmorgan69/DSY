# PCR trainer

`/tools/pcr/`, the job builder and the owner's private scenario writer.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## PCR trainer

PCR trainer (`/tools/pcr/`, 6 Nov 2026): a copy of the paper patient report card (owner's photo of the blank card;
RDR obs chart with values written in their bands, body chart, Braden and falls boxes, drug tables), A4 landscape
print. The student does the walk-through first (owner), then writes the card; free text has the guide-card headings
(presenting complaint, PHx, Med'n, Hx, O/A, then O/E CNS, SKIN, CVS, RESP, PAIN each on its own line, 2* SURVEY only
when trauma is involved, Care + events); tapping any underlined heading opens "What goes here" (`help.js`, wording
from the owner's PCR guide card) and a possible entry for the job; "Show model card" swaps the whole worked card in;
work saved on the device (localStorage `dsy-pcr:<job>`). Jobs in `jobs.js` (DSY-written, owner to review): Mavis
(falls; live 6 Nov 2026, lesson added), then Graham (chest pain), Karen (asthma), Frank (stroke; the walk-through
has no clock times, so all times are DSY's) and Jason (MVA) (batch 2 live 6 Nov 2026, lessons added); batch 3: David
(anaphylaxis), Greg (snake bite), Ron (hypoglycaemia), Robert (sepsis), Gary (pain) (live, lessons added); batch 4:
Kevin (ACPO), Ian (headache), Helen (nausea), Daniel (burns), Neil (spinal): every AO walk-through now has a job.
Add a job for each new walk-through and set `pcr:` in `hub/topics.js` plus a "PCR trainer" line in `related.js`.
Owner's writing rules: write normal findings too ("nil resp distress"). All 15 live 6 Nov 2026, lessons added.

## PCR job builder

PCR job builder (`/tools/pcr/build/`, 8 Nov 2026, facilitator sign-in): the instructor writes a case card, the first
obs set and "responds / stays the same / deteriorates" (later sets worked out by a simple DSY rule, editable),
treatments (quick-add from the protocol's walk-through job), and an auto-drafted model card to edit; saved on the
device (`dsy-pcr-custom`) or shared as a link with the whole job in it (`/tools/pcr/#c=...`, nothing uploaded); the
trainer shows a case card button for these jobs. Prototype for the owner to try; on main (checked 15 Nov 2026). One
scenario = one PCR job (owner): `module.js` shows a "PCR trainer" related link only from the page's own protocol
code, not from its `relatedCodes`.

## PCR scenario writer (owner's private artifact)

PCR scenario writer (8 Nov 2026, owner's private claude.ai artifact, not in the repo): the owner types a job, picks
AO or Paramedic, a protocol or guideline (or "Generally unwell": basic or universal care, Treat and Refer, Refusal,
Prolonged Care, no drugs unless named) and the RDR zone counts; Claude (the artifact's sample capability) writes the
case card and model PCR from the walk-through card or the P guideline text plus the app dose table, checks the
zones, and gives a `/tools/pcr/#c=` link.

## Customised walk-throughs in the PCR trainer (22 Nov 2026)

The customiser has an "Open in PCR trainer" button for all 15 templates (`/tools/pcr/#s=<slug>&...`, same link as
the MDT). `tools/pcr/custom.js` rewrites the walk-through's job: first name and age, the person with the patient and
their name, scene town, road (MVA), hospital, backup town and minutes, and every clock time (an hour or more before
the page stays put; up to arrival moves with the page time; on scene also with the drive out; after leaving for
hospital also with the drive to hospital). Obs, treatment and doses are unchanged; dose cells in the drug table are
never treated as times. Checked with a script against every customiser template (page time, drive out, drive to
hospital, all three): each time the walk-through and the card share moves the same way (four times needed an
override, listed in `times`). The job shows in the list as "<name>, <age>: ... (customised)", links to the customised
student walk-through, and keeps its own saved work per customisation. Live (PR #318, merged 22 Nov 2026).


## Sam (refusal against advice)

PCR job `sam` (26 Nov 2026): treated and not transported; both VIRCA results in Care, the referral plan in
Recommendation, "Patient information provided" and "Clinical consult" ticked (`infoText` filled). First walk-through
job with a `caseCard` (dispatch, arrival, history, what happens): the trainer now shows a "case card" link for any job
that has one, as well as the walk-through link. DSY-written (owner to review). Live (PR #377, merged 26 Nov 2026).

AR PCR job (26 Nov 2026, owner asked): `ronAR`, "Ron, 67: hypoglycaemia (AR)", for the AR version of Ron's walk-through
(`?scope=ar`): same job to 1740, then no glucagon, EOC Clinician 1741 transport and RV, 1755 obs (BGL 2.5, GCS 11), RV
with the paramedics at Edillilie 1805. `walkStudent` opens the AR student walk-through. The AR pages link to it through
`arHref` on the Ron PCR line in `related.js`. Live (merged 26 Nov 2026).

PCR job `gregAR` (28 Nov 2026): Greg's AR version, from the AR walk-through: EOC Clinician 1524 transport and RV,
depart 1530, obs 1538, RV with the paramedics on the Flinders Highway 1542. `arHref` on Greg's line in `related.js`.
DSY-written (owner to review). Live (PR #391, merged 28 Nov 2026).

PCR job `karenAR` (28 Nov 2026): Karen's AR version, from the AR walk-through: EOC Clinician 0235 and 0250 (repeat
dose, transport to Cummins Hospital, clinical support cancelled), depart 0255, salbutamol MDI with O2 4 L/min nasal
cannula 0300, handover Cummins Hospital ED 0325. `arHref` on Karen's line in `related.js`.
DSY-written (owner to review). Live (PR #394, merged 28 Nov 2026).

PCR job `grahamAR` (28 Nov 2026): Graham's AR version: clinical support 2136, EOC Clinician 2137 (one GTN dose),
GTN 2138, EOC Clinician 2144 (no further GTN, transport to Cleve, clinical support cancelled), handover 2210.
DSY-written (owner to review). Live (PR #396, merged 28 Nov 2026).

PCR job `garyAR` (28 Nov 2026): Gary's AR version: clinical support 1858, paracetamol 1905, Penthrox 1907 and 1940,
EOC Clinician 1926 (transport and RV), RV with the paramedics 2003. DSY-written (owner to review). On a branch, not merged.
