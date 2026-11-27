#!/usr/bin/env node
/* Site check: reports problems, changes nothing.   node .claude/tools/check.js
   Run it before opening a PR. Exit code 1 if anything is listed under PROBLEMS (NOTES are for information).
     1 cache tags      one tag everywhere (fix: node .claude/tools/stamp.js)
     2 links           local href/src in every page point at a file that exists
     3 sign-in gate    every page loads /shared/gate.js first, unless it is on the OPEN list below
     4 topics          hub/topics.js entries point at real modules, walk-throughs, stations, decks, MDT and PCR jobs
     5 walk-throughs   each converted walk-through has a hub topic, a PCR job, a related.js line and a card on /ao/
     6 microlearning   every module folder is on a list in modules.js and the other way round
     7 case nights     each case-night deck ends with a feedback slide
     8 search index    shared/search-index.js matches the pages (fix: node .claude/tools/stamp.js) */
const fs = require("fs"), path = require("path"), cp = require("child_process"), vm = require("vm");
const root = path.resolve(__dirname, "../..");
const read = f => fs.readFileSync(path.join(root, f), "utf8");
const exists = f => fs.existsSync(path.join(root, f));
const tracked = cp.execSync("git ls-files -z", { cwd: root }).toString().split("\0").filter(Boolean);
const pages = tracked.filter(f => f.endsWith(".html") && !f.startsWith("LOGO files/") && !f.startsWith(".claude/") && !f.includes("/video-src/"));
const problems = [], notes = [];
const bad = (area, msg) => problems.push("[" + area + "] " + msg), note = (area, msg) => notes.push("[" + area + "] " + msg);

/* Pages that are open on purpose (no sign-in). Add a page here only when the owner says it should be open. */
const OPEN = [
  "index.html", "signin/index.html", "hub/index.html", "observations-module.html", "ao/observations-module.html",
  "classic/index.html", "paramedic/index.html", "rural-ed/index.html", "gp-clinic/index.html",
  "microlearning/index.html", "microlearning/paramedic/index.html", "microlearning/rn/index.html",
  "microlearning/tbi/index.html", "microlearning/crush/index.html", "microlearning/faint-or-fit/index.html",
  "microlearning/asthma-copd/index.html", "microlearning/asthma-copd-ed/index.html", "microlearning/sepsis-nursing/index.html",
  "feedback/index.html", "userguides/rosters/index.html", "userguides/start/index.html", "tools/roster-share/index.html",
  /* own sign-in (Supabase or Apps Script) */
  "training/index.html", "teams/index.html", "region/index.html", "dispatch/index.html", "course/index.html"
];
const openPage = f => OPEN.includes(f) || f.startsWith("modules/rosters/");

// 1 cache tags
try { cp.execSync("node .claude/tools/stamp.js --check", { cwd: root, stdio: "pipe" }); }
catch (e) { bad("cache tags", "more than one tag in use. Run: node .claude/tools/stamp.js"); }

// 2 links
const target = (from, u) => {
  u = u.split(/[?#]/)[0]; try { u = decodeURIComponent(u); } catch (e) {}
  if (!u) return null;
  let p = u.startsWith("/") ? u.slice(1) : path.posix.normalize(path.posix.join(path.posix.dirname(from), u));
  if (p === "" || p === ".") p = "index.html";
  return p;
};
const resolves = p => exists(p) && (fs.statSync(path.join(root, p)).isFile() || exists(p + "/index.html")) || exists(p + ".html");
for (const f of pages) {
  const s = read(f).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, m => m.match(/^<script\b[^>]*>/)[0]);   // tags only, not inline code
  for (const m of s.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|blob:|\/\/|#)/.test(u) || /[${}+']/.test(u)) continue;
    const p = target(f, u);
    if (p && !resolves(p)) bad("links", f + " -> " + u);
  }
}

// 3 sign-in gate
for (const f of pages) {
  const s = read(f), gated = /<script[^>]+src="\/shared\/gate\.js/.test(s);
  if (!gated && !openPage(f)) bad("gate", f + " has no sign-in gate and is not on the OPEN list in check.js");
  if (gated && OPEN.includes(f)) note("gate", f + " is gated but still on the OPEN list");
  if (gated) {
    const first = (s.match(/<script\b[^>]*>/) || [""])[0];
    if (!/\/shared\/gate\.js/.test(first)) bad("gate", f + ": gate.js is not the first script on the page");
    if (!/data-level="(student|facilitator|leader|vtl|mdt|stations)"/.test(first)) bad("gate", f + ": gate.js has no valid data-level");
  }
}

// load the site's data files
const load = (...fs_) => { const w = {}; const ctx = vm.createContext({ window: w, document: { write() {} }, location: { hash: "", search: "" }, console }); fs_.forEach(f => { try { vm.runInContext(read(f), ctx, { filename: f }); } catch (e) { bad("data", f + " did not load: " + e.message); } }); return w; };
const W = load("hub/topics.js", "microlearning/modules.js", "microlearning/shared/related.js", "mdt/jobs.js", "tools/pcr/jobs.js");
const topics = W.DSY_TOPICS || [], groups = (W.DSY_GROUPS || []).map(g => g.id), lists = W.MODULE_LISTS || {};
const mdtIds = (W.MDT_JOBS || []).map(j => j.id), pcrIds = Object.keys(W.PCR_JOBS || {});
const relatedText = JSON.stringify(W.RELATED || {}).replace(/%20/g, " ");
const local = u => u && !/^https?:/.test(u);

// 4 topics
for (const t of topics) {
  const at = "topic " + t.id + ": ";
  if (t.group && !groups.includes(t.group)) bad("topics", at + "group '" + t.group + "' is not in DSY_GROUPS");
  if (t.module && !exists("microlearning/" + t.module + "/content.js")) bad("topics", at + "module /microlearning/" + t.module + "/ not found");
  for (const k of ["walk", "stations", "slides"]) if (local(t[k]) && !resolves(target("index.html", t[k]))) bad("topics", at + k + " " + t[k] + " not found");
  if (t.mdt && !mdtIds.includes(t.mdt)) bad("topics", at + "MDT job '" + t.mdt + "' is not in mdt/jobs.js");
  if (t.pcr && !pcrIds.includes(t.pcr)) bad("topics", at + "PCR job '" + t.pcr + "' is not in tools/pcr/jobs.js");
  if (t.walk) for (const k of ["mdt", "custom", "pcr", "stations"]) if (!t[k]) note("topics", at + "has a walk-through but no " + k);
}

// 5 walk-throughs on the template
const aoPage = exists("ao/index.html") ? read("ao/index.html").replace(/%20/g, " ") : "";
const walks = pages.filter(f => /^modules\/[^/]+\/index\.html$/.test(f) && /microlearning\/shared\/module\.js/.test(read(f))).map(f => f.split("/")[1]);
for (const w of walks) {
  const url = "/modules/" + w + "/", t = topics.find(x => x.walk && decodeURIComponent(x.walk) === url);
  if (!t) bad("walk-throughs", url + " has no topic in hub/topics.js");
  else if (!t.pcr) bad("walk-throughs", url + " has no PCR job set on its topic");
  if (!relatedText.includes(url)) bad("walk-throughs", url + " has no line in related.js");
  if (!aoPage.includes("modules/" + w + "/")) bad("walk-throughs", url + " has no card on /ao/");
}

// 6 microlearning folders against modules.js
const listed = [].concat(...Object.values(lists));
const folders = [...new Set(tracked.filter(f => /^microlearning\/[^/]+\/content\.js$/.test(f)).map(f => f.split("/")[1]))];
folders.filter(m => !listed.includes(m)).forEach(m => bad("microlearning", "/microlearning/" + m + "/ is not on a list in modules.js"));
listed.filter(m => !folders.includes(m)).forEach(m => bad("microlearning", "modules.js lists '" + m + "' but the folder has no content.js"));
for (const m of folders) if (!exists("microlearning/" + m + "/index.html")) bad("microlearning", "/microlearning/" + m + "/ has no index.html");

// 7 case-night decks
for (const f of tracked.filter(f => /^classroom\/[^/]+\/data\/build\.js$/.test(f))) if (!/\/feedback\/\?t=/.test(read(f))) bad("case nights", f + " has no feedback QR slide");

// 8 dashboard search index
try { cp.execSync("node .claude/tools/search-index.js --check", { cwd: root, stdio: "pipe" }); }
catch (e) { bad("search index", "shared/search-index.js is out of date. Run: node .claude/tools/stamp.js"); }

console.log("Checked " + pages.length + " pages, " + topics.length + " topics, " + walks.length + " walk-throughs, " + folders.length + " modules.");
if (notes.length) { console.log("\nNOTES (" + notes.length + ")"); notes.forEach(n => console.log("  " + n)); }
if (problems.length) { console.log("\nPROBLEMS (" + problems.length + ")"); problems.forEach(p => console.log("  " + p)); process.exit(1); }
console.log("\nNo problems found.");
