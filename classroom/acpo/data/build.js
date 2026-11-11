// ACPO case night: builds the slide sections from the ACPO microlearning module (AP_ML) and Kevin's walk-through
// (AP_WT). Clinical wording all comes from those two files. The slide order, section titles, MDT screenshot captions,
// the "Tonight" and "Next week" slides and the short presenter cues below are DSY-written (owner to review).
// Same layout as /classroom/chest-pain/data/build.js.
(function () {
  var ML = window.AP_ML, WT = window.AP_WT;
  if (!ML || !WT) return;
  var DSY = 'Slide order and presenter cues are DSY-written for review. The clinical content comes from the module and the walk-through.';

  function panelIn(M, title) {
    for (var i = 0; i < M.panels.length; i++) if (M.panels[i].title === title) return M.panels[i];
    return { blocks: [] };
  }
  function panel(title) { return panelIn(WT, title); }
  function boxIn(p, title) {
    var b = p.blocks.filter(function (x) { return x.box && x.box.title === title; })[0];
    return b ? b.box : null;
  }
  function step(t) { return t.text ? { h: t.t, t: t.text } : t.t; }
  function split(x) { var k = x.indexOf(': '); return k > 0 ? { h: x.slice(0, k), t: x.slice(k + 2) } : { h: x }; }
  function tableSlide(tb, extra) {
    var t = tb.table, s = { type: 'table', title: tb.title, noStep: true, fs: 44 };
    if (t.rows.length === 1 && t.head.length > 4) { s.head = ['Observation', 'Value']; s.rows = t.head.map(function (h, i) { return [h, t.rows[0][i]]; }); s.fs = 46; }
    else { s.head = t.head; s.rows = t.rows; }
    for (var k in extra) s[k] = extra[k];
    return s;
  }
  // A module or walk-through box as a slide: steps -> numbered, items -> bullets; a quick check goes in the notes.
  function boxSlide(bx, kicker) {
    var notes = { time: 1 };
    if (bx.check) { notes.ask = [bx.check.q]; notes.say = ['Answer: ' + bx.check.a]; }
    if (bx.steps) return { type: 'numbered', kicker: kicker, title: bx.title, items: bx.steps.map(step), notes: notes };
    return { type: 'bullets', kicker: kicker, title: bx.title, points: bx.items, notes: notes };
  }

  /* ---------- Part 1: Welcome ---------- */
  var overview = panel('Overview'), prebrief = panel('Pre-brief: the AO ACPO protocol');
  var objectives = boxIn(overview, 'Learning objectives'), roles = boxIn(overview, 'Crew roles');
  DRIVE_SECTIONS.push({
    id: 'welcome', name: 'Part 1', title: 'Welcome', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'title', title: 'ACPO', subtitle: 'Case night: Kevin, 72', lines: ['The intro video, the walk-through with the MDT screens, then the PCR', WT.protocol.code + ' ' + WT.protocol.name + ' ' + WT.protocol.version],
        notes: { time: 2, say: ['Welcome. Tonight is one job from start to finish: the video, the walk-through with the MDT screens, then the patient report card.'],
          tip: DSY + ' Before the night: check the video plays with sound, the projector shows the QR codes clearly, and everyone has signed in to dsytraining.com on their phone (the PCR page asks for a sign-in).' } },
      { type: 'numbered', title: 'Tonight', items: [
          'Intro video and the protocol',
          'The job: Kevin, 72, woken at night gasping. Eight break points, with the MDT screens along the way',
          'Write the patient report card (PCR) and compare it with the model card',
          'Next week: the chest pain and ACPO skills stations'],
        notes: { time: 1, tip: 'DSY-written overview. The skills stations are a separate session, as for the chest pain night.' } },
      { type: 'bullets', title: objectives.title, points: objectives.items, notes: { time: 2, tip: 'Learning objectives from the walk-through.' } },
      { type: 'cards', title: roles.title, cols: 2, items: roles.items.map(split), notes: { time: 1, say: ['Pick a Clinician and a Driver for the night, or swap at each break point.'] } }
    ]
  });

  /* ---------- Part 2: The protocol (video and the module's protocol section) ---------- */
  var intro = panelIn(ML, 'Introduction'), proto = panelIn(ML, 'The protocol');
  var video = intro.blocks.filter(function (b) { return b.video; })[0].video;
  var introText = intro.blocks.filter(function (b) { return b.text; }).map(function (b) { return b.text; });
  var principle = boxIn(prebrief, 'Principle (' + WT.protocol.code + ')'), general = boxIn(prebrief, 'General teaching (not in the protocol)');
  var protoSlides = proto.blocks.filter(function (b) { return b.box; }).map(function (b) { return boxSlide(b.box, 'The protocol (' + ML.protocol.code + ')'); });
  DRIVE_SECTIONS.push({
    id: 'protocol', name: 'Part 2', title: 'The protocol', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'mp4', title: video.title, length: '3 min', src: '/microlearning/acpo/' + video.src, poster: '/microlearning/acpo/' + video.poster,
        notes: { time: 4, say: ['Watch the whole video, then we go through the protocol together.'], tip: 'The narrated intro video from the ACPO microlearning module.' } },
      { type: 'statement', kicker: 'In short', text: introText[0], sub: introText[1] || '', notes: { time: 1 } }
    ].concat(protoSlides).concat([
      { type: 'bullets', kicker: 'Pre-brief (' + WT.protocol.code + ')', title: principle.title, points: principle.items, notes: { time: 1 } },
      { type: 'bullets', kicker: 'Background', title: general.title, points: general.items, notes: { time: 2 } }
    ])
  });

  /* ---------- Part 3: The job (walk-through break points, MDT screenshots) ---------- */
  var order = WT.panels.map(function (p) { return p.title; });
  var jobPanels = order.slice(order.indexOf('Dispatch and en route'), order.indexOf('Handover') + 1);
  // MDT screenshots (img/mdt-*.png, taken by /classroom/case-night/tools/mdt-shots.js acpo with the walk-through's times).
  function shot(n, title, points, say) {
    return { type: 'image', kicker: 'The MDT', title: title, img: 'img/mdt-' + n + '.png', alt: 'MDT screen: ' + title, points: points, fs: 38, wide: true,
      notes: { time: 1, say: say ? [say] : [], tip: 'Screenshot of the DSY MDT simulator (fictional data). Students can drill the same job later from Learn on your own.' } };
  }
  var mdtAt = {
    dispatch: [
      shot('1-dispatch', '0247: the job arrives', ['Priority 2, breathing problems, Port Neill', 'Tap Ack'], 'What does the MDT tell you before you even leave the station?'),
      shot('2-enroute', '0248: Enroute', ['F6 sends ENROUTE (no confirm)', 'The status bar shows what the EOC sees', 'The F6 button now offers Time Scene'], ''),
      shot('3-remarks', 'The remarks keep coming', ['0250: wife says his breathing is noisy, he can\'t get his breath', '0255: lights on, wife at the front door', 'Newest at the top: check the REMARKS tab on the way'], 'What does "noisy breathing" add to your plan?')
    ],
    arrival: [shot('4-confirm-scene', '0300: Time Scene', ['F6, then Confirm', 'Press it when you arrive, not when you reach the patient'], '')],
    mobile: [
      shot('6-destination', '0322: Mobile, pick the hospital', ['F6 opens the destination list', 'Closest puts Tumby Bay Hospital first', 'About 30 minutes to Tumby Bay'], ''),
      shot('7-confirm-mobile', 'Confirm the destination', ['Check it is the hospital the EOC Clinician agreed', 'Then Confirm'], '')
    ],
    arrive: [shot('8-arrive-dest', '0352: Arrive Dest', ['F6 sends ARRIVE DEST. (no confirm)', 'Status bar: arrived at Tumby Bay Hospital'], '')],
    clear: [shot('9-clear', 'After handover: Clear', ['F6, then Confirm', 'Tick Direct Admission to Ward only if that is where he went'], '')]
  };
  var nBP = 0, totalBP = 0;
  jobPanels.forEach(function (t) { panel(t).blocks.forEach(function (b) { if (b.breakpoint) totalBP++; }); });

  var job = [];
  jobPanels.forEach(function (title, pi) {
    var p = panel(title), first = job.length;
    p.blocks.forEach(function (b) {
      if (b.text) {
        job.push({ type: 'statement', kicker: b.muted ? 'In the scenario' : title, text: b.text, notes: { time: 1 } });
      } else if (b.box && b.box.tiles) {
        job.push({ type: 'cards', kicker: title, title: b.box.title, cols: 3, items: b.box.steps.map(function (x) { return { h: x.t, t: x.text }; }), notes: { time: 2 } });
      } else if (b.box && b.box.text) {
        job.push({ type: 'statement', kicker: b.box.title, text: b.box.text, notes: { time: 2 } });
      } else if (b.box) {
        var call = /EOC Clinician call/.test(b.box.title);
        job.push({ type: 'bullets', kicker: title, title: b.box.title, points: b.box.items,
          notes: call ? { time: 3, activity: 'In pairs: one makes the call, the other plays the EOC Clinician and repeats the advice back. Swap.', tip: 'The EOC Clinician replies are written by DSY for the scenario.' } : { time: 1 } });
        if (b.box.title === 'MDT display') job = job.concat(mdtAt.dispatch);
      } else if (b.steps) {
        job.push({ type: 'numbered', kicker: title, title: 'What the crew does', items: b.steps.map(step), notes: { time: 1 } });
      } else if (b.table) {
        job.push(tableSlide(b.table, { kicker: title, notes: { time: 1 } }));
      } else if (b.breakpoint) {
        var bp = b.breakpoint; nBP++;
        var tip = [bp.teachingNote, (bp.cards || []).map(function (c) { return 'Quick question: ' + c.q + ' (' + c.a + ')'; }).join(' ')].filter(Boolean).join(' ');
        job.push({ type: 'prompts', kicker: 'Break point ' + nBP + ' of ' + totalBP + ' · ' + bp.type, title: bp.title, prompts: bp.prompts,
          notes: { time: 4, listen: bp.expected, teach: bp.teaching, real: bp.realJob, tip: tip } });
        (bp.decisions || []).forEach(function (d) {
          job.push({ type: 'decision', kicker: 'Decision · break point ' + nBP, q: d.q, options: d.options, answer: d.answer, why: d.why,
            notes: { time: 1, say: ['Everyone picks A, B or C (hands up or fingers). Then click to show the answer.'] } });
        });
      }
    });
    if (pi === 1) job.splice(first, 0, mdtAt.arrival[0]);                 // the panel after dispatch: arrival
    if (/^Extrication/.test(title)) job = job.concat(mdtAt.mobile);
    if (title === 'Handover') { job.splice(first, 0, mdtAt.arrive[0]); job = job.concat(mdtAt.clear); }
  });
  job.unshift({ type: 'bullets', title: 'Before we start', points: ['This is a walk-through: we pause at each break point to talk it through', 'Vote on each decision before the answer shows', 'Anyone can call "real world" to stop for a genuine safety concern'],
    notes: { time: 1, tip: 'DSY-written (the ACPO walk-through has no safety brief box).' } });
  DRIVE_SECTIONS.push({ id: 'job', name: 'Part 3', title: 'The job: ' + WT.headline.split(':')[0], audience: 'Volunteer Ambulance Officers', slides: job });

  /* ---------- Part 4: The PCR and the debrief ---------- */
  var debrief = panel('Debrief'), vars = panel('Scenario variations');
  var reflect = boxIn(debrief, 'Reflective questions'), take = boxIn(debrief, 'Take-home messages');
  DRIVE_SECTIONS.push({
    id: 'pcr', name: 'Part 4', title: 'The PCR and the debrief', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'qr', kicker: 'PCR trainer', title: 'Write Kevin\'s patient report card', url: '/tools/pcr/#job=kevin',
        text: 'Scan the code and write the card for the job you just ran.',
        points: ['Tap any underlined heading to see what goes there', 'Write the normal findings too', 'Each GTN dose with its time and who advised it, and the PDE-5 answer'],
        notes: { time: 10, say: ['On your own or in your crew pairs. About 10 minutes.'], tip: 'The work saves on each phone. Students need to be signed in.' } },
      { type: 'qr', kicker: 'PCR trainer', title: 'Compare with the model card', url: '/tools/pcr/#job=kevin', button: 'Open Kevin\'s card on the big screen',
        text: 'On the big screen, tap "Show model card" and go through it together.',
        points: ['What did you leave out?', 'Are both GTN sprays there, with times?', 'Did you show the trend: SpO2, RR and BP?'],
        notes: { time: 5, tip: 'The model card is DSY-written (owner to review).' } },
      { type: 'bullets', kicker: 'Debrief', title: reflect.title, points: reflect.items, notes: { time: 6, say: ['Pick three or four of these. Let the crew answer first.'] } },
      { type: 'bullets', kicker: 'Debrief', title: take.title, points: take.items, notes: { time: 2 } },
      { type: 'cards', kicker: 'If you have time', title: 'Scenario variations', cols: vars.blocks.length > 4 ? 3 : 2,
        items: vars.blocks.map(function (b) { return { h: b.box.title }; }),
        notes: { time: 1, say: vars.blocks.map(function (b) { return b.box.title + ': ' + b.box.text; }), tip: 'Run one variation as a quick talk-through if time allows.' } }
    ]
  });

  /* ---------- Part 5: Next week ---------- */
  DRIVE_SECTIONS.push({
    id: 'next', name: 'Part 5', title: 'Next week', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'qr', kicker: 'Next week', title: 'Chest pain and ACPO skills stations', url: '/stations/chest-pain-acpo/',
        text: 'Hands-on practice of what came up tonight. The team can run the stations without the instructor.',
        points: ['1 Aspirin and GTN', '2 The ECG and SpO2 on the Corpuls', '3 Oxygen: how much, and how', '4 Sit them up, listen, and move them'],
        notes: { time: 1, tip: 'Facilitators: the instructor setup sheet and print pack are on the stations page (#setup, #print).' } },
      { type: 'qr', kicker: 'Before next week', title: 'Revise on your own', url: '/microlearning/acpo/',
        text: 'The ACPO module: the video again, the GTN checker and the knowledge check.',
        points: ['Learn on your own on dsytraining.com also has Kevin\'s walk-through and the MDT drill'],
        notes: { time: 1 } }
    ]
  });
})();
