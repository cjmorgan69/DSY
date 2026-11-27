#!/usr/bin/env node
/* Builds the site search index for the dashboard search box (shared/site-search.js).
     node .claude/tools/search-index.js           write shared/search-index.js
     node .claude/tools/search-index.js --check   change nothing; exit 1 if the index is out of date
   stamp.js runs this first, so the index is rebuilt whenever the cache tag changes.

   What goes in:
     - topics from hub/topics.js (one entry per topic, with links to every part: module, walk-through, MDT, PCR ...)
     - the 34 AO protocols from .claude/references/ao-protocols.md (code, name, SAAS PDF link, DSY topic if any)
     - every tracked page: title, description, headings and the main words of its text (and of its content.js)
       with the page's sign-in level, so the search box only shows pages the person can open
   Left out: /LOGO files/, .claude/, video sources and the unlinked test pages listed in SKIP. */
const fs = require("fs"), path = require("path"), cp = require("child_process"), vm = require("vm");
const root = path.resolve(__dirname, "../..");
const OUT = "shared/search-index.js";
const read = f => fs.readFileSync(path.join(root, f), "utf8");
const exists = f => fs.existsSync(path.join(root, f));

const SKIP = ["modules/rosters/lowereyre/test/", "modules/asthma/",
  "modules/rural-ed/", "tools/roster-share/", "modules/hypoglycaemia/", "modules/rosters/backend/"];
const skip = f => f.startsWith("LOGO files/") || f.startsWith(".claude/") || f.includes("/video-src/") ||
  SKIP.some(s => f.startsWith(s)) || f === "hub/index.html";

/* The 34 AO protocols, names exactly as the SAAS clinical site has them (main.10d22172e56532ee.js, 27 Nov 2026): the PDF
   is https://clinical.saambulance.sa.gov.au/assets/pdf/home/<name> - AO.pdf. Codes from .claude/references/ao-protocols.md. */
const AO_PROTOCOLS = {
  "CPP-001-AO": "Acute Cardiogenic Pulmonary Oedema", "CPP-002-AO": "Cardiac Arrest (Adult)", "CPP-003-AO": "Anaphylaxis",
  "CPP-004-AO": "Basic Care and Life Support", "CPP-006-AO": "Burns", "CPP-007-AO": "Chest Pain", "CPP-008-AO": "Envenomation",
  "CPP-009-AO": "Hypoglycaemia", "CPP-011-AO": "Narcotic Overdose", "CPP-012-AO": "Newborn Care and Resuscitation",
  "CPP-013-AO": "Pain Management", "CPP-014-AO": "Seizures", "CPP-015-AO": "Transfer of Patients Exceeding AO ATP",
  "CPP-016-AO": "Stroke", "CPP-017-AO": "Acute Behavioural Disturbance", "CPP-018-AO": "Spinal Injury",
  "CPP-019-AO": "Hypothermia (Severe and Unresponsive)", "CPP-020-AO": "Non-Initiation of CPR (Cardiopulmonary Resuscitation)",
  "CPP-021-AO": "Extended Practice for Credentialed Health Professionals", "CPP-042-AO": "Amputation and Haemorrhage",
  "CPP-043-AO": "Cardiac Arrest (Paediatric)", "CPP-045-AO": "Falls", "CPP-046-AO": "Metropolitan Emergency Department Destination Triage",
  "CPP-047-AO": "Nausea and Vomiting", "CPP-050-AO": "Asthma", "CPP-053-AO": "Primary Postpartum Haemorrhage",
  "CPP-055-AO": "Treat and Refer", "CPP-056-AO": "Refusal Against Advice", "CPP-059-AO": "Pregnancy and Birth",
  "CPP-061-AO": "Headache", "CPP-062-AO": "Sepsis", "CPP-063-AO": "Prolonged Care", "CPP-065-AO": "Button Battery Ingestion",
  "CPP-158-AO": "Chest Trauma"
};

const STOP =new Set(("the and for with that this from your you are was were will have has had not but can all any " +
  "its their they them then than when what which who how into out our over more most also only just each very been " +
  "being there here about after before while where why use used using page pages dsy training shows show tap open " +
  "back next start see one two three yes per may must should would could").split(" "));
const ent = s => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&lsquo;/g, "'").replace(/&middot;/g, "·").replace(/&[a-z#0-9]+;/gi, " ");
const clean = s => ent(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const words = (s, max) => {
  const out = [], seen = new Set();
  for (const w of s.toLowerCase().replace(/[^a-z0-9\-' ]+/g, " ").split(/\s+/)) {
    const x = w.replace(/^[-']+|[-']+$/g, "");
    if (x.length < 3 || STOP.has(x) || /^\d+$/.test(x) || seen.has(x)) continue;
    seen.add(x); out.push(x); if (out.length >= max) break;
  }
  return out.join(" ");
};

function section(f) {
  const p = f.split("/");
  if (f.startsWith("modules/rosters/")) return /manager|coverage|operations/.test(f) ? "Roster tools" : "Roster";
  const map = { microlearning: "Microlearning", modules: "Walk-through", stations: "Skills stations", classroom: "Case-night slides",
    userguides: "User guide", dashboard: "Dashboard", tools: "Tool", mdt: "MDT", scenarios: "Scenario customiser",
    training: "Team training", teams: "Team page", region: "Region", access: "People", ar: "AR course", course: "AR course",
    "vehicle-check": "Vehicle check", dispatch: "Dispatch", hub: "Training home", feedback: "Feedback", ao: "Walk-throughs",
    classic: "Old pages", paramedic: "Old pages", "rural-ed": "Old pages", "gp-clinic": "Old pages", signin: "Sign in" };
  if (p.length === 1) return "Training home";
  return map[p[0]] || "Page";
}
function url(f) { return "/" + f.replace(/(^|\/)index\.html$/, "$1"); }
function strings(js) {
  /* the text of a content.js file: every quoted string, joined */
  const out = [];
  for (const m of js.matchAll(/"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'|`([^`]*)`/g)) {
    const s = m[1] || m[2] || m[3] || "";
    if (s.length > 2 && !/^[\w./#?=-]+$/.test(s)) out.push(s);
  }
  return out.join(" ");
}

function build() {
  const files = cp.execSync("git ls-files -z -- '*.html'", { cwd: root }).toString().split("\0").filter(f => f && !skip(f));
  const pages = [];
  for (const f of files.sort()) {
    const html = read(f);
    if (/http-equiv="refresh"/i.test(html) && html.length < 3000) continue;      // forwarding pages
    let t = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1];
    t = t ? clean(t).replace(/\s*[-|·–]\s*DSY( Training)?$/i, "").replace(/^DSY( Training)?\s*[-|·–]\s*/i, "") : "";
    const d = clean((html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1] || "");
    const body = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<head[\s\S]*?<\/head>/i, " ");
    const heads = [...body.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map(m => clean(m[1])).filter(Boolean);
    let text = clean(body);
    const dir = path.dirname(f), cj = path.join(dir, "content.js");
    let mod = null;
    if (exists(cj)) {
      const js = read(cj); text += " " + strings(js);
      const mt = js.match(/title:\s*"([^"]+)"/), ms = js.match(/subtitle:\s*"([^"]+)"/);
      if (mt) mod = mt[1] + (ms ? " · " + ms[1] : "");
    }
    if (!t && heads[0]) t = heads[0];
    if (!t) continue;
    const g = (html.match(/gate\.js[^>]*data-level="([a-z]+)"/) || [])[1] || (/gate\.js/.test(html) ? "student" : "open");
    pages.push({ u: url(f), t, s: section(f), d: (d || mod || heads.filter(h => h !== t).slice(0, 2).join(" · ")).slice(0, 160),
      h: heads.slice(0, 12).join(" · ").slice(0, 400), k: words(text, 220), g });
  }

  /* topics */
  const ctx = { window: {} }; vm.runInNewContext(read("hub/topics.js"), ctx);
  const groups = Object.fromEntries((ctx.window.DSY_GROUPS || []).map(g => [g.id, g.title]));
  const topics = (ctx.window.DSY_TOPICS || []).map(t => {
    const links = [];
    if (t.module) links.push(["Module", "/microlearning/" + t.module + "/"]);
    if (t.walk) links.push(["Walk-through", t.walk]);
    if (t.stations) links.push(["Stations", t.stations]);
    if (t.slides) links.push(["Case night", t.slides]);
    if (t.mdt) links.push(["MDT job", "/mdt/#job=" + t.mdt]);
    if (t.pcr) links.push(["PCR", "/tools/pcr/#job=" + t.pcr]);
    if (t.custom) links.push(["Customise", "/scenarios/#s=" + t.custom]);
    return { id: t.id, t: t.title, p: t.protocol || "", pt: t.patient || "", gr: groups[t.group] || "", l: links };
  });

  /* AO protocols */
  const protocols = Object.entries(AO_PROTOCOLS).map(([c, n]) => ({ c, n }));
  const ref = read(".claude/references/ao-protocols.md");
  for (const m of ref.matchAll(/CPP-\d{3}-AO/g)) if (!AO_PROTOCOLS[m[0]]) throw new Error(m[0] + " is in ao-protocols.md but not in AO_PROTOCOLS here");
  for (const p of protocols) {
    const tp = (ctx.window.DSY_TOPICS || []).find(t => (t.protocol || "").split(/,\s*/).includes(p.c));
    if (tp) p.tp = tp.id;
  }
  protocols.sort((a, b) => a.c < b.c ? -1 : 1);

  return "/* Site search index: made by .claude/tools/search-index.js (run by stamp.js). Do not edit by hand. */\n" +
    "window.DSY_SEARCH_INDEX = " + JSON.stringify({ topics, protocols, pages }) + ";\n";
}

const out = build();
if (process.argv.includes("--check")) {
  const now = exists(OUT) ? read(OUT) : "";
  if (now !== out) { console.log("Search index is out of date. Run: node .claude/tools/search-index.js"); process.exit(1); }
  console.log("Search index up to date."); process.exit(0);
}
fs.writeFileSync(path.join(root, OUT), out);
const o = JSON.parse(out.slice(out.indexOf("{"), out.lastIndexOf("}") + 1));
console.log("Search index: " + o.topics.length + " topics, " + o.protocols.length + " protocols, " + o.pages.length +
  " pages, " + Math.round(out.length / 1024) + " KB -> " + OUT);
