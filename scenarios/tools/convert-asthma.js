// Run with: node scenarios/tools/convert-asthma.js (writes the JSON files to /tmp/scenario-asthma/).
const C = require("./convert.js"), f = C.f;
C.run({
  slug: "asthma-ao", src: "modules/asthma-ao/content.js", sceneMinutes: 28, // arrival 0227, hospital 0325 after 30 minutes
  swaps: [
    ["Karen, 45: more severe asthma at a rural property, 0215", "{{patient}}, {{age}}: more severe asthma at a rural property{{#town}} near {{town}}{{/town}}, {{t+0}}"],
    ["\"Nearest paramedic backup: 50 minutes\"", "\"Nearest paramedic backup: {{backup_mins}} minutes\""],
    ["\"Nearest country hospital: 30 minutes\"", "\"{{hospital|Nearest country hospital}}: {{transport}} minutes\""],
    ["Thursday, 0215. You and your crew partner are paged to a breathing difficulty at a rural property. Cool, dry night. You respond from home: about 12 minutes to scene.",
     "Thursday, {{t+0}}. You and your crew partner are paged to a breathing difficulty at a rural property{{#town}} near {{town}}{{/town}}. Cool, dry night. You respond from home: about {{response}} minutes to scene."],
    ["the paramedic is 50 minutes away, so think", "the paramedic is {{backup_mins}} minutes away, so think"],
    ["Known asthmatic, reliever not working, 0215.", "Known asthmatic, reliever not working, {{t+0}}."],
    ["with the paramedic 50 minutes away, early clinical support", "with the paramedic {{backup_mins}} minutes away, early clinical support"],
    ["Clinical support: request early (paramedic 50 minutes away)", "Clinical support: request early (paramedic {{backup_mins}} minutes away)"],
    ["Transport: country hospital, 30 minutes. Do not delay", "Transport: {{hospital|country hospital}}, {{transport}} minutes. Do not delay"],
    ["the hospital is 30 minutes away.", "the hospital is {{transport}} minutes away."],
    ["Load and go: the hospital is 30 minutes away, the paramedic 50. Treat en route", "Load and go: the hospital is {{transport}} minutes away, the paramedic {{backup_mins}}. Treat en route"],
    ["in the next 30 minutes and have your response ready", "in the next {{transport}} minutes and have your response ready"],
    ["You arrive at the country hospital ED at 0325.", "You arrive at {{hospital|the country hospital}} ED at {{h+0}}."],
    ["I'm [name], Ambulance Officer from [station]. This is Karen Mitchell, 45.", "I'm {{clinician|[name]}}, Ambulance Officer from {{station|[station]}}. This is {{patient}} Mitchell, {{age}}."],
    ["Karen Mitchell, 45.", "{{patient}} Mitchell, {{age}}."],
    ["Called at 0215", "Called at {{t+0}}"],
    ["Woke about 0145", "Woke about {{t-30}}"],
    ["\"0225\"", "\"{{a-2}}\""], ["\"0228\"", "\"{{a+1}}\""], ["\"0235\"", "\"{{a+8}}\""], ["\"0300\"", "\"{{h-25}}\""],
    ...C.crewSwaps,
    ["Karen", "{{patient}}"],
    [/(?<![=#])\bhusband\b/g, "{{partner}}"]
  ],
  fields: [
    f.patient("Karen", "The patient stays a woman (the story uses she and her)."), f.age(45, 18, 75),
    f.partner("husband", "Person with her", ["husband", "wife", "partner"]),
    f.town("", "Lock"), f.station(""), f.hospital("", "Cummins Hospital"), f.transport(30), f.backup(50),
    f.dispatch("02:15", "22:00", "05:00", "Night only (22:00 to 05:00): she wakes up short of breath."), f.response(12), ...f.crew()
  ],
  tries: [{ patient: "Sue", age: 30, partner: "wife", town: "Lock", station: "Lock", hospital: "Lock Hospital", transport: 70, backup_mins: 20, dispatch: "23:40", response: 25, clinician: "Sam" }]
});
