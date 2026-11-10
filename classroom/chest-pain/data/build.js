// Chest pain case night: builds the slide sections from the microlearning module (CP_ML) and Graham's walk-through
// (CP_WT). Clinical wording all comes from those two files. The slide order, section titles, MDT cues, the
// "Tonight" and "Next week" slides and the short presenter cues below are DSY-written (owner to review).
(function () {
  var ML = window.CP_ML, WT = window.CP_WT;
  if (!ML || !WT) return;
  var DSY = 'Slide order and presenter cues are DSY-written for review. The clinical content comes from the module and the walk-through.';

  function panel(title) {
    for (var i = 0; i < WT.panels.length; i++) if (WT.panels[i].title === title) return WT.panels[i];
    return { blocks: [] };
  }
  function boxIn(p, title) {
    var b = p.blocks.filter(function (x) { return x.box && x.box.title === title; })[0];
    return b ? b.box : null;
  }
  function step(t) { return t.text ? { h: t.t, t: t.text } : t.t; }
  // "Clinician (AO1): patient contact..." -> { h: "Clinician (AO1)", t: "patient contact..." }
  function split(x) { var k = x.indexOf(': '); return k > 0 ? { h: x.slice(0, k), t: x.slice(k + 2) } : { h: x }; }
  // A one-row table reads better turned on its side (one observation per line).
  function tableSlide(tb, extra) {
    var t = tb.table, s = { type: 'table', title: tb.title, noStep: true, fs: 34 };
    if (t.rows.length === 1 && t.head.length > 4) { s.head = ['Observation', 'Value']; s.rows = t.head.map(function (h, i) { return [h, t.rows[0][i]]; }); s.fs = 40; }
    else { s.head = t.head; s.rows = t.rows; }
    for (var k in extra) s[k] = extra[k];
    return s;
  }

  /* ---------- Part 1: Welcome ---------- */
  var overview = panel('Overview'), prebrief = panel('Pre-brief: the AO chest pain protocol');
  var objectives = boxIn(overview, 'Learning objectives'), roles = boxIn(overview, 'Crew roles');
  DRIVE_SECTIONS.push({
    id: 'welcome', name: 'Part 1', title: 'Welcome', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'title', title: 'Chest pain', subtitle: 'Case night: Graham, 62', lines: ['The intro video, a walk-through with the MDT, then the PCR', WT.protocol.code + ' ' + WT.protocol.name + ' ' + WT.protocol.version],
        notes: { time: 2, say: ['Welcome. Tonight is one job from start to finish: the video, the walk-through, the MDT on your phones, then the patient report card.'],
          tip: DSY + ' Before the night: check the video plays with sound, the projector shows the QR codes clearly, and everyone has signed in to dsytraining.com on their phone (the MDT and PCR pages ask for a sign-in).' } },
      { type: 'numbered', title: 'Tonight', items: [
          'Intro video and the protocol key points',
          'The job: Graham, 62, chest pain. Eight break points, with the MDT running on your phones',
          'Write the patient report card (PCR) and compare it with the model card',
          'Next week: the chest pain and ACPO skills stations'],
        notes: { time: 1, tip: 'DSY-written overview. The skills stations are a separate session (owner, 10 Nov 2026).' } },
      { type: 'bullets', title: objectives.title, points: objectives.items, notes: { time: 2, tip: 'Learning objectives from the walk-through.' } },
      { type: 'cards', title: roles.title, cols: 2, items: roles.items.map(split), notes: { time: 1, say: ['Pick a Clinician and a Driver for the night, or swap at each break point.'] } }
    ]
  });

  /* ---------- Part 2: The protocol (video and key points) ---------- */
  var kp = ML.keyPoints.map(function (k) {
    var s, notes = { time: 1 };
    if (k.check) { notes.ask = [k.check.q]; notes.say = ['Answer: ' + k.check.a]; }
    if (k.steps) s = { type: 'numbered', title: k.title, items: k.steps.map(step) };
    else if (k.items) s = { type: 'bullets', title: k.title, points: k.items, callout: k.note ? { head: 'Note', text: k.note } : null };
    else s = { type: 'statement', kicker: k.title, text: k.text };
    if (!s.callout) delete s.callout;
    s.kicker = s.kicker || 'Key points (' + ML.protocol.code + ')';
    s.notes = notes;
    return s;
  });
  var gtnTable = prebrief.blocks.filter(function (b) { return b.table; })[0];
  var consult = boxIn(prebrief, 'Consult the EOC Clinician if'), lead = boxIn(prebrief, 'DSY lead instructor guidance (not protocol text)');
  var general = boxIn(prebrief, 'General teaching (not in the protocol)');
  DRIVE_SECTIONS.push({
    id: 'protocol', name: 'Part 2', title: 'The protocol', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'mp4', title: ML.video.title, length: '3 min', src: '/microlearning/chest-pain/' + ML.video.src, poster: '/microlearning/chest-pain/' + ML.video.poster,
        notes: { time: 4, say: ['Watch the whole video, then we go through the key points together.'], tip: 'The narrated intro video from the chest pain microlearning module.' } }
    ].concat(kp).concat([
      tableSlide(gtnTable.table, { kicker: 'Pre-brief (' + WT.protocol.code + ')', notes: { time: 2, ask: ['Exactly 100 mmHg: who can have GTN, and who cannot?'] } }),
      { type: 'bullets', kicker: 'Pre-brief (' + WT.protocol.code + ')', title: consult.title, points: consult.items, notes: { time: 1 } },
      { type: 'bullets', kicker: 'Local guidance', title: 'DSY lead instructor guidance', points: lead.items, callout: { head: 'Not protocol text', text: 'These three points are the lead instructor\'s local guidance.' }, notes: { time: 2 } },
      { type: 'bullets', kicker: 'Local guidance', title: general.title, points: general.items, notes: { time: 1 } }
    ])
  });

  /* ---------- Part 3: The job (walk-through break points, MDT on phones) ---------- */
  var jobPanels = ['Dispatch and en route', 'On arrival', 'Patient contact and primary survey', 'Working diagnosis and the protocol', 'Treatment phase', 'Reassessment and escalation', 'Extrication and transport', 'Handover'];
  var mdtCue = { 'Dispatch and en route': 'Ack, then Enroute', 'On arrival': 'Time Scene', 'Extrication and transport': 'Mobile: pick the destination', 'Handover': 'Arrive Dest, then Clear' };
  var nBP = 0, totalBP = 0;
  jobPanels.forEach(function (t) { panel(t).blocks.forEach(function (b) { if (b.breakpoint) totalBP++; }); });

  var job = [], safety = boxIn(prebrief, 'Safety brief');
  job.push({ type: 'bullets', title: safety.title, points: safety.items, notes: { time: 1, say: ['Pause at each break point. Talk it through, vote on the decision, then move on.'] } });

  jobPanels.forEach(function (title) {
    var p = panel(title), first = job.length;
    p.blocks.forEach(function (b) {
      if (b.text) {
        job.push({ type: 'statement', kicker: b.muted ? 'In the scenario' : title, text: b.text, notes: { time: 1, tip: b.muted ? 'The EOC Clinician replies are written by DSY for the scenario.' : '' } });
      } else if (b.box && b.box.tiles) {
        job.push({ type: 'cards', kicker: title, title: b.box.title, cols: 3, items: b.box.steps.map(function (x) { return { h: x.t, t: x.text }; }), notes: { time: 2 } });
      } else if (b.box && b.box.text) {
        job.push({ type: 'statement', kicker: b.box.title, text: b.box.text, notes: { time: 2, activity: 'In pairs: one makes the call, the other plays the EOC Clinician and repeats the advice back. Swap.' } });
      } else if (b.box) {
        job.push({ type: 'bullets', kicker: title, title: b.box.title, points: b.box.items, notes: { time: 1 } });
        if (b.box.title === 'MDT display') {
          job.push({ type: 'qr', kicker: 'MDT on your phone', title: 'Run the job on the MDT', url: '/mdt/#job=chest-pain&self=1', button: 'Show the MDT on the big screen',
            text: 'Scan the code. Graham\'s job is dispatched to you.',
            points: ['Ack, then Enroute now', 'Read the remarks as they come in', 'Keep it open: the slides tell you when to press the next status'],
            notes: { time: 3, say: ['Scan the code and keep the MDT open on your phone for the whole job.'],
              tip: 'The simulator clock runs 3 times faster, so the live remarks (wife: pain unchanged, pale and sweaty; gate open, wife waiting at the door) arrive during the en-route discussion. Students need to be signed in.' } });
        }
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
    if (mdtCue[title] && job[first]) job[first].mdt = mdtCue[title];
  });
  DRIVE_SECTIONS.push({ id: 'job', name: 'Part 3', title: 'The job: ' + WT.headline.split(':')[0], audience: 'Volunteer Ambulance Officers', slides: job });

  /* ---------- Part 4: The PCR and the debrief ---------- */
  var debrief = panel('Debrief'), vars = panel('Scenario variations');
  var reflect = boxIn(debrief, 'Reflective questions'), take = boxIn(debrief, 'Take-home messages');
  DRIVE_SECTIONS.push({
    id: 'pcr', name: 'Part 4', title: 'The PCR and the debrief', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'qr', kicker: 'PCR trainer', title: 'Write Graham\'s patient report card', url: '/tools/pcr/#job=graham',
        text: 'Scan the code and write the card for the job you just ran.',
        points: ['Tap any underlined heading to see what goes there', 'Write the normal findings too ("nil resp distress")', 'Every GTN dose, his own included, with times'],
        notes: { time: 10, say: ['On your own or in your crew pairs. About 10 minutes.'], tip: 'The work saves on each phone. Students need to be signed in.' } },
      { type: 'qr', kicker: 'PCR trainer', title: 'Compare with the model card', url: '/tools/pcr/#job=graham', button: 'Open Graham\'s card on the big screen',
        text: 'On the big screen, tap "Show model card" and go through it together.',
        points: ['What did you leave out?', 'Is the GTN count right?', 'Did you give trends, not just numbers?'],
        notes: { time: 5, tip: 'The model card is DSY-written (owner to review).' } },
      { type: 'bullets', kicker: 'Debrief', title: reflect.title, points: reflect.items, notes: { time: 6, say: ['Pick three or four of these. Let the crew answer first.'] } },
      { type: 'bullets', kicker: 'Debrief', title: take.title, points: take.items, notes: { time: 2 } },
      { type: 'cards', kicker: 'If you have time', title: 'Scenario variations', cols: 2,
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
      { type: 'qr', kicker: 'Before next week', title: 'Revise on your own', url: '/microlearning/chest-pain/',
        text: 'The chest pain module: the video again, the GTN checker and the knowledge check.',
        points: ['Learn on your own on dsytraining.com also has Graham\'s walk-through and the MDT drill'],
        notes: { time: 1 } }
    ]
  });
})();
