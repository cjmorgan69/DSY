# Microlearning modules

Each module is a page built from the same template, so every module looks and works the same.
You only write the content.

```
microlearning/
  shared/module.css      look (sits on top of /training/theme.css)
  shared/module.js       builds the page from window.MODULE
  stroke/                one module = index.html + content.js
    index.html           identical in every module (copy it, change the <title>)
    content.js           everything that is specific to the protocol
  envenomation/          earlier hand-built page, not yet on the template
```

## Adding a module

1. Copy `stroke/` to `microlearning/<name>/`.
2. Edit `index.html`: change the `<title>` only.
3. Rewrite `content.js` from the protocol text. Stick to what the protocol says.
4. Open `/microlearning/<name>/` to check it. Nothing links to modules from the hub; share the link.

## What goes in content.js

Every section is optional except the introduction. Sections appear in this fixed order:

| Key | Section |
| --- | --- |
| `session` | Facilitator guide for team-led sessions (collapsed, at the top) |
| `video`, `intro` | Introduction: video, then short paragraphs |
| `keyPoints` | Boxes of bullet points or numbered steps (`tone: "warn"` or `"no"` to colour) |
| `tool` | Decision aid: `fields`, an `evaluate(values)` function, optional `scenarios` that fill the form |
| `reference` | Tables or lists, plus `links` out (for example the SAAS Clinical app) |
| `quiz` | Questions with `options`, `answer` (index) and a `why` line shown after answering |
| `practical` | Optional hands-on activity: equipment, steps, what good looks like |
| `podcast`, `furtherLinks` | Optional further learning: an audio file or links |

Media slots (`video`, `podcast`) take `src`: a YouTube embed URL, or an `.mp4` / `.mp3` file placed in the module folder.
While `draft: true`, empty slots show a "coming soon" box with your `notes`. Set `draft: false` before sharing and
empty slots are left out.

## Rules of thumb

- Take the content from the current protocol only, and record its code, version and export date in `protocol`.
- Prefer linking to the SAAS Clinical app over rebuilding a calculator. Only build a tool when the protocol itself is
  a decision pathway (like the stroke eligibility checker), and test `evaluate()` against every scenario.
- Do not copy protocol content you were not given (for example, the ROSIER items are not in CPP-016-AO, so the stroke
  module does not list them).
