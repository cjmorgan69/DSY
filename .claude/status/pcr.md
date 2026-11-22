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
student walk-through, and keeps its own saved work per customisation. On a branch, not merged.

