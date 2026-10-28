# Medical Conditions classroom slides (AR course Day 6)

Slide show, presenter window (P) and printable guide for the SAAS Medical Conditions (Ambulance Responder) workshop, built from
the Facilitator Guide v3.0 260114, the PowerPoint v3.0 260114 and the Medical Conditions Study Guide (Volunteer AR) v2.2.
The SAAS PDFs are OFFICIAL and copyright, so they are not in the repo: ask the owner for them. SAAS gave permission (28 Oct
2026) to use their pictures and videos for teaching SAAS students: ten pictures cropped from the PowerPoint are in `img/`
(keep it to the most useful ones, owner). Videos come from the study guide's links: `vimeo: { id, hash, length }` embeds;
`linkOnly: true` shows a Watch on Vimeo button for the older SAAS videos, which Vimeo won't play on other sites;
`youtube: { id, length }` embeds. The anaphylaxis (wasp) and normal labour videos are only in the SAAS PowerPoint.

Same engine as `/classroom/manual-tasks/`, plus three slide types: `image` (`img`, `caption`, optional `points` beside it), `table` (`head`, `rows`, optional `callout`, `source`, `fs`)
and `station` (`station: 's1'` etc., shows a QR code to `/stations/ar-day6/#s1`). Sections are "Part N".

To change: edit the data file, and bump the `?v=` tag in `index.html`, `presenter.html`, `guide.html` and `data/manifest.js`.
