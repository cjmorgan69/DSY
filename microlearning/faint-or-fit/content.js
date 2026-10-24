/* Faint or fit? Collapse with jerking in a child or teenager - Paramedic microlearning. Content only: the layout lives
   in ../shared/module.js.
   Sources (exported 31.08.2026 for the SAAS documents):
   - SAAS CPG-022-P Seizures - P v6.0 (2 December 2024)
   - SAAS CPG-137-P Universal Care and Life Support - P v1.1 (22 January 2025)
   - SAAS CPG-154-P Treat and Refer - P v1.0 (17 May 2023)
   - SAAS CPG-160-P Refusal Against Advice - P v1.0 (4 June 2025)
   - RCH Melbourne Clinical Practice Guidelines (owner approved, 24 Oct 2026): Syncope (last updated November 2023),
     Seizures - acute management (June 2025) and Basic paediatric ECG interpretation (September 2023). The RCH
     "Afebrile seizures" guideline has been retired (its link now goes to the guideline index).
   SAAS has no syncope guideline, so the faint-versus-seizure and ECG content comes from RCH. Treatment, transport and
   consent come from SAAS. Nothing clinical here goes beyond those documents. */
var FF_CARDIAC = [
  ["exercise", "Collapsed during exercise or exertion"],
  ["noprodrome", "No warning at all, or chest pain or palpitations just before"],
  ["family", "Family history of early cardiac death, arrhythmia or sudden death"],
  ["cardiac", "Known heart condition or past cardiac history"],
  ["ecg", "Abnormal 12-lead ECG (for example long QT, delta wave, Brugada pattern, LVH with deep Q waves)"]
];
var FF_SEIZURE = [
  ["focal", "Focal signs, or not back to baseline (for example weakness on one side after the event)"],
  ["headache", "Headache before the seizure"],
  ["hypertension", "Hypertension"],
  ["bleeding", "Bleeding disorder or anticoagulant medicine"],
  ["toxidrome", "Features of a toxidrome (fast heart rate and breathing, high BP, raised temperature, sweating, tremor)"],
  ["nai", "History or findings concerning for non-accidental injury"],
  ["delayed", "Head injury with a delayed seizure"]
];
function ffField(f) { return { id: f[0], type: "yesno", label: f[1] }; }
function ffValues(yes) {                // a scenario's answers: every question "no" except the ones given
  var v = { seizing: false, cause: false, trauma: false };
  FF_CARDIAC.concat(FF_SEIZURE).forEach(function (f) { v[f[0]] = false; });
  for (var k in yes) v[k] = yes[k];
  return v;
}

var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Faint or fit?",
  subtitle: "Paramedic microlearning",
  headline: "A collapse with jerking: the history tells you which, the ECG tells you what you can't miss",
  lead: "A child or teenager faints, then jerks for a few seconds. Was it a faint or a seizure? And could it be the heart? This module covers the history that tells them apart, the red flags, the 12-lead ECG, and what the SAAS guidelines say about treatment, transport and consent.",
  minutes: 20,

  protocol: {
    code: "CPG-022-P", name: "Seizures - P", version: "v6.0 (2 December 2024)", exported: "31 August 2026",
    also: [
      { code: "CPG-137-P", name: "Universal Care and Life Support - P", version: "v1.1 (22 January 2025)" },
      { code: "CPG-154-P", name: "Treat and Refer - P", version: "v1.0 (17 May 2023)" },
      { code: "CPG-160-P", name: "Refusal Against Advice - P", version: "v1.0 (4 June 2025)" }
    ]
  },
  footerNotes: [
    "SAAS has no syncope guideline. The faint-versus-seizure table, red flags and ECG points come from the Royal Children's Hospital Melbourne Clinical Practice Guidelines (Syncope, Nov 2023; Seizures - acute management, June 2025; Basic paediatric ECG interpretation, Sept 2023), chosen by the DSY lead instructor. Where they differ from a SAAS guideline, follow SAAS.",
    "Treatment, transport, treat and refer and consent are from the SAAS guidelines listed above."
  ],

  session: {
    intro: "For a team-led session. Allow about 25 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Read the introduction", time: "3 min", text: "Then ask: what is the one cause of a collapse in a young person you must not miss?" },
      { t: "Faint or fit?", time: "6 min", text: "Go through the table row by row. For each row, say the question you'd ask the patient or a witness." },
      { t: "Red flag checker", time: "6 min", text: "Work the scenarios. Decide before pressing the button." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pairs take a witness history, then do a 12-lead on each other and measure the QT by hand." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Faint or fit? Collapse with jerking in a young person" } },
      { text: "A seizure is a sudden, brief change in neurological function caused by abnormal neuronal activity in the brain. It's a symptom of an underlying disease process. Reversible causes include hypoglycaemia, hypoxia, head trauma and hyperthermia (CPG-022-P)." },
      { text: "Syncope is a brief and sudden loss of consciousness with loss of postural tone and spontaneous recovery. About 15% of children faint before the end of adolescence. Most paediatric syncope is benign: vasovagal or orthostatic (RCH)." },
      { text: "Here's the catch. A faint can cause brief jerking, especially if the person stays unconscious a little longer (a syncopal or anoxic seizure). And a seizure can be the cause, or the result, of an arrhythmia (RCH)." },
      { box: { title: "Three things to take away (RCH)", tone: "warn", items: [
        "An arrhythmia should be considered in all children with syncope",
        "Most paediatric syncope is vasovagal",
        "A thorough history is the best way to find the cause"
      ] } }
    ] },

    { title: "Faint or fit? The history", blocks: [
      { text: "Get a detailed, step-by-step history of what happened before, during and after the event. Take it from the child if you can, and from the witnesses. Ask if anyone filmed it (RCH)." },
      { table: { title: "Telling a faint from a seizure (RCH Syncope)", text: "RCH compares autonomic syncope, cardiac syncope and seizures. The two kinds of faint differ only in what comes before.", table: { head: ["Feature", "Faint", "Seizure"], rows: [
        ["Before the event", "Autonomic: sudden or long standing, pain or emotion, with warning signs (dizzy, weak, vision changes). Cardiac: during exercise, usually no warning but may have chest pain or palpitations; past cardiac history or family history of early cardiac death, arrhythmia or sudden death", "Usually none"],
        ["Unconscious for", "Usually seconds", "Usually more than a few seconds, up to minutes"],
        ["Incontinence", "Absent", "May be present"],
        ["Confused on waking", "Absent", "Marked, for 20 to 30 minutes"],
        ["Tonic-clonic movements", "Occasional and brief, especially if unconscious longer (syncopal seizure)", "Frequently present"]
      ] } } },
      { box: { title: "Ask about", check: { q: "A 14-year-old stood up fast in a hot hall, felt dizzy, went grey and dropped. She jerked for a few seconds and was talking normally a minute later. Faint or seizure?", a: "The history fits a faint with a brief syncopal seizure: a clear trigger, warning signs, seconds of jerking and no confusion afterwards. You still look for cardiac red flags, do a 12-lead and transport." }, items: [
        "What they were doing: standing, exercising, lying down, upset, in pain, hot, hungry, tired, dehydrated",
        "Warning signs: dizziness, weakness, vision changes, chest pain, palpitations, or an aura",
        "Her level of awareness, and any one-sided limb or eye movements",
        "How long it lasted, timed by a witness",
        "Afterwards: confusion and how long it lasted, weakness on one side",
        "Recent trauma, and when the event happened in relation to sleep",
        "Any previous events, including absences, myoclonic jerks or night-time events",
        "Medical history: heart conditions, medicines, a seizure management plan, development",
        "Family history of seizures, cardiac disorders or sudden death"
      ] } },
      { note: "RCH Syncope and Seizures - acute management. RCH also lists pregnancy testing among the hospital investigations for syncope." }
    ] },

    { title: "Red flags", blocks: [
      { box: { title: "Cardiac red flags (RCH)", tone: "no", items: [
        "Syncope or chest pain on exertion, or poor exercise tolerance",
        "Palpitations",
        "Family history of early cardiac death, arrhythmia or sudden death",
        "No warning before the collapse, past cardiac history",
        "RCH: discuss any child with a cardiac red flag with a senior clinician, even if the ECG looks normal"
      ] } },
      { box: { title: "Seizure red flags (RCH)", tone: "no", items: FF_SEIZURE.map(function (f) { return f[1]; }).concat([
        "Developmental delay or regression",
        "Arrhythmia: a seizure may be the cause or the result of an arrhythmia, so consider an ECG"
      ]) } },
      { tool: {
        title: "Red flag checker",
        intro: "Tick what you find. The checker shows what RCH says the flags mean and what the SAAS guidelines say to do. It doesn't diagnose: neither do you.",
        fields: [
          { id: "seizing", type: "yesno", label: "Still seizing, or seizure activity for 5 minutes or more?" },
          { id: "cause", type: "yesno", label: "A treatable cause found (low BGL, hypoxia, head trauma, high temperature)?" },
          { id: "trauma", type: "yesno", label: "Trauma involved (for example a head strike in the fall)?" }
        ].concat(FF_CARDIAC.map(ffField)).concat(FF_SEIZURE.map(ffField)),
        evaluate: function (v) {
          var card = FF_CARDIAC.filter(function (f) { return v[f[0]]; }).map(function (f) { return f[1]; });
          var seiz = FF_SEIZURE.filter(function (f) { return v[f[0]]; }).map(function (f) { return f[1]; });
          var actions = ["Universal care and life support. Two sets of obs on the RDR chart (Paediatric RDR reference aid), including BGL, temperature and pupils"], why = [], tone = "warn", head;
          if (v.seizing) {
            why.push("Generalised seizure for more than 5 minutes");
            actions.push("Follow the patient's seizure management plan if there is one", "IM midazolam 0.15 mg/kg (max single dose 10 mg), repeat once at 5 minutes if still seizing, 5 mL max per site, EtCO2 monitoring (CPG-022-P)", "If a 2nd midazolam dose is given: request clinical support. If ineffective and support is delayed, consult the EOC Clinician");
          }
          if (v.cause) actions.push("Manage treatable causes (CPG-022-P)");
          if (v.trauma) actions.push("Trauma-related seizure: refer to the Major Trauma Triage Tool (CPG-022-P)");
          if (card.length) {
            why.push((card.length === 1 ? "Cardiac red flag: " : card.length + " cardiac red flags: ") + card.join("; "));
            actions.push("12-lead ECG, and keep the patient on the monitor", "Suspected cardiac syncope: RCH says refer urgently to a paediatrician or cardiologist. Tell the receiving ED and consult early");
          }
          if (seiz.length) {
            why.push((seiz.length === 1 ? "Seizure red flag: " : seiz.length + " seizure red flags: ") + seiz.join("; "));
            actions.push("Full neurological and cardiovascular exam, including BP. Hand the red flag over to the ED");
          }
          if (!card.length) actions.push("12-lead ECG: RCH says every child with syncope needs one at least once");
          actions.push("Paediatric patient: early clinical consultation or escalation of care (CPG-137-P high-risk groups)",
            "Regional: transport to the geographically closest ED (CPG-022-P)",
            "Not a treat and discharge: first-time generalised seizure and undiagnosed collapse with syncope are exclusions (CPG-154-P)",
            "Hand over: seizure duration including before you arrived, any benzodiazepine doses, and any video");
          if (v.seizing) head = "Active seizure: treat as per CPG-022-P";
          else if (card.length) head = "Cardiac red flag: think arrhythmia";
          else if (seiz.length) head = "Seizure red flag: hand it over";
          else { tone = "good"; head = "No red flags found: still a 12-lead and transport"; why.push("No cardiac or seizure red flags ticked, no active seizure"); }
          return { tone: tone, headline: head, why: why, actions: actions, note: "Most paediatric syncope is vasovagal, but an arrhythmia should be considered in all children with syncope (RCH)." };
        },
        disclaimer: "Training aid only. Use the current guidelines, the SAAS Clinical app and the EOC Clinician for real patients.",
        scenariosNote: "Examples written for training by DSY from the RCH and SAAS criteria. Decide before pressing the button.",
        scenarios: [
          { title: "Hot assembly hall", text: "15, stood for 30 minutes, felt dizzy and sick, went pale, dropped, jerked for 5 seconds. Talking normally a minute later. Normal ECG.", values: ffValues({}) },
          { title: "Netball final", text: "12, collapsed mid-sprint with no warning. A few jerks. Her uncle died suddenly at 35.", values: ffValues({ exercise: true, noprodrome: true, family: true }) },
          { title: "Still fitting", text: "9, generalised tonic-clonic seizure, still going when you arrive 7 minutes after the call. BGL normal.", values: ffValues({ seizing: true }) },
          { title: "Fell off the trampoline", text: "11, hit his head an hour ago, seemed fine, then had a seizure. Now drowsy and weak down his left side.", values: ffValues({ trauma: true, cause: true, focal: true, delayed: true }) },
          { title: "Party, 2 am", text: "16, seizure at a party. Heart rate 140, temperature 38.6, sweaty, tremor. Friends are vague about what she took.", values: ffValues({ toxidrome: true, cause: true }) },
          { title: "The ECG", text: "13, dropped suddenly in class with no warning. Back to normal quickly. Your 12-lead shows a QTc you measure at 490 ms.", values: ffValues({ noprodrome: true, ecg: true }) }
        ]
      } }
    ] },

    { title: "Focused assessment", blocks: [
      { box: { title: "Work through it", tiles: true, steps: [
        { t: "Primary survey", text: "Universal care and life support. A seizure may need active treatment while you assess (CPG-022-P, RCH)." },
        { t: "Full obs", text: "RR, BP, pulse, CRT, temperature, GCS, SpO2, BGL, pupils, pain score. At least two sets on the RDR chart (CPG-137-P)." },
        { t: "12-lead ECG", text: "Every child with syncope, at least once (RCH). It's in SAAS routine obs where applicable (CPG-137-P)." },
        { t: "Lying and standing", text: "Orthostatic heart rate and BP (RCH). Only stand the patient up after a full assessment, including mobility (CPG-137-P)." },
        { t: "Neuro exam", text: "Focal signs, one-sided weakness after the event, signs of meningitis or raised intracranial pressure (RCH)." },
        { t: "Heart and cause", text: "Cardiovascular exam including BP. Look for injury, a toxidrome and other clues to a cause (RCH)." }
      ] } },
      { box: { title: "Orthostatic changes (RCH Syncope)", items: [
        "Orthostatic hypotension: within 2 to 3 minutes of standing, systolic BP falls more than 20 mmHg or diastolic more than 10 mmHg. Causes include low blood volume, anaemia, electrolyte problems, heavy periods and medicines",
        "POTS: daily symptoms when upright, and within 5 to 10 minutes of standing the heart rate rises more than 40 bpm, or more than 30 bpm without a BP fall"
      ] } },
      { box: { title: "Other things that can look like this (RCH)", items: [
        "Migraine, hypoglycaemia, toxins (for example carbon monoxide, clonidine), functional disorders, narcolepsy",
        "Breath-holding spells (younger children, while crying)",
        "Psychogenic non-epileptic seizures (PNES)"
      ] } }
    ] },

    { title: "The 12-lead", blocks: [
      { text: "RCH lists syncope, seizures and \"funny turns\", palpitations and a family history of sudden death among the common reasons for a paediatric ECG. Always read it with the history and examination." },
      { box: { title: "What to look for in syncope (RCH)", tone: "warn", check: { q: "The machine reads QTc 438 ms, but the T wave looks long to you. Trust the machine?", a: "No. RCH says machine intervals are a guide only: measure by hand (QT from the start of Q to the end of T in lead II or V5, corrected with Bazett). A normal manual QTc is more than 340 and up to 450 ms." }, items: [
        "Rate: 14 years and over, the normal range is 60 to 115 bpm",
        "Long QT: manual QTc should be more than 340 ms and no more than 450 ms. Measure in lead II or V5; QTc = QT divided by the square root of the R-R interval (Bazett)",
        "WPW: short PR interval, delta wave (slurred start of the QRS, best seen in V2 to V6), wide QRS",
        "Brugada: coved or saddle-back ST elevation over 2 mm in V1 to V3",
        "Hypertrophic cardiomyopathy: LVH and deep \"dagger\" Q waves in I, aVL and V5 to V6",
        "Wide complex tachycardia, heart block or bradycardia"
      ] } },
      { box: { title: "Normal in teenagers (RCH)", tone: "good", items: [
        "Benign early repolarisation: concave ST elevation in leads with an upright T wave",
        "T wave inversion in V1 (and V1 to V3 in some, the persistent juvenile T wave pattern)",
        "Mild left axis deviation (to -30) from adolescence; sinus arrhythmia"
      ] } },
      { box: { title: "Medicines that can prolong the QT (RCH)", items: [
        "Amiodarone, tricyclics, fluconazole, erythromycin, methadone, metoclopramide, haloperidol, ondansetron, SSRIs",
        "Also: low calcium, head injury or concussion, long QT syndrome, rarely myocarditis"
      ] } },
      { note: "If an abnormal ECG doesn't fit the clinical picture, check lead placement and repeat it (RCH)." }
    ] },

    { title: "Treat, transport and consent", blocks: [
      { box: { title: "Seizures (CPG-022-P)", items: [
        "Universal care and life support. Follow an existing seizure management plan. Manage treatable causes",
        "Generalised seizure over 5 minutes: IM midazolam 0.15 mg/kg, max single dose 10 mg, repeat once at 5 minutes if still seizing, 5 mL max per injection site, EtCO2 monitoring",
        "2nd midazolam dose given: request clinical support. If ineffective and support is delayed, consult the EOC Clinician",
        "Consider clinical support (ICP or MedSTAR) for a specific cause such as TBI, or a prolonged transport time",
        "Trauma-related seizure: Major Trauma Triage Tool. Regional: geographically closest ED"
      ] } },
      { box: { title: "Treat and refer (CPG-154-P)", tone: "warn", check: { q: "She's back to normal and her mum wants to take her to the GP tomorrow. Can you treat and discharge?", a: "No. A first-time generalised seizure and an undiagnosed collapse with syncope are exclusions for treat and discharge, and higher risk for treat and refer (CPG-154-P). Recommend transport. If her parent still refuses, work through VIRCA and CPG-160-P." }, items: [
        "Exclusions for treat and discharge, and higher risk for treat and refer: any alteration in CNS function, including a first-time generalised seizure or an undiagnosed collapse with syncope or loss of consciousness",
        "Also any child 6 years or under"
      ] } },
      { box: { title: "Consent (CPG-160-P)", items: [
        "Under 16: presumed unable to decide about their own care. A parent or guardian decides for them",
        "A rare \"mature minor\" under 16 must understand the nature and consequences of the decision to the level of an adult. Involve a parent or guardian, and have a low threshold for clinical support",
        "Use the VIRCA tool to check whether a refusal is valid. A valid refusal: advise, complete an AMA form and leave a copy of the documentation"
      ] } },
      { box: { title: "Hand over (RCH)", items: [
        "Seizure duration, including before you arrived",
        "Any benzodiazepine doses given",
        "The witness account and any video",
        "Your 12-lead, and any red flags"
      ] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { table: { title: "Causes of syncope (RCH)", items: [
        "Autonomic: reflex (vasovagal), orthostatic hypotension, POTS, breath-holding spells",
        "Cardiac: brady- or tachyarrhythmia, long QT syndrome, Brugada syndrome, catecholaminergic polymorphic VT, conduction disease (WPW)",
        "Structural: congenital heart disease, cardiomyopathies, myocarditis"
      ] } },
      { table: { title: "Underlying causes of seizures (RCH)", items: [
        "Hypoglycaemia; electrolyte problems (low sodium, calcium or magnesium)",
        "Meningitis; drug or toxin overdose or envenomation",
        "Head trauma; stroke and intracranial haemorrhage"
      ] } },
      { links: [
        { label: "RCH: Syncope", href: "https://www.rch.org.au/clinicalguide/guideline_index/Syncope/" },
        { label: "RCH: Seizures - acute management", href: "https://www.rch.org.au/clinicalguide/guideline_index/Seizures_-_acute_management/" },
        { label: "RCH: Basic paediatric ECG interpretation", href: "https://www.rch.org.au/clinicalguide/guideline_index/Basic_paediatric_ECG_interpretation/" },
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "What's the most common cause of syncope in children?", options: ["Arrhythmia", "Vasovagal", "Epilepsy"], answer: 1,
        why: "RCH: most paediatric syncope is vasovagal. But an arrhythmia should be considered in all children with syncope." },
      { q: "A faint is followed by 5 seconds of jerking. What does that tell you?", options: ["It was a seizure", "Brief jerking can happen in a faint (syncopal seizure)", "It must be cardiac"], answer: 1,
        why: "RCH: tonic-clonic movements happen occasionally and briefly in syncope, particularly if unconsciousness is prolonged (syncopal seizure)." },
      { q: "Which history fits a seizure better than a faint?", options: ["Dizzy and grey before falling", "Marked confusion for 20 to 30 minutes afterwards", "Unconscious for a few seconds"], answer: 1,
        why: "RCH: marked confusion on waking for 20 to 30 minutes fits a seizure. It's absent in autonomic and cardiac syncope." },
      { q: "Which is a cardiac red flag?", options: ["Fainting after standing in the heat", "Collapsing during exercise", "Feeling sick before fainting"], answer: 1,
        why: "RCH: syncope during exercise or exertion is a cardiac red flag. Heat, standing and nausea fit a vasovagal faint." },
      { q: "Which family history matters most here?", options: ["Migraine", "Early cardiac death, arrhythmia or sudden death", "Asthma"], answer: 1,
        why: "RCH: a family history of early cardiac death, arrhythmia or sudden death points to cardiogenic syncope." },
      { q: "Who needs a 12-lead ECG?", options: ["Only children with palpitations", "Every child with syncope, at least once", "Only if the faint was during exercise"], answer: 1,
        why: "RCH: an ECG should be obtained in all children with syncope at least once." },
      { q: "A normal manual QTc in a child is:", options: ["More than 340 and up to 450 ms", "Up to 500 ms", "Less than 340 ms"], answer: 0,
        why: "RCH: manual QTc should be more than 340 ms and no more than 450 ms. Use Bazett: QT divided by the square root of the R-R interval." },
      { q: "Short PR, a slurred start to the QRS and a wide QRS suggest:", options: ["Brugada syndrome", "Wolff-Parkinson-White", "Benign early repolarisation"], answer: 1,
        why: "RCH: WPW shows a short PR interval, a delta wave (initial slurring of the QRS, best seen in V2 to V6) and a wide QRS." },
      { q: "When does CPG-022-P say to give midazolam for a generalised seizure?", options: ["Straight away", "After more than 5 minutes", "After 10 minutes"], answer: 1,
        why: "CPG-022-P: generalised seizure over 5 minutes: IM midazolam 0.15 mg/kg, max single dose 10 mg, repeat once at 5 minutes if still seizing." },
      { q: "Name a reversible cause of seizures listed in CPG-022-P.", options: ["Hypoglycaemia", "Asthma", "Migraine"], answer: 0,
        why: "CPG-022-P: reversible causes include hypoglycaemia, hypoxia, head trauma and hyperthermia." },
      { q: "A 13-year-old is back to normal after a first seizure. Treat and discharge?", options: ["Yes, if her obs are normal", "No: a first-time generalised seizure is an exclusion", "Yes, if her parent agrees"], answer: 1,
        why: "CPG-154-P: any alteration in CNS function, including a first-time generalised seizure or undiagnosed collapse with syncope, is an exclusion for treat and discharge." },
      { q: "A 13-year-old refuses transport. Whose decision is it?", options: ["Hers", "Her parent or guardian's, unless she is a proven mature minor", "The paramedic's"], answer: 1,
        why: "CPG-160-P: children under 16 are presumed unable to decide about their own care and need a parent or guardian to decide. A rare mature minor must show adult-level understanding." }
    ] } }] },

    { title: "Practical: the witness and the 12-lead", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["A monitor with 12-lead", "Calipers or a ruler, and a calculator", "A blank PCR or notepad"] } },
      { steps: [
        { t: "The witness", text: "Your partner plays a parent who saw a collapse and makes up the story. Take the history: before, during and after, using the table." },
        { t: "Red flags", text: "Run through the cardiac and seizure red flags out loud." },
        { t: "12-lead", text: "Do a 12-lead on your partner. Measure the QT by hand in lead II and work out the QTc with Bazett. Compare it with the machine." },
        { t: "The plan", text: "Say your plan: transport, consent, and what you'll hand over." }
      ] },
      { box: { title: "What good looks like", items: ["Asks what the patient was doing and how they felt just before", "Gets a timed duration and asks about video", "Asks about exercise and family history of sudden death", "Manual QTc worked out", "Doesn't offer treat and discharge"] } },
      { note: "Suggested activities written for training by DSY. Check them with your lead instructor." }
    ] },

    { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "The Resus Room is a UK emergency medicine podcast. Its \"Paediatric Seizures; Roadside to Resus\" episode (January 2026, about 72 minutes) covers assessing and managing a seizing child, from pre-hospital to the ED. Optional listening. It is mostly about active seizures rather than faints, and reflects UK practice: where it differs from CPG-022-P, follow the guideline." },
      { links: [{ label: "Open the Resus Room episode", href: "https://theresusroom.libsyn.com/paediatric-seizures-roadside-to-resus" }] }
    ] }
  ]
};
