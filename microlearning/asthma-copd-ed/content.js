/* Asthma or COPD? in the rural ED - rural nursing microlearning. Content only: the layout lives in ../shared/module.js;
   navy theme from ../shared/theme-navy.css.
   Sources (accessed 25 October 2026):
   - National Asthma Council Australia. Australian Asthma Handbook v3.0 (2025): "Managing acute asthma in adults and
     adolescents in the ED" (which quotes the TSANZ position statement on acute oxygen use in adults, 2022) and
     "Asthma and COPD".
   - CARPA Standard Treatment Manual, 8th edition (Remote Primary Health Care Manuals, (c) 2022/2026, PDF V1.03):
     "Asthma in adults" (pp 421-424) and "COPD and bronchiectasis in adults" (pp 441-443).
   - COPD-X Plan v2.78 (December 2025), "X: Manage eXacerbations", key recommendations.
   The NSW ECAT protocols A2.2 and A2.4 could not be read (the ACI site blocks automated access), so nothing here is
   from ECAT. Where the documents differ, the page says so: it does not choose. Staff follow their own health
   service's policy, standing orders and scope of practice. */
var AE_TALK = [
  { value: "sentence", label: "Finishes a sentence" },
  { value: "words", label: "A few words only" },
  { value: "cannot", label: "Cannot speak" }
];
function aeValues(v) {                  // a scenario's answers: every yes/no question "no" unless given
  var o = { lt: false, distress: false, hyper: false, spo2: null, rr: null, hr: null };
  for (var k in v) o[k] = v[k];
  return o;
}

var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  logo: "dsy-logo-navy.png",
  title: "Asthma or COPD? In the rural ED",
  subtitle: "Rural nursing microlearning",
  headline: "Severe wheeze in a patient with COPD: grade it, get the oxygen right, and escalate early",
  lead: "A patient with COPD on home oxygen arrives with a severe asthma attack. This module covers the first hour in a rural ED from the national asthma guideline, the CARPA manual and COPD-X: grading, the oxygen target, bronchodilators, steroids, magnesium, and when to escalate.",
  minutes: 25,
  disclaimer: "Training resource only. It does not replace the Australian Asthma Handbook, the CARPA manual, COPD-X, your health service's policy and standing orders, or advice from the medical officer.",

  protocol: {
    code: "AAH v3.0", name: "Australian Asthma Handbook: Managing acute asthma in adults and adolescents in the ED", version: "Version 3.0 (2025)", exported: "25 October 2026",
    also: [
      { code: "CARPA STM", name: "CARPA Standard Treatment Manual: Asthma in adults; COPD and bronchiectasis in adults", version: "8th edition (2022/2026, V1.03)" },
      { code: "COPD-X", name: "COPD-X Plan: Manage eXacerbations", version: "v2.78 (December 2025)" }
    ]
  },
  relatedCodes: ["CPG-113-P"],
  footerNotes: [
    "These are national (Asthma Handbook, COPD-X) and remote-practice (CARPA) guidelines. Follow your own health service's policy, standing orders, scope of practice and escalation process.",
    "The NSW ECAT protocols (A2.2 asthma, A2.4 COPD) were not available for this module.",
    "The scenarios, practical and the notes marked \"DSY\" were written for training and should be checked by your lead instructor."
  ],

  session: {
    intro: "For a team-led session. Allow about 30 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the intro video", time: "3 min", text: "Then read the introduction. Who on your shift would take the ambulance handover?" },
      { t: "Grade it", time: "5 min", text: "Read the severity table. Which single finding makes it life-threatening?" },
      { t: "The oxygen target", time: "5 min", text: "Why 88 to 92% for this patient? How would you give a neb without over-oxygenating her?" },
      { t: "The first hour", time: "5 min", text: "Swipe through the steps. Who does what at your site, and who do you call?" },
      { t: "Checker and quiz", time: "10 min", text: "Work the checker scenarios, deciding before you press the button. Then everyone does the quiz alone." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Asthma or COPD? In the rural ED" } },
      { text: "Asthma and COPD often occur together. Among people with COPD, about 27 to 28% also have asthma. People with both have more frequent and more severe flare-ups and hospital admissions than people with either alone (Asthma Handbook)." },
      { text: "CARPA: COPD is common over 40 and often co-exists with asthma, especially with a significant smoking history. Not all wheeze or shortness of breath is asthma: consider chest infection or pneumonia, heart failure and other lung disease." },
      { box: { title: "Three things to take away", tone: "warn", items: [
        "Grade it fast: one severe or life-threatening sign is enough",
        "Asthma with COPD is at risk of CO2 retention: aim for SpO2 88 to 92% and don't over-oxygenate",
        "Severe or life-threatening: call the medical officer now and plan for transfer to higher-level care"
      ] } }
    ] },

    { title: "Grade it", blocks: [
      { text: "Rapidly assess severity by observation and pulse oximetry, while you get the salbutamol (and oxygen, if needed) ready. Don't stop oxygen to check the SpO2 (CARPA)." },
      { table: { title: "Severity in the ED (Asthma Handbook)", table: { head: ["", "Mild to moderate (all of)", "Severe (any of)", "Life-threatening (any of)"], rows: [
        ["Consciousness", "Alert", "", "Unconscious, drowsy, confused or agitated"],
        ["Speech", "Finishes a sentence in one breath", "Only a few words in one breath", "Cannot speak"],
        ["Posture", "Can walk, sit up straight, lie flat", "Can't lie flat; sits hunched forward", "Collapsed or exhausted"],
        ["Breathing", "Distress not severe", "Accessory muscles, subcostal recession, paradoxical chest movement", "Severe distress or poor respiratory effort"],
        ["Skin colour", "Normal", "", "Cyanosis"],
        ["Resp rate", "Under 25", "25 or more", "Bradypnoea (exhaustion)"],
        ["Heart rate", "Under 110", "110 or more", "Arrhythmia, or bradycardia (may come just before arrest)"],
        ["Chest", "Wheeze or normal", "", "Silent chest or reduced air entry"],
        ["SpO2 on room air", "Over 96%", "92 to 96%", "Under 92%, or cyanosis"],
        ["Blood gas (if done)", "Not indicated", "Not indicated", "PaO2 under 60; PaCO2 over 50; normal PaCO2 despite low PaO2; pH under 7.35"]
      ] } } },
      { box: { title: "Watch for", tone: "no", check: { q: "She's speaking a few words at a time, RR 40, GCS 15, pink. SpO2 85% on her home oxygen. What grade?", a: "Life-threatening, on the SpO2 alone: under 92% (and that was on oxygen). A few words and RR 25 or more are severe signs on their own. One sign is enough." }, items: [
        "A quiet chest. Less wheeze can mean she's getting worse, not better",
        "Drowsiness: it may mean CO2 retention, severe hypoxia or shock (CARPA)",
        "A raised PaCO2 means she's tiring and may need ventilatory support",
        "If more than one category fits, record the higher one. Not sure if mild or moderate? Treat as moderate (CARPA)"
      ] } },
      { note: "The Asthma Handbook's immediate treatment table uses room-air SpO2 over 94% (mild to moderate), 94% or less (severe) and under 92% (life-threatening). CARPA's life-threatening cut-off is under 90%. Pulse oximetry may overestimate SpO2 in people with darker skin." }
    ] },

    { title: "The oxygen target", blocks: [
      { text: "This is where asthma and COPD advice used to pull apart. The Asthma Handbook settles it for this patient." },
      { box: { title: "Asthma Handbook (quoting TSANZ 2022)", tone: "warn", check: { q: "She's on oxygen and the SpO2 reads 97%. Good?", a: "No. Asthma with COPD puts her at risk of hypercapnia, so the target is 88 to 92%. The Asthma Handbook says avoid over-oxygenation in adults because it increases the risk of hypercapnoea. Turn it down and watch her conscious state." }, items: [
        "Start oxygen if SpO2 on room air is under 92%",
        "Target 92 to 96% for most adults, but 88 to 92% if at risk of hypercapnoea",
        "At risk includes exacerbations of COPD or asthma, and other chronic respiratory failure: obesity and obesity hypoventilation, bronchiectasis, cystic fibrosis, neuromuscular disease, chest wall deformity",
        "Adults with acute asthma, and those with both asthma and COPD, are at greater risk of hypercapnoeic respiratory failure",
        "Avoid over-oxygenation in adults (SpO2 over 95%)"
      ] } },
      { box: { title: "Giving nebs without over-oxygenating", items: [
        "Asthma Handbook: for intermittent nebs, use an air-driven compressor nebuliser and give oxygen by nasal cannula",
        "If an oxygen-driven neb is needed, use piped oxygen or a cylinder with a high-flow regulator (over 6 L/min), then change back to the original oxygen mask when the neb is finished",
        "Life-threatening asthma: continuous salbutamol neb driven by oxygen, still aiming for the SpO2 target",
        "COPD (CARPA): monitor SpO2 continuously, aim for 88 to 92%, and watch for drowsiness and slowing breathing"
      ] } },
      { table: { title: "The targets side by side", table: { head: ["Guideline", "Asthma", "COPD"], rows: [
        ["Asthma Handbook (TSANZ)", "92 to 96%, or 88 to 92% if at risk of hypercapnoea (including asthma with COPD)", "88 to 92%"],
        ["CARPA", "Start if under 92%, target 93 to 95%, don't over-oxygenate", "88 to 92%"],
        ["COPD-X", "", "88 to 92%, controlled oxygen 0.5 to 2 L/min"]
      ] } } },
      { note: "CARPA doesn't say which target to use when a patient has both. The Asthma Handbook does: 88 to 92%. Nebulisers carry a high risk of spreading infection: wear full PPE and follow your infection control policy." }
    ] },

    { title: "The first hour", blocks: [
      { box: { title: "Life-threatening or severe: in order", tiles: true, steps: [
        { t: "Sit up, oxygen", text: "Sit her up. Oxygen to SpO2 88 to 92% if she has COPD. Continuous SpO2." },
        { t: "Nebs", text: "Life-threatening: salbutamol 2 x 5 mg continuous neb, plus ipratropium 500 microg every 20 min for the first hour." },
        { t: "Call", text: "Urgent medical consult (CARPA). Life-threatening: arrange immediate transfer to higher-level care (Asthma Handbook)." },
        { t: "Steroid", text: "Within 1 hour. Oral prednisolone if she can swallow. IV hydrocortisone if not." },
        { t: "Gas and X-ray", text: "Blood gas in life-threatening asthma or if hypercapnoea suspected. Chest X-ray for pneumothorax, consolidation, heart failure." },
        { t: "Watch", text: "RR, SpO2, pulse every 15 min (CARPA). Response after each neb. Salbutamol toxicity." }
      ] } },
      { box: { title: "Bronchodilators (Asthma Handbook)", items: [
        "Severe: salbutamol 12 puffs (100 microg) by spacer, or a 5 mg neb if she can't use a spacer. Ipratropium 8 puffs (21 microg) every 20 min for the first hour",
        "Life-threatening: salbutamol 2 x 5 mg by continuous neb driven by oxygen, with ipratropium 500 microg added every 20 min for the first hour",
        "Then repeat 4 to 6 hourly. When breathing improves, change to spacer or intermittent nebs",
        "IV salbutamol and oral salbutamol are not recommended",
        "Watch for salbutamol toxicity: worsening tachycardia, metabolic acidosis, low potassium"
      ] } },
      { box: { title: "Steroids", items: [
        "Asthma Handbook: start within 1 hour for all severe and life-threatening asthma. Prednisolone 37.5 to 50 mg oral daily for 5 to 10 days (or dexamethasone 16 mg for 2 days). IV hydrocortisone if she can't take oral, then switch to oral",
        "CARPA (asthma): prednisolone 50 mg oral, or hydrocortisone 100 mg IV every 6 hours if oral isn't possible",
        "CARPA (COPD, severe): medical consult, consider hydrocortisone 100 mg IV every 6 hours. Milder: prednisolone 50 mg daily for 5 days",
        "COPD-X: 30 to 50 mg daily for 5 days, oral when possible"
      ] } },
      { box: { title: "If not improving", tone: "warn", check: { q: "After the first hour she's no better. What does the Asthma Handbook add?", a: "Repeat the bronchodilator, add ipratropium if not already given, and consider IV magnesium sulfate 0.2 mmol/kg (max 10 mmol) as a single infusion over 20 minutes. Not nebulised magnesium." }, items: [
        "IV magnesium sulfate: Asthma Handbook 0.2 mmol/kg, max 10 mmol, single infusion over 20 min. CARPA 10 mmol (2.5 g) over 20 min. A second-line agent, never instead of salbutamol. Nebulised magnesium is not recommended",
        "Adrenaline: Asthma Handbook says not routine; only if she can't inhale bronchodilators, is unresponsive or peri-arrest, or anaphylaxis is suspected. CARPA: IM 0.5 mg if severe or unresponsive",
        "Non-invasive ventilation: COPD-X says NIV improves survival in COPD with acute hypercapnic respiratory failure. Asthma Handbook: on NIV, give salbutamol inline or through the circuit; no sedatives; if no improvement, intubate",
        "Antibiotics for COPD only with signs of infection (fever, sputum change): amoxicillin 1 g bd, or doxycycline 100 mg bd, for 5 days (CARPA, COPD-X)"
      ] } }
    ] },

    { title: "The ambulance handover", blocks: [
      { text: "Before she reaches you, SAAS may already have treated her. Paramedics follow the asthma and COPD guidelines (CPG-113, CPG-115); Intensive Care Paramedics can give more." },
      { box: { title: "Ask what's been given, and when", items: [
        "Nebs: how many, salbutamol dose, ipratropium doses",
        "Steroid: SAAS gives prednisolone 50 mg, or the ICP gives hydrocortisone 250 mg IV as a single dose. Hospital guidelines use other doses (CARPA 100 mg 6 hourly): tell the medical officer what she's had",
        "Magnesium (ICP): 10 mmol over 20 min by syringe driver or bag. How much went in? A part-dose isn't covered by any guideline here: tell the medical officer",
        "CPAP (ICP, COPD only): start time, flow rate (8 L/min = about 5 cm H2O), and her BP",
        "Adrenaline: given or not"
      ] } },
      { note: "SAAS doses are from the SAAS Clinical app and guidelines (exported 31 August 2026). See the paramedic module \"Asthma or COPD?\" for the prehospital side." }
    ] },

    { title: "Severity and oxygen checker", blocks: [
      { tool: {
        title: "Severity and oxygen checker",
        intro: "Enter what you find. The checker grades the asthma (Asthma Handbook ED table) and gives the oxygen target and first-hour actions. It doesn't replace the medical officer.",
        fields: [
          { id: "talk", type: "choice", label: "Speech", options: AE_TALK },
          { id: "lt", type: "yesno", label: "Drowsy, confused, agitated, collapsed, exhausted, cyanosed, poor effort or silent chest?" },
          { id: "distress", type: "yesno", label: "Accessory muscles, recession, can't lie flat or sitting hunched forward?" },
          { id: "rr", type: "number", label: "Respiratory rate", optional: true, placeholder: "blank if not done" },
          { id: "hr", type: "number", label: "Heart rate", optional: true, placeholder: "blank if not done" },
          { id: "spo2", type: "number", label: "SpO2 (%)", optional: true, placeholder: "blank if not known", min: 50 },
          { id: "on", type: "choice", label: "SpO2 measured on", optional: true, options: [{ value: "air", label: "Room air" }, { value: "oxygen", label: "Oxygen" }] },
          { id: "hyper", type: "yesno", label: "At risk of hypercapnoea?", hint: "COPD, asthma with COPD, obesity or obesity hypoventilation, bronchiectasis, cystic fibrosis, neuromuscular disease, chest wall deformity (TSANZ, in the Asthma Handbook)." }
        ],
        evaluate: function (v) {
          var why = [], actions = [], alerts = [], s = v.spo2, onO2 = v.on === "oxygen";
          var lt = v.lt || v.talk === "cannot" || (s !== null && s < 92);
          var sev = !lt && (v.talk === "words" || v.distress || (v.rr !== null && v.rr >= 25) || (v.hr !== null && v.hr >= 110) || (s !== null && s <= 96));
          if (v.lt) why.push("Altered conscious state, exhaustion, cyanosis, poor effort or silent chest: life-threatening");
          if (v.talk === "cannot") why.push("Cannot speak: life-threatening");
          if (s !== null && s < 92) why.push("SpO2 " + s + "% (under 92%): life-threatening" + (onO2 ? ". Taken on oxygen: on room air it would be the same or lower (DSY)" : ""));
          if (!lt) {
            if (v.talk === "words") why.push("Only a few words in one breath: severe");
            if (v.distress) why.push("Accessory muscles, recession or can't lie flat: severe");
            if (v.rr !== null && v.rr >= 25) why.push("RR " + v.rr + " (25 or more): severe");
            if (v.hr !== null && v.hr >= 110) why.push("HR " + v.hr + " (110 or more): severe");
            if (s !== null && s >= 92 && s <= 96) why.push("SpO2 " + s + "% (92 to 96%): severe" + (onO2 ? ". Taken on oxygen: on room air it would be the same or lower (DSY)" : ""));
            if (!sev) why.push("No severe or life-threatening sign: mild to moderate");
          }
          if (s !== null && s > 96 && onO2) why.push("SpO2 " + s + "% on oxygen: the table uses room air, so this reading doesn't grade her");

          var target = v.hyper ? "88 to 92%" : "92 to 96%";
          if (v.hyper) alerts.push("At risk of hypercapnoea: target SpO2 88 to 92%. Avoid over-oxygenation. Use an air-driven neb with nasal cannula oxygen for intermittent nebs");
          if (v.hyper && onO2 && s !== null && s > 92) alerts.push("SpO2 " + s + "% on oxygen is above her target: turn the oxygen down and watch her conscious state");

          if (lt) {
            actions.push("Sit her up. Oxygen to SpO2 " + target + ", continuous monitoring",
              "Salbutamol 2 x 5 mg by continuous neb driven by oxygen, with ipratropium 500 microg every 20 min for the first hour",
              "Urgent medical consult, and arrange immediate transfer to higher-level care",
              "Systemic steroid within 1 hour: prednisolone oral, or IV hydrocortisone if she can't take oral",
              "Blood gas and chest X-ray. RR, SpO2 and pulse every 15 min",
              "Not improving: IV magnesium sulfate 0.2 mmol/kg (max 10 mmol) over 20 min. Adrenaline only if she can't inhale, is peri-arrest, or anaphylaxis (Asthma Handbook)");
          } else if (sev) {
            actions.push("Oxygen if SpO2 on room air is under 92%, to target " + target,
              "Salbutamol 12 puffs by spacer (or 5 mg neb if she can't use a spacer), and ipratropium 8 puffs, every 20 min for the first hour",
              "Medical consult (CARPA). Prednisolone within 1 hour",
              "Reassess after each dose. Not improving: repeat, and consider IV magnesium sulfate; treat as life-threatening if she deteriorates");
          } else {
            actions.push("Salbutamol 4 to 12 puffs by spacer, repeat every 20 min for the first hour if needed",
              "Oxygen only if SpO2 on room air is under 92%, to target " + target,
              "Consider a steroid case by case. Observe at least 4 hours after symptoms settle before discharge (Asthma Handbook)");
          }
          if (v.hyper) actions.push("COPD: consult if she needs more than 4 L/min by nasal cannula or a 28% venturi mask, is getting sleepy, uses home oxygen, or has had ICU, NIV or intubation before (CARPA)");

          var head = lt ? "Life-threatening" : sev ? "Severe" : "Mild to moderate";
          return { tone: lt || sev ? "bad" : "warn", headline: head + ": target SpO2 " + target, why: why, alerts: alerts, actions: actions,
            note: "Doses from the Asthma Handbook ED guideline and CARPA. Follow your health service's standing orders and the medical officer." };
        },
        disclaimer: "Training aid only. Use the current guidelines, your health service's policy and the medical officer for real patients.",
        scenariosNote: "Written for training by DSY from the guideline criteria. Decide before pressing the button.",
        scenarios: [
          { title: "Off the ambulance", text: "67, COPD on home oxygen. A few words at a time, RR 40, HR 84, alert, pink. SpO2 85% on oxygen.", values: aeValues({ talk: "words", rr: 40, hr: 84, spo2: 85, on: "oxygen", hyper: true }) },
          { title: "Too much oxygen", text: "Same patient an hour later. Speaking in sentences now, RR 24, HR 100. SpO2 98% on 6 L by mask.", values: aeValues({ talk: "sentence", rr: 24, hr: 100, spo2: 98, on: "oxygen", hyper: true }) },
          { title: "Walk-in", text: "28, asthmatic, wheezy after a cold. Finishes sentences, RR 22, HR 98, SpO2 97% on room air.", values: aeValues({ talk: "sentence", rr: 22, hr: 98, spo2: 97, on: "air" }) },
          { title: "Hunched forward", text: "45, asthmatic. A few words at a time, hunched forward, RR 30, HR 118, SpO2 93% on room air.", values: aeValues({ talk: "words", distress: true, rr: 30, hr: 118, spo2: 93, on: "air" }) },
          { title: "Quiet chest", text: "58, ex-smoker with asthma and COPD. Drowsy, barely moving air, RR 10. SpO2 89% on room air.", values: aeValues({ talk: "cannot", lt: true, rr: 10, spo2: 89, on: "air", hyper: true }) }
        ]
      } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { table: { title: "Doses (adult)", table: { head: ["Medicine", "Asthma Handbook (ED)", "CARPA"], rows: [
        ["Salbutamol", "Severe: 12 puffs by spacer, or 5 mg neb. Life-threatening: 2 x 5 mg continuous neb", "5 mg neb as needed (severe). 4 to 12 puffs by spacer (moderate)"],
        ["Ipratropium", "8 puffs (21 microg) or 500 microg neb every 20 min for the first hour, then 4 to 6 hourly", "500 microg neb as needed, can mix with salbutamol"],
        ["Prednisolone", "37.5 to 50 mg daily for 5 to 10 days (or dexamethasone 16 mg for 2 days)", "50 mg, then daily for 5 days"],
        ["Hydrocortisone IV", "If oral not possible; switch to oral when possible", "100 mg every 6 hours"],
        ["Magnesium sulfate IV", "0.2 mmol/kg, max 10 mmol, over 20 min, single dose", "10 mmol (2.5 g) over 20 min, single dose"],
        ["Adrenaline", "Not routine. Can't inhale, peri-arrest or anaphylaxis", "IM 0.5 mg if severe or unresponsive"]
      ] } } },
      { table: { title: "Before discharge (Asthma Handbook)", items: [
        "Observe at least 4 hours after distress settles; repeat spirometry",
        "Consider admission: hypoxia on arrival, still distressed or can't lie flat 1 to 2 hours after arrival, past ICU admission for asthma, a presentation in the past 4 weeks, frequent presentations, high recent reliever use, can't be monitored at home or get back easily",
        "Discharge with an inhaled corticosteroid, the rest of the oral steroid course, and an interim asthma action plan. GP review within 3 days",
        "Asthma with COPD: an inhaled steroid is needed (CARPA, Asthma Handbook). Asthma guidelines recommend against a LABA without an inhaled steroid (Asthma Handbook)"
      ] } },
      { links: [
        { label: "Asthma Handbook: acute asthma in the ED", href: "https://www.asthmahandbook.org.au/acute-asthma/adults-and-adolescents/managing-acute-asthma-in-adults-and-adolescents-in-the-ed" },
        { label: "Asthma Handbook: asthma and COPD", href: "https://www.asthmahandbook.org.au/clinical-topics/asthma-and-copd" },
        { label: "CARPA Standard Treatment Manual (RPHCM)", href: "https://remotephcmanuals.com.au/" },
        { label: "COPD-X: Manage eXacerbations", href: "https://copdx.org.au/copd-x-plan/x-manage-exacerbations/" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "How many life-threatening signs does she need to be graded life-threatening?", options: ["Any one", "Two", "Three"], answer: 0,
        why: "Asthma Handbook ED table: life-threatening is any of the listed signs. CARPA: if she fits more than one category, record the higher one." },
      { q: "In the ED table, which SpO2 on room air is life-threatening?", options: ["Under 96%", "Under 92%", "Under 85%"], answer: 1,
        why: "Asthma Handbook: SpO2 under 92% on room air, or cyanosis, is life-threatening. CARPA's cut-off is under 90%." },
      { q: "What SpO2 target does the Asthma Handbook give for a patient with asthma and COPD?", options: ["92 to 96%", "88 to 92%", "Over 96%"], answer: 1,
        why: "Asthma Handbook (TSANZ): 88 to 92% if at risk of hypercapnoea. Adults with both asthma and COPD are at greater risk of hypercapnoeic respiratory failure." },
      { q: "She's on oxygen with an SpO2 of 98%. What's the concern?", options: ["None, that's ideal", "Over-oxygenation, which increases the risk of hypercapnoea", "She needs more oxygen"], answer: 1,
        why: "Asthma Handbook: in adults, avoid over-oxygenation (SpO2 over 95%) because it increases the risk of hypercapnoea." },
      { q: "How does the Asthma Handbook suggest giving intermittent nebs to a patient on oxygen?", options: ["Oxygen-driven neb at 15 L/min", "Air-driven compressor neb, with oxygen by nasal cannula", "Stop the oxygen during the neb"], answer: 1,
        why: "Asthma Handbook: use an air-driven compressor nebuliser and give oxygen by nasal cannula, titrated to the target." },
      { q: "Life-threatening asthma: how is salbutamol given?", options: ["12 puffs by spacer", "2 x 5 mg by continuous neb driven by oxygen", "IV infusion"], answer: 1,
        why: "Asthma Handbook: salbutamol 2 x 5 mg by continuous nebulisation driven by oxygen, with ipratropium 500 microg every 20 min for the first hour. IV salbutamol is not recommended." },
      { q: "When should the systemic steroid start?", options: ["Within 1 hour of presentation", "After the first 4 hours", "Only on admission"], answer: 0,
        why: "Asthma Handbook: start systemic corticosteroids within 1 hour of presentation. They're indicated for all severe and life-threatening asthma." },
      { q: "What's the IV magnesium sulfate dose in the Asthma Handbook?", options: ["2 g IV push", "0.2 mmol/kg, max 10 mmol, over 20 min", "10 mmol nebulised"], answer: 1,
        why: "Asthma Handbook: 0.2 mmol/kg (maximum 10 mmol) as a single IV infusion over 20 minutes. Nebulised magnesium is not recommended." },
      { q: "When does the Asthma Handbook say adrenaline is used?", options: ["First line in severe asthma", "When she can't inhale bronchodilators, is peri-arrest, or anaphylaxis is suspected", "Whenever magnesium has been given"], answer: 1,
        why: "Asthma Handbook: adrenaline is not used routinely. Don't use it instead of salbutamol as the first bronchodilator." },
      { q: "Which of these signs of salbutamol toxicity should you watch for?", options: ["Low potassium", "High sodium", "Low heart rate"], answer: 0,
        why: "Asthma Handbook: monitor for salbutamol toxicity, for example worsening tachycardia, metabolic acidosis and hypokalaemia." },
      { q: "A COPD patient is getting sleepy on oxygen. What might it mean?", options: ["She's settling", "CO2 retention", "The salbutamol is working"], answer: 1,
        why: "CARPA: drowsiness may indicate CO2 retention (slowing of breathing). A raised PaCO2 means she's tiring and may need ventilatory support (Asthma Handbook)." },
      { q: "Which is a CARPA trigger to consult for a COPD flare-up?", options: ["She uses home oxygen", "SpO2 90%", "She has a productive cough"], answer: 0,
        why: "CARPA: consult if she uses home oxygen, needs more than 4 L/min by nasal cannula or a 28% venturi mask, is becoming sleepy, or has had ICU, NIV or intubation before." }
    ] } }] },

    { title: "Practical: set up for the overlap patient", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs, in the ED, in your own time. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["An air-driven compressor nebuliser (if your ED has one) and a neb mask", "Nasal cannulae, an oxygen flow meter, a pulse oximeter", "A spacer and a salbutamol puffer (training stock)"] } },
      { steps: [
        { t: "Handover", text: "One person gives the ambulance handover from \"The ambulance handover\" section. The other asks what's been given, and when." },
        { t: "Grade", text: "Grade her out loud with the severity table." },
        { t: "Oxygen", text: "Set up nasal cannula oxygen and an air-driven neb, or an oxygen-driven neb at over 6 L/min. Say her target and when you'd turn the oxygen down." },
        { t: "Escalate", text: "Make the call to the medical officer: who she is, what she's had, her grade, and what you need." }
      ] },
      { box: { title: "What good looks like", items: ["Grades from one sign", "Says 88 to 92% and why", "Doesn't leave her on high-flow oxygen after the neb", "Asks about the prehospital hydrocortisone and magnesium", "Calls early for a life-threatening grade"] } },
      { note: "Suggested activity written for training by DSY. Check it with your lead instructor." }
    ] },

    { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "The Resus Room is a UK emergency medicine podcast. Its \"Roadside to Resus\" episodes cover COPD (January 2023, about 68 minutes) and asthma (August 2017, part 1 about 30 minutes, part 2 about 24 minutes). Optional listening. They reflect UK practice: where they differ from the Australian guidelines, follow the Australian ones." },
      { links: [
        { label: "COPD; Roadside to Resus", href: "https://theresusroom.libsyn.com/copd-roadside-to-resus" },
        { label: "Asthma; Roadside to Resus part 1", href: "https://theresusroom.libsyn.com/asthma-roadside-to-resus" },
        { label: "Asthma; Roadside to Resus part 2", href: "https://theresusroom.libsyn.com/asthma-roadside-to-resus-part-2" }
      ] }
    ] }
  ]
};
