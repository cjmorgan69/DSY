/* Dementia and changed behaviours - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Sources (owner's request, 10 Nov 2026):
   CPP-017-AO Acute Behavioural Disturbance - AO v7.1 (22 Jan 2025, no review date shown), exported 31.08.2026, with the
   checklists it names, all exported 31.08.2026: CTL-011 Risk Assessment Matrix, CTL-052 Possible Causes of Agitation,
   CTL-053 SAT (Sedation Assessment Tool), CTL-056 MSE (Mental State Examination), CTL-122 STAMP Escalation Recognition
   Tool, CTL-123 LOWLINE De-Escalation tool, CTL-125 Mental Health Act 2009 & Care and Control (Statement for PCR); and
   CTL-094 PAINAD (Advanced Dementia) v1.0 (28 Mar 2023). Paracetamol from CPP-013-AO v7.2 (as in the pain module).
   The PLST and NDB models, the stressors, unmet needs and de-escalation points are from the SAAS CEP Semester 2 2026
   Dementia session (facilitator guide and PowerPoint, owner's files, not in the repo).
   Words: Dementia Australia "Dementia Language Guidelines" (2021, owner's PDF).
   The case (Joan), checker scenarios and the practical are DSY-written for the owner to review. */

var M = window.MODULE = {
  flow: true,
  draft: false,                       // the de-escalation video slot (De-escalate panel) is hidden until its src is set
  title: "Dementia and changed behaviours",
  subtitle: "Ambulance Officer microlearning",
  headline: "Behaviour is communication",
  lead: "Agitation, fear, pacing, refusing care: when a person living with dementia is distressed, the behaviour is usually telling you something. This module covers why behaviour changes (the PLST and need-driven behaviour models), looking for the cause first, PAINAD, and the AO Acute Behavioural Disturbance protocol (CPP-017-AO): risk assessment, de-escalation, the EOC Clinician, and care and control.",
  minutes: 25,

  protocol: {
    code: "CPP-017-AO", name: "Acute Behavioural Disturbance - AO", version: "v7.1 (22 January 2025)", exported: "31 August 2026",
    also: [
      { code: "CTL-052", name: "Possible Causes of Agitation" },
      { code: "CTL-094", name: "PAINAD (Advanced Dementia)", version: "v1.0" },
      { code: "CTL-011", name: "Risk Assessment Matrix" },
      { code: "CTL-122", name: "STAMP Escalation Recognition Tool" },
      { code: "CTL-123", name: "LOWLINE De-Escalation tool" },
      { code: "CTL-053", name: "SAT (Sedation Assessment Tool)" },
      { code: "CTL-056", name: "MSE (Mental State Examination)" }
    ]
  },
  relatedCodes: ["CPP-013-AO"],
  footerNotes: [
    "The PLST and need-driven behaviour models, the stressors and the de-escalation points come from the SAAS CEP Semester 2 2026 Dementia session. Preferred words are from the Dementia Australia Dementia Language Guidelines (2021).",
    "CPP-017-AO v7.1 shows no review date. Check the SAAS Clinical app for newer versions.",
    "Joan's case, the PAINAD scenarios, the practical and the notes marked \"DSY\" were written for training and should be checked by your lead instructor."
  ],

  session: {
    intro: "For a team-led session, based on the SAAS CEP Dementia session plan. Allow about 60 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Icebreaker", time: "5 min", text: "Ask: \"What changed behaviours in people living with dementia do you most often see on jobs?\" Then: \"What in the ambulance might add stress for them?\" (noise, lights, unfamiliar places, time pressure, several clinicians, pain or illness)." },
      { t: "PLST", time: "8 min", text: "Read the PLST section. Ask: \"Have you seen a patient calm at first, then distressed later in the job? What stressors might we add without knowing it?\"" },
      { t: "Need-driven behaviour", time: "12 min", text: "Read the NDB section. Ask: \"How might hearing loss change a patient's response to our assessment?\" and \"A patient suddenly becomes agitated: which physical causes do you think of first?\" Then the group exercise: for each behaviour, what unmet need might sit behind it?" },
      { t: "The video", time: "15 min", text: "Play the de-escalation video. Pause once the clinician has rapport and discuss the techniques used. Then finish it and discuss sensory tools, care en route, and pain: what was her PAINAD?" },
      { t: "The protocol", time: "10 min", text: "Read the CPP-017-AO sections. Check everyone can say what the EOC Clinician may recommend, and why restrictive practices are a last resort." },
      { t: "Summary and quiz", time: "10 min", text: "Read the take-home messages aloud. Then everyone does the quiz alone. Next time: Joan's walk-through." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Behaviour is communication" } },
      { text: "People living with dementia often need ambulance care. Changed behaviours can be one of the hardest parts of that care: agitation, aggression, anxiety, refusing assessment, wandering, asking the same question again and again, or distress during transport or treatment." },
      { text: "It's easy to focus on the behaviour itself. This module looks at what may be driving it, and how understanding the cause can make care safer and kinder, for the patient and for you." },
      { box: { title: "Three ideas to carry through", tone: "warn", items: [
        "Behaviour is communication",
        "Most behaviours have an underlying trigger or unmet need",
        "Understanding the reason behind the behaviour often improves patient outcomes and clinician safety"
      ] } },
      { box: { title: "Before you read on", items: [
        "Joan, 84, has Alzheimer's disease. Tonight she doesn't recognise her husband Ray, says there's a strange man in the house, and pushed his hand away when he tried to help her",
        "Instead of asking \"What's wrong with her?\", what is Joan trying to tell you?"
      ] } },
      { note: "Joan's case: DSY-written. Her full story is in the walk-through scenario." }
    ] },

    { title: "Words matter", blocks: [
      { text: "The words we use, on scene, on the radio and on the PCR, shape how people living with dementia are seen and treated. Dementia Australia asks that language be accurate, respectful, inclusive, empowering and non-stigmatising." },
      { table: { title: "Say this, not that (Dementia Australia)", table: { head: ["Instead of", "Say"], rows: [
        ["Demented, senile, dementia sufferer or victim", "A person living with dementia, a person with dementia"],
        ["Challenging, difficult behaviours, behaviours of concern", "Changed behaviours, expressions of unmet need, behavioural and psychological symptoms of dementia (clinical)"],
        ["Wanderer, screamer, aggressor, obstructive, difficult", "Describe what's happening: walking and pacing, calling out, pushing away"],
        ["Carer burden", "The impact of supporting someone with dementia"],
        ["Early onset dementia (under 65)", "Younger onset dementia"]
      ] } } },
      { box: { title: "Why it matters", items: [
        "Dementia is a collection of symptoms caused by disorders affecting the brain. It isn't one disease, and it isn't a normal part of ageing",
        "Changed behaviours are usually an expression of a need or sensation the person can't put into words: frustration, pain, boredom, loneliness, confusion",
        "Not everyone likes to be called a carer. Ask a family member what they'd like to be called: husband, daughter, friend",
        "\"Patient\" is fine in the medical context"
      ] } }
    ] },

    { title: "Why behaviour changes: two models", blocks: [
      { text: "Two models help explain changed behaviours. Neither one sees the behaviour as deliberate misconduct. Both see it as a response to stress, the environment, or unmet needs." },
      { box: { title: "Progressively Lowered Stress Threshold (PLST)", tone: "warn",
        check: { q: "Joan was calm when you arrived. Twenty minutes later, after obs, questions and the stretcher, she's shouting. What does the PLST model suggest?", a: "Stress has built up through her day and through your job, one thing after another, until she's past the point where she can regulate her emotions and behaviour. It's accumulated stress, not a reaction to one event. Take away what you can: slow down, one voice, less noise, fewer people." },
        items: [
          "Dementia gradually lowers a person's tolerance to stress",
          "Stress builds up through the day",
          "The person's ability to process and cope goes down",
          "Eventually they reach a point where they can no longer regulate their emotions or behaviour"
        ], note: "Example from the session: poor sleep, a noisy morning at home, an ambulance arriving, vital signs, then an unfamiliar hospital. Each adds stress until the behaviour escalates." } },
      { box: { title: "Stressors we bring", items: [
        "Noise, sirens, bright lights",
        "Unfamiliar people and surroundings",
        "Several clinicians at once",
        "Time pressure",
        "Pain or illness, and our own assessment: touching, cuffs, questions"
      ] } },
      { text: "The Need-Driven Dementia-Compromised Behaviour (NDB) model changes the question. Instead of \"What's wrong with this patient?\", ask \"What is this patient trying to communicate?\" It sorts the causes into background factors, proximal factors, and the behaviours that result." },
      { table: { title: "Background factors: there before the behaviour starts", table: { head: ["Factor", "Examples"], rows: [
        ["Neurocognitive", "How severe the dementia is, memory impairment, communication difficulties"],
        ["General health", "Chronic illness, frailty, pain, sensory impairment (hearing, vision)"],
        ["Personal characteristics", "Personality, coping style, previous experiences"],
        ["Socio-demographic", "Background and life circumstances"],
        ["Genetics", "Inherited factors"]
      ] } } },
      { table: { title: "Proximal factors: what's happening right now", table: { head: ["Factor", "Examples"], rows: [
        ["Physiological needs", "Pain, hunger, thirst, needing the toilet, infection, hypoxia"],
        ["Psychological needs", "Fear, confusion, loneliness, loss of control"],
        ["Social environment", "Separated from family, unfamiliar people"],
        ["Physical environment", "Noise, bright lighting, sirens, a crowded emergency department"]
      ] } } },
      { table: { title: "Behaviours, and the needs that might sit behind them", text: "These behaviours are often symptoms rather than the main problem. Addressing the cause usually works better than trying to suppress the behaviour.", table: { head: ["Behaviour", "Possible unmet need"], rows: [
        ["Walking and pacing", "Needs the toilet, anxiety, discomfort"],
        ["Agitation and aggression", "Fear, confusion, pain"],
        ["Vocally disruptive behaviour (calling out)", "Loneliness, discomfort, needs reassurance"],
        ["Depression and anxiety", "Too much going on around them, uncertainty"]
      ] } } }
    ] },

    { title: "Look for the cause first", blocks: [
      { text: "CPP-017-AO: an acute behavioural disturbance may be a symptom of a large range of underlying conditions. Consider all possible causes, including hypoxia, hypovolaemia, hypoglycaemia, head injury, infection and substance use, and treat where possible." },
      { box: { title: "Suddenly agitated? Think of these first (CEP session)", tone: "warn", items: [
        "Pain",
        "Hypoxia",
        "Infection",
        "Hypoglycaemia",
        "Needing the toilet"
      ] } },
      { box: { title: "Possible causes of agitation (CTL-052): medical", items: [
        "Head trauma",
        "Encephalitis, meningitis or other infection",
        "Encephalopathy (particularly from liver or renal failure)",
        "Exposure to environmental toxins",
        "Metabolic derangement (low sodium, low calcium, hypoglycaemia)",
        "Hypoxia",
        "Thyroid disease",
        "Hypothermia or hyperthermia",
        "Seizure (post-ictal)",
        "Toxic levels of medication",
        "Behavioural and Psychological Symptoms of Dementia (BPSD)",
        "Delirium"
      ], note: "CTL-052 also lists drug toxicity or withdrawal, psychiatric disorders, and situational crises (overwhelming grief, stress). The full list is under Reference." } },
      { text: "Dementia and delirium are both on the list. A person living with dementia can also become acutely unwell: a change from their usual self is a reason to look for a medical cause, not to put it down to the dementia." },
      { text: "Pain is easy to miss when a person can't tell you about it. CTL-094 PAINAD is a behavioural pain tool for people with advanced dementia. Score each of five items 0, 1 or 2." },
      { tool: {
        title: "PAINAD score (CTL-094)",
        intro: "Watch the person for a few moments and choose what fits best for each item. The total runs from 0 (no observable pain) to 10 (highest observable pain). CTL-094 gives no action bands: use the score with your assessment and CPP-013-AO, and score again after treatment.",
        fields: [
          { id: "breath", type: "choice", label: "Breathing, independent of vocalisation", options: [
            { value: "0", label: "0 Normal" }, { value: "1", label: "1 Occasional laboured breathing; short period of hyperventilation" }, { value: "2", label: "2 Noisy laboured breathing; long period of hyperventilation; Cheyne-Stokes respirations" }] },
          { id: "voc", type: "choice", label: "Negative vocalisation", options: [
            { value: "0", label: "0 None" }, { value: "1", label: "1 Occasional moan or groan; low-level speech with a negative or disapproving quality" }, { value: "2", label: "2 Repeated troubled calling out; loud moaning or groaning; crying" }] },
          { id: "face", type: "choice", label: "Facial expression", options: [
            { value: "0", label: "0 Smiling or inexpressive" }, { value: "1", label: "1 Sad; frightened; frown" }, { value: "2", label: "2 Facial grimacing" }] },
          { id: "body", type: "choice", label: "Body language", options: [
            { value: "0", label: "0 Relaxed" }, { value: "1", label: "1 Tense; distressed; pacing; fidgeting" }, { value: "2", label: "2 Rigid; fists clenched; knees pulled up; pulling or pushing away; striking out" }] },
          { id: "cons", type: "choice", label: "Consolability", options: [
            { value: "0", label: "0 No need to console" }, { value: "1", label: "1 Distracted or reassured by voice or touch" }, { value: "2", label: "2 Unable to console, distract, or reassure" }] }
        ],
        evaluate: function (v) {
          var total = ["breath", "voc", "face", "body", "cons"].reduce(function (s, k) { return s + parseInt(v[k], 10); }, 0);
          var why = ["Breathing " + v.breath + ", vocalisation " + v.voc + ", face " + v.face + ", body language " + v.body + ", consolability " + v.cons];
          var actions = [];
          if (total > 0) {
            actions.push("A higher score means more behaviours that indicate pain (CTL-094). Look for the source, and treat pain as per CPP-013-AO: reassurance, posture, splinting, temperature control, then analgesia");
            actions.push("Score again after treatment, and record both scores");
          } else {
            actions.push("No observable pain behaviours now. Keep looking for other unmet needs, and score again if the behaviour changes");
          }
          if (v.body === "2" || v.cons === "2") actions.push("Pushing away, striking out or unable to be consoled: these can be pain. Look for a cause before assuming it is the dementia");
          return { tone: total >= 1 ? "warn" : "good", headline: "PAINAD " + total + " out of 10", why: why, actions: actions,
            note: "CTL-094: 0 = no observable pain to 10 = highest observable pain. Bands such as mild, moderate and severe aren't in the SAAS tool, so this checker doesn't use them." };
        },
        scenariosNote: "Written for training by DSY. Score each one yourself before pressing the button.",
        scenarios: [
          { title: "Joan in the kitchen", text: "Moaning now and then, frowning, grimaces when she shifts in the chair, pushed Ray's hand away, can't be settled by him. Breathing normal.",
            values: { breath: "0", voc: "1", face: "2", body: "2", cons: "2" } },
          { title: "Joan, 30 minutes later", text: "Quiet, hearing aids in, holding Ray's hand, a slight frown, a little fidgety, settles when spoken to. Breathing normal.",
            values: { breath: "0", voc: "0", face: "1", body: "1", cons: "1" } },
          { title: "Resting comfortably", text: "Asleep in her chair, relaxed, breathing quietly, no sounds.",
            values: { breath: "0", voc: "0", face: "0", body: "0", cons: "0" } }
        ]
      } },
      { note: "PAINAD adapted by SAAS from Warden, Hurley and Volicer (2003)." }
    ] },

    { title: "Assess: risk, escalation and mental state", blocks: [
      { text: "CPP-017-AO starts with basic care and three assessments: a risk assessment (CTL-011), a Mental State Examination (CTL-056), and a SAT score (CTL-053). The early risk assessment tells you whether you need more SAAS or SAPOL resources to manage the patient safely." },
      { box: { title: "Risk assessment (CTL-011)", items: [
        "Dementia is on the list of risk factors for violent behaviour: a person may be agitated because of paranoid delusions",
        "Organic brain disorder (head injury, metabolic disturbance, delirium) is another",
        "The most important risk factor is a history of previous violence"
      ] } },
      { box: { title: "High risk of violence (CTL-011)", tone: "no", items: [
        "Behaviours: drug use with violence or aggression; a weapon; verbal threats of violence; attempts to injure bystanders or crew; a past history of severe violence towards crews or allied health",
        "1. Do not enter, or withdraw immediately",
        "2. Request SAPOL",
        "3. If in immediate danger, call Code 51 or activate the radio duress alarm"
      ] } },
      { table: { title: "STAMP: signs that agitation is escalating (CTL-122)", table: { head: ["", "Watch for"], rows: [
        ["S", "Staring: more eye contact, or less"],
        ["T", "Tone: changes in tone and volume, yelling, a sarcastic, obstructive or intrusive style"],
        ["A", "Anxiety: increasing, usually driven by fear or frustration"],
        ["M", "Mumbling: slurred or incoherent speech, repeating the same questions or statements"],
        ["P", "Pacing: a reliable sign of increasing agitation. Also staggering, waving arms, clenched or shaking fists"]
      ] } } },
      { table: { title: "SAT: Sedation Assessment Tool (CTL-053)", text: "The SAT may be used to measure both agitation and sedation (CPP-017-AO).", table: { head: ["Score", "Responsiveness", "Speech"], rows: [
        ["+3", "Combative, violent, out of control", "Continual loud outburst"],
        ["+2", "Very anxious and agitated", "Loud outbursts"],
        ["+1", "Anxious, restless", "Normal, talkative"],
        ["0", "Awake and calm, cooperative", "Speaks normally"],
        ["-1", "Asleep but rouses if name is called", "Slurring or prominent slowing"],
        ["-2", "Responds to physical stimulation", "Few recognisable words"],
        ["-3", "No response to stimulation", "Nil"]
      ] } } },
      { box: { title: "Mental State Examination (CTL-056)", text: "CPP-017-AO: an MSE must be completed and documented for a patient with an acute behavioural disturbance.", items: [
        "Appearance: posture, body habits, grooming, gait",
        "Behaviour: mannerisms, eye contact, motor activity, restless or agitated, inappropriate actions",
        "Conversation: quantity, rate, volume",
        "Mood and affect: mood, range, stability, appropriateness",
        "Perception: hallucinations, delusions, heightened perception, depersonalisation, suicidal thoughts",
        "Cognition: level of consciousness, orientation (time, place, person), concentration, memory",
        "Insight: good, partial or poor"
      ] } },
      { box: { title: "Ask the people who know them (CEP session)", items: [
        "What's usual for them, and what's different today? When did it change?",
        "What usually helps? What upsets them?",
        "Hearing aids, glasses, dentures: are they in?",
        "When did they last eat, drink, go to the toilet, take their medicines, sleep?",
        "Family and staff may have been with the person for hours. Look after them too"
      ] } }
    ] },

    { title: "De-escalate", blocks: [
      { text: "CPP-017-AO asks you to use de-escalation skills, with attention to personal space, body language, eye contact, voice tone and style, reassurance of safety, STAMP and LOWLINE. Care must be voluntary where possible." },
      { box: { title: "LOWLINE (CTL-123)", tiles: true, steps: [
        { t: "Listen", text: "To what the issue is and to the patient's concerns. Use non-directive, non-intrusive verbal feedback so they know they're heard." },
        { t: "Offer", text: "Reflective comments that show you've heard their concerns and that validate what they're experiencing." },
        { t: "Wait", text: "Until they've explained the issue, said what concerns them and how they're feeling." },
        { t: "Look", text: "Keep appropriate eye contact to connect with the patient." },
        { t: "Incline", text: "Your head slightly: it shows you're listening and helps keep your posture non-threatening." },
        { t: "Nod", text: "To confirm you're listening and have understood." },
        { t: "Express empathy", text: "To show you've understood." }
      ] } },
      { box: { title: "What works with dementia (CEP session)", items: [
        "Change the environment: fewer people in the room, TV or radio down, lights softer, a blanket, offer to help with soiled clothes",
        "Your communication: calm tone, relaxed posture, never contradict or challenge, redirect to familiar topics",
        "Give back control: ask small permissions one step at a time (\"Can I sit here?\", \"Can I hold your wrist?\"), and offer simple choices",
        "Take your time, when there's no immediate risk",
        "Acknowledge and redirect. \"They're trying to take my baby.\" Don't disagree: ask the baby's name",
        "Keep modulating in the ambulance: quiet, the lights down, a familiar person or object close by. Sensory tools may help: think about when to offer them"
      ] } },
      { video: { src: "", title: "De-escalation video (CEP Dementia session)" } },  // owner to send the link
      { box: { title: "Talking points for the video (CEP session)", items: [
        "Which de-escalation skills were used? Which ones worked?",
        "Why was it important to take time, and to listen to the staff, who had probably been with her for hours?",
        "How were sensory tools used? When is the best time to introduce them?",
        "What efforts continued in the ambulance?",
        "What else would you do for her? Pain relief? What was her PAINAD?"
      ] } }
    ] },

    { title: "When de-escalation isn't enough (CPP-017-AO)", blocks: [
      { box: { title: "Always", tone: "warn", items: [
        "Care must be provided on a voluntary basis where possible",
        "Restrictive practices are measures of last resort. Prioritise de-escalation, communication and the least restrictive option",
        "Use caution in patients who may have used other drugs, such as psychostimulants or other CNS depressants"
      ] } },
      { box: { title: "De-escalation unsuccessful or agitation persists", tone: "no",
        check: { q: "Joan is still very agitated after everything you've tried, and it isn't safe to move her. What does CPP-017-AO say next?", a: "Consider clinical support and consult the EOC Clinician, who may recommend oral lorazepam 1 to 3 mg or oral olanzapine 5 to 10 mg. If symptoms continue after 30 minutes, consult again. Monitor the respiratory rate and regular vital signs. Consider SAPOL where necessary, then facilitate transport for medical assessment." },
        steps: [
          { t: "Clinical support", text: "Consider it." },
          { t: "Consult the EOC Clinician", text: "Who may recommend oral lorazepam 1 mg to 3 mg, or oral olanzapine 5 to 10 mg." },
          { t: "After 30 minutes", text: "If symptoms continue, consult the EOC Clinician again." },
          { t: "Monitor", text: "Respiratory rate and regular vital signs." },
          { t: "SAPOL", text: "Consider SAPOL where necessary." },
          { t: "Transport", text: "Facilitate transport to an appropriate health facility for medical assessment." }
        ] } },
      { box: { title: "Involuntary care: the Mental Health Act 2009", items: [
        "Applies when the patient appears to have a mental illness AND has caused, or there's a significant risk of them causing, harm to themselves, others or property, or otherwise requires medical examination",
        "AOs must discuss the clinical and legal provision of care under the Act with the EOC Clinician. Consult about 'care and control' potential",
        "If authorised: tell the patient they're now in the 'care and control' of an authorised officer under the Act; give the patient or caregiver a 'statement of rights' where practical; facilitate transport to an appropriate hospital or health facility for medical assessment",
        "Consider SAPOL, clinical support for sedation for safe transport, and the restraint net only if trained and available AND all other non-restrictive methods haven't kept the patient or crew safe. Restraint follows CPPro-035",
        "Document using CTL-125: who you consulted and the outcome, the clinical reasoning, the powers used, that a statement of rights was given (or why not), and the care and control statement"
      ] } },
      { note: "Transfers of a patient already under care and control (from a hospital, health facility or SAPOL) also follow CPP-017-AO. If asked to give medication during transport, see CPP-015-AO." }
    ] },

    { title: "Take-home messages", blocks: [
      { box: { title: "Session summary (CEP session)", tone: "warn", items: [
        "Behaviour is communication",
        "Dementia reduces a person's tolerance to stress, and stressors build up through the day",
        "Background and environmental factors shape behaviour",
        "Many behaviours reflect unmet needs: look for pain, hypoxia, infection, hypoglycaemia and the toilet first",
        "Identifying the cause improves care and reduces escalation",
        "Small changes in your approach can make a big difference to the patient's experience"
      ] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { table: { title: "Possible causes of agitation (CTL-052): the rest of the list", items: [
        "Drug toxicity or withdrawal: alcohol; recreational drugs (cocaine, ecstasy, ketamine, methamphetamines); anticholinergic toxidromes",
        "Toxic levels of medication: anticholinergic toxicity, neuroleptic malignant syndrome, serotonin syndrome",
        "Psychiatric disorders (primary psychosis): psychotic disorders, mania, agitated depression, anxiety disorders",
        "Situational crisis: overwhelming grief, stress"
      ] } },
      { links: [
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
        { label: "CPP-017-AO Acute Behavioural Disturbance (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Acute%20Behavioural%20Disturbance%20-%20AO.pdf" },
        { label: "CTL-094 PAINAD (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/PAINAD%20(Advanced%20Dementia).pdf" },
        { label: "CTL-052 Possible Causes of Agitation (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/Possible%20Causes%20of%20Agitation.pdf" },
        { label: "CTL-011 Risk Assessment Matrix (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/Risk%20Assessment%20Matrix.pdf" },
        { label: "Dementia Australia: language guidelines", href: "https://www.dementia.org.au" },
        { label: "Pain management module", href: "/microlearning/pain/" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "What does the PLST model say about changed behaviour?", options: ["It's deliberate, to get attention", "Stress builds up through the day until the person can no longer regulate their emotions and behaviour", "It's always caused by a single event"], answer: 1,
        why: "PLST: dementia lowers the person's tolerance to stress. Stress accumulates until they reach a point where they can't regulate emotions or behaviour. Neither model sees behaviour as deliberate misconduct." },
      { q: "The need-driven behaviour (NDB) model asks you to change which question?", options: ["\"How do we stop this behaviour?\" to \"Who called us?\"", "\"What's wrong with this patient?\" to \"What is this patient trying to communicate?\"", "\"Is this dementia?\" to \"Is this delirium?\""], answer: 1,
        why: "The NDB model looks beyond the behaviour to background factors, proximal factors and unmet needs." },
      { q: "Which of these is a proximal factor, not a background factor?", options: ["Severity of the dementia", "Personality", "Needing the toilet"], answer: 2,
        why: "Proximal factors are immediate: physiological needs (pain, hunger, thirst, toileting, infection, hypoxia), psychological needs, and the social and physical environment. Severity of dementia and personality are background factors." },
      { q: "A patient living with dementia suddenly becomes agitated. Which causes should you think of first?", options: ["Pain, hypoxia, infection, hypoglycaemia and needing the toilet", "The dementia getting worse", "Boredom"], answer: 0,
        why: "CEP session. CPP-017-AO also says consider all possible causes (CTL-052), including hypoxia, hypovolaemia, hypoglycaemia, head injury, infection and substance use, and treat where possible." },
      { q: "Which two items from CTL-052 are especially relevant to people living with dementia?", options: ["Mania and anxiety disorders", "Behavioural and psychological symptoms of dementia (BPSD), and delirium", "Ecstasy and cocaine"], answer: 1,
        why: "CTL-052 lists both BPSD and delirium under medical disorders. A new change from the person's usual self needs a search for a medical cause." },
      { q: "PAINAD scores five items. What is the total range?", options: ["0 to 5", "0 to 10", "1 to 10"], answer: 1,
        why: "CTL-094: five items each scored 0 to 2, so 0 (no observable pain) to 10 (highest observable pain)." },
      { q: "Which is NOT one of the PAINAD items?", options: ["Consolability", "Body language", "Heart rate"], answer: 2,
        why: "CTL-094 items: breathing independent of vocalisation, negative vocalisation, facial expression, body language, consolability." },
      { q: "What three assessments does CPP-017-AO ask for alongside basic care?", options: ["Risk assessment (CTL-011), MSE (CTL-056) and SAT score (CTL-053)", "GCS, BGL and ECG", "PAINAD, FROP and Braden"], answer: 0,
        why: "CPP-017-AO: basic care and perform a risk assessment as per CTL-011, an MSE as per CTL-056, and a SAT score as per CTL-053." },
      { q: "In LOWLINE (CTL-123), what does the W stand for?", options: ["Warn the patient", "Wait until they've explained their issue, concerns and feelings", "Withdraw from the scene"], answer: 1,
        why: "LOWLINE: Listen, Offer reflective comments, Wait, Look, Incline your head, Nod, Express empathy." },
      { q: "In STAMP (CTL-122), which sign is described as a reliable indicator of increasing agitation?", options: ["Pacing", "Staring", "Mumbling"], answer: 0,
        why: "CTL-122: pacing is considered a reliable indicator of increasing agitation. Other signs are staggering, waving arms, clenching or shaking fists." },
      { q: "De-escalation hasn't worked. Who may recommend oral lorazepam 1 to 3 mg or oral olanzapine 5 to 10 mg?", options: ["The crew, on the protocol alone", "The EOC Clinician, on consult", "The patient's family"], answer: 1,
        why: "CPP-017-AO: consult the EOC Clinician, who may recommend oral lorazepam 1 to 3 mg or oral olanzapine 5 to 10 mg. If symptoms continue after 30 minutes, consult again. Monitor RR and regular vital signs." },
      { q: "What does CPP-017-AO say about restrictive practices?", options: ["Use them early to keep everyone safe", "They are measures of last resort", "They are only for SAPOL"], answer: 1,
        why: "CPP-017-AO: care must be voluntary where possible; restrictive practices are measures of last resort. The restraint net only if trained, available, and all other non-restrictive methods haven't kept the patient or crew safe." }
    ] } }] },

    { title: "Practical: the kitchen table", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. In threes: one person plays Joan, two are the crew. Swap after each round. The lead instructor can swap in a different activity." },
      { steps: [
        { t: "Round 1: the rushed crew", text: "Both crew members talk at once, the TV stays on, and the crew contradicts Joan (\"That's your husband, Joan\"). Joan's player reacts honestly." },
        { t: "Round 2: LOWLINE", text: "One crew member talks. TV off, sit at her level, ask small permissions. Acknowledge and redirect: ask about her mum, where she grew up. The other watches for STAMP signs." },
        { t: "Score it", text: "Joan's player says what made them calmer or more upset. The crew scores PAINAD and SAT for each round." },
        { t: "Hand over", text: "Give a one-minute handover that includes what helped Joan and her PAINAD." }
      ] },
      { box: { title: "What good looks like", items: ["One voice, at her level, unhurried", "No contradicting or correcting", "Small permissions before each touch", "PAINAD and SAT scored and said in the handover"] } },
      { note: "Suggested activity written for training by DSY. Check it with your lead instructor." }
    ] }
  ]
};
