/* Stroke - AO walk-through scenario (Frank, 78, Coffin Bay). Content only: the layout lives in
   /microlearning/shared/module.js. Rebuilt on 14 Oct 2026 from the original DSY scenario (written to the earlier
   4-hour version) and checked against SAAS CPP-016-AO Stroke - AO v6.0 (25 June 2026, exported 31.08.2026) and the
   ROSIER+ACT Assessment Screening Tool CTL-066 (exported 31.08.2026). Local guidance from the DSY lead instructor is
   labelled: Code Stroke notification for Lower Eyre Peninsula crews is that the EOC Clinician may contact Port
   Lincoln Hospital and/or the crew notifies by GRN radio; adequate oxygenation means SpO2 above 94%. The story,
   scene, observations, crew roles, timings and EOC Clinician replies are a training scenario written by DSY. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Stroke - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Frank, 78: sudden weakness and slurred speech at morning tea, Coffin Bay",
  lead: "A time-critical stroke call for a two-person volunteer AO crew, with eight break points for discussion, skills practice and decisions. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 75,

  protocol: {
    code: "CPP-016-AO", name: "Stroke - AO", version: "v6.0 (25 June 2026)", exported: "31 August 2026",
    also: [{ code: "CTL-066", name: "ROSIER+ACT Assessment Screening Tool", version: "exported 31 August 2026" }]
  },
  footerNotes: ["The patient, story, observations and EOC Clinician replies are a training scenario written by DSY. Points marked \"DSY lead instructor\" are local guidance, not protocol text. Check it with your lead instructor."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 78 year old man dropped his cup at morning tea; his face drooped and his speech became slurred. His wife saw it happen about 45 minutes before you reach him. Port Lincoln Hospital, a Stroke Thrombolysis Service (STS), is about 35 minutes away." },
      { box: { title: "Learning objectives", items: [
        "Measure the BGL first and treat hypoglycaemia before the stroke assessment",
        "Complete a ROSIER and ACT assessment (CTL-066) and interpret them",
        "Apply the CPP-016-AO v6.0 Code Stroke criteria, including the 9-hour window",
        "Consult the EOC Clinician for authorisation to transport directly to the closest CSU/STS",
        "Request clinical support when transport is likely to be over 20 minutes",
        "Obtain patient ID and a contact for the substitute decision maker, relative or carer",
        "Notify Code Stroke using ISBAR and confirm arrival by SAGRN"
      ] } },
      { box: { title: "Required equipment", items: [
        "Ambulance response bag, Corpuls3 monitor",
        "BGL meter, lancets, strips",
        "Oxygen (nasal cannula and masks), suction",
        "ROSIER+ACT card (CTL-066), ePCR tablet, phone",
        "Green carry chair, stretcher, pillows, blankets, PPE"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 45 to 55 minutes; debrief 10 to 15 minutes",
        "Port Lincoln Hospital (STS): about 35 minutes",
        "Paramedic backup: about 40 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, history from Margaret, ROSIER and ACT, clinical decisions, EOC Clinician consult",
        "Driver (AO2): Corpuls3, BGL, observations, equipment, carry chair and stretcher, GRN radio notification"
      ] } }
    ] },

    { title: "Pre-brief: the AO stroke protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario. Version 6.0 extended the Code Stroke window from 4 to 9 hours." },
      { steps: [
        { t: "Basic care" },
        { t: "Measure the BGL", text: "If below 3.5 mmol/L, treat as per Hypoglycaemia CPP-009-AO and reassess after treatment." },
        { t: "ROSIER assessment", text: "With a thorough history and clinical assessment. CTL-066 adds the ACT assessment." }
      ] },
      { table: { title: "ROSIER (CTL-066)", text: "Symptom onset OR last seen well: date and time. New acute means under 24 hours.", table: { head: ["Item", "Yes", "No"], rows: [
        ["Loss of consciousness or syncope (not relating to seizure activity)", "-1", "0"],
        ["Seizure activity and a known history of seizures", "-1", "0"],
        ["New acute asymmetric facial weakness", "+1", "0"],
        ["New acute asymmetric arm weakness", "+1", "0"],
        ["New acute asymmetric leg weakness", "+1", "0"],
        ["New acute speech disturbance", "+1", "0"],
        ["New acute visual field defect", "+1", "0"]
      ] } } },
      { box: { title: "ACT (CTL-066)", items: [
        "Arm: single arm drops within 10 seconds (right or left)",
        "Chat: severe language deficit, not just slurring: mute, gibberish, incomprehensible",
        "Tap: obvious gaze deviation of both eyes away from the weak side, or failure to turn to the weak side when tapped",
        "ACT positive: arm weakness AND chat or tap positive. ACT negative: no weakness in either arm",
        "ROSIER 1 or more with pre-morbid independence and BGL 3.5 or more: consider Code Stroke to a CSU or STS",
        "ROSIER 1 or more and ACT positive: consider transport to the RAH"
      ] } },
      { table: { title: "Code Stroke (CPP-016-AO v6.0)", table: { head: ["", "Criteria", "Action"], rows: [
        ["Eligible", "Stroke clinically suspected AND ROSIER positive AND independent pre-morbid functioning AND under 9 hrs from onset to CSU/STS arrival AND under 60 min travel", "Consult the EOC Clinician for authorisation to transport directly to the closest CSU/STS"],
        ["Eligible but far", "As above, but over 60 min travel", "Consult the EOC Clinician to discuss transport and destination"],
        ["Not eligible", "ROSIER negative, or over 9 hrs from onset, or diminished pre-morbid independence", "Closest CSU/STS, or nearest hospital, or consult the EOC Clinician"]
      ] } } },
      { box: { title: "Local process (DSY lead instructor)", items: [
        "Code Stroke notification: the EOC Clinician may contact Port Lincoln Hospital, and/or the crew notifies by GRN radio",
        "The protocol allows the SAAS Code Notification Line or local processes, using ISBAR, confirming the eligibility criteria and the ETA",
        "Adequate oxygenation: SpO2 above 94%; add oxygen to bring it above 94%"
      ] } },
      { box: { title: "General teaching (not in the AO stroke protocol)", tone: "warn", items: [
        "The AO stroke protocol gives no medications: this is an assessment, decision and transport job",
        "Aspirin is not part of the stroke protocol; the type of stroke can't be known before a CT scan",
        "Nil by mouth if swallowing may be affected; support the weak limbs",
        "Pin down the onset or last-seen-well time precisely: everything depends on it"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A weekday, mid-morning. You and your crew partner are paged to Coffin Bay." },
      { box: { title: "MDT display", items: [
        "Priority 2, possible stroke, 78 year old male",
        "Caller: wife, on scene, distressed",
        "Dropped his cup, face droopy on one side, can't speak properly. Started about 45 minutes ago at morning tea",
        "Conscious and breathing. No fall. No seizure",
        "History per caller: high blood pressure, heart tablets, diabetes",
        "Single-storey house, front door unlocked, no dogs"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What does the MDT suggest?", "Which protocol, and which version?", "What does the onset time mean for Code Stroke?", "Where is the closest CSU/STS, and how far?", "Who does what on arrival?"],
        expected: [
          "Suspected acute stroke: face, arm (dropped cup), speech",
          "CPP-016-AO v6.0: Code Stroke window is now under 9 hours from onset to CSU/STS arrival",
          "Port Lincoln Hospital is an STS, about 35 minutes: under 60 minutes travel",
          "BGL early: hypoglycaemia must be excluded; he has diabetes",
          "Transport will be over 20 minutes: plan to request clinical support",
          "Clinician: history and ROSIER/ACT. Driver: monitor, BGL, obs, carry chair and stretcher"
        ],
        teaching: ["Start thinking Code Stroke from the MDT", "Confirm and record the onset time precisely on scene"],
        realJob: "Rehearse ROSIER and ACT on the way and know your STS and its travel time before you arrive. You want to assess and move, not look things up on scene.",
        decisions: [{ q: "Under CPP-016-AO v6.0, what is the Code Stroke time window?", options: [
          "Under 4 hours from onset",
          "Under 9 hours from symptom onset to arrival at the CSU/STS",
          "Under 24 hours" ], answer: 1,
          why: "Version 6.0 (25 June 2026) extended Code Stroke eligibility for ROSIER positive patients to under 9 hours from symptom onset to CSU/STS arrival." }],
        cards: [{ q: "Which Eyre Peninsula hospitals are Stroke Thrombolysis Services?", a: "Port Lincoln, Whyalla and Port Augusta (CPP-016-AO)." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "Margaret waves you in from the front door: level entry, wide hallway to the kitchen. Frank sits at the kitchen table, eyes open, looking at you. A broken teacup lies on the floor to his right. The right side of his mouth droops, and his right arm slides off the table. He tries to greet you, but his words are slurred." },
      { breakpoint: { title: "Doorway, first impression", type: "Decision making",
        prompts: ["What is your impression from the doorway?", "Is he time critical?", "What are your first three things?", "Where should the stretcher go now?"],
        expected: [
          "Suspected acute stroke: right facial droop, right arm weakness, slurred speech",
          "Conscious and breathing: not immediately life threatening, but time critical",
          "First: BGL, ROSIER and ACT, and the exact onset time from Margaret",
          "Bring the stretcher and carry chair to the front door now, ready to move"
        ],
        teaching: ["The question quickly becomes \"is he eligible for Code Stroke, and how fast can we get him there?\""],
        teachingNote: "General teaching, from the scenario.",
        realJob: "Facial droop, a weak arm, slurred speech and a broken cup: stroke until proven otherwise. Pin down the time and get moving.",
        decisions: [{ q: "What must you measure before the ROSIER assessment?", options: ["Blood pressure", "BGL", "Temperature"], answer: 1,
          why: "CPP-016-AO: measure the BGL to exclude hypoglycaemia. If below 3.5 mmol/L, treat as per CPP-009-AO and reassess after treatment." }]
      } }
    ] },

    { title: "Patient contact and primary survey", blocks: [
      { box: { title: "History (Margaret)", items: [
        "\"We were having morning tea about 45 minutes ago. He went to pick up his cup and dropped it. Then his face looked funny, and I couldn't understand him.\" She is sure of the time",
        "No change since: not better, not worse",
        "Before today: fully independent. Drives, walks to the shops, manages his own tablets, mows the lawn",
        "History: hypertension, atrial fibrillation, type 2 diabetes",
        "Medications: warfarin, metoprolol, metformin, perindopril. No known allergies",
        "No seizure, no loss of consciousness, no fall, no head injury; no history of seizures"
      ] } },
      { table: { title: "Observations", table: { head: ["HR", "BP", "RR", "SpO2", "Temp", "GCS", "BGL"], rows: [["82, irregular", "172/94", "18", "96% (air)", "36.4", "14 (E4 V4 M6)", "6.2"]] } } },
      { breakpoint: { title: "Observations and BGL", type: "Practical skill",
        prompts: ["Driver: talk through the monitor and the BGL.", "Why is the BGL so important here?", "Does he need oxygen?", "What do the irregular pulse and his medications tell you?"],
        expected: [
          "BGL 6.2: 3.5 or more, so hypoglycaemia is excluded. Carry on to ROSIER (CPP-016-AO)",
          "SpO2 96% on air: above 94%, no oxygen needed (DSY lead instructor)",
          "Irregular pulse with AF on warfarin: important for the hospital (general teaching)",
          "Driver and clinician work in parallel to keep scene time short"
        ],
        teaching: ["Hypoglycaemia can look exactly like a stroke", "Raised BP is common in stroke; AOs have no treatment for it, so just record it"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "The monitor and the BGL happen while the clinician talks to Margaret. Nobody waits for anybody.",
        decisions: [{ q: "His BGL had been 2.8 mmol/L. What then?", options: [
          "Carry on with the ROSIER and Code Stroke",
          "Treat as per Hypoglycaemia CPP-009-AO, then reassess",
          "Ignore it: he looks like a stroke" ], answer: 1,
          why: "CPP-016-AO: if BGL is below 3.5 mmol/L, treat as per CPP-009-AO and reassess the patient after treatment." }]
      } }
    ] },

    { title: "ROSIER, ACT and Code Stroke", blocks: [
      { table: { title: "Frank's ROSIER", table: { head: ["Item", "Finding", "Score"], rows: [
        ["Loss of consciousness or syncope", "No", "0"],
        ["Seizure activity and known seizure history", "No", "0"],
        ["Facial weakness (new, under 24 hrs)", "Yes: right side of mouth", "+1"],
        ["Arm weakness", "Yes: right arm drifts down", "+1"],
        ["Leg weakness", "Yes: mild, right leg", "+1"],
        ["Speech disturbance", "Yes: slurred", "+1"],
        ["Visual field defect", "Can't reliably assess", "0"],
        ["Total", "", "+4"]
      ] } } },
      { table: { title: "Frank's ACT", table: { head: ["", "Finding"], rows: [
        ["Arm", "Right arm drops within 10 seconds: yes"],
        ["Chat", "Slurred but understandable; not mute or gibberish: no"],
        ["Tap", "No gaze deviation; turns to the right when tapped: no"],
        ["Result", "ACT negative (arm positive, but neither chat nor tap)"]
      ] } } },
      { breakpoint: { title: "Screening and the Code Stroke decision", type: "Decision making",
        prompts: ["Walk through Frank's ROSIER.", "Is his ACT positive?", "Does he meet every Code Stroke criterion?", "What do you do next?"],
        expected: [
          "ROSIER +4: positive",
          "ACT negative: right arm weak, but slurring is not a severe language deficit and there's no gaze deviation. So no RAH consideration",
          "Stroke clinically suspected; ROSIER positive; fully independent before; onset about 45 min ago plus about 15 min on scene and 35 min travel, well under 9 hours; travel 35 min, under 60",
          "Code Stroke: consult the EOC Clinician for authorisation to transport directly to Port Lincoln Hospital STS"
        ],
        teaching: ["\"New acute\" means under 24 hours, not left over from an old stroke (CTL-066)", "Ask directly: \"Was he fully independent before today?\"", "Work out onset to arrival, not just your scene time"],
        realJob: "This is where the job is won: the right score, the right criteria, the right destination. Everything after is execution.",
        decisions: [
          { q: "Frank's ROSIER is +4 and ACT is negative. Where does that point?", options: [
            "Code Stroke to the closest CSU/STS (Port Lincoln) if the other criteria are met",
            "Transport to the RAH",
            "Not a stroke" ], answer: 0,
            why: "CTL-066: ROSIER 1 or more with pre-morbid independence and BGL 3.5 or more, consider Code Stroke to a CSU or STS. RAH is considered only if ACT is positive." },
          { q: "Which is NOT a Code Stroke criterion in v6.0?", options: [
            "Under 60 minutes travel to the CSU/STS",
            "Under 4 hours from onset",
            "Independent pre-morbid functioning" ], answer: 1,
            why: "Version 6.0 uses under 9 hours from symptom onset to CSU/STS arrival. The 4-hour window no longer applies." }],
        cards: [{ q: "When is ACT positive?", a: "Arm weakness AND either Chat (severe language deficit) or Tap (obvious gaze deviation) positive (CTL-066)." }]
      } },
      { box: { title: "Clinical decision point", tone: "warn", items: [
        "BGL 6.2; ROSIER +4; ACT negative",
        "Code Stroke: all criteria met",
        "Consult the EOC Clinician for authorisation to go directly to Port Lincoln STS",
        "Request clinical support: transport is over 20 minutes",
        "Patient ID and Margaret's phone number confirmed",
        "Code Stroke notification and SAGRN arrival confirmation"
      ] } }
    ] },

    { title: "Treatment phase: the Code Stroke steps", blocks: [
      { box: { title: "Code Stroke (CPP-016-AO)", tiles: true, steps: [
        { t: "Consult the EOC Clinician", text: "For authorisation to transport directly to the closest CSU/STS for consideration for thrombolysis." },
        { t: "Request clinical support", text: "If the patient is unstable or transport is likely to be over 20 minutes." },
        { t: "Confirm details", text: "Patient identification, and phone contact for the substitute decision maker, close relative or carer." },
        { t: "Notify Code Stroke", text: "Using ISBAR, confirming the eligibility criteria and ETA. Locally: the EOC Clinician may contact Port Lincoln Hospital and/or the crew notifies by GRN radio." },
        { t: "Confirm arrival", text: "By SAGRN notification to the receiving hospital ED." }
      ] } },
      { box: { title: "Basic care while you prepare to move", items: [
        "Reassure Frank and Margaret; explain what is happening",
        "Support his right arm and leg",
        "Nil by mouth; position for comfort (general teaching)",
        "Ask Margaret to bring his medication list and her phone, and decide how she will get to Port Lincoln"
      ] } },
      { breakpoint: { title: "EOC Clinician consult and Code Stroke details", type: "Practical skill",
        prompts: ["Make the EOC Clinician call now.", "What details must you obtain before you leave?", "Who notifies the hospital, and how?", "What medications can you give Frank?"],
        expected: [
          "Call: age, onset time, ROSIER +4, ACT negative, BGL 6.2, independent before, AF on warfarin, 35 min to Port Lincoln; request authorisation for direct transport",
          "Patient ID and Margaret's phone number (protocol requirement)",
          "Notification: the EOC Clinician may contact Port Lincoln Hospital and/or the crew notifies by GRN (DSY lead instructor), by ISBAR with the eligibility criteria and ETA",
          "No medications: the AO stroke protocol has none"
        ],
        teaching: ["Mention warfarin: the hospital needs it", "Collect the details on scene, not in the ambulance"],
        realJob: "Low intervention, high decision. Your value is the assessment, the call and the destination.",
        decisions: [{ q: "Which details does CPP-016-AO say to obtain and confirm for a Code Stroke patient?", options: [
          "Patient ID and phone contact for the substitute decision maker, close relative or carer",
          "Only his Medicare card",
          "His GP's name" ], answer: 0,
          why: "CPP-016-AO: obtain and confirm patient identification details and telephone contact details of the substitute decision maker, or a close relative or carer." }]
      } },
      { text: "In the scenario, the EOC Clinician authorises direct transport to Port Lincoln Hospital, will contact the hospital, and asks the crew to request clinical support and confirm arrival by GRN.", muted: true }
    ] },

    { title: "Reassessment and escalation", blocks: [
      { table: { title: "Observations", table: { head: ["", "Initial", "5 min later"], rows: [
        ["HR", "82 irregular", "78 irregular"], ["BP", "172/94", "168/92"], ["RR", "18", "16"], ["SpO2", "96% (air)", "97% (air)"], ["GCS", "14", "14"], ["Deficits", "Face, arm, leg, speech", "Unchanged"]
      ] } } },
      { breakpoint: { title: "Reassessment and clinical support", type: "Decision making",
        prompts: ["What are you reassessing, and how often?", "He's stable. Do you still request clinical support?", "What would worry you?", "Do you wait for the paramedic?"],
        expected: [
          "Obs, GCS and the deficits, regularly; record any change",
          "Yes: transport is over 20 minutes (CPP-016-AO), even though he's stable",
          "Worry: falling GCS, vomiting, seizure, airway or breathing problems; consult the EOC Clinician",
          "Don't wait: clinical support can meet you en route or at the hospital (general teaching)"
        ],
        teaching: ["Stroke can change: keep comparing", "Clinical support doesn't mean waiting on scene"],
        realJob: "Thirty-five minutes of road: know what you are watching for and what you'll do if he vomits or his GCS drops.",
        decisions: [{ q: "Frank is stable, and Port Lincoln is 35 minutes away. Request clinical support?", options: [
          "No, he's stable",
          "Yes: transport is likely to be over 20 minutes",
          "Only if MedSTAR is free" ], answer: 1,
          why: "CPP-016-AO: when transporting a Code Stroke patient, request clinical support if the patient is unstable or transport times are likely to be over 20 minutes." }]
      } }
    ] },

    { title: "Extrication and transport", blocks: [
      { box: { title: "Extrication and transport", items: [
        "Carry chair from the kitchen; support the weak right side; he doesn't walk",
        "Stretcher at the front door; position for comfort, weak arm supported; blanket",
        "Corpuls3 on, suction within reach",
        "Margaret follows with his medication list and her phone",
        "Code Stroke notified (EOC Clinician and/or GRN); confirm arrival by SAGRN to the ED"
      ] } },
      { breakpoint: { title: "Extrication and transport planning", type: "Practical skill",
        prompts: ["How do you move Frank?", "Who notifies the hospital, and when?", "What do you watch for on the way?", "Ten minutes out, he vomits and his GCS drops. What now?"],
        expected: [
          "Carry chair, weak side supported, controlled and calm",
          "EOC Clinician may contact the hospital; crew GRN notification with eligibility criteria and ETA; SAGRN arrival confirmation (protocol and local process)",
          "Watch GCS, speech, weakness, breathing, vomiting",
          "If he vomits or GCS drops: protect the airway (side position, suction), oxygen to bring SpO2 above 94%, consult the EOC Clinician, update the hospital"
        ],
        teaching: ["A safe move beats a fast one: dropping him costs more time than 60 extra seconds", "Smooth driving (general teaching)"],
        teachingNote: "General teaching, from the scenario, except where a protocol is named.",
        realJob: "Margaret needs to know where to go and what to bring. Tell her before you leave the kitchen.",
        decisions: [{ q: "How is Code Stroke arrival confirmed to the receiving ED?", options: ["A text message", "SAGRN notification", "Nothing more is needed"], answer: 1,
          why: "CPP-016-AO: confirm Code Stroke arrival via SAGRN notification to the receiving hospital ED." }],
        cards: [{ q: "Code Stroke notification for Lower EP crews (local process)?", a: "The EOC Clinician may contact Port Lincoln Hospital, and/or the crew notifies by GRN radio, using ISBAR with the eligibility criteria and ETA." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"[Name], Ambulance Officer, SA Ambulance, Coffin Bay crew.\""],
        ["S", "\"Code Stroke: Frank [surname], 78. Witnessed onset at [time], about [X] minutes ago.\""],
        ["B", "\"AF on warfarin, hypertension, type 2 diabetes. Fully independent before today. Wife Margaret following, phone [number].\""],
        ["A", "\"ROSIER +4: right face, arm and leg weakness, slurred speech. ACT negative. BGL 6.2. GCS 14. HR 78 irregular, BP 168/92, SpO2 97% on air.\""],
        ["R", "\"Meets the Code Stroke criteria; EOC Clinician authorised direct transport. ETA [X] minutes.\""]
      ] } } },
      { breakpoint: { title: "ISBAR notification and handover", type: "Practical skill",
        prompts: ["Give the Code Stroke notification now, as you would on the GRN.", "What must it confirm?", "What does the stroke team need most?"],
        expected: ["The eligibility criteria and ETA (CPP-016-AO)", "The exact onset or last-seen-well time", "Warfarin", "Margaret's contact for the hospital", "A face-to-face ISBAR on arrival that matches"],
        teaching: ["Keep it under 90 seconds", "If you're not sure of the onset time, say so"],
        realJob: "A clear notification means the team and the scanner are ready when you arrive.",
        decisions: [{ q: "The Code Stroke notification must confirm:", options: ["The eligibility criteria and the ETA", "His blood pressure only", "The crew's names"], answer: 0,
          why: "CPP-016-AO: notify Code Stroke using ISBAR, including confirmation of the Code Stroke eligibility criteria and ETA." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "When did you first think Code Stroke, and what confirmed it?",
        "Why does the BGL come first?",
        "Walk through Frank's ROSIER and ACT from memory",
        "How did you confirm each Code Stroke criterion?",
        "How was the notification made, and by whom?",
        "If his onset had been 10 hours ago, what would change?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "BGL first: below 3.5, treat as per CPP-009-AO and reassess",
        "ROSIER and ACT (CTL-066), with a thorough history",
        "Code Stroke: suspected stroke, ROSIER positive, independent before, under 9 hours to arrival, under 60 minutes travel",
        "Consult the EOC Clinician for direct transport; over 60 minutes, discuss destination",
        "Request clinical support if unstable or transport over 20 minutes",
        "Patient ID and family contact; Code Stroke notification; SAGRN arrival confirmation"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. Wake-up stroke", text: "Margaret woke at 0630 and found Frank on the bathroom floor with right-sided weakness and slurred speech. He was last seen well at 2200. CTL-066 uses the last-seen-well time: by arrival it will be over 9 hours, so he is not eligible. Transport to the closest CSU/STS or nearest hospital, or consult the EOC Clinician for advice." } },
      { box: { title: "2. BGL 2.8", text: "Same presentation, but the BGL is 2.8 mmol/L (metformin, missed breakfast). Treat as per Hypoglycaemia CPP-009-AO and reassess. If the deficits resolve, it was a mimic; if they persist with a normal BGL, continue the ROSIER." } },
      { box: { title: "3. Deterioration en route", text: "Ten minutes into transport Frank vomits, his GCS falls to 10 and SpO2 to 91%. Side position and suction, oxygen to bring SpO2 above 94%, consult the EOC Clinician immediately, and update the hospital. Clinical support is now even more important." } },
      { box: { title: "4. ACT positive", text: "Frank can't get any words out and both eyes are turned to his left; his right arm drops within 10 seconds. ROSIER positive and ACT positive: CTL-066 says consider transport to the RAH, but from Coffin Bay that is far over 60 minutes. Consult the EOC Clinician to discuss transport and destination options." } }
    ] }
  ]
};
