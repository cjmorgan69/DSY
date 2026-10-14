/* Sepsis - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Sources: SAAS CPP-062-AO Sepsis - AO, version 1.0 (3 December 2025), exported 31.08.2026, and the NEWS2 Adult
   Sepsis Screening Tool CTL-062 v1.1 (4 June 2025). The IM injection technique is from CPPRO-011 Intramuscular
   Injection v1.0 (review date June 2020, now passed). Written for crews who have completed the 2025 sepsis training
   and carry ceftriaxone, as the DSY lead instructor asked. Nothing clinical here goes beyond those documents. */
var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Sepsis",
  subtitle: "Ambulance Officer microlearning",
  headline: "Recognising sepsis early, and knowing when ceftriaxone is on the table",
  lead: "Sepsis is life threatening and can be hard to spot. This module covers the AO protocol: NEWS2 screening, oxygen, the blood pressure that changes the pathway, IM ceftriaxone for suspected meningococcal septicaemia, and who to call.",
  minutes: 25,

  protocol: {
    code: "CPP-062-AO", name: "Sepsis - AO", version: "v1.0 (3 December 2025)", exported: "31 August 2026",
    also: [{ code: "CTL-062", name: "NEWS2 Adult Sepsis Screening Tool", version: "v1.1 (4 June 2025)" },
           { code: "CPPRO-011", name: "Intramuscular Injection", version: "v1.0 (5 July 2017, review date June 2020)" }]
  },
  footerNotes: ["This module assumes your crew has completed the Sepsis eLearning and face-to-face PDW/CEP 2025 component and carries ceftriaxone. If not, follow the protocol's note at the top of CPP-062-AO.",
    "CPPRO-011 is past its review date (June 2020). Check the SAAS Clinical app for any newer version."],

  session: {
    intro: "For a team-led session. Allow about 30 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Read the introduction", time: "4 min", text: "Read the signs of sepsis aloud, one each." },
      { t: "Key points", time: "6 min", text: "Take turns reading a box. Stop at the blood pressure threshold and the ceftriaxone box and check everyone can say them back." },
      { t: "Work the scenarios", time: "8 min", text: "Open the sepsis checker. Decide the pathway, and for meningococcal cases the dose and volume, before pressing the button." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "7 min", text: "Pair up and practise reconstituting ceftriaxone with training stock. Do the rest in your own time." }
    ]
  },

  video: {
    src: "intro.mp4",
    poster: "intro-poster.jpg",
    title: "Sepsis: what AOs need to know"
  },

  intro: [
    "Sepsis is a life-threatening condition that arises when the body's response to an infection damages its own tissues and organs. Almost any type of infection can lead to it: lungs, abdomen, urinary tract, skin or other parts of the body. Early recognition and urgent treatment can save lives and prevent disability, but sepsis can be difficult to predict and diagnose.",
    "Signs can include one or more of: fast breathing or breathlessness; fever and chills; low body temperature; low or no urine output; a fast or slow heartbeat; nausea and vomiting; diarrhoea; fatigue, confusion or sleepiness; a lot of pain or \"feeling worse than ever\"; headache; a new rash, or discoloured or clammy, sweaty skin.",
    "Meningococcal disease is an acute bacterial infection that can cause death within hours if it is not recognised and treated. In confirmed meningococcal septicaemia, early antibiotics have been associated with reduced mortality. That is why AOs can give IM ceftriaxone, on EOC Clinician advice."
  ],

  keyPointsTitle: "Key points",
  keyPoints: [
    { title: "Before you use this protocol", tone: "warn", items: [
      "The new CPP-062-AO is only for clinicians who have completed both the Sepsis eLearning and the face-to-face component of the relevant PDW/CEP 2025. If you haven't, revert to the old CPP",
      "If you don't have access to ceftriaxone and suspect meningococcal septicaemia, give benzylpenicillin as per the old meningococcal CPP"
    ] },
    { title: "Every patient with a suspected infection", check: { q: "SpO2 is 92% in a patient with suspected sepsis. What does the protocol say?", a: "Apply high flow oxygen (SpO2 below 94%). If they have chronic lung disease, consult the EOC Clinician immediately about oxygen." }, steps: [
      { t: "Wear appropriate PPE" },
      { t: "Basic care and life support", text: "If SpO2 is below 94%, apply high flow oxygen. Suspected or confirmed chronic lung disease: consult the EOC Clinician immediately about oxygen." },
      { t: "NEWS2", text: "Use the NEWS2 Sepsis Scoring Calculator with the NEWS2 Adult Sepsis Screening Tool (CTL-062)." },
      { t: "Request clinical support" }
    ] },
    { title: "The blood pressure decides the pathway", tone: "warn", check: { q: "Suspected sepsis, systolic exactly 100. Which pathway?", a: "Suspected septic shock: the protocol's threshold is SBP 100 mmHg or less." }, items: [
      "Systolic above 100 mmHg: suspected sepsis",
      "Systolic 100 mmHg or less: suspected septic shock",
      "Treatment takes priority over screening when infection is clearly apparent and the patient is hypotensive"
    ] },
    { title: "Suspected sepsis, SBP above 100 mmHg", steps: [
      { t: "High-flow oxygen", text: "If SpO2 is below 94%. Chronic lung disease: consult the EOC Clinician immediately." },
      { t: "Priority transport", text: "To an appropriate facility." },
      { t: "Consult for ongoing management" },
      { t: "Notify", text: "Stating \"suspected sepsis\"." }
    ] },
    { title: "Suspected septic shock, SBP 100 mmHg or less", tone: "warn", steps: [
      { t: "Request early clinical support", text: "Stating \"suspected septic shock\"." },
      { t: "Don't let treatment delay extrication or transport", text: "Rendezvous with clinical support en route if required." },
      { t: "High-flow oxygen" },
      { t: "Priority transport", text: "To an appropriate receiving facility." },
      { t: "Notify", text: "Stating \"suspected septic shock\"." }
    ] },
    { title: "Suspected meningococcal septicaemia", items: [
      "Febrile with an altered conscious state, with or without a petechial or purpuric rash: consult the EOC Clinician about ceftriaxone",
      "The rash starts as a simple spot, becomes red pin-prick spots, then a widespread purple bruise-like rash. It is a late sign: no rash does not rule it out",
      "Known cephalosporin hypersensitivity, or an immediate or severe cephalosporin allergy: consult via the EOC Clinician for SAAS Medical Practitioner advice",
      "Otherwise, consult the EOC Clinician to give IM ceftriaxone 50 mg/kg, single maximum dose 2 g",
      "Priority transport to an appropriate facility; notify stating \"suspected sepsis\""
    ] },
    { title: "IM ceftriaxone: prepare and give", tiles: true, steps: [
      { t: "Consult and check", text: "EOC Clinician advice, repeated back. Check for cephalosporin allergy. Medication checks with your partner." },
      { t: "Work out the dose", text: "50 mg/kg, single maximum 2 g. 40 kg or more gets the full 2 g." },
      { t: "Reconstitute", text: "Each 1 g vial: add 3.5 mL sodium chloride 0.9% to make 4 mL (250 mg/mL)." },
      { t: "Draw up", text: "Volume = dose in mg divided by 250. A 2 g dose is 8 mL." },
      { t: "Split the sites", text: "Maximum 1 g (4 mL) per IM site, so 2 g needs two sites." },
      { t: "Inject", text: "Mid anterior-lateral thigh, 90 degrees, no need to draw back (CPPRO-011). Record the dose, sites and time." }
    ] }
  ],

  tool: {
    check: { q: "A 14 kg child with suspected meningococcal septicaemia. What dose and volume of IM ceftriaxone may the EOC Clinician advise?", a: "700 mg (50 mg/kg x 14 kg), which is 2.8 mL of the 250 mg/mL solution, in one site." },
    title: "Sepsis checker",
    intro: "Answer the questions and the CPP-062-AO pathway is shown, with the ceftriaxone dose and volume worked out from the weight. It follows version 1.0 and assumes your crew carries ceftriaxone.",
    fields: [
      { id: "infection", type: "yesno", label: "Is infection suspected?" },
      { id: "meningo", type: "yesno", label: "Suspected meningococcal septicaemia? (febrile with an altered conscious state, with or without a petechial or purpuric rash)" },
      { id: "sbp", type: "number", label: "Systolic blood pressure (mmHg)", step: "1", placeholder: "e.g. 96" },
      { id: "spo2", type: "number", label: "SpO2 (%)", step: "1", placeholder: "e.g. 93" },
      { id: "lung", type: "yesno", label: "Suspected or confirmed chronic lung disease?" },
      { id: "allergy", type: "yesno", label: "Known cephalosporin hypersensitivity or immediate/severe cephalosporin allergy?" },
      { id: "weight", type: "number", label: "Weight in kg (for ceftriaxone)", optional: true, step: "0.5", placeholder: "e.g. 70" }
    ],
    evaluate: function (v) {
      if (!v.infection) {
        return { tone: "", headline: "Infection not suspected", why: ["CPP-062-AO and NEWS2 sepsis screening are for patients with a suspected infection"],
          actions: ["Continue assessment and basic care"] };
      }
      var shock = v.sbp <= 100, why = [], actions = ["Wear appropriate PPE", "Basic care and life support"];
      var o2 = v.lung ? "Chronic lung disease: consult the EOC Clinician immediately for further support regarding oxygen" : null;
      if (shock) {
        why.push("SBP " + v.sbp + " mmHg: 100 or less, so suspected septic shock");
        actions = actions.concat(["Request early clinical support, stating \"suspected septic shock\"",
          "Treatment should not delay extrication or transport; rendezvous with clinical support en route if required",
          "Administer high-flow oxygen"]);
      } else {
        why.push("SBP " + v.sbp + " mmHg: above 100, so suspected sepsis");
        actions.push(v.spo2 < 94 ? "SpO2 " + v.spo2 + "% is below 94%: apply high-flow oxygen" : "SpO2 " + v.spo2 + "%: high-flow oxygen if it falls below 94%");
        actions.push("Request clinical support");
      }
      if (o2) actions.push(o2);
      if (!shock) actions.push("Adults: use the NEWS2 Sepsis Scoring Calculator with the NEWS2 Adult Sepsis Screening Tool (CTL-062). Children: no screening tool exists; use clinical judgement and the RDR chart");
      else actions.push("Treatment takes priority over sepsis screening when infection is clearly apparent and the patient is hypotensive");
      var note = "";
      if (v.meningo) {
        why.push("Suspected meningococcal septicaemia");
        if (v.allergy) {
          actions.push("Known cephalosporin hypersensitivity or immediate/severe cephalosporin allergy: consult via the EOC Clinician for SAAS Medical Practitioner advice");
        } else {
          var w = v.weight > 0 ? v.weight : null;
          if (!w) actions.push("Consult the EOC Clinician to administer IM ceftriaxone 50 mg/kg (single max 2 g). Weight is needed to work out the dose");
          else {
            var raw = 50 * w, dose = Math.min(raw, 2000), vol = Math.round(dose / 250 * 100) / 100, vials = Math.ceil(dose / 1000), sites = Math.ceil(dose / 1000);
            why.push(w + " kg x 50 mg/kg = " + raw + " mg" + (raw > 2000 ? ", so the single maximum of 2 g applies" : ""));
            actions.push("Consult the EOC Clinician to administer IM ceftriaxone " + (dose >= 1000 ? (dose / 1000) + " g" : dose + " mg") + ": " + vol + " mL of the 250 mg/mL solution (" + vials + (vials === 1 ? " vial" : " vials") + ", each 1 g with 3.5 mL sodium chloride 0.9% to make 4 mL), " + sites + (sites === 1 ? " IM site" : " IM sites, maximum 1 g (4 mL) per site"));
          }
        }
      }
      actions.push("Priority transport to an appropriate " + (shock ? "receiving facility" : "facility"));
      if (!shock && !v.meningo) actions.push("Consult for ongoing management");
      actions.push("Notify, stating \"" + (shock ? "suspected septic shock" : "suspected sepsis") + "\"");
      if (v.meningo && shock) note = "The protocol lists the meningococcal and blood pressure sections separately. With both, follow both: ceftriaxone on EOC Clinician advice, and the septic shock actions.";
      var head = v.meningo ? (v.allergy ? "Suspected meningococcal septicaemia: cephalosporin allergy, consult for medical advice" : shock ? "Suspected meningococcal septicaemia and septic shock" : "Suspected meningococcal septicaemia: consult about ceftriaxone")
        : (shock ? "Suspected septic shock" : "Suspected sepsis");
      return { tone: shock || v.meningo ? "warn" : "good", headline: head,
        why: why, actions: actions, note: note };
    },
    disclaimer: "Training aid only. Use the current protocol, the SAAS Clinical app and the EOC Clinician for real patients.",
    scenariosNote: "Examples written for training from the protocol. Decide your answer before pressing the button.",
    scenarios: [
      { title: "Chest infection, BP holding", text: "Suspected infection, SBP 118, SpO2 91%, no lung disease, no meningococcal features.", values: { infection: true, meningo: false, sbp: 118, spo2: 91, lung: false, allergy: false } },
      { title: "Urosepsis, low BP", text: "Suspected infection, SBP 88, SpO2 95%.", values: { infection: true, meningo: false, sbp: 88, spo2: 95, lung: false, allergy: false } },
      { title: "Exactly 100", text: "Suspected infection, SBP 100, SpO2 96%.", values: { infection: true, meningo: false, sbp: 100, spo2: 96, lung: false, allergy: false } },
      { title: "COPD and fever", text: "Suspected infection, known COPD, SBP 124, SpO2 89%.", values: { infection: true, meningo: false, sbp: 124, spo2: 89, lung: true, allergy: false } },
      { title: "Meningococcal, adult", text: "Febrile, confused, purple rash. 70 kg, SBP 104, SpO2 95%.", values: { infection: true, meningo: true, sbp: 104, spo2: 95, lung: false, allergy: false, weight: 70 } },
      { title: "Meningococcal and shocked", text: "Febrile, drowsy, rash. 60 kg, SBP 84, SpO2 92%.", values: { infection: true, meningo: true, sbp: 84, spo2: 92, lung: false, allergy: false, weight: 60 } },
      { title: "Child, 14 kg", text: "Febrile toddler, hard to rouse, no rash. 14 kg, SBP 102, SpO2 96%.", values: { infection: true, meningo: true, sbp: 102, spo2: 96, lung: false, allergy: false, weight: 14 } },
      { title: "Teenager, 30 kg", text: "Febrile, confused, petechiae. 30 kg, SBP 110, SpO2 97%.", values: { infection: true, meningo: true, sbp: 110, spo2: 97, lung: false, allergy: false, weight: 30 } },
      { title: "Cephalosporin allergy", text: "Febrile, confused, rash, known anaphylaxis to a cephalosporin. 75 kg, SBP 106.", values: { infection: true, meningo: true, sbp: 106, spo2: 96, lung: false, allergy: true, weight: 75 } }
    ]
  },

  referenceTitle: "NEWS2, children and doses",
  reference: [
    { title: "NEWS2 Adult Sepsis Screening Tool (CTL-062)", text: "Get the score from the SAAS NEWS2 Sepsis Scoring Calculator, then apply it. Use it with clinical judgement. Patients with suspected sepsis and hypotension should be treated without delay.", table: { head: ["NEWS2", "Risk", "Actions"], rows: [
      ["7 or more", "Very high", "Manage as per the Sepsis CPP; request clinical support if required; rapid transport with a GRN notification; say suspected sepsis at handover. Obs and NEWS2 every 15 min"],
      ["5 to 6, or any single score of 3", "High", "Consider management as per the Sepsis CPP; consider clinical support; transport; say suspected sepsis at handover. Obs and NEWS2 every 15 min"],
      ["3 to 4", "Moderate", "Consider transport, or treat and refer (Virtual Care, PCC or own GP); say suspected sepsis at handover. Obs and NEWS2 every 15 min"],
      ["0 to 2, no risk factors", "Low", "Consider treat and discharge or refer; transport if any clinical concern. At least two sets of obs including a NEWS2"]
    ] } },
    { title: "Adult risk factors (CTL-062)", items: [
      "Elderly and frail; Aboriginal or Torres Strait Islander; severe obesity",
      "Pregnancy (NEWS2 is not to be used over 20 weeks); recent surgery",
      "Indwelling medical device; diabetes; complex chronic diseases",
      "Risk of neutropenia (chemotherapy, immunosuppression); clinician or carer concern"
    ] },
    { title: "Recognising sepsis in children (CPP-062-AO)", text: "No screening tool exists for children: clinical judgement is the best tool. Use the Paediatric Assessment Triangle (appearance, work of breathing, circulation to the skin).", items: [
      "History or signs of infection, with any of: fever 38°C or more, or below 36°C; altered conscious state; marked or persistent tachycardia; signs of toxicity (less alert or active, pale or mottled with cool peripheries, weak cry or grunting, rigors, bounding or weak pulses); non-blanching rash; hypotension; unexplained generalised pain",
      "AND any purple zone observation on the RDR chart, two or more red zone observations, additional response criteria, or serious clinical concern",
      "Risk factors: under 3 months; indwelling device; unimmunised; Aboriginal or Torres Strait Islander; immunocompromised; chronic disease or congenital disorder; recent trauma, surgery, procedure or wound; known malignancy"
    ] },
    { title: "IM ceftriaxone by weight (50 mg/kg, single max 2 g, 250 mg/mL)", table: { head: ["Weight", "Dose", "Volume", "IM sites"], rows: [
      ["10 kg", "500 mg", "2 mL", "1"], ["14 kg", "700 mg", "2.8 mL", "1"], ["20 kg", "1 g", "4 mL", "1"], ["25 kg", "1.25 g", "5 mL", "2"],
      ["30 kg", "1.5 g", "6 mL", "2"], ["40 kg or more", "2 g", "8 mL", "2"]
    ] }, text: "Worked from the protocol's formula and dilution. Maximum 1 g (4 mL) per IM site. The EOC Clinician advises the dose; check it in the SAAS Clinical app." }
  ],
  links: [
    { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
    { label: "CPPRO-011 IM Injection (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-011%20Intramuscular%20Injection.pdf" }
  ],

  quiz: [
    { q: "What is sepsis?", options: ["A viral infection of the blood", "The body's response to an infection damaging its own tissues and organs", "A severe allergic reaction"], answer: 1,
      why: "Sepsis is a life-threatening condition that arises when the body's response to an infection damages its own tissues and organs." },
    { q: "Which tool does the AO use for a patient with suspected infection?", options: ["ROSIER", "The NEWS2 Sepsis Scoring Calculator with the NEWS2 Adult Sepsis Screening Tool", "The GCS alone"], answer: 1,
      why: "Use the NEWS2 Sepsis Scoring Calculator in conjunction with the NEWS2 Adult Sepsis Screening Tool CTL-062 for all patients with a suspected infection." },
    { q: "Below what SpO2 do you apply high flow oxygen?", options: ["90%", "94%", "98%"], answer: 1,
      why: "If SpO2 is below 94%, apply high flow oxygen." },
    { q: "A patient with suspected sepsis has COPD. What about oxygen?", options: ["Never give oxygen", "Consult the EOC Clinician immediately for further support regarding oxygen", "Give high flow regardless"], answer: 1,
      why: "If any suspected or confirmed history of chronic lung disease, consult the EOC Clinician immediately for further support regarding oxygen." },
    { q: "Which systolic BP puts a patient on the suspected septic shock pathway?", options: ["Below 90 mmHg", "100 mmHg or less", "Below 120 mmHg"], answer: 1,
      why: "Suspected sepsis and SBP 100 mmHg or less: request early clinical support, stating \"suspected septic shock\"." },
    { q: "In suspected septic shock, what must treatment not do?", options: ["Delay extrication or transport", "Include oxygen", "Involve the EOC Clinician"], answer: 0,
      why: "Treatment should not delay extrication or transport. Rendezvous with clinical support en route if required." },
    { q: "When should the EOC Clinician be consulted about ceftriaxone?", options: ["Any fever", "Febrile with an altered conscious state, with or without a petechial or purpuric rash", "Only when a purple rash is present"], answer: 1,
      why: "If a patient presents febrile with an altered conscious state, with or without a petechial or purpuric rash, the EOC Clinician should be consulted regarding ceftriaxone." },
    { q: "What does no rash tell you about meningococcal septicaemia?", options: ["It is ruled out", "Nothing: the rash is a late sign and its absence does not exclude it", "It is a viral illness"], answer: 1,
      why: "The rash is a late sign. Absence of a rash does not exclude meningococcal septicaemia." },
    { q: "What is the IM ceftriaxone dose?", options: ["25 mg/kg, max 1 g", "50 mg/kg, single max 2 g", "100 mg/kg, max 4 g"], answer: 1,
      why: "IM ceftriaxone 50 mg/kg up to a single maximum dose of 2 g, on EOC Clinician advice." },
    { q: "How is each 1 g vial prepared for IM use?", options: ["Add 9.5 mL water", "Add 3.5 mL sodium chloride 0.9% to make 4 mL (250 mg/mL)", "Give it as a powder"], answer: 1,
      why: "Each 1 g vial: dilute with 3.5 mL sodium chloride 0.9% to make 4 mL (250 mg/mL)." },
    { q: "An adult is advised 2 g IM. How many injection sites?", options: ["One", "Two", "Four"], answer: 1,
      why: "Administer a maximum of 1 g (4 mL) per IM injection site, so 2 g (8 mL) needs two sites." },
    { q: "The patient has a known severe cephalosporin allergy. What now?", options: ["Give half the dose", "Consult via an EOC Clinician for SAAS Medical Practitioner advice", "Give it in the other thigh"], answer: 1,
      why: "If known cephalosporin hypersensitivity or immediate/severe cephalosporin allergy, consult via an EOC Clinician for SAAS Medical Practitioner advice." }
  ],

  practical: {
    title: "Practical: NEWS2, ceftriaxone and the call",
    intro: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity.",
    equipment: ["The SAAS Clinical app (NEWS2 Sepsis Scoring Calculator)", "Training-stock ceftriaxone vials, sodium chloride 0.9%, syringes and needles", "A calculator", "Your station's medication check reference"],
    steps: [
      { t: "Score a patient", text: "Take a set of obs on your partner, invent a fever and confusion, and run the NEWS2 calculator. Say which CTL-062 band applies and what it asks you to do." },
      { t: "Decide the pathway", text: "Read out a systolic BP. Your partner says \"suspected sepsis\" or \"suspected septic shock\" and the first three actions." },
      { t: "Reconstitute", text: "With training stock only: 3.5 mL sodium chloride 0.9% into a 1 g vial to make 4 mL. Do the medication checks out loud." },
      { t: "Doses", text: "Out loud, work out the dose, volume and number of sites for 12 kg, 26 kg and 80 kg." },
      { t: "Make the call", text: "Role-play the EOC Clinician call for a febrile, confused patient with a rash: obs, weight, allergies, and what you are asking." }
    ],
    good: ["The SBP threshold and the right words (\"suspected sepsis\" or \"suspected septic shock\")", "Cephalosporin allergy asked before anything is drawn up", "Doses capped at 2 g and split at 1 g per site", "The EOC Clinician's advice repeated back"],
    note: "Suggested activities written for training. Never use real medication or inject anyone. Check them with your lead instructor."
  },

  furtherVideo: {
    src: "https://www.youtube.com/embed/-bt-H5VQl5E",
    title: "Septic shock: pathophysiology and symptoms (Khan Academy)",
    note: "Optional video from Khan Academy's medicine channel: \"Septic shock - pathophysiology and symptoms\" (about 10 minutes, from its NCLEX-RN series). It is a US nursing-exam video and explains what happens in the body in sepsis and septic shock. I have not checked its content against CPP-062-AO, so where it differs from the protocol, follow the protocol."
  },

  podcast: {
    title: "The Resus Room: Sepsis; Roadside to Resus",
    summary: "The Resus Room is a UK emergency medicine podcast. Its \"Sepsis; Roadside to Resus\" episode (February 2018, about 70 minutes) covers sepsis from prehospital recognition to the resus room. Optional listening. It reflects UK practice from 2018, so where it differs from CPP-062-AO, follow the protocol.",
    link: "https://theresusroom.libsyn.com/sepsis-roadside-to-resus",
    linkLabel: "Open the Resus Room sepsis episode"
  },
  furtherLinks: [
    { label: "Khan Academy: Septic shock, diagnosis and treatment (about 8 minutes)", href: "https://www.youtube.com/watch?v=ExJC8AoAczE" }
  ]
};
