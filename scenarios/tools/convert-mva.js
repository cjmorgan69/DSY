// Run with: node scenarios/tools/convert-mva.js (writes the JSON files to /tmp/scenario-mva/).
const C = require("./convert.js"), f = C.f;
C.run({
  slug: "mva-ao", src: "modules/mva-ao/content.js", // page 1730, arrival 1742; the story ends when the paramedics meet the crew (a+61)
  swaps: [
    ["Jason, 34: a rollover on the Tod Highway near Cummins, 1730", "{{patient}}, {{age}}: a rollover on the {{road}} near {{town}}, {{t+0}}"],
    ["\"Paramedic crew from Port Lincoln: about 40 minutes, through the EOC\"", "\"Paramedic crew from {{backup_town}}: about 40 minutes, through the EOC\""],
    ["\"Port Lincoln Hospital: about 50 minutes from the scene\"", "\"{{hospital_town}} Hospital: about {{transport}} minutes from the scene\""],
    ["A Tuesday in July, 1730. It's nearly dark, 11 °C, with a cold southerly wind. You and your crew partner are paged from home in Cummins. About 12 minutes to scene.",
     "A Tuesday in July, {{t+0}}. It's nearly dark, 11 °C, with a cold southerly wind. You and your crew partner are paged from home in {{station}}. About {{response}} minutes to scene."],
    ["Priority 1, Motor vehicle accident, 34M", "Priority 1, Motor vehicle accident, {{age}}M"],
    ["Single vehicle rollover, Tod Highway about 9 km south of Cummins", "Single vehicle rollover, {{road}} about {{km}} km {{dir}} of {{town}}"],
    ["Nearest paramedic crew: Port Lincoln, about 40 minutes, if requested", "Nearest paramedic crew: {{backup_town}}, about 40 minutes, if requested"],
    ["Jason Fielding, 34, farm worker.", "{{patient}} Fielding, {{age}}, farm worker."],
    ["Call: who and where; 34M,", "Call: who and where; {{age}}M,"],
    ["Head for Port Lincoln Hospital now. The paramedic crew will meet you on the Tod Highway,", "Head for {{hospital_town}} Hospital now. The paramedic crew will meet you on the {{road}},"],
    ["On the Tod Highway, heading for Port Lincoln.", "On the {{road}}, heading for {{hospital_town}}."],
    ["before moving on to Port Lincoln Hospital.", "before moving on to {{hospital_town}} Hospital."],
    ["I'm [name], Ambulance Officer from Cummins. This is Jason Fielding, 34.", "I'm {{clinician|[name]}}, Ambulance Officer from {{station}}. This is {{patient}} Fielding, {{age}}."],
    ["Port Lincoln notified, MedSTAR aware.", "{{hospital_town}} notified, MedSTAR aware."],
    ["Is there a hospital closer than Port Lincoln?", "Is there a hospital closer than {{hospital_town}}?"],
    ["The crash is 2 km from Cummins", "The crash is 2 km from {{town}}"],
    ["1725", "{{t-5}}"], ["1742", "{{a+0}}"], ["1748", "{{a+6}}"], ["1803", "{{a+21}}"], ["1805", "{{a+23}}"], ["1818", "{{a+36}}"],
    ["1820", "{{a+38}}"], ["1826", "{{a+44}}"], ["1833", "{{a+51}}"], ["1843", "{{a+61}}"],
    ...C.crewSwaps,
    ["Jason", "{{patient}}"]
  ],
  fields: [
    f.patient("Jason", "The patient stays a man (the story uses he and his)."), f.age(34, 18, 60),
    { key: "road", label: "Road or highway", type: "text", default: "Tod Highway", max: 30, group: "Place", help: "A sealed country highway with traffic." },
    { key: "town", label: "Nearest town", type: "text", default: "Cummins", max: 30, group: "Place" },
    { key: "km", label: "Distance from the town (km)", type: "number", default: 9, min: 3, max: 40, group: "Place" },
    { key: "dir", label: "Direction from the town", type: "choice", default: "south", group: "Place",
      options: ["north", "south", "east", "west"].map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) })) },
    { key: "station", label: "Your station", type: "text", default: "Cummins", max: 30, group: "Place", help: "Where the crew is paged from; used in the handover." },
    { key: "backup_town", label: "Paramedic crew comes from", type: "text", default: "Port Lincoln", max: 30, group: "Place", help: "They stay about 40 minutes away: they meet the crew on the road after the third set of obs." },
    { key: "hospital_town", label: "Receiving hospital (town)", type: "text", default: "Port Lincoln", max: 30, group: "Place", help: "Shown as \"<town> Hospital\". In the story the EOC Clinician chooses it." },
    Object.assign(f.transport(50, 120), { min: 20 }),
    f.dispatch("17:30", "17:00", "18:00", "17:00 to 18:00: a winter evening, nearly dark."),
    { key: "response", label: "Drive to the patient (min)", type: "number", default: 12, min: 6, max: 25, group: "Time" },
    ...f.crew()
  ],
  tries: [{ patient: "Luke", age: 22, road: "Lincoln Highway", town: "Tumby Bay", km: 15, dir: "north", station: "Tumby Bay", backup_town: "Port Lincoln", hospital_town: "Port Lincoln", transport: 40, dispatch: "17:00", response: 20, clinician: "Sam", driver: "Jo" }]
});
