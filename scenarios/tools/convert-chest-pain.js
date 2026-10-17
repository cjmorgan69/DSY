// Run with: node scenarios/tools/convert-chest-pain.js (writes the JSON files to /tmp/scenario-chest-pain/).
// Turns /modules/chest-pain/content.js into a scenario template (placeholders) + field list, and checks the round trip.
const fs = require("fs"), vm = require("vm"), path = require("path");
const ROOT = path.join(__dirname, "../..");
const R = require(path.join(ROOT, "scenarios/render.js"));
const srcText = fs.readFileSync(path.join(ROOT, "modules/chest-pain/content.js"), "utf8");
const load = t => { const c = { window: {} }; vm.runInNewContext(t, c); return c.window.MODULE; };
const original = load(srcText);
const OUT = "/tmp/scenario-chest-pain"; fs.mkdirSync(OUT, { recursive: true });

const SETTING_FARM_NEAR = "{{#setting=farm}}a rural property{{#town}} near {{town}},{{/town}}{{/setting}}{{#setting=town}}his home{{#town}} in {{town}},{{/town}}{{/setting}}";
const WEATHER = "{{#sky=winter-dark}}Dark and cold.{{/sky}}{{#sky=winter-light}}Cold and overcast.{{/sky}}{{#sky=summer-dark}}Dark, and still warm.{{/sky}}{{#sky=summer-light}}Hot and dry.{{/sky}}";
const PARTNER_PERSON = "{{#partner=wife}}a woman{{/partner}}{{#partner=husband}}a man{{/partner}}{{#partner=partner}}someone{{/partner}}";
const BK = "{{backup_name|ICP}}";
const HOSP = "{{hospital|regional hospital}}";

// [exact text in content.js, template text]; each must match at least once
const swaps = [
  ["Graham, 62: chest pain not settling with his own GTN, rural property, 2115",
   "{{patient}}, {{age}}: chest pain not settling with his own GTN, {{#setting=farm}}rural property{{#town}} near {{town}}{{/town}}{{/setting}}{{#setting=town}}at home{{#town}} in {{town}}{{/town}}{{/setting}}, {{t+0}}"],
  ["A 62 year old man", "A {{age}} year old man"],
  ["at a rural property 35 minutes from the nearest hospital", "at " + SETTING_FARM_NEAR + " {{transport}} minutes from the nearest hospital"],
  ["blankets (winter night)", "blankets{{#sky=winter-dark}} (winter night){{/sky}}"],
  ["\"Nearest ICP: 55 minutes\"", "\"Nearest " + BK + ": {{backup_mins}} minutes\""],
  ["\"Regional hospital: 35 minutes\"", "\"{{hospital|Regional hospital}}: {{transport}} minutes\""],
  ["Clinician (AO1):", "Clinician (AO1{{#clinician}}, {{clinician}}{{/clinician}}):"],
  ["Driver (AO2):", "Driver (AO2{{#driver}}, {{driver}}{{/driver}}):"],
  ["Winter, 2115. Dark and cold. You and your crew partner are paged to a rural farming property.",
   "{{Season}}, {{t+0}}. " + WEATHER + " You and your crew partner are paged to {{#setting=farm}}a rural farming property{{#town}} near {{town}}{{/town}}{{/setting}}{{#setting=town}}a house in {{town|town}}{{/setting}}."],
  ["62 year old male", "{{age}} year old male"],
  ["Wife on scene", "{{Partner}} on scene"],
  ["Access: sealed road then 2 km dirt. Gate open, lights on",
   "{{#setting=farm}}Access: sealed road then 2 km dirt. Gate open{{#dark}}, lights on{{/dark}}{{/setting}}{{#setting=town}}Access: sealed street, house number visible from the road{{#dark}}, porch light on{{/dark}}{{/setting}}"],
  ["Backup: nearest ICP 55 minutes", "Backup: nearest " + BK + " {{backup_mins}} minutes"],
  ["Destination: regional hospital, 35 minutes", "Destination: " + HOSP + ", {{transport}} minutes"],
  ["The ICP is 55 minutes away and the hospital 35.", "The " + BK + " is {{backup_mins}} minutes away and the hospital {{transport}}."],
  ["knowing the hospital is closer than the ICP",
   "{{#closer=hospital}}knowing the hospital is closer than the " + BK + "{{/closer}}{{#closer=backup}}knowing the " + BK + " could reach you before you reach the hospital{{/closer}}{{#closer=same}}knowing the hospital and the " + BK + " are about the same distance away{{/closer}}"],
  ["The drive gives you 10 to 15 minutes of planning time.", "The drive gives you about {{response}} minutes of planning time."],
  ["2132. The gate is open. A well-lit farmhouse; a woman waves",
   "{{a+0}}. {{#setting=farm}}The gate is open. {{#dark}}A well-lit farmhouse{{/dark}}{{^dark}}A farmhouse at the end of the track{{/dark}}{{/setting}}{{#setting=town}}{{#dark}}The porch light is on at a brick house on a quiet street{{/dark}}{{^dark}}A brick house on a quiet street{{/dark}}{{/setting}}; " + PARTNER_PERSON + " waves"],
  ["Started about 40 minutes ago while I was watching the footy.",
   "Started about 40 minutes ago {{#tod=evening}}while I was watching the footy{{/tod}}{{#tod=day}}while I was sitting reading the paper{{/tod}}{{#tod=night}}and woke me up{{/tod}}."],
  ["Last meal: dinner at 1830", "Last meal: {{#tod=day}}about 2 hours before the pain started{{/tod}}{{^tod=day}}dinner at 1830{{/tod}}"],
  ["(ICP 55 minutes, hospital 35)", "(" + BK + " {{backup_mins}} minutes, hospital {{transport}})"],
  ["They agree that transport is faster than waiting for the ICP.",
   "{{#closer=hospital}}They agree that transport is faster than waiting for the " + BK + ".{{/closer}}{{#closer=backup}}They agree to start transport now and, if the EOC arranges it, meet the " + BK + " on the way.{{/closer}}{{#closer=same}}They agree to start transport now rather than wait on scene.{{/closer}}"],
  ["This is [name], AO crew from [station].", "This is {{clinician|[name]}}, AO crew from {{station|[station]}}."],
  ["We're 35 minutes from [hospital].", "We're {{transport}} minutes from {{hospital|[hospital]}}."],
  ["What are you watching for over 35 minutes?", "What are you watching for over {{transport}} minutes?"],
  ["blanket on a cold night",
   "{{#season=winter}}blanket {{#dark}}on a cold night{{/dark}}{{^dark}}against the cold{{/dark}}{{/season}}{{#season=summer}}out of the sun, cabin air-conditioning on{{/season}}"],
  ["2210, regional hospital ED.", "{{h+0}}, " + HOSP + " ED."],
  ["I'm [name], Ambulance Officer from [station].", "I'm {{clinician|[name]}}, Ambulance Officer from {{station|[station]}}."],
  ["give her a job", "give {{#partner=wife}}her{{/partner}}{{#partner=husband}}him{{/partner}}{{#partner=partner}}them{{/partner}} a job"],
  // times (after the longer phrases above)
  ["\"2208\"", "\"{{h-2}}\""],
  ["2135", "{{a+3}}"], ["2136", "{{a+4}}"], ["2138", "{{a+6}}"], ["2142", "{{a+10}}"], ["2144", "{{a+12}}"],
  // names last
  ["Graham, 62", "{{patient}}, {{age}}"], ["Graham", "{{patient}}"], [/(?<![=#])\bwife\b/g, "{{partner}}"]
];

let body = srcText.slice(srcText.indexOf("window.MODULE"));
for (const [from, to] of swaps) {
  if (from instanceof RegExp) { if (!from.test(body)) throw new Error("Not found: " + from); from.lastIndex = 0; body = body.replace(from, to); continue; }
  if (!body.includes(from)) throw new Error("Not found: " + from);
  body = body.split(from).join(to);
}
const template = load(body);

const fields = [
  { key: "patient", label: "Patient's first name", type: "text", default: "Graham", max: 20, group: "Patient", help: "The patient stays a man in his 50s to 70s: the PDE-5 inhibitor questions are written for him." },
  { key: "age", label: "Age", type: "number", default: 62, min: 50, max: 75, group: "Patient" },
  { key: "partner", label: "Person with him", type: "choice", default: "wife", group: "Patient",
    options: [{ value: "wife", label: "Wife" }, { value: "husband", label: "Husband" }, { value: "partner", label: "Partner" }] },
  { key: "setting", label: "Location", type: "choice", default: "farm", group: "Place",
    options: [{ value: "farm", label: "Rural property (dirt road, gate)" }, { value: "town", label: "House in town" }] },
  { key: "town", label: "Town or district", type: "text", default: "", max: 30, group: "Place", placeholder: "e.g. Cummins", help: "Leave blank to keep it unnamed." },
  { key: "station", label: "Your station", type: "text", default: "", max: 30, group: "Place", placeholder: "e.g. Tumby Bay", help: "Used in the EOC Clinician call and the handover." },
  { key: "hospital", label: "Receiving hospital", type: "text", default: "", max: 30, group: "Place", placeholder: "e.g. Port Lincoln Hospital" },
  { key: "transport", label: "Transport time to hospital (min)", type: "number", default: 35, min: 10, max: 120, group: "Place" },
  { key: "backup_name", label: "Nearest clinical support", type: "text", default: "ICP", max: 30, group: "Place", help: "For example ICP or paramedic crew." },
  { key: "backup_mins", label: "Clinical support time away (min)", type: "number", default: 55, min: 10, max: 180, group: "Place" },
  { key: "dispatch", label: "Time of the page", type: "time", default: "21:15", group: "Time" },
  { key: "season", label: "Season", type: "choice", default: "winter", group: "Time",
    options: [{ value: "winter", label: "Winter" }, { value: "summer", label: "Summer" }] },
  { key: "response", label: "Drive to the patient (min)", type: "number", default: 17, min: 5, max: 60, group: "Time" },
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
  { patient: "Bob", age: 99, partner: "husband", setting: "town", town: "Cummins", dispatch: "03:10", season: "summer", hospital: "Port Lincoln Hospital", transport: 70, backup_name: "paramedic crew", backup_mins: 20, station: "Cummins", clinician: "Sam", driver: "Jo", response: 8 },
  { setting: "farm", town: "Wudinna", dispatch: "1030", season: "winter", transport: 55, backup_mins: 55, partner: "partner" },
  { patient: "<script>", dispatch: "99:99", setting: "moon", age: "abc" }
];
for (const t of tries) {
  const s = JSON.stringify(R.build(row, t));
  const left = s.match(/\{\{[^}]*\}\}/g);
  if (left) throw new Error("Placeholders left: " + left.join(" "));
}
console.log("Stress inputs OK");
fs.writeFileSync(path.join(OUT, "chest-pain-template.json"), JSON.stringify(template));
fs.writeFileSync(path.join(OUT, "chest-pain-fields.json"), JSON.stringify(fields));
fs.writeFileSync(path.join(OUT, "sample.json"), JSON.stringify(R.build(row, tries[0]), null, 1));
