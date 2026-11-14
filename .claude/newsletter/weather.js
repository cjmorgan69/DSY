// Weather summary for one newsletter period from BOM Daily Weather Observations (free CSVs, last ~13 months only).
// Usage: node .claude/newsletter/weather.js 2026-11-01 2026-11-30 > <scratchpad>/weather.json
const STATIONS = [
  { id: 'IDCJDW5055', name: 'Port Lincoln', covers: 'Coffin Bay and Tumby Bay' },
  { id: 'IDCJDW5077', name: 'Cummins', covers: 'Cummins' },
  { id: 'IDCJDW5011', name: 'Cleve Aerodrome', covers: 'Port Neill' },
];
const [from, to] = process.argv.slice(2);
if (!from || !to) { console.error('usage: weather.js FROM TO'); process.exit(1); }

function months(a, b) {
  const out = []; let [y, m] = a.split('-').map(Number); const [y2, m2] = b.split('-').map(Number);
  while (y < y2 || (y === y2 && m <= m2)) { out.push(`${y}${String(m).padStart(2, '0')}`); m++; if (m > 12) { m = 1; y++; } }
  return out;
}
const iso = s => { const [y, m, d] = s.split('-'); return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`; };

(async () => {
  const result = { from, to, source: 'Bureau of Meteorology Daily Weather Observations', stations: [] };
  for (const st of STATIONS) {
    const days = [];
    for (const ym of months(from, to)) {
      const url = `https://reg.bom.gov.au/climate/dwo/${ym}/text/${st.id}.${ym}.csv`;
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) { console.error('BOM', res.status, url); continue; }
      for (const line of (await res.text()).split('\n')) {
        const c = line.split(',');
        if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(c[1] || '')) continue;
        const d = iso(c[1]);
        if (d < from || d > to) continue;
        const n = v => (v === '' || v === undefined ? null : Number(v));
        days.push({ date: d, min: n(c[2]), max: n(c[3]), rain: n(c[4]) || 0, gustDir: c[7], gust: n(c[8]) });
      }
    }
    const ok = days.filter(d => d.max !== null);
    const pick = (arr, k, hi) => arr.filter(d => d[k] !== null).reduce((a, b) => (hi ? b[k] > a[k] : b[k] < a[k]) ? b : a, arr[0]);
    result.stations.push({
      ...st, days: days.length,
      hottest: ok.length ? pick(ok, 'max', true) : null,
      coldest: ok.length ? pick(ok, 'min', false) : null,
      windiest: days.length ? pick(days, 'gust', true) : null,
      wettest: days.length ? pick(days, 'rain', true) : null,
      rainTotal: Math.round(days.reduce((a, d) => a + d.rain, 0) * 10) / 10,
      wetDays: days.filter(d => d.rain >= 1).length,
      days30: ok.filter(d => d.max >= 30).map(d => [d.date, d.max]),
    });
  }
  console.log(JSON.stringify(result, null, 1));
})();
