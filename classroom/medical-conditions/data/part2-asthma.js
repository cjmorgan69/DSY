// Part 2: Asthma (facilitator guide slides 9 to 14, 80 + 20 min). Doses and the severity chart are from the SAAS deck slide 11
// (CPP-048-AR chart) and match the Day 6 station pages (CPP-048-AR v3.2, CTL-083).
(function () {
  DRIVE_SECTIONS.push({
    id: 'part2-asthma',
    number: 2,
    title: 'Asthma',
    audience: 'Volunteer Ambulance Responders (AR course Day 6)',
    slides: [
      {
        type: 'image',
        title: 'What happens in asthma',
        img: 'img/asthma-airways.jpg',
        caption: 'Normal airway, asthmatic airway, and during an attack',
        points: [
          'A chronic disease (always there) with acute attacks',
          'An “attack” = not responding to their usual treatment, so they call us',
          { t: 'Three things narrow the airways:', sub: ['Bronchospasm: the muscle tightens', 'The lining swells', 'Extra mucus and sputum'] },
          'Air can’t move in and out freely: that causes the symptoms'
        ],
        notes: {
          time: 12,
          say: ['Briefly discuss the basic pathophysiology. Asthma is chronic; an asthma attack is an acute episode that doesn’t respond to the normal treatment and an ambulance may be called.'],
          tip: 'Picture from the SAAS PowerPoint slide 9 (used with SAAS permission). Triggers (study guide): dust, pollen, chemicals, smoke, animal hair, cold air, exercise; asthma symptoms can also be part of anaphylaxis.'
        }
      },
      {
        type: 'bullets',
        title: 'Signs of increased work of breathing',
        points: ['Fast breathing, less air moving', 'Long breath out: air trapping', 'Accessory muscles, tripod posture', 'Head nodding, grunting, pursed lips', 'Can’t speak in sentences', 'Falling SpO2; anxious through to drowsy', 'Fatigue and exhaustion'],
        callout: { head: 'The quiet chest', text: 'The wheeze needs air moving. As asthma gets worse the wheeze may disappear.' },
        notes: { time: 3, say: ['From the study guide: the primary effect is more effort and less effective breathing.'], tip: 'Study guide content; the guide’s 15 min for pathophysiology covers this slide too.' }
      },
      {
        type: 'compare',
        title: 'Asthma medications',
        left: { head: 'Preventers', points: ['Taken regularly to prevent attacks', 'Usually red, beige, purple or brown'] },
        right: { head: 'Relievers', points: ['Relieve an attack, mainly by easing bronchospasm', 'Usually blue or grey'] },
        callout: { text: 'SAAS uses two bronchodilators: salbutamol and ipratropium (Atrovent).' },
        notes: {
          time: 8,
          say: [
            'In Ambulance Assist you learned to help a patient take their own prescribed medicines.',
            'Discuss the actions, onset, indications, contraindications and common side effects of salbutamol and ipratropium, as in the AR Pharmacology study guide.'
          ]
        }
      },
      {
        type: 'bullets',
        title: 'MDI and spacer',
        points: [
          'At least as effective as a nebuliser for mild asthma: the SAAS preferred method',
          'We don’t dispense: never leave a salbutamol MDI with a patient at home',
          'We can leave the spacer with the patient',
          'At hospital, hand over both the spacer and the MDI',
          'A BVM resuscitation mask fits the spacer: good for small children and anyone who can’t seal on it'
        ],
        notes: { time: 7, say: ['Review the use of the MDI and spacer devices.'], tip: 'Procedure: Inhaled Medication Administration CPPRO-012.' }
      },
      {
        type: 'table',
        title: 'Asthma severity and drug chart',
        head: ['', 'Under 6', '6 and over, adults'],
        rows: [
          ['Mild: talks in sentences, SpO2 above 95%', 'MDI + spacer: 6 puffs salbutamol. EOC Clinician may advise repeats', 'MDI + spacer: 12 puffs salbutamol. EOC Clinician may advise repeats'],
          ['More severe: phrases, words or can’t speak, SpO2 below 95%', 'Neb: salbutamol 2.5 mg + ipratropium 250 microg (half a neb of each) + 3 mL saline. Early consult', 'Neb: salbutamol 5 mg + ipratropium 500 microg (a full neb of each). Early consult'],
          ['Respiratory arrest', 'BVM: slow and gentle, 4 a minute. Consult the EOC Clinician', 'BVM: slow and gentle, 4 a minute. Consult the EOC Clinician']
        ],
        fs: 34,
        source: 'Chart in Clinical Practice Protocol Asthma - Ambulance Responder CPP-048-AR. Each puff: 4 breaths.',
        callout: { text: 'More severe: the chart also allows MDI doses as for mild, with oxygen by nasal cannula at 4 L/min and early EOC Clinician consult.' },
        notes: {
          time: 10,
          say: [
            'Direct students to the SAAS Clinical App, AR, Asthma CPP-048-AR.',
            'Both salbutamol and ipratropium can be given by nebuliser, which lets us add oxygen.',
            'Basic care may include oxygen by medium concentration or non-rebreather mask before further treatment such as nebs.',
            'Discuss the chart and how we choose the regime from the presentation.'
          ],
          ask: ['A 5-year-old talking in phrases with SpO2 93%: which row, which dose?'],
          tip: 'Station 1 flags that CPP-048-AR says 12 puffs at 6 or over and 6 puffs at 1 to 6, while the chart says under 6 and over 6: exactly 6 years = consult the EOC Clinician. SpO2 alone never decides severity.'
        }
      },
      {
        type: 'bullets',
        title: 'Life-threatening asthma',
        points: [
          'Medicine may not reach the lungs: support breathing with IPPV',
          'Small breaths, slow rate: let the chest empty between breaths',
          'Ventilate gently: over-pressure injures the lungs',
          'Asthma with anaphylaxis: follow the Anaphylaxis protocol first',
          'Request clinical support early'
        ],
        notes: { time: 5, say: ['Review the ventilation technique for patients with life-threatening asthma.'], tip: 'Anaphylaxis-first point: study guide, Asthma and anaphylaxis.' }
      },
      {
        type: 'video',
        title: 'Optional video: IPPV ventilation, are you doing it right?',
        vimeo: { id: '339888483', length: '13:58', linkOnly: true },
        notes: { time: 0, videoSummary: ['Bag-valve-mask ventilation technique (SAAS Clinical Education, AA AR AO IPPV Ventilation).'], tip: 'Optional: not in the SAAS workshop timetable. From the Medical Conditions study guide (SAAS Clinical Education). Use it if time allows, or set it for revision.' }
      },
      {
        type: 'compare',
        title: 'Facilitator demonstration: asthma management',
        left: { head: 'Facilitator shows', points: ['Drug checking (CPPRO-008)', 'Salbutamol and ipratropium by MDI and spacer', 'A nebuliser, loaded and run'] },
        right: { head: 'Students practise', points: ['Setting up', 'Nebulised salbutamol and ipratropium', 'Adult dose', 'Under 6 dose: drawn up by syringe with saline'] },
        callout: { text: 'First time with syringes and drawing-up needles: sharps safety and the sharps container.' },
        notes: {
          time: 15,
          say: [
            'Demonstrate, then students practise, following CPP-048-AR. This is the first time they use the ipratropium MDI.',
            'Do it normally, do it slowly, do it with them, off they go.'
          ],
          activity: 'The guide gives 35 min for the demonstration and practice: about 15 min demonstrating, then 10 min each on stations 1 and 2.',
          tip: 'Kit per group: sharps container, 2 blunt needles, 2 x 1 mL syringes, salbutamol and ipratropium MDIs and nebules (training stock only), spacers, nebuliser masks, oxygen.'
        }
      },
      {
        type: 'station',
        station: 's1',
        kicker: 'Practise: Day 6 station 1',
        title: 'Asthma: how bad, and the puffer',
        text: 'Rule out anaphylaxis, judge severity by speech and distress, then salbutamol by MDI and spacer.',
        points: ['Five patient cards', 'Puffs into the air or onto a manikin only', 'Partner ticks the checklist'],
        notes: { time: 10, say: ['Scan the code to open the station on your phone.'], tip: 'DSY station page. Expired MDIs labelled TRAINING: nobody breathes in a real medicine.' }
      },
      {
        type: 'station',
        station: 's2',
        kicker: 'Practise: Day 6 station 2',
        title: 'Nebulised medication: under 6, and 6 and over',
        text: 'Load and run a salbutamol and ipratropium neb at the AR dose for the age.',
        points: ['Training saline only', 'Under 10 mL in the bowl, 6 to 8 L/min', 'Extraction and fresh-air ventilation in the vehicle'],
        notes: { time: 10, tip: 'DSY station page.' }
      },
      {
        type: 'bullets',
        title: 'Skill demonstration: asthma management',
        points: ['Preparing and Administering Nebulised Medication (6 years or older)', 'Preparing and Administering Nebulised Medication (under 6 years old)'],
        callout: { text: 'Assessor signs off in eLearning.' },
        notes: { time: 20, say: ['Students demonstrate the listed skills; the assessor signs off in eLearning.'], tip: 'See the eLearning and the Assessment Guide - Medical Conditions (AR) for how to run the assessment.' }
      },
      {
        type: 'statement',
        kicker: 'Morning tea',
        text: '15 minutes',
        sub: 'Please be back and ready on time.',
        notes: { time: 15 }
      }
    ]
  });
})();
