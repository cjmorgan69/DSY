/* Refusal against advice - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Sources (owner's request, 26 Nov 2026), all from the SAAS Clinical app, exported 31.08.2026:
   CPP-056-AO Refusal Against Advice - AO v1.0 (22 January 2025, no review date shown),
   CTL-126 VIRCA Tool (no version shown) and CTL-067 Consent to Medical Treatment and Healthcare (the "Adults" flowchart
   under the Advance Care Directives Act 2013 and the Consent to Medical Treatment and Palliative Care Act 1995; read from
   the chart image). Hypoglycaemia lines in the examples come from CPP-009-AO v4.1.
   The checker's scenarios, the practical and the quick checks are DSY-written for the owner to review. */

var M = window.MODULE = {
  flow: true,
  draft: false,
  title: "Refusal against advice",
  subtitle: "Ambulance Officer microlearning",
  headline: "Is this refusal valid? Ask VIRCA",
  lead: "\"I'm not going.\" Some refusals must be respected. Others can't be, because the person can't make that decision right now. This module covers CPP-056-AO: the VIRCA tool, the EOC Clinician consult, the three pathways (valid, invalid, and validity can't be determined), who can decide for someone else, the AMA form, and what to write.",
  minutes: 20,

  protocol: {
    code: "CPP-056-AO", name: "Refusal Against Advice - AO", version: "v1.0 (22 January 2025)", exported: "31 August 2026",
    also: [
      { code: "CTL-126", name: "VIRCA Tool" },
      { code: "CTL-067", name: "Consent to Medical Treatment and Healthcare" }
    ]
  },
  footerNotes: ["CPP-056-AO v1.0 (January 2025) shows no review date. Check the SAAS Clinical app for any newer version.",
    "The examples, checker scenarios and practical are written by DSY for training. The law on consent is summarised only as CTL-067 shows it: ask the EOC Clinician when you are unsure."],

  session: {
    intro: "For a team-led session. Allow about 25 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Read the introduction", time: "2 min", text: "Ask: what does 'care' mean in this protocol? (Assessment, treatment and transport.)" },
      { t: "VIRCA", time: "5 min", text: "Go round the room: each person says one letter and what it means. Then the four parts of capacity." },
      { t: "The three pathways", time: "6 min", text: "Use the chooser. For each pathway, what do you do, and what do you write?" },
      { t: "Which pathway? checker", time: "5 min", text: "Run the scenarios. Decide your answer before you press the button." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { text: "SAAS clinicians must seek consent in every patient interaction. Sometimes a patient, their Advance Care Directive (ACD), their substitute decision maker (SDM) or person responsible (PR) refuses care." },
      { text: "A refusal against advice is where you recommend care to the patient, SDM or PR, and that person validly refuses. In this protocol, \"care\" means SAAS assessment, treatment and transport: any or all of them." },
      { box: { title: "Who can refuse (CPP-056-AO)", items: [
        "People aged 16 or over with decision-making capacity have the right to make decisions about their care, including refusing care, or some parts of it",
        "Parents or guardians of children under 16 can refuse care of that child",
        "Concerns about the safety and wellbeing of children must be clinically escalated",
        "A refusal can be made at the time, by the patient, SDM or PR, or made earlier and written in an ACD"
      ] } }
    ] },

    { title: "Valid or not? The two tests", blocks: [
      { text: "When a patient (or their SDM or PR) refuses, you must decide whether the refusal is valid. CPP-056-AO says the decision has to meet two requirements:" },
      { steps: [
        { t: "Capacity", text: "The person is competent, or has the decision-making capacity for the decision at hand." },
        { t: "Freely made, on true information", text: "The decision is voluntary, free from coercion or undue influence, and not based on false or misleading information." }
      ] },
      { box: { title: "Capacity is not all or nothing", tone: "warn", check: { q: "Your patient has a GCS of 15. Does that mean they have capacity to refuse transport?", a: "No. CPP-056-AO: a patient's GCS does not directly relate to their capacity. Check the four parts of capacity (understand, retain, use, communicate) for this decision." }, items: [
        "Capacity can be whole, partial or absent",
        "It can change over time, sometimes quickly",
        "A patient's GCS does not directly relate to their capacity",
        "Some refusals are invalid because the patient shows impaired decision-making capacity"
      ] } }
    ] },

    { title: "The VIRCA tool (CTL-126)", blocks: [
      { text: "VIRCA helps you check both requirements. Work through every letter with the patient." },
      { table: { title: "VIRCA", table: { head: ["", "What it means"], rows: [
        ["V  Voluntary", "The decision to refuse is a voluntary choice, free of coercion, undue influence, manipulation or false information from another person."],
        ["I  Informed", "The patient is informed of their condition (or likely condition) and the risks and possible consequences of refusing care."],
        ["R  Relevant", "The decision, and exactly which assessment, treatment or transport the patient is refusing, is clearly specified."],
        ["C  Capacity", "The patient can understand the information relevant to the decision (including the consequences), retain it, use it in making the decision, and communicate the decision in any manner."],
        ["A  Advice", "Give the patient and/or others advice aimed at promoting the patient's safety and comfort after you leave."]
      ] } } },
      { box: { title: "What can affect capacity (CTL-126)", tone: "warn", items: [
        "Alcohol or drugs",
        "Acute mental health conditions",
        "Medical conditions, for example dementia, post-ictal states, metabolic disorders and delirium"
      ] } },
      { box: { title: "The four parts of capacity", check: { q: "A man after a hypo can repeat back what you told him about the risks, but a minute later he can't remember any of it. Which part of capacity is missing?", a: "Retaining the information. Capacity needs all four: understand, retain, use the information to decide, and communicate the decision (CTL-126)." }, steps: [
        { t: "Understand", text: "the information relevant to the decision, including the consequences of a particular choice" },
        { t: "Retain", text: "that information" },
        { t: "Use", text: "the information in making the decision" },
        { t: "Communicate", text: "the decision, in any manner" }
      ] } }
    ] },

    { title: "The protocol: three pathways", blocks: [
      { steps: [
        { t: "Basic care and life support" },
        { t: "If the patient refuses care, use the VIRCA tool to work out whether the refusal is valid" },
        { t: "Consult the EOC Clinician", text: "If you can't contact the EOC Clinician, consult the State Duty Manager or Team Leader." }
      ] },
      { chooser: {
        label: "Choose a pathway", placeholder: "Select a pathway",
        empty: "Select a pathway to see what CPP-056-AO says to do and to write.",
        options: [
          { value: "valid", label: "Valid refusal" },
          { value: "invalid", label: "Invalid refusal" },
          { value: "unknown", label: "Validity cannot be determined" }
        ],
        data: {
          valid: { sections: [
            { title: "If the patient is still refusing after you have sought clinical support, and validity is confirmed", items: [
              "Comply with the patient's wishes",
              "Offer advice",
              "Consider using internal or external health services to support the patient's safety",
              "Complete an Acknowledgement of Medical Advice (AMA) form",
              "Document the details of the VIRCA assessment and the discussion with the EOC Clinician",
              "Leave a copy of all documentation with the patient"
            ] }
          ] },
          invalid: { sections: [
            { title: "Deliver care", tone: "warn", items: ["Deliver care as per the plan made with the EOC Clinician, State Duty Manager or Team Leader"] },
            { title: "Then document comprehensively", items: [
              "The clinical assessment",
              "The VIRCA assessment",
              "Attempts to contact an SDM or PR, or why that was not reasonably practicable",
              "Details of the discussion with the EOC Clinician",
              "The treatment provided",
              "Any restraint used"
            ] }
          ] },
          unknown: { sections: [
            { title: "When it applies: all three of these", tone: "warn", items: [
              "You reasonably believe the patient needs urgent care to avert a serious risk to their life or health, and",
              "you can't determine with certainty whether they have the capacity to refuse the recommended care, and",
              "you can't identify or contact an ACD, SDM or PR"
            ] },
            { title: "What to do", items: [
              "Provide care with the goal of stabilisation",
              "Reassess capacity (VIRCA tool)",
              "Once stabilised, discuss the case with the EOC Clinician, State Duty Manager or Team Leader",
              "If you can't contact them, continue care",
              "Document the clinical assessment, the VIRCA assessment, details of any consults and the care provided"
            ] }
          ] }
        }
      } },
      { box: { title: "Valid refusal: the order of steps", tiles: true, steps: [
        { t: "VIRCA", text: "Work through every letter. Specify exactly what is being refused." },
        { t: "Consult", text: "The EOC Clinician (or State Duty Manager or Team Leader if you can't reach them)." },
        { t: "Still refusing?", text: "Validity confirmed: comply with the patient's wishes." },
        { t: "Advice", text: "Offer advice for their safety and comfort. Consider internal or external health services." },
        { t: "AMA form", text: "Complete the Acknowledgement of Medical Advice form." },
        { t: "Document and leave a copy", text: "VIRCA and the EOC Clinician discussion. Leave a copy of all documentation with the patient." }
      ] } }
    ] },

    { title: "When the patient can't decide: who can?", blocks: [
      { text: "CTL-067 is the SAAS flowchart for consent in adults, under the Advance Care Directives Act 2013 and the Consent to Medical Treatment and Palliative Care Act 1995. CPP-056-AO refers to it." },
      { steps: [
        { t: "Does the patient have capacity for this decision?", text: "Can they understand, retain and use the information, and communicate a decision? Yes: seek consent from the patient." },
        { t: "If not: can the decision wait until they regain capacity?", text: "Yes: defer the decision." },
        { t: "If not: is there an ACD appointing a Substitute Decision-Maker?", text: "Yes: seek consent from the SDM. They must try to follow any relevant instructions. Relevant refusals of health care are binding." },
        { t: "If not: is there an ACD with relevant instructions but no SDM?", text: "Yes: treat in line with the relevant instructions, and comply with any relevant (binding) refusal. Do not give the care that has been refused." },
        { t: "If not: seek consent from the Person Responsible" }
      ] },
      { box: { title: "The Person Responsible, in legal order (CTL-067)", items: [
        "1. A guardian appointed by the SA Civil and Administrative Tribunal",
        "2. A spouse or domestic partner; an adult related by blood, marriage or adoption; Aboriginal or Torres Strait Islander kinship or marriage *",
        "3. An adult friend *",
        "4. An adult charged with overseeing the person's day-to-day care",
        "5. The SA Civil and Administrative Tribunal, on application (a last resort)",
        "* Must have a close and continuing relationship with the person, and be available and willing to make the decision"
      ] } },
      { box: { title: "In an emergency (CTL-067)", tone: "no", items: [
        "If the patient does not have capacity, and it has not been possible to find one of the above documents or people in time, or the ACD is not relevant or is unclear: provide treatment in line with section 13 of the Consent to Medical Treatment and Palliative Care Act 1995"
      ] } }
    ] },

    { title: "Which pathway? checker", blocks: [
      { tool: {
        title: "Which pathway?",
        intro: "Answer for the decision in front of you. It follows CPP-056-AO and the VIRCA tool. The EOC Clinician consult is part of every pathway.",
        fields: [
          { id: "adult", type: "yesno", label: "Is the patient 16 or over?" },
          { id: "informed", type: "yesno", label: "Informed: have you told them their condition (or likely condition), and the risks and possible consequences of refusing?" },
          { id: "relevant", type: "yesno", label: "Relevant: is it clear exactly which assessment, treatment or transport they are refusing?" },
          { id: "voluntary", type: "yesno", label: "Voluntary: is the decision free of coercion, undue influence, manipulation or false information from someone else?" },
          { id: "capacity", type: "choice", label: "Capacity: can they understand, retain and use the information, and communicate their decision?", options: [
            { value: "yes", label: "Yes, all four" },
            { value: "no", label: "No: one or more is missing" },
            { value: "unsure", label: "I can't tell with certainty" }
          ] },
          { id: "urgent", type: "yesno", optional: true, label: "Do you believe they need urgent care to avert a serious risk to their life or health? (only needed if you can't tell about capacity)" },
          { id: "contact", type: "yesno", optional: true, label: "Can you identify or contact an ACD, SDM or PR? (only needed if you can't tell about capacity)" }
        ],
        evaluate: function (v) {
          if (!v.adult) {
            return { tone: "warn", headline: "Under 16: talk to the parents or guardians, and consult",
              why: ["Parents or guardians of children under 16 can refuse care of that child (CPP-056-AO)"],
              actions: ["Use the VIRCA tool with the parent or guardian making the decision", "Consult the EOC Clinician (or the State Duty Manager or Team Leader if you can't contact them)", "Concerns about the child's safety and wellbeing must be clinically escalated"] };
          }
          if (v.capacity === "unsure") {
            if (v.urgent === true && v.contact === false) {
              return { tone: "warn", headline: "Validity cannot be determined",
                why: ["Urgent care is needed to avert a serious risk", "You can't determine capacity with certainty", "You can't identify or contact an ACD, SDM or PR"],
                actions: ["Provide care with the goal of stabilisation", "Reassess capacity (VIRCA tool)", "Once stabilised, discuss the case with the EOC Clinician, State Duty Manager or Team Leader; if you can't contact them, continue care", "Document the clinical assessment, the VIRCA assessment, details of any consults and the care provided"] };
            }
            return { tone: "warn", headline: "Consult the EOC Clinician for clinical support",
              why: ["You can't tell whether the refusal is valid", v.urgent === null || v.contact === null ? "Answer the last two questions to see whether the \"validity cannot be determined\" pathway applies" : "The \"validity cannot be determined\" pathway needs all three: urgent care needed, capacity uncertain, and no ACD, SDM or PR you can identify or contact"],
              actions: ["If validity cannot be determined, consult the EOC to seek clinical support from a clinician external to the scene (CPP-056-AO)", "If an SDM or PR is there, CTL-067 sets out who can consent for the patient", "Keep giving basic care and life support, and reassess with VIRCA"] };
          }
          if (v.capacity === "no" || !v.voluntary) {
            var w = [];
            if (v.capacity === "no") w.push("The patient does not have the capacity for this decision");
            if (!v.voluntary) w.push("The decision is not voluntary, or rests on false or misleading information");
            return { tone: "warn", headline: "Invalid refusal", why: w,
              actions: ["Consult the EOC Clinician (or the State Duty Manager or Team Leader if you can't contact them)", "Deliver care as per the plan made with them", "Document comprehensively: clinical assessment, VIRCA, attempts to contact an SDM or PR (or why it wasn't reasonably practicable), the EOC Clinician discussion, treatment provided, any restraint used"],
              note: "Where coercion or false information is the problem, removing it (talking to the patient alone, correcting the information) and repeating the VIRCA may change the answer." };
          }
          if (!v.informed || !v.relevant) {
            var miss = [];
            if (!v.informed) miss.push("I: the patient must be informed of their condition and the risks and possible consequences of refusing");
            if (!v.relevant) miss.push("R: the decision and exactly what is being refused must be clearly specified");
            return { tone: "warn", headline: "Not yet: finish the VIRCA", why: miss,
              actions: ["Explain, and clarify what they are refusing (it may be only part of the care)", "Then go through the VIRCA tool again", "Consult the EOC Clinician"] };
          }
          return { tone: "good", headline: "Likely a valid refusal: consult, then respect it",
            why: ["Voluntary, informed, relevant, and the patient has capacity for this decision"],
            actions: ["Consult the EOC Clinician (or the State Duty Manager or Team Leader if you can't contact them)", "If the patient still refuses after that clinical support and validity is confirmed: comply with their wishes", "Offer advice; consider internal or external health services to support their safety", "Complete an Acknowledgement of Medical Advice (AMA) form", "Document the VIRCA assessment and the EOC Clinician discussion", "Leave a copy of all documentation with the patient"] };
        },
        disclaimer: "Training aid only. Use the current protocol and the EOC Clinician for real patients.",
        scenariosNote: "Examples written by DSY for training. Decide your answer before pressing the button.",
        scenarios: [
          { title: "After the hypo", text: "A 38 year old on insulin, BGL now 6.4 after oral glucose, alert. He has been told why the protocol says transport and the risks. He's refusing transport only. He repeats the risks back, weighs them against his son's footy game, and says no, clearly. His partner isn't pressuring him.", values: { adult: true, informed: true, relevant: true, voluntary: true, capacity: "yes" } },
          { title: "Before the glucose", text: "The same man 20 minutes earlier: BGL 2.3, sweaty, muddled, telling the crew to get out. He can't hold onto what you say. His partner is with him.", values: { adult: true, informed: true, relevant: false, voluntary: true, capacity: "no" } },
          { title: "\"He's not going\"", text: "An 80 year old woman with chest pain says she'll go if her son agrees. Her son, standing over her, says \"You're not wasting an ambulance, Mum. We're fine.\" She then refuses.", values: { adult: true, informed: true, relevant: true, voluntary: false, capacity: "yes" } },
          { title: "Alone in the car", text: "A man is found alone in his car at the boat ramp, drowsy and muddled, smelling of alcohol, refusing to let you check him. He looks pale and sweaty. No ID, no phone, nobody with him.", values: { adult: true, informed: true, relevant: true, voluntary: true, capacity: "unsure", urgent: true, contact: false } },
          { title: "Fifteen and refusing", text: "A 15 year old with a deep cut to the hand tells you she doesn't want to go to hospital. Her dad is on the phone.", values: { adult: false, informed: true, relevant: true, voluntary: true, capacity: "yes" } },
          { title: "\"Just leave me\"", text: "A woman with a painful ankle after a fall says \"I don't want any of it.\" You haven't yet explained what you think is wrong, and you're not sure whether she means the assessment, the pain relief or the trip.", values: { adult: true, informed: false, relevant: false, voluntary: true, capacity: "yes" } }
        ]
      } }
    ] },

    { title: "What to write", blocks: [
      { text: "CTL-126 lists what to record on the PCR for each letter. This is your evidence that the refusal was assessed properly." },
      { table: { title: "VIRCA on the PCR (CTL-126)", table: { head: ["", "Record"], rows: [
        ["V", "Details of the voluntary nature of the patient's decision"],
        ["I", "Details of the information given to the patient (be specific)"],
        ["R", "Precisely which assessment, treatment and/or transport options the patient refused"],
        ["C", "Evidence of decision-making capacity, or of impaired capacity; the details of, and reasons for, refusing; any attempts to remove barriers to assessment, treatment or transport"],
        ["A", "Details of the advice given to the patient and/or others, aimed at their safety and comfort"]
      ] } } },
      { box: { title: "And for a valid refusal", check: { q: "The patient has validly refused transport and the EOC Clinician agrees. What paperwork stays at the house?", a: "A copy of all the documentation (CPP-056-AO), after you complete an Acknowledgement of Medical Advice (AMA) form and document the VIRCA assessment and the EOC Clinician discussion." }, items: [
        "An Acknowledgement of Medical Advice (AMA) form",
        "The discussion with the EOC Clinician",
        "A copy of all documentation left with the patient"
      ] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { links: [
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
        { label: "CPP-056-AO Refusal Against Advice (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Refusal%20Against%20Advice%20-%20AO.pdf" },
        { label: "CTL-126 VIRCA Tool (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/VIRCA%20Tool.pdf" },
        { label: "CTL-067 Consent to Medical Treatment and Healthcare (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/Consent%20to%20Medical%20Treatment%20and%20Healthcare.pdf" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "In CPP-056-AO, what does \"care\" mean?", options: ["Transport only", "SAAS assessment and/or treatment and/or transport", "Treatment only"], answer: 1,
        why: "The term 'care' is to be considered SAAS facilitated assessment and/or treatment and/or transport." },
      { q: "From what age does a person with decision-making capacity have the right to refuse their own care?", options: ["14", "16", "18"], answer: 1,
        why: "People aged 16 or over with decision making capacity have the right to make decisions regarding their care, including the decision to refuse care." },
      { q: "A patient refuses care. What does the protocol say to use first to decide whether the refusal is valid?", options: ["The GCS", "The VIRCA tool", "The RDR chart"], answer: 1,
        why: "If refusing care, use VIRCA tool to ascertain validity." },
      { q: "You can't reach the EOC Clinician. Who do you consult instead?", options: ["The State Duty Manager or Team Leader", "The patient's GP", "No one: decide yourselves"], answer: 0,
        why: "If unable to contact the EOC Clinician, consult with the State Duty Manager or Team Leader." },
      { q: "What does the C in VIRCA need? The patient can understand, retain and use the information, and...", options: ["has a GCS of 15", "communicate their decision in any manner", "sign the form"], answer: 1,
        why: "CTL-126: capable of understanding, retaining, using the information, and communicating their decision in any manner." },
      { q: "Which statement about GCS is in the protocol?", options: ["GCS 15 means the patient has capacity", "GCS does not directly relate to capacity", "GCS below 13 always means no capacity"], answer: 1,
        why: "A patient's Glasgow Coma Scale (GCS) does not directly relate to their capacity." },
      { q: "A refusal is valid. The patient still refuses after you've sought clinical support. Which is NOT one of the protocol's steps?", options: ["Comply with their wishes and offer advice", "Complete an AMA form and leave a copy of all documentation", "Take them anyway if their family insists"], answer: 2,
        why: "Valid refusal: comply with the patient's wishes, offer advice, consider health services, complete an AMA form, document, and leave a copy with the patient." },
      { q: "What does AMA stand for in CPP-056-AO?", options: ["Against Medical Advice", "Acknowledgement of Medical Advice", "Ambulance Medical Assessment"], answer: 1,
        why: "Complete an 'Acknowledgement of Medical Advice' (AMA) form." },
      { q: "A refusal is invalid. Whose plan do you follow?", options: ["The plan made with the EOC Clinician, State Duty Manager or Team Leader", "The family's", "Your own, without a consult"], answer: 0,
        why: "Invalid refusal: deliver care as per plan formulated with EOC Clinician/State Duty Manager/Team Leader." },
      { q: "For the \"validity cannot be determined\" pathway, which is NOT one of the three conditions?", options: ["Urgent care is needed to avert a serious risk", "You can't identify or contact an ACD, SDM or PR", "The patient is under 16"], answer: 2,
        why: "All three: urgent care needed to avert a serious risk; capacity can't be determined with certainty; unable to identify or contact an ACD/SDM/PR." },
      { q: "In that pathway, what is the goal of the care you give?", options: ["Stabilisation", "Full treatment, whatever the patient says later", "Transport only"], answer: 0,
        why: "Provide care with the goal of stabilisation, and reassess capacity (VIRCA tool). Once stabilised, discuss the case." },
      { q: "On CTL-067, who comes first in the legal order of a Person Responsible?", options: ["An adult friend", "A guardian appointed by the SA Civil and Administrative Tribunal", "A spouse or domestic partner"], answer: 1,
        why: "CTL-067: 1 a guardian appointed by SACAT, 2 a spouse, domestic partner or relative, 3 an adult friend, 4 an adult overseeing day-to-day care, 5 SACAT (last resort)." },
      { q: "For a refusal, what does CTL-126 say to record under R?", options: ["The patient's religion", "Precisely which assessment, treatment and/or transport options were refused", "The response time"], answer: 1,
        why: "R Relevant: record precisely the assessment and/or treatment and/or transport options that the patient has refused." }
    ] } }] },

    { title: "Practical: the VIRCA conversation", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. In threes: a crew member, a patient and an observer with the VIRCA card. Swap roles each round." },
      { box: { title: "What you need", items: ["The VIRCA tool (CTL-126) on a phone or printed", "A blank PCR or paper for the notes", "Something to stand in for the AMA form (the station's own form if you have one)"] } },
      { steps: [
        { t: "Round 1: valid", text: "The patient is alert after a hypo, understands, and refuses transport only. Work through every letter out loud. Make the EOC Clinician call (the observer plays the EOC Clinician). Give advice. Talk through the AMA form." },
        { t: "Round 2: capacity", text: "The patient can't retain what you tell them. Show how you test each part of capacity without arguing. Who could consent for them (CTL-067)?" },
        { t: "Round 3: voluntary", text: "A relative keeps answering for the patient and pushing them to refuse. How do you check the decision is the patient's own?" },
        { t: "Write it", text: "Each person writes the five VIRCA lines for round 1, as CTL-126 lists them. Compare." }
      ] },
      { box: { title: "What good looks like", items: ["Every VIRCA letter covered, in plain words", "Exactly what is refused is named", "The patient repeats the risks back in their own words", "The EOC Clinician is called before you leave", "Advice and a plan for help are left with the patient and the people with them"] } },
      { note: "Suggested activities written for training. Check them with your lead instructor." }
    ] }
  ]
};
