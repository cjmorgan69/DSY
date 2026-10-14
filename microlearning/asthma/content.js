/* Asthma - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Sources: SAAS CPP-050-AO Asthma - AO, version 3.1 (2 December 2024), exported 31.08.2026, plus the related procedures
   CPPRO-012 Inhaled Medication Administration (v2.0, effective 19/04/2018, review date March 2021) and CPPRO-008
   Medication Checks (v1.0), and the AO Asthma Severity & Treatment Table CTL-071 (exported 31.08.2026). Nothing clinical
   here goes beyond those documents. */
window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,                       // true shows "coming soon" boxes for empty video/podcast slots
  title: "Asthma",
  subtitle: "Ambulance Officer microlearning",
  headline: "Judging asthma severity and matching the treatment to it",
  lead: "The key to asthma treatment is relieving bronchospasm with bronchodilators. This module covers the AO protocol: thinking of anaphylaxis first, judging severity, salbutamol by MDI and spacer or nebuliser, ipratropium for more severe asthma, and when to call the EOC Clinician.",
  minutes: 20,

  protocol: {
    code: "CPP-050-AO", name: "Asthma - AO", version: "v3.1 (2 December 2024)", exported: "31 August 2026",
    also: [{ code: "CTL-071", name: "AO Asthma Severity & Treatment Table", version: "exported 31 August 2026" },
           { code: "CPPRO-012, 008", name: "Inhaled Medication Administration, Medication Checks", version: "v2.0 (19 April 2018) and v1.0 (5 July 2017)" }]
  },

  session: {
    intro: "For a team-led session. Allow about 25 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the intro video", time: "3 min", text: "Then read the key points together, taking turns to read one box each." },
      { t: "Work the scenarios", time: "8 min", text: "Open the asthma checker. For each scenario, decide the severity and the treatment as a group before pressing the button, then compare." },
      { t: "Read the related procedures", time: "4 min", text: "MDI and spacer, the nebuliser, and medication checks. Ask who has used a spacer with a young child, and what helped." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pair up and run through the MDI and spacer steps on a trainer. Do the rest in your own time." }
    ]
  },

  video: {
    src: "intro.mp4",
    poster: "intro-poster.jpg",
    title: "Asthma: what AOs need to know"
  },

  intro: [
    "A key concept of asthma treatment is the relief of bronchospasm using bronchodilators.",
    "If severe asthma occurs in the setting of anaphylaxis, follow the anaphylaxis protocol before treating the asthma symptoms. This includes early activation of clinical support.",
    "Oxygen saturations alone should never be used to judge asthma severity, only together with a thorough patient assessment. Asthma symptoms can also occur in patients with no history of asthma, especially with a chest infection or smoke inhalation."
  ],

  keyPointsTitle: "Key points",
  keyPoints: [
    { title: "First, for every patient", check: { q: "Severe asthma, and the signs could be anaphylaxis. Which protocol comes first?", a: "Anaphylaxis (CPP-003-AO), before treating the asthma symptoms. That includes early activation of clinical support." }, items: [
      "Basic care and life support",
      "Assess GCS and work of breathing; take baseline obs (RR, PR, monitor, SpO2) and the past medical history (CTL-071)",
      "Use the Asthma Severity & Treatment Table (CTL-071) to guide treatment",
      "Consider whether the signs and symptoms could indicate allergy or anaphylaxis: if so, refer to Anaphylaxis CPP-003-AO",
      "Consider the causes, and follow any existing asthma care plan if appropriate",
      "If at any point the patient becomes unresponsive and is not breathing normally, commence CPR"
    ] },
    { title: "Judge the severity", tone: "warn", check: { q: "SpO2 is 97%, but the patient can only say single words and is distressed. Is this mild asthma?", a: "No. Talking in words and distressed is more severe asthma. Oxygen saturations alone should never be used to judge severity." }, items: [
      "Mild: talks in sentences; normal work of breathing; SpO2 usually above 95% on room air",
      "More severe: talks in phrases, words, or unable to speak; distressed; SpO2 usually below 95%",
      "Life threatening: unable to speak; drowsy or unconscious; cyanosed; poor respiratory effort or respiratory arrest"
    ], note: "Never use oxygen saturations alone to judge severity. Use them only together with a thorough patient assessment." },
    { title: "Mild asthma", steps: [
      { t: "Follow the patient's asthma management plan", text: "If appropriate. Or:" },
      { t: "Salbutamol via MDI and spacer (CPPRO-012)", text: "1 puff is 100 microg, with 4 breaths per puff. 12 puffs (1200 microg) if 6 years or older; 6 puffs (600 microg) if 1 to 6 years." },
      { t: "If the patient is unable to use the MDI and spacer", text: "Consider adding a resuscitation mask to the MDI for under 4 years, or nebulised salbutamol: 2.5 mg (plus saline to make 5 mL) if 1 to 6 years, 5 mg if over 6 years." },
      { t: "Fails to improve after salbutamol?", text: "Consult the EOC Clinician, who may advise repeat doses in line with paramedic level treatment: salbutamol and ipratropium via MDI and spacer with oxygen at 4 L/min via nasal cannula, or salbutamol and ipratropium via nebuliser." },
      { t: "Consider clinical support, and continue basic care" },
      { t: "Provide transport", text: "And where appropriate notify the receiving facility. Consult the EOC Clinician immediately if the patient deteriorates at any time." }
    ] },
    { title: "More severe asthma", steps: [
      { t: "Request early clinical support" },
      { t: "Commence nebulised salbutamol and ipratropium", text: "1 to 6 years: salbutamol 2.5 mg and ipratropium 250 microg (about half a neb of each drug), with 3 mL saline to make the volume up to 5 mL. Over 6 years: salbutamol 5 mg and ipratropium 500 microg (one neb of each drug)." },
      { t: "Consult the EOC Clinician", text: "Who may advise further doses per paramedic level treatment: salbutamol and ipratropium via MDI and spacer with oxygen at 4 L/min, repeat nebs, continuous nebs, or IM adrenaline (CPP-050-AO and CTL-071)." },
      { t: "Provide transport", text: "And where appropriate notify the receiving facility. Consult the EOC Clinician immediately if the patient deteriorates at any time." }
    ], note: "The protocol's principle adds that the first-line treatment for severe asthma is high-flow oxygen and nebulised bronchodilator therapy, with an early request for clinical support and transport." },
    { title: "Life-threatening asthma", tone: "no", steps: [
      { t: "High flow oxygen, and early clinical support" },
      { t: "If assisted ventilation (IPPV with BVM) is required", text: "Small tidal volumes; slow ventilation rates to allow adequate chest deflation (CTL-071: slow and gentle, 4 per minute); gentle ventilation to avoid over-pressurising the lungs and causing injury." },
      { t: "Consult the EOC Clinician", text: "Who may advise doses as per the paramedic level CPG, including continuous salbutamol nebulisation and/or IM adrenaline 10 microg/kg to a total maximum dose of 500 microg, repeated as needed." },
      { t: "Continue basic care, and provide urgent transport", text: "Notify the receiving facility. If the patient deteriorates during transport, consult the EOC Clinician immediately." }
    ] },
    { title: "Using an MDI and spacer (CPPRO-012)", tiles: true, steps: [
      { t: "Check", text: "Complete the medication checks and check allergies. Where able, explain and gain consent." },
      { t: "Sit them up", text: "Position the patient at more than 45 degrees, or upright, to help chest expansion. Hand hygiene." },
      { t: "Prepare the MDI", text: "Make sure the canister is secure in the holder, remove the cover, shake it well and test spray into the air. Do not inhale it." },
      { t: "Prime the spacer", text: "Put the MDI mouthpiece into the end of the spacer and spray one puff to prime it." },
      { t: "Seal", text: "The patient closes their lips around the spacer mouthpiece. For young children who cannot follow this, attach a suitably sized face mask and hold it on their face." },
      { t: "One puff, four breaths", text: "Spray one puff into the spacer. The patient breathes in deeply and slowly and holds for about 10 seconds if they can. Repeat this breathing four times." },
      { t: "Repeat and record", text: "Remove the spacer, wait 30 to 60 seconds, and repeat as the protocol directs. Record the dose, route and time." }
    ] }
  ],

  tool: {
    check: { q: "A 5 year old has more severe asthma. What does the nebuliser contain?", a: "Salbutamol 2.5 mg and ipratropium 250 microg, with 3 mL saline to make the volume up to 5 mL." },
    title: "Asthma checker",
    intro: "Answer the questions about your patient and the severity and protocol pathway are shown, with the dose for the age. It follows CPP-050-AO version 3.1.",
    fields: [
      { id: "anaph", type: "yesno", label: "Could the signs and symptoms indicate allergy or anaphylaxis?" },
      { id: "lt", type: "yesno", label: "Is the patient drowsy or unconscious, cyanosed, or making poor respiratory effort (or in respiratory arrest)?" },
      { id: "speech", type: "choice", label: "How does the patient talk?", options: [
        { value: "sentences", label: "In sentences" },
        { value: "phrases", label: "In phrases" },
        { value: "words", label: "In words only" },
        { value: "unable", label: "Unable to speak" } ] },
      { id: "wob", type: "choice", label: "Work of breathing", options: [
        { value: "normal", label: "Normal work of breathing" },
        { value: "distressed", label: "Distressed, visibly short of breath" } ] },
      { id: "age", type: "number", label: "Patient age in years", hint: "In completed years (a child of 6 and a half is 6). Use a decimal for infants, for example 0.5 for six months.", step: "0.25", placeholder: "e.g. 8" },
      { id: "mdi", type: "choice", label: "MDI and spacer (mild asthma)", optional: true, options: [
        { value: "yes", label: "The patient can use an MDI and spacer" },
        { value: "no", label: "The patient is unable to use an MDI and spacer" } ] },
      { id: "response", type: "choice", label: "Salbutamol so far (mild asthma)", optional: true, options: [
        { value: "none", label: "Not given yet" },
        { value: "failed", label: "Given, but the patient failed to improve" } ] }
    ],
    evaluate: function (v) {
      var deteriorate = "Consult the EOC Clinician immediately if the patient deteriorates at any time";
      var cpr = "If at any point the patient becomes unresponsive and is not breathing normally, commence CPR.";
      if (v.anaph) {
        return { tone: "warn", headline: "Think anaphylaxis: follow CPP-003-AO first",
          why: ["The signs and symptoms could indicate allergy or anaphylaxis", "If severe asthma occurs in the setting of anaphylaxis, the anaphylaxis protocol is followed before treating the asthma symptoms"],
          actions: ["Follow Anaphylaxis - AO CPP-003-AO (see the Anaphylaxis module)", "This includes early activation of clinical support"], note: cpr };
      }
      if (v.lt) {
        return { tone: "warn", headline: "Life-threatening asthma",
          why: ["Drowsy or unconscious, cyanosed, or poor respiratory effort or respiratory arrest"],
          actions: ["High flow oxygen", "Early clinical support",
            "If assisted ventilation (IPPV with BVM) is required: small tidal volumes, slow and gentle ventilations (4 per minute, CTL-071) to allow adequate chest deflation and avoid over-pressurising the lungs",
            "Consult the EOC Clinician, who may advise doses as per the paramedic level CPG, including continuous salbutamol nebulisation and/or IM adrenaline 10 microg/kg to a total maximum of 500 microg, repeated as needed",
            "Continue basic care", "Provide urgent transport and notify the receiving facility",
            "If the patient deteriorates during transport, consult the EOC Clinician immediately"], note: cpr };
      }
      var severe = v.speech !== "sentences" || v.wob === "distressed";
      if (v.age < 1) {
        return { tone: "warn", headline: (severe ? "More severe asthma" : "Mild asthma") + ", under 1 year: consult the EOC Clinician",
          why: ["The AO protocol gives salbutamol and ipratropium doses for patients 1 year and older only"],
          actions: [severe ? "Request early clinical support" : "Consider clinical support", "Consult the EOC Clinician for treatment advice", "Continue basic care", "Provide transport and where appropriate notify the receiving facility", deteriorate],
          note: "This step is the checker's reading of the protocol, which has no dose for under 1 year. " + cpr };
      }
      var yrs = Math.floor(v.age);   // ages in completed years: a child of 6 and a half is "6"
      var young = yrs <= 6;          // the nebuliser doses use "1-6 yrs" and "> 6 yrs"
      if (severe) {
        var why = [];
        if (v.speech !== "sentences") why.push("Talks in " + (v.speech === "unable" ? "no words: unable to speak" : v.speech));
        if (v.wob === "distressed") why.push("Distressed, visibly short of breath");
        return { tone: "warn", headline: "More severe asthma",
          alerts: v.speech === "unable" ? ["Unable to speak is also a sign of life-threatening asthma. Check for drowsiness, cyanosis and poor respiratory effort."] : [],
          why: why,
          actions: ["Request early clinical support",
            young ? "Commence nebulised salbutamol 2.5 mg and ipratropium 250 microg (about half a neb of each), with 3 mL saline to make the volume up to 5 mL (1 to 6 years)"
                  : "Commence nebulised salbutamol 5 mg and ipratropium 500 microg, one neb of each (over 6 years)",
            "Consult the EOC Clinician, who may advise further doses: salbutamol and ipratropium via MDI and spacer with oxygen at 4 L/min, repeat nebs, continuous nebs, or IM adrenaline",
            "Provide transport and where appropriate notify the receiving facility", deteriorate],
          note: "The protocol's principle says the first-line treatment for severe asthma is high-flow oxygen and nebulised bronchodilator therapy, with early clinical support and transport. " + cpr };
      }
      var tail = ["Consider clinical support", "Continue basic care", "Provide transport and where appropriate notify the receiving facility", deteriorate];
      var mildWhy = ["Talks in sentences", "Normal work of breathing"];
      if (v.response === "failed") {
        return { tone: "warn", headline: "Mild asthma, not improving: consult the EOC Clinician", why: mildWhy.concat(["Failed to improve after salbutamol"]),
          actions: ["Consult the EOC Clinician, who may advise repeat doses in line with paramedic level treatment: salbutamol and ipratropium via MDI and spacer with oxygen at 4 L/min via nasal cannula, or salbutamol and ipratropium via nebuliser"].concat(tail), note: cpr };
      }
      if (!v.mdi) {
        return { tone: "warn", headline: "Mild asthma: can the patient use an MDI and spacer?", why: mildWhy, actions: ["Choose the MDI and spacer answer to see the salbutamol dose"] };
      }
      var acts = ["Follow the patient's asthma management plan if appropriate, or:"], head, alerts = [];
      if (v.mdi === "yes") {
        if (yrs === 6) {
          head = "Mild asthma: salbutamol via MDI and spacer (check the dose at 6 years)";
          acts.push("Salbutamol via MDI and spacer, 1 puff = 100 microg");
          alerts.push("The protocol gives 12 puffs (1200 microg) for 6 years or older AND 6 puffs (600 microg) for 1 to 6 years, so a 6 year old fits both. The Asthma Severity & Treatment Table (CTL-071) uses \"under 6\" and \"over 6\", so it does not settle it either. Consult the EOC Clinician.");
        } else {
          var puffs = yrs > 6 ? "12 puffs (1200 microg)" : "6 puffs (600 microg)";
          head = "Mild asthma: salbutamol " + puffs + " via MDI and spacer";
          acts.push("Salbutamol " + puffs + " via MDI and spacer (CPPRO-012), 1 puff = 100 microg, 4 breaths per puff");
        }
        if (v.age < 4) acts.push("Under 4 years: consider adding a resuscitation mask to improve medication delivery");
      } else {
        var neb = young ? "nebulised salbutamol 2.5 mg, plus saline to make 5 mL (1 to 6 years)" : "nebulised salbutamol 5 mg (over 6 years)";
        head = "Mild asthma: " + neb.charAt(0).toUpperCase() + neb.slice(1);
        if (v.age < 4) acts.push("Under 4 years: consider adding a resuscitation mask to the MDI, or");
        acts.push("Give " + neb);
      }
      return { tone: "good", headline: head, alerts: alerts, why: mildWhy.concat(["SpO2 is usually above 95% on room air, but never judge severity on SpO2 alone"]),
        actions: acts.concat(["If the patient fails to improve after salbutamol, consult the EOC Clinician"]).concat(tail), note: cpr };
    },
    disclaimer: "Training aid only. Use the current protocol, the Asthma Severity & Treatment Table (CTL-071) and the EOC Clinician for real patients.",
    scenariosNote: "Examples written for training from the protocol. Decide your answer before pressing the button.",
    scenarios: [
      { title: "Mild, adult", text: "28 years, wheezy, talking in full sentences, normal work of breathing, can use a spacer.", values: { anaph: false, lt: false, speech: "sentences", wob: "normal", age: 28, mdi: "yes", response: "none" } },
      { title: "Mild, toddler", text: "3 years, talking in sentences, normal work of breathing, can manage the spacer with help.", values: { anaph: false, lt: false, speech: "sentences", wob: "normal", age: 3, mdi: "yes", response: "none" } },
      { title: "Mild, cannot use the spacer", text: "70 years, confused, talking in sentences, normal work of breathing, cannot use the MDI and spacer.", values: { anaph: false, lt: false, speech: "sentences", wob: "normal", age: 70, mdi: "no", response: "none" } },
      { title: "Mild, young child, no spacer", text: "5 years, talking in sentences, normal work of breathing, will not use the spacer.", values: { anaph: false, lt: false, speech: "sentences", wob: "normal", age: 5, mdi: "no", response: "none" } },
      { title: "Mild, not improving", text: "35 years, still talking in sentences after 12 puffs of salbutamol, but no better.", values: { anaph: false, lt: false, speech: "sentences", wob: "normal", age: 35, mdi: "yes", response: "failed" } },
      { title: "6 years old", text: "6 years, talking in sentences, normal work of breathing, can use the spacer.", values: { anaph: false, lt: false, speech: "sentences", wob: "normal", age: 6, mdi: "yes", response: "none" } },
      { title: "More severe, adult", text: "40 years, talking in phrases, distressed and visibly short of breath.", values: { anaph: false, lt: false, speech: "phrases", wob: "distressed", age: 40 } },
      { title: "More severe, child", text: "4 years, saying single words, distressed.", values: { anaph: false, lt: false, speech: "words", wob: "distressed", age: 4 } },
      { title: "Life threatening", text: "22 years, unable to speak, drowsy and cyanosed.", values: { anaph: false, lt: true, speech: "unable", wob: "distressed", age: 22 } },
      { title: "Allergy signs", text: "17 years, known asthma, sudden breathing difficulty after eating peanuts, swollen lips.", values: { anaph: true, lt: false, speech: "phrases", wob: "distressed", age: 17 } }
    ]
  },

  referenceTitle: "Severity, doses and related procedures",
  reference: [
    { title: "AO Asthma Severity & Treatment Table (CTL-071)", text: "First: assess GCS and work of breathing; baseline obs (RR, PR, monitor, SpO2); past medical history. MDI and spacer: 4 breaths per puff.", table: { head: ["Severity and route", "Under 6 years", "Over 6 years and adults"], rows: [
      ["Mild (talks in sentences, normal work of breathing, SpO2 usually above 95%): MDI + spacer", "6 puffs salbutamol. EOC Clinician may advise repeat doses", "12 puffs salbutamol. EOC Clinician may advise repeat doses"],
      ["More severe (phrases, words or unable to speak, distressed, SpO2 usually below 95%): neb or MDI + spacer", "2.5 mg salbutamol + 250 microg ipratropium (about half a neb of each drug + 3 mL saline). Consult for: MDI + spacer and O2 at 4 L/min, repeat nebs, continuous nebs, or IM adrenaline", "5 mg salbutamol + 500 microg ipratropium (one neb of each drug). Consult for: MDI + spacer and O2 at 4 L/min, repeat nebs, continuous nebs, or IM adrenaline"],
      ["Life threatening (unable to speak, drowsy or unconscious, poor respiratory effort) or respiratory arrest: neb or BVM", "High flow oxygen; early clinical support; if IPPV, slow and gentle ventilations (4 per min); consult for continuous nebs or adrenaline", "High flow oxygen; early clinical support; if IPPV, slow and gentle ventilations (4 per min); consult for continuous nebs or adrenaline"]
    ] } },
    { title: "Severity: common signs (CPP-050-AO)", table: { head: ["Severity", "Common signs"], rows: [
      ["Mild", "Talks in sentences; normal work of breathing; SpO2 usually above 95% on room air"],
      ["More severe", "Talks in phrases, words, or unable to speak; distressed; SpO2 usually below 95%"],
      ["Life threatening", "Unable to speak; drowsy or unconscious; cyanosed; poor respiratory effort or respiratory arrest"]
    ] }, text: "Oxygen saturations alone should never be used to judge severity, only together with a thorough patient assessment." },
    { title: "Doses by age (CPP-050-AO)", table: { head: ["Treatment", "1 to 6 years", "Over 6 years"], rows: [
      ["Mild: salbutamol via MDI and spacer", "6 puffs (600 microg)", "12 puffs (1200 microg), 6 years or older"],
      ["Mild, unable to use the MDI and spacer: nebulised salbutamol", "2.5 mg, plus saline to make 5 mL", "5 mg"],
      ["More severe: nebulised salbutamol and ipratropium", "Salbutamol 2.5 mg and ipratropium 250 microg, with 3 mL saline to make 5 mL", "Salbutamol 5 mg and ipratropium 500 microg"],
      ["Life threatening: IM adrenaline, only if the EOC Clinician advises", "10 microg/kg", "10 microg/kg, total maximum 500 microg, repeated as needed"]
    ] }, text: "1 puff is 100 microg. The protocol's MDI doses say \"6 years or older\" and \"1 to 6 years\", and the CTL-071 table says \"under 6\" and \"over 6\", so a 6 year old is not clearly covered: consult the EOC Clinician. The protocol gives no dose for under 1 year. For under 4 years, consider adding a resuscitation mask to the MDI." },
    { title: "Nebulised medication (CPPRO-012)", items: [
      "Complete the medication checks, check allergies, and where able explain and gain consent",
      "Position the patient at more than 45 degrees, or upright",
      "Keep the nebuliser chamber upright at all times so the medication does not leak out",
      "Multiple medications, or saline as a diluent, can go in one bowl. The total volume should not exceed 10 mL",
      "Set the flow rate at 6 to 8 litres per minute, and tap the bowl occasionally and at the end",
      "Nebulisers may increase the spread of droplet and airborne infection. If a respiratory infection is suspected use the right precautions; MDIs, where clinically appropriate, are preferred",
      "Record the dose, route and time"
    ] },
    { title: "Cautions for inhaled medication (CPPRO-012)", items: [
      "Contraindicated with allergy to the medication, and in a patient with severe shortness of breath and reduced tidal volume",
      "For a confused, combative or cognitively impaired patient, nebulised administration is preferred",
      "Equipment is single patient use only"
    ] },
    { title: "Medication checks (CPPRO-008)", items: [
      "Check a medication before preparing it, before giving it, and after giving it",
      "Two clinicians check whenever possible; single responders take extra care",
      "A medication given outside protocols must be authorised by the EOC Clinician, and the medication, dose and route are repeated back"
    ] }
  ],
  links: [
    { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
    { label: "CTL-071 AO Asthma Severity & Treatment Table (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/AO%20Asthma%20Severity%20and%20Treatment.pdf" },
    { label: "CPPRO-012 Inhaled Medication Administration (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-012%20Inhaled%20Medication%20Administration.pdf" },
    { label: "CPPRO-008 Medication Checks (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-008%20Medication%20Checks.pdf" },
    { label: "Anaphylaxis module", href: "../anaphylaxis/" }
  ],

  quiz: [
    { q: "What is the key concept of asthma treatment in the protocol?", options: ["Sedating the patient", "Relief of bronchospasm using bronchodilators", "Fluids for every patient"], answer: 1,
      why: "A key concept of asthma treatment is the relief of bronchospasm using bronchodilators." },
    { q: "Which signs fit mild asthma?", options: [
        "Talks in sentences, normal work of breathing, SpO2 usually above 95% on room air",
        "Talks in single words and is distressed",
        "Drowsy and cyanosed" ], answer: 0,
      why: "Mild: talks in sentences, normal work of breathing, SpO2 usually above 95% on room air." },
    { q: "SpO2 is 98%, but the patient can only say a few words and is distressed. What severity is this?", options: ["Mild, because the SpO2 is normal", "More severe", "Not asthma"], answer: 1,
      why: "Talking in words and distressed is more severe asthma. Oxygen saturations alone should never be used to judge severity." },
    { q: "Mild asthma in a 30 year old who can use a spacer. What salbutamol dose?", options: ["4 puffs (400 microg)", "6 puffs (600 microg)", "12 puffs (1200 microg)"], answer: 2,
      why: "Salbutamol via MDI and spacer: 12 puffs (1200 microg) if 6 years or older. 1 puff is 100 microg." },
    { q: "Mild asthma in a 3 year old using an MDI and spacer. What does the protocol say?", options: [
        "6 puffs (600 microg), and consider adding a resuscitation mask",
        "12 puffs (1200 microg)",
        "Nebulised salbutamol 5 mg" ], answer: 0,
      why: "6 puffs (600 microg) for 1 to 6 years. For under 4 years, consider adding a resuscitation mask to improve delivery." },
    { q: "Mild asthma in an adult who cannot use an MDI and spacer. What is given?", options: ["Nebulised salbutamol 2.5 mg", "Nebulised salbutamol 5 mg", "IM adrenaline"], answer: 1,
      why: "For patients unable to use an MDI and spacer: salbutamol 5 mg via nebuliser if over 6 years." },
    { q: "More severe asthma in a 9 year old. What goes in the nebuliser?", options: [
        "Salbutamol 2.5 mg only",
        "Salbutamol 5 mg and ipratropium 500 microg",
        "Ipratropium 250 microg only" ], answer: 1,
      why: "Over 6 years: nebulised salbutamol 5 mg and ipratropium 500 microg, with early clinical support." },
    { q: "More severe asthma in a 4 year old. What goes in the nebuliser?", options: [
        "Salbutamol 2.5 mg and ipratropium 250 microg, with 3 mL saline to make 5 mL",
        "Salbutamol 5 mg and ipratropium 500 microg",
        "12 puffs of salbutamol" ], answer: 0,
      why: "1 to 6 years: salbutamol 2.5 mg and ipratropium 250 microg, with 3 mL saline to make the volume up to 5 mL." },
    { q: "A patient with severe asthma may be having an anaphylactic reaction. What comes first?", options: ["The asthma protocol", "The anaphylaxis protocol, including early clinical support", "Wait and reassess"], answer: 1,
      why: "If severe asthma occurs in the setting of anaphylaxis, follow the anaphylaxis protocol before treating asthma symptoms." },
    { q: "You need to ventilate a patient with life-threatening asthma with a BVM. How?", options: [
        "Large, fast breaths to clear the lungs",
        "Small tidal volumes, slow rates to allow the chest to deflate, gently",
        "Only if the SpO2 is below 80%" ], answer: 1,
      why: "Small tidal volumes, slow ventilation rates to allow adequate chest deflation, and gentle ventilation to avoid over-pressurising the lungs. CTL-071: slow and gentle, 4 per minute." },
    { q: "Mild asthma fails to improve after salbutamol. What next?", options: [
        "Repeat salbutamol on your own as often as needed",
        "Consult the EOC Clinician, who may advise repeat doses in line with paramedic level treatment",
        "Stop treatment and wait" ], answer: 1,
      why: "Consult the EOC Clinician, who may advise salbutamol and ipratropium via MDI and spacer (with oxygen at 4 L/min) or via nebuliser. CTL-071: the EOC Clinician may advise repeat doses." },
    { q: "At any point the patient becomes unresponsive and is not breathing normally. What do you do?", options: ["Give another nebuliser", "Commence CPR", "Sit them upright"], answer: 1,
      why: "If at any point the patient becomes unresponsive and is not breathing normally, commence CPR." }
  ],

  practical: {
    title: "Practical: spacer, nebuliser set-up and the call",
    intro: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity.",
    equipment: ["A training MDI and spacer (never a real medication)", "A nebuliser bowl, mask and tubing from training stock", "A paediatric face mask for the spacer", "Your station's medication check reference"],
    steps: [
      { t: "Call the severity", text: "Take turns describing a patient: how they talk, their work of breathing, and how alert they are. Your partner names the severity and the first treatment." },
      { t: "Coach the spacer", text: "Run through the CPPRO-012 MDI and spacer steps on a trainer, coaching your partner: prime, seal, one puff, four slow breaths, wait 30 to 60 seconds." },
      { t: "Set up a nebuliser", text: "Assemble a training nebuliser: upright chamber, mask, tubing, and say the flow you would set (6 to 8 L/min) and the doses for a 4 year old and an adult. Do not use real medication." },
      { t: "Make the call", text: "Role-play the call to the EOC Clinician for a patient who has not improved: age, severity signs, what has been given and when." }
    ],
    good: ["Severity judged on speech, work of breathing and alertness, not on SpO2 alone", "Anaphylaxis considered first", "The right dose for the age", "The EOC Clinician's advice repeated back"],
    note: "Suggested activities written for training. Check them with your lead instructor."
  },

  podcast: {
    title: "The Resus Room: Asthma; Roadside to Resus",
    summary: "The Resus Room is a UK emergency medicine podcast. Its two-part \"Asthma; Roadside to Resus\" episode (August 2017, about 30 and 24 minutes) follows the asthmatic patient from the roadside to the emergency department. Optional listening. It reflects UK practice from 2017 (2016 BTS guidelines), so where it differs from CPP-050-AO, follow the protocol.",
    link: "https://theresusroom.libsyn.com/asthma-roadside-to-resus",
    linkLabel: "Open Part 1"
  },
  furtherLinks: [
    { label: "The Resus Room: Asthma; Roadside to Resus Part 2", href: "https://theresusroom.libsyn.com/asthma-roadside-to-resus-part-2" }
  ]
};
