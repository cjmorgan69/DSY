/* Seizures - AO walk-through scenario (Josh, 27, near Cleve), with an Ambulance Responder version (?scope=ar). Content
   only: the layout lives in /microlearning/shared/module.js. Built 28 Nov 2026 with the seizures module, on SAAS
   CPP-014-AO Seizures - AO v5.0 (3 December 2024) and CPP-037-AR Seizures - AR v2.1 (2 December 2024), CPPRO-011
   Intramuscular Injection v1.0, CPPRO-025 Nasopharyngeal Airway v1.0 (review date 2022, passed), CPP-004-AO and
   CPP-025-AR Basic Care. Midazolam presentation (1 mg/mL) from the SAAS Clinical app. The story, scene, people,
   observations, timings and EOC Clinician replies are a new training scenario written by DSY. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Seizures - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Josh, 27: seizing again at a 21st in a shearing shed near Cleve, 2140",
  lead: "Clusters of seizures at a party, for a two-person volunteer AO crew, with eight break points for discussion, skills practice and decisions. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 75,

  protocol: {
    code: "CPP-014-AO", name: "Seizures - AO", version: "v5.0 (3 December 2024)", exported: "31 August 2026",
    also: [{ code: "CPPRO-011, 025", name: "Intramuscular Injection, Nasopharyngeal Airway", version: "v1.0 (5 July 2017) and v1.0 (8 July 2019, review date 2022)" },
           { code: "CPP-004-AO", name: "Basic Care and Life Support - AO", version: "v4.0 (8 December 2016)" }]
  },
  footerNotes: ["This is a new training scenario written by DSY: the patient, story, observations, timings and EOC Clinician replies are fictional. Check it with your lead instructor.",
    "CPPRO-025 is past its review date (2022). The midazolam presentation (1 mg/mL) is from the SAAS Clinical app."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 27 year old man with epilepsy has two seizures at a friend's 21st in a shearing shed about 15 km from Cleve. He hasn't taken his tablets for two days, has been drinking and hasn't slept much. Cleve Hospital is 20 minutes away; paramedic backup is 55 minutes." },
      { box: { title: "Learning objectives", items: [
        "Make the scene safe and protect a seizing patient without restraining them",
        "Time the seizure from when it started, and recognise the five-minute line and clusters with little recovery",
        "Do basic care: BGL, SpO2 and oxygen, temperature, and request clinical support",
        { scope: "ao", text: "Consult the EOC Clinician with the right information, and give IM midazolam as advised: dose by weight, the maximum, and no more than 5 mL per site" },
        { scope: "ao", text: "Prepare for respiratory depression and loss of airway control, and insert an NPA for trismus" },
        { scope: "ao", text: "Transport to the closest ED with early notification, and deliver an ISBAR handover" },
        { scope: "ar", text: "Protect the actively seizing patient as CPP-037-AR describes, on their side with the airway open and clear" },
        { scope: "ar", text: "Consult the EOC Clinician regarding treatment and transport, and follow the advice" },
        { scope: "ar", text: "Manage the airway with AR skills (positioning, suction, OPA when it can be placed), and deliver an ISBAR handover" }
      ] } },
      { box: { title: "Required equipment", items: [
        "PPE, response bag, Corpuls3 (SpO2, ECG, NIBP), BGL meter, thermometer, torch",
        "Oxygen: face mask, non-rebreather, nasal cannula; BVM; suction; oropharyngeal airways",
        { scope: "ao", text: "Midazolam 5 mg/5 mL ampoules, 10 mL syringes, drawing-up and IM needles, alcohol swabs, sharps container" },
        { scope: "ao", text: "NPAs (6, 7 and 8 mm), water-based lubricant, Co-Phenylcaine Forte" },
        "Stretcher, carry sheet, blankets, pillows or padding, ePCR tablet"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 45 to 55 minutes; debrief 10 to 15 minutes",
        "Cleve Hospital: about 20 minutes",
        "Paramedic backup: about 55 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, protecting the patient, the airway, assessment, medicines, decisions",
        "Driver (AO2): scene safety and the crowd, the time keeping, Corpuls3 and observations, the calls, equipment"
      ] } }
    ] },

    { scope: "ao", title: "Pre-brief: the AO seizures protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { steps: [
        { t: "Basic care and life support", text: "BGL: treat hypoglycaemia as per CPP-009-AO. Hypoxia (SpO2 below 94%): supplemental oxygen. Temperature: remove outer clothing for a febrile child." },
        { t: "Don't restrain", text: "Not if possible, other than to ensure safety." },
        { t: "Request clinical support" },
        { t: "Consult the EOC Clinician if", text: "A generalised seizure is continuous for more than 5 minutes, or clusters of shorter seizures with little or no recovery in between are preventing effective breathing or causing harm (injury or hypoxia)." },
        { t: "IM midazolam, as the EOC Clinician advises", text: "0.15 mg/kg to a single maximum of 10 mg. Half the per kg dose (up to 5 mg) if 65 or older, or a frail adult under 40 kg. No more than 5 mL per injection site. Crew and patient safety during the injection. Further doses if advised." },
        { t: "The airway", text: "Prepare for respiratory depression and loss of airway control. Consider an NPA if there is trismus." },
        { t: "Transport", text: "Follow the patient's seizure management plan if they have one. Transport to the geographically closest ED and give early notification." }
      ] },
      { box: { title: "Why it matters (protocol principle)", items: [
        "Some generalised seizures cause life-threatening problems with the airway or breathing",
        "Control them as soon as possible when there's a risk of injury, or hypoxia from a prolonged or repeated seizure",
        "Midazolam's adverse effects are made worse by hypoxia, hypovolaemia, extremes of age and other CNS depressants such as alcohol",
        "Attend to treatable causes: hypoglycaemia, hypoxia, head trauma, hyperthermia"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "Write down the time each seizure starts and stops: you will be asked for it on the call and at handover",
        "A party gives you a crowd, alcohol and sometimes drugs: ask about both, without judgement",
        "Never put anything in the mouth of a seizing patient"
      ] } }
    ] },

    { scope: "ar", title: "Pre-brief: the AR seizures protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { steps: [
        { t: "Basic care and life support", text: "BGL: treat hypoglycaemia as per CPP-031-AR. Hypoxia (SpO2 below 94%): supplemental oxygen. Temperature: remove outer clothing for a febrile child." },
        { t: "Don't restrain", text: "Not if possible, other than to ensure safety." },
        { t: "Request clinical support" },
        { t: "Unconscious and actively seizing", text: "Follow their seizure management plan if available. Remove them from danger. Remove harmful objects. Protect the head. Restrain only if essential to avoid injury. On their side when practical. Maintain an open and clear airway." },
        { t: "Consult the EOC Clinician regarding treatment and transport", text: "They may advise: transport and cancel clinical support; transport and RV with clinical support en route; or monitoring until clinical support arrives." }
      ] },
      { box: { title: "Not in the AR protocol", tone: "warn", items: [
        "IM midazolam and the nasopharyngeal airway are AO skills (CPP-014-AO, CPPRO-025)",
        "AR airway adjuncts are suction and an oropharyngeal airway (CPP-025-AR)"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "Write down the time each seizure starts and stops: you will be asked for it on the call and at handover",
        "A party gives you a crowd, alcohol and sometimes drugs: ask about both, without judgement",
        "Never put anything in the mouth of a seizing patient"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Saturday in October, 2140. Cool and clear. You and your crew partner are paged in Cleve to a farm about 15 km out of Cleve: about 13 minutes." },
      { box: { title: "MDT display", items: [
        "Priority 1, seizure, 27 year old male",
        "Caller: friend (Ellie), at a 21st birthday party in a shearing shed",
        "Had a seizure about 2137, lasted about 2 minutes. Now confused",
        "Known epileptic. Has been drinking",
        "Gravel track to the shed. Lights on, cars parked along the track"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What stands out on the MDT?", "What are you expecting at a party in a shearing shed?", "What kit goes in first, and who carries what?", "Clinical support is 55 minutes away and the hospital 20. What's your plan?"],
        expected: [
          "A known epileptic who has had one seizure: plan for another. Ask the friend to note the time if he seizes again",
          "Scene: a crowd, alcohol, machinery and hard edges in the shed. Clear space early",
          "Kit in first: response bag, oxygen and suction, BGL meter, Corpuls3",
          "Request clinical support early (CPP-014-AO): the paramedic is 55 minutes away",
          "Roles: the Clinician takes the patient; the Driver takes the scene, the times and the calls"
        ],
        teaching: ["Time is part of the treatment: get the start time of every seizure", "Plan who manages the crowd before you arrive"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "Party jobs are loud and crowded. Decide in the car who is talking to the patient and who is moving people back.",
        decisions: [{ q: "What does the protocol ask for early in every seizure?", options: ["Request clinical support", "Restrain the patient", "Wait for the seizure to stop before doing anything"], answer: 0,
          why: "CPP-014-AO: basic care and life support, do not restrain the patient if possible other than to ensure safety, and request clinical support." }]
      } },
      { text: "2150: a remark on the MDT: \"FITTING AGAIN. NOT WOKEN UP PROPERLY SINCE THE FIRST ONE.\"", muted: true }
    ] },

    { title: "On arrival", blocks: [
      { text: "2153. Music still playing, twenty people in the shed. Josh is on the board floor between the wool table and a stack of steel gates, jerking all four limbs, eyes rolled back, frothing at the mouth. A friend is trying to hold his arms down. Ellie: \"It started again about three minutes ago. He never really woke up from the first one.\"" },
      { breakpoint: { title: "Doorway, the scene and the clock", type: "Discussion",
        prompts: ["What do you do in the first 30 seconds?", "What about the friend holding his arms?", "When did this seizure start? Why does it matter?", "What are the hazards around him?"],
        expected: [
          "Turn the music off, move people back, give someone a job (lights, the gate, his things)",
          "Kindly stop the friend: no restraint other than to keep him safe (CPP-014-AO)",
          "Started about 2150: the five-minute line is about 2155. And this is a second seizure with no recovery in between: clusters",
          "Hazards: steel gates, the wool table edge, the board floor. Move the gates, pad around his head",
          "Nothing in his mouth"
        ],
        teaching: ["Protect from harm, don't fight the seizure", "Write the start time down where your partner can see it"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "Bystanders want to help. Give them a job that helps you: \"Can you turn the music off and keep people back?\"",
        decisions: [{ q: "A friend is holding Josh's arms down to stop him hurting himself. What do you do?", options: [
          "Help hold him still",
          "Ask the friend to let go, move hazards away and protect his head",
          "Tie his arms with a sheet" ], answer: 1,
          why: "CPP-014-AO: do not restrain the patient if possible, other than to ensure safety. Remove the danger instead." }],
        cards: [{ q: "Josh's seizure started at 2150. When is the five-minute line?", a: "2155: continuous for more than 5 minutes means consult the EOC Clinician (CPP-014-AO)." }]
      } }
    ] },

    { title: "Patient contact and primary survey", blocks: [
      { box: { title: "What you find (2154)", items: [
        "Airway: frothy saliva, noisy, jaw clenched. Breathing: irregular, about 28, lips dusky",
        "Circulation: fast radial pulse. No obvious bleeding; a graze on his forehead from the board floor",
        "Disability: generalised jerking of all four limbs, eyes deviated, no response",
        "Exposure: warm skin, no rash, smells of beer"
      ] } },
      { box: { title: "History (Ellie)", items: [
        "Epilepsy since he was 15. Usually well controlled on levetiracetam",
        "Left his tablets at home: none for two days. Up late last night; \"a fair few beers\" tonight. No other drugs that she knows of",
        "First seizure about 2137, about 2 minutes; confused and sleepy after it, never back to normal",
        "This seizure started about 2150. No seizure management plan with him",
        "Weight: \"about 80 kilos\". No allergies"
      ] } },
      { table: { title: "Observations (2154, seizing)", table: { head: ["HR", "BP", "RR", "SpO2", "Temp", "GCS", "BGL"], rows: [["132", "Unable (moving)", "28, irregular", "89% (air)", "37.6", "3", "6.4"]] } } },
      { breakpoint: { title: "Basic care while he seizes", type: "Practical skill",
        prompts: ["Driver: what monitoring can you get on a seizing patient?", "BGL 6.4: what does that rule out?", "SpO2 89%: what does the protocol say?", "Temperature 37.6: does it change anything?", "Have you requested clinical support?"],
        expected: [
          "SpO2 probe (may not read well), then the cuff when you can; count the pulse and breathing",
          "BGL 6.4: not hypoglycaemia (treat a low BGL as per the hypoglycaemia protocol)",
          "Hypoxia (SpO2 below 94%): supplemental oxygen. A face mask over a frothy, clenched mouth; suction the froth from the side of the mouth if you can",
          "37.6 in an adult: the protocol's temperature step is about febrile children. Note it",
          "Request clinical support now if it wasn't done en route (CPP-014-AO)"
        ],
        teaching: ["The BGL takes 30 seconds and rules out a treatable cause", "Treat what you can while you wait for the clock"],
        teachingNote: "Oxygen device and suction technique are general teaching; the rest is CPP-014-AO.",
        realJob: "A seizing patient is hard to monitor. Get the BGL and oxygen first, numbers second.",
        decisions: [{ q: "SpO2 89% during the seizure. What now?", options: ["Wait until the seizure stops", "Supplemental oxygen now", "Insert an oral airway between his teeth"], answer: 1,
          why: "CPP-014-AO: hypoxia (SpO2 below 94%), treat with supplemental oxygen. Never force anything between clenched teeth." }]
      } }
    ] },

    /* ---------- AO: the five-minute line and IM midazolam ---------- */
    { scope: "ao", title: "The five-minute line and the consult", blocks: [
      { text: "2155. Josh is still seizing: five minutes since this one started, and no recovery since the first." },
      { breakpoint: { title: "The consult", type: "Decision making",
        prompts: ["Does Josh meet the consult criteria? Which ones?", "What does the EOC Clinician need from you?", "What will you ask for?", "Anything in the history that makes midazolam riskier?"],
        expected: [
          "Yes, both: a generalised seizure continuous for more than 5 minutes, and clusters with little or no recovery causing hypoxia (CPP-014-AO)",
          "Age, weight (about 80 kg), the start times (2137, 2150), BGL 6.4, SpO2 89% on air then on oxygen, what's been done",
          "Advice on IM midazolam",
          "Alcohol: a CNS depressant that makes midazolam's adverse effects worse, as does hypoxia (CPP-014-AO). Tell the EOC Clinician"
        ],
        teaching: ["A good call has the times in it: start of each seizure, now", "Say the weight and how you know it: an estimate from a friend is still useful"],
        realJob: "\"Josh, 27, known epileptic, no tablets for two days. Second generalised seizure, started 2150, still going, no recovery from the first at 2137. SpO2 89 on air, on oxygen now, BGL 6.4. About 80 kilos. He's had a fair bit to drink. Requesting advice on midazolam.\"",
        decisions: [{ q: "Which consult criterion does Josh meet?", options: [
          "Neither: wait until 10 minutes",
          "Both: continuous for more than 5 minutes, and clusters with no recovery causing hypoxia",
          "Only the alcohol" ], answer: 1,
          why: "CPP-014-AO: consult if a generalised seizure is continuous for more than 5 minutes, or clusters of shorter seizures with little or no recovery are preventing effective breathing or causing harm (injury or hypoxia)." }],
        cards: [{ q: "Name three things that make midazolam's adverse effects worse.", a: "Hypoxia, hypovolaemia, extremes of age, and other CNS depressants such as alcohol (any three) (CPP-014-AO)." }]
      } },
      { text: "In the scenario, the EOC Clinician at 2156: \"Give IM midazolam 0.15 mg per kilo. At 80 kilos that's over the maximum, so give the single maximum, 10 mg. Watch his breathing closely with the alcohol on board, and call me back in 5 minutes or if he seizes again.\"", muted: true }
    ] },

    { scope: "ao", title: "Treatment: IM midazolam", blocks: [
      { box: { title: "Midazolam 10 mg IM in two sites (CPPRO-011)", tiles: true, steps: [
        { t: "Repeat back", text: "\"Midazolam, 10 milligrams, IM.\" Medication checks with your partner: drug, strength (5 mg in 5 mL), expiry, dose." },
        { t: "Draw up", text: "10 mL in total: two ampoules. Two 5 mL syringes, one for each site, each a single dose." },
        { t: "Make it safe", text: "Your partner steadies the leg without pinning him. Clear space around you. Cut or move clothing from the thigh if you can." },
        { t: "First site", text: "Mid anterior-lateral thigh. Swab, 90 degrees, inject slowly, withdraw, straight into the sharps container." },
        { t: "Second site", text: "The other thigh, the same way. No more than 5 mL in any one site (CPP-014-AO)." },
        { t: "Record and watch", text: "Dose, sites and time. Watch the breathing and the SpO2: prepare for respiratory depression." }
      ] } },
      { breakpoint: { title: "Giving midazolam safely", type: "Practical skill",
        prompts: ["Work out the dose for 80 kg. What is the volume?", "Why two sites?", "How do you keep yourself and Josh safe while you inject?", "What are you watching for straight after?"],
        expected: [
          "0.15 mg/kg x 80 kg = 12 mg, more than the single maximum: give 10 mg. At 1 mg/mL that's 10 mL",
          "No more than 5 mL per injection site (CPP-014-AO): two sites, 5 mL each",
          "Crew and patient safety during IM injection (CPP-014-AO): one steadies, one injects, space cleared, needle straight into the sharps container, never recapped (CPPRO-011)",
          "Respiratory depression and loss of airway control: SpO2, breathing, BVM and suction ready (CPP-014-AO)"
        ],
        teaching: ["Say the maths out loud so your partner can check it", "Single maximum and per-site volume are two different limits: check both"],
        teachingNote: "The order of the steps and holding the leg are general teaching; the limits are from CPP-014-AO and CPPRO-011.",
        realJob: "Practise drawing up 10 mL into two syringes until it's automatic. On the night you'll be on your knees on a shed floor.",
        decisions: [
          { q: "Josh weighs about 80 kg. What dose and volume?", options: ["12 mg, 12 mL", "10 mg, 10 mL, in two sites", "8 mg, 8 mL, one site"], answer: 1,
            why: "0.15 mg/kg is 12 mg, so the single maximum of 10 mg applies. At 1 mg/mL that's 10 mL, and no more than 5 mL per site: two sites." },
          { q: "If Josh were 70 years old and 80 kg, what would change?", options: ["Nothing", "Half the per kg dose, up to 5 mg", "Twice the dose"], answer: 1,
            why: "CPP-014-AO: half the per kg dose (up to max 5 mg) if 65 years or older, or a frail adult under 40 kg." }],
        cards: [{ q: "What is the most you put in one IM injection site?", a: "5 mL (CPP-014-AO; CPPRO-011: the thigh takes up to 5 mL)." }]
      } },
      { text: "2158: midazolam 10 mg IM, 5 mL into each thigh. 2202: the jerking slows and stops. Josh is limp, snoring, jaw clenched. SpO2 93% on oxygen.", muted: true }
    ] },

    { scope: "ao", title: "After the seizure: the airway", blocks: [
      { table: { title: "Observations", table: { head: ["", "2154 (seizing)", "2205 (after midazolam)"], rows: [
        ["HR", "132", "108"], ["BP", "Unable", "138/82"], ["RR", "28, irregular", "12, snoring"], ["SpO2", "89% (air)", "93% (oxygen), 97% after the NPA"],
        ["GCS", "3 (seizing)", "7 (E1 V2 M4)"], ["BGL", "6.4", "6.4"], ["Jaw", "Clenched", "Clenched (trismus)"]
      ] } } },
      { breakpoint: { title: "The airway after midazolam", type: "Practical skill",
        prompts: ["What is the biggest risk now?", "He's snoring with his jaw clenched. What can you do?", "Show us the NPA: size, numbing, insertion.", "How do you position him?", "When would you call the EOC Clinician again?"],
        expected: [
          "Respiratory depression and loss of airway control (CPP-014-AO), made worse by the alcohol",
          "Head tilt and jaw thrust or recovery position, suction. Trismus: consider an NPA (CPP-014-AO)",
          "NPA: nose tip to earlobe, Co-Phenylcaine Forte 3 to 5 sprays (lead instructor: AOs may use it), lubricate, bevel to the septum, along the floor, don't force (CPPRO-025)",
          "On his side once the airway is managed, with suction ready",
          "If he seizes again, his breathing slows or the SpO2 falls: consult the EOC Clinician (further doses only on their advice)"
        ],
        teaching: ["Snoring is a partly blocked airway: fix it, don't watch it", "An NPA is tolerated with a gag reflex, an OPA isn't"],
        teachingNote: "Positioning and the snoring point are general teaching; the rest is CPP-014-AO and CPPRO-025.",
        realJob: "The minutes after the seizure stops are often the riskiest. Stay on the airway; let your partner do the rest.",
        decisions: [{ q: "Josh is snoring with a clenched jaw after midazolam. What helps?", options: [
          "Prise his mouth open for an oral airway",
          "Airway positioning and suction, and consider a nasopharyngeal airway",
          "Sit him up" ], answer: 1,
          why: "CPP-014-AO: prepare for respiratory depression and loss of airway control; consider a nasopharyngeal airway if there is trismus." }]
      } },
      { text: "2206: 7 mm NPA in the right nostril after Co-Phenylcaine. Snoring settles, SpO2 97%. 2208: the EOC Clinician is updated: no further midazolam for now; transport to Cleve Hospital and notify them.", muted: true }
    ] },

    /* ---------- AR: protect, the airway and the consult ---------- */
    { scope: "ar", title: "Protect him, and the consult", blocks: [
      { text: "2155. Josh is still seizing: five minutes since this one started, and no recovery since the first. The crew has no anticonvulsant at AR level." },
      { box: { title: "Unconscious and actively seizing (CPP-037-AR)", items: [
        "No seizure management plan with him",
        "Danger and harmful objects: the steel gates moved, the wool table edge padded",
        "Head protected with a folded jumper",
        "No restraint: his limbs move freely",
        "On his side as soon as it's practical, airway open and clear, suction for the froth"
      ] } },
      { breakpoint: { title: "The consult", type: "Decision making",
        prompts: ["What do you tell the EOC Clinician?", "What are you asking for?", "What can you do for his airway with AR skills?", "What will you do if he stops breathing normally?"],
        expected: [
          "Age, weight (about 80 kg), the start times (2137, 2150), still seizing, BGL 6.4, SpO2 89% on air then on oxygen, alcohol, what's been done",
          "Advice on treatment and transport (CPP-037-AR)",
          "Positioning, suction, oxygen. An oropharyngeal airway only if it can be placed: never forced between clenched teeth (CPP-025-AR adjuncts: suction and OPA)",
          "Start CPR if he becomes unresponsive and isn't breathing normally"
        ],
        teaching: ["Midazolam and the NPA are AO skills: as an AR, the consult brings the plan", "A good call has the times in it"],
        realJob: "\"Josh, 27, known epileptic, no tablets for two days. Second generalised seizure, started 2150, still going, no recovery from the first at 2137. SpO2 89 on air, on oxygen now, BGL 6.4. About 80 kilos, had a fair bit to drink. Clinical support requested. We're asking about treatment and transport.\"",
        decisions: [{ q: "Josh has been seizing for more than 5 minutes. What does an AR crew do?", options: [
          "Give IM midazolam",
          "Protect him, keep the airway open and clear, and consult the EOC Clinician regarding treatment and transport",
          "Hold him still until it stops" ], answer: 1,
          why: "CPP-037-AR: if the patient is unconscious and actively seizing, remove danger and harmful objects, protect the head, restrain only if essential, on the side when practical, open and clear airway; consult the EOC Clinician regarding treatment and transport." }],
        cards: [{ q: "Which airway adjuncts are at AR level?", a: "Suction and an oropharyngeal airway (CPP-025-AR). The NPA is an AO skill." }]
      } },
      { text: "In the scenario, the EOC Clinician at 2156: \"Keep protecting him, oxygen, on his side when you can, and suction. Call me back in 5 minutes or as soon as it stops.\" 2204: the jerking stops. Josh is limp, snoring, jaw clenched, SpO2 92% on oxygen.", muted: true },
      { table: { title: "Observations", table: { head: ["", "2154 (seizing)", "2206 (after the seizure)"], rows: [
        ["HR", "132", "112"], ["BP", "Unable", "140/84"], ["RR", "28, irregular", "14, snoring"], ["SpO2", "89% (air)", "92% (oxygen), 96% once positioned and suctioned"],
        ["GCS", "3 (seizing)", "7 (E1 V2 M4)"], ["BGL", "6.4", "6.4"], ["Jaw", "Clenched", "Clenched"]
      ] } } },
      { breakpoint: { title: "The airway after the seizure", type: "Practical skill",
        prompts: ["He's snoring with a clenched jaw. What can you do as an AR?", "Can you place an oral airway?", "What do you tell the EOC Clinician now?", "Which transport option fits, and why?"],
        expected: [
          "Recovery position, head tilt and jaw thrust as needed, suction, oxygen",
          "Not while the jaw is clenched: never force it. An OPA only once it can be placed (general teaching)",
          "The seizure stopped at 2204, GCS 7, snoring settling, SpO2 96%, obs; ask for the transport plan",
          "The EOC Clinician chooses: transport and cancel clinical support, transport and RV en route, or monitoring until clinical support arrives. Here, the hospital is 20 minutes away and the paramedic 55"
        ],
        teaching: ["Snoring is a partly blocked airway: fix it with positioning first", "The minutes after the seizure stops are often the riskiest"],
        teachingNote: "Positioning and the OPA point are general teaching; the rest is CPP-037-AR and CPP-025-AR.",
        realJob: "Stay on the airway; let your partner make the call and get the stretcher.",
        decisions: [{ q: "The seizure has stopped. Who decides the transport?", options: [
          "The crew: closest ED",
          "The EOC Clinician, who may advise transport and cancel clinical support, transport and RV en route, or monitoring until clinical support arrives",
          "Josh's friends" ], answer: 1,
          why: "CPP-037-AR: consult the EOC Clinician regarding treatment and transport. In this scenario the advice is transport to Cleve Hospital, with clinical support cancelled." }]
      } },
      { text: "In the scenario, the EOC Clinician at 2207: \"Transport to Cleve Hospital now and let them know; I'll cancel the paramedic crew. If he seizes again, protect him, pull over if you need to, and call me.\"", muted: true }
    ] },

    { title: "Extrication and transport", blocks: [
      { box: { title: "Getting Josh to hospital", items: [
        "Carry sheet to the stretcher, on his side, airway and suction with him; the Driver brings the ambulance as close as the track allows",
        "Ask a friend to get his tablets and Medicare card if they're close by; Ellie follows in her car",
        { scope: "ao", text: "Clinician in the back: SpO2 and breathing watched closely, BVM and suction ready, NPA checked" },
        { scope: "ar", text: "Clinician in the back: SpO2 and breathing watched closely, BVM and suction ready, on his side" },
        { scope: "ao", text: "Early notification to Cleve Hospital: the closest ED (CPP-014-AO)" },
        { scope: "ar", text: "Notify Cleve Hospital, as the EOC Clinician advised" }
      ] } },
      { table: { title: "En route (2220)", table: { head: ["HR", "BP", "RR", "SpO2", "GCS", "BGL"], rows: [["96", "130/78", "14", "97% (oxygen)", "10 (E3 V3 M4)", "6.2"]] } } },
      { breakpoint: { title: "Transport and the next seizure", type: "Decision making",
        prompts: ["Where are you going, and why there?", "What's your plan if he seizes again in the back?", "What are you watching?", "Who looks after Ellie?"],
        expected: [
          { scope: "ao", text: "Cleve Hospital: the geographically closest ED, with early notification (CPP-014-AO)" },
          { scope: "ar", text: "Cleve Hospital, as the EOC Clinician advised (CPP-037-AR)" },
          { scope: "ao", text: "Another seizure: protect him, time it, oxygen, and consult the EOC Clinician: further midazolam only as they advise" },
          { scope: "ar", text: "Another seizure: protect him, time it, on his side, airway open, and consult the EOC Clinician" },
          "Breathing rate and depth, SpO2, conscious state, BGL again",
          "Ellie follows in her own car, not in convoy at speed"
        ],
        teaching: ["Have the next-seizure plan ready before you leave", "Write the times down en route: you'll need every one at handover"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "A seizure in a moving ambulance: protect his head, don't restrain, and pull over if you need both hands.",
        decisions: [{ q: "Halfway to the hospital, Josh starts seizing again. What now?", options: [
          { scope: "ao", text: "Give another 10 mg of midazolam straight away" },
          { scope: "ar", text: "Hold his arms down" },
          "Protect him, time it, oxygen, and consult the EOC Clinician",
          "Ignore it: the hospital is close" ], answer: 1,
          why: "Protect the patient, time the seizure and consult the EOC Clinician. Further doses of midazolam are only as the EOC Clinician advises (CPP-014-AO); at AR level, consult regarding treatment (CPP-037-AR)." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { text: "2230, Cleve Hospital ED. The nurse and the on-call doctor meet you at the door." },
      { scope: "ao", table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Officer from Cleve. This is Josh Merrick, 27.\""],
        ["S", "\"Two generalised seizures with no recovery in between: 2137 for about 2 minutes, then 2150, stopped at 2202 after IM midazolam.\""],
        ["B", "\"Epilepsy since 15 on levetiracetam, none for two days. Little sleep, a fair amount of alcohol tonight. No allergies. About 80 kilos.\""],
        ["A", "\"SpO2 89% on air while seizing, BGL 6.4, temp 37.6. Midazolam 10 mg IM at 2158 on EOC Clinician advice, 5 mL in each thigh. Trismus afterwards: 7 mm NPA at 2206. Now GCS 10, RR 14, SpO2 97% on oxygen, HR 96, BP 130/78. Graze to the forehead.\""],
        ["R", "\"Watch his breathing with the midazolam and the alcohol. His tablets are on their way with a friend. Needs review of the missed medication.\""]
      ] } } },
      { scope: "ar", table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Responder from Cleve. This is Josh Merrick, 27.\""],
        ["S", "\"Two generalised seizures with no recovery in between: 2137 for about 2 minutes, then 2150 until 2204.\""],
        ["B", "\"Epilepsy since 15 on levetiracetam, none for two days. Little sleep, a fair amount of alcohol tonight. No allergies. About 80 kilos.\""],
        ["A", "\"SpO2 89% on air while seizing, BGL 6.4, temp 37.6. Protected, oxygen, on his side, suctioned. Jaw clenched afterwards, airway managed with positioning. Now GCS 10, RR 14, SpO2 97% on oxygen, HR 96, BP 130/78. Graze to the forehead.\""],
        ["R", "\"EOC Clinician consulted at 2156 and 2207: transport here, clinical support cancelled. No medicines given. His tablets are on their way with a friend.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Deliver your ISBAR now as if to the doctor.", "Which times must be in it?", "What about the medicines?"],
        expected: [
          "Start and stop times of each seizure, the consult times",
          { scope: "ao", text: "Midazolam: dose, route, sites, time and who advised it; the NPA size and time" },
          { scope: "ar", text: "That no anticonvulsant was given, and the EOC Clinician's advice and times" },
          "The missed tablets, the alcohol and the lack of sleep",
          "The trend: GCS 3, 7, 10"
        ],
        teaching: ["Times and trends tell the story of a seizure job", "Say what wasn't given as well as what was"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "Hand over the times from your notes: the doctor will ask for them.",
        decisions: [{ q: "Which detail matters most for the doctor's next decision?", options: ["The music at the party", "The seizure times and every medicine with its dose and time", "Who drove the ambulance"], answer: 1,
          why: "The next clinician plans further treatment from the seizure times and what has already been given (general teaching)." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "How did you manage the scene and the crowd? What would you do differently?",
        "When did you write down the start time? Did the times help on the call?",
        { scope: "ao", text: "How did you work out the midazolam dose and volume? Did you check each other?" },
        { scope: "ao", text: "How did you keep yourselves and Josh safe during the injection?" },
        { scope: "ar", text: "What could you do for Josh without an anticonvulsant? What helped most?" },
        "How did you manage the airway after the seizure stopped?",
        "What was your plan for another seizure in the back?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Protect, don't restrain. Time every seizure from when it starts",
        "Basic care: BGL, oxygen for SpO2 below 94%, temperature in a febrile child; request clinical support",
        { scope: "ao", text: "Consult the EOC Clinician for more than 5 minutes continuous, or clusters with little recovery causing harm" },
        { scope: "ao", text: "IM midazolam as advised: 0.15 mg/kg, single max 10 mg (half, max 5 mg, if 65+ or frail under 40 kg), no more than 5 mL per site" },
        { scope: "ao", text: "Prepare for respiratory depression and loss of airway control; NPA for trismus; closest ED with early notification" },
        { scope: "ar", text: "As an AR: protect the actively seizing patient, on their side, airway open and clear; consult the EOC Clinician regarding treatment and transport (CPP-037-AR)" }
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. The BGL is 2.1", text: "Josh's BGL is 2.1. Treat the hypoglycaemia as per the hypoglycaemia protocol: a treatable cause of seizure. Discuss what that changes in the call." } },
      { box: { title: "2. A febrile toddler", text: "A 2 year old with a fever has a short seizure and is now crying and drowsy. Febrile convulsions occur mostly from six months to six years and usually resolve without treatment. Basic care, remove outer clothing, request clinical support. Discuss what you say to the parents." } },
      { box: { title: "3. He hit his head", text: "Josh fell from the wool table at the start of the seizure and has a scalp wound. Head trauma is a treatable cause to attend to as soon as practicable. Discuss spinal precautions and what you tell the EOC Clinician." } },
      { scope: "ao", box: { title: "4. Aged 70", text: "The patient is Josh's grandfather, 70, about 80 kg, seizing for 7 minutes. Half the per kg dose, up to a maximum of 5 mg: midazolam 5 mg (5 mL), one site, as the EOC Clinician advises. Discuss why age matters for midazolam." } }
    ] }
  ],

  /* ---------- Ambulance Responder version (CPP-037-AR Seizures - AR v2.1) ---------- */
  ar: {
    replace: [["CPP-014-AO", "CPP-037-AR"], ["CPP-009-AO", "CPP-031-AR"], ["CPP-004-AO", "CPP-025-AR"], ["Ambulance Officer", "Ambulance Responder"],
      ["AO1", "AR1"], ["AO2", "AR2"], ["AO crew", "AR crew"]],
    title: "Seizures - AR",
    subtitle: "Walk-through scenario: 2-person volunteer AR crew",
    lead: "Clusters of seizures at a party, for a two-person volunteer Ambulance Responder crew, with eight break points for discussion, skills practice and decisions. No anticonvulsant at AR level: protect the patient, keep the airway open and clear, and consult the EOC Clinician regarding treatment and transport.",
    protocol: {
      code: "CPP-037-AR", name: "Seizures - AR", version: "v2.1 (2 December 2024)", exported: "31 August 2026",
      also: [{ code: "CPP-025-AR", name: "Basic Care and Life Support - AR", version: "v2.0 (4 January 2019)" }]
    },
    relatedCodes: ["CPP-014-AO"],
    footerNotes: ["This is a new training scenario written by DSY: the patient, story, observations, timings and EOC Clinician replies are fictional. Check it with your lead instructor."]
  }
};
