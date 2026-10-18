# Customisable scenarios (trial, Oct 2026)

`/scenarios/` lets an instructor pick a walk-through scenario and change its local details (patient's name and age,
town, station, hospital, travel times, time of the page, season, crew names). It then opens the facilitator or
student version with those details. Only the listed fields change. Every observation, dose, decision tile and flash
card stays as approved.

```
scenarios/
  index.html          the form: pick a scenario, fill in the details, open or share the link
  view/index.html     the scenario page: reads the details from the link (after #), builds the page with module.js
  render.js           fills a template; also used by Node for the checks
  tools/convert-*.js  how each template was made from its /modules/<name>/content.js (chest pain, envenomation)
```

## Where the content lives

Supabase project `ekaodnbnpsuayvmxvxbm`, table `public.scenarios`: `slug`, `title`, `summary`, `protocol_code`,
`source_url`, `template` (the page's `window.MODULE` as JSON, with placeholders), `fields` (the form), `published`.
Anyone can read published rows; only the owner (through Supabase) can add or change them.

A link looks like `/scenarios/view/?mode=student#s=chest-pain-ao&patient=Ron&town=Cummins`. Details that keep their
original value are left out of the link.

## Placeholders in a template

- `{{patient}}` is a field value. `{{hospital|regional hospital}}` uses the text after `|` when the field is blank.
- `{{t+0}}`, `{{a+6}}` and `{{h-2}}` are clock times: minutes after the page (t), after arrival on scene (a, which is
  the page time plus the drive), or relative to arriving at hospital (h, which is arrival + 14 min on scene + the
  transport time; a template can set `sceneMinutes` to match its own timeline, as envenomation does with 38).
- `{{#town}}...{{/town}}` is shown only when the field is filled in, and `{{^dark}}...{{/dark}}` only when it is
  blank. `{{#setting=farm}}...{{/setting}}` is shown when the value matches. Sections can be nested.
- These values are worked out from the fields: `tod` (day 0600 to 1930, evening to 2300, night), `dark` and `sky`
  (`winter-dark`, `summer-light` and so on), `Season`, `Partner`, and `closer` (`hospital`, `backup` or `same`).

A `time` field can set `min` and `max` (for example envenomation allows only 07:00 to 18:30, because the story is set
in daylight). A blank text field keeps its default.

All text reaches the page through `textContent`, so typed values cannot add HTML.

## Adding another scenario

1. Copy `tools/convert-chest-pain.js` and write the swaps for that scenario (exact text, then the template text).
   Put the time and name swaps last.
2. Run it. It must report only the differences you intend (with the default values, the template has to give back the
   original page), and the stress inputs must leave no `{{` behind.
3. Any new wording in a branch (`{{#closer=backup}}...`) is written by DSY and must be checked by the owner.
4. Insert the row into `public.scenarios` with `published` false. Then compare `md5(template::text)` with the same
   checksum worked out from the generated JSON. Set `published` to true once the pages are merged and live.

5. If the scenario has a job in the MDT simulator, add `customSlug`, `customDefaults` and `custom()` to it in
   `mdt/jobs.js` and add the slug to the `Open in MDT simulator` list in `index.html`.

The original `/modules/<name>/` page stays as it is. If it is changed, regenerate and reload the template.
