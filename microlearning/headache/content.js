/* Headache - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Sources: SAAS CPP-061-AO Headache - AO v1.0 (3 December 2025), exported 31.08.2026, and CPP-047-AO Nausea and
   Vomiting - AO v2.3 (4 June 2025) for ondansetron. It points to CPP-016-AO Stroke, CPP-062-AO Sepsis and CPP-013-AO
   Pain Management, which have their own DSY modules. Nothing clinical here goes beyond those documents. */
function headacheFlag(id, label) { return { id: id, type: "yesno", label: label }; }
var HEADACHE_FLAGS = [
  ["thunder", "Sudden onset severe thunderclap or uncharacteristic headache"],
  ["trigger", "Sudden onset or severe headache triggered by cough, exertion or sexual activity"],
  ["systemic", "Severe headache with signs of systemic illness (altered conscious state, neck stiffness, fever, rash, vomiting, confusion)"],
  ["neuro", "Headache with a current or resolved neurological sign and/or altered consciousness"],
  ["over50", "First severe headache in a patient over 50"],
  ["cancer", "New headache with a history of cancer or HIV infection"],
  ["worsening", "Persistent headache worsening over hours to days"],
  ["pregnancy", "Severe headache in pregnancy, with or without hypertension"],
  ["trauma", "Headache with a history of recent head trauma"],
  ["icp", "Features of raised intracranial pressure (worse lying down or on waking, with nausea and/or vomiting)"]
];

var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Headache",
  subtitle: "Ambulance Officer microlearning",
  headline: "Spot the red flags, treat the symptoms, and don't be fooled by relief",
  lead: "Most headaches are benign, but about 5% have a serious, life-threatening cause. This module covers the new AO headache protocol: the red flags, when to manage as stroke or sepsis instead, pain relief and ondansetron, and when to consult the EOC Clinician.",
  minutes: 20,

  protocol: {
    code: "CPP-061-AO", name: "Headache - AO", version: "v1.0 (3 December 2025)", exported: "31 August 2026",
    also: [{ code: "CPP-047-AO", name: "Nausea and Vomiting - AO", version: "v2.3 (4 June 2025)" }]
  },
  footerNotes: ["CPP-061-AO also points to Stroke (CPP-016-AO), Sepsis (CPP-062-AO) and Pain Management (CPP-013-AO): see those DSY modules for their detail."],

  session: {
    intro: "For a team-led session. Allow about 25 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Read the introduction", time: "3 min", text: "Read the primary and secondary headache paragraphs aloud." },
      { t: "Red flags", time: "6 min", text: "Take turns reading a red flag. For each, give an example of a patient who might have it." },
      { t: "Red flag checker", time: "6 min", text: "Work the scenarios. Decide before pressing the button." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pairs take a headache history and do a ROSIER + ACT assessment on each other." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Headache: what AOs need to know" } },
      { text: "Headaches fall into two groups by their cause. Primary headaches are more common and benign: mostly migraine, tension-type and cluster headaches." },
      { text: "Secondary headaches are about 5% of headaches and have a serious, life-threatening cause needing immediate medical attention: subarachnoid haemorrhage, head injury, raised intracranial pressure, space-occupying lesions, venous sinus thrombosis, giant cell arteritis, and meningitis or systemic infection." },
      { text: "SAAS clinicians aren't trying to diagnose a headache. Focus on spotting the warning signs, managing symptoms, and transport for further assessment. And remember: relief from good analgesia is not evidence of a benign cause." }
    ] },

    { title: "Assess", blocks: [
      { box: { title: "Every patient with a headache", steps: [
        { t: "Basic care and life support" },
        { t: "A thorough history", text: "Crucial for recognising a secondary headache. A history of similar headaches with similar triggers is reassuring." },
        { t: "Pain and neurological assessment", text: "Including ROSIER (Rosier + Act Assessment) and gait." },
        { t: "Check for red flags", text: "See the next section." }
      ] } },
      { box: { title: "Manage under another protocol if", tone: "warn", items: [
        "Any neurological signs or symptoms on the Rosier + Act Assessment: manage as per Stroke CPP-016-AO",
        "Suspected infective cause or meningococcal septicaemia: manage as per the relevant section of Sepsis CPP-062-AO"
      ] } }
    ] },

    { title: "Red flags", blocks: [
      { box: { title: "Red flags of serious underlying conditions (CPP-061-AO)", tone: "no", check: { q: "A 56-year-old with no headache history has her first ever severe headache. Red flag?", a: "Yes: first severe headache in a patient over 50. Prioritise transport and request clinical support." }, items: HEADACHE_FLAGS.map(function (f) { return f[1]; }) } },
      { box: { title: "Any red flag", tone: "warn", items: [
        "Prioritise transport and request clinical support",
        "If clinical support is unavailable, consult the EOC Clinician for treatment and transport advice"
      ] } },
      { tool: {
        title: "Red flag checker",
        intro: "Tick what you find. The checker shows what CPP-061-AO says to do. It doesn't diagnose: neither do you.",
        check: { q: "A known migraine sufferer has her usual migraine, no red flags, and wants to stay home. What does the protocol say?", a: "Encourage her own migraine plan and medicines, analgesia per CPP-013-AO, consider ondansetron. Transport to an appropriate facility; to consider treat and discharge or another pathway, consult the EOC Clinician." },
        fields: [{ id: "rosier", type: "yesno", label: "Any neurological signs or symptoms on the Rosier + Act Assessment?" },
                 { id: "infect", type: "yesno", label: "Suspected infective cause or meningococcal septicaemia?" }]
                 .concat(HEADACHE_FLAGS.map(function (f) { return headacheFlag(f[0], f[1]); }))
                 .concat([{ id: "nausea", type: "yesno", label: "Nausea or vomiting?" }]),
        evaluate: function (v) {
          var found = HEADACHE_FLAGS.filter(function (f) { return v[f[0]]; }).map(function (f) { return f[1]; });
          var actions = ["Basic care and life support"], why = [], tone = "good", head;
          if (v.rosier) { why.push("Neurological signs or symptoms on the Rosier + Act Assessment"); actions.push("Manage as per Stroke CPP-016-AO"); }
          if (v.infect) { why.push("Suspected infective cause or meningococcal septicaemia"); actions.push("Manage as per the relevant section of Sepsis CPP-062-AO"); }
          if (found.length) {
            why.push((found.length === 1 ? "Red flag: " : found.length + " red flags: ") + found.join("; "));
            actions.push("Prioritise transport and request clinical support", "If clinical support is unavailable, consult the EOC Clinician for treatment and transport advice");
          }
          actions.push("Encourage the patient's own headache or migraine plan, including their own medication", "Analgesia as per Pain Management CPP-013-AO");
          if (v.nausea) actions.push("Consider ondansetron as per Nausea and Vomiting CPP-047-AO (adults 4 mg ODT; check contraindications and precautions)");
          if (found.length || v.rosier || v.infect) {
            tone = "warn"; head = v.rosier ? "Stroke pathway, and prioritise transport" : v.infect ? "Sepsis pathway, and prioritise transport" : "Red flag: prioritise transport and request clinical support";
            actions.push("Transport to an appropriate facility (ED recommended with any red flag)");
          } else {
            why.push("No red flags, no neurological signs, no suspected infection");
            head = "No red flags found: treat symptoms and transport";
            actions.push("Transport to an appropriate facility", "Considering an alternate pathway or treat and discharge: consult the EOC Clinician");
          }
          return { tone: tone, headline: head, why: why, actions: actions, note: "Relief from analgesia is not evidence of a benign cause (CPP-061-AO)." };
        },
        disclaimer: "Training aid only. Use the current protocol, the SAAS Clinical app and the EOC Clinician for real patients.",
        scenariosNote: "Examples written for training from CPP-061-AO. Decide before pressing the button.",
        scenarios: [
          { title: "Her usual migraine", text: "34, known migraines, same as usual, nauseated, normal neuro exam.", values: { rosier: false, infect: false, thunder: false, trigger: false, systemic: false, neuro: false, over50: false, cancer: false, worsening: false, pregnancy: false, trauma: false, icp: false, nausea: true } },
          { title: "Worst ever, at the gym", text: "45, sudden severe headache while lifting weights, \"like being hit\", vomited once.", values: { rosier: false, infect: false, thunder: true, trigger: true, systemic: false, neuro: false, over50: false, cancer: false, worsening: false, pregnancy: false, trauma: false, icp: false, nausea: true } },
          { title: "Fever and stiff neck", text: "19, headache, fever, neck stiffness, a few purple spots.", values: { rosier: false, infect: true, thunder: false, trigger: false, systemic: true, neuro: false, over50: false, cancer: false, worsening: false, pregnancy: false, trauma: false, icp: false, nausea: false } },
          { title: "Arm weakness", text: "68, headache and new left arm weakness.", values: { rosier: true, infect: false, thunder: false, trigger: false, systemic: false, neuro: true, over50: true, cancer: false, worsening: false, pregnancy: false, trauma: false, icp: false, nausea: false } },
          { title: "34 weeks pregnant", text: "Severe headache, BP 162/104.", values: { rosier: false, infect: false, thunder: false, trigger: false, systemic: false, neuro: false, over50: false, cancer: false, worsening: false, pregnancy: true, trauma: false, icp: false, nausea: false } },
          { title: "Worse every morning", text: "61, history of breast cancer, headache for a week, worse on waking, vomiting.", values: { rosier: false, infect: false, thunder: false, trigger: false, systemic: false, neuro: false, over50: false, cancer: true, worsening: true, pregnancy: false, trauma: false, icp: true, nausea: true } }
        ]
      } }
    ] },

    { title: "Treat", blocks: [
      { box: { title: "Symptom management (CPP-061-AO)", items: [
        "Encourage the patient to follow their existing headache or migraine management plan, including their own medication",
        "Analgesia as per Pain Management CPP-013-AO (paracetamol, ibuprofen if trained and safe, methoxyflurane)",
        "Consider an antiemetic as per Nausea and Vomiting CPP-047-AO",
        "Transport to an appropriate facility",
        "Considering an alternate pathway or treat and discharge: consult the EOC Clinician"
      ] } },
      { box: { title: "Ondansetron (CPP-047-AO)", tiles: true, steps: [
        { t: "When", text: "Uncontrolled nausea and vomiting, and/or to make transport safe. Patients 2 years and over." },
        { t: "Contraindications", text: "Allergy to ondansetron or the formulation; taking apomorphine for Parkinson's." },
        { t: "Precautions", text: "Prolonged QT, irregular heart conditions (AF) or heart failure, low magnesium or potassium. Confirm with the patient first." },
        { t: "Dose", text: "Adults 4 mg ODT. 6 to under 16: 4 mg. 2 to under 6: 2 mg. Single dose." },
        { t: "Give", text: "With dry hands, place the ODT on top of the tongue. Let it dissolve, then swallow." },
        { t: "Still vomiting?", text: "Or more than one precaution: consult the EOC Clinician, who may advise a further 4 mg for adults only." }
      ] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { table: { title: "Secondary headache causes (CPP-061-AO)", items: [
        "Subarachnoid haemorrhage", "Head injuries", "Raised intracranial pressure", "Space-occupying lesions",
        "Venous sinus thrombosis", "Giant cell arteritis", "Meningitis or systemic infection"
      ] } },
      { links: [
        { label: "Stroke module", href: "/microlearning/stroke/" },
        { label: "Sepsis module", href: "/microlearning/sepsis/" },
        { label: "Pain management module", href: "/microlearning/pain/" },
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "About what proportion of headaches are secondary (serious) headaches?", options: ["About 5%", "About 25%", "About 50%"], answer: 0,
        why: "Secondary headaches account for approximately 5% of headaches and have a serious and life-threatening cause." },
      { q: "Which is a primary headache?", options: ["Subarachnoid haemorrhage", "Migraine", "Meningitis"], answer: 1,
        why: "Primary headaches are benign: mainly migraines, tension-type and cluster headaches." },
      { q: "What is the SAAS clinician's aim with a headache?", options: ["Make the diagnosis", "Identify warning signs, manage symptoms and transport", "Rule out migraine"], answer: 1,
        why: "SAAS clinicians are not aiming to diagnose a headache; focus on clinical warning signs, symptom management and transport." },
      { q: "A headache settles completely with paracetamol. What does that tell you?", options: ["It's benign", "Nothing: relief is not evidence of a benign cause", "It's a migraine"], answer: 1,
        why: "Headaches with symptomatic relief from effective analgesia is not evidence of a benign cause." },
      { q: "Which is a red flag?", options: ["Usual migraine with usual triggers", "Sudden severe headache triggered by exertion", "A mild tension headache after a long day"], answer: 1,
        why: "Sudden onset or severe headache triggered by cough, exertion, or sexual activity is a red flag." },
      { q: "A 58-year-old's first ever severe headache. Red flag?", options: ["No", "Yes: first severe headache over 50", "Only with vomiting"], answer: 1,
        why: "First severe headache in patients >50 years of age is a red flag." },
      { q: "Headache that's worse lying down and on waking, with vomiting, suggests:", options: ["Tension headache", "Raised intracranial pressure: a red flag", "Dehydration only"], answer: 1,
        why: "Features suggesting raised intracranial pressure, such as worse lying down or on waking with nausea and/or vomiting, are a red flag." },
      { q: "Any red flag found. What does the protocol say?", options: ["Treat and leave", "Prioritise transport and request clinical support", "Wait an hour and reassess"], answer: 1,
        why: "Any patient with an identified red flag: prioritise transport and request clinical support. If unavailable, consult the EOC Clinician." },
      { q: "Headache with new facial droop on ROSIER + ACT. Which protocol?", options: ["Headache only", "Stroke CPP-016-AO", "Pain management only"], answer: 1,
        why: "Patients with any neurological signs or symptoms as per Rosier + Act Assessment: manage as per Stroke CPP-016 AO." },
      { q: "Headache, fever and a rash. Which protocol section?", options: ["Sepsis CPP-062-AO (infective cause or meningococcal septicaemia)", "Nausea and vomiting", "Falls"], answer: 0,
        why: "Suspected infective cause or meningococcal septicaemia: manage as per the relevant section in Sepsis CPP-062 AO." },
      { q: "The adult ondansetron dose is:", options: ["2 mg ODT", "4 mg ODT", "8 mg ODT"], answer: 1,
        why: "CPP-047-AO: adults 4 mg ODT, single dose." },
      { q: "You're thinking of leaving a headache patient at home. What must you do?", options: ["Nothing if no red flags", "Consult the EOC Clinician", "Get the patient to sign a form only"], answer: 1,
        why: "If considering an alternate pathway or treat and discharge, consult EOC Clinician." }
    ] } }] },

    { title: "Practical: history and neuro check", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["The SAAS Clinical app (Rosier + Act Assessment)", "A pen torch", "A blank PCR or notepad"] } },
      { steps: [
        { t: "The history", text: "Your partner makes up a headache. Ask: onset, what they were doing, worst ever?, past headaches, triggers, pregnancy, recent head knock, cancer or HIV history, fever, neck stiffness, vomiting." },
        { t: "Check the red flags", text: "Run through all ten out loud." },
        { t: "ROSIER + ACT and gait", text: "Do the assessment and watch them walk." },
        { t: "The plan", text: "Say your plan: red flag or not, which protocol, pain relief, ondansetron, transport." }
      ] },
      { box: { title: "What good looks like", items: ["Onset and \"worst ever?\" asked early", "All ten red flags checked", "ROSIER + ACT and gait done", "Doesn't treat relief as reassurance"] } },
      { note: "Suggested activities written for training. Check them with your lead instructor." }
    ] },

    { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "The Resus Room is a UK emergency medicine podcast. Its \"Subarachnoid Haemorrhage; Roadside to Resus\" episode (June 2021, about 52 minutes) covers the most important secondary headache from the roadside to the emergency department. Optional listening. It reflects UK practice, so where it differs from CPP-061-AO, follow the protocol." },
      { links: [{ label: "Open the Resus Room SAH episode", href: "https://theresusroom.libsyn.com/subarachnoid-haemorrhage-roadside-to-resus" }] }
    ] }
  ]
};
