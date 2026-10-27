// DRiVE Section 4: Practical Driving Concepts. Slide content condensed to dot points from the eLearning lesson
// (Articulate Storyline SCORM, "allow a minimum of 70 minutes"). The pop-up layers are laid out here as separate slides.
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// Video lengths are only known for some videos; the rest show no length badge and have no summary.
// Not carried over: images and animations (blind spot causes, DRiVE sequence layout, limit point braking, stable platform).
(function () {
  function vid(id, hash, length) { return { id: id, hash: hash, length: length || '' }; }

  DRIVE_SECTIONS.push({
    id: 'section4-practical',
    number: 4,
    title: 'Practical Driving Concepts',
    audience: 'Volunteer, Career and External Clients',
    elearningMinutes: 70,
    slides: [
      {
        type: 'title',
        title: 'DRiVE Principles and Knowledge',
        subtitle: 'Section 4: Practical Driving Concepts',
        lines: ['Volunteer, Career and External Clients'],
        notes: {
          time: 1,
          say: ['This section covers the practical concepts you will apply on the drive: observation, blind spots, forecasting, scanning, crash avoidance space, threats, braking, steering and cornering.',
                'The eLearning takes at least 70 minutes. In the classroom, allow longer, especially for the commentary drive at the end.'],
          tip: 'Several slides in the eLearning rely on animations and pictures (blind spots, DRiVE sequence, limit point braking, stable platform). Those are not in this slide show: use the vehicle, a whiteboard or the original lesson.'
        }
      },
      {
        type: 'video',
        title: 'Introduction',
        vimeo: vid('861087062', '319885727b', '0:30'),
        notes: { time: 1, videoSummary: null }
      },

      /* ---------- Observation ---------- */
      {
        type: 'video',
        title: 'Observation alarm',
        vimeo: vid('850365492', 'd392f8696d', '1:38'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Observation alarm',
        points: [
          'An internal alarm, a subconscious trigger: you have less than 5 seconds of forward vision available',
          'It is not the gap to the vehicle in front. It is how far you can see along the road',
          'Over time it becomes a subconscious process and gives your brain more time to plan a response',
          '5 seconds = 83 metres'
        ],
        callout: { head: 'Consider changing lanes', text: 'Scanning at least five seconds ahead gives you time to move into a clearer lane, get around a heavy vehicle or clear obstructions early.' },
        notes: {
          time: 3,
          say: ['The key idea: how far can I see? If it is under five seconds, something is limiting your view and the alarm should go off.'],
          ask: ['What cuts your forward vision to under five seconds on the roads you drive?']
        }
      },
      {
        type: 'cards',
        title: 'Observation link',
        cols: 3,
        variant: 'plain',
        items: [
          { h: 'A ball in the road', t: 'Will a child run out?' },
          { h: 'A bus stopped at a bus stop', t: 'Will a pedestrian walk out into the road?' },
          { h: 'Bins put out on the side of the road', t: 'Will the lane be obstructed by a garbage truck?' }
        ],
        callout: { text: 'An observation link connects something you can see with something that may happen because of it.' },
        notes: {
          time: 3,
          say: ['The eLearning shows these three as an animation. The principle is: see something, then ask “what might happen next?”.'],
          activity: 'Suggested: show a street photo or video and ask the group for as many observation links as they can find in one minute.'
        }
      },

      /* ---------- Blind spots and blockouts ---------- */
      {
        type: 'video',
        title: 'Ambulance blind spots',
        vimeo: vid('850369037', '14b192c1b3', '1:25'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Blind spots',
        points: [
          'Blind spots obscure your vision. They come from the way the vehicle is designed or where in-vehicle equipment is placed. Our ambulances have a number',
          { t: 'To manage them you must:', sub: ['Know where the blind spots are', 'Adjust your seat and mirrors correctly', 'Move your eyes and head around any in-vehicle obstruction as you approach another road user or obstruction', 'Use mirror checks and shoulder checks for any manoeuvre'] }
        ],
        notes: {
          time: 3,
          say: ['Know the blind spots of your own vehicle, not just in theory.'],
          tip: 'The eLearning has a picture with clickable blind spots. Use the real vehicle if you can: have people sit in the driver’s seat while someone walks around it.'
        }
      },
      {
        type: 'cards',
        title: 'Where the blind spots are',
        cols: 4,
        variant: 'number',
        items: [
          { h: 'Front left: A pillar and side mirror' },
          { h: 'Front left: B pillar and side mirror' },
          { h: 'Front right: B pillar and side mirror' },
          { h: 'Front right: A pillar and side mirror' },
          { h: 'Bonnet' },
          { h: 'Height of the driver’s seat off the ground' },
          { h: 'Rear door' }
        ],
        notes: {
          time: 3,
          say: ['In the eLearning each item opens to explain what causes it. Those explanations were not in the extract, so talk through each one with the group or use the vehicle.'],
          activity: 'Suggested: at the vehicle, ask what each of these hides from the driver and from which seat position.'
        }
      },
      {
        type: 'video',
        title: 'Blockouts explained',
        vimeo: vid('852555298', 'a980da66c6'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Blockout example 1',
        vimeo: vid('857703709', '716d36cfd4'),
        notes: { time: 2, tip: 'The order of the two example videos is a guess from the lesson’s layer order. Check it.', videoSummary: null }
      },
      {
        type: 'video',
        title: 'Blockout example 2',
        vimeo: vid('857702364', '4b6f4d3e64'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Blockouts',
        points: [
          'Blockouts are objects outside your vehicle that obstruct your view',
          { t: 'Mitigate them by:', sub: ['Careful observation: look through, look around, look under, look twice', 'Adjusting your speed', 'Hanging back from large vehicles', 'Moving the vehicle: right or left, forward or backward', 'Positioning “wide” for a corner'] }
        ],
        notes: {
          time: 3,
          ask: ['What is the difference between a blind spot and a blockout?']
        }
      },

      /* ---------- Forecasting and the DRiVE sequence ---------- */
      {
        type: 'bullets',
        title: 'Forecasting and planning',
        points: [
          'Forecasting: reading the road and traffic ahead from the evidence of other drivers’ actions and position, to make an accurate assessment of what will happen',
          'Then make a plan for what you are going to do',
          'Routine driving: drive to a position of advantage, to increase vision and see all hazards and threats at the intersection',
          'Emergency driving: planning may involve the options under Australian road rule 306 to progress the journey'
        ],
        notes: {
          time: 3,
          ask: ['What evidence from another driver tells you what they will do next?']
        }
      },
      {
        type: 'cards',
        title: 'The DRiVE sequence',
        cols: 3,
        variant: 'number',
        items: [
          { h: 'Mirror', t: 'Check all mirrors.' },
          { h: 'Signal intent', t: 'Use the indicator or brake.' },
          { h: 'Adjust speed', t: 'As required.' },
          { h: 'Full vision', t: 'Once full vision is possible, decisions can be made.' },
          { h: 'Vision in the direction of travel', t: '' },
          { h: 'Check mirrors and blind spots', t: 'The area that would produce a threat.' }
        ],
        notes: {
          time: 4,
          say: ['The lesson shows three sequences: turning a corner, changing lanes and going straight through traffic lights. It is built from these steps, but which step goes where is in the pictures and was not captured.'],
          tip: 'Check the order of the three sequences against the original lesson or the DRiVE course material before you teach it. The numbering here is only the list order from the lesson.'
        }
      },

      /* ---------- Scanning and looking ---------- */
      {
        type: 'video',
        title: 'Scanning sequence',
        vimeo: vid('856634784', '1cf9f324c1', '1:04'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Looking',
        vimeo: vid('861091695', '2390a421ff'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'compare',
        title: 'Scanning versus looking',
        left: {
          head: 'Scanning',
          points: [
            'A systematic approach to gathering information for good overall vision and awareness around the vehicle',
            'The big picture: lacks detail, but highlights areas and threats that need a closer look'
          ]
        },
        right: {
          head: 'Looking',
          points: [
            'Where you see the details',
            'You gather evidence on whether it is safe to continue or whether to adjust your driving to get safe passage'
          ]
        },
        callout: { text: 'Scanning gives the overview. When you look, you see the details.' },
        notes: {
          time: 3,
          ask: ['Which do you do more of when you are tired or distracted: scanning or looking?']
        }
      },
      {
        type: 'bullets',
        title: 'The 10 point scanning checklist',
        points: [
          '1. Look as far ahead as possible from the front of the vehicle, scanning the road surface',
          '2. Continue forward to as far as you can see down the road',
          '3 and 4. Look at both sides of the road, from far to near',
          '5 and 6. Look up every side street and entrance on both sides where a vehicle may reasonably be expected',
          '7, 8 and 9. Look to the rear from the left to the centre: driver’s side mirror and over the shoulder',
          '10. Finally, look at the instruments and dash display and note the speedometer'
        ],
        notes: {
          time: 4,
          say: ['During your practical drive you will be asked to apply this. It is a pattern to repeat, so it becomes automatic.'],
          activity: 'Suggested: have the group say the ten points aloud together, then in pairs.'
        }
      },

      /* ---------- Crash avoidance space ---------- */
      {
        type: 'video',
        title: 'Crash avoidance space (CAS) explained',
        vimeo: vid('861090318', '51268ce32b'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Crash avoidance space (CAS)',
        points: [
          'CAS = the distance between you and the vehicle in front. It depends on speed',
          'CAS = reaction time + braking time',
          'Minimum 2 seconds at 60 km/h in good conditions (alert driver, well maintained vehicle)',
          'Above 60 km/h in those conditions, extend your CAS to 3 seconds'
        ],
        notes: {
          time: 3,
          ask: ['How do you measure two seconds on the road?']
        }
      },
      {
        type: 'bullets',
        title: 'CAS in adverse conditions',
        points: [
          'In adverse conditions, increase your CAS',
          'Conditions are cumulative: add 1 second for each element present',
          'Example: a dark road adds 1 second; a dark wet road adds 2 seconds',
          'Minimum 4 seconds'
        ],
        notes: {
          time: 2,
          ask: ['Name some adverse elements. How many seconds would you leave in rain, at night, behind a heavy vehicle?'],
          tip: 'The lesson gives only the dark and dark-wet examples. Ask the group for other elements rather than adding any here.'
        }
      },

      /* ---------- Hazards and threats ---------- */
      {
        type: 'video',
        title: 'Example of hazard versus threat',
        vimeo: vid('857754975', '4adcd021cc'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'compare',
        title: 'Hazard versus threat',
        left: {
          head: 'Hazard',
          points: [
            'Anything in your driving environment that could later become a threat: another road user, poor road conditions, bad weather',
            'Areas blocked from vision (blind spots, blockouts) are a hazard: you can’t plan until you can see',
            'Intersections are always a hazard',
            'Hazards are always beyond your stopping distance. Choose cues that tell you a crash could happen, and leave the closer look until you are nearer'
          ]
        },
        right: {
          head: 'Threat',
          points: [
            'A hazard becomes a threat when it is about to enter your crash avoidance space',
            'A threat is anything that can negatively affect your safety or progress',
            'Collect evidence and, if necessary, act. Don’t leave your safety in the hands of other road users'
          ]
        },
        notes: {
          time: 4,
          say: ['Hazard recognition is the early part of recognising a threat. Once you have seen a hazard, work out when it becomes a threat and how you will reduce the chance of harm.'],
          ask: ['What was the hazard and what was the threat in the video?']
        }
      },
      {
        type: 'statement',
        kicker: 'Threats',
        text: 'If you must brake unexpectedly or swerve, you failed to recognise a threat.',
        sub: 'An emergency vehicle driver must not be surprised by anything in the driving environment. Be calm, deliberate and in complete control.',
        notes: {
          time: 2,
          say: ['If you catch something at the corner of your eye and have no time to act, you are not observing the information that the road and traffic are giving you.',
                'If you do not recognise threats, you are driving inattentively and cannot justify the risk you are taking.']
        }
      },

      /* ---------- Evidence and minimising ---------- */
      {
        type: 'video',
        title: 'Evidence gathering',
        vimeo: vid('857752258', '9e1cb013d7'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'cards',
        title: 'Evidence gathering: Eyes, Hands, Wheels',
        cols: 3,
        variant: 'plain',
        items: [
          { h: 'Eyes', t: 'Barriers to observation (sun glare, fog)? Can you see? Can the other road user see?' },
          { h: 'Hands', t: 'The whole body language of drivers and pedestrians. Does it forecast what they might do?' },
          { h: 'Wheels', t: 'Any movement you can see from the position of their vehicle. What is it telling you?' }
        ],
        callout: { text: 'A clear indication from each of these means it is probably safe to continue. In any doubt, take action to minimise the threat.' },
        notes: {
          time: 3,
          ask: ['At the next intersection, what do eyes, hands and wheels tell you about the car waiting to turn?']
        }
      },
      {
        type: 'video',
        title: 'Options to minimise a threat',
        vimeo: vid('850795521', 'b1130e5010'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'cards',
        title: 'Options to minimise a threat',
        cols: 4,
        variant: 'number',
        items: [
          { h: 'Steer to a safer position', t: 'Move away, buy time and space. Don’t drive into another area of risk.' },
          { h: 'Cover the brake', t: 'Foot hovering over the pedal reduces physical reaction time.' },
          { h: 'Use a warning device', t: 'Headlights and horn, used legally and not as a rebuke.' },
          { h: 'Accelerate', t: 'Rarely, it moves you away from a hazard. Slowing may have put you on a collision course. Ask what put you there.' },
          { h: 'Slow or stop if necessary' },
          { h: 'Set up the brake', t: 'Remove free play, show the brake lights. Prepares the vehicle and passengers and alerts drivers behind.' },
          { h: 'Ease up the accelerator', t: 'More time for the threat to dissipate or actions to become clear; less surprise.' }
        ],
        notes: {
          time: 4,
          activity: 'Suggested: show a threat video clip and ask the group which two or three options they would use, in what order.'
        }
      },
      {
        type: 'bullets',
        title: 'Unjustifiable risk',
        points: [
          'It happens in two ways:',
          { t: 'You fail to recognise threats to your safety', sub: ['The driving is inattentive and potentially dangerous', 'You cannot justify the risks you are taking'] },
          { t: 'You see a threat but fail to mitigate it', sub: ['No evidence gathered, no option used to minimise it'] }
        ],
        notes: {
          time: 2,
          ask: ['Which is more common, in your experience: not seeing it, or seeing it and carrying on?']
        }
      },

      /* ---------- Stable platform, position of advantage ---------- */
      {
        type: 'cards',
        title: 'Stable platform: the nine DRiVE principles',
        cols: 3,
        variant: 'number',
        items: [
          { h: 'Scanning' },
          { h: 'Cornering' },
          { h: 'Road positioning' },
          { h: 'Driving to a position of advantage' },
          { h: 'Braking' },
          { h: 'Forecasting and planning' },
          { h: 'Setup' },
          { h: 'Manoeuvring' },
          { h: 'Crash avoidance space' }
        ],
        callout: { text: 'A stable platform is the result of applying all the DRiVE principles on every drive. Conveying your partner and patient safely and calmly, whatever the road, traffic or urgency, is paramount.' },
        notes: {
          time: 3,
          say: ['Everything that follows contributes to the stable platform: smooth, calm and in control for the people in the back.'],
          tip: 'The lesson’s stable platform slide is mostly animation. This list is the nine principles it shows.'
        }
      },
      {
        type: 'bullets',
        title: 'Position of advantage',
        points: [
          'The vehicle should always be positioned on the road for the best vision and progression',
          'It is dynamic: keep thinking about it',
          { t: 'It includes:', sub: ['Anticipated flow of traffic around intersections and junctions', 'Choosing lanes with no block outs', 'Choosing lanes with the most forward progression of traffic'] }
        ],
        notes: { time: 2, ask: ['Where would you position the ambulance as you approach a busy intersection?'] }
      },

      /* ---------- Braking ---------- */
      {
        type: 'video',
        title: 'Three pressure braking',
        vimeo: vid('850393447', '776b3cb4de', '1:09'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'statement',
        kicker: 'Three pressure braking',
        text: 'Set up the brake, squeeze the brake, ease the brake.',
        sub: 'The standard way to apply the brakes on every drive: a complete stop without being abrupt or making the front suspension recoil.',
        notes: {
          time: 2,
          say: ['Essential for a smooth ride and a stable platform. Walk through the three parts on the next slides.']
        }
      },
      {
        type: 'bullets',
        title: 'Three pressure braking: 1. Set up the brake',
        points: [
          'Ease the accelerator gently',
          'Remove the initial free play from the pedal',
          'Minimal speed change: weight transfers forward, front tyre grip increases, brake lights come on',
          'Cover the contact plate with the ball of the foot'
        ],
        notes: { time: 2 }
      },
      {
        type: 'bullets',
        title: 'Three pressure braking: 2. Squeeze the brake',
        points: [
          'Squeeze the pedal progressively for the braking required',
          'Speed reduces as tyre grip is progressively used',
          'Routine braking should never activate the ABS'
        ],
        notes: { time: 2 }
      },
      {
        type: 'bullets',
        title: 'Three pressure braking: 3. Ease the brake',
        points: [
          'When almost stopped, ease the pressure slightly just before you stop',
          'This gives a stop with no abrupt final jolt',
          'The brake must still be applied after you ease the pressure: don’t come completely off'
        ],
        notes: {
          time: 2,
          activity: 'Suggested: in a vehicle, have the group sit as passengers while a trainer demonstrates good and abrupt stops, then discuss how each felt.'
        }
      },
      {
        type: 'video',
        title: 'Limit point braking',
        vimeo: vid('861132849', '7775c251ee'),
        notes: {
          time: 3,
          tip: 'The lesson slide has no text; all the content is in the video. Preview it and add your own points.',
          videoSummary: null
        }
      },
      {
        type: 'video',
        title: 'Threshold and ABS braking',
        vimeo: vid('856649345', 'e938099f1f'),
        notes: {
          time: 2,
          say: ['The video shows a full ABS brake from 100 km/h.'],
          videoSummary: null
        }
      },
      {
        type: 'compare',
        title: 'Threshold braking versus ABS braking',
        left: {
          head: 'Threshold braking',
          points: [
            'Applying maximum braking effort without activating the ABS',
            'Still apply three pressure braking',
            'Same stopping distance as ABS but smoother'
          ]
        },
        right: {
          head: 'ABS (emergency) braking',
          points: [
            'Full brake with ABS activation',
            'The braking effect is violent and rough: very uncomfortable for patients and passengers',
            'ABS stops the wheels locking, so you can steer around an obstacle. Threshold braking gives the same effect: maximum braking without locking the wheels'
          ]
        },
        notes: {
          time: 3,
          ask: ['What does ABS give you that locked wheels do not?']
        }
      },
      {
        type: 'cards',
        title: 'Braking distances for a heavy vehicle in good conditions',
        cols: 3,
        variant: 'plain',
        items: [
          { h: '60 km/h', t: '30 metres' },
          { h: '80 km/h', t: '55 metres' },
          { h: '110 km/h', t: '80 metres' }
        ],
        notes: {
          time: 2,
          say: ['These are the distances in good conditions for a heavier vehicle, as given in the lesson. Reaction time adds to the distance.'],
          tip: 'The same lesson slide says that with a braking point set and no surprise, the stopping distance at 80 km/h is “approximately 27 metres” under both ABS and threshold braking. That disagrees with 55 metres for 80 km/h above. Check which applies (perhaps a different vehicle or condition) before using either, and I left the 27 m figure off the slide.'
        }
      },

      /* ---------- Accelerator, corralling, reversing, steering ---------- */
      {
        type: 'video',
        title: 'Accelerator sense',
        vimeo: vid('850429533', 'd9101259e2'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Accelerator sense',
        points: [
          'Varying the vehicle’s speed to match changing traffic without using the brake',
          'Smooth, progressive acceleration, easing the accelerator just before the automatic gear changes',
          'Getting through the driving environment with minimal braking while keeping the correct crash avoidance space'
        ],
        notes: { time: 2 }
      },
      {
        type: 'video',
        title: 'Corralling',
        vimeo: vid('852556892', '1f3004746b'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Corralling',
        points: [
          'Rear end crashes are the most common type of crash, and many are due to driver distraction',
          'Corralling: use accelerator sense and three pressure braking to bring the vehicles behind in closer so their speed matches yours before you stop',
          'When no one is behind you, leave enough room to roll forward and lessen the chance of being rear-ended',
          'Needs awareness of the vehicles behind, good forward scanning and reading of traffic patterns'
        ],
        notes: { time: 3, ask: ['Why bring the following vehicles in closer rather than stopping and leaving them to brake?'] }
      },
      {
        type: 'video',
        title: 'Reversing',
        vimeo: vid('851462333', 'f9e1a9dfb1'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Reversing',
        points: [
          'Reversing is the highest cause of crashes in SAAS vehicles',
          'Position the vehicle so you need to reverse as little as possible',
          'Safety features: reversing beeper, white rear scan light, reversing camera',
          'Where possible, reverse with two people: the second person signals your progress'
        ],
        notes: { time: 3, ask: ['What could you do at the next job to avoid a reverse?'] }
      },
      {
        type: 'video',
        title: 'Steering: inappropriate hand placement and technique',
        vimeo: vid('861081714', 'ab9f4a85a4'),
        notes: { time: 2, tip: 'Which of the two steering videos is “appropriate” and which “inappropriate” is from the lesson’s layer order. Preview both.', videoSummary: null }
      },
      {
        type: 'video',
        title: 'Steering: appropriate hand placement and technique',
        vimeo: vid('856633902', 'f3934a0a21'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Steering',
        points: [
          'Steering must always be smooth and precise',
          'Push/pull and rotational steering are both accepted, or a combination',
          'Palm steering is not accepted: hands can slip and you lose control of the vehicle',
          'Steer with vision in the direction the vehicle is travelling',
          'Thumbs always around the wheel; use the thumb channels if the wheel has them'
        ],
        notes: { time: 2 }
      },

      /* ---------- Cornering ---------- */
      {
        type: 'video',
        title: 'Cornering: video 1',
        vimeo: vid('863392283', 'a9a3479cdc'),
        notes: { time: 2, tip: 'The lesson’s layers are “Cornering Vision Point” and “Reading a Bend Using Vision Point”; the third video is probably corner positioning. Preview and retitle these three.', videoSummary: null }
      },
      {
        type: 'video',
        title: 'Cornering: video 2',
        vimeo: vid('863395058', '61eebd4372'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Cornering: video 3',
        vimeo: vid('862991769', '2e8ca849d0'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Cornering: two key concepts',
        points: [
          'You must always be able to stop within the distance you can see to be clear',
          'Match your speed to the speed at which the vision point changes, with a smooth balance of steering, accelerator and brake'
        ],
        notes: { time: 2 }
      },
      {
        type: 'compare',
        title: 'Corner positioning',
        left: {
          head: 'Right bend',
          points: ['Move to the left of the lane', 'This increases your vision around the bend']
        },
        right: {
          head: 'Left bend',
          points: ['Move to the right of the lane', 'This increases your vision around the bend']
        },
        notes: { time: 2, ask: ['What else must you check before you move across the lane?'] }
      },
      {
        type: 'bullets',
        title: 'Vision point',
        points: [
          'Where the left side of the road meets the right side: the last bit of bitumen you can see from the driver’s position as you head to a corner',
          { t: 'Moving away from you', sub: ['The corner is easing', 'Begin to straighten the steering and apply the accelerator gently as you come out'] },
          { t: 'Getting closer to you', sub: ['The corner is tight', 'Slow on the approach: you must always be able to stop in the distance you can see to be clear'] },
          { t: 'Moving ahead at the same rate as you', sub: ['A steady radius', 'If you can stop in the distance between you and the vision point, keep drive to the wheels at that speed'] }
        ],
        notes: {
          time: 4,
          activity: 'Suggested: show the cornering videos again and have the group call out “away”, “closer” or “steady” as the vision point moves.'
        }
      },
      {
        type: 'bullets',
        title: 'Reading a bend using the vision point',
        points: [
          { t: 'Approaching the bend', sub: ['The vision point seems to stay at the same point on the road', 'Reduce speed so you can stop safely in the remaining distance', 'Note how sharp the bend is and choose the right speed'] },
          { t: 'Going through the bend', sub: ['Just before you enter, the vision point starts to move round at a constant speed', 'Match your speed to its speed: that is the correct speed for the bend'] },
          { t: 'Coming out of the bend', sub: ['The view extends and the vision point moves away faster', 'Accelerate towards it in proportion to the steering straightening', 'Keep going until speed limits or new hazards restrict you'] }
        ],
        notes: {
          time: 4,
          tip: 'The lesson says “5 steps” for this topic but the text has three steps here plus the cornering radius step on the next slide. The fifth step may be in the animation.'
        }
      },
      {
        type: 'bullets',
        title: 'Cornering radius',
        points: [
          'A wider radius and a lower speed both reduce the forces on the vehicle and its occupants',
          'Coasting around a corner in a vehicle with a high centre of gravity, like an ambulance, lets it roll on its suspension and is uncomfortable for your partner and patient',
          'Entering too fast and staying on the brake deep into the corner does the same',
          'Use the accelerator to keep drive to the wheels through the bend. Don’t accelerate faster through the corner',
          'Changing speed through a corner changes the steering path, so you steer more and the ride is unstable',
          'Slow down and you may oversteer; speed up and you may understeer'
        ],
        notes: { time: 3, ask: ['How does it feel in the back when the driver brakes late into a corner?'] }
      },
      {
        type: 'statement',
        kicker: 'Tyre grip',
        text: 'The contact patch is only about 11 x 16 cm on the Mercedes.',
        sub: 'That small patch has a limited amount of grip. How you brake, steer and accelerate makes it harder or easier for it to grip the road.',
        notes: { time: 2 }
      },
      {
        type: 'bullets',
        title: 'Reserves of grip: 10 units of input',
        points: [
          'Balance speed and turning inputs, like scoring pain from 1 to 10',
          'Steering: 0 = straight, 10 = hard lock',
          'Braking: 0 = no braking, 10 = locked brakes',
          'Acceleration: 0 = none, 10 = foot to the floor'
        ],
        notes: { time: 2 }
      },
      {
        type: 'bullets',
        title: 'Reserves of grip: keep to 8 units',
        points: [
          'Never exceed 10 units of combined steering and braking or acceleration in any corner. Above that, the chance of losing control, crashing or giving a very uncomfortable ride rises dramatically',
          'SAAS drivers should aim for a maximum of 8 units combined: a reserve if you make an error, and a stable platform'
        ],
        callout: { text: 'A very tight corner means about 7 units of steering, which leaves little for the brake. Braking at 8 units on approach leaves little ability to turn in.' },
        notes: {
          time: 3,
          say: ['For safest practice, brake before the corner so you enter at a safe speed. Don’t brake hard and then release rapidly as you enter: it shifts the vehicle’s mechanical forces and makes it harder to turn in.'],
          activity: 'Suggested: give the group a corner scenario (tight, wet, downhill) and ask how they would split the 8 units.'
        }
      },

      /* ---------- Commentary drive ---------- */
      {
        type: 'cards',
        title: 'Commentary drive: three key questions',
        cols: 3,
        variant: 'number',
        items: [
          { h: 'Tell me where you’re looking?' },
          { h: 'Tell me what you are seeing?' },
          { h: 'Tell me what you are doing?' }
        ],
        notes: {
          time: 3,
          say: ['These are the three questions your trainer will want answered during the practical drive.']
        }
      },
      {
        type: 'bullets',
        title: 'How a commentary drive works',
        points: [
          'Recite the scanning pattern as you drive, so it is repetitive and accurate',
          'Say what you are seeing. Many drivers stop scanning and talk only about the object in front: you must name key items in the right scanning order, and in time with the changing conditions',
          'Say what you are doing in response to the driving environment, including the options to minimise a threat and the DRiVE principles'
        ],
        notes: {
          time: 3,
          activity: 'Suggested: watch the four commentary drive videos, then pair up for a short commentary practice in the classroom or in the vehicle.'
        }
      },
      {
        type: 'video',
        title: 'Commentary drive 1',
        vimeo: vid('852558278', 'fcd8a35b3c'),
        notes: { time: 2, tip: 'The numbering of the four commentary drives is a guess from the lesson’s layer order. Preview them.', videoSummary: null }
      },
      {
        type: 'video',
        title: 'Commentary drive 2',
        vimeo: vid('852562863', 'fdb903efdd'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Commentary drive 3',
        vimeo: vid('852564296', 'e52f16c204'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Commentary drive 4',
        vimeo: vid('852565823', 'e035e00289'),
        notes: { time: 2, videoSummary: null }
      },

      /* ---------- Close ---------- */
      {
        type: 'statement',
        kicker: 'Section 4 complete',
        text: 'Congratulations on completing Practical Driving Concepts.',
        sub: 'Questions and reflections?',
        notes: {
          time: 2,
          say: ['Recap: observe (alarm and links), manage blind spots and blockouts, scan and look, keep your CAS, tell hazards from threats, gather evidence and minimise the threat, then brake, accelerate, steer and corner smoothly for a stable platform.'],
          tip: 'Add a link to the next section here when you add it.'
        }
      }
    ]
  });
})();
