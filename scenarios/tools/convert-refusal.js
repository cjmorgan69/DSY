// Run with: node scenarios/tools/convert-refusal.js (writes the JSON files to /tmp/scenario-refusal/).
// Sam stays a man (he/him); his partner keeps the word "partner" and she/her. The story is a Saturday morning before
// his son's cricket final at 1300, so the page time is limited to 07:00 to 11:00.
const C = require("./convert.js"), f = C.f;
const HOSP = "{{hospital}}";
C.run({
  slug: "refusal-ao", src: "modules/refusal-ao/content.js",
  swaps: [
    ["A hypo who refuses, then recovers and still refuses, Tumby Bay\"", "A hypo who refuses, then recovers and still refuses, {{town}}\""],
    ["A Saturday morning in March in Tumby Bay. A 38 year old man", "A Saturday morning in March in {{town}}. A {{age}} year old man"],
    ["Tumby Bay Hospital is about 5 minutes away; paramedic backup from Port Lincoln is about 45 minutes.", HOSP + " is about {{transport}} minutes away; paramedic backup from {{backup_from}} is about {{backup_mins}} minutes."],
    ["\"Response to scene: about 7 minutes\"", "\"Response to scene: about {{response}} minutes\""],
    ["\"Tumby Bay Hospital: about 5 minutes\"", "\"" + HOSP + ": about {{transport}} minutes\""],
    ["\"Paramedic backup from Port Lincoln: about 45 minutes\"", "\"Paramedic backup from {{backup_from}}: about {{backup_mins}} minutes\""],
    ["A Saturday in March, 0948. You and your crew partner are paged in Tumby Bay.", "A Saturday in March, {{t+0}}. You and your crew partner are paged in {{station}}."],
    ["38 year old male", "{{age}} year old male"],
    ["headline: \"Sam, 38:", "headline: \"{{patient}}, {{age}}:"],
    ["\"House in the Tumby Bay township\"", "\"House in the {{town}} township\""],
    ["Seven minutes is enough to agree who talks to whom.", "{{#response=7}}Seven minutes{{/response}}{{^response=7}}{{response}} minutes{{/response}} is enough to agree who talks to whom."],
    ["Transport to Tumby Bay Hospital", "Transport to " + HOSP], ["transport to Tumby Bay Hospital", "transport to " + HOSP],
    ["\"0955. Kirsty meets you", "\"{{a+0}}. Kirsty meets you"],
    ["at 0945: 2.3", "at {{t-3}}: 2.3"], ["2.3 (own meter 0945)", "2.3 (own meter {{t-3}})"],
    ["\"0958. AO2 calls", "\"{{a+3}}. AO2 calls"], ["\"1000. Sam coughs", "\"{{a+5}}. Sam coughs"],
    ["[\"\", \"0957\", \"1012\", \"1020\"]", "[\"\", \"{{a+2}}\", \"{{a+17}}\", \"{{a+25}}\"]"],
    ["\"1015. Kirsty makes", "\"{{a+20}}. Kirsty makes"], ["with the 1012 BGL. At 1020 Sam says", "with the {{a+17}} BGL. At {{a+25}} Sam says"],
    ["What has changed since 0955?", "What has changed since {{a+0}}?"], ["\"1025. AO2 calls", "\"{{a+30}}. AO2 calls"],
    ["\"1030 to 1050. AO1 goes", "\"{{a+35}} to {{a+55}}. AO1 goes"], ["(6.6 at 1045)", "(6.6 at {{a+50}})"],
    ["\"1052. You clear", "\"{{a+57}}. You clear"],
    ["C: At 1020 + 1025:", "C: At {{a+25}} + {{a+30}}:"], ["Earlier (0955) unable", "Earlier ({{a+0}}) unable"],
    ["the invalid one at 0955 and the valid one at 1020?", "the invalid one at {{a+0}} and the valid one at {{a+25}}?"],
    ["At 1000 Sam spits", "At {{a+5}} Sam spits"], ["At 1048, with the form", "At {{a+53}}, with the form"],
    ...C.crewSwaps,
    [/\bSam\b/g, "{{patient}}"], ["Kirsty", "{{partner_name}}"]
  ],
  fields: [
    f.patient("Sam", "The patient stays a man (the story uses he and him)."), f.age(38, 18, 60),
    { key: "partner_name", label: "His partner's name", type: "text", default: "Kirsty", max: 20, group: "Patient", help: "She stays his partner (she and her)." },
    { key: "town", label: "Town", type: "text", default: "Tumby Bay", max: 30, group: "Place", help: "His house is in this township." },
    f.station("Tumby Bay", "The town you're paged in."),
    { key: "hospital", label: "Nearest hospital", type: "text", default: "Tumby Bay Hospital", max: 35, group: "Place" },
    f.transport(5),
    { key: "backup_from", label: "Paramedic backup comes from", type: "text", default: "Port Lincoln", max: 25, group: "Place" },
    f.backup(45),
    f.dispatch("09:48", "07:00", "11:00", "Saturday morning (07:00 to 11:00): his son's cricket final is at 1300."), f.response(7), ...f.crew()
  ],
  tries: [{ patient: "Tom", age: 25, partner_name: "Ash", town: "Cleve", station: "Cleve", hospital: "Cleve Hospital", transport: 8, backup_from: "Whyalla", backup_mins: 70, dispatch: "07:05", response: 12, clinician: "Jo" }]
});
