// Run with: node scenarios/tools/convert-headache.js (writes the JSON files to /tmp/scenario-headache/).
const C = require("./convert.js"), f = C.f;
const PL = "{{#hospital_town=Port Lincoln}}on the Lincoln Highway{{/hospital_town}}{{^hospital_town=Port Lincoln}}on the way{{/hospital_town}}";
C.run({
  slug: "headache-ao", src: "modules/headache -ao/content.js",
  swaps: [
    ["consult the EOC Clinician about Code Stroke to Port Lincoln Hospital;", "@@CODESTROKE@@"], // the stroke variation keeps the STS hospital
    ["Ian, 62: \\\"like being hit with a cricket bat\\\" at the Coffin Bay caravan park", "{{patient}}, {{age}}: \\\"like being hit with a cricket bat\\\" at the {{town}} caravan park"],
    ["A 62 year old tourist at the Coffin Bay caravan park", "A {{age}} year old tourist at the {{town}} caravan park"],
    ["Port Lincoln Hospital is about 35 to 40 minutes away; paramedics from Port Lincoln about 45 minutes;", "{{hospital_town}} Hospital is about {{transport}} to {{transport_hi}} minutes away; paramedics from {{backup_from}} about {{backup_mins}} minutes;"],
    ["\"Port Lincoln Hospital: about 35 to 40 minutes\"", "\"{{hospital_town}} Hospital: about {{transport}} to {{transport_hi}} minutes\""],
    ["\"Paramedics from Port Lincoln: about 45 minutes;", "\"Paramedics from {{backup_from}}: about {{backup_mins}} minutes;"],
    ["1423 on a sunny autumn afternoon. You're paged from Coffin Bay station.", "{{t+0}} on a sunny autumn afternoon. You're paged from {{station}} station."],
    ["62 year old male", "{{age}} year old male"],
    ["Wife on scene:", "{{Partner}} on scene:"],
    ["Aged 62: if this", "Aged {{age}}: if this"], ["and he's 62. What does", "and he's {{age}}. What does"],
    ["Coffin Bay Caravan Park, site 47", "{{town}} Caravan Park, site 47"],
    ["1431. Sandra meets you", "{{a+0}}. Sandra meets you"],
    ["Driver requests the Port Lincoln paramedics;", "Driver requests the {{backup_from}} paramedics;"],
    ["clinical support requested (paramedics from Port Lincoln, about 45 minutes).", "clinical support requested (paramedics from {{backup_from}}, about {{backup_mins}} minutes)."],
    ["Leaving for Port Lincoln now.", "Leaving for {{hospital_town}} now."],
    ["meet you on the Lincoln Highway and I'll let Port Lincoln Hospital know.", "meet you " + PL + " and I'll let {{hospital_town}} Hospital know."],
    ["I'm [name], volunteer AO from Coffin Bay. This is Ian, 62. His wife Sandra is following.", "I'm {{clinician|[name]}}, volunteer AO from {{station}}. This is {{patient}}, {{age}}. His {{partner}} {{partner_name}} is following."],
    ["at about 1340 while", "at about {{t-43}} while"],
    ["1435", "{{a+4}}"], ["1438", "{{a+7}}"], ["1440", "{{a+9}}"], ["1442", "{{a+11}}"], ["1445", "{{a+14}}"],
    ["Thirty-five minutes in the back", "{{#transport=35}}Thirty-five{{/transport}}{{^transport=35}}{{transport}}{{/transport}} minutes in the back"],
    ...C.crewSwaps,
    ["@@CODESTROKE@@", "consult the EOC Clinician about Code Stroke to Port Lincoln Hospital;"],
    ["Ian", "{{patient}}"], ["Sandra", "{{partner_name}}"]
  ],
  fields: [
    f.patient("Ian", "The patient stays a man (the story uses he and him)."), { key: "age", label: "Age", type: "number", default: 62, min: 51, max: 85, group: "Patient", help: "Over 50: a first severe headache over 50 is one of his red flags." },
    f.partner("wife", "Person with him"), f.partnerName("Sandra"),
    { key: "town", label: "Caravan park town", type: "text", default: "Coffin Bay", max: 30, group: "Place" },
    f.station("Coffin Bay", "Where the crew is paged from; also in the handover."),
    { key: "hospital_town", label: "Hospital town", type: "text", default: "Port Lincoln", max: 25, group: "Place", help: "Shown as \"<town> Hospital\"." },
    { key: "transport", label: "Transport time to hospital (min)", type: "number", default: 35, min: 5, max: 120, group: "Place", help: "Shown as a range: this time to 5 minutes more." },
    { key: "backup_from", label: "Paramedics come from", type: "text", default: "Port Lincoln", max: 25, group: "Place" },
    f.backup(45),
    f.dispatch("14:23", "11:00", "17:30", "Afternoon (11:00 to 17:30): a sunny afternoon with the sun getting low."), f.response(8), ...f.crew()
  ],
  tries: [{ patient: "Bob", age: 99, partner: "husband", partner_name: "Tony", town: "Streaky Bay", station: "Streaky Bay", hospital_town: "Streaky Bay", transport: 10, backup_from: "Ceduna", backup_mins: 70, dispatch: "21:00", response: 4, clinician: "Sam" }]
});
