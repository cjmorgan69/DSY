// DRiVE Section 5: Manoeuvring Principles. Slide content condensed to dot points from the eLearning lesson
// (Moodle lesson id 23493, 3 pages). The section number is a guess: change it if SAAS numbers it differently.
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// Video lengths and captions were not available. The six manoeuvre videos are paired with their titles by page order.
(function () {
  function vid(id, hash) { return { id: id, hash: hash, length: '' }; }
  var pairing = 'The pairing of this video with its title is from the order on the lesson page. Preview it to confirm.';

  DRIVE_SECTIONS.push({
    id: 'section5-manoeuvring',
    number: 5,
    title: 'Manoeuvring Principles',
    audience: 'Volunteer, Career and External Clients',
    elearningMinutes: 20,
    slides: [
      {
        type: 'title',
        title: 'DRiVE Principles and Knowledge',
        subtitle: 'Section 5: Manoeuvring Principles',
        lines: ['Volunteer, Career and External Clients'],
        notes: {
          time: 1,
          say: ['This section covers the five key principles of manoeuvring, the six key manoeuvres and the cone course used in your practical assessment.'],
          tip: 'Best taught with cones and a vehicle. The lesson itself does not state a time, so the 20 minutes is only an estimate.'
        }
      },
      {
        type: 'video',
        title: 'Manoeuvring principles',
        vimeo: vid('851515940', '2bcbb46267'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'statement',
        kicker: 'Manoeuvring',
        text: 'Five key principles of manoeuvring.',
        sub: 'Apply them in every manoeuvre.',
        notes: { time: 1, say: ['Take the five principles one at a time on the next slides, then show how each one appears in the six manoeuvres.'] }
      },
      {
        type: 'bullets',
        title: '1. Do not dry steer',
        points: [
          'Dry steering = turning the wheel while the vehicle is stationary',
          'It shows the area for the manoeuvre is probably very tight',
          'It increases wear and tear on the vehicle and the road surface'
        ],
        notes: { time: 2, ask: ['What do you see in your own driving that gives you away as dry steering?'] }
      },
      {
        type: 'bullets',
        title: '2. Do not hold steering on full lock',
        points: [
          'Full lock = the wheel turned to its maximum extent, left or right',
          'Having to hold full lock shows the driver is hoping the vehicle will turn in the space, rather than it being a calculated manoeuvre',
          'It also increases wear and tear on the vehicle'
        ],
        notes: { time: 2 }
      },
      {
        type: 'bullets',
        title: '3. Be aware of the pivot point',
        points: [
          'The pivot point is the area where a vehicle turns: just in front of the rear wheel',
          'It is the part of the vehicle with the smallest turning circle',
          'In a longer vehicle, turn slightly wider or a little later, because the rear pivot point is further back from the driver'
        ],
        notes: { time: 3, activity: 'Suggested: walk the group round the real vehicle and point out the pivot point on each side.' }
      },
      {
        type: 'bullets',
        title: '4. Face the wheels',
        points: [
          'As you finish one manoeuvre, set the front wheels towards the next direction of travel',
          'It prevents dry steering',
          'It also reduces the turning radius when you start the next part of the manoeuvre'
        ],
        notes: { time: 2 }
      },
      {
        type: 'bullets',
        title: '5. Always set up for entry',
        points: [
          'On the approach to a tighter area, position the vehicle a bit wider before you turn',
          'Then you are parallel when you enter the area'
        ],
        notes: { time: 2, ask: ['Think of a gate or driveway you use. Where would you set up for entry?'] }
      },
      {
        type: 'cards',
        title: 'Five key principles of manoeuvring',
        cols: 5,
        variant: 'number',
        items: [
          { h: 'Do not dry steer' },
          { h: 'Do not hold full lock' },
          { h: 'Be aware of the pivot point' },
          { h: 'Face the wheels' },
          { h: 'Always set up for entry' }
        ],
        notes: { time: 1, say: ['A quick recap of the five before the manoeuvres.'] }
      },
      {
        type: 'statement',
        kicker: 'Key manoeuvres',
        text: 'Six key manoeuvres to master.',
        sub: 'Each one applies different principles. You are assessed on a cone course and on road. They are all manoeuvres you will perform regularly on the road.',
        notes: {
          time: 1,
          say: ['The videos for each manoeuvre show the principles to apply and a real world example of when you would use it.']
        }
      },
      {
        type: 'video',
        title: 'Three point turn',
        vimeo: vid('855610728', '13a6fecb4a'),
        notes: { time: 3, tip: pairing, videoSummary: null }
      },
      {
        type: 'video',
        title: '90 degree forward park',
        vimeo: vid('856282146', 'dafe07e562'),
        notes: { time: 3, tip: pairing, videoSummary: null }
      },
      {
        type: 'video',
        title: '90 degree reverse park',
        vimeo: vid('856282795', '5ebf686eac'),
        notes: { time: 3, tip: pairing, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Reverse around a corner',
        vimeo: vid('856283431', 'e6e5547801'),
        notes: { time: 3, tip: pairing, videoSummary: null }
      },
      {
        type: 'video',
        title: 'Reverse parallel park',
        vimeo: vid('856595149', '2bd05f4736'),
        notes: { time: 3, tip: pairing, videoSummary: null }
      },
      {
        type: 'video',
        title: 'U-turns',
        vimeo: vid('856595753', '0fedcd9f78'),
        notes: { time: 3, tip: pairing, videoSummary: null }
      },
      {
        type: 'cards',
        title: 'The six key manoeuvres',
        cols: 3,
        variant: 'number',
        items: [
          { h: 'Three point turn' },
          { h: '90 degree forward park' },
          { h: '90 degree reverse park' },
          { h: 'Reverse around a corner' },
          { h: 'Reverse parallel park' },
          { h: 'U-turns' }
        ],
        notes: {
          time: 3,
          ask: ['Which of the five principles matters most in each manoeuvre?'],
          activity: 'Suggested: groups take one manoeuvre each, say which principles it needs and where in the manoeuvre, then walk it on the cone course.'
        }
      },
      {
        type: 'video',
        title: 'Cone course: example run',
        vimeo: vid('855611246', 'b9fa66400a'),
        notes: { time: 3, say: ['The video shows an example run of the cone course with a text overview of the key principles applied.'], videoSummary: null }
      },
      {
        type: 'bullets',
        title: 'Cone course',
        points: [
          'Part of your practical assessment',
          'You demonstrate a series of manoeuvring principles one after the other',
          'The course is timed, but the goal is to complete each manoeuvre correctly, using all the techniques you have been taught'
        ],
        notes: {
          time: 2,
          activity: 'Suggested: let each person walk the course before driving it.',
          tip: 'No pass marks, penalties or course layout are given in the lesson. Add your own assessment details here.'
        }
      },
      {
        type: 'statement',
        kicker: 'Section 5 complete',
        text: 'Congratulations on completing Manoeuvring Principles.',
        sub: 'Next lesson in the series: Understanding Policies, Procedures and the Law.',
        notes: {
          time: 2,
          say: ['Recap the five principles and the six manoeuvres. Next in the series is Understanding Policies, Procedures and the Law.'],
          tip: 'Add a link to the next section here when you add it.'
        }
      }
    ]
  });
})();
