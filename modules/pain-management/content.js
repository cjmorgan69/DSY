/* Pain Management - AO walk-through scenario (Gary, 58, Cummins). Content only: the layout lives in
   /microlearning/shared/module.js. Rebuilt on 16 Oct 2026 from the older standalone scenario at this address.
   Clinical actions follow SAAS CPP-013-AO Pain Management - AO v7.2 (3 December 2025, exported 31.08.2026), with
   CTL-097 Sedation Score and CPPRO-013 Intranasal Medication Administration (review date March 2021, now passed) for
   the fentanyl variation, and CPP-011-AO Narcotic Overdose - AO. The owner chose: ibuprofen withheld and raised with
   the EOC Clinician (any ambiguity about safe use); sublingual ketamine as the main escalation, IN fentanyl as a
   variation. Penthrox device steps, splinting and neurovascular checks are general teaching, not CPP-013-AO. The story,
   scene, observations, crew roles, timings and EOC Clinician replies are written by DSY for training. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Pain Management - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Gary, 58: fell from a shed roof onto concrete at dusk, Cummins",
  lead: "A suspected lower leg fracture on a cold farm evening, with eight break points for discussion, skills practice and decisions: multimodal analgesia, splinting, and a sublingual ketamine wafer on EOC Clinician advice. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 70,

  protocol: {
    code: "CPP-013-AO", name: "Pain Management - AO", version: "v7.2 (3 December 2025)", exported: "31 August 2026",
    also: [{ code: "CTL-097", name: "Sedation Score", version: "v1.0 (28 March 2023)" },
           { code: "CPPRO-013", name: "Intranasal Medication Administration", version: "v2.0 (review date March 2021)" }]
  },
  footerNotes: ["This is DSY's training scenario: the patient, story, observations, timings and EOC Clinician replies are fictional. Check it with your lead instructor.",
    "Sublingual ketamine, IN fentanyl and ibuprofen are only for AOs with the specific SAAS authority or training. CPPRO-013 is past its review date (March 2021): check the SAAS Clinical app."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 58 year old farmer has fallen about 2 metres from his shed roof onto concrete while fixing a loose sheet of iron. His left lower leg is swollen and angulated. It's a winter evening, 8 degrees and getting dark. The nearest country hospital is about 30 minutes away; paramedic backup is about 50 minutes; MedSTAR about 90 minutes." },
      { box: { title: "Learning objectives", items: [
        "Assess pain with a self-report scale before and after every treatment, and watch the trend",
        "Start non-drug measures early: reassurance, warmth, splinting and posture",
        "Give multimodal analgesia within the protocol: paracetamol, methoxyflurane, and ibuprofen only when it is clearly safe",
        "Withhold ibuprofen when there is any doubt about its safe use, and say why",
        "Recognise uncontrolled pain and consult the EOC Clinician early about a sublingual ketamine wafer",
        "Splint the limb with neurovascular checks before and after",
        "Plan a safe lift and transport, and deliver an ISBAR handover"
      ] } },
      { box: { title: "Required equipment", items: [
        "Corpuls3 (SpO2, HR, NIBP, temperature), response bag, BGL meter, pen torch",
        "Paracetamol 500 mg tablets, Penthrox kit (3 mL), water",
        "Ketamine 25 mg wafers (authorised crews), ibuprofen 400 mg (trained crews)",
        "Box splint, padding, bandages or straps, blankets, carry sheet, stretcher",
        "Head torches and the ambulance lights, PPE, ePCR tablet"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 45 to 55 minutes; debrief 10 to 15 minutes",
        "Nearest country hospital: about 30 minutes",
        "Paramedic backup: about 50 minutes; MedSTAR: about 90 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, history, pain scores, medicines, splinting, decisions",
        "Driver (AO2): Corpuls3 and observations, equipment, the EOC Clinician call, lighting, lifting plan, documentation"
      ] } }
    ] },

    { title: "Pre-brief: the AO pain protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { steps: [
        { t: "Basic care and life support", text: "Baseline vital signs. Pain score before and after treatment. Non-drug measures. Reassess regularly." },
        { t: "Paracetamol", text: "If none in the past 4 hours: adults 1000 mg oral. Under 16: consult the EOC Clinician for the dose." },
        { t: "Ibuprofen (trained crews)", text: "If no ibuprofen or other NSAIDs in the past 6 hours: adults 400 mg oral. Check the monograph contraindications. Any ambiguity about safe use: withhold." },
        { t: "Methoxyflurane", text: "3 mL, repeated once if needed. Never more than 2 doses in 24 hours, or 15 mL a week." },
        { t: "Ketamine wafer (authorised crews)", text: "Pain 7 to 10, GCS 15 or normal, aged 16 to 64: 25 mg sublingual, reassess, may repeat once after 15 minutes. Early EOC Clinician consult. Not in psychiatric presentations." },
        { t: "IN fentanyl (authorised crews)", text: "Consult the EOC Clinician. Sedation score under 2 and uncontrolled or severe pain; adults SBP 100 or more." },
        { t: "Provide transport and notify the receiving facility" }
      ] },
      { box: { title: "Ketamine: consult first (CPP-013-AO)", tone: "warn", items: [
        "SAAS Medical Officer if the patient is under 16 or over 64, or has a history of severe mental health disorder",
        "The EOC Clinician to give more than 50 mg (2 wafers)"
      ] } },
      { box: { title: "Principle (CPP-013-AO)", items: [
        "Pain management is a fundamental human right: start it as soon as clinically appropriate",
        "The aim is a comfortable or tolerable level, not complete relief",
        "Methoxyflurane's quick onset suits brief painful procedures such as splinting or extrication: time it deliberately",
        "Ibuprofen can cause serious harm, especially in pregnancy, chronic kidney disease, heart failure and a past heart attack"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "Penthrox setup and coaching, splinting technique and neurovascular checks come from device and skills training, not CPP-013-AO",
        "A 2 metre fall onto concrete: look for other injuries, not just the obvious one",
        "Cold, dark and a long carry: plan warmth, light and the lift early"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Wednesday in July, 1845. Sunset was 20 minutes ago. You and your crew partner are paged in Cummins." },
      { box: { title: "MDT display", items: [
        "Priority 2, fall from height, suspected leg injury, 58 year old male",
        "Caller: wife (Margaret). Fell about 2 m from the shed roof onto concrete",
        "Left leg injured. Conscious and breathing. In a lot of pain",
        "Farm on Boundary Road, Cummins. Shed 80 m from the house down a gravel track"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What are you thinking on the way out?", "What does the mechanism worry you about?", "What kit do you want in your hands?", "It's cold and dark. How does that change your plan?"],
        expected: [
          "2 m onto concrete: a lower limb fracture is likely; look for spinal, pelvic, other limb and head injuries too",
          "He's been on cold concrete: warmth starts at the door",
          "Pain relief is coming: paracetamol, Penthrox, and the ketamine wafers if you're authorised. Splint and padding",
          "Lights: head torches, and drive as close to the shed as is safe"
        ],
        teaching: ["Plan analgesia before you arrive so it isn't delayed", "Agree who does what before you get out of the vehicle"],
        realJob: "The drive is your only planning time. Use it to agree roles and get the kit you'll need first.",
        decisions: [{ q: "What does CPP-013-AO say about when to start pain management?", options: ["Once the patient is in the ambulance", "As soon as clinically appropriate", "Only after the EOC Clinician agrees"], answer: 1,
          why: "Pain management is a fundamental human right and should be commenced as soon as clinically appropriate (CPP-013-AO)." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "1855. Margaret meets you at the gate and points you down the track. Gary is lying on the concrete apron beside the shed, a blanket over his chest. A ladder leans against the wall and a loose sheet of iron flaps on the roof. One shed light. Gary is calling out to Margaret." },
      { breakpoint: { title: "Scene and first impression", type: "Discussion",
        prompts: ["What do you see from five metres away?", "Is the scene safe?", "What's your first impression?", "What do you do first?"],
        expected: [
          "Hazards: the ladder and the loose iron overhead. Move the ladder, stay clear of the roof edge, set up lighting",
          "He's talking and alert: airway and breathing look OK for now",
          "In severe pain on cold concrete, down for at least 15 to 20 minutes",
          "Basic care and a primary survey, then a pain score"
        ],
        teaching: ["Look up and around before you kneel down", "A first impression gives you a working picture: alert, breathing, in pain, not bleeding"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "Farm jobs come with ladders, iron and machinery. Two seconds of looking up keeps you safe."
      } }
    ] },

    { title: "Patient contact and assessment", blocks: [
      { text: "Gary is distressed and gripping the blanket. \"Mate, my leg's killing me. I think it's broken.\"" },
      { box: { title: "Primary survey and history", items: [
        "Airway clear, talking in full sentences. RR 20, no distress. Radial pulse present, skin pale and cool. No bleeding",
        "GCS 15. No head strike, no loss of consciousness. Landed on his feet, then fell onto his left side",
        "Left lower leg: swollen and angulated mid-shaft, no wound. Foot pulse present, warm, can feel and wiggle his toes. Graze to left palm",
        "Allergies: none. Medicines: perindopril 4 mg daily for blood pressure; paracetamol now and then for arthritis, none for more than 24 hours",
        "History: high blood pressure, mild osteoarthritis. Ate at 1730"
      ] } },
      { table: { title: "Observations (1900)", table: { head: ["Pain (NRS)", "GCS", "HR", "BP", "RR", "SpO2", "Temp", "BGL"], rows: [["8/10", "15", "98", "148/92", "20", "98% (air)", "36.4", "6.2"]] } } },
      { breakpoint: { title: "Observations and the pain score", type: "Practical skill",
        prompts: ["What is each crew member doing right now?", "How do you ask for a pain score?", "What do HR 98 and BP 148/92 mean here?", "Why check his foot now?"],
        expected: [
          "Clinician: primary survey, history, pain score. Driver: Corpuls3 (cuff on the uninjured side), obs, blankets",
          "Self-report: \"zero is no pain, ten is the worst you can imagine\". Gary says 8. CPP-013-AO: self-report scales are the most reliable for patients who can communicate",
          "Likely pain and stress; watch the trend after treatment",
          "Circulation, sensation and movement now give you a baseline for after splinting"
        ],
        teaching: ["The first set of obs is your baseline: everything after is a trend", "Pain scores before and after every treatment (CPP-013-AO)"],
        realJob: "A full set of numbers early gives you something to compare against if he gets worse on the move.",
        decisions: [{ q: "Gary can talk. Which pain assessment does CPP-013-AO prefer?", options: ["A behavioural tool such as PAINAD", "A self-reporting scale such as the Numerical Rating Scale", "Watching his facial expression only"], answer: 1,
          why: "In patients who can communicate, self-reporting scales should be used as they are the most reliable and accurate indicator of pain (CPP-013-AO)." }],
        cards: [{ q: "What does CPP-013-AO say about trends in pain scores?", a: "Individual scores guide treatment, but trends are crucial in recognising whether interventions are working." }]
      } }
    ] },

    { title: "Clinical decision point: which analgesia?", blocks: [
      { text: "Working diagnosis: suspected closed fracture of the left tibia and fibula, isolated, pain 8/10. Haemodynamically stable." },
      { box: { title: "Multimodal plan", items: [
        "Non-drug measures now: reassurance, a blanket under and over him, support the leg in the position found, explain each step",
        "Paracetamol 1000 mg oral: none in the past 4 hours, swallowing safely",
        "Methoxyflurane 3 mL: for now and for the splinting",
        "Ibuprofen: see below"
      ] } },
      { box: { title: "Why the crew withholds ibuprofen", tone: "warn", items: [
        "CPP-013-AO says ibuprofen can cause serious harm to some patients, sends you to the drug monograph for contraindications, and says to withhold it if there is any ambiguity about its safe use",
        "Gary takes perindopril for his blood pressure, and his kidney and heart history isn't clear on a dark farm",
        "So the crew doesn't give it, and mentions it when they consult the EOC Clinician. The hospital can decide once it has the full picture"
      ] } },
      { breakpoint: { title: "Choosing the analgesia", type: "Decision making",
        prompts: ["What's your working diagnosis and protocol?", "Which medicines are options, and what do you check first?", "Ibuprofen: yes or no for Gary? Why?", "What order, and why give paracetamol early?"],
        expected: [
          "Suspected closed tib/fib fracture; CPP-013-AO; pain 8/10",
          "Paracetamol (none in 4 hours), methoxyflurane (fewer than 2 doses in 24 hours and under 15 mL this week), ibuprofen (no NSAIDs in 6 hours, monograph contraindications). Check allergies",
          "Withhold ibuprofen: he's on a blood pressure medicine and you can't confirm it's safe, so any ambiguity means withhold (CPP-013-AO). Mention it to the EOC Clinician",
          "Non-drug measures first and throughout; paracetamol early because it takes time; Penthrox for the splinting"
        ],
        teaching: ["Multimodal: complementary medicines with different mechanisms and routes work better and more safely (CPP-013-AO)", "Withholding a medicine when you're unsure is good practice, not a failure"],
        realJob: "Say the check out loud: \"Any Panadol today? Any Nurofen or other anti-inflammatories?\" Patients often don't count them as medicines.",
        decisions: [
          { q: "Gary takes perindopril for blood pressure and you can't confirm ibuprofen is safe. What does the protocol say?", options: [
            "Give 400 mg: he's an adult with severe pain",
            "Withhold it: any ambiguity about safe use means the medication must be withheld",
            "Give 200 mg instead" ], answer: 1,
            why: "CPP-013-AO: while ibuprofen is generally well tolerated it can cause serious harm to some patients. If there is any ambiguity around its safe use the medication must be withheld." },
          { q: "Gary last took paracetamol more than 24 hours ago. Can you give it?", options: ["Yes, 1000 mg oral", "No, he takes it for arthritis", "Only after consulting"], answer: 0,
            why: "Paracetamol: if no doses in the past 4 hours, adults oral 1000 mg (CPP-013-AO)." }]
      } }
    ] },

    { title: "Treatment: Penthrox and the splint", blocks: [
      { text: "1905: paracetamol 1000 mg given with water. 1907: Penthrox started. 1915: leg splinted.", muted: true },
      { box: { title: "Penthrox: set up and coach (device training)", tiles: true, steps: [
        { t: "Check", text: "Medication checks, allergies, how much methoxyflurane in the past 24 hours and this week." },
        { t: "Fill", text: "Pour the 3 mL bottle into the base of the inhaler and attach the activated carbon chamber." },
        { t: "Hand it over", text: "The patient holds it and breathes in and out through the mouthpiece. Never hold it for them." },
        { t: "Coach", text: "Start with the diluter hole open. Covering it increases the concentration (SAAS app)." },
        { t: "Watch and score", text: "Conscious state, breathing, SpO2, and the pain score. Time the splinting while it's working." }
      ] } },
      { box: { title: "Splinting (skills training)", items: [
        "Check circulation, sensation and movement in the foot before splinting",
        "Pad well, splint in the position found, and include the joints above and below",
        "Secure firmly but not tight, then recheck the foot. Any change: loosen and reapply",
        "Splinting is itself pain relief: CPP-013-AO lists it with the simple measures"
      ] } },
      { breakpoint: { title: "Medicines and the splint", type: "Practical skill",
        prompts: ["Show us the Penthrox setup and coaching.", "When do you splint, and why then?", "What do you check before and after the splint?", "How much Penthrox can Gary have?"],
        expected: [
          "Correct setup with the carbon chamber; the patient holds it; diluter hole open to start",
          "After a few minutes of Penthrox, so it's working during the painful part (CPP-013-AO: time it deliberately)",
          "Foot pulse, sensation, colour, capillary refill, movement: before and after",
          "3 mL, repeated once if needed; never more than 2 doses in 24 hours or 15 mL a week"
        ],
        teaching: ["Methoxyflurane's rapid onset and short duration suit brief painful procedures such as splinting (CPP-013-AO)", "Record times: the hospital needs them"],
        realJob: "Practise the Penthrox setup until you can do it in the dark with cold hands.",
        decisions: [{ q: "What is the methoxyflurane limit?", options: ["3 mL once only", "3 mL, repeated once; max 2 doses in 24 hours or 15 mL a week", "As much as needed"], answer: 1,
          why: "Methoxyflurane 3 mL, repeated once prn; total max doses: 2 in 24 hrs, 15 mL per week (CPP-013-AO)." }],
        cards: [{ q: "Who holds the Penthrox inhaler?", a: "The patient. It needs the ability to self-administer (SAAS Clinical app). Never hold or tape it for them." }]
      } }
    ] },

    { title: "Reassessment and the EOC Clinician", blocks: [
      { table: { title: "Observations", table: { head: ["", "1900", "1920", "1925 (rolled)"], rows: [
        ["Pain (NRS)", "8/10", "4/10 at rest", "8/10 on movement"],
        ["GCS", "15", "15", "15"], ["HR", "98", "88", "104"], ["BP", "148/92", "140/88", "152/94"],
        ["RR", "20", "16", "22"], ["SpO2", "98% (air)", "98% (air)", "98% (air)"], ["Temp", "36.4", "36.2", "36.2"]
      ] } } },
      { text: "1925. At rest Gary's pain is down to 4/10. When you start to roll him onto the carry sheet, it shoots to 8/10 and he shouts at you to stop. The first Penthrox is nearly used up and there's an 80 metre carry ahead." },
      { box: { title: "The EOC Clinician call (story)", items: [
        "Driver: \"58 year old, isolated closed tib/fib fracture after a 2 m fall. GCS 15, no head strike. HR 104, BP 152/94, SpO2 98. Pain 8/10 on movement after paracetamol 1 g at 1905 and Penthrox 3 mL from 1907. We've withheld ibuprofen: he's on perindopril and we couldn't confirm it's safe. No psychiatric history. We're authorised for ketamine wafers. Can we give one before the move?\"",
        "EOC Clinician: \"Agree with withholding the ibuprofen. Yes, give a 25 mg ketamine wafer sublingually, reassess, and you can repeat once after 15 minutes if he needs it. Call me back if you need more than that or anything changes.\""
      ] } },
      { breakpoint: { title: "Uncontrolled pain: the ketamine wafer", type: "Decision making",
        prompts: ["Is 4/10 at rest good enough? What changed?", "Does Gary meet the ketamine criteria? Check each one.", "What do you tell the EOC Clinician?", "What could stop you giving ketamine?"],
        expected: [
          "At rest yes, but 8/10 on movement with a long carry ahead: uncontrolled pain for the move",
          "Pain 7 to 10 (8 on movement), GCS 15, aged 58 (16 to 64), no psychiatric presentation: yes",
          "Obs, pain trend, what's been given and when, ibuprofen withheld and why, the question you're asking",
          "Psychiatric presentation (contraindicated); under 16 or over 64, or severe mental health history (SAAS Medical Officer); more than 50 mg (EOC Clinician)"
        ],
        teaching: ["Early EOC Clinician consult about the patient's complaint (CPP-013-AO)", "Plan analgesia before the painful move, not during it"],
        realJob: "A good consult is short: who, what, the numbers, what you've given, and what you want.",
        decisions: [
          { q: "Does Gary meet the CPP-013-AO criteria for a ketamine wafer?", options: [
            "No: his pain is only 4/10 at rest",
            "Yes: pain 8/10 on movement, GCS 15, aged 58, no psychiatric presentation",
            "No: he's had Penthrox" ], answer: 1,
            why: "Sublingual ketamine may be considered if pain score 7 - 10, GCS 15 or normal GCS, and aged 16 - 64. It is contraindicated in psychiatric presentations (CPP-013-AO)." },
          { q: "The first wafer helps but not enough after 15 minutes. What does the protocol allow?", options: ["Repeat it once", "Give three more", "Nothing more"], answer: 0,
            why: "Initial dose 25 mg (1 wafer); reassess and if required after 15 minutes the dose may be repeated once. Consult the EOC Clinician to give more than 50 mg (CPP-013-AO)." }],
        cards: [{ q: "When must you consult a SAAS Medical Officer before a ketamine wafer?", a: "If the patient is under 16 or over 64, or has a history of severe mental health disorder (CPP-013-AO)." }]
      } },
      { text: "1928: ketamine 25 mg wafer under the tongue. 1943: pain 6/10 on gentle movement; second 25 mg wafer as advised. Penthrox second dose ready for the carry.", muted: true }
    ] },

    { title: "Extrication and transport", blocks: [
      { table: { title: "Observations", table: { head: ["", "1925", "1950", "2010 (en route)"], rows: [
        ["Pain (NRS)", "8/10 on movement", "4/10 on movement", "3/10 at rest"],
        ["GCS", "15", "15", "15"], ["HR", "104", "90", "86"], ["BP", "152/94", "142/88", "138/86"],
        ["RR", "22", "16", "14"], ["SpO2", "98% (air)", "98% (air)", "98% (air)"], ["Temp", "36.2", "36.2", "36.3"]
      ] } } },
      { breakpoint: { title: "The lift and the drive", type: "Decision making",
        prompts: ["How do you get him from the concrete to the stretcher?", "How do you manage pain during the move?", "What do you monitor on the way?", "Where are you going, and do you notify?"],
        expected: [
          "Bring the ambulance and stretcher as close as is safe; carry sheet; support the splinted leg; one person calls the lift",
          "Ketamine on board; Penthrox second dose for the carry; tell him what's happening before each step",
          "Pain scores, obs and the foot checks, regularly; keep him warm",
          "Nearest country hospital, about 30 minutes; provide transport and notify the receiving facility (CPP-013-AO)"
        ],
        teaching: ["The move is often the most painful part: plan and medicate before it", "Reassess regularly (CPP-013-AO)"],
        teachingNote: "Lifting technique is general teaching, from the scenario.",
        realJob: "Three minutes planning the lift saves the patient the worst part of his night.",
        decisions: [{ q: "Gary has had two ketamine wafers (50 mg). His pain rises again on the drive. What now?", options: ["Give a third wafer", "Consult the EOC Clinician: more than 50 mg needs their advice", "Nothing can be done"], answer: 1,
          why: "Consult EOC Clinician to administer > 50 mg (2 wafers) (CPP-013-AO). Keep up the non-drug measures." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["Identify", "\"I'm [name], volunteer AO from Cummins. This is Gary, 58.\""],
        ["Situation", "\"Suspected closed left tib/fib fracture after a 2 m fall from a shed roof onto concrete at about 1840.\""],
        ["Background", "\"Landed on his feet, no head strike, GCS 15 throughout. Isolated injury. High blood pressure on perindopril, mild osteoarthritis, no allergies. Ate at 1730.\""],
        ["Assessment", "\"HR 86, BP 138/86, RR 14, SpO2 98% on air, temp 36.3. Pain 8 to 3 out of 10. Splinted; foot pulse, sensation and movement intact before and after.\""],
        ["Recommendation", "\"Paracetamol 1 g oral at 1905. Penthrox 3 mL from 1907 and a second 3 mL for the carry. Ketamine 25 mg sublingual at 1928 and 1943 on EOC Clinician advice. Ibuprofen withheld: he's on perindopril and we couldn't confirm it was safe. Needs imaging, analgesia review and orthopaedics. Margaret is following.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Give the handover out loud.", "Why do the medicine times matter?", "Why mention the ibuprofen you didn't give?"],
        expected: [
          "Structured, under two minutes, with the pain trend and foot checks",
          "The hospital plans the next doses from your times (paracetamol 4 hours, ketamine total)",
          "So the team can decide about anti-inflammatories with his full history in front of them"
        ],
        teaching: ["Include what was found, what was done and when, and what still needs to happen"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "Medicine names, doses and times are the most useful thing you hand over in a pain job.",
        decisions: [{ q: "Which detail helps the hospital most with Gary's next analgesia?", options: ["The colour of his ute", "Each medicine, dose and time, and that ibuprofen was withheld and why", "How long the drive took"], answer: 1,
          why: "The receiving team plans further analgesia from what was given and when. Your withheld ibuprofen is part of that picture." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "How did the pain scores guide your decisions, and when did the trend change?",
        "Which non-drug measures did you use, and when did you start them?",
        "How did you decide about ibuprofen? Would anything have changed your mind?",
        "Did Gary meet every ketamine criterion? Which ones would have stopped you?",
        "How did you split the work, and when did you call the EOC Clinician?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Pain score before and after every treatment; watch the trend",
        "Non-drug measures are the foundation, all the way to handover",
        "Multimodal analgesia: paracetamol early, Penthrox for painful procedures",
        "Any ambiguity about ibuprofen's safe use: withhold it, and say why",
        "Ketamine wafer: pain 7 to 10, GCS 15 or normal, 16 to 64, not psychiatric; 25 mg, repeat once after 15 minutes; consult for more than 50 mg",
        "Plan analgesia before the move, and consult the EOC Clinician early"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. IN fentanyl instead of ketamine", text: "The crew is authorised for IN fentanyl, not ketamine. At 1925: sedation score 0, uncontrolled pain, SBP 152. Consult the EOC Clinician, who may advise IN fentanyl (SAAS Clinical app, adults: up to 180 microg, 0.6 mL of 300 microg/mL, up to 90 microg per nostril, by MAD on a 1 mL luer-lock syringe; total max 400 microg). Vital signs every 5 minutes and the sedation score. Cease all fentanyl and consult if the sedation score reaches 2 or the SBP falls below 100. Practise the MAD steps with water." } },
      { box: { title: "2. Bleeding from the fracture", text: "Fifteen minutes into the drive Gary is pale and sweaty, HR 112, BP 96/64, and the leg is more swollen. Discuss occult haemorrhage, clinical support and the EOC Clinician. If he'd had fentanyl: SBP below 100 means cease it and consult (CPP-013-AO)." } },
      { box: { title: "3. Panadol an hour ago", text: "Gary took two Panadol an hour before you arrived. No paracetamol (within 4 hours). Penthrox, non-drug measures and an earlier EOC Clinician consult. Hand over the time he took it." } },
      { box: { title: "4. Mental health history", text: "Gary has a history of severe mental health disorder. Ketamine needs a SAAS Medical Officer consult (through the EOC Clinician) first; it is contraindicated in a psychiatric presentation. Discuss the alternatives." } },
      { box: { title: "5. A child", text: "A 10 year old off a trampoline with a deformed forearm, pain 7/10. Paracetamol and ibuprofen doses under 16: consult the EOC Clinician. Penthrox with a parent helping. Ketamine under 16: SAAS Medical Officer consult. Fentanyl for children: the EOC Clinician advises the dose." } }
    ] }
  ]
};
