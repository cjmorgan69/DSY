(function () {
  var D = window.DRIVE, E = D.esc;
  var ART = !!window.ARTIFACT;
  var slides = D.flat();
  var stage = document.getElementById('stage');
  var cur = 0, step = 0, maxStep = 0, presenter = null, idleT;
  var revealAll = /[?&]reveal=1/.test(location.search);

  /* ---------- slide renderers ---------- */
  function pts(arr, stepped, base) {
    var n = base || 0;
    return '<ul class="points">' + (arr || []).map(function (p) {
      var t = typeof p === 'string' ? p : p.t, sub = typeof p === 'string' ? '' : p.sub;
      n++;
      return '<li' + (stepped ? ' class="step" data-step="' + n + '"' : '') + '>' + E(t) +
        (sub && sub.length ? '<ul>' + sub.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul>' : '') + '</li>';
    }).join('') + '</ul>';
  }
  function callout(c) {
    return '<div class="callout">' + (c.head ? '<h3>' + E(c.head) + '</h3>' : '') + '<p>' + E(c.text) + '</p></div>';
  }
  function lab(it) { return '<div class="lab">DRiVE  |  Section ' + it.sec.number + ': ' + E(it.sec.title) + '</div>'; }

  var R = {
    title: function (s, it) {
      return '<div class="slide dark title"><div class="ring"></div><h1 class="t">' + E(s.title) + '</h1><div class="sub">' + E(s.subtitle) + '</div>' +
        (s.lines || []).map(function (l) { return '<div class="ln">' + E(l) + '</div>'; }).join('') + '</div>';
    },
    statement: function (s, it) {
      return '<div class="slide dark statement">' + (s.kicker ? '<div class="kicker">' + E(s.kicker) + '</div>' : '') +
        '<div class="body" style="--fs:80px"><div class="big" style="font-size:1em">' + E(s.text) + '</div>' +
        (s.sub ? '<div class="st" style="font-size:.55em">' + E(s.sub) + '</div>' : '') + '</div>' + lab(it) + '</div>';
    },
    bullets: function (s, it) {
      var has = !!s.callout;
      return '<div class="slide light"><h1 class="t">' + E(s.title) + '</h1><div class="body"><div class="cols' + (has ? ' has-callout' : '') + '">' +
        '<div>' + pts(s.points, true) + '</div>' + (has ? callout(s.callout).replace('class="callout"', 'class="callout step" data-step="' + (s.points.length + 1) + '"') : '') +
        '</div></div>' + lab(it) + '</div>';
    },
    compare: function (s, it) {
      function pane(p, cls, st) {
        return '<div class="pane ' + cls + ' step" data-step="' + st + '"><h3>' + E(p.head) + '</h3>' + pts(p.points) + '</div>';
      }
      return '<div class="slide light"><h1 class="t">' + E(s.title) + '</h1><div class="body"><div class="compare">' +
        pane(s.left, 'l', 1) + pane(s.right, 'r', 2) + '</div>' +
        (s.callout ? '<div class="callout-band step" data-step="3">' + E(s.callout.text) + '</div>' : '') + '</div>' + lab(it) + '</div>';
    },
    cards: function (s, it) {
      var cols = s.cols || 3, v = s.variant || 'plain';
      return '<div class="slide light"><h1 class="t">' + E(s.title) + '</h1><div class="body"><div class="grid ' + v + '" style="grid-template-columns:repeat(' + cols + ',1fr)">' +
        s.items.map(function (c, i) {
          var badge = v === 'number' ? '<div class="bd">' + (i + 1) + '</div>' : v === 'check' ? '<div class="bd">&#10003;</div>' : '';
          return '<div class="card step" data-step="' + (i + 1) + '">' + badge + '<div>' + E(c.h) + '</div>' + (c.t ? '<div class="tx">' + E(c.t) + '</div>' : '') + '</div>';
        }).join('') + '</div></div>' + lab(it) + '</div>';
    },
    numbered: function (s, it) {
      return '<div class="slide light"><h1 class="t">' + E(s.title) + '</h1><div class="body"><div class="nums">' +
        s.items.map(function (t, i) {
          return '<div class="num step" data-step="' + (i + 1) + '"><div class="bd">' + (i + 1) + '</div><div>' + E(t) + '</div></div>';
        }).join('') + '</div></div>' + lab(it) + '</div>';
    },
    scale: function (s, it) {
      return '<div class="slide light"><h1 class="t">' + E(s.title) + '</h1><div class="body"><div class="intro">' + E(s.intro) + '</div><div class="scale">' +
        s.items.map(function (t, i) {
          var n = i + 1, col = n <= 3 ? '#b5503c' : n <= 7 ? '#8a7a1f' : '#00604a';
          return '<div class="chip"><div class="bd" style="background:' + col + '">' + n + '</div><div><span class="pre">I think I am a</span>' + E(t) + '</div></div>';
        }).join('') + '</div></div>' + lab(it) + '</div>';
    },
    video: function (s, it) {
      var v = s.vimeo;
      if (ART) {
        return '<div class="slide dark video"><div class="vhead"><h1 class="t">' + E(s.title) + '</h1>' + (v.length ? '<div class="vbadge">&#9654; ' + E(v.length) + '</div>' : '') + '</div>' +
          '<div class="vpanel"><div class="vplay">&#9654;</div><a class="vbtn" href="' + D.vimeoUrl(v) + '" target="_blank" rel="noopener">Watch on Vimeo</a>' +
          '<div class="vnote">Opens in a new tab. Come back here and press the right arrow to continue.</div></div></div>';
      }
      return '<div class="slide dark video"><div class="vhead"><h1 class="t">' + E(s.title) + '</h1>' + (v.length ? '<div class="vbadge">&#9654; ' + E(v.length) + '</div>' : '') + '</div>' +
        '<div class="vframe"><iframe src="' + D.vimeoEmbed(v) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + E(s.title) + '"></iframe></div>' +
        '<div class="vlink">Video not playing? <a href="' + D.vimeoUrl(v) + '" target="_blank" rel="noopener">Open it on Vimeo</a>. Click outside the video to use the arrow keys again.</div></div>';
    },
    mantra: function (s, it) {
      var lights = s.lights.map(function (l, i) { return '<div class="tl ' + l.color + ' soft" data-light="' + (i + 1) + '"></div>'; }).join('');
      var panels = '<div class="mpanel ring on" data-only="0"><h2>' + E(s.ring.head) + '</h2><div>' + E(s.ring.text) + '</div></div>' +
        s.lights.map(function (l, i) {
          return '<div class="mpanel" data-only="' + (i + 1) + '"><h2><span class="dot ' + l.color + '"></span>' + E(l.name) + '</h2><div>' + E(l.text) + '</div></div>';
        }).join('');
      return '<div class="slide light"><h1 class="t">' + E(s.title) + '</h1><div class="body" style="--fs:44px"><div class="mantra"><div class="lightbox">' + lights + '</div><div>' + panels + '</div></div></div>' + lab(it) + '</div>';
    }
  };

  /* ---------- rendering / fitting ---------- */
  function fit() {
    var b = stage.querySelector('.body');
    if (!b) return;
    var fs = parseFloat(getComputedStyle(b).getPropertyValue('--fs')) || 44;
    function over() {
      if (b.scrollHeight > b.clientHeight + 2) return true;
      var bx = b.querySelectorAll('.card, .num, .chip, .pane, .callout');
      for (var q = 0; q < bx.length; q++) if (bx[q].scrollHeight > bx[q].clientHeight + 2) return true;
      return false;
    }
    while (over() && fs > 26) { fs -= 2; b.style.setProperty('--fs', fs + 'px'); }
  }
  function scaleStage() {
    var v = document.getElementById('viewport');
    var k = Math.min(v.clientWidth / 1920, v.clientHeight / 1080);
    stage.style.transform = 'translate(-50%,-50%) scale(' + k + ')';
  }
  function applyStep() {
    var st = revealAll ? 9999 : step;
    var els = stage.querySelectorAll('[data-step]');
    for (var i = 0; i < els.length; i++) els[i].classList.toggle('on', +els[i].getAttribute('data-step') <= st);
    var only = stage.querySelectorAll('[data-only]');
    for (var j = 0; j < only.length; j++) only[j].classList.toggle('on', +only[j].getAttribute('data-only') === step);
    var ls = stage.querySelectorAll('[data-light]');
    for (var k = 0; k < ls.length; k++) {
      var n = +ls[k].getAttribute('data-light');
      ls[k].classList.toggle('lit', step === n);
      ls[k].classList.toggle('soft', step === 0);
    }
  }
  function computeMax() {
    var m = 0;
    stage.querySelectorAll('[data-step]').forEach(function (e) { m = Math.max(m, +e.getAttribute('data-step')); });
    stage.querySelectorAll('[data-only]').forEach(function (e) { m = Math.max(m, +e.getAttribute('data-only')); });
    return m;
  }

  function show(i, st) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    var it = slides[cur];
    stage.innerHTML = (R[it.s.type] || R.bullets)(it.s, it);
    maxStep = computeMax();
    step = st === 'end' ? maxStep : (st || 0);
    // start with all bullets visible except the first reveal on slides that have steps
    applyStep();
    fit();
    // notes
    document.getElementById('notes').innerHTML = '<h3>' + E(D.title(it.s)) + '</h3><div class="nsec">Section ' + it.sec.number + ' · slide ' + it.n + ' of ' + it.sec.slides.length + '</div>' + D.notesHTML(it.s);
    document.getElementById('notes').scrollTop = 0;
    // chrome
    document.getElementById('count').textContent = 'Section ' + it.sec.number + ' · ' + it.n + ' / ' + it.sec.slides.length;
    document.getElementById('progress').style.width = ((cur + 1) / slides.length * 100) + '%';
    document.title = 'DRiVE: ' + D.title(it.s);
    if (!ART) history.replaceState(null, '', '#' + it.sec.id + '/' + it.n);
    var links = document.querySelectorAll('#menu a');
    links.forEach(function (a, idx) { a.classList.toggle('cur', idx === cur); });
    sync();
  }
  function setStep(n) { step = n; applyStep(); sync(); }

  function next() { if (step < maxStep) setStep(step + 1); else if (cur < slides.length - 1) show(cur + 1, 0); }
  function prev() { if (step > 0) setStep(step - 1); else if (cur > 0) show(cur - 1, 'end'); }

  /* ---------- presenter window sync ---------- */
  function sync() {
    if (presenter && !presenter.closed) {
      presenter.postMessage({ type: 'state', g: cur, step: step, maxStep: maxStep }, '*');
    }
  }
  window.addEventListener('message', function (e) {
    var m = e.data || {};
    if (m.type === 'hello') sync();
    else if (m.type === 'nav') { if (m.dir > 0) next(); else prev(); }
  });
  function openPresenter() {
    presenter = window.open('presenter.html', 'drivePresenter', 'width=1180,height=780');
    setTimeout(sync, 800);
  }

  /* ---------- menu ---------- */
  var menu = document.getElementById('menu'), mh = '', lastSec = -1;
  slides.forEach(function (it, idx) {
    if (it.si !== lastSec) { lastSec = it.si; mh += '<h3>Section ' + it.sec.number + ': ' + E(it.sec.title) + '</h3>'; }
    mh += '<a href="#' + it.sec.id + '/' + it.n + '" data-g="' + idx + '"><span class="n">' + it.n + '</span><span>' + E(D.title(it.s)) + (it.s.vimeo ? ' <span class="v">&#9654;</span>' : '') + '</span></a>';
  });
  menu.innerHTML = mh;
  menu.addEventListener('click', function (e) {
    var a = e.target.closest('a'); if (!a) return;
    e.preventDefault(); show(+a.getAttribute('data-g'), 0); document.body.classList.remove('menu-on');
  });


  /* ---------- guide overlay (in-page) ---------- */
  function guideHTML() {
    var h = '<button class="gclose" id="gClose">Close guide (Esc)</button><h1>DRiVE facilitator guide</h1><p class="small">Slide-by-slide notes. Times are suggestions only.</p>';
    D.sections.forEach(function (sec) {
      var total = 0; sec.slides.forEach(function (s) { total += (s.notes && s.notes.time) || 0; });
      h += '<h2>Section ' + sec.number + ': ' + E(sec.title) + '</h2><p class="small">' + sec.slides.length + ' slides · suggested time about ' + total + ' min</p>';
      sec.slides.forEach(function (s, i) {
        var n = s.notes || {};
        h += '<div class="gslide"><h3>Slide ' + (i + 1) + ': ' + E(D.title(s)) + (n.time ? ' <span class="gtag">' + n.time + ' min</span>' : '') + '</h3>';
        if (n.say && n.say.length) h += '<h4>Say</h4><ul>' + n.say.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul>';
        if (n.ask && n.ask.length) h += '<h4>Ask the group</h4><ul>' + n.ask.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul>';
        if (n.activity) h += '<p class="gbox"><strong>Activity:</strong> ' + E(n.activity) + '</p>';
        if (s.vimeo) {
          h += '<p class="gbox"><strong>Video (' + (s.vimeo.length ? E(s.vimeo.length) : 'length not known') + '):</strong> <a href="' + D.vimeoUrl(s.vimeo) + '" target="_blank" rel="noopener">Open on Vimeo</a>';
          if (n.videoSummary && n.videoSummary.length) h += '<ul>' + n.videoSummary.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul>';
          else h += '<br>No captions available: preview the video and add the key points.';
          h += '</p>';
        }
        if (n.tip) h += '<p class="gbox"><strong>Tip:</strong> ' + E(n.tip) + '</p>';
        h += '</div>';
      });
    });
    return h;
  }
  var gBtn = document.getElementById('bGuide');
  if (gBtn) gBtn.onclick = function () {
    if (!ART) { window.open('guide.html', '_blank'); return; }
    var g = document.getElementById('guide');
    if (!g.innerHTML) g.innerHTML = guideHTML();
    document.body.classList.add('guide-on');
    document.getElementById('gClose').onclick = function () { document.body.classList.remove('guide-on'); };
  };
  if (ART) { var pb = document.getElementById('bPres'); if (pb) pb.style.display = 'none'; }
  /* ---------- controls ---------- */
  function toggle(cls) { document.body.classList.toggle(cls); scaleStage(); }
  function fullscreen() {
    if (document.fullscreenElement) document.exitFullscreen(); else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () {});
  }
  document.getElementById('bPrev').onclick = prev;
  document.getElementById('bNext').onclick = next;
  document.getElementById('bMenu').onclick = function () { toggle('menu-on'); };
  document.getElementById('bNotes').onclick = function () { toggle('notes-on'); this.classList.toggle('on'); };
  document.getElementById('bPres').onclick = openPresenter;
  document.getElementById('bFull').onclick = fullscreen;

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || k === ' ' || k === 'Enter') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prev(); }
    else if (k === 'Home') show(0, 0);
    else if (k === 'End') show(slides.length - 1, 0);
    else if (k === 'n' || k === 'N') { toggle('notes-on'); document.getElementById('bNotes').classList.toggle('on'); }
    else if ((k === 'p' || k === 'P') && !ART) openPresenter();
    else if (k === 'f' || k === 'F') fullscreen();
    else if (k === 'm' || k === 'M') toggle('menu-on');
    else if (k === 'r' || k === 'R') { revealAll = !revealAll; applyStep(); }
    else if (k === 'b' || k === 'B') document.body.classList.toggle('black');
    else if (k === 'Escape') { document.body.classList.remove('menu-on', 'black', 'guide-on'); }
  });
  window.addEventListener('resize', scaleStage);
  document.addEventListener('mousemove', function () {
    document.body.classList.remove('idle'); clearTimeout(idleT);
    idleT = setTimeout(function () { document.body.classList.add('idle'); }, 2800);
  });

  /* ---------- start ---------- */
  function startFromHash() {
    if (ART) return 0;
    var m = (location.hash || '').replace('#', '').split('/');
    for (var i = 0; i < slides.length; i++) if (slides[i].sec.id === m[0] && String(slides[i].n) === m[1]) return i;
    return 0;
  }
  window.addEventListener('hashchange', function () {
    var g = startFromHash(); if (g !== cur) show(g, 0);
  });
  if (!slides.length) { stage.innerHTML = '<div class="slide light"><h1 class="t">No sections found</h1><p>Check data/manifest.js</p></div>'; }
  else { scaleStage(); show(startFromHash(), 0); }
  idleT = setTimeout(function () { document.body.classList.add('idle'); }, 4000);
})();




