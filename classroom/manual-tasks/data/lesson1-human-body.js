// Manual Tasks Lesson 1: The Human Body and Injuries Relating to Manual Tasks. Slide content condensed to dot points from the
// eLearning lesson (Articulate Storyline SCORM, "allow a minimum of 15 minutes", version 0.4 211201).
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// The videos in this lesson are MP4 files inside the lesson package (not Vimeo) and need a SAAS login, so the video slides are
// placeholders that say where the video is; the notes and guide link to each file (saaslearn login needed). The picture questions use photos that were not copied: add your own.
(function () {
  function mp4(length, file, name) { return { length: length, file: file, url: 'https://saaslearn.com.au/moodle/pluginfile.php/15316/mod_scorm/content/4/story_content/' + name + '.mp4' }; }

  DRIVE_SECTIONS.push({
    id: 'lesson1-human-body',
    number: 1,
    title: 'The Human Body and Injuries Relating to Manual Tasks',
    audience: 'Ambulance Clinicians',
    elearningMinutes: 15,
    slides: [
      {
        type: 'title',
        title: 'Manual Tasks',
        subtitle: 'Lesson 1: The Human Body and Injuries Relating to Manual Tasks',
        lines: ['SA Ambulance Service'],
        notes: {
          time: 1,
          say: ['Welcome the group. This lesson looks at the muscles of the body and the injuries manual tasks can cause.'],
          tip: 'The eLearning version takes at least 15 minutes (version 0.4, 211201).'
        }
      },
      {
        type: 'statement',
        kicker: 'Acknowledgement of Country',
        text: 'SA Ambulance Service acknowledges Aboriginal and Torres Strait Islander peoples as the Traditional Custodians of this land and waters.',
        sub: 'We pay our respects to Aboriginal and Torres Strait Islander Elders, past, present and future, and acknowledge the diversity and strength of Aboriginal and Torres Strait Islander peoples and communities today.',
        notes: { time: 1, say: ['Read the acknowledgement as written.'] }
      },

      /* ---------- Questions to ask ---------- */
      {
        type: 'statement',
        kicker: 'Your first day',
        text: 'You might feel overwhelmed because you don’t yet know what to expect. So you decide to ask some questions.',
        notes: {
          time: 1,
          say: ['In the eLearning a new starter asks three questions and each opens a video. The next three slides are those videos.']
        }
      },
      {
        type: 'video',
        title: 'What am I going to learn in this course?',
        video: mp4('1:11', 'Manual Tasks - Host Video 02.mp4', 'video_5qseNeD1lA2_22_48_640x360'),
        notes: { time: 2, tip: 'The pairing of the three videos with their questions is from the lesson’s layer order and file names. Confirm it.', videoSummary: null }
      },
      {
        type: 'video',
        title: 'What are hazardous manual tasks?',
        video: mp4('2:36', 'Manual Tasks - Host Audio 01.mp4', 'video_5y072tMLUey_22_48_640x360'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Why is this important to know as an Ambulance Clinician?',
        video: mp4('1:02', 'Part2 Why should we care_.mp4', 'video_5fNGzBT3P0u_22_48_640x360'),
        notes: { time: 2, videoSummary: null }
      },

      /* ---------- Knowledge check ---------- */
      {
        type: 'cards',
        title: 'Which manual task is being performed in the picture?',
        cols: 4,
        variant: 'number',
        items: [
          { h: 'Hold or restrain' },
          { h: 'Move or carry' },
          { h: 'Push or pull' },
          { h: 'Lift or lower' }
        ],
        notes: {
          time: 4,
          say: ['The eLearning shows four photos, one at a time, each with this question. The photos and the right answers are not in the extract.'],
          activity: 'Add your own photos or use real equipment: show each task and have the group name which of the four it is. Repeat for several different tasks.'
        }
      },

      /* ---------- Muscles ---------- */
      {
        type: 'bullets',
        title: 'Skeletal muscles',
        points: [
          'The main muscles we think of for movement: voluntary muscles that work together to move the body and to support posture',
          'Very adaptable: they get stronger and bigger with exercise, or waste away (atrophy) with disuse',
          'They contract or relax and work with bones and joints to make a lever system',
          'How you use them protects your body from injury, especially the spine and shoulders'
        ],
        callout: { text: 'Weightlifters protect themselves by using the back and upper back “core” muscles together with the stronger leg and buttock muscles.' },
        notes: { time: 3, ask: ['What do you notice when you lift with your back and not your legs?'] }
      },
      {
        type: 'cards',
        title: 'Workers apply the same principles',
        cols: 3,
        variant: 'plain',
        items: [
          { h: 'Calf muscles' },
          { h: 'Quadriceps' },
          { h: 'Gluteal muscles' }
        ],
        callout: { text: 'Use the stronger leg muscle groups, with the core muscles, to work efficiently and safely at all times.' },
        notes: {
          time: 2,
          say: ['In the eLearning each muscle group opens a picture with a one-line label.'],
          activity: 'Suggested: have the group find and touch each muscle group on themselves.'
        }
      },
      {
        type: 'bullets',
        title: 'Involuntary muscles',
        points: [
          'Work without conscious control',
          'Include cardiac muscle and smooth muscle',
          'Smooth muscle is found in the digestive and respiratory organs, the eyes and blood vessels'
        ],
        notes: {
          time: 2,
          tip: 'The eLearning has a body picture where learners click body parts to see what type of muscle they have. That picture was not copied.'
        }
      },

      /* ---------- Injuries ---------- */
      {
        type: 'statement',
        kicker: 'What injuries can manual tasks cause?',
        text: 'Some of the most common activities that lead to injury at work as an Ambulance Clinician.',
        sub: 'For each one: what not to do, and what to do instead.',
        notes: {
          time: 1,
          say: ['In the eLearning learners choose the correct picture for each activity, then see the Don’t and the Do. Ask the group to guess the safe way first, then reveal.']
        }
      },
      {
        type: 'compare',
        title: 'Prolonged sitting or slouching in a chair',
        left: { head: 'Don’t', points: ['Sit slouched while working at the computer: it stresses your spine and the muscles that support it'] },
        right: { head: 'Do', points: ['Adjust the chair, monitor and keyboard to encourage the best posture', 'Stand and stretch regularly'] },
        notes: { time: 2, ask: ['How long do you sit when doing paperwork after a job?'] }
      },
      {
        type: 'compare',
        title: 'Moving an empty stretcher',
        left: { head: 'Don’t', points: ['Drag the stretcher with one hand: it can lead to shoulder injury'] },
        right: { head: 'Do', points: ['Push the empty stretcher with two hands'] },
        notes: { time: 2, activity: 'Suggested: demonstrate on a real stretcher.' }
      },
      {
        type: 'compare',
        title: 'Checking kits',
        left: { head: 'Don’t', points: ['Put the kit on the ground: it can strain the calves, knees or back'] },
        right: { head: 'Do', points: ['Put it on the passenger seat to check, if you are tall', 'Put it on the floor of the vehicle by the side step, if you are short'] },
        notes: { time: 2 }
      },
      {
        type: 'compare',
        title: 'Exiting the front cabin',
        left: { head: 'Don’t', points: ['Leap out of the front seats: it can lead to knee and ankle injury'] },
        right: { head: 'Do', points: ['Face inwards as you step down from the front seat', 'Keep three points of contact'] },
        notes: { time: 2 }
      },
      {
        type: 'compare',
        title: 'Closing the vehicle doors',
        left: { head: 'Don’t', points: ['Hurriedly close the back or side door with one hand: it can lead to elbow, shoulder or spinal injury'] },
        right: { head: 'Do', points: ['Use two hands and close the door in a controlled way', 'Follow the door as it closes'] },
        notes: { time: 2 }
      },
      {
        type: 'compare',
        title: 'Carrying and handling equipment',
        left: { head: 'Don’t', points: ['Overload your body by carrying too many items at once'] },
        right: { head: 'Do', points: ['Keep a balanced, supported posture to protect your body'] },
        notes: { time: 2, ask: ['What do you carry in one trip from the vehicle that you could split into two?'] }
      },
      {
        type: 'video',
        title: 'Injuries related to non-patient handling',
        video: mp4('0:30', 'Part 21.mp4', 'video_6OqTsrKrEaY_22_48_680x384'),
        notes: { time: 1, videoSummary: null }
      },

      /* ---------- Final check ---------- */
      {
        type: 'bullets',
        title: 'Check: most injuries are the result of cumulative damage',
        points: ['True', 'False'],
        callout: { head: 'True', text: 'Most incidents, and your exposure to cumulative damage, can be prevented by good manual task technique. For example: raise the stretcher to a comfortable work height rather than stooping, and follow rear and side doors as they close to avoid over-reaching.' },
        notes: {
          time: 2,
          say: ['Ask the group to vote, then reveal the answer.']
        }
      },
      {
        type: 'statement',
        kicker: 'Lesson 1 complete',
        text: 'Congratulations on completing Lesson 1.',
        sub: 'Questions and reflections?',
        notes: { time: 2, say: ['Recap: use your leg and core muscles, keep a balanced posture, and remember that most injuries build up over time.'], tip: 'Add a link to the next lesson here when you add it.' }
      }
    ]
  });
})();
