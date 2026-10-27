// DRiVE Section 3: Introduction to SAAS Vehicles. Slide content condensed to dot points from the eLearning lesson
// (Moodle lesson id 23491, 19 pages, "allow a minimum of 60 minutes"). The section number is a guess: change it if SAAS numbers it differently.
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// Video lengths and captions were not available, so the video slides have no length badge and no summary.
// Not carried over (need a SAAS login): the H5P switches picture, the six siren sounds, the photos, and the PRO-055 intranet link.
(function () {
  function vid(id, hash) { return { id: id, hash: hash, length: '' }; }

  DRIVE_SECTIONS.push({
    id: 'section3-vehicles',
    number: 3,
    title: 'Introduction to SAAS Vehicles',
    audience: 'Volunteer, Career and External Clients',
    elearningMinutes: 60,
    slides: [
      {
        type: 'title',
        title: 'DRiVE Principles and Knowledge',
        subtitle: 'Section 3: Introduction to SAAS Vehicles',
        lines: ['Volunteer, Career and External Clients'],
        notes: {
          time: 1,
          say: ['This section is about getting to know the vehicle: checks, faults, starting, switches, lights, sirens, seat and mirrors, then moving off and navigating.',
                'The eLearning version takes at least 60 minutes, so in the classroom allow time for the videos and for hands-on practice in a real vehicle.'],
          tip: 'Best run next to a vehicle. Plan which parts (checks, switches, seat setup, cabin drill) you will do hands-on.'
        }
      },

      /* ---------- Introduction ---------- */
      {
        type: 'video',
        title: 'Introduction: VS30 safety features (Mercedes)',
        vimeo: vid('855259644', '56bbbea11e'),
        notes: {
          time: 3,
          say: ['This video was made by Mercedes and describes some of the safety features of the VS30 model.'],
          videoSummary: null
        }
      },
      {
        type: 'video',
        title: 'Introduction: second video',
        vimeo: vid('855261511', 'bdb4a1a06b'),
        notes: {
          time: 3,
          say: ['The eLearning page has a second video here that the page text does not mention.'],
          tip: 'Preview it first so you know what it covers.',
          videoSummary: null
        }
      },

      /* ---------- OUTS and OUTSET ---------- */
      {
        type: 'video',
        title: 'OUTS and OUTSET',
        vimeo: vid('855543433', 'ebb8465807'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'statement',
        kicker: 'Vehicle checks',
        text: 'The driver is responsible for the vehicle they are driving.',
        sub: 'Checks make sure the vehicle is mechanically safe and legally roadworthy.',
        notes: {
          time: 1,
          say: ['Whoever is driving owns the check. Responsibility is not passed on to the previous crew or to Fleet.'],
          ask: ['What could go wrong if you assume the last crew checked it?']
        }
      },
      {
        type: 'compare',
        title: 'OUTS and OUTSET',
        left: {
          head: 'OUTS: every time you approach and start the vehicle',
          points: [
            { t: 'O: Outside', sub: ['Walk around for external damage or defects not in the logbook', 'Excess dirt, especially windscreen and lights'] },
            { t: 'U: Under', sub: ['Look for oil, coolant, water or transmission fluid leaks', 'Try to identify the source and report to Fleet or the SDM'] },
            { t: 'T: Tyres', sub: ['Good condition and appear correctly inflated', 'Legal tread using the tyre wear indicator'] },
            { t: 'S: Start', sub: ['Start the vehicle and check the dash symbols', 'Action anything displayed'] }
          ]
        },
        right: {
          head: 'OUTSET: start of shift, or on a vehicle swap',
          points: [
            'O, U, T, S as above',
            { t: 'E: Electronics', sub: ['Full review of vehicle lights and systems to make sure they work'] },
            { t: 'T: Tools of the trade', sub: ['Inspect and test medical equipment, stretcher and communication equipment', 'Explain use of the MDT, radio, sat phone and UHF radio'] },
            'Done as soon as possible after the start of the shift, and when you change into a different fleet vehicle'
          ]
        },
        callout: { text: 'Tyre pressure may show in the vehicle’s electronic reporting. Newer vehicles show each tyre; older ones only warn when two tyres differ by about 2 psi.' },
        notes: {
          time: 4,
          say: ['OUTS every time you approach and start the vehicle. OUTSET at the start of the shift or after a swap.',
                'Walk through each letter. If a vehicle is available, do it live.'],
          ask: ['Which letter do you think gets skipped most often, and why?'],
          activity: 'Suggested: do an OUTS on a real vehicle in small groups, with a prepared defect for them to find.'
        }
      },

      /* ---------- Workshop and damage ---------- */
      {
        type: 'video',
        title: 'Workshop and Damage',
        vimeo: vid('851181886', '7cfce7f48b'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Workshop and damage',
        points: [
          'If damage isn’t reported then it can’t be fixed',
          'Every SAAS vehicle has a Vehicle Service, Repair and Defect Report Book, usually in the passenger side footwell',
          'Enter the details at the top of the page, then describe the fault in the top section; Fleet completes the rest when the vehicle is assessed',
          'If the defect affects the safe or legal operation of the vehicle, escalate to the SDM or Fleet by phone as soon as possible',
          'A minor defect or repair can be written in the book and left for the next service'
        ],
        notes: {
          time: 3,
          say: ['The eLearning shows photos of the book, where to write damage and a filled-in example. They need a SAAS login, so show a real book if you can.'],
          ask: ['What would you write for a cracked indicator lens? Is it a phone call or a book entry?']
        }
      },
      {
        type: 'compare',
        title: 'Urgent repairs: metro and country',
        left: {
          head: 'Metro ambulances',
          points: [
            'Tell the EOC Team Leader',
            'Arrange for the vehicle to come into Fleet Services',
            'Fleet attempts repair on a priority basis to cut downtime while the crew stays on site',
            'If it can’t be fixed in a reasonable time, the crew changes into a spare vehicle',
            'Fleet notifies the EOC when the vehicle is ready to return to service'
          ]
        },
        right: {
          head: 'Country ambulances',
          points: [
            'Minor repairs go in the Vehicle Fault Book and are done at normal servicing',
            'Urgent: book into an authorised service agent',
            'Email a Vehicle repair authorisation form to Fleet Services',
            { t: 'The form includes:', sub: ['Service agent’s name, fleet number, vehicle location', 'Current odometer reading, work to be carried out', 'Member’s name and pay number, return fax number'] },
            'Fleet adds a purchase order number, faxes it to the agent and raises a work order; the work order is set to complete'
          ]
        },
        notes: {
          time: 3,
          say: ['Know which path applies to your region. Metro goes through the EOC Team Leader and Fleet Services; country uses an authorised service agent and the repair authorisation form.'],
          tip: 'Check the current form and process locally before the session. The lesson text mentions faxing.'
        }
      },

      /* ---------- Go No-Go ---------- */
      {
        type: 'video',
        title: 'Go No-Go',
        vimeo: vid('855553302', '773810e0d1'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Go No-Go decision',
        points: [
          'The driver makes the decision after the vehicle check: is the vehicle safe and legal to use?',
          { t: 'No-Go: anything affecting safe or legal operation', sub: ['Don’t use it', 'Contact the State Duty Manager before use (generally along with Fleet Services advice)'] },
          { t: 'Go: issues that don’t affect safe or legal operation', sub: ['Document them in the fleet servicing book', 'Contact your Team Leader and Fleet Services to arrange repair at a convenient time'] },
          'After talking with the SDM or TL, a restricted use may be agreed, e.g. no emergency driving, no patient carries',
          'The driver carries a large share of operational and legal responsibility. If in doubt, ask'
        ],
        notes: {
          time: 4,
          say: ['The decision is the driver’s, but you don’t have to make it alone. Ring the SDM or Team Leader.',
                'Restrictions are a middle option: the vehicle can be used, but not for everything.'],
          ask: ['A reversing light is out. Go, No-Go or restricted? What would you need to know?'],
          activity: 'Suggested: give the group three defect cards (e.g. dash warning, worn tyre, dirty windscreen) and ask for Go, No-Go or restricted use with reasons.'
        }
      },

      /* ---------- Charging, keys, starting ---------- */
      {
        type: 'video',
        title: 'Vehicle charging',
        vimeo: vid('855560279', '0fe092138d'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Vehicle charging',
        points: [
          'Ambulances must be on charge when at a station with charging facilities and not in use',
          'Several electronic devices keep charging or running while the vehicle is unattended',
          'When correctly connected the amber light comes on',
          'Close the charging port cover when not in use, or the vehicle can’t start'
        ],
        notes: {
          time: 2,
          say: ['A closed charging port cover is part of getting ready to drive. It links to the “nothing happens” starting fault later.']
        }
      },
      {
        type: 'video',
        title: 'Keys',
        vimeo: vid('851161583', '1b0e7d6890'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Flat key battery',
        points: [
          'Use the metal key to get into the vehicle',
          'Newer vehicles: put the key casing in the cup holder, then start as normal',
          'Older vehicles: put the key casing in the ignition port, then start as normal'
        ],
        notes: { time: 1, activity: 'If you have a vehicle on site, have each person try it.' }
      },
      {
        type: 'video',
        title: 'Starting issues',
        vimeo: vid('851168532', '39fb7e6b8c'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Starting issues',
        points: [
          { t: 'Turn the ignition and nothing happens', sub: ['The weather cover on the charging port may not be closed properly', 'If it is closed, hold the silver override button (left base of the driver’s seat) while starting, then let go'] },
          { t: 'Slow turnover or ticking', sub: ['Could be a low starter battery', 'Press the emergency start button on the panel on top of the dash to couple the batteries, then start'] },
          { t: 'Nothing happens and a red light shows on the battery indicator panel', sub: ['The battery is flat and needs a jump start', 'The cables are under the airway seat; connect as shown in the video'] }
        ],
        callout: { text: 'Some issues can only be dealt with by Fleet.' },
        notes: {
          time: 3,
          say: ['Three symptoms, three responses. Link each to what you saw in the video.'],
          ask: ['Which of these would you try yourself, and when would you ring Fleet?']
        }
      },

      /* ---------- Tyre change and fuel ---------- */
      {
        type: 'video',
        title: 'Tyre change',
        vimeo: vid('851178297', '987a1bac01'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Tyre change',
        points: [
          'A wheel change is not recommended: workplace health and safety and manual tasks issues',
          'The spare wheel is under the back of the vehicle; removing it needs tools and access is difficult',
          'Metro and near metro: ask the State Duty Manager to help arrange a wheel change',
          'Country: share the problem to find a resolution',
          'During a wheel change no patient or staff should be left in the vehicle'
        ],
        notes: { time: 2, say: ['Know that the spare exists and where it is, but the expected action is to ask for help.'] }
      },
      {
        type: 'video',
        title: 'Fuel: first video',
        vimeo: vid('851159555', '2d3442b2bb'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Fuel: second video',
        vimeo: vid('855563887', 'ba7e0c720b'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Fuel',
        points: [
          'All Mercedes ambulances use diesel',
          'Minimum fuel on return to station: 3/4 tank in country, 1/2 tank in metro',
          'Fuel cards are kept in the vehicle; suppliers vary by region',
          'The card needs a PIN linked to the fleet number, plus the current odometer reading',
          'Wrong odometer readings may restrict purchases if activity looks unusual or fraudulent'
        ],
        callout: { head: 'Wrong fuel', text: 'The card won’t allow the purchase. Contact the State Duty Manager immediately. Do not start the vehicle; wait for a flat bed truck or fuel recovery service.' },
        notes: {
          time: 2,
          say: ['Diesel only. If petrol goes in, the key point is: do not start the engine.'],
          ask: ['You realise at the pump that you put the wrong fuel in. What is the very first thing you do?']
        }
      },

      /* ---------- Switches ---------- */
      {
        type: 'statement',
        kicker: 'Switches',
        text: 'Know where the cabin switches are and what they do.',
        sub: 'The aircon control does not control heating in the rear of the ambulance. That is done from the controls in the rear.',
        notes: {
          time: 2,
          say: ['The eLearning uses an interactive picture with a hotspot for every switch in the cabin. It needs a SAAS login and its labels have not been copied here.'],
          tip: 'Best done in a real vehicle: point to each switch and have the group touch it (with the vehicle safe). Or show the lesson’s interactive image on screen.'
        }
      },
      {
        type: 'video',
        title: 'Switches',
        vimeo: vid('855205642', '7e206afb77'),
        notes: { time: 3, videoSummary: null }
      },

      /* ---------- Beacons and Travel ---------- */
      {
        type: 'video',
        title: 'Beacons and Travel: first video',
        vimeo: vid('855572286', '73166da7ce'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Beacons and Travel: second video',
        vimeo: vid('851490865', '1ec7031d56'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'compare',
        title: 'Beacons and Travel',
        left: {
          head: 'Beacons',
          points: [
            'Preferred lighting for emergency driving',
            'All red and blue lights plus the white light are active',
            'White flashing light can be seen from further away than red or blue',
            'If in beacons mode when you apply the handbrake, the white light turns off (it is disruptive on scene)'
          ]
        },
        right: {
          head: 'Travel',
          points: [
            'For driving in fog, or past lots of reflective signage at the roadside',
            'No flashing or strobing white lights, so no white light throwback'
          ]
        },
        notes: {
          time: 3,
          say: ['Beacons are the standard emergency setting. Travel mode is for conditions where white strobes would blind you.'],
          ask: ['Where have you seen white light throwback? What did it do to your vision?']
        }
      },
      {
        type: 'bullets',
        title: 'Checking and using emergency lights',
        points: [
          'Check the beacons during the vehicle check',
          'You can’t fully check them alone: white lights need the handbrake off, so it isn’t safe to get out',
          'Remote scenes with aircraft: you may need to turn off all emergency lighting (night vision goggles, strobes can compromise the pilot’s vision)',
          'The static light above the number plate shows on an expiation notice that the emergency lights were active (rule 306), so the exemption can be claimed',
          'LED pulse frequency can hide the flashing from the naked eye but a camera shows it: always make sure these lights work during your check'
        ],
        notes: {
          time: 3,
          say: ['Get a second person to look at the lights from outside while you operate them.'],
          tip: 'Rule 306 is quoted as written in the lesson. Check the current rule reference if you want to cite it.'
        }
      },

      /* ---------- Sirens ---------- */
      {
        type: 'video',
        title: 'Siren operation: first video',
        vimeo: vid('855573500', 'a7a418ecd0'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Siren operation: second video',
        vimeo: vid('855583635', 'f98ff5e6e1'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Siren operation: third video',
        vimeo: vid('855584053', 'ff61676333'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'cards',
        title: 'Standard siren tones',
        cols: 3,
        variant: 'plain',
        items: [
          { h: 'Wail', t: 'Long stretches of road. The sound carries furthest.' },
          { h: 'Yelp', t: 'On the approach to an intersection or congested area.' },
          { h: 'Combined', t: 'As you negotiate the “Hazard” area.' }
        ],
        notes: {
          time: 3,
          say: ['If you are driving under emergency response conditions and interacting with moving traffic, the siren should be on. Understand siren use as set out in the Emergency Driving procedure (PRO-055, on the SAAS intranet).',
                'Change tone with the foot switch at the forward end of the foot brace (preferred), or on VS30 vehicles by quickly tapping the horn.',
                'The siren is a safety device. Think carefully about your driving style if you turn it off during an emergency response.'],
          activity: 'The lesson has recordings of each siren, alone and with the rumbler. Play them here if you have login access.'
        }
      },
      {
        type: 'bullets',
        title: 'Rumbler siren',
        points: [
          'A deep bass siren that runs for 9 seconds when activated',
          'VS30 model ambulances only',
          'Press the horn firmly twice in quick succession',
          'If you change tones during the 9 seconds, it changes to the tone of the rumbler',
          { t: 'Consider it for:', sub: ['Road workers wearing hearing protection', 'People wearing crash helmets', 'Pedestrians who seem distracted or unaware (headphones? deaf?)', 'Vehicles that haven’t heard the normal siren'] }
        ],
        callout: { text: 'Depending on your device’s audio, the deep bass of the rumbler may be hard to hear in the recording.' },
        notes: {
          time: 3,
          ask: ['Who is most at risk of not hearing a normal siren? What else could you do?']
        }
      },

      /* ---------- Speed limiter and cruise ---------- */
      {
        type: 'video',
        title: 'Cruise control, speed limiter and adaptive cruise (Mercedes)',
        vimeo: vid('855584849', '299ffa823d'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'cards',
        title: 'Speed limiter and cruise control',
        cols: 3,
        variant: 'plain',
        items: [
          { h: 'Cruise control', t: 'Holds a set speed with no accelerator input. Only recommended on open roads. Not in built-up areas with patients on board: you lose accelerator sense and the ride is less comfortable for patient and partner.' },
          { h: 'Speed limiter', t: 'Can be set to any speed and physically stops you going over it in normal circumstances. Can help you stay within the Emergency Driving procedure.' },
          { h: 'Adaptive cruise control', t: 'Review the Mercedes video, which introduces adaptive speed control and other safety features.' }
        ],
        notes: {
          time: 3,
          ask: ['When would you set the speed limiter on an emergency drive?']
        }
      },

      /* ---------- Seat, wheel and belt ---------- */
      {
        type: 'video',
        title: 'Seat setup',
        vimeo: vid('851480946', 'd2aa4c2149'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Steering wheel setup',
        vimeo: vid('851186176', 'd5af9c31c5'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'statement',
        kicker: 'Seat setup',
        text: 'Best control and safety, with every control within easy reach.',
        sub: 'A correct posture is safe and comfortable and lessens driver distraction. Do the steps in order.',
        notes: {
          time: 1,
          say: ['Seven steps, in order. Do them in a real driver’s seat if you can, with each person adjusting their own.']
        }
      },
      {
        type: 'bullets',
        title: 'Seat setup: steps 1 to 3',
        points: [
          { t: '1. Left foot brace', sub: ['Place your foot against the brace so you can push against it', 'Pushing on the brace and back on the wheel braces your body for accurate steering and for an adverse incident'] },
          { t: '2. Bend in the knee', sub: ['Adjust the seat base forward/back and up/down for a slight bend in the knee when braced', 'Keep your foot on the brace, relaxed, during drives'] },
          { t: '3. Deep in the seat', sub: ['Push your backside deep, back and down', 'If you can’t without easing off the brace, move the seat forward', 'Pushing up off the seat when you brace? Lower the seat'] }
        ],
        notes: { time: 3, activity: 'Suggested: ask people to tell you in turn what they changed from their usual set-up.' }
      },
      {
        type: 'bullets',
        title: 'Seat setup: step 4, hand position',
        points: [
          'Hold the wheel at 9 and 3, or 10 and 2, allowing for wheel design and controls on the wheel',
          'Wheel as low as possible to keep the shoulders relaxed; you should see the top of the dash display just under the rim',
          'A gentle bend at the elbows shows the right distance',
          'Thumbs “in”, not along the wheel. Only up the wheel when driving off road on rough terrain',
          'No palm steering: it is one-handed, slippage can mean not negotiating the obstacle safely, and there is no margin of error'
        ],
        notes: {
          time: 3,
          say: ['The lesson’s test: hand someone a pen or drink bottle and watch them use their thumb. Try holding the bottle without the thumb and it feels wrong.']
        }
      },
      {
        type: 'bullets',
        title: 'Seat setup: steps 5 to 7',
        points: [
          { t: '5. Firm shoulder contact', sub: ['Light bracing with a slight push back on the wheel; shoulders contact the seat without fully straightening the arms', 'Check: slide the hands around the wheel as if doing a full turn; the driver shouldn’t lean forward and lose contact with the seat'] },
          { t: '6. Head restraint', sub: ['Top of the restraint a little above the top of the ears', 'Pushing your head back shouldn’t make it pivot up or down'] },
          { t: '7. Suspension seat', sub: ['Adjust the counter spring for comfort', 'Too light: the seat bottoms out with a sudden stop. Too firm: you feel the ruts and road surface', 'The author sets the weight dial 20 to 30 kg above their own weight; everyone finds their own', 'To stop movement, flick the lateral lever on the front base of the seat while there is compression on the seat'] }
        ],
        notes: {
          time: 3,
          tip: 'The lesson page title includes “Seat Belt” but it has no separate seat belt text. Seat belt is item 10 of the cabin drill.'
        }
      },

      /* ---------- Mirrors ---------- */
      {
        type: 'video',
        title: 'Mirror setup',
        vimeo: vid('851485078', '9d719c31cf'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Mirror setup',
        points: [
          'Outside mirror controls are on the driver’s door, next to the electric window control',
          'The top main mirrors heat automatically in cold weather',
          'The lower mirror is convex: it reduces the blind spot but does not remove it, and objects in it look smaller and closer than they really are',
          'The internal centre mirror gives an obscured rear view; it is more use for seeing your partner and patient',
          'At night with the internal lights on, the centre mirror is no use for outside view and can distract your forward vision'
        ],
        notes: {
          time: 2,
          say: ['The convex mirror helps with the blind spot but does not remove it, so still turn and check.'],
          ask: ['What can you do about a blind spot that a mirror can’t fix?']
        }
      },

      /* ---------- Cabin drill ---------- */
      {
        type: 'cards',
        title: 'The cabin drill',
        cols: 5,
        variant: 'number',
        items: [
          { h: 'OUT check' },
          { h: 'Ensure doors shut' },
          { h: 'Ensure handbrake is on' },
          { h: 'Adjust seat' },
          { h: 'Adjust steering wheel' },
          { h: 'Start engine / check dash' },
          { h: 'Adjust mirrors' },
          { h: 'Ensure equipment secure' },
          { h: 'Ensure occupants secure' },
          { h: 'Fasten seatbelt' }
        ],
        notes: {
          time: 4,
          say: ['When vehicle and personal set-up are complete, the cabin drill groups them together. When it is done, vehicle, people and equipment are all ready to become mobile.',
                'The list has a natural order but does not have to be done in exactly this order.'],
          tip: 'The lesson runs the ten items together as one block; the split into ten is a reading of the list.',
          activity: 'Suggested: each person calls out the cabin drill aloud in a real vehicle while a partner ticks the items.'
        }
      },

      /* ---------- Night driving ---------- */
      {
        type: 'video',
        title: 'Preparing for night driving',
        vimeo: vid('851486991', '9c063b09a8'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Preparing for night driving',
        points: [
          'Be rested and not fatigued before the shift starts',
          'Clean windows, mirrors and lights: rain drops or wash residue on the mirror may not matter by day but cut your view at night',
          'Dirt inside or outside the windscreen scatters light, hazes the view and raises your risk of an incident',
          'Make sure ALL lights work during the vehicle check',
          'Demister on the window setting, air conditioner on, fresh air input (not recycled air)',
          'Keep internal lights low to cut reflection on the windscreen; use the curtain behind the driver’s seat if fitted',
          'Reversing in the dark is not recommended. Use a guide if you can; turning the headlights off (side lights on) may improve rear vision, and use the rear and side scan lights'
        ],
        notes: {
          time: 3,
          ask: ['What do you do now, at your own station, to get the vehicle ready for a night shift?']
        }
      },

      /* ---------- Moving familiarisation ---------- */
      {
        type: 'video',
        title: 'Moving familiarisation',
        vimeo: vid('851488987', 'e952c85f02'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'statement',
        kicker: 'Moving familiarisation',
        text: 'Tap, tap, wiggle, wiggle.',
        sub: 'Check the accelerator, brake and steering as you move off on your first drive.',
        notes: {
          time: 1,
          say: ['Do it every time you start a new drive.']
        }
      },
      {
        type: 'bullets',
        title: 'Tap, tap, wiggle, wiggle',
        points: [
          { t: 'Tap, tap: accelerator and brake', sub: ['Apply initial pressure to the accelerator to find the positive drive point', 'Apply the brakes to feel the pressure needed to move the pedal and where pressure starts after any pedal slack'] },
          { t: 'Wiggle, wiggle: steering', sub: ['As the vehicle moves off, turn the wheel left and right', 'Confirms you have steering, shows any slack, and checks your wheel set-up for control and comfort'] }
        ],
        notes: { time: 2, activity: 'Suggested: demonstrate on a vehicle in a safe area, then have each person do it.' }
      },

      /* ---------- Navigation ---------- */
      {
        type: 'video',
        title: 'Navigation options',
        vimeo: vid('855591435', 'f8b89e24ab'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Navigation options',
        points: [
          'Most SAAS vehicles have GPS linked to the Mobile Data Terminal (MDT); it fills in when you are tasked to a case',
          'You may need to load details into a separate GPS or add them by hand',
          'GPS may be unreliable in parts of the State, or equipment may not work: the EOC then dispatches with map co-ordinates (UBD or CFS map book)',
          'Map books will rarely be needed but all staff must be able to give directions from one quickly and accurately',
          'Be able to read UBD, CFS, topographical and state road maps, and to understand and find RPA and RAPID numbers'
        ],
        notes: {
          time: 3,
          ask: ['When did you last use a map book? Where is yours?']
        }
      },
      {
        type: 'numbered',
        title: 'Giving directions: AT-DO',
        items: [
          'Info 1: “At the end of the road, turn left.” Wait until the manoeuvre is completed, then:',
          'Info 2: “After the roundabout take the first street on the right.” Wait until it is completed, then:',
          'Info 3: “At the fourth street on the left, turn left; the one before is Smith Street.” Wait until you turn in, then:',
          'Info 4: “Number 18 on the left.”'
        ],
        notes: {
          time: 4,
          say: ['AT-DO: say where (AT) first, then the action (DO). Use hand directions to help the driver’s peripheral vision.',
                'Say “turn left at the roundabout” and as soon as the driver hears “turn left” they look for a left turn. Say “at the roundabout, turn left” and their eyes go forward to the roundabout. It also fits the way we scan.',
                'The cabin is busy and noisy in an emergency drive, so accurate, timely cues matter.'],
          activity: 'Suggested: pairs practise AT-DO on a street map, one navigating and one “driving” with a finger on the route.'
        }
      },
      {
        type: 'bullets',
        title: 'Rural property addressing',
        points: [
          'RAPID numbers are no longer issued, but some properties still show the yellow plate with six figures, often at the entrance',
          'Those six-figure numbers are grid references on a 1:50 000 topographical map for that area',
          'South Australia’s rural property addressing is managed by the state government and local councils; the sign format is set by the council',
          { t: 'The sign has four parts', sub: ['A distance-based road number', 'Road name', 'Locality', 'Postcode'] },
          'Number = distance in metres from the start of the road to the entrance, divided by ten. Even numbers on the right, odd on the left',
          'Example: entrance 5,080 m along, on the right = number 508',
          'The road start is the fastest, safest road from the nearest major road or town'
        ],
        notes: {
          time: 4,
          activity: 'Suggested: ask the group to work out the number for an entrance 3,270 m along the road on the left (327, odd = left).'
        }
      },
      {
        type: 'bullets',
        title: 'Grid references',
        points: [
          'A grid of vertical (north-south) and horizontal (east-west) lines is overlaid on the map',
          'The first numbers are always across the map',
          'Memory prompt: “Cross the river, and then climb the tree”',
          'Grid squares usually represent one square kilometre',
          'Divide the space between lines into 10 to turn two-digit numbers into three digits',
          'Three digits across (top or bottom) plus three digits up the side = a six figure grid reference'
        ],
        notes: {
          time: 4,
          activity: 'Suggested: give out a 1:50 000 map extract and ask each person to find a six figure grid reference you name.'
        }
      },

      /* ---------- Close ---------- */
      {
        type: 'statement',
        kicker: 'Section 3 complete',
        text: 'Congratulations on completing Introduction to SAAS Vehicles.',
        sub: 'Questions and reflections?',
        notes: {
          time: 2,
          say: ['Recap the flow: check the vehicle (OUTS/OUTSET), decide Go or No-Go, set yourself up (cabin drill), move off (tap, tap, wiggle, wiggle), then navigate with AT-DO.'],
          tip: 'Add a link to the next section here when you add it.'
        }
      }
    ]
  });
})();
