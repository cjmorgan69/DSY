#!/usr/bin/env node
/* Cache tag stamper. Puts ONE tag on every local script and stylesheet link in every page, so phones fetch the new
   files after a merge (scripts are cached for about 4 hours).

     node .claude/tools/stamp.js            next tag: today's date (Adelaide) + a, b, c ...
     node .claude/tools/stamp.js 20261201a  a tag you choose
     node .claude/tools/stamp.js --check    change nothing; list the tags in use (exit 1 if more than one)

   What it stamps:
     - src/href="....js" and "....css" in every tracked .html (adds ?v= where missing), except outside links
     - window.ASSET_VERSION = "..." on the microlearning landing pages
     - date-style tags (?v=20261113b, ?v=2026-11-10.1) written inside .js files (classroom manifests)
   Left alone: YouTube links, media tags such as intro.mp4?v=2 (bump those by hand when a video is re-rendered),
   /LOGO files/, video-src scenes and this folder. */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const root = path.resolve(__dirname, "../..");
const args = process.argv.slice(2), checkOnly = args.includes("--check");
const skip = f => f.startsWith("LOGO files/") || f.startsWith(".claude/") || f.includes("/video-src/");
const files = cp.execSync("git ls-files -z -- '*.html' '*.js'", { cwd: root }).toString().split("\0").filter(f => f && !skip(f));

const REF = /((?:src|href)=")([^"?#]+\.(?:js|css))(?:\?v=[^"#]*)?(")/g;          // local js / css link in a page
const DATED = /\?v=(\d{8}[a-z]{1,2}|\d{4}-\d{2}-\d{2}\.\d+)\b/g;                 // date-style tag anywhere
const ASSET = /(ASSET_VERSION\s*=\s*")[^"]*(")/g;
const outside = u => /^(https?:)?\/\//.test(u);

// tags in use now
const seen = {};
for (const f of files) {
  const s = fs.readFileSync(path.join(root, f), "utf8");
  if (f.endsWith(".html")) for (const m of s.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))(\?v=([^"#]*))?"/g)) {
    if (outside(m[1])) continue;
    const t = m[3] || "(none)"; (seen[t] = seen[t] || new Set()).add(f);
  }
  for (const m of s.matchAll(DATED)) (seen[m[1]] = seen[m[1]] || new Set()).add(f);
  for (const m of s.matchAll(/ASSET_VERSION\s*=\s*"([^"]*)"/g)) (seen[m[1]] = seen[m[1]] || new Set()).add(f);
}
const tags = Object.keys(seen).sort();
if (checkOnly) {
  tags.forEach(t => console.log(String(seen[t].size).padStart(4) + " files  " + t));
  console.log(tags.length === 1 ? "OK: one cache tag (" + tags[0] + ")" : "MIXED: " + tags.length + " different cache tags. Run: node .claude/tools/stamp.js");
  process.exit(tags.length === 1 ? 0 : 1);
}

let tag = args.find(a => !a.startsWith("--"));
if (!tag) {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Adelaide" }).format(new Date()).replace(/-/g, "");
  /* a, b ... z, then za, zb ... zz (two letters sort after one, so a later tag is never an earlier one) */
  const suf = tags.filter(t => new RegExp("^" + today + "[a-z]{1,2}$").test(t)).map(t => t.slice(today.length))
    .sort((x, y) => x.length - y.length || (x < y ? -1 : 1));
  const last = suf.length ? suf[suf.length - 1] : null;
  if (last === "zz") { console.error("Out of letters for today: give a tag by hand."); process.exit(1); }
  const next = !last ? "a" : last === "z" ? "za" : last.slice(0, -1) + String.fromCharCode(last.slice(-1).charCodeAt(0) + 1);
  tag = today + next;
}
if (!/^[\w.-]+$/.test(tag)) { console.error("Tag may only hold letters, numbers, dot, dash."); process.exit(1); }

let changed = 0;
for (const f of files) {
  const p = path.join(root, f), before = fs.readFileSync(p, "utf8");
  let s = before;
  if (f.endsWith(".html")) {
    s = s.replace(REF, (m, a, u, z) => outside(u) ? m : a + u + "?v=" + tag + z);
    s = s.replace(ASSET, "$1" + tag + "$2");
  }
  s = s.replace(DATED, "?v=" + tag);
  if (s !== before) { fs.writeFileSync(p, s); changed++; }
}
console.log("Cache tag " + tag + " written to " + changed + " files.");
