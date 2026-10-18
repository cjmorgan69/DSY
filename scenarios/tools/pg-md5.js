// Prints the same checksums as Postgres md5(template::text) and md5(fields::text), to check a row after loading it.
// Run with: node scenarios/tools/pg-md5.js /tmp/scenario-<name>
const fs = require("fs"), crypto = require("crypto"), path = require("path");
const str = s => "\"" + s.replace(/[\\"\u0000-\u001f]/g, c => ({ "\\": "\\\\", "\"": "\\\"", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f" }[c] ||
  "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"))) + "\"";
// jsonb text output: keys ordered by byte length, then bytes; ", " and ": " separators
const pg = v => Array.isArray(v) ? "[" + v.map(pg).join(", ") + "]"
  : v && typeof v === "object" ? "{" + Object.keys(v).sort((a, b) => Buffer.byteLength(a) - Buffer.byteLength(b) || Buffer.compare(Buffer.from(a), Buffer.from(b)))
    .map(k => str(k) + ": " + pg(v[k])).join(", ") + "}"
  : typeof v === "string" ? str(v) : String(v);
const md5 = s => crypto.createHash("md5").update(s).digest("hex");
const dir = process.argv[2];
["template.json", "fields.json"].forEach(f => console.log(f, md5(pg(JSON.parse(fs.readFileSync(path.join(dir, f)))))));
