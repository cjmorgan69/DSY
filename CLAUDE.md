# DSY Training: notes for Claude

DSY Training (dsytraining.com, GitHub Pages from `main` of `cjmorgan69/DSY`) builds training for volunteer
Ambulance Officers (AOs) of SA Ambulance Service (SAAS) on the Eyre Peninsula, plus rural ED and GP clinic material.
The owner is the lead instructor. They usually work from an iPhone (Claude app), so they cannot see permission
settings or play files you leave in the container: send files with the file tool and keep explanations short.

## What lives where

- `/index.html` - the DSY Clinical Training Hub (dark theme, older style). `/ao/index.html` lists the AO walk-through
  scenarios in `/modules/<name>/`.
- `/microlearning/` - the microlearning modules, one template for all. Read `microlearning/README.md` (content keys,
  flow layout, scenario pages, related links, cache tag) before changing anything there.
- `/microlearning/shared/` - `module.js`, `module.css`, `landing.js`, `related.js` (pages on the same protocol link to
  each other), `dsy-logo.png`. `/training/theme.css` is the shared colour and type theme.
- `/microlearning/tools/video/` - the narrated intro-video pipeline (`make.sh`, `align.py`, `render.js`, `voice.json`).
- `/modules/asthma-ao/` - the first walk-through scenario rebuilt on the microlearning template (facilitator and
  student versions). The other `/modules/*` pages are still the old standalone style.
- `/training/` - the training-session app (Supabase). `/teams/`, `/region/` - team and region pages.

## Skills

- `build-microlearning-module` - build or update a microlearning module from a SAAS protocol.
- `convert-walkthrough-scenario` - check an old `/modules/` walk-through against its protocol and rebuild it on the
  template with facilitator and student versions.

## How the owner likes to work

- **Protocol only.** Every clinical statement comes from the SAAS protocol, table or procedure (CPPRO). Anything
  written by Claude (scenarios, quiz, flash cards, practicals, EOC Clinician replies in a story) is labelled and the
  owner is asked to review it. Say plainly when a document's review date has passed or the documents disagree.
- **List clinical changes before making them** when correcting existing content, so the owner can approve them.
- **Light layout.** Flow layout on every module. At most one swipe-tile row and about three single quick-check cards
  per module. Keep the full quiz. Do not add more tiles or cards without asking.
- **Narration.** Lee (ElevenLabs, `eleven_v4`, `[calmly]` prefix, short conversational sentences). See `voice.json`.
  Generation costs credits: one take per script, never regenerate without asking.
- **Going live.** Work on the session branch, open a PR, and merge only when the owner says so ("merge it"). Then
  wait for the live site to update and check it in a fresh browser.
- **Database lesson.** After a module or scenario is live, the owner usually asks to add it as a lesson: insert into
  Supabase project `ekaodnbnpsuayvmxvxbm` ("training-sessions"), table `public.lessons`, columns `title`, `summary`,
  `resources` (the live URL). Do not create sessions. Use `where not exists` to avoid duplicates, then select it back.
- **Cache tag.** Scripts are cached for about 4 hours: bump the `?v=` tag in every `microlearning/*/index.html`,
  `microlearning/index.html` and converted `/modules/*/index.html` whenever shared files or content change.

## SAAS clinical site

- Protocol PDFs: `https://clinical.saambulance.sa.gov.au/assets/pdf/home/<Name - AO>.pdf` (spaces as `%20`).
- Severity and treatment tables (checklists): `.../assets/pdf/checklists/<Title>.pdf` (for example
  `AO%20Asthma%20Severity%20and%20Treatment.pdf`). These are images: render with `pdftoppm` and read the picture.
- Procedures: `.../assets/files/<CPPRO-0xx Name>.pdf`. Names and section codes are listed in the site's `main.*.js`.
- Do not click the site's disclaimer button. The menu data server (`bundles.media4learning.com`) refuses access:
  ask the owner for a link or PDF instead.
- Resus Room podcast RSS: `https://theresusroom.libsyn.com/rss` (follow redirects). Link only episodes found there.

## Status (14 Oct 2026)

Microlearning modules live: stroke, envenomation, hypoglycaemia, chest pain, anaphylaxis, asthma (all flow layout;
all but envenomation narrated by Lee). Each is a Supabase lesson.

Walk-through scenarios: asthma-ao rebuilt and linked with the asthma module (lesson added). Chest pain
(`/modules/chest-pain/`, Graham 62) rebuilt and linked with the chest pain module (live, lesson added). Owner's
chest pain guidance: GTN 300 microg tablet or 400 microg spray both acceptable (SAAS changing back to spray; protocol
still says 300 microg); patient who used own GTN: crew may give the first dose if BP and HR are in limits, then consult
the EOC Clinician for a plan; adequate oxygenation = SpO2 above 94% on air, else nasal cannula to bring it above 94%;
no CPR detail in scenarios. Envenomation (`/modules/envenomation/`, Greg 52, brown snake) rebuilt and linked with
the envenomation module (live, lesson added); owner: longboard or carry chair both fine, chosen by helpers and
distance, as long as movement is minimal and timely. Anaphylaxis (`/modules/anaphylaxis/`, David 54, bee sting) rebuilt from the paramedic CPG onto
CPP-003-AO and linked with the module (PR open, no lesson yet); owner: driver calls the EOC Clinician as soon as
possible; if the patient looks really sick use an expired EpiPen immediately, otherwise follow EOC directions; the Red
Kit carries adrenaline 1000 microg in 1 mL. Next, in this order: stroke
(`/modules/stroke-AO/`) and hypoglycaemia (the AO page links both `/modules/hypo/` and `/modules/hypoglycaemia`:
ask which to keep). Update this list as work is done.
