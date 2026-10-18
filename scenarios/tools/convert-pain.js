// Run with: node scenarios/tools/convert-pain.js (writes the JSON files to /tmp/scenario-pain/).
// Age stays 18 to 64: the ketamine wafer criteria in CPP-013-AO are for patients aged 16 to 64.
const C = require("./convert.js"), f = C.f;
C.run({
  slug: "pain-ao", src: "modules/pain-management/content.js",
  swaps: [
    ["Gary, 58: fell from a shed roof onto concrete at dusk, Cummins", "{{patient}}, {{age}}: fell from a shed roof onto concrete at dusk, {{town}}"],
    ["A 58 year old farmer", "A {{age}} year old farmer"],
    ["The nearest country hospital is about 30 minutes away; paramedic backup is about 50 minutes;", "{{hospital|The nearest country hospital}} is about {{transport}} minutes away; paramedic backup is about {{backup_mins}} minutes;"],
    ["\"Nearest country hospital: about 30 minutes\"", "\"{{hospital|Nearest country hospital}}: about {{transport}} minutes\""],
    ["\"Paramedic backup: about 50 minutes; MedSTAR", "\"Paramedic backup: about {{backup_mins}} minutes; MedSTAR"],
    ["A Wednesday in July, 1845. Sunset was 20 minutes ago. You and your crew partner are paged in Cummins.", "A Wednesday in July, {{t+0}}. Sunset was 20 minutes ago. You and your crew partner are paged in {{town}}."],
    ["58 year old male", "{{age}} year old male"],
    ["Caller: wife (Margaret).", "Caller: {{partner}} ({{partner_name}})."],
    ["Farm on Boundary Road, Cummins.", "Farm on Boundary Road, {{town}}."],
    ["1855. Margaret meets you", "{{a+0}}. Margaret meets you"],
    ["\\\"58 year old, isolated closed", "\\\"{{age}} year old, isolated closed"],
    ["\"Nearest country hospital, about 30 minutes;", "\"{{hospital|Nearest country hospital}}, about {{transport}} minutes;"],
    ["I'm [name], volunteer AO from Cummins. This is Gary, 58.", "I'm {{clinician|[name]}}, volunteer AO from {{station}}. This is {{patient}}, {{age}}."],
    ["aged 58", "aged {{age}}"],
    ["at about 1840.", "at about {{t-5}}."], ["Ate at 1730", "Ate at {{t-75}}"],
    ["1900", "{{a+5}}"], ["1905", "{{a+10}}"], ["1907", "{{a+12}}"], ["1915", "{{a+20}}"], ["1920", "{{a+25}}"], ["1925", "{{a+30}}"],
    ["1928", "{{a+33}}"], ["1943", "{{a+48}}"], ["1950", "{{a+55}}"], ["2010", "{{a+75}}"],
    ...C.crewSwaps,
    ["Gary", "{{patient}}"], ["Margaret", "{{partner_name}}"]
  ],
  fields: [
    f.patient("Gary", "The patient stays a man (the story uses he and him)."),
    { key: "age", label: "Age", type: "number", default: 58, min: 18, max: 64, group: "Patient", help: "18 to 64: the ketamine wafer criteria are for ages 16 to 64." },
    f.partner("wife", "Person with him"), f.partnerName("Margaret"),
    { key: "town", label: "Town", type: "text", default: "Cummins", max: 30, group: "Place", help: "The farm is on Boundary Road near this town." },
    f.station("Cummins"), f.hospital("", "Cummins Hospital"), f.transport(30), f.backup(50),
    f.dispatch("18:45", "17:00", "20:00", "Winter dusk (17:00 to 20:00): it's cold and getting dark."), f.response(10), ...f.crew()
  ],
  tries: [{ patient: "Bob", age: 80, partner: "husband", partner_name: "Tony", town: "Lock", station: "Lock", hospital: "Lock Hospital", transport: 15, backup_mins: 90, dispatch: "06:00", response: 20, clinician: "Sam" }]
});
