/* Envenomation - AO walk-through scenario (Greg, 52, brown snake bite). Content only: the layout lives in
   /microlearning/shared/module.js. Rebuilt on 14 Oct 2026 from the original DSY scenario and checked against SAAS
   CPP-008-AO Envenomation - AO v5.0 (17 May 2019, exported 31.08.2026), CPPRO-022 Pressure Bandaging and
   Immobilisation v1.0 (effective 17 May 2019, review date 30 Nov 2024, now passed) and CPP-004-AO Basic Care and
   Life Support - AO. The story, scene, observations, crew roles, timings and EOC Clinician replies are a training
   scenario written by DSY. Points that are general teaching rather than protocol are labelled as such. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Envenomation - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Greg, 52: brown snake bite to the leg at a rural property, 1432",
  lead: "A suspected brown snake bite for a two-person volunteer AO crew, with eight break points for discussion, skills practice and decisions. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 75,

  protocol: {
    code: "CPP-008-AO", name: "Envenomation - AO", version: "v5.0 (17 May 2019)", exported: "31 August 2026",
    also: [{ code: "CPPRO-022", name: "Pressure Bandaging and Immobilisation", version: "v1.0 (17 May 2019, review date 30 Nov 2024)" },
           { code: "CPP-004-AO", name: "Basic Care and Life Support - AO", version: "v4.0 (8 December 2016)" }]
  },
  footerNotes: ["The patient, story, observations and EOC Clinician replies are a training scenario written by DSY. Check it with your lead instructor.",
    "CPPRO-022 is past its review date (30 Nov 2024). Check the SAAS Clinical app for any newer version.",
    "Toxinology Service SA (WCH): 08 8161 7000, contacted through the EOC Clinician."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 52 year old man has been bitten on the right calf by a brown snake while clearing scrub at a rural property near Wangary. He walked back to the house and his wife washed the bite. Port Lincoln Hospital is 30 minutes away." },
      { box: { title: "Learning objectives", items: [
        "Apply CPP-008-AO for an Australian native snake bite to a limb",
        "Request clinical support and consult the EOC Clinician early",
        "Apply a pressure bandage to a lower limb as in CPPRO-022",
        "Immobilise the limb and the whole patient (vacuum mattress, head elevated about 20 to 30 degrees)",
        "Keep patient exertion to a minimum from first contact to the hospital door",
        "Recognise deterioration and be ready for airway and cardiovascular collapse",
        "Deliver an ISBAR handover for a snake bite patient"
      ] } },
      { box: { title: "Required equipment", items: [
        "PPE, shears",
        "SAAS Snakebite Bandage kit (4 x 15 cm elasticised roller bandages), pen",
        "Large cardboard splint with triangular or 15 cm roller bandages (mandatory if no vacuum mattress)",
        "Vacuum mattress and pump, sheet; longboard",
        "Corpuls3 monitor/defibrillator",
        "Airway kit, BVM, suction, oxygen",
        "Green carry chair, stretcher, ePCR tablet, vomit bags"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 45 to 50 minutes; debrief 10 to 15 minutes",
        "Paramedic backup: about 50 minutes",
        "Port Lincoln Hospital: about 30 minutes",
        "MedSTAR (air): about 90 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, history, pressure bandage, clinical decisions, EOC Clinician calls",
        "Driver (AO2): scene safety, Corpuls3 and observations, request for clinical support, vacuum mattress and extrication equipment"
      ] } }
    ] },

    { title: "Pre-brief: the AO envenomation protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { box: { title: "Australian native snake bite (CPP-008-AO)", items: [
        "Basic care",
        "Request clinical support",
        "Ensure minimal patient exertion",
        "Do not apply a tourniquet or wash the bite site. If a tourniquet is already on, consult the EOC Clinician, who may contact Toxinology Service SA",
        "Bite on a limb: apply a pressure bandage and immobilise the limb",
        "Bite to the head or torso: cover the bite area with a simple dressing",
        "Immobilise the patient with a vacuum mattress if available, head elevated about 20 to 30 degrees where possible",
        "Provide transport and notify the receiving facility"
      ] } },
      { box: { title: "Why it matters (protocol principle)", items: [
        "Snakebite is the most common envenoming accident in SA and fatalities can occur",
        "The most significant immediate risk is early cardiovascular collapse leading to cardiac arrest",
        "Venom can also cause paralysis, muscle breakdown, renal damage and impaired clotting",
        "Venom is thought to travel mainly in the lymphatics: muscle movement pushes it towards the central circulation (CPPRO-022)"
      ] } },
      { box: { title: "Precautions and contraindications (CPPRO-022)", tone: "warn", items: [
        "Be continuously alert for airway and cardiovascular collapse, hypoventilation and apnoea; be ready to ventilate with a BVM",
        "Cardiac monitoring for every patient, with defibrillation available",
        "Do not elevate a bitten limb: keep the bitten area below the heart where practical",
        "Do not remove a pressure bandage or tourniquet already applied. Severe limb pain, or badly impaired circulation at the cuticle beds: consult the EOC Clinician, who contacts Toxinology",
        "Do not wash or clean the bite: swabbing for venom identification is highly sensitive to venom on the skin"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "A patient who looks well can deteriorate quickly: treat every native snake bite as potentially serious",
        "Washing, ice and other bystander first aid do not change your management: document it and move on",
        "Don't go looking for the snake"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "Saturday in January, 1432. Hot and dry, 36 degrees. You and your crew partner are paged from Port Lincoln to a rural property at Wangary: about 25 minutes." },
      { box: { title: "MDT display", items: [
        "Priority 2, snake bite, 52 year old male",
        "Bitten on the right lower leg about 15 minutes ago. Brown snake about 1.5 m",
        "Conscious, breathing, ambulant. Now sitting on the back verandah",
        "Caller: wife, on scene",
        "Gravel driveway 200 m to the homestead. Dogs will be secured"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What stands out on the MDT?", "What are your main concerns?", "What kit do you want ready before you arrive?", "Who is doing what?", "Clinical support is 50 minutes away and the hospital 30. What's your plan?"],
        expected: [
          "Australian native snake bite: potentially life threatening even if he looks well. Fatalities can occur (CPP-008-AO)",
          "He has been walking: minimal exertion from the moment you arrive",
          "Kit: snakebite bandage kit, pen, shears, splint, vacuum mattress on the stretcher, longboard or carry chair, Corpuls3",
          "Request clinical support early (protocol): the driver can call while en route or on arrival",
          "Roles: clinician takes the patient and the bandage, driver takes the monitor, the calls and the extrication kit"
        ],
        teaching: ["\"Ambulant\" on the MDT does not mean he should keep walking", "Know your transport and backup times before you arrive"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "The 25-minute drive is your planning time. By the time you pull up, the bandages are out, the vacuum mattress is on the stretcher and both of you know the plan.",
        decisions: [{ q: "Which of these does CPP-008-AO ask for in every Australian native snake bite?", options: [
          "Request clinical support",
          "Wash the bite to remove venom",
          "Elevate the bitten limb" ], answer: 0,
          why: "CPP-008-AO: request clinical support and ensure minimal exertion. Do not wash the bite site; CPPRO-022: do not elevate a bitten limb." }],
        cards: [{ q: "What is the most significant immediate risk after an Australian native snake bite?", a: "Early cardiovascular collapse leading to cardiac arrest (CPP-008-AO)." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "1457. A weatherboard homestead with a wrap-around verandah, three steps down to the yard. Greg sits in a deck chair on the back verandah with his right leg on a footstool. His wife Denise stands beside him, anxious. A damp cloth lies on his right calf. The dog is penned. No snake in sight." },
      { breakpoint: { title: "Doorway, first impression", type: "Discussion",
        prompts: ["What do you see before you reach him?", "Any scene safety concerns?", "First clinical impression?", "Notice anything about the first aid?"],
        expected: [
          "Scene: the snake may still be nearby. Watch the ground, wear boots, don't search for it",
          "Conscious and talking; pale, mild sweating, no obvious breathing difficulty",
          "Pale and sweaty could be anxiety or early envenoming: assume envenoming",
          "Damp cloth: the bite has been washed. Don't clean it further; document it",
          "He is on a raised verandah: plan how to move him without him walking"
        ],
        teaching: ["Start the assessment before you touch him: conscious state, breathing, colour, posture", "Bystander first aid is common: acknowledge it, document it, focus on what you control"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "Families often wash, ice or cut a bite. None of it changes your protocol. Reassure them, document it, and get on with the bandage and keeping him still.",
        decisions: [{ q: "The bite has already been washed. What do you do about the site?", options: [
          "Clean it properly now, since it has been touched anyway",
          "Leave it: don't wash or clean it further, document what was done, and bandage over it",
          "Ice it before bandaging" ], answer: 1,
          why: "CPP-008-AO: do not wash the bite site. CPPRO-022: the bitten area should not be washed or cleaned in any way, as this may hinder swabbing for venom identification." }]
      } }
    ] },

    { title: "Patient contact and primary survey", blocks: [
      { text: "\"I was clearing scrub near the water tank and felt a sharp sting on my right calf. Saw a brown snake, maybe a metre and a half, slide off into the grass. I walked back to the house. Denise put a cold cloth on it and cleaned it up. I'm feeling a bit crook now: headache, and I feel like I might be sick.\"" },
      { box: { title: "History (SAMPLE)", items: [
        "Signs and symptoms: pain at the bite, developing headache, mild nausea, mild sweating",
        "Allergies: nil known",
        "Medications: perindopril 5 mg daily",
        "Past history: hypertension",
        "Last intake: sandwich and water about an hour ago",
        "Events: bitten at about 1415; walked about 100 m to the house; bite washed and a cold cloth applied; no bandage"
      ] } },
      { table: { title: "Initial observations (1500)", table: { head: ["HR", "BP", "RR", "SpO2", "Temp", "GCS", "BGL", "Pupils", "ECG"], rows: [["92", "138/82", "18", "98% (air)", "36.8", "15", "6.2", "3 mm, equal, reactive", "Sinus rhythm"]] } } },
      { box: { title: "Bite site and systemic screen", items: [
        "Two small puncture marks on the right outer calf, partly obscured by washing; mild local swelling; no bleeding",
        "Normal sensation and pulses in the right foot",
        "No drooping eyelids, double vision, slurred speech or difficulty swallowing",
        "No bleeding from gums or other sites; no generalised muscle pain",
        "Headache developing; nausea, no vomiting yet; mild sweating"
      ] } },
      { breakpoint: { title: "Initial observations and monitoring", type: "Practical skill",
        prompts: ["Driver: set up the Corpuls3. Why is monitoring essential here?", "What does a heart rate of 92 tell you?", "Clinician: what do you need to know about the snake and the bite?", "Is his oxygenation adequate?"],
        expected: [
          "Cardiac monitoring with defibrillation available for every patient (CPPRO-022). Watch the trends from this baseline",
          "HR 92 could be anxiety or early envenoming: you can't tell yet, so treat it as significant",
          "Headache and nausea after a snake bite: concerning until proven otherwise",
          "Key history: time of bite, snake description, how far he walked, first aid given, how the symptoms are changing",
          "SpO2 98% on air: adequate. Keep watching for hypoventilation (CPPRO-022)"
        ],
        teaching: ["Baseline obs are your early warning system", "Record the time of the bite precisely: the hospital needs it", "Screen for paralysis and bleeding and document it"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "The monitor goes on early and stays on. A heart rate that climbs from 92 to 110 over ten minutes tells you more than any single reading.",
        decisions: [{ q: "Greg says he's fine to walk to the ambulance. What do you say?", options: [
          "Fine, it's only 15 metres",
          "No: he stays as still as possible and the crew moves him",
          "He can walk once the bandage is on" ], answer: 1,
          why: "CPP-008-AO: ensure minimal patient exertion. CPPRO-022: muscle movement promotes lymphatic flow, moving venom towards the central circulation. Do not allow the patient to walk to the stretcher." }]
      } }
    ] },

    { title: "Working diagnosis and the protocol", blocks: [
      { text: "Working diagnosis: suspected brown snake envenoming, bite to the right lower limb, with early symptoms (headache, nausea, tachycardia)." },
      { breakpoint: { title: "Protocol and working diagnosis", type: "Decision making",
        prompts: ["Which protocol and which pathway?", "Is he time critical?", "Does the washed bite change your management?", "Clinical support and the EOC Clinician: when, and what for?", "What could go wrong in the next 30 minutes?"],
        expected: [
          "CPP-008-AO, Australian native snake, bite on a limb",
          "Yes: potentially life threatening, with early symptoms",
          "The washed bite does not change prehospital management. Don't clean it further; tell the hospital",
          "Request clinical support now (the paramedic is 50 minutes away). Consult the EOC Clinician early with the picture and the plan",
          "Risks: cardiovascular collapse and cardiac arrest, paralysis, bleeding (CPP-008-AO); hypoventilation and apnoea (CPPRO-022)"
        ],
        teaching: ["Clinical support (the paramedic) and the EOC Clinician are two different calls: make both early", "Document the timeline: bite, walking, first aid, symptoms"],
        realJob: "A 60-second call puts the system on notice: \"52 year old male, suspected brown snake bite to the right lower leg at about 1415. Symptomatic: headache, nausea, HR 92. Bite washed by his wife. Applying a pressure bandage now. Port Lincoln is 30 minutes away.\"",
        decisions: [
          { q: "Which pathway applies to Greg?", options: [
            "Pressure bandage and immobilise the limb, then immobilise the whole patient",
            "Simple dressing over the bite only",
            "Ice and rest the area" ], answer: 0,
            why: "CPP-008-AO: a native snake bite on a limb gets a pressure bandage and limb immobilisation, then whole-patient immobilisation with a vacuum mattress if available. A simple dressing is for the head or torso; ice is for redback spider bites." },
          { q: "What does \"request clinical support\" mean here?", options: [
            "The same as consulting the EOC Clinician",
            "Asking for a higher clinical level (the paramedic) to attend, as well as consulting the EOC Clinician",
            "Only needed if he arrests" ], answer: 1,
            why: "The protocol asks you to request clinical support for every native snake bite. The EOC Clinician is a separate consult for advice." }],
        cards: [{ q: "When does a pressure bandage apply after a native snake bite to a limb?", a: "Always, whether or not there are signs of envenoming (CPPRO-022)." }]
      } },
      { box: { title: "Clinical decision point", tone: "warn", items: [
        "Suspected native snake envenoming, right lower limb, symptomatic",
        "Clinical support requested; EOC Clinician consulted",
        "Minimal exertion: no walking, no standing",
        "Pressure bandage, toes to groin; circle the bite on the bandage",
        "Immobilise: vacuum mattress (whole body), head up about 20 to 30 degrees",
        "Transport to Port Lincoln and notify the receiving facility"
      ] } }
    ] },

    { title: "Treatment phase", blocks: [
      { text: "Both crew members practise the pressure bandage on each other now." },
      { box: { title: "Pressure bandage (CPPRO-022)", tiles: true, steps: [
        { t: "Expose", text: "Expose the whole limb to the groin. Remove footwear and jewellery. Cut clothing with shears rather than moving the limb." },
        { t: "Locking turn", text: "Start at the toes with a locking turn, covering all but the cuticle beds." },
        { t: "Bandage up", text: "Work up towards the groin. Each loop covers 2/3 of the previous one, pulled moderately tight. Don't over-tighten." },
        { t: "Next roll", text: "Hold the end of the first firmly; start the next roll from that point with another locking turn." },
        { t: "Finish", text: "Stop at the groin. Don't go back down the limb: cut any spare and tape it to the previous turn." },
        { t: "Mark and check", text: "Circle the bite on the bandage with a pen. Firm as for a sprained ankle: hard to get two fingers under it. Only the cuticle beds visible." }
      ] } },
      { box: { title: "Immobilise", items: [
        "Vacuum mattress readily available: it is the preferred splint for the whole body (CPPRO-022)",
        "No vacuum mattress: a padded cardboard splint on the limb, secured with triangular or roller bandages, is mandatory",
        "Do not remove his clothing before he goes into the vacuum mattress",
        "Keep the bitten leg still and below the level of the heart where practical; never elevate it"
      ] } },
      { breakpoint: { title: "Pressure bandage and immobilisation", type: "Practical skill",
        prompts: ["Bandage your partner's leg now. Where do you start, and where do you finish?", "Check your partner's bandage: how firm is it?", "Where is the bite marked?", "The bandage feels tight and he says his leg really hurts. What now?", "Denise asks: \"Should I have left it alone?\" What do you say?"],
        expected: [
          "Start at the toes with a locking turn; finish at the groin; each loop covers 2/3 of the last",
          "Firm as for a sprained ankle: difficult to get two fingers easily under it",
          "Bite circled with a pen on the bandage",
          "Severe pain or badly impaired circulation at the cuticle beds: do not loosen or remove it. Consult the EOC Clinician, who contacts Toxinology. Consider analgesia (CPPRO-022)",
          "To Denise: reassure her. Calling quickly was right; the crew will take it from here"
        ],
        teaching: ["The most common error is a bandage that is too loose or doesn't cover the whole limb", "Once on, the bandage stays on", "Practise until your hands know it: you don't want to learn it on a dark verandah"],
        teachingNote: "The first two points are general teaching; the rest is from CPPRO-022.",
        realJob: "The pressure bandage and keeping him still are your treatment. Everything else supports them.",
        decisions: [{ q: "You've finished at the groin and have half a roll left. What do you do?", options: [
          "Wrap back down the leg to use it up",
          "Cut it and tape it to the previous turn",
          "Wrap it twice more over the bite" ], answer: 1,
          why: "CPPRO-022: do not continue back down the limb if extra bandage is left. Cut and tape it to the previous turn." }],
        cards: [{ q: "How firm should the pressure bandage be?", a: "About as firm as for a sprained ankle: difficult to get two fingers easily under it (CPPRO-022)." }]
      } }
    ] },

    { title: "Reassessment and escalation", blocks: [
      { table: { title: "Observations", table: { head: ["", "1500", "1522 (10 min after bandage)"], rows: [
        ["HR", "92", "104"], ["BP", "138/82", "130/78"], ["RR", "18", "20"], ["SpO2", "98% (air)", "97% (air)"], ["GCS", "15", "15"],
        ["Symptoms", "Headache, nausea", "Worse headache, vomited once, more sweating"],
        ["Paralysis or bleeding signs", "None", "None"], ["Cuticle beds", "Pink", "Pink"]
      ] } } },
      { text: "In the scenario, the EOC Clinician is updated at 1524: transport to Port Lincoln now and notify the hospital. The paramedic will meet you on the way if timing allows.", muted: true },
      { breakpoint: { title: "Reassessment and escalation decision", type: "Decision making",
        prompts: ["Compare the two sets of obs. Which way is he heading?", "What do you tell the EOC Clinician?", "Do you wait for the paramedic or MedSTAR?", "What do you prepare for during transport?"],
        expected: [
          "Rising HR, slightly lower BP, new vomiting: he is getting worse",
          "Update: trends, vomiting, bandage and immobilisation done, transport plan and time to hospital",
          "Port Lincoln by road (30 minutes) is faster than the paramedic (50) or MedSTAR (90): load and go, notify the hospital",
          "Prepare for airway and cardiovascular collapse, hypoventilation and apnoea: suction, BVM, defibrillation ready (CPPRO-022)",
          "Head elevated about 20 to 30 degrees in the vacuum mattress makes vomiting easier to manage (CPPRO-022)"
        ],
        teaching: ["Trending is everything: the direction of change tells you the story", "Vomiting after a snake bite suggests systemic envenoming (general teaching)", "Weigh transport time against backup time"],
        realJob: "You may only get two sets of obs before you move. If they are heading the wrong way, move faster. Don't wait for an arrest to decide this is serious.",
        decisions: [{ q: "He has vomited and his HR is climbing. The hospital is 30 minutes away, the paramedic 50. What now?", options: [
          "Wait on scene for the paramedic",
          "Transport now, update the EOC Clinician and notify the hospital",
          "Loosen the bandage to check the bite" ], answer: 1,
          why: "CPP-008-AO: provide transport and notify the receiving facility. Clinical support is already requested and can meet you. Never remove or loosen the bandage (CPPRO-022)." }]
      } }
    ] },

    { title: "Extrication and transport", blocks: [
      { box: { title: "Getting Greg to the stretcher", items: [
        "He does not walk or stand (CPPRO-022)",
        "Longboard or carry chair: either is acceptable. The crew chooses by how many helpers are there to lift and how close the stretcher can get to the verandah (DSY lead instructor)",
        "Whichever you use, move him as little as possible, in a timely way, supporting the bandaged leg",
        "Vacuum mattress on the stretcher with a sheet. Move him onto it keeping him and the limb still; raise the head end to about 20 to 30 degrees so the mattress conforms, then remove the air (CPPRO-022)",
        "Don't remove his clothing first"
      ] } },
      { box: { title: "Transport", items: [
        "Clinician in the back: Corpuls3 on, suction, BVM and vomit bags within reach",
        "Watch for: rising HR, falling BP, drooping eyelids, difficulty swallowing or speaking, slowing breathing, drowsiness, bleeding",
        "Long transport: the vacuum mattress can be tilted slightly to take pressure off; use the air conditioning if he's hot (CPPRO-022)",
        "Needs respiratory or cardiac support, or becomes claustrophobic: open the valve and undo the straps (CPPRO-022)",
        "Smooth driving (general teaching)"
      ] } },
      { breakpoint: { title: "Extrication and transport planning", type: "Practical skill",
        prompts: ["How do you get Greg from the verandah to the stretcher without him taking a step?", "Longboard or carry chair here? What decides it?", "Walk me through the vacuum mattress.", "What are you ready for over the next 30 minutes?", "What would make you more worried?"],
        expected: [
          "No walking. Longboard or carry chair, chosen by helpers available and how close the stretcher can get: minimal movement, done in a timely way",
          "Vacuum mattress as the whole-body splint, head end raised about 20 to 30 degrees, clothing on",
          "Airway and ventilation support ready; defibrillation available",
          "More worried: rising HR, falling BP, signs of paralysis, drowsiness, bleeding. Update the EOC Clinician",
          "If he becomes unresponsive with absent or abnormal breathing: open the vacuum mattress and commence resuscitation (CPP-004-AO)"
        ],
        teaching: ["Extrication is where crews lose discipline: \"I can walk\" gets a polite no", "Thirty minutes is a long time with a deteriorating patient: have the worst-case plan ready"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "The patient says \"I can walk.\" You say \"We need you completely still.\" His wife offers to help him down the steps; you politely take over.",
        decisions: [{ q: "Halfway to Port Lincoln Greg becomes drowsy and his breathing slows. What do you do first?", options: [
          "Keep driving and recheck in 10 minutes",
          "Support his airway and breathing (BVM if needed), opening the vacuum mattress for access, and consult the EOC Clinician",
          "Remove the pressure bandage" ], answer: 1,
          why: "CPPRO-022: watch for and manage hypoventilation and apnoea; be ready to ventilate with a BVM; the vacuum mattress can be quickly deflated for respiratory or cardiac support. Never remove the bandage." }],
        cards: [{ q: "What angle should the head end be raised to in the vacuum mattress?", a: "About 20 to 30 degrees (CPP-008-AO, CPPRO-022)." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { text: "1605, Port Lincoln Hospital ED. The team has been notified and is waiting." },
      { table: { title: "Observations", table: { head: ["", "1500", "1522", "1600"], rows: [
        ["HR", "92", "104", "108"], ["BP", "138/82", "130/78", "126/76"], ["RR", "18", "20", "20"], ["SpO2", "98% (air)", "97% (air)", "97% (air)"], ["GCS", "15", "15", "15"]
      ] } } },
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Officer from [station]. This is Greg Thompson, 52.\""],
        ["S", "\"Suspected brown snake bite to the right lower leg at about 1415. He's symptomatic: vomiting, headache and a rising heart rate.\""],
        ["B", "\"Bitten clearing scrub at Wangary; snake about 1.5 metres. He walked about 100 metres before we arrived. His wife washed the bite. Hypertension, on perindopril. No allergies.\""],
        ["A", "\"On arrival HR 92, BP 138/82, headache and nausea. Pressure bandage toes to groin, vacuum mattress with the head up about 20 degrees. Since then HR 104 then 108, BP 126/76, vomited once. RR 20, SpO2 97% on air, GCS 15. No signs of paralysis or bleeding. Cuticle beds pink throughout.\""],
        ["R", "\"The bite was washed, so swabbing may be affected. The bandage has not been removed; the bite is circled on it. Clinical support was requested and the EOC Clinician consulted.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Deliver your ISBAR to me now as the receiving clinician.", "What does the ED need to know specifically for a snake bite?", "What do you say about the washed bite and the bandage?"],
        expected: ["Time of bite, snake description, how far he walked, first aid given, symptom timeline, obs trend", "The bite was washed: swabbing for venom may be affected", "The bandage is still on and the bite is circled on it", "Trends: HR 92, 104, 108"],
        teaching: ["A good ISBAR takes 60 to 90 seconds", "Practise it out loud during transport"],
        realJob: "A clear handover gets him prioritised. If you lose the timeline, critical information is lost: jot the times down during transport.",
        decisions: [{ q: "The ED nurse asks you to take the bandage off so they can see the bite. What do you say?", options: [
          "Take it off: you're at hospital now",
          "Explain it hasn't been removed, the bite is circled on it, and leave its removal to the hospital team",
          "Loosen it a little" ], answer: 1,
          why: "CPPRO-022: do not remove pressure bandages already applied. Hand over that it is on and where the bite is marked (general teaching for the handover)." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "What were your priorities after reading the MDT? Did they change on arrival?",
        "How confident were you with the pressure bandage? What would you change?",
        "When did you request clinical support and consult the EOC Clinician?",
        "When did you recognise he was getting worse, and what told you?",
        "How did you choose between the longboard and the carry chair? Was there a moment he could have exerted himself?",
        "How did you handle Denise and the washed bite?",
        "What was your plan if he had arrested in the back?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Every Australian native snake bite is potentially life threatening: early cardiovascular collapse is the biggest risk",
        "Request clinical support and consult the EOC Clinician early",
        "Minimal exertion: no walking, no standing. Move him as little as possible, in a timely way",
        "Pressure bandage from the toes or fingers to the groin or armpit, firm as for a sprained ankle, bite circled, never removed",
        "Don't wash the bite, don't apply a tourniquet, don't elevate the limb",
        "Vacuum mattress with the head up about 20 to 30 degrees; monitoring and defibrillation always available"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. Bite to the torso", text: "Greg is bitten on the left flank. No pressure bandage: cover the bite with a simple dressing (CPP-008-AO). Keep him and the bitten area as still as possible and, with airway access in mind, position him to reduce lymphatic drainage to the central circulation (CPPRO-022). Vacuum mattress, clinical support, transport and notify." } },
      { box: { title: "2. Found in the paddock", text: "Greg is 200 m from the house in long grass and hasn't moved since the bite. The crew goes to him with the kit; bandage and immobilise where he lies, then carry him out. Discuss the extra work for the crew, and why it is better for you to go to him than for him to come to you." } },
      { box: { title: "3. Cardiovascular collapse", text: "During transport Greg becomes drowsy, HR 130, BP 88/50, then unresponsive with no normal breathing. Open the vacuum mattress valve and undo the straps (CPPRO-022), commence resuscitation (CPP-004-AO) and follow Cardiac Arrest (Adult) - AO, CPP-002-AO. Discuss: was the defibrillator ready, and who does what?" } },
      { box: { title: "4. Child bitten on the hand", text: "An 8 year old bitten on the right hand near a woodpile; the parents describe a brown snake. The same protocol applies: pressure bandage from the fingers to the armpit, immobilise, clinical support, transport and notify. Reassurance and age-appropriate communication matter. Discuss how you keep a frightened child still." } }
    ] }
  ]
};
