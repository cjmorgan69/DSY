/* Burns - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Source: SAAS CPP-006-AO Burns - AO v5.0 (8 December 2016), exported 31.08.2026. The PDF shows no review date.
   Body surface area from CTL-050 Wallace's Rule of Nines for Calculating BSA in Adults and CTL-051 Paediatric Rule of
   Nines (both exported 31.08.2026; read from the chart images). Pain relief points come from CPP-013-AO, as checked for
   the pain module. CPP-006-AO does not define a "significant burn" by size or site, so this module does not either. */
var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Burns",
  subtitle: "Ambulance Officer microlearning",
  headline: "Airway first. Then 20 minutes of running water",
  lead: "Remove the heat, cool with running water, then cover and keep the patient warm. But a suspected airway burn changes the order. This module covers CPP-006-AO: airway burns, thermal and chemical burns, hydrogel, what to do once cooling is done, and estimating the burn size.",
  minutes: 15,

  protocol: {
    code: "CPP-006-AO", name: "Burns - AO", version: "v5.0 (8 December 2016)", exported: "31 August 2026",
    also: [
      { code: "CTL-050", name: "Wallace's Rule of Nines for Calculating BSA in Adults" },
      { code: "CTL-051", name: "Paediatric Rule of Nines" },
      { code: "CPP-013-AO", name: "Pain Management - AO", version: "v7.2" }
    ]
  },
  footerNotes: ["CPP-006-AO v5.0 dates from December 2016 and shows no review date. Check the SAAS Clinical app for any newer version.",
    "CPP-006-AO does not define a significant burn by size or body area. If you are unsure, consult the EOC Clinician."],

  session: {
    intro: "For a team-led session. Allow about 20 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the introduction", time: "3 min", text: "Then ask: when does cooling stop being the first priority?" },
      { t: "Airway burns", time: "4 min", text: "Everyone names the four signs that raise suspicion, and the six things to monitor for." },
      { t: "Cooling and covering", time: "5 min", text: "Take turns reading a box. Check the hydrogel limits: 10 minutes for neonates, 20 for everyone else." },
      { t: "How big is it?", time: "3 min", text: "Work out the burn size for an adult with a burnt front of chest and one arm, then for a 2 year old's head." },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Burns: airway first, then cool" } },
      { text: "Burns are best treated by removing the heat source and cooling effectively with running water, to minimise tissue damage and pain. Then add analgesia to get the pain under control." },
      { text: "Basic care and life support come first, including pain control as per CPP-013-AO." }
    ] },

    { title: "Airway burns", blocks: [
      { box: { title: "Signs that increase suspicion of an airway burn", tone: "warn", check: { q: "A man has facial burns and singed eyebrows after a flash fire. He is talking normally. What does CPP-006-AO tell you to do with that finding?", a: "Treat it as raising your suspicion of an airway burn. Monitor for hoarseness, difficulty speaking, wheeze, stridor, shortness of breath or an altered conscious state. In a suspected airway burn, airway management and urgent transport take precedence over cooling." }, items: [
        "Facial burns",
        "Singed nasal hairs",
        "Singed eyelashes or eyebrows",
        "Soot around the nose or mouth"
      ] } },
      { box: { title: "Monitor for", items: [
        "Hoarseness", "Difficulty speaking", "Wheeze", "Stridor", "Shortness of breath", "Altered conscious state"
      ] } },
      { box: { title: "Suspected airway burn", tone: "no", items: [
        "Airway management and urgent transport take precedence over burn cooling",
        "Request clinical support",
        "Consult the EOC Clinician for advice",
        "Provide urgent transport and notify the receiving facility"
      ] } }
    ] },

    { title: "Thermal burns", blocks: [
      { box: { title: "Cool the burn", items: [
        "Cool the burn area with running water for 20 minutes",
        "Manage the environment so the patient does not become hypothermic during cooling",
        "Consider clinical support",
        "Consult the EOC Clinician for significant burns"
      ] } },
      { box: { title: "No running water? Hydrogel (BurnAID)", tone: "warn", check: { q: "No water at the scene. You cover a newborn's scald with a BurnAID hydrogel dressing. How long can it stay on?", a: "A maximum of 10 minutes for neonates. Every other patient: a maximum of 20 minutes." }, items: [
        "Apply a hydrogel (BurnAID) dressing to cover the burn",
        "Neonates: a maximum of 10 minutes",
        "All other patients: a maximum of 20 minutes",
        "Hydrogel is only for when cooling can't be achieved by other means. It does not replace running water where water is available",
        "Use it cautiously: it can cause hypothermia and further wound damage"
      ] } }
    ] },

    { title: "Chemical burns", blocks: [
      { box: { title: "Chemical burns", tone: "no", check: { q: "A farmer has a chemical splash burn to the forearm. Your partner reaches for a BurnAID dressing. What do you say?", a: "No hydrogel on chemical burns. Follow local management plans, or irrigate with running cold water for at least 20 minutes where that is chemically appropriate. Then consult the EOC Clinician." }, items: [
        "Do not use hydrogel dressings on chemical burns",
        "Follow local management plans, or irrigate with running cold water for a minimum of 20 minutes, where chemically appropriate",
        "Manage the environment so the patient does not become hypothermic during irrigation",
        "Consult the EOC Clinician, who may seek specialist advice (the protocol's example is SOT)"
      ] } }
    ] },

    { title: "Once cooling is done", blocks: [
      { box: { title: "After cooling or irrigation", tiles: true, steps: [
        { t: "Remove hydrogel", text: "Take off any hydrogel dressings." },
        { t: "Cover the burn", text: "Non-circumferential cling wrap, or a simple moist dressing." },
        { t: "Keep cooling if needed", text: "Continue cooling over the burn cover as needed." },
        { t: "Watch closely", text: "Monitor for deterioration or signs of airway compromise." },
        { t: "Keep them warm", text: "Manage the environment so the patient does not become hypothermic." },
        { t: "Transport", text: "Provide transport and notify the receiving facility." }
      ] } },
      { box: { title: "Consult the EOC Clinician if", items: [
        "Significant or chemical burns",
        "You are near the Adelaide metro area, about transporting directly to a burns unit: Royal Adelaide Hospital (adults) or Women's and Children's Hospital (children)"
      ] } }
    ] },

    { title: "Pain relief", blocks: [
      { text: "Cooling itself eases pain. Then add analgesia as per CPP-013-AO. The pain module has the detail." },
      { box: { title: "From CPP-013-AO", items: [
        "Paracetamol, if none in the past 4 hours: adults 1000 mg oral. Under 16: consult the EOC Clinician",
        "Ibuprofen, for crews who have completed the training, if no NSAIDs in the past 6 hours: adults 400 mg oral. Under 16: consult",
        "Methoxyflurane 3 mL, repeated once if needed. Never more than 2 doses in 24 hours, or 15 mL in a week",
        "IN fentanyl and sublingual ketamine only for AOs with a specific SAAS authority, as in the pain module"
      ] } },
      { links: [{ label: "Pain management module", href: "/microlearning/pain/" }] }
    ] },

    { title: "How big is the burn?", blocks: [
      { text: "The SAAS rule of nines charts estimate the burnt body surface area. Use them to describe the burn to the EOC Clinician and the receiving facility." },
      { table: { title: "Adults (CTL-050, Wallace's rule of nines)", table: { head: ["Body area", "% of body surface"], rows: [
        ["Head", "9%"], ["Each arm", "9%"], ["Front of the trunk", "18%"], ["Back of the trunk", "18%"], ["Each leg", "18%"], ["Perineum", "1%"]
      ] } } },
      { table: { title: "Children (CTL-051): the head is bigger and the legs smaller", table: { head: ["Age", "Head", "Each leg"], rows: [
        ["0 years", "18%", "14%"], ["1 year", "17%", "14.5%"], ["2 years", "16%", "15%"], ["3 years", "15%", "15.5%"], ["4 years", "14%", "16%"],
        ["5 years", "13%", "16.5%"], ["6 years", "12%", "17%"], ["7 years", "11%", "17.5%"], ["8 years", "10%", "18%"], ["9 years to adult", "9%", "18%"]
      ] }, items: ["Each arm 9% and the front of the trunk 18% at every age on the chart"] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { links: [
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
        { label: "CPP-006-AO Burns (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Burns%20-%20AO.pdf" },
        { label: "CTL-050 Adult rule of nines (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/Wallace%27s%20Rule%20of%20Nines%20for%20Calculating%20BSA%20in%20Adults.pdf" },
        { label: "CTL-051 Paediatric rule of nines (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/Paediatric%20Rule%20of%20Nines.pdf" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "How long does CPP-006-AO say to cool a thermal burn with running water?", options: ["5 minutes", "10 minutes", "20 minutes"], answer: 2,
        why: "Cool burn area with running water for 20 mins." },
      { q: "Which of these does the protocol list as increasing suspicion of an airway burn?", options: ["Burns to both hands", "Singed nasal hairs", "A burn larger than 9%"], answer: 1,
        why: "Signs increasing suspicion of airway burn include facial burns, singed nasal hairs or eyelashes/brows, and/or soot around nose or mouth." },
      { q: "You suspect an airway burn. What takes precedence over burn cooling?", options: ["Airway management and urgent transport", "Applying cling wrap", "Estimating the body surface area"], answer: 0,
        why: "In suspected airway burn, airway management and urgent transport take precedence over burn cooling." },
      { q: "Which of these is NOT on the protocol's list of things to monitor for in a possible airway burn?", options: ["Hoarseness", "Stridor", "Itchy skin"], answer: 2,
        why: "Monitor for hoarseness, difficulty speaking, wheeze, stridor, shortness of breath or altered conscious state." },
      { q: "No water is available. Maximum time for a BurnAID hydrogel dressing on a 4 year old?", options: ["10 minutes", "20 minutes", "As long as it takes to reach hospital"], answer: 1,
        why: "Hydrogel: neonates max 10 mins, all other patients max 20 mins." },
      { q: "When should hydrogel be used instead of running water?", options: ["Always: it's easier", "Only when cooling can't be achieved by other means", "For chemical burns"], answer: 1,
        why: "A hydrogel product may be considered where cooling cannot be achieved by other means, and should not be used in place of running water where it is available." },
      { q: "A chemical burn. What does the protocol say about hydrogel?", options: ["Use it for 20 minutes", "Do not use hydrogel dressings on chemical burns", "Use it after irrigation"], answer: 1,
        why: "Do not use hydrogel dressings with chemical burns." },
      { q: "How long should a chemical burn be irrigated, where water is chemically appropriate?", options: ["A minimum of 20 minutes", "A maximum of 10 minutes", "Until the pain stops"], answer: 0,
        why: "Follow local management plans or irrigate with running cold water for a minimum of 20 mins where chemically appropriate." },
      { q: "Cooling is complete. How should the burn be covered?", options: ["Cling wrap wound firmly all the way around the limb", "Non-circumferential cling wrap, or a simple moist dressing", "A dry gauze pad taped on"], answer: 1,
        why: "Cover burns: non-circumferential cling wrap, or simple moist dressing." },
      { q: "Why does the protocol keep warning about the environment during cooling?", options: ["To stop the patient becoming hypothermic", "To keep the dressing dry", "To speed up the cooling"], answer: 0,
        why: "Manage environmental conditions to ensure patients do not become hypothermic during cooling or irrigation." },
      { q: "Using the adult rule of nines, what is the burn size if the front of the trunk and one whole arm are burnt?", options: ["18%", "27%", "36%"], answer: 1,
        why: "CTL-050: front of the trunk 18% + one arm 9% = 27%." },
      { q: "On the paediatric chart, what share of the body is a 1 year old's head?", options: ["9%", "12%", "17%"], answer: 2,
        why: "CTL-051: the head is 18% at birth, 17% at 1 year, falling to 9% by 9 years." }
    ] } }] },

    { title: "Practical: cool, cover, keep warm", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs, at the station. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["A partner", "Cling wrap and a simple moist dressing", "A BurnAID dressing (training stock or the packaging)", "A blanket", "The rule of nines charts (CTL-050 and CTL-051)"] } },
      { steps: [
        { t: "Airway check", text: "Your partner has a 'facial burn'. Say the four signs that raise suspicion and the six you monitor for." },
        { t: "Cover a forearm", text: "Lay cling wrap over the 'burn' without wrapping it all the way around. Explain why." },
        { t: "Keep warm", text: "Cover everything except the burn being cooled. Talk through how you would manage a cold, windy evening." },
        { t: "Hydrogel times", text: "Each person states the BurnAID limits and when hydrogel is not used." },
        { t: "The numbers", text: "Each person picks a burn pattern and works out the percentage for an adult and for a 3 year old." }
      ] },
      { box: { title: "What good looks like", items: ["Airway suspicion raised without prompting", "No circumferential wrap", "Patient kept warm during cooling", "Hydrogel limits right, and never on chemical burns"] } },
      { note: "Suggested activities written for training. Check them with your lead instructor." }
    ] },

    { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "The Resus Room is a UK emergency medicine podcast. \"Burns; Roadside to Resus\" (October 2018, about an hour) follows the burns patient from the scene to the emergency department. \"Burns\" (August 2016, about 31 minutes) is a shorter overview. Optional listening. They reflect UK practice, so where they differ from CPP-006-AO, follow the protocol." },
      { links: [
        { label: "Burns; Roadside to Resus (2018)", href: "https://theresusroom.libsyn.com/burns-roadside-to-resus" },
        { label: "Burns (2016)", href: "https://theresusroom.libsyn.com/burns" }
      ] }
    ] }
  ]
};
