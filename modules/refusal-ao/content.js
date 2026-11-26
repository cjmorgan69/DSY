/* Refusal against advice - AO walk-through scenario (Sam, 38, Tumby Bay). Content only: the layout lives in
   /microlearning/shared/module.js. A new DSY scenario written on 26 Nov 2026 (owner's request). Clinical actions follow
   SAAS CPP-056-AO Refusal Against Advice - AO v1.0 (22 January 2025), CTL-126 VIRCA Tool, CTL-067 Consent to Medical
   Treatment and Healthcare and CPP-009-AO Hypoglycaemia - AO v4.1 (30 June 2021), all exported 31.08.2026, with
   CPP-004-AO Basic Care and Life Support - AO. The whole story, scene, observations, crew roles, timings and EOC
   Clinician replies are written by DSY for training. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Refusal against advice - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Sam, 38: \"Get out of my house.\" A hypo who refuses, then recovers and still refuses, Tumby Bay",
  lead: "A refusal call for a two-person volunteer AO crew, with seven break points. The same patient gives an invalid refusal and, half an hour later, a valid one. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 70,
  relatedCodes: ["CPP-009-AO"],

  protocol: {
    code: "CPP-056-AO", name: "Refusal Against Advice - AO", version: "v1.0 (22 January 2025)", exported: "31 August 2026",
    also: [
      { code: "CTL-126", name: "VIRCA Tool" },
      { code: "CTL-067", name: "Consent to Medical Treatment and Healthcare" },
      { code: "CPP-009-AO", name: "Hypoglycaemia - AO", version: "v4.1 (30 June 2021)" }
    ]
  },
  footerNotes: ["This is a new training scenario written by DSY: the patient, story, observations, timings and EOC Clinician replies are fictional. Check it with your lead instructor.",
    "CPP-056-AO shows no review date. Check the SAAS Clinical app for any newer version."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A Saturday morning in March in Tumby Bay. A 38 year old man with type 1 diabetes went for an early run and skipped most of his breakfast. His partner finds him in the bathroom, sweaty and muddled, telling her to get out. Tumby Bay Hospital is 5 minutes away; paramedic backup from Port Lincoln is about 45 minutes." },
      { box: { title: "Learning objectives", items: [
        "Use the VIRCA tool to decide whether a refusal is valid",
        "Recognise that capacity can be absent, partial or whole, and can change, and that GCS does not equal capacity",
        "Consult the EOC Clinician (or the State Duty Manager or Team Leader) and follow the plan for an invalid refusal",
        "Know who can consent for an adult who can't decide (CTL-067)",
        "Treat hypoglycaemia as per CPP-009-AO",
        "Reassess VIRCA after recovery and follow the valid refusal steps: comply, advise, health services, AMA form, copy left",
        "Document the VIRCA assessment and the EOC Clinician discussion as CTL-126 lists"
      ] } },
      { box: { title: "Required equipment", items: [
        "BGL meter, lancets, strips, sharps container",
        "Oral glucose paste; glucagon kit (in case)",
        "Corpuls3 monitor, oxygen, suction, response bag",
        "The VIRCA tool (CTL-126) and an Acknowledgement of Medical Advice (AMA) form (or a stand-in)",
        "PPE, ePCR tablet or a paper PCR"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 40 to 50 minutes; debrief 10 to 15 minutes",
        "Response to scene: about 6 minutes",
        "Tumby Bay Hospital: about 5 minutes",
        "Paramedic backup from Port Lincoln: about 45 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, the conversation with Sam, VIRCA, oral glucose, the AMA form",
        "Driver (AO2): Kirsty, BGL and observations, the EOC Clinician calls, the notes for the PCR"
      ] } }
    ] },

    { title: "Pre-brief: the AO refusal protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { steps: [
        { t: "Basic care and life support" },
        { t: "If the patient refuses care, use the VIRCA tool to work out whether the refusal is valid" },
        { t: "Consult the EOC Clinician", text: "If you can't contact them, consult the State Duty Manager or Team Leader." },
        { t: "Valid refusal", text: "Still refusing after clinical support, and validity confirmed: comply with their wishes, offer advice, consider internal or external health services. AMA form. Document VIRCA and the EOC Clinician discussion. Leave a copy of all documentation with the patient." },
        { t: "Invalid refusal", text: "Deliver care as per the plan made with the EOC Clinician, State Duty Manager or Team Leader. Document the clinical assessment, VIRCA, attempts to contact an SDM or PR, the EOC Clinician discussion, treatment and any restraint." },
        { t: "Validity cannot be determined", text: "Urgent care needed, capacity uncertain, and no ACD, SDM or PR you can identify or contact: care aimed at stabilisation, reassess VIRCA, then discuss once stabilised." }
      ] },
      { box: { title: "VIRCA (CTL-126)", items: [
        "V Voluntary: free of coercion, undue influence, manipulation or false information from another person",
        "I Informed: of their condition (or likely condition) and the risks and possible consequences of refusing",
        "R Relevant: exactly which assessment, treatment or transport is refused",
        "C Capacity: can understand, retain and use the information, and communicate the decision in any manner",
        "A Advice: aimed at the patient's safety and comfort after you leave"
      ] } },
      { box: { title: "Principle (CPP-056-AO)", items: [
        "\"Care\" means SAAS assessment and/or treatment and/or transport",
        "People 16 or over with decision-making capacity can refuse care, or parts of it",
        "Capacity can be whole, partial or absent, and can change over time",
        "GCS does not directly relate to capacity",
        "Capacity may be affected by alcohol, drugs, acute mental health conditions or medical conditions such as metabolic disorders (CTL-126)"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "A hypo can look like rudeness, drunkenness or a fight. Check the BGL",
        "Stay calm and don't argue with someone who can't take in what you are saying",
        "When the patient recovers, the decision is theirs again: start VIRCA from the beginning",
        "Ask why they are refusing. The reason is often a practical problem you can help with"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Saturday in March, 0948. You and your crew partner are paged in Tumby Bay." },
      { box: { title: "MDT display", items: [
        "Priority 2, altered conscious state, 38 year old male",
        "Caller: partner (Kirsty). Found him in the bathroom, sweaty, \"not making sense\", told her to get out",
        "Type 1 diabetic. Breathing. No fall reported",
        "House in the Tumby Bay township"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What are you thinking from the MDT?", "He has told his partner to get out. What might he say to you?", "What's the first measurement you want?", "Who does what on arrival?"],
        expected: [
          "Type 1 diabetic, confused and sweaty: hypoglycaemia is likely",
          "He may refuse you too. A confused patient's refusal has to be checked with VIRCA, not simply accepted",
          "BGL (CPP-009-AO: measure it in every altered conscious state)",
          "AO1 talks to Sam; AO2 talks to Kirsty, gets the history and the BGL, and is ready to call the EOC Clinician"
        ],
        teaching: ["Plan for the refusal before you get there", "Scene safety: an agitated patient can lash out. Keep an exit and keep it calm (general teaching)"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "Six minutes is enough to agree who talks to whom. One calm voice with the patient.",
        decisions: [{ q: "A confused patient tells you to leave. What does CPP-056-AO say to do?", options: ["Leave: he has refused", "Use the VIRCA tool to work out whether the refusal is valid", "Call the police"], answer: 1,
          why: "CPP-056-AO: if refusing care, use the VIRCA tool to ascertain validity, then consult the EOC Clinician." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "0955. Kirsty meets you at the front door, upset. Their son Jack, 9, is in the lounge in his cricket whites. Sam is sitting on the bathroom floor in running gear, pale and drenched in sweat. \"Get out of my house. I don't need you. I'm fine.\" He swears, then asks Kirsty what the time is, twice in a minute. He pulls his hand away when you reach for it." },
      { box: { title: "History (Kirsty)", items: [
        "Type 1 diabetes since he was 12; on insulin",
        "Ran about 10 km early this morning; took his breakfast insulin but only had a coffee",
        "Kirsty checked his own meter at 0945: 2.3",
        "No fall, no head knock that she knows of; no alcohol",
        "He has had hypos before but \"never this bad\". No known allergies",
        "Jack's cricket final is at 1300"
      ] } },
      { breakpoint: { title: "Is this refusal valid?", type: "Decision making",
        prompts: ["What do you see and hear?", "He says he doesn't need you. Go through VIRCA: which letters fail?", "What exactly is he refusing?", "What do you do next?"],
        expected: [
          "Pale, sweaty, swearing, repeating questions, BGL 2.3 on his own meter: hypoglycaemia",
          "C: he can't retain information (asks the time twice), so he can't use it to decide. A metabolic disorder is listed as something that can affect capacity (CTL-126). I and R: he can't take in what you tell him",
          "Everything: \"get out\". He hasn't said what part of care he refuses, because he can't",
          "This is an invalid refusal: impaired decision-making capacity. Consult the EOC Clinician, and keep up basic care"
        ],
        teaching: ["GCS 14 or 15 doesn't settle it: capacity is about this decision (CPP-056-AO)", "An invalid refusal is not permission to force. It means you make a plan with the EOC Clinician"],
        realJob: "Don't argue. Sit down at his level, use his name, keep your voice low, and let Kirsty help.",
        decisions: [
          { q: "Sam asks the time twice in a minute and can't follow what you say. Which part of capacity is missing?", options: ["Communicating", "Retaining (and so using) the information", "None: he is talking"], answer: 1,
            why: "CTL-126: capacity needs the patient to understand, retain and use the information, and communicate the decision. He can't retain it, so he can't use it." },
          { q: "So his refusal is...", options: ["Valid: he is an adult", "Invalid: impaired decision-making capacity", "Not a refusal at all"], answer: 1,
            why: "CPP-056-AO: some decisions to refuse care may be deemed invalid due to the patient demonstrating impaired decision-making capacity." }],
        cards: [{ q: "Name three things CTL-126 says can affect capacity.", a: "Alcohol, drugs, acute mental health conditions, and medical conditions such as dementia, post-ictal states, metabolic disorders and delirium." }]
      } }
    ] },

    { title: "The plan with the EOC Clinician", blocks: [
      { text: "0958. AO2 calls the EOC Clinician from the hallway while AO1 stays with Sam. AO2 gives the BGL, what Sam is doing and saying, the VIRCA findings, and that Kirsty is here." },
      { text: "In the scenario, the EOC Clinician says: \"That's an invalid refusal: he can't make this decision right now. Kirsty is his partner, so she can consent for him. Plan: if he'll swallow it, give the oral glucose. No restraint. If he can't swallow or won't take it, call me straight back. Recheck the BGL in 10 to 15 minutes and call me again with the result. I'll hold off on clinical support until then.\" AO2 repeats the plan back.", muted: true },
      { breakpoint: { title: "Consent and the plan", type: "Decision making",
        prompts: ["Who can consent for Sam while he can't decide?", "What did you tell the EOC Clinician?", "How will you get the glucose into him without a struggle?", "What will you need to write down later?"],
        expected: [
          "Kirsty: a domestic partner is second in the CTL-067 order of Person Responsible (no guardian), with a close and continuing relationship, and she's here and willing",
          "BGL, behaviour, the VIRCA findings (C fails), who is here, and what you want to do",
          "Ask him to cough (a cough is a good indicator he can swallow the paste). Kirsty offers it. Small amounts. No force",
          "For an invalid refusal: clinical assessment, VIRCA, attempts to contact an SDM or PR (Kirsty, present), the EOC Clinician discussion, treatment, any restraint (none)"
        ],
        teaching: ["The plan for an invalid refusal comes from the EOC Clinician, State Duty Manager or Team Leader (CPP-056-AO)", "Oral glucose up to 15 g if he can swallow the paste (CPP-009-AO)"],
        realJob: "Often the person the patient trusts gets further than you will. Let Kirsty hand him the paste.",
        decisions: [
          { q: "Sam has no guardian and no Advance Care Directive. Who is the Person Responsible?", options: ["Jack, his son", "Kirsty, his partner", "The crew"], answer: 1,
            why: "CTL-067: a spouse or domestic partner (close, continuing relationship, available and willing) comes after a SACAT-appointed guardian. Jack is 9, not an adult." },
          { q: "The refusal is invalid. Whose plan do you follow?", options: ["The plan made with the EOC Clinician", "Your own: no call needed", "Kirsty's, whatever she says"], answer: 0,
            why: "CPP-056-AO: invalid refusal: deliver care as per plan formulated with the EOC Clinician, State Duty Manager or Team Leader." }],
        cards: [{ q: "You can't reach the EOC Clinician. Who do you consult?", a: "The State Duty Manager or Team Leader (CPP-056-AO)." }]
      } },
      { text: "1000. Sam coughs when Kirsty asks him to. He takes the oral glucose paste from her, a little at a time, grumbling. 15 g given.", muted: true }
    ] },

    { title: "He recovers", blocks: [
      { table: { title: "Observations", table: { head: ["", "0957", "1012", "1020"], rows: [
        ["BGL", "2.3 (own meter 0945)", "4.8", "6.4"], ["GCS", "14 (E4 V4 M6)", "15", "15"], ["HR", "112", "96", "88"], ["BP", "Pulled arm away", "130/80", "128/78"],
        ["RR", "20", "18", "16"], ["SpO2", "98% (air)", "98%", "99%"], ["Skin", "Pale, sweaty", "Less sweaty", "Warm, dry"], ["Behaviour", "Swearing, repeating questions", "Quiet, embarrassed", "Apologising, joking with Jack"]
      ] } } },
      { text: "1015. Kirsty makes him toast with peanut butter. He eats it. AO2 calls the EOC Clinician with the 1012 BGL. At 1020 Sam says: \"Sorry about before. I'm right now, honestly. I'm not going to hospital. I'm going to Jack's final.\"" },
      { breakpoint: { title: "Capacity has changed: VIRCA again", type: "Decision making",
        prompts: ["What has changed since 0955?", "CPP-009-AO says transport. Why is this now a refusal against advice?", "Go through every VIRCA letter with Sam now. What do you need to hear from him?", "Why is he refusing? Can you remove the barrier?"],
        expected: [
          "BGL 6.4, GCS 15, oriented, remembers what you said. His capacity may have returned: capacity can change over time",
          "The protocol says provide transport and notify the receiving facility; he is refusing that care (CPP-009-AO, CPP-056-AO)",
          "V: his own choice; Kirsty says she'd rather he went but it's up to him. I: tell him what you think happened, why the protocol says hospital, and the risks (it can come back while his insulin is still working: general teaching). R: he refuses transport only; he accepts more obs, another BGL and food. C: he explains it back in his own words, still has it 5 minutes later, weighs it against the final, and tells you clearly",
          "The cricket final at 1300. Offer options: Kirsty could take Jack while he goes. He still says no"
        ],
        teaching: ["Start VIRCA from the beginning: an earlier invalid refusal doesn't make a later refusal invalid", "Record any attempts to remove barriers (CTL-126)"],
        teachingNote: "The risk wording is general teaching, not protocol text.",
        realJob: "Ask him to tell you, in his own words, what could happen if he stays home. If he can, and still says no, that's his call to make, after the consult.",
        decisions: [
          { q: "Sam had no capacity 25 minutes ago. Does that mean his refusal now is invalid?", options: ["Yes: once invalid, always invalid today", "No: capacity can change over time. Reassess with VIRCA", "Yes, because his GCS was 14"], answer: 1,
            why: "CPP-056-AO: capacity can be whole, partial or absent, and can change dynamically over time. Reassess with the VIRCA tool." },
          { q: "What is Sam refusing, for R?", options: ["All care", "Transport to Tumby Bay Hospital; he accepts assessment, BGL checks and food", "Nothing yet"], answer: 1,
            why: "CTL-126: R Relevant: the decision and the assessment/treatment/transport being refused must be clearly specified." }]
      } }
    ] },

    { title: "The consult and his decision", blocks: [
      { text: "1025. AO2 calls the EOC Clinician again: BGL 6.4, GCS 15, has eaten, the VIRCA assessment, and that Sam is refusing transport. The EOC Clinician asks to speak to Sam." },
      { text: "In the scenario, the EOC Clinician explains the risks to Sam again. He still refuses. The EOC Clinician then says to the crew: \"I'm satisfied that's a valid refusal. Respect it. Leave him with someone: Kirsty is staying with him today. Advise him to keep eating, check his BGL more often today, and call 000 if he gets the warning signs again or Kirsty can't wake him properly. He should let his GP know about this one this week. Do the AMA form and leave him a copy.\" AO2 repeats it back.", muted: true },
      { breakpoint: { title: "The EOC Clinician call", type: "Practical skill",
        prompts: ["Make the call now, in pairs: one is AO2, one is the EOC Clinician.", "What do they need to hear about each VIRCA letter?", "He's still refusing after talking to the EOC Clinician. What now?"],
        expected: [
          "Who and where; the hypo, treatment and time; the trend (2.3, 4.8, 6.4); GCS 15; food eaten",
          "V his own decision, Kirsty not pushing; I what he was told; R transport only; C how he showed each part; the barrier and what you offered",
          "Still refusing after clinical support, and validity confirmed: comply with his wishes, offer advice, consider health services, AMA form, document, leave a copy (CPP-056-AO)"
        ],
        teaching: ["The consult is part of every pathway", "Repeat the EOC Clinician's advice back, and write it down"],
        realJob: "If the patient will talk to the EOC Clinician themselves, let them. Hearing it from someone else sometimes changes a mind, and if not, it confirms the decision.",
        decisions: [{ q: "Sam still refuses after the consult, and the EOC Clinician confirms it is valid. What does CPP-056-AO say?", options: [
          "Transport him anyway: the hypo protocol says transport",
          "Comply with his wishes, offer advice, consider health services, complete an AMA form",
          "Leave straight away without paperwork: he refused" ], answer: 1,
          why: "Valid refusal: comply with the patient's wishes; offer advice; consider internal or external health services; complete an AMA form; document; leave a copy with the patient." }]
      } }
    ] },

    { title: "Leaving safely", blocks: [
      { text: "1030 to 1050. AO1 goes through the AMA form with Sam and Kirsty. AO2 does a last set of obs and a BGL (6.6 at 1045) and writes the notes. Sam signs. A copy is left on the kitchen bench." },
      { breakpoint: { title: "Advice, the AMA form and the copy", type: "Discussion",
        prompts: ["What advice do you leave, and with whom?", "Which health services could support his safety?", "What goes with the AMA form, and where do the copies go?", "Any concerns about Jack?"],
        expected: [
          "Advice for his safety and comfort, to Sam and Kirsty: keep eating (complex carbohydrates, as CPP-009-AO suggests after recovery), the EOC Clinician's advice about BGL checks, the warning signs, and to call 000 again",
          "The protocol says consider internal or external health services. Here: Kirsty with him, and his GP this week (as the EOC Clinician advised). Ask the EOC Clinician what else is available locally",
          "AMA form completed; VIRCA and the EOC Clinician discussion documented; a copy of all documentation left with Sam",
          "Jack is safe with Kirsty. If you had any concerns for a child's safety and wellbeing, they must be clinically escalated (CPP-056-AO)"
        ],
        teaching: ["\"A\" in VIRCA is advice for the patient AND the people with them", "Make it easy to call back: they haven't used up their help"],
        teachingNote: "The specific advice comes from the EOC Clinician in the story and from CPP-009-AO; the rest is general teaching.",
        realJob: "Say it, then check they understood it: ask Kirsty what she'd do if he got sweaty and muddled again this afternoon.",
        decisions: [{ q: "What does CPP-056-AO say to leave with the patient?", options: ["Nothing", "A copy of all documentation", "Only the BGL readings"], answer: 1,
          why: "CPP-056-AO: leave a copy of all documentation with the patient." }],
        cards: [{ q: "What is an AMA form?", a: "An Acknowledgement of Medical Advice form. CPP-056-AO says to complete one for every valid refusal against advice." }]
      } }
    ] },

    { title: "Clear, and the PCR", blocks: [
      { text: "1052. You clear from the scene, not transported. Back at the station, you finish the PCR." },
      { box: { title: "VIRCA on Sam's PCR (CTL-126 headings, DSY example wording)", items: [
        "V: Decision made by pt. Partner present, would prefer he went to hospital but says it is his decision. Nil pressure from others",
        "I: Explained ?hypoglycaemia after run + insulin with little breakfast; protocol advises transport + hospital review; risk of further hypo today while insulin active; told can call 000 again at any time",
        "R: Refuses transport to Tumby Bay Hospital. Accepts assessment, BGL checks, food",
        "C: At 1020 + 1025: explains in own words what happened + the risk, recalls it 5 min later, weighs it against son's cricket final, states decision clearly. Earlier (0955) unable to retain info, BGL 2.3: refusal invalid then. Offered for partner to take son to the final while he attends hospital: declined",
        "A: To pt + partner: eat now + regularly, check BGL more often today, partner to stay with him today, call 000 if sweaty/confused or hard to wake, see GP this week (EOC Clinician)"
      ] } },
      { breakpoint: { title: "Write the VIRCA lines", type: "Practical skill",
        prompts: ["Each person writes the five VIRCA lines for Sam.", "Did you write both refusals: the invalid one at 0955 and the valid one at 1020?", "What does the invalid part need on the PCR?"],
        expected: [
          "V, I, R, C and A as CTL-126 lists them, specific to Sam",
          "Yes: the capacity evidence at each time, and why the answer changed",
          "Clinical assessment, VIRCA, the attempts to contact an SDM or PR (Kirsty present and consented), the EOC Clinician discussion, treatment provided, and that no restraint was used (CPP-056-AO)"
        ],
        teaching: ["Be specific: \"pt informed of risks\" proves nothing. Write what you said", "The AMA form and the EOC Clinician details are part of the record"],
        realJob: "If this job is ever reviewed, the PCR is the only evidence of how you decided. Write it as if someone will read it.",
        decisions: [{ q: "Which is the best R line for Sam?", options: ["\"Pt refused\"", "\"Refuses transport to Tumby Bay Hospital. Accepts assessment, BGL checks and food\"", "\"Pt informed of risks\""], answer: 1,
          why: "CTL-126: R Relevant: record precisely the assessment and/or treatment and/or transport options that the patient has refused." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "When did you first decide his refusal was invalid, and what was your evidence?",
        "How did it feel to give glucose to someone who had told you to get out?",
        "What made the second refusal valid? Which part of capacity was hardest to show?",
        "Did you find out why he was refusing? Did you try to remove the barrier?",
        "How did the EOC Clinician calls go?",
        "Would your PCR stand up if this job were reviewed tomorrow?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Every refusal: VIRCA, then consult the EOC Clinician (State Duty Manager or Team Leader if you can't reach them)",
        "Capacity is about this decision, can change over time, and is not the GCS",
        "Invalid: care as per the plan made with the EOC Clinician; who can consent is on CTL-067",
        "Valid and still refusing after clinical support: comply, advise, consider health services, AMA form, document, leave a copy",
        "Can't tell, urgent, and no one to ask: stabilise, reassess VIRCA, then discuss"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. Alone at the boat ramp", text: "Sam is found alone in his car at the boat ramp by a passer-by, drowsy, sweaty and muddled, refusing to be touched. No phone, no ID, nobody to call. You believe he needs urgent care, you can't tell whether he has capacity, and you can't contact an ACD, SDM or PR: validity cannot be determined. Care aimed at stabilisation, reassess VIRCA, then discuss with the EOC Clinician once he's stabilised." } },
      { box: { title: "2. No answer from the EOC Clinician", text: "The EOC Clinician line is busy for some time while Sam is refusing. CPP-056-AO: consult the State Duty Manager or Team Leader. Who is your Team Leader today, and how do you reach them?" } },
      { box: { title: "3. \"He's not going\"", text: "After recovery, Sam's brother arrives and keeps saying \"Hospital's a waste of a Saturday, mate, you're fine.\" Sam starts to agree. Is the decision voluntary? Talk to Sam on his own, then repeat VIRCA." } },
      { box: { title: "4. He won't take the paste", text: "At 1000 Sam spits the paste out and pushes Kirsty away. You can't give oral glucose. Call the EOC Clinician back, as the plan said (CPP-009-AO: if oral glucose cannot be given or is ineffective, consult the EOC Clinician, who may advise IM glucagon). Document any restraint, if any is used." } },
      { box: { title: "5. Jack is 15", text: "The patient is Jack, aged 15, with type 1 diabetes, recovered after a hypo at cricket and refusing to go. Parents or guardians of children under 16 can refuse care of that child. Who do you need to talk to, and what if you have concerns for his safety?" } },
      { box: { title: "6. He changes his mind", text: "At 1048, with the form half done, Sam says \"Actually, maybe I should go.\" Stop the form. Consent is ongoing: transport to Tumby Bay Hospital and notify them, as CPP-009-AO says." } }
    ] }
  ]
};
