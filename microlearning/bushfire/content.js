/* Bushfire and burnover - microlearning for SAAS crews (AO group). Content only: the layout lives in ../shared/module.js.
   Sources (13 Nov 2026):
   - PRO-239 Bushfire Burnover v2.6 (EMAP, effective 30 Sep 2026, next review October 2027), owner's PDF (OFFICIAL, not
     stored in the repo), including Appendix 1 kit contents, Appendix 2 ABC radio, Appendix 3 action card, Appendix 5
     Bushfire Safer Places and Last Resort Refuges. PRO-239 wins wherever the presentation differs.
   - PRO-082 Response to Rural Fires (including bushfires) v3.5 (effective 5 Jan 2023, review date Oct 2024 passed;
     owner's PDF, not in the repo), added 13 Nov 2026 at the owner's request: warning levels, ratings issued by 1700 for
     4 days (replaces the deck's "after 4:30 pm for the next day"), CFS SOP 2.21 (appendix 4, under review), aged care
     shelter in place, Catastrophic days and personal bushfire plans (appendix 5). PRO-384 Health Checks for Emergency
     Service Personnel was read but kept for a separate session.
   - The SAAS presentation "Bushfire Preparedness for SAAS Clinicians" V3.0 (EMAP, 8 Oct 2025), slides and facilitator
     notes (owner's Google Slides link, not stored in the repo): Fire Danger Ratings, fire behaviour, shift preparation,
     driving near a fire, the Pinery case study. Its Extreme/Catastrophic day points probably come from PRO-081
     Catastrophic/Extreme Fire Days and PRO-082 Bushfire Response, which were not read.
   Where the two differ (13 Nov 2026, told to the owner): recall signal (PRO-239: continuous blasts on the siren or horn;
   deck: yelp, and fire services don't use sirens), lights (PRO-239 adds hazard lights), the patient's cover (PRO-239:
   standard blankets and offer a P2 mask; deck: fire blankets), the light fleet position (PRO-239 adds the footwell),
   how long the front takes (PRO-239: several minutes; deck: 5 to 10), when to get out (PRO-239: when the sound of the
   fire has passed), the shift afterwards (PRO-239: decided after the medical officer's review; deck: should not
   continue), which window to break (PRO-239: side or back, never the windscreen). PRO-239 is followed in each case.
   The opening questions, quiz wording and practical are DSY-written for the owner to review. No narrated video yet. */

var M = window.MODULE = {
  flow: true,
  draft: false,
  title: "Bushfire and burnover",
  subtitle: "Ambulance Officer microlearning",
  headline: "Know the fire day, and know what to do if the fire comes to you",
  lead: "Our crews work and drive in bushfire country. This module covers reading a fire day, getting yourself and the ambulance ready, responding into a fire area, the Pinery burnover, and the SAAS Bushfire Burnover procedure (PRO-239): before, during and after the fire front.",
  minutes: 20,

  protocol: {
    code: "PRO-239", name: "Bushfire Burnover", version: "v2.6 (30 September 2026, review due October 2027)",
    also: [
      { code: "PRO-082", name: "Response to Rural Fires (including bushfires)", version: "v3.5 (5 January 2023)" },
      { code: "EMAP", name: "Bushfire Preparedness for SAAS Clinicians (presentation)", version: "V3.0 (8 October 2025)" }
    ]
  },
  footerNotes: [
    "PRO-239 Bushfire Burnover v2.6 is a SAAS intranet procedure (effective 30 Sep 2026, next review October 2027). Where the October 2025 presentation differs, this page follows PRO-239.",
    "PRO-082 Response to Rural Fires v3.5 (effective 5 Jan 2023) passed its review date (October 2024). Its CFS SOP 2.21 appendix is marked \"under review\".",
    "Points marked \"presentation\" come from the presentation's slides and notes. Read PRO-081 Catastrophic/Extreme Fire Days on SAASnet too.",
    "The opening questions, quiz wording and practical marked \"DSY\" were written for training and should be checked by your lead instructor.",
    "If any of this brings up hard memories, Peer Support and the EAP are there for you."
  ],

  session: {
    intro: "For a team-led session. Allow about 30 minutes. Everyone works through the page on their own device, then talks it through. The hands-on part is the burnover skills stations, with a real ambulance.",
    steps: [
      { t: "Your area", time: "5 min", text: "Name the nearest Bushfire Safer Place and Last Resort Refuge to your station, and the ABC AM frequency for your area. If nobody knows, look them up together." },
      { t: "Read the day", time: "5 min", text: "Go through the four Fire Danger Ratings. Ask: what has to be in our vehicle on an Extreme or Catastrophic day, and who do we tell if it isn't?" },
      { t: "Responding in", time: "5 min", text: "Ask: who directs us into a known fire area, and when can we go onto an active fireground?" },
      { t: "Pinery", time: "5 min", text: "Read the case study. Ask: the road was open and thought safe. What would have warned you?" },
      { t: "Burnover and quiz", time: "10 min", text: "Say the burnover actions out loud, in order, without looking. Then everyone does the quiz alone." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { text: "A bushfire burnover is when a fast-moving fire front overtakes and engulfs people and vehicles. It's extremely dangerous. The best protection is being prepared and not putting yourself where a burnover could happen." },
      { text: "But SAAS crews do work near fires: on standby at a base camp or staging area, treating people hurt by a fire, on ordinary jobs close to fire activity, or just driving to a shift. PRO-239 applies to all staff, including commuting in a vehicle on a high-risk day." },
      { box: { title: "Good to know (PRO-239)", items: [
        "Fire authorities say a vehicle, including an ambulance or light fleet car, gives a much higher chance of survival than being caught in the open",
        "Staying inside your vehicle offers the best protection from radiant heat",
        "The procedure isn't there to encourage anyone to take unnecessary risks"
      ] } },
      { box: { title: "Before you read on (DSY)", tone: "warn", items: [
        "Where is the burnover kit in your ambulance?",
        "What's the ABC AM frequency for your area?",
        "If fire came across the road in front of you today, what would you do in the next two minutes?"
      ] } }
    ] },

    { title: "Read the day", blocks: [
      { text: "The Fire Danger Rating doesn't tell you how likely a fire is to start. It tells you how a fire would behave, and the harm it could do, if one starts. In the fire season the Bureau of Meteorology issues ratings by 1700 each day for the next 4 days. They're a preliminary guide and can change with the conditions (PRO-082)." },
      { table: { title: "Australian Fire Danger Rating System (presentation)", table: { head: ["Rating", "Message"], rows: [
        ["No rating", "No proactive action needed. Fires can still happen, but they're less likely to threaten the community"],
        ["Moderate", "Plan and prepare"],
        ["High", "Be ready to act"],
        ["Extreme", "Take action now to protect life and property. Fires may be uncontrollable at first, with spot fires up to 6 km ahead"],
        ["Catastrophic", "For your survival, leave bushfire risk areas. Spot fires up to 20 km ahead, and houses may not be safe"]
      ] } } },
      { box: { title: "How fires behave (presentation)", tone: "warn",
        check: { q: "You're at a staging area halfway up a slope, with the fire in the valley below. What's the problem?", a: "Fire moves much quicker up a slope, so operating above a fire isn't ideal. Watch the wind too: a change could put you in its path." },
        items: [
          "Watch the weather (current and forecast), wind direction, humidity, vegetation and topography",
          "Changes in topography are one of the biggest factors in changing fire behaviour. A fire moves much quicker up a slope",
          "A change in wind speed or direction can put you in the fire's path",
          "Embers can travel several kilometres ahead of the front. Smoke getting denser may mean the fire is closer than you think",
          "Fire makes its own weather and can move very quickly"
        ] } },
      { table: { title: "Bushfire warning levels (PRO-082)", table: { head: ["Warning", "Means"], rows: [
        ["Advice", "A fire has started but there's no immediate danger. Stay alert, watch for signs of fire, keep up to date"],
        ["Watch and Act", "A heightened level of threat. Conditions are changing: start taking action now"],
        ["Emergency Warning", "You may be in danger and need to take action immediately. Any delay puts lives at risk"]
      ] }, items: ["Every bushfire that had a warning ends with an \"Advice: reduced threat\" message"] } },
      { box: { title: "Warnings (PRO-239)", items: [
        "Monitor your local ABC AM radio for emergency warnings. Eyre Peninsula and West Coast: ABC Port Lincoln, 1485 AM",
        "Current alerts are on the ABC and CFS websites",
        "You may get warnings on your phone, but don't rely only on those",
        "The EOC won't necessarily have the latest on the fire front (presentation)"
      ] } }
    ] },

    { title: "Ready for a fire day", blocks: [
      { box: { title: "The rule (PRO-239)", tone: "no", items: [
        "Working in a Catastrophic or Extreme Fire Danger rated area, or an area of active fire: you must have adequate PPE and a burnover kit with you",
        "If you don't, tell your Operations Manager or shift ACTL or CTL straight away, at the start of your shift"
      ] } },
      { table: { title: "The burnover kit (PRO-239 Appendix 1)", table: { head: ["Item", "Number"], rows: [
        ["Instruction card", "1"], ["Kit bag", "1"], ["P2 / PFR masks", "2"], ["Fire gloves", "2 pairs"], ["Fire goggles", "2 pairs"], ["Burnover blankets", "2"]
      ] }, items: [
        "Burnover blankets are single use and vacuum sealed. Once opened they can't be repacked: open them only for a real burnover",
        "Country vehicles carry a checked kit through daylight saving time (October to April). It's secured under the cargo net",
        "Your helmet goes with you as well"
      ] } },
      { box: { title: "Before and during your shift (presentation)", items: [
        "Know the rating and warnings for your area and shift, including your drive to and from the station",
        "Drink plenty. Sunscreen, hat, sunglasses. Consider a long-sleeved uniform shirt",
        "Helmet with a working head torch, P2 masks, drinking water and the burnover kit in the vehicle",
        "Handheld GRN batteries changed. Know how to change talk groups quickly, outside your normal group",
        "Know the satellite phone as well as your mobile (Australia's country code is +61)",
        "Know how to open the station roller doors if the power fails, and how to use the UBD and CFS map books if the GPS fails",
        "Nothing that can burn on the dash: case cards, tissues, masks"
      ] } },
      { box: { title: "Extreme and Catastrophic days", tone: "warn", items: [
        "Fleet at least three-quarters full of fuel at all times. Fuel stations may be closed (presentation)",
        "Both crew carry their GRN radios whenever away from the vehicle (presentation)",
        "Thirds and observers: the Operations Manager decides, once SAAS is told of a Catastrophic or Extreme day forecast, usually at 1600 the day before (PRO-239)"
      ] } },
      { box: { title: "Catastrophic days and you (PRO-082)", items: [
        "If you're rostered on a Catastrophic day, you're expected to work",
        "Have your own bushfire survival plan, especially if you live in a high-risk area",
        "If getting to or from the station means driving through a Catastrophic area, talk it through with your manager beforehand",
        "Know where you'd go: a Bushfire Safer Place if you leave early, a Last Resort Refuge only if your plan has failed"
      ] } }
    ] },

    { title: "Responding into a fire area", blocks: [
      { box: { title: "Who sends you (PRO-239)", tone: "no",
        check: { q: "A CFS member on scene asks you to drive 2 km into the fireground to a collapsed firefighter. Can you?", a: "Not on your own. Ambulances don't respond to casualties on an active fireground unless at least one fire appliance escorts them, and you only respond into a known bushfire area under direction from the EOC. Ask for the patient to be brought to a safer area, or for an escort, through the EOC." },
        items: [
          "Respond to a case within a known bushfire area (standby, ordinary job or fire casualty) only under direction from the EOC",
          "The EOC checks you have suitable PPE and burnover kits, and finds a safe access route through the SAAS Commander, or SA Fire if there's no SAAS command",
          "Where possible the CFS brings patients to SAAS at a safer area, such as a base camp or staging area",
          "Otherwise the CFS provides a fire vehicle to escort the ambulance to the case. No ambulance goes to casualties on an active fireground without at least one fire appliance as escort"
        ] } },
      { box: { title: "How the CFS handles a medical emergency (CFS SOP 2.21, in PRO-082)", items: [
        "The CFS is the control agency for rural fires. SAAS is a support agency",
        "CFS crews give first aid and triage their own people, then decide whether SAAS is needed",
        "Can walk, not life threatening: the CFS brings them out to a staging area, group base or other safe place for SAAS",
        "Can't walk, serious or life threatening: the CFS rings 000, sets up a safe area for the casualty and SAAS, and liaises with SAAS about access and transport on a multi-agency talk group",
        "The CFS provides an escort vehicle for each SAAS vehicle entering an active fireground"
      ] } },
      { box: { title: "Entering the fireground (PRO-239 checklist)", steps: [
        { t: "Lights", text: "All vehicle lights on: headlights, hazards and emergency beacons, unless the fire authority asks you not to." },
        { t: "Turn-around spots", text: "Look for places to turn around for a quick escape." },
        { t: "Burnt ground", text: "Drive and park in burnt or low-fuel areas where you can." },
        { t: "Radio", text: "Vehicle GRN on the correct talk group, as declared by the EOC." },
        { t: "Oxygen", text: "Turn the D-size oxygen off at the cylinder if it isn't in use." }
      ] } },
      { box: { title: "On the way and on scene (presentation)", items: [
        "Find out where the fire is and which way it's travelling. Know your safe routes and escape routes",
        "Smoke cuts visibility: drive to the conditions. Watch for other emergency vehicles and people evacuating (PRO-239)",
        "Air conditioner on, in recirculation mode, to keep smoke out of the ambulance while you drive",
        "Park facing your escape route, without blocking escape or access routes. Keep scene times short",
        "Any doubt about the safety of the area: don't proceed. Contact the EOC for advice"
      ] } },
      { box: { title: "Bushfire Safer Places and Last Resort Refuges (PRO-239 Appendix 5)", items: [
        "A Bushfire Safer Place is a place of relative safety, such as some regional townships: low fuel, away from continuous bush, with gardens, lawns and roads to interrupt a fire",
        "A Bushfire Last Resort Refuge is a signed paddock or oval. Use it only if plans have failed and you can't reach a Safer Place. It may be very uncomfortable and unsafe in an extreme fire, but it's better than being caught on the road or on foot",
        "Know them for your area and the areas you drive through. The CFS website lists them all (presentation)"
      ] } },
      { box: { title: "Hospitals and aged care (PRO-082)", items: [
        "Facilities have their own plans with the CFS, including moving patients early to other facilities if needed",
        "Patients are NOT evacuated under immediate threat of fire: the risk is too great. Fire services help the facility shelter in place until the threat has passed",
        "If the facility isn't safe afterwards, SAAS is contacted to help move patients"
      ] } },
      { links: [{ label: "CFS: Bushfire Safer Places", href: "https://www.cfs.sa.gov.au/plan-prepare/before-a-fire-be-prepared/bushfire-safer-places/" }] }
    ] },

    { title: "Case study: Pinery, 2015", blocks: [
      { text: "25 November 2015 was forecast Extreme fire danger, with north-westerly winds of 50 to 60 km/h gusting to 90. The fire started at 1203 in flat farming country between Mallala and Balaklava. The first Emergency Warning went out within 10 minutes. Early reports described a 2 km front with flames about 30 feet high. A wind change to the west-south-west came through at 1500 (presentation)." },
      { table: { title: "What it did", table: { head: ["", "Number"], rows: [
        ["Houses destroyed", "91"], ["Vehicles destroyed", "98"], ["Farm machinery destroyed", "93"], ["Other structures destroyed", "388"],
        ["People", "2 died, 90 injured (5 critically)"], ["Firefighters deployed", "1700"]
      ] } } },
      { box: { title: "The burnover on Wasleys Road", tone: "warn",
        check: { q: "At Pinery, how long was it from first seeing flames on the dashcam to the front passing?", a: "About 2 minutes. On a road open to the public and thought safe, about 20 km from where the front was predicted to be." },
        items: [
          "At 1300 a CFS strike team was driving down Wasleys Road, about 40 km from Pinery and 20 km from where the front was predicted to be",
          "The road was open and thought safe: an SAAS crew could have driven it. The nearby weather station now read above Catastrophic",
          "Smoke blew across the road, it went dark, and the smoke thickened as the front came",
          "The trucks hadn't started their pumps. On one truck, two firefighters got out to start the pump and went through the burnover on the back",
          "About 2 minutes from flames first seen to the front passing. In a forest or on a slope it could have been very different"
        ] } }
    ] },

    { title: "Burnover: before the fire hits", blocks: [
      { box: { title: "If a burnover is imminent (PRO-239)", tone: "no", items: [
        "Be prepared. Do not try to outrun the fire front",
        "Try to find a safe refuge, a building, close by. If there isn't one, stay in the vehicle",
        "Continuous blasts on the siren or horn: the universal signal for a possible burnover. Anyone outside comes back to the vehicle immediately",
        "On a fireground, fire services sound a siren continuously to warn of a burnover. Know that signal",
        "Stay together and follow any instructions"
      ] } },
      { box: { title: "Park as safely as possible (action card)", items: [
        "The clearest area near you, away from dense bush and flammable material on the ground. Already burnt ground if you can",
        "Off the roadway, so nobody runs into you in the smoke. Behind a solid structure if possible",
        "Windscreen facing the oncoming fire front"
      ] } },
      { box: { title: "Before the fire hits (PRO-239)", tiles: true, steps: [
        { t: "MAYDAY", text: "Press the GRN emergency call button. Your call sign and \"MAYDAY, MAYDAY, MAYDAY\"." },
        { t: "Location", text: "Press the ambulance icon on the Garmin for your coordinates. Give them, and any landmarks, to the EOC. The EOC contacts the CFS (Adelaide Fire) straight away." },
        { t: "Radios", text: "Handheld GRN radios with you, on the correct talk group." },
        { t: "Close up", text: "Windows and vents closed. Engine off. Air conditioner off." },
        { t: "Be seen", text: "Headlights, hazard lights and emergency beacons on." },
        { t: "PPE", text: "Leather gloves, P2 mask and goggles from the kit. Cover as much skin as you can, with any clothing you have." },
        { t: "Ready to treat", text: "Red and blue kits where you can reach them." },
        { t: "Safe position", text: "Into the rear, low, under the woollen fire blanket. (Presentation: climb through from the cab, don't get out to go round.)" }
      ] } },
      { box: { title: "With a fire appliance escort (PRO-239)", items: [
        "The fire appliance and its fire suppression will be used to shield the ambulance where possible",
        "Sheltering in the fire appliance itself is unlikely: there's no time, no room, and a patient who can't walk can't be moved across"
      ] } },
      { note: "Look after each other and don't panic (PRO-239)." }
    ] },

    { title: "During and after", blocks: [
      { box: { title: "During the burnover (PRO-239)", tone: "warn",
        check: { q: "You're sheltering in the back of the ambulance with a patient on the stretcher. What goes over the patient, and where are you?", a: "Cover the patient with standard blankets and offer them a P2 mask. You're low, below window level, beside the airway seat and the forward-facing attendant seat footwell, under the woollen fire blanket with your P2 mask on." },
        items: [
          "Expect a lot of noise, smoke and heat. It can be distressing. Stay calm",
          "Stay inside the vehicle",
          "Get below window level, out of the radiant heat. Ambulance: in the rear, beside the airway seat and the forward-facing attendant seat footwell. Light fleet: on the rear seat or in the footwell",
          "Cover yourselves with the woollen fire blanket and stay low. Cover your mouth with your P2 mask: breathing will be difficult",
          "A patient on the stretcher: cover them with standard blankets and offer them a P2 mask",
          "Drink water to stay hydrated, but don't pour water over yourself: steam burns",
          "The front may take several minutes to pass"
        ] } },
      { box: { title: "Don't get out too soon", tone: "no", items: [
        "Do not leave the vehicle until the sound of the fire has passed, unless conditions inside the vehicle stop you staying"
      ] } },
      { box: { title: "After the fire front (PRO-239)", steps: [
        { t: "Check it's safe", text: "Then leave carefully. Doors may not work: break a side or back window, not the windscreen (it's laminated and bonded to the body)." },
        { t: "PPE stays on", text: "Everything will be hot and there may be airborne debris. Keep the woollen blanket on too. Helmet on." },
        { t: "Watch for hazards", text: "Weakened trees, aircraft overhead, other vehicles." },
        { t: "Check and treat", text: "Check the crew and patient for injuries and treat as needed." },
        { t: "Call the EOC", text: "Report your status on the handheld radio." },
        { t: "Move to safety", text: "A freshly burnt area will do. Keep watching the weather, especially wind changes." },
        { t: "Wait for rescue", text: "You'll be rescued as soon as possible. If a CFS crew is with you, follow their directions." }
      ] } },
      { box: { title: "Afterwards (PRO-239)", items: [
        "Everyone involved has a medical examination by a medical officer. Whether you continue your shift is decided after that review",
        "Peer Support is arranged for all staff. Your Team Leader or Manager helps with incident reports",
        "There will be a SAAS operational debrief"
      ] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { box: { title: "SAAS procedures (SAASnet)", items: [
        "PRO-239 Bushfire Burnover v2.6",
        "PRO-081 Catastrophic/Extreme Fire Days",
        "PRO-082 Response to Rural Fires (including bushfires) v3.5",
        "PRO-080 Extreme Heat Event"
      ], note: "All staff must comply with PRO-239. Ask your team leader if you can't find these." } },
      { table: { title: "ABC emergency broadcasters in SA (PRO-239 Appendix 2)", table: { head: ["Area", "Station", "Frequency"], rows: [
        ["Eyre Peninsula and West Coast", "Port Lincoln", "1485 AM"], ["North and West", "Port Pirie", "639 AM"], ["Adelaide", "Adelaide", "891 AM"],
        ["Riverland", "Renmark", "1062 AM"], ["South East", "Mount Gambier", "1161 AM"]
      ] } } },
      { links: [
        { label: "CFS: Bushfire Safer Places", href: "https://www.cfs.sa.gov.au/plan-prepare/before-a-fire-be-prepared/bushfire-safer-places/" },
        { label: "CFS: warnings and incidents", href: "https://www.cfs.sa.gov.au/warnings-restrictions/warnings/incidents-warnings/" },
        { label: "Using a satellite phone (video from the presentation)", href: "https://www.youtube.com/watch?v=Vm5-SxlJKwA" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { intro: "Questions drawn from PRO-239 Bushfire Burnover, PRO-082 Response to Rural Fires and the SAAS Bushfire Preparedness presentation. Pick an answer for each, then check.", questions: [
      { q: "What does the Fire Danger Rating tell you?", options: ["How likely a fire is to start today", "How a fire would behave, and the harm it could do, if one starts", "Where today's fires are"], answer: 1,
        why: "Ratings show the potential behaviour and impact should a fire start, not the likelihood of one starting (presentation)." },
      { q: "What is the message for a Catastrophic day?", options: ["Be ready to act", "Take action now to protect life and property", "For your survival, leave bushfire risk areas"], answer: 2,
        why: "Moderate: plan and prepare. High: be ready to act. Extreme: take action now. Catastrophic: for your survival, leave bushfire risk areas." },
      { q: "Which bushfire warning means \"you may be in danger and need to take action immediately\"?", options: ["Advice", "Watch and Act", "Emergency Warning"], answer: 2,
        why: "PRO-082: Advice (no immediate danger), Watch and Act (heightened threat, start taking action), Emergency Warning (take action immediately; any delay puts your life at risk)." },
      { q: "A fire front is about to reach the town's aged care home. What happens to the residents?", options: ["SAAS evacuates them by ambulance straight away", "They shelter in place with fire service support until the threat has passed", "Staff drive them to the oval"], answer: 1,
        why: "PRO-082: patients are not evacuated under immediate threat of fire as the risk is too great. Fire services support the facility to shelter in place; SAAS helps move patients afterwards if the facility isn't safe." },
      { q: "You're rostered in an Extreme Fire Danger area and there's no burnover kit in the vehicle. What do you do?", options: ["Carry on, it's only needed on Catastrophic days", "Tell your Operations Manager or shift ACTL or CTL straight away, at the start of the shift", "Borrow one from the CFS if you're sent to a fire"], answer: 1,
        why: "PRO-239: working in a Catastrophic or Extreme rated area, or an area of active fire, you must have adequate PPE and a burnover kit. If not, advise your Operations Manager or shift ACTL/CTL immediately." },
      { q: "Who directs SAAS crews to a case within a known bushfire area?", options: ["The CFS incident controller", "The EOC", "The crew decides"], answer: 1,
        why: "PRO-239: SAAS resources only respond to a case within a known bushfire area under direction from the EOC, which checks PPE and kits and arranges a safe access route." },
      { q: "When will an ambulance respond to casualties on an active fireground?", options: ["When the road is open", "Only with at least one fire appliance escorting it", "Whenever the patient is critical"], answer: 1,
        why: "PRO-239: ambulance resources will not respond to casualties on an active fireground unless there is at least one fire appliance to escort them." },
      { q: "Which is on PRO-239's checklist for entering a fireground?", options: ["Turn the D-size oxygen off at the cylinder if not in use", "Turn the beacons off so you don't distract fire crews", "Leave the radio on your normal talk group"], answer: 0,
        why: "All lights and beacons on (unless the fire authority asks otherwise), look for turn-around spots, burnt or low-fuel areas, GRN on the talk group declared by the EOC, and D-size oxygen off at the cylinder if not in use." },
      { q: "What is the universal signal for a possible burnover?", options: ["Three short horn toots", "Continuous blasts on the siren or horn", "Flashing headlights"], answer: 1,
        why: "PRO-239: give continuous blasts on the siren/horn. Anyone outside the vehicle returns immediately. Fire services use a continuously sounding siren on the fireground." },
      { q: "A burnover is imminent and there's no building nearby. Which way should the vehicle face?", options: ["Away from the fire, ready to drive off", "Windscreen towards the fire front", "Side-on to the fire"], answer: 1,
        why: "PRO-239: park as safely as possible with the windscreen facing the fire, off the roadway, in the clearest area, on burnt ground if possible. Don't try to outrun the fire." },
      { q: "What's the first radio action before the fire hits?", options: ["A phone call to the station", "The GRN emergency call button: call sign and \"MAYDAY, MAYDAY, MAYDAY\"", "A message on the MDT"], answer: 1,
        why: "PRO-239: activate the GRN emergency call button with your call sign and MAYDAY three times, then give your Garmin coordinates. The EOC contacts the CFS (Adelaide Fire)." },
      { q: "Before the fire hits, the engine and air conditioner should be…", options: ["Engine running, air conditioner on recirculate", "Engine off, air conditioner off, windows and vents closed", "Engine off, air conditioner on"], answer: 1,
        why: "PRO-239: close all windows and vents, turn off the engine and air conditioner. Headlights, hazard lights and beacons on." },
      { q: "During the burnover, a patient is on the stretcher. What does PRO-239 say?", options: ["Give them the burnover blankets", "Cover them with standard blankets and offer them a P2 mask", "Move them to the floor"], answer: 1,
        why: "PRO-239 action card: crew under the woollen fire blanket with a P2 mask; a patient on the stretcher is covered with standard blankets and offered a P2 mask." },
      { q: "Why not pour water over yourself during the burnover?", options: ["It wastes drinking water", "Risk of steam burns", "It damages the PPE"], answer: 1,
        why: "PRO-239: keep hydrated by drinking water, but don't pour water over yourself due to the risk of steam burns." },
      { q: "When do you get out of the vehicle?", options: ["As soon as the flames are past the windows", "When the sound of the fire has passed, unless conditions inside force you out", "After exactly 10 minutes"], answer: 1,
        why: "PRO-239: do not exit the vehicle until the sound of the fire has passed, unless conditions in the vehicle prevent you from remaining inside." },
      { q: "The doors won't open after the burnover. Which window do you break?", options: ["The windscreen", "A side or back window", "Any window"], answer: 1,
        why: "PRO-239 action card: break a side or back window. The windscreen is laminated and bonded to the body of the vehicle." },
      { q: "After a burnover, who decides if you carry on with your shift?", options: ["You and your partner", "It's decided after a medical examination by a medical officer", "The CFS crew"], answer: 1,
        why: "PRO-239: all staff involved in a burnover have a medical examination by a medical officer, and the ability to continue on shift is decided after this review." }
    ] } }] },

    { title: "Practical: the burnover drill", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Do the burnover skills stations with a real ambulance, in pairs: getting the vehicle ready, responding in, the burnover drill against the clock, and getting out afterwards." },
      { links: [{ label: "Burnover skills stations", href: "/stations/burnover/" }, { label: "Health check stations (fire standby)", href: "/stations/health-checks/" }] },
      { note: "Never press the GRN emergency call button in training, and don't open the vacuum-sealed burnover blankets (DSY)." }
    ] }
  ]
};
