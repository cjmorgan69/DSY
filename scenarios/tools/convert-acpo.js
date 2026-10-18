// Run with: node scenarios/tools/convert-acpo.js (writes the JSON files to /tmp/scenario-acpo/).
const C = require("./convert.js"), f = C.f;
const HER = C.who({ wife: "her", husband: "his", partner: "their" });
C.run({
  slug: "acpo-ao", src: "modules/APO/content.js",
  swaps: [
    ["Kevin, 72: woke at 2am gasping and can't lie down", "{{patient}}, {{age}}: woke at {{t-32}} gasping and can't lie down"],
    ["A 72 year old man with heart failure, atrial fibrillation and a past heart attack wakes at 0215 gasping for breath. His wife calls at 0247. You're a two-person volunteer crew in a small Eyre Peninsula township, about 30 minutes from the nearest hospital.",
     "A {{age}} year old man with heart failure, atrial fibrillation and a past heart attack wakes at {{t-32}} gasping for breath. His wife calls at {{t+0}}. You're a two-person volunteer crew in {{#town}}{{town}}, {{/town}}a small Eyre Peninsula township, about {{transport}} minutes from {{hospital|the nearest hospital}}."],
    ["\"Nearest hospital: about 30 minutes\"", "\"{{hospital|Nearest hospital}}: about {{transport}} minutes\""],
    ["A Thursday in July, 0247.", "A Thursday in July, {{t+0}}."],
    ["72 year old male (Kevin)", "{{age}} year old male ({{patient}})"],
    ["Caller: wife (Joan).", "Caller: {{partner}} ({{partner_name}})."],
    ["House in the township; wife will meet you at the front door. About 30 minutes to the nearest hospital", "House in the township; {{partner}} will meet you at the front door. About {{transport}} minutes to {{hospital|the nearest hospital}}"],
    ["0300. A weatherboard house, lights on. Joan meets you in her dressing gown.", "{{a+0}}. A weatherboard house, lights on. Joan meets you in " + HER + " dressing gown."],
    ["\\\"72 year old male, likely acute", "\\\"{{age}} year old male, likely acute"],
    ["30 minutes from hospital. Requesting advice on GTN.", "{{transport}} minutes from hospital. Requesting advice on GTN."],
    ["\\\"This is Kevin, 72.\\\"", "\\\"This is {{patient}}, {{age}}.\\\""],
    ["\"72, cardiac history,", "\"{{age}}, cardiac history,"],
    ["the 30 minute drive", "the {{transport}} minute drive"], ["for a 30 minute trip", "for a {{transport}} minute trip"],
    ["0215", "{{t-32}}"],
    ["0303", "{{a+3}}"], ["0308", "{{a+8}}"], ["0311", "{{a+11}}"], ["0316", "{{a+16}}"], ["0317", "{{a+17}}"], ["0320", "{{a+20}}"],
    ["for the next half hour.", "for the next {{#transport=30}}half hour{{/transport}}{{^transport=30}}{{transport}} minutes{{/transport}}."],
    ...C.crewSwaps,
    ["Kevin", "{{patient}}"], ["Joan", "{{partner_name}}"],
    [/(?<![=#])\bwife\b/g, "{{partner}}"]
  ],
  fields: [
    f.patient("Kevin", "The patient stays a man (the story uses he and him, and the PDE-5 questions are written for him)."), f.age(72, 50, 90),
    f.partner("wife", "Person with him"), f.partnerName("Joan"),
    f.town("", "Port Neill"), f.hospital("", "Tumby Bay Hospital"), f.transport(30),
    f.dispatch("02:47", "22:00", "05:00", "Night only (22:00 to 05:00): he wakes up gasping."), f.response(13), ...f.crew()
  ],
  tries: [{ patient: "Bob", age: 20, partner: "husband", partner_name: "Tony", town: "Port Neill", hospital: "Tumby Bay Hospital", transport: 45, dispatch: "12:00", response: 8, clinician: "Sam" }]
});
