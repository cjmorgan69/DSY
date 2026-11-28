/* Amputation and haemorrhage - AO walk-through scenario (Tom, 46, grain auger near Kimba), with an Ambulance Responder
   version (?scope=ar). Content only: the layout lives in /microlearning/shared/module.js. Built 28 Nov 2026 with the
   amputation module, on SAAS CPP-042-AO Amputation and Haemorrhage - AO v4.0 (8 December 2016) and CPP-024-AR
   Amputation and Haemorrhage - AR v2.0 (4 January 2019), CPPRO-004 Arterial Tourniquet Application v1.1 (effective
   29 December 2016), CPP-013-AO / CPP-036-AR Pain Management. The story, scene, people, observations, timings and
   EOC Clinician replies are a new training scenario written by DSY. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Amputation and haemorrhage - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Tom, 46: hand caught in a grain auger on a farm north of Kimba, 1530",
  lead: "Life-threatening bleeding and two amputated fingers at harvest, for a two-person volunteer AO crew, with eight break points for discussion, skills practice and decisions. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 75,

  protocol: {
    code: "CPP-042-AO", name: "Amputation and Haemorrhage - AO", version: "v4.0 (8 December 2016)", exported: "31 August 2026",
    also: [{ code: "CPPRO-004", name: "Arterial Tourniquet Application", version: "v1.1 (effective 29 December 2016)" },
           { code: "CPP-013-AO", name: "Pain Management - AO", version: "v7.2 (3 December 2025)" }]
  },
  footerNotes: ["This is a new training scenario written by DSY: the patient, story, observations, timings and EOC Clinician replies are fictional. Check it with your lead instructor.",
    "CPP-042-AO (2016) and CPPRO-004 (2016) are old documents: check the SAAS Clinical app for any newer version. Practise the tourniquet on a training limb only."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 46 year old farmer catches his right hand in a grain auger at harvest, on a farm about 18 km north of Kimba. Two fingers are completely amputated and a deep forearm wound is bleeding heavily. Kimba Hospital is 20 minutes from the farm; paramedic backup is about 75 minutes." },
      { box: { title: "Learning objectives", items: [
        "Make a farm machinery scene safe before you touch the patient",
        "Control external bleeding with firm direct pressure and elevation, and recognise when it has failed",
        "Apply an arterial tourniquet as a last resort, as CPP-042-AO and CPPRO-004 describe: where, how tight, the time, and the three things it must not be",
        "Package an amputated part: a water-tight bag, in ice-cooled water, never touching the ice",
        { scope: "ao", text: "Consider clinical support, the EOC Clinician and pain management, and advise the EOC Clinician about the tourniquet" },
        { scope: "ar", text: "Request clinical support, give pain relief as per CPP-036-AR, and consult the EOC Clinician regarding treatment and transport" },
        "Deliver an ISBAR handover with the tourniquet time"
      ] } },
      { box: { title: "Required equipment", items: [
        "PPE (gloves, eye protection), response bag, Corpuls3 (SpO2, ECG, NIBP), BGL meter",
        "Trauma dressings, combine pads, crepe bandages, SOF tactical tourniquet, permanent marker",
        "Zip-lock bags, a container, water and ice for the amputated part",
        "Oxygen, methoxyflurane, paracetamol, blankets",
        "Stretcher, ePCR tablet"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 45 to 55 minutes; debrief 10 to 15 minutes",
        "Kimba Hospital: about 20 minutes",
        "Paramedic backup: about 75 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, bleeding control, the tourniquet, assessment, pain relief, decisions",
        "Driver (AO2): scene safety and the machinery, Corpuls3 and observations, the amputated part, the calls, equipment"
      ] } }
    ] },

    { title: "Pre-brief: the amputation and haemorrhage protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { scope: "ao", steps: [
        { t: "Basic care", text: "Including haemorrhage control using direct pressure." },
        { t: "Consider", text: "Requesting clinical support; consulting the EOC Clinician; pain management as per CPP-013-AO." },
        { t: "Life-threatening bleeding uncontrolled with direct pressure", text: "Apply an arterial tourniquet: proximal and as close as possible to the bleeding site, tightened enough to control the bleeding, the time of application documented." },
        { t: "A tourniquet must not be", text: "Applied over a joint or a wound; covered with bandage or clothing; removed pre-hospital. Advise the EOC Clinician, who may seek specialist advice." },
        { t: "Complete amputation", text: "Seal the body part in a water-tight bag; place the bag in ice-cooled water if possible; the part must not be in direct contact with ice." }
      ] },
      { scope: "ar", steps: [
        { t: "Basic care", text: "Including haemorrhage control using direct pressure." },
        { t: "Consider", text: "Requesting clinical support; pain management as per CPP-036-AR." },
        { t: "Consult the EOC Clinician regarding treatment and transport", text: "They may advise: transport and cancel clinical support; transport and RV with clinical support en route; or monitoring until clinical support arrives." },
        { t: "Life-threatening bleeding uncontrolled with direct pressure", text: "Apply an arterial tourniquet: proximal and as close as possible to the bleeding site, tightened enough to control the bleeding, the time of application documented." },
        { t: "A tourniquet must not be", text: "Applied over a joint or a wound; covered with bandage or clothing; removed pre-hospital. Advise the EOC Clinician, who may seek specialist advice." },
        { t: "Complete amputation", text: "Seal the body part in a water-tight bag; place the bag in ice-cooled water if possible; the part must not be in direct contact with ice." }
      ] },
      { box: { title: "Why it matters (protocol principle)", items: [
        "Complete amputation needs specific care aimed at saving the part for possible reattachment",
        "Partial amputations may cause significant bleeding",
        "Direct pressure and elevation control external bleeding in most cases",
        "A tourniquet only in extreme circumstances: life-threatening bleeding that direct pressure and elevation can't control (CPPRO-004: an option of last resort)"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "Farm machinery: make sure it is stopped and can't restart before you go near it",
        "Write the tourniquet time where you'll see it again: the strap, the PCR, and say it at every handover",
        "Give the amputated part a job: one person, one bag, and it travels with the patient"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Wednesday in late November, 1530, harvest. Hot and windy. You and your crew partner are paged in Kimba to a farm about 18 km north of Kimba: about 15 minutes." },
      { box: { title: "MDT display", items: [
        "Priority 1, traumatic injury, 46 year old male",
        "Caller: wife (Kate). Right hand caught in a grain auger. \"Bleeding everywhere, two fingers are off\"",
        "Auger now stopped. Patient conscious",
        "Field bin site, 2 km up the farm track from the house. Kate will meet you at the gate"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What stands out on the MDT?", "What hazards are you expecting at a field bin site?", "What kit goes in first, and who carries what?", "Clinical support is 75 minutes away and the hospital 20. What's your plan?"],
        expected: [
          "Heavy bleeding and a complete amputation: plan for bleeding control first, the fingers second",
          "Machinery: the auger, the tractor or engine driving it, the truck. Is it off, and can it restart? Grain, dust, heat and snakes",
          "Kit in first: PPE, trauma dressings and the tourniquet in your hand, the response bag, Corpuls3; the Driver brings bags and a container for the fingers",
          { scope: "ao", text: "Consider clinical support and the EOC Clinician early (CPP-042-AO): the paramedic is 75 minutes away" },
          { scope: "ar", text: "Request clinical support early (CPP-024-AR): the paramedic is 75 minutes away" },
          "Roles: the Clinician takes the bleeding; the Driver takes the machinery, the fingers and the calls"
        ],
        teaching: ["Walk in with the tourniquet in your pocket, even if you never use it", "Decide in the car who looks after the amputated part"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "Farm jobs are often a long way up a track. Ask the caller to send someone to the gate and to keep everyone clear of the machinery.",
        decisions: [{ q: "What controls most external bleeding?", options: ["An arterial tourniquet", "Firm direct pressure and elevation", "Ice on the wound"], answer: 1,
          why: "CPP-042-AO: direct pressure and elevation will achieve external haemorrhage control in most circumstances. A tourniquet is only for life-threatening bleeding they can't control." }]
      } },
      { text: "1538: a remark on the MDT: \"PATIENT FEELING FAINT. WIFE PRESSING A TOWEL ON IT.\"", muted: true }
    ] },

    { title: "On arrival", blocks: [
      { text: "1545. Kate meets you at the gate and you follow her to the field bin. A grain truck, a tractor and a long auger; dust in the air. The tractor that drives the auger is still idling. Tom is sitting on the ground against the truck's back wheel, pale and sweaty, holding his right arm up in a blood-soaked towel. Blood on his shirt, his jeans and the ground. Their son Riley (17) is standing by the auger hopper." },
      { breakpoint: { title: "The scene before the patient", type: "Discussion",
        prompts: ["What do you do before you reach Tom?", "Who turns the tractor off, and how do you know the auger can't restart?", "What do you ask Kate and Riley to do?", "What PPE?"],
        expected: [
          "Stop and look: the auger is stopped but the tractor driving it is running. It must be off before anyone goes near the auger",
          "Ask Riley (who knows the machine) to turn the tractor off and take the key out; keep everyone away from the hopper (general teaching)",
          "Kate: bring the towels and tell you what happened. Riley: once the tractor is off, look for the fingers, without reaching into the auger",
          "Gloves and eye protection: arterial bleeding sprays"
        ],
        teaching: ["A stopped machine isn't a safe machine: off, key out", "Give family members jobs that keep them safe and help you"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "Don't climb into machinery to find a part. If the fingers are inside the auger, they stay there for now: the bleeding comes first.",
        decisions: [{ q: "The tractor driving the auger is still running. What first?", options: [
          "Go straight to Tom: the bleeding can't wait",
          "Have the tractor turned off and the key taken out, then go to Tom",
          "Reach into the hopper for the fingers" ], answer: 1,
          why: "General teaching: make the scene safe first. It takes seconds, and an injured crew can't help anyone." }]
      } }
    ] },

    { title: "Patient contact: the bleeding", blocks: [
      { box: { title: "What you find (1547)", items: [
        "Catastrophic bleeding: under the towel, a deep 6 cm laceration across the middle of the right forearm, with bright red blood pumping out in spurts",
        "The index and middle fingers are gone at the base of the fingers; those stumps ooze but are not spurting",
        "Airway: talking. Breathing: fast, about 24. Circulation: fast, weak radial pulse on the left; pale, cool and sweaty",
        "Disability: alert, anxious, \"I feel a bit sick\". Exposure: no other injuries seen; the auger caught his glove and pulled his hand in"
      ] } },
      { box: { title: "History (Tom and Kate)", items: [
        "Clearing a blockage at the hopper with the auger running; his glove caught",
        "Kate hit the auger's stop switch; she has been pressing the towel on for about 10 minutes",
        "Well. Takes no regular medicines. No allergies. Weight about 90 kg",
        "Last tetanus: \"no idea\""
      ] } },
      { breakpoint: { title: "Direct pressure and elevation", type: "Practical skill",
        prompts: ["What do you do in the first 30 seconds?", "Show us direct pressure on this wound: where, how hard, with what?", "Why elevate, and how?", "How long do you give it? What tells you it is working, or not?"],
        expected: [
          "Gloves on, towel off, find the source: the forearm wound is the life-threat. Firm direct pressure on it straight away (CPP-042-AO)",
          "A trauma dressing or combine pad, pressed hard with the heel of the hand onto the bleeding point; don't keep lifting it to look (general teaching)",
          "Elevation: keep the arm up while you press; lay Tom down to help with the faintness",
          "Watch the dressing: if blood keeps soaking through and spurting despite firm pressure and elevation, it has failed",
          "Driver: Corpuls3 on, and request clinical support"
        ],
        teaching: ["Find the bleeding point before you press", "Pressure and elevation first, every time: they work in most cases"],
        teachingNote: "Lying him down, dressing choice and not lifting the pad are general teaching; the rest is CPP-042-AO.",
        realJob: "Arterial bleeding is loud, messy and frightening. Slow down for two seconds: find the hole, then press hard.",
        decisions: [{ q: "You've found the spurting forearm wound. What now?", options: [
          "Apply a tourniquet straight away",
          "Firm direct pressure on the wound, and elevate the arm",
          "Bandage the towel firmly in place and move on" ], answer: 1,
          why: "CPP-042-AO: basic care including haemorrhage control using direct pressure. A tourniquet is only when life-threatening bleeding is uncontrolled with direct pressure (and elevation)." }],
        cards: [{ q: "In CPP-042-AO, what controls external bleeding in most circumstances?", a: "Direct pressure and elevation." }]
      } },
      { table: { title: "Observations (1549)", table: { head: ["HR", "BP", "RR", "SpO2", "Skin", "GCS", "BGL"], rows: [["128", "96/64", "24", "96% (air)", "Pale, cool, sweaty", "15", "6.8"]] } } },
      { text: "1550. You have pressed hard with a trauma pad and a second pad on top, the arm held up, for nearly 3 minutes. Blood is still pumping through both pads and running down your wrist. Tom: \"I'm going to pass out.\"", muted: true }
    ] },

    { title: "Life-threatening bleeding: the tourniquet", blocks: [
      { box: { title: "SOF tactical tourniquet (CPPRO-004)", tiles: true, steps: [
        { t: "Place it", text: "Proximal to the wound, as close as possible to the bleeding site: on Tom's forearm a little above the wound, below the elbow. Not over the joint, not over the wound." },
        { t: "Buckle", text: "Click the buckle into place." },
        { t: "Pull", text: "Pull the strap down tight." },
        { t: "Wind", text: "Rotate the windlass until the bleeding is controlled: the radial pulse should no longer be palpable." },
        { t: "Lock", text: "Secure the windlass in the locking buckle." },
        { t: "Time", text: "Record the time of application on the strap label and on the PCR: 1551." }
      ] } },
      { breakpoint: { title: "Is it time for a tourniquet?", type: "Practical skill",
        prompts: ["Does Tom meet the tourniquet criteria? Say why.", "Show us where it goes on this arm (training limb only).", "How tight is tight enough?", "Name the three things a tourniquet must not be.", "Who do you tell?"],
        expected: [
          "Yes: life-threatening bleeding uncontrolled with direct pressure (and elevation) (CPP-042-AO). He is pale, fast and faint with blood still pumping",
          "Proximal and as close as possible to the bleeding site; on a limb only; not over a joint or the wound (CPP-042-AO, CPPRO-004)",
          "Tighten until the bleeding is controlled: distal pulses should no longer be palpable (CPPRO-004)",
          "Not over a joint or wound, not covered with bandage or clothing, not removed pre-hospital (CPP-042-AO)",
          "Document the time; advise the EOC Clinician, who may seek specialist advice (CPP-042-AO)"
        ],
        teaching: ["Keep pressing on the wound while your partner gets the tourniquet on", "A tourniquet hurts: tell Tom before you tighten it"],
        teachingNote: "Keeping pressure on while it goes on and warning about pain are general teaching (CPPRO-004 lists pain as a complication); the rest is CPP-042-AO and CPPRO-004.",
        realJob: "Practise the SOF tourniquet one-handed and two-handed on the training limb until the buckle, strap and windlass are automatic. Never on a person in training.",
        decisions: [
          { q: "Which tourniquet position fits CPP-042-AO and CPPRO-004?", options: [
            "Over the elbow, so it can't slip",
            "On the forearm a little above the wound: proximal, as close as possible to the bleeding, not over the joint or the wound",
            "On the wound itself, to press on it" ], answer: 1,
            why: "CPP-042-AO: proximal and as close as possible to the bleeding site; must not be applied over a joint or wound." },
          { q: "The tourniquet is on and the bleeding has stopped. Tom asks you to loosen it because it hurts. What do you do?", options: [
            "Loosen it a little",
            "Leave it on, uncovered, and treat his pain",
            "Take it off and go back to pressure" ], answer: 1,
            why: "CPP-042-AO: a tourniquet must not be removed pre-hospital, or covered with bandage or clothing. Pain management as per the pain protocol." }],
        cards: [{ q: "How do you know the tourniquet is tight enough?", a: "The bleeding is controlled and distal pulses are no longer palpable (CPPRO-004)." }]
      } },
      { text: "1551: SOF tourniquet on the right forearm, below the elbow. Bleeding stops; no radial pulse on the right. \"1551\" written on the strap label and in the ePCR. Tom groans: \"That's worse than the fingers.\"", muted: true }
    ] },

    { title: "The amputated fingers", blocks: [
      { text: "1553. With the tractor off and the key in Kate's pocket, Riley finds both fingers on the grain at the top of the hopper, and hands them over in his cap." },
      { breakpoint: { title: "Packaging the part", type: "Practical skill",
        prompts: ["Driver: show us how you package the fingers.", "What must they never touch?", "Should you wash the grain off?", "Where do the fingers go from here?"],
        expected: [
          "Seal the fingers in a water-tight bag (CPP-042-AO)",
          "Place the bag in ice-cooled water if possible; the part must not be in direct contact with ice (CPP-042-AO)",
          "Not in the protocol: don't scrub or soak the fingers; pick off obvious loose grain gently if you need to (general teaching)",
          "Label the bag with Tom's name and the time; it travels with Tom and is handed over with him (general teaching)"
        ],
        teaching: ["Bag, then water, then ice: the ice touches the water, never the part", "One person owns the part until handover"],
        teachingNote: "Cleaning and labelling are general teaching; the bag and ice-cooled water are CPP-042-AO.",
        realJob: "Field bins rarely have ice. The esky in the ute or the farmhouse freezer often does: ask early.",
        decisions: [{ q: "How do you package the fingers?", options: [
          "Straight onto a bag of ice",
          "Sealed in a water-tight bag, placed in ice-cooled water, not touching the ice",
          "Wrapped in a wet towel on the dashboard" ], answer: 1,
          why: "CPP-042-AO: seal the body part in a water-tight bag; place the bag in ice-cooled water if possible; the body part must not be directly in contact with ice." }]
      } },
      { text: "1556: the fingers sealed in a zip-lock bag, inside a second bag of water with ice from the farm's esky. Labelled \"Tom, 1553\".", muted: true }
    ] },

    /* ---------- AO: pain and the EOC Clinician ---------- */
    { scope: "ao", title: "Pain, shock and the EOC Clinician", blocks: [
      { table: { title: "Observations", table: { head: ["", "1549", "1558 (tourniquet on)"], rows: [
        ["HR", "128", "116"], ["BP", "96/64", "102/68"], ["RR", "24", "22"], ["SpO2", "96% (air)", "97% (air)"],
        ["Skin", "Pale, cool, sweaty", "Pale, cool"], ["GCS", "15", "15"], ["Pain", "8/10", "9/10 (the tourniquet)"]
      ] } } },
      { breakpoint: { title: "Pain relief and the consult", type: "Decision making",
        prompts: ["What does Tom's pain management look like?", "What do the obs tell you?", "What does the EOC Clinician need to hear?", "What could the EOC Clinician arrange that you can't?"],
        expected: [
          "Pain management as per CPP-013-AO: methoxyflurane 3 mL (repeat once if needed), paracetamol if none in the past 4 hours; if it's not enough, consult (authorised AOs: IN fentanyl on consult)",
          "Signs of blood loss: fast pulse, low-normal BP, pale and cool. Keep him lying down and warm; watch the trend",
          "The mechanism, the bleeding that failed pressure, the tourniquet and its time (1551), the two fingers packaged, obs, pain relief, 75 minutes to clinical support",
          "Advise the EOC Clinician about the tourniquet: they may seek specialist advice (CPP-042-AO) about the hand and where Tom should go"
        ],
        teaching: ["A tourniquet is always a call: say the time first", "Treat the pain the tourniquet causes, don't loosen it"],
        teachingNote: "Lying down, warmth and the shock signs are general teaching; the rest is CPP-042-AO and CPP-013-AO.",
        realJob: "\"Tom, 46, right hand in a grain auger. Arterial bleeding from the forearm, not controlled with pressure: SOF tourniquet on at 1551, bleeding controlled. Index and middle fingers amputated, bagged in iced water. HR 116, BP 102 on 68, pale, GCS 15. Methoxyflurane started. Clinical support is 75 minutes. Can you advise on destination and pain relief?\"",
        decisions: [{ q: "Which call does CPP-042-AO ask for once a tourniquet is on?", options: [
          "None: it's within AO scope",
          "Advise the EOC Clinician, who may seek specialist advice",
          "Call the hospital to ask if it can come off" ], answer: 1,
          why: "CPP-042-AO: after applying an arterial tourniquet, advise the EOC Clinician who may seek specialist advice." }],
        cards: [{ q: "What three things must a tourniquet never be?", a: "Applied over a joint or wound, covered with bandage or clothing, or removed pre-hospital (CPP-042-AO)." }]
      } },
      { text: "In the scenario, the EOC Clinician at 1600: \"Good work. Transport to Kimba Hospital now and notify them: I'll talk to the retrieval team about the hand and the fingers. Leave the tourniquet alone. Methoxyflurane is fine; call me if the pain stays uncontrolled or his blood pressure drops. The paramedic crew will meet you at Kimba Hospital.\"", muted: true }
    ] },

    /* ---------- AR: pain and the consult regarding treatment and transport ---------- */
    { scope: "ar", title: "Pain, shock and the consult", blocks: [
      { table: { title: "Observations", table: { head: ["", "1549", "1558 (tourniquet on)"], rows: [
        ["HR", "128", "116"], ["BP", "96/64", "102/68"], ["RR", "24", "22"], ["SpO2", "96% (air)", "97% (air)"],
        ["Skin", "Pale, cool, sweaty", "Pale, cool"], ["GCS", "15", "15"], ["Pain", "8/10", "9/10 (the tourniquet)"]
      ] } } },
      { breakpoint: { title: "Pain relief and the consult", type: "Decision making",
        prompts: ["What pain relief can you give as an AR?", "What do the obs tell you?", "What does the EOC Clinician need to hear, and what are you asking for?", "Which of the three options could they advise?"],
        expected: [
          "Pain management as per CPP-036-AR: methoxyflurane 3 mL (repeat once if needed), paracetamol if none in the past 4 hours. No fentanyl at AR level",
          "Signs of blood loss: fast pulse, low-normal BP, pale and cool. Keep him lying down and warm; watch the trend",
          "The mechanism, the bleeding that failed pressure, the tourniquet and its time (1551), the fingers packaged, obs, pain relief, 75 minutes to clinical support; ask about treatment and transport (CPP-024-AR)",
          "Transport and cancel clinical support; transport and RV with clinical support en route; or monitoring until clinical support arrives (CPP-024-AR)"
        ],
        teaching: ["A tourniquet is always a call: say the time first", "Treat the pain the tourniquet causes, don't loosen it"],
        teachingNote: "Lying down, warmth and the shock signs are general teaching; the rest is CPP-024-AR and CPP-036-AR.",
        realJob: "\"Tom, 46, right hand in a grain auger. Arterial bleeding from the forearm, not controlled with pressure: SOF tourniquet on at 1551, bleeding controlled. Index and middle fingers amputated, bagged in iced water. HR 116, BP 102 on 68, pale, GCS 15. Methoxyflurane started. Clinical support requested, 75 minutes away. We're asking about treatment and transport.\"",
        decisions: [{ q: "As an AR, who decides where Tom goes and whether clinical support keeps coming?", options: [
          "The crew: closest hospital, always",
          "The EOC Clinician, after the consult regarding treatment and transport",
          "Tom's wife" ], answer: 1,
          why: "CPP-024-AR: consult the EOC Clinician regarding treatment and transport, who may advise transport and cancel clinical support, transport and RV en route, or monitoring until clinical support arrives." }],
        cards: [{ q: "What three things must a tourniquet never be?", a: "Applied over a joint or wound, covered with bandage or clothing, or removed pre-hospital (CPP-024-AR)." }]
      } },
      { text: "In the scenario, the EOC Clinician at 1600: \"Good work. The bleeding is controlled and Kimba Hospital is much closer than the paramedics: transport to Kimba Hospital now and notify them. I'll cancel the paramedic crew and talk to the retrieval team about the hand. Leave the tourniquet alone, and call me if his blood pressure drops or the pain stays uncontrolled.\"", muted: true }
    ] },

    { title: "Extrication and transport", blocks: [
      { box: { title: "Getting Tom to hospital", items: [
        "Stretcher brought to Tom on the flattest ground; he lies down, the arm supported up on a pillow, the tourniquet in view and uncovered",
        "The fingers in their bag of iced water travel in the ambulance, with the Driver checking they don't sit on the ice",
        "Kate follows in the ute with Tom's wallet and phone; Riley stays with a neighbour",
        "Clinician in the back: the tourniquet, the wound dressing, the hand, obs every 5 minutes, methoxyflurane, a blanket",
        { scope: "ao", text: "Notify Kimba Hospital, as the EOC Clinician advised" },
        { scope: "ar", text: "Notify Kimba Hospital, as the EOC Clinician advised (clinical support cancelled)" }
      ] } },
      { table: { title: "En route (1615)", table: { head: ["HR", "BP", "RR", "SpO2", "GCS", "Pain"], rows: [["108", "108/70", "20", "98% (air)", "15", "6/10"]] } } },
      { breakpoint: { title: "Transport: watching the tourniquet", type: "Decision making",
        prompts: ["What do you check on the tourniquet en route?", "The forearm wound starts to ooze again. What now?", "Tom's sleeve has slipped down over the strap. Does it matter?", "When would you call the EOC Clinician again?"],
        expected: [
          "Still tight and locked, bleeding still controlled, the time still on the strap",
          "Check the windlass is locked; tighten further until the bleeding is controlled (CPPRO-004); direct pressure on any ooze; tell the EOC Clinician",
          "Yes: a tourniquet must not be covered with bandage or clothing (CPP-042-AO). Cut or fold the sleeve back so everyone can see it",
          "Falling BP, rising pulse, new bleeding, uncontrolled pain, or any change in conscious state"
        ],
        teaching: ["A covered tourniquet gets forgotten: keep it in sight", "Re-check the tourniquet with every set of obs"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "On corrugated farm roads things slip. Check the tourniquet, the dressing and the fingers' bag before you hit the bitumen.",
        decisions: [{ q: "Bleeding restarts past the tourniquet en route. What fits CPPRO-004?", options: [
          "Remove it and start again",
          "Check the lock and tighten the windlass until the bleeding is controlled",
          "Cover it with a bandage to hold it" ], answer: 1,
          why: "CPPRO-004: tighten until haemorrhage is controlled (distal pulses no longer palpable). CPP-042-AO: never remove it pre-hospital or cover it." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { text: "1622, Kimba Hospital. The nurse and the on-call doctor meet you in the resus bay." },
      { scope: "ao", table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Officer from Kimba. This is Tom Ashdale, 46.\""],
        ["S", "\"Right hand pulled into a grain auger at about 1525. Arterial bleeding from a forearm laceration that didn't stop with direct pressure and elevation. Tourniquet on at 1551. Index and middle fingers completely amputated: they're here, in a sealed bag in iced water.\""],
        ["B", "\"Well, no regular medicines, no allergies. About 90 kilos. Tetanus status unknown.\""],
        ["A", "\"First obs HR 128, BP 96 on 64, pale and sweaty. SOF tourniquet on the right forearm below the elbow, time on the strap, bleeding controlled since. Methoxyflurane 3 mL from 1558. Now HR 108, BP 108 on 70, SpO2 98% on air, GCS 15, pain 6 out of 10.\""],
        ["R", "\"The tourniquet has stayed on and uncovered since 1551. EOC Clinician advised at 1600 and is talking to the retrieval team about the hand. The paramedic crew is on the way here.\""]
      ] } } },
      { scope: "ar", table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Responder from Kimba. This is Tom Ashdale, 46.\""],
        ["S", "\"Right hand pulled into a grain auger at about 1525. Arterial bleeding from a forearm laceration that didn't stop with direct pressure and elevation. Tourniquet on at 1551. Index and middle fingers completely amputated: they're here, in a sealed bag in iced water.\""],
        ["B", "\"Well, no regular medicines, no allergies. About 90 kilos. Tetanus status unknown.\""],
        ["A", "\"First obs HR 128, BP 96 on 64, pale and sweaty. SOF tourniquet on the right forearm below the elbow, time on the strap, bleeding controlled since. Methoxyflurane 3 mL from 1558. Now HR 108, BP 108 on 70, SpO2 98% on air, GCS 15, pain 6 out of 10.\""],
        ["R", "\"The tourniquet has stayed on and uncovered since 1551. EOC Clinician consulted at 1600: transport here, clinical support cancelled; they are talking to the retrieval team about the hand.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Deliver your ISBAR now as if to the doctor.", "Which time must be in it, and where else is it written?", "What do you hand over besides Tom?"],
        expected: [
          "The tourniquet time (1551): said out loud, on the strap and on the PCR (CPP-042-AO, CPPRO-004)",
          "The time of injury and of the consult",
          "The fingers in their bag, labelled, handed to a named person",
          "The pain relief given, with doses and times"
        ],
        teaching: ["The tourniquet time is the first number the doctor needs", "Hand the part over to a person, not a bench"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "Point to the strap as you say the time, so the doctor sees it too.",
        decisions: [{ q: "Which detail matters most for the doctor's next decision?", options: ["How dusty the bin site was", "The tourniquet time, and the fingers handed over", "Who drove the ambulance"], answer: 1,
          why: "The time of application must be documented and handed over (CPPRO-004); the part goes with the patient for possible reattachment (CPP-042-AO principle)." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "How did you make the machinery safe? What would you do differently?",
        "How long did you give direct pressure and elevation? What told you it had failed?",
        "How did the tourniquet go on? Did you keep pressing while it went on?",
        "Who looked after the fingers, and did they stay off the ice?",
        { scope: "ao", text: "What did you tell the EOC Clinician, and what did you ask for?" },
        { scope: "ar", text: "How did the consult go? Which transport option did the EOC Clinician choose, and why?" },
        "How did you manage Tom's pain without loosening the tourniquet?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Direct pressure and elevation first: they control most bleeding",
        "Tourniquet only for life-threatening bleeding they can't control: proximal and as close as possible, tight enough to control it, time on the strap and the PCR",
        "Never over a joint or wound, never covered, never removed pre-hospital",
        "Amputated part: water-tight bag, in ice-cooled water, never touching ice",
        { scope: "ao", text: "Consider clinical support, the EOC Clinician and pain management; advise the EOC Clinician about a tourniquet (CPP-042-AO)" },
        { scope: "ar", text: "Request clinical support, pain relief as per CPP-036-AR, and consult the EOC Clinician regarding treatment and transport (CPP-024-AR)" }
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. Pressure works", text: "The forearm wound stops pumping after 2 minutes of firm direct pressure and elevation. No tourniquet: dressing, bandage, keep the arm up, and keep checking. Discuss why most bleeding never needs a tourniquet." } },
      { box: { title: "2. A partial amputation", text: "The fingers are hanging by a strip of skin and bleeding heavily. Partial amputations may cause significant bleeding (CPP-042-AO principle). Discuss pressure, splinting the part in place, and what you tell the EOC Clinician." } },
      { box: { title: "3. A wound in the upper arm", text: "The bleeding is from just above the elbow. Discuss where the tourniquet goes now: proximal and as close as possible, never over the joint." } },
      { box: { title: "4. No ice", text: "There is no ice anywhere. The part still goes in a sealed water-tight bag; ice-cooled water is 'if possible' (CPP-042-AO). Discuss where you might find ice on the way." } }
    ] }
  ],

  /* ---------- Ambulance Responder version (CPP-024-AR Amputation and Haemorrhage - AR v2.0) ---------- */
  ar: {
    replace: [["CPP-042-AO", "CPP-024-AR"], ["CPP-013-AO", "CPP-036-AR"], ["Ambulance Officer", "Ambulance Responder"],
      ["AO1", "AR1"], ["AO2", "AR2"], ["AO crew", "AR crew"]],
    title: "Amputation and haemorrhage - AR",
    subtitle: "Walk-through scenario: 2-person volunteer AR crew",
    lead: "Life-threatening bleeding and two amputated fingers at harvest, for a two-person volunteer Ambulance Responder crew, with eight break points for discussion, skills practice and decisions. The bleeding and tourniquet care are the same as for AOs; ARs request clinical support and consult the EOC Clinician regarding treatment and transport.",
    protocol: {
      code: "CPP-024-AR", name: "Amputation and Haemorrhage - AR", version: "v2.0 (4 January 2019)", exported: "31 August 2026",
      also: [{ code: "CPPRO-004", name: "Arterial Tourniquet Application", version: "v1.1 (effective 29 December 2016)" },
             { code: "CPP-036-AR", name: "Pain Management - AR" }]
    },
    relatedCodes: ["CPP-042-AO"],
    footerNotes: ["This is a new training scenario written by DSY: the patient, story, observations, timings and EOC Clinician replies are fictional. Check it with your lead instructor.",
      "CPP-024-AR (2019) and CPPRO-004 (2016) are old documents: check the SAAS Clinical app for any newer version. Practise the tourniquet on a training limb only."]
  }
};
