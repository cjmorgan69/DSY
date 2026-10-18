// Run with: node scenarios/tools/convert-anaphylaxis.js (writes the JSON files to /tmp/scenario-anaphylaxis/).
// Turns /modules/anaphylaxis/content.js into a scenario template (placeholders) + field list, and checks the round trip.
const fs = require("fs"), vm = require("vm"), path = require("path");
const ROOT = path.join(__dirname, "../..");
const R = require(path.join(ROOT, "scenarios/render.js"));
const srcText = fs.readFileSync(path.join(ROOT, "modules/anaphylaxis/content.js"), "utf8");
const load = t => { const c = { window: {} }; vm.runInNewContext(t, c); return c.window.MODULE; };
const original = load(srcText);
const OUT = "/tmp/scenario-anaphylaxis"; fs.mkdirSync(OUT, { recursive: true });

const PRON = "{{#partner=wife}}She holds{{/partner}}{{#partner=husband}}He holds{{/partner}}{{#partner=partner}}They hold{{/partner}}";
const HOSP = "{{hospital|the nearest hospital}}";

// [exact text in content.js, template text]; each must match at least once
const swaps = [
  ["David, 54: bee sting, known allergy and an expired EpiPen, 1430", "{{patient}}, {{age}}: bee sting, known allergy and an expired EpiPen, {{t+0}}"],
  ["A 54 year old man", "A {{age}} year old man"],
  ["stung in his garden at a rural property.", "stung in his garden at a rural property{{#town}} near {{town}}{{/town}}."],
  ["\"Response time to scene: 12 minutes\"", "\"Response time to scene: {{response}} minutes\""],
  ["\"Paramedic backup: about 40 minutes\"", "\"Paramedic backup: about {{backup_mins}} minutes\""],
  ["\"Nearest hospital: about 25 minutes\"", "\"{{hospital|Nearest hospital}}: about {{transport}} minutes\""],
  ["Clinician (AO1):", "Clinician (AO1{{#clinician}}, {{clinician}}{{/clinician}}):"],
  ["Driver (AO2):", "Driver (AO2{{#driver}}, {{driver}}{{/driver}}):"],
  ["Saturday, 1430, late spring. Your pagers go off. The property is 12 minutes from the station.",
   "Saturday, {{t+0}}, {{#season=spring}}late spring{{/season}}{{#season=summer}}midsummer{{/season}}{{#season=autumn}}early autumn{{/season}}. Your pagers go off. The property is {{response}} minutes from {{station|the station}}."],
  ["54 year old male, stung by", "{{age}} year old male, stung by"],
  ["Use the 12-minute drive.", "Use the {{response}}-minute drive."],
  ["1442. His wife meets you", "{{a+0}}. His wife meets you"],
  ["She holds it out.", PRON + " it out."],
  ["Corpuls3 observations (1445)", "Corpuls3 observations ({{a+3}})"],
  ["\"1445\", \"1449 (5 min after EpiPen)\"", "\"{{a+3}}\", \"{{a+7}} (5 min after EpiPen)\""],
  ["Observations after the second dose (1455)", "Observations after the second dose ({{a+13}})"],
  ["prompt transport to the nearest hospital", "prompt transport to " + HOSP],
  ["I'm [name], Ambulance Officer from [station]. This is David Collins, 54.", "I'm {{clinician|[name]}}, Ambulance Officer from {{station|[station]}}. This is {{patient}} Collins, {{age}}."],
  ["1427", "{{a-15}}"], ["1444", "{{a+2}}"], ["1450", "{{a+8}}"],
  // names last
  ["David", "{{patient}}"],
  [/(?<![=#])\bwife\b/g, "{{partner}}"]
];

let body = srcText.slice(srcText.indexOf("window.MODULE"));
for (const [from, to] of swaps) {
  if (from instanceof RegExp) { if (!from.test(body)) throw new Error("Not found: " + from); from.lastIndex = 0; body = body.replace(from, to); continue; }
  if (!body.includes(from)) throw new Error("Not found: " + from);
  body = body.split(from).join(to);
}
const template = load(body);

const fields = [
  { key: "patient", label: "Patient's first name", type: "text", default: "David", max: 20, group: "Patient", help: "The patient stays a man of about 85 kg: the dose question uses his weight." },
  { key: "age", label: "Age", type: "number", default: 54, min: 25, max: 75, group: "Patient" },
  { key: "partner", label: "Person with him", type: "choice", default: "wife", group: "Patient",
    options: [{ value: "wife", label: "Wife" }, { value: "husband", label: "Husband" }, { value: "partner", label: "Partner" }] },
  { key: "town", label: "Town or district", type: "text", default: "", max: 30, group: "Place", placeholder: "e.g. Cowell", help: "Leave blank to keep it unnamed." },
  { key: "station", label: "Your station", type: "text", default: "", max: 30, group: "Place", placeholder: "e.g. Cowell", help: "Where the crew is paged from; also in the handover." },
  { key: "hospital", label: "Receiving hospital", type: "text", default: "", max: 30, group: "Place", placeholder: "e.g. Cowell Hospital" },
  { key: "transport", label: "Transport time to hospital (min)", type: "number", default: 25, min: 10, max: 120, group: "Place" },
  { key: "backup_mins", label: "Paramedic backup time away (min)", type: "number", default: 40, min: 10, max: 180, group: "Place" },
  { key: "dispatch", label: "Time of the page", type: "time", default: "14:30", min: "07:00", max: "19:00", group: "Time", help: "Daylight hours only (07:00 to 19:00): he is stung in the garden." },
  { key: "season", label: "Season", type: "choice", default: "spring", group: "Time",
    options: [{ value: "spring", label: "Late spring" }, { value: "summer", label: "Midsummer" }, { value: "autumn", label: "Early autumn" }] },
  { key: "response", label: "Drive to the patient (min)", type: "number", default: 12, min: 5, max: 60, group: "Time" },
  { key: "clinician", label: "Clinician (AO1) name", type: "text", default: "", max: 20, group: "Crew", placeholder: "optional" },
  { key: "driver", label: "Driver (AO2) name", type: "text", default: "", max: 20, group: "Crew", placeholder: "optional" }
];

// round trip: defaults must give back the original, apart from the listed changes
const row = { template, fields };
const rebuilt = R.build(row, {});
const diffs = [];
(function walk(a, b, p) {
  if (typeof a === "string" || typeof b === "string") { if (a !== b) diffs.push(p + "\n    was: " + a + "\n    now: " + b); return; }
  if (a && typeof a === "object") Object.keys(Object.assign({}, a, b)).forEach(k => walk(a[k], b && b[k], p + "." + k));
  else if (a !== b) diffs.push(p + ": " + a + " -> " + b);
})(original, rebuilt, "M");
console.log("Differences with default values:", diffs.length); diffs.forEach(d => console.log(" " + d));

// stress: odd inputs must leave no placeholders behind
const tries = [
  { patient: "Bob", age: 99, partner: "husband", town: "Cowell", station: "Cowell", hospital: "Cowell Hospital", transport: 15, backup_mins: 10, dispatch: "23:10", season: "autumn", clinician: "Sam", driver: "Jo", response: 8 },
  { town: "", dispatch: "0700", season: "summer", transport: 50, backup_mins: 50, partner: "partner" },
  { patient: "<script>", dispatch: "99:99", season: "winter", age: "abc" }
];
for (const t of tries) {
  const s = JSON.stringify(R.build(row, t));
  const left = s.match(/\{\{[^}]*\}\}/g);
  if (left) throw new Error("Placeholders left: " + left.join(" "));
}
console.log("Stress inputs OK");
fs.writeFileSync(path.join(OUT, "template.json"), JSON.stringify(template));
fs.writeFileSync(path.join(OUT, "fields.json"), JSON.stringify(fields));
fs.writeFileSync(path.join(OUT, "sample.json"), JSON.stringify(R.build(row, tries[0]), null, 1));
