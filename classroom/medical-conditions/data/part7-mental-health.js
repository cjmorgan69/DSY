// Part 7: Mental health (facilitator guide slides 37 to 40, 15 min). AR protocol CPP-052-AR, Risk Assessment Matrix CTL-011,
// Mental Health Act 2009. The guide says the Mental Health Act text must be read to students, not interpreted: the notes keep
// its wording.
(function () {
  DRIVE_SECTIONS.push({
    id: 'part7-mental-health',
    number: 7,
    title: 'Mental health',
    audience: 'Volunteer Ambulance Responders (AR course Day 6)',
    slides: [
      {
        type: 'bullets',
        title: 'Acute behavioural disturbance',
        points: [
          'Behaviour putting the patient or others at immediate risk of serious injury or illness',
          'Causes: mental illness and other medical conditions, head injury, drugs or medication',
          { t: 'Mental illness: “any illness or disorder of the mind” (Mental Health Act 2009)', sub: ['Psychotic: schizophrenia, schizoaffective, drug-induced psychosis, delusional disorder', 'Non-psychotic: anxiety, depression, eating disorders, PTSD, OCD'] },
          'Self-harm and suicide: thoughts or attempts'
        ],
        notes: {
          time: 3,
          say: ['When the behaviour is believed to be caused by a medical emergency, the patient may benefit from transport for treatment.'],
          tip: 'Study guide: it’s OK to ask about thoughts of suicide or self-harm. Taking drugs, beliefs, sexuality and the other listed exclusions do not on their own mean mental illness.'
        }
      },
      {
        type: 'bullets',
        title: 'Risk assessment first, every time',
        points: [
          'Keep reassessing throughout the case',
          'Look at the scene; find the exits',
          'Stay between the patient and the door',
          'Bring your hand-held radio',
          'Watch the patient; listen to others about recent behaviour',
          'Call SAPOL if needed'
        ],
        callout: { head: 'Risk Assessment Matrix (CTL-011)', text: 'High risk violence, high risk self-harm, moderate and low risk, each with actions. A laminated copy is in every ambulance.' },
        notes: { time: 3, say: ['Most people with a mental illness are not violent, but someone experiencing psychosis may be unpredictable.'] }
      },
      {
        type: 'bullets',
        title: 'Clinical assessment',
        points: [
          'Look for a cause you can treat: hypoxia, low blood volume, hypoglycaemia, head injury, drugs',
          { t: 'Mental Health Clinical Assessment tool (PCR aide-mémoire):', sub: ['Appearance, behaviour, conversation', 'Affect, perception, cognition, insight'] },
          'Calm voice, open body language, same eye level, honesty',
          'Give them time; avoid sudden moves; don’t touch without permission'
        ],
        notes: {
          time: 3,
          say: ['Use the tool as a guide when assessing acute behavioural disturbance.'],
          tip: 'Tool headings read from the SAAS deck slide 39; approach points from the study guide. Study guide also names STAMP (CTL-122) and LOWLINE (CTL-123).'
        }
      },
      {
        type: 'bullets',
        title: 'The Mental Health Act 2009',
        points: [
          'Specialist treatment for people with serious mental illness',
          'Protects their rights, liberty, dignity and self-respect',
          'Respectful rehabilitation and recovery',
          'Community treatment or detention when required',
          'Voluntary patient: assess, treat, transport as requested'
        ],
        callout: { head: 'Authorised officers', text: 'Can take a person into care and control for assessment: mental health clinicians, Ambulance Officers (after EOC Clinician consult), RFDS medical officers and flight nurses, and classes in the regulations.' },
        notes: {
          time: 3,
          say: [
            'READ AS WRITTEN (the guide says read it, not interpret it): The Mental Health Act 2009 is a law governing the treatment, care and rehabilitation of people with a serious mental illness in South Australia.',
            'The purpose of the Act is to: ensure specialist treatment is accessible for people with a serious mental illness; protect the rights and liberty of people with a serious mental illness and ensure their dignity and self-respect is retained, as far as is consistent with their protection and the protection of the public and the proper delivery of services; facilitate a sustained and respectful rehabilitation and recovery where possible; allow for community treatment or detention and treatment to be made when required.',
            'In certain situations the Mental Health Act empowers “authorised officers” to take a person who appears to have a mental illness and is otherwise refusing assessment or treatment into their care and control and transport that person to a place where they can undergo a medical assessment (which will include a mental health assessment).'
          ],
          tip: 'The study guide’s list of authorised officers also names Paramedics and Intensive Care Paramedics; the facilitator guide’s list does not.'
        }
      },
      {
        type: 'statement',
        kicker: 'Mental Health Act 2009',
        text: 'SAAS Ambulance Responders are NOT authorised officers.',
        sub: 'No power to take anyone into care and control: in the community, inter-hospital transfers, or when SAPOL asks. Refusing and disturbed: call the EOC Clinician.',
        notes: {
          time: 1,
          say: [
            'READ AS WRITTEN: SAAS Ambulance Responders do not have any legal powers under the Mental Health Act to take a patient into their care and control. This relates not only to cases in the community but also for inter hospital transfers and requests for transport by other agencies such as SAPOL.',
            'For all cases where a patient is exhibiting acute behavioural disturbance but is refusing assessment or transport (non-voluntary) contact the EOC Clinician for advice.'
          ]
        }
      },
      {
        type: 'bullets',
        title: 'Acute Behavioural Disturbance protocol (CPP-052-AR)',
        points: [
          'D for Danger: a risk assessment in every case',
          'Basic care; look for reversible causes',
          'Not voluntary or refusing: EOC Clinician, and on-scene clinical support (SAAS clinicians or SAPOL)'
        ],
        callout: { head: 'What clinical support brings', text: 'Advanced assessment, chemical restraint and sedation, physical restraint (the safety blanket), and authorised officer powers.' },
        notes: {
          time: 2,
          say: ['Direct students to the SAAS Clinical App, AR, Medical, Acute Behavioural Disturbance CPP-052-AR.'],
          tip: 'Study guide: if SAPOL or an authorised officer asks you to help restrain, use minimum force and no compression of the head, neck or chest.'
        }
      }
    ]
  });
})();
