// Part 4: Chest pain (facilitator guide slides 24 to 31, 30 + 10 min). AR protocol CPP-029-AR; GTN limits from SAAS deck
// slide 29. Non-cardiac causes and the cardiac signs are from the study guide.
(function () {
  DRIVE_SECTIONS.push({
    id: 'part4-chest-pain',
    number: 4,
    title: 'Chest pain',
    audience: 'Volunteer Ambulance Responders (AR course Day 6)',
    slides: [
      {
        type: 'bullets',
        title: 'Chest pain',
        points: [
          'One of the most common reasons to call an ambulance',
          'Heart, lungs and large vessels (the aorta) are all in the chest',
          'The chest wall (ribs, muscles) can hurt too, and pain can be referred',
          { t: 'Non-cardiac causes:', sub: ['Reflux (GORD): the most common', 'Muscle or bone; lung (pneumonia, pulmonary embolism, pleurisy, pneumothorax)', 'Gut: ulcers, gall bladder, pancreatitis; stress or anxiety'] }
        ],
        notes: { time: 2, say: ['Discuss some common non-cardiac causes of chest pain.'] }
      },
      {
        type: 'bullets',
        title: 'Angina',
        points: [
          'The coronary arteries can’t meet the heart muscle’s oxygen demand',
          'Usually narrowed by atherosclerosis',
          'Enough blood at rest, so pain comes with extra workload: exercise, illness, injury',
          'The obstruction is not complete or fixed'
        ],
        callout: { head: 'Time is muscle', text: 'The longer the heart goes without oxygen, the more damage. Dead heart muscle never repairs.' },
        notes: { time: 3, say: ['Emphasise the issue is a lack of oxygen supply to the heart muscle, most commonly from an obstruction in a coronary artery.'] }
      },
      {
        type: 'bullets',
        title: 'Acute myocardial infarction (AMI)',
        points: [
          'Complete interruption of blood supply to part of the heart',
          'Severe atherosclerosis plus a clot that blocks the vessel',
          'No oxygen reaches the cells: they become hypoxic and begin to die',
          'Can trigger life-threatening rhythms: VF and VT',
          'Definitive care: clot-busting drugs or angioplasty and a stent, as soon as possible'
        ],
        notes: { time: 2, say: ['Lack of oxygen damages the muscle and can cause sudden failure of the heart’s electrical system.'], tip: 'Definitive care point: study guide.' }
      },
      {
        type: 'table',
        title: 'Angina versus AMI',
        head: ['', 'Angina', 'Myocardial infarction'],
        rows: [
          ['Where', 'Substernal or across the chest; to neck, jaw, arms, back, shoulders', 'Same'],
          ['Feels like', 'Dull or heavy pressure or squeezing', 'Same, maybe more intense'],
          ['How long', 'Usually 2 to 15 minutes, settles after activity stops', 'Longer than 10 minutes'],
          ['Other symptoms', 'Usually none', 'Sweating, pale grey colour, nausea, weakness, dizziness'],
          ['Brought on by', 'Weather extremes, exertion, stress, meals', 'Often nothing'],
          ['Relieved by', 'Rest, less stress, GTN', 'GTN may give incomplete or no relief']
        ],
        fs: 32,
        callout: { text: 'Both can present with chest pain: treat every chest pain as a true cardiac emergency.' },
        notes: {
          time: 3,
          say: [
            'Some patients have atypical chest pain with few if any of these symptoms: particularly elderly women and people with diabetes or other chronic disease.',
            'Some describe “heaviness”, “a funny feeling in my chest” or “really bad reflux”.',
            '“Any pain between nose and navel is cardiac until proven otherwise or another obvious cause is present.” If in doubt, consult the EOC Clinician early.'
          ]
        }
      },
      {
        type: 'bullets',
        title: 'Chest pain management',
        points: [
          'Basic care and life support first',
          'Rest and reassurance: never walk them to the stretcher or ambulance',
          'Oxygen if they show signs of poor oxygenation',
          'Aspirin: stops a clot in a coronary artery getting bigger (not for pain)',
          'GTN: widens vessels, so less blood returns and the heart works less',
          'GTN can drop the BP a long way: only after EOC Clinician consult'
        ],
        callout: { head: 'ECG', text: 'A 4-lead ECG early, for the clinicians who come after you, but not at the expense of treatment. Keep monitoring: VT or VF can start any time, and the defibrillator is ready.' },
        notes: {
          time: 10,
          say: [
            'Medications aim to improve oxygen supply to the heart and reduce its workload.',
            'You may see paramedics titrate oxygen while an AR gives high flow: different clinical levels, different practice.',
            'Describe the pharmacology of GTN and aspirin as in the AR Pharmacology study guide. Demonstrate the GTN technique.',
            'You don’t interpret the ECG at AR level: you record it. Treat the patient, not the monitor.'
          ],
          tip: 'Cardiac monitoring was taught in Foundations of Care.'
        }
      },
      {
        type: 'table',
        title: 'GTN: the limits',
        head: ['Check', 'GTN 300 microg tablet under the tongue only if'],
        rows: [
          ['EOC Clinician', 'Has advised it on consult'],
          ['Systolic BP', 'Greater than 100 mmHg (check it right before)'],
          ['Pulse', 'Between 60 and 120'],
          ['PDE-5 inhibitors', 'None in the last 24 h: Viagra (sildenafil), Levitra (vardenafil). 48 h for Cialis (tadalafil)']
        ],
        fs: 38,
        callout: { text: 'PDE-5 inhibitors treat erectile dysfunction and pulmonary hypertension. With GTN: life-threatening hypotension. Ask discreetly but thoroughly.' },
        notes: {
          time: 5,
          say: [
            'Direct students to the SAAS Clinical App, AR, Chest Pain CPP-029-AR.',
            'All chest pain is cardiac unless there is another cause. Other SAAS clinical levels may give GTN without consult; the AR consults first.',
            'Check the BP immediately before GTN and regularly afterwards.'
          ],
          tip: 'Station 4 (CPP-029-AR v2.1) adds avanafil to the 24 h list, repeats every 5 minutes up to 3 doses or as the EOC Clinician directs, and obs every 3 to 5 minutes after GTN.'
        }
      },
      {
        type: 'compare',
        title: 'Facilitator demonstration: GTN sublingual',
        left: { head: 'Facilitator shows', points: ['Drug checking', 'Giving a GTN tablet under the tongue'] },
        right: { head: 'Students practise', points: ['Checking', 'Giving a GTN tablet', 'With the right PPE'] },
        notes: { time: 5, say: ['Students met prescription GTN in the AA phase.'], tip: 'Training tablets only: nobody takes any medicine.' }
      },
      {
        type: 'station',
        station: 's4',
        kicker: 'Practise: Day 6 station 4',
        title: 'Chest pain: aspirin and GTN under the tongue',
        text: 'Aspirin unless allergic. GTN only on EOC Clinician advice, inside the limits.',
        points: ['4-lead ECG and a BP on your partner', 'Five cards: is GTN inside the limits?', 'Nobody takes a tablet'],
        notes: { time: 0, tip: 'DSY station page. Runs inside the 10 min skill demonstration block if time is short.' }
      },
      {
        type: 'bullets',
        title: 'Skill demonstration: GTN sublingual',
        points: ['Preparing and Administering GTN Sublingual'],
        callout: { text: 'Assessor signs off in eLearning.' },
        notes: { time: 10, say: ['Students demonstrate the listed skills; the assessor signs off in eLearning.'] }
      }
    ]
  });
})();
