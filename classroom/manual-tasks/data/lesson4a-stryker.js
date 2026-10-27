// Manual Tasks Lesson 4a: Patient Handling Equipment (Stryker stretcher). Slide content condensed to dot points from the eLearning
// lesson (Articulate Storyline SCORM, "approx. 25 min", version 1.1 230725). Part b follows (Lesson 4b).
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// The videos are MP4 files inside the lesson package (link only: no copies are kept). The slides are placeholders; the notes and
// guide link to each file (saaslearn login needed). The procedures are on the SAAS intranet (two-factor sign-in needed).
// The lesson has no knowledge check questions.
(function () {
  var base = 'https://saaslearn.com.au/moodle/pluginfile.php/15320/mod_scorm/content/5/story_content/';
  function V(title, length, file, id, tip) {
    return { type: 'video', title: title, video: { length: length, file: file, url: base + id + '.mp4' }, notes: { time: 2, tip: tip, videoSummary: null } };
  }
  var PRO = 'https://sagov.sharepoint.com/sites/SAAS/policies/Documents/';
  var S = 'Stryker Power-PRO stretcher functions: ';
  var fn = 'Manual Tasks - Microsoft Stream - Stryker ';

  DRIVE_SECTIONS.push({
    id: 'lesson4a-stryker',
    number: '4a',
    title: 'Patient Handling Equipment: Stryker Stretcher',
    audience: 'Ambulance Clinicians',
    elearningMinutes: 25,
    slides: [
      {
        type: 'title',
        title: 'Manual Tasks',
        subtitle: 'Lesson 4a: Patient Handling Equipment, Stryker Stretcher',
        lines: ['SA Ambulance Service'],
        notes: { time: 1, say: ['This lesson covers the Stryker stretcher and Power-LOAD: its functions, heavy patients, special applications, moving a laden stretcher and lateral transfers.'], tip: 'About 25 minutes in the eLearning (version 1.1, 230725). Part b (Lesson 4b) follows. No knowledge check.' }
      },
      {
        type: 'statement',
        kicker: 'Acknowledgement of Country',
        text: 'SA Ambulance Service acknowledges Aboriginal and Torres Strait Islander peoples as the Traditional Custodians of this land and waters.',
        sub: 'We pay our respects to Aboriginal and Torres Strait Islander Elders, past, present and future, and acknowledge the diversity and strength of Aboriginal and Torres Strait Islander peoples and communities today.',
        notes: { time: 1, say: ['Read the acknowledgement as written. (This slide is added here: the 4a extract does not include one.)'] }
      },
      {
        type: 'bullets',
        title: 'What is a Stryker stretcher, and why do we use it?',
        points: [
          'The Stryker stretcher and Power-LOAD system came to SAAS in 2017, replacing the manual Ferno 2650',
          'Injuries from manually raising and lowering the Ferno, and from physically loading it into a vehicle, have fallen significantly with the powered functions and the Power-LOAD system',
          'All stretcher functions, loading and unloading are covered in the practical training',
          'Stryker procedures on SAASnet cover the content of the videos'
        ],
        callout: { text: 'Procedure: Stryker Power-PRO Stretcher and Power-LOAD, Loading and Unloading [PRO-256] (SAAS intranet).' },
        notes: { time: 2, tip: 'PRO-256 (SAAS intranet): ' + PRO + 'PRO-256%20Stryker%20Power-PRO%20Stretcher%20and%20Power-LOAD%20-%20Loading%20and%20Unloading%20-%20INTRANET.pdf' }
      },
      {
        type: 'statement',
        kicker: 'Before the practical session',
        text: 'Watch all twelve stretcher videos.',
        sub: 'The Stryker stretcher and loading mechanism are complex. Watching all the videos before the practical session is essential.',
        notes: { time: 1, say: ['Twelve videos follow, in the order the lesson gives them.'], tip: 'The file names are “Manual Tasks - Microsoft Stream - Stryker NN.mp4”. There is no Stryker 02 in this set of twelve.' }
      },
      V(S + 'introduction', '1:50', fn + '01.mp4', 'video_6Fen59DS1ai_22_48_640x360'),
      V(S + 'retractable head section', '1:15', fn + '03.mp4', 'video_6e842VZCwyN_22_48_640x360'),
      V(S + 'side rails', '0:54', fn + '04.mp4', 'video_6DPbSHW9NkY_22_48_640x360'),
      V(S + 'IV pole', '0:50', fn + '05.mp4', 'video_6oTDoB8vOYl_22_48_640x360'),
      V(S + 'storage and equipment hook', '0:43', fn + '06.mp4', 'video_6NFJqjZr91B_22_48_640x360'),
      V(S + 'battery', '4:11', fn + '07.mp4', 'video_6bMJJvl72md_22_48_640x360'),
      V(S + 'raising and lowering', '2:47', fn + '08.mp4', 'video_5grRPobM8tr_22_48_640x360'),
      V(S + 'manual raising and lowering', '2:16', fn + '09.mp4', 'video_6OlKRczxH8q_22_48_640x360'),
      V(S + 'wheel brake and steer locks', '2:29', fn + '10.mp4', 'video_6A0dl2b79wz_22_48_640x360'),
      V(S + 'backrest operation', '0:48', fn + '11.mp4', 'video_6YmrcB9OaCx_22_48_640x360'),
      V(S + 'legs elevated / shock position', '0:38', fn + '12.mp4', 'video_6P08qMaXJh3_22_48_640x360'),
      V(S + 'knee flex position', '0:57', fn + '13.mp4', 'video_6nndwfDaTIj_22_48_640x360'),
      {
        type: 'bullets',
        title: 'Assisted raising of the stretcher: patients weighing 226 to 318 kg',
        points: [
          'The stretcher’s hydraulics can struggle with patients over 226 kg',
          'Staff may need to help raise it to a height where it can then be raised to load into the ambulance',
          'Always try replacing the battery first'
        ],
        callout: { text: 'Procedure: Loading and unloading patients weighing 226 to 318 kg [PRO-338] (SAAS intranet) describes how to do this safely.' },
        notes: { time: 2, tip: 'PRO-338 (SAAS intranet): ' + PRO + 'PRO-338%20Loading%20and%20unloading%20patients%20weighing%20226-318kg%20-%20INTRANET.pdf. The slide says “click on each of the buttons for more information” but no video or panel text was found.' }
      },
      {
        type: 'bullets',
        title: 'Special applications: Pedi-Mate and safety net',
        points: [
          'The Pedi-Mate harness secures small children on the stretcher. It is covered in practical training and the instructions are in PRO-255',
          'The safety net restrains non-cooperative patients during transport, to stop them putting themselves and workers at risk by trying to remove the stretcher belts and move about'
        ],
        callout: { text: 'Procedure: Stryker Power-PRO Stretcher and Power-LOAD Procedure [PRO-255] (SAAS intranet).' },
        notes: { time: 2, tip: 'PRO-255 (SAAS intranet): ' + PRO + 'PRO-255%20Stryker%20Power-Pro%20Stretcher%20and%20Power-Load%20-%20INTRANET.pdf. The slide text says “safety net”; the video is titled “safety blanket”. Both are as the lesson has them.' }
      },
      V('Applying a safety blanket to a patient on a stretcher', '1:05', 'Applying a safety blanket to a patient on a stretcher.mp4', 'video_5j3C2UbPmhQ_22_48_640x360'),
      V('Ambulant patient to stretcher', '0:45', 'Walking to Stretcher (20230620).mp4', 'video_5pZfl49Djqq_22_48_680x382'),
      {
        type: 'bullets',
        title: 'Manoeuvring a laden stretcher',
        points: [
          'Moving a laden stretcher can be hazardous if the patient is very heavy and the ground is soft, sloped or uneven',
          'A second person needs to steer the stretcher. Safe techniques are covered in the practical course and the videos',
          'Good communication between partners is essential, especially in narrow hallways in hospitals and aged care facilities',
          'Lifting or lowering a stretcher up or down curbs is another hazardous task. If you can’t avoid a curb, there is a recommended technique for both people to share the load'
        ],
        callout: { text: 'Procedure: Stryker Power-PRO Stretcher, Manoeuvring [PRO-257] (SAAS intranet).' },
        notes: { time: 3, ask: ['Where are the tightest hallways or worst surfaces on your usual jobs?'], tip: 'PRO-257 (SAAS intranet): ' + PRO + 'PRO-257%20Stryker%20Power-PRO%20Stretcher%20-%20Manoeuvring%20-%20INTRANET.pdf' }
      },
      V('Manoeuvring a laden stretcher', '1:16', 'Manoeuvring a laden stretcher.mp4', 'video_6E18IXfvBMs_22_48_640x360'),
      {
        type: 'bullets',
        title: 'Stretcher to bed transfers (non-ambulant patients)',
        points: [
          'The lateral transfer is one of the most used transfers for Ambulance Officers',
          'It is the safest way to move a patient who can’t stand from the ambulance stretcher to a hospital bed or stretcher',
          'It uses anti-friction devices to lessen push and pull forces and friction on the patient’s skin',
          'It normally takes four workers (two Ambulance Officers and two nursing staff) and must be well coordinated to avoid injury to staff and patient',
          'It is a competency requirement of practical training and assessment'
        ],
        callout: { text: 'Procedure: Stryker Power-PRO Stretcher, Lateral Transfer of Patient [PRO-259] (SAAS intranet).' },
        notes: { time: 3, tip: 'PRO-259 (SAAS intranet): ' + PRO + 'PRO-259%20Stryker%20Power-PRO%20Stretcher%20-%20Lateral%20Transfer%20of%20Patient%20-%20INTRANET.pdf' }
      },
      V('Lateral transfer: supine patient', '0:28', 'Manual Tasks - Stryker 02.mp4', 'video_6UGARwD3Aks_22_48_640x360'),
      V('Lateral transfer: semi-recumbent or sitting patient', '0:35', 'Manual Tasks - Stryker 03.mp4', 'video_66x3EPMcvvD_22_48_640x360'),
      {
        type: 'statement',
        kicker: 'Lesson 4a complete',
        text: 'Congratulations on completing Lesson 4a.',
        sub: 'Move on to part b of this lesson.',
        notes: { time: 2, say: ['Recap: know the stretcher’s functions, use a second person to steer, and coordinate lateral transfers. Part b covers the compact carry chair, spinal board and blue slide sheet.'] }
      }
    ]
  });
})();
