// Manual Tasks Lesson 6: Identifying, Reporting and Managing Hazardous Manual Tasks. Slide content condensed to dot points from the
// eLearning lesson (Articulate Storyline SCORM, "allow a minimum of 20 minutes", version 0.5 240217).
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// The videos are MP4 files inside the lesson package (link only: no copies are kept). The slides are placeholders; the notes and
// guide link to each file (saaslearn login needed). The procedures are on the SAAS intranet.
(function () {
  var base = 'https://saaslearn.com.au/moodle/pluginfile.php/15708/mod_scorm/content/6/story_content/';
  function V(title, length, file, id, tip) {
    return { type: 'video', title: title, video: { length: length, file: file, url: base + id + '.mp4' }, notes: { time: 2, tip: tip, videoSummary: null } };
  }
  var PRO = 'https://sagov.sharepoint.com/sites/SAAS/policies/Documents/';

  DRIVE_SECTIONS.push({
    id: 'lesson6-hazardous',
    number: 6,
    title: 'Identifying, Reporting and Managing Hazardous Manual Tasks',
    audience: 'Ambulance Clinicians',
    elearningMinutes: 20,
    slides: [
      {
        type: 'title',
        title: 'Manual Tasks',
        subtitle: 'Lesson 6: Identifying, Reporting and Managing Hazardous Manual Tasks',
        lines: ['SA Ambulance Service'],
        notes: { time: 1, say: ['This lesson covers how to spot hazardous manual tasks, how to report them, and how to control the risk using the hierarchy of control and a dynamic risk assessment.'], tip: 'The eLearning takes at least 20 minutes (version 0.5, 240217).' }
      },
      {
        type: 'statement',
        kicker: 'Acknowledgement of Country',
        text: 'SA Ambulance Service acknowledges Aboriginal and Torres Strait Islander peoples as the Traditional Custodians of this land and waters.',
        sub: 'We pay our respects to Aboriginal and Torres Strait Islander Elders, past, present and future, and acknowledge the diversity and strength of Aboriginal and Torres Strait Islander peoples and communities today.',
        notes: { time: 1, say: ['Read the acknowledgement as written.'] }
      },
      V('Identifying hazardous manual tasks', '0:59', 'Manual Tasks - Host Video 07.mp4', 'video_6Zcn2lumv4G_22_48_678x382'),

      /* ---------- Injury claims ---------- */
      {
        type: 'statement',
        kicker: 'SAAS injury claims 2019/2020',
        text: 'How many SAAS injury claims do you think were reported in 2019/2020?',
        sub: 'Ask the group to guess a number between 0 and 200.',
        notes: { time: 2, say: ['In the eLearning learners drag a dial from 0 to 200, then check their answer. Take guesses, then show the next slide.'] }
      },
      {
        type: 'cards',
        title: '129 injury claims in 2019/2020: where were the injuries?',
        cols: 3,
        variant: 'plain',
        items: [
          { h: 'Upper and lower back', t: '45%' },
          { h: 'Shoulders', t: '18%' },
          { h: 'Wrist, hands and forearms', t: '9%' },
          { h: 'Neck', t: '7%' },
          { h: 'Multiple locations', t: '7%' },
          { h: 'Knees', t: '6%' }
        ],
        notes: {
          time: 3,
          say: ['The correct answer was 129 claims.'],
          ask: ['What do you notice about where most injuries happen?'],
          tip: 'The six percentages add up to 92%. The lesson does not show the other 8%. These are 2019/2020 figures from the lesson.'
        }
      },
      V('Manual task related injuries', '1:36', 'Manual Tasks - Host Video 11.mp4', 'video_6ErEoLmYLOB_22_48_678x382'),

      /* ---------- Reporting ---------- */
      V('Reporting incidents regarding hazardous manual tasks', '0:29', 'Manual Tasks - Host Video 08.mp4', 'video_6NfkbAFtuKf_22_48_680x384', 'The video refers to IRQA, but the lesson says all incidents regarding hazardous manual tasks must be reported through the WHISR app.'),
      {
        type: 'statement',
        kicker: 'Reporting',
        text: 'Report all hazardous manual task incidents through the WHISR app.',
        sub: 'The video refers to the IRQA form, but the lesson says these must go through the WHISR app.',
        notes: {
          time: 2,
          tip: 'The slide calls it “WHISR”; the web address ends “WHSIRAPP”. Both are as the lesson gives them. The app is at https://www.saambulance.sa.gov.au/WHSIRAPP. Check the name and address.'
        }
      },
      {
        type: 'cards',
        title: 'Procedures: reporting hazardous manual tasks',
        cols: 4,
        variant: 'plain',
        items: [
          { h: 'PRO-157', t: 'Hazard Reporting' },
          { h: 'PRO-158', t: 'Incident Report and Quick Assessment' },
          { h: 'PRO-193', t: 'Injury Management: Volunteer Staff' },
          { h: 'PRO-194', t: 'Injury Management: Career Staff' }
        ],
        notes: {
          time: 2,
          say: ['These four procedures are on the SAAS intranet and open only on the SAAS network or when signed in.'],
          tip: 'PRO-157: ' + PRO + 'PRO-157%20Hazard%20Reporting%20-%20INTRANET.pdf  PRO-158: ' + PRO + 'PRO-158%20Incident%20Reporting%20and%20Quick%20Assessment%20-%20INTRANET.pdf  PRO-193 (V 2.0, 11 Mar 2016 in the file name): ' + PRO + 'PRO-193%20Injury%20Management-Volunteer%20Staff%20V%202.0%2011032016.pdf  PRO-194: ' + PRO + 'PRO-194%20Injury%20Management-Career%20Staff%20-%20INTRANET.pdf'
        }
      },

      /* ---------- Scenario and hierarchy of control ---------- */
      {
        type: 'bullets',
        title: 'Scenario: manual tasks risk assessment',
        points: [
          'Mrs Jones is 96 and lives in an independent living unit. She has poor eyesight and has had several near misses with falls',
          'She weighs about 75 kg and normally walks with a frame outside',
          'You and your partner find her on the bathroom floor, having slipped on a wet patch by the sink',
          'Your assessment shows she is physically unharmed. You are planning how to get her from the floor onto a chair in the kitchen'
        ],
        callout: { text: 'The patient has been clinically assessed: no injuries or medical conditions that rule out this transfer.' },
        notes: {
          time: 3,
          ask: ['How would you get Mrs Jones off the floor? Which option is safest for you and for her?'],
          say: ['The safest way to do a manual task is shown in the hierarchy of control, on the next slides.']
        }
      },
      {
        type: 'cards',
        cols: 3,
        variant: 'number',
        title: 'Hierarchy of control, most effective first',
        items: [
          { h: 'Eliminate the task' },
          { h: 'Alter the workplace or environmental conditions' },
          { h: 'Alter the systems of work' },
          { h: 'Change the object used in the task' },
          { h: 'Use mechanical aids' },
          { h: 'Provide information and training in manual handling techniques (least effective)' }
        ],
        notes: { time: 2, say: ['Level 1 is most effective, level 6 least. The next slides give Mrs Jones’s example for each level.'] }
      },
      {
        type: 'bullets',
        title: 'Control levels 1 to 3',
        points: [
          { t: '1. Eliminate the task (most effective)', sub: ['If it is safe, ask the patient to get up from the floor, with the Ambulance Officer prompting how to do it using furniture', 'The officer is there to steady the patient if they lose balance'] },
          { t: '2. Alter the workplace or environmental conditions', sub: ['Usually prevention. E.g. she slipped getting up from her armchair in socks with no shoes: slippers, or “safety socks” with grips, may have prevented the fall'] },
          { t: '3. Alter the systems of work', sub: ['E.g. frequent call-outs to a supportive living complex for a resident who often falls: the complex buys its own equipment to get fallen residents off the floor'] }
        ],
        notes: { time: 3 }
      },
      {
        type: 'bullets',
        title: 'Control levels 4 to 6',
        points: [
          { t: '4. Change the object used in the task', sub: ['E.g. use two kitchen chairs rather than one: one in front for support to lift off the floor, and one to slip under her bottom as she stands'] },
          { t: '5. Use mechanical aids', sub: ['In some situations you may need a Camel lifting device or a Raizer patient lifter'] },
          { t: '6. Provide information and training in manual handling techniques (least effective)', sub: ['Part of this is the eLearning and the practicals in your face-to-face training'] }
        ],
        notes: { time: 3, activity: 'Suggested: ask the group which control level they would reach for first in their own area, and why.' }
      },
      {
        type: 'cards',
        cols: 3,
        variant: 'number',
        title: 'Check: put the controls in order',
        items: [
          { h: 'Eliminate the task' },
          { h: 'Alter the workplace or environmental conditions' },
          { h: 'Alter the systems of work' },
          { h: 'Change the object used in the task' },
          { h: 'Use mechanical aids' },
          { h: 'Provide information and training' }
        ],
        notes: { time: 3, say: ['In the eLearning learners drag six responses onto levels 1 to 6 of the pyramid. Use this as a recap: cover the list and ask the group for the order, then reveal.'] }
      },

      /* ---------- Dynamic risk assessment ---------- */
      {
        type: 'bullets',
        title: 'Dynamic risk assessment',
        points: [
          'On shift we are constantly monitoring our surroundings and controlling risks at a scene, to minimise the likelihood of injury to SAAS workers, patients and bystanders',
          'Dynamic risk assessment is the intuitive process of controlling risk at a scene: identify hazards, assess risks and reduce them with the best controls available as circumstances change',
          'Also called a “risk assessment on the run”'
        ],
        notes: { time: 2 }
      },
      {
        type: 'cards',
        title: 'READ the situation',
        cols: 4,
        variant: 'plain',
        items: [
          { h: 'R', t: 'Risks' },
          { h: 'E', t: 'Equipment' },
          { h: 'A', t: 'Action plan' },
          { h: 'D', t: 'Discuss' }
        ],
        callout: { text: 'The R.E.A.D mnemonic is adapted from Ambulance Victoria to guide dynamic risk assessment at a scene.' },
        notes: {
          time: 3,
          say: ['The lesson shows only these four words, with no more text, so talk through what each means at a scene.'],
          ask: ['What risks, equipment, action plan and discussion would you use at Mrs Jones’s bathroom?']
        }
      },
      V('Scenario: dynamic risk assessment', '3:22', 'Manual Tasks - Host Video 10.mp4', 'video_6M2Zc6q54jw_22_48_678x382'),
      {
        type: 'bullets',
        title: 'Check: a dynamic risk assessment guides your decision making',
        points: ['True', 'False'],
        callout: { head: 'True', text: 'If something doesn’t look or feel right, speak up. Don’t continue if there is significant risk.' },
        notes: { time: 2, tip: 'The right answer is not stored as text in the lesson. True is inferred from the slide’s prompt (“If something doesn’t look or feel right, speak up. Don’t continue if there is significant risk.”). Check it against the lesson.' }
      },
      {
        type: 'statement',
        kicker: 'Lesson 6 complete',
        text: 'Congratulations on completing Lesson 6.',
        sub: 'Questions and reflections?',
        notes: { time: 2, say: ['Recap: report hazards through the WHISR app, work down the hierarchy of control, and speak up if the risk is too high.'], tip: 'Add a link to the next lesson here when you add it.' }
      }
    ]
  });
})();
