// Part 8: Other medical emergency conditions (facilitator guide slide 41, 10 min) and IV therapy (slides 42 to 44, 10 min).
// There is no AR protocol for ACPO, overdose or meningococcal disease: basic care, clinical support, consult. Signs are from the
// study guide.
(function () {
  DRIVE_SECTIONS.push({
    id: 'part8-other',
    number: 8,
    title: 'Other medical emergencies and IV therapy',
    audience: 'Volunteer Ambulance Responders (AR course Day 6)',
    slides: [
      {
        type: 'bullets',
        title: 'Acute cardiogenic pulmonary oedema (ACPO)',
        points: [
          'The heart fails to pump (left heart failure): fluid fills the lungs',
          'Sudden breathlessness, fast breathing, hard work',
          'Gurgles or crackles; frothy sputum in extreme cases',
          'Pale and sweaty, maybe cyanosed; chest pain or tightness',
          'Fast pulse and high BP at first; low BP is a late sign'
        ],
        callout: { head: 'Manage', text: 'Posture, high-concentration oxygen, minimal exertion. Early clinical support, consult, be ready to resuscitate, urgent transport and notification.' },
        notes: { time: 4, say: ['Brief overview in basic terms: heart failure causing fluid in the lungs.'] }
      },
      {
        type: 'bullets',
        title: 'Narcotic overdose',
        points: [
          'Presentation depends on the substance: treat what you see',
          'Opioids: unconscious, slow or stopped breathing, pinpoint pupils',
          'Airway and ventilation; early clinical support (other clinicians can reverse opioids)',
          'Exclude other causes: stroke, low BGL, head injury, mental illness',
          'Consult the EOC Clinician'
        ],
        callout: { head: 'Your safety', text: 'Risk assessment first: stimulants especially can make patients dangerous.' },
        notes: { time: 3, say: ['Presentation depends on the substance; treat the presenting symptoms; consult the EOC Clinician for advice.'] }
      },
      {
        type: 'bullets',
        title: 'Meningococcal disease',
        points: [
          'Acute bacterial infection, sudden onset, can kill within hours',
          'Fever, altered GCS, nausea and vomiting, seizures, headache',
          'Infants: floppy, pale despite fever, don’t want to be handled',
          'Rash that doesn’t fade with pressure: a very late, serious sign',
          'Use the RDR chart'
        ],
        callout: { head: 'Manage', text: 'PPE early. Supine, high-flow oxygen. Early clinical support, consult, rapid transport and early notification.' },
        notes: { time: 3, say: ['Acute bacterial infection; sudden onset of illness; use the RDR chart for assistance.'], tip: 'Peaks late winter and early spring; ages 0 to 4 and 15 to 25 most at risk (study guide).' }
      },
      {
        type: 'statement',
        kicker: 'Other medical emergencies',
        text: 'No AR protocol for these. Basic care and life support for all of them.',
        sub: 'And everything else, and every patient you treat.',
        notes: { time: 0, say: ['Reinforce the importance of basic care and life support for all conditions.'] }
      },
      {
        type: 'compare',
        title: 'Facilitator demonstration: IV therapy',
        left: { head: 'Facilitator shows', points: ['The name and use of each piece of equipment', 'Assembling it for the clinician who will use it', 'Taking it apart and putting it back together'] },
        right: { head: 'Students practise', points: ['Checking the equipment', 'Setting up a line', 'Changing an empty bag'] },
        notes: {
          time: 4,
          say: ['Refer to the Clinical Skills study guide for detail.'],
          tip: 'Kit: assessment guide, 1 IV giving set, 2 IV fluid bags, 1 alcohol swab (per student). Scope: the SAAS workshop assesses ARs on set-up and bag change, but the Clinical Skills Study Guide v3.2 lists IV set-up as AO scope; station 6 is pitched as preparing the line for the paramedic. Check with the lead instructor.'
        }
      },
      {
        type: 'station',
        station: 's6',
        kicker: 'Practise: Day 6 station 6',
        title: 'Prepare the IV line for the paramedic',
        text: 'Spike, half-fill the chamber, prime, keep the end sterile, hand it over.',
        points: ['Nothing goes into a person', 'KVO = 10 drops a minute (20 drop/mL set)', 'Bag change: close the wheel with fluid still in the line'],
        notes: { time: 0, tip: 'DSY station page.' }
      },
      {
        type: 'bullets',
        title: 'Skill demonstration: IV therapy',
        points: ['Intravenous Therapy (Set-up Line)', 'Intravenous Therapy (Change Empty Bag)'],
        callout: { text: 'Assessor signs off in eLearning.' },
        notes: { time: 6, say: ['Students demonstrate the listed skills; the assessor signs off in eLearning.'] }
      },
      {
        type: 'statement',
        kicker: 'Afternoon tea',
        text: '15 minutes',
        sub: 'Please be back and ready on time.',
        notes: { time: 15 }
      }
    ]
  });
})();
