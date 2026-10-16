/* Acute Cardiogenic Pulmonary Oedema - AO walk-through scenario (Kevin, 72). Content only: the layout lives in
   /microlearning/shared/module.js. Rebuilt on 16 Oct 2026 from the older standalone scenario at this address.
   Clinical actions follow SAAS CPP-001-AO Acute Cardiogenic Pulmonary Oedema - AO v4.2 (23 April 2020, exported
   31.08.2026) and CPPRO-009 Oral Medication Administration v1.0 (review date June 2020, now passed) for the sublingual
   spray. GTN 400 microg spray is used, which the SAAS Clinical app treats as the same as the 300 microg tablet in the
   protocol (the lead instructor accepts either). CPAP is Intensive Care Paramedic only. The pathophysiology, signs,
   triggers and lifting advice are general teaching, not CPP-001-AO. The story, scene, observations, crew roles,
   timings and EOC Clinician replies are written by DSY for training. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Acute Cardiogenic Pulmonary Oedema - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Kevin, 72: woke at 2am gasping and can't lie down",
  lead: "A night-time ACPO call for a two-person volunteer AO crew, with eight break points for discussion, skills practice and decisions: posture, high-flow oxygen, clinical support, the PDE-5 question, and GTN on EOC Clinician advice. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 70,

  protocol: {
    code: "CPP-001-AO", name: "Acute Cardiogenic Pulmonary Oedema - AO", version: "v4.2 (23 April 2020)", exported: "31 August 2026",
    also: [{ code: "CPPRO-009", name: "Oral Medication Administration", version: "v1.0 (review date June 2020)" }]
  },
  footerNotes: ["This is DSY's training scenario: the patient, story, observations, timings and EOC Clinician replies are fictional. Check it with your lead instructor.",
    "GTN 400 microg spray is used; the SAAS Clinical app treats one spray as the same as the 300 microg tablet in CPP-001-AO. CPPRO-009 is past its review date (June 2020)."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 72 year old man with heart failure, atrial fibrillation and a past heart attack wakes at 0215 gasping for breath. His wife calls at 0247. You're a two-person volunteer crew in a small Eyre Peninsula township, about 30 minutes from the nearest hospital. Clinical support is a long way off, so you are the treatment for the next half hour." },
      { box: { title: "Learning objectives", items: [
        "Recognise a likely acute cardiogenic pulmonary oedema",
        "Put posture and high-flow oxygen first",
        "Request clinical support and consult the EOC Clinician",
        "Check the three GTN limits: SBP over 100, HR 60 to 120, no PDE-5 inhibitor in the time window",
        "Give sublingual GTN spray correctly when advised, and monitor every 3 to 5 minutes",
        "Keep the patient upright through extrication, and transport promptly with notification",
        "Deliver an ISBAR handover"
      ] } },
      { box: { title: "Required equipment", items: [
        "Corpuls3, manual BP cuff, stethoscope",
        "Oxygen (portable and main), non-rebreather mask, suction",
        "GTN 400 microg spray",
        "Green carry chair, stretcher (head up), PPE, ePCR tablet"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 40 to 55 minutes; debrief 10 to 15 minutes",
        "Nearest hospital: about 30 minutes",
        "Clinical support: requested early, a long way off",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, posture and oxygen, history, GTN when advised, decisions",
        "Driver (AO2): Corpuls3 and observations, the clinical support request and EOC Clinician call, oxygen supply, carry chair and stretcher"
      ] } }
    ] },

    { title: "Pre-brief: the AO ACPO protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { steps: [
        { t: "Basic care including posture", text: "Sit them up." },
        { t: "High-flow oxygen", text: "Via a non-rebreather mask." },
        { t: "Request clinical support" },
        { t: "Consult the EOC Clinician, who may advise GTN", text: "Sublingual GTN 300 microg (or one 400 microg spray, SAAS app) if SBP over 100 mmHg, HR 60 to 120, and no PDE-5 inhibitor within 24 hours (sildenafil, vardenafil, avanafil) or 48 hours (tadalafil)." },
        { t: "Monitor vital signs every 3 to 5 minutes" },
        { t: "Repeat GTN as directed by the EOC Clinician", text: "If the vital signs remain within the limits. Consult any time they fall outside them." },
        { t: "Provide prompt transport and notify the receiving facility" }
      ] },
      { box: { title: "Principle (CPP-001-AO)", items: [
        "ACPO is best treated by attention to oxygenation and posture",
        "GTN is beneficial if there is adequate blood pressure",
        "GTN with a PDE-5 inhibitor can cause life-threatening hypotension"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "In ACPO the left ventricle fails and fluid backs up into the lungs, filling the alveoli",
        "Typical signs: sudden severe breathlessness, worse lying flat; pink frothy sputum; crackles; pale, cold and sweaty; fast heart and breathing; anxiety",
        "Common triggers: heart attack, very high blood pressure, fast AF, missed heart failure medicines, a salty meal",
        "Sitting up with legs down helps; lying flat can make them much worse",
        "CPAP is used by Intensive Care Paramedics, not AOs"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Thursday in July, 0247. You and your crew partner are paged from bed." },
      { box: { title: "MDT display", items: [
        "Priority 2, breathing problems, 72 year old male (Kevin)",
        "Caller: wife (Joan). Sudden shortness of breath, can't lie down, \"he's gone grey\"",
        "Cardiac history, details unknown",
        "House in the township; wife will meet you at the front door. About 30 minutes to the nearest hospital"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What does the dispatch tell you?", "What could this be?", "What goes to the door with you?", "How does the 30 minute drive change your plan?"],
        expected: [
          "72, cardiac history, sudden breathlessness, can't lie down, grey: high acuity",
          "Possible ACPO, chest pain/ACS, an arrhythmia, a clot, or a chest infection; \"can't lie down\" points to ACPO",
          "Response bag, Corpuls3, oxygen and non-rebreather, suction, GTN, carry chair",
          "Request clinical support early; you'll be treating all the way to hospital"
        ],
        teaching: ["Posture and oxygen first: CPP-001-AO says ACPO is best treated by attention to oxygenation and posture", "Agree roles before you arrive"],
        realJob: "At 3am, use the drive to wake up your brain. Decide who sits him up and who gets the oxygen and monitor.",
        decisions: [{ q: "What does CPP-001-AO say is the best treatment for ACPO?", options: ["GTN as early as possible", "Attention to oxygenation and posture", "Fast transport before anything else"], answer: 1,
          why: "ACPO is best treated by attention to oxygenation and posture. GTN is beneficial if there is adequate blood pressure (CPP-001-AO)." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "0300. A weatherboard house, lights on. Joan meets you in her dressing gown. \"Please hurry, he's in the bedroom. He woke up gasping about half an hour ago. I've never seen him this bad.\" You can hear his breathing from the hallway." },
      { breakpoint: { title: "Doorway and first impression", type: "Discussion",
        prompts: ["What has Joan told you?", "What can you hear, and what does it mean?", "Any scene concerns?", "What's your first priority?"],
        expected: [
          "Sudden onset from sleep 30 minutes ago, worst ever",
          "Audible laboured breathing from the hallway: severe distress",
          "Scene looks safe; clear a path for the carry chair",
          "Get to him, keep him sitting up, oxygen on"
        ],
        teaching: ["Breathlessness that wakes someone from sleep is a common heart failure pattern", "If you can hear it from the hallway, move with purpose"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "Move quickly but calmly. Your calm helps his breathing too."
      } }
    ] },

    { title: "Patient contact and assessment", blocks: [
      { text: "Kevin is sitting on the edge of the bed, leaning forward on his arms. Grey, sweaty, breathing fast and hard. \"Can't... breathe...\" Pink frothy sputum at his lips." },
      { box: { title: "Primary survey", items: [
        "Alert but distressed, single words only. Airway open, pink frothy sputum",
        "RR 32, crackles both sides, working hard",
        "Grey, pale and sweaty; radial pulse fast",
        "GCS 15, anxious. Clinical support requested"
      ] } },
      { table: { title: "Observations (0303, sitting up, on air)", table: { head: ["SpO2", "RR", "HR", "BP", "GCS", "Temp", "BGL"], rows: [["82%", "32", "118 irregular", "156/92", "15", "36.4", "7.8"]] } } },
      { breakpoint: { title: "Posture, oxygen and the monitor", type: "Practical skill",
        prompts: ["What does he need in the first minute?", "Why does posture matter?", "What oxygen device?", "Driver: set up the Corpuls3."],
        expected: [
          "Keep him sitting up, legs down; high-flow oxygen by non-rebreather; reassure",
          "CPP-001-AO: basic care including posture (sitting up). Sitting up eases breathing; lying flat can make him worse (general teaching)",
          "Non-rebreather mask, high flow (CPP-001-AO)",
          "SpO2, 3-lead ECG, NIBP (manual if needed), short cycle times"
        ],
        teaching: ["Position and oxygen are treatment, not just first aid", "Never lie him flat"],
        realJob: "The first thing you reach for is not the GTN. It's his posture and the oxygen.",
        decisions: [{ q: "Kevin is grey and gasping, sitting on the bed edge. What first?", options: ["Lie him down to check his chest", "Keep him sitting up and give high-flow oxygen by non-rebreather", "Give GTN straight away"], answer: 1,
          why: "CPP-001-AO: basic care including posture (sitting up), and high flow oxygen via non-rebreather mask." }]
      } }
    ] },

    { title: "History and the PDE-5 question", blocks: [
      { box: { title: "History (from Joan; Kevin is too breathless)", items: [
        "Woke at 0215 short of breath, couldn't lie down, coughing pink sputum",
        "Allergies: none known",
        "Medicines: metoprolol, perindopril, frusemide, aspirin, atorvastatin",
        "History: heart failure, AF, heart attack 4 years ago, high blood pressure",
        "Fish and chips for dinner at about 1900"
      ] } },
      { breakpoint: { title: "Working diagnosis and the PDE-5 question", type: "Decision making",
        prompts: ["What's your working diagnosis, and why?", "Which protocol?", "What must you ask before any GTN?", "How do you ask it with Joan in the room?"],
        expected: [
          "Likely ACPO: heart failure history, woke breathless, can't lie flat, pink frothy sputum, crackles",
          "CPP-001-AO",
          "PDE-5 inhibitors: sildenafil, vardenafil or avanafil in 24 hours, tadalafil in 48 hours. Joan: \"No, nothing like that.\"",
          "Plainly and kindly, by name: \"Has he taken Viagra, Cialis, Levitra or anything similar in the last two days?\""
        ],
        teaching: ["GTN with a PDE-5 inhibitor can cause life-threatening hypotension (CPP-001-AO)", "Ask the question every time, by name, with the time window"],
        realJob: "The PDE-5 question feels awkward at 3am. Ask it anyway, simply and without fuss.",
        decisions: [{ q: "Kevin took tadalafil (Cialis) 30 hours ago. Can GTN be considered?", options: ["Yes, it's been more than 24 hours", "No: tadalafil within 48 hours", "Yes, at half dose"], answer: 1,
          why: "CPP-001-AO: no use of PDE-5 inhibitors within 24 hrs (sildenafil, vardenafil or avanafil) or 48 hrs (tadalafil)." }],
        cards: [{ q: "Which PDE-5 inhibitor has a 48 hour window?", a: "Tadalafil. Sildenafil, vardenafil and avanafil: 24 hours (CPP-001-AO)." }]
      } }
    ] },

    { title: "The EOC Clinician and GTN", blocks: [
      { table: { title: "Observations (0308, after 5 minutes of high-flow oxygen)", table: { head: ["SpO2", "BP", "HR"], rows: [["89%", "152/94", "114 irregular"]] } } },
      { box: { title: "The EOC Clinician call (story)", items: [
        "Driver: \"72 year old male, likely acute cardiogenic pulmonary oedema. Heart failure, AF, previous MI. Woke 0215 breathless, pink frothy sputum, crackles both sides. Sitting up on high-flow oxygen by non-rebreather. SpO2 89, BP 152/94, HR 114 irregular. No PDE-5 inhibitors. Clinical support requested. 30 minutes from hospital. Requesting advice on GTN.\"",
        "EOC Clinician: \"Give GTN 400 microgram spray sublingually. Vital signs every 3 to 5 minutes. You can repeat it in 5 minutes if the systolic stays over 100 and the heart rate stays 60 to 120. Call me any time they fall outside those limits. Get moving.\""
      ] } },
      { box: { title: "Sublingual GTN spray (CPPRO-009)", tiles: true, steps: [
        { t: "Check out loud", text: "SBP over 100, HR 60 to 120, no PDE-5 inhibitor. Allergies. Medication checks with your partner." },
        { t: "Test spray", text: "Into the air, away from yourself, the patient and others. Don't inhale it." },
        { t: "Tongue up", text: "Ask him to lift the tip of his tongue to the roof of his mouth." },
        { t: "Spray under", text: "One spray under the tongue. Avoid touching his mouth with the nozzle." },
        { t: "Can't follow that?", text: "Spray between the cheek and gum instead (buccal)." },
        { t: "Record and watch", text: "Dose, route and time on the PCR. Vital signs every 3 to 5 minutes." }
      ] } },
      { breakpoint: { title: "The consult and the first GTN", type: "Practical skill",
        prompts: ["Role-play the EOC Clinician call. What must it include?", "Say the three GTN limits out loud.", "Show us the spray technique.", "What are you watching for afterwards?"],
        expected: [
          "Age, likely ACPO, history, posture and oxygen, the numbers, the PDE-5 answer, clinical support, distance, what you're asking",
          "SBP over 100 (152), HR 60 to 120 (114), no PDE-5 inhibitor: all met",
          "Test into the air, tongue up, spray under the tongue, avoid touching the mouth (CPPRO-009)",
          "Vital signs every 3 to 5 minutes; any value outside the limits means consult"
        ],
        teaching: ["GTN for ACPO is on EOC Clinician advice, not the AO's own decision", "A spray is not a tablet: it's not \"left to dissolve\""],
        realJob: "Say the limits out loud before each dose. Your partner checks you.",
        decisions: [{ q: "Which three things must be met before GTN for ACPO?", options: [
          "SpO2 over 94%, RR under 30, GCS 15",
          "SBP over 100 mmHg, HR 60 to 120, and no PDE-5 inhibitor within its time window",
          "Chest pain, crackles and pink sputum" ], answer: 1,
          why: "CPP-001-AO: the EOC Clinician may advise GTN if systolic BP > 100 mmHg, heart rate 60 to 120, and no use of PDE-5 inhibitors within 24 or 48 hrs." }],
        cards: [{ q: "How do you give a sublingual GTN spray?", a: "Test spray into the air away from everyone, ask the patient to lift the tongue tip, spray under the tongue without touching the mouth. If they can't, spray between cheek and gum (CPPRO-009)." }]
      } },
      { text: "0311: GTN 400 microg spray sublingually.", muted: true }
    ] },

    { title: "Reassessment", blocks: [
      { table: { title: "Observations", table: { head: ["", "0303 (air)", "0308 (O2)", "0316 (after GTN)"], rows: [
        ["SpO2", "82%", "89%", "92%"], ["RR", "32", "30", "26"], ["HR", "118", "114", "108"], ["BP", "156/92", "152/94", "138/86"], ["GCS", "15", "15", "15"]
      ] } } },
      { text: "Kevin says he's \"a bit better\". Still breathless, still needs to sit up, but less frantic." },
      { breakpoint: { title: "Repeat GTN?", type: "Decision making",
        prompts: ["Is he better or worse?", "Can he have a second GTN? What do you check first?", "What would make you stop and consult?", "What else could go wrong?"],
        expected: [
          "Better: SpO2 up, breathing and heart rate down, feels better",
          "SBP 138 (over 100), HR 108 (60 to 120), no PDE-5: within limits, so repeat as the EOC Clinician directed",
          "SBP 100 or less, HR under 60 or over 120: consult the EOC Clinician (CPP-001-AO)",
          "Getting drowsier, SpO2 falling, more distress: escalate (general teaching)"
        ],
        teaching: ["A falling BP after GTN is expected; the limit is what matters", "Repeat only as directed and only within the limits"],
        realJob: "Improving doesn't mean finished. Keep the 3 to 5 minute checks going.",
        decisions: [{ q: "Five minutes after the first spray: SBP 138, HR 108, still breathless. What does the protocol allow?", options: [
          "Repeat GTN as directed by the EOC Clinician, as the vital signs remain within the limits",
          "No more GTN ever: one dose only",
          "Give two sprays at once" ], answer: 0,
          why: "CPP-001-AO: repeat GTN as directed by EOC Clinician if vital signs remain within the limits." }]
      } },
      { text: "0317: second GTN 400 microg spray, as directed.", muted: true }
    ] },

    { title: "Extrication and transport", blocks: [
      { text: "0320. Kevin is improving but still breathless. The ambulance is out the front; the bedroom is down a hallway with two steps at the door." },
      { breakpoint: { title: "Getting him to the ambulance", type: "Decision making",
        prompts: ["How do you move him?", "What position must you keep?", "What happens on the 30 minute drive?", "Who do you tell?"],
        expected: [
          "Green carry chair: he stays upright and doesn't walk (general teaching)",
          "Sitting up the whole way; stretcher head raised before he goes on it",
          "High-flow oxygen (enough for the trip), vital signs every 3 to 5 minutes, GTN only as directed and within limits, consult if outside",
          "Provide prompt transport and notify the receiving facility (CPP-001-AO)"
        ],
        teaching: ["Posture is treatment: don't lose it during the move", "Check the oxygen supply for a 30 minute trip"],
        teachingNote: "Lifting and positioning are general teaching, from the scenario.",
        realJob: "Plan the move before you start: chair, steps, stretcher head up, oxygen bottle swapped.",
        decisions: [{ q: "On the drive, the BP drops to 98/60. What now?", options: ["Give the next GTN as planned", "No more GTN; consult the EOC Clinician, as the SBP is outside the limit", "Lie him flat to raise his BP"], answer: 1,
          why: "CPP-001-AO: repeat GTN only if vital signs remain within the limits (SBP > 100). Consult EOC Clinician any time the vital signs fall outside them." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["Identify", "\"This is Kevin, 72.\""],
        ["Situation", "\"Likely acute cardiogenic pulmonary oedema.\""],
        ["Background", "\"Heart failure, AF, MI 4 years ago, high blood pressure. Woke at 0215 breathless, unable to lie flat, pink frothy sputum. Salty meal last night.\""],
        ["Assessment", "\"On arrival SpO2 82% on air, RR 32, HR 118 irregular, BP 156/92, crackles both sides. Now SpO2 94%, RR 22, HR 102, BP 128/82. Improving.\""],
        ["Recommendation", "\"Sat up, high-flow oxygen by non-rebreather, GTN 400 microg spray sublingually at 0311 and 0317 on EOC Clinician advice. No PDE-5 inhibitors. No allergies. Needs ongoing treatment and monitoring.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Give the handover out loud.", "What matters most for the team taking over?", "Why say the PDE-5 answer?"],
        expected: [
          "Structured and short, with the trend",
          "What you found, what you gave and when, and how he responded",
          "So the team knows GTN is safe to continue with"
        ],
        teaching: ["Give each GTN dose time and the vital signs trend"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "\"Improving on oxygen and two GTN sprays\" tells the team where he's heading.",
        decisions: [{ q: "Which detail must be in Kevin's handover?", options: ["The colour of the house", "Each GTN dose and time, the PDE-5 answer, and the vital signs trend", "How long Joan took to answer the door"], answer: 1,
          why: "The receiving team needs what was given and when, and the safety checks, to plan further treatment." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "What made you think ACPO?",
        "How quickly did he get sat up and on oxygen?",
        "How did you ask the PDE-5 question, and how did it feel?",
        "Did you check all three GTN limits before each dose?",
        "What would have made you stop GTN and consult?",
        "How did you keep him upright during the move?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Posture and oxygen first: sit them up, high-flow oxygen by non-rebreather",
        "Request clinical support early",
        "GTN only on EOC Clinician advice, and only with SBP over 100, HR 60 to 120 and no PDE-5 inhibitor in its window",
        "Vital signs every 3 to 5 minutes; consult any time they fall outside the limits",
        "Prompt transport and notify; keep them upright the whole way"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. PDE-5 inhibitor taken", text: "Kevin quietly admits he took Viagra 18 hours ago. No GTN (sildenafil within 24 hours). Posture, oxygen, clinical support, prompt transport; tell the EOC Clinician." } },
      { box: { title: "2. Low blood pressure from the start", text: "BP 88/60 on arrival. No GTN (SBP 100 or less). Posture, oxygen, clinical support, consult the EOC Clinician, prompt transport. Discuss retrieval options with the EOC Clinician." } },
      { box: { title: "3. BP falls after the first spray", text: "After the first GTN, BP 94/58 and he's drowsier. No more GTN: consult the EOC Clinician straight away (vital signs outside the limits)." } },
      { box: { title: "4. Heart rate 128", text: "Fast AF at 128 on arrival, BP 160/96. GTN isn't within the limits (HR over 120). Posture, oxygen, clinical support, consult, prompt transport." } },
      { box: { title: "5. A long way out", text: "Same patient, 60 to 90 minutes from hospital. Discuss oxygen supply, 3 to 5 minute checks for the whole trip, GTN only as directed and within limits, and retrieval options with the EOC Clinician." } }
    ] }
  ]
};
