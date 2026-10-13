/* Hypoglycaemia - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Sources: SAAS CPP-009-AO Hypoglycaemia - AO, version 4.1 (30 June 2021), exported 31.08.2026, plus the related
   procedures CPPRO-008 Medication Checks, CPPRO-009 Oral Medication Administration and CPPRO-011 Intramuscular
   Injection (each v1.0, effective 05/07/2017). Nothing here goes beyond those documents. */
window.MODULE = {
  draft: false,                       // true shows "coming soon" boxes for empty video/podcast slots
  title: "Hypoglycaemia",
  subtitle: "Ambulance Officer microlearning",
  headline: "Recognising low blood glucose and treating it with the least invasive option that works",
  lead: "Hypoglycaemia is common and treatable. This module covers the AO protocol: when it applies, oral glucose first, who decides on glucagon, and the dose rules for children.",
  minutes: 20,

  protocol: {
    code: "CPP-009-AO", name: "Hypoglycaemia - AO", version: "v4.1 (30 June 2021)", exported: "31 August 2026",
    also: [{ code: "CPPRO-008, 009, 011", name: "Medication Checks, Oral Medication, Intramuscular Injection", version: "each v1.0 (5 July 2017)" }]
  },

  session: {
    intro: "For a team-led session. Allow about 25 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the intro video", time: "3 min", text: "Then read the key points together, taking turns to read one box each." },
      { t: "Work the scenarios", time: "8 min", text: "Open the treatment checker. For each scenario, decide the answer as a group before pressing the button, then compare." },
      { t: "Read the related procedures", time: "4 min", text: "Medication checks, oral medication and IM injection. Ask who has given glucagon, and what was hard about it." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pair up and run a BGL check and a medication check. Do the rest in your own time." }
    ]
  },

  video: {
    src: "intro.mp4",
    poster: "intro-poster.jpg",
    title: "Hypoglycaemia: what AOs need to know"
  },

  intro: [
    "Hypoglycaemia can show up as a variety of symptoms, from confusion, altered behaviour and sweating (diaphoresis) through to unconsciousness and seizure.",
    "The appropriate management is the least invasive therapy that increases blood glucose.",
    "Measure the BGL on all patients, particularly children, who have an altered conscious state or altered cerebral function, including trauma and seizures. The normal range for adults and children is usually above 3.5 mmol/L, and above 2.5 mmol/L for neonates."
  ],

  keyPointsTitle: "Key points",
  keyPoints: [
    { title: "When the protocol applies", items: [
      "BGL below 3.5 mmol/L",
      "Normal range: usually above 3.5 mmol/L for adults and children, above 2.5 mmol/L for neonates",
      "Measure BGL on every patient with an altered conscious state or altered cerebral function, including trauma and seizures, and particularly in children"
    ] },
    { title: "Patients 2 years and over, BGL below 3.5 mmol/L", steps: [
      { t: "Basic care and life support" },
      { t: "Oral glucose, up to 15 g", text: "If the patient has an adequate GCS to swallow the paste (a cough is a good indicator)." },
      { t: "Request clinical support", text: "As appropriate." },
      { t: "If oral glucose cannot be given or is ineffective", text: "Consult the EOC Clinician, who may advise IM glucagon (see the dose table)." },
      { t: "If the patient recovers", text: "Consider offering complex carbohydrates to eat." },
      { t: "Provide transport", text: "And notify the receiving facility." }
    ] },
    { title: "Patients under 2 years, BGL below 3.5 mmol/L", tone: "warn", items: [
      "Consult the EOC Clinician, who may advise oral glucose gel or IM glucagon 0.5 mg",
      "Request clinical support",
      "Provide transport and notify the receiving facility"
    ] },
    { title: "Glucagon is advised by the EOC Clinician", tone: "warn", text: "An AO does not decide to give IM glucagon alone. Consult the EOC Clinician, who may advise it. Any medication given outside a protocol must be authorised by the EOC Clinician, and the instructions (medication, dose and route) are repeated back to confirm them (CPPRO-008)." }
  ],

  tool: {
    title: "Treatment checker",
    intro: "Answer the questions about your patient and the protocol pathway is shown. It follows CPP-009-AO version 4.1.",
    fields: [
      { id: "bgl", type: "number", label: "Blood glucose level (mmol/L)", step: "0.1", placeholder: "e.g. 2.4" },
      { id: "age", type: "number", label: "Patient age in years", hint: "Use a decimal for infants, for example 0.5 for six months.", step: "0.25", placeholder: "e.g. 4" },
      { id: "weight", type: "number", label: "Patient weight in kg (if known)", optional: true, step: "0.5", placeholder: "optional" },
      { id: "oral", type: "choice", label: "Oral glucose (patients 2 years and over)", optional: true, options: [
        { value: "ready", label: "Not given yet, can swallow the paste" },
        { value: "cannot", label: "Cannot be given (inadequate GCS to swallow)" },
        { value: "ineffective", label: "Given but ineffective" },
        { value: "recovered", label: "Given, patient has recovered" } ] }
    ],
    evaluate: function (v) {
      var common = ["Provide transport and notify the receiving facility"];
      if (v.bgl >= 3.5) {
        return { tone: "", headline: "BGL is not below 3.5 mmol/L", why: ["The protocol applies when BGL is below 3.5 mmol/L"],
          actions: ["Continue basic care and assessment"],
          note: "The normal range is usually above 3.5 mmol/L for adults and children, and above 2.5 mmol/L for neonates." };
      }
      if (v.age < 2) {
        return { tone: "warn", headline: "Under 2 years: consult the EOC Clinician",
          why: ["The protocol for patients under 2 years is to consult the EOC Clinician"],
          actions: ["Consult the EOC Clinician, who may advise oral glucose gel or IM glucagon 0.5 mg", "Request clinical support"].concat(common),
          note: v.age < 0.1 ? "For neonates the normal range is usually above 2.5 mmol/L." : "" };
      }
      if (!v.oral) {
        return { tone: "warn", headline: "Choose the oral glucose status", why: ["The pathway for patients 2 years and over depends on whether oral glucose can be given and has worked"], actions: [] };
      }
      if (v.oral === "ready") {
        return { tone: "good", headline: "Give oral glucose, up to 15 g",
          why: ["Patient is 2 years or older with BGL below 3.5 mmol/L", "Adequate GCS to swallow the paste (a cough is a good indicator)"],
          actions: ["Basic care and life support", "Administer oral glucose up to 15 g", "Request clinical support as appropriate"].concat(common) };
      }
      if (v.oral === "recovered") {
        return { tone: "good", headline: "Recovery: consider complex carbohydrates",
          why: ["The patient has recovered after oral glucose"],
          actions: ["Consider offering complex carbohydrates to eat"].concat(common) };
      }
      var byAge = v.age >= 6 ? "1 mg" : "0.5 mg", byWeight = v.weight == null ? null : (v.weight >= 25 ? "1 mg" : "0.5 mg");
      var why = [v.oral === "cannot" ? "Oral glucose cannot be administered" : "Oral glucose was ineffective"], head, dose;
      if (byWeight && byWeight !== byAge) {
        head = "Consult the EOC Clinician: confirm the glucagon dose";
        why.push("Age (" + v.age + " years) points to " + byAge + " but weight (" + v.weight + " kg) points to " + byWeight + ". The protocol gives age or weight, so the EOC Clinician confirms the dose");
        dose = "Consult the EOC Clinician, who may advise IM glucagon: confirm whether 1 mg or 0.5 mg";
      } else {
        head = "Consult the EOC Clinician: IM glucagon " + byAge + " may be advised";
        why.push(v.age >= 6 || (byWeight === "1 mg") ? "6 years or older (or 25 kg or more): 1 mg" : "2 years to under 6 years (or under 25 kg): 0.5 mg");
        dose = "Consult the EOC Clinician, who may advise IM glucagon " + byAge;
      }
      return { tone: "warn", headline: head, why: why,
        actions: [dose, "Request clinical support", "If recovery occurs, consider offering complex carbohydrates to eat"].concat(common),
        note: "An AO gives glucagon only when the EOC Clinician advises it." };
    },
    disclaimer: "Training aid only. Use the current protocol and the EOC Clinician for real patients.",
    scenariosNote: "Examples written for training from the protocol. Decide your answer before pressing the button.",
    scenarios: [
      { title: "Confused adult who can swallow", text: "45 years, BGL 2.4, alert enough to swallow the paste (coughs on request).", values: { bgl: 2.4, age: 45, oral: "ready" } },
      { title: "Unconscious adult", text: "60 years, BGL 1.8, not able to swallow.", values: { bgl: 1.8, age: 60, oral: "cannot" } },
      { title: "Oral glucose did not work", text: "30 years, BGL 2.2 after oral glucose.", values: { bgl: 2.2, age: 30, oral: "ineffective" } },
      { title: "Recovered after glucose", text: "52 years, BGL was 2.6, now alert and eating.", values: { bgl: 2.6, age: 52, oral: "recovered" } },
      { title: "Young child who can swallow", text: "4 years, 16 kg, BGL 2.9, alert and coughing on request.", values: { bgl: 2.9, age: 4, weight: 16, oral: "ready" } },
      { title: "Young child, unresponsive", text: "4 years, 16 kg, BGL 1.9, cannot swallow.", values: { bgl: 1.9, age: 4, weight: 16, oral: "cannot" } },
      { title: "Age and weight disagree", text: "7 years, 20 kg, BGL 2.1, cannot swallow.", values: { bgl: 2.1, age: 7, weight: 20, oral: "cannot" } },
      { title: "Infant", text: "1 year, BGL 2.8.", values: { bgl: 2.8, age: 1 } },
      { title: "Not low", text: "30 years, BGL 4.8.", values: { bgl: 4.8, age: 30, oral: "ready" } }
    ]
  },

  referenceTitle: "Doses and related procedures",
  reference: [
    { title: "IM glucagon doses (when the EOC Clinician advises)", table: { head: ["Patient", "Dose"], rows: [
      ["6 years or older (or 25 kg or more)", "1 mg"],
      ["2 years to under 6 years (or under 25 kg)", "0.5 mg"],
      ["Under 2 years (EOC Clinician may advise)", "0.5 mg"]
    ] }, text: "Oral glucose for patients 2 years and over is up to 15 g. For patients under 2 years the EOC Clinician may advise oral glucose gel instead." },
    { title: "Medication checks (CPPRO-008)", items: [
      "Check a medication before preparing it, before giving it, and after giving it",
      "Two clinicians check whenever possible; single responders take extra care",
      "The check identifies the medication and its integrity, the expiry date, and the intended dose",
      "A medication given outside protocols must be authorised by the EOC Clinician, and the medication, dose and route are repeated back"
    ] },
    { title: "Oral medication (CPPRO-009)", items: [
      "Oral medications are safe and effective when clinically indicated and the patient can safely swallow",
      "A patient who cannot swallow medications should not be given them orally",
      "Supine patients have an increased risk of choking"
    ] },
    { title: "IM injection (CPPRO-011)", items: [
      "In SAAS the vastus lateralis is preferred: the anterior-lateral aspect of the mid-thigh. Avoid the lateral aspect (side of the thigh), which is close to tendons",
      "Prepare IM injections as a single dose only",
      "Check allergies, and where possible discuss the medication and gain consent",
      "Pierce the skin quickly and firmly at 90 degrees to about two thirds of the needle length, then inject the full dose slowly",
      "A poorly perfused, hypotensive patient may not absorb an IM medication well"
    ] }
  ],
  links: [
    { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
    { label: "CPPRO-008 Medication Checks (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-008%20Medication%20Checks.pdf" },
    { label: "CPPRO-009 Oral Medication (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-009%20Oral%20Medication%20Administration.pdf" },
    { label: "CPPRO-011 IM Injection (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-011%20Intramuscular%20Injection.pdf" }
  ],

  quiz: [
    { q: "At what BGL does the hypoglycaemia protocol apply?", options: ["Below 2.5 mmol/L", "Below 3.5 mmol/L", "Below 4.5 mmol/L"], answer: 1,
      why: "The protocol covers patients with BGL below 3.5 mmol/L." },
    { q: "Whose BGL should you measure?", options: [
        "Only patients who tell you they are diabetic",
        "Every patient with an altered conscious state or altered cerebral function, including trauma and seizures, particularly children",
        "Only unconscious patients" ], answer: 1,
      why: "Measure the BGL on all patients, particularly children, with an altered conscious state or altered cerebral function, including trauma and seizures." },
    { q: "An alert adult with BGL 2.5 can swallow the paste. What is the first treatment?", options: ["IM glucagon 1 mg", "Oral glucose up to 15 g", "Wait and recheck in an hour"], answer: 1,
      why: "If the patient has adequate GCS to swallow the paste, give oral glucose up to 15 g." },
    { q: "What is a good indicator that a patient has an adequate GCS to swallow the paste?", options: ["They are sweating", "They can cough", "They are over 18"], answer: 1,
      why: "The protocol says a cough is a good indicator." },
    { q: "Oral glucose cannot be given, or has not worked. Who advises on IM glucagon?", options: ["The AO decides alone", "The EOC Clinician", "The receiving hospital"], answer: 1,
      why: "Consult the EOC Clinician, who may advise IM glucagon." },
    { q: "The EOC Clinician advises IM glucagon for a 30 year old. What dose?", options: ["0.25 mg", "0.5 mg", "1 mg"], answer: 2,
      why: "For patients 6 years or older (or 25 kg or more) the dose is 1 mg." },
    { q: "The EOC Clinician advises IM glucagon for a 4 year old who weighs 16 kg. What dose?", options: ["0.5 mg", "1 mg", "2 mg"], answer: 0,
      why: "From 2 years to under 6 years (or under 25 kg) the dose is 0.5 mg." },
    { q: "A 1 year old has BGL 2.8 mmol/L. What does the protocol say?", options: [
        "Give oral glucose paste up to 15 g",
        "Consult the EOC Clinician, who may advise oral glucose gel or IM glucagon 0.5 mg",
        "Give IM glucagon 1 mg" ], answer: 1,
      why: "For patients under 2 years, consult the EOC Clinician, request clinical support, then transport." },
    { q: "A patient recovers after treatment. What does the protocol suggest?", options: ["Discharge at scene", "Consider offering complex carbohydrates to eat", "Give a second dose of glucagon"], answer: 1,
      why: "If recovery occurs, consider offering complex carbohydrates to eat, then provide transport and notify the receiving facility." },
    { q: "What is the guiding principle for treating hypoglycaemia?", options: [
        "Always use the fastest-acting drug",
        "Use the least invasive therapy that increases blood glucose",
        "Always give glucagon first" ], answer: 1,
      why: "The appropriate management is the least invasive therapy that increases blood glucose." },
    { q: "Which IM injection site is preferred in SAAS?", options: ["Deltoid", "Vastus lateralis, on the anterior-lateral aspect of the mid-thigh", "Gluteal muscle"], answer: 1,
      why: "CPPRO-011: the vastus lateralis is preferred. Avoid the side of the thigh, which is close to tendons." },
    { q: "How many clinicians check a medication before it is prepared and given?", options: ["One is enough", "Two whenever possible", "Three"], answer: 1,
      why: "CPPRO-008: two clinicians check whenever possible. Single responders need to take extra care." }
  ],

  practical: {
    title: "Practical: BGL, medication check and IM technique",
    intro: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity.",
    equipment: ["Glucometer and test strips (or a training device)", "A training or expired oral glucose tube", "A training syringe and IM needle, or an injection pad", "Your station's medication check reference"],
    steps: [
      { t: "Check the BGL", text: "Measure a BGL on your partner or a training device. State what you would do at 2.4 mmol/L in an adult who can swallow, and in one who cannot." },
      { t: "Run a medication check", text: "Take turns being the person preparing and the person checking. Name the medication, its expiry date and the dose out loud, as in CPPRO-008." },
      { t: "Practise the IM technique", text: "On a training pad, find the mid anterior-lateral thigh, then pierce at 90 degrees to about two thirds of the needle length and inject slowly, as in CPPRO-011. Never use a real medication or practise on a person." },
      { t: "Make the call", text: "Role-play the call to the EOC Clinician. State the age, weight, BGL, what has been tried, and the dose you expect to be advised." }
    ],
    good: ["BGL checked first and the number stated", "The right treatment for the age and the patient's ability to swallow", "Medication, expiry and dose named by both people", "The EOC Clinician's advice repeated back"],
    note: "Suggested activities written for training. Check them with your lead instructor."
  },

  podcast: {
    title: "The Resus Room: Diabetic Ketoacidosis",
    summary: "The Resus Room is a UK emergency medicine podcast. It has no episode on hypoglycaemia, but its \"Diabetic Ketoacidosis; Roadside to Resus\" episode (February 2021, about 59 minutes) covers the related emergency of high blood glucose: pathophysiology, clinical picture, and in-hospital and pre-hospital management. Optional listening. It reflects UK practice from 2021 and is about DKA, not low blood glucose, so follow CPP-009-AO for hypoglycaemia.",
    link: "https://theresusroom.libsyn.com/diabetic-ketoacidosis-roadside-to-resus",
    linkLabel: "Open the Resus Room DKA episode"
  }
};
