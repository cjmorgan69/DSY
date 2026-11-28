/* Seizures - AO microlearning, with an Ambulance Responder version (?scope=ar). Content only: the layout lives in
   ../shared/module.js. Sources: SAAS CPP-014-AO Seizures - AO v5.0 (3 December 2024) and CPP-037-AR Seizures - AR v2.1
   (2 December 2024), both exported 31.08.2026; CPPRO-025 Nasopharyngeal Airway (NPA) v1.0 (effective 8 July 2019, review
   date 2022, now passed); CPPRO-011 Intramuscular Injection v1.0 (5 July 2017); CPP-009-AO Hypoglycaemia. The midazolam
   presentation (5 mg/5 mL = 1 mg/mL), the "total max 0.3 mg/kg" and "repeat as directed by the EOC Clinician" come from
   the SAAS Clinical app's medicine data (DMO-022, AO: Consult). Owner (22 Nov 2026): AOs may use Co-Phenylcaine Forte to
   insert an NPA. Built 28 Nov 2026 as the first topic made AO and AR from the start. Nothing clinical here goes beyond
   those documents. */
window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Seizures",
  subtitle: "Ambulance Officer microlearning",
  headline: "Protecting the patient, the five-minute line, and IM midazolam on EOC Clinician advice",
  lead: "A seizure is a sign of abnormal brain activity, with many possible causes. This module covers the AO protocol: basic care and the treatable causes, keeping the patient safe without restraint, when to consult the EOC Clinician, IM midazolam, the airway, and where to take them.",
  minutes: 20,

  protocol: {
    code: "CPP-014-AO", name: "Seizures - AO", version: "v5.0 (3 December 2024)", exported: "31 August 2026",
    also: [{ code: "CPPRO-025, 011", name: "Nasopharyngeal Airway, Intramuscular Injection", version: "v1.0 (8 July 2019, review date 2022) and v1.0 (5 July 2017)" }]
  },
  footerNotes: ["The midazolam presentation (1 mg/mL) and its total maximum (0.3 mg/kg) come from the SAAS Clinical app. CPPRO-025 is past its review date (2022): check the SAAS Clinical app for any newer version."],

  session: {
    intro: "For a team-led session. Allow about 25 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the intro video", time: "3 min", text: "Then read the key points together, taking turns to read one box each." },
      { t: "Work the scenarios", time: "8 min", text: "Open the seizure checker. Decide the answer as a group before pressing the button, then compare. Watch the cases at exactly 5 minutes and at 65 years." },
      { t: "The airway", time: "4 min", text: "Read the NPA tiles. Who has inserted an NPA, and what made it easier?" },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pairs: time a seizure out loud, work out a midazolam dose and volume, and make the call." }
    ]
  },

  video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Seizures: what AOs need to know" },

  intro: [
    "A seizure is a sign of abnormal brain activity, which can be caused by many different conditions. Generalised seizures usually involve the entire body and cause a loss or marked alteration in consciousness. Some generalised seizures cause life-threatening problems with the airway or breathing.",
    "Generalised seizures should be controlled as soon as possible when there is a risk of physical injury, or of hypoxia from a prolonged or repeated seizure. This may mean urgent transport to a medical facility.",
    "Other treatable causes should be attended to as soon as practicable: hypoglycaemia, hypoxia, head trauma or hyperthermia. Febrile convulsions come with a fever and usually resolve without treatment. They occur mostly in children between six months and six years."
  ],

  keyPointsTitle: "Key points",
  keyPoints: [
    { title: "Every seizure: basic care first", check: { q: "The patient is seizing and the SpO2 reads 91%. What does the protocol say?", a: "Hypoxia (SpO2 below 94%): treat with supplemental oxygen." }, steps: [
      { t: "Basic care and life support" },
      { t: "BGL", text: "Treat hypoglycaemia as per CPP-009-AO." },
      { t: "Hypoxia (SpO2 below 94%)", text: "Treat with supplemental oxygen." },
      { t: "Temperature", text: "For febrile children, remove outer clothing." },
      { t: "Don't restrain", text: "Not if possible, other than to keep the patient safe." },
      { t: "Request clinical support" }
    ] },
    { scope: "ao", title: "Consult the EOC Clinician if", tone: "warn", check: { q: "A generalised seizure has gone on for exactly 5 minutes. Has the line been crossed?", a: "Not yet: the protocol says continuous for more than 5 minutes. Time it from when it started, and be ready to call." }, items: [
      "A generalised seizure is continuous for more than 5 minutes, or",
      "Clusters of shorter seizures with little or no recovery in between, preventing effective breathing or causing harm (injury or hypoxia)"
    ], note: "Start timing from when the seizure began: ask the people who saw it." },
    { scope: "ao", title: "IM midazolam: only on EOC Clinician advice", steps: [
      { t: "The dose", text: "0.15 mg/kg, to a single maximum dose of 10 mg." },
      { t: "65 or older, or a frail adult under 40 kg", text: "Half the per kg dose, up to a maximum of 5 mg." },
      { t: "The volume", text: "SAAS midazolam is 5 mg in 5 mL (1 mg/mL, SAAS Clinical app). No more than 5 mL in one injection site, so 10 mg goes into two sites." },
      { t: "Safety", text: "Make sure the crew and the patient are safe while you give an IM injection to someone who is seizing." },
      { t: "Further doses", text: "Only if the EOC Clinician advises them (app: total maximum 0.3 mg/kg)." }
    ], note: "The adverse effects of midazolam are made worse by hypoxia, hypovolaemia, extremes of age, and other CNS depressants such as alcohol." },
    { scope: "ao", title: "Then: the airway", tone: "no", items: [
      "Prepare for respiratory depression and loss of airway control",
      "Consider a nasopharyngeal airway if the patient has trismus (a clenched jaw)",
      "If they become unresponsive and are not breathing normally, start CPR"
    ] },
    { scope: "ao", title: "Where to go", items: [
      "Follow the patient's seizure management plan, if they have one",
      "Transport to the geographically closest ED, and give early notification"
    ] },
    { title: "Nasopharyngeal airway (CPPRO-025)", scope: "ao", tiles: true, steps: [
      { t: "When", text: "Airway compromise in an adult where an oral airway is unsuitable or can't be placed: an intact gag reflex, trismus or oral trauma. Avoid it with a suspected base of skull fracture unless it's essential to oxygenate or ventilate." },
      { t: "Size", text: "Measure from the tip of the nose to the tip of the earlobe. Diameter slightly smaller than the nostril (SAAS: 6, 7 and 8 mm)." },
      { t: "Numb it", text: "Co-Phenylcaine Forte, 3 to 5 sprays per nostril. Allow 1 to 2 minutes if you can." },
      { t: "Lubricate", text: "Water-based lubricant on the outside of the NPA. Head in the neutral position." },
      { t: "Insert", text: "Bevel towards the septum. Advance gently along the floor of the nose. If you meet resistance, twist slightly, never force. Won't go? Try the other nostril." },
      { t: "Check and record", text: "Flange resting against the nostril. Patency is confirmed by being able to oxygenate or ventilate. Record the size and time." }
    ] },

    /* ---------- Ambulance Responder key points (CPP-037-AR) ---------- */
    { scope: "ar", title: "Unconscious and actively seizing", tone: "warn", check: { q: "As an AR, can you give midazolam for a prolonged seizure?", a: "No. Midazolam is not in the AR protocol. Protect the patient, keep the airway open, and consult the EOC Clinician regarding treatment and transport." }, steps: [
      { t: "Follow their seizure management plan", text: "If one is available." },
      { t: "Remove the patient from danger" },
      { t: "Remove harmful objects", text: "Anything that might cause a secondary injury." },
      { t: "Protect the head" },
      { t: "Restrain only if essential", text: "To avoid injury." },
      { t: "On their side", text: "When practical. Maintain an open and clear airway." }
    ] },
    { scope: "ar", title: "Consult the EOC Clinician", items: [
      "Regarding treatment and transport",
      "They may advise: transport and cancel clinical support; transport and RV with clinical support en route; or monitoring until clinical support arrives"
    ], note: "Airway adjuncts at AR level are suction and an oropharyngeal airway (CPP-025-AR). The NPA and IM midazolam are AO skills." }
  ],

  tool: {
    check: { q: "An 80 kg adult under 65, seizing for 8 minutes. If the EOC Clinician advises midazolam, how much, and into how many sites?", a: "0.15 mg/kg is 12 mg, so the single maximum of 10 mg applies: 10 mL at 1 mg/mL, in two sites (no more than 5 mL each)." },
    title: "Seizure checker",
    intro: "Answer the questions about your patient to see what CPP-014-AO says, and the midazolam dose the EOC Clinician may advise. It follows CPP-014-AO version 5.0.",
    fields: [
      { id: "seizing", type: "choice", label: "What is happening now?", options: [
        { value: "over5", label: "A generalised seizure, continuous for more than 5 minutes" },
        { value: "under5", label: "A generalised seizure, 5 minutes or less so far" },
        { value: "clusters", label: "Clusters of shorter seizures, little or no recovery in between" },
        { value: "stopped", label: "The seizure has stopped" } ] },
      { scope: "ao", id: "harm", type: "yesno", label: "Clusters only: are they preventing effective breathing, or causing harm (injury or hypoxia)?", optional: true },
      { scope: "ao", id: "group", type: "choice", label: "Who is the patient?", options: [
        { value: "adult", label: "Adult under 65" },
        { value: "older", label: "Adult 65 or older" },
        { value: "frail", label: "Frail adult under 40 kg" },
        { value: "child", label: "Child" } ] },
      { scope: "ao", id: "kg", type: "number", label: "Weight (kg)", step: "1", placeholder: "e.g. 80" }
    ],
    evaluate: function (v) {
      var AR = window.MODULE_SCOPE === "ar";
      var basic = "Basic care: BGL (treat hypoglycaemia), oxygen if SpO2 is below 94%, temperature (remove outer clothing for a febrile child), no restraint other than for safety, request clinical support";
      var cpr = "If at any point the patient becomes unresponsive and is not breathing normally, commence CPR.";
      if (AR) {
        var arActs = [basic, "Actively seizing: follow their seizure management plan, remove them from danger and remove harmful objects, protect the head, restrain only if essential, on their side when practical, keep the airway open and clear",
          "Consult the EOC Clinician regarding treatment and transport: they may advise transport and cancel clinical support, transport and RV with clinical support en route, or monitoring until clinical support arrives"];
        if (v.seizing === "stopped") return { tone: "good", headline: "Seizure stopped: basic care and the consult", why: ["The patient is no longer seizing"],
          actions: [basic, "On their side, airway open and clear, watch the breathing", arActs[2]], note: cpr };
        return { tone: "warn", headline: "Protect, airway, and consult the EOC Clinician", why: ["Midazolam is not in the AR protocol (CPP-037-AR)"], actions: arActs, note: cpr };
      }
      var consult = v.seizing === "over5" || (v.seizing === "clusters" && v.harm);
      if (v.seizing === "stopped") return { tone: "good", headline: "Seizure stopped: basic care, airway, transport", why: ["The patient is no longer seizing"],
        actions: [basic, "Prepare for respiratory depression and loss of airway control; consider an NPA if there is trismus", "Follow the patient's seizure management plan if there is one", "Transport to the geographically closest ED and give early notification"], note: cpr };
      if (!consult) {
        var why = v.seizing === "under5" ? ["The seizure has not yet been continuous for more than 5 minutes"] : ["Clusters, but not preventing effective breathing or causing harm"];
        return { tone: "warn", headline: "Not yet at the consult criteria: protect, time it, be ready", why: why,
          actions: [basic, "Keep timing from when it started", "Consult the EOC Clinician as soon as it is continuous for more than 5 minutes, or clusters prevent effective breathing or cause harm", "Prepare for respiratory depression and loss of airway control"], note: cpr };
      }
      var kg = +v.kg, half = v.group === "older" || v.group === "frail";
      var why2 = [v.seizing === "over5" ? "A generalised seizure continuous for more than 5 minutes" : "Clusters with little or no recovery, preventing effective breathing or causing harm"];
      var acts = [basic, "Consult the EOC Clinician, who may advise IM midazolam"];
      var alerts = [];
      if (v.group === "frail" && kg >= 40) alerts.push("The protocol's half dose is for frail adults under 40 kg. Check the weight, and say both to the EOC Clinician.");
      if (kg > 0) {
        var perKg = half ? 0.075 : 0.15, cap = half ? 5 : 10;
        var raw = Math.round(perKg * kg * 10) / 10, dose = Math.min(raw, cap), sites = Math.ceil(dose / 5);
        acts.push("If advised: midazolam " + dose + " mg IM (" + perKg + " mg/kg" + (raw > cap ? ", capped at the " + cap + " mg maximum" : "") + "): " + dose + " mL of 1 mg/mL" + (sites > 1 ? ", split between " + sites + " injection sites (no more than 5 mL each)" : ", one injection site"));
        if (v.group === "child") alerts.push("For children, check the dose against the SAAS Clinical app's table by age and weight before you draw it up.");
      } else acts.push("Enter the weight to see the dose and volume");
      acts = acts.concat(["Keep the crew and the patient safe during the IM injection", "Further doses only as the EOC Clinician advises (app: total maximum 0.3 mg/kg)",
        "Prepare for respiratory depression and loss of airway control; consider an NPA if there is trismus",
        "Transport to the geographically closest ED and give early notification"]);
      return { tone: "warn", headline: "Consult the EOC Clinician: midazolam may be advised", alerts: alerts, why: why2, actions: acts,
        note: (half ? "Half the per kg dose, up to a maximum of 5 mg, for patients 65 or older and frail adults under 40 kg. " : "") + "Midazolam's adverse effects are made worse by hypoxia, hypovolaemia, extremes of age and other CNS depressants such as alcohol. " + cpr };
    },
    disclaimer: "Training aid only. Use the current protocol, the SAAS Clinical app and the EOC Clinician for real patients.",
    scenariosNote: "Examples written for training from the protocol. Decide your answer before pressing the button.",
    scenarios: [
      { title: "Eight minutes, 80 kg", text: "Adult, 27, known epilepsy, generalised seizure for 8 minutes, about 80 kg.", values: { seizing: "over5", group: "adult", kg: 80 } },
      { title: "Exactly five minutes", text: "Adult, 40, generalised seizure for exactly 5 minutes so far, 70 kg.", values: { seizing: "under5", group: "adult", kg: 70 } },
      { title: "Clusters, can't breathe well", text: "Adult, 52, three seizures in 15 minutes without waking in between, SpO2 falling, 90 kg.", values: { seizing: "clusters", harm: true, group: "adult", kg: 90 } },
      { title: "Clusters, breathing well", text: "Adult, 33, two short seizures, waking a little between them, breathing well, no injury.", values: { seizing: "clusters", harm: false, group: "adult", kg: 75 } },
      { title: "Aged 72", text: "72 years, 85 kg, generalised seizure for 7 minutes.", values: { seizing: "over5", group: "older", kg: 85 } },
      { title: "Frail, 38 kg", text: "Frail adult, 38 kg, generalised seizure for 10 minutes.", values: { seizing: "over5", group: "frail", kg: 38 } },
      { title: "A child, 20 kg", text: "Child, 6, generalised seizure for 6 minutes, about 20 kg.", values: { seizing: "over5", group: "child", kg: 20 } },
      { title: "It has stopped", text: "Adult, 27, the seizure stopped before you arrived. Drowsy, breathing.", values: { seizing: "stopped", group: "adult", kg: 80 } }
    ]
  },

  referenceTitle: "Midazolam, the airway and related procedures",
  reference: [
    { scope: "ao", title: "IM midazolam at a glance (CPP-014-AO and the SAAS Clinical app)", table: { head: ["Patient", "Dose", "Single maximum"], rows: [
      ["Adult under 65, and children", "0.15 mg/kg", "10 mg"],
      ["65 or older, or a frail adult under 40 kg", "Half the per kg dose (0.075 mg/kg)", "5 mg"],
      ["Presentation", "5 mg in 5 mL (1 mg/mL), given undiluted", "No more than 5 mL per injection site"],
      ["Further doses", "Only as the EOC Clinician advises", "App: total maximum 0.3 mg/kg"]
    ] }, text: "Documents differ: the SAAS Clinical app's formula for 65 and older reads \"0.075 mg/kg to single max 10 mg\", but its own dose table stops at 5 mg and CPP-014-AO says \"up to max 5 mg\". Follow the protocol: 5 mg." },
    { scope: "ao", title: "Intramuscular injection (CPPRO-011)", items: [
      "Complete the medication checks, cross-checked with a second clinician wherever possible; check allergies",
      "The mid anterior-lateral thigh (vastus lateralis) is the preferred site, up to 5 mL, in adults and children",
      "Clean with an alcohol swab and let it dry; 90 degrees, about two thirds of the needle; inject slowly; no need to aspirate",
      "Withdraw quickly, straight into the sharps container: never recap or pass a needle",
      "Record the dose and time. If it was given under another clinician's authority, they sign for it"
    ] },
    { title: "Treatable causes and special cases (CPP-014-AO)", items: [
      "Hypoglycaemia: check the BGL and treat as per the hypoglycaemia protocol",
      "Hypoxia: SpO2 below 94%, supplemental oxygen",
      "Head trauma and hyperthermia: attend to them as soon as practicable",
      "Febrile convulsions: with a fever, mostly in children from six months to six years, and they usually resolve without treatment"
    ] }
  ],
  links: [
    { label: "SAAS Clinical app (midazolam calculator)", href: "https://clinical.saambulance.sa.gov.au" },
    { scope: "ao", label: "CPPRO-025 Nasopharyngeal Airway (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-025%20Nasopharyngeal%20Airway%20(NPA).pdf" },
    { scope: "ao", label: "CPPRO-011 Intramuscular Injection (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-011%20Intramuscular%20Injection.pdf" },
    { label: "Hypoglycaemia module", href: "../hypoglycaemia/" }
  ],

  quiz: [
    { q: "What is a seizure, in the protocol's words?", options: ["Always a sign of epilepsy", "A sign of abnormal brain activity, which can be caused by many different conditions", "A faint"], answer: 1,
      why: "A seizure is a sign of abnormal brain activity, which can be caused by many different conditions." },
    { q: "Which check is part of basic care for every seizure?", options: ["BGL", "A 12-lead ECG", "A urine test"], answer: 0,
      why: "Basic care and life support includes the BGL: treat hypoglycaemia as per the hypoglycaemia protocol." },
    { q: "The SpO2 is 92% during the seizure. What do you do?", options: ["Nothing until it stops", "Supplemental oxygen", "IPPV straight away"], answer: 1,
      why: "Hypoxia (SpO2 below 94%): treat with supplemental oxygen." },
    { q: "A febrile 3 year old has had a short seizure. What does the protocol say about temperature?", options: ["Ice packs", "Remove outer clothing", "Wrap them up warmly"], answer: 1,
      why: "Temperature: for febrile paediatric patients, remove outer clothing." },
    { q: "Should you hold a seizing patient's limbs still?", options: ["Yes, firmly", "Not if possible, other than to keep them safe", "Only the legs"], answer: 1,
      why: "Do not restrain the patient if possible, other than to ensure safety." },
    { scope: "ao", q: "When do you consult the EOC Clinician?", options: [
        "Any seizure longer than 1 minute",
        "A generalised seizure continuous for more than 5 minutes, or clusters with little or no recovery that prevent effective breathing or cause harm",
        "Only if the patient has no seizure plan" ], answer: 1,
      why: "CPP-014-AO: consult if generalised seizures are continuous for more than 5 minutes, or clusters of shorter seizures with little or no recovery in between are preventing effective breathing or causing harm (injury or hypoxia)." },
    { scope: "ao", q: "What IM midazolam dose may the EOC Clinician advise for an adult under 65?", options: ["0.05 mg/kg, max 5 mg", "0.15 mg/kg to a single maximum of 10 mg", "10 mg for everyone"], answer: 1,
      why: "IM midazolam 0.15 mg/kg to a single maximum dose of 10 mg." },
    { scope: "ao", q: "A 70 year old weighing 80 kg. What changes?", options: ["Nothing", "Half the per kg dose, up to a maximum of 5 mg", "Double the dose"], answer: 1,
      why: "Half the per kg dose (up to max 5 mg) if 65 years or older, or frail adults under 40 kg." },
    { scope: "ao", q: "The dose is 10 mg of 1 mg/mL midazolam. How is it given?", options: ["10 mL into one thigh", "Split between two injection sites, no more than 5 mL each", "Into the deltoid"], answer: 1,
      why: "5 mL maximum volume per injection site (CPP-014-AO). The thigh (vastus lateralis) is the preferred IM site, up to 5 mL (CPPRO-011)." },
    { scope: "ao", q: "Which of these makes midazolam's adverse effects worse?", options: ["Alcohol", "A full stomach", "Being under 65"], answer: 0,
      why: "The adverse effects of midazolam are potentiated by hypoxia, hypovolaemia, extremes of age, and other CNS depressants such as alcohol." },
    { scope: "ao", q: "After midazolam the patient has a clenched jaw and a noisy airway. What may help?", options: ["An oropharyngeal airway, forced in", "A nasopharyngeal airway", "Nothing: wait"], answer: 1,
      why: "Prepare for respiratory depression and loss of airway control. Consider a nasopharyngeal airway if there is trismus." },
    { scope: "ao", q: "Where does CPP-014-AO say to transport?", options: ["The hospital the patient prefers", "The geographically closest ED, with early notification", "A neurology centre"], answer: 1,
      why: "Transport to the geographically closest ED and provide early notification. Follow the patient's seizure management plan if applicable." },
    { scope: "ao", q: "How do you size an NPA?", options: ["Corner of the mouth to the angle of the jaw", "Tip of the nose to the tip of the earlobe", "By the patient's age"], answer: 1,
      why: "CPPRO-025: measure from the tip of the patient's nose to the tip of their earlobe." },
    { scope: "ar", q: "As an AR, what may you give for a prolonged seizure?", options: ["IM midazolam on EOC Clinician advice", "No anticonvulsant: protect, keep the airway open and consult the EOC Clinician", "Oral glucose for everyone"], answer: 1,
      why: "CPP-037-AR has no midazolam. If the patient is unconscious and actively seizing: follow their seizure plan, remove them from danger and harmful objects, protect the head, restrain only if essential, on their side when practical, and maintain an open and clear airway." },
    { scope: "ar", q: "When does CPP-037-AR ask you to consult the EOC Clinician?", options: ["Only if the seizure lasts more than 5 minutes", "Regarding treatment and transport, for every seizure patient", "Never"], answer: 1,
      why: "CPP-037-AR: consult the EOC Clinician regarding treatment and transport, who may advise transport and cancel clinical support, transport and RV with clinical support en route, or monitoring until clinical support arrives." },
    { scope: "ar", q: "The patient is unconscious and actively seizing. Where do you put them?", options: ["Flat on their back", "On their side when practical, with the airway open and clear", "Sitting up"], answer: 1,
      why: "CPP-037-AR: lay the patient on their side when practical, and maintain an open and clear airway." },
    { scope: "ar", q: "Which airway adjuncts are at AR level?", options: ["Suction and an oropharyngeal airway", "A nasopharyngeal airway and an i-gel", "None"], answer: 0,
      why: "CPP-025-AR Basic Care: airway adjuncts are suction and an oropharyngeal airway. The NPA is an AO skill (CPPRO-025)." },
    { q: "If the patient becomes unresponsive and is not breathing normally, what do you do?", options: ["Wait for the seizure to stop", "Commence CPR", "Give oral glucose"], answer: 1,
      why: "Basic care and life support: an unresponsive patient who is not breathing normally needs CPR." }
  ],

  practical: {
    title: "Practical: timing, the dose and the call",
    intro: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity.",
    equipment: ["A watch or the monitor clock", "The SAAS Clinical app", "A training NPA and lubricant, and a manikin head if you have one (AO)", "A notepad"],
    steps: [
      { t: "Time it", text: "Your partner describes a seizure as it happens. Say the start time out loud and call the 5-minute line." },
      { t: "Protect", text: "Talk through clearing the space, protecting the head and getting them on their side when practical, without restraint." },
      { t: "The dose (AO)", text: "Work out a midazolam dose and volume for 55 kg, 80 kg and a 70 year old of 70 kg. Check each against the app.", scope: "ao" },
      { t: "Size an NPA (AO)", text: "Size a training NPA on your partner (nose tip to earlobe) and talk through the insertion on a manikin. Never insert one into a person.", scope: "ao" },
      { t: "Make the call", text: "Role-play the EOC Clinician call: start time, how long, what's been done, BGL, SpO2, weight and age, and what you're asking." }
    ],
    good: ["Start time stated, and the 5-minute line called", "No restraint other than for safety", "Dose and volume right, with the site split for more than 5 mL (AO)", "The call has the times, the BGL and the weight"],
    note: "Suggested activities written for training. Never give a medicine or insert an airway on a person. Check them with your lead instructor."
  },

  podcast: {
    title: "The Resus Room: Seizures; Roadside to Resus",
    summary: "The Resus Room is a UK emergency medicine podcast. Its \"Seizures; Roadside to Resus\" episode (January 2020, about 64 minutes) follows the seizing patient from the roadside to the emergency department. Optional listening. It reflects UK practice from 2020, so where it differs from the SAAS protocol, follow the protocol.",
    link: "https://theresusroom.libsyn.com/seizures-roadside-to-resus",
    linkLabel: "Open the Resus Room seizures episode"
  },
  furtherLinks: [
    { label: "The Resus Room: Paediatric Seizures; Roadside to Resus (January 2026)", href: "https://theresusroom.libsyn.com/paediatric-seizures-roadside-to-resus" }
  ],

  /* ---------- Ambulance Responder version (CPP-037-AR Seizures - AR v2.1): these keys replace the AO ones ---------- */
  ar: {
    replace: [["CPP-014-AO", "CPP-037-AR"], ["CPP-009-AO", "CPP-031-AR"], ["version 5.0", "version 2.1"]],
    subtitle: "Ambulance Responder microlearning",
    headline: "Protecting the seizing patient, the airway, and the EOC Clinician consult",
    lead: "A seizure is a sign of abnormal brain activity, with many possible causes. This version covers the Ambulance Responder protocol: basic care and the treatable causes, keeping the patient safe without restraint, what to do while they are actively seizing, and the EOC Clinician consult about treatment and transport.",
    minutes: 15,
    protocol: { code: "CPP-037-AR", name: "Seizures - AR", version: "v2.1 (2 December 2024)", exported: "31 August 2026" },
    relatedCodes: ["CPP-014-AO"],
    footerNotes: ["IM midazolam and the nasopharyngeal airway are AO skills: they are not in the AR protocol."],
    session: {
      intro: "For a team-led session with Ambulance Responders. Allow about 20 minutes. Everyone works through the page on their own device, then discusses together.",
      steps: [
        { t: "Watch the intro video", time: "3 min", text: "It follows the AO protocol. Read the box under it for what changes for an AR, then read the key points together." },
        { t: "Work the scenarios", time: "5 min", text: "Open the seizure checker. Decide the answer as a group before pressing the button." },
        { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
        { t: "Optional practical", time: "5 min", text: "Pairs: time a seizure out loud, talk through protecting the patient, and make the call." }
      ]
    },
    videoNote: { title: "Watching as an Ambulance Responder", tone: "warn",
      text: "The video follows the AO protocol (CPP-014-AO). Basic care is the same for ARs. But there is no IM midazolam and no nasopharyngeal airway at AR level. While the patient is unconscious and actively seizing: follow their seizure plan, remove them from danger and harmful objects, protect the head, restrain only if essential, put them on their side when practical, and keep the airway open and clear. Then consult the EOC Clinician regarding treatment and transport, rather than going straight to the closest ED." }
  }
};

/* The AR version uses the same checker (evaluate() has its own AR pathway) with an AR quick check and intro. */
window.MODULE.ar.tool = Object.assign({}, window.MODULE.tool, {
  check: { q: "A patient has been seizing for 8 minutes. What does an AR crew do?", a: "Protect them (danger, harmful objects, head, on their side when practical, airway open and clear), basic care, and consult the EOC Clinician regarding treatment and transport. No midazolam at AR level." },
  intro: "Answer the questions about your patient to see what CPP-037-AR says. It follows CPP-037-AR version 2.1."
});
