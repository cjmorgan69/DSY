// Manual Tasks Optional Additional Learning: Patient Handling Equipment (Stryker stretcher). Slide content condensed to dot
// points from the eLearning lesson (Articulate Storyline SCORM, approx. 25 min; no version number shown).
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// The videos are MP4 files inside the lesson package (link only: no copies are kept). The slides are placeholders; the notes and
// guide link to each file (saaslearn login needed). The procedure is on the SAAS intranet.
// The lesson is built around a home page with six topics; the slides follow the order the topics are stored in the lesson.
(function () {
  var base = 'https://saaslearn.com.au/moodle/pluginfile.php/15323/mod_scorm/content/3/story_content/';
  function V(title, length, file, id, tip) {
    return { type: 'video', title: title, video: { length: length, file: file, url: base + id + '.mp4' }, notes: { time: 2, tip: tip, videoSummary: null } };
  }

  DRIVE_SECTIONS.push({
    id: 'optional-stryker',
    name: 'Optional',
    number: '',
    title: 'Additional Learning: Patient Handling Equipment',
    audience: 'Ambulance Clinicians',
    elearningMinutes: 25,
    slides: [
      {
        type: 'title',
        title: 'Manual Tasks',
        subtitle: 'Optional Additional Learning: Patient Handling Equipment',
        lines: ['Stryker stretcher and Power-LOAD', 'SA Ambulance Service'],
        notes: { time: 1, say: ['This optional lesson covers the Stryker Power-PRO stretcher and Power-LOAD system: seat belts, powered loading, power failure, bridge release and the push/pull bar knobs.'], tip: 'About 25 minutes in the eLearning. No version number or quiz.' }
      },
      {
        type: 'cards',
        title: 'Six topics',
        cols: 3,
        variant: 'number',
        items: [
          { h: 'What is a Power-LOAD system and its functions?' },
          { h: 'Stryker Power-PRO stretcher functions: seat belts' },
          { h: 'Powered loading' },
          { h: 'Power failure: manual raising and manual loading' },
          { h: 'Stryker push / pull bar securing knobs' },
          { h: 'Release the bridge from the stretcher' }
        ],
        notes: { time: 1, say: ['In the eLearning these six topics are buttons on a home page. The slides follow the order the lesson stores them.'] }
      },
      V('What is a Power-LOAD system and its functions?', '3:50', 'Power LOAD Introduction.mp4', 'video_6kQ089DUVQN_22_48_680x384'),
      {
        type: 'bullets',
        title: 'Stryker Power-PRO stretcher functions: seat belts',
        points: [
          'A patient must always be secured with all belts when in the stretcher, unless there is a medical reason not to use a specific belt',
          'This is practised in training, including use of the Paedimate, used to secure small children'
        ],
        notes: { time: 2, ask: ['What medical reason might mean leaving out a belt? Who decides?'] }
      },
      V('Stryker Power-PRO stretcher functions: seat belts', '3:34', 'Manual Tasks - Microsoft Stream - Stryker 02.mp4', 'video_6cIei4PO9fv_22_48_680x384'),
      {
        type: 'bullets',
        title: 'Powered loading',
        points: [
          'Two workers should load and unload a laden stretcher, to share the load and line the loading arms up correctly with the stretcher',
          'Where possible, load and unload on flat ground. Techniques for uphill and downhill slopes are in the video and in training',
          'A common cause of the stretcher failing to load, or jamming, is not having the head end fully extended before loading'
        ],
        notes: { time: 3, tip: 'Loading and unloading a stretcher is practised in the practical part of the course.', activity: 'Suggested: practise loading and unloading with two people, including on a slope.' }
      },
      V('Loading and unloading a laden stretcher into the ambulance', '8:18', 'Loading _ unloading a laden stretcher into ambulance.mp4', 'video_6UfcitiH1Kv_22_48_640x360'),
      V('Stryker handle to assist with removal and return', '0:30', 'Manual Tasks - Stryker 01.mp4', 'video_65Of2OkVMsr_22_48_640x360'),
      {
        type: 'bullets',
        title: 'Power failure: manual raising and manual loading',
        points: [
          'If the stretcher or the power loader loses power, there are Stryker procedures to load the stretcher manually',
          'Fact cards are available in the ambulance',
          'It doesn’t happen often. If it happens on the road, you can always call the EOC to get someone to talk you through it'
        ],
        callout: { text: 'Procedure: Stryker Power-PRO Stretcher, Manual Raise and Lower [PRO-288] (SAAS intranet).' },
        notes: { time: 2, tip: 'PRO-288 (SAAS intranet): https://sagov.sharepoint.com/sites/SAAS/policies/Documents/PRO-288%20Stryker%20Power-PRO%20Stretcher%20-%20Manual%20Raise%20and%20Lower%20-%20INTRANET.pdf' }
      },
      V('Unloading and loading with power loss', '8:33', 'Unloading and loading with power loss.mp4', 'video_6fK4LL5fvOZ_22_48_640x360'),
      {
        type: 'bullets',
        title: 'Stryker push / pull bar securing knobs',
        points: [
          'The securing knobs are not interchangeable. Install them correctly so the stretcher doesn’t move unexpectedly when you manoeuvre it or when patients stand on or off it',
          'Unplanned movement puts workers and patients at risk of injury',
          'The handle is attached with four knobs (two short yellow, two long black) to four securing bolts',
          'Short yellow knobs go on the bolts closest to the head end; long black knobs on the bolts closest to the foot end',
          'Memory aid: “Blonde hair, black boots”: yellow (blonde) at the head end, black (boots) at the foot end',
          'When you take the bar off, put the knobs back on loosely in their correct places so they aren’t lost',
          'Don’t overtighten: firm enough that they won’t loosen and get lost. Check them regularly, because vehicle vibration can loosen them'
        ],
        notes: { time: 3, activity: 'Suggested: have each person fit the push/pull bar on a real stretcher.', tip: 'No video on this topic in the lesson.' }
      },
      V('Release the bridge from the stretcher', '0:16', 'Manual Tasks - Bridge 02.mp4', 'video_5irF4sw5jfS_22_48_680x384'),
      {
        type: 'statement',
        kicker: 'Release the bridge',
        text: 'Do not unclasp the buckle from the weight bearing belt.',
        sub: 'Doing so increases the risk of the buckle being lost or damaged.',
        notes: { time: 1 }
      },
      {
        type: 'statement',
        kicker: 'Optional additional learning complete',
        text: 'Congratulations on completing the optional learning.',
        sub: 'Questions and reflections?',
        notes: { time: 2, say: ['Recap: all belts on, two people for loading, head end fully extended, and the right knobs in the right places.'] }
      }
    ]
  });
})();
