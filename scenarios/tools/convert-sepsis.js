// Run with: node scenarios/tools/convert-sepsis.js (writes the JSON files to /tmp/scenario-sepsis/).
const C = require("./convert.js"), f = C.f;
const HER = C.who({ wife: "her", husband: "his", partner: "their" });
C.run({
  slug: "sepsis-ao", src: "modules/sepsis/content.js",
  swaps: [
    ["Robert, 71: two days of urinary symptoms, now hot, confused and hard to rouse, near Tumby Bay", "{{patient}}, {{age}}: two days of urinary symptoms, now hot, confused and hard to rouse, near {{town}}"],
    ["A 71 year old man at a farmhouse 12 km north-east of Tumby Bay", "A {{age}} year old man at a farmhouse 12 km north-east of {{town}}"],
    ["Tonight his wife can barely rouse him. Tumby Bay Hospital is about 15 minutes away.", "Tonight his {{partner}} can barely rouse him. {{hospital_town}} Hospital is about {{transport}} minutes away."],
    ["\"Tumby Bay Hospital: about 15 minutes (4 km of dirt road first)\"", "\"{{hospital_town}} Hospital: about {{transport}} minutes (4 km of dirt road first)\""],
    ["\"Paramedic backup from Port Lincoln: about 45 minutes\"", "\"Paramedic backup from {{backup_from}}: about {{backup_mins}} minutes\""],
    ["Thursday, 2115, late autumn. You are paged from Tumby Bay.", "Thursday, {{t+0}}, late autumn. You are paged from {{station}}."],
    ["Priority 1, 71 year old male", "Priority 1, {{age}} year old male"],
    ["Wife: \\\"burning hot", "{{Partner}}: \\\"burning hot"],
    ["12 km north-east of Tumby Bay: 8 km sealed", "12 km north-east of {{town}}: 8 km sealed"],
    ["2125. A stone farmhouse", "{{a+0}}. A stone farmhouse"],
    ["Priority transport to Tumby Bay, notify them", "Priority transport to {{hospital_town}}, notify them"],
    ["Paramedic backup is 45 minutes away, so don't wait", "Paramedic backup is {{backup_mins}} minutes away, so don't wait"],
    ["Jean follows in her own car", "Jean follows in " + HER + " own car"],
    ["Tumby Bay Hospital", "{{hospital_town}} Hospital"],
    ["Ambulance Officer from Tumby Bay. This is Robert Patterson, 71.", "Ambulance Officer from {{station}}. This is {{patient}} Patterson, {{age}}."],
    ["2130", "{{a+5}}"], ["2135", "{{a+10}}"], ["2140", "{{a+15}}"], ["2155", "{{a+30}}"],
    ...C.crewSwaps,
    ["Robert", "{{patient}}"], ["Jean", "{{partner_name}}"]
  ],
  fields: [
    f.patient("Robert", "The patient stays a man of about 85 kg: the ceftriaxone dose uses his weight."), f.age(71, 50, 90),
    f.partner("wife", "Person with him"), f.partnerName("Jean"),
    { key: "town", label: "Nearest town", type: "text", default: "Tumby Bay", max: 30, group: "Place", help: "The farm is 12 km north-east of this town." },
    f.station("Tumby Bay", "Where the crew is paged from; also in the handover."),
    { key: "hospital_town", label: "Hospital town", type: "text", default: "Tumby Bay", max: 25, group: "Place", help: "Shown as \"<town> Hospital\"." },
    f.transport(15),
    { key: "backup_from", label: "Paramedic backup comes from", type: "text", default: "Port Lincoln", max: 25, group: "Place" },
    f.backup(45),
    f.dispatch("21:15", "18:00", "06:00", "Evening or night only (18:00 to 06:00): the story is set at night."), f.response(10), ...f.crew()
  ],
  tries: [{ patient: "Bob", age: 20, partner: "husband", partner_name: "Tony", town: "Cleve", station: "Cleve", hospital_town: "Cleve", transport: 50, backup_from: "Whyalla", backup_mins: 70, dispatch: "12:00", response: 25, clinician: "Sam" }]
});
