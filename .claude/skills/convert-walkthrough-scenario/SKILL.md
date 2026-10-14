---
name: convert-walkthrough-scenario
description: Check an existing DSY walk-through scenario (the old standalone pages under /modules/, linked from /ao/) against its SAAS protocol and rebuild it on the microlearning template with a Facilitator / Student switch, break points, decision tiles and flash cards, linked each way to the microlearning module on the same protocol. Use when the user asks to convert, check, restyle or update a scenario, or names one (for example "do the chest pain scenario next").
---

# Convert a walk-through scenario

The first one done this way is `modules/asthma-ao/` (Karen, 45, more severe asthma). Use it as the model:
`modules/asthma-ao/content.js` and `index.html`. Read `CLAUDE.md` and `microlearning/README.md` ("Walk-through
scenarios and related links") first. The content rules in the `build-microlearning-module` skill apply here too.

## Steps

1. **Branch.** Work on the session branch, restarted from `main` if its last PR was merged.
2. **Read the old scenario in full.** Strip the HTML to text (`python3`: remove `<style>`/`<script>`, then tags,
   `html.unescape`). Note every clinical statement: severity criteria, drugs, doses, routes, repeat intervals,
   oxygen targets, thresholds, escalation and transport rules.
3. **Get the sources.** The AO protocol PDF, any severity or treatment table (checklist PDF, read as an image), the
   CPPROs it relies on, and any protocol it says to consider first (asthma -> anaphylaxis). See `CLAUDE.md` for the
   addresses. The matching microlearning module's `content.js` already holds a checked summary: reuse it, but check
   the protocol version is the same.
4. **Compare and report BEFORE rebuilding.** Give the user a table: "Scenario says" vs "Protocol says", for every
   clinical difference, plus what stays (story, scene, obs, roles, ISBAR, debrief, variations) and what is general
   teaching rather than protocol. Ask any choice that changes the case (asthma: keep Karen as more severe, or make
   her mild). Wait for the go-ahead.
5. **Rebuild** at the same URL (`modules/<name>/`) so the hub link keeps working:
   - `index.html`: copy `modules/asthma-ao/index.html`, change the `<title>`, use the current `?v=` tag.
   - `content.js`: `flow: true`, `scenario: true`, `protocol` with `also` for tables and CPPROs, `footerNotes` saying the
     story is DSY's training scenario. Panels: Overview (objectives, equipment, timing and resources, crew roles),
     Pre-brief (the protocol or table, key protocol reminders, a "General teaching (not in the protocol)" box), then
     the story sections with one `breakpoint` per old break point, a clinical decision point box, the debrief, and
     the variations as a collapsed optional panel.
   - Each `breakpoint`: `prompts`, `expected` (corrected), `teaching`, `realJob`, and for students one or two
     `decisions` (`{ q, options, answer, why }`, the `why` citing the protocol) and at most one flash card in about
     half of them. One tile row in the whole scenario (a procedure's steps, `tiles: true` on a steps box).
   - Keep timings and EOC Clinician replies as story, labelled; do not invent doses the protocol does not give.
6. **Link it.** Add the scenario under its protocol code in `microlearning/shared/related.js` (with the module), and
   make sure the module's and the scenario's `index.html` load `related.js`. Update the scenario's card text on
   `/ao/index.html` if it described the old content.
7. **Bump the cache tag** in every converted and microlearning `index.html`.
8. **Test** with Playwright at phone width (390 px): no console errors, no sideways scroll; Facilitator shows prompts,
   expected reasoning and teaching and no decision tiles; Student hides every `.fac-only` and shows the tiles and
   cards; every decision's correct option says "Yes"; `?mode=student` opens the student version; the module and the
   scenario each show the other under "Built on the same protocol".
9. **Commit, push, open a PR** describing the clinical changes. Merge only when the user says so, check the live site,
   then offer to add the scenario as a Supabase lesson (title "<Name> - AO walk-through scenario", summary mentioning
   `?mode=student`, resources = live URL, no sessions). Update the status list in `CLAUDE.md`.

## Tell the user

The clinical changes made, what you wrote yourself (decision tiles, flash cards, any new story detail) for their
review, any document whose review date has passed, and the live link plus the `?mode=student` link.
