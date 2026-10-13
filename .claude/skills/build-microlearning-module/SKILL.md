---
name: build-microlearning-module
description: Build or update a DSY microlearning module (the pages under /microlearning/) from a SA Ambulance Service clinical protocol, including the quiz, eligibility checker or reference tables, the intro-video script, and the narrated animated intro video. Use when the user asks for a new module, a training page for a protocol (they usually attach the protocol PDF), a script or video for a module, or changes to an existing module.
---

# Build a microlearning module

DSY runs training for volunteer ambulance officers, often in sessions the lead instructor does not attend.
Every module uses one template so they all look and behave the same. You supply the content.

Read `microlearning/README.md` first: it documents the file layout and every content key.
Reference modules: `microlearning/stroke/` (shorthand keys, decision aid, narrated video) and
`microlearning/envenomation/` (block-based `panels`, chooser, checklist, two embedded videos).

## Non-negotiable content rules

1. **Only what the protocol says.** Take every clinical statement from the protocol text the user provides.
   If it is not in the document, it does not go in the module. Do not fill gaps from memory (for example the
   ROSIER items are not in CPP-016-AO, so the stroke module does not list them and the practical points to the
   approved reference instead).
2. **Get the protocol text.** Attached PDF: `pdftotext -layout <file> -`. The clinical site
   (clinical.saambulance.sa.gov.au) is blocked from the sandbox, so ask the user to attach the PDF or paste the text.
   Read the whole thing, including version history, export date and review date.
3. **Record the source** in `protocol` (code, name, version, exported). If a protocol's review date has passed, say
   so to the user (CPPRO-022 v1.0 had a review date of 30 Nov 2024). Never hide that.
4. **Mark anything you invented.** Scenarios, practical activities and suggested video outlines are examples written
   by Claude from the protocol's criteria: label them as such on the page and tell the user to check them.
5. **Prefer links to rebuilding tools.** Link to the SAAS Clinical app for calculators. Only build a tool when the
   protocol itself is a pathway or calculation, and test `evaluate()` against every scenario, including exact
   boundaries (for example exactly 60 minutes, exactly 4 hours), before showing it.
6. **Do not guess URLs.** Podcast episodes, videos and clips must come from a real search result or from the user.
   If you cannot open a site, link to the page you did find and say you could not check the exact episode.
   Never embed a video you cannot verify matches the protocol (BE-FAST or FAST videos are not ROSIER or the SA pathway).
7. **Disclaimers stay.** The footer says it is a training resource and does not replace the protocol or the EOC
   Clinician. Australian spelling throughout. Plain, short sentences.

## Steps

1. **Branch.** Work on the branch the session names. If its last PR was merged, restart it from `main`
   (`git fetch origin main && git checkout -B <branch> origin/main`) before adding anything.
2. **Plan with the user only if needed.** Default sections: facilitator guide, introduction + video, key points,
   decision aid (only if the protocol is a pathway), reference table (facilities, doses live in the app), 10-12
   question quiz with a `why` line from the protocol for each answer, optional practical, optional further learning.
3. **Create the module.** `cp -r microlearning/stroke microlearning/<name>`, keep `index.html` (change the `<title>`),
   rewrite `content.js`, remove `intro.mp4`, `intro-poster.jpg` and `video-src/` until you have your own. Use the
   shorthand keys like stroke, or `panels`/blocks like envenomation when the order or blocks differ.
   Set `draft: true` while video or podcast slots are empty so they show as "coming soon", `false` before sharing.
4. **Check it.**
   - `node --check microlearning/<name>/content.js`
   - Serve the repo (`python3 -m http.server`), open the page with Playwright at phone width, open every panel,
     run the tool, scenarios and quiz, confirm no console errors and no sideways scroll.
   - Compare against the protocol text one more time: every number, threshold and agency name.
5. **Video script** (the user records it). Write one paragraph per scene, only protocol facts, spell letters out
   (`C S U`, `E O C`, `E T A`, `G R N`), spell hard words phonetically (`Rosier`, `Iz-bar`), and give it to the user in
   ONE plain code block with blank lines between scenes and **no numbers** (numbers get read aloud). Aim for about 3
   minutes at the user's slow narration pace (about 115 words a minute). Explain what each scene will show.
6. **Narration.** The ElevenLabs connector works for listing voices, but generation was refused on the user's plan
   (cloned voices and a flagged free tier), so do not retry. The user records in the ElevenLabs app with their
   voice (Roger - Laid-Back, Casual, Resonant) and uploads the mp3. Uploads have repeatedly been the wrong or an old file:
   `cmp` it against earlier narrations, check the duration against the word count, and check the first words
   (speech recognition) before building anything. Tell the user plainly if it is the wrong file.
7. **Build the video.** Copy `microlearning/stroke/video-src/` to `microlearning/<name>/video-src/`, write
   `script.json` (the exact sentences pasted into the voice tool, grouped into scenes) and rewrite `scene()` in
   `scene.html` (one visual per scene; keep the header, progress bar and caption code). Then:
   `PY=<python with pocketsphinx> microlearning/tools/video/make.sh microlearning/<name>/video-src narration.mp3 microlearning/<name>/intro.mp4`
   Read the alignment table it prints. A boundary marked CHECK, or one whose sentence does not match the words
   around it, needs an entry in `overrides.json`. Look at a still of every scene (render a few frames with
   `node tools/video/render.js <workdir> 24 t1,t2,...`) for overlapping or cut-off text before the full render
   (about 3.5 minutes of rendering for 165 seconds of video). Install pocketsphinx in a throwaway venv if needed
   (`python3 -m venv v && v/bin/pip install pocketsphinx`); other speech models cannot be downloaded here.
   Extract a poster (`ffmpeg -ss 2.2 -i intro.mp4 -frames:v 1 -vf scale=960:-1 intro-poster.jpg`), set `video` in
   `content.js` to `{ src: "intro.mp4", poster: "intro-poster.jpg" }`, and delete work files.
   The sandbox browser cannot play H.264, and YouTube is blocked, so say you could not play the video yourself and
   ask the user to watch it with sound.
8. **Commit and push** to the session branch. Do not open a PR unless asked. If asked to merge, create the PR (check for
   a PR template first), merge with the full 40 character head SHA as `expectedHeadSha`, and give the live URL.
   Modules are not linked from the hub landing page; the user shares the direct link.

## Tell the user at the end

What is live, what you could not verify (audio, video playback, any link you could not open), anything you wrote
yourself that needs their review, and any protocol review dates that have passed.
