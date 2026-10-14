/* Falls - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Sources: SAAS CPP-045-AO Falls - AO v1.0 (29 December 2016), exported 31.08.2026; CTL-003 Falls Risk Screening and
   Referral v1.1 (16 June 2022); CTL-010 Pressure Injury Screening Tool (Braden); CPPRO-001 Patient Mobility Assessment,
   CPPRO-002 Falls Risk Screening and CPPRO-003 Pressure Injury Prevention (all v1.1, review date Dec 2019, now passed).
   Country SA referral pathway only (Eyre Peninsula crews), as the DSY lead instructor asked. Nothing clinical here goes
   beyond those documents. */
var FROP_FALLS = [{ value: "0", label: "0: none" }, { value: "1", label: "1: one fall" }, { value: "2", label: "2: two falls" }, { value: "3", label: "3: three or more" }];
var FROP_ADL = [{ value: "0", label: "0: none (completely independent)" }, { value: "1", label: "1: supervision only" }, { value: "2", label: "2: some assistance required" }, { value: "3", label: "3: completely dependent" }];
var FROP_BAL = [{ value: "0", label: "0: no unsteadiness observed" }, { value: "1", label: "1: minimally unsteady" }, { value: "2", label: "2: moderately unsteady (needs supervision)" }, { value: "3", label: "3: severely unsteady (constant hands-on help)" }, { value: "x", label: "Can't walk because of a new injury" }];
function braden(id, label, opts) { return { id: id, type: "choice", label: label, options: opts.map(function (o) { return { value: String(o[0]), label: o[0] + ": " + o[1] }; }) }; }

var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Falls",
  subtitle: "Ambulance Officer microlearning",
  headline: "Getting a fallen patient up safely, and deciding who can stay home",
  lead: "Falls are one of the most common jobs for country crews. This module covers the AO falls protocol: assessment, the mobility check before any lift, who needs transport, the FROP falls screen, Country Referral Unit referrals, and the pressure injury check after a long lie.",
  minutes: 25,

  protocol: {
    code: "CPP-045-AO", name: "Falls - AO", version: "v1.0 (29 December 2016)", exported: "31 August 2026",
    also: [{ code: "CTL-003", name: "Falls Risk Screening and Referral", version: "v1.1 (16 June 2022)" },
           { code: "CTL-010", name: "Pressure Injury Screening Tool", version: "" }]
  },
  footerNotes: ["Also uses the procedures CPPRO-001 Patient Mobility Assessment, CPPRO-002 Falls Risk Screening and CPPRO-003 Pressure Injury Prevention (all v1.1, 2016).",
    "CPPRO-001, CPPRO-002 and CPPRO-003 are past their review date (December 2019). Check the SAAS Clinical app for any newer version.",
    "Only the Country SA referral pathway is shown. Metro Adelaide crews: see CTL-003.",
    "CTL-010 does not give a band for a Braden score of exactly 15 (low risk is above 15, medium is 13 to 14)."],

  session: {
    intro: "For a team-led session. Allow about 30 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Read the introduction", time: "4 min", text: "Read the long lie paragraph aloud and list its consequences together." },
      { t: "The protocol", time: "5 min", text: "Take turns reading a box. Stop at the transport criteria and check everyone can say all five." },
      { t: "Mobility assessment", time: "5 min", text: "One person lies on the floor, another talks through the four checks." },
      { t: "Falls screen and pressure injury", time: "8 min", text: "Work the scenarios in both checkers. Decide the score and the action before pressing the button." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pairs practise the FROP screen and the CRU call. Do the rest in your own time." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "", title: "Falls: what AOs need to know", notes: "Narrated intro video" } },
      { text: "A fall is an event which results in a person coming to rest inadvertently on the ground or floor or other lower level. A fall may or may not result in injury." },
      { text: "Apart from medical causes such as syncope or dizziness, many things contribute to a fall: cognitive impairment, medications, declining balance and mobility, continence problems, feet and footwear, vision and the environment." },
      { text: "You are often the first health care professional in a person's home. It is a chance to see how they are managing and to spot risks for further falls. A fall is itself a strong risk factor for future falls and fall injuries." },
      { text: "A 'long lie' is when a person has been on the ground for more than one hour after a fall. It is linked with higher mortality in older people, and can cause future fear of falling, muscle damage, pneumonia, pressure sores, dehydration and hypothermia." }
    ] },

    { title: "The protocol", blocks: [
      { box: { title: "On scene", steps: [
        { t: "Basic care", text: "A full set of observations, and the full history of how the fall happened." },
        { t: "Treat urgent issues", text: "Treat any urgent medical issues or injuries you find." },
        { t: "Mobility assessment", text: "If it is safe. See the next section." },
        { t: "Lifting plan", text: "Work out the right lifting plan for the patient and crew. Request support if you need extra equipment or resources." },
        { t: "Full assessment", text: "Once the patient is safe and comfortable, complete a comprehensive clinical assessment." }
      ] } },
      { box: { title: "Transport if the patient has", tone: "warn", check: { q: "Mrs K slipped on her mat, has no injury, feels well, and takes apixaban for AF. Can she stay home?", a: "No. A patient who has taken anticoagulants is on the transport list in CPP-045-AO." }, items: [
        "A medical cause of the fall",
        "Associated injuries",
        "Other clinical or social concerns",
        "A need for further management or investigation",
        "Taken anticoagulants"
      ] } },
      { box: { title: "No clinical or social need for transport", steps: [
        { t: "Falls screen", text: "For normally ambulant patients, complete the FROP falls screen. Document the outcome on the PCR." },
        { t: "Refer", text: "Low risk (score 0 to 3): consider a non-urgent falls referral. High risk (4 to 9): urgent falls referral." },
        { t: "Long lie?", text: "On the ground more than 1 hour after the fall: complete a pressure injury screen." },
        { t: "Non-ambulant at home?", text: "If there aren't adequate resources or support to manage a non-ambulant patient safely at home, transport to hospital." }
      ] } },
      { box: { title: "Any patient you don't transport", items: [
        "Consult the EOC Clinician",
        "Make sure there is an appropriate level of supervision, and encourage usual activities",
        "Tell the patient or carer when they should escalate care",
        "Where available, leave a falls handout, and pressure injury information if relevant"
      ] } },
      { box: { title: "A fall in SAAS care", tone: "no", items: [
        "A 'fall in care' while SAAS is present must be reported in SLS",
        "If it was due to a device error, or staff were injured, also complete an IRQA form",
        "If a patient starts to fall, don't try to catch them. Always try to protect their head (CPPRO-001, CPPRO-002)"
      ] } }
    ] },

    { title: "Mobility assessment before the lift", blocks: [
      { text: "CPPRO-001 says to consider a mobility assessment for every patient before a transfer or mobilising. Asking the patient how they usually move isn't enough: a new illness or injury can change it. The philosophy is \"do everything for the person but nothing they can do for themselves\". No equipment is needed: the result tells you what equipment and how many people the lift needs." },
      { box: { title: "Not suitable if the patient has", tone: "no", items: ["Hypotension", "Suspected spinal injury", "Active chest pain", "Significant cognitive impairment"],
        note: "Precautions: recent change in medication, surgery or dialysis; blood loss; lying on the ground or flat for a long time, or at risk of postural hypotension." } },
      { box: { title: "Patient lying down (on the floor or bed)", tiles: true, steps: [
        { t: "Straight leg raise", text: "Hold your hand above their foot and ask them to lift the leg to touch it. Repeat with the other leg. Can't lift a leg: unlikely to stand safely or on their own." },
        { t: "Bridge", text: "Knees bent, feet flat, lift the hips. Can't raise the hips: may be unsafe to sit up unassisted." },
        { t: "Head lift", text: "Lift the head off the pillow. Poor head or trunk control: likely unsafe to sit up." },
        { t: "Roll", text: "Roll to the side you'll sit them up on. Passed all four: likely able to sit up, with or without help." },
        { t: "Reassess sitting", text: "Use the manual task techniques if they need help. Assess again once they're sitting, before they move away." }
      ] } },
      { box: { title: "Patient in a chair or recliner", steps: [
        { t: "Leg extension", text: "Straighten the knee to 'touch' your hand with the foot, each leg. Can't lift one or both: may not be safe to stand." },
        { t: "March on the spot, seated", text: "Lift one foot, then the other, and repeat. Can't raise both knees in turn: may not mobilise safely with minimal help." },
        { t: "Reach", text: "Lean forward and to the side to touch your hand, away from the chair back. Be ready to steady them." },
        { t: "Sit to stand", text: "Passed all steps: likely able to stand, with or without help. Set up first: knees over the toes, moving forward in the chair if needed. Assess again once standing." }
      ] } }
    ] },

    { title: "Falls risk screen (FROP)", blocks: [
      { text: "The FROP-Com (Falls Risk for Older People, community version) screen has three questions. It takes a few minutes and tells you how urgently the patient needs a comprehensive falls risk assessment in the community." },
      { box: { title: "Who to screen (CPPRO-002)", items: [
        "Only if there is no clinical or social need for transport",
        "Any patient who has fallen or may be at risk of falling and who is over 65 and living in the community, ambulant but declining physically, would benefit from a comprehensive falls assessment, or whose existing services don't meet their needs",
        "Ask first: are they willing to work on their falls risks? Get consent for the screen and the referral",
        "Not for: an injury needing hospital, a medical cause for the fall, or a patient who is normally non-ambulant",
        "Take care with significant cognitive impairment or dizziness"
      ] } },
      { tool: {
        title: "FROP falls screen",
        intro: "Score the three CTL-003 questions to see the risk and the Country SA referral. The patient uses their usual walking aid for the balance check.",
        check: { q: "Two falls this year including today, needs some help with housework, minimally unsteady. Score and referral?", a: "2 + 2 + 1 = 5: high risk. Urgent referral: email the CRU form marked 'high risk', or phone the CRU 9am to 5pm." },
        fields: [
          { id: "falls", type: "choice", label: "Falls in the past 12 months (count today's fall)", options: FROP_FALLS },
          { id: "adl", type: "choice", label: "Help needed with basic activities before this fall (cooking, housework, laundry)", options: FROP_ADL },
          { id: "bal", type: "choice", label: "Walking and turning: stand, walk 3 metres, turn and sit (pick the most unsteady)", options: FROP_BAL },
          { id: "support", type: "yesno", label: "Is there adequate support or supervision at home?" }
        ],
        evaluate: function (v) {
          if (v.bal === "x") return { tone: "warn", headline: "Recommend transport to hospital",
            why: ["CPPRO-002: if the patient can't walk because of a new injury, recommend transport to hospital"], actions: ["Transport. The falls screen isn't used for an injury needing hospital"] };
          var a = +v.falls, b = +v.adl, c = +v.bal, total = a + b + c, high = total >= 4;
          var why = ["Falls " + a + " + help needed " + b + " + balance " + c + " = " + total + " out of 9: " + (high ? "high risk (4 to 9)" : "low risk (0 to 3)")];
          var actions = [], note = "";
          if ((b === 3 || c === 3) && !v.support) {
            why.push("A score of 3 for help needed or for balance, with inadequate support or supervision at home");
            return { tone: "warn", headline: "Score " + total + ": consider transport", why: why,
              actions: ["CTL-003: if there is inadequate support or supervision at home with these scores, or any other concern, consider transport", "Consult the EOC Clinician"] };
          }
          if (!v.support) note = "CTL-003: with inadequate support or supervision at home, or any other concern, consider transport. Make sure there is an appropriate level of supervision before you leave.";
          actions.push("Document the outcome on the PCR");
          if (high) actions.push("Urgent falls referral: email the CRU form to Health.CountryReferralUnit@sa.gov.au with 'high risk' falls assessment in the management / care requested section, or phone the CRU on 1800 003 307 (9am to 5pm) to complete the form");
          else actions.push("Consider a non-urgent falls referral: email the CRU form to Health.CountryReferralUnit@sa.gov.au with 'low risk' falls assessment in the management / care requested section, or phone the CRU on 1800 003 307 (9am to 5pm)");
          actions.push("Non-transported patient: consult the EOC Clinician, make sure there is appropriate supervision, encourage usual activities, give escalation advice and a falls handout if available");
          return { tone: high ? "warn" : "good", headline: "Score " + total + ": " + (high ? "high risk, urgent referral" : "low risk, consider a non-urgent referral"), why: why, actions: actions, note: note };
        },
        disclaimer: "Training aid only. Use the current protocol, the SAAS Clinical app and the EOC Clinician for real patients.",
        scenariosNote: "Examples written for training from CTL-003 and CPPRO-002. Decide the score before pressing the button.",
        scenarios: [
          { title: "First fall, steady", text: "Tripped on a rug today, first fall this year. Independent at home. No unsteadiness. Lives with her husband.", values: { falls: "1", adl: "0", bal: "0", support: true } },
          { title: "Exactly 3", text: "Two falls this year including today. Independent. Minimally unsteady. Daughter next door.", values: { falls: "2", adl: "0", bal: "1", support: true } },
          { title: "Exactly 4", text: "Two falls including today. Needs supervision for cooking. Minimally unsteady. Lives with son.", values: { falls: "2", adl: "1", bal: "1", support: true } },
          { title: "Frequent faller", text: "Third fall this year. Some help with housework. Moderately unsteady. Carer visits daily.", values: { falls: "3", adl: "2", bal: "2", support: true } },
          { title: "Dependent, alone", text: "Two falls. Completely dependent for housework. Moderately unsteady. Lives alone, no services.", values: { falls: "2", adl: "3", bal: "2", support: false } },
          { title: "Can't weight bear", text: "First fall. Independent. Can't walk because of new hip pain.", values: { falls: "1", adl: "0", bal: "x", support: true } }
        ]
      } },
      { box: { title: "Country SA referral (CTL-003)", items: [
        "Refer when the patient has fallen and is at risk of further falls, plus: over 65 and living in the community; ambulant but declining physically; would benefit from a comprehensive falls risk assessment; existing services don't meet needs; and consents and is willing to work on their falls risks",
        "Email the CRU form to Health.CountryReferralUnit@sa.gov.au, writing 'high risk' or 'low risk' falls assessment in the management / care requested section",
        "Or phone the Country Referral Unit on 1800 003 307 (9am to 5pm) to complete the form",
        "The CRU form is on SAASnet > Service & Forms > Forms Portal"
      ] } }
    ] },

    { title: "Long lie and pressure injury", blocks: [
      { text: "A patient who has been on the ground for more than an hour after their fall may be at high risk of pressure injury. Complete a pressure injury screen (the Braden score, CTL-010) and start prevention, or follow any existing management plan. A low Braden score means a higher risk." },
      { tool: {
        title: "Braden pressure injury screen",
        intro: "Score the six CTL-010 categories. The total sets the risk and the CPP-045-AO advice for a patient who stays home.",
        check: { q: "A Braden total of 13 after a long lie. What does the protocol ask for?", a: "Medium risk: advice on pressure injury prevention, and recommend follow-up with the patient's Medical Practitioner." },
        fields: [
          braden("sens", "Sensory perception", [[4, "no impairment"], [3, "slightly limited"], [2, "very limited"], [1, "completely limited"]]),
          braden("mob", "Mobility", [[4, "no limitation"], [3, "slightly limited"], [2, "very limited"], [1, "completely immobile"]]),
          braden("act", "Activity", [[4, "walks frequently"], [3, "walks occasionally"], [2, "chairbound"], [1, "bedbound"]]),
          braden("moist", "Moisture", [[4, "rarely moist"], [3, "occasionally moist"], [2, "very moist"], [1, "constantly moist"]]),
          braden("fric", "Friction, shear and pressure", [[3, "no apparent problem"], [2, "potential problem"], [1, "problem"]]),
          braden("nut", "Nutrition", [[4, "excellent"], [3, "adequate"], [2, "probably inadequate"], [1, "very poor"]]),
          { id: "existing", type: "yesno", label: "Existing pressure injury?" },
          { id: "concern", type: "yesno", label: "Clinical concern (for example a high risk condition from CTL-010)?" }
        ],
        evaluate: function (v) {
          var s = +v.sens + +v.mob + +v.act + +v.moist + +v.fric + +v.nut;
          var why = ["Braden total " + s + " (6 to 23)"], band, actions = [], note = "";
          if (s <= 12 || v.existing) band = "high"; else if (s <= 14 || v.concern) band = "medium"; else if (s > 15) band = "low"; else band = "gap";
          if (v.existing && s > 12) why.push("Existing pressure injury: CTL-010 puts this in the high risk band");
          if (v.concern && band === "medium" && s > 14) why.push("Clinical concern: CTL-010 puts this in at least the medium band");
          if (band === "gap") {
            why.push("CTL-010 gives no band for exactly 15: low risk is above 15 and medium is 13 to 14");
            note = "Discuss the risk with the EOC Clinician when you consult.";
          }
          var low = "Keep active (even small body shifts help), check and care for the skin regularly, good nutrition";
          if (band === "low") actions.push("Low risk (above 15): give advice on pressure injury prevention. " + low);
          if (band === "gap") actions.push("Give advice on pressure injury prevention (CPP-045-AO asks for this at every risk level)");
          if (band === "medium") actions.push("Medium risk (13 to 14, or clinical concern): give advice on pressure injury prevention and recommend follow-up with the patient's Medical Practitioner",
            "CTL-010 adds: reposition every 30 minutes with small body shifts; fresh continence pads and dry clothes where possible");
          if (band === "high") actions.push("High risk (6 to 12, or existing pressure injury): give advice on pressure injury prevention and arrange an appointment for review with the patient's Medical Practitioner",
            "CTL-010 adds: reposition every 30 minutes; fresh pads and dry clothes; prophylactic dressings or the existing PI management plan; support surfaces or equipment to reduce pressure, friction and shear");
          if (v.existing) actions.push("Existing pressure injury: make sure a management plan is in place. No plan: refer to the patient's GP or the Country Referral Unit for urgent review (CPPRO-003)");
          actions.push("Leave pressure injury information with the patient or carer, and record the risk on the PCR");
          if (band !== "low" && band !== "gap") actions.push("If transported: report the risk or any new pressure injury to the receiving facility");
          var head = { low: "Low risk", medium: "Medium risk", high: "High risk", gap: "Score 15: no CTL-010 band" }[band];
          return { tone: band === "low" ? "good" : "warn", headline: "Braden " + s + ": " + head, why: why, actions: actions, note: note };
        },
        disclaimer: "Training aid only. Use the current protocol, the SAAS Clinical app and the EOC Clinician for real patients.",
        scenariosNote: "Examples written for training from CTL-010. Decide the score before pressing the button.",
        scenarios: [
          { title: "Short lie, active", text: "On the floor 90 minutes. Alert, walks daily, dry, eating well.", values: { sens: "4", mob: "4", act: "4", moist: "4", fric: "3", nut: "3", existing: false, concern: false } },
          { title: "Overnight lie", text: "Found in the morning. Very limited sensation and mobility, chairbound, very moist, friction a problem, probably inadequate nutrition.", values: { sens: "2", mob: "2", act: "2", moist: "2", fric: "1", nut: "2", existing: false, concern: false } },
          { title: "Exactly 13", text: "Very limited sensation and mobility, chairbound, occasionally moist, potential friction problem, probably inadequate nutrition.", values: { sens: "2", mob: "2", act: "2", moist: "3", fric: "2", nut: "2", existing: false, concern: false } },
          { title: "Exactly 15", text: "Slightly limited sensation and mobility, walks occasionally, very moist, potential friction problem, probably inadequate nutrition.", values: { sens: "3", mob: "3", act: "3", moist: "2", fric: "2", nut: "2", existing: false, concern: false } },
          { title: "Existing sacral injury", text: "Good scores (total 19) but a dressed sacral pressure injury.", values: { sens: "4", mob: "3", act: "3", moist: "3", fric: "3", nut: "3", existing: true, concern: false } }
        ]
      } },
      { box: { title: "Pressure injury prevention (CPPRO-003)", items: [
        "Common sites: the sacrum and coccyx, heels, elbows and malleoli",
        "Don't attempt any repositioning with suspected spinal cord injury or pelvic fracture",
        "Use transfer aids (slide sheets, sally tubes) for non-ambulant patients to prevent shear and friction",
        "Keep sheets taut; protect the skin from side rails, seatbelts and buckles; no pressure on the toes from blankets",
        "Moist skin: clean and dry it gently before transfer or before leaving (don't rub vigorously)",
        "Non-transported patients at high risk must be referred to a health care provider (ideally their GP) for follow-up"
      ] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { table: { title: "FROP-Com falls screen (CTL-003)", table: { head: ["Question", "0", "1", "2", "3"], rows: [
        ["Falls in the past 12 months", "None", "One", "Two", "Three or more"],
        ["Help with basic activities (cooking, housework, laundry)", "None", "Supervision", "Some assistance", "Completely dependent *"],
        ["Unsteady walking and turning", "None observed", "Minimally", "Moderately (needs supervision)", "Severely (constant hands-on help) *"]
      ] }, text: "Total 0 to 3: low risk. 4 to 9: high risk. * If there is inadequate support or supervision at home with these scores, or any other concern, consider transport." } },
      { table: { title: "Braden score and management (CTL-010)", table: { head: ["Braden", "Risk", "Management"], rows: [
        ["Above 15", "Low", "Keep active (even small body shifts help); check and care for the skin; good nutrition"],
        ["13 to 14 (or clinical concern)", "Medium", "All of the above, plus: reposition every 30 minutes with small shifts; fresh continence pads and dry clothes before transport"],
        ["6 to 12 (or existing PI)", "High", "All of the above, plus: prophylactic dressings or the PI management plan; support surfaces or equipment to reduce pressure, friction and shear"]
      ] }, text: "High risk clinical conditions: over 85; high BMI (skin folds); low BMI (bony prominences); severely anaemic; immunosuppressed; palliative; smoker; incontinent; diabetes or PVD; major organ failure; rheumatoid arthritis; connective tissue disease; spinal cord injury; a condition affecting mobility or sensation." } },
      { table: { title: "Falls risk factors (CPPRO-002)", items: [
        "Intrinsic: age and female gender; history of falls or fear of falling; chronic conditions (stroke, Parkinson's, arthritis); multiple medications (psychoactive); impaired balance and mobility; reduced strength; sensory problems; dizziness; impaired cognition; incontinence; depression; low activity; slow reaction time",
        "Extrinsic: inappropriate footwear (high heels, slippers); inappropriate spectacles; hazards inside and outside the home",
        "Low bone density, low BMI and fragile skin raise the risk of injury if a fall happens"
      ] } },
      { links: [
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
        { label: "CPPRO-001 Patient Mobility Assessment (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-001%20Patient%20Mobility%20Assessment.pdf" },
        { label: "CPPRO-002 Falls Risk Screening (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-002%20Falls%20risk%20screening%20(FROP).pdf" },
        { label: "CPPRO-003 Pressure Injury Prevention (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-003%20Pressure%20Injury%20Prevention.pdf" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "How long on the ground makes a 'long lie'?", options: ["More than 15 minutes", "More than 1 hour", "More than 4 hours"], answer: 1,
        why: "A long lie is where a person has remained on the ground for more than one hour after a fall." },
      { q: "Which of these is NOT a consequence of a long lie listed in the protocol?", options: ["Pressure sores", "Hypothermia", "Hypertension"], answer: 2,
        why: "A long lie may result in future fear of falling, muscle damage, pneumonia, pressure sores, dehydration and hypothermia." },
      { q: "An uninjured patient who fell takes an anticoagulant. What does CPP-045-AO say?", options: ["Screen and leave at home", "Provide transport", "Refer to the GP only"], answer: 1,
        why: "If the patient has taken anticoagulants, provide transport." },
      { q: "Which patient is NOT suitable for a mobility assessment?", options: ["One with active chest pain", "One who uses a walking frame", "One aged over 85"], answer: 0,
        why: "CPPRO-001 contraindications: hypotension, suspected spinal injury, active chest pain, significant cognitive impairment." },
      { q: "Lying on the floor, the patient can't lift either leg to touch your hand. What does that suggest?", options: ["They are unlikely to stand safely or on their own", "They need a bridge test next", "They can walk with a frame"], answer: 0,
        why: "If the patient cannot lift their leg, they are unlikely to be able to stand safely or independently." },
      { q: "The patient starts to fall during a transfer. What do you do?", options: ["Catch them under the arms", "Don't try to catch them; try to protect their head", "Hold the walking frame steady"], answer: 1,
        why: "Do not attempt to catch the patient, but always endeavour to protect the patient's head." },
      { q: "Who gets a FROP falls screen?", options: ["Every patient who falls", "Normally ambulant patients with no clinical or social need for transport", "Only patients being transported"], answer: 1,
        why: "No clinical or social need for transport: complete a falls screening for normally ambulant patients." },
      { q: "Does the fall you are attending count in the 'falls in the past 12 months' score?", options: ["Yes", "No", "Only if injured"], answer: 0,
        why: "CPPRO-002: if attending due to a fall, that fall is included in the total count." },
      { q: "What FROP total is high risk?", options: ["2 to 9", "4 to 9", "6 to 9"], answer: 1,
        why: "0 to 3 is low risk; 4 to 9 is high risk and needs an urgent falls referral." },
      { q: "How do you make an urgent falls referral in country SA?", options: ["Phone the Metro Falls Team", "Email the CRU form marked 'high risk', or phone the CRU 9am to 5pm", "Tell the patient to see their GP"], answer: 1,
        why: "Country SA: email the CRU form to Health.CountryReferralUnit@sa.gov.au writing 'high risk', or phone the CRU on 1800 003 307 (9am to 5pm)." },
      { q: "Braden total 11 after an overnight lie, staying home. What does the protocol ask for?", options: ["Advice only", "Advice and recommend GP follow-up", "Advice and arrange an appointment for review with the Medical Practitioner"], answer: 2,
        why: "High risk (6 to 12): provide advice on pressure injury prevention and arrange an appointment for review with the patient's Medical Practitioner." },
      { q: "Before leaving any patient at home after a fall, who do you consult?", options: ["Nobody, if the FROP is low", "The EOC Clinician", "The Country Referral Unit"], answer: 1,
        why: "For any non-transported patient: consult the EOC Clinician." }
    ] } }] },

    { title: "Practical: lift plan, screen and referral", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["A mat on the floor", "A chair", "A phone with the SAAS Clinical app", "A blank PCR or notepad"] } },
      { steps: [
        { t: "Mobility check from the floor", text: "Your partner lies on the mat. Talk them through the leg raise, bridge, head lift and roll. Say what each result means for the lift." },
        { t: "Mobility check in a chair", text: "Leg extension, seated march, reach, then set up for sit to stand." },
        { t: "FROP screen", text: "Your partner makes up a history. Ask the three questions, watch them stand, walk 3 metres, turn and sit, and give the score." },
        { t: "CRU referral", text: "Role-play the phone call to the Country Referral Unit: who you are, the patient, the FROP score and risk, consent." },
        { t: "Leave-home advice", text: "Tell your 'patient' when to call for help again, and what supervision is in place." }
      ] },
      { box: { title: "What good looks like", items: ["Transport criteria checked before any screen", "Mobility assessment before the lift, not after", "Today's fall counted in the FROP", "Consent obtained and the EOC Clinician consulted before leaving"] } },
      { note: "Suggested activities written for training. Check them with your lead instructor." }
    ] },

    { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "The Resus Room is a UK emergency medicine podcast. Its \"Neck of Femur Fractures; Roadside to Resus\" episode (March 2023, about 64 minutes) covers hip fractures in frail patients from the roadside to the emergency department. Optional listening. It reflects UK practice, so where it differs from SAAS protocols, follow the protocol." },
      { links: [{ label: "Open the Resus Room hip fracture episode", href: "https://theresusroom.libsyn.com/neck-of-femur-fractures-roadside-to-resus" }] }
    ] }
  ]
};
