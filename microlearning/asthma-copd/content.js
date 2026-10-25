/* Asthma or COPD? When both guidelines apply - Paramedic microlearning. Content only: the layout lives in
   ../shared/module.js.
   Sources (SAAS, exported 31.08.2026):
   - CPG-113-P Asthma (Adult) - P v3.0 (16 June 2022)
   - CPG-113-ICP Asthma (Adult) - ICP (no version shown in the export)
   - CPG-115-P Chronic Obstructive Pulmonary Disease (COPD) - P v2.0 (15 November 2019)
   - CPG-115-ICP COPD - ICP v2.0 (25 November 2021)
   - CTL-049 Asthma Severity Classification
   - CPPRO-014 Continuous Positive Airway Pressure v1.0 (8 March 2018; review date 1 April 2021 has passed)
   - Doses and scope from the SAAS Clinical app medicine table.
   The case study is the lead instructor's own job (25 Oct 2026), shared by them. Where the two guidelines differ and
   neither says which wins, the page says so: it does not choose. */
var AC_TALK = [
  { value: "sentences", label: "Sentences" },
  { value: "phrases", label: "Phrases" },
  { value: "words", label: "Words only" },
  { value: "unable", label: "Unable to speak" }
];
function acValues(v) {                  // a scenario's answers: every yes/no question "no" unless given
  var o = { asthma: true, wob: false, lt: false, copd: false, bd: false, spo2: null, on: null };
  for (var k in v) o[k] = v[k];
  return o;
}

var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Asthma or COPD?",
  subtitle: "Paramedic microlearning",
  headline: "One patient, two guidelines: where each treatment comes from",
  lead: "A patient with COPD on home oxygen can also have an asthma attack. The SAAS asthma and COPD guidelines then both apply, and they don't always agree. This module grades the asthma, sets the two guidelines side by side, covers CPAP, and walks through a real job.",
  minutes: 20,

  protocol: {
    code: "CPG-113-P", name: "Asthma (Adult) - P", version: "v3.0 (16 June 2022)", exported: "31 August 2026",
    also: [
      { code: "CPG-113-ICP", name: "Asthma (Adult) - ICP", version: "no version shown in the export" },
      { code: "CPG-115-P", name: "Chronic Obstructive Pulmonary Disease (COPD) - P", version: "v2.0 (15 November 2019)" },
      { code: "CPG-115-ICP", name: "COPD - ICP", version: "v2.0 (25 November 2021)" },
      { code: "CTL-049", name: "Asthma Severity Classification", version: "exported 31 August 2026" },
      { code: "CPPRO-014", name: "Continuous Positive Airway Pressure", version: "v1.0 (8 March 2018), review date 1 April 2021 has passed" }
    ]
  },
  relatedCodes: ["CPG-115-P", "CPP-050-AO"],
  footerNotes: [
    "Doses and scope are from the SAAS Clinical app medicine table. Always check the app.",
    "CPPRO-014 (CPAP) had a review date of 1 April 2021, which has passed.",
    "The case study is a real job shared by the DSY lead instructor. The scenarios, practical and the notes marked \"DSY\" were written for training and should be checked by your lead instructor."
  ],

  session: {
    intro: "For a team-led session. Allow about 25 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Read the introduction", time: "3 min", text: "Then ask: when does a COPD patient's breathlessness belong on the asthma guideline?" },
      { t: "Grade it", time: "4 min", text: "Read the severity table. Which single finding is enough for severe? For life-threatening?" },
      { t: "Two guidelines side by side", time: "5 min", text: "Go row by row. For each difference, say what you would do and who you would call." },
      { t: "The job", time: "5 min", text: "Read the real job. Would you have done anything differently? Talk about inline nebs and adrenaline." },
      { t: "Checker and quiz", time: "8 min", text: "Work the checker scenarios, deciding before you press the button. Then everyone does the quiz alone." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Asthma or COPD? When both guidelines apply" } },
      { text: "Both guidelines treat the same thing: narrowed airways. Both use salbutamol, ipratropium and steroids. But they differ on oxygen, adrenaline and CPAP." },
      { text: "The asthma guideline says asthma symptoms can occur in patients with no history of asthma, especially with a chest infection or smoke inhalation (CPG-113). The COPD guideline says to consider COPD in anyone over 50 with a long history of smoking or air-borne pollutants, chronic breathlessness on mild exertion, or a chronic cough with sputum (CPG-115)." },
      { box: { title: "Three things to take away", tone: "warn", items: [
        "Grade the asthma with the severity table (CTL-049). One severe or life-threatening sign is enough",
        "Know which guideline each treatment comes from: magnesium is asthma only, CPAP is COPD only",
        "Could it be allergy or anaphylaxis? Use the anaphylaxis guideline (CPG-004-P, CPG-031-ICP)"
      ] } }
    ] },

    { title: "Grade the asthma", blocks: [
      { text: "Use the asthma severity classification table (CTL-049). For severe or life-threatening asthma, the patient only needs to show any one of the signs below." },
      { table: { title: "Asthma severity (CTL-049)", table: { head: ["Finding", "Mild", "Moderate", "Severe", "Life-threatening"], rows: [
        ["Talks in", "Sentences", "Phrases", "Words", "Unable to speak"],
        ["Conscious state", "Conscious", "Conscious", "Agitated, distressed", "Drowsy, collapsed"],
        ["Exhaustion", "No", "No", "Visibly breathless, increased work of breathing", "Exhausted"],
        ["Accessory muscles", "Nil", "Mild", "Moderate", "Severe, or minimal due to tiring"],
        ["Pulse", "Normal", "Tachycardia", "Tachycardia", "May have tachycardia or pre-arrest bradycardia"],
        ["Resp rate", "Normal or raised", "Tachypnoea", "May have tachypnoea", "Poor effort, may be apnoeic"],
        ["Wheeze", "Variable, usually expiratory", "Moderate to loud, may be inspiratory and expiratory", "May be quiet from poor air movement", "May be quiet from poor air movement"],
        ["SpO2 on presentation", "Usually over 95% in air", "Usually 92 to 95% in air", "90 to 94% in air", "Under 90% in air"],
        ["Central cyanosis", "No", "No", "May be present", "Present"],
        ["Posture", "", "", "Upright, can't lie flat, pursed lips, hyper-inflated chest", "Upright, can't lie flat, pursed lips, hyper-inflated chest"]
      ] } } },
      { box: { title: "Any one of these is enough (CTL-049)", tone: "no", check: { q: "RR 40, speaking a few words at a time, GCS 15, pink. SpO2 85% on her home oxygen. What grade?", a: "Life-threatening, on the SpO2 alone: under 90% (and that was on oxygen). Speaking in words and visibly breathless are severe signs on their own. The table says any one sign is enough." }, items: [
        "Severe: speaking in words only, or visibly breathless or increased work of breathing, or SpO2 90 to 94%",
        "Life-threatening: drowsy, collapsed, exhausted, cyanosed, poor respiratory effort, or SpO2 under 90%"
      ] } },
      { note: "The table uses SpO2 in air. Wheeze is a poor predictor of severity: a quiet chest can be a bad sign. DSY note: a patient with COPD may have a low SpO2 on a normal day, so the other signs matter more. A reading on oxygen that is still low would be the same or lower in air." }
    ] },

    { title: "Two guidelines side by side", blocks: [
      { table: { title: "Asthma (CPG-113) and COPD (CPG-115)", table: { head: ["", "Asthma (severe and life-threatening)", "COPD exacerbation"], rows: [
        ["Oxygen", "High-flow oxygen", "Nasal oxygen titrated to SpO2 88 to 92%. Limit oxygen-driven nebs to 6 minutes where possible"],
        ["Bronchodilators", "Neb salbutamol 15 mg and ipratropium 500 microg (severe). Continuous salbutamol (life-threatening). Ipratropium every 20 min, max 3 doses", "MDI and spacer first: salbutamol up to 12 puffs, ipratropium 8 puffs. Neb salbutamol 5 mg and ipratropium 500 microg if the MDI isn't working, every 20 min, max 3 doses"],
        ["Steroids", "Prednisolone 50 mg. ICP: or IV hydrocortisone 250 mg. If none in the past 24 hrs", "Prednisolone 50 mg. ICP: IV hydrocortisone 250 mg at the CPAP step. If none in the past 24 hrs"],
        ["Magnesium (ICP)", "IV magnesium 10 mmol over 20 min (severe). Consult if considering a repeat", "Not in the guideline"],
        ["IV saline", "ICP: 250 mL aliquots up to 20 mL/kg (severe). P and ICP: life-threatening, stop if fluid overload", "Not in the guideline"],
        ["Adrenaline", "Consider in life-threatening asthma. P: IM 500 microg. ICP: IM, or IV/IO infusion", "No evidence for it, and it may be harmful"],
        ["CPAP (ICP)", "Not in the guideline", "If bronchodilators fail and SpO2 88 to 92% can't be reached, or the exacerbation is severe: CPAP 5 cm H2O with inline neb salbutamol 15 mg and ipratropium 500 microg. P: request clinical support for CPAP"],
        ["Transport", "Severe: transport and notify. Life-threatening: priority transport and notify", "Rapid transport and notify at the CPAP step"]
      ] } } },
      { box: { title: "Where they pull in different directions", tone: "warn", check: { q: "Severe asthma in a patient with known moderate to severe COPD. Asthma says high-flow oxygen. COPD says 88 to 92%. Which is right?", a: "Neither guideline covers both conditions at once, so neither says which wins. COPD says uncontrolled oxygen can cause hypercapnic respiratory failure, but adequate oxygenation (88 to 92%) must be kept up even if it causes hypercapnia. Say what you're doing and why, watch conscious state, and consult if unsure (DSY)." }, items: [
        "Oxygen: high flow (asthma) or 88 to 92% (COPD). COPD: patients with moderate to severe COPD are at risk of hypercapnic respiratory failure until a blood gas is done",
        "Adrenaline: consider it (life-threatening asthma) or avoid it (COPD: may be harmful)",
        "CPAP: in the COPD guideline only. The CPAP procedure lists COPD, not asthma"
      ] } },
      { note: "COPD guideline: if 4 L/min by nasal cannula can't get the SpO2 to 88 to 92%, consider pulmonary embolism, pneumonia, ARDS or pulmonary oedema as the cause." }
    ] },

    { title: "CPAP (ICP)", blocks: [
      { text: "CPAP is in the Intensive Care Paramedic scope (CPPRO-014). Paramedics request clinical support for it (CPG-115-P). It raises pressure in the airway through the whole breath, reducing the work of breathing." },
      { box: { title: "When (CPPRO-014, CPG-115-ICP)", items: [
        "COPD, as per the guideline: bronchodilators ineffective and SpO2 88 to 92% can't be reached, or a severe exacerbation",
        "The patient must be awake, able to keep their own airway, and have a systolic BP over 100 mmHg",
        "Also listed: ACPO, severe pneumonia, immersion, inhalation injuries",
        "Any other severe respiratory distress (asthma is not listed): contact the EOC Clinician and discuss with a SAAS Medical Officer"
      ] } },
      { box: { title: "Not if (CPPRO-014)", tone: "no", items: [
        "Suspected pneumothorax (CPG-115-ICP: consider the potential for one)",
        "Respiratory arrest, inadequate effort or agonal breathing; unconscious",
        "Cardiogenic shock; chest trauma",
        "Active upper GI bleeding or recent gastric surgery; nausea or vomiting"
      ] } },
      { box: { title: "Setting up the o_two CPAP (CPPRO-014)", tiles: true, steps: [
        { t: "Mask", text: "Size 4 (red) small adult, or size 5 (blue) large adult resuscitation mask." },
        { t: "Valve and oxygen", text: "Attach the vectored flow valve to the mask and connect the tubing to oxygen." },
        { t: "8 L/min", text: "About 5 cm H2O with an FiO2 of 54%: the COPD setting. 12 L/min is about 10 cm H2O." },
        { t: "Explain", text: "Cooperation is essential. Let the patient hold the mask at first." },
        { t: "Seal and harness", text: "Hold the mask gently, then fit the head harness: cut-out on the crown, straps on the hooks. Check for leaks." },
        { t: "Record", text: "Start time, oxygen flow rate, and removal time if it comes off." }
      ] } },
      { box: { title: "Take it off if (CPPRO-014)", tone: "warn", check: { q: "On CPAP her systolic BP drops to 94. What now?", a: "Take CPAP off and treat the hypotension under the guideline for her condition. CPPRO-014: remove CPAP if systolic BP falls below 100 mmHg." }, items: [
        "Systolic BP under 100 mmHg",
        "Conscious state dropping, can't follow directions, can't protect the airway",
        "SpO2 falling; mask intolerance or marked agitation",
        "Vomiting, or nausea with a strong urge to vomit; copious secretions",
        "Cardiac or respiratory arrest, or clinician judgement"
      ] } },
      { note: "Caution: the ambulance's high-flow meter can deliver 25 L/min, which gives 25 cm H2O through the o_two device. CPAP delivers less FiO2 than the same oxygen flow on its own, so watch the SpO2 closely. CPPRO-014 review date (1 April 2021) has passed." }
    ] },

    { title: "The job", blocks: [
      { text: "A real job from the DSY lead instructor, working with an Intensive Care Paramedic." },
      { box: { title: "What they found", items: [
        "67-year-old woman with COPD, on home oxygen via a concentrator. Called for shortness of breath",
        "Dry wheeze with a prolonged expiratory phase. Couldn't speak in full sentences",
        "RR 40, HR 84, GCS 15, pink and cool skin",
        "SpO2 85% on her concentrator"
      ] } },
      { table: { title: "What was given, and where it fits", table: { head: ["Treatment", "Guideline"], rows: [
        ["Neb salbutamol and ipratropium", "Both. Asthma (severe): salbutamol 15 mg. COPD: 5 mg, oxygen limited to 6 minutes where possible"],
        ["IV hydrocortisone 250 mg (ICP)", "Both. Asthma: severe. COPD: at the CPAP step. Only if no steroids in the past 24 hrs"],
        ["IV magnesium 10 mmol in 50 mL by syringe driver, about 20 mL given (ICP)", "Asthma only (severe to life-threatening). Over 20 minutes = 150 mL/hr. 20 mL is about 4 mmol"],
        ["CPAP (ICP)", "COPD only. SpO2 85% with bronchodilators not working met the trigger. GCS 15: awake with her own airway"],
        ["No inline nebs", "They could have been given: the COPD guideline lists salbutamol 15 mg and ipratropium 500 microg by inline neb with CPAP"],
        ["No adrenaline", "COPD guideline: no evidence, may be harmful. The asthma guideline only says consider it"]
      ] } } },
      { box: { title: "Grading her (CTL-049)", tone: "warn", items: [
        "Severe signs: not speaking in full sentences, RR 40 and visibly breathless",
        "Life-threatening sign: SpO2 under 90%. Hers was 85% on oxygen",
        "Not drowsy, exhausted or cyanosed. HR 84"
      ] } },
      { box: { title: "Talking points (DSY)", items: [
        "Write down which guideline each treatment came from",
        "Hand over how much magnesium went in, and when",
        "Record the CPAP start time, flow rate and BP, and that you looked for a pneumothorax",
        "Inline nebs on CPAP: would they have helped her?"
      ] } }
    ] },

    { title: "Severity and pathway checker", blocks: [
      { tool: {
        title: "Severity and pathway checker",
        intro: "Enter what you find. The checker grades the asthma (CTL-049) and lists what each guideline says. It doesn't decide between them where they differ: you do, with the EOC Clinician.",
        fields: [
          { id: "asthma", type: "yesno", label: "Treating this as asthma?", hint: "Wheeze and bronchospasm. Asthma symptoms can occur with no history of asthma, especially with a chest infection or smoke inhalation (CPG-113)." },
          { id: "talk", type: "choice", label: "Talks in", options: AC_TALK },
          { id: "wob", type: "yesno", label: "Visibly breathless, or increased work of breathing?" },
          { id: "lt", type: "yesno", label: "Drowsy, collapsed, exhausted, cyanosed, or poor respiratory effort?" },
          { id: "spo2", type: "number", label: "SpO2 (%)", optional: true, placeholder: "blank if not known", min: 50 },
          { id: "on", type: "choice", label: "SpO2 measured on", optional: true, options: [{ value: "air", label: "Air" }, { value: "oxygen", label: "Oxygen" }] },
          { id: "copd", type: "yesno", label: "Known or suspected moderate to severe COPD?", hint: "Suspect it in anyone over 50 with a long smoking or air-pollutant history, chronic breathlessness on mild exertion, or a chronic cough with sputum (CPG-115)." },
          { id: "bd", type: "yesno", label: "Bronchodilators given and not working?" },
          { id: "icp", type: "choice", label: "Clinician on scene", options: [{ value: "p", label: "Paramedic" }, { value: "icp", label: "ICP" }] }
        ],
        evaluate: function (v) {
          var why = [], actions = [], alerts = [], s = v.spo2, onO2 = v.on === "oxygen", icp = v.icp === "icp";
          var cpapStep = icp ? [
            "If bronchodilators are ineffective and SpO2 88 to 92% can't be achieved, or the exacerbation is severe (CPG-115-ICP): CPAP at 5 cm H2O (8 L/min). Awake, protecting her own airway, systolic BP over 100 (CPPRO-014). Consider a pneumothorax: CPAP is contraindicated if there are signs of one",
            "With CPAP: inline neb salbutamol 15 mg and ipratropium 500 microg",
            "IV hydrocortisone 250 mg if no steroids in the past 24 hrs (if not already given)",
            "Rapid transport and notify the receiving facility"
          ] : [
            "If bronchodilators are ineffective and SpO2 88 to 92% can't be achieved, or the exacerbation is severe (CPG-115-P): request clinical support (for CPAP). Inline nebulisation may be appropriate. Rapid transport and notify"
          ];
          if (v.bd && s !== null && s < 88) why.push("COPD, bronchodilators not working and SpO2 " + s + "% (88 to 92% not reached): the COPD guideline's CPAP step applies");

          if (!v.asthma) {
            if (!v.copd) return { tone: "warn", headline: "Neither guideline picked", why: ["Not treating as asthma, and no known or suspected COPD"],
              actions: ["This checker covers asthma and COPD only. Use the guideline for what you think is going on, and consult if unsure"] };
            why.unshift("Treating as a COPD exacerbation, not asthma");
            actions.push("Use the patient's current management plan where appropriate",
              "Titrate nasal oxygen to SpO2 88 to 92%",
              "MDI and spacer: salbutamol up to 12 puffs and ipratropium 8 puffs (168 microg). Repeat both every 20 min, or earlier if no improvement",
              "If the MDI isn't working: neb salbutamol 5 mg and ipratropium 500 microg, every 20 min prn (max 3 doses). Limit oxygen to 6 minutes where possible, back to the MDI as soon as appropriate",
              "Oral prednisolone 50 mg if no doses in the past 24 hrs");
            if (v.bd) actions = actions.concat(cpapStep);
            else actions.push("If bronchodilators don't work: the CPAP step (ICP), or request clinical support for it (P)");
            return { tone: v.bd ? "bad" : "warn", headline: "COPD exacerbation", why: why, alerts: ["COPD guideline: no evidence for adrenaline, and it may be harmful"], actions: actions,
              note: "Can't reach 88 to 92% on 4 L/min nasal oxygen? CPG-115 says consider pulmonary embolism, pneumonia, ARDS or pulmonary oedema." };
          }

          var lt = v.lt || v.talk === "unable" || (s !== null && s < 90);
          var sev = !lt && (v.talk === "words" || v.wob || (s !== null && s <= 94));
          var grade = lt ? "life" : sev ? "severe" : v.talk === "phrases" ? "moderate" : "mild";
          var gw = [];
          if (v.lt) gw.push("Drowsy, collapsed, exhausted, cyanosed or poor effort: life-threatening");
          if (v.talk === "unable") gw.push("Unable to speak: life-threatening");
          if (s !== null && s < 90) gw.push("SpO2 " + s + "% (under 90%): life-threatening" + (onO2 ? ". Taken on oxygen: in air it would be the same or lower (DSY)" : ""));
          if (v.talk === "words") gw.push("Speaking in words only: severe");
          if (v.wob) gw.push("Visibly breathless or increased work of breathing: severe");
          if (s !== null && s >= 90 && s <= 94) gw.push("SpO2 " + s + "% (90 to 94%): severe" + (onO2 ? ". Taken on oxygen: in air it would be the same or lower (DSY)" : ""));
          if (grade === "moderate") gw.push("Talks in phrases, no severe or life-threatening sign: moderate");
          if (grade === "mild") gw.push("Talks in sentences, no severe or life-threatening sign: mild");
          if (s !== null && s >= 95 && onO2) gw.push("SpO2 " + s + "% on oxygen: the table uses SpO2 in air, so this reading doesn't grade her");
          why = gw.concat(why);

          if (grade === "mild") actions.push("Follow the patient's asthma management plan if appropriate", "MDI and spacer salbutamol up to 12 puffs (1200 microg), repeat prn", "GP referral if appropriate");
          if (grade === "moderate") actions.push("Follow the patient's asthma management plan if appropriate",
            "MDI and spacer (preferred): salbutamol 12 puffs, repeat every 20 min or earlier prn (max 3 doses), with ipratropium 8 puffs (168 microg). Or neb salbutamol 5 mg and ipratropium 500 microg",
            "If tolerated, oral prednisolone 50 mg if no doses in the past 24 hrs",
            "Escalate to the severe pathway if no improvement");
          if (grade === "severe") {
            actions.push("High-flow oxygen");
            if (!icp) actions.push("Request early clinical support");
            actions.push("Neb salbutamol 15 mg and ipratropium 500 microg. Repeat salbutamol prn, ipratropium every 20 min (max 3 doses)");
            if (icp) actions.push("Oral prednisolone 50 mg, or IV hydrocortisone 250 mg, if no doses in the past 24 hrs",
              "IV saline 250 mL aliquots up to 20 mL/kg",
              "IV magnesium 10 mmol over 20 min (syringe driver, or 100 mL saline bag at just under 2 drops/sec)");
            else actions.push("If tolerated, oral prednisolone 50 mg if no doses in the past 24 hrs");
            actions.push("Treat as life-threatening if no improvement or she deteriorates", "Transport and notify the receiving facility");
          }
          if (grade === "life") {
            actions.push("High-flow oxygen");
            if (!icp) actions.push("Request early clinical support");
            actions.push("Continuous neb salbutamol. If IPPV is needed: inline nebulisation, small tidal volumes, slow rates to let the chest deflate",
              "Neb ipratropium 500 microg every 20 min (max 3 doses)");
            if (icp) actions.push("IV/IO magnesium 10 mmol over 20 min if not already given. Consult if considering a repeat",
              "IV/IO saline 250 mL aliquots up to 20 mL/kg, stop if signs of fluid overload",
              "IV/IO hydrocortisone 250 mg if not already given",
              "Consider adrenaline: IM 10 microg/kg (max 500 microg) every 5 min prn, or an IV/IO infusion");
            else actions.push("Consider IM adrenaline 500 microg, repeat every 5 min prn",
              "Consider IV saline 250 mL aliquots up to 20 mL/kg, stop if signs of fluid overload. Consult if more than 20 mL/kg");
            actions.push("Priority transport and notify the receiving facility");
          }

          if (v.copd) {
            alerts.push("COPD guideline: titrate oxygen to SpO2 88 to 92%, and limit oxygen-driven nebs to 6 minutes where possible. She's at risk of hypercapnic respiratory failure, but 88 to 92% must be kept up even if it causes hypercapnia");
            if (grade === "severe" || grade === "life") alerts.push("The asthma pathway says high-flow oxygen. The guidelines differ and neither says which wins: say what you're doing and why, and consult if unsure (DSY)");
            if (grade === "life") alerts.push("COPD guideline: no evidence for adrenaline, and it may be harmful");
            if (v.bd) actions = actions.concat(cpapStep.map(function (a) { return "COPD: " + a; }));
          } else if (grade === "severe" || grade === "life") {
            actions.push("CPAP isn't in the asthma guideline. For other severe respiratory distress, CPPRO-014 says contact the EOC Clinician and discuss with a SAAS Medical Officer");
          }

          var head = { mild: "Mild asthma", moderate: "Moderate asthma", severe: "Severe asthma", life: "Life-threatening asthma" }[grade];
          if (v.copd) head += " in a patient with COPD";
          return { tone: grade === "life" || grade === "severe" ? "bad" : grade === "moderate" ? "warn" : "good", headline: head, why: why, alerts: alerts, actions: actions,
            note: "Doses from CPG-113, CPG-115 and the SAAS Clinical app. If signs suggest allergy or anaphylaxis, use the anaphylaxis guideline instead." };
        },
        disclaimer: "Training aid only. Use the current guidelines, the SAAS Clinical app and the EOC Clinician for real patients.",
        scenariosNote: "Scenario 1 is the real job. The others were written for training by DSY from the guideline criteria. Decide before pressing the button.",
        scenarios: [
          { title: "The job", text: "67, COPD on home oxygen. Dry wheeze, can't finish a sentence, RR 40, GCS 15, pink. SpO2 85% on her concentrator, not improving with nebs. ICP on scene.", values: acValues({ talk: "words", wob: true, spo2: 85, on: "oxygen", copd: true, bd: true, icp: "icp" }) },
          { title: "Sports night", text: "24, known asthmatic, wheezy after netball. Talking in sentences, SpO2 97% in air.", values: acValues({ talk: "sentences", spo2: 97, on: "air", icp: "p" }) },
          { title: "Cold change", text: "41, asthmatic. Talking in phrases, no distress, SpO2 95% in air.", values: acValues({ talk: "phrases", spo2: 95, on: "air", icp: "p" }) },
          { title: "Chest infection", text: "72, ex-smoker, COPD. Three days of cough and sputum. Phrases, working hard to breathe, SpO2 86% on 2 L nasal oxygen after two nebs. Paramedic crew.", values: acValues({ asthma: false, talk: "phrases", wob: true, spo2: 86, on: "oxygen", copd: true, bd: true, icp: "p" }) },
          { title: "Quiet chest", text: "33, asthmatic, drowsy and barely moving air. SpO2 88% in air. ICP on scene.", values: acValues({ talk: "unable", lt: true, spo2: 88, on: "air", icp: "icp" }) },
          { title: "Not yet", text: "70, COPD and asthma. Words only, breathless, SpO2 91% on nasal oxygen. You've just started the first neb. ICP on scene.", values: acValues({ talk: "words", wob: true, spo2: 91, on: "oxygen", copd: true, bd: false, icp: "icp" }) }
        ]
      } }
    ] },

    { title: "Doses", collapsed: true, blocks: [
      { table: { title: "Adult doses (SAAS Clinical app, CPG-113, CPG-115)", table: { head: ["Medicine", "Dose", "Scope"], rows: [
        ["Salbutamol MDI", "Up to 12 puffs (1200 microg), 4 breaths per puff. Repeat every 20 min up to 3 doses. MDI preferred in COPD", "P, ICP"],
        ["Salbutamol neb", "Moderate asthma and COPD: 5 mg. Severe asthma: 15 mg. Life-threatening: continuous. COPD with CPAP: 15 mg inline", "P, ICP"],
        ["Ipratropium", "MDI 8 puffs (168 microg), or neb 500 microg. Repeat every 20 min up to 3 doses in severe cases", "P, ICP"],
        ["Prednisolone", "50 mg oral, if tolerated and none in the past 24 hrs", "P, ICP"],
        ["Hydrocortisone", "250 mg IV/IO (or IM), single dose, if no steroids in the past 24 hrs. Reconstitute the Act-O-Vial", "ICP"],
        ["Magnesium sulphate", "10 mmol over 20 min. Driver: 10 mmol (5 mL) made up to 50 mL with saline at 150 mL/hr. Bag: 10 mmol in 100 mL saline at just under 2 drops/sec. Slow it if adverse effects. Repeat: consult", "ICP, asthma only"],
        ["Adrenaline (life-threatening asthma)", "IM 10 microg/kg, max 500 microg, every 5 min prn. ICP: infusion from 5 microg/min by driver, consult if over 50 microg/min. App note: ICPs prefer a magnesium infusion over adrenaline if appropriate", "P, ICP"]
      ] } } },
      { links: [
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "For severe asthma, how many of the severe signs does the patient need?", options: ["Any one", "At least two", "All of them"], answer: 0,
        why: "CTL-049: for severe or life-threatening asthma, patients only need to show any one of the signs." },
      { q: "Which finding on its own makes asthma life-threatening?", options: ["RR 30", "SpO2 under 90%", "Loud wheeze"], answer: 1,
        why: "CTL-049: drowsy, collapsed, exhausted, cyanosed, poor respiratory effort or SpO2 under 90% each make it life-threatening. Wheeze is a poor predictor of severity." },
      { q: "What SpO2 does the COPD guideline aim for?", options: ["Over 94%", "88 to 92%", "Over 85%"], answer: 1,
        why: "CPG-115: titrate nasal oxygen to SpO2 88 to 92%. Adequate oxygenation must be kept up even if it leads to hypercapnia." },
      { q: "Which ICP treatment is in the asthma guideline but not the COPD guideline?", options: ["Hydrocortisone", "Magnesium", "Ipratropium"], answer: 1,
        why: "IV magnesium 10 mmol is in CPG-113-ICP for severe to life-threatening asthma. CPG-115-ICP doesn't list it. Hydrocortisone and ipratropium are in both." },
      { q: "Which treatment is in the COPD guideline but not the asthma guideline?", options: ["CPAP", "Prednisolone", "Salbutamol"], answer: 0,
        why: "CPG-115-ICP lists CPAP at 5 cm H2O. CPG-113 doesn't mention CPAP, and CPPRO-014 lists COPD but not asthma." },
      { q: "What does the COPD guideline say about adrenaline?", options: ["Give IM 500 microg early", "No evidence for it, and it may be harmful", "Only by infusion"], answer: 1,
        why: "CPG-115: there is no evidence to support adrenaline for an exacerbation of COPD, and it may be harmful." },
      { q: "IV magnesium for severe asthma is given over:", options: ["2 minutes", "At least 20 minutes", "1 hour"], answer: 1,
        why: "CPG-113-ICP: magnesium (single dose only) must be infused over at least 20 minutes to avoid hypotension, flushing and sweating." },
      { q: "By syringe driver, 10 mmol of magnesium made up to 50 mL runs at:", options: ["50 mL/hr", "150 mL/hr", "300 mL/hr"], answer: 1,
        why: "SAAS Clinical app: 10 mmol diluted to 50 mL with saline, infused over 20 minutes at 150 mL/hr. Slow it if adverse effects." },
      { q: "What CPAP pressure does the COPD guideline use, and what oxygen flow gives it?", options: ["5 cm H2O, 8 L/min", "10 cm H2O, 12 L/min", "25 cm H2O, 25 L/min"], answer: 0,
        why: "CPG-115-ICP: CPAP at 5 cm H2O. CPPRO-014: 8 L/min is about 5 cm H2O (COPD). 12 L/min is about 10 cm H2O for ACPO, pneumonia and immersion." },
      { q: "On CPAP, when must it come off?", options: ["Systolic BP under 100 mmHg", "Heart rate over 100", "SpO2 over 92%"], answer: 0,
        why: "CPPRO-014: remove CPAP if the systolic BP falls below 100 mmHg, and treat the hypotension under the guideline for the patient's condition." },
      { q: "With CPAP in COPD, how are the nebs given?", options: ["Stop them", "Inline, salbutamol 15 mg and ipratropium 500 microg", "Mask off for each neb"], answer: 1,
        why: "CPG-115-ICP: salbutamol 15 mg and ipratropium 500 microg via inline nebulisation with concomitant CPAP." },
      { q: "A paramedic crew has a COPD patient whose nebs aren't working and SpO2 is 85%. What does CPG-115-P say?", options: ["Start CPAP", "Request clinical support for CPAP, rapid transport and notify", "Give IM adrenaline"], answer: 1,
        why: "CPG-115-P: if bronchodilators are ineffective and SpO2 88 to 92% can't be achieved, request clinical support (for CPAP). Inline nebulisation may be appropriate. Rapid transport and notify." }
    ] } }] },

    { title: "Practical: the overlap patient", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs or threes, at the station, in your own time. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["An o_two CPAP device with head harness and size 4 and 5 masks (training stock)", "An oxygen cylinder and flow meter", "A neb mask and a blank PCR or notepad"] } },
      { steps: [
        { t: "The story", text: "One person reads out the job from \"The job\" section. The others grade the asthma out loud using the table." },
        { t: "Which guideline?", text: "For each treatment, say which guideline it comes from and what the other guideline says." },
        { t: "Set up CPAP", text: "Assemble the o_two device, set 8 L/min, and fit it to a partner. Check for leaks." },
        { t: "Run it", text: "Say what you'd watch on CPAP and when you'd take it off. Then hand over to the \"ED\" in under a minute." }
      ] },
      { box: { title: "What good looks like", items: ["Grades from one sign, not a count", "Names magnesium as asthma only and CPAP as COPD only", "Says out loud the oxygen and adrenaline differences", "8 L/min, size checked, harness on the crown", "Hands over the magnesium amount and CPAP start time"] } },
      { note: "Suggested activity written for training by DSY. Check it with your lead instructor." }
    ] },

    { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "The Resus Room is a UK emergency medicine podcast. Two of its \"Roadside to Resus\" episodes cover these conditions from pre-hospital to the ED: COPD (January 2023, about 68 minutes) and Asthma (August 2017, part 1 about 30 minutes, part 2 about 24 minutes). Optional listening. They reflect UK practice: where they differ from the SAAS guidelines, follow SAAS." },
      { links: [
        { label: "COPD; Roadside to Resus", href: "https://theresusroom.libsyn.com/copd-roadside-to-resus" },
        { label: "Asthma; Roadside to Resus part 1", href: "https://theresusroom.libsyn.com/asthma-roadside-to-resus" },
        { label: "Asthma; Roadside to Resus part 2", href: "https://theresusroom.libsyn.com/asthma-roadside-to-resus-part-2" }
      ] }
    ] }
  ]
};
