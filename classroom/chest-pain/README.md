# Chest pain case night (instructor-led slides)

One classroom night that runs a whole job from start to finish (owner's idea, 10 Nov 2026): the intro video and protocol
key points, Graham's walk-through with its eight break points and decision tiles, the MDT on students' phones (QR code),
then the PCR trainer and the debrief. The skills stations are kept for the following week (owner): the last slides
link `/stations/chest-pain-acpo/`.

Same slide engine as `/classroom/manual-tasks/` and `/classroom/medical-conditions/` (arrows, slide list, Notes,
Presenter view, Guide, Full screen, R reveals all). Facilitator sign-in (`gate.js`).

**No copied content.** `data/manifest.js` loads the live files `/microlearning/chest-pain/content.js` and
`/modules/chest-pain/content.js` (both set `window.MODULE`, so each is saved as `CP_ML` / `CP_WT` straight after it
loads), and `data/build.js` turns them into slides. Correct the module or the walk-through and the deck follows.
The slide order, section names, MDT cues, "Tonight", "Next week" and the presenter cues in `build.js` are DSY-written.

Slide types added to this copy of the engine: `mp4` (video file on this site), `prompts` (break point questions, one
per click), `decision` (A/B/C, next click shows the answer and why), `qr` (QR code to any dsytraining.com page, optional
button to open it on the big screen), plus `kicker` on light slides, `mdt` (MDT status cue in the corner), headed
items on `numbered`, and `noStep` on tables. Notes can also have `listen` (expected answers), `teach` and `real`.

MDT: `/mdt/#job=chest-pain&self=1`. PCR: `/tools/pcr/#job=graham`. Linked from Run a session (`slides` in
`hub/topics.js`). About 110 minutes in total (times in the notes).

To make another topic's night: copy this folder, change the two content paths in `data/manifest.js`, and change the
panel titles, MDT job, PCR job and stations in `data/build.js` (the walk-throughs share the same panel names mostly,
but check). Bump the `?v=` tags in `index.html`, `presenter.html`, `guide.html` and `data/manifest.js`.
