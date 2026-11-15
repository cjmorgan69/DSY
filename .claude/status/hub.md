# Main page, Run a session, glossaries, feedback

`/`, `/hub/learn/`, `/hub/run/`, `hub/topics.js`, `hub/glossary.js`, `/feedback/`.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## Main page, Learn on your own, Run a session

Main page (`/`, was the hub draft): two doors over one topic list `hub/topics.js`: Learn on your own (`/hub/learn/`:
per topic Learn = microlearning, Practise = student walk-through, Drill the MDT = `/mdt/#job=<id>&self=1`; ticks
saved on the device) and Run a session (`/hub/run/`: DSY-written session guide for review, per-topic kit:
facilitator walk-through, customise, `/mdt/#job=<id>`, copy student links, log in /training/). Add a topic to
`hub/topics.js` when a module, walk-through or MDT job is made.

## Run a session glossaries

Run a session glossaries (`hub/glossary.js`, keyed by topic id, 10 Nov 2026): a fold-out "Glossary (n terms)" in
each topic on `/hub/run/`; each term is tagged with its source (protocol code, Lead instructor, or unmarked = DSY
plain-English meaning for review). Chest pain first (37 terms from CPP-007-AO v4.2 and the Graham walk-through); add
other topics when the owner asks; bump the `glossary.js?v=` tag in `hub/run/index.html`.

## Feedback

Feedback (`/feedback/`, 11 Nov 2026, live, PR #204): one form per topic (`?t=<topic id>&from=qr|link|slides`):
overall stars, tick boxes for the parts the topic has (microlearning, walk-through, stations, MDT, PCR trainer,
slides; from `hub/topics.js`) each with stars and a comment, what worked, what to change, role, optional name; no
sign-in needed. `?show=1` = big QR for the room. Run a session has a Feedback QR and Copy feedback link per topic
and a Feedback panel; the case-night decks end with a feedback QR slide (add one to each new deck).
`/feedback/review/` (facilitator gate): per-topic averages per part, filters, replies, CSV. Supabase
`public.feedback` (`supabase/feedback-setup.sql`, run by the owner): anon/authenticated insert only, select via
`is_facilitator()`. One test row (source `test`) may still be there for the owner to delete.

## Topic categories and AO coverage

Topic categories and AO coverage (11 Nov 2026, owner): Run a session shows six category tiles (Cardiac and
respiratory, Trauma and injury, Brain and behaviour, Medical, Birth and newborns, Decisions; `DSY_GROUPS` and
`group` in `hub/topics.js`); three screens on one page by address (`#` categories, `#g=<group>` its topics plus
"Coming soon" entries from `DSY_PLANNED`, `#t=<topic>` the topic tiles; back buttons and the phone back button step
up a level; Feedback and Session planner only on the first screen) (move an entry into `DSY_TOPICS` with its group
when it is made). Layout inside a topic: the same eight tiles every time (Presentation, Scenario, MDT, PCR /
Stations, Microlearning, Customise, Feedback QR) plus Student link and Feedback link; missing parts show "Not made
yet" (PR #206). The full list of the 34 AO protocols, what is covered, the suggested build order and which CPPROs
apply to AOs is in `.claude/references/ao-protocols.md`.
