/* Crush Syndrome - Paramedic microlearning. Content only: the layout lives in ../shared/module.js.
   Source: SAAS CPG-135-P Crush Syndrome - P v1.0 (20 March 2020), exported 31.08.2026. The PDF shows no review date.
   ICP scope is shown for reference from CPG-136-ICP Crush Syndrome - ICP v1.1 (15 May 2026) and CPG-179-ICP
   Hyperkalaemia - ICP v1.0 (3 December 2025), both exported 31.08.2026. The paramedic salbutamol dose (5 mg neb, consult)
   is from the SAAS Clinical app medicine entry for "Crush syndrome with suspected hyperkalaemia" (DMO-028); CPG-135-P
   itself gives no dose. Nothing clinical here goes beyond those documents. */
var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Crush syndrome",
  subtitle: "Paramedic microlearning",
  headline: "Plan the release before you release the crush",
  lead: "When a crushed limb or torso is freed, the muscle reperfuses. Hypotension, acute kidney injury and hyperkalaemia can follow fast. This module covers CPG-135-P: who to worry about, saline before and after release, the ECG, and what changes when an ICP is on scene.",
  minutes: 20,

  protocol: {
    code: "CPG-135-P", name: "Crush Syndrome - P", version: "v1.0 (20 March 2020)", exported: "31 August 2026",
    also: [
      { code: "CPG-136-ICP", name: "Crush Syndrome - ICP", version: "v1.1 (15 May 2026)" },
      { code: "CPG-179-ICP", name: "Hyperkalaemia - ICP", version: "v1.0 (3 December 2025)" }
    ]
  },
  relatedCodes: ["CPG-136-ICP"],
  footerNotes: ["ICP content is shown so paramedics know what clinical support adds. It is not paramedic scope.",
    "The paramedic salbutamol dose is from the SAAS Clinical app (crush syndrome with suspected hyperkalaemia, consult). CPG-135-P itself gives no dose."],

  session: {
    intro: "For a team-led session. Allow about 25 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the introduction", time: "3 min", text: "Then ask: which three complications are the potentially reversible causes of death?" },
      { t: "Who and when", time: "4 min", text: "Check everyone can say the two numbers: more than 60 minutes, 18% of the body or more." },
      { t: "Before and after release", time: "7 min", text: "Take turns reading a box. Work out the first aliquot for a 70 kg adult and a 20 kg child, before and after release." },
      { t: "When the ICP arrives", time: "4 min", text: "Read the comparison table. What can the ICP do for hyperkalaemia that a paramedic can't without a consult?" },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pairs plan a release: who calls the EOC, where the two IVs go, what the ECG shows." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4?v=2", poster: "intro-poster.jpg?v=2", title: "Crush syndrome: before and after release" } },
      { text: "Crush injuries come from vehicle entrapment, falling debris, industrial accidents, or prolonged pressure on part of the body from the person's own weight when they can't move." },
      { text: "Crush syndrome, or traumatic rhabdomyolysis, is the systemic effect. It can develop rapidly after skeletal muscle is released from prolonged pressure." },
      { text: "Hypotension, acute kidney injury (AKI) and hyperkalaemia are the potentially reversible causes of death." }
    ] },

    { title: "Who to worry about", blocks: [
      { text: "Not every crush injury leads to crush syndrome after release." },
      { box: { title: "Anticipate crush syndrome when the crush", tone: "warn", check: { q: "A farmer has had his lower leg pinned under a gate for 20 minutes. Is this the picture CPG-135-P tells you to anticipate crush syndrome in?", a: "No. The guideline describes prolonged crush (more than 60 minutes) over 18% of the body surface or more, with significant muscle mass. Treat the injury, keep reassessing, and use clinical judgement." }, items: [
        "Has lasted more than 60 minutes (prolonged crush)",
        "Affects 18% of the body surface area or more",
        "Involves significant muscle mass"
      ] } },
      { text: "These patients are often found entrapped after natural disasters. But any job with compression of the torso, limbs or other parts of the body can lead to crush syndrome. That includes an immobile person lying on part of their own body for a long time." }
    ] },

    { title: "Before the crush is released", blocks: [
      { box: { title: "Pre compression release", tiles: true, steps: [
        { t: "Universal care", text: "Universal care and life support." },
        { t: "Consult the EOC Clinician", text: "For advice from the SAAS Medical Practitioner. CPG-135-P makes this part of the pathway." },
        { t: "Request clinical support", text: "For example an ICP, or MedSTAR. The guideline names MedSTAR, or a consult with the SAAS Medical Practitioner via the EOC Clinician." },
        { t: "Two large bore IVs", text: "Large bore IV access x 2, if possible." },
        { t: "Saline before release", text: "Start fluid resuscitation before the compressive force is removed." }
      ] } },
      { box: { title: "Fluid resuscitation before release", tone: "warn", items: [
        "16 years and over: IV saline 250 mL aliquots, up to 20 mL/kg",
        "Under 16 years: IV saline 10 mL/kg aliquots (max 250 mL), up to 20 mL/kg",
        "Cease if there are signs of fluid overload"
      ] } },
      { box: { title: "Timing is a judgement call", items: [
        "Balance the need to remove the compressive force quickly against the time needed to prepare for the complications after release",
        "Saline before and after release is recommended to reduce the effects of reperfusion",
        "A uniform aggressive fluid regimen for every crush patient is an oversimplification. Seek clinical consultation when possible"
      ] } }
    ] },

    { title: "After release", blocks: [
      { box: { title: "Post compression release", items: [
        "Prioritise early transport",
        "Minimise scene time where possible",
        "IV saline 10 mL/kg aliquots (max 250 mL), up to 20 mL/kg",
        "Paediatrics: aim for the low end of the normal SBP range for age, as per the RDR",
        "Cease saline if there are signs of fluid overload"
      ] } },
      { box: { title: "Watch for fluid overload", items: [
        "Monitor continuously for increasing jugular vein distension and pulmonary congestion",
        "Aggressive fluid is needed to reverse shock, reduce AKI and improve electrolyte and acid-base disturbances, but not at the cost of overload"
      ] } },
      { box: { title: "The ECG and hyperkalaemia", tone: "warn", check: { q: "After release, the 12-lead shows tall, peaked T waves. What does CPG-135-P tell a paramedic to do?", a: "Consult the EOC Clinician for SAAS Medical Practitioner advice on nebulised salbutamol. Keep transport moving." }, items: [
        "Without point-of-care blood tests, tall peaked T waves or a widening QRS may indicate hyperkalaemia",
        "If the ECG shows signs of hyperkalaemia: consult the EOC Clinician for SAAS Medical Practitioner advice on nebulised salbutamol",
        "SAAS Clinical app, paramedic: salbutamol 5 mg (5 mg/2.5 mL) nebulised, adult, on consult",
        "Nebulised salbutamol is a temporary treatment. It may give a modest drop in serum potassium over 30 to 90 minutes"
      ] } }
    ] },

    { title: "When the ICP is on scene", blocks: [
      { text: "CPG-135-P asks you to request clinical support, and the patient may well end up with an ICP or MedSTAR. Here is how the ICP guideline differs, so you know what that support adds. This is for reference only: work to your own scope." },
      { table: { title: "Paramedic and ICP guidelines side by side", table: { head: ["", "Paramedic (CPG-135-P v1.0)", "ICP (CPG-136-ICP v1.1)"], rows: [
        ["EOC Clinician consult before release", "Consult for SAAS Medical Practitioner advice", "Recommended"],
        ["Access", "Large bore IV x 2 if possible", "Large bore IV x 2 if possible; saline IV or IO"],
        ["Saline before release, adults", "16 and over: 250 mL aliquots up to 20 mL/kg", "10 mL/kg aliquots (max 250 mL) up to 20 mL/kg, all ages"],
        ["Saline after release", "10 mL/kg aliquots (max 250 mL) up to 20 mL/kg", "Same, IV or IO"],
        ["Children", "Aim for the low end of normal SBP for age (RDR) after release", "Same aim, before and after release"],
        ["ECG signs of hyperkalaemia", "Consult for nebulised salbutamol", "Hyperkalaemia CPG-179-ICP. No consult needed for salbutamol (changed May 2026)"]
      ] } } },
      { box: { title: "What the ICP can give for hyperkalaemia (CPG-179-ICP, adults)", check: { q: "Your ICP gives calcium gluconate for suspected hyperkalaemia. Will it lower the potassium?", a: "No. CPG-179-ICP says calcium gluconate stabilises the cardiac membrane and prevents arrhythmia, but plays no role in lowering serum potassium. Salbutamol helps move potassium back into the cells." }, items: [
        "IV/IO saline 250 mL aliquots up to 20 mL/kg to correct hypovolaemia (caution in fluid restriction or end stage renal disease)",
        "IV/IO calcium gluconate 2.2 mmol (1 g) slow push over 2 to 3 minutes, after checking IV patency, then a 100 mL saline flush",
        "Nebulised salbutamol 10 mg (caution in cardiac disease: tachycardia)",
        "If adequate perfusion can't be achieved: IV/IO adrenaline titrated to effect",
        "Children with suspected hyperkalaemia: consult the EOC Clinician for SAAS Medical Practitioner advice"
      ] } },
      { box: { title: "ECG changes listed in CPG-179-ICP", items: [
        "Tall, peaked T waves", "Prolonged PR interval", "Flattening or absent P wave", "Widened QRS", "Sine wave, followed by VT or asystole"
      ], note: "No combination of ECG findings defines hyperkalaemia, and a normal-looking ECG can't exclude it. Changes, especially progression, support the diagnosis alongside a crush history." } },
      { text: "Pre-hospital treatment of hyperkalaemia only buys time: stabilise the heart and shift potassium into the cells until it can be removed in hospital. Do it alongside rapid transport, not instead of it." }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { table: { title: "Saline in crush syndrome (CPG-135-P)", table: { head: ["", "16 years and over", "Under 16 years"], rows: [
        ["Before release", "250 mL aliquots", "10 mL/kg aliquots (max 250 mL)"],
        ["After release", "10 mL/kg aliquots (max 250 mL)", "10 mL/kg aliquots (max 250 mL); aim for the low end of normal SBP for age (RDR)"],
        ["Limit", "Up to 20 mL/kg", "Up to 20 mL/kg"],
        ["Stop", "Signs of fluid overload", "Signs of fluid overload"]
      ] } } },
      { note: "The guideline does not say whether the 20 mL/kg covers saline before and after release together. Ask the EOC Clinician when you consult." },
      { links: [
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
        { label: "CPG-135-P Crush Syndrome (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Crush%20Syndrome%20-%20P.pdf" },
        { label: "CPG-136-ICP Crush Syndrome (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Crush%20Syndrome%20-%20ICP.pdf" },
        { label: "CPG-179-ICP Hyperkalaemia (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Hyperkalaemia%20-%20ICP.pdf" },
        { label: "CTL-070 Adult RDR Chart (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/Adult%20RDR%20Chart.pdf" }
      ] },
      { note: "Paediatric RDR Charts (CTL-046): open them in the SAAS Clinical app." }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "Which complications of crush syndrome does CPG-135-P call potentially reversible causes of death?", options: ["Hypothermia, sepsis and compartment syndrome", "Hypotension, acute kidney injury and hyperkalaemia", "Fat embolism, bleeding and hypoglycaemia"], answer: 1,
        why: "Crush syndrome results in significant systemic complications, of which hypotension, AKI and hyperkalaemia are potentially reversible causes of mortality." },
      { q: "When should you anticipate crush syndrome on release?", options: ["Any crush over 15 minutes", "Prolonged crush (more than 60 minutes) over 18% of the body or more, with significant muscle mass", "Only crush injuries to the torso"], answer: 1,
        why: "Anticipate crush syndrome when releasing compressive forces from patients with prolonged crush (> 60 minutes) affecting a body surface area of ≥ 18%, with significant muscle mass." },
      { q: "What does the paramedic guideline list before the crush is released, after universal care?", options: ["Release first, then call", "Consult the EOC Clinician, request clinical support, two large bore IVs, saline", "Apply a tourniquet above the crush"], answer: 1,
        why: "Pre compression release: universal care, consult EOC clinician for advice from SAAS Medical Practitioner, request clinical support, large bore IV access x 2 if possible, fluid resuscitation." },
      { q: "A 40 year old, 80 kg, before release. What saline does CPG-135-P give?", options: ["250 mL aliquots up to 20 mL/kg (1600 mL)", "500 mL boluses, no limit", "10 mL/kg up to 40 mL/kg"], answer: 0,
        why: "≥ 16 yrs: IV saline 250 mL aliquots up to 20 mL/kg. 20 x 80 kg = 1600 mL." },
      { q: "A 10 year old, 20 kg, before release. What size is each aliquot?", options: ["250 mL", "200 mL", "100 mL"], answer: 1,
        why: "< 16 yrs: IV saline 10 mL/kg aliquots (max 250 mL) up to 20 mL/kg. 10 x 20 = 200 mL, up to 400 mL." },
      { q: "When do you stop the saline?", options: ["Once the SBP is over 90", "When there are signs of fluid overload", "After the first litre"], answer: 1,
        why: "Cease saline if signs of fluid overload. Monitor continuously for increased jugular vein distension and pulmonary congestion." },
      { q: "The patient is freed. What are the scene priorities?", options: ["Full secondary survey on scene first", "Prioritise early transport and minimise scene time", "Wait for the ICP before moving"], answer: 1,
        why: "Post compression release: prioritise early transport, minimise scene time where possible." },
      { q: "After release, a child's saline should aim for:", options: ["The low end of the normal SBP range for age, as per the RDR", "An SBP of 110 or more", "A MAP of 90 or more"], answer: 0,
        why: "Paediatrics: aim low end of normal SBP range for age per RDR." },
      { q: "Which ECG findings does CPG-135-P say may indicate hyperkalaemia?", options: ["ST elevation and Q waves", "Tall peaked T waves or a widening QRS", "A short QT and U waves"], answer: 1,
        why: "ECG analysis that displays tall peaked T waves, or a widening QRS may indicate the presence of hyperkalaemia." },
      { q: "You see those changes after release. As a paramedic you:", options: ["Give salbutamol 10 mg straight away", "Consult the EOC Clinician for SAAS Medical Practitioner advice on nebulised salbutamol", "Give calcium gluconate"], answer: 1,
        why: "If ECG signs of hyperkalaemia: consult EOC clinician for SAAS Medical Practitioner advice on nebulised salbutamol. Calcium gluconate is ICP scope (CPG-179-ICP)." },
      { q: "How fast might nebulised salbutamol lower the potassium?", options: ["Within 2 minutes, permanently", "A modest drop over 30 to 90 minutes, as a temporary treatment", "It doesn't lower potassium"], answer: 1,
        why: "Nebulised salbutamol can be an effective temporary treatment, potentially providing a modest reduction in serum potassium over 30 to 90 minutes." },
      { q: "Under CPG-179-ICP, what does calcium gluconate do in hyperkalaemia?", options: ["Lowers serum potassium", "Stabilises the cardiac membrane and prevents arrhythmia", "Treats the acute kidney injury"], answer: 1,
        why: "Calcium gluconate reduces myocardial excitability by stabilising the cardiac membrane and preventing arrhythmia, but does not play a role in reducing serum potassium." }
    ] } }] },

    { title: "Practical: plan the release", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs or a small group, at the station. The lead instructor can swap in a different activity." },
      { box: { title: "The job (example written for training)", items: ["A 58 year old, about 90 kg, has been pinned by the thigh and hip under a tractor wheel for about 2 hours on a farm 50 minutes from the nearest hospital. Fire and rescue say they can lift it in 15 minutes."] } },
      { box: { title: "What you need", items: ["An IV arm or manikin", "Saline bags and giving sets", "A monitor with 12-lead ECG", "The SAAS Clinical app (RDR charts, salbutamol entry)"] } },
      { steps: [
        { t: "Is this crush syndrome territory?", text: "Talk through duration, body surface area and muscle mass." },
        { t: "The EOC call", text: "Role-play the consult: mechanism, time trapped, vital signs, the planned release time, and the request for clinical support." },
        { t: "Access and saline", text: "Set up two lines. Work out the aliquot and the 20 mL/kg total aloud, before and after release." },
        { t: "After the lift", text: "Say what you watch for: blood pressure, JVD and chest sounds, and the 12-lead for peaked T waves or a widening QRS. Who leaves first, and when?" }
      ] },
      { box: { title: "What good looks like", items: ["The EOC Clinician called before the lift, not after", "Saline running before release", "Fluid sums right, with a plan to stop if overload appears", "ECG watched after release, and early transport prioritised"] } },
      { note: "Scenario and activities written for training. Check them with your lead instructor." }
    ] },

    { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "The Resus Room is a UK emergency medicine podcast. \"Crush; Roadside to Resus\" (February 2023, about 57 minutes) covers crush injury from the roadside to the emergency department. \"Rhabdomyolysis\" (February 2017, about 12 minutes) is a short refresher on the kidney side. Optional listening. They reflect UK practice, so where they differ from CPG-135-P, follow the guideline." },
      { links: [
        { label: "Crush; Roadside to Resus (2023)", href: "https://theresusroom.libsyn.com/crush-roadside-to-resus" },
        { label: "Rhabdomyolysis (2017)", href: "https://theresusroom.libsyn.com/rhabdomyolysis" }
      ] }
    ] }
  ]
};
