// Monthly vehicle log PDF (owner, 12 Nov 2026). The owner pastes a month of rows in chat, Claude saves them to a text
// file and runs:  node .claude/vehicle-log/make.js <rows.txt> --serial 1234004 [--typed] [--out dir]
// Row format (tab or 2+ spaces between columns, copied from the owner's spreadsheet):
//   Monday, 3 August 2026   60320   60420   100   tb
// Rows with no km are left out (no travel = no entry). Purpose is always TR/BM, all km are business km.
// Destinations: codes below joined with ", " and " return" ("vb el vb" starts and ends at the same place, so no
// "return"); "ret" = coming home from the day before's destination. Unknown codes are printed in capitals and listed.
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const PLACES = { tb: 'Tumby Bay', cu: 'Cummins', pt: 'Port Neill', cf: 'Coffin Bay', pl: 'Port Lincoln',
  vb: 'Venus Bay', el: 'Elliston', wy: 'Whyalla', lep: 'LEP', ceduna: 'Ceduna' };
const SETTINGS = { reg: 'S366BQH', unit: 'SAAS', location: 'LEP' };
const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const file = args[0], serial = Number(opt('--serial')), typed = args.includes('--typed');
const outDir = opt('--out') || process.cwd();
if (!file || !serial) { console.error('usage: make.js rows.txt --serial N [--typed] [--out dir]'); process.exit(1); }

const unknown = new Set(), rows = [];
let prevDest = '', year = '', month = -1;
for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
  const m = line.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) continue;
  const rest = line.slice(line.indexOf(m[0]) + m[0].length).trim().split(/\t|\s{2,}|\s+(?=\d)/).map(s => s.trim()).filter(Boolean);
  const [startOdo, endOdo, km, ...codeParts] = rest;
  if (!km || !/^\d+$/.test(km) || Number(km) === 0) continue;
  const mon = MONTHS.indexOf(m[2].toLowerCase()) + 1;
  year = m[3]; month = mon;
  const codes = codeParts.join(' ').toLowerCase().replace(/,/g, ' ').split(/\s+/).filter(Boolean);
  let dest;
  if (codes[0] === 'ret' && codes[1] === 'from' && codes.length > 2) { // "ret from cu" = Cummins to home
    dest = codes.slice(2).map(c => PLACES[c] || (unknown.add(c), c.toUpperCase())).join(', ') + ' to home';
  } else if (codes.length === 1 && codes[0] === 'ret') {
    dest = (prevDest || 'Away') + ' to home';
    const last = rows[rows.length - 1]; // the day before went out and stayed, so not a return trip
    if (last) { last.dest = last.dest.replace(/ return$/, ''); last.dest2 = last.dest2.replace(/ return$/, ''); }
  }
  else {
    const names = []; let times = '';
    for (const c of codes) {
      if (/^x\d+$/.test(c)) { times = ' ' + c; continue; } // "tb x2" = Tumby Bay return x2 // "tb area" = "Tumby Bay area"
      if (c === 'area' && names.length) names[names.length - 1] += ' area';
      else names.push(PLACES[c] || (unknown.add(c), c.toUpperCase()));
    }
    if (!names.length) console.warn(`NO DESTINATION: ${m[0]} (${km} km)`);
    dest = !names.length ? '' : names.join(', ') + (names.length > 1 && names[0] === names[names.length - 1] ? '' : ' return') + times;
    prevDest = names[names.length - 1];
  }
  let dest2 = '';
  if (dest.length > 25 && dest.includes(', ')) { // spread a long one over the entry's two lines
    const cut = dest.lastIndexOf(', ', 25); dest2 = dest.slice(cut + 2); dest = dest.slice(0, cut + 1);
  }
  rows.push({ date: `${Number(m[1])}/${mon}/${year.slice(2)}`, startOdo: Number(startOdo), endOdo: Number(endOdo),
    purpose: 'TR/BM', dest, dest2, business: Number(km) });
  if (Number(endOdo) - Number(startOdo) !== Number(km)) console.warn(`check ${m[0]}: odometer difference ${endOdo - startOdo} vs ${km} km`);
}
if (!rows.length) { console.error('no travel rows found'); process.exit(1); }
const title = `${MONTHS[month - 1][0].toUpperCase()}${MONTHS[month - 1].slice(1)} ${year}`;
const data = Object.assign({ title, year: year.slice(2), serial, rows }, SETTINGS);

(async () => {
  const b = await chromium.launch(), p = await b.newPage();
  await p.addInitScript(d => { window.VEHICLE_LOG_DATA = d; }, data);
  await p.goto('file://' + path.join(__dirname, 'index.html') + (typed ? '' : '?hand=1'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  await p.emulateMedia({ media: 'print' });
  const out = path.join(outDir, `Vehicle log ${title}.pdf`);
  await p.pdf({ path: out, format: 'A4', landscape: true, printBackground: true });
  await b.close();
  const pages = Math.ceil(rows.length / 10), km = rows.reduce((s, r) => s + r.business, 0);
  console.log(`${out}\n${rows.length} trips, ${km} km, ${pages} page(s), serials ${serial} to ${serial + pages - 1}`);
  if (unknown.size) console.log('UNKNOWN CODES: ' + [...unknown].join(', '));
})();
