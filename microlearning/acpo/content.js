/* Acute Cardiogenic Pulmonary Oedema - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Sources: SAAS CPP-001-AO Acute Cardiogenic Pulmonary Oedema - AO v4.2 (23 April 2020), exported 31.08.2026, and
   CPPRO-009 Oral Medication Administration v1.0 (review date June 2020, now passed) for sublingual technique. The GTN
   presentations (300 microg tablet or 400 microg spray, treated as the same) and "ensure the tablet has dissolved" are
   from the SAAS Clinical app's medicine data, which matches the DSY lead instructor's GTN guidance. CPAP (CPPRO-014) is
   Intensive Care Paramedic only and is mentioned only so crews know what clinical support may bring. Nothing clinical
   here goes beyond those documents. */
var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Acute cardiogenic pulmonary oedema",
  subtitle: "Ambulance Officer microlearning",
  headline: "Sit them up, high-flow oxygen, and GTN only when the numbers allow",
  lead: "Acute cardiogenic pulmonary oedema (ACPO) is best treated with oxygen and posture. This module covers the AO protocol: basic care, high-flow oxygen, clinical support, and when the EOC Clinician may advise GTN, including the blood pressure, heart rate and PDE-5 inhibitor checks.",
  minutes: 20,

  protocol: {
    code: "CPP-001-AO", name: "Acute Cardiogenic Pulmonary Oedema - AO", version: "v4.2 (23 April 2020)", exported: "31 August 2026",
    also: [{ code: "CPPRO-009", name: "Oral Medication Administration", version: "v1.0 (review date June 2020)" }]
  },
  footerNotes: ["GTN 300 microg tablet or 400 microg spray: the SAAS Clinical app treats one spray as the same as one tablet. CPP-001-AO itself says the 300 microg tablet.",
    "CPPRO-009 is past its review date (June 2020). Check the SAAS Clinical app for any newer version."],

  session: {
    intro: "For a team-led session. Allow about 25 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Read the introduction", time: "3 min", text: "Read the principle aloud: oxygen and posture first." },
      { t: "The protocol", time: "5 min", text: "Take turns reading a box. Check everyone can say the GTN limits: SBP over 100, HR 60 to 120, and the PDE-5 windows." },
      { t: "GTN checker", time: "7 min", text: "Work the scenarios. Decide before pressing the button." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pairs practise the sublingual spray technique (into the air only) and the EOC Clinician call." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "", title: "ACPO: what AOs need to know" } },
      { text: "Acute cardiogenic pulmonary oedema (ACPO) is best treated by attention to oxygenation and posture. Glyceryl trinitrate (GTN) is beneficial if there is adequate blood pressure." },
      { text: "A phosphodiesterase-5 (PDE-5) inhibitor is a drug most commonly used to treat erectile dysfunction and pulmonary hypertension. GTN is contraindicated for patients taking PDE-5 medications, because using them together can lead to life-threatening hypotension." }
    ] },

    { title: "The protocol", blocks: [
      { box: { title: "Every patient", steps: [
        { t: "Basic care, including posture", text: "Sit them up." },
        { t: "High-flow oxygen", text: "Via a non-rebreather mask." },
        { t: "Request clinical support" },
        { t: "Consult the EOC Clinician", text: "Who may advise GTN if the vital signs are within the limits below." },
        { t: "Provide prompt transport and notify the receiving facility" }
      ] } },
      { box: { title: "GTN: the EOC Clinician may advise it if", tone: "warn", check: { q: "SBP 100, HR 96, no PDE-5 inhibitors. Can the EOC Clinician advise GTN?", a: "Not under CPP-001-AO: the systolic must be greater than 100 mmHg. Exactly 100 is outside the limit." }, items: [
        "Systolic BP greater than 100 mmHg, and",
        "Heart rate 60 to 120, and",
        "No PDE-5 inhibitor within 24 hours (sildenafil, vardenafil or avanafil) or 48 hours (tadalafil)"
      ] } },
      { box: { title: "After GTN", items: [
        "Monitor vital signs every 3 to 5 minutes",
        "Repeat GTN as directed by the EOC Clinician, if the vital signs remain within the limits",
        "Consult the EOC Clinician any time the vital signs fall outside the limits"
      ] } },
      { box: { title: "What clinical support may bring", items: [
        "CPAP (CPPRO-014) is used by Intensive Care Paramedics, not AOs. Your job is posture, oxygen, GTN when advised, and getting moving"
      ] } }
    ] },

    { title: "GTN checker", blocks: [
      { tool: {
        title: "GTN checker",
        intro: "Enter the vital signs and the PDE-5 history to see what CPP-001-AO says. The EOC Clinician decides whether to advise GTN.",
        check: { q: "A man with ACPO took tadalafil (Cialis) 30 hours ago. SBP 150, HR 104. GTN?", a: "No. Tadalafil within 48 hours rules out GTN. Oxygen, posture, clinical support, prompt transport, and tell the EOC Clinician." },
        fields: [
          { id: "sbp", type: "number", label: "Systolic BP (mmHg)", step: "1", placeholder: "e.g. 160" },
          { id: "hr", type: "number", label: "Heart rate", step: "1", placeholder: "e.g. 110" },
          { id: "pde", type: "choice", label: "PDE-5 inhibitors (sildenafil/Viagra, vardenafil, avanafil, tadalafil/Cialis)", options: [
            { value: "none", label: "None within the windows below" },
            { value: "short", label: "Sildenafil, vardenafil or avanafil in the past 24 hours" },
            { value: "tada", label: "Tadalafil in the past 48 hours" }] },
          { id: "given", type: "yesno", label: "Has GTN already been given this job?" }
        ],
        evaluate: function (v) {
          var base = ["Basic care, sitting up", "High-flow oxygen via non-rebreather mask", "Request clinical support"];
          var why = [], out = [];
          if (!(v.sbp > 100)) out.push("Systolic " + v.sbp + " mmHg: GTN needs greater than 100 mmHg");
          if (v.hr < 60 || v.hr > 120) out.push("Heart rate " + v.hr + ": GTN needs 60 to 120");
          if (v.pde === "short") out.push("Sildenafil, vardenafil or avanafil within 24 hours: GTN can cause life-threatening hypotension");
          if (v.pde === "tada") out.push("Tadalafil within 48 hours: GTN can cause life-threatening hypotension");
          if (out.length) return { tone: "no", headline: v.given ? "Outside the limits: no more GTN, consult" : "No GTN", why: out,
            actions: base.concat([v.given ? "Consult the EOC Clinician now: the vital signs are outside the limits" : "Consult the EOC Clinician, and tell them why GTN isn't an option", "Provide prompt transport and notify the receiving facility"]) };
          why.push("SBP " + v.sbp + " mmHg (greater than 100), HR " + v.hr + " (60 to 120), no PDE-5 inhibitor within the windows");
          return { tone: "warn", headline: v.given ? "Within the limits: repeat only as directed" : "Consult the EOC Clinician about GTN", why: why,
            actions: base.concat([
              v.given ? "Repeat GTN only as directed by the EOC Clinician, while the vital signs stay within the limits" : "Consult the EOC Clinician, who may advise sublingual GTN 300 microg (SAAS app: a 300 microg tablet or one 400 microg spray, treated as the same)",
              "Monitor vital signs every 3 to 5 minutes",
              "Consult the EOC Clinician any time the vital signs fall outside the limits",
              "Provide prompt transport and notify the receiving facility"]),
            note: "Tablet: let it dissolve before the next dose (SAAS app). Spray: test into the air, then under the lifted tongue (CPPRO-009)." };
        },
        disclaimer: "Training aid only. Use the current protocol, the SAAS Clinical app and the EOC Clinician for real patients.",
        scenariosNote: "Examples written for training from CPP-001-AO. Decide before pressing the button.",
        scenarios: [
          { title: "Classic ACPO", text: "Breathless, pink frothy sputum, sitting bolt upright. SBP 178, HR 112, no PDE-5 inhibitors.", values: { sbp: 178, hr: 112, pde: "none", given: false } },
          { title: "Exactly 100", text: "SBP 100, HR 98, no PDE-5 inhibitors.", values: { sbp: 100, hr: 98, pde: "none", given: false } },
          { title: "Heart rate 124", text: "SBP 160, HR 124, no PDE-5 inhibitors.", values: { sbp: 160, hr: 124, pde: "none", given: false } },
          { title: "Exactly 120", text: "SBP 146, HR 120, no PDE-5 inhibitors.", values: { sbp: 146, hr: 120, pde: "none", given: false } },
          { title: "Viagra last night", text: "SBP 168, HR 106. Took sildenafil 10 hours ago.", values: { sbp: 168, hr: 106, pde: "short", given: false } },
          { title: "After two doses", text: "GTN given twice on advice. Now SBP 96, HR 92.", values: { sbp: 96, hr: 92, pde: "none", given: true } }
        ]
      } },
      { box: { title: "Giving sublingual GTN", tiles: true, steps: [
        { t: "Consult and check", text: "EOC Clinician advice, repeated back. Medication checks, allergies, and ask about PDE-5 inhibitors by name." },
        { t: "Sit them up", text: "They should already be upright for the ACPO." },
        { t: "Tablet", text: "Under the tongue. Let it dissolve; not chewed or swallowed. Make sure it has dissolved before any next dose." },
        { t: "Or spray", text: "Test into the air, away from everyone. Ask them to lift the tongue tip and spray underneath. Avoid touching the mouth." },
        { t: "Watch and record", text: "Vital signs every 3 to 5 minutes. Dose, route and time on the PCR." }
      ] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { table: { title: "GTN limits (CPP-001-AO)", table: { head: ["Check", "GTN may be advised", "No GTN"], rows: [
        ["Systolic BP", "Greater than 100 mmHg", "100 mmHg or less"],
        ["Heart rate", "60 to 120", "Below 60 or above 120"],
        ["Sildenafil, vardenafil, avanafil", "None in the past 24 hours", "Within 24 hours"],
        ["Tadalafil", "None in the past 48 hours", "Within 48 hours"]
      ] }, text: "Outside any limit at any time: consult the EOC Clinician." } },
      { links: [
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
        { label: "CPPRO-009 Oral Medication Administration (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-009%20Oral%20Medication%20Administration.pdf" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "What does CPP-001-AO say is the best treatment for ACPO?", options: ["GTN as soon as possible", "Attention to oxygenation and posture", "Lying the patient flat"], answer: 1,
        why: "ACPO is best treated by attention to oxygenation and posture. GTN is beneficial if there is adequate blood pressure." },
      { q: "How should the patient be positioned?", options: ["Flat with legs raised", "Sitting up", "On their left side"], answer: 1,
        why: "Basic care including posture (sitting up)." },
      { q: "How is oxygen given in ACPO?", options: ["Nasal cannula at 2 L/min", "High flow via non-rebreather mask", "Only if SpO2 is below 90%"], answer: 1,
        why: "High flow oxygen via non-rebreather mask." },
      { q: "Who decides whether the AO gives GTN for ACPO?", options: ["The AO alone", "The EOC Clinician, who may advise it", "The patient"], answer: 1,
        why: "Consult EOC Clinician who may advise sublingual tablet GTN 300 microg if the patient is within the limits." },
      { q: "What systolic BP is needed for GTN?", options: ["100 mmHg or more", "Greater than 100 mmHg", "Greater than 90 mmHg"], answer: 1,
        why: "Systolic BP > 100 mmHg. Exactly 100 is outside the limit." },
      { q: "What heart rate range allows GTN?", options: ["50 to 100", "60 to 120", "60 to 140"], answer: 1,
        why: "Heart rate 60 to 120." },
      { q: "A patient took sildenafil (Viagra) 20 hours ago. GTN?", options: ["Yes, it's been more than 12 hours", "No: within 24 hours for sildenafil", "Yes, at half dose"], answer: 1,
        why: "No use of PDE-5 inhibitors within 24 hrs for sildenafil, vardenafil or avanafil." },
      { q: "Which PDE-5 inhibitor has a 48 hour window?", options: ["Sildenafil", "Tadalafil", "Avanafil"], answer: 1,
        why: "48 hrs for tadalafil; 24 hrs for sildenafil, vardenafil or avanafil." },
      { q: "Why is GTN contraindicated with PDE-5 inhibitors?", options: ["It stops working", "Together they can cause life-threatening hypotension", "They cause a rash"], answer: 1,
        why: "Concurrent use can lead to life-threatening hypotension (CPP-001-AO principle)." },
      { q: "After GTN, how often do you check vital signs?", options: ["Every 3 to 5 minutes", "Every 15 minutes", "Only at handover"], answer: 0,
        why: "Monitor vital signs every 3 to 5 mins." },
      { q: "After two doses, the SBP is now 96. What now?", options: ["Give another dose", "Consult the EOC Clinician: the vital signs are outside the limits", "Lie the patient flat and carry on"], answer: 1,
        why: "Repeat GTN only if vital signs remain within the limits. Consult EOC Clinician any time vital signs fall outside them." },
      { q: "Using a GTN spray, what do you do first?", options: ["Spray it into the patient's mouth straight away", "Test spray into the air, away from yourself, the patient and others", "Shake it and spray on the tongue"], answer: 1,
        why: "CPPRO-009: test spray into the air, away from self, the patient and others, then spray under the lifted tongue." }
    ] } }] },

    { title: "Practical: the GTN call", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["A training GTN spray or placebo tablets", "A non-rebreather mask", "The SAAS Clinical app", "A blank PCR or notepad"] } },
      { steps: [
        { t: "Position and oxygen", text: "Sit your partner up and fit the non-rebreather mask. Say why posture matters." },
        { t: "Ask the PDE-5 question", text: "Practise asking by name, kindly and privately: \"Have you taken Viagra, Cialis, Levitra or similar in the last two days?\"" },
        { t: "Make the call", text: "Role-play the EOC Clinician call: SBP, HR, SpO2, the PDE-5 answer, and what you're asking for." },
        { t: "Spray technique", text: "Training spray into the air only. Talk through the tongue-lift and the buccal fallback." }
      ] },
      { box: { title: "What good looks like", items: ["Sitting up and on oxygen before anything else", "PDE-5 inhibitors asked by name, with the time taken", "Vital signs every 3 to 5 minutes after GTN", "Stops and consults when a limit is crossed"] } },
      { note: "Suggested activities written for training. Never give real medication to anyone. Check them with your lead instructor." }
    ] },

    { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "The Resus Room is a UK emergency medicine podcast. Its \"Acute Heart Failure; Roadside to Resus\" episode (July 2017, about 40 minutes) covers acute heart failure from the roadside to the emergency department. Optional listening. It reflects UK practice from 2017, so where it differs from CPP-001-AO, follow the protocol." },
      { links: [{ label: "Open the Resus Room acute heart failure episode", href: "https://theresusroom.libsyn.com/acute-heart-failure-roadside-to-resus" }] }
    ] }
  ]
};
