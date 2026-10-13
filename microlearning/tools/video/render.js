// Render scene_final.html frame by frame to JPEGs.
//   node render.js <workdir> [fps=24] [t1,t2,...]    (times in seconds: render only those frames, for a quick look)
// <workdir> holds timeline.json and scene_final.html; frames go to <workdir>/frames.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const dir = path.resolve(process.argv[2] || '.'), FPS = +process.argv[3] || 24;
const only = process.argv[4] ? process.argv[4].split(',').map(Number) : null;
const TL = JSON.parse(fs.readFileSync(path.join(dir, 'timeline.json')));
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.join(dir, 'scene_final.html'));
  const out = path.join(dir, 'frames'); fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out);
  const n = Math.round(TL.total * FPS);
  for (let f = 0; f < n; f++) {
    const t = f / FPS; if (only && !only.some(x => Math.abs(x - t) < 0.5 / FPS)) continue;
    await p.evaluate(t => render(t), t);
    await p.screenshot({ path: path.join(out, 'f' + String(f).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 90 });
  }
  console.log('frames', n, 'errors', errs); await b.close();
})();
