// DRiVE Section 7: Emergency Driving Principles. Slide content condensed to dot points from the eLearning lesson
// (Articulate Storyline SCORM, "allow a minimum of 50 minutes", version 1.0 231229). Pop-up layers are laid out as separate slides.
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// Many slides in the lesson are video only. Video lengths and captions were not available, so those slides have no summary.
(function () {
  function vid(id, hash) { return { id: id, hash: hash, length: '' }; }
  var preview = 'This slide is video only in the lesson. Preview it first and add your own talking points.';

  DRIVE_SECTIONS.push({
    id: 'section7-emergency',
    number: 7,
    title: 'Emergency Driving Principles',
    audience: 'Volunteer, Career and External Clients',
    elearningMinutes: 50,
    slides: [
      {
        type: 'title',
        title: 'DRiVE Principles and Knowledge',
        subtitle: 'Section 7: Emergency Driving Principles',
        lines: ['Volunteer, Career and External Clients'],
        notes: {
          time: 1,
          say: ['This section builds on everything so far: all the DRiVE principles still apply under emergency conditions.'],
          tip: 'The eLearning takes at least 50 minutes (version 1.0, 231229).'
        }
      },
      {
        type: 'bullets',
        title: 'Introduction to emergency driving',
        points: [
          'All the DRiVE principles you have learnt still apply, and must be carried out with automaticity',
          'You must fully understand the Drivers Responsibilities and Requirements Policy, the Emergency Driving Procedure and the Australian Road Rules (Understanding Policies, Procedures and the Law)',
          'If you have not completed the previous sections, go back to them before this topic'
        ],
        notes: { time: 2, say: ['Check the group has covered the earlier sections before starting.'] }
      },

      /* ---------- Dispatch priorities ---------- */
      {
        type: 'bullets',
        title: 'Dispatch priorities and leaving the scene',
        points: [
          'Generally, leaving a scene you attended as an emergency does not mean you drive from it under emergency conditions',
          { t: 'For an emergency transport', sub: ['Sufficient reason must exist: a threat to life or limb', 'You must advise the Emergency Operations Centre', 'You must ensure a stable environment and reasonable care'] }
        ],
        callout: { text: 'Priority 1: Emergency. Immediately life-threatening. Requires an emergency response.   Priority 2: Emergency. Increased risk of mortality or morbidity. Requires an emergency response.' },
        notes: {
          time: 3,
          ask: ['What would count as “sufficient reason” for an emergency transport? Who decides?'],
          tip: 'Only priorities 1 and 2 carry text in the lesson.'
        }
      },
      {
        type: 'video',
        title: 'Ambulance station traffic light control systems',
        vimeo: vid('860022292', '437ad0f13b'),
        notes: { time: 2, tip: preview, videoSummary: null }
      },

      /* ---------- Speed ---------- */
      {
        type: 'bullets',
        title: 'Emergency driving speed: what to consider',
        points: [
          '“Zero harm” principles',
          'SAAS policy and procedure requirements',
          'The needs of your partner and the patient',
          'The conditions of the road and surrounding environment',
          'How your driving will be portrayed by the public'
        ],
        notes: { time: 2, ask: ['Which of these is easiest to forget when you are running late?'] }
      },
      {
        type: 'bullets',
        title: 'SAAS speed policy',
        points: [
          'There is no specific speed “policy”',
          'SAAS can’t tell you what a safe speed is for every set of conditions',
          'You must have evidence that the speed you drove was reasonable',
          { t: 'Expiation Notice procedure', sub: ['Never drive more than 30 km/h above a posted speed limit', 'Never drive faster than 20 km/h through an intersection where you face a red light'] }
        ],
        notes: { time: 3, tip: 'These limits match the criteria for PRO-240 in Section 6.' }
      },
      {
        type: 'bullets',
        title: 'Pedestrian crossings',
        points: [
          'Treat a red light at a pedestrian crossing like an intersection red light: reduce speed the same way',
          'And wait for any pedestrians to get off the road, or be safe in a median strip refuge, before you proceed'
        ],
        notes: { time: 1 }
      },

      /* ---------- Parking and scene ---------- */
      {
        type: 'bullets',
        title: 'Parking at the scene',
        points: [
          'Approach slowly and give yourself time to assess the situation',
          'Give an overview SITREP if possible',
          'Consider where and how you park, under Australian Road Rule 307',
          { t: 'Assess:', sub: ['Access and egress', 'Access for others', 'Ground integrity', 'Hazards'] }
        ],
        notes: { time: 2 }
      },
      {
        type: 'bullets',
        title: 'ARR 307 and parking considerations',
        points: [
          'We can claim an exemption from some parking regulations in certain circumstances (ARR 307)',
          'SAAS has said this applies only when you are on an active case and parking at that scene',
          'Soft surfaces are a problem: the Mercedes tyres are narrow and high pressure, so they sink easily, and the drive mechanisms are not made for soft, loose surfaces',
          'Think about this at sporting fields: the risk of getting stuck is real'
        ],
        notes: { time: 2, ask: ['Where in your area would you be tempted to park on soft ground?'] }
      },
      {
        type: 'bullets',
        title: 'Emergency speed zone',
        points: [
          'The first vehicle always parks in the fend off position to protect the scene',
          'Later emergency vehicles park beyond the scene, and that area becomes a safe speed zone',
          '25 km/h applies to all vehicles passing from the first to the last resource',
          'Both vehicles must be displaying red or blue flashing lights for this to apply'
        ],
        notes: { time: 2 }
      },
      {
        type: 'video',
        title: 'Fend off',
        vimeo: vid('860008779', '53fc8bf9b7'),
        notes: { time: 2, tip: preview, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Height restricted carparks and steep driveways',
        points: [
          { t: 'Height', sub: ['The vehicle is over 2.5 metres high, going forward or in reverse', 'Remember this at residential care facilities, carparks, hospitals and reversing near lower buildings and trees', 'There are no high-level sensors to warn of overhanging objects'] },
          { t: 'Steep driveways', sub: ['You often can’t tell where the parking or turning spot is when you enter', 'Steep driveways make blind spots worse: use extreme caution', 'If you can’t see the end point, stop and check before you go on', 'Other hazards: eaves, letterboxes, fences, low retaining walls, garden ornaments, furniture, parked vehicles, many of them in blind spots'] }
        ],
        notes: { time: 3, ask: ['Where is the lowest clearance on your usual jobs?'] }
      },

      /* ---------- Patient carry ---------- */
      {
        type: 'bullets',
        title: 'Patient carry emergency driving',
        points: [
          'Travelling to a scene with emergency provisions does not mean you travel to hospital with them',
          'Sufficient medical reason must exist',
          'The driver’s bandwidth will be very full (see Mindset), and communication with the attending clinician will increase',
          'A stable platform is needed so essential treatment can continue; excessive braking, steering and acceleration compromise patient care',
          'Some options, such as going over curbs, should not be used'
        ],
        callout: { head: 'Legal and operational requirements', text: 'Press the PH (priority to hospital) button on the MDT (top left after pressing “mobile” and entering the destination). Tell the EOC on GRN radio you are driving as an emergency. Prepare for a notification to the hospital.' },
        notes: { time: 4, ask: ['What patient care would be harder if you braked late and hard?'] }
      },
      {
        type: 'video',
        title: 'Priority 2 patient carry with GRN notification',
        vimeo: vid('860734900', 'bda069bdf3'),
        notes: { time: 2, tip: preview, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Mobile CPR',
        points: [
          'The safety of unrestrained people in the back is paramount: your scanning, looking, forecasting and planning must be at a very high level',
          'Tell the people in the back clearly about any driving action that could make them lose balance',
          'Drive so external cardiac compressions (ECC) stay effective: simulations suggest ECC effectiveness falls rapidly above 25 km/h (CPG: Cardiac Arrest)',
          'Lights and sirens on this slower emergency drive can confuse other road users: use them to give a consistent, smooth journey',
          'Consider a mechanical chest compression device (MCCD) where available: no unrestrained clinician and less ineffective ECC. You still need a stable platform for it to work'
        ],
        notes: { time: 3, tip: 'The 25 km/h figure is quoted in the lesson from the Cardiac Arrest CPG. Check the current CPG.' }
      },

      /* ---------- Options ---------- */
      {
        type: 'video',
        title: 'Emergency driving options: sit back and wait (1)',
        vimeo: vid('860010561', '99bc523d1f'),
        notes: { time: 2, tip: preview, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Emergency driving options: sit back and wait (2)',
        vimeo: vid('860011699', '98358ed124'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Emergency driving options: wrong side of the road (1)',
        vimeo: vid('860037015', '3cf2f9ca6d'),
        notes: { time: 2, tip: preview, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Emergency driving options: wrong side of the road (2)',
        vimeo: vid('860037146', '05bbb0783f'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Emergency driving options: left to go right',
        vimeo: vid('860017944', 'ef1c2c1918'),
        notes: { time: 2, tip: preview, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Emergency driving options: green X U-turns',
        vimeo: vid('860045515', 'c9c1833703'),
        notes: { time: 2, tip: preview, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Overtaking and trucks',
        points: [
          'If a heavy vehicle driver hasn’t seen you, you’re probably in its rear blind spot, and they may not hear the siren',
          'Move to the right and left of the lane and change siren tones to get the driver’s attention in their side mirrors',
          'If the driver can’t move left but acknowledges you, keep the siren on and move efficiently down the left side',
          'If not seen or acknowledged: use a dynamic risk assessment of the road ahead, surrounding infrastructure and other road users, and consider overtaking on the left',
          'If the driver is unaware, consider turning the siren off as you start passing on the left, so they don’t hear it halfway along and move left without checking the blind spot',
          'Turn the siren back on once past, and return to a position of advantage'
        ],
        notes: { time: 4, ask: ['What would make you decide not to overtake on the left at all?'] }
      },
      {
        type: 'numbered',
        title: 'Overtaking a truck: a driver’s running thoughts',
        items: [
          '“I don’t think the driver has heard or seen me. I have tried different tones and the rumbler. I’ll move to the right to get into their wing mirrors.”',
          '“The driver still hasn’t seen me, and the road ahead looks straight and clear. I’ll try the left.”',
          '“Still no sign they know I’m here. The road ahead to the left of the truck is clear. I’m going to turn off my siren and start passing on the left.”'
        ],
        notes: { time: 3, activity: 'Suggested: ask pairs to give their own running thoughts for a different situation, as in a commentary drive.' }
      },

      /* ---------- Median strips ---------- */
      {
        type: 'video',
        title: 'Median strip curbs: the techniques',
        vimeo: vid('860017233', '9e8c649020'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Median strips, gutters and curbs: curb type and clearance',
        points: [
          'Consider shape, width, surface and vehicle clearance',
          'Prefer sloped curbs: much less tyre wall intrusion',
          'A square curb must be crossed at less than walking pace with the tyres turned towards it at quite an acute angle',
          'Crossing curbs with a patient on board is strongly discouraged because of the effect on the stable platform',
          'Clearance under the vehicle is very limited: the wrong median strip can badly damage the vehicle and put it out of service',
          'The road either side may be at different heights. Extra speed adds suspension travel and can bounce the vehicle onto the curb; the side step and rear differential are especially vulnerable'
        ],
        notes: { time: 3 }
      },
      {
        type: 'bullets',
        title: 'Median strips: width and surface',
        points: [
          'Ideal: sloped curbs, wide enough for two wheels up, four wheels up, two wheels down, four wheels down, on a solid base',
          'A strip too narrow for the whole vehicle may allow just two wheels up while moving forward (see the video)',
          'Wide grass or vegetation: be careful, wet grass can cause traction problems and the narrow high-pressure tyres bog easily',
          'A strip narrower than the vehicle means straddling the curb line, which greatly increases damage: avoid it',
          { t: 'North Terrace tram curb (safety alert SAF-18-004)', sub: ['Don’t drive eastbound on the median strip (tram track) outside Parliament House', 'It has a 42 cm drop-off and signage in the centre that forces you very close to the edge', 'Going over could leave the ambulance stuck or roll it over'] }
        ],
        notes: { time: 3, tip: 'Check that SAF-18-004 is still current.' }
      },

      /* ---------- Special situations ---------- */
      {
        type: 'bullets',
        title: 'Road works',
        points: [
          'Lower posted speed limits: reduce your overall speed',
          'Workers may have hearing protection and not hear a normal siren: the rumbler, if fitted, may help',
          'Machinery creates blockouts, and workers may not know you are there',
          'Traffic will be in narrower lanes, perhaps on broken surfaces',
          'Road workers may be giving extra direction on site'
        ],
        notes: { time: 2 }
      },
      {
        type: 'video',
        title: 'Train crossings',
        vimeo: vid('860011866', 'e0cfa30d63'),
        notes: { time: 2, tip: preview, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Animal interactions: horses',
        points: [
          'Animals and animal industries are common near many stations. A startled animal is difficult and dangerous to control: take extreme care',
          'If the siren is on and you see animals in the distance, leave it on but don’t change the tone until you are safely past',
          'Turning the siren on near an animal is strongly discouraged: it can startle the animal and injure the handler or animal',
          'If you turn the siren off, you must change your driving, because you’re no longer using a safety device'
        ],
        notes: { time: 3, ask: ['What animals are you most likely to meet on the roads in your area?'] }
      },
      {
        type: 'bullets',
        title: 'Special access locations',
        points: [
          'When tasked, you may be able to go where the public can’t, such as places with an electronic boom gate. Arrange it through the EOC or follow local arrangements',
          { t: 'Post bollards', sub: ['Can be controlled electronically with keypads, by local facilities management, or by audio communication at the bollards'] },
          { t: 'Lift barriers and gates', sub: ['Manual or electronic', 'If you open a manual gate or lift a barrier, put it back once you have passed through'] }
        ],
        notes: { time: 2 }
      },

      /* ---------- Corporate requirements ---------- */
      {
        type: 'bullets',
        title: 'Causative factor crashes',
        points: [
          'A public vehicle gave way to the ambulance as required by ARR 78, and was then hit by a second public vehicle that failed to give way or didn’t leave a safe distance as required by ARR 126',
          { t: 'If you are involved in one:', sub: ['Contact the EOC to be taken off the case you were attending', 'Check all people at the scene', 'Exchange the required particulars', 'Contact the SDM for an incident number', 'Report to Police if they don’t attend the scene', 'Injury: report within 90 minutes. No injury: report within 24 hours'] }
        ],
        notes: { time: 3, ask: ['Who do you tell first? In what order?'] }
      },
      {
        type: 'video',
        title: 'Driving a second vehicle',
        vimeo: vid('860737963', 'a261e5b4cb'),
        notes: { time: 2, tip: preview, videoSummary: null }
      },

      /* ---------- Commentary ---------- */
      {
        type: 'statement',
        kicker: 'Emergency commentary drives',
        text: 'You will be asked to give a commentary drive, routine and emergency.',
        sub: 'It lets instructors understand your thought processes. You must give one in your emergency drive assessment. It is practised in routine drive training and assessment.',
        notes: { time: 2, say: ['The next three videos show how to build up a commentary for your assessment.'] }
      },
      {
        type: 'video',
        title: 'Emergency commentary drive 1',
        vimeo: vid('860751269', '9cd6cd1d35'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Emergency commentary drive 2',
        vimeo: vid('861063599', 'd69dfb4c81'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Emergency commentary drive 3',
        vimeo: vid('861069503', '47d1c5a8f4'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'statement',
        kicker: 'Section 7 complete',
        text: 'Congratulations on completing Emergency Driving Principles.',
        sub: 'Questions and reflections?',
        notes: {
          time: 2,
          say: ['Recap: emergency driving needs a clear reason, a stable platform and evidence that your speed was reasonable. Every DRiVE principle still applies.'],
          tip: 'Add a link to the next section here when you add it.'
        }
      }
    ]
  });
})();
