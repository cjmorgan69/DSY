# Classroom slide shows from SAAS eLearning lessons

Two slide shows share one engine:

- `/classroom/drive-mindset/` : DRiVE Principles and Knowledge, sections 2 to 7 (Mindset, Introduction to SAAS Vehicles, Practical Driving Concepts, Manoeuvring Principles, Policies Procedures and the Law, Emergency Driving Principles).
- `/classroom/manual-tasks/` : Manual Tasks, Lessons 1 to 7 including 4a and 4b, plus Optional Additional Learning.

Each has `index.html` (slides, notes panel N, presenter window P, Guide button), `presenter.html`, `guide.html` (printable facilitator guide), `assets/` (style.css, common.js, player.js) and `data/` (manifest.js plus one file per section or lesson). Nothing is linked from the main site menus; owner shares the URLs.

## How a lesson becomes a deck (the process we used)

1. **Extract.** The owner pastes or uploads a text extract of the SAAS Moodle lesson (Storyline SCORM or Moodle lesson). We cannot log in to saaslearn from the cloud container, so the extract is the source. Do not fetch saaslearn pages.
2. **Build one data file** by copying an existing one (`data/section4-practical.js` or `data/lesson2-postures.js`) and condensing the lesson text to dot points. One slide per lesson page or pop-up layer; one video slide per video.
   - Slide types: `title`, `statement`, `bullets` (points, optional `{t, sub}` sub-points, optional `callout`), `compare` (left/right), `cards` (items `{h, t}`, `cols`, `variant` plain/number/check, optional `callout`), `numbered`, `scale`, `video`, `mantra`.
   - Keep slides to about 5 to 7 points. Long lists go on two slides, or move into `compare` or `cards`.
   - Every slide has `notes`: `time` (minutes), `say`, `ask`, `activity`, `tip`. Notes and timings are drafts written by Claude: the owner reviews them.
3. **Register it** in `data/manifest.js`.
4. **Bump the cache tag** (`?v=...`) in `index.html`, `presenter.html`, `guide.html` and `data/manifest.js`. GitHub Pages caches scripts for about 4 hours, so phones keep the old slide list otherwise. Bump it on every change.
5. **Test in a browser** (Playwright is pre-installed): load each slide with `index.html?reveal=1#<section-id>/<n>`, check nothing runs off the bottom, and screenshot a few dense slides.
6. **Commit and push to the session branch.** Do not open a PR or merge until the owner says "open the PR and merge it" (see the repo CLAUDE.md). The PR body lists what to check. After merge, the live site updates in a few minutes.

## Video slides

- DRiVE lessons use Vimeo: `vimeo: { id, hash, length }` (the `h=` hash is needed). They play embedded.
- Manual Tasks videos are MP4 files inside the SAAS lesson package, behind a login. We keep link-only (the owner chose no copies): `video: { length, file, url }` shows a placeholder slide, and the notes and guide link to the file (saaslearn login needed).
- Where the extract has no captions there is no summary: the notes say to preview the video.

## Rules we followed

- **Clinical and legal content comes from the lesson.** Never add facts of our own. Flag anything inferred (for example quiz answers the extract could not read) in the notes and the PR.
- **Flag discrepancies instead of choosing**: for example the DRiVE braking distance (27 m vs 55 m at 80 km/h), the Career/Volunteer daily-requirements points run together, video pairings guessed from layer order, and a lesson number guessed for a lesson with none.
- SAAS course material and intranet links (SharePoint, SA Health) go in the notes only, labelled as intranet.
- Add an Acknowledgement of Country slide if the lesson has one (or if the others in the series do).
- Section numbers and times that the lesson does not give are guesses: say so.
- The owner works from an iPhone: keep chat replies short, and put what to check in a short list.

## Adding the next lesson

Copy a data file, edit it, add it to `manifest.js`, bump `?v=`, test, push, then ask the owner. For a brand new series, copy a whole folder (as `manual-tasks` was copied from `drive-mindset`) and change the labels ("Section" to "Lesson", "DRiVE" to the series name). Sections can have a `name` (shown instead of "Lesson N") for unnumbered lessons.

## Known open items (28 Oct 2026)

- DRiVE Section 4: which braking distance applies at 80 km/h (27 m or 55 m).
- DRiVE Section 6: which daily-requirements points are Career (PRO-060) and which Volunteer (PRO-094).
- Manual Tasks Lessons 3 and 6: inferred quiz answers to check against the lessons.
- Guessed video pairings (flagged in each slide's notes).
