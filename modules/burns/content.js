/* Burns - AO walk-through scenario (Daniel, 42). Content only: the layout lives in /microlearning/shared/module.js.
   Rebuilt on 19 Oct 2026 from the original DSY facial burns scenario and checked against SAAS CPP-006-AO Burns - AO v5.0
   (8 December 2016, no review date shown), CTL-050 and CTL-051 (rule of nines charts) and CPP-013-AO Pain Management -
   AO v7.2 (as checked for the pain module). Owner's choices (19 Oct 2026): facial burns with singed eyebrows are treated
   as a suspected airway burn (airway and urgent transport before finishing cooling, request clinical support);
   paracetamol and methoxyflurane are the main analgesia, ibuprofen added for trained crews, IN fentanyl and ketamine for
   authorised AOs as a variation; the patient is named and the job is set near Port Neill. The story, scene, observations,
   crew roles, timings and EOC Clinician replies are a training scenario written by DSY. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Burns - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Daniel, 42: a diesel flash burn to the face near Port Neill, 1845",
  lead: "A facial burn call for a two-person volunteer AO crew, with seven break points for discussion, skills practice and decisions. The key decision: a suspected airway burn changes the order of everything. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 70,

  protocol: {
    code: "CPP-006-AO", name: "Burns - AO", version: "v5.0 (8 December 2016)", exported: "31 August 2026",
    also: [{ code: "CTL-050", name: "Wallace's Rule of Nines for Calculating BSA in Adults" },
           { code: "CTL-051", name: "Paediatric Rule of Nines" },
           { code: "CPP-013-AO", name: "Pain Management - AO", version: "v7.2" }]
  },
  footerNotes: ["The patient, story, observations, timings and EOC Clinician replies are a training scenario written by DSY. Check it with your lead instructor.",
    "CPP-006-AO v5.0 dates from December 2016 and shows no review date. Check the SAAS Clinical app for any newer version."],

  panels: [
    { title: "Overview", blocks: [
      { box: { title: "Learning objectives", items: [
        "Recognise the signs that raise suspicion of an airway burn (CPP-006-AO) and act on them",
        "Put airway management and urgent transport ahead of burn cooling when an airway burn is suspected",
        "Request clinical support and consult the EOC Clinician early",
        "Cover a facial burn without wrapping it around, and keep the patient warm",
        "Give paracetamol, ibuprofen (trained crews) and methoxyflurane as per CPP-013-AO",
        "Estimate the burn size with the rule of nines (CTL-050)",
        "Monitor the airway in transport and deliver a clear ISBAR handover"
      ] } },
      { box: { title: "Required equipment", items: [
        "Ambulance response bag, Corpuls3 monitor (SpO2, ECG, NIBP, temperature), BGL monitor, ePCR tablet",
        "Cling wrap, simple moist dressings, BurnAID hydrogel dressings (backup only)",
        "Paracetamol 500 mg tablets, ibuprofen (trained crews), methoxyflurane (Penthrox) inhaler and two 3 mL bottles, water",
        "Oxygen and delivery devices, suction, airway adjuncts",
        "Blankets, stretcher, carry chair",
        "PPE: gloves, eye protection"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 40 to 50 minutes; debrief 10 to 15 minutes",
        "Nearest paramedic crew: about 45 minutes, through the EOC",
        "Tumby Bay Hospital: about 25 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, airway assessment, history, medications, clinical decisions",
        "Driver (AO2): scene safety, Corpuls3 and observations, cooling and warmth, documentation, calls to EOC"
      ] } }
    ] },

    { title: "Pre-brief: the AO burns protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario. Confirm everyone can find CPP-006-AO." },
      { box: { title: "Airway burns (CPP-006-AO)", tone: "no", items: [
        "Signs that increase suspicion: facial burns, singed nasal hairs, singed eyelashes or eyebrows, soot around the nose or mouth",
        "Monitor for: hoarseness, difficulty speaking, wheeze, stridor, shortness of breath, altered conscious state",
        "Suspected airway burn: airway management and urgent transport take precedence over burn cooling",
        "Request clinical support, consult the EOC Clinician for advice, provide urgent transport and notify the receiving facility"
      ] } },
      { box: { title: "Thermal burns", items: [
        "Cool the burn area with running water for 20 minutes",
        "No water: BurnAID hydrogel to cover the burn, a maximum of 10 minutes for neonates and 20 minutes for everyone else",
        "Manage the environment so the patient does not become hypothermic",
        "Consider clinical support; consult the EOC Clinician for significant burns"
      ] } },
      { box: { title: "Once cooling is done", items: [
        "Remove any hydrogel. Cover with non-circumferential cling wrap or a simple moist dressing",
        "Continue cooling over the burn cover as needed",
        "Monitor closely for deterioration or signs of airway compromise, and keep the patient warm",
        "Consult the EOC Clinician for significant or chemical burns, or near Adelaide about going straight to a burns unit (RAH adults, WCH children)",
        "Transport and notify the receiving facility"
      ] } },
      { box: { title: "Pain relief (CPP-013-AO)", items: [
        "Paracetamol, if none in the past 4 hours: adults 1000 mg oral",
        "Ibuprofen, for crews who have completed the training, if no NSAIDs in the past 6 hours: adults 400 mg oral. Check the contraindications",
        "Methoxyflurane 3 mL, self-administered, repeated once if needed. No more than 2 doses in 24 hours, or 15 mL in a week",
        "Under 16: consult the EOC Clinician for paracetamol and ibuprofen"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "Airway swelling after a burn can build up over time: a patient who talks normally now may not later",
        "Sitting upright is usually more comfortable for a facial burn and makes the airway easier to watch",
        "When laying cling wrap on the face, keep the nose and mouth completely clear",
        "Ask the patient to talk regularly during transport: a change in the voice is easy to hear"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Thursday in autumn, 1845. Still light, but cooling fast. You and your crew partner are paged from home to a rural block on the edge of Port Neill. About 12 minutes to scene." },
      { box: { title: "MDT display", items: [
        "Priority 2, Burns, 42M",
        "Facial burns from a fire pit: diesel used as an accelerant",
        "Patient conscious and breathing. Friends cooling with a hose for about 10 minutes",
        "Caller: friend on scene",
        "Hazards: fire pit status unknown, diesel on scene",
        "Backup: nearest paramedic crew about 45 minutes, if requested"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What does the MDT tell you? What are the key concerns?", "What hazards are you thinking about?", "Which protocol, and which part of it, might drive this job?", "Who does what when we arrive?"],
        expected: [
          "Facial burns from a flash of burning diesel: think airway burn from the start (CPP-006-AO lists facial burns as a sign)",
          "Hazards: a fire pit that may still be burning and an open fuel container",
          "Cooling has started. If an airway burn is suspected, airway and urgent transport come before finishing it",
          "Clinical support is 45 minutes away: think about requesting it early",
          "Roles agreed: AO1 to the patient and the airway, AO2 to the scene, monitoring and the calls"
        ],
        teaching: ["The MDT already gives you one of the protocol's airway burn signs: facial burns", "Plan the hard decision before you arrive: what will you do if the airway is at risk?"],
        realJob: "The drive is your planning window. Name the protocol, the worst case and your roles before you pull up.",
        decisions: [{ q: "Facial burns from a diesel flash. What do you have in mind on the way?", options: [
          "A simple burn: 20 minutes of cooling, then a dressing",
          "A possible airway burn: assess the airway first, and be ready for urgent transport and early clinical support",
          "Nothing until you see him" ], answer: 1,
          why: "CPP-006-AO lists facial burns as a sign that increases suspicion of an airway burn. If it is suspected, airway management and urgent transport take precedence over cooling." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "1857. A gravel driveway to a backyard. A fire pit smoulders about 8 metres from the house, with a 20 litre diesel drum beside it, cap off. Two friends stand by a garden tap. One is running a hose over the face of a man sitting in a plastic chair. He is upright, eyes closed, clearly in pain. His face is red with early blistering, and his eyebrows and the front of his beard look singed. He is talking to his friends." },
      { breakpoint: { title: "Doorway, first impression", type: "Discussion",
        prompts: ["Is the scene safe to approach?", "What do you see that is reassuring?", "What do you see that worries you?", "What is your immediate priority?"],
        expected: [
          "Scene: keep the open diesel away from the smouldering fire, or have a friend move it once safe",
          "Reassuring: upright, talking, good first aid from his friends",
          "Worrying: facial burns and singed eyebrows. Two of the protocol's airway burn signs",
          "Priority: the airway. Look and listen for the signs, while the cooling continues for now"
        ],
        teaching: ["Singed eyebrows and facial burns are on the protocol's list of signs that increase suspicion of an airway burn", "Acknowledge the bystanders' first aid: it matters, and they can keep helping"],
        realJob: "The first ten seconds: is the scene safe, is the patient up or down, talking or silent? On a burns job, also look for the fuel and how close he was.",
        decisions: [{ q: "Facial burns and singed eyebrows. What does CPP-006-AO say about these?", options: [
          "Nothing: only stridor matters",
          "They are signs that increase suspicion of an airway burn",
          "They only matter in children" ], answer: 1,
          why: "Signs increasing suspicion of airway burn include facial burns, singed nasal hairs or eyelashes/brows, and/or soot around the nose or mouth (CPP-006-AO)." }]
      } }
    ] },

    { title: "Patient contact and primary survey", blocks: [
      { text: "Daniel Hartley, 42. \"I was pouring diesel on the fire and it just went whoosh. I turned away but it got my face.\" His friends started the hose straight away: about 15 minutes of cooling by the time you reach him. AO2 gets the Corpuls3 on." },
      { table: { title: "Initial observations (1859)", table: { head: ["GCS", "HR", "BP", "RR", "SpO2", "Temp", "BGL", "Pain", "ECG"], rows: [["15", "108", "148/92", "20", "97% (air)", "36.3", "6.4", "8/10", "Sinus tachycardia"]] } } },
      { box: { title: "History", items: [
        "Flash burn from igniting diesel at about 1840; brief exposure, he turned away",
        "No past medical history, no regular medicines, no allergies",
        "No paracetamol or anti-inflammatories today",
        "Last ate at lunchtime"
      ] } },
      { breakpoint: { title: "Primary survey and observations", type: "Practical skill",
        prompts: ["AO1: talk through your primary survey.", "AO2: what are you connecting, and why?", "What do the observations tell you?", "Why does the temperature matter on this job?"],
        expected: [
          "Airway patent, voice clear, no stridor or wheeze now; breathing adequate; tachycardic and hypertensive with pain; GCS 15",
          "Corpuls3 for continuous SpO2, ECG and NIBP, plus temperature",
          "Tachycardia and high BP fit with pain and stress",
          "36.3 after 15 minutes of water on a cool evening: hypothermia is a real risk. The protocol says to manage the environment during cooling"
        ],
        teaching: ["A normal SpO2 and a clear voice now do not rule out an airway burn", "Keep the rest of him warm while the face is cooled: blanket, out of the wind"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "The driver's job here is huge: monitoring, warmth, the scene and the phone. Say it out loud as you do it so your clinician knows what's covered.",
        cards: [{ q: "Name the six things CPP-006-AO says to monitor for in a possible airway burn.", a: "Hoarseness, difficulty speaking, wheeze, stridor, shortness of breath, altered conscious state." }]
      } }
    ] },

    { title: "The airway and the working diagnosis", blocks: [
      { table: { title: "Burn and airway assessment", table: { head: ["", "Finding"], rows: [
        ["Burn", "Forehead, both cheeks, nose and upper lip. Red with early blistering, painful. No other areas burnt"],
        ["Size (CTL-050)", "Part of the head (head 9%): roughly 3%"],
        ["Airway signs", "Facial burns: yes. Singed eyebrows and beard: yes. Singed nasal hairs: no. Soot around nose or mouth: no"],
        ["Monitor for", "Hoarseness, difficulty speaking, wheeze, stridor, shortness of breath, altered conscious state: none at the moment"]
      ] } } },
      { breakpoint: { title: "Is this a suspected airway burn?", type: "Decision making",
        prompts: ["What is your working diagnosis?", "Is this a suspected airway burn under the protocol?", "If it is, what does the protocol put first?", "What happens to the last 5 minutes of cooling?"],
        expected: [
          "A facial flash burn of about 3%, with two of the protocol's airway burn signs (facial burns, singed eyebrows)",
          "Treat it as a suspected airway burn, even though there are no signs of compromise yet",
          "Airway management and urgent transport take precedence over burn cooling",
          "Request clinical support now and consult the EOC Clinician",
          "Do not hold him on scene to finish the 20 minutes. Cover the burn and go. Cooling can continue over the burn cover as needed"
        ],
        teaching: ["The protocol lists the signs that raise suspicion. Once you suspect it, the order changes: airway and urgent transport before cooling", "A small burn size does not settle it: the site and the signs drive the decision"],
        realJob: "This is the decision that shapes the whole job. Say it out loud to your partner: \"Facial burns, singed brows: suspected airway burn. We go.\"",
        decisions: [{ q: "15 minutes of cooling done. Facial burns, singed eyebrows, voice clear, SpO2 97%. What now?", options: [
          "Finish the full 20 minutes on scene, then dress and go",
          "Suspected airway burn: request clinical support, consult the EOC Clinician, cover the burn and transport urgently",
          "Clear voice: no need to rush, cool for another 20 minutes" ], answer: 1,
          why: "Facial burns and singed eyebrows increase suspicion of an airway burn. In a suspected airway burn, airway management and urgent transport take precedence over burn cooling: request clinical support, consult the EOC Clinician, urgent transport and notify (CPP-006-AO)." }]
      } },
      { box: { title: "Clinical decision point", tone: "warn", items: [
        "Suspected airway burn: airway first, urgent transport",
        "Request clinical support and consult the EOC Clinician now",
        "Cover the burn, keep him warm, give analgesia without delaying departure",
        "Monitor the airway continuously"
      ] } }
    ] },

    { title: "Treatment and the EOC call", blocks: [
      { box: { title: "Covering the burn", tiles: true, steps: [
        { t: "Stop the hose", text: "Time to move. Note the total cooling time for the handover." },
        { t: "Cling wrap", text: "Lay sheets over the burnt areas. Never around the head or neck." },
        { t: "Nose and mouth clear", text: "Keep both completely uncovered." },
        { t: "Keep warm", text: "Pat dry around the burn, blanket on, out of the wind." },
        { t: "Cool over the cover", text: "Continue cooling over the cling wrap as needed." }
      ] } },
      { text: "AO2 calls the EOC. The EOC Clinician (story): \"Agree, suspected airway burn. I've requested the paramedic crew and they'll meet you on the way. Go to Tumby Bay Hospital and I'll let them know. Call me straight back if his voice changes.\"" },
      { breakpoint: { title: "Treatment and medication safety", type: "Practical skill",
        prompts: ["Show me how you cover his face. What is the rule?", "What pain relief can you give, and what do you check first?", "Demonstrate setting up the Penthrox and coaching him.", "What do you tell the EOC Clinician?"],
        expected: [
          "Non-circumferential cling wrap (or a simple moist dressing). Nose and mouth clear",
          "Paracetamol 1000 mg oral: none in the past 4 hours",
          "Ibuprofen 400 mg oral if the crew is trained: no NSAIDs in the past 6 hours, contraindications checked",
          "Methoxyflurane 3 mL: he must hold it himself. A second 3 mL if needed; no more than 2 doses in 24 hours",
          "EOC call: age, mechanism, time, burn site and size, airway signs, cooling done, observations, analgesia, and the request for clinical support"
        ],
        teaching: ["Analgesia should not delay departure: start it as you move", "Repeat the EOC Clinician's advice back, and record the time"],
        realJob: "Pain relief is what patients remember. But on this job the clock matters too: give it as you load, not instead of loading.",
        decisions: [{ q: "He had no medicines today. Which pain relief fits CPP-013-AO for an adult?", options: [
          "Paracetamol 1000 mg, ibuprofen 400 mg if your crew is trained, and methoxyflurane 3 mL",
          "Paracetamol 2000 mg and methoxyflurane 6 mL at once",
          "Nothing until the paramedics arrive" ], answer: 0,
          why: "CPP-013-AO: paracetamol 1000 mg if none in 4 hours; ibuprofen 400 mg if no NSAIDs in 6 hours (trained crews); methoxyflurane 3 mL, repeated once if needed, max 2 doses in 24 hours." }]
      } }
    ] },

    { title: "Transport and reassessment", blocks: [
      { text: "1908. Daniel walks to the ambulance with help, wrapped in a blanket, and sits upright on the stretcher. Penthrox in hand. Monitoring on. AO2 drives. The paramedic crew is coming to meet you." },
      { table: { title: "Observations", table: { head: ["", "1859", "1920 (en route)"], rows: [
        ["HR", "108", "94"], ["BP", "148/92", "138/86"], ["RR", "20", "18"], ["SpO2", "97% (air)", "98% (air)"],
        ["Temp", "36.3", "36.1"], ["Pain", "8/10", "5/10"], ["Voice", "Clear", "Clear"]
      ] } } },
      { breakpoint: { title: "Monitoring en route", type: "Decision making",
        prompts: ["Compare the two sets of observations. What has changed?", "What is your airway monitoring plan?", "Temperature 36.1: what do you do?", "If his voice goes hoarse, what changes?"],
        expected: [
          "Pain and heart rate down: the analgesia is working. Airway still clear",
          "Ask him to talk regularly; watch and listen for hoarseness, difficulty speaking, wheeze, stridor, shortness of breath, altered conscious state",
          "Temperature falling: keep him covered, heater on. Cool only the burn, over the cover, if needed",
          "Any airway sign: call the EOC Clinician straight back, basic care and life support, and keep going"
        ],
        teaching: ["Transport is not the time to relax: airway swelling can still develop", "Keep updating the EOC Clinician if anything changes"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "Keep him talking. Ask him to tell you about the fire again, or count to ten. If the voice changes, you'll hear it before the monitor shows anything.",
        cards: [{ q: "After cooling, how is a burn covered under CPP-006-AO?", a: "Non-circumferential cling wrap, or a simple moist dressing. Continue cooling over the cover as needed." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { text: "1935. The paramedic crew met you on the highway and travelled with you. You arrive at Tumby Bay Hospital." },
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Officer from [station]. This is Daniel Hartley, 42.\""],
        ["S", "\"Facial flash burn from igniting diesel at about 1840. We treated it as a suspected airway burn.\""],
        ["B", "\"Forehead, cheeks, nose and upper lip, about 3%, red with early blisters. Singed eyebrows and beard. No nasal hair singeing or soot. About 15 minutes of running water from his friends. No medical history, medicines or allergies.\""],
        ["A", "\"Voice clear throughout, no stridor or wheeze. SpO2 98% on air, HR 94, BP 138/86, RR 18, temp 36.1. Pain 8 down to 5 with paracetamol 1 gram and methoxyflurane.\""],
        ["R", "\"He needs close airway monitoring. EOC Clinician consulted and aware.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Deliver your ISBAR now. Go.", "What is the single most important thing the receiving team must hear?", "Did you give the cooling time and the analgesia times?"],
        expected: ["Lead with the risk: suspected airway burn", "Mechanism and time, burn site and size, airway signs, cooling time, observations trend, analgesia and times, EOC advice", "Structured and short"],
        teaching: ["Lead with the risk. Don't bury the singed eyebrows in the middle", "Give trends, not just the latest numbers"],
        realJob: "If you forget to mention the singed eyebrows, the receiving team may not look at his airway as urgently. Your handover shapes their first decisions.",
        decisions: [{ q: "What should open your handover for Daniel?", options: ["His pain score", "Suspected airway burn: facial burns and singed eyebrows", "The size of the burn"], answer: 1,
          why: "The biggest risk is the airway. CPP-006-AO asks you to monitor closely for airway compromise; make sure the receiving team hears it first." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "When did you first think about an airway burn? What made you decide it was suspected?",
        "How did that change the order of your treatment?",
        "How did you balance the last minutes of cooling against urgent transport?",
        "How did you keep Daniel warm?",
        "Walk through your pain relief: what did you check before each medicine?",
        "When did you request clinical support and consult the EOC Clinician? What did you say?",
        "What would you have done if his voice had changed en route?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Facial burns, singed hairs, soot: suspect an airway burn",
        "Suspected airway burn: airway and urgent transport before cooling. Request clinical support and consult the EOC Clinician",
        "Otherwise, 20 minutes of running water. Hydrogel only when there is no water",
        "Cover without wrapping around. Keep the nose and mouth clear. Keep the patient warm",
        "Paracetamol, ibuprofen (trained crews) and methoxyflurane per CPP-013-AO",
        "Keep listening to the voice all the way to hospital"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. Airway deterioration", text: "Ten minutes into the drive, Daniel's voice goes hoarse and he says his throat feels tight. SpO2 drops to 94%. Basic care and life support, consult the EOC Clinician immediately, urgent transport and notify the receiving facility. Discuss the meeting point with the paramedic crew, and whether the destination still fits." } },
      { box: { title: "2. A child: 8 years old", text: "An 8 year old standing near the fire pit has burns to the face and both hands. Use the paediatric chart (CTL-051): at 8 years the head is 10% and each arm 9%. The same airway signs apply. Consult the EOC Clinician for paracetamol and ibuprofen doses (under 16). Talk to the child and the frightened parent. A burns unit (WCH) is only discussed with the EOC Clinician when you are near Adelaide." } },
      { box: { title: "3. A larger burn and uncontrolled pain", text: "The flash also burns his chest and both forearms. Pain stays 9/10 after paracetamol and two Penthrox doses. Work out the size with CTL-050. Consult the EOC Clinician and request clinical support. If your crew is authorised for IN fentanyl or sublingual ketamine, run through the pain module's criteria (sedation score, systolic BP, age limits) and consult the EOC Clinician first." } },
      { box: { title: "4. No running water", text: "A remote block with an empty tank. Cover the burn with a BurnAID hydrogel dressing: a maximum of 20 minutes for an adult (10 minutes for a neonate). Keep him warm. Remove the hydrogel once cooling is done, then cover with cling wrap. Hydrogel is never used on chemical burns." } }
    ] }
  ]
};
