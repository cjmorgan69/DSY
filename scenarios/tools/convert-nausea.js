// Run with: node scenarios/tools/convert-nausea.js (writes the JSON files to /tmp/scenario-nausea/).
const C = require("./convert.js"), f = C.f;
const HOSP = "{{hospital}}";
C.run({
  slug: "nausea-ao", src: "modules/nausea-vomiting/content.js",
  swaps: [
    ["Helen, 62: eight hours of vomiting and nearly fainted, near Cummins", "{{patient}}, {{age}}: eight hours of vomiting and nearly fainted, near {{town}}"],
    ["A 62 year old woman on a farm 5 km west of Cummins", "A {{age}} year old woman on a farm 5 km west of {{town}}"],
    ["Her husband calls", "Her {{partner}} calls"],
    ["Cummins District Hospital is about 7 minutes away;", HOSP + " is about {{transport}} minutes away;"],
    ["\"Cummins District Hospital: about 7 minutes\"", "\"" + HOSP + ": about {{transport}} minutes\""],
    ["A Wednesday evening in July, 2035. You're paged in Cummins.", "A Wednesday evening in July, {{t+0}}. You're paged in {{town}}."],
    ["62 year old female", "{{age}} year old female"],
    ["Caller: husband (David)", "Caller: {{partner}} ({{partner_name}})"],
    ["Farm 5 km west of Cummins:", "Farm 5 km west of {{town}}:"],
    ["2043. David, 65, meets you", "{{a+0}}. David, 65, meets you"],
    ["Transport to Cummins District Hospital and notify them.", "Transport to " + HOSP + " and notify them."],
    ["Seven minutes goes fast.", "{{#transport=7}}Seven minutes goes fast{{/transport}}{{^transport=7}}{{transport}} minutes goes fast{{/transport}}."],
    ["I'm [name], volunteer AO from Cummins. This is Helen Henley, 62.", "I'm {{clinician|[name]}}, volunteer AO from {{station}}. This is {{patient}} Henley, {{age}}."],
    ["2045", "{{a+2}}"], ["2047", "{{a+4}}"], ["2100", "{{a+17}}"], ["2105", "{{a+22}}"], ["2115", "{{a+32}}"],
    ...C.crewSwaps,
    ["Helen", "{{patient}}"], ["David", "{{partner_name}}"]
  ],
  fields: [
    f.patient("Helen", "The patient stays a woman (the story uses she and her)."), f.age(62, 18, 90),
    f.partner("husband", "Person with her", ["husband", "wife", "partner"]), f.partnerName("David"),
    { key: "town", label: "Town", type: "text", default: "Cummins", max: 30, group: "Place", help: "The farm is 5 km west of this town." },
    f.station("Cummins"),
    { key: "hospital", label: "Receiving hospital", type: "text", default: "Cummins District Hospital", max: 35, group: "Place" },
    f.transport(7),
    f.dispatch("20:35", "19:00", "22:30", "Evening (19:00 to 22:30): she has been vomiting since lunchtime."), f.response(8), ...f.crew()
  ],
  tries: [{ patient: "Sue", age: 10, partner: "wife", partner_name: "Ann", town: "Kimba", station: "Kimba", hospital: "Kimba Hospital", transport: 25, dispatch: "06:00", response: 12, clinician: "Sam" }]
});
