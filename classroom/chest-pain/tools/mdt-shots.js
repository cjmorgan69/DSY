// Takes the MDT screenshots for the chest pain case night (Graham's job, times matching the walk-through).
// Run from the repo root with a local server on port 8765 (python3 -m http.server 8765):
//   node classroom/chest-pain/tools/mdt-shots.js
// Retake them whenever the MDT screens or Graham's job change. The sign-in check is skipped for the screenshots only.
const { chromium } = require('playwright');
const path = require('path');
const OUT = path.join(__dirname, '..', 'img');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1220, height: 860 } });
  await p.clock.install({ time: new Date('2026-07-15T21:14:50') });
  await p.route('**/shared/gate.js*', r => r.fulfill({ body: '', contentType: 'text/javascript' }));
  await p.goto('http://localhost:8765/mdt/');
  await p.evaluate(() => {
    const c = jobConfig(JOBS.find(j => j.id === 'chest-pain'), example());
    Object.assign(c, { logon: 'no', speed: '1', gps: 'off' });
    startSim(c);
  });
  const dev = p.locator('#device');
  const min = m => p.clock.runFor(m * 60000);
  const shot = async n => { await p.waitForTimeout(150); await dev.screenshot({ path: path.join(OUT, n + '.png') }); console.log('saved', n); };
  const click = async a => { await p.locator(`[data-a="${a}"]`).first().click(); await p.waitForTimeout(100); };
  await shot('mdt-1-dispatch');                         // 2115 new job
  await click('ack'); await min(1); await click('f6');  // ACK, then ENROUTE at 2116
  await shot('mdt-2-enroute');
  await min(10); await p.evaluate(() => act.tab('REMARKS')); await shot('mdt-3-remarks');   // 2126: both live remarks in
  await p.evaluate(() => act.tab('EVENT'));
  await min(6); await click('f6'); await shot('mdt-4-confirm-scene');         // 2132
  await click('sceneYes'); await shot('mdt-5-on-scene');
  await min(18); await click('f6'); await p.evaluate(() => act.filter('Closest')); await shot('mdt-6-destination'); // 2150
  await p.evaluate(() => act.pickDest('CLEVE HOSPITAL')); await shot('mdt-7-confirm-mobile');
  await click('mobileYes'); await min(20); await click('f6'); await shot('mdt-8-arrive-dest'); // 2210
  await click('f6'); await shot('mdt-9-clear');
  await b.close();
})();
