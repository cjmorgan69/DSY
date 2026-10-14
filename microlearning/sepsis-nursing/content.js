/* Adult sepsis for rural nursing staff. Content only: the layout lives in ../shared/module.js; navy theme from
   ../shared/theme-navy.css. Sources: the NSW Clinical Excellence Commission Adult Sepsis Pathway (SMR060.400, form
   NH700066 080725, PDF created August 2025) and the NSW Agency for Clinical Innovation Adult ECAT protocol A3.4
   Sepsis (suspected) (published December 2023, updated June 2024, due for review January 2026, now passed), as
   accessed on 14 October 2026. Nothing clinical here goes beyond those two documents. These are NSW Health
   documents: staff follow their own health service's policy and scope of practice. */
var M = window.MODULE = {
  flow: true,
  draft: false,
  logo: "dsy-logo-navy.png",
  title: "Sepsis (adult)",
  subtitle: "Rural nursing microlearning",
  headline: "Could it be sepsis? Recognise, respond, and start treatment within 60 minutes",
  lead: "Sepsis is infection with organ dysfunction, and it is a medical emergency. This module walks through the CEC Adult Sepsis Pathway and the nurse-initiated ECAT sepsis protocol: recognising sepsis, escalating, and the first hour of treatment.",
  minutes: 30,
  disclaimer: "Training resource only. It does not replace the Adult Sepsis Pathway, the ECAT protocol, your health service's policy or advice from a senior clinician.",

  protocol: {
    code: "ECAT A3.4", name: "Sepsis (suspected), Adult ECAT protocol", version: "published Dec 2023, updated June 2024, review due Jan 2026", exported: "14 October 2026",
    also: [{ code: "SMR060.400", name: "CEC Adult Sepsis Pathway", version: "form NH700066 080725" }]
  },
  footerNotes: [
    "These are NSW Health documents (CEC and ACI). Follow your own health service's sepsis policy, scope of practice and local CERS.",
    "The ECAT sepsis protocol was due for review in January 2026. Check the ACI website for the current version.",
    "ECAT sections marked with a diamond or triangle need additional prerequisite education before use (PD2025_025)."
  ],

  session: {
    intro: "For a team-led session. Allow about 35 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the intro video", time: "3 min", text: "Then read the introduction together." },
      { t: "Recognise and respond", time: "8 min", text: "Read the key points aloud, a box each. Stop at the red and yellow zone box and talk through who you would call at your site." },
      { t: "The first hour", time: "6 min", text: "Swipe through the six actions. Who does what in your department?" },
      { t: "Antibiotic checker", time: "8 min", text: "Work the practice cases. Decide the gentamicin dose before pressing the button." },
      { t: "Knowledge check", time: "6 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pair up and run a mock patient through the pathway form." }
    ]
  },

  video: {
    src: "intro.mp4",
    poster: "intro-poster.jpg",
    title: "Adult sepsis: the first hour"
  },

  intro: [
    "Sepsis is infection with organ dysfunction, and it is a medical emergency. The CEC Adult Sepsis Pathway is for patients 16 years or older in any clinical setting, to support recognition and management of sepsis. For women who are pregnant or up to six weeks after pregnancy, use the Maternal Sepsis Pathway instead. Use your local febrile neutropenia guideline where relevant.",
    "The ACI ECAT protocol \"Sepsis (suspected)\" covers any person 16 years and over whose symptoms fulfil the Adult Sepsis Pathway criteria. It authorises registered and enrolled nurses, within their scope of practice and PD2025_025, to request diagnostics and give medication and fluids in line with the pathway. Escalate immediately as per your local CERS protocol.",
    "The absence of fever in elderly patients is frequent. Suspect infection in an elderly patient with acute functional decline: new or increasing confusion, falls, reduced oral intake or a change in urinary habits."
  ],

  keyPointsTitle: "Key points",
  keyPoints: [
    { title: "Could it be sepsis? Signs of infection", items: [
      "Looks very unwell",
      "History of fever, rigors or hypothermia",
      "Tachypnoea, short of breath, cough, new oxygen requirement",
      "New confusion, change in behaviour, altered level of consciousness or delirium",
      "Unexplained pain",
      "Wound or line redness, pain, swelling or exudate",
      "Non-blanching rash",
      "Abdominal pain, distension, vomiting or diarrhoea",
      "Dysuria, oliguria, frequency or odour",
      "Raised lactate, WCC or CRP (if known)"
    ] },
    { title: "And/or any risk factors", items: [
      "Aged 65 years or more; frail, chronic condition or recent fall",
      "Aboriginal and Torres Strait Islander people",
      "Immunocompromised; indwelling medical device or line",
      "Patient, carer or family concern",
      "Recent trauma, surgery or procedure",
      "Known infection not responding to treatment",
      "Re-presentation, deterioration or no improvement with the same illness"
    ] },
    { title: "Signs of organ dysfunction: respond and escalate", tone: "warn", check: { q: "Two yellow zone observations and a lactate of 2.6. What does the pathway say?", a: "Call for a clinical review within 30 minutes (local CERS) and consult the senior clinician. If they consider possible sepsis, commence sepsis treatment and inform the Attending Medical Officer." }, text: "Commence an A-G assessment and document a full set of vital sign observations. Early signs of organ dysfunction include hypotension, tachypnoea, altered mental state and raised lactate.", items: [
      "ANY red zone observation, or additional criteria (including lactate 4 mmol/L or more): call a RAPID RESPONSE (local CERS) and refer to any Resuscitation Plan. This is PROBABLE SEPSIS with a high risk of deterioration, and SEPTIC SHOCK",
      "TWO or more yellow zone observations, or additional criteria (including lactate 2 mmol/L or more): call for a CLINICAL REVIEW within 30 minutes (local CERS) and consult the SENIOR CLINICIAN. Do they consider POSSIBLE SEPSIS?",
      "Neither: consider other causes of deterioration; if infection, treat with antibiotics; increase the frequency of observations as the patient's condition indicates. Reconsider sepsis if the patient deteriorates",
      "Probable or possible sepsis: commence sepsis treatment AND inform the Attending Medical Officer. Discuss the management plan with the patient, carer or family, including any Advance Care Plan"
    ] },
    { title: "Complete actions 1 to 5 within 60 minutes", tiles: true, steps: [
      { t: "Get help", text: "Escalate as per local CERS, if not already called." },
      { t: "Commence monitoring", text: "Give oxygen as required to maintain SpO2 95% or more (88 to 92% for COPD)." },
      { t: "Access and pathology", text: "Vascular access; lactate; FBC, EUC, LFTs, VBG and CRP if available; 2 sets of blood cultures from 2 separate sites; BGL. Call for expert help after 2 failed cannulation attempts and prepare for intraosseous access." },
      { t: "Fluid resuscitation", text: "Don't wait for results. 500 mL crystalloid bolus STAT. Aim for systolic BP 100 mmHg or more. Strict fluid balance." },
      { t: "Antibiotics", text: "Document the source if known. Therapeutic Guidelines: Antibiotic or local sepsis guideline; or the ECAT regimen when its criteria apply." },
      { t: "Then reassess and refer", text: "Repeat lactate within 2 hours. Update the nurse in charge and AMO using ISBAR. Escalate to Intensive Care or retrieval if no improvement." }
    ] },
    { title: "Fluids and blood cultures: the detail", items: [
      "Blood cultures: 2 sets from 2 separate sites. With a CVAD in situ, 1 set from the CVAD and 1 set peripherally. If difficult to obtain, do not delay antibiotics",
      "Collect a venous blood gas or point of care test if available",
      "Pathway: 500 mL crystalloid bolus STAT (for example sodium chloride 0.9%, Hartmann's or Plasma-Lyte); assess response; repeat 500 mL if ongoing hypotension",
      "Closely monitor patients with cardiac or renal dysfunction, pulmonary oedema, the elderly or frail when giving repeated boluses",
      "If ongoing hypotension, consider vasopressors and escalate to Intensive Care or retrieval service",
      "ECAT (nurse-initiated, diamond): sodium chloride 0.9% 500 mL IV or intraosseous bolus; aim for systolic BP 100 mmHg or over; if ongoing hypotension, repeat once"
    ] },
    { title: "ECAT antibiotics: when a nurse can give them", tone: "warn", check: { q: "Probable sepsis, ED patient, the medical officer is on the way but 40 minutes out. Can an ECAT-credentialed RN give the antibiotics?", a: "Yes, if a medical or nurse practitioner is unavailable: ECAT says give antibiotics within 60 minutes for probable sepsis with a high risk of deterioration or septic shock, in an emergency patient (or a CERS inpatient presenting less than 24 hours ago at designated facilities)." }, text: "Give antibiotics within 60 minutes if ALL of these apply:", items: [
      "The patient has probable sepsis with a high risk of deterioration, or septic shock",
      "AND a medical or nurse practitioner is unavailable",
      "AND the patient is being treated as an emergency patient, OR as an inpatient as part of a CERS response who presented less than 24 hours ago (designated facilities only)",
      "Attempt blood cultures and sampling first, but do not delay treatment. Document the source of infection if known"
    ] },
    { title: "Monitoring after the first hour", items: [
      "Vital sign observations and fluid balance at least every 30 minutes for 2 hours, then hourly for 4 hours",
      "Actively seek microbiology and other results and review the treatment plan",
      "Re-examine for other sources of infection; refer for surgical source control if required",
      "Escalate as per local CERS if any signs of deterioration"
    ] }
  ],

  tool: {
    check: { q: "A 72 year old man, 175 cm and 80 kg, no kidney impairment. What gentamicin dose does the ECAT protocol give?", a: "BMI 26.1, so actual body weight: 7 mg/kg x 80 kg = 560 mg (under the 680 mg maximum, already a multiple of 40)." },
    title: "ECAT antibiotic checker",
    intro: "For an ECAT-credentialed registered nurse when the ECAT antibiotic criteria apply. It follows ECAT A3.4 (updated June 2024): gentamicin by age, kidney function and the BMI guide, plus the second antibiotic by allergy. If your eMR has the Gentamicin Dose Advisor, use that instead.",
    fields: [
      { id: "criteria", type: "yesno", label: "Do the ECAT antibiotic criteria apply? (probable sepsis or septic shock; no medical or nurse practitioner available; emergency patient or eligible CERS inpatient)" },
      { id: "age", type: "number", label: "Age (years)", step: "1", placeholder: "e.g. 72" },
      { id: "sex", type: "choice", label: "Sex (for the adjusted body weight)", options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }] },
      { id: "height", type: "number", label: "Height (cm)", step: "1", placeholder: "e.g. 175" },
      { id: "weight", type: "number", label: "Actual weight (kg)", step: "0.5", placeholder: "e.g. 80" },
      { id: "kidney", type: "yesno", label: "Known kidney impairment?" },
      { id: "gentci", type: "yesno", label: "Any gentamicin contraindication? (significant auditory or vestibular condition; aminoglycoside hypersensitivity; myasthenia gravis; aminoglycoside toxicity in the patient or a first-degree relative)" },
      { id: "allergy", type: "choice", label: "Penicillin allergy", options: [
        { value: "none", label: "No known allergies" },
        { value: "nonsevere", label: "Non-severe penicillin allergy" },
        { value: "severe", label: "Life-threatening or uncertain penicillin allergy" } ] },
      { id: "mrsa", type: "yesno", label: "Known MRSA or risk of colonisation, and/or a CVAD in situ?" }
    ],
    evaluate: function (v) {
      var esc = "Escalate to a medical or nurse practitioner";
      if (!v.criteria) {
        return { tone: "", headline: "ECAT antibiotics not authorised", why: ["The ECAT antibiotic section applies only when all its criteria are met"],
          actions: ["Follow the Adult Sepsis Pathway and escalate as per local CERS", "Antibiotics as prescribed (Therapeutic Guidelines: Antibiotic or local sepsis guideline)"] };
      }
      if (v.age < 16) {
        return { tone: "warn", headline: "Under 16: this protocol does not apply", why: ["ECAT A3.4 and the Adult Sepsis Pathway are for patients 16 years and over"], actions: [esc] };
      }
      var why = [], actions = [], note = "";
      var bmi = v.weight / Math.pow(v.height / 100, 2);
      var ibw = (v.sex === "female" ? 45.5 : 50) + 0.9 * (v.height - 152);
      var adj = ibw + 0.4 * (v.weight - ibw);
      if (v.gentci) {
        why.push("Gentamicin contraindication present");
        actions.push("Do not give gentamicin: give the other antibiotics and seek advice about gentamicin");
      } else if (v.kidney && v.age < 18) {
        why.push("Known kidney impairment under 18 years: the ECAT dose table gives no reduced dose for this age");
        actions.push("Seek advice about the gentamicin dose");
      } else {
        var useAdj = bmi >= 30, dw = useAdj ? adj : v.weight, capped = false;
        if (dw > 100) { dw = 100; capped = true; }
        var perkg, max, band;
        if (v.age >= 80) { perkg = 5; max = 480; band = "80 years and over: reduced dose"; }
        else if (v.kidney) { perkg = 5; max = 480; band = "known kidney impairment, 18 and over: reduced dose"; }
        else if (v.age < 18) { perkg = 7; max = 560; band = "16 to 18 years"; }
        else { perkg = 7; max = 680; band = "18 to 80 years"; }
        var raw = perkg * dw, dose = Math.floor(Math.min(raw, max) / 40) * 40;
        why.push("BMI " + bmi.toFixed(1) + ": use " + (useAdj ? "adjusted body weight (" + adj.toFixed(1) + " kg)" : "actual body weight") + (capped ? ", which is over 100 kg, so use 100 kg" : ""));
        why.push(band + ": " + perkg + " mg/kg x " + (Math.round(dw * 10) / 10) + " kg = " + (Math.round(raw * 10) / 10) + " mg" + (raw > max ? ", above the " + max + " mg maximum" : "") + "; rounded down to a multiple of 40 mg");
        actions.push("Gentamicin " + dose + " mg IV once only");
      }
      if (v.allergy === "severe") {
        var van = Math.min(25 * v.weight, 3000);
        actions.push("Vancomycin 25 mg/kg actual body weight IV once only, maximum 3 g: " + (Math.round(van)) + " mg" + (25 * v.weight > 3000 ? " (capped)" : ""));
        why.push("Life-threatening or uncertain penicillin allergy");
      } else {
        actions.push(v.allergy === "nonsevere" ? "Cefazolin 2 g IV once only" : "Flucloxacillin 2 g IV once only");
        why.push(v.allergy === "nonsevere" ? "Non-severe penicillin allergy" : "No known allergies");
        if (v.mrsa) {
          var van2 = Math.min(25 * v.weight, 3000);
          actions.push("Also vancomycin 25 mg/kg actual body weight IV once only, maximum 3 g: " + Math.round(van2) + " mg" + (25 * v.weight > 3000 ? " (capped)" : ""));
          why.push("Known MRSA or risk of colonisation, and/or CVAD in situ");
        }
      }
      actions.push("Attempt blood cultures first, but do not delay; document the source of infection if known");
      return { tone: "good", headline: "ECAT antibiotics within 60 minutes", why: why, actions: actions,
        note: "Doses as written in ECAT A3.4 (diamond: registered nurses with the required education). Check them against your medication reference and the eMR Gentamicin Dose Advisor if available." };
    },
    disclaimer: "Training aid only. Use the current ECAT protocol, your eMR dose advisor and your health service's policy for real patients.",
    scenariosNote: "Practice cases written for training. Work out the dose before pressing the button.",
    scenarios: [
      { title: "72, no allergies", text: "Male, 175 cm, 80 kg, no kidney impairment, no MRSA risk.", values: { criteria: true, age: 72, sex: "male", height: 175, weight: 80, kidney: false, gentci: false, allergy: "none", mrsa: false } },
      { title: "Large adult, BMI over 30", text: "Female, 50 years, 160 cm, 110 kg, no allergies.", values: { criteria: true, age: 50, sex: "female", height: 160, weight: 110, kidney: false, gentci: false, allergy: "none", mrsa: false } },
      { title: "Tall and heavy, BMI under 30", text: "Male, 40 years, 200 cm, 115 kg, no allergies.", values: { criteria: true, age: 40, sex: "male", height: 200, weight: 115, kidney: false, gentci: false, allergy: "none", mrsa: false } },
      { title: "84 years old", text: "Female, 84, 158 cm, 52 kg, no allergies.", values: { criteria: true, age: 84, sex: "female", height: 158, weight: 52, kidney: false, gentci: false, allergy: "none", mrsa: false } },
      { title: "Known kidney impairment", text: "Male, 66, 170 cm, 90 kg, CKD, non-severe penicillin allergy.", values: { criteria: true, age: 66, sex: "male", height: 170, weight: 90, kidney: true, gentci: false, allergy: "nonsevere", mrsa: false } },
      { title: "CVAD in situ", text: "Female, 58, 165 cm, 70 kg, PICC line, no allergies.", values: { criteria: true, age: 58, sex: "female", height: 165, weight: 70, kidney: false, gentci: false, allergy: "none", mrsa: true } },
      { title: "Anaphylaxis to penicillin", text: "Male, 35, 180 cm, 130 kg, life-threatening penicillin allergy.", values: { criteria: true, age: 35, sex: "male", height: 180, weight: 130, kidney: false, gentci: false, allergy: "severe", mrsa: false } },
      { title: "17 years old", text: "Male, 17, 178 cm, 85 kg, no allergies.", values: { criteria: true, age: 17, sex: "male", height: 178, weight: 85, kidney: false, gentci: false, allergy: "none", mrsa: false } },
      { title: "Myasthenia gravis", text: "Female, 61, 163 cm, 68 kg, myasthenia gravis, no allergies.", values: { criteria: true, age: 61, sex: "female", height: 163, weight: 68, kidney: false, gentci: true, allergy: "none", mrsa: false } },
      { title: "Doctor on site", text: "The medical officer is in the department and has seen the patient.", values: { criteria: false, age: 60, sex: "male", height: 175, weight: 80, kidney: false, gentci: false, allergy: "none", mrsa: false } }
    ]
  },

  referenceTitle: "ECAT medications and other care",
  reference: [
    { title: "ECAT A3.4 medications", text: "Diamond: registered nurses who have completed the required education. H: dose adjustment or contraindication in known hepatic impairment; R: in known renal impairment. Escalate to a medical or nurse practitioner.", table: { head: ["Drug", "Dose", "Route", "Frequency"], rows: [
      ["Sodium chloride 0.9% (diamond)", "500 mL", "IV/intraosseous", "Bolus; repeat once if required"],
      ["Gentamicin (diamond)", "7 mg/kg (16-18 yrs max 560 mg; 18-80 yrs max 680 mg); 5 mg/kg if 80+ or known kidney impairment and 18+ (max 480 mg)", "IV", "Once only"],
      ["Flucloxacillin (diamond)", "2 g", "IV", "Once only"],
      ["Cefazolin (diamond)", "2 g", "IV", "Once only"],
      ["Vancomycin (diamond)", "25 mg/kg actual body weight, max 3 g", "IV", "Once only"],
      ["Oxygen", "2-15 L/min, device dependent", "Inhalation", "Continuous"],
      ["Paracetamol (H)", "1000 mg", "Oral", "Once only"],
      ["Ibuprofen (H, R)", "400 mg", "Oral", "Once only"],
      ["Metoclopramide (R)", "Over 20 years: 10 mg", "Oral/IV/IM", "Once only"],
      ["Ondansetron", "4 mg, max 8 mg", "Oral/IV/IM", "Repeat once after 60 min if required"],
      ["Prochlorperazine", "5 mg oral or 12.5 mg IV/IM", "Oral or IV/IM", "Once only"],
      ["Glucose 40% gel", "15 g", "Buccal", "Repeat after 15 min if required"],
      ["Glucose 10% (diamond)", "200 mL", "IV infusion over 15 min", "Once only"],
      ["Glucose 50% (diamond)", "50 mL", "Slow IV injection", "Once only"],
      ["Glucagon (diamond)", "1 mg", "IM", "Once only"]
    ] } },
    { title: "Gentamicin: the BMI guide (ECAT)", items: [
      "BMI under 30: use actual body weight; over 100 kg, use 100 kg",
      "BMI 30 and over: use adjusted body weight; over 100 kg, use 100 kg",
      "Adjusted body weight = ideal body weight + 0.4 x (actual - ideal). Ideal body weight = 50 kg (male) or 45.5 kg (female) + 0.9 x (height in cm - 152)",
      "Round the dose down to the nearest multiple of 40 mg. Do not exceed the maximum",
      "Do not give gentamicin with: significant auditory or vestibular condition; aminoglycoside hypersensitivity; myasthenia gravis; aminoglycoside-induced vestibular or auditory toxicity in the patient or a first-degree relative. Give the other antibiotics and seek advice"
    ] },
    { title: "Pathology and radiology (ECAT)", items: [
      "FBC, UEC, LFT, glucose, VBG with lactate, CRP",
      "Blood cultures: 2 sets from 2 separate sites; with a CVAD, 1 from the CVAD and 1 peripherally",
      "Urinalysis: mid-stream (preferred), clean catch or catheter urine. Nitrites and/or leucocytes: send for MC&S. Refrigerate if transport is delayed",
      "Consider for specific sources: wound swab, sputum culture, stool culture, respiratory viral screen",
      "Triangle: CXR if the chest is the suspected source, or the source is difficult to determine"
    ] },
    { title: "Glucose, pain and nausea (ECAT)", items: [
      "BGL under 4 with no decrease in consciousness (yellow zone): quick-acting carbohydrate (sugary drink, juice, or 40% glucose gel up to 15 g buccal); recheck in 15-30 minutes and repeat until over 4",
      "BGL under 4 with decreased consciousness (red zone) or unable to take oral intake: 40% glucose gel up to 15 g buccal while getting IV access; 10% glucose 200 mL IV over 15 minutes once (diamond); glucagon 1 mg IM once if IV access is delayed (diamond); recheck in 15 minutes",
      "Unconscious or peri-arrest: 50% glucose 50 mL slow IV once (diamond; extravasation can cause serious necrosis); glucagon 1 mg IM if IV delayed; recheck in 15 minutes. Once stable, long-acting carbohydrate and hourly BGL",
      "Pain score 1-6: paracetamol 1000 mg oral and/or ibuprofen 400 mg oral, once. Severe pain: analgesia and escalate (local CERS)",
      "Nausea or vomiting: metoclopramide, ondansetron or prochlorperazine as in the table; choose by the cause"
    ] }
  ],
  links: [
    { label: "CEC Adult Sepsis Pathway (PDF)", href: "https://cec.health.nsw.gov.au/__data/assets/pdf_file/0005/291803/Adult-Sepsis-Pathway.PDF" },
    { label: "ACI ECAT: Sepsis (suspected)", href: "https://aci.health.nsw.gov.au/ecat/adult/sepsis" },
    { label: "CEC Maternal Sepsis Pathway (PDF)", href: "https://cec.health.nsw.gov.au/__data/assets/pdf_file/0008/292193/Maternal-Sepsis-Pathway.pdf" }
  ],

  quiz: [
    { q: "How does the Adult Sepsis Pathway define sepsis?", options: ["Any fever over 38", "Infection with organ dysfunction", "A positive blood culture"], answer: 1,
      why: "Sepsis is infection with organ dysfunction and is a medical emergency." },
    { q: "Which patients is the Adult Sepsis Pathway for?", options: ["Over 18, in ED only", "16 years or older, in any clinical setting", "Any age"], answer: 1,
      why: "Use for patients 16 years or older in any clinical setting. Pregnant women and up to six weeks after pregnancy use the Maternal Sepsis Pathway." },
    { q: "An 82 year old has new confusion and a fall but no fever. What does ECAT remind you?", options: ["No fever, so not sepsis", "Absence of fever in the elderly is frequent: suspect infection with acute functional decline", "Wait for a temperature"], answer: 1,
      why: "ECAT: infection should be suspected in elderly patients with acute functional decline, including new confusion, falls, reduced intake or change in urinary habits." },
    { q: "Any red zone observation, or a lactate of 4 or more, with suspected infection. What do you do?", options: ["Clinical review within 30 minutes", "Call a Rapid Response (local CERS): probable sepsis with high risk of deterioration, and septic shock", "Repeat obs in an hour"], answer: 1,
      why: "Any red zone observation or additional criteria (including lactate 4 mmol/L or more): call a Rapid Response and refer to any Resuscitation Plan." },
    { q: "Two yellow zone observations. What does the pathway say?", options: ["Call for a clinical review within 30 minutes and consult the senior clinician", "Rapid Response", "No action"], answer: 0,
      why: "Two or more yellow zone observations or additional criteria (including lactate 2 mmol/L or more): clinical review within 30 minutes and consult the senior clinician." },
    { q: "Within what time should actions 1 to 5 be complete?", options: ["15 minutes", "60 minutes", "4 hours"], answer: 1,
      why: "Complete actions 1 to 5 within 60 minutes, with ongoing A-G assessment." },
    { q: "What SpO2 target does the pathway give, outside COPD?", options: ["90% or more", "95% or more", "100%"], answer: 1,
      why: "Give oxygen as required to maintain SpO2 95% or more (88 to 92% for COPD)." },
    { q: "How many blood culture sets, and from where?", options: ["One set, any site", "Two sets from two separate sites (with a CVAD: one from the CVAD, one peripheral)", "Three sets from the same site"], answer: 1,
      why: "Collect 2 sets of blood cultures from 2 separate sites; if a CVAD is in situ, 1 set from the CVAD and 1 peripherally." },
    { q: "Cultures are proving difficult. What now?", options: ["Hold antibiotics until cultures are taken", "Do not delay antibiotics", "Wait for the medical officer"], answer: 1,
      why: "Attempt blood cultures and sampling before antibiotics, but do not delay treatment." },
    { q: "What is the first fluid bolus?", options: ["250 mL over an hour", "500 mL crystalloid STAT, aiming for systolic BP 100 or more", "1 litre over 4 hours"], answer: 1,
      why: "Give 500 mL crystalloid bolus STAT; assess response, aim for systolic BP 100 mmHg or more. ECAT: sodium chloride 0.9% 500 mL, repeat once if ongoing hypotension." },
    { q: "Under ECAT, a patient with no known allergies gets gentamicin plus which antibiotic?", options: ["Flucloxacillin 2 g IV", "Cefazolin 2 g IV", "Amoxicillin 1 g oral"], answer: 0,
      why: "No known allergies: flucloxacillin 2 g IV once only; add vancomycin if known MRSA or risk, and/or CVAD in situ." },
    { q: "When should lactate be repeated?", options: ["Within 2 hours", "Within 24 hours", "Only if the first was over 4"], answer: 0,
      why: "Reassess: repeat lactate within 2 hours." }
  ],

  practical: {
    title: "Practical: run the pathway on a mock patient",
    intro: "Optional. Do this in pairs, in your own time. The lead instructor can swap in a different activity.",
    equipment: ["A blank Adult Sepsis Pathway form (or the PDF)", "Your local observation chart and CERS escalation numbers", "Blood culture training sets, if available", "A calculator"],
    steps: [
      { t: "Recognise", text: "Your partner describes a patient. Tick the infection signs and risk factors on page 1." },
      { t: "Zone and escalate", text: "Plot a set of obs. Say red or yellow, who you call, and in what time frame, at your site." },
      { t: "The first hour", text: "Talk through actions 1 to 5 in order, with times, and who in your team does each." },
      { t: "Gentamicin", text: "Work out the dose for 65 kg and 165 cm (female, 70); then 120 kg and 170 cm (male, 45). Check with the antibiotic checker." },
      { t: "ISBAR", text: "Update the Attending Medical Officer in ISBAR: suspected source, obs, lactate, fluids and antibiotics given with times." }
    ],
    good: ["The red or yellow zone named correctly and the right call made", "Cultures attempted but antibiotics not delayed", "Fluid bolus with a clear target and reassessment", "Gentamicin weight and rounding correct"],
    note: "Suggested activities written for training. Check them with your lead instructor and your local policy."
  },

  furtherVideo: {
    src: "https://www.youtube.com/embed/-bt-H5VQl5E",
    title: "Septic shock: pathophysiology and symptoms (Khan Academy)",
    note: "Optional video from Khan Academy's medicine channel: \"Septic shock - pathophysiology and symptoms\" (about 10 minutes, NCLEX-RN series). It explains what happens in the body in sepsis and septic shock. It is a US nursing-exam video and has not been checked against the NSW documents; follow the pathway and ECAT where they differ."
  },
  podcast: {
    title: "The Resus Room: Sepsis; Roadside to Resus",
    summary: "A UK emergency medicine podcast episode (February 2018, about 70 minutes) on sepsis from recognition to the resus room. Optional listening; follow your local pathway where it differs.",
    link: "https://theresusroom.libsyn.com/sepsis-roadside-to-resus",
    linkLabel: "Open the Resus Room sepsis episode"
  },
  furtherLinks: [
    { label: "Khan Academy: Septic shock, diagnosis and treatment (about 8 minutes)", href: "https://www.youtube.com/watch?v=ExJC8AoAczE" }
  ]
};
