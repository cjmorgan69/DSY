/* Eyre Peninsula envenomation microlearning. Content only: the layout lives in ../shared/module.js.
   Sources: SAAS CPP-008-AO Envenomation - AO (exported 31.08.2026) and CPPRO-022 Pressure Bandaging and
   Immobilisation v1.0. Nothing here goes beyond those two documents. */
window.MODULE = {
  draft: false,
  title: "Envenomation Training",
  subtitle: "Eyre Peninsula - microlearning module",
  headline: "Recognising and managing envenomation on the Eyre Peninsula",
  lead: "Work through each section in order. Content follows SA Ambulance Service CPP-008-AO Envenomation - AO and CPPRO-022 Pressure Bandaging and Immobilisation.",

  protocol: {
    code: "CPP-008-AO", name: "Envenomation - AO", version: "v5.0 (17 May 2019)", exported: "31 August 2026",
    also: [{ code: "CPPRO-022", name: "Pressure Bandaging and Immobilisation", version: "v1.0 (effective 17 May 2019, review date 30 Nov 2024)" }]
  },
  footerNotes: ["Emergency: call 000. Toxinology Service SA (WCH): 08 8161 7000"],

  panels: [
    { title: "Introduction to envenomation", open: true, blocks: [
      { video: { src: "https://www.youtube.com/embed/5724zYD14LQ?si=aUyky1CmxHHbV57t", title: "Introduction to envenomation" } },
      { text: "A number of venomous animals can cause envenomation through bites or stings. The aim of prehospital treatment is to reduce the effects of the venom and symptomatically manage the patient until definitive care." },
      { text: "Snakebite is the most common type of envenoming accident in SA and fatalities can occur. The most significant immediate clinical risk is early cardiovascular collapse leading to cardiac arrest. Australian native snake venom can also cause paralysis, muscle breakdown, renal damage and affect the blood's ability to clot." },
      { box: { title: "Why pressure bandaging works", text: "Venom is thought to travel mainly through the lymphatic vessels. A pressure bandage compresses them and delays symptom onset. Muscle movement pushes lymph back towards the central circulation, so keep the bitten limb and the whole patient as still as possible, and keep the bitten area below the level of the heart where practical." } },
      { box: { title: "Precautions", items: [
        "Be continuously alert for airway and cardiovascular collapse, hypoventilation and apnoea",
        "Be prepared to intervene with BVM ventilation and/or advanced airway management",
        "All patients should have cardiac monitoring, with defibrillation available should cardiac arrest occur",
        "Use nasal capnography as per the Nasal Capnography CPP for your clinical level"
      ] } }
    ] },

    { title: "Bite and sting types", blocks: [
      { chooser: {
        label: "Choose a bite or sting", placeholder: "Select a bite or sting",
        empty: "Select a bite or sting to see what to expect and how to manage it.",
        options: [
          { value: "snake", label: "Australian native snake" },
          { value: "octopus", label: "Blue-ringed octopus" },
          { value: "bigblack", label: "Big black spider (> 2cm body length)" },
          { value: "redback", label: "Redback spider (if identified)" },
          { value: "bee", label: "Bee, wasp or ant sting" },
          { value: "exotic", label: "Exotic snake or other marine bite or sting" }
        ],
        data: {
          snake: { sections: [
            { title: "Australian native snake: what to expect", items: [
              "Snakebite is the most common envenoming accident in SA and fatalities can occur",
              "Most significant immediate risk: early cardiovascular collapse leading to cardiac arrest",
              "Can also cause paralysis, muscle breakdown, renal damage and impaired blood clotting",
              "Onset of symptoms varies with time from bite, any first aid applied and how active the person has been"] },
            { title: "Management", items: [
              "Basic care and request clinical support", "Ensure minimal patient exertion",
              "Do not apply a tourniquet or wash the bite site",
              "If a tourniquet is already applied, consult the EOC Clinician, who may contact Toxinology Service SA",
              "Bite on a limb: apply a pressure bandage and immobilise the limb, whether or not there are signs of envenoming",
              "Bite to head or torso: cover the bite area with a simple dressing",
              "Immobilise the patient with a vacuum mattress if available, head elevated about 20-30°",
              "Provide transport and notify the receiving facility"] }
          ] },
          octopus: { sections: [
            { title: "Blue-ringed octopus: what to expect", items: [
              "Bites occur when the octopus is removed from the water and placed on exposed skin",
              "Envenoming causes rapidly progressing flaccid paralysis, leading to loss of airway protection and respiratory paralysis",
              "Can be fatal without urgent respiratory support"] },
            { title: "Management", items: [
              "Focus on airway and ventilation due to the paralysing effects of the venom",
              "Basic care and request clinical support", "Ensure minimal patient exertion",
              "Bite on a limb: apply a pressure bandage and immobilise the limb",
              "Bite to head or torso: cover the bite area with a simple dressing",
              "Immobilise with a vacuum mattress if available", "Provide transport and notify the receiving facility"] }
          ] },
          bigblack: { sections: [
            { title: "Big black spider (> 2cm body length): what to expect", items: [
              "Most spider bites are not a medical emergency",
              "The exception is local Funnel Web species, which can be rapidly fatal. Treat bites from big black spiders over 2cm in body length with significant symptoms (usually within 4 hours) as possible Funnel Web",
              "Funnel Web envenomation signs include any of: tingling around the mouth and tongue, increased salivation and sweating, nausea, vomiting or headache, shortness of breath, altered conscious state, hypertension"] },
            { title: "Management", items: [
              "If symptomatic or the bite was less than 4 hours ago, treat as for snakebite: pressure bandage and immobilise",
              "Otherwise, consult the EOC Clinician for advice",
              "Do not apply a tourniquet or wash the bite site",
              "Provide transport and notify the receiving facility"] }
          ] },
          redback: { sections: [
            { title: "Redback spider (if identified): what to expect", items: ["Unlikely to cause death", "May need management of non-life-threatening symptoms"] },
            { title: "Management", items: [
              "Basic care", "Apply ice therapy if available to reduce localised discomfort, and rest the area",
              "Do not apply a pressure bandage", "Pain management as per CPP-013-AO",
              "Consult the EOC Clinician for advice regarding management and transport",
              "If required, provide transport and notify the receiving facility"] }
          ] },
          bee: { sections: [
            { title: "Bee, wasp or ant sting: what to expect", items: ["Watch for signs and symptoms of allergy or anaphylaxis"] },
            { title: "Management", items: [
              "Basic care", "If allergy or anaphylaxis is present, treat as per CPP-003-AO",
              "Remove any remaining stinging apparatus with a sideways scraping motion, avoiding squeezing the venom sac (bee sting)",
              "Apply ice therapy if available to reduce localised discomfort",
              "Consult the EOC Clinician for advice regarding management and transport",
              "If required, provide transport and notify the receiving facility"] }
          ] },
          exotic: { sections: [
            { title: "Exotic snake or other marine bite or sting: what to expect", items: ["Includes all exotic (non-Australian) snake bites and marine bites and stings other than blue-ringed octopus"] },
            { title: "Management", items: ["Consult the EOC Clinician to contact Toxinology Service SA for specific advice"] }
          ] }
        }
      } }
    ] },

    { title: "Pressure bandaging", blocks: [
      { video: { src: "https://www.youtube.com/embed/jSDZbZcWAdQ?si=OizX4q7Sr3myOuHp", title: "Pressure immobilisation technique" } },
      { box: { title: "When to apply", items: [
        "Suspected bite from an Australian native snake or blue-ringed octopus, whether or not they show signs of envenoming",
        "Bite from a large (> 2cm body length) dark or black spider less than 4 hours ago, and/or signs of systemic envenoming"] } },
      { checklist: { title: "Practise the steps", intro: "Tick off each step as you practise it.", items: [
        { t: "Expose the limb", text: "Expose the entire limb up to the armpit or groin, removing any circumferential jewellery and footwear. Cut clothing with shears rather than moving the limb." },
        { t: "Locking turn", text: "Start at the fingers or toes with a locking turn, covering all but the cuticle beds." },
        { t: "Bandage upwards", text: "Extend proximally towards the armpit or groin. Each loop covers 2/3 of the previous loop and is pulled moderately tight, taking care not to over-tighten." },
        { t: "Join the next roll", text: "If one bandage is not enough, hold the end of the first firmly and start the next from that point with another locking turn." },
        { t: "Finish at the armpit or groin", text: "Do not continue back down the limb if bandage is left over. Cut it and tape it to the previous turn." },
        { t: "Mark the bite", text: "Circle the bite site with a pen on the bandage." },
        { t: "Check the result", text: "About as firm as for a sprained ankle, so it is difficult to get two fingers under the bandage. Only the cuticle beds are visible to check distal circulation." }
      ] } },
      { box: { title: "Contraindications", tone: "no", items: [
        "Do not elevate a bitten limb",
        "Do not remove pressure bandages or any tourniquets already applied. If the patient has severe pain in the limb, or circulation at the cuticle bed is significantly impaired, consult the EOC Clinician, who will contact the SA Toxinology Service (WCH, 08 8161 7000)"] } },
      { box: { title: "Complications", items: [
        "Pain from a tight bandage: consult the EOC Clinician, who will contact the SA Toxinology Service. Consider analgesia if pain is an issue",
        "Restlessness on long transports: a vacuum mattress can be slightly tilted and supported to take pressure off dependent areas",
        "Feeling hot: use the vehicle air conditioning as needed",
        "Compromised ventilation: watch for and manage hypoventilation and apnoea"] } }
    ] },

    { title: "Immobilisation and equipment", blocks: [
      { box: { title: "Immobilise the limb and the patient", items: [
        "Once bandaged, apply a padded cardboard splint secured with triangular or general purpose roller bandages. This is mandatory if a vacuum mattress is not available",
        "A vacuum mattress is the preferred approach where readily available. Move the patient onto it, ideally by longboard, keeping the patient and limb still, and use it as a splint for the whole body",
        "Do not remove the patient's clothing before placing them in the vacuum mattress",
        "Raise the head of the stretcher to about 20-30°. This keeps the patient settled and still, keeps the bitten limb below the heart, and makes vomiting easier to manage",
        "If the patient becomes claustrophobic or needs respiratory or cardiac support, open the valve to quickly deflate the mattress and undo the straps",
        "Do not allow the patient to walk to the stretcher"] } },
      { box: { title: "Required equipment", items: [
        "PPE", "Shears", "SAAS Snakebite Bandage kit (4 x 15cm elasticised roller bandages)",
        "Large cardboard splint, plus triangular bandages or general purpose 15cm roller bandages to secure it, if a vacuum mattress is not available",
        "ECG monitor/defibrillator", "Vacuum mattress (where readily available)"] } },
      { note: "Infection control: perform hand hygiene before and after touching the patient where possible. Wear gloves if there is a risk of blood or body fluid exposure, or if you have non-intact skin." }
    ] },

    { title: "Knowledge check", blocks: [
      { quiz: { intro: "Test your knowledge with these questions based on CPP-008-AO and CPPRO-022.", questions: [
        { q: "How firm should a pressure bandage be?", options: ["As tight as possible", "About as firm as for a sprained ankle, difficult to get two fingers under", "Loose, just covering the bite"], answer: 1,
          why: "Apply about as firmly as for a sprained ankle. Once applied, it should be difficult to get two fingers easily under the bandage." },
        { q: "How much of the previous loop should each new loop cover?", options: ["1/3", "1/2", "2/3"], answer: 2,
          why: "Each loop of the bandage should cover 2/3 of the previous loop." },
        { q: "How far up the limb should the bandage extend?", options: ["Just above the bite site", "To the elbow or knee", "To the armpit or groin"], answer: 2,
          why: "Bandage the entire limb, from the fingers or toes up to the armpit or groin." },
        { q: "What should you do if a tourniquet is already applied?", options: ["Remove it immediately", "Consult the EOC Clinician, who may contact Toxinology Service SA", "Loosen it slightly before bandaging"], answer: 1,
          why: "Do not remove pressure bandages or tourniquets already applied. Consult the EOC Clinician, who will contact the SA Toxinology Service." },
        { q: "How is venom thought to mainly spread from the bite?", options: ["Through blood vessels", "Through lymphatic vessels", "Through muscle tissue"], answer: 1,
          why: "Venom is thought to be predominantly transported via lymphatic vessels." },
        { q: "Where should the bitten limb be positioned?", options: ["Elevated above the heart", "Below the level of the heart, never elevated", "It does not matter once bandaged"], answer: 1,
          why: "Do not elevate a bitten limb. Keep the bitten area below the level of the heart where practical." },
        { q: "What should you do with rings and other circumferential jewellery on the bitten limb?", options: ["Leave them on under the bandage", "Remove them when exposing the limb, before bandaging", "Remove them at hospital"], answer: 1,
          why: "Expose the entire limb, removing any circumferential jewellery and footwear." },
        { q: "A patient was bitten on the chest by a snake. What first aid applies?", options: ["Pressure bandage around the chest", "Cover the bite with a simple dressing and keep the patient still", "Wash the bite and apply ice"], answer: 1,
          why: "For a bite to the head or torso, cover the bite area with a simple dressing and keep the patient as still as possible." },
        { q: "An identified redback spider bite should be managed with:", options: ["Ice therapy if available and rest the area", "A pressure bandage and splint", "A tourniquet"], answer: 0,
          why: "Apply ice therapy if available to reduce localised discomfort, and rest the area." },
        { q: "A big black spider (> 2cm) bit someone 6 hours ago and they have no symptoms. What should you do?", options: ["Pressure bandage and immobilise anyway", "Consult the EOC Clinician for advice", "No action needed"], answer: 1,
          why: "Treat as snakebite if symptomatic or the bite was less than 4 hours ago. Otherwise consult the EOC Clinician." },
        { q: "What is the priority for a blue-ringed octopus envenomation?", options: ["Ice therapy", "Airway and ventilation", "Washing the bite site"], answer: 1,
          why: "Focus on airway and ventilation due to the paralysing effects of the venom." },
        { q: "A splint is mandatory when:", options: ["A vacuum mattress is not available", "The bite is on the torso", "Always, even inside a vacuum mattress"], answer: 0,
          why: "A padded cardboard splint is mandatory if a vacuum mattress is not available to immobilise the patient." }
      ] } }
    ] },

    { title: "Key principles and what not to do", blocks: [
      { box: { title: "Do", items: [
        "Request clinical support",
        "Ensure minimal patient exertion and keep the patient as still as possible",
        "Remove circumferential jewellery and footwear, and cut clothing with shears to expose the limb",
        "Bandage a bitten limb from the fingers or toes to the armpit or groin, and circle the bite site on the bandage",
        "For bites to the head or torso, cover the bite with a simple dressing and keep the patient still",
        "Splint the limb, or immobilise the patient in a vacuum mattress if available",
        "Immobilise with the head elevated about 20-30°, keeping the bitten area below the heart",
        "Have cardiac monitoring and defibrillation available, and be ready to ventilate",
        "Provide transport and notify the receiving facility"] } },
      { box: { title: "Do not", tone: "no", items: [
        "Apply a tourniquet",
        "Wash or clean the bite site (swabbing for venom identification is highly sensitive to venom on the skin)",
        "Elevate a bitten limb",
        "Remove pressure bandages or tourniquets already applied. Consult the EOC Clinician instead",
        "Move or manipulate the limb to remove clothing",
        "Continue bandaging back down the limb if bandage is left over",
        "Remove the patient's clothing before placing them in a vacuum mattress",
        "Allow the patient to walk to the stretcher"] } }
    ] }
  ]
};
