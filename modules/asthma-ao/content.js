/* Asthma - AO walk-through scenario (Karen, 45). Content only: the layout lives in /microlearning/shared/module.js.
   Rebuilt on 14 Oct 2026 from the original DSY scenario and checked against SAAS CPP-050-AO Asthma - AO v3.1
   (2 December 2024), the AO Asthma Severity & Treatment Table CTL-071 (exported 31.08.2026), CPPRO-012 Inhaled
   Medication Administration v2.0 and CPP-003-AO Anaphylaxis - AO. The story, scene, observations, crew roles,
   timings and EOC Clinician replies are a training scenario written by DSY; clinical actions follow those documents.
   Points that are general teaching rather than protocol are labelled as such. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Asthma - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Karen, 45: more severe asthma at a rural property, 0215",
  lead: "A realistic acute asthma call for a two-person volunteer AO crew, with eight break points for discussion, skills practice and decisions. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 70,

  protocol: {
    code: "CPP-050-AO", name: "Asthma - AO", version: "v3.1 (2 December 2024)", exported: "31 August 2026",
    also: [{ code: "CTL-071", name: "AO Asthma Severity & Treatment Table", version: "exported 31 August 2026" },
           { code: "CPPRO-012", name: "Inhaled Medication Administration", version: "v2.0 (19 April 2018)" }]
  },
  footerNotes: ["The patient, story, observations and EOC Clinician replies are a training scenario written by DSY. Check it with your lead instructor."],

  panels: [
    { title: "Overview", blocks: [
      { box: { title: "Learning objectives", items: [
        "Consider allergy and anaphylaxis first, then classify asthma severity with the AO Asthma Severity & Treatment Table (CTL-071)",
        "Give nebulised salbutamol and ipratropium for more severe asthma, with the right dose for the age",
        "Request early clinical support and consult the EOC Clinician, repeating the advice back",
        "Set up a nebuliser and use an MDI and spacer as in CPPRO-012",
        "Reassess, recognise deterioration to life-threatening asthma, and plan the escalation",
        "Deliver a concise ISBAR handover"
      ] } },
      { box: { title: "Required equipment", items: [
        "Ambulance response bag, Corpuls3 monitor, stethoscope",
        "Salbutamol and ipratropium for nebulisation, nebuliser bowl, adult and paediatric masks, tubing",
        "Oxygen: masks, nasal cannula, tubing",
        "Salbutamol MDI (100 microg per puff) and spacer, with face mask attachment",
        "BVM, suction",
        "Stretcher, green carry chair, PPE, ePCR tablet, blanket, torch"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 40 to 50 minutes; debrief 10 to 15 minutes",
        "Nearest paramedic backup: 50 minutes",
        "Nearest country hospital: 30 minutes",
        "MedSTAR (air): 90 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, history, assessment, medications, clinical decisions",
        "Driver (AO2): Corpuls3, observations (including manual RR and BP), documentation, equipment, calls to EOC"
      ] } }
    ] },

    { title: "Pre-brief: the AO asthma protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { table: { title: "AO Asthma Severity & Treatment Table (CTL-071)", text: "First: assess GCS and work of breathing; baseline obs (RR, PR, monitor, SpO2); past medical history.", table: { head: ["Severity", "Common signs", "Over 6 years and adults", "Under 6 years"], rows: [
        ["Mild", "Talks in sentences; normal work of breathing; SpO2 usually above 95%", "MDI + spacer: 12 puffs salbutamol (4 breaths per puff). EOC Clinician may advise repeat doses", "MDI + spacer: 6 puffs salbutamol. EOC Clinician may advise repeat doses"],
        ["More severe", "Talks in phrases, words or unable to speak; distressed; SpO2 usually below 95%", "Neb: 5 mg salbutamol + 500 microg ipratropium (one neb of each drug). Request early clinical support. Consult for MDI + spacer and O2 at 4 L/min, repeat nebs, continuous nebs or IM adrenaline", "Neb: 2.5 mg salbutamol + 250 microg ipratropium (about half a neb of each + 3 mL saline). Consult as for adults"],
        ["Life threatening", "Unable to speak; drowsy or unconscious; cyanosed; poor respiratory effort; or respiratory arrest", "High flow oxygen; early clinical support; if IPPV, slow and gentle (4 per min); consult for continuous nebs or adrenaline; urgent transport", "As for adults"]
      ] } } },
      { box: { title: "Key reminders from the protocol", items: [
        "Basic care and life support first",
        "Consider whether the signs could be allergy or anaphylaxis: if so, follow Anaphylaxis CPP-003-AO first, including early clinical support",
        "Never use SpO2 alone to judge severity: use it with a thorough patient assessment",
        "Repeat doses are given on EOC Clinician advice. Consult the EOC Clinician immediately if the patient deteriorates at any time",
        "If at any point the patient becomes unresponsive and is not breathing normally, commence CPR",
        "Position the patient at more than 45 degrees, or upright, for inhaled medication (CPPRO-012)"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "A patient who has already used a lot of reliever at home may be sicker than they first appear",
        "Tachycardia is common in acute asthma and after salbutamol",
        "Document the time and dose of every medication for the handover"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "Thursday, 0215. You and your crew partner are paged to a breathing difficulty at a rural property. Cool, dry night. You respond from home: about 12 minutes to scene." },
      { box: { title: "MDT display", items: [
        "Priority 2, Breathing problems, 45F",
        "Chief complaint: difficulty breathing, \"can't get her breath\"",
        "Caller: husband, on scene",
        "History: known asthmatic, has been using Ventolin without relief",
        "Location: rural homestead, sealed road access",
        "Patient is awake and sitting up"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["Read the MDT aloud. What stands out?", "What are you expecting on arrival? What is the worst case?", "What kit goes in first?", "Who is doing what when we arrive?"],
        expected: [
          "Known asthmatic whose reliever is not working: plan for at least more severe asthma",
          "Kit in first: response bag with nebuliser, salbutamol and ipratropium, oxygen, MDI and spacer, Corpuls3",
          "Early clinical support may be needed: the paramedic is 50 minutes away, so think about requesting it early",
          "Roles agreed before arrival: clinician takes the patient, driver sets up monitoring and makes the calls"
        ],
        teaching: ["The MDT tells you she has already self-treated: this may be a failing presentation", "Planning roles and kit before arrival saves critical time on scene"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "On a 2 am job, the drive is your only planning window. Talk through the protocol, picture the kit, and agree roles before you pull up.",
        decisions: [{ q: "Known asthmatic, reliever not working, 0215. What do you plan for?", options: [
          "Mild asthma: probably 12 puffs and a short job",
          "At least more severe asthma: nebuliser, oxygen and early clinical support in mind",
          "Nothing until you see her" ], answer: 1,
          why: "A reliever that is not working is a warning. Plan for more severe asthma: the nebuliser kit and oxygen go in first, and with the paramedic 50 minutes away, early clinical support is likely." }],
        cards: [{ q: "Who usually makes the calls to EOC in this crew?", a: "The driver (AO2), so the clinician can stay with the patient." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "A well kept rural homestead, porch light on. The husband meets you at the door, clearly worried: \"She woke up about half an hour ago fighting for breath. She's used her puffer heaps but it's not working.\" You can hear a wheeze from the hallway. The bedroom is about 15 metres from where you can park." },
      { box: { title: "Scene safety", items: ["Domestic residence, no hazards", "Clear access to the bedroom", "Note the distance to the ambulance for extrication", "One bystander (husband) available to help"] } },
      { breakpoint: { title: "Doorway, first impression", type: "Discussion",
        prompts: ["You're at the bedroom doorway. What can you see and hear?", "From the doorway alone, how sick is she?", "What is your immediate priority?"],
        expected: [
          "Sitting bolt upright on the edge of the bed, leaning forward on her arms; audible wheeze; working hard to breathe",
          "Awake and tracking you: GCS appears 15",
          "Listen to her speech as you introduce yourself: sentences, phrases or words?",
          "Likely more severe asthma until proven otherwise. Keep her upright, start monitoring, and think anaphylaxis first",
          "Priority: introduce yourself, keep her upright, get the nebuliser and monitoring going"
        ],
        teaching: ["Speech, work of breathing and alertness are the AO severity signs: you can judge most of them from the doorway", "A patient who is sitting forward and working hard must not be laid down"],
        realJob: "Those first seconds at the doorway tell you more than any number on the monitor. If she is tripoding and wheezing from across the room, your alert level should already be up.",
        decisions: [{ q: "She is sitting forward, wheezing audibly, and answers you in short phrases. Which severity fits?", options: ["Mild", "More severe", "Life threatening"], answer: 1,
          why: "Talking in phrases and distressed is more severe asthma (CPP-050-AO, CTL-071). She is alert and speaking, so not life threatening at this point." }]
      } }
    ] },

    { title: "Patient contact and primary survey", blocks: [
      { text: "Karen Mitchell, 45. Sitting bolt upright on the edge of the bed, leaning forward on her arms. Audible expiratory wheeze. Speaking in short phrases between breaths. Pale, mildly sweaty. Alert and oriented. \"Woke up... couldn't breathe... used my puffer... heaps of times... not helping...\"" },
      { table: { title: "Primary survey", table: { head: ["", "Finding"], rows: [
        ["A", "Patent. Speaking. No stridor."],
        ["B", "Bilateral expiratory wheeze (some inspiratory). Increased work of breathing. Accessory muscle use. Reduced air entry both sides."],
        ["C", "Pale, mildly sweaty. Radial pulse present, fast, regular."],
        ["D", "GCS 15. Alert, oriented. Anxious and distressed."],
        ["E", "No rash. No swelling of lips, tongue or throat. No peripheral oedema."]
      ] } } },
      { box: { title: "History (Karen and her husband)", items: [
        "Woke about 0145 short of breath; chest tightness and wheeze getting worse over 30 minutes",
        "Used her own Ventolin MDI: about 8 puffs straight from the inhaler (no spacer), without relief",
        "Mild upper respiratory tract infection for 3 days; spent hours cleaning a dusty shed yesterday",
        "No chest pain, fever or productive cough; no new food, medicine, bite or sting",
        "Asthma since age 12; two similar ED presentations this year; no ICU admissions; mild eczema",
        "Medications: Seretide 250/25 preventer (ran out 2 weeks ago); Ventolin 100 microg MDI",
        "Allergies: penicillin (rash)"
      ] } },
      { breakpoint: { title: "Initial observations and Corpuls3 set-up", type: "Practical skill",
        prompts: ["Driver: set up the Corpuls3. What goes on, and in what order?", "Which observation matters most here?", "Read out the numbers. What is abnormal?"],
        expected: [
          "CTL-071 first: assess GCS and work of breathing; baseline obs (RR, PR, monitor, SpO2); past medical history",
          "SpO2 probe, 3-lead ECG, NIBP; count the respiratory rate manually",
          "HR 118, RR 28, SpO2 91% on room air, BP 140/88, temp 36.8, GCS 15",
          "SpO2 91% fits more severe asthma (usually below 95%), but never judge severity on SpO2 alone: speech and work of breathing say the same"
        ],
        teaching: ["Count the respiratory rate yourself: the monitor may not capture it in a moving, distressed patient", "Don't wait for a full set of obs before treating: the clinician starts while the driver sets up"],
        teachingNote: "Practical teaching from the scenario; the obs list is from CTL-071.",
        realJob: "In a sick asthmatic, treatment starts while the monitoring is still going on. Clinician treats, driver sets up and reads out the numbers.",
        decisions: [{ q: "SpO2 is 91% on room air. What does that tell you?", options: [
          "It decides the severity on its own",
          "It fits more severe asthma, alongside her phrases and distress, but SpO2 is never used alone",
          "Nothing useful in asthma" ], answer: 1,
          why: "More severe asthma usually has SpO2 below 95%, but the protocol says oxygen saturations alone should never be used to judge severity: use them with a thorough assessment." }]
      } },
      { table: { title: "Initial observations", table: { head: ["HR", "RR", "SpO2", "BP", "Temp", "GCS"], rows: [["118", "28", "91% (air)", "140/88", "36.8", "15"]] } } }
    ] },

    { title: "Working diagnosis and the protocol", blocks: [
      { breakpoint: { title: "Severity, anaphylaxis and the first treatment", type: "Decision making",
        prompts: ["Could this be allergy or anaphylaxis?", "Which severity category is Karen in, and why?", "What is the first treatment, and the dose for her age?", "Is anything pushing this towards life threatening?"],
        expected: [
          "Anaphylaxis considered: no rash, no lip, tongue or throat swelling, no new exposure. Triggers are dust, a URTI and no preventer. Follow the asthma protocol",
          "MORE SEVERE: talking in phrases, distressed, SpO2 usually below 95% (here 91%)",
          "Not life threatening: alert, speaking, not cyanosed, not drowsy, respiratory effort maintained",
          "Request early clinical support",
          "Nebulised salbutamol 5 mg and ipratropium 500 microg (over 6 years: one neb of each drug)",
          "Consult the EOC Clinician, who may advise further doses: MDI and spacer with O2 at 4 L/min, repeat nebs, continuous nebs or IM adrenaline"
        ],
        teaching: ["Severity sets the treatment: for more severe asthma it is the nebuliser with ipratropium, not 12 puffs of salbutamol", "The protocol's principle: first-line treatment for severe asthma is high-flow oxygen and nebulised bronchodilator therapy, with early clinical support and transport", "Mild asthma doses go by age (12 puffs if 6 or older, 6 puffs if 1 to 6), not by severity"],
        realJob: "Look at the whole picture: speech, work of breathing, alertness, and how much reliever she has already used. If it looks more severe, treat it as more severe.",
        decisions: [
          { q: "Which severity is Karen?", options: ["Mild", "More severe", "Life threatening"], answer: 1,
            why: "Phrases, distressed, SpO2 91%: more severe. She is alert, speaking and not cyanosed, so not life threatening." },
          { q: "What is her first treatment?", options: [
            "Salbutamol 12 puffs via MDI and spacer",
            "Nebulised salbutamol 5 mg and ipratropium 500 microg, and request early clinical support",
            "IM adrenaline straight away" ], answer: 1,
            why: "More severe asthma, over 6 years: nebulised salbutamol 5 mg and ipratropium 500 microg (one neb of each), with early clinical support. IM adrenaline is only if the EOC Clinician advises it." }],
        cards: [{ q: "Before you treat Karen's asthma, what does the protocol ask you to consider?", a: "Whether the signs could indicate allergy or anaphylaxis. If so, follow CPP-003-AO first, including early clinical support." }]
      } },
      { box: { title: "Clinical decision point", tone: "warn", items: [
        "Severity: more severe asthma",
        "Treatment: nebulised salbutamol 5 mg and ipratropium 500 microg",
        "Clinical support: request early (paramedic 50 minutes away)",
        "EOC Clinician: consult for further doses and the transport plan",
        "Transport: country hospital, 30 minutes. Do not delay"
      ] } }
    ] },

    { title: "Treatment phase", blocks: [
      { steps: [
        { t: "Position", text: "Keep Karen sitting upright, more than 45 degrees, and never lay her down. Pillows behind her back. Reassure her calmly." },
        { t: "Request early clinical support", text: "The driver calls while the clinician starts treatment." },
        { t: "Nebulised salbutamol 5 mg and ipratropium 500 microg", text: "Medication checks with your partner, then set up the nebuliser (steps below)." },
        { t: "Consult the EOC Clinician", text: "Patient details, severity, treatment so far and response. Repeat the advice back: medication, dose and route." },
        { t: "Monitor and reassess", text: "Continuous SpO2 and ECG, full obs about every 5 minutes, and watch speech, work of breathing and alertness. Consult the EOC Clinician immediately if she deteriorates." },
        { t: "Transport", text: "Don't delay for extra rounds on scene: the hospital is 30 minutes away." }
      ] },
      { box: { title: "Nebuliser set-up (CPPRO-012)", tiles: true, steps: [
        { t: "Checks", text: "Complete all medication checks with your partner. Check allergies. Explain and gain consent where able." },
        { t: "Position", text: "Sit the patient at more than 45 degrees, or upright. Hand hygiene." },
        { t: "Load", text: "Take the chamber off the mask and load salbutamol 5 mg and ipratropium 500 microg through the top. Total volume no more than 10 mL." },
        { t: "Connect", text: "Fit the chamber to the mask and the tubing to the oxygen supply. Keep the chamber upright so it does not leak." },
        { t: "Flow", text: "Set 6 to 8 L/min for a good mist. Mask over mouth and nose; breathe as normally as possible." },
        { t: "Finish and record", text: "Tap the bowl occasionally and at the end. Record the dose, route and time." }
      ] } },
      { breakpoint: { title: "Treatment and medication safety", type: "Practical skill",
        prompts: ["Show me how you'll set up the nebuliser, step by step.", "What goes in the bowl, and why that dose?", "What flow, and what keeps it working?", "What are you checking before you give it?"],
        expected: [
          "Medication checks with a second clinician: right drugs (salbutamol and ipratropium), in date, right dose",
          "Salbutamol 5 mg and ipratropium 500 microg: more severe asthma, over 6 years (CTL-071: one neb of each drug)",
          "Chamber upright; total volume no more than 10 mL; flow 6 to 8 L/min; tap the bowl",
          "Karen upright, more than 45 degrees; mask covering mouth and nose",
          "Record the dose, route and time"
        ],
        teaching: ["Read every label out loud: at 2 am in dim light, wrong-drug errors happen", "Expect some tremor and a faster heart rate after salbutamol, and a dry mouth after ipratropium (general teaching, not in the protocol)"],
        realJob: "Practise the nebuliser set-up until it is automatic: checks, load, connect, upright, 6 to 8 litres. You want it misting within a couple of minutes of walking in.",
        decisions: [{ q: "What flow do you set on the nebuliser?", options: ["2 L/min", "6 to 8 L/min", "15 L/min"], answer: 1,
          why: "CPPRO-012: set the nebuliser flow at 6 to 8 litres per minute to give enough medication mist." }],
        cards: [{ q: "What is the most you put in one nebuliser bowl?", a: "10 mL in total (CPPRO-012). Several medications, or saline as a diluent, can share one bowl." }]
      } }
    ] },

    { title: "Reassessment and escalation", blocks: [
      { text: "Twenty minutes after the nebuliser, you formally reassess Karen. The EOC Clinician has been consulted." },
      { table: { title: "Observations", table: { head: ["", "Initial", "20 min after the neb"], rows: [
        ["HR", "118", "106"], ["RR", "28", "22"], ["SpO2", "91% (air)", "95% (oxygen-driven neb)"], ["BP", "140/88", "132/82"],
        ["Speech", "Phrases", "Short sentences"], ["Work of breathing", "Marked accessory muscle use", "Mild accessory muscle use"], ["Wheeze", "Loud, both sides", "Present but reduced"]
      ] } } },
      { text: "Mild hand tremor and a dry mouth. Karen says she feels \"better but not right yet\". In the scenario, the EOC Clinician advises a repeat dose of salbutamol via MDI and spacer with oxygen at 4 L/min via nasal cannula, to give en route.", muted: true },
      { breakpoint: { title: "Reassessment and escalation decision", type: "Decision making",
        prompts: ["Compare the numbers. Better, worse or the same?", "Can you give another round on your own?", "Stay and treat, or load and go?", "Would waiting for the paramedic change anything?", "What if she had NOT improved?"],
        expected: [
          "Improving: SpO2 91 to 95, RR 28 to 22, phrases to short sentences, less work of breathing. Not back to baseline",
          "Further doses are on EOC Clinician advice: update the EOC Clinician, and repeat the advice back (here, salbutamol via MDI and spacer with O2 at 4 L/min)",
          "Load and go: the hospital is 30 minutes away, the paramedic 50. Treat en route",
          "If NOT improving: consult the EOC Clinician immediately (repeat nebs, continuous nebs or IM adrenaline may be advised); keep clinical support coming; transport",
          "If she becomes drowsy, cyanosed or her breathing effort drops: life threatening. High flow oxygen, early clinical support, urgent transport"
        ],
        teaching: ["Reassessment means comparing trends and looking at the whole patient", "Improving is not resolved: keep treating and monitoring", "In a rural setting the transport decision is simple maths: what gets her to definitive care fastest?"],
        realJob: "The question is always: is staying here going to make her better than the hospital can? If the answer is no, load and go.",
        decisions: [{ q: "Karen is improving. Can you give another dose on your own?", options: [
          "Yes, every 20 minutes",
          "Only as the EOC Clinician advises",
          "No, she doesn't need any more" ], answer: 1,
          why: "For more severe asthma the EOC Clinician may advise further doses (MDI and spacer with O2 at 4 L/min, repeat nebs, continuous nebs or IM adrenaline). Repeat their advice back." }],
        cards: [{ q: "Using an MDI and spacer: how many breaths per puff?", a: "Four (CTL-071 and CPPRO-012): one puff into the spacer, then breathe in deeply and slowly, holding about 10 seconds if able, four times. Wait 30 to 60 seconds before the next." }]
      } }
    ] },

    { title: "Extrication and transport", blocks: [
      { box: { title: "Extrication and stretcher", items: [
        "Green carry chair from the bedroom to the ambulance (about 15 metres): keep her upright and don't let her walk",
        "Stretcher sitting fully upright, pillow behind her back, blanket: it's a cool night",
        "Corpuls3 reconnected; nebuliser, MDI and spacer, oxygen, BVM and suction within reach",
        "Clinician in the back; smooth driving; notify the receiving hospital"
      ] } },
      { table: { title: "Pre-arrival observations", table: { head: ["", "Initial", "20 min", "Pre-arrival"], rows: [
        ["HR", "118", "106", "98"], ["RR", "28", "22", "20"], ["SpO2", "91% (air)", "95%", "96% (O2 4 L/min)"], ["BP", "140/88", "132/82", "128/80"], ["Speech", "Phrases", "Short sentences", "Sentences"], ["Wheeze", "Loud", "Moderate", "Mild"]
      ] } } },
      { breakpoint: { title: "Extrication and transport planning", type: "Discussion",
        prompts: ["How are you getting Karen to the ambulance?", "What position on the stretcher, and why?", "What do you need within reach?", "What's your plan if she deteriorates in the back?"],
        expected: [
          "Carry chair, upright: minimal exertion",
          "Stretcher fully upright: never lay her flat",
          "Nebuliser, MDI and spacer, oxygen, BVM, suction, Corpuls3 within reach",
          "Deterioration plan: consult the EOC Clinician immediately. If life threatening: high flow oxygen, early clinical support, urgent transport",
          "If IPPV is needed: small tidal volumes, slow and gentle (4 per minute) so the chest can deflate",
          "If she becomes unresponsive and is not breathing normally: commence CPR"
        ],
        teaching: ["Have your deterioration plan ready before you leave the driveway", "Life-threatening asthma treatments beyond oxygen (continuous nebs, IM adrenaline) are on EOC Clinician advice"],
        realJob: "Picture the worst thing that could happen in the next 30 minutes and have your response ready. Medication in your hand, not buried in a bag.",
        decisions: [{ q: "En route, Karen becomes drowsy, stops speaking and her SpO2 is falling. What now?", options: [
          "Another 12 puffs and keep driving",
          "Life threatening: high flow oxygen, consult the EOC Clinician immediately, early clinical support, urgent transport, and assist ventilation slow and gentle if needed",
          "Lay her flat to rest" ], answer: 1,
          why: "Drowsy and unable to speak is life-threatening asthma. High flow oxygen, early clinical support, urgent transport. The EOC Clinician may advise continuous salbutamol nebs or IM adrenaline 10 microg/kg (max 500 microg). IPPV: small, slow (4 per minute), gentle." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { text: "You arrive at the country hospital ED at 0325. One nurse meets you in the ambulance bay. Karen is sitting upright with a mild wheeze, SpO2 96% on oxygen, speaking in full sentences." },
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Officer from [station]. This is Karen Mitchell, 45.\""],
        ["S", "\"Called at 0215 with acute asthma, no relief from her own Ventolin at home.\""],
        ["B", "\"Asthma since 12, two ED presentations this year. Seretide ran out two weeks ago. URTI for three days, cleaning a dusty shed yesterday. Allergic to penicillin: rash.\""],
        ["A", "\"On arrival, more severe asthma: phrases, distressed, SpO2 91% on air, RR 28, HR 118, wheeze both sides. After a salbutamol and ipratropium neb and a repeat salbutamol dose by spacer, she's speaking in sentences, SpO2 96% on oxygen, HR 98, RR 20, mild wheeze.\""],
        ["R", "\"Improved but not at baseline. She still needs oxygen and ongoing monitoring, and review of her preventer.\""]
      ] } } },
      { table: { title: "Treatment for handover (scenario times)", table: { head: ["Time", "Treatment"], rows: [
        ["0225", "Clinical support requested"],
        ["0228", "Nebulised salbutamol 5 mg and ipratropium 500 microg, oxygen at 6 to 8 L/min"],
        ["0235", "EOC Clinician consulted"],
        ["0300", "Salbutamol via MDI and spacer as advised by the EOC Clinician, oxygen 4 L/min via nasal cannula"]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Deliver your ISBAR to me now as the receiving nurse. Go.", "Did you include what you gave, when, and how she responded?", "Did you mention the allergy?", "What is your recommendation?"],
        expected: ["Structured and concise, covering every element", "Severity on arrival AND now: the trajectory", "Every medication with time and dose, including the EOC Clinician's advice", "Penicillin allergy stated early", "Recommendation: ongoing monitoring and preventer review"],
        teaching: ["A good handover tells a story: how she was, what you did, how she responded, what she still needs", "Give trends, not just the latest number: \"SpO2 was 91, now 96 on oxygen\""],
        realJob: "Practise ISBAR until it flows. At 3 am in a busy ED you want the structure to come automatically.",
        cards: [{ q: "In ISBAR, what goes under A?", a: "Assessment: what you found (severity on arrival), what you did, and how the patient responded." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "How did you decide Karen's severity? Which signs carried most weight?",
        "Did you consider anaphylaxis? What made you settle on asthma?",
        "Walk through the nebuliser set-up and the spacer technique. What would you refine?",
        "When did you request clinical support and consult the EOC Clinician? What did you tell them?",
        "How did you decide between another round on scene and loading and going?",
        "What would you have done if she had become drowsy and stopped speaking?",
        "How did crew roles and communication work?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Think anaphylaxis first, then judge severity on speech, work of breathing and alertness, never SpO2 alone",
        "More severe asthma: nebulised salbutamol and ipratropium, early clinical support, EOC Clinician",
        "Mild asthma doses go by age; repeat doses are on EOC Clinician advice",
        "Positioning is treatment: upright, never flat",
        "Reassess, compare, decide. Plan for deterioration before it happens",
        "Life threatening: high flow oxygen, slow gentle ventilation if needed, urgent transport, CPR if not breathing normally"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. Paediatric: 8 years old", text: "An 8 year old with known asthma, nocturnal attack, anxious parents. Over 6 years, so the doses are as for adults: mild, 12 puffs salbutamol by MDI and spacer; more severe, nebulised salbutamol 5 mg and ipratropium 500 microg. For young children who cannot use the mouthpiece, use a face mask on the spacer (CPPRO-012). Talk to the child and the parents." } },
      { box: { title: "2. Life-threatening deterioration", text: "After the first neb, Karen becomes drowsy, stops speaking and her SpO2 falls to 86%. Life threatening: high flow oxygen, early clinical support, consult the EOC Clinician immediately (continuous salbutamol nebs and/or IM adrenaline 10 microg/kg to a total maximum of 500 microg may be advised), urgent transport. If IPPV is needed: small tidal volumes, slow and gentle, 4 per minute. CPR if she becomes unresponsive and is not breathing normally." } },
      { box: { title: "3. Remote property, long transport", text: "A remote farm, 55 minutes from hospital and 80 from paramedic backup. Discuss early clinical support, MedSTAR, how often to update the EOC Clinician, and managing more severe asthma for a long time with limited resources." } },
      { box: { title: "4. First ever wheeze", text: "Karen has no asthma history. The protocol notes that asthma symptoms can occur without a history of asthma, especially with a chest infection or smoke inhalation. Consider allergy and anaphylaxis first (CPP-003-AO), and discuss other causes of wheeze with the EOC Clinician." } }
    ] }
  ]
};
