// Run with: node scenarios/tools/convert-amputation.js (writes the JSON files to /tmp/scenario-amputation/).
// Tom stays a man (he/him); his wife Kate stays "wife" and she/her; their son Riley is not customised. A harvest job in
// daylight, so the page time is limited to 07:00 to 19:30. The template carries both the AO and the AR version.
const C = require("./convert.js"), f = C.f;
const HOSP = "{{hospital}}";
// clock times: the injury and the page are dispatch-relative; everything on scene is arrival-relative;
// the en-route obs and the handover are hospital-relative (arrival 1545, leave 1602, hospital 1622).
const T = [["1525", "{{t-5}}"], ["1530", "{{t+0}}"], ["1538", "{{t+8}}"], ["1545", "{{a+0}}"], ["1547", "{{a+2}}"], ["1549", "{{a+4}}"],
  ["1550", "{{a+5}}"], ["1551", "{{a+6}}"], ["1553", "{{a+8}}"], ["1556", "{{a+11}}"], ["1558", "{{a+13}}"], ["1600", "{{a+15}}"],
  ["1615", "{{h-7}}"], ["1622", "{{h+0}}"]];
C.run({
  slug: "amputation-ao", src: "modules/amputation-ao/content.js", sceneMinutes: 17,
  swaps: [
    ["Kimba Hospital is 20 minutes from the farm; paramedic backup is about 75 minutes.", HOSP + " is {{transport}} minutes from the farm; paramedic backup is about {{backup_mins}} minutes."],
    ["\"Kimba Hospital: about 20 minutes\"", "\"" + HOSP + ": about {{transport}} minutes\""],
    ["\"Paramedic backup: about 75 minutes\"", "\"Paramedic backup: about {{backup_mins}} minutes\""],
    ["Clinical support is 75 minutes away and the hospital 20.", "Clinical support is {{backup_mins}} minutes away and the hospital {{transport}}."],
    [/the paramedic is 75 minutes away/g, "the paramedic is {{backup_mins}} minutes away"],
    [/75 minutes to clinical support/g, "{{backup_mins}} minutes to clinical support"],
    ["Clinical support is 75 minutes.", "Clinical support is {{backup_mins}} minutes."],
    ["Clinical support requested, 75 minutes away.", "Clinical support requested, {{backup_mins}} minutes away."],
    ["paged in Kimba to a farm about 18 km north of Kimba: about 15 minutes.", "paged in {{station}} to a farm about 18 km north of {{town}}: about {{response}} minutes."],
    ["on a farm about 18 km north of Kimba.", "on a farm about 18 km north of {{town}}."],
    ["on a farm north of Kimba, 1530", "on a farm north of {{town}}, 1530"],
    [/from Kimba\. This is Tom Ashdale/g, "from {{station}}. This is Tom Ashdale"],
    [/Tom, 46\b/g, "Tom, {{age}}"], [/Tom Ashdale, 46\./g, "Tom Ashdale, {{age}}."], ["A 46 year old farmer", "A {{age}} year old farmer"], ["46 year old male", "{{age}} year old male"],
    [/Kimba Hospital/g, HOSP],
    ...T.map(([a, b]) => [new RegExp("\\b" + a + "\\b", "g"), b]),
    ...C.crewSwaps,
    [/\bTom\b/g, "{{patient}}"], [/\bKate\b/g, "{{partner_name}}"]
  ],
  fields: [
    f.patient("Tom", "The patient stays a man (the story uses he and him)."), f.age(46, 18, 75),
    { key: "partner_name", label: "His wife's name", type: "text", default: "Kate", max: 20, group: "Patient", help: "She stays his wife (she and her), and makes the call." },
    { key: "town", label: "Near which town", type: "text", default: "Kimba", max: 30, group: "Place", help: "The farm with the field bin is about 18 km out of this town." },
    f.station("Kimba", "The town you're paged in."),
    { key: "hospital", label: "Hospital", type: "text", default: "Kimba Hospital", max: 35, group: "Place" },
    f.transport(20), f.backup(75),
    f.dispatch("15:30", "07:00", "19:30", "Harvest, in daylight (07:00 to 19:30)."), f.response(15), ...f.crew()
  ],
  tries: [{ patient: "Brett", age: 58, partner_name: "Jo", town: "Lock", station: "Lock", hospital: "Cummins Hospital", transport: 35, backup_mins: 60, dispatch: "11:10", response: 12, clinician: "Sam" }]
});
