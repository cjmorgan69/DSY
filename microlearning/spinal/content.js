/* Walked in, still not cleared - AO microlearning on spinal precautions. Content only: the layout lives in
   ../shared/module.js. Sources, protocols exported 31.08.2026:
   CPP-018-AO Spinal Injury - AO v5.0 (31 July 2020, no review date shown).
   CPPRO-021 Cervical Spine Immobilisation v1.2 (effective 4 Mar 2020; review date 4 Mar 2023 has passed).
   CPP-013-AO Pain Management - AO v7.2 (3 Dec 2025). CPP-047-AO Nausea and Vomiting - AO v2.3 (4 June 2025).
   CPPRO-001 Patient Mobility Assessment (suspected spinal injury = no mobility assessment), as in the falls module.
   Owner's choices (3 Nov 2026): the case is the owner's (ladder fall, about 2.8 m to the torso, onto decking, witnessed
   LOC about 2 minutes, walked inside, left hip pain, no neck or back pain, concussed with amnesia); patient 67; use the
   protocol's "fall from elevation over 1 m / 5 stairs" (not 1.5 m); modified towel roll, not a collar; SAAS wording only
   (no NEXUS or Canadian C-spine rule); AOs don't try to clear a C-spine when risk factors are present.
   SAAS has no AO head injury protocol. The case details (name, town, obs), the checker's scenarios, the chair-to-stretcher
   note and the practical are DSY-written for the owner to review. */

var M = window.MODULE = {
  flow: true,
  draft: false,
  title: "Walked in, still not cleared",
  subtitle: "Ambulance Officer microlearning",
  headline: "No neck pain isn't the end of the question",
  lead: "A fall from a ladder, a knock-out, and a patient sitting at the kitchen table who only wants to talk about his hip. This module works through why he still needs spinal precautions: the red flags in CPP-018-AO Spinal Injury, the self-extrication risk factors, choosing a technique (CPPRO-021), and his pain and nausea (CPP-013-AO, CPP-047-AO).",
  minutes: 20,

  protocol: {
    code: "CPP-018-AO", name: "Spinal Injury - AO", version: "v5.0 (31 July 2020)", exported: "31 August 2026",
    also: [
      { code: "CPPRO-021", name: "Cervical Spine Immobilisation", version: "v1.2 (4 March 2020)" },
      { code: "CPP-013-AO", name: "Pain Management - AO", version: "v7.2" },
      { code: "CPP-047-AO", name: "Nausea and Vomiting - AO", version: "v2.3" }
    ]
  },
  relatedCodes: ["CPP-013-AO", "CPP-047-AO"],
  footerNotes: [
    "CPPRO-021 Cervical Spine Immobilisation v1.2 passed its review date (4 March 2023). CPP-018-AO v5.0 (July 2020) shows no review date. Check the SAAS Clinical app for newer versions.",
    "SAAS has no AO head injury protocol. This module uses CPP-018-AO, CPPRO-021, CPP-013-AO and CPP-047-AO only.",
    "The case (Neil), the checker scenarios, the chair-to-stretcher note, the practical and the notes marked \"DSY\" were written for training and should be checked by your lead instructor."
  ],

  session: {
    intro: "For a team-led session. Allow about 30 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Read the job", time: "3 min", text: "Before scrolling on, everyone says yes or no: does Neil need spinal precautions? Why?" },
      { t: "The red flags", time: "7 min", text: "Find each of Neil's red flags in CPP-018-AO. Ask: which ones are about the mechanism, and which are about Neil himself?" },
      { t: "He already walked", time: "5 min", text: "Count Neil's self-extrication risk factors. Ask: what do you say to the family, and what happens next?" },
      { t: "Towel roll", time: "8 min", text: "Talk through why not a collar for Neil. If you have the kit, build a modified towel roll on the stretcher." },
      { t: "Pain, nausea, quiz", time: "7 min", text: "Choose Neil's pain relief and say why not a ketamine wafer. Then everyone does the quiz alone." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Walked in, still not cleared" } },
      { text: "Neil, 67, was cleaning the gutters at home in Tumby Bay. He fell from the ladder onto the timber decking. His wife saw it: his torso was about gutter height, roughly 2.8 metres up. He hit his head and was knocked out for about two minutes." },
      { text: "When he came round, his wife and a neighbour helped him walk inside. You find him sitting at the kitchen table. He's holding his left hip and that's all he wants to talk about. He says his neck and back are fine. He keeps asking what happened, and he can't remember the fall." },
      { box: { title: "Before you read on", tone: "warn", items: [
        "Does Neil need spinal precautions?",
        "He walked in and he denies neck pain. Does that change your answer?"
      ] } },
      { note: "Case from the lead instructor. Name, town and details: DSY-written." }
    ] },

    { title: "What CPP-018-AO says", blocks: [
      { text: "The principle of the protocol is one sentence: spinal immobilisation should be applied to patients where there is a mechanism of injury that may have caused, or has caused, a musculoskeletal spinal injury or spinal cord injury." },
      { box: { title: "Apply a spinal precaution technique if the patient has (CPP-018-AO)", tone: "warn", items: [
        "Musculoskeletal spinal injury: spinal pain, tenderness, neck ache, back pain",
        "OR a mechanism of injury likely to cause a potential spinal injury: consider injury above the chest or a distracting injury"
      ] } },
      { text: "These are two separate reasons. Neil has no spinal pain, so the first one isn't met. The second one is: he fell from a height and hit his head." },
      { box: { title: "CPPRO-021 adds", items: [
        "The incidence of spinal injury is low, but a missed or delayed diagnosis can be catastrophic",
        "The C-spine is the most vulnerable: more than half of spinal injuries are there",
        "C-spine injury must be suspected in patients with injuries above the shoulders",
        "Have a high index of suspicion of spinal injury when associated with trauma",
        "Immobilisation is for trauma patients who have the potential for spinal injury and cannot be cleared of a clinically important C-spine injury"
      ] } },
      { box: { title: "Neil's red flags", tone: "no",
        check: { q: "Neil says, clearly, \"My neck's fine.\" Can you stop the precautions?", a: "No. His mechanism (a fall from over 1 metre, a head strike) and his distracting hip injury are reasons on their own. His reduced GCS and amnesia mean you can't rely on what he tells you about his neck either. AOs don't try to clear a C-spine when any of these is present." },
        items: [
          "Fall from elevation over 1 m (CPP-018-AO risk factor). His torso was about 2.8 m up",
          "Head strike with loss of consciousness: an injury above the chest (CPP-018-AO) and above the shoulders (CPPRO-021)",
          "A distracting injury: his painful left hip (CPP-018-AO)",
          "Reduced GCS: concussed, asking the same questions, no memory of the fall (CPP-018-AO risk factor)",
          "Over 65 (CPP-018-AO risk factor)"
        ] } },
      { box: { title: "Why \"I've got no neck pain\" doesn't settle it", items: [
        "A distracting injury is one reason: Neil's hip pain is taking all his attention",
        "A reduced GCS is another: he's concussed and can't remember what happened",
        "So his answer to \"Does your neck hurt?\" can't be relied on. AOs don't try to clear a C-spine when any of these risk factors is present (DSY, lead instructor)"
      ] } }
    ] },

    { title: "He's already walked", blocks: [
      { text: "CPP-018-AO lets you coach some patients through a controlled self-extrication. But clinicians must consider another way out, because of the increased risk of injury, if the patient has any of these risk factors." },
      { table: { title: "Self-extrication risk factors (CPP-018-AO)", table: { head: ["Risk factor", "Neil?"], rows: [
        ["Significant distracting injuries", "Yes: left hip"],
        ["Under the influence of drugs or alcohol", "No"],
        ["Reduced GCS or uncooperative", "Yes: concussed, amnesic"],
        ["Thoracolumbar spinal pain", "No"],
        ["New motor or sensory deficits", "Check"],
        ["Previous history of spinal injury or disease", "Ask"],
        ["Over 65 years", "Yes: 67"],
        ["High-speed motor vehicle collision, rollover or ejection", "No"],
        ["Axial load to the head", "Ask how he landed"],
        ["Accident involving a motorised vehicle, e.g. a quad bike", "No"],
        ["Bicycle collision with an object", "No"],
        ["Fall from elevation over 1 m or 5 stairs", "Yes"]
      ] } } },
      { text: "Neil has at least four. He shouldn't have walked, but his family didn't know that, and it's already happened. What matters now is that he doesn't move any more on his own." },
      { box: { title: "At the kitchen table", tone: "warn", steps: [
        { t: "Stop him moving", text: "Explain why, kindly. If he gets numbness, tingling, weakness, or new or worse spinal pain, he must tell you (CPP-018-AO)." },
        { t: "Manual stabilisation of the head", text: "Hold the head on both sides, keeping the natural position of the spine. It works in a range of postures, including sitting (CPPRO-021)." },
        { t: "Look for spinal cord injury", text: "Paralysis, tingling, weakness, numbness or hypotension: request clinical support and package him in a vacuum mattress for transport, if available (CPP-018-AO)." },
        { t: "No mobility assessment", text: "A suspected spinal injury is a reason not to do a mobility assessment (CPPRO-001). He doesn't stand up to \"see how he goes\"." },
        { t: "Controlled extrication", text: "Unsuitable for self-extrication and not time critical: consider controlled extrication. Time critical and at risk of deterioration: consider rapid extrication (CPP-018-AO)." }
      ] } },
      { box: { title: "From the chair to the stretcher (DSY)", items: [
        "Neither CPP-018-AO nor CPPRO-021 describes this exact move. Plan it with your partner and helpers before anyone lifts",
        "Keep the head and spine in line and the movement to a minimum. Use the kit and the people you have",
        "Methoxyflurane can help with brief painful procedures such as extrication (CPP-013-AO): time it for the move",
        "Talk your team's method through with your lead instructor"
      ] } }
    ] },

    { title: "Choosing a technique", blocks: [
      { box: { title: "Select the most appropriate technique (CPP-018-AO, CPPRO-021)", items: [
        "Manual stabilisation of the head: self splinting",
        "Modified towel roll",
        "Vacuum mattress",
        "A correctly fitted semi-rigid collar, unless contraindicated"
      ] } },
      { box: { title: "Semi-rigid collar: contraindicated with", tone: "no",
        check: { q: "Why a towel roll rather than a collar for Neil?", a: "He hit his head and was knocked out for two minutes. CPPRO-021 lists concerns about raised intra-cranial pressure as a contraindication to a semi-rigid collar, and the protocol says to remove collars for transport where possible anyway." },
        items: [
          "A compromised airway",
          "Spinal deformities",
          "Concerns about raised intra-cranial pressure"
        ], note: "CPPRO-021: a badly applied collar can cause harm by increasing intra-cranial pressure, getting in the way of airway management, and causing pain and pressure." } },
      { box: { title: "Whatever you choose (CPP-018-AO)", items: [
        "Where possible, remove semi-rigid collars for transport and replace them with another technique",
        "Don't secure the head to the stretcher or a long board",
        "Don't transport patients on a long board",
        "Aim to keep the entire spine in neutral alignment and avoid movement. In healthy adults about 2 cm of padding under the head may help (CPPRO-021)",
        "Put the 'Cervical Spine NOT Clear' sticker on the patient somewhere obvious, as early as possible, but not on the skin (CPPRO-021)",
        "Record your spinal immobilisation decisions and techniques on the PCR"
      ] } },
      { box: { title: "Modified towel roll (CPPRO-021)", tiles: true, steps: [
        { t: "Set up", text: "Remove the stretcher head rest. Lay two towels, folded in half lengthways, across where the head will rest." },
        { t: "Under the head", text: "If you need to get the towels under the head: hold the head, lift it about 2 cm, and slide the towels in, held tight, head to toe." },
        { t: "Big rolls", text: "Keep holding the head. Roll a 500 mL saline bag into the top towel on each side, bag on its narrow edge. No need to unwrap the bag." },
        { t: "Small rolls", text: "Roll the bottom towel tightly on each side to support the bigger rolls. Rolls firm against the head and shoulders." },
        { t: "Tape", text: "One length of Transpore across the forehead, roll to roll, over a combine dressing. Never to the stretcher. The head is not strapped down." },
        { t: "Moving him", text: "You may need to unroll the towels for a lateral transfer. Severe kyphosis: adapt, keeping natural alignment and minimal movement." }
      ] } },
      { note: "Equipment (CPPRO-021): two towels, two 500 mL bags of sodium chloride 0.9%, Transpore tape, a combine dressing, the 'Cervical Spine NOT Clear' sticker; vacuum mattress and semi-rigid collar if used. The towel roll, vacuum mattress and collar sections don't apply to Ambulance Assist staff." }
    ] },

    { title: "Red flag checker", blocks: [
      { tool: {
        title: "Spinal precautions: what does CPP-018-AO say?",
        intro: "For an adult trauma patient. Answer from what you find, not what the patient tells you he's fine with. The checker shows which CPP-018-AO and CPPRO-021 lines apply. It doesn't clear anyone's spine.",
        fields: [
          { id: "age", type: "number", label: "Age (years)", min: 0 },
          { id: "sci", type: "yesno", label: "Any paralysis, tingling, weakness, numbness, new motor or sensory deficit, or hypotension?" },
          { id: "spine", type: "yesno", label: "Spinal pain, tenderness, neck ache or back pain?" },
          { id: "above", type: "yesno", label: "Injury above the chest (head, face or neck)?" },
          { id: "distract", type: "yesno", label: "A significant distracting injury?" },
          { id: "fall", type: "yesno", label: "Fall from elevation over 1 m or 5 stairs?" },
          { id: "mech", type: "yesno", label: "High-speed collision, rollover or ejection; a motorised vehicle such as a quad bike; a bicycle collision with an object; or an axial load to the head?" },
          { id: "gcs", type: "yesno", label: "Reduced GCS, or uncooperative?" },
          { id: "drugs", type: "yesno", label: "Under the influence of drugs or alcohol?" },
          { id: "hx", type: "yesno", label: "Previous spinal injury or spinal disease?" },
          { id: "collar", type: "yesno", label: "Compromised airway, spinal deformity, or concerns about raised intra-cranial pressure?" }
        ],
        evaluate: function (v) {
          var reasons = [], risks = [], actions = [], alerts = [], note = "";
          if (v.spine) reasons.push("Spinal pain, tenderness, neck ache or back pain: a musculoskeletal spinal injury (CPP-018-AO)");
          if (v.above) reasons.push("Injury above the chest: CPP-018-AO says consider it as a mechanism likely to cause a spinal injury. CPPRO-021: suspect a C-spine injury with injuries above the shoulders");
          if (v.distract) reasons.push("A distracting injury: CPP-018-AO says consider it as a mechanism likely to cause a spinal injury");
          if (v.fall) reasons.push("Fall from elevation over 1 m or 5 stairs: a mechanism on CPP-018-AO's risk factor list");
          if (v.mech) reasons.push("A high-risk mechanism on CPP-018-AO's risk factor list");
          if (v.sci) reasons.push("Signs of a possible spinal cord injury (CPP-018-AO)");
          var precautions = reasons.length > 0;

          if (v.distract) risks.push("significant distracting injury");
          if (v.drugs) risks.push("drugs or alcohol");
          if (v.gcs) risks.push("reduced GCS or uncooperative");
          if (v.spine) risks.push("spinal pain (thoracolumbar spinal pain is a risk factor)");
          if (v.sci) risks.push("new motor or sensory deficit");
          if (v.hx) risks.push("previous spinal injury or disease");
          if (v.age > 65) risks.push("over 65 years");
          if (v.fall) risks.push("fall over 1 m or 5 stairs");
          if (v.mech) risks.push("high-risk mechanism");

          if (v.sci) {
            alerts.push("Possible spinal cord injury: request clinical support and package the patient in a vacuum mattress for transport, if available (CPP-018-AO)");
          }
          if (precautions) {
            actions.push("Manual C-spine immobilisation as required, then select the most appropriate technique: manual stabilisation (self splinting), modified towel roll, vacuum mattress, or a correctly fitted semi-rigid collar");
            if (v.collar) actions.push("Not a semi-rigid collar: a compromised airway, spinal deformity or concerns about raised intra-cranial pressure contraindicate it (CPP-018-AO, CPPRO-021)");
            actions.push("Where possible remove semi-rigid collars for transport. Don't secure the head to the stretcher or a long board. Don't transport on a long board");
            actions.push("No mobility assessment: a suspected spinal injury is a contraindication (CPPRO-001)");
            actions.push("'Cervical Spine NOT Clear' sticker on the patient, not the skin (CPPRO-021). Record your decisions and technique on the PCR");
          }
          if (precautions && risks.length) {
            alerts.push("Self-extrication risk factors: " + risks.join("; ") + ". Consider an alternate extrication strategy (CPP-018-AO)");
            actions.push("Not time critical: consider controlled extrication. Time critical and at risk of deterioration: consider rapid extrication (CPP-018-AO)");
          } else if (precautions) {
            actions.push("No self-extrication risk factors ticked: you may consider coaching the patient through a controlled self-extrication. Tell them to stop and wait to be moved if they get numbness, tingling, weakness, or new or worse spinal pain (CPP-018-AO)");
          }
          actions.push("Consider pain management (CPP-013-AO) and clinical support for advanced assessment. Consult the EOC Clinician. Transport and notify the receiving facility (CPP-018-AO)");

          if (precautions && !v.spine) note = "No spinal pain doesn't cancel the other reasons: CPP-018-AO lists them separately. AOs don't try to clear a C-spine when risk factors are present (DSY, lead instructor).";
          if (!precautions) note = "None of CPP-018-AO's precaution criteria ticked. Go over the mechanism again, and consult the EOC Clinician if you're unsure." + (risks.length ? " The patient factors you ticked (" + risks.join("; ") + ") still matter if you find a mechanism." : "");

          var headline = v.sci ? "Possible spinal cord injury: request clinical support" : precautions ? "Apply a spinal precaution technique" : "No CPP-018-AO precaution criteria ticked";
          var tone = v.sci ? "no" : (precautions || risks.length) ? "warn" : "good";
          return { tone: tone, headline: headline, alerts: alerts, why: reasons, actions: actions, note: note };
        },
        scenariosNote: "The scenarios were written for training by DSY. Decide before pressing the button.",
        scenarios: [
          { title: "Neil at the kitchen table", text: "67, ladder fall onto decking, head strike with about 2 minutes LOC, walked inside. Left hip pain. Denies neck and back pain. Concussed, can't remember the fall. No numbness or weakness. You're concerned about his head injury.",
            values: { age: 67, sci: false, spine: false, above: true, distract: true, fall: true, mech: false, gcs: true, drugs: false, hx: false, collar: true } },
          { title: "Quad bike, neck ache", text: "24, quad bike rolled on a sandhill. Walking about. Sore neck. GCS 15, no other injuries, sober.",
            values: { age: 24, sci: false, spine: true, above: false, distract: false, fall: false, mech: true, gcs: false, drugs: false, hx: false, collar: false } },
          { title: "Footpath trip", text: "45, tripped on a footpath, grazed both palms. No head strike, no pain elsewhere, GCS 15, sober.",
            values: { age: 45, sci: false, spine: false, above: false, distract: false, fall: false, mech: false, gcs: false, drugs: false, hx: false, collar: false } },
          { title: "Down the stairs", text: "78, fell down 6 stairs. Severe kyphosis. Mid-back pain and tingling in both hands. GCS 15.",
            values: { age: 78, sci: true, spine: true, above: false, distract: false, fall: true, mech: false, gcs: false, drugs: false, hx: false, collar: true } }
        ]
      } }
    ] },

    { title: "His hip: pain relief (CPP-013-AO)", blocks: [
      { text: "CPP-018-AO says to consider pain management as per CPP-013-AO. Start with the basics: reassurance, posture, splinting and temperature control all help. Record pain scores before and after." },
      { box: { title: "Multimodal analgesia for Neil", items: [
        "Paracetamol: adults oral 1000 mg, if no doses in the past 4 hours",
        "Ibuprofen (if you've completed the training): adults oral 400 mg, if no ibuprofen or other NSAIDs in the past 6 hours. Check the contraindications in the drug monograph. If there's any ambiguity about its safe use, withhold it",
        "Methoxyflurane 3 mL, repeated once if needed. No more than 2 doses in 24 hours or 15 mL a week. Useful for brief painful procedures such as extrication: time it for the move to the stretcher",
        "IN fentanyl, if you're authorised: consult the EOC Clinician, who may advise a dose if the sedation score is less than 2, the pain is uncontrolled or severe, and the systolic BP is 100 or more"
      ] } },
      { box: { title: "A ketamine wafer?", tone: "no",
        check: { q: "Neil's pain is 8/10. Can an authorised AO give him a sublingual ketamine wafer?", a: "Not on the protocol alone. The wafer needs GCS 15 or the patient's normal GCS, and Neil is concussed. He's also 67: over 64 needs a SAAS Medical Officer consult. Talk to the EOC Clinician." },
        items: [
          "May be considered if the pain score is 7 to 10, AND GCS is 15 or the patient's normal, AND the patient is 16 to 64",
          "Neil is concussed: his GCS isn't 15 or his normal",
          "Neil is 67: over 64 needs a SAAS Medical Officer consult"
        ] } },
      { links: [{ label: "Pain management module", href: "/microlearning/pain/" }] }
    ] },

    { title: "Nausea (CPP-047-AO)", blocks: [
      { text: "Neil says he feels sick. A patient who vomits while his head and neck are held still is a real problem for his airway and his spine." },
      { box: { title: "What the protocol says", items: [
        "Ondansetron may be given prior to transport in patients with head, spine or eye trauma where the risk of complications associated with vomiting is high",
        "Adults: ondansetron 4 mg orally disintegrating tablet (ODT), single dose. With dry hands, place it on top of the tongue, let it dissolve, then swallow",
        "Contraindications: known allergy to ondansetron or its components; taking apomorphine for Parkinson's",
        "Precautions to check with the patient: known or congenital prolonged QT, irregular heart conditions (AF) or heart failure, known low magnesium or potassium",
        "Still vomiting, or more than one precaution: consult the EOC Clinician, who may advise a second 4 mg ODT for adults",
        "Not where gastric emptying is beneficial. Not effective for motion sickness"
      ] } },
      { links: [{ label: "Nausea and vomiting module", href: "/microlearning/nausea/" }] }
    ] },

    { title: "Escalate and hand over", blocks: [
      { box: { title: "For Neil", items: [
        "Consider clinical support for advanced assessment, and consult the EOC Clinician (CPP-018-AO)",
        "Any paralysis, tingling, weakness, numbness or hypotension: request clinical support (CPP-018-AO)",
        "Transport and notify the receiving facility",
        "Hand over the mechanism, the loss of consciousness, that he walked in, and why the C-spine isn't cleared. The sticker says it for everyone who handles him after you"
      ] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { links: [
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
        { label: "CPP-018-AO Spinal Injury (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Spinal%20Injury%20-%20AO.pdf" },
        { label: "CPPRO-021 Cervical Spine Immobilisation (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-021%20Cervical%20Spine%20Immobilisation.pdf" },
        { label: "CPP-013-AO Pain Management (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Pain%20Management%20-%20AO.pdf" },
        { label: "CPP-047-AO Nausea and Vomiting (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Nausea%20and%20Vomiting%20-%20AO.pdf" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "CPP-018-AO says apply a spinal precaution technique if the patient has spinal pain, or…", options: ["Only if they also have neck pain", "A mechanism of injury likely to cause a potential spinal injury", "Only if they can't walk"], answer: 1,
        why: "CPP-018-AO: musculoskeletal spinal injury (spinal pain, tenderness, neck ache, back pain) OR a mechanism likely to cause a potential spinal injury, considering injury above the chest or a distracting injury." },
      { q: "What fall height is on CPP-018-AO's risk factor list?", options: ["Over 1 m or 5 stairs", "Over 3 m", "Over 2 m or 10 stairs"], answer: 0,
        why: "CPP-018-AO: fall from elevation over 1 m / 5 stairs." },
      { q: "Neil denies neck pain. Why doesn't that clear his C-spine?", options: ["Patients always under-report pain", "His mechanism and distracting injury are separate reasons, and with a reduced GCS his answer can't be relied on", "It does clear it if he says it twice"], answer: 1,
        why: "CPP-018-AO lists the mechanism (injury above the chest, distracting injury) as a reason on its own. Reduced GCS and a distracting injury are also risk factors. AOs don't try to clear a C-spine when these are present." },
      { q: "CPPRO-021 says C-spine injury must be suspected in patients with…", options: ["Injuries above the shoulders", "Any limb fracture", "Age over 80 only"], answer: 0,
        why: "CPPRO-021: C-spine injury must be suspected in patients with injuries above the shoulders. More than half of spinal injuries are in the C-spine." },
      { q: "Which of these is NOT a self-extrication risk factor in CPP-018-AO?", options: ["Over 65 years", "Reduced GCS or uncooperative", "Pain in one ankle only"], answer: 2,
        why: "The list includes significant distracting injuries, drugs or alcohol, reduced GCS, thoracolumbar spinal pain, new motor or sensory deficits, previous spinal injury, over 65, high-risk vehicle mechanisms, axial load to the head and a fall over 1 m or 5 stairs." },
      { q: "Neil has a head strike with loss of consciousness. Which technique fits best?", options: ["A semi-rigid collar, tightly fitted", "A modified towel roll", "A long board with the head strapped down"], answer: 1,
        why: "Concerns about raised intra-cranial pressure contraindicate a semi-rigid collar (CPPRO-021). Never secure the head to the stretcher or a long board, and don't transport on a long board (CPP-018-AO)." },
      { q: "Which is NOT a contraindication to a semi-rigid collar?", options: ["Compromised airway", "Spinal deformities", "Patient over 65"], answer: 2,
        why: "CPPRO-021 contraindications: compromised airway, spinal deformities, concerns about raised intra-cranial pressure." },
      { q: "In a modified towel roll, where does the tape go?", options: ["Across the forehead from roll to roll, over a combine dressing, never to the stretcher", "Across the forehead and down to the stretcher", "Under the chin"], answer: 0,
        why: "CPPRO-021: one length of Transpore across the forehead from roll to roll, a combine dressing under it, not fixed to the stretcher. The head is not strapped down." },
      { q: "What should a patient with signs of spinal cord injury be transported in, if available?", options: ["A semi-rigid collar only", "A vacuum mattress", "A carry chair"], answer: 1,
        why: "CPP-018-AO: evidence of SCI (paralysis, tingling, weakness, numbness or hypotension): request clinical support and package the patient in a vacuum mattress, if available." },
      { q: "Can you do a mobility assessment on Neil before moving him?", options: ["Yes, to see if he can walk to the stretcher", "No: a suspected spinal injury is a contraindication", "Only the seated part"], answer: 1,
        why: "CPPRO-001: a suspected spinal injury is a contraindication to the mobility assessment." },
      { q: "Neil, 67 and concussed, has pain of 8/10. Why not a ketamine wafer on the protocol alone?", options: ["Ketamine is only for children", "It needs GCS 15 or normal, and over 64 needs a SAAS Medical Officer consult", "His pain score is too low"], answer: 1,
        why: "CPP-013-AO: a ketamine wafer may be considered with pain 7 to 10, GCS 15 or normal GCS, and age 16 to 64. Consult a SAAS Medical Officer if over 64." },
      { q: "What does CPP-047-AO say about ondansetron in head or spine trauma?", options: ["It's contraindicated", "It may be given before transport where the risk of complications from vomiting is high", "Only after a consult for the first dose"], answer: 1,
        why: "CPP-047-AO: ondansetron may be given prior to transport in patients with head, spine or eye trauma where the risk of complications associated with vomiting is high. Adults: 4 mg ODT; the first dose no longer needs a consult." }
    ] } }] },

    { title: "Practical: the kitchen chair", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in threes at the station: a patient, and a crew of two. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["A chair and a stretcher", "Two towels, two 500 mL saline bags, Transpore tape, a combine dressing", "A 'Cervical Spine NOT Clear' sticker if you have one", "A vacuum mattress if you have one"] } },
      { steps: [
        { t: "Find him", text: "The patient sits at a table, holding a hip, saying their neck is fine. The crew names the red flags out loud." },
        { t: "Hold the head", text: "One crew member takes manual stabilisation while seated. The other explains to the patient why they mustn't move." },
        { t: "Plan the move", text: "Agree out loud how you'll get them from the chair to the stretcher with minimal movement. Who calls the moves?" },
        { t: "Towel roll", text: "Build the modified towel roll on the stretcher, step by step. Tape across the forehead only, over a combine." },
        { t: "Hand over", text: "Give a one-minute handover that explains why the C-spine isn't cleared." }
      ] },
      { box: { title: "What good looks like", items: ["The patient doesn't stand or walk again", "Manual stabilisation held until the towel roll is in place", "Head never taped to the stretcher", "The red flags named in the handover"] } },
      { note: "Suggested activity written for training. Check it with your lead instructor." }
    ] }
  ]
};
