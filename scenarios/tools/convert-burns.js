// Run with: node scenarios/tools/convert-burns.js (writes the JSON files to /tmp/scenario-burns/).
const C = require("./convert.js"), f = C.f;
C.run({
  slug: "burns-ao", src: "modules/burns/content.js", sceneMinutes: 11, // arrival 1857, leaving 1908, hospital 1935 (h+2)
  swaps: [
    ["Daniel, 42: a diesel flash burn to the face near Port Neill, 1845", "{{patient}}, {{age}}: a diesel flash burn to the face near {{town}}, {{t+0}}"],
    ["\"Tumby Bay Hospital: about 25 minutes\"", "\"{{hospital}}: about {{transport}} minutes\""],
    ["A Thursday in autumn, 1845. Still light, but cooling fast. You and your crew partner are paged from home to a rural block on the edge of Port Neill. About 12 minutes to scene.",
     "A Thursday in autumn, {{t+0}}. Still light, but cooling fast. You and your crew partner are paged from home to a rural block on the edge of {{town}}. About {{response}} minutes to scene."],
    ["Priority 2, Burns, 42M", "Priority 2, Burns, {{age}}M"],
    ["1857. A gravel driveway", "{{a+0}}. A gravel driveway"],
    ["Daniel Hartley, 42. \\\"I was pouring", "{{patient}} Hartley, {{age}}. \\\"I was pouring"],
    ["Initial observations (1859)", "Initial observations ({{a+2}})"],
    ["at about 1840", "at about {{t-5}}"],
    ["Go to Tumby Bay Hospital and I'll let them know.", "Go to {{hospital}} and I'll let them know."],
    ["1908. Daniel walks", "{{a+11}}. {{patient}} walks"],
    ["\"1859\", \"1920 (en route)\"", "\"{{a+2}}\", \"{{a+23}} (en route)\""],
    ["1935. The paramedic crew met you on the highway and travelled with you. You arrive at Tumby Bay Hospital.",
     "{{h+2}}. The paramedic crew met you on the highway and travelled with you. You arrive at {{hospital}}."],
    ["I'm [name], Ambulance Officer from [station]. This is Daniel Hartley, 42.", "I'm {{clinician|[name]}}, Ambulance Officer from {{station|[station]}}. This is {{patient}} Hartley, {{age}}."],
    ...C.crewSwaps,
    ["Daniel", "{{patient}}"]
  ],
  fields: [
    f.patient("Daniel", "The patient stays a man (the story uses he and his)."), f.age(42, 18, 80),
    { key: "town", label: "Town", type: "text", default: "Port Neill", max: 30, group: "Place", help: "The rural block is on the edge of this town." },
    f.station("", "Used in the handover. Leave blank for [station]."),
    { key: "hospital", label: "Receiving hospital", type: "text", default: "Tumby Bay Hospital", max: 35, group: "Place" },
    Object.assign(f.transport(25, 60), { min: 15, help: "At least 15 minutes: the second set of observations is taken en route." }),
    f.dispatch("18:45", "17:00", "18:45", "17:00 to 18:45: an autumn evening, still light but cooling fast."),
    { key: "response", label: "Drive to the patient (min)", type: "number", default: 12, min: 8, max: 20, group: "Time", help: "His friends have been cooling him for about 15 minutes when you arrive." },
    ...f.crew()
  ],
  tries: [{ patient: "Mick", age: 19, town: "Arno Bay", station: "Cleve", hospital: "Cleve Hospital", transport: 15, dispatch: "17:00", response: 8, clinician: "Sam", driver: "Jo" }]
});
