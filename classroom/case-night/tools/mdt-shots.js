// Takes the MDT screenshots for a case night deck, with a fixed clock so the screens show the walk-through's times.
// Run from the repo root with a local server on port 8765 (python3 -m http.server 8765):
//   node classroom/case-night/tools/mdt-shots.js chest-pain     (or acpo)
// Settings per deck are in SHOTS below. Retake them whenever the MDT screens or the job change.
// The sign-in check is skipped for the screenshots only.
const { chromium } = require('playwright');
const path = require('path');
const SHOTS = {
  // Call signs (owner, 11 Nov 2026): Eyre Peninsula units are XX81 for jobs between 0800 and 1800 and XX181 between
  // 1800 and 0800 (Tumby Bay TB81 / TB181, Cleve CL81 / CL181, Port Neill PT181 at night).
  // Graham: page 2115 (night, so CL181), Enroute 2116, scene 2132, Mobile 2150, Cleve Hospital 2210.
  'chest-pain': { job: 'chest-pain', start: '21:14:50', callsign: 'CL181', hospital: 'CLEVE HOSPITAL',
    toEnroute: 1, toRemarks: 10, toScene: 6, onScene: 18, transport: 20 },
  // Kevin: page 0247, Enroute 0248, scene 0300, Mobile 0322, Tumby Bay Hospital 0352 (owner chose Tumby Bay, 11 Nov 2026).
  'acpo': { job: 'acpo', start: '02:46:50', callsign: 'PT181', hospital: 'TUMBY BAY HOSPITAL',
    toEnroute: 1, toRemarks: 8, toScene: 4, onScene: 22, transport: 30 },
  // Karen: page 0215, Enroute 0216, scene 0227, Mobile 0255, Cummins Hospital 0325 (owner moved the homestead to
  // 20 km north of Cummins, 11 Nov 2026). CU181 = Cummins at night (owner).
  'asthma': { job: 'asthma', start: '02:14:50', callsign: 'CU181', hospital: 'CUMMINS HOSPITAL',
    toEnroute: 1, toRemarks: 8, toScene: 3, onScene: 28, transport: 30 },
  // Greg: page 1432 (day, so CU81, paged from Cummins), Enroute 1433, remarks 1448, scene 1457, Mobile 1530, Port Lincoln
  // Hospital 1605 (walk-through times).
  'envenomation': { job: 'envenomation', start: '14:31:50', callsign: 'CU81', hospital: 'PORT LINCOLN HOSPITAL',
    toEnroute: 1, toRemarks: 15, toScene: 9, onScene: 33, transport: 35 },
  // Josh: page 2140 (night, so CL181), Enroute 2141, remarks 2150, scene 2153, Mobile 2210, Cleve Hospital 2230.
  'seizures': { job: 'seizures', start: '21:39:50', callsign: 'CL181', hospital: 'CLEVE HOSPITAL',
    toEnroute: 1, toRemarks: 9, toScene: 3, onScene: 17, transport: 20 },
  // Sam: page 0948 (day, so TB81), Enroute 0949, scene 0955, cleared from scene 1052 (not transported): press and
  // hold MOBILE for 2 seconds goes straight to Clear (owner, 26 Nov 2026).
  'refusal': { job: 'refusal', start: '09:47:50', callsign: 'TB81', clearFromScene: true,
    toEnroute: 1, toRemarks: 4, toScene: 2, onScene: 57 }
};
const deck = process.argv[2], S = SHOTS[deck];
if (!S) { console.log('Usage: node mdt-shots.js ' + Object.keys(SHOTS).join('|')); process.exit(1); }
const OUT = path.join(__dirname, '..', '..', deck, 'img');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1220, height: 860 } });
  await p.clock.install({ time: new Date('2026-07-16T' + S.start) });
  await p.route('**/shared/gate.js*', r => r.fulfill({ body: '', contentType: 'text/javascript' }));
  await p.goto('http://localhost:8765/mdt/');
  await p.evaluate(S => {
    const c = jobConfig(JOBS.find(j => j.id === S.job), example());
    Object.assign(c, { logon: 'no', speed: '1', gps: 'off' }, S.callsign ? { callsign: S.callsign } : {});
    startSim(c);
  }, S);
  const dev = p.locator('#device');
  const min = m => p.clock.runFor(m * 60000);
  const shot = async n => { await p.waitForTimeout(150); await dev.screenshot({ path: path.join(OUT, n + '.png') }); console.log('saved', deck, n); };
  const click = async a => { await p.locator(`[data-a="${a}"]`).first().click(); await p.waitForTimeout(100); };
  await shot('mdt-1-dispatch');
  await click('ack'); await min(S.toEnroute); await click('f6'); await shot('mdt-2-enroute');
  await min(S.toRemarks); await p.evaluate(() => act.tab('REMARKS')); await shot('mdt-3-remarks');
  await p.evaluate(() => act.tab('EVENT'));
  await min(S.toScene); await click('f6'); await shot('mdt-4-confirm-scene');
  await click('sceneYes'); await shot('mdt-5-on-scene');
  if (S.clearFromScene) {
    await min(S.onScene); const f6 = p.locator('[data-a="f6"]').first(); const box = await f6.boundingBox();
    await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await p.mouse.down(); await p.clock.runFor(2100); await p.mouse.up();
    await shot('mdt-6-hold-clear'); await click('clearYes'); await shot('mdt-7-cleared');
    await b.close(); return;
  }
  await min(S.onScene); await click('f6'); await p.evaluate(() => act.filter('Closest')); await shot('mdt-6-destination');
  await p.evaluate(h => act.pickDest(h), S.hospital); await shot('mdt-7-confirm-mobile');
  await click('mobileYes'); await min(S.transport); await click('f6'); await shot('mdt-8-arrive-dest');
  await click('f6'); await shot('mdt-9-clear');
  await b.close();
})();
