/* Chest Pain - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Sources: SAAS CPP-007-AO Chest Pain - AO, version 4.2 (23 April 2020), exported 31.08.2026, plus the related
   procedures CPPRO-008 Medication Checks and CPPRO-009 Oral Medication Administration (each v1.0, effective
   05/07/2017). Nothing here goes beyond those documents. */
/* Ambulance Responder pathway for the GTN checker (CPP-029-AR v2.1): every GTN dose is on EOC Clinician advice, one set of
   limits (systolic above 100), and the EOC Clinician gives the transport options. */
function evaluateAR(v) {
  var d = +v.doses;
  var base = "Basic care including ECG monitoring, vital signs every 5 minutes, request clinical support, and oral aspirin 300 mg unless allergic";
  var tail = ["Consult the EOC Clinician for transport options: transport and cancel clinical support; transport and RV with clinical support en route; or monitoring until clinical support arrives"];
  var out = [];
  if (!(v.sbp > 100)) out.push("Systolic BP is not above 100 mmHg");
  if (!(v.pulse >= 60 && v.pulse <= 120)) out.push("Pulse rate is outside 60 to 120");
  if (v.pde5 === "r24" || v.pde5 === "r48") {
    return { tone: "warn", headline: "No GTN: recent PDE-5 inhibitor",
      why: [v.pde5 === "r24" ? "Sildenafil, vardenafil or avanafil within 24 hours" : "Tadalafil within 48 hours", "GTN is contraindicated with PDE-5 inhibitors: together they can cause life-threatening hypotension"].concat(out),
      actions: ["The EOC Clinician cannot advise GTN within these windows: tell them when you call", base].concat(tail) };
  }
  if (v.pde5 === "unsure") {
    return { tone: "warn", headline: "PDE-5 use not confirmed: tell the EOC Clinician",
      why: ["GTN may only be advised if the patient has not used a PDE-5 inhibitor within 24 hours (sildenafil, vardenafil, avanafil) or 48 hours (tadalafil)"].concat(out),
      actions: ["No GTN unless the EOC Clinician advises it", "Consult the EOC Clinician", base].concat(tail),
      note: "Training note: the protocol sets the limit as no use within the windows. If you cannot confirm that, say so to the EOC Clinician." };
  }
  if (out.length) {
    return { tone: "warn", headline: "GTN limits not met: no GTN", why: out,
      actions: ["No GTN: the EOC Clinician may only advise it within the limits", "Monitor vital signs every 3 to 5 minutes", "Tell the EOC Clinician the vital signs", base].concat(tail) };
  }
  var why = ["Blood pressure, pulse rate and PDE-5 status are all within the limits"];
  if (v.pain === "resolved") {
    return { tone: "good", headline: "Pain resolved: no further GTN now", why: why.concat("The chest pain has resolved"),
      actions: ["Monitor vital signs every 3 to 5 minutes", "GTN is repeated only if the chest pain persists, or as directed by the EOC Clinician"].concat(tail) };
  }
  if (v.pain === "returned") {
    return { tone: "warn", headline: "The pain has returned: consult the EOC Clinician", why: ["Chest pain that had resolved has returned"],
      actions: ["Consult the EOC Clinician: any further GTN is as they direct (maximum 3 doses in total)", "Monitor vital signs every 3 to 5 minutes"].concat(tail) };
  }
  if (d >= 3) {
    return { tone: "warn", headline: "Maximum of 3 GTN doses reached", why: ["The total maximum is 3 doses"],
      actions: ["No further GTN unless the EOC Clinician directs it", "Consult the EOC Clinician"].concat(tail) };
  }
  if (d === 0) {
    return { tone: "warn", headline: "Consult the EOC Clinician: they may advise GTN", why: why.concat("At AR level every GTN dose is on EOC Clinician advice, even when the patient has their own GTN prescribed"),
      actions: ["Consult the EOC Clinician, who may advise sublingual GTN 300 microg", "If advised: monitor vital signs every 3 to 5 minutes, and repeat every 5 minutes as needed if the pain persists and the limits hold, to a total of 3 doses, or as directed by the EOC Clinician", base].concat(tail) };
  }
  return { tone: "good", headline: "Repeat GTN 300 microg if advised (dose " + (d + 1) + " of 3)",
    why: why.concat("The pain " + (v.pain === "returned" ? "has returned" : "persists") + " after " + d + (d === 1 ? " dose" : " doses")),
    actions: ["Repeat sublingual GTN 300 microg about 5 minutes after the last dose, as the EOC Clinician advised, or as they direct", "Monitor vital signs every 3 to 5 minutes"].concat(tail) };
}

window.MODULE = {
  flow: true,                         // open sections that fade in and a few quick checks (see ../README.md)
  draft: false,                       // true shows "coming soon" boxes for empty video/podcast slots
  title: "Chest pain",
  subtitle: "Ambulance Officer microlearning",
  headline: "Recognising cardiac chest pain and giving aspirin and GTN safely",
  lead: "Chest pain is a time critical call. This module covers the AO protocol: aspirin for every patient who is not allergic, the strict limits for GTN, and when to call the EOC Clinician.",
  minutes: 25,

  protocol: {
    code: "CPP-007-AO", name: "Chest Pain - AO", version: "v4.2 (23 April 2020)", exported: "31 August 2026",
    also: [{ code: "CPPRO-008, 009", name: "Medication Checks, Oral Medication Administration", version: "each v1.0 (5 July 2017)" }]
  },

  session: {
    intro: "For a team-led session. Allow about 30 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the intro video", time: "3 min", text: "Then read the key points together, taking turns to read one box each." },
      { t: "Work the scenarios", time: "10 min", text: "Open the GTN checker. For each scenario, decide the answer as a group before pressing the button, then compare. Pay attention to the cases at exactly 100 mmHg." },
      { t: "Read the related procedures", time: "4 min", text: "Medication checks and oral medication. Who has given sublingual GTN, and what did the patient's blood pressure do?" },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pair up and run a vital signs check against the GTN limits. Do the rest in your own time." }
    ]
  },

  video: {
    src: "intro.mp4",
    poster: "intro-poster.jpg",
    title: "Chest pain: what AOs need to know"
  },

  intro: [
    "There are many causes of chest pain, but cardiac ischaemia should be suspected as the cause unless there is an obvious alternative. The feeling may be pain, pressure, heaviness or tightness in one or more of the chest, neck, jaw, arms, back or shoulder. There may also be nausea, dizziness, sweating or shortness of breath.",
    "A person with cardiac ischaemia is at risk of life-threatening changes to the heart rhythm. Untreated or misdiagnosed cardiac chest pain is detrimental to patient outcomes. To reduce the chance of sudden death from myocardial infarction, urgent medical care is required: \"time is muscle\".",
    "People with a diagnosis of angina are trained to recognise their symptoms and may have self-administered their own prescribed medications. Vasodilators and adequate oxygenation are the primary treatments. GTN may have a profound effect on blood pressure, so observe the patient closely."
  ],

  keyPointsTitle: "Key points",
  keyPoints: [
    { title: "First, for every patient", check: { q: "Who gets oral aspirin 300 mg?", a: "Every patient, unless they are allergic." }, steps: [
      { t: "Basic care including ECG monitoring" },
      { t: "Monitor vital signs every 5 minutes" },
      { t: "Consider clinical support", scope: "ao" },
      { t: "Request clinical support", scope: "ar" },
      { t: "Oral aspirin 300 mg", text: "Unless the patient is allergic. SAAS aspirin is chewed by the patient before it is swallowed (CPPRO-009)." }
    ] },
    { scope: "ar", title: "GTN limits: ALL must apply", tone: "warn", check: { q: "Systolic exactly 100, pulse 80, no PDE-5 inhibitor. Can the EOC Clinician advise GTN?", a: "No. For an AR the systolic must be above 100 mmHg, whether or not the patient has GTN prescribed." }, items: [
      "Systolic BP above 100 mmHg",
      "Pulse rate 60 to 120",
      "No use of a PDE-5 inhibitor within 24 hours (sildenafil, vardenafil, avanafil) or 48 hours (tadalafil)"
    ], note: "The AR protocol has one set of limits for every patient. Exactly 100 mmHg does not pass." },
    { scope: "ao", title: "GTN limits: ALL must apply", tone: "warn", check: { q: "GTN is prescribed. Systolic 95, pulse 80. Can you give GTN?", a: "No. The systolic must be 100 mmHg or more." }, items: [
      "Systolic BP 100 mmHg or more if GTN was prescribed to the patient, and above 100 mmHg if it was not",
      "Pulse rate 60 to 120",
      "No use of a PDE-5 inhibitor within 24 hours (sildenafil, vardenafil, avanafil) or 48 hours (tadalafil)"
    ], note: "The protocol writes the blood pressure limit as 100 or more for patients who have GTN prescribed, and above 100 for patients who do not. Exactly 100 mmHg therefore passes in the first case and not in the second." },
    { scope: "ar", title: "GTN: only on EOC Clinician advice", tone: "warn", steps: [
      { t: "Consult the EOC Clinician", text: "Who may advise sublingual GTN 300 microg if all the limits above apply. This is the same whether or not the patient has their own GTN prescribed." },
      { t: "Monitor vital signs every 3 to 5 minutes" },
      { t: "Repeat if advised", text: "If the chest pain persists and the limits still hold: sublingual GTN every 5 minutes as needed, to a total maximum of 3 doses, or as directed by the EOC Clinician." }
    ] },
    { scope: "ar", title: "Transport: consult the EOC Clinician", steps: [
      { t: "Consult the EOC Clinician for transport options", text: "They may advise: transport and cancel clinical support; transport and RV with clinical support en route; or monitoring until clinical support arrives." }
    ] },
    { scope: "ao", title: "GTN previously prescribed", steps: [
      { t: "Give sublingual GTN 300 microg", text: "If all the limits above apply." },
      { t: "Monitor vital signs every 3 to 5 minutes" },
      { t: "Repeat if the pain persists and the limits still hold", text: "Sublingual GTN every 5 minutes as needed, to a total maximum of 3 doses." },
      { t: "Consult the EOC Clinician", text: "If BP or HR fall outside the limits at any time, if the pain remains unresolved, or if pain that had resolved returns." },
      { t: "Provide transport", text: "And notify the receiving facility." }
    ] },
    { scope: "ao", title: "GTN not previously prescribed", steps: [
      { t: "Consult the EOC Clinician", text: "Who may advise sublingual GTN 300 microg if the limits above apply." },
      { t: "Monitor vital signs every 3 to 5 minutes" },
      { t: "Repeat if the pain persists and the limits still hold", text: "Every 5 minutes as needed, to a total maximum of 3 doses, or as directed by the EOC Clinician." },
      { t: "Consult the EOC Clinician again", text: "If BP or HR fall outside the limits, the pain remains unresolved, or resolved pain returns." },
      { t: "Provide transport", text: "And notify the receiving facility." }
    ] },
    { title: "Why PDE-5 inhibitors matter", tone: "no", text: "A PDE-5 inhibitor is a drug commonly used to treat erectile dysfunction and pulmonary hypertension. GTN is contraindicated for patients taking them, because using both together can lead to life-threatening hypotension." }
  ],

  tool: {
    check: { q: "The patient took tadalafil 30 hours ago. Can you give GTN?", a: "No. No GTN within 48 hours of tadalafil (24 hours for sildenafil, vardenafil or avanafil)." },
    title: "GTN checker",
    intro: "Answer the questions about your patient and the protocol pathway is shown. It follows CPP-007-AO version 4.2. Aspirin and basic care come first for every patient.",
    fields: [
      { scope: "ao", id: "prescribed", type: "choice", label: "Has GTN been prescribed to this patient?", options: [
        { value: "yes", label: "Yes, previously prescribed" }, { value: "no", label: "No, not previously prescribed" } ] },
      { id: "sbp", type: "number", label: "Systolic blood pressure (mmHg)", step: "1", placeholder: "e.g. 128" },
      { id: "pulse", type: "number", label: "Pulse rate (beats per minute)", step: "1", placeholder: "e.g. 84" },
      { id: "pde5", type: "choice", label: "PDE-5 inhibitor use", options: [
        { value: "none", label: "None taken recently" },
        { value: "r24", label: "Sildenafil, vardenafil or avanafil in the last 24 hours" },
        { value: "r48", label: "Tadalafil in the last 48 hours" },
        { value: "unsure", label: "Not sure" } ] },
      { id: "doses", type: "choice", label: "GTN doses given so far", options: [
        { value: "0", label: "None yet" }, { value: "1", label: "1 dose" }, { value: "2", label: "2 doses" }, { value: "3", label: "3 doses" } ] },
      { id: "pain", type: "choice", label: "Chest pain now", options: [
        { value: "persists", label: "Persists" }, { value: "resolved", label: "Has resolved" }, { value: "returned", label: "Resolved, then returned" } ] }
    ],
    evaluate: function (v) {
      if (window.MODULE_SCOPE === "ar") return evaluateAR(v);
      var presc = v.prescribed === "yes", d = +v.doses, tail = ["Provide transport and notify the receiving facility"];
      var base = "Basic care including ECG monitoring, vital signs every 5 minutes, and oral aspirin 300 mg unless allergic";
      var ok = {
        sbp: presc ? v.sbp >= 100 : v.sbp > 100,
        pulse: v.pulse >= 60 && v.pulse <= 120
      };
      var out = [];
      if (!ok.sbp) out.push(presc ? "Systolic BP is below 100 mmHg" : "Systolic BP is not above 100 mmHg");
      if (!ok.pulse) out.push("Pulse rate is outside 60 to 120");
      var vitalsAct = out.length ? ["Consult the EOC Clinician: BP or HR outside the limits at any time"] : [];
      if (v.pde5 === "r24" || v.pde5 === "r48") {
        return { tone: "warn", headline: "Do not give GTN: recent PDE-5 inhibitor",
          why: [v.pde5 === "r24" ? "Sildenafil, vardenafil or avanafil within 24 hours" : "Tadalafil within 48 hours", "GTN is contraindicated with PDE-5 inhibitors: together they can cause life-threatening hypotension"].concat(out),
          actions: ["Do not give GTN"].concat(vitalsAct, [base, "Consult the EOC Clinician if the chest pain remains unresolved"], tail) };
      }
      if (v.pde5 === "unsure") {
        return { tone: "warn", headline: "PDE-5 use not confirmed: consult the EOC Clinician",
          why: ["The protocol requires that the patient has not used a PDE-5 inhibitor within 24 hours (sildenafil, vardenafil, avanafil) or 48 hours (tadalafil)"].concat(out),
          actions: ["Do not give GTN until this is confirmed", "Consult the EOC Clinician", base].concat(tail),
          note: "Training note: the protocol sets the limit as no use within the windows. If you cannot confirm that, ask the EOC Clinician." };
      }
      if (out.length) {
        return { tone: "warn", headline: "GTN limits not met: consult the EOC Clinician", why: out,
          actions: ["Do not give GTN", "Consult the EOC Clinician: BP or HR outside the limits at any time", "Monitor vital signs every 3 to 5 minutes", base].concat(tail) };
      }
      var why = ["Blood pressure, pulse rate and PDE-5 status are all within the limits"];
      if (v.pain === "returned") {
        return { tone: "warn", headline: "Consult the EOC Clinician: the pain has returned", why: ["Chest pain that had resolved has returned"],
          actions: ["Consult the EOC Clinician"].concat(tail) };
      }
      if (v.pain === "resolved") {
        return { tone: "good", headline: "Pain resolved: no further GTN now", why: why.concat("The chest pain has resolved"),
          actions: ["Monitor vital signs every 3 to 5 minutes", "Consult the EOC Clinician if the pain returns"].concat(tail) };
      }
      if (d >= 3) {
        return { tone: "warn", headline: "Maximum of 3 GTN doses reached: consult the EOC Clinician", why: ["The pain remains unresolved after the total maximum of 3 doses"],
          actions: ["Do not give further GTN", "Consult the EOC Clinician"].concat(tail) };
      }
      if (!presc && d === 0) {
        return { tone: "warn", headline: "Consult the EOC Clinician: they may advise GTN", why: why.concat("GTN has not been prescribed to this patient"),
          actions: ["Consult the EOC Clinician, who may advise sublingual GTN 300 microg", "If advised: monitor vital signs every 3 to 5 minutes, and repeat every 5 minutes as needed to a total of 3 doses, or as directed by the EOC Clinician", base].concat(tail) };
      }
      if (d === 0) {
        return { tone: "good", headline: "Give GTN 300 microg sublingual", why: why.concat("GTN has been prescribed, and the pain persists"),
          actions: ["Give one sublingual GTN 300 microg", "Monitor vital signs every 3 to 5 minutes", "Consult the EOC Clinician if BP or HR fall outside the limits, the pain remains unresolved, or resolved pain returns", base].concat(tail) };
      }
      return { tone: "good", headline: "Repeat GTN 300 microg (dose " + (d + 1) + " of 3)",
        why: why.concat("The pain persists after " + d + (d === 1 ? " dose" : " doses")),
        actions: ["Repeat sublingual GTN 300 microg, about 5 minutes after the last dose", "Monitor vital signs every 3 to 5 minutes", presc ? "Consult the EOC Clinician if BP or HR fall outside the limits, the pain remains unresolved, or resolved pain returns" : "Continue as directed by the EOC Clinician"].concat(tail),
        note: !presc ? "For a patient without prescribed GTN the repeat doses are every 5 minutes as needed, up to 3 in total, or as directed by the EOC Clinician." : "" };
    },
    disclaimer: "Training aid only. Use the current protocol and the EOC Clinician for real patients.",
    scenariosNote: "Examples written for training from the protocol. Decide your answer before pressing the button.",
    scenarios: [
      { title: "Prescribed, stable, first dose", text: "GTN prescribed. BP 140, pulse 88, no PDE-5 inhibitor, pain persists, no GTN given yet.", values: { prescribed: "yes", sbp: 140, pulse: 88, pde5: "none", doses: "0", pain: "persists" } },
      { title: "Second dose", text: "GTN prescribed. BP 128, pulse 84, no PDE-5 inhibitor, one dose given, pain persists.", values: { prescribed: "yes", sbp: 128, pulse: 84, pde5: "none", doses: "1", pain: "persists" } },
      { title: "Blood pressure dropped", text: "GTN prescribed. BP 92, pulse 80, no PDE-5 inhibitor, one dose given, pain persists.", values: { prescribed: "yes", sbp: 92, pulse: 80, pde5: "none", doses: "1", pain: "persists" } },
      { title: "Fast pulse", text: "GTN prescribed. BP 130, pulse 124, no PDE-5 inhibitor, no GTN yet, pain persists.", values: { prescribed: "yes", sbp: 130, pulse: 124, pde5: "none", doses: "0", pain: "persists" } },
      { title: "Took tadalafil yesterday", text: "GTN prescribed. BP 150, pulse 90, tadalafil in the last 48 hours, pain persists.", values: { prescribed: "yes", sbp: 150, pulse: 90, pde5: "r48", doses: "0", pain: "persists" } },
      { title: "Three doses and still in pain", text: "GTN prescribed. BP 125, pulse 80, no PDE-5 inhibitor, three doses given, pain persists.", values: { prescribed: "yes", sbp: 125, pulse: 80, pde5: "none", doses: "3", pain: "persists" } },
      { title: "GTN not prescribed", text: "BP 138, pulse 82, no PDE-5 inhibitor, no GTN yet, pain persists.", values: { prescribed: "no", sbp: 138, pulse: 82, pde5: "none", doses: "0", pain: "persists" } },
      { title: "Exactly 100, prescribed", text: "GTN prescribed. BP 100, pulse 80, no PDE-5 inhibitor, no GTN yet, pain persists.", values: { prescribed: "yes", sbp: 100, pulse: 80, pde5: "none", doses: "0", pain: "persists" } },
      { title: "Exactly 100, not prescribed", text: "BP 100, pulse 80, no PDE-5 inhibitor, no GTN yet, pain persists.", values: { prescribed: "no", sbp: 100, pulse: 80, pde5: "none", doses: "0", pain: "persists" } },
      { title: "The pain went away", text: "GTN prescribed. BP 135, pulse 78, no PDE-5 inhibitor, one dose given, pain has resolved.", values: { prescribed: "yes", sbp: 135, pulse: 78, pde5: "none", doses: "1", pain: "resolved" } },
      { title: "The pain came back", text: "GTN prescribed. BP 130, pulse 80, no PDE-5 inhibitor, one dose given, pain resolved then returned.", values: { prescribed: "yes", sbp: 130, pulse: 80, pde5: "none", doses: "1", pain: "returned" } }
    ]
  },

  referenceTitle: "Limits and related procedures",
  reference: [
    { scope: "ar", title: "GTN limits at a glance (CPP-029-AR)", table: { head: ["Check", "Every patient"], rows: [
      ["Who decides", "The EOC Clinician may advise GTN, whether or not the patient's own GTN is prescribed"],
      ["Systolic BP", "Above 100 mmHg"],
      ["Pulse rate", "60 to 120"],
      ["Doses", "Every 5 minutes as needed while the pain persists and the limits hold, maximum 3, or as directed by the EOC Clinician"],
      ["Vital signs", "Every 3 to 5 minutes while giving GTN"]
    ] } },
    { scope: "ao", title: "GTN limits at a glance", table: { head: ["Check", "GTN previously prescribed", "GTN not previously prescribed"], rows: [
      ["Systolic BP", "100 mmHg or more", "Above 100 mmHg"],
      ["Pulse rate", "60 to 120", "60 to 120"],
      ["Doses", "Every 5 minutes as needed, maximum 3", "Every 5 minutes as needed, maximum 3, or as directed by the EOC Clinician"],
      ["Who decides", "Follow the protocol", "The EOC Clinician may advise GTN"],
      ["Vital signs", "Every 3 to 5 minutes while giving GTN", "Every 3 to 5 minutes while giving GTN"]
    ] } },
    { title: "PDE-5 inhibitors: no GTN within", table: { head: ["Drug", "Time window"], rows: [
      ["Sildenafil", "24 hours"], ["Vardenafil", "24 hours"], ["Avanafil", "24 hours"], ["Tadalafil", "48 hours"]
    ] }, text: "These are commonly used for erectile dysfunction and pulmonary hypertension. Together with GTN they can cause life-threatening hypotension." },
    { title: "Medication checks (CPPRO-008)", items: [
      "Check a medication before preparing it, before giving it, and after giving it",
      "Two clinicians check whenever possible; single responders take extra care",
      "The check identifies the medication and its integrity, the expiry date, and the intended dose",
      "A medication given outside protocols must be authorised by the EOC Clinician, and the medication, dose and route are repeated back"
    ] },
    { title: "Oral and sublingual medication (CPPRO-009)", items: [
      "SAAS aspirin should be chewed by the patient before it is swallowed",
      "The protocol gives GTN as a 300 microg sublingual tablet. CPPRO-009 also describes sublingual sprays: test the spray into the air away from everyone, ask the patient to lift the tip of the tongue, and spray under the tongue without touching the nozzle to the mouth",
      "If a patient cannot follow the spray instructions, give the dose between the cheek and gum (buccal)",
      "GTN metered dose bottles are multiple patient use: use hand hygiene and never let any part of the bottle touch the patient",
      "Record the dose, route and time on the patient clinical record"
    ] }
  ],
  links: [
    { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
    { label: "CPPRO-008 Medication Checks (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-008%20Medication%20Checks.pdf" },
    { label: "CPPRO-009 Oral Medication (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-009%20Oral%20Medication%20Administration.pdf" }
  ],

  quiz: [
    { q: "What does the protocol say to suspect as the cause of chest pain unless there is an obvious alternative?", options: ["Muscle strain", "Cardiac ischaemia", "Anxiety"], answer: 1,
      why: "Cardiac ischaemia should be suspected unless there is an obvious alternative." },
    { q: "Which medication is given to every chest pain patient who is not allergic?", options: ["Sublingual GTN 300 microg", "Oral aspirin 300 mg", "Oral paracetamol"], answer: 1,
      why: "Unless allergic, administer oral aspirin 300 mg." },
    { q: "How is SAAS aspirin taken?", options: ["Swallowed whole with water", "Chewed by the patient before it is swallowed", "Dissolved under the tongue"], answer: 1,
      why: "CPPRO-009: SAAS aspirin should be chewed by the patient prior to being swallowed." },
    { scope: "ar", q: "As an AR, what systolic BP must the patient have before the EOC Clinician may advise GTN?", options: ["90 mmHg or more", "Above 100 mmHg", "120 mmHg or more"], answer: 1,
      why: "CPP-029-AR: systolic BP above 100 mmHg, pulse rate 60 to 120 and no recent PDE-5 inhibitor." },
    { scope: "ao", q: "A patient has GTN prescribed. What is the minimum systolic BP for giving it?", options: ["90 mmHg", "100 mmHg", "120 mmHg"], answer: 1,
      why: "For a patient with GTN previously prescribed, the systolic BP must be 100 mmHg or more." },
    { q: "What pulse rate range allows GTN?", options: ["50 to 100", "60 to 120", "80 to 140"], answer: 1,
      why: "The pulse rate must be 60 to 120." },
    { q: "Which medication means no GTN for 48 hours?", options: ["Sildenafil", "Vardenafil", "Tadalafil"], answer: 2,
      why: "Tadalafil: 48 hours. Sildenafil, vardenafil and avanafil: 24 hours." },
    { q: "Why must GTN not be given with a PDE-5 inhibitor?", options: ["It makes the GTN ineffective", "It can lead to life-threatening hypotension", "It causes a rash"], answer: 1,
      why: "GTN is contraindicated with PDE-5 medications because using both can lead to life-threatening hypotension." },
    { q: "What is the total maximum number of GTN doses?", options: ["1", "3", "6"], answer: 1,
      why: "Sublingual GTN every 5 minutes as needed, to a total maximum of 3 doses." },
    { scope: "ar", q: "The patient has their own GTN prescribed, and the limits are met. As an AR, what do you do?", options: [
        "Give the first dose, then consult",
        "Consult the EOC Clinician, who may advise GTN",
        "Let the patient use their own GTN as often as they like" ], answer: 1,
      why: "CPP-029-AR has no separate pathway for prescribed GTN: consult the EOC Clinician, who may advise sublingual GTN 300 microg if the limits apply." },
    { scope: "ar", q: "What does the AR protocol say about transport?", options: [
        "Provide transport and notify the receiving facility",
        "Consult the EOC Clinician for transport options",
        "Always wait for clinical support" ], answer: 1,
      why: "CPP-029-AR: consult the EOC Clinician for transport options: transport and cancellation of clinical support, transport and RV with clinical support en route, or monitoring until clinical support arrives." },
    { scope: "ao", q: "GTN has not been prescribed to the patient. What does the protocol say?", options: [
        "Give it anyway if the pain is severe",
        "Consult the EOC Clinician, who may advise GTN",
        "Never give GTN" ], answer: 1,
      why: "If GTN was not previously prescribed, consult the EOC Clinician, who may advise it." },
    { scope: "ao", q: "A patient who does not have GTN prescribed has a systolic BP of exactly 100 mmHg. What applies?", options: [
        "The limit is met: GTN may be advised",
        "The limit is not met: the systolic BP must be above 100 mmHg",
        "Pulse rate decides, BP does not matter" ], answer: 1,
      why: "For patients without prescribed GTN the protocol says systolic BP above 100 mmHg. For patients with GTN prescribed it is 100 mmHg or more." },
    { scope: "ao", q: "When do you consult the EOC Clinician for a patient receiving GTN?", options: [
        "Only if the patient collapses",
        "If BP or HR fall outside the limits, the pain remains unresolved, or resolved pain returns",
        "Only after the third dose" ], answer: 1,
      why: "Consult the EOC Clinician if BP or HR fall outside the limits at any time, the chest pain remains unresolved, or initially resolved chest pain returns." },
    { q: "How many clinicians check a medication before it is prepared and given?", options: ["One is enough", "Two whenever possible", "Three"], answer: 1,
      why: "CPPRO-008: two clinicians check whenever possible. Single responders need to take extra care." }
  ],

  practical: {
    title: "Practical: vital signs against the GTN limits",
    intro: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity.",
    equipment: ["BP cuff and stethoscope or monitor", "ECG monitor (or a training device)", "A training or expired GTN device, and an aspirin training tablet", "Your station's medication check reference"],
    steps: [
      { t: "Take a set of vital signs", text: "Record systolic BP and pulse on your partner. State aloud which GTN limits are met and which are not, and whether GTN would be prescribed or advised." },
      { t: "Run a medication check", text: "Take turns being the person preparing and the person checking. Name the medication, expiry date and dose out loud, as in CPPRO-008." },
      { t: "Practise the technique", text: "With a training device only: aspirin chewed, then a sublingual dose, then hand hygiene and recording the dose, route and time, as in CPPRO-009. Never use real medication or practise on a person." },
      { t: "Make the call", text: "Role-play the call to the EOC Clinician: age, symptoms, vital signs, PDE-5 status, what has been given, and what you are asking." }
    ],
    good: ["Both BP and pulse checked against the limits before any GTN", "PDE-5 use asked about and the answer stated", "Medication, expiry and dose named by both people", "The call covers vital signs, PDE-5 status and doses given"],
    note: "Suggested activities written for training. Check them with your lead instructor."
  },

  podcast: {
    title: "The Resus Room: Acute Coronary Syndrome",
    summary: "The Resus Room is a UK emergency medicine podcast. Its \"Acute Coronary Syndrome; Roadside to Resus\" episode (September 2021, about 68 minutes) covers acute coronary syndrome from definition and pathophysiology through assessment, investigations and management. Optional listening. It reflects UK practice from 2021, so where it differs from CPP-007-AO, follow the protocol.",
    link: "https://theresusroom.libsyn.com/acute-coronary-syndrome-roadside-to-resus",
    linkLabel: "Open the Resus Room ACS episode"
  },

  /* ---------- Ambulance Responder version (CPP-029-AR Chest Pain - AR v2.1): these keys replace the AO ones ---------- */
  ar: {
    replace: [["CPP-007-AO", "CPP-029-AR"], ["Chest Pain - AO", "Chest Pain - AR"], ["version 4.2", "version 2.1"]],
    subtitle: "Ambulance Responder microlearning",
    lead: "Chest pain is a time critical call. This version covers the Ambulance Responder protocol: aspirin for every patient who is not allergic, clinical support, the strict limits for GTN, GTN only on EOC Clinician advice, and the EOC Clinician's transport options.",
    protocol: {
      code: "CPP-029-AR", name: "Chest Pain - AR", version: "v2.1 (23 April 2020)", exported: "31 August 2026",
      also: [{ code: "CPPRO-008, 009", name: "Medication Checks, Oral Medication Administration", version: "each v1.0 (5 July 2017)" }]
    },
    relatedCodes: ["CPP-007-AO"],
    session: {
      intro: "For a team-led session with Ambulance Responders. Allow about 30 minutes. Everyone works through the page on their own device, then discusses together.",
      steps: [
        { t: "Watch the intro video", time: "3 min", text: "It follows the AO protocol. Read the box under it for what changes for an AR, then read the key points together." },
        { t: "Work the scenarios", time: "10 min", text: "Open the GTN checker. For each scenario, decide the answer as a group before pressing the button, then compare. Pay attention to the cases at exactly 100 mmHg." },
        { t: "Read the related procedures", time: "4 min", text: "Medication checks and oral medication." },
        { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
        { t: "Optional practical", time: "5 min", text: "Pair up: a vital signs check against the GTN limits, then the call to the EOC Clinician asking for GTN advice." }
      ]
    },
    videoNote: { title: "Watching as an Ambulance Responder", tone: "warn",
      text: "The video follows the AO protocol (CPP-007-AO). Under the AR protocol (CPP-029-AR): request clinical support, rather than consider it. Every GTN dose is on EOC Clinician advice, even when the patient has their own GTN prescribed, and the systolic must be above 100 for everyone. And instead of \"provide transport\", consult the EOC Clinician for the transport options: transport and cancel clinical support, transport and RV with clinical support en route, or monitoring until clinical support arrives." }
  }
};
