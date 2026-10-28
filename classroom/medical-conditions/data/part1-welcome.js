// Medical Conditions (Ambulance Responder) workshop, Part 1: Welcome and introduction.
// Built from the SAAS Medical Conditions Facilitator Guide v3.0 260114 (slides 1 to 8), the PowerPoint Medical Conditions AR
// v3.0 260114 and the Medical Conditions Study Guide (Volunteer AR) v2.2 260512. Slide text is condensed from those documents.
// Times are the guide's. "Say" and "Ask" come from the facilitator guide; anything DSY added is marked "DSY" in the tip.
// The SAAS PowerPoint pictures and embedded videos are not copied: video slides are placeholders (play them from the SAAS deck).
(function () {
  DRIVE_SECTIONS.push({
    id: 'part1-welcome',
    number: 1,
    title: 'Welcome and introduction',
    audience: 'Volunteer Ambulance Responders (AR course Day 6)',
    slides: [
      {
        type: 'title',
        title: 'Medical Conditions',
        subtitle: 'Ambulance Responder (Volunteer)',
        lines: ['AR course Day 6', 'SA Ambulance Service workshop v3.0 260114'],
        notes: {
          time: 1,
          say: ['General introduction: welcome to the workshop. Introduce yourself and the training team for the day.'],
          tip: 'Before class (30 min, trainer and assessor only): check the slides and any videos play with clear audio, set up the room and stations, and check everyone has finished the prerequisites (Theory Assessment, study guide, the five eLearning lessons; see the Course Completion Report on the Medical Conditions course page in SAAS eLearning).'
        }
      },
      {
        type: 'statement',
        kicker: 'Acknowledgement of Country',
        text: 'We acknowledge the Traditional Owners of Country throughout South Australia and recognise their continuing connection to land, their spirituality, history and culture.',
        sub: 'We pay our respects to Elders past, present and emerging.',
        notes: { time: 1, say: ['Read the acknowledgement as written (SAAS deck wording).'] }
      },
      {
        type: 'bullets',
        title: 'Welcome and housekeeping',
        points: ['Emergency exits, bathrooms, first aid', 'Non-smoking facility, car parking', 'Sign the attendance sheet', 'Phones on silent or vibrate, please', 'Fit to participate: a big practical day', 'SAAS Code of Ethics for Volunteers'],
        callout: { head: 'Breaks', text: 'Morning tea 15 min, lunch 30 min, afternoon tea 15 min. It is a full day: please be back on time.' },
        notes: {
          time: 1,
          say: [
            'Today has a large practical component. If you have a medical condition or injury, please talk to one of the facilitators.',
            'Our conduct here today is governed by the SAAS Code of Ethics for Volunteers.'
          ],
          tip: 'No student is placed in a role play that might aggravate an existing injury (for example a knee or back injury): adapt it.'
        }
      },
      {
        type: 'bullets',
        title: 'Today prepares you to use the AR protocols',
        points: [
          'Review your Ambulance Assist medical skills and the pre-workshop eLearning',
          'Primary phase assessment and management of medical conditions',
          'Apply the AR Clinical Practice Protocols and Procedures',
          'Communicate well: with the patient, your crew and the EOC Clinician',
          { t: 'Skill demonstrations signed off in eLearning', sub: ['Nebulised medication: 6 and over, and under 6', 'IM adrenaline', 'GTN sublingual', 'IV therapy: set up a line, change an empty bag', 'Assist in the delivery of a newborn'] }
        ],
        notes: {
          time: 5,
          say: [
            'This workshop prepares the Ambulance Responder to start the SAAS AR Clinical Practice Protocols and Procedures.',
            'We also cover acute behavioural disturbance and mental health crises, the limits of AR scope under the Mental Health Act 2009, and recognising ACPO, narcotic overdose and meningococcal disease.'
          ],
          tip: 'Protocols covered: Asthma CPP-048-AR, Basic Care and Life Support CPP-025-AR, Anaphylaxis CPP-022-AR, Chest Pain CPP-029-AR, Hypoglycaemia CPP-031-AR, Seizures CPP-037-AR, Stroke CPP-039-AR, Acute Behavioural Disturbance CPP-052-AR. Procedures: CPPRO-008 Medication Checks, CPPRO-009 Oral, CPPRO-010 Drawing Up and Labelling, CPPRO-011 IM Injection, CPPRO-012 Inhaled. Handover: PRO-182. The guide also lists Hypothermia CPP-032-AR, Pressure Injury Prevention CPPRO-003 and the Risk Assessment Matrix CTL-011 in its outcomes, but the plan has no session for hypothermia or pressure injury.'
        }
      },
      {
        type: 'table',
        title: 'The day',
        head: ['Time', 'Session', 'Practise (Day 6 stations)'],
        rows: [
          ['09:00', 'Welcome, basic care recap, asthma', 'Stations 1 and 2: puffer, nebs'],
          ['11:00', 'Morning tea', ''],
          ['11:15', 'Allergy and anaphylaxis', 'Station 3: IM adrenaline'],
          ['13:00', 'Lunch', ''],
          ['13:30', 'Chest pain, diabetic emergencies', 'Stations 4 and 5: GTN, BGL'],
          ['14:20', 'Stroke, seizures, mental health, other conditions, IV therapy', 'Station 6: IV line'],
          ['15:10', 'Afternoon tea', ''],
          ['15:25', 'Pregnancy and childbirth', 'Stations 7 and 8: birth, newborn'],
          ['16:55', 'Review and questions', 'Theory and the checklist']
        ],
        fs: 34,
        notes: {
          time: 1,
          say: ['Times follow the SAAS workshop timetable (9:00 to 17:00). Each skills block uses a Day 6 station page on your phone.'],
          tip: 'DSY: the station column links the SAAS timetable to dsytraining.com/stations/ar-day6/. Adjust times to your venue.'
        }
      },
      {
        type: 'bullets',
        title: 'How today works',
        points: [
          'An adult learning environment: we expect the pre-reading and eLearning are done',
          'We can’t cover the pre-workshop material in depth. Catch up on anything you missed',
          'It may make more sense when you re-read it after today',
          'Serious business: someone’s life may depend on it one day. It should still be fun',
          'Some of you have more medical background: we lift each other up as a team',
          'Time is short: some discussions will be cut short'
        ],
        callout: { text: 'During a crisis you don’t rise to the occasion, you sink to the level of your training.' },
        notes: {
          time: 2,
          say: ['Your educators are here solely to support you.'],
          tip: 'Facilitator note from the guide: norms and expectations vary across the state (location, resources, skill, operational need). Put today’s standard case in the local Eyre Peninsula context.'
        }
      },
      {
        type: 'statement',
        kicker: 'Virtual case',
        text: 'Priority 2. Your pager goes off.',
        sub: 'Who reached for their pager?',
        notes: {
          time: 1,
          say: ['Set the tone for the day with a virtual case. In the SAAS deck, GRN pager sounds start on this slide.'],
          ask: ['Who reached for their pagers?'],
          tip: 'The pager sound is in the SAAS PowerPoint (slide 5), not here. Play it from the SAAS deck, or a pager on the bench.'
        }
      },
      {
        type: 'statement',
        kicker: 'Responding to a pager call',
        text: 'Meet our patient: a teenage boy with severe asthma.',
        sub: 'Pick up the retrieval team, on to hospital, then back to the airfield.',
        notes: { time: 1, say: ['Meet our patient. Teenage male with severe asthma.'] }
      },
      {
        type: 'video',
        title: 'Video: Asthma',
        vimeo: { id: '339491880', length: '4:50', linkOnly: true },
        notes: {
          time: 5,
          videoSummary: ['A teenage boy with life-threatening asthma in the emergency department (SAAS Clinical Education, AR AO Asthma).'],
          ask: ['What signs and symptoms were present in this patient?', 'Was it a life-threatening asthma attack? If yes, what makes us think so?'],
          say: ['Today we are going to discuss asthma and other common medical conditions we are routinely called to.']
        }
      },
      {
        type: 'compare',
        title: 'Basic care first, then the specific protocol',
        left: { head: 'Basic Care and Life Support (CPP-025-AR)', points: ['Every protocol starts here', 'Scene, airway, breathing, circulation, disability, exposure', 'Then: what do you think is wrong?'] },
        right: { head: 'Secondary phase, for every patient', points: ['Reassurance and psychological support', 'Posture for comfort or clinical benefit', 'Keep them warm', 'Regular obs to spot trends (and the rhythm)', 'Pain relief where needed', 'Clinical support; consult the EOC Clinician', 'Transport as the EOC Clinician directs'] },
        callout: { text: 'Then treat within your AR scope, as your Clinical Practice Protocols set out.' },
        notes: {
          time: 5,
          say: [
            'In simple terms treatment starts with basic care and life support for every patient. That is why every Clinical Practice Protocol refers to it.',
            'Once you have decided what you think is wrong, treat in line with your scope as defined by your CPPs.',
            'Pain relief was covered in Foundations of Care.'
          ]
        }
      }
    ]
  });
})();
