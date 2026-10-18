// Run with: node scenarios/tools/convert-envenomation.js (writes the JSON files to /tmp/scenario-envenomation/).
// Turns /modules/envenomation/content.js into a scenario template (placeholders) + field list, and checks the round trip.
const fs = require("fs"), vm = require("vm"), path = require("path");
const ROOT = path.join(__dirname, "../..");
const R = require(path.join(ROOT, "scenarios/render.js"));
const srcText = fs.readFileSync(path.join(ROOT, "modules/envenomation/content.js"), "utf8");
const load = t => { const c = { window: {} }; vm.runInNewContext(t, c); return c.window.MODULE; };
const original = load(srcText);
const OUT = "/tmp/scenario-envenomation"; fs.mkdirSync(OUT, { recursive: true });

const HT = "{{hospital_town}}";
const PRONOUN = "{{#partner=wife}}her{{/partner}}{{#partner=husband}}him{{/partner}}{{#partner=partner}}them{{/partner}}";

// [exact text in content.js, template text]; each must match at least once
const swaps = [
  ["Greg, 52: brown snake bite", "{{patient}}, {{age}}: brown snake bite"],
  ["at a rural property, 1432", "at a rural property, {{t+0}}"],
  ["A 52 year old man", "A {{age}} year old man"],
  ["at a rural property near Wangary. He walked back to the house and his wife washed the bite. Port Lincoln Hospital is 30 minutes away.",
   "at a rural property{{#town}} near {{town}}{{/town}}. He walked back to the house and his wife washed the bite. " + HT + " Hospital is {{transport}} minutes away."],
  ["\"Paramedic backup: about 50 minutes\"", "\"Paramedic backup: about {{backup_mins}} minutes\""],
  ["\"Port Lincoln Hospital: about 30 minutes\"", "\"" + HT + " Hospital: about {{transport}} minutes\""],
  ["Clinician (AO1):", "Clinician (AO1{{#clinician}}, {{clinician}}{{/clinician}}):"],
  ["Driver (AO2):", "Driver (AO2{{#driver}}, {{driver}}{{/driver}}):"],
  ["Saturday in January, 1432. Hot and dry, 36 degrees. You and your crew partner are paged from Port Lincoln to a rural property at Wangary: about 25 minutes.",
   "{{#season=summer}}Saturday in January{{/season}}{{#season=spring}}Saturday in October{{/season}}{{#season=autumn}}Saturday in March{{/season}}, {{t+0}}. " +
   "{{#season=summer}}Hot and dry, 36 degrees.{{/season}}{{#season=spring}}Warm and sunny, 25 degrees.{{/season}}{{#season=autumn}}Warm and still, 28 degrees.{{/season}}" +
   " You and your crew partner are paged from {{station}} to a rural property{{#town}} at {{town}}{{/town}}: about {{response}} minutes."],
  ["Priority 2, snake bite, 52 year old male", "Priority 2, snake bite, {{age}} year old male"],
  ["Clinical support is 50 minutes away and the hospital 30.", "Clinical support is {{backup_mins}} minutes away and the hospital {{transport}}."],
  ["The 25-minute drive is your planning time.", "The {{response}}-minute drive is your planning time."],
  ["1457. A weatherboard homestead", "{{a+0}}. A weatherboard homestead"],
  ["To Denise: reassure her.", "To {{partner_name}}: reassure " + PRONOUN + "."],
  ["What could go wrong in the next 30 minutes?", "What could go wrong in the next {{transport}} minutes?"],
  ["Request clinical support now (the paramedic is 50 minutes away).", "Request clinical support now (the paramedic is {{backup_mins}} minutes away)."],
  ["\\\"52 year old male, suspected brown snake bite to the right lower leg at about 1415.", "\\\"{{age}} year old male, suspected brown snake bite to the right lower leg at about {{t-17}}."],
  ["Port Lincoln is 30 minutes away.\\\"", HT + " is {{transport}} minutes away.\\\""],
  ["Transport to Port Lincoln and notify the receiving facility", "Transport to " + HT + " and notify the receiving facility"],
  ["the EOC Clinician is updated at 1524: transport to Port Lincoln now", "the EOC Clinician is updated at {{a+27}}: transport to " + HT + " now"],
  ["\"Port Lincoln by road (30 minutes) is faster than the paramedic (50) or MedSTAR (90): load and go, notify the hospital\"",
   "\"{{#closer=hospital}}" + HT + " by road ({{transport}} minutes) is faster than the paramedic ({{backup_mins}}) or MedSTAR (90): load and go, notify the hospital{{/closer}}" +
   "{{#closer=backup}}The paramedic ({{backup_mins}} minutes) could reach you before you reach " + HT + " by road ({{transport}}): still load and go (the protocol says provide transport), notify the hospital, and ask the EOC to arrange for the paramedic to meet you on the way{{/closer}}" +
   "{{#closer=same}}" + HT + " by road ({{transport}} minutes) and the paramedic ({{backup_mins}}) are about the same: load and go, notify the hospital, and meet the paramedic on the way if timing allows{{/closer}}\""],
  ["The hospital is 30 minutes away, the paramedic 50.", "The hospital is {{transport}} minutes away, the paramedic {{backup_mins}}."],
  ["What are you ready for over the next 30 minutes?", "What are you ready for over the next {{transport}} minutes?"],
  ["Thirty minutes is a long time with a deteriorating patient", "{{transport}} minutes is a long time with a deteriorating patient"],
  ["Halfway to Port Lincoln", "Halfway to " + HT],
  ["1605, Port Lincoln Hospital ED.", "{{h+0}}, " + HT + " Hospital ED."],
  ["I'm [name], Ambulance Officer from [station]. This is Greg Thompson, 52.", "I'm {{clinician|[name]}}, Ambulance Officer from {{station}}. This is {{patient}} Thompson, {{age}}."],
  ["Bitten clearing scrub at Wangary;", "Bitten clearing scrub{{#town}} at {{town}}{{/town}};"],
  // times, after the longer phrases above
  ["\"1500\", \"1522 (10 min after bandage)\"", "\"{{a+3}}\", \"{{a+25}} (10 min after bandage)\""],
  ["\"1500\", \"1522\", \"1600\"", "\"{{a+3}}\", \"{{a+25}}\", \"{{h-5}}\""],
  ["Initial observations (1500)", "Initial observations ({{a+3}})"],
  ["1415", "{{t-17}}"],
  // names last
  ["Greg", "{{patient}}"],
  [/(?<![=#])\bwife\b/g, "{{partner}}"],
  ["Denise", "{{partner_name}}"]
];

let body = srcText.slice(srcText.indexOf("window.MODULE"));
for (const [from, to] of swaps) {
  if (from instanceof RegExp) { if (!from.test(body)) throw new Error("Not found: " + from); from.lastIndex = 0; body = body.replace(from, to); continue; }
  if (!body.includes(from)) throw new Error("Not found: " + from);
  body = body.split(from).join(to);
}
const template = load(body);
template.sceneMinutes = 38; // arrival 1457 to leaving at 1535 in the original timeline (handover 1605 after 30 minutes)

const fields = [
  { key: "patient", label: "Patient's first name", type: "text", default: "Greg", max: 20, group: "Patient", help: "The patient stays a man (the story uses he and him)." },
  { key: "age", label: "Age", type: "number", default: 52, min: 25, max: 75, group: "Patient" },
  { key: "partner", label: "Person with him", type: "choice", default: "wife", group: "Patient",
    options: [{ value: "wife", label: "Wife" }, { value: "husband", label: "Husband" }, { value: "partner", label: "Partner" }] },
  { key: "partner_name", label: "Their name", type: "text", default: "Denise", max: 20, group: "Patient" },
  { key: "town", label: "Town or district", type: "text", default: "Wangary", max: 30, group: "Place", help: "Blank keeps it unnamed." },
  { key: "station", label: "Your station", type: "text", default: "Port Lincoln", max: 30, group: "Place", help: "Where the crew is paged from; also in the handover." },
  { key: "hospital_town", label: "Hospital town", type: "text", default: "Port Lincoln", max: 25, group: "Place", help: "Shown as \"<town> Hospital\"." },
  { key: "transport", label: "Transport time to hospital (min)", type: "number", default: 30, min: 10, max: 85, group: "Place" },
  { key: "backup_mins", label: "Paramedic backup time away (min)", type: "number", default: 50, min: 10, max: 180, group: "Place" },
  { key: "dispatch", label: "Time of the page", type: "time", default: "14:32", min: "07:00", max: "18:30", group: "Time", help: "Daylight hours only (07:00 to 18:30): the story has him clearing scrub." },
  { key: "season", label: "Season", type: "choice", default: "summer", group: "Time",
    options: [{ value: "summer", label: "Summer (January)" }, { value: "spring", label: "Spring (October)" }, { value: "autumn", label: "Autumn (March)" }] },
  { key: "response", label: "Drive to the patient (min)", type: "number", default: 25, min: 5, max: 60, group: "Time" },
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
  { patient: "Bob", age: 99, partner: "husband", partner_name: "Tony", town: "Cummins", station: "Cummins", hospital_town: "Cummins", transport: 15, backup_mins: 10, dispatch: "23:10", season: "autumn", clinician: "Sam", driver: "Jo", response: 8 },
  { town: "", dispatch: "0900", season: "spring", transport: 50, backup_mins: 50, partner: "partner", partner_name: "" },
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
