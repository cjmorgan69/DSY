// Run with: node scenarios/tools/convert-dementia.js (writes the JSON files to /tmp/scenario-dementia/).
const C = require("./convert.js"), f = C.f;
C.run({
  slug: "dementia-ao", src: "modules/dementia-ao/content.js", // page 1840, arrival 1852, leave about a+56, hospital at h+0 (2003)
  sceneMinutes: 56,
  swaps: [
    ["Jo-Anne, 84: \\\"There's a strange man in my house\\\", near Cummins, 1840", "{{patient}}, {{age}}: \\\"There's a strange man in my house\\\", near {{town}}, {{t+0}}"],
    ["Farmhouse 12 km from Cummins. Cummins Hospital about 15 minutes away", "Farmhouse 12 km from {{town}}. {{hospital_town}} Hospital about {{transport}} minutes away"],
    ["paged from home in Cummins. About 12 minutes to the farmhouse.", "paged from home in {{station}}. About {{response}} minutes to the farmhouse."],
    ["Priority 2, Behavioural disturbance, 84F", "Priority 2, Behavioural disturbance, {{age}}F"],
    ["Farmhouse 12 km north of Cummins", "Farmhouse 12 km north of {{town}}"],
    ["An 84-year-old living with dementia", "An {{age}}-year-old living with dementia"],
    ["No risk at all: she's 84", "No risk at all: she's {{age}}"],
    ["Take her to Cummins Hospital", "Take her to {{hospital_town}} Hospital"],
    ["Handover at Cummins Hospital", "Handover at {{hospital_town}} Hospital"],
    ["I'm [name], Ambulance Officer from Cummins. This is Jo-Anne Smith, 84,", "I'm {{clinician|[name]}}, Ambulance Officer from {{station}}. This is {{patient}} Smith, {{age}},"],
    ["I'm Sam from the ambulance", "I'm {{clinician|Sam}} from the ambulance"],
    ["A Tuesday in May, 1840.", "A Tuesday in May, {{t+0}}."],
    ["1852", "{{a+0}}"], ["1908", "{{a+16}}"], ["1912", "{{a+20}}"], ["1918", "{{a+26}}"], ["It's now 1920", "It's now {{a+28}}"],
    ["1922", "{{a+30}}"], ["1935", "{{a+43}}"], ["1945", "{{a+53}}"], ["En route (2000)", "En route ({{h-3}})"], ["2003", "{{h+0}}"],
    ...C.crewSwaps,
    ["Jo-Anne", "{{patient}}"], ["Ray", "{{partner_name}}"]
  ],
  fields: [
    f.patient("Jo-Anne", "The patient stays a woman (the story uses she and her)."), f.age(84, 80, 89),
    { key: "partner_name", label: "Her husband's name", type: "text", default: "Ray", max: 20, group: "Patient", help: "He stays her husband, 86." },
    { key: "town", label: "Nearest town", type: "text", default: "Cummins", max: 30, group: "Place", help: "The farmhouse is 12 km from it." },
    f.station("Cummins"),
    { key: "hospital_town", label: "Receiving hospital (town)", type: "text", default: "Cummins", max: 30, group: "Place", help: "Shown as \"<town> Hospital\"." },
    f.transport(15, 60),
    f.dispatch("18:40", "17:00", "20:30", "17:00 to 20:30: the end of her day (stress builds up through the day), and her morning paracetamol was more than 4 hours ago."),
    Object.assign(f.response(12), { max: 30 }),
    ...f.crew()
  ],
  tries: [{ patient: "Beryl", age: 87, partner_name: "Les", town: "Lock", station: "Lock", hospital_town: "Port Lincoln", transport: 45, dispatch: "20:30", response: 20, clinician: "Jo", driver: "Kim" }]
});
