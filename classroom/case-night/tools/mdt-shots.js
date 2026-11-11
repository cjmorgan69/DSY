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
    toEnroute: 1, toRemarks: 8, toScene: 4, onScene: 22, transport: 30 }
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
  await min(S.onScene); await click('f6'); await p.evaluate(() => act.filter('Closest')); await shot('mdt-6-destination');
  await p.evaluate(h => act.pickDest(h), S.hospital); await shot('mdt-7-confirm-mobile');
  await click('mobileYes'); await min(S.transport); await click('f6'); await shot('mdt-8-arrive-dest');
  await click('f6'); await shot('mdt-9-clear');
  await b.close();
})();
