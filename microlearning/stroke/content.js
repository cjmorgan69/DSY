/* Stroke - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Source: SAAS CPP-016-AO Stroke - AO, version 6.0 (25 June 2026), exported 31.08.2026.
   Nothing here goes beyond that text. */
window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,                       // true shows "coming soon" boxes for empty video/podcast slots
  title: "Stroke",
  subtitle: "Ambulance Officer microlearning",
  headline: "Recognising stroke and getting eligible patients to the right hospital in time",
  lead: "Rapid early assessment and intervention in stroke are linked to much better patient outcomes. This module covers the AO protocol: what to check first, who may be eligible for thrombolysis (Code Stroke), and who to call.",
  minutes: 25,

  protocol: { code: "CPP-016-AO", name: "Stroke - AO", version: "v6.0 (25 June 2026)", exported: "31 August 2026" },

  session: {
    intro: "For a team-led session. Allow about 30 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Read the introduction", time: "3 min", text: "Watch the intro video, then read the box on what changed in version 6.0." },
      { t: "Read the key points", time: "5 min", text: "Take turns reading one box each out loud." },
      { t: "Work the scenarios", time: "10 min", text: "Open the eligibility checker. For each scenario, decide the answer as a group before pressing the button, then compare." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pair up for a one-minute ISBAR Code Stroke call. Do the rest in your own time." }
    ]
  },

  video: {
    src: "intro.mp4",
    poster: "intro-poster.jpg",
    title: "Stroke: what AOs need to know"
  },

  intro: [
    "Rapid early assessment and intervention in stroke are associated with significant improvement in patient outcome, especially if managed in a Comprehensive Stroke Unit (CSU). Stroke Thrombolysis Services (STS) are country hospitals that have CT capabilities and also offer a range of acute stroke intervention services.",
    "The ROSIER scale (recognition of stroke in the emergency room) is the preferred stroke recognition and assessment tool in South Australia. Use it in addition to a thorough history and clinical assessment to identify stroke and eligibility for thrombolysis (Code Stroke).",
    "A patient who arrives at a CSU, or a facility with an STS, within nine hours of the onset of stroke symptoms may be eligible for thrombolysis if they have a positive ROSIER score and a premorbid level of independent living. Consider a consult with the EOC Clinician for every eligible patient, for consideration of transport directly to a CSU/STS that can be reached within 9 hours of the onset of symptoms."
  ],

  keyPointsTitle: "Key points",
  keyPoints: [
    { title: "What changed in version 6.0 (25 June 2026)", tone: "warn", items: [
      "Code Stroke eligibility for ROSIER positive patients is extended to up to 9 hours from symptom onset. It was 4 hours.",
      "Naracoorte STS hours are updated (see the facilities list)."
    ], note: "From the protocol's version history. If you learned the 4 hour window, it no longer applies." },
    { title: "First: basic care", check: { q: "What do you check before the ROSIER assessment?", a: "The BGL. If it is below 3.5 mmol/L, treat as per CPP-009-AO Hypoglycaemia and reassess after treatment." }, items: [
      "Measure BGL to exclude hypoglycaemia",
      "If BGL is below 3.5 mmol/L, treat as per CPP-009-AO Hypoglycaemia and reassess the patient after treatment",
      "Undertake a ROSIER assessment"
    ] },
    { title: "Code Stroke: eligible for thrombolysis only if ALL apply", tone: "warn", check: { q: "Suspected stroke, ROSIER positive, independent before, 5 hours from onset, but 75 minutes from the CSU/STS. Code Stroke?", a: "Not as it stands: every criterion must apply. Consult the EOC Clinician to discuss transport and destination options." }, items: [
      "Stroke is clinically suspected",
      "ROSIER score is positive",
      "Independent pre-morbid functioning",
      "Less than 9 hours from symptom onset to arrival at the CSU/STS",
      "Less than 60 minutes travel time to the CSU/STS"
    ] },
    { title: "What to do for a Code Stroke patient", tiles: true, steps: [
      { t: "Consult the EOC Clinician", text: "Ask for authorisation to transport directly to the closest CSU/STS hospital, for consideration for thrombolysis." },
      { t: "Request clinical support", text: "If the patient is unstable or transport times are likely to be over 20 minutes." },
      { t: "Confirm patient details", text: "Patient identification, and phone contact for their substitute decision maker, close relative or carer." },
      { t: "Notify Code Stroke", text: "To the CSU/STS stroke coordinator via the SAAS Code Notification Line, or via local processes, using ISBAR. Confirm the Code Stroke eligibility criteria and your ETA." },
      { t: "Confirm arrival", text: "Confirm Code Stroke arrival via SAGRN notification to the receiving hospital ED." }
    ] },
    { title: "If not eligible", text: "Stroke clinically suspected, but any of: negative ROSIER, over 9 hours from symptom onset, or diminished pre-morbid independent living.", items: [
      "Transport to the closest CSU/STS, or",
      "transport to the nearest hospital, or",
      "consult the EOC Clinician for advice"
    ] },
    { title: "Eligible except for distance", tone: "warn", text: "If all other Code Stroke criteria apply but travel time to the CSU/STS is over 60 minutes, consult the EOC Clinician to discuss transport and destination options." }
  ],

  tool: {
    check: { q: "Which local hospitals are listed as Stroke Thrombolysis Services?", a: "Port Lincoln, Whyalla and Port Augusta." },
    title: "Eligibility checker",
    intro: "Answer the questions about your patient and the protocol pathway is shown. It follows CPP-016-AO version 6.0. Complete the BGL and ROSIER steps first.",
    fields: [
      { id: "bgl", type: "number", label: "Blood glucose level (mmol/L)", step: "0.1", placeholder: "e.g. 5.6" },
      { id: "rosier", type: "yesno", label: "Is the ROSIER score positive?" },
      { id: "independent", type: "yesno", label: "Was the patient living independently before this event?" },
      { id: "hours", type: "number", label: "Estimated hours from symptom onset to arrival at the CSU/STS", step: "0.25", placeholder: "e.g. 6.5" },
      { id: "travel", type: "number", label: "Estimated travel time to the closest CSU/STS (minutes)", step: "1", placeholder: "e.g. 45" }
    ],
    evaluate: function (v) {
      var alerts = [];
      if (v.bgl < 3.5) alerts.push("BGL is below 3.5 mmol/L: treat as per CPP-009-AO Hypoglycaemia and reassess the patient after treatment, then continue the stroke assessment.");
      var failed = [];
      if (!v.rosier) failed.push("ROSIER score is negative");
      if (v.hours > 9) failed.push("Over 9 hours from symptom onset");
      if (!v.independent) failed.push("diminished pre-morbid independent living");
      if (failed.length) {
        return { tone: "warn", headline: "Not eligible for thrombolysis", alerts: alerts, why: failed,
          actions: ["Transport to the closest CSU/STS, or", "transport to the nearest hospital, or", "consult the EOC Clinician for advice"] };
      }
      if (v.hours === 9) {
        return { tone: "warn", headline: "Consult the EOC Clinician", alerts: alerts,
          why: ["Exactly 9 hours from onset to arrival: the protocol says under 9 hours is eligible and over 9 hours is not"],
          actions: ["Consult the EOC Clinician for advice"] };
      }
      if (v.travel < 60) {
        return { tone: "good", headline: "Code Stroke: consult the EOC Clinician", alerts: alerts,
          why: ["Positive ROSIER", "Independent pre-morbid functioning", "Under 9 hours from onset to arrival", "Under 60 minutes travel"],
          actions: [
            "Consult the EOC Clinician for authorisation to transport directly to the closest CSU/STS hospital, for consideration for thrombolysis",
            "Request clinical support if the patient is unstable or transport times are likely to be over 20 minutes",
            "Obtain and confirm patient identification and phone contact for the substitute decision maker, close relative or carer",
            "Notify Code Stroke to the CSU/STS stroke coordinator via the SAAS Code Notification Line, or local processes, using ISBAR, confirming the Code Stroke eligibility criteria and ETA",
            "Confirm Code Stroke arrival via SAGRN notification to the receiving hospital ED"
          ] };
      }
      return { tone: "warn", headline: "Consult the EOC Clinician to discuss transport and destination options", alerts: alerts,
        why: ["All other Code Stroke criteria apply, but travel time to the CSU/STS is not under 60 minutes"],
        actions: ["Consult the EOC Clinician to discuss transport and destination options"],
        note: v.travel === 60 ? "The protocol says under 60 minutes is eligible and over 60 minutes needs a discussion. At exactly 60 minutes, the safe option is to talk to the EOC Clinician." : "" };
    },
    disclaimer: "Training aid only. Use the current protocol and the EOC Clinician for real patients.",
    scenariosNote: "Examples written for training from the protocol's criteria. Decide your answer before pressing the button.",
    scenarios: [
      { title: "The clear candidate", text: "Positive ROSIER, lives independently, BGL 6.2, about 2.5 hours from onset to arrival, 45 minutes' travel.", values: { bgl: 6.2, rosier: true, independent: true, hours: 2.5, travel: 45 } },
      { title: "Later than it used to be", text: "Positive ROSIER, lives independently, BGL 5.9, about 6.5 hours from onset to arrival, 40 minutes' travel. This patient was outside the old 4 hour window.", values: { bgl: 5.9, rosier: true, independent: true, hours: 6.5, travel: 40 } },
      { title: "Too far", text: "Positive ROSIER, lives independently, BGL 5.8, about 3 hours from onset to arrival, 90 minutes' travel.", values: { bgl: 5.8, rosier: true, independent: true, hours: 3, travel: 90 } },
      { title: "Over nine hours", text: "Positive ROSIER, lives independently, BGL 6.1, about 10 hours from onset to arrival, 30 minutes' travel.", values: { bgl: 6.1, rosier: true, independent: true, hours: 10, travel: 30 } },
      { title: "Negative ROSIER", text: "Stroke is still suspected, but ROSIER is negative. BGL 5.5, about 1 hour from onset, 30 minutes' travel.", values: { bgl: 5.5, rosier: false, independent: true, hours: 1, travel: 30 } },
      { title: "Check the sugar first", text: "BGL 2.8, positive ROSIER, lives independently, about 1.5 hours to arrival, 40 minutes' travel.", values: { bgl: 2.8, rosier: true, independent: true, hours: 1.5, travel: 40 } },
      { title: "Needs daily care", text: "Positive ROSIER, BGL 6.0, but needed help with daily living before this event. About 2 hours to arrival, 30 minutes' travel.", values: { bgl: 6, rosier: true, independent: false, hours: 2, travel: 30 } }
    ]
  },

  referenceTitle: "Stroke facilities",
  reference: [
    { title: "Comprehensive Stroke Units (CSU)", table: { head: ["Hospital", "Hours"], rows: [
      ["Flinders Medical Centre", "0800-2000"],
      ["Royal Adelaide Hospital", "No restriction listed"],
      ["Lyell McEwin Hospital", "0800-2000"]
    ] } },
    { title: "Stroke Thrombolysis Services (STS)", text: "Country hospitals with CT capabilities that also offer a range of acute stroke intervention services.", table: { head: ["Hospital", "Hours"], rows: [
      ["Mount Gambier Hospital", "No restriction listed"],
      ["Naracoorte Hospital", "0830-1630, Mon-Fri"],
      ["Port Augusta Hospital", "No restriction listed"],
      ["Port Lincoln Hospital", "No restriction listed"],
      ["Port Pirie Hospital", "No restriction listed"],
      ["Riverland General Hospital (Berri)", "No restriction listed"],
      ["Wallaroo Hospital", "0830-1530, Mon-Fri"],
      ["Whyalla Hospital", "No restriction listed"]
    ] } }
  ],
  links: [ { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" } ],

  quiz: [
    { q: "What should you measure first in a suspected stroke?", options: ["Temperature", "Blood glucose level, to exclude hypoglycaemia", "Pupil size"], answer: 1,
      why: "The protocol's first step after basic care is to measure BGL to exclude hypoglycaemia." },
    { q: "A stroke patient's BGL is 2.9 mmol/L. What does the protocol say?", options: ["Ignore it and continue to ROSIER", "Treat as per CPP-009-AO Hypoglycaemia and reassess the patient after treatment", "Wait until you reach hospital"], answer: 1,
      why: "If BGL is below 3.5 mmol/L, treat as per CPP-009-AO Hypoglycaemia and reassess the patient after treatment." },
    { q: "Which tool is preferred for stroke recognition in South Australia?", options: ["Glasgow Coma Scale", "ROSIER", "NEWS"], answer: 1,
      why: "ROSIER is the preferred tool, used alongside a thorough history and clinical assessment." },
    { q: "How soon after symptom onset should the patient arrive at a CSU/STS to be considered for thrombolysis?", options: ["Within 4 hours", "Within 9 hours", "Within 24 hours"], answer: 1,
      why: "Patients arriving within nine hours of onset may be eligible. Version 6.0 extended this from four hours." },
    { q: "Which combination makes a patient eligible for direct transport consideration (Code Stroke)?", options: [
        "Positive ROSIER only",
        "Positive ROSIER, independent pre-morbid functioning, under 9 hours onset to arrival, under 60 minutes travel",
        "Negative ROSIER, under 9 hours, under 60 minutes travel" ], answer: 1,
      why: "All of the criteria must apply." },
    { q: "A patient meets every Code Stroke criterion. What is the next step?", options: [
        "Drive directly to the CSU/STS without calling anyone",
        "Consult the EOC Clinician for authorisation to transport directly to the closest CSU/STS hospital",
        "Take them to the nearest hospital whatever the circumstances" ], answer: 1,
      why: "Direct transport needs authorisation from the EOC Clinician." },
    { q: "All Code Stroke criteria apply, but travel to the CSU/STS is over 60 minutes. What do you do?", options: [
        "Consult the EOC Clinician to discuss transport and destination options",
        "Treat as not eligible and take no further action",
        "Go anyway and tell the hospital when you arrive" ], answer: 0,
      why: "The protocol says to consult the EOC Clinician to discuss transport and destination options." },
    { q: "Stroke is clinically suspected but the ROSIER score is negative. Which is right?", options: [
        "Treat as eligible for thrombolysis",
        "Not eligible: transport to the closest CSU/STS, transport to the nearest hospital, or consult the EOC Clinician",
        "Do not transport" ], answer: 1,
      why: "A negative ROSIER, over 9 hours from onset, or diminished independent living means not eligible." },
    { q: "How do you notify the stroke coordinator for a Code Stroke?", options: [
        "Email the hospital",
        "Via the SAAS Code Notification Line, or local processes, using ISBAR, confirming the Code Stroke criteria and ETA",
        "Wait until you arrive" ], answer: 1,
      why: "Then confirm Code Stroke arrival via SAGRN notification to the receiving hospital ED." },
    { q: "When should you request clinical support for a Code Stroke patient?", options: [
        "Only if the patient arrests",
        "If the patient is unstable or transport times are likely to be over 20 minutes",
        "Never, the EOC Clinician covers it" ], answer: 1,
      why: "Request clinical support if the patient is unstable or transport times are likely to be over 20 minutes." },
    { q: "What is a Stroke Thrombolysis Service (STS)?", options: [
        "A metropolitan stroke ward",
        "A country hospital with CT capabilities that also offers a range of acute stroke intervention services",
        "An ambulance phone line" ], answer: 1,
      why: "That is how the protocol describes an STS." },
    { q: "Which of these is a Comprehensive Stroke Unit rather than a Stroke Thrombolysis Service?", options: ["Whyalla Hospital", "Port Lincoln Hospital", "Royal Adelaide Hospital"], answer: 2,
      why: "The CSUs listed are Flinders Medical Centre, Royal Adelaide Hospital and Lyell McEwin Hospital." }
  ],

  practical: {
    title: "Practical: BGL, ROSIER and a one-minute ISBAR",
    intro: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity.",
    equipment: ["Glucometer and test strips (or a training device)", "Your approved ROSIER form or reference", "A phone, or just a partner to role-play the stroke coordinator"],
    steps: [
      { t: "Check the BGL", text: "Run through the BGL measurement on your partner or a training device. State aloud what you would do if it were below 3.5 mmol/L, including reassessing after treatment." },
      { t: "Practise ROSIER", text: "Use your approved ROSIER reference. Take turns playing the patient and the assessing officer." },
      { t: "Make the call", text: "Role-play notifying Code Stroke to the stroke coordinator using ISBAR. Include the Code Stroke eligibility criteria and your ETA. Keep it to about a minute." }
    ],
    good: ["BGL checked before anything else", "ROSIER completed and the result stated clearly", "The call covers identification, Code Stroke criteria and ETA in a logical order"],
    note: "Placeholder suggestions: the protocol does not list the ROSIER items, so this module doesn't either. Use your approved ROSIER reference."
  },

  podcast: {
    title: "The Resus Room: stroke episodes",
    summary: "The Resus Room is a UK emergency medicine podcast. Its 2019 archive has \"Stroke; Roadside to Resus\" (July 2019) and \"Stroke Management; Roadside to Resus\" (August 2019), covering prehospital and in-hospital thrombolysis and stroke management. Optional listening. It reflects UK practice from 2019, so where it differs from CPP-016-AO, follow the protocol.",
    link: "https://theresusroom.libsyn.com/2019",
    linkLabel: "Open The Resus Room 2019 episodes"
  },
  furtherLinks: [
    { label: "The Resus Room on Apple Podcasts", href: "https://podcasts.apple.com/ie/podcast/the-resus-room/id1090433226" },
    { label: "ROSIER scale video clips (CHSS e-Learning, UK NHS)", href: "https://chsselearning.org.uk/?p=3004" }
  ]
};
