/* High-speed MVA - AO walk-through scenario (Jason, 34). Content only: the layout lives in /microlearning/shared/module.js.
   New on 27 Oct 2026, written by DSY to go with the microlearning module "Baseline obs at a high-speed MVA"
   (/microlearning/mva-baseline/). The owner approved the outline: a single-vehicle rollover on the Tod Highway near
   Cummins, a patient who climbed out and is walking, hidden internal bleeding, obs that move from white to yellow to red,
   Port Lincoln Hospital with the EOC Clinician arranging retrieval. Owner's guidance: obs at least every 15 minutes and
   more often if concerned (do not quote CPP-063-AO's "two sets in the first hour").
   Sources, all exported 31.08.2026: CPP-063-AO Prolonged Care v1.0, CTL-070 Adult RDR Chart, CTL-042 Major Trauma Tool
   v1.2, CPP-004-AO Basic Care and Life Support v4.0, CPP-018-AO Spinal Injury v5.0, CPP-158-AO Chest Trauma v1.0,
   CPP-042-AO Amputation and Haemorrhage v4.0, CTL-069 Secondary Survey Aide Memoire, CPP-013-AO Pain Management v7.2
   (as checked for the pain module), CTL-054 ISBAR. The story, observations, timings and EOC Clinician replies are DSY's. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "High-speed MVA - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Jason, 34: a rollover on the Tod Highway near Cummins, 1730",
  lead: "A single-vehicle rollover for a two-person volunteer AO crew, with seven break points for discussion, skills practice and decisions. The patient climbed out and says he's fine. The key skill: take a full baseline set of obs, repeat it, and act on the trend. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 75,

  protocol: {
    code: "CPP-063-AO", name: "Prolonged Care - AO", version: "v1.0 (15 January 2026)", exported: "31 August 2026",
    also: [{ code: "CTL-070", name: "Adult RDR Chart" },
           { code: "CTL-042", name: "Major Trauma Tool", version: "v1.2" },
           { code: "CPP-004-AO", name: "Basic Care and Life Support - AO", version: "v4.0" },
           { code: "CPP-018-AO", name: "Spinal Injury - AO", version: "v5.0" },
           { code: "CPP-158-AO", name: "Chest Trauma - AO", version: "v1.0" },
           { code: "CPP-013-AO", name: "Pain Management - AO", version: "v7.2" }]
  },
  relatedCodes: ["CPP-042-AO", "CPP-018-AO", "CPP-158-AO"],
  footerNotes: ["The patient, story, observations, timings and EOC Clinician replies are a training scenario written by DSY. Check it with your lead instructor.",
    "CPP-004-AO v4.0 dates from December 2016 and shows no review date. Check the SAAS Clinical app for newer versions."],

  panels: [
    { title: "Overview", blocks: [
      { box: { title: "Learning objectives", items: [
        "Take a complete baseline set of obs early, and explain why one normal set does not mean a stable patient",
        "Repeat full sets at least every 15 minutes, and more often when concerned or when obs are in a yellow, red or purple zone (CPP-063-AO)",
        "Plot each set on the Adult RDR Chart (CTL-070) and recognise CPP-063-AO's escalation triggers",
        "Check each set against the Major Trauma Tool's Level 1 criteria (CTL-042)",
        "Manage a patient who has self-extricated after a high-speed collision (CPP-018-AO)",
        "Assess the chest and abdomen (CPP-158-AO, CTL-069), keep the patient warm, and give pain relief per CPP-013-AO",
        "Request clinical support and consult the EOC Clinician early, and hand over the trend using ISBAR"
      ] } },
      { box: { title: "Required equipment", items: [
        "Ambulance response bag, Corpuls3 monitor (SpO2, ECG, NIBP, temperature), BGL monitor, ePCR tablet",
        "Manual sphygmomanometer and stethoscope, watch",
        "Adult RDR charts (CTL-070) printed, or the table in the module",
        "Oxygen and delivery devices",
        "Spinal precaution equipment: towel rolls, semi-rigid collar, vacuum mattress; stretcher",
        "Blankets, space blanket, thermal cap",
        "Paracetamol 500 mg tablets, methoxyflurane (Penthrox) inhaler and two 3 mL bottles, water",
        "PPE, high-visibility vests, torches"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 45 to 50 minutes; debrief 15 minutes",
        "Paramedic crew from Port Lincoln: about 40 minutes, through the EOC",
        "Port Lincoln Hospital: about 50 minutes from the scene",
        "EOC Clinician: available by phone. Retrieval is arranged through the EOC"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, primary survey, spinal precautions, history, clinical decisions",
        "Driver (AO2): scene safety, Corpuls3 and every set of obs on the RDR chart, warmth, documentation, calls to the EOC"
      ] } }
    ] },

    { title: "Pre-brief: obs, triggers and trauma", blocks: [
      { text: "About 10 minutes. Read this together before the scenario. The module \"Baseline obs at a high-speed MVA\" has the detail." },
      { box: { title: "Obs (CPP-063-AO, CTL-070)", items: [
        "A complete set: respiratory rate, SpO2 (and any oxygen), blood pressure, pulse rate, temperature, GCS. The RDR chart adds pupils, pain score and BGL",
        "Record the pulse rate, not the ECG heart rate (CTL-070)",
        "Repeat full sets at least every 15 minutes, and more often if you're concerned or as clinically indicated",
        "Obs in a yellow, red or purple zone: take them more often"
      ] } },
      { box: { title: "Escalate care if (CPP-063-AO)", tone: "warn", items: [
        "Zones progress: yellow to red, or red to purple",
        "Any obs in a purple zone",
        "3 or more obs in red or yellow zones"
      ] } },
      { box: { title: "Major Trauma Tool, adult (CTL-042)", tone: "no", items: [
        "Level 1 at any time: GCS 13 or less, systolic BP 100 or less, heart rate under 50 or over 120, resp rate under 10 or over 30, or a Level 1 injury",
        "Level 2 mechanism includes ejection or death of an occupant and extrication of 30 minutes or more. Speed alone is not an adult criterion",
        "Unstable patient: transport or divert to the closest trauma service or nearest ED with early notification"
      ] } },
      { box: { title: "Spine (CPP-018-AO)", items: [
        "Self-extrication needs another strategy if there is a risk factor. A high-speed collision, rollover or ejection is one",
        "Someone who is self-extricating should stop moving if they get numbness, tingling, weakness, or new or worse spinal pain",
        "Techniques: manual stabilisation (self-splinting), modified towel roll, vacuum mattress, or a correctly fitted semi-rigid collar",
        "Do not secure the head to the stretcher or long board, or transport on a long board"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "Oxygen can hold the SpO2 up while other obs get worse. Watch the pulse, breathing, BP, GCS and temperature as well",
        "A patient who walks around after a crash can still be badly hurt: adrenaline and shock hide pain",
        "Say each set out loud as you plot it, so both crew members see the trend"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Tuesday in July, 1730. It's nearly dark, 11 °C, with a cold southerly wind. You and your crew partner are paged from home in Cummins. About 12 minutes to scene." },
      { box: { title: "MDT display", items: [
        "Priority 1, Motor vehicle accident, 34M",
        "Single vehicle rollover, Tod Highway about 9 km south of Cummins",
        "One occupant, out of the vehicle and walking",
        "Caller: passing motorist on scene",
        "Hazards: vehicle on its roof in the table drain, traffic, failing light",
        "Police and CFS notified. Nearest paramedic crew: Port Lincoln, about 40 minutes, if requested"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What does the MDT tell you? What worries you?", "Does the Major Trauma Tool make this Level 1 or Level 2 yet?", "What will you do about the fact he's walking?", "Who does what when you arrive?"],
        expected: [
          "A rollover at highway speed is a big mechanism, even with the patient walking",
          "On the adult tool, speed alone is not a Level 2 criterion. No ejection, no death, no long extrication: so far, the obs and injuries will decide",
          "High-speed collision and rollover are CPP-018-AO risk factors against self-extrication. He is already out, so stop him moving and use a spinal precaution technique",
          "Hazards: traffic, the dark, the vehicle. Hi-vis and lights on; police and CFS are coming",
          "Roles: AO1 to the patient; AO2 to the scene, then the monitor and the first full set of obs"
        ],
        teaching: ["The Major Trauma Tool's physiological criteria apply at any time. Plan to check every set against them", "Think about requesting clinical support early: the paramedics are 40 minutes away"],
        realJob: "The drive is your planning window. Name the worst case (hidden bleeding) and agree who takes the first set of obs.",
        decisions: [{ q: "A high-speed rollover, patient walking. On the ADULT Major Trauma Tool, what does the mechanism alone make him?", options: [
          "Level 1",
          "Level 2",
          "Neither yet: speed and rollover are not adult criteria, so his obs and injuries will decide" ], answer: 2,
          why: "CTL-042 adult Level 2 lists ejection or death of an occupant, prolonged extrication (30 minutes or more) and other mechanisms, but not speed. MVC at 60 km/h or more is only on the children's tool." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "1742. A white ute lies on its roof in the table drain, windscreen shattered, roof crushed on the passenger side. A passing motorist has parked behind it with hazard lights on. A man in work clothes is walking up and down the road verge, holding his left side. \"I'm right, mate. Just get the truck towed.\"" },
      { breakpoint: { title: "Scene and first impression", type: "Discussion",
        prompts: ["Is the scene safe? What do you do about it?", "What do you say to Jason first?", "What is reassuring, and what worries you?", "What is your first priority with him?"],
        expected: [
          "Park to protect the scene, hazard lights, hi-vis. Check for fuel and anything else in or near the vehicle. Keep clear of the traffic",
          "Ask him to stop walking and keep still. Explain why: the speed and the rollover",
          "Reassuring: talking, walking, alert",
          "Worrying: the mechanism, the crushed roof, holding his left side",
          "Priority: stop movement, apply a spinal precaution technique, primary survey, then a complete set of obs"
        ],
        teaching: ["CPP-018-AO: anyone self-extricating should stop moving if they develop numbness, tingling, weakness or new or worse spinal pain", "Talking and walking does not rule out serious injury after a big mechanism"],
        realJob: "\"Mate, stop there for me.\" Getting a walking patient to sit still is the first job, and the hardest.",
        decisions: [{ q: "Jason is walking around after climbing out of a rolled ute. What does CPP-018-AO point you to?", options: [
          "Let him keep walking: he obviously has no spinal injury",
          "A high-speed rollover is a risk factor: stop him moving and apply a spinal precaution technique",
          "Put him on a long board and transport him on it" ], answer: 1,
          why: "CPP-018-AO lists a high-speed motor vehicle collision, rollover or ejection as a risk factor needing an alternative to self-extrication, and says to apply a spinal precaution technique when the mechanism could cause a spinal injury. Do not transport on a long board." }]
      } }
    ] },

    { title: "Primary survey and the baseline set", blocks: [
      { text: "Jason Fielding, 34, farm worker. He agrees to sit, then lie on the stretcher with AO1 holding his head. \"A roo jumped out. I swerved and it rolled.\" Seatbelt on, airbag went off. He's cold and shivering a little. AO2 gets the Corpuls3 on and takes a manual BP as well." },
      { table: { title: "Set 1, baseline (1748)", table: { head: ["RR", "SpO2", "BP", "Pulse", "Temp", "GCS", "Pain", "BGL"], rows: [["18", "97% (air)", "128/80", "92", "36.4", "15", "4/10", "5.8"]] } } },
      { box: { title: "History", items: [
        "Single-vehicle rollover at about 100 km/h, about 1725. Seatbelt on. Climbed out through the driver's window",
        "Pain in the left lower ribs, worse when he breathes in. No neck or back pain, no numbness, tingling or weakness",
        "No past medical history, no regular medicines, no allergies. Last ate at midday",
        "No alcohol. No medicines taken today"
      ] } },
      { breakpoint: { title: "Primary survey and baseline obs", type: "Practical skill",
        prompts: ["AO1: talk through your primary survey (CPP-004-AO).", "AO2: take a full set, including a manual BP and a felt pulse. Plot it on the RDR chart.", "Which zones are the obs in?", "He looks fine. Why does this set matter so much?"],
        expected: [
          "Scene, airway (C-spine stabilised), breathing, circulation (posture, look for bleeding), disability (AVPU: alert), exposure (find injuries, then cover him)",
          "Complete set: RR, SpO2 and whether on air, BP, pulse rate (felt), temperature, GCS. Pain score and BGL too",
          "All white on the RDR chart, including the pain score of 4/10",
          "It's the baseline. Every later set will be compared with it. One normal set does not mean a stable patient"
        ],
        teaching: ["Write the time and the actual values. The RDR chart asks for the pulse rate, not the ECG heart rate", "36.4 °C after 20 minutes on a cold roadside: keep him warm from now on"],
        realJob: "Whoever owns the obs owns the clock. Set a timer: the next full set is due in 15 minutes, or sooner if anything changes.",
        cards: [{ q: "What goes in a complete set of obs on the RDR chart?", a: "Respiratory rate, SpO2 (with room air or oxygen), BP (systolic and diastolic), pulse rate (not the ECG heart rate), temperature, GCS (E, V, M), pupils, pain score and BGL." }]
      } }
    ] },

    { title: "Secondary survey and spinal precautions", blocks: [
      { table: { title: "Findings (DSY)", table: { head: ["", "Finding"], rows: [
        ["Head and neck", "No wounds or deformity. No neck pain or tenderness. Pupils equal and reacting"],
        ["Chest", "Seatbelt bruise across the left chest. Tender over the left lower ribs. No crepitus, no paradoxical movement, air entry equal both sides"],
        ["Abdomen", "Seatbelt bruise across the lower abdomen. Tender in the left upper abdomen, no distension"],
        ["Pelvis", "No pain, no deformity. Not sprung (CTL-069)"],
        ["Limbs", "Grazes to both forearms. Normal movement and sensation in all four limbs"],
        ["Back", "No spinal pain or tenderness"]
      ] } } },
      { breakpoint: { title: "What is going on, and how do you package him?", type: "Decision making",
        prompts: ["What injuries are you worried about?", "Which spinal precaution technique will you use, and why?", "What does CPP-158-AO say about oxygen in major trauma?", "When is the next set of obs due?"],
        expected: [
          "Left lower rib injury with possible lung injury underneath (CPP-158-AO: suspect pulmonary contusion), and tenderness over the left upper abdomen: possible internal bleeding",
          "A spinal precaution technique suited to him: towel roll or vacuum mattress, or a correctly fitted collar. Do not transport on a long board. Record the decision on the PCR",
          "The initial approach to major trauma, including chest trauma, includes high-flow oxygen (CPP-158-AO)",
          "At 1803 at the latest. Sooner if anything changes"
        ],
        teaching: ["Inspect the chest from head or foot end at the patient's level, then look, listen and feel (CPP-158-AO)", "Do not spring the pelvis (CTL-069)", "Once he is on oxygen, a normal SpO2 tells you less. Watch the other obs (general teaching)"],
        realJob: "Say the worry out loud to your partner: \"Seatbelt bruise and a sore left belly after a rollover. I'm worried he's bleeding inside.\"",
        decisions: [{ q: "Which of these fits CPP-018-AO for packaging Jason?", options: [
          "Long board with the head taped down, for the whole trip",
          "A spinal precaution technique such as a towel roll or vacuum mattress on the stretcher, and the decision recorded on the PCR",
          "No precautions: he walked" ], answer: 1,
          why: "CPP-018-AO: choose the most appropriate technique (manual stabilisation, modified towel roll, vacuum mattress or a correctly fitted collar), document the decision, and do not secure the head to the stretcher or long board or transport on a long board." }]
      } }
    ] },

    { title: "Set 2: is anything changing?", blocks: [
      { text: "1803. Jason is on the stretcher in the ambulance with the heater on, a blanket and a space blanket over him and a thermal cap on. Oxygen is running. He says the ribs still hurt when he breathes in. Police have arrived and are managing traffic." },
      { table: { title: "Obs so far", table: { head: ["", "1748", "1803"], rows: [
        ["RR", "18", "22"], ["SpO2", "97% (air)", "99% (oxygen)"], ["BP", "128/80", "124/82"], ["Pulse", "92", "106"],
        ["Temp", "36.4", "36.0"], ["GCS", "15", "15"], ["Pain", "4/10", "4/10"]
      ] } } },
      { breakpoint: { title: "Reading the trend", type: "Decision making",
        prompts: ["Plot set 2. Which obs have changed zone?", "Does CPP-063-AO say escalate yet?", "What are you going to do now?", "What about his pain?"],
        expected: [
          "RR 22 and pulse 106 have moved from white to yellow. The BP is still white. SpO2 is higher, but he's now on oxygen. Pain 4/10 is still white",
          "Two yellows, no red or purple, no yellow-to-red step: not an escalation trigger yet. But obs in yellow zones: take them more often",
          "Repeat obs within 5 to 10 minutes. Request clinical support now: the paramedics are 40 minutes away. Get ready to move (DSY)",
          "Paracetamol 1000 mg (none in 4 hours) and methoxyflurane 3 mL as per CPP-013-AO. Methoxyflurane may not work well for chest injuries because it relies on his breathing (CPP-158-AO)"
        ],
        teaching: ["The pulse and breathing climbing while the BP holds is the pattern the shock video describes (DSY, from the Khan Academy video)", "Without the baseline, a pulse of 106 in a frightened man would be easy to dismiss"],
        teachingNote: "General teaching, from the scenario and the module.",
        realJob: "This is the set that matters. Nothing is red yet, and that's exactly why it's easy to wait. Don't wait to request clinical support.",
        decisions: [{ q: "Set 2: RR and pulse have moved from white to yellow, BP unchanged. What does CPP-063-AO say?", options: [
          "Nothing: everything is still normal",
          "Obs in yellow zones: take them more often, and keep watching for an escalation trigger",
          "Wait the full 15 minutes before the next set" ], answer: 1,
          why: "CPP-063-AO: obs in a yellow, red or purple zone are taken more frequently, and care is escalated if zones progress (yellow to red, red to purple), any purple, or 3 or more red or yellow." }]
      } }
    ] },

    { title: "Set 3: escalate", blocks: [
      { text: "1818. You're loaded and ready to go. Jason is quieter. He asks again what happened. His skin is pale and cool." },
      { table: { title: "Obs so far", table: { head: ["", "1748", "1803", "1818"], rows: [
        ["RR", "18", "22", "26"], ["SpO2", "97% (air)", "99% (oxygen)", "98% (oxygen)"], ["BP", "128/80", "124/82", "118/84"], ["Pulse", "92", "106", "124"],
        ["Temp", "36.4", "36.0", "35.6"], ["GCS", "15", "15", "14 (V4: repeating questions)"], ["Pain", "4/10", "4/10", "3/10"]
      ] } } },
      { breakpoint: { title: "Escalation, destination and the EOC call", type: "Decision making",
        prompts: ["Plot set 3. Which escalation triggers are met?", "Is he Level 1 on the Major Trauma Tool?", "Make the call to the EOC Clinician. What do you say?", "The BP is still in the white zone. Does that reassure you?"],
        expected: [
          "RR and pulse have moved from yellow to red; GCS is now yellow. Zones progressing and 3 obs in red or yellow: escalate (CPP-063-AO)",
          "Heart rate over 120: Level 1 at any time (CTL-042)",
          "Call: who and where; 34M, high-speed rollover at about 1725; seatbelt bruising, tender left ribs and left upper abdomen; the trend from 1748 to 1818; what you've given; request: clinical support, destination and retrieval",
          "No. The BP is the last thing to fall. The trend in the pulse, breathing and GCS is the warning"
        ],
        teaching: ["CTL-042: an unstable patient goes to the closest trauma service or nearest ED with early notification. On the Eyre Peninsula the EOC Clinician decides the destination and arranges retrieval", "Repeat the EOC Clinician's advice back and record the time"],
        realJob: "Give the trend in one breath: \"Pulse 92, then 106, now 124. Resps 18 to 26. GCS now 14. BP holding at 118.\"",
        decisions: [{ q: "Set 3: pulse 124 (was 92), RR 26 (was 18), GCS 14, BP 118. What now?", options: [
          "BP is fine, so keep watching",
          "Escalate: request clinical support and consult the EOC Clinician now. He meets Major Trauma Tool Level 1 (HR over 120)",
          "Wait for the BP to drop below 100 before calling" ], answer: 1,
          why: "CPP-063-AO: zones progressing yellow to red and 3 or more red or yellow obs are escalation triggers. CTL-042: heart rate over 120 is Level 1 at any time. CPP-004-AO: consult the EOC Clinician when advice is needed." }]
      } },
      { text: "The EOC Clinician (story): \"Thanks, that's a clear trend. Head for Port Lincoln Hospital now. The paramedic crew will meet you on the Tod Highway, and I'll notify the hospital and talk to MedSTAR. Keep him warm, obs every 5 minutes, and call me if his BP drops below 100.\"" },
      { box: { title: "Clinical decision point", tone: "warn", items: [
        "Escalation triggers met and Major Trauma Tool Level 1",
        "Transport now. Clinical support is meeting you on the way",
        "Obs more often. Keep him warm. Keep the spinal precautions",
        "Destination and retrieval: the EOC Clinician's decision"
      ] } }
    ] },

    { title: "En route", blocks: [
      { text: "1833. On the Tod Highway, heading for Port Lincoln. AO2 is driving; AO1 is in the back. The paramedic crew is about 10 minutes away." },
      { table: { title: "Obs en route", table: { head: ["", "1818", "1826", "1833"], rows: [
        ["RR", "26", "28", "28"], ["SpO2", "98% (oxygen)", "97% (oxygen)", "97% (oxygen)"], ["BP", "118/84", "110/80", "100/76"], ["Pulse", "124", "128", "132"],
        ["Temp", "35.6", "35.5", "35.5"], ["GCS", "14", "14", "14"]
      ] } } },
      { breakpoint: { title: "Monitoring and warmth", type: "Practical skill",
        prompts: ["What has the BP done? What zone is it in now?", "What do you do at 1833?", "Temperature 35.5 °C: what can you do in the back of the ambulance?", "Show how you would check the space blanket, cap and blankets without exposing him more than needed."],
        expected: [
          "BP falling: 118, 110, 100. At 100 it is in the white zone but now meets Major Trauma Tool Level 1 (systolic 100 or less). Pulse 132 is red",
          "Call the EOC Clinician back as asked. Tell the paramedic crew the latest set when you meet",
          "35.5 is yellow on the RDR chart. Heater up, more blankets, keep him covered, keep wet clothing off him (CPP-063-AO: keep warm and dry; adjust the vehicle temperature)",
          "Expose only what you need to check, then cover again (CPP-004-AO)"
        ],
        teaching: ["Hypothermia happens in hot and cold weather (CPP-063-AO). The lethal triad video in the module explains why cold matters in a bleeding patient", "Write every set down: the trend is your handover"],
        realJob: "The back of an ambulance on a winter night is cold. Heater on before you load, not after.",
        cards: [{ q: "Which systolic BP makes an adult Level 1 on the Major Trauma Tool?", a: "100 mmHg or less, at any time (CTL-042)." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { text: "1843. The paramedic crew meets you at the roadside and joins you in the back. You hand over before moving on to Port Lincoln Hospital." },
      { table: { title: "ISBAR (CTL-054)", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Officer from Cummins. This is Jason Fielding, 34.\""],
        ["S", "\"Single-vehicle rollover at about 100 km/h, 1725. He climbed out. He's now Major Trauma Tool Level 1 and getting worse: we think he's bleeding inside.\""],
        ["B", "\"Seatbelt on. Seatbelt bruising across the left chest and lower abdomen, tender left lower ribs and left upper abdomen. No spinal pain or neuro signs, towel roll on the stretcher. No history, medicines or allergies.\""],
        ["A", "\"Baseline at 1748: pulse 92, BP 128, resps 18, GCS 15, temp 36.4. Since then pulse 106, 124, now 132. Resps up to 28. BP 118, 110, now 100. GCS 14 from 1818. Temp 35.5. On oxygen, SpO2 97. Paracetamol 1 gram and methoxyflurane at 1805.\""],
        ["R", "\"EOC Clinician consulted at 1820. Port Lincoln notified, MedSTAR aware. He needs warming and close obs.\""]
      ] } } },
      { breakpoint: { title: "Hand over the trend", type: "Practical skill",
        prompts: ["Deliver your ISBAR now. Go.", "What must the paramedic crew hear first?", "Did you give the baseline and every set since?"],
        expected: ["Lead with the risk: Level 1 and deteriorating, suspected internal bleeding", "The baseline set, then the trend, not just the latest numbers", "What was given and when, and the EOC Clinician's advice"],
        teaching: ["Give trends, not just the last set", "Keep it short and structured"],
        realJob: "\"Pulse 132\" means one thing. \"Pulse 92, then 106, 124, now 132\" means something much more urgent.",
        decisions: [{ q: "What makes Jason's handover most useful?", options: ["The latest set only", "The baseline set and every set since, so the trend is clear", "The ute's make and model"], answer: 1,
          why: "Repeated obs establish clinical risk, deterioration or response to treatment (CPP-063-AO). The receiving crew needs the trend from the baseline." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "When did you first think Jason was more hurt than he looked? What told you?",
        "How did you stop him walking, and which spinal precaution did you choose?",
        "What did your baseline set show? What would you have missed without it?",
        "At 1803 nothing was red. What did you decide, and why?",
        "Which escalation triggers did set 3 meet? Which Major Trauma Tool criterion?",
        "Is there a hospital closer than Port Lincoln? How did the destination get decided?",
        "How did you keep him warm? What else could you have done?",
        "Did your handover give the trend?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "One normal set is a baseline, not a clean bill of health",
        "Full sets at least every 15 minutes, and more often if you're concerned or obs are in a coloured zone",
        "Escalate when zones progress, any purple, or 3 or more red or yellow (CPP-063-AO)",
        "Major Trauma Tool Level 1 criteria apply at any time: check every set",
        "A high-speed rollover rules out casual self-extrication: stop movement and use a spinal precaution technique",
        "Keep them warm and dry. Hand over the trend"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. Older, on a blood thinner, trapped", text: "Driver, 70, on an anticoagulant, trapped in the car for 40 minutes on a winter night. Prolonged extrication of 30 minutes or more is a Level 2 mechanism, and anticoagulant therapy and age 65 or over are high risk groups (CTL-042). Baseline: RR 20, SpO2 95, BP 112, pulse 98, temp 35.4, GCS 15. Latest: RR 28, SpO2 92, BP 96, pulse 118, temp 34.8, GCS 13. Work through the obs trend checker in the module." } },
      { box: { title: "2. A passenger with a femur fracture", text: "A passenger, 19, has a deformed, shortened right thigh and can't move the leg. Discuss the CT-6 traction splint (CPPRO-028) and the SAM Pelvic Sling (CPPRO-045, which goes on before a traction splint if both are needed). Femur plus one other long bone fracture is a Level 1 injury (CTL-042). Two patients and one crew: request more resources early." } },
      { box: { title: "3. Pain not controlled", text: "Jason's rib pain stays at 8/10 after paracetamol and methoxyflurane. CPP-158-AO says consider clinical support for pain relief in chest trauma. If your crew is authorised for IN fentanyl, run through the pain module's criteria first. With a falling BP, consult the EOC Clinician." } },
      { box: { title: "4. A short trip", text: "The crash is 2 km from Cummins and the paramedics are much further away. Discuss with the EOC Clinician: closest ED with early notification (CTL-042 for an unstable patient), or meet the paramedics. Either way, keep the obs going and hand over the trend." } }
    ] }
  ]
};
