/* Chest Pain - AO walk-through scenario (Graham, 62). Content only: the layout lives in /microlearning/shared/module.js.
   Rebuilt on 14 Oct 2026 from the original DSY scenario and checked against SAAS CPP-007-AO Chest Pain - AO v4.2
   (23 April 2020, exported 31.08.2026), CPP-004-AO Basic Care and Life Support - AO v4.0, CPPRO-008 Medication Checks
   and CPPRO-009 Oral Medication Administration (each v1.0). Three points come from the DSY lead instructor, not the
   protocol, and are labelled: GTN may be the 300 microg tablet or the 400 microg spray (SAAS is changing back to the
   spray); a patient who has used their own GTN can have the first crew dose if BP and HR are within the limits, then
   the EOC Clinician is consulted for a plan; adequate oxygenation means SpO2 above 94% on room air, or oxygen via
   nasal cannula to bring it above 94%. The story, scene, observations, crew roles, timings and EOC Clinician replies
   are a training scenario written by DSY. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Chest Pain - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Graham, 62: chest pain not settling with his own GTN, rural property, 2115",
  lead: "A suspected cardiac chest pain call for a two-person volunteer AO crew, with eight break points for discussion, skills practice and decisions. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 90,

  protocol: {
    code: "CPP-007-AO", name: "Chest Pain - AO", version: "v4.2 (23 April 2020)", exported: "31 August 2026",
    also: [{ code: "CPP-004-AO", name: "Basic Care and Life Support - AO", version: "v4.0 (8 December 2016)" },
           { code: "CPPRO-008, 009", name: "Medication Checks, Oral Medication Administration", version: "each v1.0 (5 July 2017)" }]
  },
  footerNotes: ["The patient, story, observations and EOC Clinician replies are a training scenario written by DSY. Points marked \"DSY lead instructor\" are local guidance, not protocol text. Check it with your lead instructor."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 62 year old man with known angina has central chest pain spreading to his left arm, at a rural property 35 minutes from the nearest hospital. He has his own prescribed GTN spray, and it has not settled the pain." },
      { box: { title: "Learning objectives", items: [
        "Recognise the signs and symptoms of cardiac ischaemia, including presentations without classic chest pain",
        "Work through basic care and the primary survey, with ECG monitoring early",
        "Give oral aspirin 300 mg, and check the GTN limits (systolic BP, pulse rate, PDE-5 inhibitors) before every dose",
        "Ask about PDE-5 inhibitors clearly and know the time windows (24 and 48 hours)",
        "Monitor vital signs every 3 to 5 minutes while giving GTN",
        "Know when to consult the EOC Clinician, and consider clinical support",
        "Deliver a structured ISBAR handover",
        "Work as a crew with clear Clinician and Driver roles"
      ] } },
      { box: { title: "Required equipment", items: [
        "Corpuls3 monitor (ECG, SpO2, NIBP) with defibrillation pads, manual BP cuff and stethoscope",
        "BGL monitor, thermometer, ePCR tablet",
        "Aspirin 300 mg; GTN as 300 microg sublingual tablets or the 400 microg spray (see the pre-brief)",
        "Oxygen: nasal cannula, face mask, non-rebreather mask, tubing",
        "Bag-valve-mask and suction (standby)",
        "Red Kit, Blue Kit, Ambulance Response Bag",
        "Green carry chair, stretcher, blankets (winter night), PPE"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through about 65 minutes; debrief 10 to 15 minutes",
        "Nearest ICP: 55 minutes",
        "Regional hospital: 35 minutes",
        "MedSTAR retrieval: to be confirmed",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, history, medications, clinical decisions, ePCR, EOC Clinician calls, team leader",
        "Driver (AO2): scene safety, Corpuls3 and observations (manual pulse, RR and BP), equipment, carry chair and stretcher, ongoing monitoring"
      ] } }
    ] },

    { title: "Pre-brief: the AO chest pain protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario. Confirm everyone can find CPP-007-AO, then let the scenario drive the learning." },
      { steps: [
        { t: "Basic care including ECG monitoring" },
        { t: "Monitor vital signs every 5 minutes" },
        { t: "Consider clinical support" },
        { t: "Oral aspirin 300 mg, unless allergic", text: "SAAS aspirin is chewed before it is swallowed (CPPRO-009)." }
      ] },
      { table: { title: "GTN limits: all must apply", table: { head: ["Check", "GTN previously prescribed", "GTN not previously prescribed"], rows: [
        ["Systolic BP", "100 mmHg or more", "Above 100 mmHg"],
        ["Pulse rate", "60 to 120", "60 to 120"],
        ["PDE-5 inhibitors", "None within 24 hrs (sildenafil, vardenafil, avanafil) or 48 hrs (tadalafil)", "Same"],
        ["Dose", "Sublingual GTN 300 microg; repeat every 5 mins prn if pain persists and the limits hold; total max 3 doses", "Only as advised by the EOC Clinician: same dose and limits, or as directed"],
        ["Vital signs", "Every 3 to 5 minutes", "Every 3 to 5 minutes"]
      ] } } },
      { box: { title: "Consult the EOC Clinician if", tone: "warn", items: [
        "BP or HR fall outside the limits at any time",
        "Chest pain remains unresolved",
        "Chest pain that had resolved returns",
        "Then provide transport and notify the receiving facility"
      ] } },
      { box: { title: "DSY lead instructor guidance (not protocol text)", items: [
        "GTN form: SAAS is changing from the 300 microg tablet back to the 400 microg spray. Either is acceptable. The current protocol still says 300 microg per dose",
        "Patient has already used their own GTN: if BP and HR are within the limits, the crew can give the first dose, then consult the EOC Clinician for a plan",
        "Adequate oxygenation: SpO2 above 94% on room air, or add oxygen via nasal cannula to bring it above 94%"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "Have the defibrillation pads within reach throughout: the protocol warns of life-threatening changes to the heart rhythm",
        "Reliever GTN that has not worked, or pain worse than usual angina, is a warning sign",
        "Say the GTN checks out loud so your partner can confirm them"
      ] } },
      { box: { title: "Safety brief", items: [
        "This is a walk-through: pause at each break point for discussion",
        "Anyone can call \"real world\" to stop for a genuine safety concern",
        "The goal is operational decision making, not perfection"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "Winter, 2115. Dark and cold. You and your crew partner are paged to a rural farming property." },
      { box: { title: "MDT display", items: [
        "Priority 2, chest pain, cardiac history",
        "62 year old male, chest pain for 30 minutes",
        "Known angina, has own GTN. Pain not resolving with own GTN. Wife on scene",
        "Access: sealed road then 2 km dirt. Gate open, lights on",
        "Backup: nearest ICP 55 minutes. MedSTAR to be confirmed",
        "Destination: regional hospital, 35 minutes"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What does the MDT tell you about this patient and the urgency?", "His own GTN has not settled the pain. What does that suggest?", "What kit goes to the door, and who carries what?", "What is your plan if he goes into cardiac arrest?", "The ICP is 55 minutes away and the hospital 35. What is your clinical support plan?"],
        expected: [
          "Suspect cardiac ischaemia: the protocol says to suspect it unless there is an obvious alternative",
          "Pain not settling with his own GTN suggests this is different from his usual angina: time critical (\"time is muscle\")",
          "Driver: Corpuls3 powered on with defib pads ready. Clinician: Red Kit (aspirin, GTN), Response Bag, oxygen",
          "Cardiac arrest plan agreed before arrival",
          "Consider clinical support early (protocol), knowing the hospital is closer than the ICP"
        ],
        teaching: ["The MDT gives you the working picture before you arrive", "Allocating kit en route saves time at the door", "Always have a cardiac arrest plan: cardiac ischaemia carries a risk of life-threatening rhythm changes (CPP-007-AO)"],
        realJob: "The drive gives you 10 to 15 minutes of planning time. Use it: roles, kit, the worst case. The crew that arrives with a plan works faster than the crew that plans on the doorstep.",
        decisions: [{ q: "Chest pain, cardiac history, own GTN not working. What is the main job on the drive?", options: [
          "Plan roles, kit and the cardiac arrest contingency",
          "Rehearse the hospital handover",
          "Look up the hospital's phone number" ], answer: 0,
          why: "En route is your planning window. The protocol warns that cardiac ischaemia can cause life-threatening rhythm changes, so the monitor, defib pads and roles need to be ready at the door." }],
        cards: [{ q: "What does CPP-007-AO say to suspect as the cause of chest pain?", a: "Cardiac ischaemia, unless there is an obvious alternative." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "2132. The gate is open. A well-lit farmhouse; a woman waves from the open front door. Through the doorway you see a man sitting upright in a recliner, pale and still, one hand pressed flat on his sternum. A GTN spray sits on the armrest." },
      { breakpoint: { title: "Doorway, first impression", type: "Discussion",
        prompts: ["What do you see from the doorway?", "Is the scene safe?", "What do his posture and colour tell you?", "What is your immediate priority?"],
        expected: [
          "Scene safe: domestic residence, good lighting, no hazards",
          "Conscious, upright, pale, hand on his chest: high concern for cardiac ischaemia",
          "GTN spray beside him: he has been treating himself and it has not worked",
          "Priority: introduce yourselves, basic care and primary survey, monitoring on early",
          "His wife is a useful historian, and anxious: give her a job and some reassurance"
        ],
        teaching: ["The doorway look takes seconds: position, colour, breathing effort, conscious state", "Scene safety includes the emotional environment: anxious family"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "The first ten seconds at the door set the tone. Walk in calm and with purpose: it reassures the patient, the family and your partner.",
        decisions: [{ q: "Pale, still, hand pressed on his sternum, own GTN beside him. What fits best?", options: ["Cardiac ischaemia until proven otherwise", "Anxiety", "Indigestion"], answer: 0,
          why: "CPP-007-AO: suspect cardiac ischaemia unless there is an obvious alternative. Pressure in the chest and failed self-treatment fit; nothing here is an obvious alternative." }]
      } }
    ] },

    { title: "Patient contact and primary survey", blocks: [
      { text: "Graham, 62. Alert and oriented, speaking in full sentences, distressed and sweaty. \"I've got this heavy pressure right across my chest. It's going down my left arm. Started about 40 minutes ago while I was watching the footy.\"" },
      { box: { title: "History (Graham and his wife)", items: [
        "Heavy, weight-like pressure; started at rest about 40 minutes ago",
        "Centre of the chest, into the left arm and a little into the jaw",
        "\"Worse than my usual angina. Normally my spray fixes it. Not tonight.\"",
        "Used his own GTN spray twice over 30 minutes: a little relief, then it came straight back",
        "Nausea (no vomiting), sweating, mildly short of breath",
        "History: angina (4 years), hypertension, high cholesterol",
        "Medications: own GTN spray, aspirin 100 mg daily, atorvastatin, metoprolol, perindopril",
        "Allergies: nil known",
        "PDE-5 inhibitors: \"No, I don't take any of those.\" His wife agrees",
        "Last meal: dinner at 1830"
      ] } },
      { table: { title: "Initial observations (2135)", table: { head: ["HR", "BP", "SpO2", "RR", "Temp", "BGL", "GCS", "Pain", "ECG"], rows: [["92, regular", "138/86", "94% (air)", "20", "36.4", "7.2", "15", "8/10", "Sinus rhythm"]] } } },
      { breakpoint: { title: "Initial observations and monitoring", type: "Practical skill",
        prompts: ["Driver: set up the Corpuls3. What goes on?", "Which observations are abnormal?", "Why does ECG monitoring matter for this patient?", "SpO2 is 94% on air. What do you do?", "BP 138/86 and HR 92: why do these matter for what comes next?"],
        expected: [
          "Basic care including ECG monitoring (CPP-007-AO): ECG, SpO2 and NIBP on; manual pulse and RR as well",
          "Vital signs every 5 minutes, then every 3 to 5 minutes once GTN starts",
          "ECG early: he is at risk of life-threatening rhythm changes",
          "SpO2 94% is not above 94%: add oxygen via nasal cannula to bring it above 94% (DSY lead instructor guidance)",
          "Systolic 138 (100 or more) and HR 92 (60 to 120): within the GTN limits",
          "Pain 8/10 drives the urgency"
        ],
        teaching: ["Every observation now is your baseline for the GTN decisions", "Adequate oxygenation is one of the primary treatments in the protocol", "Systolic BP and pulse rate are the gatekeepers for GTN: check them before every dose"],
        realJob: "The Driver connects the monitor while the Clinician is still talking to the patient. Parallel tasking is what makes a two-person crew fast.",
        decisions: [{ q: "SpO2 is 94% on room air. What now?", options: [
          "Nothing: 94% is fine",
          "Oxygen via nasal cannula to bring it above 94%",
          "Non-rebreather at 15 L/min straight away" ], answer: 1,
          why: "Adequate oxygenation is a primary treatment (CPP-007-AO). DSY lead instructor guidance: adequate means above 94% on room air; if not, add oxygen via nasal cannula to bring it above 94%." }]
      } }
    ] },

    { title: "Working diagnosis and the protocol", blocks: [
      { text: "Working diagnosis: suspected cardiac ischaemia (acute coronary syndrome). Central pressure spreading to the arm and jaw, nausea and sweating, worse than his usual angina and not settled by his own GTN." },
      { breakpoint: { title: "Protocol and working diagnosis", type: "Decision making",
        prompts: ["Which protocol are you working under?", "What is your working diagnosis, and why?", "Could this be something else?", "He has used his own GTN twice. How does that change things?", "Walk through the criteria: aspirin? GTN?"],
        expected: [
          "Chest Pain - AO, CPP-007-AO",
          "Suspected cardiac ischaemia: classic symptoms, no obvious alternative",
          "Other causes are possible (muscle, lung, gut), but the protocol says suspect cardiac ischaemia unless there is an obvious alternative",
          "Aspirin 300 mg: not allergic, so yes. His daily low-dose aspirin does not change this",
          "GTN previously prescribed: systolic 138, HR 92, no PDE-5 inhibitor: all limits met",
          "He has used his own GTN: the crew can give the first dose, then consult the EOC Clinician for a plan (DSY lead instructor guidance)"
        ],
        teaching: ["Use the protocol as your checklist: one criterion at a time", "Ask about PDE-5 inhibitors directly; use the drug names if needed. Do not skip it", "Find out how much of his own GTN he has used, and when: it goes to the EOC Clinician"],
        realJob: "The PDE-5 question can feel awkward in front of family. Keep it simple: \"Graham, I need to ask: do you take anything for erectile dysfunction, like Viagra or Cialis? It affects what we can give you.\"",
        decisions: [
          { q: "He took sildenafil (Viagra) 20 hours ago. Can you give GTN?", options: ["Yes, it's more than 12 hours", "No: sildenafil has a 24-hour window", "Yes: only tadalafil matters"], answer: 1,
            why: "CPP-007-AO: no GTN within 24 hours of sildenafil, vardenafil or avanafil, or 48 hours of tadalafil. Together they can cause life-threatening hypotension." },
          { q: "Graham has used two sprays of his own GTN. BP and HR are within the limits. What is the plan?", options: [
            "No GTN from the crew until the EOC Clinician is consulted",
            "Give the first dose, then consult the EOC Clinician for a plan",
            "Give three more doses, 5 minutes apart" ], answer: 1,
            why: "DSY lead instructor guidance: if BP and HR are within the limits, the crew can give the first dose, then consult the EOC Clinician for a plan. The protocol's total maximum is 3 doses." }],
        cards: [{ q: "Which PDE-5 inhibitor has a 48-hour window?", a: "Tadalafil. Sildenafil, vardenafil and avanafil: 24 hours." }]
      } },
      { table: { title: "Criteria check", table: { head: ["Criterion", "Required", "Graham", "Met?"], rows: [
        ["Aspirin allergy", "Not allergic", "Nil known", "Yes"],
        ["Systolic BP", "100 mmHg or more (GTN prescribed)", "138", "Yes"],
        ["Pulse rate", "60 to 120", "92", "Yes"],
        ["PDE-5 inhibitor", "None within 24 or 48 hrs", "None (patient and wife)", "Yes"],
        ["GTN previously prescribed", "Yes", "Own spray", "Yes"]
      ] } } },
      { box: { title: "Clinical decision point", tone: "warn", items: [
        "Working diagnosis: suspected cardiac ischaemia",
        "Aspirin 300 mg, chewed",
        "Oxygen via nasal cannula to bring SpO2 above 94%",
        "GTN: crew gives the first dose (limits met), then consult the EOC Clinician for a plan",
        "Clinical support: considered (ICP 55 minutes, hospital 35)",
        "Transport and notify the receiving facility"
      ] } }
    ] },

    { title: "Treatment phase", blocks: [
      { steps: [
        { t: "Oxygen", text: "Nasal cannula to bring SpO2 above 94%. Graham sits as he is comfortable." },
        { t: "Aspirin 300 mg oral (2136)", text: "Medication checks with your partner. Check allergies. Ask him to chew it, then swallow. Record the dose, route and time." },
        { t: "GTN, first crew dose (2138)", text: "Say the limits aloud first, then give it (steps below)." },
        { t: "Vital signs every 3 to 5 minutes", text: "GTN may have a profound effect on blood pressure: observe him closely." },
        { t: "Consult the EOC Clinician", text: "For a plan: his own doses, your dose, the obs and his pain." }
      ] },
      { box: { title: "Giving GTN", tiles: true, steps: [
        { t: "Medication checks", text: "Check before preparing, before giving and after giving, with your partner where possible: the medication, its integrity, expiry and dose (CPPRO-008)." },
        { t: "Check the limits aloud", text: "\"Systolic 138, 100 or more. Pulse 92, between 60 and 120. No PDE-5 inhibitor.\" All must apply (CPP-007-AO)." },
        { t: "Explain and check allergies", text: "Explain what it is for and the possible side effects, and gain consent where able (CPPRO-009)." },
        { t: "Tablet or spray", text: "Tablet: under the tongue to dissolve. Spray: test it into the air, ask him to lift the tip of his tongue, spray underneath without the nozzle touching his mouth (CPPRO-009)." },
        { t: "Hand hygiene and record", text: "GTN bottles are multiple-patient use: never let the bottle touch the patient. Record the dose, route and time." },
        { t: "Watch the blood pressure", text: "Vital signs every 3 to 5 minutes. Consult the EOC Clinician if BP or HR fall outside the limits at any time." }
      ] } },
      { breakpoint: { title: "Treatment and medication safety", type: "Practical skill",
        prompts: ["Walk through the aspirin: what do you check, what do you say?", "Before the GTN, say the three limits out loud.", "Tablet or spray: show me the technique.", "What could GTN do to his blood pressure, and what is your plan if it drops?"],
        expected: [
          "Aspirin 300 mg, chewed then swallowed; not withheld because he takes daily aspirin",
          "Limits: systolic 100 or more (prescribed), pulse 60 to 120, no PDE-5 inhibitor within 24 or 48 hours",
          "GTN 300 microg tablet or 400 microg spray (DSY lead instructor: either is acceptable while SAAS changes over)",
          "Vital signs every 3 to 5 minutes after GTN",
          "If BP or HR fall outside the limits at any time: no further GTN, consult the EOC Clinician"
        ],
        teaching: ["GTN may have a profound effect on blood pressure (CPP-007-AO)", "PDE-5 check is non-negotiable: life-threatening hypotension", "Say your checks out loud every time: your partner can catch an error", "Expect a headache after GTN; laying a hypotensive patient flat is general teaching, not in the protocol"],
        realJob: "Check, say it aloud, give, record, monitor. It should feel automatic. The medication checks are your patient's safety net and your protection.",
        decisions: [{ q: "After a GTN dose: systolic 92, HR 104, he feels dizzy. What now?", options: [
          "Another dose: the pain is still there",
          "No further GTN, and consult the EOC Clinician",
          "Keep going and recheck in 15 minutes" ], answer: 1,
          why: "Systolic 92 is below the limit. CPP-007-AO: consult the EOC Clinician if BP or HR fall outside the limits at any time. Keep monitoring every 3 to 5 minutes." }],
        cards: [{ q: "How should SAAS aspirin be taken?", a: "Chewed by the patient before it is swallowed (CPPRO-009)." }]
      } }
    ] },

    { title: "Reassessment and escalation", blocks: [
      { table: { title: "Observations", table: { head: ["", "2135", "2142 (4 min after GTN)"], rows: [
        ["HR", "92", "88"], ["BP", "138/86", "118/74"], ["SpO2", "94% (air)", "96% (nasal cannula)"], ["RR", "20", "18"], ["Pain", "8/10", "6/10"], ["ECG", "Sinus rhythm", "Sinus rhythm"]
      ] } } },
      { text: "Graham says it is \"better but still there\", and he has a mild headache. At 2144 the Clinician consults the EOC Clinician. In the scenario, the EOC Clinician counts his two sprays and the crew's dose as three doses: no further GTN, transport now, notify the hospital, and call back if BP or HR fall outside the limits or the pain changes. They agree that transport is faster than waiting for the ICP.", muted: true },
      { breakpoint: { title: "Reassessment and escalation decision", type: "Decision making",
        prompts: ["Compare the two sets of obs. What has changed?", "Pain 8 down to 6: good response or a concern?", "BP 138 to 118: expected? Still within the limits?", "Why consult the EOC Clinician now?", "How will you structure the call?"],
        expected: [
          "Systolic fell 20 after GTN: expected with a vasodilator, and 118 is still 100 or more",
          "Partial relief only: the chest pain remains unresolved, which is a reason to consult (CPP-007-AO)",
          "He has used his own GTN, so the plan after the first crew dose comes from the EOC Clinician (DSY lead instructor guidance)",
          "Headache is an expected effect of GTN",
          "Call: who you are, the patient, what you found, what you've given (own sprays and your dose, with times), current obs, what you need"
        ],
        teaching: ["Trends matter more than one number", "Partial relief is not resolution", "In a rural area the EOC Clinician is your safety net: call early, and have the obs written down"],
        realJob: "A structured call takes about 90 seconds and gives the EOC Clinician everything they need. Repeat any advice back: medication, dose and route (CPPRO-008).",
        decisions: [{ q: "Pain 8 down to 6 after GTN, obs within the limits. What does the protocol say?", options: [
          "Wait 10 minutes and see if it settles",
          "Consult the EOC Clinician: the chest pain remains unresolved",
          "Transport without calling" ], answer: 1,
          why: "CPP-007-AO: consult the EOC Clinician if chest pain remains unresolved, if BP or HR fall outside the limits, or if resolved pain returns. Then transport and notify the receiving facility." }]
      } },
      { box: { title: "Practise the EOC Clinician call", text: "\"This is [name], AO crew from [station]. 62 year old male, 40 minutes of central chest pressure into the left arm and jaw. Known angina. He used two sprays of his own GTN before we arrived. We gave aspirin 300 mg at 2136 and one GTN dose at 2138. Pain is down from 8 to 6 but not resolved. BP 118/74, HR 88 regular, SpO2 96% on nasal cannula, GCS 15, sinus rhythm. No PDE-5 inhibitors. We're 35 minutes from [hospital]. Requesting a plan.\"" } }
    ] },

    { title: "Extrication and transport", blocks: [
      { breakpoint: { title: "Extrication and transport planning", type: "Practical skill",
        prompts: ["How will you move Graham to the ambulance?", "Why not let him walk?", "What stays connected during the move?", "Who drives and who rides in the back?", "What are you watching for over 35 minutes?"],
        expected: [
          "Green carry chair from the recliner; stand and pivot only, then onto the stretcher",
          "Walking increases the heart's workload: avoid exertion",
          "Monitor and oxygen stay on; the Driver manages the cables while the Clinician guides Graham",
          "Stretcher position for comfort; blanket on a cold night",
          "Clinician in the back with vital signs every 3 to 5 minutes; Driver drives smoothly",
          "Watch for: more pain, rhythm change, BP or HR outside the limits, change in conscious state; consult the EOC Clinician if any occur",
          "If he becomes unresponsive with absent or abnormal breathing: commence resuscitation (CPP-004-AO)"
        ],
        teaching: ["The move is when patients often deteriorate: keep him monitored", "Keep the defib pads within reach", "Notify the receiving facility (CPP-007-AO)"],
        teachingNote: "Carry chair technique and smooth driving are general teaching, not in the protocol.",
        realJob: "The carry chair keeps him seated and supported: he does almost no work. Take it slow, keep him monitored, and be ready for deterioration at any point.",
        decisions: [{ q: "Halfway to hospital his pain goes back up to 8/10. BP and HR are within the limits. What do you do?", options: [
          "Give another dose of GTN on your own",
          "Consult the EOC Clinician",
          "Keep driving: the hospital will deal with it" ], answer: 1,
          why: "He has had three doses in total, and the EOC Clinician's plan was no further GTN. Worsening, unresolved pain means consult the EOC Clinician (CPP-007-AO)." }],
        cards: [{ q: "What does CPP-004-AO say if the patient becomes unresponsive with absent or abnormal breathing?", a: "Commence resuscitation." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { text: "2210, regional hospital ED. Graham's pain is 5/10 and his obs stayed stable on the way." },
      { table: { title: "Observations", table: { head: ["", "2135", "2142", "2208"], rows: [
        ["HR", "92", "88", "84"], ["BP", "138/86", "118/74", "122/76"], ["SpO2", "94% (air)", "96% (NC)", "97% (NC)"], ["RR", "20", "18", "16"], ["Pain", "8/10", "6/10", "5/10"], ["ECG", "Sinus", "Sinus", "Sinus"]
      ] } } },
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Officer from [station]. This is Graham, 62.\""],
        ["S", "\"40 minutes of central chest pressure into his left arm and jaw, worse than his usual angina and not settled by his own GTN.\""],
        ["B", "\"Angina for 4 years, hypertension, high cholesterol. On daily aspirin, atorvastatin, metoprolol, perindopril and his own GTN spray. No known allergies. No PDE-5 inhibitors.\""],
        ["A", "\"On arrival: pale and sweaty, HR 92, BP 138/86, SpO2 94% on air, pain 8/10, sinus rhythm. Now: HR 84, BP 122/76, SpO2 97% on nasal cannula, pain 5/10, still sinus rhythm.\""],
        ["R", "\"Two sprays of his own GTN before we arrived. We gave aspirin 300 mg at 2136 and GTN at 2138: three GTN doses in total. EOC Clinician consulted at 2144: no further GTN, transport. Headache since the GTN. Pain improved but not resolved.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Deliver your ISBAR to me now as the receiving clinician.", "Did you give every GTN dose, including his own, with times?", "Did you give the trend, not just the latest numbers?"],
        expected: ["Structured and concise", "Situation first: why he is here now", "Every medication with dose and time, and the total GTN count", "PDE-5 status and allergies stated", "Trends: \"BP 138, now 122\"; \"pain 8, now 5\""],
        teaching: ["The total GTN count matters to the hospital's next decisions", "A good handover takes 60 to 90 seconds: practise it during transport"],
        realJob: "The receiving team's first sense of how sick he is comes from your handover. Make it count.",
        decisions: [{ q: "Which part of ISBAR sets the urgency for the receiving team?", options: ["Situation", "Background", "Recommendation"], answer: 0,
          why: "Situation says what is happening now and why he is here. Background, assessment and recommendation then build the picture (general teaching)." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "When did you form the working diagnosis, and what confirmed it?",
        "How did you prioritise on first contact? Would you change anything?",
        "Walk through your GTN checks. How did the PDE-5 question go?",
        "His own GTN: how did it change your plan?",
        "When did you consult the EOC Clinician? Could it have been earlier?",
        "Did you consider clinical support? What did you decide, and why?",
        "Were you ready for cardiac arrest at every stage? Where were the defib pads?",
        "How did the Clinician and Driver roles work together?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Suspect cardiac ischaemia unless there is an obvious alternative. \"Time is muscle\"",
        "Aspirin 300 mg for everyone who is not allergic, chewed",
        "Check systolic BP, pulse rate and PDE-5 use before every GTN dose; vital signs every 3 to 5 minutes",
        "Ask what GTN the patient has already used, and when",
        "Consult the EOC Clinician if BP or HR fall outside the limits, pain remains unresolved, or resolved pain returns",
        "Keep the defib pads within reach from the lounge room to the hospital door"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. PDE-5 inhibitor", text: "Graham hesitates, then says he took sildenafil about 18 hours ago. His wife did not know. No GTN: sildenafil has a 24-hour window. Aspirin 300 mg as per protocol, oxygen if needed, monitoring, consult the EOC Clinician (the pain remains unresolved), transport and notify. Discuss how to handle this sensitively." } },
      { box: { title: "2. Hypotension after GTN", text: "Five minutes after the crew's GTN dose: BP 88/54, HR 104, dizzy. Systolic is below the limit: no further GTN, consult the EOC Clinician immediately, keep monitoring every 3 to 5 minutes. Discuss posture (general teaching) and how this changes transport." } },
      { box: { title: "3. Cardiac arrest on scene", text: "Soon after the GTN, Graham becomes unresponsive with abnormal breathing, and the monitor shows VF. Commence resuscitation (CPP-004-AO) and follow Cardiac Arrest (Adult) - AO, CPP-002-AO. Discuss: were the pads ready, who does what, and when do you call for backup?" } },
      { box: { title: "4. No chest pain", text: "Margaret, 58: nausea, jaw pain, back pain between the shoulder blades and tiredness. She denies chest pain. No cardiac history, no prescribed GTN. The protocol lists neck, jaw, arms, back or shoulder, with nausea, dizziness, sweating or shortness of breath. Aspirin 300 mg unless allergic; oxygen if SpO2 is not above 94%. GTN not previously prescribed: consult the EOC Clinician, who may advise it (systolic must be above 100). Discuss how the pathway changes." } }
    ] }
  ]
};
