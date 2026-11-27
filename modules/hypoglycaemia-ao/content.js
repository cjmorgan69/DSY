/* Hypoglycaemia - AO walk-through scenario (Ron, 67, Cummins). Content only: the layout lives in
   /microlearning/shared/module.js. A new DSY scenario written on 14 Oct 2026 (the older /modules/hypo/ scenario is an
   MVA case, to be converted separately). Clinical actions follow SAAS CPP-009-AO Hypoglycaemia - AO v4.1 (30 June
   2021, exported 31.08.2026), CPPRO-008 Medication Checks, CPPRO-009 Oral Medication Administration and CPPRO-011
   Intramuscular Injection (each v1.0; CPPRO-011 review date June 2020, now passed) and CPP-004-AO Basic Care and Life
   Support - AO. The whole story, scene, observations, crew roles, timings and EOC Clinician replies are written by DSY
   for training.
   Ambulance Responder version (the AO / AR switch, ?scope=ar; owner, 26 Nov 2026): SAAS CPP-031-AR Hypoglycaemia - AR
   v2.1 (30 June 2021) and CPP-025-AR Basic Care and Life Support - AR. No glucagon: when oral glucose fails, the EOC
   Clinician advises transport and RV with clinical support en route (owner's choice). The RV story is DSY-written. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Hypoglycaemia - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Ron, 67: confused and sweaty in the machinery shed at seeding time, Cummins",
  lead: "A hypoglycaemia call for a two-person volunteer AO crew, with seven break points for discussion, skills practice and decisions. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 70,

  protocol: {
    code: "CPP-009-AO", name: "Hypoglycaemia - AO", version: "v4.1 (30 June 2021)", exported: "31 August 2026",
    also: [{ code: "CPPRO-008, 009, 011", name: "Medication Checks, Oral Medication, Intramuscular Injection", version: "each v1.0 (5 July 2017)" }]
  },
  footerNotes: ["This is a new training scenario written by DSY: the patient, story, observations, timings and EOC Clinician replies are fictional. Check it with your lead instructor.",
    "CPPRO-011 is past its review date (June 2020). Check the SAAS Clinical app for any newer version."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 67 year old farmer with insulin-treated diabetes has been seeding all day and missed lunch. His wife finds him confused and sweaty in the machinery shed on their property just outside Cummins. Cummins hospital is 10 minutes away; paramedic backup from Port Lincoln is about 45 minutes." },
      { box: { title: "Learning objectives", items: [
        "Measure the BGL in every patient with an altered conscious state or altered cerebral function",
        "Decide whether the patient can safely swallow oral glucose (a cough is a good indicator)",
        "Give oral glucose up to 15 g, and reassess",
        "Recognise when oral glucose cannot be given or is ineffective, and consult the EOC Clinician",
        { scope: "ao", text: "Give IM glucagon when advised, with the right dose for age or weight, and the medication checks" },
        { scope: "ao", text: "Request clinical support as appropriate, offer complex carbohydrates on recovery, and transport" },
        { scope: "ar", text: "Know that IM glucagon is not in the AR protocol: request clinical support early" },
        { scope: "ar", text: "Consult the EOC Clinician about treatment and transport, and manage a transport and RV with clinical support" },
        { scope: "ao", text: "Deliver an ISBAR handover" },
        { scope: "ar", text: "Deliver an ISBAR handover to the paramedic crew at the RV" }
      ] } },
      { box: { title: "Required equipment", items: [
        "BGL meter, lancets, strips, sharps container",
        "Oral glucose paste",
        { scope: "ao", text: "Glucagon kit, IM needles, alcohol swabs, gauze" },
        "Corpuls3 monitor, oxygen, suction, airway kit, BVM",
        "Green carry chair, stretcher, blanket, PPE, ePCR tablet"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 40 to 50 minutes; debrief 10 to 15 minutes",
        "Response to scene: about 10 minutes",
        "Cummins hospital: about 10 minutes",
        "Paramedic backup from Port Lincoln: about 45 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { scope: "ar", box: { title: "Crew roles", items: [
        "Clinician (AR1): patient contact, assessment, oral glucose, airway and position, decisions",
        "Driver (AR2): BGL, Corpuls3 and observations, the clinical support request and EOC Clinician calls, equipment, the RV"
      ] } },
      { scope: "ao", box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, assessment, oral glucose, glucagon if advised, decisions",
        "Driver (AO2): BGL, Corpuls3 and observations, the EOC Clinician call and clinical support request, equipment"
      ] } }
    ] },

    { scope: "ar", title: "Pre-brief: the AR hypoglycaemia protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { steps: [
        { t: "Basic care and life support" },
        { t: "2 years and over, BGL below 3.5 mmol/L: oral glucose up to 15 g", text: "If the patient has an adequate GCS to swallow the gel. A cough is a good indicator." },
        { t: "Request clinical support as appropriate" },
        { t: "Oral glucose can't be given or is ineffective: consult the EOC Clinician" },
        { t: "If recovery occurs", text: "Consider offering complex carbohydrates to eat." },
        { t: "In all cases: consult the EOC Clinician regarding treatment and transport", text: "They may advise: transport and cancel clinical support; transport and RV with clinical support en route; or monitor the patient until clinical support arrives." }
      ] },
      { box: { title: "Under 2 years (CPP-031-AR)", tone: "warn", items: [
        "BGL below 3.5 mmol/L: request clinical support",
        "Consult the EOC Clinician, who may advise oral glucose gel"
      ] } },
      { box: { title: "Principle (CPP-031-AR)", items: [
        "Hypoglycaemia can present as confusion, altered behaviour and sweating, through to unconsciousness and seizure",
        "Measure the BGL on all patients with an altered conscious state or altered cerebral function, including trauma and seizures, particularly children",
        "Normal BGL is usually above 3.5 mmol/L for adults and children, and above 2.5 mmol/L for neonates"
      ] } },
      { box: { title: "Not in the AR protocol", tone: "no", text: "IM glucagon is in the AO protocol (on EOC Clinician advice) but not in the AR protocol. Paramedic backup is about 45 minutes away, so think early about clinical support." } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "Confused, sweaty or aggressive behaviour can look like intoxication or a stroke: check the BGL",
        "Someone on insulin who has missed a meal and worked hard is at risk",
        "Recovery after treatment does not mean the job is over: consult the EOC Clinician about transport"
      ] } }
    ] },

    { scope: "ao", title: "Pre-brief: the AO hypoglycaemia protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { steps: [
        { t: "Basic care and life support" },
        { t: "2 years and over, BGL below 3.5 mmol/L: oral glucose up to 15 g", text: "If the patient has an adequate GCS to swallow the paste. A cough is a good indicator." },
        { t: "Request clinical support as appropriate" },
        { t: "Oral glucose can't be given or is ineffective: consult the EOC Clinician", text: "Who may advise IM glucagon 1 mg (6 years or older, or 25 kg or more) or 0.5 mg (2 to under 6 years, or under 25 kg)." },
        { t: "If recovery occurs", text: "Consider offering complex carbohydrates to eat." },
        { t: "Provide transport and notify the receiving facility" }
      ] },
      { box: { title: "Under 2 years (CPP-009-AO)", tone: "warn", items: [
        "BGL below 3.5 mmol/L: consult the EOC Clinician, who may advise oral glucose gel or IM glucagon 0.5 mg",
        "Request clinical support; transport and notify"
      ] } },
      { box: { title: "Principle (CPP-009-AO)", items: [
        "Hypoglycaemia can present as confusion, altered behaviour and sweating, through to unconsciousness and seizure",
        "Use the least invasive therapy that increases blood glucose",
        "Measure the BGL on all patients with an altered conscious state or altered cerebral function, including trauma and seizures, particularly children",
        "Normal BGL is usually above 3.5 mmol/L for adults and children, and above 2.5 mmol/L for neonates"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "Confused, sweaty or aggressive behaviour can look like intoxication or a stroke: check the BGL",
        "Someone on insulin who has missed a meal and worked hard is at risk",
        "Recovery after treatment does not mean the job is over: the protocol says transport"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Tuesday in May, 1715, seeding season. You and your crew partner are paged in Cummins." },
      { box: { title: "MDT display", items: [
        "Priority 2, altered conscious state, 67 year old male",
        "Caller: wife. Found him in the machinery shed, sweaty and \"not making sense\"",
        "Diabetic, on insulin. Breathing. No fall reported",
        "Farm 5 km out of Cummins, gravel driveway, shed behind the house"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What are you thinking from the MDT?", "What's the first measurement you want?", "What kit goes in first?", "Who does what on arrival?"],
        expected: [
          "Insulin-treated diabetic, confused and sweaty: hypoglycaemia is likely, but keep other causes in mind",
          "BGL: the protocol says measure it in every patient with an altered conscious state",
          { scope: "ao", text: "Kit: BGL meter, oral glucose paste, glucagon kit, response bag, Corpuls3, oxygen, suction" },
          { scope: "ar", text: "Kit: BGL meter, oral glucose gel, response bag, Corpuls3, oxygen, suction" },
          "Clinician: patient and treatment. Driver: BGL, monitor, the EOC Clinician call"
        ],
        teaching: [{ scope: "ao", text: "The least invasive treatment that works is the goal (CPP-009-AO)" }, { scope: "ao", text: "Have the glucagon kit with you in case swallowing isn't safe" },
          { scope: "ar", text: "No glucagon at AR level: if swallowing isn't safe, the plan is the EOC Clinician and clinical support (CPP-031-AR)" }],
        realJob: "Ten minutes is enough to agree roles and have the BGL kit in your hand when you walk into the shed.",
        decisions: [{ q: "Below what BGL does CPP-009-AO apply?", options: ["5.0 mmol/L", "3.5 mmol/L", "2.0 mmol/L"], answer: 1,
          why: "CPP-009-AO applies to patients with a BGL below 3.5 mmol/L. The normal range is usually above 3.5 for adults and children." }],
        cards: [{ q: "Which patients should have a BGL measured?", a: "All patients with an altered conscious state or altered cerebral function, including trauma and seizures, particularly children (CPP-009-AO)." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "1725. Lyn meets you at the house and walks you to the shed. Ron is sitting on the concrete floor against a tractor tyre, pale and drenched in sweat. He looks at you but his words are muddled, and he pushes your hand away. A half-full water bottle is beside him. Diesel smell, but the tractor is off." },
      { breakpoint: { title: "First impression and scene", type: "Discussion",
        prompts: ["What do you see?", "Any scene hazards?", "He is pushing you away. How do you approach him?", "What do you do first?"],
        expected: [
          "Conscious, confused, pale and sweaty: fits hypoglycaemia",
          "Hazards: machinery off and keys out, fuel, a hard floor. Check he hasn't fallen or hit his head",
          "Calm, slow approach; explain what you're doing; Lyn can help reassure him",
          "Basic care, then the BGL straight away"
        ],
        teaching: ["Confusion and aggression in hypoglycaemia are not deliberate: stay calm and safe", "Ask about a fall: if trauma is possible, think about it"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "A confused patient who resists you is common in hypos. Slow down, use his name, and let his wife help.",
        decisions: [{ q: "Ron is confused and sweaty. What do you do first, after basic care?", options: ["Give him a sweet drink straight away", "Measure his BGL", "Wait for him to calm down"], answer: 1,
          why: "CPP-009-AO: measure the BGL on all patients with an altered conscious state or altered cerebral function." }]
      } }
    ] },

    { title: "Patient contact and assessment", blocks: [
      { box: { title: "History (Lyn)", items: [
        "Type 2 diabetes on insulin for 8 years; morning insulin as usual",
        "Out on the seeder since 0600; didn't come in for lunch",
        "Found him like this about 15 minutes ago; last seen well at about 1300 on the two-way",
        "No fall that she knows of; no head injury seen",
        "Medications: insulin, metformin, atorvastatin. No known allergies"
      ] } },
      { table: { title: "Observations (1728)", table: { head: ["BGL", "GCS", "HR", "BP", "RR", "SpO2", "Temp"], rows: [["2.2", "13 (E4 V3 M6)", "104", "146/84", "18", "97% (air)", "36.2"]] } } },
      { breakpoint: { title: "BGL and observations", type: "Practical skill",
        prompts: ["Driver: talk through taking the BGL.", "Read out the numbers. What's abnormal?", "Does he need oxygen?", "Any sign of injury?"],
        expected: [
          "BGL 2.2: below 3.5, so CPP-009-AO applies",
          "GCS 13 (confused speech); fast heart rate and sweating fit hypoglycaemia",
          "SpO2 97% on air: no oxygen needed (DSY lead instructor: oxygen to bring SpO2 above 94%)",
          "Quick check for injury from a fall: none found"
        ],
        teaching: ["Use gloves and dispose of the lancet straight into the sharps container", "Record the BGL and the time: you'll compare later"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "The BGL takes seconds and decides the whole job. Get it before anything else.",
        decisions: [{ q: "BGL 2.2 mmol/L in a 67 year old. Which pathway?", options: ["Not hypoglycaemia: carry on assessing", "CPP-009-AO, 2 years and over", "CPP-009-AO, under 2 years"], answer: 1,
          why: "He is 2 years or older with a BGL below 3.5 mmol/L, so the 2-years-and-over pathway applies." }]
      } }
    ] },

    { title: "Working diagnosis and first treatment", blocks: [
      { text: "Working diagnosis: hypoglycaemia (BGL 2.2) in an insulin-treated diabetic who missed lunch and worked all day." },
      { breakpoint: { title: "Can he swallow? Oral glucose", type: "Decision making",
        prompts: ["Can Ron safely swallow the paste? How do you decide?", "What do you give, and how much?", "Do you request clinical support now?", "What will you do if it doesn't work?"],
        expected: [
          "Ask him to cough: he coughs strongly on request, so his GCS is adequate to swallow the paste (a cough is a good indicator)",
          "Oral glucose up to 15 g, with medication checks (CPPRO-008)",
          "Clinical support \"as appropriate\": paramedics are 45 minutes away and he's on insulin, so many crews would request it now. Discuss",
          { scope: "ao", text: "If it can't be given or doesn't work: consult the EOC Clinician, who may advise IM glucagon" },
          { scope: "ar", text: "If it can't be given or doesn't work: consult the EOC Clinician (no glucagon at AR level)" }
        ],
        teaching: [{ scope: "ao", text: "The least invasive therapy that works comes first (CPP-009-AO)" }, "Never give oral glucose to someone who can't protect their airway"],
        realJob: "Sit him up, check his cough, and give the paste a little at a time. Watch him swallow.",
        decisions: [
          { q: "Ron coughs strongly when asked. What does that tell you?", options: [
            "Nothing useful",
            "His GCS is likely adequate to swallow the paste",
            "He needs glucagon" ], answer: 1,
            why: "CPP-009-AO: give oral glucose if the patient has an adequate GCS to swallow the paste. A cough is a good indicator." },
          { q: "What is the oral glucose dose for Ron?", options: ["Up to 15 g", "Up to 50 g", "1 mg"], answer: 0,
            why: "CPP-009-AO: administer oral glucose up to 15 g for patients 2 years and over who can swallow the paste." }],
        cards: [{ scope: "ar", q: "What does an AR do if oral glucose can't be given or doesn't work?", a: "Consult the EOC Clinician (CPP-031-AR). Glucagon is not in the AR protocol." },
          { scope: "ao", q: "What does \"least invasive therapy\" mean in CPP-009-AO?", a: "Use the least invasive treatment that increases blood glucose: oral glucose before glucagon, when the patient can swallow." }]
      } },
      { text: "1730: oral glucose paste given in small amounts; Ron swallows it. The driver requests clinical support.", muted: true }
    ] },

    { scope: "ao", title: "Reassessment and the EOC Clinician", blocks: [
      { table: { title: "Observations", table: { head: ["", "1728", "1740"], rows: [
        ["BGL", "2.2", "2.6"], ["GCS", "13", "11 (E3 V3 M5)"], ["HR", "104", "100"], ["Cough on request", "Strong", "Weak, unreliable"], ["Behaviour", "Confused, pushing away", "Drowsy, mumbling"]
      ] } } },
      { text: "In the scenario, the driver calls the EOC Clinician at 1741. The EOC Clinician advises IM glucagon 1 mg, asks for a BGL after 10 to 15 minutes and transport to Cummins hospital, and confirms clinical support is coming. The driver repeats the advice back.", muted: true },
      { box: { title: "IM glucagon (CPPRO-011 and CPPRO-008)", tiles: true, steps: [
        { t: "Confirm the advice", text: "Repeat it back: glucagon, 1 mg, IM (CPPRO-008). The EOC Clinician signs for advised entries." },
        { t: "Checks", text: "With your partner: the medication and its integrity, the expiry, the dose. Prepare as a single dose." },
        { t: "Consent and allergies", text: "Explain where possible; check allergies." },
        { t: "Site", text: "Mid anterior-lateral thigh (vastus lateralis); avoid the side of the thigh. Clean with an alcohol swab and let it dry." },
        { t: "Inject", text: "Like a dart, 90 degrees, about 2/3 of the needle length; inject slowly. No need to draw back on the plunger." },
        { t: "Finish", text: "Withdraw in one motion, straight into the sharps container, no recapping. Gentle pressure. Record the dose and time." }
      ] } },
      { breakpoint: { title: "Oral glucose ineffective: consult and glucagon", type: "Decision making",
        prompts: ["Compare the two sets of obs. What's happening?", "Can you give more paste?", "What does the protocol say now?", "What dose of glucagon, and why that dose?"],
        expected: [
          "BGL barely up and his GCS has fallen to 11: oral glucose has been ineffective",
          "His cough is weak and unreliable: he can't safely swallow more paste",
          "Consult the EOC Clinician, who may advise IM glucagon (CPP-009-AO)",
          "Adult (6 years or older, or 25 kg or more): 1 mg",
          "Position him on his side if his airway needs protecting; suction ready (basic care, CPP-004-AO)"
        ],
        teaching: ["An AO gives glucagon only when the EOC Clinician advises it", "Repeat the advice back before you give it (CPPRO-008)"],
        realJob: "When the paste stops working or swallowing isn't safe, don't keep trying. Make the call.",
        decisions: [{ q: "Oral glucose was ineffective and he can no longer swallow safely. What now?", options: [
          "Give IM glucagon 1 mg straight away on your own decision",
          "Consult the EOC Clinician, who may advise IM glucagon",
          "Give more paste" ], answer: 1,
          why: "CPP-009-AO: if oral glucose cannot be administered or is ineffective, consult the EOC Clinician, who may advise IM glucagon (1 mg for 6 years or older, or 25 kg or more)." }],
        cards: [{ q: "IM glucagon dose for a child aged 4 weighing 16 kg, if advised?", a: "0.5 mg (2 to under 6 years, or under 25 kg) (CPP-009-AO)." }]
      } },
      { text: "1744: IM glucagon 1 mg to the left thigh.", muted: true }
    ] },

    { scope: "ao", title: "Recovery and transport", blocks: [
      { table: { title: "Observations", table: { head: ["", "1728", "1740", "1758"], rows: [
        ["BGL", "2.2", "2.6", "5.1"], ["GCS", "13", "11", "15"], ["HR", "104", "100", "88"], ["BP", "146/84", "142/80", "138/80"], ["SpO2", "97%", "97%", "98%"]
      ] } } },
      { text: "Ron is sitting up, embarrassed, and asking what all the fuss is about. \"I'm right now. I've got paddocks to finish. I'm not going to hospital.\"" },
      { breakpoint: { title: "Recovery, food and transport", type: "Decision making",
        prompts: ["He has recovered. What does the protocol suggest now?", "He says he won't go to hospital. What do you do?", "How does he get to the ambulance?", "Where are you taking him, and who do you tell?"],
        expected: [
          "Consider offering complex carbohydrates to eat (CPP-009-AO): Lyn brings a sandwich",
          "The protocol says provide transport and notify the receiving facility. Explain why; involve Lyn; update the EOC Clinician if he still refuses",
          "Carry chair or stretcher; he has just been unconscious enough to need glucagon (general teaching)",
          "Cummins hospital, as the EOC Clinician advised; notify the hospital",
          "Update clinical support on what you're doing"
        ],
        teaching: ["Recovery is not the end of the job", "A hypo on insulin after a long day can come back (general teaching)"],
        realJob: "\"I'm fine\" is the most common thing you'll hear after a hypo. Be patient, explain, and bring in his wife and the EOC Clinician.",
        decisions: [{ q: "BGL 5.1, GCS 15, and he's hungry. What does CPP-009-AO suggest?", options: [
          "Consider offering complex carbohydrates to eat, then transport",
          "Another dose of glucagon",
          "Leave him at home with Lyn" ], answer: 0,
          why: "CPP-009-AO: if recovery occurs, consider offering complex carbohydrates to eat. Provide transport and notify the receiving facility." }]
      } }
    ] },

    /* ---------- Ambulance Responder: no glucagon; transport and RV (owner's choice, story DSY-written) ---------- */
    { scope: "ar", title: "Reassessment and the EOC Clinician", blocks: [
      { table: { title: "Observations", table: { head: ["", "1728", "1740"], rows: [
        ["BGL", "2.2", "2.6"], ["GCS", "13", "11 (E3 V3 M5)"], ["HR", "104", "100"], ["Cough on request", "Strong", "Weak, unreliable"], ["Behaviour", "Confused, pushing away", "Drowsy, mumbling"]
      ] } } },
      { breakpoint: { title: "Oral glucose ineffective: consult", type: "Decision making",
        prompts: ["Compare the two sets of obs. What's happening?", "Can you give more gel?", "What does the AR protocol say now?", "What will you tell the EOC Clinician?"],
        expected: [
          "BGL barely up and his GCS has fallen to 11: oral glucose has been ineffective",
          "His cough is weak and unreliable: he can't safely swallow more gel",
          "Consult the EOC Clinician (CPP-031-AR). Glucagon is not in the AR protocol",
          "The call: age, insulin, missed meal, BGL 2.2 then 2.6, GCS 13 then 11, oral glucose at 1730, clinical support requested at 1730",
          "Position him on his side if his airway needs protecting; suction ready (basic care, CPP-025-AR)"
        ],
        teaching: ["An AR's next step when oral glucose fails is the EOC Clinician, not another drug", "Repeat the advice back (CPPRO-008)"],
        realJob: "When the gel stops working or swallowing isn't safe, don't keep trying. Make the call, and protect his airway.",
        decisions: [{ q: "Oral glucose was ineffective and he can no longer swallow safely. What now?", options: [
          "Give IM glucagon 1 mg",
          "Consult the EOC Clinician",
          "Give more gel" ], answer: 1,
          why: "CPP-031-AR: if oral glucose cannot be administered or is ineffective, consult the EOC Clinician. Glucagon is not in the AR protocol." }],
        cards: [{ q: "Name the three transport options the EOC Clinician may advise an AR crew.", a: "Transport and cancel clinical support; transport and RV with clinical support en route; or monitor the patient until clinical support arrives (CPP-031-AR)." }]
      } },
      { text: "In the scenario, the driver calls the EOC Clinician at 1741. The EOC Clinician advises transport now towards Port Lincoln, with an RV with the paramedic crew en route at Edillilie, and asks the crew to recheck the BGL and call back if he deteriorates. The driver repeats the advice back.", muted: true }
    ] },

    { scope: "ar", title: "Transport and RV", blocks: [
      { table: { title: "Observations", table: { head: ["", "1728", "1740", "1755 (en route)"], rows: [
        ["BGL", "2.2", "2.6", "2.5"], ["GCS", "13", "11", "11"], ["HR", "104", "100", "98"], ["BP", "146/84", "142/80", "140/80"], ["SpO2", "97%", "97%", "97%"]
      ] } } },
      { text: "1748: Ron is on the stretcher on his side and the crew leave at 1750. Lyn follows in the ute. The paramedic crew is heading north from Port Lincoln." },
      { breakpoint: { title: "Transport and RV with clinical support", type: "Decision making",
        prompts: ["How does Ron get to the ambulance, and in what position?", "Who travels in the back, and what do they watch?", "What do you do at 1755?", "How do you set up the RV?"],
        expected: [
          "Stretcher, on his side: his GCS is 11 and his cough is unreliable (basic care, CPP-025-AR)",
          "The clinician in the back: airway, breathing, GCS; suction ready; nothing by mouth while he can't swallow safely",
          "Recheck the BGL and obs: BGL 2.5, GCS 11, no better. Update the EOC Clinician",
          "Confirm the RV point and timing with the EOC Clinician; a safe place to pull over; have the handover ready"
        ],
        teaching: ["Transport and RV gets the patient to clinical support sooner than waiting", "Keep reassessing and update the EOC Clinician if anything changes"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "On the Eyre Peninsula an RV on the highway is common. Agree the place, pull over safely, and hand over in the ambulance.",
        decisions: [{ q: "At 1755 his BGL is 2.5 and GCS 11. What do you do?", options: [
          "Try more gel now he's in the ambulance",
          "Keep him on his side, update the EOC Clinician and continue to the RV",
          "Turn back home: he isn't getting worse" ], answer: 1,
          why: "He still can't swallow safely. Keep the airway safe, update the EOC Clinician, and continue the advised transport and RV (CPP-031-AR, CPP-025-AR)." }]
      } },
      { text: "1805: RV with the paramedic crew at Edillilie. They take over Ron's care.", muted: true }
    ] },

    { scope: "ar", title: "Handover at the RV", blocks: [
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"[Name], Ambulance Responder, Cummins crew. This is Ron [surname], 67.\""],
        ["S", "\"Hypoglycaemia: found confused and sweaty in his shed, BGL 2.2. Oral glucose hasn't worked.\""],
        ["B", "\"Type 2 diabetes on insulin; usual morning insulin, seeding all day, missed lunch. Metformin, atorvastatin. No allergies. No fall.\""],
        ["A", "\"Oral glucose at 1730. At 1740 BGL 2.6, GCS 11, weak cough, so no more oral glucose. 1755 BGL 2.5, GCS 11, HR 98, BP 140/80, SpO2 97% on air.\""],
        ["R", "\"EOC Clinician advised transport and RV at 1741. He's on his side with suction ready. His wife Lyn is following.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover to the paramedics", type: "Practical skill",
        prompts: ["Deliver the handover now.", "Did you give every BGL with its time?", "Did you say what the EOC Clinician advised and when?"],
        expected: ["BGL trend with times: 2.2, 2.6, 2.5", "Oral glucose and the time; why no more was given", "EOC Clinician advice at 1741", "Insulin, missed meal, last seen well"],
        teaching: ["The trend tells the story", "Say what still worries you: his airway and GCS"],
        realJob: "A short, clear handover at the roadside lets the paramedics start straight away.",
        decisions: [{ q: "Which detail matters most for the paramedics?", options: ["What tractor he was driving", "That he is on insulin, the BGL trend and that oral glucose failed", "Lyn's maiden name"], answer: 1,
          why: "The treatment, the times and his insulin tell the paramedics what has been tried and what to do next (general teaching)." }]
      } }
    ] },

    { scope: "ao", title: "Handover", blocks: [
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"[Name], Ambulance Officer, Cummins crew. This is Ron [surname], 67.\""],
        ["S", "\"Hypoglycaemia: found confused and sweaty in his shed, BGL 2.2.\""],
        ["B", "\"Type 2 diabetes on insulin; usual morning insulin, seeding all day, missed lunch. Metformin, atorvastatin. No allergies. No fall.\""],
        ["A", "\"Oral glucose at 1730, BGL 2.6 and GCS down to 11 at 1740. IM glucagon 1 mg at 1744 on EOC Clinician advice. Now BGL 5.1, GCS 15, HR 88, BP 138/80. Eaten a sandwich.\""],
        ["R", "\"Recovered after glucagon. He's on insulin, so watch for it coming back. Clinical support was requested.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Deliver the handover now.", "Did you give every BGL with its time?", "Did you say who advised the glucagon?"],
        expected: ["BGL trend with times: 2.2, 2.6, 5.1", "Oral glucose and glucagon with doses and times", "EOC Clinician advice for the glucagon", "Insulin, missed meal, last seen well"],
        teaching: ["The trend tells the story", "Say what still worries you"],
        realJob: "A clear handover with the numbers and times lets the hospital decide how long to watch him.",
        decisions: [{ q: "Which detail matters most for the hospital's next decision?", options: ["What tractor he was driving", "That he is on insulin and the BGL trend with treatment times", "Lyn's maiden name"], answer: 1,
          why: "The treatment, the times and his insulin tell the hospital how he responded and how long he needs watching (general teaching)." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "How quickly did you get a BGL, and what made you suspect a hypo?",
        "How did you decide he could swallow the paste?",
        "What told you oral glucose was ineffective?",
        "How did the EOC Clinician call go? Did you repeat the advice back?",
        "Did you request clinical support, and when?",
        { scope: "ao", text: "How did you handle \"I'm not going to hospital\"?" },
        { scope: "ar", text: "How did the transport and RV go? What would have made it smoother?" }
      ] } },
      { scope: "ar", box: { title: "Take-home messages", tone: "warn", items: [
        "BGL on every altered conscious state, including trauma and seizures",
        "Below 3.5 mmol/L and can swallow (a cough is a good indicator): oral glucose up to 15 g",
        "Can't swallow or not working: consult the EOC Clinician. No glucagon at AR level",
        "Under 2 years: request clinical support and consult the EOC Clinician, who may advise oral glucose gel",
        "In all cases: consult the EOC Clinician about treatment and transport (cancel support, RV en route, or wait)"
      ] } },
      { scope: "ao", box: { title: "Take-home messages", tone: "warn", items: [
        "BGL on every altered conscious state, including trauma and seizures",
        "Below 3.5 mmol/L and can swallow (a cough is a good indicator): oral glucose up to 15 g",
        "Can't swallow or not working: consult the EOC Clinician for IM glucagon (1 mg, or 0.5 mg for 2 to under 6 years or under 25 kg)",
        "Under 2 years: consult the EOC Clinician first",
        "Recovered: consider complex carbohydrates, then transport and notify"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { scope: "ar", box: { title: "1. Child at playgroup", text: "A 4 year old (16 kg) with type 1 diabetes is drowsy and won't drink; BGL 2.4. Oral glucose can't be given: request clinical support and consult the EOC Clinician about treatment and transport. Discuss the parents and the airway." } },
      { scope: "ar", box: { title: "2. Seizing on arrival", text: "Ron is having a seizure on the shed floor. Basic care first: protect him from injury and his airway. Measure the BGL (the protocol says to, including in seizures). If it is below 3.5 and he can't swallow, consult the EOC Clinician." } },
      { scope: "ar", box: { title: "3. Baby under 2", text: "An 18 month old with a BGL of 2.8. Under 2 years: request clinical support and consult the EOC Clinician, who may advise oral glucose gel." } },
      { scope: "ar", box: { title: "4. Gel works", text: "Ron's BGL rises to 4.8 and he's alert 15 minutes after the gel. Consider complex carbohydrates to eat, then consult the EOC Clinician about treatment and transport: which of the three options fits, and why?" } },
      { scope: "ao", box: { title: "1. Child at playgroup", text: "A 4 year old (16 kg) with type 1 diabetes is drowsy and won't drink; BGL 2.4. Consult the EOC Clinician, who may advise IM glucagon 0.5 mg (2 to under 6 years, or under 25 kg). Request clinical support; transport and notify. Discuss the parents and estimating weight." } },
      { scope: "ao", box: { title: "2. Seizing on arrival", text: "Ron is having a seizure on the shed floor. Basic care first: protect him from injury and his airway. Measure the BGL (the protocol says to, including in seizures). If it is below 3.5 and he can't swallow, consult the EOC Clinician for glucagon." } },
      { scope: "ao", box: { title: "3. Baby under 2", text: "An 18 month old with a BGL of 2.8. Under 2 years: consult the EOC Clinician, who may advise oral glucose gel or IM glucagon 0.5 mg; request clinical support; transport and notify." } },
      { scope: "ao", box: { title: "4. Paste works", text: "Ron's BGL rises to 4.8 and he's alert 15 minutes after the paste. No glucagon needed. Consider complex carbohydrates to eat, then transport and notify. Discuss whether clinical support is still needed." } }
    ] }
  ],

  /* ---------- Ambulance Responder version (CPP-031-AR v2.1) ---------- */
  ar: {
    replace: [["CPP-009-AO", "CPP-031-AR"], ["CPP-004-AO", "CPP-025-AR"], ["Ambulance Officer", "Ambulance Responder"], ["paste", "gel"]],
    title: "Hypoglycaemia - AR",
    subtitle: "Walk-through scenario: 2-person volunteer AR crew",
    lead: "A hypoglycaemia call for a two-person volunteer Ambulance Responder crew, with seven break points for discussion, skills practice and decisions. No glucagon at AR level: when oral glucose fails, the EOC Clinician advises transport and an RV with the paramedics.",
    protocol: {
      code: "CPP-031-AR", name: "Hypoglycaemia - AR", version: "v2.1 (30 June 2021)", exported: "31 August 2026",
      also: [{ code: "CPP-025-AR, CPPRO-008, 009", name: "Basic Care and Life Support - AR, Medication Checks, Oral Medication", version: "v2.0 (4 January 2019); each v1.0 (5 July 2017)" }]
    },
    relatedCodes: ["CPP-009-AO"],
    footerNotes: ["This is a new training scenario written by DSY: the patient, story, observations, timings, the RV and EOC Clinician replies are fictional. Check it with your lead instructor."]
  }
};
