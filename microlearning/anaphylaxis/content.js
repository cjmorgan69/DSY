/* Anaphylaxis - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Sources: SAAS CPP-003-AO Anaphylaxis - AO, version 3.0 (8 December 2016), exported 31.08.2026, plus the related
   procedures CPPRO-008 Medication Checks and CPPRO-011 Intramuscular Injection (including EpiPen auto-injector
   administration), each v1.0, effective 05/07/2017. Nothing clinical here goes beyond those documents. */
var M = window.MODULE = {
  flow: true,                         // open sections that fade in, swipe tiles and quick-check flash cards (see ../README.md)
  draft: false,                       // true shows "coming soon" boxes for empty video/podcast slots
  title: "Anaphylaxis",
  subtitle: "Ambulance Officer microlearning",
  headline: "Recognising anaphylaxis and getting adrenaline in early",
  lead: "Anaphylaxis is a medical emergency that needs immediate treatment. This module covers the AO protocol: which patients get adrenaline, the auto-injector first, the dose when the EOC Clinician advises it, and why every patient goes to hospital.",
  minutes: 20,

  protocol: {
    code: "CPP-003-AO", name: "Anaphylaxis - AO", version: "v3.0 (8 December 2016)", exported: "31 August 2026",
    also: [{ code: "CPPRO-008, 011", name: "Medication Checks, Intramuscular Injection", version: "each v1.0 (5 July 2017)" }]
  },

  session: {
    intro: "For a team-led session. Allow about 25 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the intro video", time: "3 min", text: "Then read the key points together, taking turns to read one box each." },
      { t: "Work the scenarios", time: "8 min", text: "Open the adrenaline checker. For each scenario, decide the answer and the dose as a group before pressing the button, then compare." },
      { t: "Read the related procedures", time: "4 min", text: "The EpiPen steps and the IM injection notes. Pass a trainer device around and talk through each step." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pair up with an auto-injector trainer and work out doses for different weights. Do the rest in your own time." }
    ]
  },

  video: {
    src: "intro.mp4",
    poster: "intro-poster.jpg",
    title: "Anaphylaxis: what AOs need to know"
  },

  intro: [
    "Anaphylaxis is a potentially life threatening severe allergic reaction. It should always be treated as a medical emergency, requiring immediate treatment. In some cases, anaphylaxis is preceded by signs of a mild to moderate allergic reaction.",
    "People who have had a prior episode of anaphylaxis often have a written anaphylaxis action plan, which includes giving prescribed medication including adrenaline (epinephrine) by an auto-injector. If it is readily available, this plan should be followed.",
    "Severe anaphylaxis often presents with hypotension, bronchospasm and angioedema, and is potentially life-threatening. Treatment should focus on basic care including oxygenation, posture and early adrenaline."
  ],

  keyPointsTitle: "Key points",
  keyPoints: [
    { title: "Signs of a severe allergic reaction", items: [
      "Difficult or noisy breathing",
      "Swelling of the tongue",
      "Swelling or tightness in the throat",
      "Difficulty talking and/or a hoarse voice",
      "Wheeze or a persistent cough",
      "Persistent dizziness or collapse",
      "Pale and floppy (in young children)"
    ] },
    { title: "Adrenaline pathway: anaphylaxis suspected AND any one of", tone: "warn", items: [
      "Hypotension",
      "Severe bronchospasm",
      "Severe respiratory distress due to angioedema (airway swelling)"
    ] },
    { title: "What to do", steps: [
      { t: "Basic care and life support", text: "Lay the person flat, unless their breathing is difficult. Do not allow them to stand or walk." },
      { t: "Remove the allergen or trigger if possible" },
      { t: "Request clinical support" },
      { t: "Follow the patient's personal anaphylaxis plan", text: "If it is immediately available." },
      { t: "Use the prescribed adrenaline auto-injector as a priority", text: "For example an EpiPen." },
      { t: "If no auto-injector is available", text: "Consult the EOC Clinician, who may advise IM adrenaline 10 microg/kg (single maximum dose 500 microg), with further doses of adrenaline if required." },
      { t: "Continue basic care" },
      { t: "Provide prompt transport", text: "And notify the receiving facility." }
    ] },
    { title: "Asthma and an allergy", tone: "warn", text: "If someone with known asthma and an allergy to food, insects or medication has sudden breathing difficulty, treat them for anaphylaxis before giving any asthma medication." },
    { title: "Everyone goes to hospital", tone: "no", text: "All patients presenting with allergy and anaphylaxis are to be transported to a health facility, regardless of apparent recovery after treatment." }
  ],

  tool: {
    title: "Adrenaline checker",
    intro: "Answer the questions about your patient and the protocol pathway is shown, with the adrenaline dose worked out from the weight. It follows CPP-003-AO version 3.0.",
    fields: [
      { id: "suspected", type: "yesno", label: "Is anaphylaxis suspected?" },
      { id: "severe", type: "choice", label: "Does the patient have any of these?", options: [
        { value: "none", label: "None of these" },
        { value: "hypotension", label: "Hypotension" },
        { value: "bronchospasm", label: "Severe bronchospasm" },
        { value: "angioedema", label: "Severe respiratory distress due to angioedema (airway swelling)" } ] },
      { id: "injector", type: "choice", label: "Adrenaline auto-injector", options: [
        { value: "yes", label: "The patient's prescribed auto-injector is available" },
        { value: "no", label: "No auto-injector available" } ] },
      { id: "weight", type: "number", label: "Patient weight in kg (if known)", optional: true, step: "0.5", placeholder: "needed for the dose" }
    ],
    evaluate: function (v) {
      var tail = ["Continue basic care", "Provide prompt transport and notify the receiving facility"];
      var allergy = "All patients with allergy or anaphylaxis go to a health facility, regardless of apparent recovery";
      if (!v.suspected) {
        return { tone: "", headline: "Anaphylaxis not suspected", why: ["This pathway is for suspected anaphylaxis"],
          actions: ["Continue assessment and basic care", allergy],
          note: "Signs of a mild to moderate allergic reaction can come before anaphylaxis, so keep watching for the signs of a severe reaction." };
      }
      if (v.severe === "none") {
        return { tone: "warn", headline: "No severe feature yet: keep watching closely",
          why: ["The adrenaline pathway applies when anaphylaxis is suspected AND there is hypotension, severe bronchospasm or severe respiratory distress due to angioedema"],
          actions: ["Basic care", "Watch closely for hypotension, bronchospasm and airway swelling", allergy],
          note: "Training note: if you are unsure whether a feature is severe, ask for clinical support or the EOC Clinician." };
      }
      var first = ["Basic care and life support: lay the person flat unless their breathing is difficult, and do not let them stand or walk",
        "Remove the allergen or trigger if possible", "Request clinical support", "Follow the patient's personal anaphylaxis plan if immediately available"];
      var why = ["Anaphylaxis is suspected", { hypotension: "Hypotension", bronchospasm: "Severe bronchospasm", angioedema: "Severe respiratory distress due to angioedema (airway swelling)" }[v.severe]];
      var note = v.severe === "bronchospasm" ? "If the patient has known asthma and an allergy to food, insects or medication with sudden breathing difficulty, treat for anaphylaxis before giving any asthma medication." : "";
      if (v.injector === "yes") {
        return { tone: "good", headline: "Use the prescribed adrenaline auto-injector now", why: why,
          actions: first.concat(["Use the prescribed adrenaline auto-injector (for example an EpiPen) as a priority"], tail), note: note };
      }
      var w = v.weight > 0 ? v.weight : null, dose = null, capped = false;
      if (w) { dose = Math.round(w * 10 * 10) / 10; if (dose > 500) { dose = 500; capped = true; } }
      var give = dose == null ? "Consult the EOC Clinician, who may advise IM adrenaline 10 microg/kg (single maximum dose 500 microg). Weight is needed to work out the dose"
        : "Consult the EOC Clinician, who may advise IM adrenaline " + dose + " microg (10 microg/kg" + (capped ? ", capped at the single maximum dose of 500 microg" : "") + ")";
      if (dose != null) why.push(w + " kg x 10 microg/kg = " + (Math.round(w * 100) / 10) + " microg" + (capped ? ", so the single maximum dose of 500 microg applies" : ""));
      return { tone: "warn", headline: dose == null ? "Consult the EOC Clinician: IM adrenaline 10 microg/kg" : "Consult the EOC Clinician: IM adrenaline " + dose + " microg may be advised",
        why: why, actions: first.concat([give, "Further doses of adrenaline if required, as advised"], tail),
        note: (note ? note + " " : "") + "The dose is in micrograms. Check the medication and the volume to draw up against your medication reference, and do the medication checks." };
    },
    disclaimer: "Training aid only. Use the current protocol and the EOC Clinician for real patients.",
    scenariosNote: "Examples written for training from the protocol. Decide your answer and the dose before pressing the button.",
    scenarios: [
      { title: "Auto-injector available", text: "Suspected anaphylaxis with hypotension. The patient has their prescribed auto-injector.", values: { suspected: true, severe: "hypotension", injector: "yes" } },
      { title: "Airway swelling, auto-injector available", text: "Severe respiratory distress from swelling of the tongue and throat. The patient has their auto-injector.", values: { suspected: true, severe: "angioedema", injector: "yes" } },
      { title: "Adult, no auto-injector", text: "70 kg adult with severe bronchospasm. No auto-injector.", values: { suspected: true, severe: "bronchospasm", injector: "no", weight: 70 } },
      { title: "Child, no auto-injector", text: "20 kg child with airway swelling. No auto-injector.", values: { suspected: true, severe: "angioedema", injector: "no", weight: 20 } },
      { title: "Small child", text: "12 kg child with hypotension. No auto-injector.", values: { suspected: true, severe: "hypotension", injector: "no", weight: 12 } },
      { title: "Exactly 50 kg", text: "50 kg patient with hypotension. No auto-injector.", values: { suspected: true, severe: "hypotension", injector: "no", weight: 50 } },
      { title: "Weight not known", text: "Hypotension. No auto-injector, and the weight is not known yet.", values: { suspected: true, severe: "hypotension", injector: "no" } },
      { title: "Asthma and a food allergy", text: "Known asthma and a peanut allergy, sudden breathing difficulty with severe bronchospasm. No auto-injector. About 60 kg.", values: { suspected: true, severe: "bronchospasm", injector: "no", weight: 60 } },
      { title: "Hives only", text: "Suspected allergic reaction with a rash, but none of the severe features.", values: { suspected: true, severe: "none", injector: "no" } },
      { title: "Not anaphylaxis", text: "Anaphylaxis is not suspected.", values: { suspected: false, severe: "none", injector: "no" } }
    ]
  },

  referenceTitle: "Doses and related procedures",
  reference: [
    { title: "IM adrenaline by weight (10 microg/kg, single maximum 500 microg)", table: { head: ["Weight", "Dose"], rows: [
      ["10 kg", "100 microg"], ["15 kg", "150 microg"], ["20 kg", "200 microg"], ["25 kg", "250 microg"],
      ["30 kg", "300 microg"], ["40 kg", "400 microg"], ["50 kg", "500 microg"], ["60 kg or more", "500 microg (maximum)"]
    ] }, text: "Worked from the protocol's formula. The EOC Clinician advises the dose; the protocol does not give the concentration or the volume, so use your medication reference and do the medication checks." },
    { title: "EpiPen auto-injector steps (CPPRO-011)", items: [
      "Hand hygiene, then complete the pre-administration medication checks; where possible explain and gain consent",
      "The preferred site is the mid anterior-lateral thigh (vastus lateralis). Expose the thigh if possible, but the EpiPen can be given through clothing if required",
      "Remove the auto-injector from its outer plastic container, form a fist around the barrel and remove the blue cap. Do not touch either end with your fingers or thumb",
      "Push the orange end firmly against the thigh until a click is heard, then hold it in place for 10 or more seconds",
      "Remove the EpiPen into a sharps container, gently massage the site for 10 seconds, and record the dose and time",
      "An expired or discoloured EpiPen should still be given in a life-threatening situation if there is no alternative; tell the receiving team and record it"
    ] },
    { title: "IM injection (CPPRO-011)", items: [
      "The mid anterior-lateral thigh (vastus lateralis) is the preferred site in adults and children, for up to 5 mL",
      "There is no need to draw back on the plunger for the thigh or the deltoid",
      "Prepare an IM injection as a single dose only",
      "Pierce the skin quickly and firmly at 90 degrees to about two thirds of the needle length, then inject the full dose slowly",
      "Do not recap the needle, and put it straight into a sharps container"
    ] },
    { title: "Medication checks (CPPRO-008)", items: [
      "Check a medication before preparing it, before giving it, and after giving it",
      "Two clinicians check whenever possible; single responders take extra care",
      "The check identifies the medication and its integrity, the expiry date, and the intended dose",
      "A medication given outside protocols must be authorised by the EOC Clinician, and the medication, dose and route are repeated back"
    ] }
  ],
  links: [
    { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
    { label: "CPPRO-011 IM Injection and EpiPen (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-011%20Intramuscular%20Injection.pdf" },
    { label: "CPPRO-008 Medication Checks (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-008%20Medication%20Checks.pdf" }
  ],

  quiz: [
    { q: "How does the protocol describe anaphylaxis?", options: ["A mild allergic reaction", "A potentially life threatening severe allergic reaction", "Always a reaction to food"], answer: 1,
      why: "Anaphylaxis is a potentially life threatening severe allergic reaction and should always be treated as a medical emergency." },
    { q: "When does the adrenaline pathway apply?", options: [
        "Whenever a patient has a rash",
        "Anaphylaxis is suspected AND the patient has hypotension, severe bronchospasm or severe respiratory distress due to angioedema",
        "Only when the patient has collapsed" ], answer: 1,
      why: "Any one of the three features, together with suspected anaphylaxis, starts the pathway." },
    { q: "How should the patient be positioned?", options: ["Standing, to help breathing", "Walking around to stay alert", "Laid flat, unless their breathing is difficult"], answer: 2,
      why: "Lay the person flat unless their breathing is difficult. Do not allow them to stand or walk." },
    { q: "What is the priority for adrenaline when the patient has a prescribed auto-injector available?", options: [
        "Wait for the EOC Clinician before using it",
        "Use the prescribed adrenaline auto-injector as a priority",
        "Draw up IM adrenaline instead" ], answer: 1,
      why: "Use the prescribed adrenaline auto-injector (for example an EpiPen) as a priority." },
    { q: "There is no auto-injector. What does the protocol say?", options: [
        "Give oral antihistamine only",
        "Consult the EOC Clinician, who may advise IM adrenaline 10 microg/kg",
        "Transport without treatment" ], answer: 1,
      why: "If an auto-injector is unavailable, consult the EOC Clinician, who may advise IM adrenaline 10 microg/kg, with further doses if required." },
    { q: "What is the single maximum dose of IM adrenaline?", options: ["250 microg", "500 microg", "1000 microg"], answer: 1,
      why: "The single maximum dose is 500 microg." },
    { q: "A child weighs 20 kg. What IM adrenaline dose may the EOC Clinician advise?", options: ["20 microg", "200 microg", "500 microg"], answer: 1,
      why: "10 microg/kg x 20 kg = 200 microg." },
    { q: "An adult weighs 80 kg. What single dose applies?", options: ["800 microg", "500 microg", "250 microg"], answer: 1,
      why: "10 microg/kg would be 800 microg, but the single maximum dose is 500 microg." },
    { q: "A patient with known asthma and a food allergy has sudden breathing difficulty. What comes first?", options: [
        "An asthma reliever",
        "Treat for anaphylaxis before giving any asthma medication",
        "Wait to see if it settles" ], answer: 1,
      why: "The protocol says to treat for anaphylaxis prior to administering any asthma medication." },
    { q: "The patient seems fully recovered after treatment. What now?", options: [
        "Leave them at the scene",
        "Transport to a health facility regardless of apparent recovery",
        "Transport only if symptoms return" ], answer: 1,
      why: "All patients presenting with allergy and anaphylaxis are transported to a health facility regardless of apparent recovery." },
    { q: "How long is an EpiPen held against the thigh after the click?", options: ["3 seconds", "5 seconds", "10 or more seconds"], answer: 2,
      why: "CPPRO-011: push the orange end firmly against the thigh until a click is heard, then hold in place for 10 or more seconds." },
    { q: "Which is the preferred IM injection site in SAAS?", options: ["Deltoid", "Mid anterior-lateral thigh (vastus lateralis)", "Gluteal muscle"], answer: 1,
      why: "CPPRO-011: the mid anterior-lateral thigh is the preferred site in adults and children." }
  ],

  practical: {
    title: "Practical: auto-injector trainer, doses and the call",
    intro: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity.",
    equipment: ["An auto-injector trainer device (never a real one)", "A calculator", "Your station's medication check reference"],
    steps: [
      { t: "Name the signs", text: "Take turns describing a patient. Your partner says whether anaphylaxis is suspected, and which severe feature, if any, is present." },
      { t: "Use the trainer", text: "Run through the EpiPen steps in CPPRO-011 on a trainer: blue cap off, orange end firmly to the mid thigh, click, hold for 10 seconds or more, massage for 10 seconds, and say what you would record." },
      { t: "Work out the doses", text: "Out loud, work out the IM adrenaline dose for 15 kg, 28 kg and 65 kg using 10 microg/kg with a 500 microg maximum." },
      { t: "Make the call", text: "Role-play the call to the EOC Clinician: age, weight, signs, what has been given, and the dose you expect to be advised." }
    ],
    good: ["The severe feature named, and the patient laid flat", "The auto-injector used first when it is available", "Doses worked out correctly, with the maximum applied", "The EOC Clinician's advice repeated back"],
    note: "Suggested activities written for training. Check them with your lead instructor."
  },

  furtherVideo: {
    src: "https://www.youtube.com/embed/sX97LcDpgzo",
    title: "Anaphylactic shock (Khan Academy)",
    note: "Optional video from Khan Academy's medicine channel: \"Anaphylactic shock\" (about 8.5 minutes, from its NCLEX-RN series). It is a US nursing-exam video made around ten years ago and explains how anaphylactic shock develops. I have not been able to check its content against CPP-003-AO, so where it differs from the protocol, follow the protocol."
  },

  podcast: {
    title: "The Resus Room: Reframing Anaphylaxis",
    summary: "The Resus Room is a UK emergency medicine podcast. Its \"Reframing Anaphylaxis; Roadside to Resus\" episode (May 2026, about 45 minutes) looks at new UK evidence suggesting fatal food-triggered anaphylaxis may be more of a respiratory catastrophe than a circulatory one, while early adrenaline remains the cornerstone of treatment. Optional listening. It reflects UK guidance, so where it differs from CPP-003-AO, follow the protocol.",
    link: "https://theresusroom.libsyn.com/reframing-anaphylaxis-roadside-to-resus",
    linkLabel: "Open the Resus Room episode"
  },
  furtherLinks: [
    { label: "Khan Academy: What is shock? (about 7 minutes)", href: "https://www.youtube.com/watch?v=AvtS_IrlbYk" },
    { label: "The Resus Room: Anaphylaxis; Roadside to Resus (2020)", href: "https://theresusroom.libsyn.com/anaphylaxis-roadside-to-resus" },
    { label: "The Resus Room: Angioedema (2019)", href: "https://theresusroom.libsyn.com/angioedema" }
  ]
};

/* Layout: the same content as the shorthand keys above, arranged for scrolling on a phone. */
M.panels = [
  { title: "Introduction", blocks: [{ video: M.video }].concat(M.intro.map(function (t) { return { text: t }; })) },
  { title: "Recognise it", blocks: [
    { box: M.keyPoints[0] }
  ] },
  { title: "When to give adrenaline", blocks: [
    { box: M.keyPoints[1] },
    { text: "Any one of these, together with suspected anaphylaxis, starts the adrenaline pathway." },
    { cards: { quick: true, items: [
      { q: "Anaphylaxis is suspected and the patient has severe bronchospasm, but normal blood pressure. Adrenaline pathway?", a: "Yes. Any one of hypotension, severe bronchospasm or severe respiratory distress due to angioedema is enough." }
    ] } }
  ] },
  { title: "What to do", blocks: [
    { steps: M.keyPoints[2].steps },
    { box: M.keyPoints[3] },
    { box: M.keyPoints[4] }
  ] },
  { title: "Using an EpiPen", blocks: [
    { tiles: { title: "Auto-injector steps (CPPRO-011)", numbered: true, items: [
      { title: "Prepare", text: "Hand hygiene and the medication checks. Explain and gain consent where possible." },
      { title: "Choose the site", text: "Mid anterior-lateral thigh. It can be given through clothing if required." },
      { title: "Cap off", text: "Remove it from the outer container, form a fist around the barrel and remove the blue cap. Do not touch either end." },
      { title: "Inject", text: "Push the orange end firmly against the thigh until it clicks, and hold it there for 10 or more seconds." },
      { title: "After", text: "Remove it into a sharps container, gently massage the site for 10 seconds, and record the dose and time." },
      { title: "Expired or discoloured", text: "Still give it in a life-threatening situation if there is no alternative; tell the receiving team and record it." }
    ] } },
    { cards: { quick: true, items: [
      { q: "How long do you hold the EpiPen against the thigh?", a: "10 or more seconds after the click, then gently massage the site for 10 seconds." }
    ] } }
  ] },
  { title: M.tool.title, blocks: [
    { tool: M.tool },
    { cards: { quick: true, items: [
      { q: "A 20 kg child is advised IM adrenaline. What dose?", a: "200 microg (10 microg x 20 kg). From 50 kg up, the single dose is capped at 500 microg." }
    ] } }
  ] },
  { title: M.referenceTitle, collapsed: true, blocks: M.reference.map(function (r) { return { table: r }; }).concat([{ links: M.links }]) },
  { title: "Knowledge check", blocks: [{ quiz: { questions: M.quiz } }] },
  { title: M.practical.title || "Practical", optional: true, collapsed: true, chip: "Optional", blocks: [
    { text: M.practical.intro }, { box: { title: "What you need", items: M.practical.equipment } },
    { steps: M.practical.steps }, { box: { title: "What good looks like", items: M.practical.good } }
  ].concat(M.practical.note ? [{ note: M.practical.note }] : []) },
  { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
    { text: M.furtherVideo.note, muted: true }, { video: M.furtherVideo },
    { text: M.podcast.summary }, { audio: M.podcast }, { links: M.furtherLinks }
  ] }
];
