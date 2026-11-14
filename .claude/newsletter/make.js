// DSY Team News: builds the newsletter PDF.
// Usage: node .claude/newsletter/make.js <data.json> <weather.json> <words.json> --out <dir>
// data.json = result of data.sql, weather.json = weather.js output, words.json = Claude's chatty text (see README).
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const outDir = args.includes('--out') ? args[args.indexOf('--out') + 1] : '.';
const [dataFile, wxFile, wordsFile] = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--out');
const D = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
const data = D.data || D;
const WX = wxFile ? JSON.parse(fs.readFileSync(wxFile, 'utf8')) : null;
const W = wordsFile ? JSON.parse(fs.readFileSync(wordsFile, 'utf8')) : {};

const TEAMS = ['Cummins', 'Tumby Bay', 'Port Neill', 'Coffin Bay'];
// The same person typed differently in the roster or the training app. Add new pairs as they turn up.
const ALIAS = {
  'Ann Auld': 'Anne Auld', 'Catherine Haarsma': 'Cathy Haarsma', 'Vicky Devries': 'Vicky DeVries',
  'Victoria De Vries': 'Vicky DeVries', 'Michelle Guidera': 'Midge Guidera', 'Dave Chapman': 'David Chapman',
};
const canon = n => ALIAS[(n || '').trim()] || (n || '').trim();

// Job type -> plain category. Small numbers only ever appear as team totals (privacy rules in README).
function category(t) {
  t = t || '';
  if (/vehicle mo/i.test(t)) return null;                       // vehicle movement, not a job
  if (/fall/i.test(t)) return 'Falls';
  if (/inter-?facility|transfer/i.test(t)) return 'Transfers';
  if (/chest|heart|breath/i.test(t)) return 'Heart, chest and breathing';
  if (/unconscious|faint/i.test(t)) return 'Fainting or collapse';
  if (/traffic|mva|crash/i.test(t)) return 'Road crashes';
  if (/intercad/i.test(t)) return 'Helping other services';
  if (/retriev/i.test(t)) return 'Retrievals';
  return 'Other medical';
}

const fmt = (d, o) => new Date(d + (d.length === 10 ? 'T12:00:00+10:30' : '')).toLocaleDateString('en-AU', { timeZone: 'Australia/Adelaide', ...o });
const day = d => fmt(d, { weekday: 'short', day: 'numeric', month: 'short' }).replace(',', '');
const num = n => Math.round(n).toLocaleString('en-AU');
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const list = a => a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const plural = (n, one, many) => `${n} ${n === 1 ? one : many || one + 's'}`;

// First names, with a surname initial only when two different people in the same team share a first name.
function namer(fullNames) {
  const byFirst = {};
  for (const n of new Set(fullNames.map(canon))) { const f = n.split(' ')[0]; (byFirst[f] = byFirst[f] || new Set()).add(n); }
  return n => { n = canon(n); const parts = n.split(' '); const f = parts[0];
    return byFirst[f] && byFirst[f].size > 1 && parts[1] ? `${f} ${parts[parts.length - 1][0]}.` : f; };
}

// ---- roster
const roster = (data.roster || []).map(r => ({ ...r, name: canon(r.name), hrs: Number(r.hrs) }));
const teams = {};
for (const t of TEAMS) {
  const rows = roster.filter(r => r.team === t);
  const vol = rows.filter(r => r.lvl !== 'PARA');
  const people = {};
  for (const r of vol) { const p = people[r.name] = people[r.name] || { name: r.name, hrs: 0, shifts: 0 }; p.hrs += r.hrs; p.shifts += r.shifts; }
  teams[t] = {
    name: t, people: Object.values(people).sort((a, b) => b.hrs - a.hrs),
    hrs: vol.reduce((a, r) => a + r.hrs, 0), shifts: vol.reduce((a, r) => a + r.shifts, 0),
    paraHrs: rows.filter(r => r.lvl === 'PARA').reduce((a, r) => a + r.hrs, 0),
    jobs: [], mix: {}, onRoster: {}, otherCrews: 0,
  };
}

// ---- jobs
const unique = new Set();
for (const j of data.jobs || []) {
  const cat = category(j.type); if (!cat || !teams[j.team]) continue;
  unique.add(`${j.ts}|${j.type}`);  // each team gets its own job number, so match shared jobs on time + type
  const T = teams[j.team]; T.jobs.push(j); T.mix[cat] = (T.mix[cat] || 0) + 1;
  const on = (j.on_roster || []).map(canon);
  if (!on.length) T.otherCrews++;
  for (const n of on) T.onRoster[n] = (T.onRoster[n] || 0) + 1;
}
const totalPages = TEAMS.reduce((a, t) => a + teams[t].jobs.length, 0);
const allVols = new Set(TEAMS.flatMap(t => teams[t].people.map(p => p.name)));
const totalHrs = TEAMS.reduce((a, t) => a + teams[t].hrs, 0);

// ---- training
const tidy = t => (t || '').replace(/ - (AO )?/g, ': ');
const train = (data.training || []).map(s => ({ ...s,
  label: s.lessons ? tidy(s.lessons) + (s.topic ? ` (${s.topic})` : '') : (s.topic || 'Team night') }));
const past = train.filter(s => s.date <= data.to);
const upcoming = train.filter(s => s.date > data.to);
const trainingNights = past.filter(s => !/week off|cancel/i.test(s.label)).length;
const attended = past.filter(s => (s.came || []).length);

// ---- team boxes (chatty text built from the numbers; words.json can add a line per team)
function teamBox(T) {
  const nm = namer([...T.people.map(p => p.name), ...Object.keys(T.onRoster)]);
  const n = T.jobs.length;
  const mixHtml = n <= 3
    ? `<span>${n ? 'Small numbers, so no job types this time' : 'A quiet month for the pager'}</span>`
    : Object.entries(T.mix).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<span>${esc(k)} ${v}</span>`).join('');
  const on = Object.entries(T.onRoster).sort((a, b) => b[1] - a[1]).map(([k]) => nm(k));
  const rest = T.people.map(p => p.name).filter(p => !T.onRoster[p]).map(nm);
  let txt = '';
  if (n) {
    const local = n - T.otherCrews;
    txt += on.length ? `Thanks to ${list(on)}, who ${on.length === 1 ? 'was' : 'were'} on the roster when the pager went off. ` : '';
    if (T.otherCrews) txt += `${T.otherCrews === n ? (n === 1 ? 'The job' : `All ${n} jobs`) : plural(T.otherCrews, 'job')} ${T.otherCrews === 1 && T.otherCrews !== n ? 'was' : 'were'} attended by other crews, with no local crew on the roster at the time${local ? '' : ''}. `;
  }
  if (rest.length) txt += `${list(rest)} also kept the roster ticking over. `;
  if (T.paraHrs >= 1) txt += `Paramedic cover added about ${num(T.paraHrs)} hours. `;
  if (W.teams && W.teams[T.name]) txt += esc(W.teams[T.name]);
  return `<div class="team"><h3>${esc(T.name)}</h3>
<div class="stats"><div><b>${num(T.hrs)}</b> hrs</div><div><b>${T.shifts}</b> shifts</div><div><b>${T.people.length}</b> people</div><div><b>${n}</b> ${n === 1 ? 'page' : 'pages'}</div></div>
<div class="mix">${mixHtml}</div><p class="thanks">${txt.trim()}</p></div>`;
}

// ---- weather
function wxHtml() {
  if (!WX || !WX.stations || !WX.stations.length) return '';
  const S = WX.stations.filter(s => s.days);
  const hot = S.map(s => s.hottest && { ...s.hottest, st: s.name }).filter(Boolean).sort((a, b) => b.max - a.max)[0];
  const wind = S.map(s => s.windiest && { ...s.windiest, st: s.name }).filter(Boolean).sort((a, b) => b.gust - a.gust)[0];
  const cold = S.map(s => s.coldest && { ...s.coldest, st: s.name }).filter(Boolean).sort((a, b) => a.min - b.min)[0];
  const wet = S.map(s => s.wettest && { ...s.wettest, st: s.name }).filter(Boolean).sort((a, b) => b.rain - a.rain)[0];
  const hot30 = S.reduce((a, s) => Math.max(a, s.days30.length), 0);
  return `<h2>The weather</h2><div class="wx">
<div><b>Hot and windy</b><br>Top temperature was ${hot.max}°C at ${esc(hot.st)} on ${day(hot.date)}${hot30 ? `, with up to ${plural(hot30, 'day')} of 30°C or more` : ''}. The biggest gust was ${wind.gust} km/h (${esc(wind.gustDir)}) at ${esc(wind.st)} on ${day(wind.date)}.</div>
<div><b>Rain</b><br>${S.map(s => `${esc(s.name)} ${s.rainTotal} mm`).join(', ')}. The wettest day was ${day(wet.date)}, with ${wet.rain} mm at ${esc(wet.st)}.</div>
<div><b>Coldest morning</b><br>${cold.min}°C at ${esc(cold.st)} on ${day(cold.date)}.${W.weatherNote ? ' ' + esc(W.weatherNote) : ''}</div>
</div>`;
}

const tr = s => `<tr><td>${day(s.date)}</td><td>${esc(s.team)}</td><td>${esc(s.label)}</td><td>${esc((s.lead || '').split(' ')[0])}</td></tr>`;
const attendText = attended.length
  ? attended.map(s => { const f = (s.came || []).map(n => canon(n).split(' ')[0]);
      return `${esc(s.team)} on ${day(s.date)}: ${f.length > 6 ? `${f.length} people` : list(f)}`; }).join('. ') + '.'
  : '';

const fromL = fmt(data.from, { day: 'numeric', month: 'long' });
const toL = fmt(data.to, { day: 'numeric', month: 'long', year: 'numeric' });
const title = W.issue || `${fromL} to ${toL}`;

const html = `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><title>DSY Team News</title>
<style>
@page{size:A4;margin:11mm 12mm}*{box-sizing:border-box}
body{font-family:"Helvetica Neue",Arial,sans-serif;color:#1d2a33;font-size:9.6pt;line-height:1.36;margin:0}
.mast{display:flex;align-items:center;gap:12px;border-bottom:3px solid #0f5e6e;padding-bottom:8px;margin-bottom:10px}
.mast img{height:44px}.mast h1{margin:0;font-size:21pt;color:#0f5e6e}.mast .sub{font-size:10pt;color:#4d5c66}
.draft{margin-left:auto;font-size:8pt;background:#fff3cd;border:1px solid #e0c060;padding:3px 7px;border-radius:4px}
h2{font-size:12.5pt;color:#0f5e6e;margin:12px 0 6px;border-bottom:1px solid #cfdde0;padding-bottom:2px;break-after:avoid}
.big{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:8px 0 4px}
.big div{background:#eef5f6;border-radius:6px;padding:7px 9px}.big b{display:block;font-size:17pt;color:#0f5e6e;line-height:1.1}
.big span{font-size:8.5pt;color:#4d5c66}
.teams{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.team{border:1px solid #cfdde0;border-radius:7px;padding:8px 10px;break-inside:avoid}
.team h3{margin:0 0 4px;font-size:11.5pt}.stats{display:flex;gap:12px;font-size:9pt;color:#4d5c66;margin-bottom:5px}
.stats b{color:#1d2a33;font-size:10.5pt}.mix{font-size:9pt;margin:3px 0 5px}
.mix span{display:inline-block;background:#eef5f6;border-radius:10px;padding:1px 7px;margin:1px 2px 1px 0}
.thanks{font-size:9pt}p{margin:4px 0}
table{width:100%;border-collapse:collapse;font-size:9pt}th,td{text-align:left;padding:2px 5px;border-bottom:1px solid #e2eaec}
th{color:#4d5c66;font-weight:600;font-size:8.5pt}tr{break-inside:avoid}
.wx{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.wx div{background:#f6f8f9;border-radius:6px;padding:6px 8px;font-size:9pt}
.wx b{color:#0f5e6e}.shout{background:#0f5e6e;color:#fff;border-radius:7px;padding:8px 11px;margin-top:9px;break-inside:avoid}
.shout h2{color:#fff;border-color:#4f8f9b;margin-top:0}.shout ul{margin:3px 0 0;padding-left:18px}
.foot{font-size:7.5pt;color:#6b7a83;margin-top:10px;border-top:1px solid #cfdde0;padding-top:4px}.pb{break-before:page}
</style></head><body>
<div class="mast"><img src="dsy-logo.png" alt=""><div><h1>DSY Team News</h1>
<div class="sub">Coffin Bay · Cummins · Tumby Bay · Port Neill &nbsp;|&nbsp; ${esc(title)}</div></div>
${W.final ? '' : '<div class="draft">DRAFT for review</div>'}</div>
<p>${esc(W.intro || '')}</p>
<div class="big">
<div><b>${num(totalHrs)}</b><span>volunteer hours on the roster</span></div>
<div><b>${allVols.size}</b><span>volunteers on the roster</span></div>
<div><b>${unique.size}</b><span>jobs paged to our teams*</span></div>
<div><b>${trainingNights}</b><span>training nights</span></div></div>
<p style="font-size:8pt;color:#6b7a83">*Some jobs page more than one team, so counted per team there were ${totalPages} pages.</p>
<h2>Around the teams</h2><div class="teams">${TEAMS.map(t => teamBox(teams[t])).join('')}</div>
${(W.shoutouts || []).length ? `<div class="shout"><h2>Shout-outs</h2><ul>${W.shoutouts.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>` : ''}
<h2 class="pb">Training: what we got up to</h2>
<table><tr><th>Date</th><th>Team</th><th>Session</th><th>Led by</th></tr>${past.map(tr).join('')}</table>
${attendText ? `<p><b>Who came along</b> (where it was ticked off): ${attendText}</p>` : ''}
${W.trainingNote ? `<p>${esc(W.trainingNote)}</p>` : ''}
<h2>Coming up</h2>
<table><tr><th>Date</th><th>Team</th><th>Session</th><th>Led by</th></tr>${upcoming.map(tr).join('')}</table>
${W.comingNote ? `<p>${esc(W.comingNote)}</p>` : ''}
${wxHtml()}
${W.signoff ? `<p style="margin-top:10px">${esc(W.signoff)}</p>` : ''}
<div class="foot">Put together by DSY Training from the team rosters, the pager feed and the DSY training app${WX ? `, with weather from the Bureau of Meteorology (${WX.stations.map(s => s.name).join(', ')})` : ''}. Hours are rostered (on-call) hours. "On the roster when the pager went off" means rostered at the time, not necessarily on the job. No patient details are included.</div>
</body></html>`;

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(path.join(__dirname, '..', '..', 'microlearning', 'shared', 'dsy-logo.png'), path.join(outDir, 'dsy-logo.png'));
const htmlPath = path.join(outDir, 'news.html');
fs.writeFileSync(htmlPath, html);
const pdfPath = path.join(outDir, `DSY-Team-News-${data.from}-to-${data.to}.pdf`);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.resolve(htmlPath));
  await p.pdf({ path: pdfPath, format: 'A4', preferCSSPageSize: true, printBackground: true });
  await b.close();
  console.log(pdfPath);
  console.log(JSON.stringify({ pages: totalPages, unique: unique.size, hrs: Math.round(totalHrs), vols: allVols.size,
    otherCrews: Object.fromEntries(TEAMS.map(t => [t, teams[t].otherCrews])),
    unknownNames: [...new Set((data.training || []).flatMap(s => s.came || []).filter(n => !n.includes(' ')))] }));
})();
