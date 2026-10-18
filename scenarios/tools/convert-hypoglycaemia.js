// Run with: node scenarios/tools/convert-hypoglycaemia.js (writes the JSON files to /tmp/scenario-hypoglycaemia/).
const C = require("./convert.js"), f = C.f;
const SHE = C.who({ wife: "she", husband: "he", partner: "they" });
C.run({
  slug: "hypoglycaemia-ao", src: "modules/hypoglycaemia-ao/content.js",
  swaps: [
    ["Ron, 67: confused and sweaty in the machinery shed at seeding time, Cummins", "{{patient}}, {{age}}: confused and sweaty in the machinery shed at seeding time, {{town}}"],
    ["A 67 year old farmer", "A {{age}} year old farmer"],
    ["His wife finds him confused and sweaty in the machinery shed on their property just outside Cummins. Cummins hospital is 10 minutes away; paramedic backup from Port Lincoln is about 45 minutes.",
     "His {{partner}} finds him confused and sweaty in the machinery shed on their property just outside {{town}}. {{hospital_town}} hospital is {{transport}} minutes away; paramedic backup from {{backup_from}} is about {{backup_mins}} minutes."],
    ["\"Response to scene: about 10 minutes\"", "\"Response to scene: about {{response}} minutes\""],
    ["\"Cummins hospital: about 10 minutes\"", "\"{{hospital_town}} hospital: about {{transport}} minutes\""],
    ["\"Paramedic backup from Port Lincoln: about 45 minutes\"", "\"Paramedic backup from {{backup_from}}: about {{backup_mins}} minutes\""],
    ["A Tuesday in May, 1715, seeding season. You and your crew partner are paged in Cummins.", "A Tuesday in May, {{t+0}}, seeding season. You and your crew partner are paged in {{town}}."],
    ["67 year old male", "{{age}} year old male"], ["in a 67 year old. Which pathway?", "in a {{age}} year old. Which pathway?"],
    ["Caller: wife.", "Caller: {{partner}}."],
    ["Farm 5 km out of Cummins,", "Farm 5 km out of {{town}},"],
    ["1725. Lyn meets you", "{{a+0}}. Lyn meets you"],
    ["No fall that she knows of", "No fall that " + SHE + " knows of"],
    ["paramedics are 45 minutes away", "paramedics are {{backup_mins}} minutes away"],
    ["transport to Cummins hospital", "transport to {{hospital_town}} hospital"],
    ["\"Cummins hospital, as the EOC Clinician advised;", "\"{{hospital_town}} hospital, as the EOC Clinician advised;"],
    ["Ambulance Officer, Cummins crew. This is Ron [surname], 67.", "Ambulance Officer, {{station}} crew. This is {{patient}} [surname], {{age}}."],
    ["1728", "{{a+3}}"], ["1730", "{{a+5}}"], ["1740", "{{a+15}}"], ["1741", "{{a+16}}"], ["1744", "{{a+19}}"], ["1758", "{{a+33}}"],
    ["Ten minutes is enough to agree roles", "{{#response=10}}Ten{{/response}}{{^response=10}}{{response}}{{/response}} minutes is enough to agree roles"],
    ...C.crewSwaps,
    ["Ron", "{{patient}}"], ["Lyn", "{{partner_name}}"],
    [/(?<![=#])\bwife\b/g, "{{partner}}"]
  ],
  fields: [
    f.patient("Ron", "The patient stays a man (the story uses he and him)."), f.age(67, 40, 85),
    f.partner("wife", "Person with him"), f.partnerName("Lyn"),
    { key: "town", label: "Town", type: "text", default: "Cummins", max: 30, group: "Place", help: "The farm is just outside this town." },
    f.station("Cummins"),
    { key: "hospital_town", label: "Hospital town", type: "text", default: "Cummins", max: 25, group: "Place", help: "Shown as \"<town> hospital\"." },
    f.transport(10),
    { key: "backup_from", label: "Paramedic backup comes from", type: "text", default: "Port Lincoln", max: 25, group: "Place" },
    f.backup(45),
    f.dispatch("17:15", "14:00", "20:00", "Late afternoon or evening (14:00 to 20:00): he missed lunch after seeding all day."), f.response(10), ...f.crew()
  ],
  tries: [{ patient: "Bob", age: 20, partner: "husband", partner_name: "Tony", town: "Wudinna", station: "Wudinna", hospital_town: "Wudinna", transport: 5, backup_from: "Ceduna", backup_mins: 90, dispatch: "08:00", response: 3, clinician: "Sam" }]
});
