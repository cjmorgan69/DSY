/* Headache - AO walk-through scenario (Ian, 62, Coffin Bay). Content only: the layout lives in
   /microlearning/shared/module.js. Rebuilt on 16 Oct 2026 from the older standalone scenario at this address, which
   was written before the protocol existed. Clinical actions follow SAAS CPP-061-AO Headache - AO v1.0 (3 December
   2025, exported 31.08.2026), with CPP-047-AO Nausea and Vomiting - AO v2.3 for ondansetron, CPP-013-AO Pain
   Management for analgesia, CTL-066 ROSIER+ACT, and CPP-016-AO Stroke / CPP-062-AO Sepsis for the variations. Local
   Code Stroke notification follows the DSY lead instructor's guidance. The BGL, head-up positioning and airway
   planning are general teaching. The story, scene, observations, crew roles, timings and EOC Clinician replies are
   written by DSY for training. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Headache - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Ian, 62: \"like being hit with a cricket bat\" at the Coffin Bay caravan park",
  lead: "A sudden, severe headache with red flags for a two-person volunteer AO crew, with eight break points for discussion, skills practice and decisions: the red flags, a negative ROSIER that doesn't reassure, symptom relief, and a patient who gets worse. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 65,

  protocol: {
    code: "CPP-061-AO", name: "Headache - AO", version: "v1.0 (3 December 2025)", exported: "31 August 2026",
    also: [{ code: "CPP-047-AO", name: "Nausea and Vomiting - AO", version: "v2.3 (4 June 2025)" },
           { code: "CTL-066", name: "ROSIER+ACT Assessment Screening Tool", version: "exported 31 August 2026" }]
  },
  footerNotes: ["This is DSY's training scenario: the patient, story, observations, timings and EOC Clinician replies are fictional. Check it with your lead instructor.",
    "Analgesia follows Pain Management CPP-013-AO; the variations use Stroke CPP-016-AO and Sepsis CPP-062-AO."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 62 year old tourist at the Coffin Bay caravan park has a sudden, severe headache while sitting reading. Port Lincoln Hospital is about 35 to 40 minutes away; paramedics from Port Lincoln about 45 minutes; MedSTAR about 90 minutes." },
      { box: { title: "Learning objectives", items: [
        "Take a thorough headache history: onset, triggers, past headaches",
        "Check for all ten CPP-061-AO red flags",
        "Do a ROSIER (CTL-066) and know that a negative result doesn't make a headache benign",
        "Prioritise transport and request clinical support when there's a red flag",
        "Give analgesia per CPP-013-AO and ondansetron per CPP-047-AO",
        "Recognise deterioration, update the EOC Clinician, and give an ISBAR handover"
      ] } },
      { box: { title: "Required equipment", items: [
        "Response bag, Corpuls3, BGL meter, pen torch, manual BP cuff",
        "Paracetamol 500 mg tablets, ondansetron 4 mg ODT, water",
        "Suction, BVM, stretcher, blanket, PPE, ePCR tablet, phone",
        "ROSIER+ACT card (CTL-066)"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 35 to 45 minutes; debrief 10 to 15 minutes",
        "Port Lincoln Hospital: about 35 to 40 minutes",
        "Paramedics from Port Lincoln: about 45 minutes; MedSTAR: about 90 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, history, red flags, ROSIER, medicines, decisions, handover",
        "Driver (AO2): scene, Corpuls3 and observations, BGL, clinical support request and EOC Clinician calls, stretcher"
      ] } }
    ] },

    { title: "Pre-brief: the AO headache protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { steps: [
        { t: "Basic care and life support" },
        { t: "History, pain and neuro assessment", text: "A thorough history is crucial. Include ROSIER (Rosier + Act Assessment) and gait." },
        { t: "Check the red flags", text: "Any red flag: prioritise transport and request clinical support. If support is unavailable, consult the EOC Clinician." },
        { t: "Neuro signs on ROSIER + ACT", text: "Manage as per Stroke CPP-016-AO." },
        { t: "Suspected infection or meningococcal septicaemia", text: "Manage as per Sepsis CPP-062-AO." },
        { t: "Symptom relief", text: "The patient's own headache plan and medicines; analgesia per CPP-013-AO; consider an antiemetic per CPP-047-AO." },
        { t: "Transport", text: "To an appropriate facility. Treat and discharge or an alternate pathway: consult the EOC Clinician." }
      ] },
      { box: { title: "The ten red flags (CPP-061-AO)", tone: "no", items: [
        "Sudden onset severe thunderclap or uncharacteristic headache",
        "Sudden onset or severe headache triggered by cough, exertion or sexual activity",
        "Severe headache with signs of systemic illness (altered conscious state, neck stiffness, fever, rash, vomiting, confusion)",
        "Headache with a current or resolved neurological sign and/or altered consciousness",
        "First severe headache in a patient over 50",
        "New headache with a history of cancer or HIV",
        "Persistent headache worsening over hours to days",
        "Severe headache in pregnancy, with or without hypertension",
        "Headache with recent head trauma",
        "Features of raised intracranial pressure: worse lying down or on waking, with nausea and/or vomiting"
      ] } },
      { box: { title: "Principle (CPP-061-AO)", items: [
        "About 5% of headaches are secondary, with a serious cause such as subarachnoid haemorrhage, raised intracranial pressure or meningitis",
        "SAAS clinicians aren't aiming to diagnose: spot the warning signs, manage symptoms, transport",
        "Relief from effective analgesia is not evidence of a benign cause"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "Check the BGL as part of basic care in anyone unwell",
        "A thunderclap headache is often described as \"the worst headache of my life\"",
        "ROSIER looks for stroke; a bleed around the brain can have no focal signs",
        "Head-up positioning, suction ready and an airway plan for a patient whose GCS is falling"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "1423 on a sunny autumn afternoon. You're paged from Coffin Bay station." },
      { box: { title: "MDT display", items: [
        "Priority 2, headache, severe. 62 year old male",
        "Sudden onset about 45 minutes ago. Conscious and breathing",
        "Wife on scene: \"worst headache ever\". No trauma reported",
        "Coffin Bay Caravan Park, site 47, near the waterfront loop"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What stands out in the MDT?", "What are you already worried about?", "What kit do you want?", "Who does what?"],
        expected: [
          "Sudden onset, severe, \"worst ever\": possible thunderclap headache, a red flag",
          "Aged 62: if this is his first severe headache, that's another red flag",
          "Response bag, Corpuls3, BGL kit, suction; think about the stretcher route",
          "Clinician: patient and history. Driver: monitor, obs, and early clinical support if red flags are confirmed"
        ],
        teaching: ["Red flags drive the plan: prioritise transport and request clinical support (CPP-061-AO)"],
        realJob: "Know the red flags well enough to start ticking them off from the MDT.",
        decisions: [{ q: "\"Sudden severe headache, worst ever\" in the MDT. Which red flag might this be?", options: ["Persistent headache worsening over days", "Sudden onset severe thunderclap or uncharacteristic headache", "None: it could be a migraine"], answer: 1,
          why: "CPP-061-AO lists sudden onset severe thunderclap/uncharacteristic headache as a red flag of a serious underlying condition." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "1431. Sandra meets you at the entrance and walks you to site 47. \"He just grabbed his head and cried out. I've never seen him like this. He won't let me turn the lights on.\" Ian is in a deck chair under the annex, leaning forward with his head in his hands. The sun is low and bright." },
      { breakpoint: { title: "First impression", type: "Discussion",
        prompts: ["What do you see from the edge of the annex?", "Is the scene safe?", "What does his posture tell you?", "What will you change about the environment?"],
        expected: [
          "Conscious, breathing, holding his head still, avoiding light: severe pain",
          "Scene safe; bystanders nearby",
          "Severe pain, likely photophobia",
          "Move him into shade or inside, reduce light and noise; use Sandra for the history"
        ],
        teaching: ["Posture and behaviour are clinical signs", "Reducing light and noise is real care for this patient"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "At a caravan park, take control of the space early: shade, privacy, quiet."
      } }
    ] },

    { title: "History and observations", blocks: [
      { text: "Ian keeps his eyes shut. \"It just hit me out of nowhere. Like someone smashed me with a cricket bat. I feel sick. The light's killing me.\"" },
      { box: { title: "History", items: [
        "Onset: sudden, about 45 minutes ago, while sitting reading. No exertion, no knock to the head",
        "Back of the head, spreading over the whole head. 9/10. \"Worst headache of my life\"",
        "No past headaches like this. Constant since it started",
        "Nausea, no vomiting. Light hurts. Neck getting stiff over the last 15 minutes. No weakness, droop, speech or vision change. No seizure, no loss of consciousness, no rash",
        "High blood pressure (perindopril 5 mg), mild osteoarthritis, paracetamol now and then (none today). Allergic to penicillin (rash). Lunch an hour ago"
      ] } },
      { table: { title: "Observations (1435)", table: { head: ["Pain", "GCS", "HR", "BP", "RR", "SpO2", "Temp", "BGL", "Pupils"], rows: [["9/10", "15", "88", "178/102", "18", "98% (air)", "37.2", "6.8", "Equal, reactive"]] } } },
      { breakpoint: { title: "History and red flags", type: "Decision making",
        prompts: ["Which red flags does Ian have?", "What does the history tell you that the obs don't?", "Why check the BGL?", "What does the BP mean here?"],
        expected: [
          "Sudden thunderclap/uncharacteristic headache; first severe headache over 50; systemic signs (neck stiffness)",
          "Onset, character and \"never like this before\": the history is the key to a secondary headache (CPP-061-AO)",
          "Basic care: rules out low blood sugar (general teaching)",
          "Could be pain, or part of the cause: record it and watch the trend"
        ],
        teaching: ["A thorough history is crucial in recognising a secondary headache (CPP-061-AO)", "A history of similar headaches is reassuring; Ian has none"],
        realJob: "Ask \"Have you ever had a headache like this before?\" early. A no is a big deal.",
        decisions: [{ q: "Ian has never had a headache like this, it came on suddenly, and he's 62. What does CPP-061-AO say?", options: [
          "Probably a migraine: treat and leave",
          "Red flags: prioritise transport and request clinical support",
          "Wait to see if paracetamol works" ], answer: 1,
          why: "Sudden onset thunderclap/uncharacteristic headache and first severe headache over 50 are red flags. Any red flag: prioritise transport and request clinical support (CPP-061-AO)." }],
        cards: [{ q: "Name five of the ten CPP-061-AO red flags.", a: "Any five of: thunderclap; triggered by cough/exertion/sex; systemic signs; neuro sign; first severe over 50; cancer/HIV; worsening over hours to days; pregnancy; recent head trauma; raised ICP features." }]
      } }
    ] },

    { title: "ROSIER and the working picture", blocks: [
      { table: { title: "ROSIER for Ian (CTL-066)", table: { head: ["Item", "Ian"], rows: [
        ["Loss of consciousness or syncope", "No (0)"], ["Seizure activity", "No (0)"],
        ["New acute asymmetric face, arm or leg weakness", "No (0)"], ["New acute speech disturbance", "No (0)"],
        ["New acute visual field defect", "No (0)"], ["Total", "0: stroke less likely"]
      ] } } },
      { breakpoint: { title: "A negative ROSIER", type: "Decision making",
        prompts: ["Why do a ROSIER on a headache?", "What does ROSIER 0 mean for Ian?", "Is he safe to stay at the caravan park?", "What's your plan?"],
        expected: [
          "CPP-061-AO: the neuro assessment includes ROSIER and gait; any neuro signs mean the stroke protocol",
          "No neuro signs, so not the stroke pathway. It doesn't rule out a bleed around the brain or meningitis",
          "No: red flags. Prioritise transport and request clinical support",
          "Driver requests the Port Lincoln paramedics; treat symptoms; get moving"
        ],
        teaching: ["Red flags in the history drive your concern, not ROSIER alone", "SAAS clinicians aren't aiming to diagnose (CPP-061-AO)"],
        realJob: "\"ROSIER is negative\" is not the same as \"he's OK\". Say the red flags out loud.",
        decisions: [{ q: "ROSIER is 0. What does that change for Ian?", options: ["He can stay home", "He's not on the stroke pathway, but his red flags still mean prioritised transport and clinical support", "Nothing needs to happen"], answer: 1,
          why: "Any neurological signs on Rosier + Act: manage as stroke. Without them, the red flags still apply: prioritise transport and request clinical support (CPP-061-AO)." }]
      } },
      { text: "1438: clinical support requested (paramedics from Port Lincoln, about 45 minutes). Plan to meet them on the way if needed.", muted: true }
    ] },

    { title: "Symptom relief", blocks: [
      { box: { title: "Ondansetron 4 mg ODT (CPP-047-AO)", tiles: true, steps: [
        { t: "Indication", text: "Nausea, and to make transport safe." },
        { t: "Contraindications", text: "Allergy to ondansetron or the formulation; apomorphine for Parkinson's. Ian: none." },
        { t: "Precautions", text: "Prolonged QT, AF or heart failure, low magnesium or potassium. Ask him. Ian: none known." },
        { t: "Give", text: "With dry hands, place the ODT on top of his tongue. Let it dissolve, then swallow." },
        { t: "Record", text: "Dose, route and time. Still vomiting, or more than one precaution: consult the EOC Clinician." }
      ] } },
      { breakpoint: { title: "Analgesia and antiemetic", type: "Practical skill",
        prompts: ["What analgesia can you give, and what do you check?", "Ibuprofen?", "Show us the ondansetron.", "If the pain eases, does that reassure you?"],
        expected: [
          "Paracetamol 1000 mg oral: none in the past 4 hours (CPP-013-AO). He can swallow safely",
          "He takes perindopril and you can't confirm it's safe: any ambiguity, withhold (CPP-013-AO)",
          "Dry hands, on top of the tongue, dissolve and swallow; checks first (CPP-047-AO)",
          "No: relief from effective analgesia is not evidence of a benign cause (CPP-061-AO)"
        ],
        teaching: ["Symptom relief matters, but the real treatment is getting him to hospital", "Keep reducing light and noise"],
        realJob: "Don't let a better pain score talk you out of the red flags.",
        decisions: [{ q: "How do you give the ondansetron ODT?", options: ["Swallow whole with water", "With dry hands, place it on top of the tongue, let it dissolve, then swallow", "Crush it under the tongue"], answer: 1,
          why: "CPP-047-AO: with dry hands place the ODT on top of the patient's tongue; direct the patient to allow it to dissolve, then swallow." }],
        cards: [{ q: "The headache eases after paracetamol. Is that reassuring?", a: "No. Headaches with symptomatic relief from effective analgesia is not evidence of a benign cause (CPP-061-AO)." }]
      } },
      { text: "1440: paracetamol 1000 mg oral. 1442: ondansetron 4 mg ODT.", muted: true }
    ] },

    { title: "Reassessment", blocks: [
      { table: { title: "Observations", table: { head: ["", "1435", "1445"], rows: [
        ["Pain", "9/10", "8/10"], ["GCS", "15", "14 (E4 V4 M6): confused"], ["HR", "88", "92"], ["BP", "178/102", "182/106"],
        ["RR", "18", "20"], ["SpO2", "98% (air)", "97% (air)"], ["Pupils", "Equal, reactive", "Equal, reactive"]
      ] } } },
      { breakpoint: { title: "He's getting worse", type: "Decision making",
        prompts: ["What has changed?", "What does GCS 15 to 14 mean here?", "Who do you tell?", "Does your plan change?"],
        expected: [
          "GCS down a point, now confused; BP and RR up; pain barely changed",
          "Deterioration: any drop in conscious state with a red flag headache is significant",
          "Update the EOC Clinician now; clinical support is already coming",
          "Minimise scene time; leave now and meet the paramedics on the way if possible"
        ],
        teaching: ["Two sets of obs give you a direction of travel", "Altered consciousness is itself a red flag (CPP-061-AO)"],
        realJob: "Don't talk yourself out of a one-point GCS drop. Say it, write it, act on it.",
        decisions: [{ q: "Ian's GCS drops from 15 to 14 and he's confused. What now?", options: ["Wait 15 minutes and recheck", "Update the EOC Clinician and leave now, meeting clinical support en route if possible", "Give more paracetamol"], answer: 1,
          why: "Any red flag: prioritise transport and request clinical support (CPP-061-AO). A falling conscious state makes that more urgent; keep the EOC Clinician informed." }]
      } },
      { box: { title: "EOC Clinician update (story)", items: [
        "Driver: \"62 year old male, sudden thunderclap headache 1 hour ago, first ever, neck stiffness, nausea, photophobia. ROSIER 0. Now GCS 14 and confused, BP 182/106. Paracetamol and ondansetron given. Paramedics requested. Leaving for Port Lincoln now.\"",
        "EOC Clinician: \"Agree. Go now, I'll arrange for the paramedics to meet you on the Lincoln Highway and I'll let Port Lincoln Hospital know. GCS every 5 minutes. Call me if anything changes.\""
      ] } }
    ] },

    { title: "Extrication and transport", blocks: [
      { breakpoint: { title: "Moving and monitoring", type: "Decision making",
        prompts: ["How do you get Ian onto the stretcher?", "What position?", "What are you watching on the way?", "What's your plan if he vomits or his GCS drops?"],
        expected: [
          "Stretcher to the site; assisted stand and pivot with both crew; minimal exertion",
          "Head up (about 30 degrees) for comfort; lights low",
          "Corpuls3, GCS every 5 minutes, pupils, vomiting",
          "Suction ready, side position if he vomits with a reduced conscious state, BVM at hand; update the EOC Clinician"
        ],
        teaching: ["Have the deterioration plan before you leave the scene", "Smooth driving matters"],
        teachingNote: "Positioning, airway planning and driving are general teaching, from the scenario.",
        realJob: "Thirty-five minutes in the back with a deteriorating patient is a long time. Suction assembled, within reach, before you move.",
        decisions: [{ q: "What does CPP-061-AO say about transport for Ian?", options: ["Transport only if he asks", "Prioritise transport and request clinical support, to an appropriate facility", "Treat and discharge with EOC advice"], answer: 1,
          why: "Any patient with a red flag: prioritise transport and request clinical support. Transport to an appropriate facility (CPP-061-AO)." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["Identify", "\"I'm [name], volunteer AO from Coffin Bay. This is Ian, 62. His wife Sandra is following.\""],
        ["Situation", "\"Sudden severe headache at about 1340 while sitting reading. Worst of his life, never had one like it. Now GCS 14 and confused.\""],
        ["Background", "\"High blood pressure on perindopril, mild osteoarthritis. Penicillin allergy (rash). Nausea, photophobia, neck stiffness. ROSIER 0, no focal signs.\""],
        ["Assessment", "\"HR 92, BP 182/106, RR 20, SpO2 97% on air, GCS 14, pupils equal and reactive, BGL 6.8. Pain 9 to 8 out of 10.\""],
        ["Recommendation", "\"Paracetamol 1 g oral at 1440, ondansetron 4 mg ODT at 1442. Ibuprofen withheld. Red flags for a serious cause and he's deteriorating: he needs urgent medical assessment.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Give the handover out loud.", "What must the team hear first?", "Why give the onset time?"],
        expected: [
          "Structured and under 90 seconds",
          "Sudden worst-ever headache, and the falling GCS",
          "So the team can plan investigations and treatment"
        ],
        teaching: ["Hand over what you found, what you did, and what worries you"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "\"Red flags, and he's getting worse\" is the sentence that gets him seen first.",
        decisions: [{ q: "Which detail matters most in Ian's handover?", options: ["The caravan site number", "The sudden onset time, the red flags and the GCS drop", "The weather"], answer: 1,
          why: "The receiving team needs the onset, the warning signs and the trend to act quickly." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "When did you first suspect this wasn't a simple headache?",
        "How did you handle a negative ROSIER when the history was worrying?",
        "How many red flags did Ian have? Which did you miss at first?",
        "What would you have done if he'd been GCS 13 on arrival?",
        "What could have been done during transport instead of on scene?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Check all ten red flags on every headache job",
        "Any red flag: prioritise transport and request clinical support; consult the EOC Clinician if support isn't available",
        "Neuro signs on ROSIER + ACT: stroke protocol. Suspected infection: sepsis protocol",
        "A negative ROSIER and a better pain score don't make a headache benign",
        "Treat the symptoms: their own plan, analgesia per CPP-013-AO, ondansetron per CPP-047-AO",
        "Have a deterioration plan before you leave"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. Meningitis", text: "A 28 year old backpacker: headache worsening over 6 hours, fever 38.9, neck stiffness, photophobia, a non-blanching rash, increasingly confused, GCS 13. Suspected infection or meningococcal septicaemia: manage as per Sepsis CPP-062-AO (febrile with an altered conscious state: consult the EOC Clinician about ceftriaxone). Prioritise transport, request clinical support." } },
      { box: { title: "2. Stroke signs", text: "Ian has right facial droop, right arm weakness and slurred speech, onset 90 minutes ago, ROSIER +3. Neuro signs: manage as per Stroke CPP-016-AO (9-hour window; consult the EOC Clinician about Code Stroke to Port Lincoln Hospital; local notification: the EOC Clinician may contact the hospital and/or the crew notifies by GRN radio)." } },
      { box: { title: "3. Knock to the head on warfarin", text: "Ian tripped over a guy rope 2 hours ago and hit his head on the caravan step. Now a worsening headache, nausea and one vomit. He's on warfarin. Red flags: recent head trauma, worsening headache. Prioritise transport, request clinical support." } },
      { box: { title: "4. Pregnant and severe headache", text: "A 31 year old at 34 weeks with a severe headache and BP 164/108. Red flag: severe headache in pregnancy, with or without hypertension. Prioritise transport, request clinical support." } },
      { box: { title: "5. Rapid deterioration", text: "During transport Ian's GCS drops to 9, he vomits and can't protect his airway, SpO2 91%. Side position, suction, BVM if needed; update the EOC Clinician; meet the paramedics." } }
    ] }
  ]
};
