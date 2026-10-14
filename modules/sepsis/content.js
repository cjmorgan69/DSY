/* Sepsis - AO walk-through scenario (Robert, 71, near Tumby Bay). Content only: the layout lives in
   /microlearning/shared/module.js. Rebuilt on 14 Oct 2026 from the original DSY scenario and checked against SAAS
   CPP-062-AO Sepsis - AO v1.0 (3 December 2025, exported 31.08.2026), the NEWS2 Adult Sepsis Screening Tool CTL-062
   v1.1, CPPRO-011 Intramuscular Injection v1.0 (review date June 2020, now passed) and CPP-004-AO Basic Care and Life
   Support - AO. Written for crews who have completed the 2025 sepsis training and carry ceftriaxone, as the DSY lead
   instructor asked. The story, scene, observations, crew roles, timings and EOC Clinician replies are a training
   scenario written by DSY. Points that are general teaching rather than protocol are labelled as such. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Sepsis - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Robert, 71: two days of urinary symptoms, now hot, confused and hard to rouse, near Tumby Bay",
  lead: "A suspected septic shock call for a two-person volunteer AO crew, with seven break points for discussion, skills practice and decisions. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 80,

  protocol: {
    code: "CPP-062-AO", name: "Sepsis - AO", version: "v1.0 (3 December 2025)", exported: "31 August 2026",
    also: [{ code: "CTL-062", name: "NEWS2 Adult Sepsis Screening Tool", version: "v1.1 (4 June 2025)" },
           { code: "CPPRO-011", name: "Intramuscular Injection", version: "v1.0 (5 July 2017, review date June 2020)" }]
  },
  footerNotes: ["The patient, story, observations and EOC Clinician replies are a training scenario written by DSY. Check it with your lead instructor.",
    "Assumes the crew has completed the Sepsis eLearning and face-to-face PDW/CEP 2025 component and carries ceftriaxone.",
    "CPPRO-011 is past its review date (June 2020). Check the SAAS Clinical app for any newer version."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 71 year old man at a farmhouse 12 km north-east of Tumby Bay has been unwell for two days with urinary symptoms, fever and rigors. Tonight his wife can barely rouse him. Tumby Bay Hospital is about 15 minutes away." },
      { box: { title: "Learning objectives", items: [
        "Recognise the signs of sepsis and use NEWS2 (CTL-062) without letting it delay treatment",
        "Tell suspected sepsis (SBP above 100) from suspected septic shock (SBP 100 or less)",
        "Give high-flow oxygen, request early clinical support and avoid delaying extrication or transport",
        "Recognise when to consult the EOC Clinician about ceftriaxone (febrile with an altered conscious state)",
        "Prepare and give IM ceftriaxone when advised: dose, reconstitution, sites (CPP-062-AO, CPPRO-011)",
        "Notify and hand over using the words \"suspected septic shock\""
      ] } },
      { box: { title: "Required equipment", items: [
        "PPE: gloves, eye protection, surgical mask",
        "Corpuls3, manual BP cuff, thermometer, BGL kit",
        "Oxygen: non-rebreather and other masks, nasal cannula; BVM, OPA, suction",
        "Ceftriaxone 1 g vials (training stock), sodium chloride 0.9%, syringes, drawing-up and IM needles, alcohol swabs, sharps container",
        "SAAS Clinical app (NEWS2 Sepsis Scoring Calculator)",
        "Green carry chair, stretcher, blankets, ePCR tablet"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 50 to 60 minutes; debrief 10 to 15 minutes",
        "Tumby Bay Hospital: about 15 minutes (4 km of dirt road first)",
        "Paramedic backup from Port Lincoln: about 45 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, history from Jean, decisions, EOC Clinician calls",
        "Driver (AO2): Corpuls3 and observations (manual BP and RR), NEWS2 in the app, equipment, ceftriaxone preparation if advised"
      ] } }
    ] },

    { title: "Pre-brief: the AO sepsis protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario. The sepsis microlearning module has the full detail." },
      { steps: [
        { t: "PPE, basic care and life support", text: "SpO2 below 94%: high flow oxygen. Chronic lung disease: consult the EOC Clinician immediately about oxygen." },
        { t: "NEWS2 for every patient with a suspected infection", text: "The NEWS2 Sepsis Scoring Calculator with the Adult Sepsis Screening Tool (CTL-062)." },
        { t: "Request clinical support" }
      ] },
      { table: { title: "The pathways (CPP-062-AO)", table: { head: ["", "Actions"], rows: [
        ["SBP above 100", "High-flow oxygen if SpO2 below 94%; priority transport; consult for ongoing management; notify \"suspected sepsis\""],
        ["SBP 100 or less", "Request early clinical support stating \"suspected septic shock\"; don't let treatment delay extrication or transport (rendezvous en route if required); high-flow oxygen; priority transport; notify \"suspected septic shock\""],
        ["Suspected meningococcal", "Cephalosporin allergy: consult via the EOC Clinician for SAAS Medical Practitioner advice. Otherwise consult the EOC Clinician to give IM ceftriaxone 50 mg/kg, single max 2 g; priority transport; notify \"suspected sepsis\""]
      ] } } },
      { box: { title: "Key reminders", items: [
        "Febrile with an altered conscious state, with or without a petechial or purpuric rash: consult the EOC Clinician about ceftriaxone",
        "The rash is a late sign; no rash does not exclude meningococcal septicaemia",
        "Treatment takes priority over screening when infection is clearly apparent and the patient is hypotensive",
        "NEWS2 7 or more (CTL-062): rapid transport with a GRN notification; obs and NEWS2 every 15 minutes"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "IV fluids, IV antibiotics and vasopressors are beyond AO scope: they are why the hospital matters",
        "Confirm a low NIBP with a manual BP when it decides the pathway",
        "A hypotensive patient is usually kept flat; position for the airway if consciousness falls"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "Thursday, 2115, late autumn. You are paged from Tumby Bay." },
      { box: { title: "MDT display", items: [
        "Priority 1, 71 year old male: fever, confusion, difficult to rouse",
        "Unwell 2 days: fever, rigors, reduced urine output. Wife: \"burning hot and not making sense\"",
        "History: type 2 diabetes, chronic kidney disease, enlarged prostate, 3 UTIs in 12 months. No known allergies",
        "12 km north-east of Tumby Bay: 8 km sealed, 4 km dirt. Gate open"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What does the MDT make you think of?", "Which protocol, and what decides the pathway?", "What kit do you want at the door?", "Who does what?"],
        expected: [
          "Fever, confusion, reduced urine output with a likely urinary source: suspect sepsis",
          "CPP-062-AO; the systolic BP (above 100, or 100 or less) decides the pathway",
          "Febrile and confused: be ready to consult the EOC Clinician about ceftriaxone",
          "Kit: PPE, Corpuls3, manual BP cuff, thermometer, oxygen, NEWS2 in the app, ceftriaxone kit",
          "Clinician: patient and calls. Driver: obs, NEWS2, preparation"
        ],
        teaching: ["Fever and confusion in an older patient with a known infection source: sepsis until proven otherwise (general teaching)", "Plan for 4 km of dirt road on the way out"],
        realJob: "Read the MDT out loud and agree roles on the way. \"Difficult to rouse\" should raise everyone's alert level.",
        decisions: [{ q: "What decides between suspected sepsis and suspected septic shock?", options: ["Temperature above 39", "Systolic BP: 100 mmHg or less is septic shock", "Heart rate above 120"], answer: 1,
          why: "CPP-062-AO: suspected sepsis and SBP above 100 mmHg, or SBP 100 mmHg or less (suspected septic shock), each with its own actions." }],
        cards: [{ q: "Which tool does CPP-062-AO use for every patient with a suspected infection?", a: "The NEWS2 Sepsis Scoring Calculator with the NEWS2 Adult Sepsis Screening Tool (CTL-062)." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "2125. A stone farmhouse, porch light on. Jean, 68, meets you: \"He was shivering so badly earlier and now he's just lying there. He doesn't know where he is.\" A fan heater runs in the warm bedroom. Robert lies on the bed in pyjamas, eyes closed, flushed and sweaty. He groans when you say his name but doesn't open his eyes." },
      { breakpoint: { title: "Doorway, first impression", type: "Discussion",
        prompts: ["Sick or not sick?", "What PPE?", "Does the fan heater matter?", "What first?"],
        expected: [
          "Sick: flushed, sweaty, reduced consciousness",
          "PPE first (protocol): gloves, eye protection, surgical mask",
          "Turn the heater off so the temperature reading means something (general teaching)",
          "Basic care and a primary survey; monitoring on early"
        ],
        teaching: ["Colour, consciousness, posture and breathing from the doorway", "Control the environment: heaters and blankets change the picture"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "Your first ten seconds at the bedroom door set the plan. This one looks sick: gloves and mask on, then to the bedside.",
        decisions: [{ q: "What does CPP-062-AO list first?", options: ["NEWS2", "Wear appropriate PPE", "Ceftriaxone"], answer: 1,
          why: "CPP-062-AO starts with: wear appropriate PPE, then basic care and life support." }]
      } }
    ] },

    { title: "Patient contact and primary survey", blocks: [
      { box: { title: "History (Jean)", items: [
        "Two days of burning and frequency passing urine, lower abdominal discomfort",
        "Fever and rigors since yesterday; today confused, not eating or drinking, very little urine",
        "No cough, chest pain, diarrhoea or rash noticed",
        "Type 2 diabetes, chronic kidney disease, enlarged prostate, 3 UTIs this year",
        "Metformin, gliclazide, tamsulosin, aspirin. No known allergies, including to antibiotics"
      ] } },
      { table: { title: "Observations (2130)", table: { head: ["HR", "BP", "SpO2", "RR", "Temp", "BGL", "GCS", "Skin"], rows: [["118", "92/58 (manual 90/56)", "91% (air)", "26", "39.4", "14.2", "9 (E3 V2 M4)", "Hot, flushed, cap refill 4 s"]] } } },
      { breakpoint: { title: "Observations and the pathway", type: "Practical skill",
        prompts: ["Read out the obs. What stands out?", "What does SBP 92 mean for the pathway?", "SpO2 91%: what now?", "Why confirm the BP manually?", "Do you finish the NEWS2 before you act?"],
        expected: [
          "SBP 92 with suspected infection: 100 or less, so suspected septic shock",
          "SpO2 91%: high-flow oxygen now",
          "Manual BP confirms the number that changes the pathway (general teaching)",
          "Infection is clear and he's hypotensive: treatment takes priority over screening. The driver runs NEWS2 when hands are free",
          "Febrile (39.4) with an altered conscious state (GCS 9): this is the trigger to consult the EOC Clinician about ceftriaxone"
        ],
        teaching: ["The SBP 100 threshold changes your whole approach", "BGL 14.2: record it; it is not part of the sepsis treatment"],
        teachingNote: "The last point is general teaching.",
        realJob: "The driver calls out \"BP 92 on 58, sats 91, rate 118\". The clinician hears hypotension plus infection: oxygen on, and the EOC Clinician call happens now.",
        decisions: [
          { q: "SBP 92, suspected infection. Which pathway?", options: ["Suspected sepsis", "Suspected septic shock", "Neither until the NEWS2 is done"], answer: 1,
            why: "SBP 100 mmHg or less with suspected sepsis is the suspected septic shock pathway. Treatment takes priority over screening when infection is clear and the patient is hypotensive." },
          { q: "Robert is febrile and GCS 9, with no rash. Does ceftriaxone come into it?", options: [
            "No: there's no rash, so it isn't meningococcal",
            "Yes: febrile with an altered conscious state means consult the EOC Clinician about ceftriaxone",
            "Give it straight away without a call" ], answer: 1,
            why: "CPP-062-AO: a patient febrile with an altered conscious state, with or without a petechial or purpuric rash: consult the EOC Clinician regarding ceftriaxone. The rash is a late sign." }]
      } }
    ] },

    { title: "Treatment and the EOC Clinician", blocks: [
      { steps: [
        { t: "High-flow oxygen", text: "Non-rebreather; SpO2 was 91%." },
        { t: "Request early clinical support", text: "The driver calls, stating \"suspected septic shock\"." },
        { t: "Consult the EOC Clinician", text: "Including the question of ceftriaxone: febrile, altered conscious state." },
        { t: "Plan extrication now", text: "Treatment must not delay extrication or transport." }
      ] },
      { text: "In the scenario, the EOC Clinician hears the urinary history, no rash and no allergies, and says: \"This sounds like urosepsis with septic shock. I'm not advising ceftriaxone right now. Priority transport to Tumby Bay, notify them 'suspected septic shock', and call me if anything changes. Paramedic backup is 45 minutes away, so don't wait: go direct.\"", muted: true },
      { box: { title: "If ceftriaxone is advised: IM preparation (CPP-062-AO, CPPRO-011)", tiles: true, steps: [
        { t: "Confirm", text: "Repeat the advice back. Check for cephalosporin allergy. Medication checks with your partner." },
        { t: "Dose", text: "50 mg/kg, single maximum 2 g. Robert (about 85 kg) would be 2 g." },
        { t: "Reconstitute", text: "Each 1 g vial: 3.5 mL sodium chloride 0.9% to make 4 mL (250 mg/mL)." },
        { t: "Draw up", text: "4 mL (1 g) from each vial into separate syringes." },
        { t: "Two sites", text: "Maximum 1 g (4 mL) per IM site: one in each mid anterior-lateral thigh." },
        { t: "Inject and record", text: "90 degrees, no need to draw back; sharps straight to the container. Record dose, sites, time and the EOC authorisation." }
      ] } },
      { breakpoint: { title: "Treatment, the call and ceftriaxone practice", type: "Practical skill",
        prompts: ["Structure the EOC Clinician call now.", "What words must you use?", "Even though it isn't advised tonight, prepare 2 g of ceftriaxone on training stock: talk through each step.", "What if he were allergic to a cephalosporin?"],
        expected: [
          "Call: age, history, obs, GCS, temperature, \"suspected septic shock\", and ask about ceftriaxone",
          "Request early clinical support stating \"suspected septic shock\" (protocol)",
          "Ceftriaxone: 50 mg/kg capped at 2 g; 3.5 mL sodium chloride per 1 g vial = 4 mL; 1 g per site, so two thighs",
          "Cephalosporin allergy: consult via the EOC Clinician for SAAS Medical Practitioner advice",
          "The EOC Clinician decides; tonight, no ceftriaxone, and go"
        ],
        teaching: ["Raising ceftriaxone is the crew's job; deciding is the EOC Clinician's", "Practise the preparation now so it's quick when it is advised"],
        realJob: "When ceftriaxone is advised, the driver prepares it while the clinician stays with the patient and the phone. Practised, it takes a few minutes.",
        decisions: [{ q: "The EOC Clinician advises 2 g IM. How many injection sites?", options: ["One", "Two", "Four"], answer: 1,
          why: "CPP-062-AO: maximum 1 g (4 mL) per IM injection site, so 2 g (8 mL) needs two sites." }],
        cards: [{ q: "How is each 1 g vial of ceftriaxone prepared for IM use?", a: "Dilute with 3.5 mL sodium chloride 0.9% to make 4 mL (250 mg/mL) (CPP-062-AO)." }]
      } }
    ] },

    { title: "Reassessment and escalation", blocks: [
      { table: { title: "Observations", table: { head: ["", "2130", "2140 (on oxygen)"], rows: [
        ["HR", "118", "122"], ["BP", "92/58", "88/54"], ["SpO2", "91% (air)", "96% (high-flow)"], ["RR", "26", "28"], ["Temp", "39.4", "39.4"],
        ["GCS", "9 (E3 V2 M4)", "8 (E2 V2 M4)"], ["Skin", "Hot, flushed", "Mottled peripheries appearing"]
      ] } } },
      { text: "The driver has run the NEWS2 calculator: it is in the very high band (7 or more).", muted: true },
      { breakpoint: { title: "Reassessment and escalation decision", type: "Decision making",
        prompts: ["Compare the two sets. Which way is he going?", "What does the NEWS2 band ask of you?", "What can you change on scene, and what can't you?", "Has anything changed for the EOC Clinician?"],
        expected: [
          "Worse: BP falling, HR and RR rising, GCS dropping, mottling. Oxygen has fixed the SpO2 only",
          "NEWS2 7 or more (CTL-062): rapid transport with a GRN notification; obs and NEWS2 every 15 minutes",
          "On scene: oxygen, positioning, monitoring. Not AO scope: IV fluids, IV antibiotics (general teaching)",
          "Update the EOC Clinician: he's deteriorating. Move now"
        ],
        teaching: ["Trends matter more than single numbers", "Mottling is a sign of poor perfusion (general teaching)"],
        realJob: "This is where you stop assessing and start moving. \"We need to go now.\"",
        decisions: [{ q: "He's deteriorating despite oxygen. What now?", options: ["Stay on scene until clinical support arrives", "Extricate and transport now; rendezvous en route if required", "Repeat the NEWS2 first"], answer: 1,
          why: "CPP-062-AO: treatment should not delay extrication or transport. Rendezvous with clinical support en route, if required." }],
        cards: [{ q: "What does CTL-062 ask for at NEWS2 7 or more?", a: "Manage as per the Sepsis CPP, request clinical support if required, rapid transport with a GRN notification, say suspected sepsis at handover, and obs with NEWS2 every 15 minutes." }]
      } }
    ] },

    { title: "Extrication and transport", blocks: [
      { box: { title: "Extrication and transport", items: [
        "Carry chair from the bedroom, then onto the stretcher. He can't walk",
        "Oxygen stays on; monitor stays connected",
        "Flat on the stretcher; suction, OPA and BVM within reach (general teaching)",
        "Blanket for the trip; Jean follows in her own car",
        "Notify Tumby Bay Hospital: \"suspected septic shock\" (GRN)",
        "Obs every 5 minutes, NEWS2 at least every 15"
      ] } },
      { table: { title: "En route (2155)", table: { head: ["HR", "BP", "SpO2", "RR", "GCS", "Skin"], rows: [["124", "86/52", "95% (high-flow)", "28", "8", "Mottled, cool peripheries"]] } } },
      { breakpoint: { title: "Extrication and transport planning", type: "Practical skill",
        prompts: ["How do you move him?", "How is he positioned, and why?", "GCS 8: what is within reach?", "What would make you call the EOC Clinician again?"],
        expected: [
          "Carry chair, then stretcher: no walking",
          "Flat because he's hypotensive; turn him on his side if his airway needs it (general teaching)",
          "Suction, OPA, BVM ready",
          "Call again for further falls in GCS, BP or SpO2, or airway problems; notify \"suspected septic shock\"",
          "If he becomes unresponsive with absent or abnormal breathing: commence resuscitation (CPP-004-AO)"
        ],
        teaching: ["4 km of dirt road: secure the kit; NIBP may be unreliable, use a manual BP", "Keep scene time short: the definitive treatment is at hospital"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "Oxygen on, monitor on, and you in the back watching his chest rise while you rehearse the handover.",
        decisions: [{ q: "What words do you use when you notify Tumby Bay Hospital?", options: ["\"Possible infection\"", "\"Suspected septic shock\"", "\"Query UTI\""], answer: 1,
          why: "CPP-062-AO: for SBP 100 mmHg or less, notify stating \"suspected septic shock\"." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"[Name], Ambulance Officer from Tumby Bay. This is Robert Patterson, 71.\""],
        ["S", "\"Suspected septic shock, likely urinary source. Two days of urinary symptoms, now febrile and confused.\""],
        ["B", "\"Type 2 diabetes, CKD, enlarged prostate, three UTIs this year. Metformin, gliclazide, tamsulosin, aspirin. No known allergies.\""],
        ["A", "\"On arrival GCS 9, HR 118, BP 92/58, SpO2 91% on air, RR 26, temp 39.4, BGL 14.2. High-flow oxygen; SpO2 now 95%. Deteriorated: GCS 8, BP 86/52, mottled. NEWS2 7 or more.\""],
        ["R", "\"EOC Clinician consulted at 2135 and didn't advise ceftriaxone. He's getting worse: he needs urgent hospital treatment.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Deliver the handover now.", "What words must be in it?", "How do you show he's getting worse?"],
        expected: ["\"Suspected septic shock\" said clearly", "The trend: BP 92 then 86, GCS 9 then 8", "The EOC Clinician's advice, including on ceftriaxone", "NEWS2 band"],
        teaching: ["Under 90 seconds", "Trends tell the story"],
        realJob: "The hospital may already be preparing from your notification. Your handover confirms it and adds the detail.",
        decisions: [{ q: "CTL-062 says to communicate what at handover?", options: ["Suspected sepsis", "The NEWS2 calculator brand", "Nothing extra"], answer: 0,
          why: "CTL-062: communicate suspected sepsis during handover. Here, for SBP 100 or less, the protocol's words are \"suspected septic shock\"." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "What made you suspect sepsis, and when did it become septic shock?",
        "Did you raise ceftriaxone with the EOC Clinician? Why does febrile with an altered conscious state matter?",
        "How did \"treatment should not delay extrication or transport\" shape your scene time?",
        "When did you run the NEWS2, and what did the band ask of you?",
        "How confident are you preparing 2 g of ceftriaxone in two sites?",
        "How did the roles work?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "PPE, basic care, NEWS2 for every suspected infection, request clinical support",
        "SBP 100 or less: suspected septic shock; early clinical support; don't delay transport",
        "SpO2 below 94%: high-flow oxygen; chronic lung disease, consult the EOC Clinician",
        "Febrile with an altered conscious state: consult the EOC Clinician about ceftriaxone, rash or no rash",
        "Ceftriaxone 50 mg/kg, max 2 g; 3.5 mL per 1 g vial; max 1 g per site",
        "Say the words: \"suspected sepsis\" or \"suspected septic shock\""
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. Suspected meningococcal: 19 years old", text: "A 19 year old with sudden fever, severe headache, neck stiffness and a spreading purple rash; GCS 12 and falling; 75 kg; no allergies. Consult the EOC Clinician, who advises IM ceftriaxone: 50 mg/kg would be 3750 mg, so the single maximum of 2 g applies: two 1 g vials, each with 3.5 mL sodium chloride 0.9%, 4 mL into each thigh. Priority transport; notify \"suspected sepsis\" (or \"suspected septic shock\" if SBP is 100 or less)." } },
      { box: { title: "2. Child, 3 years", text: "A 3 year old (15 kg) with 24 hours of fever, now lethargic, mottled, weak cry and fast heart rate. No screening tool exists for children: use clinical judgement, the Paediatric Assessment Triangle and the RDR chart. If the EOC Clinician advises ceftriaxone: 750 mg, which is 3 mL in one site." } },
      { box: { title: "3. SBP 108", text: "Robert's BP is 108/68. Suspected sepsis pathway: high-flow oxygen if SpO2 is below 94%, priority transport, consult for ongoing management, notify \"suspected sepsis\". Discuss what changes if it falls to 100 or less on the way." } },
      { box: { title: "4. Collapse en route", text: "Robert becomes unresponsive with no normal breathing. Commence resuscitation (CPP-004-AO) and follow Cardiac Arrest (Adult) - AO, CPP-002-AO. Discuss who does what, and when you update the EOC Clinician." } }
    ] }
  ]
};
