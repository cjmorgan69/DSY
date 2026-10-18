// Shared steps for turning a /modules/<name>/content.js walk-through into a scenario template:
// apply the swaps, check the round trip with the default values, try odd inputs, and write the JSON to /tmp/scenario-<slug>/.
// Each scenario has its own small file (convert-<name>.js) that calls this with its swaps and fields.
const fs = require("fs"), vm = require("vm"), path = require("path");
const ROOT = path.join(__dirname, "../..");
const R = require(path.join(ROOT, "scenarios/render.js"));
const load = t => { const c = { window: {} }; vm.runInNewContext(t, c); return c.window.MODULE; };

// the pronoun or word for the person with the patient: who({ wife: "she", husband: "he", partner: "they" })
exports.who = (o, key) => Object.keys(o).map(k => "{{#" + (key || "partner") + "=" + k + "}}" + o[k] + "{{/" + (key || "partner") + "}}").join("");

exports.run = function ({ slug, src, swaps, fields, sceneMinutes, tries }) {
  const srcText = fs.readFileSync(path.join(ROOT, src), "utf8");
  const original = load(srcText);
  let body = srcText.slice(srcText.indexOf("window.MODULE"));
  for (const [from, to] of swaps) {
    if (from instanceof RegExp) { if (!from.test(body)) throw new Error("Not found: " + from); from.lastIndex = 0; body = body.replace(from, to); continue; }
    if (!body.includes(from)) throw new Error("Not found: " + from);
    body = body.split(from).join(to);
  }
  const template = load(body);
  if (sceneMinutes) template.sceneMinutes = sceneMinutes;
  const row = { template, fields };
  const diffs = [];
  (function walk(a, b, p) {
    if (typeof a === "string" || typeof b === "string") { if (a !== b) diffs.push(p + "\n    was: " + a + "\n    now: " + b); return; }
    if (a && typeof a === "object") Object.keys(Object.assign({}, a, b)).forEach(k => walk(a[k], b && b[k], p + "." + k));
    else if (a !== b) diffs.push(p + ": " + a + " -> " + b);
  })(original, R.build(row, {}), "M");
  console.log(slug + ": differences with default values: " + diffs.length); diffs.forEach(d => console.log(" " + d));
  const all = (tries || []).concat([{ patient: "<b>", age: "abc", dispatch: "99:99", season: "nope", partner: "nope" }]);
  all.forEach(t => {
    const left = JSON.stringify(R.build(row, t)).match(/\{\{[^}]*\}\}/g);
    if (left) throw new Error("Placeholders left: " + left.join(" "));
  });
  console.log(slug + ": stress inputs OK");
  const OUT = "/tmp/scenario-" + slug.replace(/-ao$/, ""); fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "template.json"), JSON.stringify(template));
  fs.writeFileSync(path.join(OUT, "fields.json"), JSON.stringify(fields));
  if (all[0]) fs.writeFileSync(path.join(OUT, "sample.json"), JSON.stringify(R.build(row, all[0]), null, 1));
  return { template, fields, diffs };
};

// fields most scenarios share
exports.f = {
  patient: (d, help) => ({ key: "patient", label: "Patient's first name", type: "text", default: d, max: 20, group: "Patient", help }),
  age: (d, min, max) => ({ key: "age", label: "Age", type: "number", default: d, min, max, group: "Patient" }),
  partner: (d, label, opts) => ({ key: "partner", label: label || "Person with them", type: "choice", default: d, group: "Patient",
    options: (opts || ["wife", "husband", "partner"]).map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) })) }),
  partnerName: d => ({ key: "partner_name", label: "Their name", type: "text", default: d, max: 20, group: "Patient" }),
  town: (d, eg) => ({ key: "town", label: "Town or district", type: "text", default: d, max: 30, group: "Place", placeholder: eg ? "e.g. " + eg : undefined, help: "Leave blank to keep it unnamed." }),
  station: (d, help) => ({ key: "station", label: "Your station", type: "text", default: d, max: 30, group: "Place", placeholder: d ? undefined : "e.g. Cummins", help: help || "Used in the handover." }),
  hospital: (d, eg) => ({ key: "hospital", label: "Receiving hospital", type: "text", default: d, max: 30, group: "Place", placeholder: eg ? "e.g. " + eg : undefined }),
  transport: (d, max) => ({ key: "transport", label: "Transport time to hospital (min)", type: "number", default: d, min: 5, max: max || 120, group: "Place" }),
  backup: d => ({ key: "backup_mins", label: "Paramedic backup time away (min)", type: "number", default: d, min: 10, max: 180, group: "Place" }),
  dispatch: (d, min, max, help) => ({ key: "dispatch", label: "Time of the page", type: "time", default: d, min, max, group: "Time", help }),
  response: d => ({ key: "response", label: "Drive to the patient (min)", type: "number", default: d, min: 3, max: 60, group: "Time" }),
  crew: () => [{ key: "clinician", label: "Clinician (AO1) name", type: "text", default: "", max: 20, group: "Crew", placeholder: "optional" },
    { key: "driver", label: "Driver (AO2) name", type: "text", default: "", max: 20, group: "Crew", placeholder: "optional" }]
};
// swaps most scenarios share
exports.crewSwaps = [["Clinician (AO1):", "Clinician (AO1{{#clinician}}, {{clinician}}{{/clinician}}):"], ["Driver (AO2):", "Driver (AO2{{#driver}}, {{driver}}{{/driver}}):"]];
