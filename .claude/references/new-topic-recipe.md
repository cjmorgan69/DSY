# Building a new topic: the standard recipe

The owner's standard (28 Nov 2026, set with the seizures topic): every topic that is not yet built is made with ALL
the elements the finished topics have, with the Ambulance Responder (AR) version built in from the start. The model is
the seizures topic: `/microlearning/seizures/`, `/modules/seizures-ao/` (Josh, 27), `/stations/seizures/`,
`/classroom/seizures/`, MDT job `seizures`, PCR jobs `josh` and `joshAR`, customiser template `seizures-ao`.

## 1. Sources (before writing anything)

- The AO protocol and its AR twin (`<Name> - AR.pdf`; the AR code is different, e.g. CPP-014-AO / CPP-037-AR). Read
  both in full, with version and review dates. `.claude/references/ar-vs-ao-protocols.md` has the differences.
- Any severity or treatment table (checklists, read as images) and the CPPROs the protocol relies on.
- Doses the PDFs leave out: the SAAS app's dose table in `main.*.js` (see CLAUDE.md). Say plainly where the app and
  the protocol disagree (seizures: the app's 65+ midazolam formula text says max 10 mg, the protocol and the app's own
  table say 5 mg).
- The owner's standing rules in CLAUDE.md (GTN, Co-Phenylcaine, nasal cannula for AOs and ARs, call signs, names).
- Resus Room podcast: only an episode found in the RSS feed.

## 2. The parts (all of them)

| Part | Where | Notes |
|---|---|---|
| Microlearning module | `microlearning/<name>/` | Shorthand keys (video, intro, keyPoints, tool, reference, quiz, practical, podcast). One tile row, about three quick checks, full quiz. `ar` block (see `microlearning/README.md`): AR key points scoped `ar`, AO-only boxes scoped `ao`, `videoNote`, AR quiz questions, the checker's `evaluate()` reads `window.MODULE_SCOPE`. Add to `MODULE_LISTS.ao`. |
| Intro video | `microlearning/<name>/video-src/`, `intro.mp4`, `intro-poster.jpg` | Lee on eleven_v4, `[calmly]`, two takes (scenes 1-4, 5-8), one take each, never regenerate without asking. Check the noise floor and loudness, set overrides for every sentence, look at stills, then the full render. Note it in `voice.json`. |
| Walk-through | `modules/<name>-ao/` | Facilitator / student, eight break points, decision tiles, at most one flash card in about half, one tile row. AR version in the same file: AR-only panels and items scoped `ar`, an AR handover where the story differs, `ar.replace` for codes and AO1/AO2. Ask the owner which EOC Clinician transport option the AR story uses (so far: hospital when it is closer and the patient is improving; RV with the paramedics when the patient still needs what only they carry). |
| MDT job | `mdt/jobs.js` | Times to match the walk-through; call sign XX81 / XX181 by time of day; a `link()` line for the customiser. |
| PCR jobs | `tools/pcr/jobs.js` | AO job and `<name>AR` job (with `walkStudent`). `related.js` line with `arHref`, `arTitle`, `arText`. |
| Customiser template | `scenarios/tools/convert-<name>.js`, Supabase `public.scenarios` | Run the converter until "differences with default values: 0"; insert the row with `published` false, check both md5s; publish after the merge. |
| Skills stations | `stations/<name>/` | Copy the latest stations page; four stations plus "Finish together"; AR boxes where the AR protocol differs; setup and print pages. |
| Case-night deck | `classroom/<name>/` | Copy the nearest deck; `build.js` must drop `scope: "ar"` items (the `ao()` helper); MDT screenshots via `classroom/case-night/tools/mdt-shots.js <name>`; feedback slide `t=<topic id>`. |
| Wiring | `hub/topics.js` (move from `DSY_PLANNED`), `related.js`, a card on `/ao/` | `node .claude/tools/check.js` lists anything missing. |
| Lessons | Supabase `public.lessons` after the merge | Module, AR module, walk-through, AR walk-through, stations, deck, PCR, AR PCR. |

## 3. Checks before the PR

- `node --check` every content file; test the checker's `evaluate()` on every scenario and the exact boundaries, AO and AR.
- `node .claude/tools/stamp.js`, `git add -A`, then `node .claude/tools/check.js` (it reads tracked files only).
- Playwright at 390 px: no errors, no sideways scroll, AO pages free of AR text, AR pages free of AO wording (AO codes
  only where a sentence names the AO protocol on purpose), the deck's slide data free of `scope` and `{{`.
- Everything written by Claude (story, EOC Clinician lines, cards, PCR model cards) is labelled DSY-written and listed
  for the owner's review; any passed review date is said.
