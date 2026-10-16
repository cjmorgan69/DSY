/* Nausea and Vomiting - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Source: SAAS CPP-047-AO Nausea and Vomiting - AO v2.3 (4 June 2025), exported 31.08.2026. The 4 mg ODT presentation
   and "single dose" for children come from the SAAS Clinical app's medicine data. Nothing clinical here goes beyond
   those documents. */
var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Nausea and vomiting",
  subtitle: "Ambulance Officer microlearning",
  headline: "Ondansetron: who gets it, who doesn't, and when to call",
  lead: "Nausea and vomiting can point to significant illness, and controlling it helps comfort and safe transport. This module covers the AO protocol: when to consider ondansetron, the contraindications and precautions, doses by age, giving an ODT, and when to consult the EOC Clinician.",
  minutes: 15,

  protocol: { code: "CPP-047-AO", name: "Nausea and Vomiting - AO", version: "v2.3 (4 June 2025)", exported: "31 August 2026" },
  footerNotes: ["v2.3 removed the need to consult before the first dose of ondansetron. A further dose (adults only) still needs the EOC Clinician."],

  session: {
    intro: "For a team-led session. Allow about 20 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Read the introduction", time: "2 min", text: "Read the principle aloud: when ondansetron helps and when it doesn't." },
      { t: "The protocol", time: "5 min", text: "Take turns reading a box. Check everyone can name the two contraindications and the three precautions." },
      { t: "Ondansetron checker", time: "5 min", text: "Work the scenarios. Decide before pressing the button." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "3 min", text: "Pairs practise the dry-hands ODT technique with a placebo or sweet." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "", title: "Nausea and vomiting: what AOs need to know" } },
      { text: "Nausea and vomiting can indicate significant underlying illness. Controlling it may help the patient's comfort and make transport safer." },
      { text: "Ondansetron as an orally disintegrating tablet (ODT) is safe and convenient, especially for children and when the oral route is preferred. It isn't effective for preventing motion sickness, and it isn't given where gastric emptying is beneficial to the patient." },
      { text: "It may be given for uncontrolled nausea and vomiting, or before transport in patients with head, spine or eye trauma, where vomiting carries a high risk of complications." }
    ] },

    { title: "The protocol", blocks: [
      { box: { title: "Patients 2 years and over", steps: [
        { t: "Universal care" },
        { t: "Consider an antiemetic", text: "For uncontrolled nausea and vomiting, and/or to make transport safe." },
        { t: "Check contraindications and precautions", text: "See below. Confirm the precautions with the patient before giving it." },
        { t: "Give ondansetron", text: "Adults 4 mg. 6 to under 16: 4 mg. 2 to under 6: 2 mg. Single dose." },
        { t: "Still nauseated or vomiting, or more than one precaution?", text: "Consult the EOC Clinician, who may advise a further 4 mg ODT for adults only, and discuss further treatment and transport." },
        { t: "Provide transport for further care" }
      ] } },
      { box: { title: "Contraindications: don't give it", tone: "no", check: { q: "A man with Parkinson's disease takes apomorphine and is vomiting. Ondansetron?", a: "No. Taking apomorphine in the setting of Parkinson's is a contraindication (CPP-047-AO)." }, items: [
        "Known allergy or hypersensitivity to ondansetron or any component of the formulation",
        "Taking apomorphine in the setting of Parkinson's disease"
      ] } },
      { box: { title: "Precautions: confirm with the patient first", tone: "warn", items: [
        "Known or congenital prolonged QT syndrome",
        "History of irregular heart conditions (AF) or heart failure",
        "Known metabolic derangements, particularly low magnesium or potassium",
        "More than one precaution: consult the EOC Clinician",
        "Use with caution after a previous dystonic reaction to any drug, or with Parkinson's disease"
      ] } }
    ] },

    { title: "Ondansetron checker", blocks: [
      { tool: {
        title: "Ondansetron checker",
        intro: "Answer the questions to see what CPP-047-AO says, with the dose for the age.",
        check: { q: "A 4 year old is vomiting repeatedly before a long transport, no contraindications or precautions. Dose?", a: "Ondansetron 2 mg ODT, single dose (2 to under 6 years)." },
        fields: [
          { id: "age", type: "choice", label: "Age", options: [
            { value: "u2", label: "Under 2" }, { value: "2to6", label: "2 to under 6" }, { value: "6to16", label: "6 to under 16" }, { value: "adult", label: "16 and over" }] },
          { id: "need", type: "yesno", label: "Uncontrolled nausea and vomiting, and/or needed for safe transport?" },
          { id: "empty", type: "yesno", label: "Would gastric emptying (vomiting) be beneficial to this patient?" },
          { id: "allergy", type: "yesno", label: "Allergy or hypersensitivity to ondansetron or the formulation?" },
          { id: "apo", type: "yesno", label: "Taking apomorphine for Parkinson's disease?" },
          { id: "qt", type: "yesno", label: "Prolonged QT syndrome?" },
          { id: "heart", type: "yesno", label: "AF or other irregular heart condition, or heart failure?" },
          { id: "lytes", type: "yesno", label: "Known low magnesium or potassium (or other metabolic derangement)?" },
          { id: "given", type: "yesno", label: "Ondansetron already given this job?" }
        ],
        evaluate: function (v) {
          var tx = "Provide transport for further care";
          if (v.age === "u2") return { tone: "warn", headline: "Under 2: outside this protocol", why: ["CPP-047-AO is a protocol for patients 2 years and over"], actions: ["Universal care", "Consult the EOC Clinician", tx] };
          if (v.allergy || v.apo) return { tone: "no", headline: "Contraindicated: no ondansetron",
            why: [v.allergy ? "Known allergy or hypersensitivity to ondansetron or the formulation" : "Taking apomorphine in the setting of Parkinson's disease"], actions: ["Universal care", "Consult the EOC Clinician to discuss further treatment and transport", tx] };
          if (v.empty) return { tone: "no", headline: "Not where gastric emptying helps", why: ["Ondansetron is not to be administered where gastric emptying is beneficial to the patient (CPP-047-AO)"], actions: ["Universal care", tx] };
          if (!v.need) return { tone: "", headline: "Not indicated now", why: ["Consider an antiemetic for uncontrolled nausea and vomiting and/or to facilitate safe transport"], actions: ["Universal care; reassess", tx] };
          var prec = [v.qt && "prolonged QT", v.heart && "AF/irregular heart or heart failure", v.lytes && "low magnesium or potassium"].filter(Boolean);
          if (prec.length > 1) return { tone: "warn", headline: "More than one precaution: consult", why: ["Precautions: " + prec.join(", ")],
            actions: ["Consult the EOC Clinician before giving ondansetron", "Discuss further treatment and/or transport options", tx] };
          if (v.given) {
            if (v.age !== "adult") return { tone: "warn", headline: "Children: single dose only", why: ["Ondansetron is a single dose for patients under 16"], actions: ["Nausea or vomiting persists: consult the EOC Clinician", "Discuss further treatment and/or transport options", tx] };
            return { tone: "warn", headline: "Still nauseated after a dose: consult", why: ["Nausea and/or vomiting persists after the first dose"],
              actions: ["Consult the EOC Clinician, who may advise a further dose of ondansetron 4 mg ODT (adults only)", "Discuss further treatment and/or transport options", tx] };
          }
          var dose = v.age === "2to6" ? "2 mg" : "4 mg";
          var why = ["Indicated, no contraindications" + (prec.length ? "" : ", no precautions")];
          var actions = ["Universal care"];
          if (prec.length === 1) { why.push("One precaution: " + prec[0]); actions.push("Consider the precaution and confirm with the patient before giving it"); }
          actions.push("Ondansetron " + dose + " ODT, single dose (" + ({ "2to6": "2 to under 6", "6to16": "6 to under 16", adult: "adult" })[v.age] + ")",
            "With dry hands, place the ODT on top of the tongue; let it dissolve, then swallow",
            "If nausea and/or vomiting persists: consult the EOC Clinician" + (v.age === "adult" ? ", who may advise a further 4 mg ODT" : " (children: single dose)"), tx);
          return { tone: "good", headline: "Give ondansetron " + dose + " ODT", why: why, actions: actions };
        },
        disclaimer: "Training aid only. Use the current protocol, the SAAS Clinical app and the EOC Clinician for real patients.",
        scenariosNote: "Examples written for training from CPP-047-AO. Decide before pressing the button.",
        scenarios: [
          { title: "Gastro, adult", text: "34, vomiting all night, can't keep anything down. No history.", values: { age: "adult", need: true, empty: false, allergy: false, apo: false, qt: false, heart: false, lytes: false, given: false } },
          { title: "Toddler, 3", text: "Vomiting before a 90 minute transport. Well otherwise.", values: { age: "2to6", need: true, empty: false, allergy: false, apo: false, qt: false, heart: false, lytes: false, given: false } },
          { title: "AF only", text: "72, nauseated with a fractured wrist. Has AF; nothing else.", values: { age: "adult", need: true, empty: false, allergy: false, apo: false, qt: false, heart: true, lytes: false, given: false } },
          { title: "Heart failure and low potassium", text: "80, heart failure with AF, recent low potassium on bloods, vomiting.", values: { age: "adult", need: true, empty: false, allergy: false, apo: false, qt: false, heart: true, lytes: true, given: false } },
          { title: "Parkinson's on apomorphine", text: "68, vomiting, uses an apomorphine pump.", values: { age: "adult", need: true, empty: false, allergy: false, apo: true, qt: false, heart: false, lytes: false, given: false } },
          { title: "Still vomiting", text: "Adult given 4 mg 20 minutes ago, still vomiting.", values: { age: "adult", need: true, empty: false, allergy: false, apo: false, qt: false, heart: false, lytes: false, given: true } },
          { title: "18 months", text: "Vomiting toddler, 18 months old.", values: { age: "u2", need: true, empty: false, allergy: false, apo: false, qt: false, heart: false, lytes: false, given: false } }
        ]
      } },
      { box: { title: "Giving an ODT", tiles: true, steps: [
        { t: "Check", text: "Indication, contraindications, precautions confirmed with the patient. Medication checks." },
        { t: "Dry hands", text: "ODTs dissolve on contact with moisture: handle with dry hands." },
        { t: "On the tongue", text: "Place the tablet on top of the patient's tongue." },
        { t: "Dissolve, then swallow", text: "Ask them to let it dissolve, then swallow." },
        { t: "Record and reassess", text: "Dose, route and time. Still vomiting? Consult the EOC Clinician." }
      ] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { table: { title: "Ondansetron ODT doses (CPP-047-AO)", table: { head: ["Age", "Dose", "Further dose"], rows: [
        ["Under 2", "Not covered by CPP-047-AO", "Consult the EOC Clinician"],
        ["2 to under 6", "2 mg, single dose", "No: consult if it persists"],
        ["6 to under 16", "4 mg, single dose", "No: consult if it persists"],
        ["Adults", "4 mg", "Consult: the EOC Clinician may advise a further 4 mg"]
      ] } } },
      { links: [{ label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" }] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "Why control nausea and vomiting?", options: ["It always means a serious illness", "It may help patient comfort and safe transport", "To avoid transport"], answer: 1,
        why: "Control of nausea and vomiting may assist patient comfort and safe transport." },
      { q: "When should you consider an antiemetic?", options: ["Every patient who feels sick", "Uncontrolled nausea and vomiting, and/or to facilitate safe transport", "Only before air transport"], answer: 1,
        why: "Consider requirement for antiemetic: uncontrolled nausea and vomiting and/or to facilitate safe transport." },
      { q: "Which is a contraindication to ondansetron?", options: ["Age over 65", "Taking apomorphine for Parkinson's disease", "Diabetes"], answer: 1,
        why: "Contraindications: known allergy/hypersensitivity to ondansetron or its components, and taking apomorphine in the setting of Parkinson's." },
      { q: "Which is a precaution, not a contraindication?", options: ["Prolonged QT syndrome", "Allergy to ondansetron", "Apomorphine use"], answer: 0,
        why: "Precautions: prolonged QT, AF or heart failure, low magnesium/potassium. Confirm with the patient before giving it." },
      { q: "Your patient has AF and heart failure and low potassium. What now?", options: ["Give 4 mg", "Consult the EOC Clinician: more than one precaution", "Give half a dose"], answer: 1,
        why: "If nausea and/or vomiting persist or more than one precaution exists: consult with the EOC Clinician." },
      { q: "The adult ondansetron dose is:", options: ["2 mg ODT", "4 mg ODT", "8 mg ODT"], answer: 1,
        why: "Adults administer 4 mg (single dose)." },
      { q: "A 4 year old needs ondansetron. Dose?", options: ["2 mg", "4 mg", "Not allowed"], answer: 0,
        why: "2 years to under 6: 2 mg (single dose)." },
      { q: "A 10 year old needs ondansetron. Dose?", options: ["2 mg", "4 mg", "8 mg"], answer: 1,
        why: "6 years to under 16: 4 mg (single dose)." },
      { q: "How do you give an ODT?", options: ["Swallow whole with water", "With dry hands, on top of the tongue; dissolve, then swallow", "Under the tongue and spit out"], answer: 1,
        why: "With dry hands place ODT on top of patient's tongue. Direct patient to allow ODT to dissolve, then swallow." },
      { q: "An adult is still vomiting after 4 mg. What now?", options: ["Give another 4 mg straight away", "Consult the EOC Clinician, who may advise a further 4 mg", "Nothing more can be done"], answer: 1,
        why: "If nausea and/or vomiting persist: consult the EOC Clinician, who may advise a further dose of ondansetron 4 mg ODT for adults only." },
      { q: "Does ondansetron prevent motion sickness?", options: ["Yes", "No: it isn't effective for motion sickness", "Only in children"], answer: 1,
        why: "Ondansetron is not effective in the prevention of motion sickness." },
      { q: "When might ondansetron be given before transport even without vomiting?", options: ["Never", "Head, spine or eye trauma, where vomiting carries a high risk of complications", "Any patient over 65"], answer: 1,
        why: "Ondansetron may be administered prior to transport in patients with head, spine or eye trauma where risk of complications associated with vomiting is high." }
    ] } }] },

    { title: "Practical: the ODT", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["A placebo tablet or small dissolving sweet", "The SAAS Clinical app", "A blank PCR or notepad"] } },
      { steps: [
        { t: "Screen", text: "Ask your partner the two contraindications and three precautions in plain language." },
        { t: "Dose", text: "Say the dose for ages 3, 9 and 40." },
        { t: "Give", text: "Dry hands, on top of the tongue, dissolve, swallow. Say it as you do it." },
        { t: "Escalate", text: "Role-play the EOC Clinician call for an adult still vomiting after 4 mg." }
      ] },
      { box: { title: "What good looks like", items: ["Apomorphine asked about by name", "Precautions confirmed with the patient", "Correct dose for age", "Consults for a second dose"] } },
      { note: "Suggested activities written for training. Never give real medication to anyone. Check them with your lead instructor." }
    ] }
  ]
};
