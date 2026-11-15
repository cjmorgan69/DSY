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
