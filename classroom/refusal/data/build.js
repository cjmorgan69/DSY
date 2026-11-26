// Refusal against advice case night: builds the slide sections from the refusal microlearning module (RF_ML) and
// Sam's walk-through (RF_WT). Clinical wording all comes from those two files. The slide order, section titles, MDT
// screenshot captions, the "Tonight" and "Next week" slides and the short presenter cues below are DSY-written
// (owner to review). Same layout as /classroom/acpo/data/build.js; Sam is not transported, so the MDT screens stop on
// scene and the job ends with "Clear, and the PCR" instead of a handover.
(function () {
  var ML = window.RF_ML, WT = window.RF_WT;
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
  function boxSlide(bx, kicker) {
    var notes = { time: 1 };
    if (bx.check) { notes.ask = [bx.check.q]; notes.say = ['Answer: ' + bx.check.a]; }
    if (bx.tiles) return { type: 'cards', kicker: kicker, title: bx.title, cols: 3, items: bx.steps.map(function (x) { return { h: x.t, t: x.text }; }), notes: { time: 2 } };
    if (bx.steps) return { type: 'numbered', kicker: kicker, title: bx.title, items: bx.steps.map(step), notes: notes };
    return { type: 'bullets', kicker: kicker, title: bx.title, points: bx.items, notes: notes };
  }

  /* ---------- Part 1: Welcome ---------- */
  var overview = panel('Overview'), prebrief = panel('Pre-brief: the AO refusal protocol');
  var objectives = boxIn(overview, 'Learning objectives'), roles = boxIn(overview, 'Crew roles');
  DRIVE_SECTIONS.push({
    id: 'welcome', name: 'Part 1', title: 'Welcome', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'title', title: 'Refusal against advice', subtitle: 'Case night: Sam, 38', lines: ['The protocol and VIRCA, the walk-through with the MDT screens, then the PCR', WT.protocol.code + ' ' + WT.protocol.name + ' ' + WT.protocol.version],
        notes: { time: 2, say: ['Welcome. Tonight is one job from start to finish: a patient who says no, twice, for different reasons.'],
          tip: DSY + ' Before the night: check the projector shows the QR codes clearly, and everyone has signed in to dsytraining.com on their phone (the PCR page asks for a sign-in).' } },
      { type: 'numbered', title: 'Tonight', items: [
          'The protocol: valid or not, VIRCA, the three pathways, who can decide',
          'The job: Sam, 38, a type 1 diabetic who tells you to get out. Seven break points, with the MDT screens at the start',
          'Write the patient report card (PCR) for a patient treated and not transported, and compare it with the model card',
          'Next week: the refusal skills stations'],
        notes: { time: 1, tip: 'DSY-written overview. The skills stations are a separate session, as for the other case nights.' } },
      { type: 'bullets', title: objectives.title, points: objectives.items, notes: { time: 2, tip: 'Learning objectives from the walk-through.' } },
      { type: 'cards', title: roles.title, cols: 2, items: roles.items.map(split), notes: { time: 1, say: ['Pick a Clinician and a Driver for the night, or swap at each break point.'] } }
    ]
  });

  /* ---------- Part 2: The protocol (from the module) ---------- */
  var intro = panelIn(ML, 'Introduction'), tests = panelIn(ML, 'Valid or not? The two tests'), virca = panelIn(ML, 'The VIRCA tool (CTL-126)'),
      paths = panelIn(ML, 'The protocol: three pathways'), who = panelIn(ML, 'When the patient can\'t decide: who can?');
  var kick = 'The protocol (' + ML.protocol.code + ')';
  var protoSlides = [];
  var video = intro.blocks.filter(function (b) { return b.video; })[0];
  if (video && video.video.src) protoSlides.push({ type: 'mp4', title: video.video.title, length: '3 min', src: '/microlearning/refusal/' + video.video.src, poster: '/microlearning/refusal/' + video.video.poster,
    notes: { time: 4, say: ['Watch the whole video, then we go through the protocol together.'] } });
  var introText = intro.blocks.filter(function (b) { return b.text; }).map(function (b) { return b.text; });
  protoSlides.push({ type: 'statement', kicker: 'In short', text: introText[1] || introText[0], sub: introText[0], notes: { time: 1, ask: ['What does "care" cover in this protocol?'], say: ['Assessment, treatment and transport: any or all of them.'] } });
  intro.blocks.forEach(function (b) { if (b.box) protoSlides.push(boxSlide(b.box, kick)); });
  var two = tests.blocks.filter(function (b) { return b.steps; })[0];
  if (two) protoSlides.push({ type: 'numbered', kicker: kick, title: 'A valid refusal needs both', items: two.steps.map(step), notes: { time: 1 } });
  tests.blocks.forEach(function (b) { if (b.box) protoSlides.push(boxSlide(b.box, kick)); });
  virca.blocks.forEach(function (b) {
    if (b.table) protoSlides.push(tableSlide(b.table, { kicker: 'CTL-126', notes: { time: 3, activity: 'Go round the room: each person says one letter and what it means.' } }));
    else if (b.box) protoSlides.push(boxSlide(b.box, 'CTL-126'));
  });
  paths.blocks.forEach(function (b) {
    if (b.steps) protoSlides.push({ type: 'numbered', kicker: kick, title: 'Every refusal', items: b.steps.map(step), notes: { time: 1 } });
    else if (b.chooser) b.chooser.options.forEach(function (o) {
      var secs = b.chooser.data[o.value].sections;
      protoSlides.push({ type: 'bullets', kicker: kick, title: o.label, points: [].concat.apply([], secs.map(function (s) { return [s.title + ':'].concat(s.items); })), notes: { time: 2 } });
    });
    else if (b.box) protoSlides.push(boxSlide(b.box, kick));
  });
  who.blocks.forEach(function (b) {
    if (b.steps) protoSlides.push({ type: 'numbered', kicker: 'CTL-067', title: 'Consent for adults: who decides?', items: b.steps.map(step), notes: { time: 2 } });
    else if (b.box) protoSlides.push(boxSlide(b.box, 'CTL-067'));
  });
  var general = boxIn(prebrief, 'General teaching (not in the protocol)');
  protoSlides.push({ type: 'bullets', kicker: 'Background', title: general.title, points: general.items, notes: { time: 2 } });
  DRIVE_SECTIONS.push({ id: 'protocol', name: 'Part 2', title: 'The protocol', audience: 'Volunteer Ambulance Officers', slides: protoSlides });

  /* ---------- Part 3: The job (walk-through break points, MDT screenshots) ---------- */
  var order = WT.panels.map(function (p) { return p.title; });
  var jobPanels = order.slice(order.indexOf('Dispatch and en route'), order.indexOf('Clear, and the PCR') + 1);
  // MDT screenshots (img/mdt-*.png, taken by /classroom/case-night/tools/mdt-shots.js refusal with the walk-through's times).
  function shot(n, title, points, say) {
    return { type: 'image', kicker: 'The MDT', title: title, img: 'img/mdt-' + n + '.png', alt: 'MDT screen: ' + title, points: points, fs: 38, wide: true,
      notes: { time: 1, say: say ? [say] : [], tip: 'Screenshot of the DSY MDT simulator (fictional data). Students can drill the same job later from Learn on your own.' } };
  }
  var mdtAt = {
    dispatch: [
      shot('1-dispatch', '0948: the job arrives', ['Priority 2, altered conscious state, Tumby Bay', 'Tap Ack'], 'What does the MDT tell you before you even leave the station?'),
      shot('2-enroute', '0949: Enroute', ['F6 sends ENROUTE (no confirm)', 'The status bar shows what the EOC sees', 'The F6 button now offers Time Scene'], ''),
      shot('3-remarks', 'The remarks keep coming', ['0950: his meter says 2.3; he went for a run', '0952: he doesn\'t want an ambulance', 'Newest at the top: check the REMARKS tab on the way'], 'He doesn\'t want an ambulance. Does that change your plan?')
    ],
    arrival: [shot('4-confirm-scene', '0955: Time Scene', ['F6, then Confirm', 'Press it when you arrive, not when you reach the patient'], '')]
  };
  var nBP = 0, totalBP = 0;
  jobPanels.forEach(function (t) { panel(t).blocks.forEach(function (b) { if (b.breakpoint) totalBP++; }); });

  var job = [];
  jobPanels.forEach(function (title, pi) {
    var p = panel(title), first = job.length;
    p.blocks.forEach(function (b) {
      if (b.text) {
        job.push({ type: 'statement', kicker: b.muted ? 'In the scenario' : title, text: b.text, notes: b.muted && /EOC Clinician/.test(b.text) ? { time: 1, tip: 'The EOC Clinician replies are written by DSY for the scenario.' } : { time: 1 } });
      } else if (b.box && b.box.text) {
        job.push({ type: 'statement', kicker: b.box.title, text: b.box.text, notes: { time: 2 } });
      } else if (b.box) {
        job.push({ type: 'bullets', kicker: title, title: b.box.title, points: b.box.items, notes: { time: 1 } });
        if (b.box.title === 'MDT display') job = job.concat(mdtAt.dispatch);
      } else if (b.table) {
        job.push(tableSlide(b.table, { kicker: title, notes: { time: 1 } }));
      } else if (b.breakpoint) {
        var bp = b.breakpoint; nBP++;
        var tip = [bp.teachingNote, (bp.cards || []).map(function (c) { return 'Quick question: ' + c.q + ' (' + c.a + ')'; }).join(' ')].filter(Boolean).join(' ');
        var n = { time: 4, listen: bp.expected, teach: bp.teaching, real: bp.realJob, tip: tip };
        if (bp.title === 'The EOC Clinician call') n.activity = 'In pairs: one makes the call, the other plays the EOC Clinician and repeats the advice back. Swap.';
        job.push({ type: 'prompts', kicker: 'Break point ' + nBP + ' of ' + totalBP + ' · ' + bp.type, title: bp.title, prompts: bp.prompts, notes: n });
        (bp.decisions || []).forEach(function (d) {
          job.push({ type: 'decision', kicker: 'Decision · break point ' + nBP, q: d.q, options: d.options, answer: d.answer, why: d.why,
            notes: { time: 1, say: ['Everyone picks A, B or C (hands up or fingers). Then click to show the answer.'] } });
        });
      }
    });
    if (pi === 1) job.splice(first, 0, mdtAt.arrival[0]);                 // the panel after dispatch: arrival
  });
  job.unshift({ type: 'bullets', title: 'Before we start', points: ['This is a walk-through: we pause at each break point to talk it through', 'Vote on each decision before the answer shows', 'Anyone can call "real world" to stop for a genuine safety concern'],
    notes: { time: 1, tip: 'DSY-written (the walk-through has no safety brief box).' } });
  DRIVE_SECTIONS.push({ id: 'job', name: 'Part 3', title: 'The job: Sam, 38', audience: 'Volunteer Ambulance Officers', slides: job });

  /* ---------- Part 4: The PCR and the debrief ---------- */
  var debrief = panel('Debrief'), vars = panel('Scenario variations');
  var reflect = boxIn(debrief, 'Reflective questions'), take = boxIn(debrief, 'Take-home messages');
  DRIVE_SECTIONS.push({
    id: 'pcr', name: 'Part 4', title: 'The PCR and the debrief', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'qr', kicker: 'PCR trainer', title: 'Write Sam\'s patient report card', url: '/tools/pcr/#job=sam',
        text: 'Scan the code and write the card for the job you just ran. Sam was treated and not transported.',
        points: ['Tap any underlined heading to see what goes there', 'Both refusals: the invalid one at 0955 and the valid one at 1020', 'The Recommendation box is his referral plan: what to do and when to call again'],
        notes: { time: 10, say: ['On your own or in your crew pairs. About 10 minutes.'], tip: 'The work saves on each phone. Students need to be signed in. The trainer also has a case card for Sam.' } },
      { type: 'qr', kicker: 'PCR trainer', title: 'Compare with the model card', url: '/tools/pcr/#job=sam', button: 'Open Sam\'s card on the big screen',
        text: 'On the big screen, tap "Show model card" and go through it together.',
        points: ['Is every VIRCA letter there, and specific?', 'Both EOC Clinician consults, with times?', 'Did you write "nil restraint" and who consented for him at 0958?'],
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
      { type: 'qr', kicker: 'Next week', title: 'Refusal against advice skills stations', url: '/stations/refusal/',
        text: 'Practice of the conversations and decisions from tonight. The team can run the stations without the instructor.',
        points: ['1 VIRCA: valid or not?', '2 The capacity conversation', '3 Who decides? Consent and the three pathways', '4 The call, the AMA form and the PCR'],
        notes: { time: 1, tip: 'Facilitators: the instructor setup sheet and print pack are on the stations page (#setup, #print).' } },
      { type: 'qr', kicker: 'Before next week', title: 'Revise on your own', url: '/microlearning/refusal/',
        text: 'The refusal module: VIRCA, the "Which pathway?" checker and the knowledge check.',
        points: ['Learn on your own on dsytraining.com also has Sam\'s walk-through and the MDT drill'],
        notes: { time: 1 } },
      { type: 'qr', kicker: 'Before you go', title: 'Tell us what you thought', url: '/feedback/?t=refusal&from=slides',
        text: 'Two minutes on your phone. Your name is optional.',
        points: ['Rate the night overall', 'Tick the parts you want to comment on: slides, walk-through, MDT, PCR trainer, microlearning', 'What worked, and what should we change'],
        notes: { time: 2, tip: 'Leave this up while people pack up. Facilitators can read the replies on Run a session (Feedback).' } }
    ]
  });
})();
