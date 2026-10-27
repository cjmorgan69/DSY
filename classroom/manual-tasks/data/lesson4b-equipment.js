// Manual Tasks Lesson 4b: Patient Handling Equipment (compact carry chair, spinal board, blue slide sheet).
// Slide content condensed to dot points from the eLearning lesson (Articulate Storyline SCORM, version 1.2 230726).
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// The videos are MP4 files inside the lesson package (link only: no copies are kept). The slides are placeholders; the notes and
// guide link to each file (saaslearn login needed). The procedures are on the SAAS intranet (two-factor sign-in needed).
// The lesson has no knowledge check questions. Lesson 4a was not supplied.
(function () {
  var base = 'https://saaslearn.com.au/moodle/pluginfile.php/15321/mod_scorm/content/5/story_content/';
  function V(title, length, file, id, tip) {
    return { type: 'video', title: title, video: { length: length, file: file, url: base + id + '.mp4' }, notes: { time: 2, tip: tip, videoSummary: null } };
  }
  var PRO = 'https://sagov.sharepoint.com/sites/SAAS/policies/Documents/';
  var matched = 'The video is matched to its title by the lesson’s layer order and titles. Confirm it.';

  DRIVE_SECTIONS.push({
    id: 'lesson4b-equipment',
    number: '4b',
    title: 'Patient Handling Equipment',
    audience: 'Ambulance Clinicians',
    elearningMinutes: 50,
    slides: [
      {
        type: 'title',
        title: 'Manual Tasks',
        subtitle: 'Lesson 4b: Patient Handling Equipment',
        lines: ['Compact carry chair · Spinal board · Blue slide sheet', 'SA Ambulance Service'],
        notes: {
          time: 1,
          say: ['This lesson has three parts: the compact carry chair (about 30 minutes in the eLearning), the spinal board (about 10) and the blue slide sheet (about 10).'],
          tip: 'Version 1.2, 230726. The lesson has no knowledge check. Lesson 4a was not supplied.'
        }
      },
      {
        type: 'statement',
        kicker: 'Acknowledgement of Country',
        text: 'SA Ambulance Service acknowledges Aboriginal and Torres Strait Islander peoples as the Traditional Custodians of this land and waters.',
        sub: 'We pay our respects to Aboriginal and Torres Strait Islander Elders, past, present and future, and acknowledge the diversity and strength of Aboriginal and Torres Strait Islander peoples and communities today.',
        notes: { time: 1, say: ['Read the acknowledgement as written. (This slide is added here: the 4b extract does not include one.)'] }
      },

      /* ---------- Part 1: Compact carry chair ---------- */
      {
        type: 'statement',
        kicker: 'Part 1',
        text: 'Compact carry chair',
        sub: 'Also called the “green chair”.',
        notes: { time: 1 }
      },
      {
        type: 'bullets',
        title: 'Compact carry chair',
        points: [
          'A standard item of SAAS equipment, used to move patients who cannot, or should not, walk to the Stryker stretcher because of their medical condition',
          'It is narrow, so it can reach areas the Stryker stretcher can’t get close to',
          { t: 'Do not use it for:', sub: ['Patients with suspected spinal fractures', 'Poor sitting balance', 'Reduced consciousness', 'Patients over 115 kg'] }
        ],
        callout: { text: 'Procedure: Patient Transfers Using the Compact Carry Chair [PRO-294] (SAAS intranet).' },
        notes: {
          time: 3,
          tip: 'PRO-294 (SAAS intranet): ' + PRO + 'PRO-294%20Patient%20Transfers%20Using%20the%20Compact%20Carry%20Chair%20-%20INTRANET.pdf'
        }
      },
      V('Compact carry chair: introduction', '0:53', 'Part 17.mp4', 'video_680Nl5pBih7_22_48_640x360'),
      {
        type: 'bullets',
        title: 'Unload, unfold, fold and load the compact carry chair',
        points: [
          'The chair is secured in a mount next to the rear door in the ambulance',
          'When lifting it in or out, avoid twisting at the spine and use a strong lifting posture',
          'The four videos follow the order the tasks are done: unload, unfold, fold up, load'
        ],
        notes: { time: 2, activity: 'Suggested: each person unloads, unfolds, folds and loads the chair in a real vehicle while a partner watches posture.' }
      },
      V('Unload the compact carry chair', '1:51', 'Ambulance CCC Split 1 - Unloading CCC.mp4', 'video_6HPV5WyLx5M_22_48_640x360'),
      V('Unfold the compact carry chair', '0:27', 'Ambulance CCC Split 2 - Unfold CCC.mp4', 'video_5jZghQB0Bnk_22_48_640x360'),
      V('Fold up the compact carry chair', '1:04', 'Ambulance CCC Split 3 - Fold Up CCC.mp4', 'video_6fWOrkM1ZMH_22_48_640x360'),
      V('Load the compact carry chair', '1:59', 'Ambulance CCC Split 4 - Loading CCC.mp4', 'video_69jb8Bvn29P_22_48_640x360'),
      V('Assisting a standing patient onto the compact carry chair', '0:48', 'Walking and getting onto CCC - Final - SD (20230615).mp4', 'video_63rsizU2SWJ_22_48_678x382'),
      {
        type: 'cards',
        title: 'Transfer a patient from a chair to the compact carry chair',
        cols: 3,
        variant: 'number',
        items: [
          { h: 'Assisting an independent patient from an armchair' },
          { h: 'Sliding a dependent patient from a chair without sides' },
          { h: 'Sliding a dependent patient from an armchair' }
        ],
        notes: { time: 2, say: ['Three videos follow, one for each of these.'] }
      },
      V('Independent patient: armchair to compact carry chair', '1:08', 'Arm Chair to Compact Carry Chair - Final - SD (20230615).mp4', 'video_5VPs0cDw1bn_22_48_640x360'),
      V('Sliding a dependent patient from a chair without sides', '7:30', '(non arm) chair to compact carry chair - final - SD (20230619).mp4', 'video_6GtsxTFPTsu_22_48_650x360'),
      V('Sliding a dependent patient from an armchair', '2:38', 'Manual Tasks - Compact Carry Chair 04.mp4', 'video_6MQDV7SQHwo_22_48_640x360'),
      V('Independent patient: compact carry chair to stretcher', '3:04', 'CCC to Stretcher and Repositioning - Final - SD (20230615).mp4', 'video_5wGaqz28otH_22_48_640x360'),
      V('Sliding a dependent patient: compact carry chair to stretcher', '3:13', 'Manual Tasks - Compact Carry Chair 06 (2023).mp4', 'video_6UJe9KDndhE_22_48_640x360'),
      V('Manoeuvring the compact chair up or down a step', '2:20', 'Manual Tasks - Compact Carry Chair 07.mp4', 'video_6rUFHJtt2Em_22_48_678x382', 'The lesson has two videos on this slide. This one is the main video and the next is the “sally tube” one: the pairing is by layer order, so confirm it.'),
      V('Using a sally tube to assist the compact carry chair up a step', '0:46', 'CCC up a single step - final COMPLETE (20230615).mp4', 'video_5wW2nOJHoDS_22_48_640x360'),
      V('Down multiple stairs with a laden compact carry chair', '1:01', 'Manual Tasks - Compact Carry Chair 08.mp4', 'video_5qaNaVLu8B7_22_48_678x382'),

      /* ---------- Part 2: Spinal board ---------- */
      {
        type: 'statement',
        kicker: 'Part 2',
        text: 'Spinal board',
        notes: { time: 1 }
      },
      {
        type: 'bullets',
        title: 'Spinal board: general guidelines',
        points: [
          'Mainly used to drag, or lift and carry, an injured patient when spinal precautions are needed',
          'It can be a sliding bridge between floor and stretcher, or a flat surface to help move a patient out of a wrecked vehicle',
          'Dragging the board using belts to pull and steer it is less risky than lifting a patient on a spinal board',
          'The number of workers for a lift depends on the patient’s weight and the distance: e.g. under 100 kg, four workers; over 150 kg, six workers lifting is safer',
          'SAAS’s spinal board has a safe work load of 220 kg, but where possible move very heavy patients with lower-risk techniques and other equipment'
        ],
        callout: { text: 'The Bariatric Team and Special Operations Team have specialist equipment and training for very heavy patients or complex retrievals that are not time dependent, and can give advice by phone.' },
        notes: { time: 3, say: ['Procedure: Spinal Board Patient Transfer [PRO-293] (SAAS intranet).'], tip: 'PRO-293 (SAAS intranet): ' + PRO + 'PRO-293%20Spinal%20Board%20Patient%20Transfers%20-%20INTRANET.pdf' }
      },
      {
        type: 'bullets',
        title: 'Lifting on a spinal board: team lifts',
        points: [
          'SAAS staff often lift patients on spinal boards with non-ambulance workers',
          'Nominate a leader to coordinate the lift, so everyone lifts at the same time and is clear about moving together',
          'Team lifting, especially off the ground, is a high-risk task',
          'Use the weightlifter’s posture to best protect yourself when lifting'
        ],
        notes: { time: 2, ask: ['Who calls the lift when bystanders or other services help?'] }
      },
      V('Spinal board: general guidelines', '0:57', 'Part 18 new (2023).mp4', 'video_5Y1dtyGnE5u_22_48_640x360'),
      V('Log roll onto a spinal board', '1:43', 'Manual Tasks - Spinal Board 01.mp4', 'video_6EIPTRHt8il_22_48_678x382'),
      V('Securing the patient to the spinal board', '2:30', 'Manual Tasks - Spinal Board 02.mp4', 'video_6rcTlxOoC6u_22_48_678x382'),
      {
        type: 'bullets',
        title: 'Lifting a patient on a spinal board and transfer to a stretcher',
        points: [
          'When planning the move, decide whether you will bring the stretcher to the patient on the board, or take the patient on the board to the stretcher',
          'Three videos follow: stretcher to crew, crew to stretcher, remove the spinal board'
        ],
        notes: { time: 1 }
      },
      V('Spinal board: stretcher to crew', '0:31', 'Manual Tasks - Spinal Board 03.mp4', 'video_5XObO9fYYlB_22_48_640x360'),
      V('Spinal board: crew to stretcher', '0:26', 'Manual Tasks - Spinal Board 04.mp4', 'video_6CdB071s8qQ_22_48_640x360'),
      V('Spinal board: remove the spinal board', '0:16', 'Manual Tasks - Spinal Board 05.mp4', 'video_5WP0eBlXovM_22_48_640x360'),

      /* ---------- Part 3: Blue slide sheet ---------- */
      {
        type: 'statement',
        kicker: 'Part 3',
        text: 'Blue slide sheet',
        notes: { time: 1 }
      },
      {
        type: 'bullets',
        title: 'What is a blue slide sheet?',
        points: [
          'Used to move patients lying on their back by sliding, not lifting',
          'It is slippery, so less force is needed than moving the patient without it',
          'Useful in congested areas where other equipment can’t be used safely, including out of lounge chairs'
        ],
        callout: { text: 'Procedure: Transferring Patients Using a Blue Slide Sheet [PRO-291] (SAAS intranet).' },
        notes: { time: 2, tip: 'PRO-291 (SAAS intranet): ' + PRO + 'PRO-291%20Transferring%20Patients%20Using%20a%20Blue%20Slide%20Sheet%20-%20INTRANET.pdf' }
      },
      V('Blue slide sheet: placing the patient onto the sheet', '2:01', 'SAAS Blue Slide Sheet - Intro and Placing Patient onto Sheet (20230620).mp4', 'video_6mFc8PWTXs3_22_48_640x360'),
      V('Blue slide sheet: strap placement to secure the patient', '2:11', 'SAAS Blue Slide Sheet - Strap Placement to Secure Patient (20230620).mp4', 'video_6nmX6kgsf53_22_48_640x360'),
      V('Blue slide sheet: transferring the patient a short distance', '0:26', 'Manual Tasks - Blue Slide Sheet 01.mp4', 'video_5vOROCD7jQM_22_48_640x360'),
      {
        type: 'compare',
        title: 'Sliding the patient on the blue slide sheet',
        left: {
          head: 'Head end first (normal)',
          points: [
            'A patient is normally slid headfirst',
            'Metal buckled strap on each head-end corner, as long as possible; clear the path to the stretcher',
            'Two clinicians move the patient by lunging backwards, elbows locked into their sides',
            'Around corners, a third person can steer from the foot end with an elongated plastic buckle belt on the foot-end loops',
            'In restricted spaces, walk forward to shorten the leading straps: this shortens the load and helps with turns and tight spaces'
          ]
        },
        right: {
          head: 'Raised feet end first',
          points: [
            'Preferred if the patient has low blood pressure: the legs can be raised during the transfer',
            'Metal buckle straps on the foot-end loops; steering belt on the head-end loops',
            'Keep the foot-end belts as long as possible. If the patient becomes hypotensive, both clinicians at the foot end walk towards the patient and shorten the straps, raising the legs'
          ]
        },
        callout: { text: 'Low blood pressure (hypotensive): sliding feet first is recommended.' },
        notes: {
          time: 4,
          ask: ['Why would you slide a hypotensive patient feet first?'],
          tip: 'The lesson’s video titles say “sitting up” for the head-end panel and “legs raised” for the foot-end panel. Confirm the pairing.'
        }
      },
      V('Blue slide sheet: manoeuvring a sitting patient up', '0:57', 'SAAS Blue Slide Sheet - Manoeuvring Sitting Patient Up (20230620).mp4', 'video_5Y5K47rZW9C_22_48_640x360', matched),
      V('Blue slide sheet: manoeuvring a patient with legs raised', '0:50', 'SAAS Blue Slide Sheet - Manoeuvring Patient Legs Raised (20230620).mp4', 'video_6kvMRuM7hFB_22_48_640x360', matched),
      {
        type: 'bullets',
        title: 'Manoeuvring a patient in a restricted space',
        points: [
          'Where the patient can’t be moved lying flat, secure a weight bearing belt (steel buckle) to each head-end corner of the sheet',
          'Attach a securing belt through both loops at the foot end',
          'To go through a confined area, shorten the straps as you walk towards the patient, bringing them into a sitting position',
          'Use the backwards lunge to get through the confined area',
          'Lay the patient down carefully as the belts are lengthened, and keep sliding them lying on their back'
        ],
        notes: { time: 3 }
      },
      V('Blue slide sheet: manoeuvring a patient around a tight corner', '1:01', 'SAAS Blue Slide Sheet - Manoeuvring Patient Around Tight Corner (20230620).mp4', 'video_6FQJmS70DRc_22_48_676x380'),
      {
        type: 'bullets',
        title: 'Stretcher bridge transfer',
        points: [
          'Lifting patients from the floor onto a stretcher is a high-risk task for workers and can cause further injury to the patient',
          'A safer technique: use a spinal board as a “bridge” to slide patients secured in a blue sheet up onto the stretcher, from the foot end or the head end'
        ],
        callout: { head: 'Caution', text: 'Do not unclasp the buckle from the weight bearing belt: it increases the risk of the buckle being lost or damaged.' },
        notes: {
          time: 2,
          say: ['Procedure: Stryker Power-PRO Stretcher, Transfer from Floor Using Spinal Board Bridge [PRO-287] (SAAS intranet).'],
          tip: 'PRO-287 (SAAS intranet): ' + PRO + 'PRO-287%20Stryker%20Power-PRO%20Stretcher%20-%20Transfer%20from%20Floor%20Using%20Spinal%20Board%20Bridge%20-%20INTRANET.pdf'
        }
      },
      V('Stretcher bridge: foot end of the stretcher', '1:13', 'Spinal board bridge transfer.mp4', 'video_5mTtoorK82J_22_48_640x360'),
      V('Stretcher bridge: head end of the stretcher', '1:18', 'Manual Tasks - Bridge 01.mp4', 'video_5csQZrUmnhJ_22_48_640x360'),
      V('Stretcher bridge: release the bridge from the stretcher', '0:16', 'Manual Tasks - Bridge 02.mp4', 'video_6VwzLXu2pFE_22_48_604x340'),
      {
        type: 'bullets',
        title: 'Transferring an unconscious patient to the floor',
        points: [
          'A high-risk task, because it can be time critical for airway and clinical management. The “chair” could be a recliner, toilet or couch',
          'Quickly remove obstacles to make space on the floor to lower and attend to the patient',
          'Use a strong posture. If the patient is wedged in the seat, roll them slightly to move them in stages',
          'Control their head as they are moved to the floor',
          'In a restricted space, consider lowering the patient onto a blue slide sheet to pull them a short distance into an open space'
        ],
        notes: {
          time: 3,
          say: ['Procedure: Moving an Unconscious Patient to the Floor [PRO-290] (SAAS intranet). Four videos follow.'],
          tip: 'PRO-290 (SAAS intranet): ' + PRO + 'PRO-290%20Moving%20an%20Unconscious%20Patient%20to%20the%20Floor%20-%20INTRANET.pdf'
        }
      },
      V('Unconscious patient: seat in open space to floor, solo responder', '0:46', 'Manual Tasks - Unconscious Patient 02.mp4', 'video_5iDMo4BOUZj_22_48_604x340'),
      V('Unconscious patient: seat in open space to floor, two responders', '0:31', 'Manual Tasks - Unconscious Patient 03.mp4', 'video_64DeOqZZmN5_22_48_604x340'),
      V('Unconscious patient: seat in confined space to floor', '0:42', 'Manual Tasks - Unconscious Patient 04.mp4', 'video_6rHNx8aWnZi_22_48_640x360'),
      V('Unconscious patient: bed to floor', '1:36', 'Manual Tasks - Unconscious Patient 01.mp4', 'video_6VCS6TpcNTC_22_48_640x360'),
      {
        type: 'statement',
        kicker: 'Lesson 4b complete',
        text: 'Congratulations on completing part b of Lesson 4.',
        sub: 'Questions and reflections?',
        notes: { time: 2, say: ['Recap: choose the equipment that suits the patient and the place, slide rather than lift where you can, and use a nominated leader for team lifts.'], tip: 'Add a link to the next lesson here when you add it.' }
      }
    ]
  });
})();
