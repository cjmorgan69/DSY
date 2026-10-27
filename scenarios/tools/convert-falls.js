// Run with: node scenarios/tools/convert-falls.js (writes the JSON files to /tmp/scenario-falls/).
const C = require("./convert.js"), f = C.f;
C.run({
  slug: "falls-ao", src: "modules/falls-ao/content.js", // page 0630, arrival 0638, leave scene about a+45, hospital at h+0
  sceneMinutes: 45,
  swaps: [
    ["Mavis, 81: on the bathroom floor since 3 am, Cummins, 0630", "{{patient}}, {{age}}: on the bathroom floor since 3 am, {{town}}, {{t+0}}"],
    ["\"Cummins Hospital: about 5 minutes from her house\"", "\"{{hospital_town}} Hospital: about {{transport}} minutes from her house\""],
    ["A Thursday in July, 0630. Still dark, 4 °C outside. You and your crew partner are paged from home in Cummins. About 8 minutes to her house.",
     "A Thursday in July, {{t+0}}. Still dark, 4 °C outside. You and your crew partner are paged from home in {{station}}. About {{response}} minutes to her house."],
    ["Priority 2, Fall, 81F", "Priority 2, Fall, {{age}}F"],
    ["House in Cummins township", "House in {{town}} township"],
    ["Aged 81 and on the floor", "Aged {{age}} and on the floor"],
    ["Handover at Cummins Hospital", "Handover at {{hospital_town}} Hospital"],
    ["I'm [name], Ambulance Officer from Cummins. This is Mavis Treloar, 81.", "I'm {{clinician|[name]}}, Ambulance Officer from {{station}}. This is {{patient}} Treloar, {{age}}."],
    ["0624", "{{t-6}}"], ["0638", "{{a+0}}"], ["0646", "{{a+8}}"], ["0652", "{{a+14}}"], ["0702", "{{a+24}}"], ["0704", "{{a+26}}"], ["0708", "{{a+30}}"], ["0728", "{{h+0}}"],
    ...C.crewSwaps,
    ["Mavis", "{{patient}}"]
  ],
  fields: [
    f.patient("Mavis", "The patient stays a woman (the story uses she and her)."), f.age(81, 70, 95),
    { key: "town", label: "Town", type: "text", default: "Cummins", max: 30, group: "Place", help: "Where she lives (a house in the township)." },
    f.station("Cummins"),
    { key: "hospital_town", label: "Receiving hospital (town)", type: "text", default: "Cummins", max: 30, group: "Place", help: "Shown as \"<town> Hospital\"." },
    Object.assign(f.transport(5, 60), { min: 3 }),
    f.dispatch("06:30", "06:15", "06:45", "06:15 to 06:45: a dark winter morning, about three and a half hours after she fell at 3 am."),
    Object.assign(f.response(8), { max: 25 }),
    ...f.crew()
  ],
  tries: [{ patient: "Joan", age: 88, town: "Tumby Bay", station: "Tumby Bay", hospital_town: "Tumby Bay", transport: 6, dispatch: "06:15", response: 12, clinician: "Sam", driver: "Jo" }]
});
