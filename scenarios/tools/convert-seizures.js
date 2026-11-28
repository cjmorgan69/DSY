// Run with: node scenarios/tools/convert-seizures.js (writes the JSON files to /tmp/scenario-seizures/).
// Josh stays a man (he/him); his friend Ellie stays "friend" and she/her. A party at night, so the page time is
// limited to 18:00 to 23:59. The template carries both the AO and the AR version (the swaps apply to both).
const C = require("./convert.js"), f = C.f;
const HOSP = "{{hospital}}";
// clock times: the first seizure and the page are dispatch-relative; everything on scene is arrival-relative;
// the en-route obs and the handover are hospital-relative (arrival 2153, leave 2210, hospital 2230).
const T = [["2137", "{{t-3}}"], ["2140", "{{t+0}}"], ["2150", "{{a-3}}"], ["2153", "{{a+0}}"], ["2154", "{{a+1}}"], ["2155", "{{a+2}}"],
  ["2156", "{{a+3}}"], ["2158", "{{a+5}}"], ["2202", "{{a+9}}"], ["2204", "{{a+11}}"], ["2205", "{{a+12}}"], ["2206", "{{a+13}}"],
  ["2207", "{{a+14}}"], ["2208", "{{a+15}}"], ["2220", "{{h-10}}"], ["2230", "{{h+0}}"]];
C.run({
  slug: "seizures-ao", src: "modules/seizures-ao/content.js", sceneMinutes: 17,
  swaps: [
    ["Cleve Hospital is 20 minutes away; paramedic backup is 55 minutes.", HOSP + " is {{transport}} minutes away; paramedic backup is {{backup_mins}} minutes."],
    ["\"Cleve Hospital: about 20 minutes\"", "\"" + HOSP + ": about {{transport}} minutes\""],
    ["\"Paramedic backup: about 55 minutes\"", "\"Paramedic backup: about {{backup_mins}} minutes\""],
    ["Clinical support is 55 minutes away and the hospital 20.", "Clinical support is {{backup_mins}} minutes away and the hospital {{transport}}."],
    ["the paramedic is 55 minutes away", "the paramedic is {{backup_mins}} minutes away"],
    ["the hospital is 20 minutes away and the paramedic 55", "the hospital is {{transport}} minutes away and the paramedic {{backup_mins}}"],
    ["paged in Cleve to a farm about 15 km out of Cleve: about 13 minutes.", "paged in {{station}} to a farm about 15 km out of {{town}}: about {{response}} minutes."],
    ["in a shearing shed about 15 km from Cleve.", "in a shearing shed about 15 km from {{town}}."],
    ["in a shearing shed near Cleve, 2140", "in a shearing shed near {{town}}, 2140"],
    ["from Cleve. This is Josh Merrick", "from {{station}}. This is Josh Merrick"],
    [/Josh, 27\b/g, "Josh, {{age}}"], ["Josh Merrick, 27.", "Josh Merrick, {{age}}."], ["A 27 year old man", "A {{age}} year old man"], ["27 year old male", "{{age}} year old male"],
    [/Cleve Hospital/g, HOSP],
    ...T.map(([a, b]) => [new RegExp("\\b" + a + "\\b", "g"), b]),
    ...C.crewSwaps,
    [/\bJosh\b/g, "{{patient}}"], [/\bEllie\b/g, "{{partner_name}}"]
  ],
  fields: [
    f.patient("Josh", "The patient stays a man (the story uses he and him)."), f.age(27, 18, 45),
    { key: "partner_name", label: "His friend's name", type: "text", default: "Ellie", max: 20, group: "Patient", help: "She stays his friend (she and her), and makes the call." },
    { key: "town", label: "Near which town", type: "text", default: "Cleve", max: 30, group: "Place", help: "The farm with the shearing shed is about 15 km out of this town." },
    f.station("Cleve", "The town you're paged in."),
    { key: "hospital", label: "Closest ED", type: "text", default: "Cleve Hospital", max: 35, group: "Place" },
    f.transport(20), f.backup(55),
    f.dispatch("21:40", "18:00", "23:30", "A party at night (18:00 to 23:30)."), f.response(13), ...f.crew()
  ],
  tries: [{ patient: "Liam", age: 19, partner_name: "Sam", town: "Wudinna", station: "Wudinna", hospital: "Wudinna Hospital", transport: 10, backup_mins: 90, dispatch: "23:20", response: 20, clinician: "Jo" }]
});
