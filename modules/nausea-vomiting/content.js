/* Nausea and Vomiting - AO walk-through scenario (Helen, 62, near Cummins). Content only: the layout lives in
   /microlearning/shared/module.js. Rebuilt on 16 Oct 2026 from the older standalone scenario at this address.
   Clinical actions follow SAAS CPP-047-AO Nausea and Vomiting - AO v2.3 (4 June 2025, exported 31.08.2026); the BGL
   thresholds and glucose steps follow CPP-009-AO Hypoglycaemia - AO v4.1. The 4 mg ODT presentation comes from the
   SAAS Clinical app. Blister handling, "no water needed" and the extra escalation triggers are general teaching. The
   story, scene, observations, crew roles, timings and EOC Clinician replies are written by DSY for training. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Nausea and Vomiting - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Helen, 62: eight hours of vomiting and nearly fainted, near Cummins",
  lead: "Persistent vomiting in a woman with AF and diabetes, for a two-person volunteer AO crew, with eight break points for discussion, skills practice and decisions: screening for ondansetron, one precaution, the ODT technique, a second dose on EOC Clinician advice, and watching the BGL. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 70,

  protocol: {
    code: "CPP-047-AO", name: "Nausea and Vomiting - AO", version: "v2.3 (4 June 2025)", exported: "31 August 2026",
    also: [{ code: "CPP-009-AO", name: "Hypoglycaemia - AO", version: "v4.1 (30 June 2021)" }]
  },
  footerNotes: ["This is DSY's training scenario: the patient, story, observations, timings and EOC Clinician replies are fictional. Check it with your lead instructor."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 62 year old woman on a farm 5 km west of Cummins has been vomiting for eight hours and can't keep fluids down. Her husband calls when she nearly faints walking from the bathroom. Cummins District Hospital is about 7 minutes away; backup is limited; the EOC Clinician is available by phone." },
      { box: { title: "Learning objectives", items: [
        "Decide whether an antiemetic is indicated (uncontrolled nausea and vomiting, and/or safe transport)",
        "Screen the two contraindications and three precautions, and confirm precautions with the patient",
        "Choose the dose by age and give an ODT correctly",
        "Consult the EOC Clinician when nausea and vomiting persist or more than one precaution exists",
        "Monitor the BGL in a diabetic patient who can't eat, using the hypoglycaemia protocol thresholds",
        "Move a dehydrated patient safely and give an ISBAR handover"
      ] } },
      { box: { title: "Required equipment", items: [
        "Response bag, Corpuls3 (SpO2, NIBP, 4-lead), thermometer, BGL meter, manual BP cuff",
        "Ondansetron 4 mg ODT (training stock or an empty blister), oral glucose",
        "Green carry chair, stretcher, emesis bags, towels, suction",
        "Gloves, eye protection, ePCR tablet"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 45 to 55 minutes; debrief 10 to 15 minutes",
        "Cummins District Hospital: about 7 minutes",
        "Backup: limited. EOC Clinician: by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, history, screening, ondansetron, decisions",
        "Driver (AO2): Corpuls3 and observations, BGL, EOC Clinician call, documentation, carry chair and stretcher"
      ] } }
    ] },

    { title: "Pre-brief: the AO nausea and vomiting protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { steps: [
        { t: "Universal care" },
        { t: "Consider an antiemetic", text: "Uncontrolled nausea and vomiting and/or to facilitate safe transport. Patients 2 years and over." },
        { t: "Contraindications", text: "Known allergy or hypersensitivity to ondansetron or its components; taking apomorphine for Parkinson's." },
        { t: "Precautions: confirm with the patient", text: "Prolonged QT; irregular heart conditions (AF) or heart failure; low magnesium or potassium." },
        { t: "Ondansetron ODT", text: "Adults 4 mg. 6 to under 16: 4 mg. 2 to under 6: 2 mg. Single dose. With dry hands on top of the tongue; dissolve, then swallow." },
        { t: "Persisting, or more than one precaution", text: "Consult the EOC Clinician, who may advise a further 4 mg ODT for adults only, and discuss further treatment and transport." },
        { t: "Provide transport for further care" }
      ] },
      { box: { title: "Principle (CPP-047-AO)", items: [
        "Nausea and vomiting can indicate significant underlying illness",
        "Not where gastric emptying is beneficial; not effective for motion sickness",
        "May be given before transport after head, spine or eye trauma where vomiting carries a high risk of complications",
        "Caution after a previous dystonic reaction, or with Parkinson's disease"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "Peel the blister foil back rather than pushing the tablet through; it crumbles",
        "The ODT dissolves in seconds; water isn't needed",
        "Call the EOC Clinician too if the patient deteriorates, develops new symptoms, or you're unsure",
        "A diabetic who can't eat needs the BGL watched: below 3.5 mmol/L, follow the hypoglycaemia protocol (CPP-009-AO)"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Wednesday evening in July, 2035. You're paged in Cummins." },
      { box: { title: "MDT display", items: [
        "Priority 2, persistent nausea and vomiting, 62 year old female",
        "Vomiting for 8 hours, can't keep fluids down. Nearly fainted walking from the bathroom",
        "Caller: husband (David)",
        "Farm 5 km west of Cummins: sealed road, then a 200 m gravel driveway. Gate open, lights on"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What does the MDT tell you?", "What could cause eight hours of vomiting?", "What kit do you want?", "Who does what?"],
        expected: [
          "Eight hours of vomiting and near-fainting: likely dehydrated, possibly significant illness",
          "Gastro or food poisoning, but also bowel obstruction, medicines, cardiac or metabolic causes",
          "Response bag, Corpuls3, BGL meter, ondansetron, oral glucose, emesis bags, carry chair",
          "Clinician: history and medicines. Driver: obs, BGL, the EOC Clinician call"
        ],
        teaching: ["Nausea and vomiting can indicate significant underlying illness (CPP-047-AO)", "Her medicines will matter for ondansetron: listen for AF, heart failure, Parkinson's"],
        realJob: "Have a torch for the driveway and the carry chair ready: she'll be unsteady.",
        decisions: [{ q: "When does CPP-047-AO say to consider an antiemetic?", options: ["Every patient who feels sick", "Uncontrolled nausea and vomiting and/or to facilitate safe transport", "Only if they've vomited more than 10 times"], answer: 1,
          why: "Consider requirement for antiemetic: uncontrolled nausea and vomiting and/or to facilitate safe transport." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "2043. David, 65, meets you at the door. The house smells of cleaning products. Helen is on the bathroom floor with a bucket, pale and exhausted. David: \"She started vomiting around lunchtime after leftover chicken. It just hasn't stopped. She tried to walk to bed and went really wobbly.\"" },
      { breakpoint: { title: "First impression", type: "Discussion",
        prompts: ["What's your first impression?", "Any safety concerns?", "Time-critical?", "Where will you assess her?"],
        expected: [
          "Pale, exhausted, on the floor: looks unwell and dry",
          "Domestic and safe; open a window for the cleaning smell",
          "Not immediately time-critical, but needs prompt assessment",
          "Help her to a chair if she can manage it safely; don't let her walk far"
        ],
        teaching: ["The bucket and the cleaning tell you how often she's been vomiting", "Move her somewhere better to assess, with help"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "Sick or not sick? She looks sick. Introduce yourself, get consent, and decide where to assess."
      } }
    ] },

    { title: "History and observations", blocks: [
      { box: { title: "History", items: [
        "Vomiting since about 1230, 8 or more times, now clear. Dizzy on standing, weak. No diarrhoea, no chest pain, no headache, mild generalised abdominal tenderness",
        "Allergies: penicillin (rash)",
        "Medicines: metoprolol 50 mg twice daily, apixaban 5 mg twice daily, metformin 1000 mg twice daily",
        "History: atrial fibrillation, type 2 diabetes",
        "Last intake: water 4 hours ago (vomited it). Reheated chicken at lunch; David ate the same and is fine"
      ] } },
      { table: { title: "Observations (2045)", table: { head: ["HR", "BP", "SpO2", "RR", "Temp", "BGL", "GCS", "Skin"], rows: [["104 irregular", "108/72", "97% (air)", "18", "37.4", "4.8", "15", "Pale, dry mouth, cap refill 3 s"]] } } },
      { breakpoint: { title: "Observations", type: "Practical skill",
        prompts: ["Driver: talk through the Corpuls3 setup.", "HR 104 and irregular: what does that tell you?", "BGL 4.8 on metformin and not eating: a concern?", "What does a 3 second capillary refill suggest?"],
        expected: [
          "SpO2, NIBP, 4-lead; manual RR count; manual BP if vomiting upsets the NIBP",
          "Her known AF, a bit fast: dehydration and stress",
          "Not below 3.5, so not hypoglycaemia (CPP-009-AO), but watch the trend: she can't eat",
          "Supports dehydration"
        ],
        teaching: ["AF is in her history: that's one ondansetron precaution", "Trend the BGL"],
        realJob: "Clinician talks, Driver measures, both build the picture at the same time.",
        decisions: [{ q: "Helen's BGL is 4.8. What does CPP-009-AO say?", options: ["Give oral glucose now", "Not below 3.5 mmol/L: monitor the trend", "Consult for glucagon"], answer: 1,
          why: "CPP-009-AO applies below 3.5 mmol/L. At 4.8 she isn't hypoglycaemic, but she can't eat, so keep checking." }]
      } }
    ] },

    { title: "Screening for ondansetron", blocks: [
      { text: "Working diagnosis: likely food poisoning or gastroenteritis, with dehydration. Uncontrolled vomiting, and she needs transport." },
      { breakpoint: { title: "Indication, contraindications, precautions", type: "Decision making",
        prompts: ["Is ondansetron indicated?", "Check the contraindications out loud.", "Which precautions does she have?", "Can you give the first dose, or consult first?"],
        expected: [
          "Yes: uncontrolled nausea and vomiting, and to make transport safe",
          "No allergy to ondansetron; no apomorphine, no Parkinson's: clear",
          "AF: one precaution. No known QT problem, no known low magnesium or potassium (ask her)",
          "One precaution: consider it and confirm with her, then give the first dose. More than one would mean consult first"
        ],
        teaching: ["Ask about apomorphine and Parkinson's by name", "Gastric emptying beneficial? Not here"],
        realJob: "Your mental checklist fires on \"AF\": that's a precaution. Check for the other two, confirm with her, and decide.",
        decisions: [
          { q: "Helen has AF and nothing else on the list. What does CPP-047-AO allow?", options: [
            "No ondansetron: AF is a contraindication",
            "Confirm the precaution with her, then give ondansetron 4 mg ODT",
            "Consult the EOC Clinician before any dose" ], answer: 1,
            why: "AF is a precaution, not a contraindication. Consider precautions and confirm with the patient before giving. Consultation is needed if more than one precaution exists." },
          { q: "What are the two contraindications?", options: ["AF and heart failure", "Allergy to ondansetron, and taking apomorphine for Parkinson's", "Age over 65 and diabetes"], answer: 1,
            why: "Contraindications: known allergy/hypersensitivity to ondansetron or its components; taking apomorphine in the setting of Parkinson's." }],
        cards: [{ q: "When must you consult before the first dose of ondansetron?", a: "When more than one precaution exists (prolonged QT, AF/heart failure, low magnesium/potassium) (CPP-047-AO)." }]
      } }
    ] },

    { title: "Giving ondansetron", blocks: [
      { box: { title: "Ondansetron 4 mg ODT", tiles: true, steps: [
        { t: "Check out loud", text: "Right patient, drug, dose (adult 4 mg), route (ODT), time. Precaution noted: AF." },
        { t: "Dry hands", text: "The tablet dissolves on contact with moisture." },
        { t: "Peel, don't push", text: "Peel the blister foil back (general teaching)." },
        { t: "On top of the tongue", text: "\"Let it dissolve, then swallow. Don't chew it.\"" },
        { t: "Record", text: "Ondansetron 4 mg ODT at 2047, AF precaution noted, reassess in about 15 minutes." }
      ] } },
      { breakpoint: { title: "Giving the ODT", type: "Practical skill",
        prompts: ["Say the checks to your partner.", "Show the blister and the placement.", "What would change for a 4 year old? A 10 year old?", "What do you write down?"],
        expected: [
          "Checks out loud, precaution named",
          "Dry hands, peel, on top of the tongue, dissolve, swallow",
          "4 year old: 2 mg, single dose. 10 year old: 4 mg, single dose",
          "Drug, dose, time, route, the precaution, and the plan"
        ],
        teaching: ["The skill is in the screening; the giving takes a minute"],
        realJob: "Wait for a pause between vomits to place the tablet.",
        decisions: [{ q: "How is an ondansetron ODT given?", options: ["Swallowed whole with water", "With dry hands, on top of the tongue; dissolve, then swallow", "Crushed under the tongue"], answer: 1,
          why: "CPP-047-AO: with dry hands place ODT on top of patient's tongue. Direct patient to allow ODT to dissolve, then swallow." }]
      } }
    ] },

    { title: "Reassessment and the EOC Clinician", blocks: [
      { table: { title: "Observations", table: { head: ["", "2045", "2100"], rows: [
        ["HR", "104 irregular", "98 irregular"], ["BP", "108/72", "110/74"], ["SpO2", "97%", "97%"], ["RR", "18", "16"],
        ["BGL", "4.8", "4.6"], ["Nausea", "8/10", "5/10"], ["Vomiting", "Active", "None for 15 min"]
      ] } } },
      { box: { title: "The EOC Clinician call (story)", items: [
        "Driver: \"62 year old female, 8 hours of vomiting, likely food poisoning. AF on metoprolol and apixaban, type 2 diabetes on metformin. Ondansetron 4 mg ODT at 2047, AF precaution noted. Vomiting stopped, but nausea still 5 out of 10. HR 98 irregular, BP 110/74, BGL 4.6 and drifting. Requesting advice.\"",
        "EOC Clinician: \"Give a second ondansetron 4 mg ODT. Keep checking her BGL; if it falls below 3.5, follow the hypoglycaemia protocol. Transport to Cummins District Hospital and notify them.\""
      ] } },
      { breakpoint: { title: "Still nauseated: consult", type: "Decision making",
        prompts: ["What does the protocol say now?", "What do you tell the EOC Clinician?", "Why watch the BGL?", "If she'd had two precautions, what would have been different?"],
        expected: [
          "Nausea persists after the first dose: consult the EOC Clinician, who may advise a further 4 mg for adults only",
          "Who she is, what's happened, what you gave and when, the precaution, the response, current obs",
          "Diabetic on metformin, not eating, BGL drifting down. Below 3.5: CPP-009-AO",
          "You'd have consulted before the first dose"
        ],
        teaching: ["A second dose is for adults only, on EOC Clinician advice", "Record the advice and the time"],
        realJob: "Have the numbers in front of you before you dial. The call takes two minutes.",
        decisions: [{ q: "Helen is still nauseated after 4 mg. What now?", options: ["Give another 4 mg straight away", "Consult the EOC Clinician, who may advise a further 4 mg ODT (adults only)", "Nothing more can be done"], answer: 1,
          why: "If nausea and/or vomiting persist: consult with the EOC Clinician, who may advise a further dose of ondansetron 4 mg ODT for adults only (CPP-047-AO)." }],
        cards: [{ q: "Can a 10 year old have a second ondansetron dose?", a: "No. Children get a single dose; the further 4 mg the EOC Clinician may advise is for adults only (CPP-047-AO)." }]
      } },
      { text: "2105: second ondansetron 4 mg ODT, as advised. 2115: HR 92, BP 114/76, BGL 4.5, nausea 2/10, no vomiting.", muted: true }
    ] },

    { title: "Extrication and transport", blocks: [
      { breakpoint: { title: "Moving her and the drive", type: "Decision making",
        prompts: ["Walk, or carry chair?", "What position on the stretcher?", "What's within reach on the way?", "What would change your plan en route?"],
        expected: [
          "Carry chair: she nearly fainted, don't let her walk",
          "Position of comfort; semi-reclined, or on her side if she's still nauseated",
          "Emesis bags, towels, suction, BGL meter, oral glucose",
          "Vomiting again, BGL below 3.5, drowsiness, new pain"
        ],
        teaching: ["Short trips still need monitoring", "Below 3.5 mmol/L: follow CPP-009-AO (oral glucose up to 15 g if she can swallow; if not, or it doesn't work, consult)"],
        teachingNote: "Moving and positioning are general teaching, from the scenario.",
        realJob: "Seven minutes goes fast. Keep the bag in her hand and the meter in yours.",
        decisions: [{ q: "En route, Helen's BGL is 3.3 and she's alert and swallowing well. What does CPP-009-AO say?", options: ["Wait until hospital", "Oral glucose up to 15 g, as she can swallow", "Second dose of ondansetron"], answer: 1,
          why: "CPP-009-AO: BGL below 3.5 mmol/L and an adequate GCS to swallow: oral glucose up to 15 g." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["Identify", "\"I'm [name], volunteer AO from Cummins. This is Helen Henley, 62.\""],
        ["Situation", "\"About 8 hours of nausea and vomiting, likely food poisoning from reheated chicken. Nearly fainted this evening.\""],
        ["Background", "\"AF on metoprolol and apixaban, type 2 diabetes on metformin. Penicillin allergy (rash).\""],
        ["Assessment", "\"Pale and dry, cap refill 3 s. Was HR 104 irregular, BP 108/72, BGL 4.8. AF on the 4-lead, no acute changes. Now HR 92, BP 114/76, BGL 4.5, nausea 2 out of 10, no vomiting.\""],
        ["Recommendation", "\"Ondansetron 4 mg ODT at 2047, AF precaution noted, and a second 4 mg at 2105 on EOC Clinician advice. BGL drifting down and she hasn't eaten: she'll need fluids and BGL monitoring.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Give the handover out loud.", "What do they need to know about the ondansetron?", "Why mention AF?"],
        expected: [
          "Structured and short, with trends",
          "Doses, times, that the second was on EOC Clinician advice",
          "It's a precaution for ondansetron: the team will keep it in mind"
        ],
        teaching: ["Include the trend: \"BGL 4.8 down to 4.5\""],
        teachingNote: "General teaching, from the scenario.",
        realJob: "Hand over the medicines as a chain: what, when, and who advised it.",
        decisions: [{ q: "What must the hospital hear about the ondansetron?", options: ["Only that she had some", "Both doses with times, that the second was on EOC Clinician advice, and the AF precaution", "The blister batch number"], answer: 1,
          why: "The receiving team needs the full medication chain and the precaution to plan further treatment." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "How did you decide ondansetron was indicated?",
        "Walk through the screening. How quick could you be on a real job?",
        "If Helen also had known low potassium, what would you have done first?",
        "How did you prepare for the EOC Clinician call?",
        "Why did the BGL matter, and what would you do at 3.3?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Indication first: uncontrolled nausea and vomiting, and/or safe transport",
        "Two contraindications: ondansetron allergy; apomorphine for Parkinson's",
        "Three precautions: one, confirm with the patient; more than one, consult first",
        "Adults 4 mg; 6 to under 16 4 mg; 2 to under 6 2 mg; children single dose",
        "Still nauseated: consult. A further 4 mg is adults only, on EOC Clinician advice",
        "A diabetic who can't eat: watch the BGL; below 3.5 follow CPP-009-AO"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. A 4 year old", text: "Gastro in a 4 year old. Ondansetron 2 mg ODT, single dose; no second dose. Parent consent, placing a tablet on a small child's tongue, and watching for dehydration." } },
      { box: { title: "2. Two precautions", text: "Helen has AF and known low potassium. More than one precaution: consult the EOC Clinician before giving any ondansetron. What will they need to know?" } },
      { box: { title: "3. Head injury", text: "A 45 year old fell from a ladder, hit his head, and is vomiting. CPP-047-AO: ondansetron may be given before transport after head, spine or eye trauma where vomiting carries a high risk. Also: a headache after head trauma is a red flag (CPP-061-AO); watch the GCS; spinal precautions as needed." } },
      { box: { title: "4. BGL falls en route", text: "Helen's BGL drops to 3.2 and she's sweaty and confused. CPP-009-AO: if she can safely swallow (a cough is a good indicator), oral glucose up to 15 g. If she can't, or it doesn't work, consult the EOC Clinician, who may advise IM glucagon. Request clinical support as appropriate." } }
    ] }
  ]
};
