/* Anaphylaxis - AO walk-through scenario (David, 54, bee sting). Content only: the layout lives in
   /microlearning/shared/module.js. Rebuilt on 14 Oct 2026 from the original DSY scenario, which had been written from
   the paramedic guideline (CPG-004-P). It now follows SAAS CPP-003-AO Anaphylaxis - AO v3.0 (8 December 2016,
   exported 31.08.2026), CPPRO-011 Intramuscular Injection v1.0 (review date June 2020, now passed), CPPRO-008
   Medication Checks v1.0 and CPP-004-AO Basic Care and Life Support - AO. Points from the DSY lead instructor, not
   protocol text, are labelled: an expired auto-injector is used straight away if the patient looks really sick, then
   the EOC Clinician's directions are followed; the Red Kit carries adrenaline 1000 microg in 1 mL; adequate
   oxygenation means SpO2 above 94%. The story, scene, observations, crew roles, timings and EOC Clinician replies are
   a training scenario written by DSY. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Anaphylaxis - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "David, 54: bee sting, known allergy and an expired EpiPen, 1430",
  lead: "A severe anaphylaxis call for a two-person volunteer AO crew, with eight break points for discussion, skills practice and decisions. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 75,

  protocol: {
    code: "CPP-003-AO", name: "Anaphylaxis - AO", version: "v3.0 (8 December 2016)", exported: "31 August 2026",
    also: [{ code: "CPPRO-011", name: "Intramuscular Injection (and EpiPen)", version: "v1.0 (5 July 2017, review date June 2020)" },
           { code: "CPPRO-008", name: "Medication Checks", version: "v1.0 (5 July 2017)" }]
  },
  footerNotes: ["The patient, story, observations and EOC Clinician replies are a training scenario written by DSY. Points marked \"DSY lead instructor\" are local guidance, not protocol text. Check it with your lead instructor.",
    "CPPRO-011 is past its review date (June 2020). Check the SAAS Clinical app for any newer version."],

  panels: [
    { title: "Overview", blocks: [
      { text: "A 54 year old man with a known bee allergy has been stung in his garden at a rural property. His breathing is getting worse, he has taken an antihistamine tablet, and his EpiPen expired last year." },
      { box: { title: "Learning objectives", items: [
        "Recognise suspected anaphylaxis and the features that start the adrenaline pathway in CPP-003-AO",
        "Position the patient: flat unless breathing is difficult, never standing or walking",
        "Use the patient's auto-injector as a priority, including an expired one when the patient is really sick and there is no alternative",
        "Consult the EOC Clinician early, repeat their advice back, and give IM adrenaline 10 microg/kg (single maximum 500 microg) when advised",
        "Give an IM injection and use an EpiPen as in CPPRO-011, with the medication checks in CPPRO-008",
        "Request clinical support, reassess, and transport every patient",
        "Deliver an ISBAR handover"
      ] } },
      { box: { title: "Required equipment", items: [
        "Red Kit: adrenaline 1000 microg in 1 mL (DSY lead instructor), syringes, IM needles, alcohol swabs, gauze",
        "Sharps container",
        "Corpuls3 monitor, oxygen (nasal cannula and masks), suction, OPA and NPA, BVM",
        "PPE, stretcher, green carry chair, blanket, ePCR tablet"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 45 to 55 minutes; debrief 10 to 15 minutes",
        "Response time to scene: 12 minutes",
        "Paramedic backup: about 40 minutes",
        "Nearest hospital: about 25 minutes",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, assessment, positioning, the auto-injector and IM adrenaline, clinical decisions",
        "Driver (AO2): calls the EOC Clinician as soon as possible, requests clinical support, Corpuls3 and observations, oxygen, equipment"
      ] } }
    ] },

    { title: "Pre-brief: the AO anaphylaxis protocol", blocks: [
      { text: "About 10 minutes. Read this together before the scenario." },
      { box: { title: "Adrenaline pathway (CPP-003-AO)", tone: "warn", items: [
        "Anaphylaxis suspected AND any one of: hypotension; severe bronchospasm; severe respiratory distress due to angioedema (airway swelling)"
      ] } },
      { steps: [
        { t: "Basic care and life support", text: "Lay the person flat, unless their breathing is difficult. Do not allow them to stand or walk." },
        { t: "Remove the allergen or trigger if possible" },
        { t: "Request clinical support" },
        { t: "Follow the patient's anaphylaxis plan", text: "If it is immediately available." },
        { t: "Use the prescribed adrenaline auto-injector as a priority", text: "For example an EpiPen." },
        { t: "No auto-injector: consult the EOC Clinician", text: "Who may advise IM adrenaline 10 microg/kg (single maximum dose 500 microg), and further doses if required." },
        { t: "Continue basic care" },
        { t: "Provide prompt transport", text: "And notify the receiving facility." }
      ] },
      { box: { title: "Signs of a severe allergic reaction (CPP-003-AO)", items: [
        "Difficult or noisy breathing", "Swelling of the tongue", "Swelling or tightness in the throat",
        "Difficulty talking and/or a hoarse voice", "Wheeze or persistent cough", "Persistent dizziness or collapse", "Pale and floppy (young children)"
      ] } },
      { box: { title: "Also in the protocol", items: [
        "Known asthma plus an allergy to food, insects or medication, with sudden breathing difficulty: treat for anaphylaxis before any asthma medication",
        "Severe anaphylaxis often presents with hypotension, bronchospasm and angioedema: focus on oxygenation, posture and early adrenaline",
        "All patients with allergy or anaphylaxis are transported, however well they seem after treatment"
      ] } },
      { box: { title: "DSY lead instructor guidance (not protocol text)", items: [
        "Expired auto-injector: if the patient looks really sick, use it immediately. The driver calls the EOC Clinician as soon as possible, and the crew then follows their directions. CPPRO-011 supports giving an expired EpiPen in a life-threatening situation when there is no other alternative, and it must be handed over, recorded and reported",
        "The Red Kit carries adrenaline 1000 microg in 1 mL, so 500 microg is 0.5 mL",
        "Adequate oxygenation: SpO2 above 94%; add oxygen to bring it above 94%"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "An antihistamine tablet does not treat anaphylaxis: don't let it delay adrenaline",
        "A patient who is sitting up and talking can still deteriorate quickly",
        "Symptoms can come back after treatment, which is one reason everyone goes to hospital"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "Saturday, 1430, late spring. Your pagers go off. The property is 12 minutes from the station." },
      { box: { title: "MDT display", items: [
        "Priority 1, allergic reaction, difficulty breathing",
        "54 year old male, stung by a bee. Known bee allergy",
        "Increasing difficulty breathing. Has an EpiPen but has not used it",
        "Caller: wife, on scene"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What are you thinking as you read the MDT?", "He has an EpiPen but hasn't used it. What do you want to know?", "What kit is grab-and-go?", "Who does what on arrival, and who makes the calls?"],
        expected: [
          "Bee sting, known allergy, increasing breathing difficulty: suspect anaphylaxis",
          "Find out why the EpiPen hasn't been used: expired, can't find it, too frightened?",
          "Kit: Red Kit (adrenaline, syringes, needles), Corpuls3, oxygen, suction, airway kit, BVM",
          "Clinician: patient, positioning, auto-injector and adrenaline. Driver: the EOC Clinician call as soon as possible, clinical support, monitor and oxygen"
        ],
        teaching: ["Agree before you arrive who calls the EOC Clinician: in this crew it's the driver, so the clinician stays with the patient", "Request clinical support early (protocol)"],
        realJob: "Use the 12-minute drive. Know where the adrenaline is in the Red Kit, and agree who makes the calls before you pull up.",
        decisions: [{ q: "Under CPP-003-AO, what is the first choice for adrenaline?", options: [
          "IM adrenaline from the Red Kit, on the crew's own decision",
          "The patient's prescribed adrenaline auto-injector",
          "An antihistamine first, then adrenaline if it doesn't work" ], answer: 1,
          why: "CPP-003-AO: use the prescribed adrenaline auto-injector (for example an EpiPen) as a priority. If none is available, consult the EOC Clinician, who may advise IM adrenaline." }],
        cards: [{ q: "Which three features, with suspected anaphylaxis, start the adrenaline pathway?", a: "Hypotension; severe bronchospasm; severe respiratory distress due to angioedema (airway swelling)." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "1442. His wife meets you at the gate and leads you to the back garden. A man sits on a garden chair, leaning forward: red blotchy skin on his arms and neck, a swollen face around the eyes and lips, working hard to breathe, with an audible wheeze. Conscious but anxious." },
      { text: "\"He was stung about 15 minutes ago. He took an antihistamine tablet but it's getting worse. His EpiPen expired last year and he never replaced it.\" She holds it out." },
      { breakpoint: { title: "First impression", type: "Discussion",
        prompts: ["Sick or not sick?", "What tells you this is anaphylaxis and not a mild allergy?", "What is your immediate priority?", "Any scene safety concerns?"],
        expected: [
          "Sick",
          "Swollen face and lips, hives, wheeze and hard work of breathing after a sting in a man with a known allergy: suspected anaphylaxis",
          "Signs of a severe reaction: difficult, noisy breathing and wheeze (CPP-003-AO)",
          "Priority: adrenaline. The only auto-injector is expired; he looks really sick, so use it now (DSY lead instructor), and the driver calls the EOC Clinician",
          "Scene: check for more bees; remove the stinger if still in by scraping sideways, not squeezing (CPP-008-AO)"
        ],
        teaching: ["Being upright and talking does not mean he is safe", "The antihistamine has not treated the anaphylaxis (general teaching)"],
        realJob: "Your first look should take seconds. If it looks like anaphylaxis and the trigger fits, act.",
        decisions: [{ q: "He looks really sick and the only auto-injector expired last year. What does the clinician do?", options: [
          "Don't use it: it's expired",
          "Use it now, while the driver calls the EOC Clinician",
          "Wait for the EOC Clinician before doing anything" ], answer: 1,
          why: "CPPRO-011: an expired EpiPen should be given in a life-threatening situation if there is no other alternative. DSY lead instructor: if the patient looks really sick, use it immediately; the driver calls the EOC Clinician as soon as possible and the crew follows their directions." }]
      } }
    ] },

    { title: "Patient contact and primary survey", blocks: [
      { table: { title: "Primary survey", table: { head: ["", "Finding"], rows: [
        ["D", "No danger. Stinger removed by his wife."],
        ["R", "Responsive, anxious, short sentences."],
        ["A", "Patent, but his voice is becoming hoarse."],
        ["B", "RR 28, wheeze both sides, accessory muscles, SpO2 93% on air."],
        ["C", "HR 118, warm and flushed, radial pulse thready, capillary refill 3 seconds."],
        ["D", "GCS 15, pupils equal and reactive, BGL 7.2."]
      ] } } },
      { table: { title: "Corpuls3 observations (1445)", table: { head: ["HR", "BP", "SpO2", "RR", "Temp", "ECG"], rows: [["118", "92/58", "93% (air)", "28", "36.8", "Sinus tachycardia"]] } } },
      { breakpoint: { title: "Primary survey and observations", type: "Practical skill",
        prompts: ["Talk through your primary survey.", "Which of the protocol's adrenaline features does he have?", "What does the hoarse voice tell you?", "How do you position him?", "Is his oxygenation adequate?"],
        expected: [
          "Hypotension (92/58) and severe bronchospasm (wheeze, accessory muscles): two of the features, one is enough",
          "Hoarse voice is a sign of a severe reaction (CPP-003-AO): airway swelling may be developing",
          "Position: lay flat unless breathing is difficult. His breathing is difficult, so don't force him flat; never let him stand or walk",
          "SpO2 93%: add oxygen to bring it above 94% (DSY lead instructor)",
          "Don't delay adrenaline to finish the observations"
        ],
        teaching: ["The driver puts the monitor on while the clinician treats", "Count the respiratory rate and feel the pulse yourself"],
        teachingNote: "General teaching, from the scenario.",
        realJob: "You may give adrenaline before you have full monitor readings. The clinical picture tells you what you need; the numbers confirm it.",
        decisions: [{ q: "He has low blood pressure but is struggling to breathe lying back. How do you position him?", options: [
          "Flat with his legs up, regardless",
          "As flat as his breathing allows; he must not stand or walk",
          "Standing, so he can breathe" ], answer: 1,
          why: "CPP-003-AO: lay the person flat, unless their breathing is difficult. Do not allow them to stand or walk." }]
      } }
    ] },

    { title: "Working diagnosis and the protocol", blocks: [
      { text: "Working diagnosis: severe anaphylaxis after a bee sting, with hypotension, bronchospasm, facial swelling and a hoarse voice." },
      { breakpoint: { title: "Protocol and working diagnosis", type: "Decision making",
        prompts: ["What is your working diagnosis, and how did you reach it?", "Which protocol applies?", "Could this be anything else?", "What if he also had known asthma? Does that change the order?"],
        expected: [
          "Suspected anaphylaxis with hypotension and severe bronchospasm: the adrenaline pathway in CPP-003-AO",
          "Differentials (asthma, fainting, panic) don't explain the swelling, hives and low BP after a sting (general teaching)",
          "If he also had known asthma: with an allergy and sudden breathing difficulty, treat for anaphylaxis before any asthma medication (CPP-003-AO)"
        ],
        teaching: ["You don't need certainty: suspected anaphylaxis with one of the three features is the trigger", "Write your reasoning on the ePCR"],
        realJob: "Pattern recognition matters. If it looks like anaphylaxis and the trigger fits, follow the pathway.",
        decisions: [
          { q: "No working auto-injector was available at all. What does the protocol say?", options: [
            "Give 500 microg IM from the Red Kit on your own decision",
            "Consult the EOC Clinician, who may advise IM adrenaline 10 microg/kg (single maximum 500 microg)",
            "Give the antihistamine and transport" ], answer: 1,
            why: "CPP-003-AO: if the auto-injector is unavailable, consult the EOC Clinician, who may advise IM adrenaline 10 microg/kg, single maximum dose 500 microg, with further doses if required." },
          { q: "David weighs about 85 kg. What IM adrenaline dose could the EOC Clinician advise?", options: ["850 microg", "500 microg", "85 microg"], answer: 1,
            why: "10 microg/kg x 85 kg = 850 microg, above the single maximum dose of 500 microg, so 500 microg applies." }],
        cards: [{ q: "Asthma plus an allergy, sudden breathing difficulty: what comes first?", a: "Treat for anaphylaxis before any asthma medication (CPP-003-AO)." }]
      } },
      { box: { title: "Clinical decision point", tone: "warn", items: [
        "Suspected anaphylaxis with hypotension and severe bronchospasm",
        "Expired EpiPen now: he looks really sick and there is no other auto-injector",
        "Driver: EOC Clinician as soon as possible, and request clinical support",
        "As flat as his breathing allows; no standing or walking; oxygen to bring SpO2 above 94%",
        "Further adrenaline as directed by the EOC Clinician",
        "Prompt transport and notify the receiving facility"
      ] } }
    ] },

    { title: "Treatment phase", blocks: [
      { steps: [
        { t: "EpiPen (expired), 1444", text: "Mid anterior-lateral thigh, through clothing if needed. Blue cap off, orange end firmly against the thigh until it clicks, hold 10 seconds or more, massage 10 seconds. Note the time." },
        { t: "Driver calls the EOC Clinician, 1444", text: "Also requests clinical support. In the scenario, the EOC Clinician says: \"Reassess at 5 minutes. If he isn't clearly improving, give IM adrenaline 500 microg from the Red Kit.\" The driver repeats it back." },
        { t: "Oxygen and position", text: "Oxygen to bring SpO2 above 94%. As flat as his breathing allows." },
        { t: "Prepare the next dose", text: "Draw up and check, ready for the EOC Clinician's direction." }
      ] },
      { box: { title: "IM adrenaline from the Red Kit (CPPRO-011)", tiles: true, steps: [
        { t: "Checks", text: "Medication checks with your partner: adrenaline, 1000 microg in 1 mL, intact and in date, dose 500 microg (CPPRO-008). Repeat the EOC Clinician's advice back." },
        { t: "Draw up", text: "0.5 mL as a single dose. Prime the syringe and needle with no air bubbles. Whoever draws it up ideally gives it." },
        { t: "Consent and allergies", text: "Explain and gain consent where the urgency allows. Check allergies." },
        { t: "Site", text: "Mid anterior-lateral thigh (vastus lateralis). Avoid the side of the thigh. Clean with an alcohol swab and let it dry." },
        { t: "Inject", text: "Like a dart, 90 degrees, about 2/3 of the needle length. Inject slowly. No need to draw back on the plunger." },
        { t: "Finish", text: "Withdraw in one motion, straight into the sharps container, no recapping. Gentle pressure. Record the dose and time; the EOC Clinician signs for advised entries." }
      ] } },
      { breakpoint: { title: "Adrenaline and medication safety", type: "Practical skill",
        prompts: ["Talk through using his EpiPen.", "What must happen because it was expired?", "Draw up 500 microg from the Red Kit: what do you check, and what volume?", "Where exactly do you inject, and do you draw back?"],
        expected: [
          "EpiPen: mid anterior-lateral thigh, through clothing if needed, click, hold 10 seconds or more, massage 10 seconds (CPPRO-011)",
          "Expired EpiPen: hand it over, record it on the patient record, and report it into the safety learning system (CPPRO-011)",
          "Red Kit adrenaline 1000 microg in 1 mL: 500 microg is 0.5 mL (DSY lead instructor). Check with your partner (CPPRO-008)",
          "Mid anterior-lateral thigh; no need to aspirate (CPPRO-011)",
          "Further doses as directed by the EOC Clinician, repeated back"
        ],
        teaching: ["Say each check out loud: drug, strength, dose, volume, expiry", "Note every time: you will need them for the EOC Clinician and the handover"],
        realJob: "You may give this in a back garden, a car park or a restaurant. Practise until the checks and the technique are automatic.",
        decisions: [{ q: "The EOC Clinician advises IM adrenaline 500 microg. The Red Kit ampoule is 1000 microg in 1 mL. What volume?", options: ["0.05 mL", "0.5 mL", "5 mL"], answer: 1,
          why: "1000 microg in 1 mL, so 500 microg is 0.5 mL. Check it with your partner (CPPRO-008) and repeat the advice back." }],
        cards: [{ q: "After the EpiPen clicks, how long do you hold it?", a: "10 seconds or more, then gently massage the site for 10 seconds (CPPRO-011)." }]
      } }
    ] },

    { title: "Reassessment and escalation", blocks: [
      { table: { title: "Observations", table: { head: ["", "1445", "1449 (5 min after EpiPen)"], rows: [
        ["HR", "118", "108"], ["BP", "92/58", "96/62"], ["SpO2", "93% (air)", "96% (oxygen)"], ["RR", "28", "24"],
        ["Wheeze", "Loud", "Improving, still present"], ["Voice", "Hoarse", "Still hoarse, not worse"], ["Swelling and hives", "Present", "Unchanged"]
      ] } } },
      { text: "\"Slightly better.\" Following the EOC Clinician's direction, the clinician gives IM adrenaline 500 microg (0.5 mL) to the other thigh at 1450, and the driver updates the EOC Clinician.", muted: true },
      { breakpoint: { title: "Reassessment and escalation decision", type: "Decision making",
        prompts: ["Is the adrenaline working?", "What decides the second dose here?", "What do you tell the EOC Clinician?", "Do you wait on scene for a full response?"],
        expected: [
          "Partial response: still hypotensive, wheeze and hoarse voice persisting",
          "The EOC Clinician's direction: reassess at 5 minutes and give 500 microg if not clearly improving",
          "Update: response so far, current obs, time of each dose, airway signs",
          "No: prompt transport (CPP-003-AO). Keep reassessing on the way"
        ],
        teaching: ["Partial response is not resolution", "Further doses come from the EOC Clinician when no working auto-injector was available"],
        realJob: "\"Improving but not fixed\" means keep treating and get moving. The EOC Clinician is your safety net: keep them updated.",
        decisions: [{ q: "Five minutes after the EpiPen he is only slightly better. What guides the next dose?", options: [
          "Repeat every 5 minutes on your own decision",
          "The EOC Clinician's direction: here, IM adrenaline 500 microg if not clearly improving",
          "No more adrenaline: one dose is the limit" ], answer: 1,
          why: "CPP-003-AO: the EOC Clinician may advise IM adrenaline 10 microg/kg (single max 500 microg) and further doses if required. Follow their direction and repeat it back." }]
      } }
    ] },

    { title: "Extrication and transport", blocks: [
      { table: { title: "Observations after the second dose (1455)", table: { head: ["HR", "BP", "SpO2", "RR", "Wheeze", "Voice"], rows: [["96", "104/68", "97% (oxygen)", "20", "Resolving", "Slightly husky, improving"]] } } },
      { text: "In the scenario, the EOC Clinician advises prompt transport to the nearest hospital, notify them, and call back with any deterioration.", muted: true },
      { breakpoint: { title: "Extrication and transport planning", type: "Practical skill",
        prompts: ["How do you get him to the ambulance?", "How is he positioned on the stretcher?", "What do you have ready for the trip?", "What could go wrong?"],
        expected: [
          "He does not stand or walk (CPP-003-AO): carry chair or stretcher to him",
          "As flat as his breathing allows",
          "Oxygen, Corpuls3, suction, airway kit and BVM within reach; Red Kit adrenaline ready if the EOC Clinician directs a further dose",
          "Symptoms can return: if he deteriorates, update the EOC Clinician straight away",
          "Notify the receiving facility (CPP-003-AO)",
          "If he becomes unresponsive with absent or abnormal breathing: commence resuscitation (CPP-004-AO)"
        ],
        teaching: ["\"Better on scene\" doesn't mean better for the whole trip", "Keep him warm and reassessing (general teaching)"],
        realJob: "Rural transport is long. Have the next dose drawn up and the EOC Clinician's number ready.",
        decisions: [{ q: "He feels much better and wants to walk to the ambulance. What do you say?", options: [
          "Fine, he's improved",
          "No: he does not stand or walk",
          "He can walk if someone holds his arm" ], answer: 1,
          why: "CPP-003-AO: do not allow them to stand or walk." }],
        cards: [{ q: "He has fully recovered after treatment. Does he still go to hospital?", a: "Yes. All patients with allergy and anaphylaxis are transported, regardless of apparent recovery (CPP-003-AO)." }]
      } }
    ] },

    { title: "Handover", blocks: [
      { table: { title: "ISBAR", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Officer from [station]. This is David Collins, 54.\""],
        ["S", "\"Anaphylaxis after a bee sting at about 1427: hypotension, bronchospasm, facial swelling and a hoarse voice.\""],
        ["B", "\"Known bee allergy. Took an oral antihistamine. His EpiPen was expired. No other history or regular medications. No known drug allergies.\""],
        ["A", "\"On arrival HR 118, BP 92/58, SpO2 93% on air, RR 28, wheeze, hoarse voice. His expired EpiPen at 1444, then IM adrenaline 500 microg at 1450 as advised by the EOC Clinician. Now HR 96, BP 104/68, SpO2 97% on oxygen, RR 20, wheeze resolving, voice still husky.\""],
        ["R", "\"Improving but the facial swelling hasn't changed and his voice is still husky. The expired EpiPen has been recorded and will be reported. EOC Clinician consulted.\""]
      ] } } },
      { breakpoint: { title: "ISBAR handover", type: "Practical skill",
        prompts: ["Deliver the handover now; your partner fills any gaps.", "Did you give every dose with the time, and who advised it?", "Did you mention the expired EpiPen?"],
        expected: ["Every adrenaline dose with time, route and site", "The expired EpiPen stated (CPPRO-011)", "EOC Clinician advice included", "Ongoing concerns: swelling, voice"],
        teaching: ["Write the times on your glove or a notepad as you go", "Say what still worries you"],
        realJob: "A clear handover with times and doses means the hospital team knows exactly what he has had.",
        decisions: [{ q: "Which must be included in the handover because of CPPRO-011?", options: ["That the EpiPen used was expired", "The colour of the EpiPen", "Where he bought the EpiPen"], answer: 0,
          why: "CPPRO-011: if an expired or discoloured EpiPen is given, it must be in the clinical handover, recorded on the patient clinical record and reported into the safety learning system." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "How did you decide this was anaphylaxis and not a mild allergy?",
        "Was there any moment you hesitated over the expired EpiPen? Why?",
        "How quickly did the driver reach the EOC Clinician? Did you request clinical support?",
        "How did you position him, given his blood pressure and his breathing?",
        "Did the 5-minute reassessment change the plan?",
        "Was the handover complete, with every dose and time?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "Suspected anaphylaxis plus hypotension, severe bronchospasm or airway swelling: the adrenaline pathway",
        "The patient's auto-injector first. Really sick and only an expired one: use it, and call the EOC Clinician",
        "No auto-injector: the EOC Clinician may advise IM adrenaline 10 microg/kg, single maximum 500 microg",
        "Flat unless breathing is difficult; never stand or walk",
        "Request clinical support; everyone goes to hospital, however well they seem",
        "Known asthma plus an allergy with sudden breathing difficulty: anaphylaxis first"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. Child at a party", text: "A 6 year old (about 20 kg) with a peanut allergy has eaten cake: facial swelling, hives, wheeze and repeated vomiting. No EpiPen at the party. Consult the EOC Clinician, who may advise IM adrenaline 10 microg/kg: 200 microg, which is 0.2 mL of the Red Kit's 1000 microg in 1 mL. Discuss estimating weight, checking the volume with your partner, and the parents." } },
      { box: { title: "2. No known allergy", text: "A 38 year old in a restaurant: hives, throat tightness and a fast heart rate 20 minutes after eating. No allergy history and no auto-injector. Anaphylaxis can be a first reaction. Consult the EOC Clinician for adrenaline; request clinical support; transport." } },
      { box: { title: "3. Not responding", text: "Despite two doses he develops noisy breathing and his BP falls to 82/50. Update the EOC Clinician immediately and follow their directions; keep clinical support coming; prepare suction and the BVM. Discuss what the paramedic can add that AOs can't. If he becomes unresponsive with absent or abnormal breathing, commence resuscitation (CPP-004-AO)." } },
      { box: { title: "4. In-date EpiPen already used", text: "He used an in-date EpiPen before you arrived and improved, but the wheeze and hives are returning. Find out when he used it. Consult the EOC Clinician about further adrenaline, and transport: everyone goes to hospital regardless of apparent recovery." } }
    ] }
  ]
};
