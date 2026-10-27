# Manual Tasks classroom slides

Slide show, presenter window (P) and printable guide for the SAAS Manual Tasks eLearning lessons. It uses the same engine as `/classroom/drive-mindset/`.

To add a lesson: copy `data/lesson1-human-body.js`, edit it, add its file name to `data/manifest.js`, and bump the `?v=` tag in `index.html`, `presenter.html`, `guide.html` and `data/manifest.js` (scripts are cached for about 4 hours).

Video slides: if the video is a Vimeo link use `vimeo: { id, hash, length }`. If it is a file in the eLearning package use `video: { length, file }`, which shows a placeholder slide.
