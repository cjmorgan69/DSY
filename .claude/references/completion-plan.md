# Plan: complete every topic, by protocol, with AO and AR versions

Written 28 Nov 2026 (owner asked: "plan to complete each topic by protocol including the AR toggle and versions").
Sources: `hub/topics.js`, `node .claude/tools/check.js`, Supabase `public.lessons` and `public.scenarios`
(28 Nov 2026), `.claude/references/ao-protocols.md`, `.claude/references/ar-vs-ao-protocols.md`.
Tick items off here as they go live, and keep `CLAUDE.md` Open work in step.

## What "complete" means for a topic

**AO set (every topic):** microlearning module with intro video; walk-through with facilitator and student
versions; MDT job; PCR job; customiser template; skills stations; case-night deck (only where the owner wants one);
a Supabase lesson for each live page.

**AR version (the `?scope=ar` switch, pilot: hypoglycaemia):** an `ar` block in the module's `content.js` and in
the walk-through's `content.js` (see `microlearning/README.md`, "Ambulance Responder (AR) version"); an AR PCR job
where the walk-through changes (like `ronAR`), with `arHref` in `related.js`; AR lessons in Supabase. How much AR
work a topic needs depends on its AR protocol:

- **Big difference** (AR protocol leaves out medicines or tools): full AR version: AR quiz questions, AR checker
  path, AR break points in the walk-through, AR PCR job.
- **Small difference** (same care, plus "request clinical support" and the EOC consult before transport): light AR
  version: the AR protocol code, an AR box on the module, and one AR break point in the walk-through for the EOC
  consult and the three transport options. No separate AR PCR job unless the story changes.
- **No AR protocol:** short AR version: "What an AR does" box (recognise, request clinical support, consult EOC),
  AR quiz questions only on that. Owner to decide (question 1 below).

Each AR version starts with the AR PDF, read again on the day: AR PDFs were exported 31 Aug 2026 and some are old
(CPP-039-AR Stroke is v2.0, Jan 2019): check review dates and say when they have passed.

## Live topics (19)

| Topic | AR protocol | AO gaps | AR work |
|---|---|---|---|
| Hypoglycaemia | CPP-031-AR, big | none | **done** (module, walk-through, PCR `ronAR`, lessons) |
| Asthma | CPP-048-AR, big | none | **done 28 Nov 2026** (module, walk-through, PCR `karenAR`; Karen goes to hospital) |
| Chest pain | CPP-029-AR, big | none | full: every GTN on EOC advice, even own prescribed GTN |
| Pain management | CPP-036-AR, big | stations | full: paracetamol + methoxyflurane only (repeat once); no ibuprofen, fentanyl, ketamine |
| Stroke | CPP-039-AR, big | deck? | full: FAST only, no ROSIER or Code Stroke pathway, consult |
| Dementia (ABD) | CPP-052-AR, big | lesson for stations, PCR `joanne` lesson, deck? | full: risk assessment, MSE, clinical support, SAPOL, consult |
| Refusal | CPP-058-AR, big | PCR `sam` lesson | full: seek consent, clinical support or consult; no VIRCA steps |
| Anaphylaxis | CPP-022-AR, small | deck? | light |
| Snake bite | CPP-030-AR, small | **done 28 Nov 2026** (stations, deck, lessons; intro video by Lee is on YouTube) | **done** (module, walk-through, PCR `gregAR`) |
| Falls | small (pain part big) | deck? | light, plus the pain-relief changes |
| Burns | small (pain part big) | MDT job, deck? | light, plus the pain-relief changes |
| Spinal precautions | small | MDT job, customiser, deck? | light |
| Baseline obs at MVA | small (prolonged care, pain) | deck? | light: EOC consult before transport, no NEWS2 re-scoring |
| Sepsis | none | lesson for stations, deck? | short "What an AR does" |
| ACPO | none | none | short |
| Headache | none | deck? | short |
| Nausea and vomiting | none | deck? | short |
| Bushfire and burnover | crew safety (PRO-239) | none | none needed (same for every level) |
| Health checks | crew safety (PRO-384) | module? (stations only) | none needed |

"deck?" = no case-night deck yet: owner to say which topics get one (question 2).

## New topics (build AO and AR together)

In the suggested order from `ao-protocols.md`. Each one: the full AO set, then its AR version in the same PR.

| # | Topic | AO protocol | AR | Notes |
|---|---|---|---|---|
| 1 | Cardiac arrest | CPP-002/043/020-AO | small (AED, CPR, OPA only, consult at 10 min and to stop) | owner said no CPR detail in scenarios: decide scope (question 3). AO PDFs export blank: read in the app. Old page `/modules/cardiac-arrest/` |
| 2 | Pregnancy and birth | CPP-059-AO | small (PPH and destination by consult) | old `/modules/childbirth/`; pairs with `/tools/obstetric/` |
| 3 | Postpartum haemorrhage | CPP-053-AO | none (AR consults) | fundus procedure CPPRO-023 |
| 4 | Newborn care | CPP-012-AO | big (NeoHelp/TransWarmer on consult, no i-gel, no SpO2) | AR BGL "≥ 2.5" looks like a typo: ask SAAS |
| 5 | Seizures | CPP-014-AO | big (no midazolam, no NPA) | |
| 6 | Amputation and haemorrhage | CPP-042-AO | small | tourniquet and pelvic sling already in MVA stations |
| 7 | Narcotic overdose | CPP-011-AO | none | old `/modules/narcotic_od/` |
| 8 | Chest trauma | CPP-158-AO | none | vented chest seal on consult (CPPRO-037) |
| 9 | Treat and refer | CPP-055-AO | not an AR option | AR view says so and points to consult |
| 10 | Hypothermia | CPP-019-AO | small (AR may transport under CPR with RV) | |
| 11 | Button battery | CPP-065-AO | small | short; children |
| 12 | Transfer exceeding AO scope | CPP-015-AO | small | |
| 13 | Prolonged care | CPP-063-AO | small (no NEWS2 re-scoring, sedation score, pupils, monitoring) | already used by MVA |

## Suggested order of work

1. **Quick fixes (one PR / a few SQL inserts, owner to approve the rows):** lessons for PCR `sam` and `joanne`,
   the sepsis and dementia stations, and the chest pain, asthma and ACPO decks; (snake bite lesson link trimmed 28 Nov 2026).
2. **AR, big-difference topics (one topic a PR, like the hypo pilot):** asthma, chest pain, pain, stroke, refusal,
   dementia. Each: list the AR clinical changes in chat first for approval, then build, then the AR lessons.
3. **Fill the AO gaps:** spinal MDT job and customiser, burns MDT job, snake bite and pain stations.
4. **AR, small-difference and no-AR-protocol topics:** light or short versions, a few topics a PR.
5. **New topics** in the order above, each with its AR version.
6. **Case-night decks** for the topics the owner picks.

## Questions for the owner

1. Topics with no AR protocol (sepsis, ACPO, headache, nausea, and later overdose, chest trauma, PPH): a short
   "What an AR does" version, or leave them AO only with a note?
2. Which topics get a case-night deck (13 clinical topics have none)?
3. Cardiac arrest: what may the scenario show, given "no CPR detail in scenarios"?
4. Should the AR version be on the walk-through for small-difference topics, or the module only?
