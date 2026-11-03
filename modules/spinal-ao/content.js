/* Spinal precautions - AO walk-through scenario (Neil, 67, Tumby Bay). Content only: the layout lives in
   /microlearning/shared/module.js. New on 3 Nov 2026, written by DSY to go with the microlearning module "Walked in, still
   not cleared" (/microlearning/spinal/) and the spinal skills stations (/stations/spinal/). The case is the owner's: a
   ladder fall from gutter height onto decking, about 2 minutes LOC, helped inside to the kitchen table, left hip pain,
   denies neck and back pain, concussed with amnesia; 67 years old. Owner's choices: the protocol's "fall over 1 m / 5
   stairs", a modified towel roll not a collar, SAAS wording only, AOs don't try to clear a C-spine with risk factors.
   Sources, all exported 31.08.2026: CPP-018-AO Spinal Injury v5.0, CPPRO-021 Cervical Spine Immobilisation v1.2 (review
   date Mar 2023 passed), CPP-013-AO Pain Management v7.2, CPP-047-AO Nausea and Vomiting v2.3, CPPRO-001 Patient Mobility
   Assessment v1.1, CPP-004-AO Basic Care and Life Support v4.0, CTL-070 Adult RDR Chart, CTL-042 Major Trauma Tool v1.2,
   CTL-054 ISBAR. The story, observations, timings, the chair-to-stretcher plan, the destination and the EOC Clinician's
   replies are DSY's for the owner to review. */
window.MODULE = {
  flow: true,
  scenario: true,
  draft: false,
  title: "Spinal precautions - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Neil, 67: fell off the ladder, now at the kitchen table, Tumby Bay",
  lead: "A ladder fall for a two-person volunteer AO crew, with seven break points for discussion, skills practice and decisions. Neil was knocked out, walked inside, and only wants to talk about his hip. The key skills: finding the red flags in CPP-018-AO, stopping any more movement, choosing a technique, the modified towel roll, pain relief and ondansetron, and a handover that says why the C-spine isn't cleared. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 70,

  protocol: {
    code: "CPP-018-AO", name: "Spinal Injury - AO", version: "v5.0 (31 July 2020)", exported: "31 August 2026",
    also: [{ code: "CPPRO-021", name: "Cervical Spine Immobilisation", version: "v1.2" },
           { code: "CPP-013-AO", name: "Pain Management - AO", version: "v7.2" },
           { code: "CPP-047-AO", name: "Nausea and Vomiting - AO", version: "v2.3" },
           { code: "CPPRO-001", name: "Patient Mobility Assessment", version: "v1.1" },
           { code: "CTL-070", name: "Adult RDR Chart" }]
  },
  relatedCodes: ["CPP-013-AO", "CPP-047-AO"],
  footerNotes: ["The patient, story, observations, timings, the chair-to-stretcher plan, the destination (Tumby Bay Hospital, then transfer on to Port Lincoln, as the owner chose) and the EOC Clinician's replies are a training scenario written by DSY. Check it with your lead instructor.",
    "CPPRO-021 v1.2 is past its review date (March 2023), and CPPRO-001 v1.1 is past its review date (December 2019). Check the SAAS Clinical app for newer versions.",
    "SAAS has no AO head injury protocol. This scenario uses CPP-018-AO, CPPRO-021, CPP-013-AO and CPP-047-AO."],

  panels: [
    { title: "Overview", blocks: [
      { box: { title: "Learning objectives", items: [
        "Find the CPP-018-AO reasons for spinal precautions in a patient who denies neck pain",
        "Name the self-extrication risk factors, and stop a patient who has already walked from moving any more",
        "Choose a spinal precaution technique, and say why not a semi-rigid collar after a head strike with loss of consciousness (CPPRO-021)",
        "Build a modified towel roll on the stretcher (CPPRO-021)",
        "Plan pain relief (CPP-013-AO) and ondansetron before transport (CPP-047-AO)",
        "Keep checking for signs of spinal cord injury and a falling GCS",
        "Hand over why the C-spine isn't cleared, using ISBAR"
      ] } },
      { box: { title: "Required equipment", items: [
        "Ambulance response bag, Corpuls3 monitor (SpO2, NIBP), BGL monitor, tympanic thermometer, torch, ePCR tablet",
        "Stretcher (head rest removable), two towels, two 500 mL bags of sodium chloride 0.9%, Transpore tape, a combine dressing",
        "A 'Cervical Spine NOT Clear' sticker if you have one; a vacuum mattress if you have one",
        "Training methoxyflurane kit (empty or expired, never opened) and a labelled TRAINING ondansetron pack, or cards",
        "A kitchen chair and table, a blanket"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 40 to 45 minutes; debrief 15 minutes",
        "Tumby Bay Hospital: about 4 minutes from the house (DSY)",
        "Port Lincoln Hospital: about 35 minutes from Tumby Bay. The hospital arranges any transfer on (DSY)",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, manual stabilisation at first, history, red flags, clinical decisions",
        "Driver (AO2): obs and BGL, kit and stretcher, the towel roll, documentation, calls"
      ] } }
    ] },

    { title: "Pre-brief: spinal precautions", blocks: [
      { text: "About 10 minutes. Read this together before the scenario. The module \"Walked in, still not cleared\" and the skills stations have the detail." },
      { box: { title: "Apply a spinal precaution technique if the patient has (CPP-018-AO)", tone: "warn", items: [
        "Musculoskeletal spinal injury: spinal pain, tenderness, neck ache, back pain",
        "OR a mechanism of injury likely to cause a potential spinal injury: consider injury above the chest or a distracting injury",
        "CPPRO-021: suspect a C-spine injury in patients with injuries above the shoulders"
      ] } },
      { box: { title: "Self-extrication risk factors (CPP-018-AO)", items: [
        "Significant distracting injuries; drugs or alcohol; reduced GCS or uncooperative; thoracolumbar spinal pain; new motor or sensory deficits; previous spinal injury or disease; over 65",
        "High-speed collision, rollover or ejection; axial load to the head; a motorised vehicle such as a quad bike; a bicycle collision with an object; a fall from elevation over 1 m or 5 stairs",
        "Any of these: consider an alternate extrication strategy. Not time critical: controlled extrication"
      ] } },
      { box: { title: "Technique (CPP-018-AO, CPPRO-021)", tone: "no", items: [
        "Manual stabilisation of the head; modified towel roll; vacuum mattress; a correctly fitted semi-rigid collar",
        "No semi-rigid collar with a compromised airway, spinal deformity, or concerns about raised intra-cranial pressure",
        "Don't secure the head to the stretcher or a long board. Don't transport on a long board",
        "Paralysis, tingling, weakness, numbness or hypotension: request clinical support, vacuum mattress if available"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "AOs don't try to clear a C-spine when risk factors are present (lead instructor)",
        "A patient with a painful injury elsewhere, or who is concussed, can't reliably tell you their neck is fine",
        "Family often help a patient up and inside. Don't blame them: stop any more movement and explain why"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Saturday in April, 1426. Mild and dry. You and your crew partner are paged from home in Tumby Bay. About 4 minutes to the house." },
      { box: { title: "MDT display", items: [
        "Priority 2, Fall from ladder, 67M",
        "House in Tumby Bay township",
        "Fell from a ladder while cleaning gutters, onto timber decking",
        "Knocked out 'for a couple of minutes' per wife. Now awake and talking",
        "Wife and neighbour have helped him inside. Complaining of left hip pain",
        "Caller: wife (Jan)"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What does the MDT tell you? What worries you?", "What do you already know about his spine before you see him?", "Is this a job for clinical support?", "What will you take in, and who does what at the door?"],
        expected: [
          "A fall from a ladder at gutter height, a head strike with loss of consciousness, aged 67, and he has already been moved inside",
          "The mechanism alone is a reason for spinal precautions: a fall from over 1 m and an injury above the chest (CPP-018-AO, CPPRO-021). Plan for them before you arrive",
          "Consider clinical support for advanced assessment (CPP-018-AO). The EOC Clinician can help decide once you've seen him",
          "Response bag, Corpuls, BGL monitor, towels and two saline bags, tape, combine. AO1 goes straight to Neil to stop him moving; AO2 brings the kit and the stretcher to the door (DSY)"
        ],
        teaching: ["Start thinking about the spine from the MDT. The decision is made by the mechanism, not by how well he looks", "Over 65 and a fall over 1 m are both on CPP-018-AO's risk factor list"],
        realJob: "If you can, ask the EOC to tell the caller: \"Keep him sitting still and don't let him walk any more.\"",
        decisions: [{ q: "Before you see Neil, which CPP-018-AO reasons for spinal precautions do you already know about?", options: [
          "None: you need to examine his neck first",
          "A fall from elevation over 1 m and a head strike (injury above the chest)",
          "Only his age" ], answer: 1,
          why: "CPP-018-AO: apply a spinal precaution technique when the mechanism is likely to cause a potential spinal injury, considering injury above the chest. A fall over 1 m or 5 stairs is on its risk factor list." }]
      } }
    ] },

    { title: "On arrival: the kitchen table", blocks: [
      { text: "1430. Jan meets you at the front door. \"He's in the kitchen. Craig from next door and I got him in. He was out cold on the deck.\" Neil is sitting on a kitchen chair, leaning on the table, holding his left hip. A ladder lies on the decking outside. He looks up. \"Sorry to drag you out. My neck's fine, it's just this hip. What happened? Did I fall?\" A minute later he asks Jan again." },
      { breakpoint: { title: "First minute", type: "Practical skill",
        prompts: ["What do you do first?", "He goes to stand up to shake your hand. What do you say?", "AO1: show manual stabilisation of the head with Neil sitting.", "What do you tell Jan and Craig?"],
        expected: [
          "Scene safe. Introduce yourself, and ask him to stay still before he moves again",
          "\"Please stay sitting, Neil, and keep your head still for me.\" Explain why: the fall and the knock to the head",
          "Hands on both sides of the head, keeping the natural position of the spine. It works sitting (CPPRO-021). Alert patients may be able to hold their own head still, but Neil is confused",
          "Thank them. They couldn't have known. From now on, the crew does the moving (DSY)"
        ],
        teaching: ["CPPRO-001: a suspected spinal injury is a reason not to do a mobility assessment. He doesn't stand up to 'see how he goes'", "CPP-018-AO: someone who has self-extricated stops moving if they get numbness, tingling, weakness, or new or worse spinal pain"],
        realJob: "Get your hands on his head before you open the kit. He's already tried to stand once.",
        cards: [{ q: "Neil is alert but keeps asking what happened. Can you rely on him to keep his own head still?", a: "Not safely. CPPRO-021 says alert, conscious patients may be able to hold their natural alignment without help. Neil is confused, so hold his head until a technique is in place." }]
      } }
    ] },

    { title: "Primary survey, obs and history", blocks: [
      { text: "AO1 holds Neil's head while AO2 takes a full set of obs with Neil sitting at the table." },
      { table: { title: "Set 1, sitting (1438)", table: { head: ["RR", "SpO2", "BP", "Pulse", "Temp", "GCS", "Pain", "BGL"], rows: [["18", "96% (air)", "148/86", "88 regular", "36.6", "14 (E4 V4 M6)", "8/10 hip", "6.2"]] } } },
      { box: { title: "History", items: [
        "From Jan: he was on the ladder, his chest at gutter height. The ladder slid sideways and he fell onto the deck. He landed on his left side and hit the back of his head",
        "He didn't move or answer for about two minutes, then woke up and was 'groggy'",
        "Jan and Craig helped him up and walked him inside, about 10 metres",
        "Neil can't remember the fall or climbing the ladder. He keeps asking what happened",
        "\"My neck's fine. My back's fine. It's this hip.\" Pain 8/10 in the left hip, worse with any movement",
        "Reflux and high cholesterol. Pantoprazole, atorvastatin. Took two ibuprofen for his knees at lunch (about 1230). No blood thinners. No allergies",
        "No previous neck or back problems. Hasn't been drinking"
      ] } },
      { table: { title: "Quick look (DSY)", table: { head: ["", "Finding"], rows: [
        ["Head", "Swelling over the back of the head, right side. No bleeding. Pupils equal and reacting"],
        ["Neck", "Says no pain. You don't rely on that answer"],
        ["Hip", "Very tender over the left hip. He won't move the leg"],
        ["Limbs", "Moves both arms and his right leg. Wiggles the toes on both feet. Feels your touch on all four limbs. No tingling or numbness"]
      ] } } },
      { breakpoint: { title: "Does Neil need spinal precautions?", type: "Decision making",
        prompts: ["Which zones are the obs in? What is his GCS telling you?", "List every reason for spinal precautions you can find.", "He says, clearly, that his neck is fine. Does that change anything?", "Any signs of spinal cord injury?"],
        expected: [
          "RR, SpO2, BP, pulse, temperature white; GCS 14 yellow (CTL-070). Confused and amnesic after a head strike",
          "Fall from elevation over 1 m; head strike (injury above the chest and above the shoulders); a distracting injury (the hip); reduced GCS; over 65",
          "No. The mechanism and the distracting injury are reasons on their own (CPP-018-AO). With a reduced GCS and a painful hip, his answer can't be relied on. AOs don't try to clear a C-spine when risk factors are present",
          "None now: he moves and feels all four limbs, no tingling or numbness, BP not low. Keep checking (CPP-018-AO)"
        ],
        teaching: ["CPP-018-AO lists spinal pain OR a mechanism as reasons. They're separate: one is enough", "Write the GCS as E, V and M. A change in V is often the first sign"],
        realJob: "\"Neil, I'm glad your neck feels okay. Because of how you fell, we're going to look after it anyway.\"",
        decisions: [{ q: "Neil denies neck and back pain. What does CPP-018-AO say?", options: [
          "No spinal pain, so no spinal precautions",
          "Apply a spinal precaution technique: the mechanism (fall, injury above the chest) and his distracting injury are reasons on their own",
          "Ask him to move his neck to check" ], answer: 1,
          why: "CPP-018-AO: apply a spinal precaution technique if the patient has musculoskeletal spinal injury OR a mechanism likely to cause a potential spinal injury (consider injury above the chest or a distracting injury)." }]
      } }
    ] },

    { title: "Choosing a technique", blocks: [
      { text: "1444. Neil is still sitting at the table with AO1 holding his head. AO2 has the stretcher at the kitchen door." },
      { breakpoint: { title: "Collar, towel roll or vacuum mattress?", type: "Decision making",
        prompts: ["What are the options in CPP-018-AO?", "Is a semi-rigid collar suitable for Neil? Why or why not?", "Which technique will you use on the stretcher?", "Count his self-extrication risk factors. How will he get from the chair to the stretcher?"],
        expected: [
          "Manual stabilisation (self splinting), modified towel roll, vacuum mattress, or a correctly fitted semi-rigid collar",
          "No: a head strike with two minutes' loss of consciousness and a GCS of 14 raise concerns about raised intra-cranial pressure, a contraindication (CPPRO-021). And collars come off for transport where possible anyway (CPP-018-AO)",
          "A modified towel roll on the stretcher (CPPRO-021). The vacuum mattress if signs of spinal cord injury appear (CPP-018-AO)",
          "At least four: distracting injury, reduced GCS, over 65, fall over 1 m. Not time critical: a controlled extrication. Keep the head and spine in line, minimal movement, plan it as a team (DSY)"
        ],
        teaching: ["CPPRO-021: a badly applied collar can raise intra-cranial pressure, get in the way of the airway, and cause pain and pressure", "The technique for the move can differ from the technique for transport (CPPRO-021)"],
        realJob: "Say the plan out loud before anyone moves: who holds the head, who calls the moves, where the stretcher goes. Your lead instructor will show the team's method.",
        decisions: [{ q: "Why not a semi-rigid collar for Neil?", options: [
          "Collars are only for children",
          "Concerns about raised intra-cranial pressure after his head strike are a contraindication",
          "He has no neck pain" ], answer: 1,
          why: "CPPRO-021 and CPP-018-AO: a semi-rigid collar is contraindicated with a compromised airway, spinal deformity, or concerns about raised intra-cranial pressure." }]
      } }
    ] },

    { title: "Pain and nausea before the move", blocks: [
      { text: "1448. \"Mate, this hip is killing me. And I feel a bit sick.\" Neil swallows hard. Jan brings his tablets from the kitchen bench." },
      { breakpoint: { title: "What can you give him?", type: "Decision making",
        prompts: ["Go through CPP-013-AO for Neil. What can he have, and what can't he?", "If you're authorised for the ketamine wafer, is Neil eligible? Check the criteria.", "He feels sick and has a head injury. What does CPP-047-AO say?", "When will you give the methoxyflurane?"],
        expected: [
          "Non-pharmacological first: reassurance, keep him still and comfortable. Paracetamol 1000 mg oral (no doses in the past 4 hours). Not ibuprofen: he took ibuprofen at 1230, within the past 6 hours. Methoxyflurane 3 mL, repeated once if needed",
          "No ketamine wafer on the protocol alone: it needs GCS 15 or his normal (he's 14), and over 64 needs a SAAS Medical Officer consult. IN fentanyl, if you're authorised, only on EOC Clinician advice",
          "Ondansetron may be given before transport in head or spine trauma where the risk of complications from vomiting is high. Check the contraindications and precautions: no apomorphine, no prolonged QT, AF or heart failure, no known low potassium or magnesium. Adult 4 mg ODT on the tongue",
          "Just before the move: methoxyflurane can help with brief painful procedures such as extrication (CPP-013-AO)"
        ],
        teaching: ["Check what the patient has already taken. The ibuprofen at lunch rules out another dose", "Record the pain score before and after each treatment (CPP-013-AO)"],
        realJob: "Ask \"What have you taken today, for anything?\" Painkillers for knees and backs are easy to forget.",
        decisions: [{ q: "Neil, 67, GCS 14, pain 8/10. Can an authorised AO give a ketamine wafer without a consult?", options: [
          "Yes: pain is 7 to 10",
          "No: it needs GCS 15 or his normal GCS, and over 64 needs a SAAS Medical Officer consult",
          "Yes, if he has had paracetamol first" ], answer: 1,
          why: "CPP-013-AO: a ketamine wafer may be considered with pain 7 to 10, GCS 15 or normal GCS, and age 16 to 64. Consult a SAAS Medical Officer if over 64." }],
        cards: [{ q: "Neil took two ibuprofen at 1230. It's 1448. Can you give ibuprofen?", a: "No. CPP-013-AO: only if no ibuprofen or other NSAIDs in the past 6 hours." }]
      } },
      { text: "1452. Ondansetron 4 mg ODT given. Paracetamol 1000 mg given. Methoxyflurane started. Pain 8/10 before.", muted: true }
    ] },

    { title: "The move and the towel roll", blocks: [
      { text: "1458. Neil's pain is 5/10 on the methoxyflurane. The stretcher is lowered beside his chair, head rest off, towels laid across the top. Craig is ready to help where the crew asks." },
      { box: { title: "Modified towel roll (CPPRO-021)", tiles: true, steps: [
        { t: "Set up", text: "Head rest off the stretcher. Two towels, folded lengthways, across where his head will rest." },
        { t: "Under the head", text: "If the towels need to go under the head: hold it, lift about 2 cm, slide them in tight, head to toe." },
        { t: "Big rolls", text: "Hold the head. Roll a 500 mL saline bag into the top towel on each side, bag on its narrow edge." },
        { t: "Small rolls", text: "Roll the bottom towel tight on each side to support the big rolls. Firm against head and shoulders." },
        { t: "Tape", text: "One length of Transpore across the forehead, roll to roll, over a combine. Never to the stretcher." },
        { t: "Sticker", text: "'Cervical Spine NOT Clear' on him somewhere obvious, not on his skin." }
      ] } },
      { breakpoint: { title: "Package him", type: "Practical skill",
        prompts: ["Run the move: who holds the head, who calls it, where does Craig help?", "AO2: build the towel roll step by step.", "Check his arms and legs again once he's lying down.", "What goes on the PCR?"],
        expected: [
          "AO1 keeps the head in line and calls each move. Minimal movement onto the stretcher. Craig helps only where the crew asks (DSY)",
          "Head rest off; towels; saline bags rolled in, narrow edge; small rolls; tape across the forehead over a combine, not to the stretcher; head not strapped down",
          "Moves and feels all four limbs, no tingling or numbness. Repeat the obs",
          "Your spinal immobilisation decisions and the technique (CPP-018-AO), the risk factors, the medicines with times and pain scores"
        ],
        teaching: ["CPPRO-021: aim for neutral alignment of the whole spine and no movement. About 2 cm of padding under the head may help in healthy adults", "You may need to unroll the towels for a lateral transfer at hospital (CPPRO-021)"],
        realJob: "Count the move out loud on AO1's call. Everyone moves together or nobody moves.",
        decisions: [{ q: "Where does the tape go in a modified towel roll?", options: [
          "Across the forehead and down to the stretcher frame",
          "Across the forehead from roll to roll, over a combine dressing, never fixed to the stretcher",
          "Under the chin" ], answer: 1,
          why: "CPPRO-021: a single length of Transpore across the forehead from roll to roll, a combine underneath, not fixed to the stretcher. The head is not strapped down. CPP-018-AO: don't secure the head to the stretcher." }]
      } }
    ] },

    { title: "The call and the trip", blocks: [
      { text: "1506. AO2 calls the EOC Clinician from the ambulance." },
      { box: { title: "EOC Clinician (DSY)", items: [
        "\"Thanks. Take him to Tumby Bay Hospital for assessment. With the loss of consciousness and the hip, they'll likely arrange a transfer on to Port Lincoln. Notify the hospital on your way.\"",
        "\"Call me back if his GCS drops, he vomits, or he gets any new numbness, tingling or weakness.\""
      ] } },
      { table: { title: "Obs", table: { head: ["", "1438 sitting", "1504 on the stretcher", "1512 at the hospital"], rows: [
        ["RR", "18", "16", "18"], ["SpO2", "96%", "97%", "96%"], ["BP", "148/86", "142/84", "146/88"], ["Pulse", "88", "80", "84"],
        ["GCS", "14 (V4)", "14 (V4)", "14 (V4)"], ["Pain", "8/10", "4/10", "4/10"], ["Limbs", "Normal", "Normal", "Normal"]
      ] } } },
      { breakpoint: { title: "To Tumby Bay Hospital", type: "Discussion",
        prompts: ["What are you watching for?", "What would make you call the EOC Clinician again?", "He says he feels sick again. What are your options?", "What will you tell the hospital when you notify them?"],
        expected: [
          "GCS (especially V and E), pupils, obs every 15 minutes or more often, any numbness, tingling, weakness, or a falling BP",
          "Any new limb signs or low BP: possible spinal cord injury, request clinical support and use the vacuum mattress (CPP-018-AO). A GCS of 13 or less is Major Trauma Tool Level 1 (CTL-042). Vomiting",
          "Still vomiting, or more than one precaution: consult the EOC Clinician, who may advise a second ondansetron 4 mg ODT for an adult (CPP-047-AO)",
          "Notify the receiving facility (CPP-018-AO): a short ISBAR with the mechanism, the LOC, that he walked in, why the C-spine isn't cleared, and your ETA"
        ],
        teaching: ["Hand over the trend, not just the last set", "Tumby Bay Hospital assesses him first. If he goes on to Port Lincoln, the hospital arranges it and the C-spine stays protected for that trip too (DSY)"],
        realJob: "It's a short trip, but keep talking to him. A confused patient may try to lift his head to look around. Remind him gently each time.",
        cards: [{ q: "If Neil's GCS falls to 13, what does the Major Trauma Tool say?", a: "GCS 13 or less is a Level 1 physiological criterion at any time (CTL-042). Tell the EOC Clinician straight away." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { text: "1512. Tumby Bay Hospital. The nurse in charge meets you in the emergency room; the doctor on call is on the way." },
      { table: { title: "ISBAR (CTL-054)", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Officer from Tumby Bay. This is Neil Haddon, 67.\""],
        ["S", "\"Fell from a ladder, chest at gutter height, onto decking at about 1415. Hit the back of his head, knocked out about two minutes. His family walked him inside. Left hip pain 8/10. Denies neck and back pain, but the C-spine isn't cleared.\""],
        ["B", "\"Reflux and cholesterol: pantoprazole, atorvastatin. Ibuprofen at 1230. No blood thinners, no allergies, no previous spinal problems.\""],
        ["A", "\"GCS 14 throughout, V4: confused, can't remember the fall. Pupils equal. Obs otherwise white: BP 146/88, pulse 84. Moves and feels all four limbs. Ondansetron 4 mg, paracetamol 1 g, methoxyflurane from 1452: pain now 4/10.\""],
        ["R", "\"Modified towel roll, no collar because of the head injury. Sticker on. He needs his head and hip assessed, and he may need transfer on to Port Lincoln.\""]
      ] } } },
      { breakpoint: { title: "Hand over the spine", type: "Practical skill",
        prompts: ["Deliver your ISBAR now. Go.", "Did you say why the C-spine isn't cleared?", "Did you say what he's had, and when?"],
        expected: ["The mechanism, the LOC and that he walked in, first", "The red flags: fall over 1 m, head strike, distracting injury, reduced GCS, over 65", "Ondansetron, paracetamol and methoxyflurane with times; the ibuprofen at lunch; pain scores before and after"],
        teaching: ["The 'Cervical Spine NOT Clear' sticker tells everyone who handles him after you (CPPRO-021)", "Say why you chose the towel roll and not a collar"],
        realJob: "\"He walked in\" is the part people forget to say. Say it, and say why you still don't trust his neck.",
        decisions: [{ q: "Which handover detail stops the next team from 'clearing' his neck because he says it's fine?", options: [
          "His pain score",
          "The red flags: fall over 1 m, head strike with LOC, distracting hip injury, reduced GCS, over 65",
          "His wife's name" ], answer: 1,
          why: "These are the CPP-018-AO reasons for spinal precautions and the self-extrication risk factors. They don't go away because the patient denies neck pain." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "When did you first decide Neil needed spinal precautions: from the MDT, at the door, or after the obs?",
        "How did you stop him moving? What did you say to Jan and Craig?",
        "Which reasons for spinal precautions did you find? Which self-extrication risk factors?",
        "Why a towel roll and not a collar?",
        "How did you plan the move from the chair? What would you change?",
        "What did you give for pain and nausea, and what did you rule out, and why?",
        "Did your handover say why the C-spine isn't cleared?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Spinal pain OR the mechanism: either one is enough for spinal precautions (CPP-018-AO)",
        "\"My neck's fine\" from a concussed patient with a painful hip can't be relied on. AOs don't clear a C-spine with risk factors present",
        "Already walked? Stop any more movement. No mobility assessment with a suspected spinal injury (CPPRO-001)",
        "Concerns about raised intra-cranial pressure: no semi-rigid collar. Towel roll, never taped to the stretcher, no long board",
        "Check what he's already taken. Ketamine needs GCS 15 or normal and a consult over 64",
        "Ondansetron before transport in head or spine trauma where vomiting would be risky (CPP-047-AO)"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. Tingling in both hands", text: "On the stretcher Neil says his hands are 'buzzing' and his grip is weaker. Evidence of spinal cord injury: request clinical support and package him in a vacuum mattress for transport, if available (CPP-018-AO). Tell the EOC Clinician straight away." } },
      { box: { title: "2. He vomits in the towel roll", text: "Neil vomits suddenly en route. Keep the head and spine in line while you clear the airway. Consult the EOC Clinician: they may advise a second ondansetron 4 mg ODT (CPP-047-AO). Discuss with your lead instructor how your team turns a patient in a towel roll (DSY)." } },
      { box: { title: "3. A collar is already on", text: "A first responder has put a semi-rigid collar on before you arrive. With concerns about raised intra-cranial pressure it is contraindicated, and CPP-018-AO says remove semi-rigid collars for transport where possible and replace them with another technique. Hold manual stabilisation while you swap to the towel roll." } },
      { box: { title: "4. GCS falls to 12", text: "At 1508, on the way, Neil is harder to rouse: opens his eyes to voice, GCS 12. Major Trauma Tool Level 1 (GCS 13 or less, CTL-042). Call the EOC Clinician now. Watch the airway. A semi-rigid collar is still contraindicated." } },
      { box: { title: "5. He refuses to lie down", text: "Neil insists he's fine and wants to stay at the table. Explain the risk plainly, involve Jan, keep manual stabilisation, and consult the EOC Clinician (DSY)." } }
    ] }
  ]
};
