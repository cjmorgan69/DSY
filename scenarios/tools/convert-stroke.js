// Run with: node scenarios/tools/convert-stroke.js (writes the JSON files to /tmp/scenario-stroke/).
// The receiving hospital is one of the Eyre Peninsula Stroke Thrombolysis Services and travel stays between 21 and 59
// minutes, so the protocol's "over 20 minutes" (clinical support) and "under 60 minutes" (Code Stroke) points stay true.
const C = require("./convert.js"), f = C.f;
const SHE = C.who({ wife: "she", husband: "he", partner: "they" }), HER = C.who({ wife: "her", husband: "his", partner: "their" });
const HER_OBJ = C.who({ wife: "her", husband: "him", partner: "them" });
C.run({
  slug: "stroke-ao", src: "modules/stroke-AO/content.js",
  swaps: [
    ["Port Lincoln, Whyalla and Port Augusta (CPP-016-AO).", "@@STS3@@"], // the protocol's list of STS hospitals stays as it is
    ["Frank, 78: sudden weakness and slurred speech at morning tea, Coffin Bay", "{{patient}}, {{age}}: sudden weakness and slurred speech at morning tea, {{town}}"],
    ["A 78 year old man", "A {{age}} year old man"],
    ["His wife saw it happen", "His {{partner}} saw it happen"],
    ["Port Lincoln Hospital, a Stroke Thrombolysis Service (STS), is about 35 minutes away.", "{{sts}} Hospital, a Stroke Thrombolysis Service (STS), is about {{transport}} minutes away."],
    ["\"Port Lincoln Hospital (STS): about 35 minutes\"", "\"{{sts}} Hospital (STS): about {{transport}} minutes\""],
    ["\"Paramedic backup: about 40 minutes\"", "\"Paramedic backup: about {{backup_mins}} minutes\""],
    ["paged to Coffin Bay.", "paged to {{town}}."],
    ["78 year old male", "{{age}} year old male"],
    ["Caller: wife, on scene, distressed", "Caller: {{partner}}, on scene, distressed"],
    ["Port Lincoln Hospital is an STS, about 35 minutes: under 60 minutes travel", "{{sts}} Hospital is an STS, about {{transport}} minutes: under 60 minutes travel"],
    ["She is sure of the time", C.who({ wife: "She is", husband: "He is", partner: "They are" }) + " sure of the time"],
    ["plus about 15 min on scene and 35 min travel, well under 9 hours; travel 35 min, under 60", "plus about 15 min on scene and {{transport}} min travel, well under 9 hours; travel {{transport}} min, under 60"],
    ["Code Stroke to the closest CSU/STS (Port Lincoln)", "Code Stroke to the closest CSU/STS ({{sts}})"],
    ["35 min to Port Lincoln;", "{{transport}} min to {{sts}};"],
    ["and her phone, and decide how she will get to Port Lincoln", "and " + HER + " phone, and decide how " + SHE + " will get to {{sts}}"],
    ["Port Lincoln is 35 minutes away.", "{{sts}} is {{transport}} minutes away."],
    ["follows with his medication list and her phone", "follows with his medication list and " + HER + " phone"],
    ["Tell her before you leave the kitchen.", "Tell " + HER_OBJ + " before you leave the kitchen."],
    ["SA Ambulance, Coffin Bay crew.", "SA Ambulance, {{station}} crew."],
    ["Frank [surname], 78.", "{{patient}} [surname], {{age}}."],
    ["Wife Margaret following", "{{Partner}} {{partner_name}} following"],
    ["from Coffin Bay that is far over 60 minutes", "from {{town}} that is far over 60 minutes"],
    ["Port Lincoln Hospital", "{{sts}} Hospital"], ["Port Lincoln STS", "{{sts}} STS"],
    ["Thirty-five minutes of road:", "{{#transport=35}}Thirty-five{{/transport}}{{^transport=35}}{{transport}}{{/transport}} minutes of road:"],
    ...C.crewSwaps,
    ["@@STS3@@", "Port Lincoln, Whyalla and Port Augusta (CPP-016-AO)."],
    ["Frank", "{{patient}}"], ["Margaret", "{{partner_name}}"]
  ],
  fields: [
    f.patient("Frank", "The patient stays a man (the story uses he and him)."), f.age(78, 60, 90),
    f.partner("wife", "Person with him"), f.partnerName("Margaret"),
    { key: "town", label: "Town", type: "text", default: "Coffin Bay", max: 30, group: "Place", help: "Where the patient lives." },
    f.station("Coffin Bay", "Your crew's station, used in the hospital notification."),
    { key: "sts", label: "Stroke hospital (STS)", type: "choice", default: "Port Lincoln", group: "Place", help: "Only the Eyre Peninsula Stroke Thrombolysis Services, so the Code Stroke pathway still applies.",
      options: [{ value: "Port Lincoln", label: "Port Lincoln" }, { value: "Whyalla", label: "Whyalla" }, { value: "Port Augusta", label: "Port Augusta" }] },
    { key: "transport", label: "Travel time to the STS (min)", type: "number", default: 35, min: 21, max: 59, group: "Place", help: "21 to 59 minutes: over 20 (request clinical support) and under 60 (Code Stroke)." },
    f.backup(40), ...f.crew()
  ],
  tries: [{ patient: "Ted", age: 99, partner: "husband", partner_name: "Bill", town: "Cowell", station: "Cowell", sts: "Whyalla", transport: 80, backup_mins: 15, clinician: "Sam" },
          { partner: "partner", partner_name: "", town: "", transport: 5 }]
});
