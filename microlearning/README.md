# Microlearning modules

Each module is a page built from the same template, so every module looks and works the same.
You only write the content.

```
microlearning/
  index.html             landing page listing every module (reads modules.js)
  modules.js             the list of module folders shown on the landing page
  shared/module.css      look (sits on top of /training/theme.css)
  shared/module.js       builds a module page from window.MODULE
  shared/landing.js      builds the landing page from each module's content.js
  stroke/, envenomation/, hypoglycaemia/
                         one module each = index.html + content.js (+ intro.mp4 and video-src/ if it has a video)
  tools/video/           align.py, render.js and make.sh: build a narrated intro video from the narration audio;
                         voice.json says which ElevenLabs voice narrates (change it there)
.claude/skills/build-microlearning-module/   the saved instructions for building a module with Claude
```

## Adding a module

1. Copy `stroke/` to `microlearning/<name>/`.
2. Edit `index.html`: change the `<title>` only.
3. Rewrite `content.js` from the protocol text. Stick to what the protocol says.
4. Add `"<name>"` to the list in `microlearning/modules.js` so it appears on the landing page (`/microlearning/`).
5. Open `/microlearning/<name>/` to check it. Nothing links to modules from the hub; share the link.

In a Claude Code session, ask for "a new microlearning module for <protocol>" with the protocol PDF attached:
the `build-microlearning-module` skill holds the rules and steps (including the video).

## Two ways to lay a module out

**Shorthand keys** (stroke): every section is optional except the introduction, in this fixed order.

| Key | Section |
| --- | --- |
| `session` | Facilitator guide for team-led sessions (collapsed, at the top) |
| `video`, `intro` | Introduction: video, then short paragraphs |
| `keyPoints` | Boxes of bullet points or numbered steps (`tone: "warn"` or `"no"` to colour) |
| `tool` | Decision aid: `fields` (`number`, `yesno` or `choice` with `options`; add `optional: true` to allow a blank), an `evaluate(values)` function, optional `scenarios` that fill the form |
| `reference`, `links` | Tables or lists, plus links out (for example the SAAS Clinical app) |
| `quiz` | Questions with `options`, `answer` (index) and a `why` line shown after answering |
| `practical` | Optional hands-on activity: equipment, steps, what good looks like |
| `furtherVideo`, `podcast`, `furtherLinks` | Optional further learning: an extra video (`{src, title, note}`), an audio file or episode link, and links |

**Panels and blocks** (envenomation): set `panels` to your own ordered list. Each panel is
`{ title, open?, optional?, chip?, blocks: [...] }`, and a block is one of:

| Block | Shows |
| --- | --- |
| `{ text }` / `{ paragraphs }` | Paragraphs |
| `{ video: {src, title, poster} }` / `{ audio: {src} }` | Embedded media (YouTube embed URL, `.mp4` or `.mp3` file, or `link`) |
| `{ box: {title, text, items, steps, tone, video, note} }` / `{ boxes: [...] }` | Highlighted boxes |
| `{ checklist: {title, intro, items: [{t, text}]} }` | Tick-off list for practising a procedure |
| `{ chooser: {label, options, data} }` | Pick-one selector that shows boxes for the choice |
| `{ table: {title, text, table: {head, rows}, items} }` | Reference table or list |
| `{ tool: {...} }` | The same decision aid as above |
| `{ quiz: {intro, questions} }` | Quiz |
| `{ steps }`, `{ links }`, `{ note }` | Numbered steps, link buttons, small print |

Both support `protocol: { code, name, version, exported, also: [{code, name, version}] }` (shown in the header
and footer) and `footerNotes: [...]`.

Media slots take `src`: a YouTube embed URL, or an `.mp4` / `.mp3` file placed in the module folder. While
`draft: true`, empty slots show a "coming soon" box with your `notes`. Set `draft: false` before sharing and
empty slots are left out.

## Rules of thumb

- Take the content from the current protocol only, and record its code, version and export date in `protocol`.
- Prefer linking to the SAAS Clinical app over rebuilding a calculator. Only build a tool when the protocol itself is
  a decision pathway (like the stroke eligibility checker), and test `evaluate()` against every scenario.
- Do not copy protocol content you were not given (for example, the ROSIER items are not in CPP-016-AO, so the stroke
  module does not list them).
- Scenarios, practical activities and video outlines written by Claude are examples: label them and have them checked.


## Flow layout (prototype, used by anaphylaxis)

Set `flow: true` and give `panels` (the shorthand keys still work but need `panels` for this layout). Panels become open
sections that fade in as you scroll; a panel with `collapsed: true` stays a toggle (good for reference tables). New blocks:

- `{ tiles: { title, text, numbered, items: [{ title, text, tone }] } }` swipe-sideways tiles with dots and arrows.
- `{ cards: { quick: true, items: [{ q, a }] } }` a "Quick check" of one or two flash cards at the end of a section
  (tap to turn; "Again" cards return). Without `quick` it is a full deck. Keep the Knowledge check quiz as well.

Use tiles sparingly: only for a short set of parallel items (such as signs, or steps of a device), never for criteria
or doses that must all be seen at once. The fade-in works on small pieces (paragraphs, boxes, quiz and checker questions).

The header logo is `shared/dsy-logo.png`, the hub logo recoloured to the app green.
