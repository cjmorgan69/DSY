// Manual Tasks Lesson 2: Postures and Principles of Safe Manual Tasks. Slide content condensed to dot points from the eLearning
// lesson (Articulate Storyline SCORM, "allow a minimum of 30 minutes", version 1.1 230216).
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// The videos are MP4 files inside the lesson package (link only: no copies are kept). The slides are placeholders; the notes and
// guide link to each file (saaslearn login needed). The two procedures linked are on the SAAS intranet.
// The posture matching question uses pictures and its answers are not in the extract.
(function () {
  function mp4(length, file, name) { return { length: length, file: file, url: 'https://saaslearn.com.au/moodle/pluginfile.php/15317/mod_scorm/content/4/story_content/' + name + '.mp4' }; }
  var order = 'The pairing of the five posture videos with their postures is from the lesson’s layer order. Confirm it.';

  DRIVE_SECTIONS.push({
    id: 'lesson2-postures',
    number: 2,
    title: 'Postures and Principles of Safe Manual Tasks',
    audience: 'Ambulance Clinicians',
    elearningMinutes: 30,
    slides: [
      {
        type: 'title',
        title: 'Manual Tasks',
        subtitle: 'Lesson 2: Postures and Principles of Safe Manual Tasks',
        lines: ['SA Ambulance Service'],
        notes: {
          time: 1,
          say: ['This lesson covers the lifting and working postures, the A-zone, how to handle and carry equipment, and getting in and out of the vehicle safely.'],
          tip: 'The eLearning takes at least 30 minutes (version 1.1, 230216). Best taught hands-on with a vehicle and equipment.'
        }
      },
      {
        type: 'statement',
        kicker: 'Acknowledgement of Country',
        text: 'SA Ambulance Service acknowledges Aboriginal and Torres Strait Islander peoples as the Traditional Custodians of this land and waters.',
        sub: 'We pay our respects to Aboriginal and Torres Strait Islander Elders, past, present and future, and acknowledge the diversity and strength of Aboriginal and Torres Strait Islander peoples and communities today.',
        notes: { time: 1, say: ['Read the acknowledgement as written.'] }
      },

      /* ---------- Postures ---------- */
      {
        type: 'video',
        title: 'Introduction to postures',
        video: mp4('0:44', 'Manual Tasks - Host Video 13.mp4', 'video_6VcEnHrW72l_22_48_678x382'),
        notes: { time: 1, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Why posture matters',
        video: mp4('0:28', 'Part 6.mp4', 'video_6PTAELrmX4V_22_48_678x382'),
        notes: { time: 1, videoSummary: null }
      },
      {
        type: 'statement',
        kicker: 'Manual tasks techniques',
        text: 'Five postures and actions.',
        sub: 'Weightlifter’s posture, knight’s position, forwards and backwards lunges, sideways lunge and bench posture.',
        notes: {
          time: 1,
          say: ['Each posture has a short description and a video. Show the video, then have the group practise the posture themselves.'],
          tip: order
        }
      },
      {
        type: 'bullets',
        title: 'Weightlifter’s posture',
        points: [
          'Used to lift loads close to the ground. It can be hard to master, but it is important to avoid injury',
          'Example: lifting a laden spinal board from the ground',
          'Feet shoulder width apart, flat on the ground',
          'Bend at the hips, stick your bottom out',
          'Maintain your natural spinal curves',
          'Don’t let your hips drop below your knees'
        ],
        notes: { time: 3, activity: 'Suggested: each person practises the posture while a partner checks the four points.', tip: order }
      },
      {
        type: 'video',
        title: 'Weightlifter’s posture: video',
        video: mp4('0:47', 'Part 11.mp4', 'video_6GQtgYqMwsy_22_48_604x340'),
        notes: { time: 1, tip: order, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Knight’s position',
        points: [
          'Similar to a proposal posture',
          'Front foot flat on the ground, front knee bent at 90 degrees',
          'Back leg kneels on the floor'
        ],
        notes: { time: 2, activity: 'Suggested: practise on a mat and have the group say when this posture would suit a task better than the weightlifter’s posture.' }
      },
      {
        type: 'video',
        title: 'Knight’s position: video',
        video: mp4('0:37', 'Part 10.mp4', 'video_5dEh3AV9eYS_22_48_604x340'),
        notes: { time: 1, tip: order, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Forwards and backwards lunges',
        points: [
          'Shift your body weight through a single plane, with the legs providing the power',
          'Split stance with feet hip width apart',
          'Transfer your weight to move the load: don’t pull or push with the arms',
          'Hand grip supinated for a backwards lunge',
          'Hand grip pronated for a forward lunge'
        ],
        notes: { time: 2, tip: 'Supinated = palms up. Pronated = palms down.' }
      },
      {
        type: 'video',
        title: 'Forwards and backwards lunges: video',
        video: mp4('0:40', 'Part 9 new.mp4', 'video_6bYLhXZCaae_22_48_604x340'),
        notes: { time: 1, tip: order, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Sideways lunge',
        points: [
          'Shift your body weight from side to side',
          'Feet slightly more than shoulder width apart',
          'Knees soft and slightly bent',
          'Hands supinated, elbows close to the body',
          'Transfer weight, but move along the same plane'
        ],
        notes: { time: 2 }
      },
      {
        type: 'video',
        title: 'Sideways lunge: video',
        video: mp4('0:41', 'Part 8 (2023).mp4', 'video_5qeP2J1IVcB_22_48_604x340'),
        notes: { time: 1, tip: order, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Bench posture',
        points: [
          'Looks like a semi-squat position',
          'Feet hip-width apart',
          'Poke your bottom out',
          'Maintain your natural spinal curves',
          'Keep your toes pointing forward',
          'Knees travel in the same direction as the toes'
        ],
        notes: { time: 2 }
      },
      {
        type: 'video',
        title: 'Bench posture: video',
        video: mp4('0:44', 'Part 7 new.mp4', 'video_6KFaK5GLODO_22_48_604x340'),
        notes: { time: 1, tip: order, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Manual tasks techniques: postures and actions',
        video: mp4('0:38', 'Manual Tasks - Host Video 14.mp4', 'video_5dC8cPOe682_22_48_678x382'),
        notes: { time: 1, videoSummary: null }
      },
      {
        type: 'cards',
        title: 'Match each posture to its most common use',
        cols: 5,
        variant: 'number',
        items: [
          { h: 'Weightlifter’s posture' },
          { h: 'Knight’s position' },
          { h: 'Forwards and backwards lunges' },
          { h: 'Sideways lunge' },
          { h: 'Bench posture' }
        ],
        notes: {
          time: 4,
          say: ['In the eLearning learners drag the picture of each posture above the picture of its most common use. The pictures and answers are not in the extract (the lesson has a Show Answer button).'],
          activity: 'Suggested: name common ambulance tasks (lifting a spinal board from the ground, working at a stretcher, moving a patient along a bed, and so on) and have the group choose the posture, then demonstrate it.'
        }
      },

      /* ---------- A zone and safe lifting ---------- */
      {
        type: 'video',
        title: 'The A-zone',
        video: mp4('0:45', 'Part 12.mp4', 'video_6GOjQiIsbQo_22_48_678x382'),
        notes: { time: 1, say: ['The A-zone and B-zone are used in the scenarios at the end of the lesson.'], videoSummary: null }
      },
      {
        type: 'video',
        title: 'Safe lifting',
        video: mp4('1:33', 'Manual Tasks - Host Audio 02.mp4', 'video_5Z3rHyKnVjT_22_48_678x382'),
        notes: { time: 2, videoSummary: null }
      },

      /* ---------- Equipment ---------- */
      {
        type: 'bullets',
        title: 'Checking equipment',
        points: [
          'To avoid stooping or working off the floor, always put equipment on a surface at the right height for you when restocking kits or checking equipment',
          { t: 'Suitable surfaces include:', sub: ['The front seats of the vehicle', 'The natural step inside the side door', 'The adjustable-height stretcher, taken out of the ambulance and covered with a sheet to protect the clean linen', 'Existing work benches'] }
        ],
        callout: { text: 'Procedure: Safe Manual Handling of Ambulance Equipment [PRO-292] (SAAS intranet).' },
        notes: {
          time: 2,
          tip: 'PRO-292 link (SAAS SharePoint, intranet only): https://sagov.sharepoint.com/sites/SAAS/policies/Documents/PRO-292%20Safe%20Manual%20Handling%20of%20Ambulance%20Equipment%20-%20INTRANET.pdf'
        }
      },
      {
        type: 'cards',
        title: 'Weight and safe working limit of equipment',
        cols: 4,
        variant: 'plain',
        items: [
          { h: 'Compact carry chair', t: 'Safe working limit 115 kg. Weighs 10 kg.' },
          { h: 'Stryker stretcher', t: 'Safe working limit 226 kg. Weighs 58 kg.' },
          { h: 'Blue slide sheet', t: 'Safe working limit 182 kg. Weighs 0.5 kg.' },
          { h: 'Spinal board', t: 'Safe working limit 220 kg. Weighs 5.5 kg.' },
          { h: 'Cardiac monitor', t: 'Weighs 8.5 kg.' },
          { h: 'Blue kit (airway kit)', t: 'Weighs 7.0 kg.' },
          { h: 'Green sock (oxygen kit)', t: 'Weighs 5.0 kg.' },
          { h: 'Red kit (trauma kit)', t: 'Weighs 7.5 kg.' }
        ],
        notes: {
          time: 3,
          say: ['Reveal each item and ask the group to guess its weight first.'],
          activity: 'Suggested: pass real equipment round so people feel the weights.'
        }
      },
      {
        type: 'bullets',
        title: 'Equipment with a safe working limit',
        points: [
          { t: 'Compact carry chair (115 kg limit, 10 kg)', sub: ['A portable folding evacuation chair to move patients from restricted areas to the stretcher; with extra staff it can get patients up or down steps', 'Over 115 kg, or access and egress restricted or difficult: other extrication options are available through the Bariatric team and Special Operations'] },
          { t: 'Stryker stretcher (226 kg limit, 58 kg)', sub: ['The main stretcher for transporting patients to and from hospital, with hydraulic raise and lower and a powered loading mechanism', 'High safe working load, but limited for carrying very wide patients'] },
          { t: 'Blue slide sheet (182 kg limit, 0.5 kg)', sub: ['A strong, slippery, reinforced sheet with handles, used to drag patients to where they can be moved onto a stretcher or assessed'] },
          { t: 'Spinal board (220 kg limit, 5.5 kg)', sub: ['A rigid yellow long board to lift or move patients, especially when spinal injury is suspected', 'A minimum of four workers lift the board with a patient. Also used to build a bridge'] }
        ],
        notes: { time: 3 }
      },
      {
        type: 'bullets',
        title: 'Kits and monitor',
        points: [
          { t: 'Cardiac monitor (8.5 kg)', sub: ['Does an ECG, monitors pulse rate, gives an SpO2 reading and can defibrillate'] },
          { t: 'Blue kit or airway kit (7.0 kg)', sub: ['Equipment to manage an unconscious patient’s airway, such as a face mask and airway adjunct'] },
          { t: 'Green sock or oxygen kit (5.0 kg)', sub: ['A small oxygen cylinder and a face mask for a patient who needs oxygen'] },
          { t: 'Red kit or trauma kit (7.5 kg)', sub: ['All the items needed for a primary response'] }
        ],
        notes: { time: 2 }
      },
      {
        type: 'cards',
        title: 'Lowest to heaviest',
        cols: 4,
        variant: 'number',
        items: [
          { h: '0.5 kg', t: 'Blue slide sheet' },
          { h: '5.0 kg', t: 'Green sock' },
          { h: '5.5 kg', t: 'Spinal board' },
          { h: '7.0 kg', t: 'Blue kit' },
          { h: '7.5 kg', t: 'Red kit' },
          { h: '8.5 kg', t: 'Cardiac monitor' },
          { h: '10 kg', t: 'Compact carry chair' },
          { h: '58 kg', t: 'Stryker stretcher' }
        ],
        notes: {
          time: 3,
          say: ['In the eLearning learners drag the eight weights into order, lowest to heaviest. Use this as a guessing game before showing the previous slide.'],
          tip: 'The lesson does not label the weights in the quiz. Pairing each weight with its equipment comes from the equipment slide.'
        }
      },

      /* ---------- Vehicle ---------- */
      {
        type: 'video',
        title: 'Carrying equipment up and down via the side door',
        video: mp4('1:17', 'Manual Tasks - Enter-Exit Vehicle 02.mp4', 'video_6TK3v5tpfO8_22_48_678x382'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Three points of contact',
        video: mp4('0:53', 'Manual Tasks - Enter-Exit Vehicle 01 (2023).mp4', 'video_6if63sJrivu_22_48_678x382'),
        notes: { time: 1, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Move with the doors',
        video: mp4('0:53', 'Manual Tasks - Enter-Exit Vehicle 03.mp4', 'video_6MtbM95Zmf0_22_48_678x382'),
        notes: { time: 1, videoSummary: null }
      },
      {
        type: 'statement',
        kicker: 'Do not exit via the back door',
        text: 'You must not enter or exit the ambulance from the rear doors.',
        sub: 'You can use the rear door step to reach the rearward lockers or to safely load and unload equipment, but you must keep three points of contact at all times.',
        notes: {
          time: 2,
          say: ['Procedure: Ascending and Descending Ambulance Steps [PRO-306] (SAAS intranet).'],
          tip: 'PRO-306 link (SAAS SharePoint, intranet only): https://sagov.sharepoint.com/sites/SAAS/policies/Documents/PRO-306%20Safe%20Ascending%20and%20Descending%20Ambulance%20Steps%20-%20INTRANET.pdf'
        }
      },
      {
        type: 'bullets',
        title: 'Corpuls cardiac monitor: storage and charging',
        points: [
          'Stored and charged in a Corpuls bracket in front of the rear attendant seat',
          'When not in use, keep it in its bracket, turned to face the front of the vehicle for easy access'
        ],
        callout: { text: 'Procedure: Safe Manual Handling of Ambulance Equipment [PRO-292] (SAAS intranet).' },
        notes: { time: 1 }
      },
      {
        type: 'numbered',
        title: 'Corpuls cardiac monitor: handling',
        items: [
          'Rotate the bracket: stand near the side door and pull the pin up (at the front of the bracket). Turn the screen to face the front of the vehicle before lifting it or returning it, so you don’t overreach or twist',
          'Remove it: lift the red handle to release the bracket lock. With your other hand lift the unit off and away from the cradle, elbows close to your sides, standing close to the bracket',
          'Return it: tilt the monitor with two hands and line the base up with the locking points'
        ],
        notes: {
          time: 3,
          activity: 'Suggested: each person removes and returns the monitor in a real vehicle while a partner watches posture and reach.',
          tip: 'The eLearning gives this as four steps, 1 Storage and charging (previous slide), 2 Rotating bracket, 3 Removal, 4 Return.'
        }
      },

      /* ---------- Scenarios ---------- */
      {
        type: 'statement',
        kicker: 'Applying postures and safe lifting',
        text: 'Three scenarios: choose how to work within your A-zone.',
        sub: 'In each, ask the group which option they would choose, then reveal.',
        notes: {
          time: 1,
          say: ['In the eLearning each scenario shows pictures of the options. Describe or demonstrate the options instead.']
        }
      },
      {
        type: 'compare',
        title: 'Scenario 1: recovering an item from a high shelf in the storeroom',
        left: { head: 'Correct: use the steps', points: ['You use the correct manual handling technique and equipment', 'With the steps, the items on the shelf are in your A-zone'] },
        right: { head: 'Incorrect', points: ['The items are still in your B-zone, which can result in shoulder injury'] },
        notes: { time: 2, tip: 'The lesson’s pictures show which option is which. From the feedback, scenario one is using steps.' }
      },
      {
        type: 'compare',
        title: 'Scenario 2: cleaning the stretcher',
        left: { head: 'Correct: raise the stretcher', points: ['The stretcher is at a comfortable height, within your A-zone'] },
        right: { head: 'Incorrect', points: ['Lowering the stretcher puts it in your B-zone', 'You risk injuring your knees or back'] },
        notes: { time: 2 }
      },
      {
        type: 'compare',
        title: 'Scenario 3: opening the rear door of the ambulance',
        left: { head: 'Correct: move with the door', points: ['Moving with the door reduces stress on your body by keeping the door in your A-zone'] },
        right: { head: 'Incorrect', points: ['The weight of the door stresses your limbs, joints and spine'] },
        notes: { time: 2 }
      },
      {
        type: 'statement',
        kicker: 'Lesson 2 complete',
        text: 'Congratulations on completing Lesson 2.',
        sub: 'Questions and reflections?',
        notes: { time: 2, say: ['Recap: choose the right posture, work in your A-zone, use a suitable surface and equipment, and keep three points of contact.'], tip: 'Add a link to the next lesson here when you add it.' }
      }
    ]
  });
})();
