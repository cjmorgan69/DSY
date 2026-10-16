/* Pain Management - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Sources: SAAS CPP-013-AO Pain Management - AO v7.2 (3 December 2025), exported 31.08.2026; CTL-097 Sedation Score
   v1.0 (28 March 2023); CPPRO-013 Intranasal Medication Administration v2.0 (review date March 2021, now passed),
   mucosal atomiser (MAD) method only; CPP-011-AO Narcotic Overdose - AO v4.0. Adult IN fentanyl preparation and dose
   (300 microg/mL vial, up to 180 microg, 90 microg per nostril, total max 400 microg) are from the SAAS Clinical app's
   medicine data for authorised AOs. Written for crews authorised to carry IN fentanyl and sublingual ketamine, as the
   DSY lead instructor asked; children's fentanyl doses are left to the EOC Clinician. Nothing clinical here goes
   beyond those documents. */
var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Pain management",
  subtitle: "Ambulance Officer microlearning",
  headline: "Multimodal pain relief, and IN fentanyl and ketamine for authorised crews",
  lead: "Pain relief is a fundamental human right. This module covers the AO pain protocol: assessing pain, non-drug measures, paracetamol, ibuprofen and methoxyflurane, then intranasal fentanyl and sublingual ketamine for crews authorised to carry them, and the sedation score that keeps opioids safe.",
  minutes: 25,

  protocol: {
    code: "CPP-013-AO", name: "Pain Management - AO", version: "v7.2 (3 December 2025)", exported: "31 August 2026",
    also: [{ code: "CTL-097", name: "Sedation Score", version: "v1.0 (28 March 2023)" },
           { code: "CPPRO-013", name: "Intranasal Medication Administration", version: "v2.0 (review date March 2021)" }]
  },
  footerNotes: ["IN fentanyl and sublingual ketamine are only for Ambulance Officers with a specific SAAS authority to carry and administer them. Ibuprofen is only for crews who have completed the ibuprofen eLearning and face-to-face component.",
    "Adult IN fentanyl preparation and dose come from the SAAS Clinical app's medicine data. CPPRO-013 is past its review date (March 2021); only its mucosal atomiser (MAD) method is shown. Check the SAAS Clinical app for any newer version.",
    "Children's fentanyl doses are not shown: the EOC Clinician advises the dose and preparation."],

  session: {
    intro: "For a team-led session. Allow about 30 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Read the introduction", time: "4 min", text: "Read the non-drug measures aloud and give an example of each from a recent job." },
      { t: "Multimodal analgesia", time: "5 min", text: "Take turns reading a box. Check everyone can say the time gaps: paracetamol 4 hours, ibuprofen 6 hours." },
      { t: "IN fentanyl", time: "8 min", text: "Learn the sedation score, then work the checker scenarios. Decide before pressing the button." },
      { t: "Ketamine and when it goes wrong", time: "4 min", text: "Read the ketamine criteria and the opioid overdose steps." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "4 min", text: "Pairs practise priming a MAD with water and making the EOC Clinician call." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "", title: "Pain management: what AOs need to know" } },
      { text: "Pain is an unpleasant and emotional experience, a product of the brain's interpretation of a stimulus. It is shaped by culture, environment, social factors and past experience, so it is unique to each person." },
      { text: "Pain management is a fundamental human right. Start it as soon as it's clinically appropriate, and don't rely only on medicines. Reassurance, distraction, temperature control, splinting and posture all help. So do validation, empathy, active listening and setting expectations: they can reduce the medicine a patient needs." },
      { text: "The aim is to reduce pain to a comfortable or tolerable level, not to take it away completely." }
    ] },

    { title: "Assess, then treat", blocks: [
      { box: { title: "Every patient in pain", steps: [
        { t: "Basic care and life support", text: "Assess and record baseline vital signs." },
        { t: "Pain score before and after", text: "Self-report if they can communicate: Numerical Rating Scale or Faces Pain Scale-Revised. If not, a behavioural tool: FLACC, r-FLACC or PAINAD." },
        { t: "Non-drug measures", text: "Reassurance, distraction, temperature control, splinting and posture." },
        { t: "Reassess regularly", text: "Trends in pain scores show whether treatment is working." },
        { t: "Opioids given?", text: "Monitor the sedation score, RR, SpO2, HR and BP." }
      ] } },
      { box: { title: "Ongoing uncontrolled pain: multimodal analgesia", check: { q: "An adult took two paracetamol 3 hours ago and ibuprofen 7 hours ago. What can you give?", a: "Ibuprofen 400 mg (none in the past 6 hours), if there are no contraindications. Not paracetamol: it was given within the past 4 hours. Methoxyflurane is also an option." }, items: [
        "Paracetamol, if none in the past 4 hours: adults 1000 mg oral. Children under 16: consult the EOC Clinician for the oral dose",
        "Ibuprofen, if no ibuprofen or other NSAIDs in the past 6 hours: adults 400 mg oral. Children under 16: consult the EOC Clinician. Check the contraindications in the drug monograph",
        "Methoxyflurane 3 mL, repeated once if needed. Never more than 2 doses in 24 hours, or 15 mL in a week",
        "Consider paracetamol and/or ibuprofen in all patients. Together they may be as effective as oral opioids for musculoskeletal injuries"
      ] } },
      { box: { title: "Ibuprofen: take care", tone: "warn", items: [
        "It can cause serious harm, especially in pregnancy, chronic kidney disease, heart failure and a history of myocardial infarction",
        "If there is any doubt about its safe use, withhold it",
        "Common NSAIDs include ibuprofen, aspirin, naproxen, diclofenac and celecoxib: check what the patient has already taken",
        "Only for clinicians who have completed the ibuprofen eLearning and face-to-face component"
      ] } },
      { text: "Methoxyflurane's rapid onset and short duration suit brief painful procedures such as extrication or splinting. Time it deliberately. And check what's already been given, especially on a transfer." }
    ] },

    { title: "IN fentanyl (authorised AOs)", blocks: [
      { text: "When oral and inhaled analgesics are, or are likely to be, ineffective, AOs with a specific SAAS authority may use intranasal fentanyl, after consulting the EOC Clinician. Opioid stewardship applies: always use the lowest effective dose. Paracetamol alongside reduces the opioid needed." },
      { table: { title: "Sedation Score (CTL-097)", table: { head: ["Score", "Descriptor", "Stimulus", "Response"], rows: [
        ["0", "Awake, alert when approached", "N/A", "N/A"],
        ["1", "Easy to rouse", "Voice, light touch", "Eye opening and eye contact for more than 10 seconds"],
        ["2", "Easy to rouse, difficulty staying awake", "Voice, light touch", "Eye opening and eye contact for less than 10 seconds"],
        ["3", "Difficult to rouse", "Pain, shoulder squeeze", "Brief eye opening, any movement, or no response"]
      ] }, text: "Fentanyl needs a sedation score below 2. A score of 2 or more: cease all further fentanyl and consult the EOC Clinician. Sedation scores are a sensitive early warning of ventilatory impairment." } },
      { tool: {
        title: "IN fentanyl checker",
        intro: "Answer the questions to see what CPP-013-AO says. For adults it shows the preparation from the SAAS Clinical app. For children the EOC Clinician advises the dose.",
        check: { q: "Adult, sedation score 1, severe pain, SBP 100. Is fentanyl an option?", a: "Yes: SBP 100 meets the adult limit (100 mmHg or more). Consult the EOC Clinician, who may advise IN fentanyl." },
        fields: [
          { id: "auth", type: "yesno", label: "Is your crew authorised by SAAS to carry and give IN fentanyl?" },
          { id: "age", type: "choice", label: "Age", options: [{ value: "adult", label: "Adult (16 or over)" }, { value: "child", label: "Child, 1 to under 16" }, { value: "infant", label: "Under 1" }] },
          { id: "sed", type: "choice", label: "Sedation score (CTL-097)", options: [{ value: "0", label: "0: awake, alert" }, { value: "1", label: "1: easy to rouse" }, { value: "2", label: "2: difficulty staying awake" }, { value: "3", label: "3: difficult to rouse" }] },
          { id: "pain", type: "yesno", label: "Uncontrolled or severe pain?" },
          { id: "sbp", type: "number", label: "Systolic BP (mmHg)", step: "1", placeholder: "e.g. 128" },
          { id: "childbp", type: "yesno", label: "Children only: is the systolic at least the lower end of normal for age on the RDR chart?", optional: true },
          { id: "given", type: "number", label: "Adults: fentanyl already given this job (microg)", optional: true, step: "1", placeholder: "0" }
        ],
        evaluate: function (v) {
          var multimodal = "Multimodal analgesia: paracetamol (none in the past 4 hours), ibuprofen (no NSAIDs in the past 6 hours), methoxyflurane 3 mL";
          if (!v.auth) return { tone: "", headline: "No IN fentanyl for this crew",
            why: ["IN fentanyl must only be given by Ambulance Officers with a specific SAAS authority to carry and administer it"], actions: [multimodal, "Non-drug measures, and consult the EOC Clinician if pain stays uncontrolled"] };
          if (+v.sed >= 2) return { tone: "no", headline: "Sedation score " + v.sed + ": no fentanyl",
            why: ["CPP-013-AO: fentanyl needs a sedation score less than 2"], actions: ["Cease all further fentanyl and consult the EOC Clinician", "Basic care; monitor RR, SpO2, HR and BP", "If breathing becomes ineffective and the airway is compromised: basic care including IPPV, and consult the EOC Clinician, who may advise IM naloxone 400 microg (CPP-011-AO)"] };
          if (!v.pain) return { tone: "", headline: "Fentanyl not indicated",
            why: ["CPP-013-AO: IN fentanyl is for uncontrolled or severe pain"], actions: [multimodal, "Reassess pain scores regularly"] };
          var after = ["Reassess vital signs every 5 minutes and monitor the sedation score",
            "Cease all further fentanyl and consult the EOC Clinician if the sedation score reaches 2 or more, or the systolic BP falls below the limit",
            "Provide transport and notify the receiving facility"];
          if (v.age === "infant") return { tone: "warn", headline: "Under 1: consult the EOC Clinician",
            why: ["CPP-013-AO: for children under 1, the EOC Clinician will liaise with the SAAS Medical Practitioner"], actions: ["Consult the EOC Clinician"].concat(after) };
          if (v.age === "child") {
            if (v.childbp === null || v.childbp === undefined) return { tone: "warn", headline: "Check the RDR chart",
              why: ["Children 1 to under 16 need a systolic at the lower end of normal for age, per the RDR chart"], actions: ["Answer the children's blood pressure question"] };
            if (!v.childbp) return { tone: "no", headline: "Systolic too low for fentanyl",
              why: ["The systolic is below the lower end of normal for age on the RDR chart"], actions: ["No fentanyl. Consult the EOC Clinician", multimodal] };
            return { tone: "warn", headline: "Consult the EOC Clinician about IN fentanyl",
              why: ["Sedation score " + v.sed + " (less than 2), uncontrolled or severe pain, systolic at least the lower end of normal for age"],
              actions: ["Consult the EOC Clinician, who may advise the IN fentanyl dose and the specific drug preparation", "Repeat doses only as the EOC Clinician instructs"].concat(after) };
          }
          if (v.sbp < 100) return { tone: "no", headline: "SBP " + v.sbp + ": no fentanyl",
            why: ["Adults need a systolic BP of 100 mmHg or more"], actions: ["No fentanyl (cease if already given). Consult the EOC Clinician", multimodal] };
          var given = v.given > 0 ? v.given : 0, left = 400 - given;
          var why = ["Sedation score " + v.sed + " (less than 2), uncontrolled or severe pain, SBP " + v.sbp + " mmHg (100 or more)"];
          if (given) why.push(given + " microg given so far: " + (left > 0 ? left + " microg left before the total maximum of 400 microg" : "the total maximum of 400 microg is reached"));
          if (left <= 0) return { tone: "no", headline: "Total maximum reached", why: why, actions: ["No more fentanyl. Consult the EOC Clinician"].concat(after) };
          var dose = Math.min(180, left), vol = Math.round(dose / 300 * 100) / 100;
          return { tone: "warn", headline: "Consult the EOC Clinician about IN fentanyl", why: why,
            actions: ["Consult the EOC Clinician, who may advise IN fentanyl",
              "SAAS Clinical app, adults: up to 180 microg (0.6 mL of 300 microg/mL) a dose, up to 90 microg (0.3 mL) per nostril" + (dose < 180 ? ". Only " + dose + " microg (" + vol + " mL) is left before the total maximum" : ""),
              "1 mL luer-lock syringe with a MAD; prime the MAD with 0.1 mL (first dose only); each 0.1 mL is 30 microg",
              "Repeat only as the EOC Clinician directs; total maximum 400 microg"].concat(after),
            note: "The app also asks for a stable GCS (or the patient's normal GCS). Opioid naive, elderly or frail patients, and those on medicines that add to opioid effects, are at higher risk: the lowest effective dose." };
        },
        disclaimer: "Training aid only. Use the current protocol, the SAAS Clinical app and the EOC Clinician for real patients.",
        scenariosNote: "Examples written for training from CPP-013-AO and the SAAS Clinical app. Decide before pressing the button.",
        scenarios: [
          { title: "Fractured ankle", text: "Adult, sedation 0, severe pain after Penthrox and paracetamol, SBP 134.", values: { auth: true, age: "adult", sed: "0", pain: true, sbp: 134, given: 0 } },
          { title: "Exactly 100", text: "Adult, sedation 1, severe back pain, SBP 100.", values: { auth: true, age: "adult", sed: "1", pain: true, sbp: 100, given: 0 } },
          { title: "SBP 96", text: "Adult, sedation 0, fractured femur, SBP 96.", values: { auth: true, age: "adult", sed: "0", pain: true, sbp: 96, given: 0 } },
          { title: "Drowsy after a dose", text: "Adult given 180 microg, now struggling to stay awake (eye contact under 10 seconds). SBP 118.", values: { auth: true, age: "adult", sed: "2", pain: true, sbp: 118, given: 180 } },
          { title: "Third dose?", text: "Adult given 180 + 180 microg, still severe pain, sedation 0, SBP 124.", values: { auth: true, age: "adult", sed: "0", pain: true, sbp: 124, given: 360 } },
          { title: "Child, 9", text: "Broken arm, sedation 0, severe pain, systolic normal for age.", values: { auth: true, age: "child", sed: "0", pain: true, sbp: 104, childbp: true } },
          { title: "Not authorised", text: "Adult, severe pain, SBP 140, crew not authorised for fentanyl.", values: { auth: false, age: "adult", sed: "0", pain: true, sbp: 140 } }
        ]
      } },
      { box: { title: "Giving IN fentanyl with a MAD (CPPRO-013)", tiles: true, steps: [
        { t: "Check", text: "All medication checks, ideally cross-checked with a second clinician. Explain, gain consent, check allergies." },
        { t: "Draw up", text: "1 mL luer-lock syringe only, or the MAD can come off. Draw up more than the dose to allow for priming." },
        { t: "Prime", text: "Attach the MAD and prime so what's left in the syringe is the dose. Never prime for several doses in one syringe." },
        { t: "Give", text: "Patient blows their nose if appropriate. MAD about 1 cm in, aimed up and out toward the top of the ear. Push the plunger rapidly. No need to sniff." },
        { t: "Split and alternate", text: "Over 0.3 mL: half in each nostril. Alternate nostrils for later doses." },
        { t: "Record", text: "Dose, route and time on the PCR. Discarded fentanyl recorded in microg, witnessed and signed by a second clinician." }
      ] } },
      { box: { title: "Don't use the nose if", tone: "no", items: ["Allergy to the medication", "Suspected nasal fractures"],
        note: "Blood or mucus in the nose, or abnormal nasal anatomy, may reduce absorption (CPPRO-013 precautions)." } }
    ] },

    { title: "Sublingual ketamine (authorised AOs)", blocks: [
      { box: { title: "Ketamine wafer may be considered if", check: { q: "A 70-year-old with severe hip pain, GCS 15. Can you give a ketamine wafer?", a: "Not without advice: over 64 needs a SAAS Medical Officer consult, through the EOC Clinician." }, items: [
        "Pain score 7 to 10, and",
        "GCS 15 or the patient's normal GCS, and",
        "Aged 16 to 64",
        "Initial dose 25 mg (1 wafer). Reassess, and if needed after 15 minutes the dose may be repeated once",
        "Early EOC Clinician consult about the patient's complaint"
      ] } },
      { box: { title: "Ketamine: stop and consult", tone: "warn", items: [
        "Contraindicated in psychiatric presentations",
        "Consult a SAAS Medical Officer if the patient is under 16 or over 64, or has a history of severe mental health disorder",
        "Consult the EOC Clinician to give more than 50 mg (2 wafers)",
        "Only for Ambulance Officers with a specific SAAS authority to carry and administer it"
      ] } }
    ] },

    { title: "When opioids go wrong", blocks: [
      { text: "Ventilatory impairment is a common adverse effect of inappropriate opioid dosing. Hypotension after fentanyl is rare, but more likely if the patient is already haemodynamically compromised, so take care with any physiological abnormality (one or two red, or three yellow, RDR criteria, excluding pain)." },
      { box: { title: "Narcotic overdose (CPP-011-AO)", steps: [
        { t: "Effective breathing, airway patent", text: "Gag and cough reflexes intact: basic care, consider clinical support, transport and notify." },
        { t: "Ineffective breathing, airway compromised", text: "Basic care including IPPV. Consult the EOC Clinician, who may advise IM naloxone 400 microg, repeated as directed. Request clinical support. Transport and notify." },
        { t: "Unresponsive and pulseless", text: "Start CPR as per the cardiac arrest protocol." }
      ] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { table: { title: "Analgesia at a glance (CPP-013-AO)", table: { head: ["Medicine", "Adult dose", "Limits"], rows: [
        ["Paracetamol (oral)", "1000 mg", "None in the past 4 hours. Under 16: consult"],
        ["Ibuprofen (oral)", "400 mg", "No NSAIDs in the past 6 hours. Under 16: consult. Check contraindications"],
        ["Methoxyflurane (inhaled)", "3 mL", "Repeat once. Max 2 doses in 24 hours, 15 mL a week"],
        ["Fentanyl (IN, authorised)", "EOC Clinician advises (app: up to 180 microg)", "Sedation score under 2; adult SBP 100 or more; total max 400 microg"],
        ["Ketamine (SL wafer, authorised)", "25 mg, repeat once after 15 min", "Pain 7 to 10, GCS 15 or normal, 16 to 64. Over 50 mg: consult"]
      ] } } },
      { table: { title: "Pain assessment tools", items: [
        "Numerical Rating Scale and Faces Pain Scale-Revised (CTL-095): self-report, for patients who can communicate",
        "FLACC (CTL-092): pre-verbal children",
        "r-FLACC (CTL-093): children with cognitive impairment",
        "PAINAD (CTL-094): advanced dementia",
        "Use them as part of a full assessment (intensity, duration, location, description, impact), not in isolation"
      ] } },
      { links: [
        { label: "SAAS Clinical app (dose calculators and tools)", href: "https://clinical.saambulance.sa.gov.au" },
        { label: "CPPRO-013 Intranasal Medication Administration (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-013%20Intranasal%20Medication%20Administration.pdf" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "What is the aim of pain management in CPP-013-AO?", options: ["Complete pain relief", "A comfortable or tolerable level of pain", "A pain score of zero before transport"], answer: 1,
        why: "The aim is to reduce pain to a comfortable or tolerable level rather than complete pain relief." },
      { q: "Which is a behavioural and observational pain tool for advanced dementia?", options: ["FPS-R", "PAINAD", "Numerical Rating Scale"], answer: 1,
        why: "PAINAD is the behavioural and observational tool for advanced dementia; NRS and FPS-R are self-reporting scales." },
      { q: "An adult had paracetamol 2 hours ago. Can you give paracetamol now?", options: ["Yes, 1000 mg", "No, not if any was given in the past 4 hours", "Yes, 500 mg"], answer: 1,
        why: "Paracetamol: if no doses in past 4 hrs, adults oral 1000 mg." },
      { q: "When must ibuprofen be withheld?", options: ["Whenever there is any doubt about its safe use", "Only in children", "Never: it is always safe"], answer: 0,
        why: "If there is any ambiguity around its safe use the medication must be withheld. Take particular care in pregnancy, CKD, heart failure and a history of MI." },
      { q: "What is the methoxyflurane limit?", options: ["3 mL once only", "3 mL, repeated once; max 2 doses in 24 hours or 15 mL a week", "Unlimited while the patient is in pain"], answer: 1,
        why: "Methoxyflurane 3 mL, repeated once prn; total max doses 2 in 24 hrs, 15 mL per week." },
      { q: "Before IN fentanyl, the sedation score must be:", options: ["Less than 2", "Less than 3", "Exactly 0"], answer: 0,
        why: "Consult the EOC Clinician, who may advise IN fentanyl if the patient has a sedation score less than 2 and uncontrolled or severe pain." },
      { q: "What adult systolic BP is needed for IN fentanyl?", options: ["90 mmHg or more", "100 mmHg or more", "110 mmHg or more"], answer: 1,
        why: "Adults: systolic BP 100 mmHg or more." },
      { q: "After giving fentanyl, how often do you reassess vital signs?", options: ["Every 5 minutes", "Every 15 minutes", "Only at handover"], answer: 0,
        why: "Reassess vital signs every 5 mins and monitor the sedation score." },
      { q: "A patient given fentanyl now has trouble staying awake (eye contact under 10 seconds). What now?", options: ["Give a smaller dose", "Cease all further fentanyl and consult the EOC Clinician", "Wait 5 minutes and repeat"], answer: 1,
        why: "That is sedation score 2. Cease all further fentanyl and consult the EOC Clinician if the sedation score is 2 or more." },
      { q: "Drawing up IN fentanyl for a MAD, which syringe?", options: ["Any syringe", "A 1 mL luer-lock syringe", "A 5 mL slip-tip syringe"], answer: 1,
        why: "CPPRO-013: ensure a 1 mL luer-lock syringe is used, or the MAD may come off." },
      { q: "A dose is more than 0.3 mL. How do you give it?", options: ["All in one nostril", "Half into each nostril", "Ask the patient to sniff hard"], answer: 1,
        why: "For volumes over 0.3 mL, deliver half the dose into each nostril. The patient should not be told to sniff." },
      { q: "Who can have a sublingual ketamine wafer without a Medical Officer consult?", options: ["Anyone in severe pain", "Pain 7 to 10, GCS 15 or normal, aged 16 to 64", "Only children"], answer: 1,
        why: "Ketamine may be considered if pain score 7 - 10, GCS 15 or normal GCS, and aged 16 - 64. Consult a SAAS Medical Officer if under 16 or over 64." },
      { q: "An opioid-affected patient has ineffective breathing and no gag reflex. What does CPP-011-AO say?", options: ["Wait for clinical support", "Basic care including IPPV, and consult the EOC Clinician, who may advise IM naloxone 400 microg", "Give more fentanyl"], answer: 1,
        why: "Ineffective breathing, airway compromised: basic care including IPPV; consult EOC Clinician who may advise IM naloxone 400 microg." }
    ] } }] },

    { title: "Practical: MAD and the call", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["A training MAD and 1 mL luer-lock syringe", "Water (never real fentanyl)", "The SAAS Clinical app", "A blank PCR or notepad"] } },
      { steps: [
        { t: "Score each other", text: "Your partner acts out sedation scores 0 to 3. Name the score and what it means for fentanyl." },
        { t: "Prime a MAD", text: "With water only: draw up, attach the MAD, prime so 0.6 mL is left, and say how you'd split it between nostrils." },
        { t: "Make the call", text: "Role-play the EOC Clinician call: pain score, what's been given and when, sedation score, BP, and what you're asking for." },
        { t: "Record a discard", text: "Write the discard in microg as you would on a PCR, and have your partner witness it." }
      ] },
      { box: { title: "What good looks like", items: ["Pain score before and after", "Sedation score stated in the call", "BP checked against the limit before each dose", "Discard written in microg and witnessed"] } },
      { note: "Suggested activities written for training. Never use real medication or give anything to anyone. Check them with your lead instructor." }
    ] },

    { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "The Resus Room is a UK emergency medicine podcast. Its \"Pain; Roadside to Resus\" episode (June 2025, about 66 minutes) covers pain assessment and management from prehospital care to the emergency department. Optional listening. It reflects UK practice, so where it differs from CPP-013-AO, follow the protocol." },
      { links: [{ label: "Open the Resus Room pain episode", href: "https://theresusroom.libsyn.com/pain-roadside-to-resus" }] }
    ] }
  ]
};
