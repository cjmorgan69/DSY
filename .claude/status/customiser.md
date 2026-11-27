# Scenario customiser

`/scenarios/`: templates in Supabase `public.scenarios`. Read `scenarios/README.md`. Per-scenario template limits
are also noted with each walk-through in `walkthroughs.md`.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## Scenario customiser

Scenario customiser (`/scenarios/`, 17 Oct 2026): the chest pain walk-through is stored as a template in Supabase
`public.scenarios`, with 15 local-detail fields. Live. The owner dropped the leftover "temp import" policy.
Envenomation (`envenomation-ao`, 14 fields; daylight only, summer, spring or autumn) live 18 Oct 2026. Anaphylaxis
(`anaphylaxis-ao`, 13 fields; daylight only, spring, summer or autumn; no wording changes from the original) live 18
Oct 2026. The other 8 (asthma, stroke, hypoglycaemia, sepsis, pain, ACPO, headache, nausea) added 18 Oct 2026, rows
published (checked 15 Nov 2026); every MDT job and hub topic now links to its customiser (shared mapping at the end
of `mdt/jobs.js`). Limits kept clinical content true: stroke hospital is one of the three Eyre Peninsula STS with 21
to 59 min travel; pain age 18 to 64 (ketamine wafer); headache age over 50 (red flag); night-only times for asthma
and ACPO; patients keep their sex.

## Refusal against advice

`refusal-ao` (26 Nov 2026): 13 fields (patient stays a man, partner stays "partner"/she; page time 07:00 to 11:00 because
the son's cricket final is at 1300; hospital, backup town and minutes). Row inserted with `published` false, md5 of
template and fields checked. MDT link and PCR trainer (`tools/pcr/custom.js`, new `times` value 'fixed' keeps 1300 put).
Set `published` true once the PR is merged and the pages are live.

Dementia row title corrected to "Dementia - AO: Jo-Anne, 84" (owner, 26 Nov 2026; was still Joan). `refusal-ao` template
updated in place for the MDT hold-to-clear line (md5 checked).
