/* Dementia and changed behaviours - AO walk-through scenario (Jo-Anne, 84, near Cummins). Content only: the layout lives
   in /microlearning/shared/module.js. New on 10 Nov 2026, written by DSY to go with the microlearning module
   "Dementia and changed behaviours" (/microlearning/dementia/). Owner's choices: at home with her husband (Ray, a tired
   unpaid carer); the unmet needs behind the behaviour are pain and a possible infection; de-escalation works, no sedation,
   the EOC Clinician agrees transport for medical assessment. Failed de-escalation is a variation.
   Sources, exported 31.08.2026: CPP-017-AO Acute Behavioural Disturbance - AO v7.1 with CTL-011, CTL-052, CTL-053, CTL-056,
   CTL-122, CTL-123; CTL-094 PAINAD v1.0; CPP-013-AO Pain Management - AO v7.2 (paracetamol); CPP-062-AO Sepsis - AO v1.0
   with CTL-062 NEWS2 (as in the sepsis module); CTL-054 ISBAR. PLST, NDB and the de-escalation points: SAAS CEP Semester 2
   2026 Dementia session. Words: Dementia Australia Dementia Language Guidelines (2021).
   The story, observations, scores, timings and the EOC Clinician's and hospital's replies are DSY's. */
window.MODULE = {
  flow: true,
  scenario: true,
  draft: false,
  title: "Dementia - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Jo-Anne, 84: \"There's a strange man in my house\", near Cummins, 1840",
  lead: "A person living with dementia, distressed at the end of a long day, and a husband who has run out of ideas. Eight break points for discussion, skills practice and decisions. The key skills: the CTL-011 risk assessment, de-escalation with LOWLINE, looking for the unmet need (pain, the toilet, a possible infection), PAINAD, SAT and the MSE, voluntary care, and a calm trip to hospital. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 70,

  protocol: {
    code: "CPP-017-AO", name: "Acute Behavioural Disturbance - AO", version: "v7.1 (22 January 2025)", exported: "31 August 2026",
    also: [{ code: "CTL-094", name: "PAINAD (Advanced Dementia)", version: "v1.0" },
           { code: "CTL-052", name: "Possible Causes of Agitation" },
           { code: "CTL-011", name: "Risk Assessment Matrix" },
           { code: "CTL-123", name: "LOWLINE De-Escalation tool" },
           { code: "CPP-013-AO", name: "Pain Management - AO", version: "v7.2" },
           { code: "CTL-062", name: "NEWS2 Adult Sepsis Screening Tool", version: "v1.1" }]
  },
  footerNotes: ["The patient, story, observations, scores, timings and the EOC Clinician's and hospital's replies are a training scenario written by DSY. Check it with your lead instructor.",
    "The PLST and need-driven behaviour models and the de-escalation points come from the SAAS CEP Semester 2 2026 Dementia session. CPP-017-AO v7.1 shows no review date."],

  panels: [
    { title: "Overview", blocks: [
      { box: { title: "Learning objectives", items: [
        "Do an early risk assessment (CTL-011) and plan the approach, including who talks",
        "Recognise escalating agitation (STAMP, CTL-122) and de-escalate with LOWLINE (CTL-123) and dementia-informed strategies",
        "Look for the cause first: pain, hypoxia, infection, hypoglycaemia and the toilet (CTL-052)",
        "Score pain with PAINAD (CTL-094) and treat it (CPP-013-AO); score agitation with the SAT (CTL-053)",
        "Complete and document an MSE (CTL-056)",
        "Keep care voluntary where possible, and know what CPP-017-AO says when de-escalation fails",
        "Use person-first language, and hand over what helped"
      ] } },
      { box: { title: "Required equipment", items: [
        "Ambulance response bag, Corpuls3 monitor (SpO2, NIBP), BGL monitor, tympanic thermometer, ePCR tablet",
        "Paracetamol (training stock, or an empty packet: nobody takes a tablet)",
        "Stretcher, blankets",
        "Props: a kitchen chair, a cardigan, a pair of hearing aid cases, a crocheted rug, a TV or a phone playing loud news",
        "Printed or on-screen: PAINAD (CTL-094), SAT (CTL-053), MSE (CTL-056), NEWS2 in the SAAS Clinical app"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 40 to 45 minutes; debrief 15 minutes",
        "Farmhouse 12 km from Cummins. Cummins Hospital about 15 minutes away",
        "Paramedic clinical support from Port Lincoln: about 45 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): the one voice Jo-Anne hears. Approach, de-escalation, assessment, decisions",
        "Driver (AO2): Ray, the history, the environment, obs when Jo-Anne allows, documentation, calls"
      ] } },
      { box: { title: "Playing Jo-Anne (facilitator)", items: [
        "Jo-Anne is frightened, not angry. She calms when people slow down, sit, and don't argue",
        "She gets louder when two people talk at once, when she's touched without warning, or when she's told she's wrong",
        "She keeps rubbing her lower tummy and drifting towards the hallway (the toilet)"
      ] } }
    ] },

    { title: "Pre-brief: behaviour is communication", blocks: [
      { text: "About 10 minutes. Read this together before the scenario. The Dementia module has the detail." },
      { box: { title: "Two models (CEP session)", items: [
        "PLST: dementia lowers the person's tolerance to stress. Stress builds up through the day until they can't regulate their emotions or behaviour",
        "Need-driven behaviour: background factors (dementia severity, health, hearing and vision, personality) plus proximal factors (pain, toilet, thirst, fear, noise, strangers) lead to behaviours such as pacing, agitation or calling out",
        "Neither sees behaviour as deliberate. Ask: what is this person trying to tell me?"
      ] } },
      { box: { title: "CPP-017-AO in brief", items: [
        "Basic care, a risk assessment (CTL-011), an MSE (CTL-056) and a SAT score (CTL-053)",
        "Consider possible causes of agitation (CTL-052)",
        "De-escalate: personal space, body language, eye contact, voice tone and style, reassurance of safety, STAMP and LOWLINE",
        "Care is voluntary where possible. Restrictive practices are measures of last resort",
        "Still agitated: consider clinical support and consult the EOC Clinician, who may recommend oral lorazepam 1 to 3 mg or oral olanzapine 5 to 10 mg"
      ] } },
      { box: { title: "Words", items: [
        "A person living with dementia, not \"a dementia patient\" or \"demented\"",
        "Changed behaviours or expressions of unmet need, not \"challenging behaviours\"",
        "Ask Ray what he'd like to be called. He's her husband first"
      ], note: "Dementia Australia Dementia Language Guidelines." } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Tuesday in May, 1840. Dark and cool. You and your crew partner are paged from home in Cummins. About 12 minutes to the farmhouse." },
      { box: { title: "MDT display", items: [
        "Priority 2, Behavioural disturbance, 84F",
        "Farmhouse 12 km north of Cummins",
        "History of dementia. Husband reports she is agitated, does not recognise him, and pushed him away",
        "No weapons. No injuries reported. Husband is safe and waiting at the front door",
        "Caller: husband (Ray)"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What does the MDT tell you? What worries you?", "Do a risk assessment now (CTL-011). Is this high risk?", "How will you go in, and who will talk?", "What might be behind the change in Jo-Anne tonight?"],
        expected: [
          "An 84-year-old living with dementia, agitated, not recognising her husband, pushed him away. It's evening: the end of a long day",
          "CTL-011: dementia is a risk factor for violent behaviour (agitation from paranoid delusions). No weapon, no verbal threats, no drugs, no history of violence reported: not on the high-risk list. Stay alert and reassess at the door",
          "Calmly, no lights or sirens on arrival. Park so you can leave easily. AO1 is the one voice Jo-Anne hears; AO2 meets Ray first",
          "CTL-052: BPSD, delirium, infection, pain, hypoglycaemia, hypoxia, head injury, medication. The session's first five: pain, hypoxia, infection, hypoglycaemia, the toilet"
        ],
        teaching: ["The early risk assessment tells you whether you need more SAAS or SAPOL resources (CPP-017-AO)", "High risk of violence (a weapon, threats, attempts to injure): don't enter or withdraw, request SAPOL, Code 51 or the duress alarm if in immediate danger (CTL-011)"],
        realJob: "Ask the EOC to tell Ray you're 10 minutes away, and to turn the TV down if he can. Small changes before you arrive help.",
        decisions: [{ q: "Jo-Anne is agitated and pushed her husband's hand away. No weapon, no threats. What does CTL-011 suggest?", options: [
          "High risk of violence: don't enter, request SAPOL",
          "Dementia is a risk factor, but none of the high-risk behaviours are reported. Go in carefully and keep reassessing",
          "No risk at all: she's 84" ], answer: 1,
          why: "CTL-011 lists dementia among the risk factors for violent behaviour. The high-risk behaviours are drug use with violence, a weapon, verbal threats, attempts to injure bystanders or crew, and a past history of severe violence towards crews." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "1852. Ray, 86, meets you at the door. He looks exhausted. \"I'm sorry to call you. She's never been like this. She doesn't know who I am. She pushed me when I tried to put her cardigan on.\" The TV is loud in the lounge. In the kitchen, Jo-Anne is walking between the table and the hallway door, cardigan half on. She stops and stares at you." },
      { text: "\"Who are you? Who let you in? There's a strange man in my house. I want to go home. Mum will be waiting.\" Her voice is raised. She asks again, and again.", muted: true },
      { breakpoint: { title: "First contact", type: "Discussion",
        prompts: ["What do you see? Use STAMP.", "What is her SAT score?", "What do you change in the room first?", "How do you introduce yourself?"],
        expected: [
          "Staring, raised voice, anxiety, repeating the same questions, pacing: escalating agitation (CTL-122). No weapon, no threats",
          "SAT +2: very anxious and agitated, loud outbursts (CTL-053)",
          "AO2 turns the TV off and takes Ray to the lounge to talk. One crew member with Jo-Anne. Lights softer. Keep your distance and leave her a clear path (CEP session)",
          "AO1 stops at a distance, at her eye level if she sits, open hands, calm voice: \"Hello Jo-Anne, I'm Sam from the ambulance. I've come to see if you're all right.\""
        ],
        teaching: ["PLST: you and your partner are two more stressors at the end of her day. Take away what you can", "Pacing is a reliable sign of increasing agitation (CTL-122)", "CPP-017-AO: personal space, body language, eye contact, voice tone and style, reassurance of safety"],
        realJob: "Don't walk straight at her with the kit. Put the bag down by the door. It can wait.",
        decisions: [{ q: "Jo-Anne says \"There's a strange man in my house\", meaning Ray. What do you say?", options: [
          "\"That's your husband, Jo-Anne. You've been married for 60 years.\"",
          "\"That sounds frightening. You're safe, I'm here to help. Will you tell me about your mum?\"",
          "Say nothing and start the obs" ], answer: 1,
          why: "CEP session: never contradict or challenge, acknowledge and redirect to familiar topics. LOWLINE: offer reflective comments that validate what she's experiencing, and express empathy (CTL-123). Correcting her adds to her fear." }],
        cards: [{ q: "What does STAMP stand for?", a: "Staring, Tone, Anxiety, Mumbling, Pacing: signs that agitation is escalating (CTL-122)." }]
      } }
    ] },

    { title: "LOWLINE at the kitchen table", blocks: [
      { text: "AO1 asks: \"Can I sit down here, Jo-Anne?\" She doesn't answer, but stops pacing. AO1 sits. Jo-Anne talks about her mum, and the farm at Lock where she grew up. AO1 listens, nods, and lets her finish." },
      { text: "In the lounge, Ray tells AO2 that her hearing aids are on the bench. \"She took them out this morning. She says they whistle.\" AO2 brings them to the kitchen and puts them on the table. AO1 asks Jo-Anne if she'd like them in. She puts them in herself." },
      { breakpoint: { title: "Settling", type: "Practical skill",
        prompts: ["AO1: use LOWLINE with Jo-Anne's player. Go through each letter.", "Why do the hearing aids matter?", "Jo-Anne reaches to rub her lower tummy, then looks towards the hallway. What might she be telling you?", "What's her SAT now?"],
        expected: [
          "Listen, Offer reflective comments, Wait, Look (appropriate eye contact), Incline the head, Nod, Express empathy (CTL-123)",
          "A background factor (sensory impairment). Without them, every question is harder to follow and more threatening (CEP session)",
          "Pain (rubbing her tummy) and needing the toilet (moving towards the hallway): proximal physiological needs",
          "SAT +1: anxious and restless, but talking normally"
        ],
        teaching: ["Give back control: let her put the hearing aids in herself. Small permissions, one at a time (CEP session)", "Take your time when there's no immediate risk"],
        realJob: "\"Jo-Anne, you keep holding your tummy. Is it sore there?\" She may not say yes. Watch her face as she answers.",
        decisions: [{ q: "Which LOWLINE step is about not interrupting?", options: ["Look", "Wait: until she has explained her issue, said her concerns and how she feels", "Nod"], answer: 1,
          why: "CTL-123: Wait until the patient has explained their issue, expressed their concerns, and articulated how they are feeling." }]
      } }
    ] },

    { title: "Ray's story", blocks: [
      { box: { title: "History from Ray", items: [
        "Alzheimer's disease, diagnosed 6 years ago. Usually knows Ray and the house, does the crossword with him, and needs help with dressing and her tablets",
        "Since yesterday: more confused than her usual, up most of last night, going to the toilet a lot and says it stings. Her urine smells strong. Hardly drinking. Skipped tea tonight",
        "No falls, no head knocks that Ray knows of",
        "Medicines: donepezil, amlodipine, paracetamol 1 g in the morning for her knees (last at 0800). No allergies",
        "Ray has hardly slept for two nights. Their daughter lives in Adelaide"
      ] } },
      { breakpoint: { title: "What's driving it?", type: "Discussion",
        prompts: ["Sort what you know into background and proximal factors.", "Which causes from CTL-052 are now on your list?", "What do you ask Ray about Jo-Anne's usual self, and why does it matter?", "How is Ray?"],
        expected: [
          "Background: Alzheimer's disease, hearing loss, age. Proximal: pain, needing the toilet, a possible infection, thirst, no sleep, the noise, strangers in her house",
          "Infection and delirium (a change from her usual self since yesterday), BPSD, pain. Still to check: hypoglycaemia and hypoxia",
          "What's usual, what's different and when it changed. A change from her usual self is a reason to look for a medical cause, not to put it down to the dementia",
          "Exhausted and upset. He's been trying to help for hours. Thank him and include him (CEP session)"
        ],
        teaching: ["Gather as much information as you can from the people who know her: it's patient-centred care (CEP session)", "Ask Ray what he'd like to be called. Not everyone likes the word carer (Dementia Australia)"],
        realJob: "\"Ray, you've done everything right by calling. Tell me what Jo-Anne's like on a good day.\"",
        decisions: [{ q: "Jo-Anne has been more confused than usual since yesterday, with stinging when she passes urine. What does that suggest?", options: [
          "It's just her dementia getting worse",
          "A possible infection and delirium: a medical cause to look for (CTL-052)",
          "She's doing it for attention" ], answer: 1,
          why: "CPP-017-AO: an acute behavioural disturbance may be a symptom of an underlying condition; consider all possible causes, including infection. CTL-052 lists infection, delirium and BPSD." }]
      } }
    ] },

    { title: "Obs, one step at a time", blocks: [
      { text: "1908. AO1 asks for each step before doing it: \"Can I pop this on your finger, Jo-Anne?\" She lets AO1 hold her wrist, then the BP cuff on the second try. The thermometer and the BGL finger prick go in last." },
      { table: { title: "Set 1, sitting at the kitchen table (1912)", table: { head: ["RR", "SpO2", "BP", "Pulse", "Temp", "GCS", "BGL"], rows: [["18", "96% (air)", "128/74", "96 regular", "37.6", "14 (E4 V4 M6)", "7.2"]] } } },
      { table: { title: "PAINAD (CTL-094), 1912", table: { head: ["Item", "What you see", "Score"], rows: [
        ["Breathing", "Normal", "0"],
        ["Negative vocalisation", "Occasional moan", "1"],
        ["Facial expression", "Grimaces when she shifts in the chair", "2"],
        ["Body language", "Pushed Ray's hand away", "2"],
        ["Consolability", "Ray couldn't settle her", "2"],
        ["Total", "", "7"]
      ] } } },
      { breakpoint: { title: "Putting it together", type: "Practical skill",
        prompts: ["AO2: run NEWS2 in the SAAS Clinical app. What score and band?", "Which causes can you now rule out?", "Score PAINAD with the group. Do you agree with 7?", "Complete the MSE out loud."],
        expected: [
          "NEWS2 4 (new confusion 3, pulse 96 scores 1, the rest 0): any single score of 3 = high band. CTL-062: consider management as per the Sepsis CPP, consider clinical support, transport, say suspected sepsis at handover, obs and NEWS2 every 15 minutes",
          "Hypoglycaemia (BGL 7.2) and hypoxia (SpO2 96% on air)",
          "PAINAD 7 of 10: a lot of pain behaviour. She can't reliably rate her pain with numbers, so a behavioural tool is right",
          "Appearance: cardigan half on, unsteady. Behaviour: pacing, restless. Conversation: loud, fast, repetitive. Mood: anxious, frightened. Perception: believes a stranger is in the house (doesn't recognise Ray). Cognition: alert, oriented to person only (usually knows Ray and her home). Insight: poor (CTL-056)"
        ],
        teaching: ["CPP-017-AO: an MSE must be completed and documented", "The NEWS2 score is DSY's worked example: check it in the app. Not febrile and talking: she doesn't meet the protocol's 'febrile with an altered conscious state' description for a ceftriaxone consult, but raise the possible infection with the EOC Clinician"],
        realJob: "Record the times. You'll score PAINAD and SAT again later, and the trend is what the hospital needs.",
        decisions: [{ q: "Jo-Anne can't rate her pain with a number. What does the crew use?", options: ["Skip pain scoring", "PAINAD (CTL-094): breathing, vocalisation, face, body language, consolability", "The Faces scale"], answer: 1,
          why: "CTL-094 PAINAD is the SAAS behavioural pain tool for advanced dementia: five items, each 0 to 2, total 0 to 10." }],
        cards: [{ q: "Name the five PAINAD items.", a: "Breathing independent of vocalisation, negative vocalisation, facial expression, body language, consolability (CTL-094)." }]
      } }
    ] },

    { title: "Meeting her needs", blocks: [
      { text: "1918. Jo-Anne stands and heads for the hallway again. AO1 asks: \"Are you looking for the toilet, Jo-Anne?\" She nods. Ray goes with her. She comes back calmer." },
      { breakpoint: { title: "Pain relief", type: "Decision making",
        prompts: ["Can you give Jo-Anne paracetamol? Check CPP-013-AO.", "How will you offer it?", "What else helps her pain and her distress?"],
        expected: [
          "Yes: adults 1000 mg oral, if none in the past 4 hours. Her last dose was at 0800. No allergies",
          "Offer it, don't insist: Ray hands her the tablets with a glass of water, the way he does every morning. Care is voluntary",
          "The toilet, a drink if she'll take one, her rug, sitting rather than lying, a quiet room, Ray beside her (CPP-013-AO basic measures: reassurance, posture, temperature control)"
        ],
        teaching: ["PAINAD tells you pain is likely. Treat it as you would for anyone (CPP-013-AO), and score it again after", "Addressing the cause often works better than trying to suppress the behaviour (CEP session)"],
        realJob: "A familiar hand and a familiar routine get a tablet taken more easily than a stranger with a medicine cup.",
        decisions: [{ q: "Jo-Anne's last paracetamol was at 0800. It's now 1920. What does CPP-013-AO allow?", options: [
          "Nothing: she has dementia, so she can't consent to any medicine",
          "Paracetamol 1000 mg oral (none in the past 4 hours), offered with her agreement",
          "Paracetamol 500 mg only, because she's over 80" ], answer: 1,
          why: "CPP-013-AO: paracetamol, if none in the past 4 hours, adults 1000 mg oral. CPP-017-AO: care is voluntary where possible." }]
      } },
      { text: "1922. Jo-Anne takes the paracetamol from Ray and sips some water. She holds his hand. \"You're a good man,\" she tells him.", muted: true }
    ] },

    { title: "The EOC Clinician and the plan", blocks: [
      { text: "1935. Jo-Anne is quieter, sitting with her rug, hearing aids in, holding Ray's hand. A slight frown, a little fidgety, settles when spoken to: PAINAD 3, SAT +1. AO2 calls the EOC Clinician." },
      { box: { title: "EOC Clinician's reply (DSY)", items: [
        "\"Thanks. It sounds like the de-escalation has worked, so no medication from me. She needs a medical review for a possible urinary infection and delirium.\"",
        "\"Take her to Cummins Hospital if she's happy to go. Ray goes with her. Repeat the obs and NEWS2 every 15 minutes, and call me back if she becomes distressed again or anything changes.\""
      ] } },
      { breakpoint: { title: "Going to hospital, voluntarily", type: "Decision making",
        prompts: ["How do you ask Jo-Anne to come to hospital?", "She says \"Only if Ray comes.\" Is that a yes?", "Does she need sedation, restraint or care and control?", "What if she'd said no and wouldn't settle?"],
        expected: [
          "Simply, one idea at a time, linked to what she cares about: \"Your tummy's sore. Let's get a doctor to look. Ray's coming too.\"",
          "Yes, with Ray beside her. Care on a voluntary basis (CPP-017-AO)",
          "No. She's settled and agreeing. Restrictive practices are measures of last resort (CPP-017-AO)",
          "Consider clinical support and consult the EOC Clinician, who may recommend oral lorazepam or olanzapine; consult again after 30 minutes if symptoms continue; SAPOL if necessary. Care and control is discussed with the EOC Clinician (see variation 2)"
        ],
        teaching: ["Ambulance Officers must discuss the clinical and legal provision of care under the Mental Health Act 2009 with an EOC Clinician (CPP-017-AO)", "Restraint, if ever used, is a last resort and an adjunct to safe transport, per CPPro-035"],
        realJob: "\"Jo-Anne, would you like to bring your rug?\" A choice she can make is better than an instruction.",
        decisions: [{ q: "Jo-Anne is calm and agrees to go if Ray comes. What does CPP-017-AO say about how her care is provided?", options: [
          "Sedate her before transport to be safe",
          "On a voluntary basis where possible; restrictive practices are a last resort",
          "She can't agree, so care and control is automatic" ], answer: 1,
          why: "CPP-017-AO: care must be provided on a voluntary basis where possible. Restrictive practices are measures of last resort." }]
      } }
    ] },

    { title: "The move and the trip", blocks: [
      { text: "1945. Jo-Anne walks with Ray and AO1 to the stretcher at the front door. She brings her rug. AO2 packs her glasses, her medicines, and the hearing aid case." },
      { breakpoint: { title: "Keeping her calm en route", type: "Discussion",
        prompts: ["How do you set up the ambulance for Jo-Anne?", "What does PLST tell you about this part of the job?", "What do you watch for on the way?"],
        expected: [
          "No lights or sirens. Cabin lights low. Ray where she can see him. Her rug and a familiar object in her hands. Talk about the farm at Lock (CEP session; seating per local practice)",
          "The trip, the hospital and new faces are more stressors on top of her day. Keep modulating, and slow down at each step",
          "STAMP signs coming back, the SAT, pain (PAINAD again), and obs and NEWS2 every 15 minutes"
        ],
        teaching: ["Sensory tools may help. Think about the best time to offer them: before she's distressed, not after (CEP session discussion)", "Score PAINAD and SAT again before handover"],
        realJob: "Tell her before every bump and turn. \"Just a little bump now, Jo-Anne.\""
      } },
      { table: { title: "En route (2000)", table: { head: ["RR", "SpO2", "BP", "Pulse", "Temp", "GCS", "PAINAD", "SAT"], rows: [["16", "96% (air)", "124/72", "90", "37.5", "14", "2", "0"]] } } }
    ] },

    { title: "Handover at Cummins Hospital", blocks: [
      { text: "2003. AO2 called the hospital as you left. The nurse in charge meets you, in a quiet side room as you asked." },
      { table: { title: "ISBAR (CTL-054)", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Officer from Cummins. This is Jo-Anne Smith, 84, and her husband Ray.\""],
        ["S", "\"Jo-Anne lives with Alzheimer's disease. Since yesterday she's been more confused than her usual, and tonight she didn't recognise Ray and was very distressed. She has urinary frequency and stinging, and we think she has lower tummy pain.\""],
        ["B", "\"Usually knows Ray and her home. Donepezil, amlodipine, paracetamol in the morning. No allergies. No falls.\""],
        ["A", "\"1912: SAT +2, PAINAD 7, GCS 14 confused, temp 37.6, pulse 96, BGL 7.2, NEWS2 4. Paracetamol 1 g at 1922. Now SAT 0, PAINAD 2, pulse 90. MSE on the PCR.\""],
        ["R", "\"Review for a possible infection and delirium. What helped: one voice, TV off, her hearing aids in, Ray beside her, not correcting her. She settles when you talk about the farm at Lock.\""]
      ] } } },
      { breakpoint: { title: "Hand over what helped", type: "Practical skill",
        prompts: ["Deliver your ISBAR now. Go.", "Which scores and times must the nurse hear?", "What do you hand over that isn't on the obs chart?"],
        expected: ["The change from her usual self since yesterday, the urinary symptoms, the pain", "SAT and PAINAD before and after, with times, and the paracetamol time", "What helped and what upset her, so the hospital doesn't add stressors"],
        teaching: ["Use person-first words in the handover and on the PCR: 'a person living with dementia', 'changed behaviour' (Dementia Australia)", "Say 'suspected sepsis' at handover if your NEWS2 band asks for it (CTL-062)"],
        realJob: "\"She was calm in the ambulance\" is useful. \"She was calm because Ray was holding her hand and the lights were down\" is better.",
        decisions: [{ q: "Which detail will help the hospital staff most with Jo-Anne's behaviour?", options: ["That she pushed Ray", "What settled her: one voice, hearing aids, Ray beside her, not being corrected", "Her address"], answer: 1,
          why: "Hand over what helped. The hospital is another unfamiliar, noisy place: more stressors (PLST). Telling staff what works lets them keep her stress low." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "What did your risk assessment say, and when did you reassess it?",
        "What were the stressors in the house, and which ones did you take away?",
        "When did you first think about pain and the toilet?",
        "How did you respond when Jo-Anne said Ray was a stranger? How did it feel not to correct her?",
        "What did PAINAD and the SAT show, before and after?",
        "What would you have done if she'd refused to come?",
        "How did you look after Ray?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Behaviour is communication. Ask what she's trying to tell you",
        "Look for the cause first: pain, hypoxia, infection, hypoglycaemia, the toilet",
        "One voice, quiet, slow, at her level. Acknowledge and redirect; never contradict",
        "PAINAD for pain when she can't tell you. Treat it, then score again",
        "Voluntary care where possible. Restrictive practices are a last resort",
        "Hand over what helped"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. A knife", text: "As you arrive, Jo-Anne is holding a kitchen knife and shouting at Ray to get out. A weapon is a high-risk behaviour (CTL-011): don't enter or withdraw immediately, request SAPOL, and if anyone is in immediate danger call Code 51 or activate the radio duress alarm. Get Ray out safely if you can do it without risk. Talk from a safe distance." } },
      { box: { title: "2. De-escalation doesn't work", text: "Jo-Anne stays at SAT +2, won't let anyone near her and tries to leave the house into the dark. Consider clinical support and consult the EOC Clinician, who may recommend oral lorazepam 1 to 3 mg or oral olanzapine 5 to 10 mg. If symptoms continue after 30 minutes, consult again. Monitor RR and regular vital signs. Consider SAPOL where necessary. Discuss care and control under the Mental Health Act 2009 with the EOC Clinician; if authorised, tell her, give a statement of rights where practical, and document with CTL-125. Restraint net only if trained, available, and nothing less restrictive has worked (CPP-017-AO)." } },
      { box: { title: "3. A low sugar", text: "Her BGL is 2.9. Hypoglycaemia is on the CTL-052 list: manage it as per CPP-009-AO, and reassess her behaviour once it's treated." } },
      { box: { title: "4. Two crew, both talking", text: "Run the first contact again with both crew talking to Jo-Anne at once and the TV left on. Watch the STAMP signs rise. Then reset and do it with one voice. Discuss the difference (PLST)." } }
    ] }
  ]
};
