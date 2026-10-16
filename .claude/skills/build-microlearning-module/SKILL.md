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
   (clinical.saambulance.sa.gov.au) is publicly readable but was blocked by the session's network policy until the user allowed
   the domain. Try `curl -sSL -o p.pdf 'https://clinical.saambulance.sa.gov.au/assets/pdf/home/<Protocol>.pdf'` (spaces as `%20`); if it
   fails with a 403 CONNECT error, ask the user to attach the PDF or paste the text.
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
5. **Video script.** Write one paragraph per scene, only protocol facts, in a spoken, conversational style: short
   sentences (one idea each), contractions ("don't", "they're"), the occasional question to open a scene ("No
   auto-injector? Call the EOC Clinician."), and lists broken into separate short sentences rather than one long one.
   Long list sentences and colons are what make the voice sound machine-read. Plain-English wording is fine where it
   keeps the meaning ("swelling in the airway" for angioedema), but keep the protocol's terms on screen. Spell letters
   out in the text sent to the voice (`E O C`, `C S U`, `E T A`, `G R N`) but keep `EOC` etc. in `script.json` captions.
   Numbers can be digits for `eleven_v4`. Spell hard words phonetically. Show the script to the user in ONE plain code
   block with blank lines between scenes. Aim for about 2 to 3 minutes. Say what each scene will show. The user reads
   the script in your reply (it is clinical content): unless they asked you to wait, carry straight on to step 6.
6. **Narration.** Use the ElevenLabs connector (load it with ToolSearch: `creative_generate_speech`,
   `creative_get_flow_run_status`, `creative_list_voices`). The voice is in `microlearning/tools/video/voice.json`
   (currently Lee on `eleven_v4`, with the `prompt_prefix` tag `[calmly] ` put before the first line); the user may change it,
   so always read the file and never hard-code a voice id. Generate the WHOLE script as one take (`generations_count: 1`,
   blank lines between scenes), poll
   until `all_completed`, then download the signed `content_url` from the status result with `curl -o narration.mp3` straight
   into the scratchpad (never commit or paste the signed URL). Costs about 1 credit per character (a 3 minute script is
   about 2,600 credits): do not regenerate, or generate extra takes, without the user's say-so. Do a 1 sentence test first if
   it is the first generation of the session. Then check the file before building: duration against the word count, and the
   alignment table from step 7, which recognises the first words of every sentence. Also check the noise floor (the quietest
   0.1 s in each 10 s should stay near -60 dB or lower): Lee on `eleven_v4` has developed rising hiss or distortion late in
   long takes (pain, TBI). If a stretch is bad, tell the user, offer to re-take only that part, and join the takes at pauses
   with matched loudness (as `tbi/video-src/overrides.json` notes). Tell the user plainly if it is wrong.
   If generation is refused (plan limits, account activity messages), do not retry or switch voices over and over: tell the
   user, and fall back to the old route: they record the script in the ElevenLabs app (the voice in voice.json, stability 50,
   similarity 75, speed 1.0) and upload the mp3. Uploads have repeatedly been the wrong or an old file: `cmp` it against
   earlier narrations, check the duration, and check the first words before building.
7. **Build the video.** Copy `microlearning/stroke/video-src/` to `microlearning/<name>/video-src/`, write
   `script.json` (the exact sentences pasted into the voice tool, grouped into scenes) and rewrite `scene()` in
   `scene.html` (one visual per scene; keep the header, progress bar and caption code). Then:
   `PY=<python with pocketsphinx> microlearning/tools/video/make.sh microlearning/<name>/video-src narration.mp3 microlearning/<name>/intro.mp4`
   Read the alignment table it prints. A boundary marked CHECK, or one whose sentence does not match the words
   around it, needs an entry in `overrides.json`. With `eleven_v4` the automatic match usually drifts (it pauses at
   commas too): list every pause with the words between pauses (pocketsphinx over each chunk), then set the end pause
   of every sentence in `overrides.json`, as in `anaphylaxis/video-src/overrides.json`. Look at a still of every scene (render a few frames with
   `node tools/video/render.js <workdir> 24 t1,t2,...`) for overlapping or cut-off text before the full render
   (about 3.5 minutes of rendering for 165 seconds of video). Install pocketsphinx in a throwaway venv if needed
   (`python3 -m venv v && v/bin/pip install pocketsphinx`); other speech models cannot be downloaded here.
   Extract a poster (`ffmpeg -ss 2.2 -i intro.mp4 -frames:v 1 -vf scale=960:-1 intro-poster.jpg`), set `video` in
   `content.js` to `{ src: "intro.mp4", poster: "intro-poster.jpg" }`, and delete work files.
   The sandbox browser cannot play H.264, and YouTube is blocked, so say you could not play the video yourself and
   ask the user to watch it with sound.
7b. **Layout.** Set `flow: true` in `content.js` (see `microlearning/README.md`, "Flow layout"). At most ONE tile row
   (`tiles: true` on a steps box such as a device or procedure sequence) and about THREE quick-check cards
   (`check: { q, a }` on the box or tool they test), one card each. The user asked for fewer tiles and flash cards;
   do not add more without asking. Keep the full quiz.
8. **List it.** Add the folder name to the right group in `MODULE_LISTS` in `microlearning/modules.js` (`ao`, `paramedic`
   or `rn`) so it shows on that group page (`/microlearning/ao/` etc.) and in the hub tile count, and check the card
   there (title, protocol version, video and quiz chips). Set `minutes` in `content.js` so the card shows a time.
8b. **Bump the cache tag.** Scripts are cached for about 4 hours, so if you changed `shared/`, `theme.css` or any
   `content.js`, change the `?v=` tag in every `microlearning/index.html` and `microlearning/*/index.html` (and
   `window.ASSET_VERSION` in the landing page) to a new value, e.g. the date plus a letter. See the README.
8c. **Link it.** Add the module to `microlearning/shared/related.js` under its protocol code, so it links each way with
   any walk-through scenario (in `/modules/`) on the same protocol. To convert an old scenario to the template, see
   "Walk-through scenarios" in the README: check every clinical point against the protocol first and list the changes
   for the user.
9. **Commit and push** to the session branch. Do not open a PR unless asked. If asked to merge, create the PR (check for
   a PR template first), merge with the full 40 character head SHA as `expectedHeadSha`, and give the live URL.
   Modules are not linked from the hub landing page; the user shares the direct link.

## Tell the user at the end

What is live, what you could not verify (audio, video playback, any link you could not open), anything you wrote
yourself that needs their review, and any protocol review dates that have passed.

## When a protocol is updated

Protocols change (CPP-016-AO v5.7 became v6.0 in June 2026: the Code Stroke window went from 4 to 9 hours). A module built on the
old text is then clinically wrong, so treat the update as urgent.

1. Get the new text and the old text (the old PDF, or `git log` for the module's `content.js` header) and `diff` them. Read the
   protocol's version history, but do not trust it to be complete: the v6.0 history listed two changes and the diff found more
   (new Code Notification Line, SAGRN arrival confirmation, "nearest hospital" wording, the ROSIER description).
2. Update `content.js`: `protocol.version` and `exported`, every number and threshold, the checker's `evaluate()` (re-test every
   scenario and each exact boundary), scenarios, quiz questions and `why` lines, facility tables, practical. Add a "What changed"
   box from the version history so staff who learned the old version notice. Search the file for the old values afterwards.
3. The intro video now contradicts the page. Remove its `src` (and delete `intro.mp4` and the poster) in the same change, so no
   outdated video is shown, and restore it once the new one is built.
4. Update `video-src/script.json` and `scene.html`, preview the changed scenes with placeholder timings, show the user the new
   narration script (all of it in one block, with the changed sentences listed so they know what moved), then regenerate the
   whole narration in one take (step 6 above) rather than splicing lines, because pace and tone differ between generations.
   Rebuild from the new audio.
5. Tell the user what changed in plain terms, and that the live page is out of date until the branch is merged.
