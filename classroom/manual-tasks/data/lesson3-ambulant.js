// Manual Tasks Lesson 3: Assisting Ambulant Patients. Slide content condensed to dot points from the eLearning lesson
// (Articulate Storyline SCORM, "allow a minimum of 20 minutes", version 1.1 230725).
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// The videos are MP4 files inside the lesson package (link only: no copies are kept). The slides are placeholders; the notes and
// guide link to each file (saaslearn login needed). The procedures linked in the notes are on the SAAS intranet.
// The six knowledge check questions keep their right answers in the lesson's logic. The answers in the notes are INFERRED from the
// question wording and the usual mobility checks: check them against the lesson before using.
(function () {
  function mp4(length, file, name) { return { length: length, file: file, url: 'https://saaslearn.com.au/moodle/pluginfile.php/15318/mod_scorm/content/4/story_content/' + name + '.mp4' }; }
  var cppro = 'CPPRO-001 Patient Mobility Assessment (SAAS intranet, version 1.1, dated 29 Dec 2016 in the file name): https://sagov.sharepoint.com/sites/SAAS/policies/clinical/ClinicalDocuments/CPPRO-001%20Patient%20Mobility%20Assessment%20V1.1%2020161229.pdf';
  var pro323 = 'PRO-323 Using a Lifting Device to Get a Patient Up Off the Floor (SAAS intranet): https://sagov.sharepoint.com/sites/SAAS/policies/Documents/PRO-323%20Using%20a%20Lifting%20device%20to%20get%20a%20patient%20up%20off%20the%20floor%20-%20CAMEL%20SWL%20320kg%20%20RAIZER%20LIFT%20150kg%20-%20INTRANET.pdf';
  var inferred = 'The answer is inferred from the question wording and the usual mobility checks. The lesson holds the right answers in its logic, so check them against the lesson before relying on them.';

  DRIVE_SECTIONS.push({
    id: 'lesson3-ambulant',
    number: 3,
    title: 'Assisting Ambulant Patients',
    audience: 'Ambulance Clinicians',
    elearningMinutes: 20,
    slides: [
      {
        type: 'title',
        title: 'Manual Tasks',
        subtitle: 'Lesson 3: Assisting Ambulant Patients',
        lines: ['SA Ambulance Service'],
        notes: {
          time: 1,
          say: ['This lesson covers working out how much a patient can help, standing a patient, helping a patient down a step, and getting a patient up off the floor.'],
          tip: 'The eLearning takes at least 20 minutes (version 1.1, 230725).'
        }
      },
      {
        type: 'statement',
        kicker: 'Acknowledgement of Country',
        text: 'SA Ambulance Service acknowledges Aboriginal and Torres Strait Islander peoples as the Traditional Custodians of this land and waters.',
        sub: 'We pay our respects to Aboriginal and Torres Strait Islander Elders, past, present and future, and acknowledge the diversity and strength of Aboriginal and Torres Strait Islander peoples and communities today.',
        notes: { time: 1, say: ['Read the acknowledgement as written.'] }
      },

      /* ---------- Mobility risk assessment ---------- */
      {
        type: 'bullets',
        title: 'Mobility risk assessment',
        points: [
          'SAAS has seen several injuries to staff and patients when patients unexpectedly collapse during transfers or walking',
          'This is a general guide to aid your decision making. Clinical factors may mean changing the technique',
          'Goal: find out how much the patient can help you before you try to move them. That tells you the best technique, how many staff and what equipment you need',
          'Don’t try to stand a patient who can’t weight-bear reliably, or sit someone up in bed with poor trunk control',
          'More dependent patients are likely to need slide sheets, Hover Matts, compact chairs and so on, because they can’t help much'
        ],
        callout: { head: 'Precautions', text: 'Before the assessment, check the patient’s recent medical history and medication: it can warn you they may become dizzy sitting up or standing, and collapse.' },
        notes: {
          time: 4,
          say: ['Procedure: Patient Mobility Assessment [CPPRO-001] (SAAS intranet).'],
          ask: ['What would make you hesitate to stand a patient even if they say they feel fine?'],
          tip: cppro
        }
      },
      {
        type: 'video',
        title: 'Mobility risk assessment: patient in bed or on the floor',
        video: mp4('1:00', 'Manual Tasks - Mobility Risk Assessment 01.mp4', 'video_6PiXhk7h69w_22_48_676x380'),
        notes: { time: 2, tip: 'The two mobility risk assessment videos are matched to their titles by the lesson’s layer order. Confirm it.', videoSummary: null }
      },
      {
        type: 'video',
        title: 'Mobility risk assessment: patient in chair',
        video: mp4('2:40', 'Mobility Risk Assessment.mp4', 'video_6ErrunzyRLK_22_48_676x380'),
        notes: { time: 3, videoSummary: null }
      },

      /* ---------- Knowledge checks ---------- */
      {
        type: 'bullets',
        title: 'In bed: which assessment checks what?',
        points: [
          'The patient is lying in bed and you decide to do a mobility risk assessment before you move them',
          'Which would you ask the patient to demonstrate to check:',
          { t: 'Leg strength and coordination?', sub: [] },
          { t: 'Trunk control and hip extensor strength?', sub: [] },
          { t: 'Head control, and whether the head needs support during a transfer?', sub: [] }
        ],
        callout: { head: 'Choose from', text: 'Head lift   |   Bridging   |   Straight leg raise' },
        notes: {
          time: 4,
          say: ['The eLearning asks these as three separate questions. Ask the group to match each check to its assessment.'],
          activity: 'Suggested: have people try each of the three on a partner on a bed, to feel what each one tests.',
          tip: 'Likely answers (inferred): leg strength and coordination = straight leg raise; trunk control and hip extensor strength = bridging; head control = head lift. ' + inferred
        }
      },
      {
        type: 'bullets',
        title: 'In a chair: which assessment checks what?',
        points: [
          'The patient is sitting on a chair and you decide to do a mobility risk assessment before you move them',
          'Which would you ask the patient to demonstrate to check:',
          { t: 'Quadriceps strength and leg coordination?', sub: [] },
          { t: 'Strength, coordination and balance?', sub: [] },
          { t: 'Trunk control and balance?', sub: [] }
        ],
        callout: { head: 'Choose from', text: 'Reaching outside the base of support   |   Marching on the spot   |   Leg extension' },
        notes: {
          time: 4,
          activity: 'Suggested: have people try each of the three on a partner in a chair.',
          tip: 'Likely answers (inferred): quadriceps strength and leg coordination = leg extension; strength, coordination and balance = marching on the spot; trunk control and balance = reaching outside the base of support. ' + inferred
        }
      },

      /* ---------- Standing, step, floor ---------- */
      {
        type: 'video',
        title: 'Standing a patient',
        video: mp4('2:28', 'Manual Tasks - Standing a Patient.mp4', 'video_6d5nbgXwnMl_22_48_676x380'),
        notes: { time: 3, tip: cppro, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Assisting a patient down a step',
        video: mp4('0:28', 'Assist Down a Step (20230725).mp4', 'video_5VuiJLAyiLS_22_48_678x382'),
        notes: { time: 1, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Assisting a patient off the ground: two chair technique',
        video: mp4('3:13', 'Manual Tasks - Fallen Patient Assist.mp4', 'video_5p1W7ltjtCN_22_48_676x380'),
        notes: {
          time: 4,
          say: ['Two related procedures: Stryker Power-PRO Stretcher, Transfer from Floor Using Spinal Board Bridge [PRO-287], and Using a Lifting Device to Get a Patient Up Off the Floor [PRO-323] (both SAAS intranet).'],
          tip: 'PRO-287 (SAAS intranet): https://sagov.sharepoint.com/sites/SAAS/policies/Documents/PRO-287%20Stryker%20Power-PRO%20Stretcher%20-%20Transfer%20from%20Floor%20Using%20Spinal%20Board%20Bridge%20-%20INTRANET.pdf. ' + pro323,
          videoSummary: null
        }
      },
      {
        type: 'video',
        title: 'Using the Raizer lift to get a patient off the floor',
        video: mp4('1:06', 'Manual Tasks - Raizer.mp4', 'video_6RPgjdghhAq_22_48_676x380'),
        notes: { time: 2, tip: pro323, videoSummary: null }
      },
      {
        type: 'compare',
        title: 'Lifting devices for a patient on the floor',
        left: {
          head: 'Raizer',
          points: [
            'Designed to sit up and lift a person from the floor, independently or assisted',
            'Used to help patients from the ground when it is not safe to use other techniques',
            'Safe working load 150 kg'
          ]
        },
        right: {
          head: 'Camel',
          points: [
            'Designed to sit up and lift a person from the floor, independently or assisted',
            'Used to help patients from the ground when it is not safe to use other techniques',
            'Safe working load 320 kg, so useful for bariatric patients'
          ]
        },
        callout: { text: 'Procedure: Using a Lifting Device to Get a Patient Up Off the Floor [PRO-323] (SAAS intranet).' },
        notes: {
          time: 3,
          ask: ['What would make you choose the Camel over the Raizer?'],
          tip: pro323
        }
      },
      {
        type: 'video',
        title: 'Using the Camel to get a patient off the floor (SWL 320 kg)',
        video: mp4('2:37', 'Using Camel to get patient off the floor (SWL 320kg).mp4', 'video_6Tt63HvcSIz_22_48_676x380'),
        notes: { time: 3, tip: pro323, videoSummary: null }
      },

      /* ---------- Posture considerations ---------- */
      {
        type: 'video',
        title: 'Posture considerations: sustained, constrained and repetitive',
        video: mp4('1:07', 'Manual Tasks - Host Audio 03.mp4', 'video_6jRxENkjXY0_22_48_676x380'),
        notes: { time: 2, videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Stretching after long transfers',
        points: [
          'Before, during or after a shift, stretches will help',
          'Stretch and move often, and walk when you can',
          'Stretches should be pain free',
          'Hold each stretch for 10 to 15 seconds and repeat 2 to 3 times'
        ],
        notes: {
          time: 4,
          say: ['The eLearning shows the recommended stretches as pictures, which are not in the extract.'],
          activity: 'Suggested: lead the group through some stretches yourself, using the pictures in the lesson, and keep them pain free.'
        }
      },
      {
        type: 'statement',
        kicker: 'Lesson 3 complete',
        text: 'Congratulations on completing Lesson 3.',
        sub: 'Questions and reflections?',
        notes: {
          time: 2,
          say: ['Recap: assess how much the patient can help before you move them, and use the right equipment when they can’t help much.'],
          tip: 'Add a link to the next lesson here when you add it.'
        }
      }
    ]
  });
})();
