# Case nights (instructor-led slides)

Decks: `/classroom/chest-pain/` (Graham, 62) and `/classroom/acpo/` (Kevin, 72, 11 Nov 2026). Each deck folder has its
own `index.html`, `presenter.html`, `guide.html`, `data/manifest.js`, `data/build.js` and `img/`; the slide engine is shared
here in `assets/` (deck name from `window.DECK_NAME`) and the MDT screenshots come from `tools/mdt-shots.js <deck>`.

## The chest pain night (the first one)

One classroom night that runs a whole job from start to finish (owner's idea, 10 Nov 2026): the intro video and protocol
key points, Graham's walk-through with its eight break points and decision tiles, MDT screenshots at each status
(owner, 11 Nov 2026: pictures, not the live MDT, which was a distraction), then the PCR trainer and the debrief. The skills stations are kept for the following week (owner): the last slides
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

MDT screenshots: `img/mdt-*.png`, taken by `/classroom/case-night/tools/mdt-shots.js chest-pain` (Playwright with a fixed clock, so the screens show
the walk-through's times: page 2115, scene 2132, mobile 2150, Cleve Hospital 2210). Retake them if the MDT screens or
Graham's job change. PCR: `/tools/pcr/#job=graham`. Linked from Run a session (`slides` in
`hub/topics.js`). About 110 minutes in total (times in the notes).

## Another topic's night

Copy `/classroom/acpo/` (its `build.js` finds the job panels from "Dispatch and en route" to "Handover" and reads a
module built from panels). Change the two content paths in `data/manifest.js`, `DECK_NAME` in the three pages, and in
`build.js` the module panel names, MDT captions, PCR job and stations. Add the deck to `SHOTS` in `tools/mdt-shots.js`
(job id, start time, minutes between statuses, hospital, call sign), check the MDT job matches the walk-through's
times, place and hospital, then take the screenshots. Add `slides:` to the topic in `hub/topics.js` and bump its tag.
Bump the `?v=` tags in the deck's pages and `data/manifest.js` whenever the deck or the shared engine changes.

## The ACPO night

Same order as chest pain: the module's intro video and its "The protocol" boxes, the walk-through's principle and
background, Kevin's eight break points with decision tiles and MDT screenshots (page 0247, Enroute 0248, scene 0300,
Mobile 0322, Tumby Bay Hospital 0352, owner's choice; call sign is the simulator default TB85 until the owner gives the
Port Neill one), the PCR trainer (`kevin`), the debrief and five variations, then next week's chest pain and ACPO
stations. The walk-through has no safety brief box, so the "Before we start" slide is DSY-written. About 110 minutes.
