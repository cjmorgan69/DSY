# Other tools

Obstetric companion and the treatment simulator.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## Obstetric emergencies companion

Obstetric emergencies companion (`/tools/obstetric/`, 24 Oct 2026; link removed from the main page 27 Oct 2026 at
the owner's request, page still live at its URL): phone flowcharts for shoulder dystocia (timer from fetal head
delivery, 60 s alarm, declare, checklist, four 30 s manoeuvres auto-advancing with beeps and spoken prompts, record
with times, copy), cord prolapse and breech birth (yes/no steps), strictly from the reverse of CTL-128 Obstetric
Aide-memoire v1.0 (owner photographed it: the PDF has no reverse side). Breech: the card's upward arrow is read as
"then the not-imminent en-route care" for the footling and rapid-extricate paths (owner to confirm).

## Treatment simulator (prototype)

Treatment simulator (`/tools/sim/`, 12 Nov 2026, prototype, owner's idea; student gate; not linked from any page): a
first-person job where the student talks (browser speech recognition, en-AU) or taps, the patient, wife, driver
"Sam" and EOC Clinician answer in recorded ElevenLabs voices (Australian: James = David, Anne = wife, Hannah Jayne =
Sam, Paul = EOC Clinician; eleven_v4, one take per line, 40 lines, about 2,700 credits), the obs change with time
and treatment, medicines get a repeat-back and Confirm, and a debrief compares the job with the protocol. First case
David (anaphylaxis walk-through: same obs sets, times and EOC replies). Engine `sim.js` holds no clinical content;
`cases/david.js` holds the lines, obs model, actions, rules and debrief; `cases/david.scene.js` draws the garden.
DSY-written for the owner to review: every spoken line except the wife's arrival line and the EOC Clinician's
replies, how fast the obs change, the time each action costs, the 4-minute prompt and the collapse ending if no
adrenaline is given, the debrief wording, and how "as flat as his breathing allows" is shown (eased back in the
garden chair). Claude cannot hear the recordings: the owner checks them by ear. Read `tools/sim/README.md` before
changing it or adding a case. On main, still not linked from any page (checked 15 Nov 2026).
