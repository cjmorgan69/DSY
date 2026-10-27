/* Falls - AO walk-through scenario (Mavis, 81, Cummins). Content only: the layout lives in /microlearning/shared/module.js.
   New on 27 Oct 2026, written by DSY to go with the microlearning module "Falls" (/microlearning/falls/) and the falls
   skills stations (/stations/falls/). The owner approved the outline: a pendant alarm at 0630 on a winter morning, a long
   lie on the bathroom floor, no injury, the mobility check, the Raizer II lifting chair, and transport (owner's choice):
   she becomes dizzy once sitting up, and remembers feeling the same before she fell. The stay-home path is a variation.
   Sources, all exported 31.08.2026: CPP-045-AO Falls v1.0, CTL-003 Falls Risk Screening and Referral v1.1, CTL-010 Pressure
   Injury Screening Tool (Braden), CPPRO-001 Patient Mobility Assessment, CPPRO-002 Falls Risk Screening and CPPRO-003
   Pressure Injury Prevention (all v1.1, review date Dec 2019 passed), CPP-004-AO Basic Care and Life Support v4.0,
   CPP-063-AO Prolonged Care v1.0 and CTL-070 Adult RDR Chart (as checked for the MVA module), CTL-054 ISBAR. Raizer steps from
   the maker's Raizer II User Manual (Liftup / DHG, Issue 1, Jan 2023): SAAS has no Raizer instructions (owner, 27 Oct 2026).
   The story, observations, timings and the hospital's reply are DSY's. */
window.MODULE = {
  flow: true,
  scenario: true,                     // facilitator / student toggle; break points (see /microlearning/README.md)
  draft: false,
  title: "Falls - AO",
  subtitle: "Walk-through scenario: 2-person volunteer AO crew",
  headline: "Mavis, 81: on the bathroom floor since 3 am, Cummins, 0630",
  lead: "A long lie for a two-person volunteer AO crew, with seven break points for discussion, skills practice and decisions. Mavis is uninjured, alert and keen to get back to bed. The key skills: the CPP-045-AO transport checks, the mobility assessment, the Raizer lifting chair, and the reassessment once she's sitting up. Use the Facilitator version to run it as a group, or send the Student version to work through on a phone.",
  minutes: 70,

  protocol: {
    code: "CPP-045-AO", name: "Falls - AO", version: "v1.0 (29 December 2016)", exported: "31 August 2026",
    also: [{ code: "CPPRO-001", name: "Patient Mobility Assessment", version: "v1.1" },
           { code: "CPPRO-003", name: "Pressure Injury Prevention", version: "v1.1" },
           { code: "CTL-010", name: "Pressure Injury Screening Tool (Braden)" },
           { code: "CTL-003", name: "Falls Risk Screening and Referral", version: "v1.1" },
           { code: "CTL-070", name: "Adult RDR Chart" }]
  },
  footerNotes: ["The patient, story, observations, timings and the hospital's reply are a training scenario written by DSY. Check it with your lead instructor.",
    "CPPRO-001, CPPRO-002 and CPPRO-003 are past their review date (December 2019). Check the SAAS Clinical app for newer versions.",
    "SAAS has no Raizer instructions: the Raizer steps come from the maker's Raizer II User Manual (Issue 1, January 2023)."],

  panels: [
    { title: "Overview", blocks: [
      { box: { title: "Learning objectives", items: [
        "Assess a patient who is still on the floor: obs, BGL, a head to toe examination and the full history of the fall (CPP-045-AO)",
        "Work through the CPP-045-AO transport list, and know it can change as you learn more",
        "Do the mobility assessment before any lift, and use the result to plan the move (CPPRO-001)",
        "Decide whether the Raizer lifting chair suits the patient, and use it safely",
        "Assess again once the patient is sitting, before they stand (CPPRO-001), and act on what you find",
        "Screen for pressure injury after a long lie and report the risk on handover (CTL-010, CPPRO-003)",
        "Hand over a falls patient using ISBAR"
      ] } },
      { box: { title: "Required equipment", items: [
        "Ambulance response bag, Corpuls3 monitor (SpO2, NIBP), BGL monitor, tympanic thermometer, ePCR tablet",
        "Raizer II lifting chair (charged), with its remote, seat belt and headrest",
        "Stretcher, slide sheet, blankets",
        "A floor mat and a pillow to play the bathroom floor",
        "Dry clothing or a gown, continence pads (or stand-ins)",
        "PPE, torches"
      ] } },
      { box: { title: "Timing and resources", items: [
        "Pre-brief about 10 minutes; walk-through 40 to 45 minutes; debrief 15 minutes",
        "Cummins Hospital: about 5 minutes from her house",
        "EOC Clinician: available by phone"
      ] } },
      { box: { title: "Crew roles", items: [
        "Clinician (AO1): patient contact, history, head to toe, mobility assessment, clinical decisions",
        "Driver (AO2): access, obs and BGL, the Raizer, warmth, documentation, calls"
      ] } }
    ] },

    { title: "Pre-brief: falls, mobility and the long lie", blocks: [
      { text: "About 10 minutes. Read this together before the scenario. The Falls module and the skills stations have the detail." },
      { box: { title: "On scene (CPP-045-AO)", items: [
        "Basic care: a full set of observations, and the full history of how the fall happened",
        "Treat any urgent medical issues or injuries",
        "Mobility assessment, if it is safe",
        "Work out the right lifting plan for the patient and crew. Request support if you need extra equipment or resources",
        "Once the patient is safe and comfortable, a comprehensive clinical assessment"
      ] } },
      { box: { title: "Transport if the patient has (CPP-045-AO)", tone: "warn", items: [
        "A medical cause of the fall",
        "Associated injuries",
        "Other clinical or social concerns",
        "A need for further management or investigation",
        "Taken anticoagulants"
      ] } },
      { box: { title: "Mobility assessment (CPPRO-001)", tone: "no", items: [
        "Not suitable with hypotension, suspected spinal injury, active chest pain or significant cognitive impairment",
        "Precautions: a recent change in medication, surgery or dialysis; blood loss; lying on the ground or flat for a long time, or at risk of postural hypotension",
        "Lying: straight leg raise, bridge, head lift, roll. Assess again once sitting, before they move away",
        "If the patient starts to fall, don't try to catch them. Always try to protect their head"
      ] } },
      { box: { title: "Long lie (CPP-045-AO)", items: [
        "On the ground more than one hour after a fall",
        "Linked with higher mortality in older people; can cause fear of falling, muscle damage, pneumonia, pressure sores, dehydration and hypothermia",
        "Complete a pressure injury screen (Braden, CTL-010)"
      ] } },
      { box: { title: "The Raizer (maker's manual)", items: [
        "For a person on the floor who can't get up by themselves",
        "Not for: an injury from the fall or one you can't rule out; a patient who isn't fully conscious and able to give feedback; over 150 kg; unstable fractures",
        "It lifts to sitting or almost standing. It is not for transport"
      ] } },
      { box: { title: "General teaching (not in the protocol)", tone: "warn", items: [
        "\"I just slipped\" is where the history starts, not where it ends. Ask again once the patient is warm and comfortable",
        "Obs can stay in the white zone while they change a lot. Compare each set with the last",
        "Warm the patient from the start: a cold bathroom floor at night takes heat fast"
      ] } }
    ] },

    { title: "Dispatch and en route", blocks: [
      { text: "A Thursday in July, 0630. Still dark, 4 °C outside. You and your crew partner are paged from home in Cummins. About 8 minutes to her house." },
      { box: { title: "MDT display", items: [
        "Priority 2, Fall, 81F",
        "House in Cummins township",
        "Pendant alarm activated 0624. Patient answered the monitoring service: on the bathroom floor, can't get up",
        "Says she has been there 'since about 3'",
        "Lives alone. Key in a key safe by the front door: code given to the crew",
        "Caller: personal alarm monitoring service. Daughter (Sue) in Port Lincoln has been called"
      ] } },
      { breakpoint: { title: "En-route planning", type: "Discussion",
        prompts: ["What does the MDT tell you? What worries you?", "What is a long lie, and why does it matter?", "How will you get in?", "What will you take in with you?"],
        expected: [
          "Aged 81 and on the floor for about three and a half hours: a long lie (more than one hour on the ground)",
          "CPP-045-AO: a long lie is linked with higher mortality in older people and can cause muscle damage, pneumonia, pressure sores, dehydration and hypothermia",
          "Key safe code from the monitoring service. Lights on, call out as you go in",
          "Response bag, Corpuls, BGL monitor, blankets. Plan where the Raizer and stretcher will go once you've seen the room (DSY)",
          "Roles: AO1 to Mavis; AO2 to access, then obs"
        ],
        teaching: ["The fall itself may not be the main problem. Keep an open mind about why she fell", "Small bathrooms make lifting hard. Look at the space before you choose the lifting plan"],
        realJob: "Knock and call out by name as you open the door. A patient alone on the floor is often frightened and cold.",
        decisions: [{ q: "Mavis has been on the floor since about 3 am. What does CPP-045-AO call this, and what does it ask for?", options: [
          "A routine fall: get her up and leave",
          "A long lie: on the ground more than one hour. Complete a pressure injury screen",
          "A long lie only if she has been down more than 12 hours" ], answer: 1,
          why: "CPP-045-AO: a 'long lie' is when a person has remained on the ground for more than one hour after a fall. Complete a pressure injury screen (Braden, CTL-010)." }]
      } }
    ] },

    { title: "On arrival", blocks: [
      { text: "0638. The house is cold. Mavis is lying on her back on the bathroom floor between the toilet and the bath, in a nightie, with a towel she has pulled over herself. She is shivering. Her nightie is damp: she has been incontinent of urine. \"Oh thank goodness. I'm so sorry to call you out. I just slipped. If you could just help me up I'll be fine.\"" },
      { breakpoint: { title: "First impression and primary survey", type: "Discussion",
        prompts: ["What do you do first?", "Talk through the primary survey (CPP-004-AO).", "What can you do about the cold straight away?", "She wants to get up now. What do you say?"],
        expected: [
          "Scene: tight space, wet floor. PPE. Introduce yourselves",
          "Airway clear, talking. Breathing normal effort. Circulation: no bleeding seen. Disability: alert. Exposure: look for injuries, then cover her",
          "Blankets over and under where you can, heating on in the house, wet nightie off as soon as practical",
          "Not yet: you need obs, the history, a head to toe and the mobility assessment first. Reassure her"
        ],
        teaching: ["CPP-045-AO: a full set of obs and the full history of how the fall happened come before the lift", "Keep her dignity: one crew member keeps her covered while the other checks"],
        realJob: "\"Mavis, we'll get you up, I promise. First let's get you warm and have a good look at you.\"",
        cards: [{ q: "Name four problems a long lie can cause.", a: "Any of: fear of falling, muscle damage, pneumonia, pressure sores, dehydration, hypothermia. It is also linked with higher mortality in older people (CPP-045-AO)." }]
      } }
    ] },

    { title: "On the floor: obs, history and head to toe", blocks: [
      { text: "AO2 takes a full set of obs and a BGL while Mavis lies on the floor under blankets." },
      { table: { title: "Set 1, lying on the floor (0646)", table: { head: ["RR", "SpO2", "BP", "Pulse", "Temp", "GCS", "Pain", "BGL"], rows: [["16", "95% (air)", "132/78", "82 regular", "35.4", "15", "0/10", "5.6"]] } } },
      { box: { title: "History", items: [
        "Got up to the toilet at about 3 am. \"My feet went from under me.\" Didn't hit her head",
        "Couldn't get up. Pressed her pendant at 0624 when she 'gave up waiting for it to get light'",
        "Second fall this year (the first was in the garden in March, no injury)",
        "Blood pressure, high cholesterol, arthritis in her knees. Uses a walking frame indoors",
        "Medicines: perindopril (the GP increased the dose last week), atorvastatin, paracetamol. No blood thinners. No allergies",
        "Her medication box matches: no anticoagulant",
        "Lives alone. Daughter Sue in Port Lincoln visits on weekends; a neighbour checks in most days"
      ] } },
      { table: { title: "Head to toe (DSY)", table: { head: ["", "Finding"], rows: [
        ["Head and neck", "No wounds, bruising or tenderness. No neck pain. Pupils equal and reacting"],
        ["Chest and abdomen", "No pain, no bruising. Chest rises equally"],
        ["Pelvis", "No pain. Legs lying straight, not splayed"],
        ["Limbs", "No deformity or pain. Moves all four. Hands and feet cold, pulses present"],
        ["Back", "Rolled with her help to look: red skin over the sacrum and both heels. No spinal pain"]
      ] } } },
      { breakpoint: { title: "Is there a reason to transport yet?", type: "Practical skill",
        prompts: ["AO2: take the full set and the BGL. Which zones are the obs in?", "AO1: do the head to toe, with consent.", "Go through the CPP-045-AO transport list. Does anything apply?", "Anything in the history you want to come back to?"],
        expected: [
          "All white on the RDR chart except the temperature: 35.4 is yellow. Warm her",
          "No injury found. Red skin over the sacrum and heels after three and a half hours on a hard floor",
          "Nothing on the list yet: no injury found, no blood thinners, she says she slipped. Keep the list open as you learn more",
          "The dose of her blood pressure tablet went up last week: a CPPRO-001 precaution (a recent change in medication). So is the long lie. Ask again how she felt just before she fell"
        ],
        teaching: ["CPPRO-002 lists multiple medications, dizziness and impaired balance among the risk factors for falls", "Write the time and the values. This set is the baseline for every set after the lift"],
        realJob: "Check the medication box or the packets yourself. \"Any blood thinners?\" doesn't always get the right answer.",
        decisions: [{ q: "Mavis is uninjured, takes no anticoagulant and says she slipped. What does CPP-045-AO say comes before you lift her?", options: [
          "Nothing: help her straight up",
          "A full set of obs, the full history of the fall, and the mobility assessment if it's safe",
          "Transport her: every long lie goes to hospital" ], answer: 1,
          why: "CPP-045-AO: basic care including a full set of observations and the full history of how the fall happened, treat urgent issues, then the mobility assessment if safe, then the lifting plan." }]
      } }
    ] },

    { title: "The mobility check and the lifting plan", blocks: [
      { text: "0652. Mavis is warmer under the blankets and keen to get up. AO1 talks her through the mobility assessment on the floor." },
      { table: { title: "Mobility assessment, lying (CPPRO-001)", table: { head: ["Check", "Result"], rows: [
        ["Straight leg raise", "Lifts each leg to touch your hand"],
        ["Bridge", "Can't lift her hips off the floor: \"my knees won't let me\""],
        ["Head lift", "Lifts her head well"],
        ["Roll", "Rolls to her side with a little help"]
      ] } } },
      { box: { title: "Raizer II: assemble and lift (maker's manual)", tiles: true, steps: [
        { t: "Check it", text: "Turn it on. Battery light not flashing red, stop button in place. Cloth on the seat if her skin will touch it." },
        { t: "Seat", text: "Mavis on her back, pillow under her head. Bend her thighs up and slide the seat under them." },
        { t: "Backrests first", text: "One side at a time: lift the shoulder with a light push at the elbow, slide the backrest under and click it in (tone). Then the other." },
        { t: "Seat belt", text: "Fasten it (click). Never run it under the rear legs. It holds the hips, not the trunk." },
        { t: "Four legs", text: "Each until it clicks with a tone. A double tone and a green light: ready." },
        { t: "Lift", text: "Arms crossed, legs together, feet clear. Warn her, support the neck, hold UP. Let go and it stops." }
      ] } },
      { breakpoint: { title: "How will you get her up?", type: "Decision making",
        prompts: ["What does each result tell you?", "Is the mobility assessment suitable for her at all? Any precautions?", "Does the Raizer suit Mavis? Check the maker's contraindications.", "AO2: set up the Raizer around her and talk through each step."],
        expected: [
          "Passed the leg raise and head lift. Couldn't bridge: may be unsafe to sit up unassisted. She can't get up by herself",
          "Suitable: BP not low, no suspected spinal injury, no chest pain, alert and following instructions. Precautions: the long lie and the recent medication change. Go slowly and assess again once sitting",
          "Yes: no injury found, fully conscious and able to say how she feels, about 65 kg (under 150 kg). It will bring her to sitting, not move her anywhere",
          "Space for the seat beside her; backrests before legs; belt on; tones for each part; green light; arms crossed, legs together, warn her, neck supported"
        ],
        teaching: ["CPPRO-001: 'do everything for the person but nothing they can do for themselves'", "The Raizer runs only while UP is held. Let go to stop at any height"],
        realJob: "Talk her through every click and tone. A patient who knows what's coming stays still and relaxed.",
        decisions: [{ q: "Mavis can't bridge. What does that suggest, and what do you plan?", options: [
          "She is fine to stand: help her straight up",
          "She may be unsafe to sit up unassisted: plan an assisted lift, such as the Raizer, and assess again once sitting",
          "The mobility assessment is not suitable for her" ], answer: 1,
          why: "CPPRO-001: if the patient cannot raise their hips, they may be unsafe to sit up unassisted. Use the manual task techniques if they need help, and assess again once they are sitting." }]
      } }
    ] },

    { title: "Sitting up", blocks: [
      { text: "0702. The Raizer brings Mavis up to sitting. About a minute later she goes quiet and pale. \"Oh, I feel a bit funny. Swimmy.\" She grips the backrest. AO2 repeats the obs while AO1 holds her steady." },
      { table: { title: "Obs so far", table: { head: ["", "0646 lying", "0704 sitting"], rows: [
        ["RR", "16", "18"], ["SpO2", "95% (air)", "95% (air)"], ["BP", "132/78", "104/66"], ["Pulse", "82", "98"],
        ["Temp", "35.4", "35.5"], ["GCS", "15", "15"]
      ] } } },
      { text: "Then she says: \"That's just how I felt last night, getting off the toilet. Then I was on the floor.\"" },
      { breakpoint: { title: "What has changed?", type: "Decision making",
        prompts: ["Compare the two sets. What has happened?", "What do you do right now?", "What does her last comment change?", "Is she going to stand and walk to bed?"],
        expected: [
          "Her systolic has fallen from 132 to 104 and her pulse risen from 82 to 98 on sitting up, with dizziness and pallor. All still in the white zone",
          "Hold the DOWN arrow to lower her slowly until the dizziness settles. Stay with her, keep her steady. Recheck the obs once she's lying back (DSY)",
          "She felt the same just before she fell: the fall may have a medical cause. With the recent medication change, she needs further investigation",
          "No. Standing is not safe now. CPP-045-AO: a medical cause of the fall, or a need for further management or investigation, means transport"
        ],
        teaching: ["This is why CPPRO-001 says assess again once the patient is sitting, before they move away", "A whole set can stay white and still tell you something important. Compare with the baseline (general teaching)"],
        realJob: "\"Mavis, that's important, thank you for telling us. We're going to lie you back for a minute.\"",
        decisions: [{ q: "Sitting up, Mavis is pale and dizzy, her BP has dropped from 132 to 104, and she says she felt the same just before she fell. What now?", options: [
          "Stand her up quickly so she can get to bed",
          "Lower the Raizer, recheck her, and plan transport: a possible medical cause of the fall",
          "Leave her sitting in the Raizer and wait for it to pass" ], answer: 1,
          why: "CPP-045-AO: a medical cause of the fall, or a need for further management or investigation, means transport. CPPRO-001 lists postural hypotension and a recent change in medication as precautions, and asks for reassessment once sitting." }]
      } },
      { text: "0708. Lowered most of the way back with her head on the pillow, Mavis feels better. BP 126/76, pulse 86.", muted: true }
    ] },

    { title: "Skin, warmth and the move", blocks: [
      { text: "AO1 looks at the skin again and works through the Braden scale while AO2 brings in the stretcher and a slide sheet." },
      { table: { title: "Braden (CTL-010)", table: { head: ["Category", "Score"], rows: [
        ["Sensory perception", "3 slightly limited"], ["Moisture", "2 very moist (incontinent, damp nightie)"], ["Activity", "3 walks occasionally"],
        ["Mobility", "2 very limited"], ["Nutrition", "2 probably inadequate (hasn't eaten since dinner, little to drink)"], ["Friction and shear", "2 potential problem"],
        ["Total", "14"]
      ] } } },
      { breakpoint: { title: "Preparing to move", type: "Practical skill",
        prompts: ["What is her Braden band? What does CTL-010 add before transport?", "Which skin sites will you check and look after?", "How will you get her from the Raizer to the stretcher?", "What goes with her?"],
        expected: [
          "Braden 14: medium risk (13 to 14). CTL-010 adds: reposition every 30 minutes with small body shifts; fresh continence pads and dry clothes before transport",
          "The sacrum and coccyx, heels, elbows and malleoli (CPPRO-003). She has red skin over the sacrum and heels already",
          "Run the Raizer down to flat, then move her onto the stretcher with the slide sheet and your manual task techniques (CPPRO-003: transfer aids prevent shear and friction). Pack the Raizer away flat (DSY)",
          "Her medication box, glasses and frame. Lock up and return the key to the key safe. Tell Sue (DSY)"
        ],
        teaching: ["Clean and dry moist skin gently. Don't rub hard (CPPRO-003)", "Keep sheets taut, and no pressure on the toes from blankets (CPPRO-003)", "Keep her warm through the move: the temperature is still in the yellow zone"],
        realJob: "Dry nightie and a fresh pad before the stretcher. She'll thank you, and so will her skin.",
        decisions: [{ q: "Braden 14 after a long lie, and she's being transported. What do CTL-010 and CPPRO-003 ask of you?", options: [
          "Nothing: the hospital will deal with it",
          "Fresh pads and dry clothes before transport, small position changes every 30 minutes, and report the risk and the red skin to the receiving facility",
          "Turn her onto her side for the whole trip" ], answer: 1,
          why: "CTL-010 medium risk (13 to 14): reposition every 30 minutes with small body shifts, fresh continence pads and dry clothes before transport. CPPRO-003: report the risk or any new pressure injury to the receiving facility." }]
      } }
    ] },

    { title: "Handover at Cummins Hospital", blocks: [
      { text: "0728. AO2 rang the hospital as you left. On arrival the nurse in charge meets you in the emergency room." },
      { table: { title: "ISBAR (CTL-054)", table: { head: ["", "Example"], rows: [
        ["I", "\"I'm [name], Ambulance Officer from Cummins. This is Mavis Treloar, 81.\""],
        ["S", "\"Found on her bathroom floor after a fall at about 3 am: a three and a half hour long lie. No injury found. She became dizzy and pale sitting up, with a drop in her BP, and says she felt the same just before she fell.\""],
        ["B", "\"Hypertension: the GP increased her perindopril last week. High cholesterol, arthritis. Second fall this year. Lives alone, uses a frame. No blood thinners, no allergies.\""],
        ["A", "\"Lying at 0646: BP 132/78, pulse 82, temp 35.4, GCS 15, BGL 5.6. Sitting at 0704: BP 104/66, pulse 98, dizzy. Lying again at 0708: BP 126/76, pulse 86. Braden 14, medium risk, red skin over the sacrum and heels. Incontinent overnight; dry clothes and a fresh pad on.\""],
        ["R", "\"She needs a review of why she fell, warming, and pressure care. Her daughter Sue in Port Lincoln knows she's here.\""]
      ] } } },
      { breakpoint: { title: "Hand over the fall", type: "Practical skill",
        prompts: ["Deliver your ISBAR now. Go.", "What must the nurse hear first?", "Did you hand over the skin and the Braden score?"],
        expected: ["The long lie, and the dizziness and BP drop on sitting up", "The lying and sitting obs with their times, and the medication change", "Braden 14 (medium risk), the red sacrum and heels, the incontinence"],
        teaching: ["CPPRO-003: report the pressure injury risk or any new pressure injury to the receiving facility", "Give the trend, not just the last set"],
        realJob: "\"BP 104 sitting\" is easy to miss. \"132 lying, 104 sitting, and she felt just like she did before the fall\" is the story.",
        decisions: [{ q: "Which detail matters most for the hospital's next decision?", options: ["That her bathroom has a slippery mat", "The dizziness with a BP drop on sitting up, the new perindopril dose, and the long lie", "Her daughter's address"], answer: 1,
          why: "These point to a possible medical cause of the fall, which is why she was transported (CPP-045-AO). The long lie adds the pressure injury and temperature concerns." }]
      } }
    ] },

    { title: "Debrief", blocks: [
      { box: { title: "Reflective questions", items: [
        "When did you first think about why she fell, not just how to get her up?",
        "What did you do about the cold, and when?",
        "Which items on the CPP-045-AO transport list did you check on the floor? What changed later?",
        "What did the mobility assessment tell you? Why did you choose the Raizer?",
        "What did the reassessment sitting up show? What would have happened if she'd stood straight up?",
        "How did you look after her skin before the move?",
        "Did your handover give the lying and sitting obs and the Braden score?"
      ] } },
      { box: { title: "Take-home messages", tone: "warn", items: [
        "More than one hour on the ground is a long lie: warm them, think about their skin, and screen for pressure injury",
        "Obs and the full history of the fall before any lift",
        "The transport list can change as you learn more: a medical cause, an injury, anticoagulants, other concerns, or a need for investigation",
        "Mobility assessment before the lift, and again once sitting, before they stand",
        "The Raizer is for an uninjured, alert patient under 150 kg who can't get up alone. It doesn't transport",
        "Hand over the long lie, the obs trend and the skin"
      ] } }
    ] },

    { title: "Scenario variations", optional: true, collapsed: true, chip: "Optional", blocks: [
      { box: { title: "1. She stays home", text: "No dizziness sitting up; she stands with her frame, steady. Nothing on the transport list. Do the FROP falls screen: second fall this year (2), needs supervision with housework (1), minimally unsteady on the walk (1) = 4, high risk: urgent falls referral to the Country Referral Unit, with her consent. Braden 14 after the long lie: advice and recommend follow-up with her GP. Consult the EOC Clinician, make sure there is appropriate supervision (her neighbour, Sue), give escalation advice and a falls handout (CPP-045-AO, CTL-003, CTL-010)." } },
      { box: { title: "2. A blood thinner in the box", text: "The medication box has apixaban in it. CPP-045-AO: a patient who has taken anticoagulants is transported, even with no injury found." } },
      { box: { title: "3. Hip pain", text: "Mavis has pain in her right groin and the leg looks shorter. An injury from the fall: the Raizer is not for her (maker's manual), and she needs transport. Pain relief per CPP-013-AO, request support for the move, keep her warm. No traction splint for a neck of femur fracture (CPPRO-028)." } },
      { box: { title: "4. Drowsy", text: "She opens her eyes to voice but drifts off, GCS 13. Not fully conscious and able to give feedback: don't use the Raizer. The mobility assessment isn't suitable with significant cognitive impairment (CPPRO-001). Check the BGL, consult the EOC Clinician, and transport." } },
      { box: { title: "5. No Raizer, or a tiny bathroom", text: "The Raizer is at another job, or the seat won't fit beside her. Plan the move with the aids named in CPPRO-001 (slide sheet, Hovermat, compact carry chair) and request support if you need more people or equipment (CPP-045-AO)." } }
    ] }
  ]
};
