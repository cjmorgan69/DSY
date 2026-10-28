// Part 5: Diabetic emergencies (facilitator guide slide 32, 10 min). AR protocol CPP-031-AR. Signs and hyperglycaemia are
// from the study guide.
(function () {
  DRIVE_SECTIONS.push({
    id: 'part5-diabetes',
    number: 5,
    title: 'Diabetic emergencies',
    audience: 'Volunteer Ambulance Responders (AR course Day 6)',
    slides: [
      {
        type: 'cards',
        title: 'Diabetes mellitus',
        cols: 3,
        items: [
          { h: 'Type 1', t: 'Autoimmune: the immune system destroys the insulin-making cells in the pancreas' },
          { h: 'Type 2', t: 'Progressive: the body resists insulin and/or makes less of it' },
          { h: 'Gestational', t: 'High BGL first appearing in pregnancy; usually goes after the birth' }
        ],
        callout: { text: 'Not enough insulin, or cells that don’t use it: glucose can’t leave the blood, so it builds up (hyperglycaemia).' },
        notes: { time: 2, say: ['Briefly discuss the pathophysiology of diabetic emergencies.'] }
      },
      {
        type: 'bullets',
        title: 'Hypoglycaemia',
        points: [
          'The brain can’t store much glucose: it needs a constant supply',
          'Low BGL: confusion, unconsciousness, seizures; untreated, brain damage',
          { t: 'Usually a diabetic who has:', sub: ['Delayed or missed a meal (but taken their insulin)', 'Not eaten enough carbohydrate', 'Exercised harder than usual', 'Taken too much insulin or diabetes medicine', 'Been unwell, especially vomiting'] },
          'Not only diabetics: sick or injured children especially'
        ],
        callout: { head: 'Signs', text: 'BGL below 3.5. Anxious, shaky, headache, dizzy, hungry, slurred speech, confused or agitated, seizures, unconscious.' },
        notes: { time: 3, say: ['Hypoglycaemia can cause seizures and can mimic a stroke.'], tip: 'Signs list and “been unwell” are from the study guide.' }
      },
      {
        type: 'bullets',
        title: 'Hypoglycaemia: the AR protocol',
        points: [
          'Every altered conscious state gets a BGL, diabetic or not',
          'Below 3.5 mmol/L: treat, then reassess their neurology once corrected',
          '2 years and over, able to swallow (can cough when asked): oral glucose up to 15 g',
          'Under 2: consult the EOC Clinician before glucose paste',
          'Unconscious: early clinical support (other clinicians carry medicines to reverse it)'
        ],
        callout: { head: 'High BGL', text: 'Basic care, clinical support, consult the EOC Clinician. Never help a patient give insulin: lowering it fast is dangerous.' },
        notes: {
          time: 5,
          say: [
            'Direct students to the SAAS Clinical App, AR, Medical, Hypoglycaemia CPP-031-AR.',
            'Under 2: conscious level is hard to judge, too much glucose can be aspirated, and other serious causes need assessing.'
          ],
          tip: 'High BGL callout: facilitator guide plus the study guide (Hyperglycaemia). No glucagon at AR level.'
        }
      },
      {
        type: 'station',
        station: 's5',
        kicker: 'Practise: Day 6 station 5',
        title: 'Diabetic emergencies: the BGL and oral glucose',
        text: 'An accurate BGL, then who gets oral glucose, how much, and when to call.',
        points: ['Finger prick only on a willing adult, or the control solution', 'Lot number matches the calibration bar', 'Four patient cards'],
        notes: { time: 0, tip: 'DSY station page. The SAAS timetable has no practice time for this: use the station on a consolidation night or at the end of the day.' }
      }
    ]
  });
})();
