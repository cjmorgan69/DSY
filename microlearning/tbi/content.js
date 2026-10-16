/* Traumatic or Hypoxic Brain Injury - Paramedic microlearning. Content only: the layout lives in ../shared/module.js.
   Source: SAAS CPG-144-P Traumatic or Hypoxic Brain Injury - P v1.0 (30 June 2021), exported 31.08.2026. The PDF shows
   no review date. It names, and this module links to, CTL-075 GCS, CTL-070 Adult RDR Chart and the Paediatric RDR
   Charts, and CTL-042 Major Trauma Tool. Owner's choices (16 Oct 2026): no midazolam or ketamine doses (the guideline
   only says early clinical support for sedation); on the Eyre Peninsula, notify the local hospital or trauma bypass,
   and MedSTAR is notified via the EOC. Nothing clinical here goes beyond those. */
var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Traumatic or hypoxic brain injury",
  subtitle: "Paramedic microlearning",
  headline: "The first hit is done. Your job is to stop the second one",
  lead: "Secondary brain insults (hypoxaemia, hypercarbia, hypotension, hypoglycaemia, raised intracranial pressure) drive outcome after a brain injury. This module covers CPG-144-P: monitoring and targets, fluids to protect cerebral perfusion, venous return, the agitated patient, and rapid transport.",
  minutes: 20,

  protocol: {
    code: "CPG-144-P", name: "Traumatic or Hypoxic Brain Injury - P", version: "v1.0 (30 June 2021)", exported: "31 August 2026"
  },
  footerNotes: ["Notification on the Eyre Peninsula (local hospital or trauma bypass, MedSTAR via the EOC) is the DSY lead instructor's local arrangement under the guideline's \"local regional arrangement\".",
    "Sedation doses are not covered here. CPG-144-P recommends early clinical support for potential sedation."],

  session: {
    intro: "For a team-led session. Allow about 25 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the introduction", time: "4 min", text: "Then ask: which two secondary insults are the strongest predictors of a poor outcome?" },
      { t: "The guideline", time: "6 min", text: "Take turns reading a box. Check everyone can say the targets: SpO2 above 94%, MAP 90 or SBP 110 (14 years and over)." },
      { t: "Fluid checker", time: "6 min", text: "Work the scenarios. Decide before pressing the button, including the children's aliquot." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pairs run the venous return check and set up nasal EtCO2 sampling." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Brain injury: preventing the second insult" } },
      { text: "After the initial primary impact and brain injury, secondary brain insults can occur. Causes include hypoxaemia or hypercarbia, hypotension and ischaemia, hypoglycaemia, bleeding, cerebral oedema and seizures." },
      { text: "Hypoxia or hypercarbia, and hypotension, in particular, are predictors of poor outcome." },
      { text: "Maintaining cerebral perfusion is critical. That means adequate ventilation, an adequate blood pressure, avoiding hypotension, and preventing rises in intracranial pressure. The target blood pressure should take into account the potential loss of cerebral autoregulation." }
    ] },

    { title: "The guideline", blocks: [
      { box: { title: "Universal care, including monitoring of", check: { q: "Your TBI patient is breathing spontaneously with an EtCO2 of 38. Can you rely on that number?", a: "Not entirely. CPG-144-P says EtCO2 numbers may be unreliable in spontaneously breathing patients. Use the trend and waveform with the rest of your assessment." }, items: [
        "GCS, ECG and BGL",
        "Pulse oximetry: aim for SpO2 above 94%",
        "EtCO2: numbers may be unreliable in spontaneously breathing patients"
      ] } },
      { box: { title: "Support and advice", items: [
        "Consider clinical support, for example ICP or MedSTAR",
        "Consider an EOC Clinician consult for advice on treatment plans, or to liaise with the SAAS Medical Practitioner"
      ] } },
      { box: { title: "Establish IV access and protect the blood pressure", tone: "warn", items: [
        "14 years and over: IV saline 250 mL aliquots up to 20 mL/kg. Aim to establish or maintain MAP 90 mmHg or more, or SBP 110 mmHg or more",
        "Under 14 years: IV saline 10 mL/kg aliquots (max 250 mL) up to 20 mL/kg. Aim to establish or maintain a normal SBP for age, as per the RDR"
      ] } },
      { box: { title: "Exclude or treat other causes of altered behaviour", items: [
        "Hypovolaemia", "Hypoglycaemia", "Alcohol or psychostimulant overdose", "Psychosis"
      ] } },
      { box: { title: "Optimise cerebral venous return", tiles: true, steps: [
        { t: "Head up 30 degrees", text: "If the patient's condition permits. Gravity helps venous drainage from the head." },
        { t: "Neck position", text: "Abnormal neck position restricts venous drainage." },
        { t: "Clothing and collars", text: "Loosen constrictive clothing and tight collars." },
        { t: "Airway ties", text: "Tight airway device ties compress the neck veins. Check them." }
      ] } },
      { box: { title: "Rapid transport and notification", items: [
        "Provide rapid transport and notify as per the Major Trauma Triage Tool, the DTT, or the local regional arrangement",
        "Eyre Peninsula (DSY local arrangement): notify the local hospital or trauma bypass. MedSTAR is notified via the EOC"
      ] } }
    ] },

    { title: "Fluid checker", blocks: [
      { tool: {
        title: "Saline aliquot checker",
        intro: "Enter the patient's age group, weight, fluid given so far and blood pressure to see the next step under CPG-144-P.",
        check: { q: "A 9 year old, 30 kg, hypotensive for age after a fall. What size is each saline aliquot, and what is the total limit?", a: "10 mL/kg, so 250 mL (the 300 mL is capped at 250 mL). Up to 20 mL/kg in total: 600 mL. Aim for a normal SBP for age as per the RDR." },
        fields: [
          { id: "adult", type: "yesno", label: "Is the patient 14 years or older?" },
          { id: "kg", type: "number", label: "Weight (kg)", step: "1", placeholder: "e.g. 80" },
          { id: "given", type: "number", label: "Saline given so far this job (mL)", step: "50", placeholder: "0" },
          { id: "sbp", type: "number", label: "Systolic BP (mmHg). 14 and over", step: "1", placeholder: "e.g. 100", optional: true },
          { id: "map", type: "number", label: "MAP (mmHg), if you have it. 14 and over", step: "1", placeholder: "e.g. 78", optional: true },
          { id: "lowForAge", type: "yesno", label: "Under 14: is the SBP below normal for age (RDR)?", optional: true }
        ],
        evaluate: function (v) {
          var max = Math.round(20 * v.kg), left = Math.max(0, max - v.given), why = [], tail = ["Reassess after each aliquot", "Rapid transport and notify (MTT, DTT or local arrangement)"];
          var aliquot = v.adult ? 250 : Math.min(250, Math.round(10 * v.kg));
          why.push((v.adult ? "14 and over: 250 mL aliquots" : "Under 14: 10 mL/kg aliquots, max 250 mL, so " + aliquot + " mL") + ", up to 20 mL/kg = " + max + " mL in total");
          if (v.adult) {
            if (v.sbp === null && v.map === null) return { tone: "warn", headline: "Enter the SBP or the MAP", why: ["The 14 and over target is MAP 90 mmHg or more, or SBP 110 mmHg or more"] };
            var met = (v.map !== null && v.map >= 90) || (v.sbp !== null && v.sbp >= 110);
            if (met) { why.push((v.map !== null && v.map >= 90 ? "MAP " + v.map + " (90 or more)" : "SBP " + v.sbp + " (110 or more)") + ": target met");
              return { tone: "ok", headline: "Target met: maintain it", why: why, actions: ["No aliquot needed right now", "Keep monitoring: if the MAP drops below 90 and the SBP below 110, give the next aliquot (" + left + " mL left of the 20 mL/kg)"].concat(tail) }; }
            why.push("Below target" + (v.sbp !== null ? ": SBP " + v.sbp : "") + (v.map !== null ? (v.sbp !== null ? ", MAP " : ": MAP ") + v.map : ""));
          } else {
            if (v.lowForAge === null) return { tone: "warn", headline: "Check the SBP against the RDR", why: ["Under 14, the target is a normal SBP for age as per the RDR"] };
            if (!v.lowForAge) { why.push("SBP normal for age: target met");
              return { tone: "ok", headline: "Target met: maintain it", why: why, actions: ["No aliquot needed right now", "Keep monitoring against the RDR (" + left + " mL left of the 20 mL/kg)"].concat(tail) }; }
            why.push("SBP below normal for age");
          }
          if (left <= 0) { why.push(v.given + " mL given: the 20 mL/kg limit is reached");
            return { tone: "no", headline: "20 mL/kg reached: no more saline under the guideline", why: why, actions: ["Consider an EOC Clinician consult for advice on the treatment plan", "Consider clinical support (ICP, MedSTAR)", "Exclude other causes, such as hypovolaemia from another injury"].concat(tail) }; }
          var next = Math.min(aliquot, left);
          if (next < aliquot) why.push("Only " + left + " mL left before 20 mL/kg");
          return { tone: "warn", headline: "Give " + next + " mL IV saline", why: why,
            actions: ["IV saline " + next + " mL, then reassess the blood pressure", "Up to " + max + " mL in total (20 mL/kg)", "Aim for " + (v.adult ? "MAP 90 mmHg or more, or SBP 110 mmHg or more" : "a normal SBP for age as per the RDR")].concat(tail) };
        },
        disclaimer: "Training aid only. Use the current guideline, the SAAS Clinical app and the EOC Clinician for real patients.",
        scenariosNote: "Examples written for training from CPG-144-P. Decide before pressing the button.",
        scenarios: [
          { title: "Motorbike, GCS 9", text: "28 years, 80 kg. SBP 96, MAP 70. No fluid yet.", values: { adult: true, kg: 80, given: 0, sbp: 96, map: 70 } },
          { title: "Exactly on target", text: "45 years, 90 kg. SBP 104 but MAP 90. 250 mL given.", values: { adult: true, kg: 90, given: 250, sbp: 104, map: 90 } },
          { title: "SBP 110, MAP 84", text: "60 years, 70 kg, fall from a ladder. 500 mL given.", values: { adult: true, kg: 70, given: 500, sbp: 110, map: 84 } },
          { title: "Nearly at the limit", text: "19 years, 60 kg. SBP 98, MAP 76. 1100 mL given.", values: { adult: true, kg: 60, given: 1100, sbp: 98, map: 76 } },
          { title: "Limit reached", text: "35 years, 50 kg. SBP 100, MAP 80. 1000 mL given.", values: { adult: true, kg: 50, given: 1000, sbp: 100, map: 80 } },
          { title: "Child off a horse", text: "9 years, 30 kg. SBP below normal for age on the RDR. No fluid yet.", values: { adult: false, kg: 30, given: 0, lowForAge: true } },
          { title: "Toddler, second aliquot", text: "2 years, 12 kg. Still below normal for age. 120 mL given.", values: { adult: false, kg: 12, given: 120, lowForAge: true } }
        ]
      } }
    ] },

    { title: "The agitated patient", blocks: [
      { text: "Some patients with traumatic brain injuries are significantly agitated. That can get in the way of timely resuscitative assessment and management." },
      { box: { title: "What CPG-144-P says", tone: "warn", check: { q: "An agitated, combative TBI patient needs sedation to be assessed safely. What does CPG-144-P recommend, and what monitoring is essential?", a: "Early clinical support for potential sedation. Capnography via a nasal sampling line, to detect hypoventilation before hypoxia shows." }, items: [
        "Early clinical support is recommended for potential sedation, to enable safe assessment and management",
        "Capnography via a nasal sampling line is essential, to detect hypoventilation before hypoxia manifests",
        "Sedatives and opiates act synergistically. Together they can worsen tidal volume, respiratory rate and haemodynamic compromise, so use them together judiciously",
        "Before you blame the head injury, exclude or treat hypovolaemia, hypoglycaemia, alcohol or psychostimulant overdose, and psychosis"
      ] } },
      { box: { title: "What raises intracranial pressure", items: [
        "Straining or gagging",
        "Restricted venous drainage from the head: abnormal neck position, gravitational resistance (lying flat), or compression around the neck from tight collars and advanced airway device ties"
      ] } }
    ] },

    { title: "Hypoxic brain injury", blocks: [
      { text: "The guideline's main focus is traumatic brain injury. Patients with a sudden-onset hypoxic brain injury may also be treated using CPG-144-P. Examples: CVA, intracerebral bleed, post drowning, post hanging." },
      { box: { title: "Strongly consider", tone: "warn", items: ["Consulting the SAAS Medical Practitioner in these circumstances (via an EOC Clinician consult)"] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { table: { title: "Targets and fluids (CPG-144-P)", table: { head: ["", "14 years and over", "Under 14 years"], rows: [
        ["SpO2", "Above 94%", "Above 94%"],
        ["Blood pressure target", "MAP 90 mmHg or more, or SBP 110 mmHg or more", "Normal SBP for age (RDR)"],
        ["Saline aliquot", "250 mL", "10 mL/kg (max 250 mL)"],
        ["Total saline", "Up to 20 mL/kg", "Up to 20 mL/kg"]
      ] } } },
      { links: [
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
        { label: "CPG-144-P Traumatic or Hypoxic Brain Injury (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Traumatic%20or%20Hypoxic%20Brain%20Injury%20-%20P.pdf" },
        { label: "CTL-075 GCS (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/GCS%20(Glasgow%20Coma%20Score).pdf" },
        { label: "CTL-042 Major Trauma Tool (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/Major%20Trauma%20Tool.pdf" },
        { label: "CTL-070 Adult RDR Chart (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/Adult%20RDR%20Chart.pdf" }
      ] },
      { note: "Paediatric RDR Charts (CTL-046): open them in the SAAS Clinical app." }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "Which secondary insults does CPG-144-P name as particular predictors of poor outcome?", options: ["Seizures and bleeding", "Hypoxia/hypercarbia and hypotension", "Hypoglycaemia and cerebral oedema"], answer: 1,
        why: "Hypoxia/hypercarbia and hypotension, in particular, are predictors of poor outcome." },
      { q: "What SpO2 does the guideline aim for?", options: ["Above 90%", "Above 94%", "92 to 96%"], answer: 1,
        why: "Pulse oximetry, aim for SpO2 of > 94%." },
      { q: "Your patient is breathing spontaneously. What does the guideline say about EtCO2?", options: ["It is the most reliable vital sign", "The numbers may be unreliable", "Don't use it until the patient is intubated"], answer: 1,
        why: "EtCO2 numbers may be unreliable in spontaneously breathing patients. Nasal capnography is still essential in the agitated, sedated patient." },
      { q: "Blood pressure target for a patient 14 years or older?", options: ["SBP 90 mmHg or more", "MAP 90 mmHg or more, or SBP 110 mmHg or more", "MAP 65 mmHg or more"], answer: 1,
        why: "Aim to establish/maintain MAP ≥ 90 mmHg or SBP ≥ 110 mmHg." },
      { q: "Saline for an adult with TBI and hypotension?", options: ["500 mL boluses, no limit", "250 mL aliquots up to 20 mL/kg", "10 mL/kg aliquots up to 40 mL/kg"], answer: 1,
        why: "≥ 14 years: IV saline 250 mL aliquots up to 20 mL/kg." },
      { q: "A 6 year old weighing 20 kg. What size is each saline aliquot?", options: ["250 mL", "200 mL", "100 mL"], answer: 1,
        why: "< 14 years: 10 mL/kg aliquots (max 250 mL). 10 x 20 kg = 200 mL, up to 20 mL/kg (400 mL) in total." },
      { q: "Why does the target blood pressure matter more after a brain injury?", options: ["Because of the potential loss of cerebral autoregulation", "Because saline reduces cerebral oedema", "It doesn't: any SBP is fine"], answer: 0,
        why: "Maintaining an adequate blood pressure should take into account the potential loss of cerebral autoregulation." },
      { q: "Which of these does the guideline list to optimise cerebral venous return?", options: ["Lie the patient flat", "30 degrees head up if the condition permits, and check the neck, collars and airway ties", "Tighten the airway ties to secure the tube"], answer: 1,
        why: "Posture 30 degrees head up if patient condition permits; neck position, constrictive clothing, tight collars, tight airway ties." },
      { q: "Which is NOT listed as a cause of altered behaviour to exclude or treat?", options: ["Hypoglycaemia", "Psychosis", "Hyperthermia"], answer: 2,
        why: "Exclude or treat hypovolaemia, hypoglycaemia, alcohol/psychostimulant OD and psychosis." },
      { q: "A significantly agitated TBI patient is impeding assessment. What does the guideline recommend?", options: ["Physical restraint and transport", "Early clinical support for potential sedation", "Wait until they settle"], answer: 1,
        why: "Early clinical support is recommended for potential sedation to enable safe assessment and management." },
      { q: "Why is nasal capnography essential in that patient?", options: ["To detect hypoventilation before hypoxia manifests", "To measure intracranial pressure", "To confirm the GCS"], answer: 0,
        why: "Respiratory status using capnography via a nasal sampling line is essential to detect hypoventilation before hypoxia manifests itself." },
      { q: "A patient found after a hanging has a hypoxic brain injury. What does CPG-144-P say?", options: ["The guideline doesn't apply", "They may be treated using this CPG; strongly consider consulting the SAAS Medical Practitioner", "Treat as a stroke only"], answer: 1,
        why: "Sudden onset hypoxic brain injury (e.g. CVA, intracerebral bleed, post drowning, post hanging) may be treated using this CPG. It is strongly advised to consider consulting the SAAS Medical Practitioner." }
    ] } }] },

    { title: "Practical: second-insult check", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["A partner or manikin on a stretcher", "Monitor with nasal EtCO2 sampling line", "A cervical collar and a tube tie or tape", "The SAAS Clinical app (RDR charts)"] } },
      { steps: [
        { t: "Venous return check", text: "Partner on the stretcher. Sit them 30 degrees head up, then check the neck position, clothing, collar fit and ties. Say what each one does." },
        { t: "Nasal capnography", text: "Fit a nasal sampling line and get a waveform. Talk through why the number may be unreliable but the trend still matters." },
        { t: "Fluid sums", text: "Each person picks a weight and age. Work out the aliquot and the 20 mL/kg total aloud. Check one child on the RDR." },
        { t: "The call", text: "Role-play the EOC call: mechanism, GCS, SpO2, BP or MAP, fluid given, and asking for clinical support and MedSTAR notification." }
      ] },
      { box: { title: "What good looks like", items: ["Head up and neck checked without being prompted", "Targets said correctly for both age groups", "Fluid totals right, with the paediatric 250 mL cap", "Other causes of altered behaviour considered, including the BGL"] } },
      { note: "Suggested activities written for training. Check them with your lead instructor." }
    ] },

    { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "The Resus Room is a UK emergency medicine podcast. Its \"Head Injury; Roadside to Resus\" episode (July 2018, about 48 minutes) follows the head-injured patient from the roadside to the resus room, and \"Head Injury Updates; Roadside to Resus\" (May 2023, about 33 minutes) revisits it. Optional listening. They reflect UK practice, so where they differ from CPG-144-P, follow the guideline." },
      { links: [
        { label: "Head Injury; Roadside to Resus (2018)", href: "https://theresusroom.libsyn.com/head-injury-roadside-to-resus" },
        { label: "Head Injury Updates; Roadside to Resus (2023)", href: "https://theresusroom.libsyn.com/head-injury-updates-roadside-to-resus" }
      ] }
    ] }
  ]
};
