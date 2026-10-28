// Part 9: Pregnancy and childbirth (facilitator guide slides 45 to 64, 60 + 30 min). Where the workshop materials differ from
// the AR protocols used on the Day 6 station pages (CPP-060-AR v1.0, CPP-035-AR v3.0, CTL-128), the slide follows the
// workshop and the difference is flagged in the notes for the lead instructor to decide.
(function () {
  var differs = 'Workshop materials and the protocol differ here: see the tip.';
  DRIVE_SECTIONS.push({
    id: 'part9-birth',
    number: 9,
    title: 'Pregnancy and childbirth',
    audience: 'Volunteer Ambulance Responders (AR course Day 6)',
    slides: [
      {
        type: 'statement',
        kicker: 'Pregnancy and childbirth',
        text: 'Complications of pregnancy, labour and birth.',
        sub: 'A sensitive topic. Some pictures and videos may be confronting.',
        notes: {
          time: 2,
          say: ['Ambulance clinicians are called to complications of pregnancy and to patients in labour. Newborn resuscitation was covered in the Cardiac Arrest Management workshop.'],
          tip: 'Warn the group before the videos and pictures (facilitator guide).'
        }
      },
      {
        type: 'bullets',
        title: 'Ectopic pregnancy',
        points: [
          'The fertilised egg implants outside the uterus',
          'Life-threatening if the fallopian tube ruptures',
          'On the RDR chart: pain, rising heart rate, falling BP'
        ],
        callout: { text: 'Any sexually active woman of childbearing age with acute abdominal pain and signs of shock: think ectopic. A medical emergency.' },
        notes: { time: 4, say: ['Discuss how it would present on the RDR chart: pain, heart rate and blood pressure.'] }
      },
      {
        type: 'bullets',
        title: 'Spontaneous miscarriage',
        points: [
          'Vaginal bleeding: light spotting to a heavy bleed with clots',
          'Strong period-type cramping',
          'Pregnancy symptoms fade (breast tenderness, morning sickness)',
          'Products of conception passed',
          'Risk: heavy bleeding; infection and shock if products are retained'
        ],
        callout: { head: 'Care', text: 'Basic care, gentle communication, transport. Never comment on whether the pregnancy will continue: they need assessment at hospital.' },
        notes: { time: 4, say: ['The spontaneous death of a fetus or embryo before it can survive independently.'] }
      },
      {
        type: 'bullets',
        title: 'Bleeding in later pregnancy (APH)',
        points: [
          'More than 15 mL after 20 weeks = ante-partum haemorrhage',
          'Risk: life-threatening blood loss for the mother, hypoxia for the baby',
          'Hard to diagnose pre-hospital: every case is transported',
          'Unrelated conditions (asthma, epilepsy): use their AR protocols'
        ],
        callout: { text: 'Caring for the mother is the best way to care for the baby.' },
        notes: { time: 2 }
      },
      {
        type: 'bullets',
        title: 'Caring for the pregnant patient',
        points: [
          'Basic care and life support, including pain relief',
          'Reassurance and support, including the family',
          'Posture: left lateral, right hip slightly raised, or semi-recumbent',
          'Never flat on the back late in pregnancy: the uterus compresses the vena cava and the BP falls',
          'Bleeding: give them a pad for their underwear to collect further loss'
        ],
        notes: { time: 2, say: ['Discuss methoxyflurane in pregnant patients.', 'A pillow or folded blanket under the right hip tilts the body.'] }
      },
      {
        type: 'bullets',
        title: 'Obstetric history (as well as AMPLE)',
        points: [
          'Weeks pregnant, due date; one baby or more?',
          'Gravida: times pregnant. Parity: births over 20 weeks',
          'Any problems expected? How long was the last labour?',
          'Pain (DOLOR); contractions: how far apart, how long, how strong, urge to push?',
          'Baby moving? (It can go quiet with stress: not necessarily distress)',
          'Any vaginal loss: blood or fluid?'
        ],
        notes: { time: 4, say: ['Pregnancy changes the normal vital signs: use the pregnancy RDR chart on the PCR divider.'] }
      },
      {
        type: 'video',
        title: 'Video: Normal labour and vaginal birth',
        video: { length: '3:43', file: 'Stages 1, 2 and 3 of labour explained', where: 'SAAS PowerPoint slide 50', note: 'Play this video from the SAAS Medical Conditions PowerPoint (slide 50).' },
        notes: { time: 4 }
      },
      {
        type: 'compare',
        title: 'Labour: is the head on view?',
        left: { head: 'No head on view for more than one contraction', points: ['Usually time to start transport'] },
        right: { head: 'Head on view, or urge to push', points: ['Usually better to assist the birth, then transport', 'Anything but the head first: urgent EOC Clinician consult'] },
        callout: { text: 'Pre-hospital births are rare: seek clinical support early. You’ll soon have two patients: request a second crew and vehicle.' },
        notes: { time: 4, say: ['Most deliveries occur with no complications.'] }
      },
      {
        type: 'compare',
        title: 'The SAAS maternity kit',
        left: { head: 'Crew member assisting the birth', points: ['Focus on the birthing parent and the delivery', 'Help them into a comfortable position', 'Monitor blood and fluid loss'] },
        right: { head: 'Second crew member', points: ['Focus on the newborn; help with the parent', 'Fetch equipment', 'Talk with the support person and others (other children?)'] },
        callout: { text: 'Safety glasses, gloves and gown from the kit: worn at all times when assisting a birth.' },
        notes: {
          time: 4,
          activity: 'Facilitator demonstration: show the location and contents of the maternity kit and how each item is used.',
          tip: 'ARs are not authorised to use the size 1 i-gel in the kit (facilitator guide).'
        }
      },
      {
        type: 'bullets',
        title: 'Assisting with the delivery',
        points: [
          'The head comes first, usually with no help',
          'The baby turns on its side for the shoulders: stand by for a sudden delivery',
          'Never force the head to turn or twist',
          'Support the head; hold the slippery body firmly',
          'Onto the mother’s abdomen, skin to skin',
          'Dry, assess, note the time of birth, cover with a warm blanket and a hat'
        ],
        notes: { time: 3, tip: 'Station 7 (CPP-060-AR) adds: note the time the head is born; shoulders should come with the next contraction or within 60 seconds, otherwise suspect shoulder dystocia (CTL-128).' }
      },
      {
        type: 'bullets',
        title: 'Cord care',
        points: [
          'Delay clamping and cutting for at least 60 seconds',
          'Needs resuscitation: clamp and cut urgently',
          'Clamps: 3 to 5 cm, 10 cm and 15 cm from the baby',
          'Cut between the second and third clamp (two clamps stay on the baby)',
          'Invite the support person or parent to cut; hold a dressing over it',
          'Breastfeeding helps the uterus contract'
        ],
        callout: { head: 'Check', text: differs },
        notes: {
          time: 3,
          tip: 'The facilitator guide and SAAS deck slide 53 say clamps at 3 to 5, 10 and 15 cm. CPP-060-AR v1.0 and CPP-035-AR v3.0 (Day 6 stations 7 and 8) say clamp at 10, 15 and 20 cm and cut between the two furthest from the newborn. The lead instructor to decide which to teach.'
        }
      },
      {
        type: 'compare',
        title: 'Complications: breech and the cord',
        left: { head: 'Breech (bottom, foot, arm first)', points: ['Urgent EOC Clinician consult', 'Support the birth: never pull on any part', 'Rapid transport, notify', 'Be ready to resuscitate'] },
        right: { head: 'The cord', points: ['Loose around the neck: loop it gently over the head', 'Tight: consult the EOC Clinician at once', 'Prolapsed: never push it back; don’t touch or cover it', 'No head visible: knees to chest, consult', 'Transport in the exaggerated Sims position'] },
        callout: { text: 'Positions: Sims (knee-chest), and the modified Sims position, best for the stretcher in transit.' },
        notes: {
          time: 8,
          tip: 'CPP-060-AR and CTL-128 (station 7) say breech: all fours at once, then EOC Clinician advice. DSY’s obstetric emergencies companion (dsytraining.com/tools/obstetric/) has phone flowcharts from CTL-128.'
        }
      },
      {
        type: 'bullets',
        title: 'Care of the healthy newborn',
        points: [
          'Preventing heat loss is a priority: room above 25 °C, little air movement',
          'Dry thoroughly; breathing or crying with good tone: wrap parent and baby together, hat on',
          'Skin to skin as soon as possible',
          'Still cold: consult about the NeoHelp suit and TransWarmer mattress',
          'Not breathing well within 30 seconds: intervene (clamp and cut the cord promptly)'
        ],
        notes: { time: 4, activity: 'Facilitator demonstration: baby care and assessment.', tip: 'Newborn resuscitation was covered in the Cardiac Arrest Management workshop.' }
      },
      {
        type: 'table',
        title: 'APGAR: at 1 and 5 minutes, recorded on the PCR',
        head: ['', '0', '1', '2'],
        rows: [
          ['Appearance', 'Blue, pale', 'Blue extremities', 'Pink'],
          ['Pulse', 'Absent', 'Below 100', '100 or more'],
          ['Grimace', 'No response', 'Grimaces', 'Crying, good response'],
          ['Activity', 'Limp', 'Some flexion of the limbs', 'Active motion'],
          ['Respirations', 'Absent', 'Slow and irregular', 'Strong cry, adequate breathing']
        ],
        fs: 38,
        source: 'Score 0 to 10. Pulse: at the base of the cord, or the ECG.',
        notes: {
          time: 3,
          say: ['For a newborn breathing effectively or crying with good tone, do the APGAR at 1 and 5 minutes. It is a quick check of perfusion.'],
          tip: 'The facilitator guide’s healthy-newborn note says ARs do not do an APGAR score, but SAAS deck slide 64 is a skill demonstration of the APGAR, and the study guide and CPP-035-AR v3.0 (station 8) say score it at 1 and 5 minutes. Confirm with the lead instructor.'
        }
      },
      {
        type: 'bullets',
        title: 'The placenta and bleeding after the birth',
        points: [
          'The placenta usually delivers itself: never pull on the cord',
          'Bag all of it (zip-lock bag in the kit): the hospital checks it is whole',
          'PPH: more than 500 mL, from the birth to 6 weeks after',
          'Causes: the uterus not contracting, retained products, tears',
          'Basic care, oxygen, pain relief; pressure on tears; pad to collect and estimate loss',
          'Urgent clinical support and EOC Clinician call; breastfeeding helps'
        ],
        callout: { head: 'Shock', text: 'Raise the legs (not the pelvis); urgent transport as the EOC Clinician directs. They may guide you to massage the abdomen.' },
        notes: { time: 6, say: ['For advice on managing the placenta, contact the EOC Clinician.', 'Discuss with the EOC Clinician the best way to transport mother and baby (they may consult the SDM).'] }
      },
      {
        type: 'station',
        station: 's7',
        kicker: 'Practise: Day 6 station 7',
        title: 'Assist a normal birth',
        text: 'Prepare, a calm hands-off delivery, call the times, care for the parent and the placenta.',
        points: ['Birthing manikin, or a doll and a towel', 'Five cards, including shoulder dystocia and a concealed PPH'],
        notes: { time: 0, tip: 'DSY station page (CPP-060-AR v1.0).' }
      },
      {
        type: 'station',
        station: 's8',
        kicker: 'Practise: Day 6 station 8',
        title: 'The newborn: APGAR, warmth and resus',
        text: 'Routine care for a vigorous newborn, and resuscitation if not breathing well.',
        points: ['APGAR cards scored letter by letter', 'Axillary temperature: 3 minutes, every 15 minutes', 'Ventilate 40 to 60 a minute; 3:1 CPR below 60'],
        notes: { time: 0, tip: 'DSY station page (CPP-035-AR v3.0).' }
      },
      {
        type: 'bullets',
        title: 'Skill demonstration: birth and newborn',
        points: ['Assist in the Delivery of a Newborn', 'Newborn Assessment (APGAR)'],
        callout: { text: 'Assessor signs off in eLearning.' },
        notes: { time: 30, say: ['Students demonstrate the listed skills; the assessor signs off in eLearning.'], tip: 'Kit: maternity kit, newborn resuscitation equipment, shears, blanket, birthing manikin (for example Mamma Natalie), neonate manikin.' }
      }
    ]
  });
})();
