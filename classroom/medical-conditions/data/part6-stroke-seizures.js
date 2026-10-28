// Part 6: Stroke and seizures (facilitator guide slides 33 to 36, 15 min). AR protocols CPP-039-AR and CPP-037-AR.
(function () {
  DRIVE_SECTIONS.push({
    id: 'part6-stroke-seizures',
    number: 6,
    title: 'Stroke and seizures',
    audience: 'Volunteer Ambulance Responders (AR course Day 6)',
    slides: [
      {
        type: 'compare',
        title: 'Stroke',
        left: { head: 'Ischaemic', points: ['A blocked artery: clot or plaque'] },
        right: { head: 'Haemorrhagic', points: ['A weakened vessel ruptures and bleeds'] },
        callout: { text: 'TIA (“mini stroke”): a temporary interruption. Same signs, but they go, within minutes up to 24 hours. A warning sign.' },
        notes: { time: 2, say: ['The interruption of blood, and so oxygen, makes the affected brain work abnormally. Without prompt treatment it can be permanently damaged.'] }
      },
      {
        type: 'cards',
        title: 'Signs of a stroke: FAST',
        cols: 4,
        variant: 'plain',
        items: [
          { h: 'Face', t: 'Drooped? Can they smile?' },
          { h: 'Arms', t: 'Can they raise both?' },
          { h: 'Speech', t: 'Slurred or confused?' },
          { h: 'Time', t: 'Basic care, urgent EOC Clinician contact' }
        ],
        callout: { text: 'Also: dizziness or a fall, vision loss, sudden severe headache, trouble swallowing, altered conscious state, unequal pupils. Check the BGL: a low BGL can mimic a stroke.' },
        notes: {
          time: 3,
          say: [
            'The effects depend on which part of the brain is affected and how much.',
            'Stroke suspected: make urgent contact with the EOC Clinician about ongoing management, including on-site clinical support and the right destination.'
          ],
          tip: 'ROSIER and Code Stroke are not within AR scope (facilitator guide). Extra signs and the BGL point are from the study guide.'
        }
      },
      {
        type: 'cards',
        title: 'Seizures',
        cols: 3,
        items: [
          { h: 'Focal', t: 'Conscious throughout' },
          { h: 'Generalised', t: 'Loses consciousness. Higher risk: airway and breathing' },
          { h: 'Febrile', t: 'Young children, usually 6 months to 3 years: a fast rise in temperature' }
        ],
        callout: { text: 'Causes: epilepsy, stroke, head injury, tumour, hypoxia, hypotension, hypoglycaemia, toxins and drugs, electrolytes, meningitis, eclampsia.' },
        notes: {
          time: 5,
          say: [
            'A seizure is a sudden intense burst of electrical activity that mixes up the messages between brain cells.',
            'Seizures can be very subtle or dramatic.',
            'Febrile: it is more likely the speed of the rise, not the peak temperature, that causes it.'
          ]
        }
      },
      {
        type: 'bullets',
        title: 'Seizure management',
        points: [
          'Basic care first: airway (jaw lift, suction, OPA), oxygen, protect from harm',
          'Most stop on their own',
          'Correct what you can: hypoxia, fever, hypoglycaemia (their protocols)',
          'Prolonged or recurrent: early clinical support and EOC Clinician consult',
          'Post-ictal: protect, reassure, BGL, high-flow oxygen, transport'
        ],
        callout: { head: 'Your safety', text: 'Post-ictal patients can be disorientated and aggressive.' },
        notes: {
          time: 5,
          say: [
            'Direct students to the SAAS Clinical App, AR, Medical, Seizures CPP-037-AR.',
            'Other SAAS clinicians can give medicine to stop a seizure.'
          ],
          tip: 'Study guide: more than 5 minutes, or recurrent without regaining consciousness, is status epilepticus. The study guide also lists trauma as a cause the AR can correct.'
        }
      }
    ]
  });
})();
