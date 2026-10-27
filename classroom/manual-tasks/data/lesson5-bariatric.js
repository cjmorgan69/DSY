// Manual Tasks Lesson 5: Bariatric Patient Handling Equipment. Slide content condensed to dot points from the eLearning lesson
// (Articulate Storyline SCORM, "allow a minimum of 10 minutes", version 1.1 20230206).
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// The videos are MP4 files inside the lesson package (link only: no copies are kept). The slides are placeholders; the notes and
// guide link to each file (saaslearn login needed). The procedures are on the SAAS intranet.
// The lesson has no knowledge check. The finish says "You can now proceed to your assessment or workshop."
(function () {
  var base = 'https://saaslearn.com.au/moodle/pluginfile.php/15322/mod_scorm/content/3/story_content/';
  function V(title, length, file, id, tip) {
    return { type: 'video', title: title, video: { length: length, file: file, url: base + id + '.mp4' }, notes: { time: 2, tip: tip, videoSummary: null } };
  }
  var PRO = 'https://sagov.sharepoint.com/sites/SAAS/policies/Documents/';

  DRIVE_SECTIONS.push({
    id: 'lesson5-bariatric',
    number: 5,
    title: 'Bariatric Patient Handling Equipment',
    audience: 'Ambulance Clinicians',
    elearningMinutes: 10,
    slides: [
      {
        type: 'title',
        title: 'Manual Tasks',
        subtitle: 'Lesson 5: Bariatric Patient Handling Equipment',
        lines: ['SA Ambulance Service'],
        notes: { time: 1, say: ['This lesson covers larger and bariatric patients, sizing, and the equipment that helps you move them safely.'], tip: 'The eLearning takes at least 10 minutes (version 1.1, 20230206). It leads to an assessment or workshop.' }
      },
      {
        type: 'statement',
        kicker: 'Acknowledgement of Country',
        text: 'SA Ambulance Service acknowledges Aboriginal and Torres Strait Islander peoples as the Traditional Custodians of this land and waters.',
        sub: 'We pay our respects to Aboriginal and Torres Strait Islander Elders, past, present and future, and acknowledge the diversity and strength of Aboriginal and Torres Strait Islander peoples and communities today.',
        notes: { time: 1, say: ['Read the acknowledgement as written.'] }
      },
      V('Larger or bariatric patients', '0:54', 'Manual Tasks - Host Video 17.mp4', 'video_6fD3CUNTVWH_22_48_678x382'),
      {
        type: 'bullets',
        title: 'Larger or bariatric patients',
        points: [
          'Patients are becoming larger: 31% of adult Australians are rated obese and 65% overweight or obese',
          'SAAS crews handle larger patients than before, given the Stryker stretcher’s greater capacity',
          'An independent larger patient is a low risk to transport; a dependent heavier patient increases the risk of worker injury',
          'The medical definition of bariatric is a body mass index (BMI) of 40 or more, but safe handling depends on other factors too'
        ],
        callout: { head: 'Factors besides weight', text: 'Safe working load of the equipment · the patient’s body shape and level of function · their medical condition and the response time needed · staff resources available (SAAS and other emergency responders) · the environment.' },
        notes: { time: 3, ask: ['Which of these factors is the hardest to judge at the door?'], tip: 'The statistics are as given in the lesson (version 1.1, 2023). Check for newer figures if you quote them.' }
      },
      {
        type: 'bullets',
        title: 'Patient sizing',
        points: [
          'Many larger patients can go on the Stryker stretcher. The limiting factor is mainly body shape, especially width, for fitting on the stretcher and into the back of an ambulance',
          'Inside the ambulance, between the wall and the rear attendant seat, the maximum width is 700 mm with the patient secured on the stretcher',
          'The most common bariatric body shapes are the Apple and the Pear'
        ],
        callout: { text: 'Procedure: Managing Larger / Bariatric Patients [PRO-284] (SAAS intranet).' },
        notes: { time: 3, tip: 'PRO-284 (SAAS intranet, file name "Bariatric Ambulance Response"): ' + PRO + 'PRO-284%20Bariatric%20Ambulance%20Response%20-%20INTRANET.pdf' }
      },
      {
        type: 'cards',
        title: 'Bariatric body shapes',
        cols: 4,
        variant: 'plain',
        items: [
          { h: 'Apple', t: 'Weight is carried high. Fat is stored around the abdomen. May have difficulty lying flat.' },
          { h: 'Pear', t: 'Weight is carried below the waist. May have a wide base stance.' },
          { h: 'Anasarca', t: 'Severe generalised oedema.' },
          { h: 'Bulbus gluteal region', t: 'Excessive buttock tissue creating a protruding shelf.' }
        ],
        notes: { time: 2, tip: 'The lesson shows pictures of each shape beside its description. The pictures were not copied.' }
      },
      {
        type: 'bullets',
        title: 'Dignity, support and specialist teams',
        points: [
          'Obesity is now recognised as a disease. Patients with this complex condition often have low confidence and self-esteem',
          'Any management, extrication and transport plan should actively keep the patient involved, with dignity and respect, especially in a public place',
          'Emergency Support Services (ESS) keep a 24/7 bariatric ambulance, with specialist lifting equipment on ESS vehicles or placed at metropolitan stations. Country Operations has bariatric equipment at selected rural locations',
          'The ESS Bariatric Team has specific training for bariatric patients, equipment and transport',
          'The Special Operations team and ESS Bariatric Team have extra training, resources and equipment for complex extrications (mainly metro). They are available for phone consultations to regional areas, with requests made through the EOC',
          'You can also call MFS, CFS and SES for help with difficult access and extrication, and for extra people'
        ],
        callout: { text: 'Stretcher sizing information is now available on the MDT [INFO-21-024] (SAAS intranet).' },
        notes: {
          time: 4,
          ask: ['At your station, which bariatric equipment is nearest and how do you request it?'],
          tip: 'INFO-21-024 (SAAS intranet): ' + PRO + 'INFO-21-024%20Stretcher%20sizing%20information%20now%20available%20on%20MDT%20-%20INTRANET.pdf. The lesson has a “please watch the following video” panel here but no file was found: check the lesson.'
        }
      },
      {
        type: 'bullets',
        title: 'Tools that help you lift patients safely',
        points: [
          'Tools like these remove the need for us to lift or strain, greatly reducing injury risk',
          'Camels and Raizers are commonly used as additional equipment',
          'Hovermatts, Hoverjacks and Stair Chairs are specialised equipment used by the Metro bariatric team. Larger regional sites have Hoverjacks and Hovermatts'
        ],
        notes: { time: 2 }
      },
      {
        type: 'bullets',
        title: 'Camel lifting device',
        points: [
          'Designed to sit up and lift a person from the floor, independently or assisted',
          'Used to help patients from the ground when it is not safe to use other techniques',
          'Safe working load 320 kg'
        ],
        callout: { text: 'Procedure: Using a Lifting Device to Get a Patient Up Off the Floor, Camel SWL 320 kg, Raizer lift 150 kg [PRO-323] (SAAS intranet).' },
        notes: { time: 2, tip: 'PRO-323 (SAAS intranet): ' + PRO + 'PRO-323%20Using%20a%20Lifting%20device%20to%20get%20a%20patient%20up%20off%20the%20floor%20-%20CAMEL%20SWL%20320kg%20%20RAIZER%20LIFT%20150kg%20-%20INTRANET.pdf' }
      },
      {
        type: 'bullets',
        title: 'Ferno EZ Glide evacuation chair',
        points: [
          'Designed to “glide” seated patients down stairs without carrying or lifting',
          'Large 15 cm rear wheels and 10 cm front swivel wheels roll easily over different surfaces and low obstacles',
          'Manual tasks training in addition to the standard course is needed before using it',
          'Safe working load 227 kg. Equipment weight 15 kg',
          'A powered chair was recently bought for the ESS team to move patients up and down stairs or steep ramps. The manual EZ Glide is used in Mount Gambier'
        ],
        callout: { text: 'Procedure: Using Ferno EZ (manual) and Power Traxx Stair chairs, SWL 227 kg [PRO-324] (SAAS intranet).' },
        notes: { time: 2, tip: 'PRO-324 (SAAS intranet): ' + PRO + 'PRO-324%20Using%20Ferno%20EZ%20(manual)%20and%20Power%20Traxx%20Stair%20chairs%20SWL%20227kg%20-%20INTRANET.pdf' }
      },
      V('Ferno EZ Glide evacuation chair', '0:48', 'Manual Tasks - Ferno 01.mp4', 'video_60gdz3ZKf4U_22_48_604x340'),
      {
        type: 'compare',
        title: 'HoverMatt and HoverJack',
        left: {
          head: 'HoverMatt',
          points: [
            'Moves bariatric patients along the ground from one place to another',
            'Sections of rubber matting can be laid and re-laid to make a path for the HoverMatt',
            'Can be used at the patient’s home or in hospital to slide patients from bed to bed, or to and from the ambulance stretcher',
            'Tiny holes on the underside: connected to a compressor, the mat inflates slightly and pushes air out, creating a “hover”. The patient is then moved the way a non-bariatric patient is on a blue slide sheet'
          ]
        },
        right: {
          head: 'HoverJack',
          points: ['A series of stacked “airbeds”, inflated in turn, to raise a bariatric patient from ground level to bed or stretcher height']
        },
        callout: { text: 'Procedure: Use of the Hoverjack, Hovermatt and HT Wedge [PRO-057] (SAAS intranet).' },
        notes: { time: 3, tip: 'PRO-057 (SAAS intranet): ' + PRO + 'PRO-057%20Hoverjack%20-%20INTRANET.pdf' }
      },
      {
        type: 'statement',
        kicker: 'Lesson 5 complete',
        text: 'Congratulations on completing Lesson 5.',
        sub: 'You can now proceed to your assessment or workshop.',
        notes: { time: 2, say: ['Recap: size up the patient and the place, plan for dignity, and call the specialist teams early.'], tip: 'Add a link to the next lesson here when you add it.' }
      }
    ]
  });
})();
