// Part 3: Allergy and anaphylaxis (facilitator guide slides 15 to 23, 85 + 20 min). AR protocol CPP-022-AR; procedures
// CPPRO-008, CPPRO-010, CPPRO-011. The practice doses are the guide's own (slide 21).
(function () {
  DRIVE_SECTIONS.push({
    id: 'part3-anaphylaxis',
    number: 3,
    title: 'Allergy and anaphylaxis',
    audience: 'Volunteer Ambulance Responders (AR course Day 6)',
    slides: [
      {
        type: 'bullets',
        title: 'Allergy',
        points: [
          'The immune system over-reacts to a normally harmless allergen',
          'Medicines, the environment (pollens, grasses, moulds, pets), food proteins',
          'Not an intolerance: that doesn’t involve the immune system',
          'About 1 in 3 Australians develop an allergy at some time',
          { t: 'Mild to moderate signs:', sub: ['Swollen lips, face, eyes', 'Hives or welts; tingling mouth', 'Abdominal pain, vomiting (signs of anaphylaxis with insect allergy)'] }
        ],
        callout: { head: 'No breathing, airway or BP problem', text: 'But it can progress to anaphylaxis: watch closely. Basic care and life support, consult the EOC Clinician. Asthma signs: follow the AR Asthma protocol.' },
        notes: { time: 10, say: ['The most common allergic conditions are food allergies, eczema, asthma and hay fever.'] }
      },
      {
        type: 'video',
        title: 'Video: Anaphylaxis',
        video: { length: '5:00', file: 'Anaphylaxis after wasp stings to the face', where: 'SAAS PowerPoint slide 16', note: 'Play this video from the SAAS Medical Conditions PowerPoint (slide 16).' },
        notes: {
          time: 8,
          say: [
            'A classic case after wasp stings to the face: hypotensive, pale and sweaty, “I’m drifting off”. Three doses of adrenaline; a rebound anaphylaxis is shown.',
            'Not every sign is present: swelling, sweating and pale skin, CNS and CVS signs, but no gut signs or the usual rash.'
          ],
          ask: ['Which body systems were involved?']
        }
      },
      {
        type: 'cards',
        title: 'Anaphylaxis: the three killers',
        cols: 3,
        variant: 'number',
        items: [
          { h: 'Angioedema', t: 'Swelling around the airway: obstruction' },
          { h: 'Bronchospasm', t: 'Severe asthma-like breathing' },
          { h: 'Circulatory collapse', t: 'Shock: hypotension' }
        ],
        callout: { text: 'A severe allergic reaction, usually within 20 minutes to 2 hours of the trigger, often in more than one body system. Always a medical emergency.' },
        notes: {
          time: 4,
          say: ['Common antigens: insect venom (bees, wasps), seafood, peanuts.', 'Discuss a localised reaction versus the systemic effects of anaphylaxis.']
        }
      },
      {
        type: 'bullets',
        title: 'Signs of anaphylaxis',
        points: ['Difficult or noisy breathing', 'Swelling of the tongue', 'Swelling or tightness in the throat', 'Difficulty talking, hoarse voice', 'Wheeze or persistent cough', 'Persistent dizziness or collapse; hypotension', 'Pale and floppy (young children)'],
        callout: { text: 'Adrenaline is the most common IM injection volunteers give. It is life-saving.' },
        notes: { time: 7, say: ['These are in addition to the signs of a mild allergic reaction. Not all will be present.'] }
      },
      {
        type: 'cards',
        title: 'When the AR Anaphylaxis protocol applies',
        cols: 3,
        variant: 'check',
        items: [
          { h: 'Hypotension', t: 'As per the RDR chart' },
          { h: 'Severe bronchospasm', t: 'Severe asthma' },
          { h: 'Severe breathing distress from airway swelling', t: 'Face or tongue, or lower: hoarse voice, “my throat is closing”' }
        ],
        callout: { text: 'Any one, two or all three. Anaphylaxis suspected: CPP-022-AR.' },
        notes: { time: 10, say: ['Direct students to the SAAS Clinical App, AR, Medical, Anaphylaxis CPP-022-AR.'] }
      },
      {
        type: 'image',
        title: 'Adrenaline (epinephrine)',
        img: 'img/adrenaline.jpg',
        caption: 'Auto-injectors, and the SAAS adrenaline 1 mg in 1 mL ampoules',
        notes: { time: 0, tip: 'Picture from the SAAS Medical Conditions PowerPoint v3.0 (used with SAAS permission).' }
      },
      {
        type: 'compare',
        title: 'Adrenaline: two ways',
        left: { head: 'Auto-injector (EpiPen)', points: ['Pre-set dose', 'The preferred AR method, using the patient’s own', 'Patient has one and a care plan: give it as per the plan, THEN consult the EOC Clinician'] },
        right: { head: 'SAAS ampoule, drawn up for IM', points: ['Only if no auto-injector is available', 'Only after EOC Clinician consult', '10 microg/kg, maximum 500 microg, dose as the EOC Clinician directs'] },
        callout: { text: 'Adrenaline always goes with basic care and life support.' },
        notes: {
          time: 10,
          say: [
            'If adrenaline is to be given and an auto-injector is available, it must be used.',
            'Discuss the actions, onset, indications, contraindications and common side effects of adrenaline in anaphylaxis, and the adult and paediatric auto-injector doses.'
          ],
          tip: 'Everyone given adrenaline for anaphylaxis goes to hospital, even if their symptoms resolve (study guide). Insect sting still visible: flick it off rather than grab it (study guide).'
        }
      },
      {
        type: 'video',
        title: 'Optional video: how to use an EpiPen',
        vimeo: { id: '339479927', length: '5:34', linkOnly: true },
        notes: { time: 0, videoSummary: ['Using an EpiPen auto-injector (SAAS Clinical Education, AA AR AO How to use EpiPen).'], tip: 'Optional: not in the SAAS workshop timetable. From the Medical Conditions study guide (SAAS Clinical Education). Use it if time allows, or set it for revision.' }
      },
      {
        type: 'bullets',
        title: 'IM adrenaline injections',
        points: [
          'Basic care and life support first',
          'Know the life threats: angioedema, severe bronchospasm, hypotension',
          'Medication Checks CPPRO-008',
          'Drawing Up and Labelling Medications CPPRO-010',
          'Intramuscular Injection CPPRO-011'
        ],
        notes: { time: 6, say: ['Review the key concepts of CPP-022-AR and the procedures relating to IM adrenaline.'] }
      },
      {
        type: 'compare',
        title: 'Facilitator demonstration: IM adrenaline',
        left: { head: 'Facilitator shows', points: ['Drug checking', 'Drawing up from the ampoule', 'Labelling (if required)', 'IM injection of SAAS adrenaline'] },
        right: { head: 'Students draw up and inject (into a pad)', points: ['Adult: 500 microg', '6-year-old (20 kg): 200 microg', '3-month-old: 50 microg'] },
        callout: { text: 'ARs don’t calculate weight-based doses: give the dose the EOC Clinician calculates and directs.' },
        notes: {
          time: 15,
          say: [
            'Briefly refresh the auto-injector: taught in the AA phase.',
            'This is the students’ first time injecting with needles and syringes. Show them slowly as a group, then break into small groups supervised by a trainer.'
          ],
          activity: 'The guide gives 30 min for the demonstration and practice: about 15 min demonstrating, then station 3.',
          tip: 'Kit: assessment guide, sharps containers, injection pads or improvised (arms, oranges, toilet rolls), blunt needles, IM needles, adrenaline ampoules (5 per student suggested, training stock), EpiPen trainer, PCRs.'
        }
      },
      {
        type: 'station',
        station: 's3',
        kicker: 'Practise: Day 6 station 3',
        title: 'Anaphylaxis and IM adrenaline',
        text: 'Own EpiPen first. Ampoule only on EOC Clinician advice.',
        points: ['Inject into the practice pad only', 'Sharps straight into the container, never recap', 'Dose cards: 15 kg, 28 kg, 50 kg, 90 kg'],
        notes: { time: 15, tip: 'DSY station page.' }
      },
      {
        type: 'bullets',
        title: 'Skill demonstration: IM adrenaline',
        points: ['Preparing and Administering Adrenaline (Epinephrine) for IM Injection'],
        callout: { text: 'Assessor signs off in eLearning.' },
        notes: { time: 20, say: ['Students demonstrate the listed skills; the assessor signs off in eLearning.'] }
      },
      {
        type: 'statement',
        kicker: 'Lunch',
        text: '30 minutes',
        sub: 'Please be back and ready on time.',
        notes: { time: 30 }
      }
    ]
  });
})();
