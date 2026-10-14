/* Builds a microlearning page from window.MODULE (see README.md). All text goes in through textContent.
   A module is a list of panels; each panel is a list of blocks. A module can either give `panels` itself,
   or use the shorthand keys (intro, keyPoints, tool, reference, quiz, practical, podcast) which are turned
   into the same panels in a fixed order. */
(function () {
  "use strict";
  var M = window.MODULE;
  if (!M) return;
  var app = document.getElementById("app");
  var P = M.protocol || {};

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function add(parent) { for (var i = 1; i < arguments.length; i++) if (arguments[i]) parent.appendChild(arguments[i]); return parent; }
  function list(items, cls) { var ul = el("ul", cls || "points"); items.forEach(function (t) { ul.appendChild(el("li", null, t)); }); return ul; }
  function para(text, cls) { return el("p", cls || null, text); }
  function link(label, href, cls) { var a = el("a", cls || "link", label); a.href = href; a.target = "_blank"; a.rel = "noopener"; return a; }
  function isAudio(u) { return /\.(mp3|m4a|wav|ogg)(\?|$)/i.test(u); }
  function isVideoFile(u) { return /\.(mp4|webm)(\?|$)/i.test(u); }
  function logo() { var d = el("div", "brand-icon"), i = el("img"); i.src = new URL(M.logo || "dsy-logo.png", document.currentScript ? document.currentScript.src : location.href).href; i.alt = "DSY Training"; i.width = 40; i.height = 40; d.appendChild(i); return d; }
  function titled(text, sub) { var li = el("li"); li.appendChild(el("span", "t", text)); if (sub) { li.appendChild(document.createElement("br")); li.appendChild(document.createTextNode(sub)); } return li; }

  var panelNo = 0;
  function panel(title, opts) {
    opts = opts || {};
    var d = el("details", "panel" + (opts.cls ? " " + opts.cls : ""));
    if (opts.open) d.open = true;
    var s = el("summary");
    if (opts.numbered !== false) { panelNo++; s.appendChild(el("span", "num" + (opts.optional ? " opt" : ""), opts.optional ? "+" : String(panelNo))); }
    s.appendChild(el("h3", null, title));
    if (opts.chip) s.appendChild(el("span", "chip", opts.chip));
    d.appendChild(s);
    var body = el("div", "body"); d.appendChild(body);
    d.body = body; return d;
  }

  /* media: video or audio, an external link, or a labelled placeholder while the module is in draft */
  function slot(kind, cfg, fallbackTitle) {
    cfg = cfg || {};
    if (cfg.src) {
      if (kind === "audio" || isAudio(cfg.src)) { var a = el("audio"); a.controls = true; a.preload = "none"; a.src = cfg.src; return a; }
      var wrap = el("div", "video");
      if (isVideoFile(cfg.src)) { var v = el("video"); v.controls = true; v.preload = "metadata"; v.src = cfg.src; if (cfg.poster) v.poster = cfg.poster; wrap.appendChild(v); }
      else { var f = el("iframe"); f.src = cfg.src; f.title = cfg.title || fallbackTitle; f.loading = "lazy"; f.allowFullscreen = true; wrap.appendChild(f); }
      return wrap;
    }
    if (cfg.link) return link(cfg.linkLabel || "Open", cfg.link);
    if (!M.draft) return null;
    var s = el("div", "slot");
    s.appendChild(el("strong", null, (kind === "audio" ? "Audio" : "Video") + " coming soon: " + (cfg.title || fallbackTitle)));
    if (cfg.notes) s.appendChild(el("span", "small", cfg.notes));
    return s;
  }

  /* ---------- blocks ---------- */
  function box(k) {
    var b = el("div", "box" + (k.tone ? " " + k.tone : ""));
    b.appendChild(el("h3", null, k.title));
    if (k.text) b.appendChild(para(k.text));
    if (k.video) { var v = slot("video", k.video, k.title); if (v) b.appendChild(v); }
    if (k.steps) { var o = el("ol", "steps"); k.steps.forEach(function (s) { o.appendChild(titled(s.t, s.text)); }); b.appendChild(o); }
    if (k.items) b.appendChild(list(k.items, "points" + (k.tone === "no" ? " no" : "")));
    if (k.note) b.appendChild(para(k.note, "small muted"));
    return b;
  }

  function table(r) {
    var box = el("div", "stack"); box.appendChild(el("h3", null, r.title));
    if (r.text) box.appendChild(para(r.text, "muted"));
    if (r.table) {
      var wrap = el("div", "tablewrap"), t = el("table"), th = el("tr");
      r.table.head.forEach(function (h) { th.appendChild(el("th", null, h)); });
      t.appendChild(add(el("thead"), th));
      var tb = el("tbody");
      r.table.rows.forEach(function (row) { var tr = el("tr"); row.forEach(function (c) { tr.appendChild(el("td", null, c)); }); tb.appendChild(tr); });
      t.appendChild(tb); wrap.appendChild(t); box.appendChild(wrap);
    }
    if (r.items) box.appendChild(list(r.items));
    return box;
  }

  /* tick-off list for practising a procedure */
  function checklist(c) {
    var wrap = el("div", "stack");
    if (c.title) wrap.appendChild(el("h3", null, c.title));
    if (c.intro) wrap.appendChild(para(c.intro, "muted small"));
    var items = el("div", "checklist");
    c.items.forEach(function (s) {
      var l = el("label", "check"), i = el("input"); i.type = "checkbox";
      var sp = el("span"); sp.appendChild(el("strong", null, s.t + (s.text ? ". " : ""))); if (s.text) sp.appendChild(document.createTextNode(s.text));
      l.appendChild(i); l.appendChild(sp); items.appendChild(l);
    });
    var row = el("div", "row"), clr = el("button", "link", "Clear ticks"), cnt = el("span", "chip");
    clr.type = "button"; add(row, clr, cnt);
    function count() { var n = items.querySelectorAll("input:checked").length, all = c.items.length; cnt.textContent = n + " of " + all + " done"; cnt.className = "chip" + (n === all ? " good" : ""); }
    items.addEventListener("change", count);
    clr.addEventListener("click", function () { items.querySelectorAll("input").forEach(function (i) { i.checked = false; }); count(); });
    count(); add(wrap, items, row); return wrap;
  }

  /* pick-one selector that shows boxes for the chosen entry */
  function chooser(c) {
    var wrap = el("div", "stack"), lab = el("label", null, c.label || "Choose one"), sel = el("select");
    sel.appendChild(new Option(c.placeholder || "Select", ""));
    var groups = {};
    c.options.forEach(function (o) {
      var parent = sel;
      if (o.group) { if (!groups[o.group]) { groups[o.group] = el("optgroup"); groups[o.group].label = o.group; sel.appendChild(groups[o.group]); } parent = groups[o.group]; }
      parent.appendChild(new Option(o.label, o.value));
    });
    lab.appendChild(sel); wrap.appendChild(lab);
    var out = el("div", "stack"); out.setAttribute("aria-live", "polite"); wrap.appendChild(out);
    function empty() { out.textContent = ""; var b = el("div", "box"); b.appendChild(para(c.empty || "Select an option to see the detail.", "muted")); out.appendChild(b); }
    sel.addEventListener("change", function () {
      var d = c.data[sel.value]; if (!d) { empty(); return; }
      out.textContent = ""; d.sections.forEach(function (s) { out.appendChild(box(s)); });
    });
    empty(); return wrap;
  }

  /* decision aid, with scenarios that fill in the form */
  function tool(T) {
    var wrap = el("div", "stack");
    if (T.intro) wrap.appendChild(para(T.intro, "muted"));
    var form = el("form", "tool"); form.noValidate = true;
    T.fields.forEach(function (f) {
      var ask = el("div", "ask"); ask.appendChild(el("span", "q-t", f.label));
      if (f.hint) ask.appendChild(el("span", "small muted", f.hint));
      if (f.type === "yesno" || f.type === "choice") {
        var o = el("div", "opts");
        (f.type === "yesno" ? [["yes", "Yes"], ["no", "No"]] : f.options.map(function (c) { return [c.value, c.label]; })).forEach(function (p) {
          var l = el("label", "pill"), i = el("input"); i.type = "radio"; i.name = f.id; i.value = p[0];
          l.appendChild(i); l.appendChild(document.createTextNode(p[1])); o.appendChild(l);
        });
        ask.appendChild(o);
      } else {
        var n = el("input"); n.type = "number"; n.name = f.id; n.inputMode = "decimal"; n.step = f.step || "any"; n.min = f.min != null ? f.min : 0;
        if (f.placeholder) n.placeholder = f.placeholder; n.setAttribute("aria-label", f.label);
        ask.appendChild(n);
      }
      form.appendChild(ask);
    });
    var trow = el("div", "row"), go = el("button", "btn", "Check"), clr = el("button", "link", "Clear");
    go.type = "submit"; clr.type = "reset"; add(trow, go, clr); form.appendChild(trow);
    var out = el("div"); out.setAttribute("aria-live", "polite"); out.hidden = true;
    wrap.appendChild(form); wrap.appendChild(out);

    function read() {
      var v = {}, ok = true;
      T.fields.forEach(function (f) {
        if (f.type === "yesno" || f.type === "choice") {
          var c = form.querySelector('input[name="' + f.id + '"]:checked');
          if (!c) { if (!f.optional) ok = false; v[f.id] = null; } else v[f.id] = f.type === "yesno" ? c.value === "yes" : c.value;
        } else {
          var raw = form.elements[f.id].value; var x = parseFloat(raw);
          if (raw === "" || isNaN(x)) { if (!f.optional) ok = false; v[f.id] = null; } else v[f.id] = x;
        }
      });
      return ok ? v : null;
    }
    function show(v) {
      out.textContent = ""; out.hidden = false;
      if (!v) { out.appendChild(para("Answer every question to see the outcome.", "result bad")); return; }
      var r = T.evaluate(v), b = el("div", "outcome" + (r.tone ? " " + r.tone : ""));
      b.appendChild(el("h3", null, r.headline));
      if (r.alerts && r.alerts.length) { var al = el("div", "box warn"); al.appendChild(list(r.alerts)); b.appendChild(al); }
      if (r.why && r.why.length) { b.appendChild(el("span", "eyebrow", "Because")); b.appendChild(list(r.why)); }
      if (r.actions && r.actions.length) { b.appendChild(el("span", "eyebrow", "What the protocol says to do")); b.appendChild(list(r.actions)); }
      if (r.note) b.appendChild(para(r.note, "small muted"));
      out.appendChild(b);
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); show(read()); });
    form.addEventListener("reset", function () { out.hidden = true; out.textContent = ""; });
    if (T.disclaimer) wrap.appendChild(para(T.disclaimer, "small muted"));

    if (T.scenarios && T.scenarios.length) {
      wrap.appendChild(el("h3", null, "Practise with scenarios"));
      if (T.scenariosNote) wrap.appendChild(para(T.scenariosNote, "small muted"));
      var sc = el("div");
      T.scenarios.forEach(function (s, i) {
        var row = el("div", "scenario"), w = el("div", "what");
        w.appendChild(el("strong", null, (i + 1) + ". " + s.title)); w.appendChild(el("span", null, s.text));
        var b = el("button", "link", "Run through the checker"); b.type = "button";
        b.addEventListener("click", function () {
          form.reset(); out.hidden = true;
          T.fields.forEach(function (f) {
            var val = s.values[f.id];
            if (val === undefined || val === null) return;
            if (f.type === "yesno") form.querySelector('input[name="' + f.id + '"][value="' + (val ? "yes" : "no") + '"]').checked = true;
            else if (f.type === "choice") form.querySelector('input[name="' + f.id + '"][value="' + val + '"]').checked = true;
            else form.elements[f.id].value = val;
          });
          show(read()); form.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        add(row, w, b); sc.appendChild(row);
      });
      wrap.appendChild(sc);
    }
    return wrap;
  }

  function quiz(Q) {
    var wrap = el("div", "stack");
    wrap.appendChild(para(Q.intro || "Questions drawn from " + (P.code || "the protocol") + ". Pick an answer for each, then check.", "muted"));
    var qf = el("form");
    Q.questions.forEach(function (q, i) {
      var d = el("div", "q"); d.appendChild(el("span", "t", (i + 1) + ". " + q.q));
      q.options.forEach(function (opt, j) {
        var l = el("label", "check"), r = el("input"); r.type = "radio"; r.name = "q" + i; r.value = j;
        l.appendChild(r); l.appendChild(document.createTextNode(" " + opt)); d.appendChild(l);
      });
      d.appendChild(el("span", "result")); d.appendChild(el("span", "why"));
      qf.appendChild(d);
    });
    var qr = el("div", "row"), sub = el("button", "btn", "Check answers"), rst = el("button", "link", "Start again"), sc = el("span", "chip");
    sub.type = "submit"; rst.type = "reset"; sc.hidden = true; add(qr, sub, rst, sc); qf.appendChild(qr);
    function clear() {
      qf.querySelectorAll(".check").forEach(function (l) { l.classList.remove("right", "wrong"); });
      qf.querySelectorAll(".result").forEach(function (r) { r.textContent = ""; r.className = "result"; });
      qf.querySelectorAll(".why").forEach(function (w) { w.textContent = ""; });
      sc.hidden = true;
    }
    qf.addEventListener("reset", clear);
    qf.addEventListener("submit", function (e) {
      e.preventDefault(); clear();
      var score = 0, blocks = qf.querySelectorAll(".q");
      Q.questions.forEach(function (q, i) {
        var picked = qf.querySelector('input[name="q' + i + '"]:checked'), r = blocks[i].querySelector(".result"), w = blocks[i].querySelector(".why");
        if (!picked) { r.textContent = "Choose an answer"; r.classList.add("bad"); return; }
        var ok = +picked.value === q.answer; if (ok) score++;
        picked.closest(".check").classList.add(ok ? "right" : "wrong");
        r.textContent = ok ? "Correct" : "Not quite. The answer is: " + q.options[q.answer]; r.classList.add(ok ? "good" : "bad");
        if (q.why) w.textContent = q.why;
      });
      sc.textContent = "Score " + score + "/" + Q.questions.length + " (" + Math.round(score / Q.questions.length * 100) + "%)";
      sc.className = "chip " + (score === Q.questions.length ? "good" : "warn"); sc.hidden = false;
    });
    wrap.appendChild(qf); return wrap;
  }

  /* swipe-sideways tiles: M.tiles = {title?, text?, hint?, numbered?, items:[{title, text, tone}]} */
  function tiles(T) {
    var wrap = el("div", "stack");
    if (T.title) wrap.appendChild(el("h3", null, T.title));
    if (T.text) wrap.appendChild(para(T.text, "muted"));
    var row = el("div", "tiles"); row.tabIndex = 0; row.setAttribute("role", "group"); row.setAttribute("aria-label", T.title || "Swipe to see more");
    T.items.forEach(function (it, i) {
      var t = el("div", "tile" + (it.tone ? " " + it.tone : ""));
      t.appendChild(el("span", "tile-n", T.numbered ? String(i + 1) : (i + 1) + " / " + T.items.length));
      t.appendChild(el("strong", null, it.title));
      if (it.text) t.appendChild(para(it.text, "small"));
      row.appendChild(t);
    });
    var bar = el("div", "tilebar"), dots = el("div", "dots"), prev = el("button", "step", "\u2039"), next = el("button", "step", "\u203A");
    prev.type = next.type = "button"; prev.setAttribute("aria-label", "Previous"); next.setAttribute("aria-label", "Next");
    T.items.forEach(function () { dots.appendChild(el("span", "dot")); });
    var hint = el("span", "small muted hint", T.hint || "Swipe sideways"); add(bar, prev, dots, next); 
    function step() { var t = row.firstChild; return t ? t.getBoundingClientRect().width + 12 : 1; }
    function sync() {
      var i = Math.round(row.scrollLeft / step()), max = T.items.length - 1;
      if (row.scrollLeft > 0 && row.scrollLeft + row.clientWidth >= row.scrollWidth - 4) i = max;
      Array.prototype.forEach.call(dots.children, function (d, k) { d.classList.toggle("on", k === i); });
      prev.disabled = i <= 0; next.disabled = i >= max;
    }
    row.addEventListener("scroll", function () { window.requestAnimationFrame(sync); }, { passive: true });
    prev.addEventListener("click", function () { row.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { row.scrollBy({ left: step(), behavior: "smooth" }); });
    add(wrap, row, bar, hint); sync(); window.addEventListener("load", sync); window.addEventListener("resize", sync); return wrap;
  }

  /* flash cards: M.cards = {title?, text?, items:[{q, a}]}; "Again" cards come back at the end */
  function cards(C) {
    var wrap = el("div", "stack" + (C.quick ? " quick" : ""));
    if (C.quick) wrap.appendChild(el("span", "eyebrow", C.title || "Quick check"));
    else if (C.title) wrap.appendChild(el("h3", null, C.title));
    wrap.appendChild(para(C.text || (C.quick ? "Say the answer to yourself, then tap the card to check." : "Tap the card to turn it over. Say the answer to yourself first."), "muted small"));
    var queue, got, total = C.items.length;
    var status = el("div", "row"), count = el("span", "chip"), score = el("span", "chip");
    add(status, count, score); if (C.quick) status.className = "row quick-status";
    var card = el("button", "flash"); card.type = "button";
    var front = el("span", "face front"), back = el("span", "face back");
    card.appendChild(front); card.appendChild(back);
    var rate = el("div", "row rate"), again = el("button", "btn ghost", "Again"), ok = el("button", "btn", "Got it");
    again.type = ok.type = "button"; add(rate, again, ok);
    var done = el("div", "box"); done.hidden = true;
    var restart = el("button", C.quick ? "link" : "btn", C.quick ? "Again" : "Go through them again"); restart.type = "button";
    var live = el("div"); live.setAttribute("aria-live", "polite");
    function show() {
      card.classList.remove("flipped"); rate.hidden = true;
      if (!queue.length) { card.hidden = true; status.hidden = true; done.hidden = false; done.firstChild.textContent = total === 1 ? "Done" : "All " + total + " cards done"; return; }
      var c = C.items[queue[0]];
      front.textContent = ""; front.appendChild(el("span", "eyebrow", "Question")); front.appendChild(el("strong", null, c.q)); front.appendChild(el("span", "small muted", "Tap to turn over"));
      back.textContent = ""; back.appendChild(el("span", "eyebrow", "Answer")); back.appendChild(el("strong", null, c.a));
      count.textContent = got + " of " + total + " got"; score.textContent = queue.length + " to go";
    }
    function start() { queue = C.items.map(function (_, i) { return i; }); got = 0; card.hidden = false; status.hidden = false; done.hidden = true; show(); }
    card.addEventListener("click", function () { var f = card.classList.toggle("flipped"); rate.hidden = !f; });
    ok.addEventListener("click", function () { queue.shift(); got++; show(); });
    again.addEventListener("click", function () { queue.push(queue.shift()); show(); });
    restart.addEventListener("click", start);
    done.appendChild(el("h3")); done.appendChild(para(C.doneText || (C.quick ? "Done. Keep scrolling." : "Cards you marked Again came back until you got them. The Knowledge check is next."), "muted")); done.appendChild(restart);
    add(wrap, status, card, rate, done, live); start(); return wrap;
  }

  /* in the flow layout a box can be shown as swipe tiles (tiles: true, at most one per module) and can carry
     one quick-check flash card (check: {q, a}) shown straight after it */
  function boxOrTiles(k, body) {
    if (M.flow && k.tiles) {
      body.appendChild(tiles({ title: k.title, text: k.text, numbered: !!k.steps,
        items: (k.steps || k.items).map(function (x) { return typeof x === "string" ? { title: x } : { title: x.t, text: x.text }; }) }));
      if (k.note) body.appendChild(para(k.note, "small muted"));
    } else body.appendChild(box(k));
    if (M.flow && k.check) body.appendChild(cards({ quick: true, items: [k.check] }));
  }

  /* scenario decision: tap one tile, see right or wrong and why (student view) */
  function decision(d) {
    var wrap = el("div", "decision stack");
    wrap.appendChild(el("span", "eyebrow", d.label || "Your call"));
    wrap.appendChild(el("h3", null, d.q));
    var grid = el("div", "choices"), out = el("div", "outcome"); out.hidden = true; out.setAttribute("aria-live", "polite");
    var again = el("button", "link", "Try again"); again.type = "button"; again.hidden = true;
    var btns = d.options.map(function (o, i) {
      var b = el("button", "choice", o); b.type = "button";
      b.addEventListener("click", function () {
        btns.forEach(function (x, k) { x.disabled = true; if (k === d.answer) x.classList.add("right"); });
        if (i !== d.answer) b.classList.add("wrong");
        out.className = "outcome " + (i === d.answer ? "good" : "warn"); out.textContent = "";
        out.appendChild(el("h3", null, i === d.answer ? "Yes" : "Not quite: " + d.options[d.answer]));
        if (d.why) out.appendChild(para(d.why));
        out.hidden = false; again.hidden = false;
      });
      grid.appendChild(b); return b;
    });
    again.addEventListener("click", function () { btns.forEach(function (x) { x.disabled = false; x.classList.remove("right", "wrong"); }); out.hidden = true; again.hidden = true; });
    add(wrap, grid, out, again); return wrap;
  }

  /* scenario break point: facilitator view shows prompts, expected reasoning and teaching points;
     student view shows the same prompts as questions, with decision tiles and flash cards instead */
  var bpNo = 0;
  function breakpoint(B) {
    bpNo++;
    var wrap = el("div", "bp stack");
    var h = el("div", "bp-head");
    h.appendChild(el("span", "eyebrow", "Break point " + bpNo + (B.type ? " · " + B.type : "")));
    h.appendChild(el("h3", null, B.title)); wrap.appendChild(h);
    if (B.prompts) {
      wrap.appendChild(only(box({ title: "Facilitator prompts", items: B.prompts }), "facilitator"));
      wrap.appendChild(only(box({ title: "Think about", items: B.prompts }), "student"));
    }
    (B.decisions || []).forEach(function (d) { wrap.appendChild(only(decision(d), "student")); });
    if (B.cards && B.cards.length) wrap.appendChild(only(cards({ quick: true, title: "Flash card" + (B.cards.length > 1 ? "s" : ""), items: B.cards }), "student"));
    if (B.expected) wrap.appendChild(only(box({ title: "Expected AO reasoning", items: B.expected }), "facilitator"));
    if (B.teaching) wrap.appendChild(only(box({ title: "Key teaching points", items: B.teaching, note: B.teachingNote }), "facilitator"));
    if (B.realJob) wrap.appendChild(box({ title: "Real-job translation", tone: "warn", text: B.realJob }));
    return wrap;
  }
  function only(n, who) { if (who) n.classList.add(who === "student" ? "stu-only" : "fac-only"); return n; }

  function renderBlock(b, body) {
    if (b.only) { var w = only(el("div", "stack"), b.only); body.appendChild(w); body = w; }
    var n;
    if (b.text) body.appendChild(para(b.text, b.muted ? "muted" : null));
    if (b.paragraphs) b.paragraphs.forEach(function (t) { body.appendChild(para(t)); });
    if (b.video !== undefined) { n = slot("video", b.video, b.title || M.title); if (n) body.appendChild(n); }
    if (b.audio !== undefined) { n = slot("audio", b.audio, b.title || "further learning"); if (n) body.appendChild(n); }
    if (b.box) boxOrTiles(b.box, body);
    if (b.boxes) b.boxes.forEach(function (k) { boxOrTiles(k, body); });
    if (b.steps) { var o = el("ol", "steps"); b.steps.forEach(function (s) { o.appendChild(titled(s.t, s.text)); }); body.appendChild(o); }
    if (b.checklist) body.appendChild(checklist(b.checklist));
    if (b.chooser) body.appendChild(chooser(b.chooser));
    if (b.tiles) body.appendChild(tiles(b.tiles));
    if (b.cards) body.appendChild(cards(b.cards));
    if (b.table) body.appendChild(table(b.table));
    if (b.tool) { body.appendChild(tool(b.tool)); if (M.flow && b.tool.check) body.appendChild(cards({ quick: true, items: [b.tool.check] })); }
    if (b.quiz) body.appendChild(quiz(b.quiz));
    if (b.links) { var lr = el("div", "row"); b.links.forEach(function (l) { lr.appendChild(link(l.label, l.href)); }); body.appendChild(lr); }
    if (b.decision) body.appendChild(decision(b.decision));
    if (b.breakpoint) body.appendChild(breakpoint(b.breakpoint));
    if (b.note) body.appendChild(para(b.note, "small muted"));
  }

  /* shorthand keys -> panels, in the fixed order */
  function defaultPanels() {
    var out = [];
    out.push({ title: "Introduction", open: true, blocks: [{ video: M.video }].concat((M.intro || []).map(function (t) { return { text: t }; })) });
    if (M.keyPoints && M.keyPoints.length) out.push({ title: M.keyPointsTitle || "Key points", blocks: [{ boxes: M.keyPoints }] });
    if (M.tool) out.push({ title: M.tool.title, blocks: [{ tool: M.tool }] });
    if (M.reference && M.reference.length) out.push({ title: M.referenceTitle || "Reference", collapsed: true, blocks: M.reference.map(function (r) { return { table: r }; }).concat(M.links ? [{ links: M.links }] : []) });
    if (M.quiz && M.quiz.length) out.push({ title: "Knowledge check", blocks: [{ quiz: { questions: M.quiz } }] });
    if (M.practical) {
      var pr = M.practical, bl = [];
      if (pr.intro) bl.push({ text: pr.intro });
      if (pr.equipment) bl.push({ box: { title: "What you need", items: pr.equipment } });
      if (pr.steps) bl.push({ steps: pr.steps });
      if (pr.good) bl.push({ box: { title: "What good looks like", items: pr.good } });
      if (pr.note) bl.push({ note: pr.note });
      out.push({ title: pr.title || "Practical", optional: true, collapsed: true, chip: "Optional", blocks: bl });
    }
    var fl = [];
    if (M.furtherVideo) {
      if (M.furtherVideo.note) fl.push({ text: M.furtherVideo.note, muted: true });
      fl.push({ video: M.furtherVideo });
    }
    if (M.podcast && M.podcast.summary) fl.push({ text: M.podcast.summary });
    if (M.podcast) fl.push({ audio: M.podcast });
    if (M.furtherLinks && M.furtherLinks.length) fl.push({ links: M.furtherLinks });
    out.push({ title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: fl, skipIfEmpty: true });
    return out;
  }

  /* ---------- header ---------- */
  var head = el("header", "top");
  var brand = el("div", "brand");
  brand.appendChild(logo());
  var bt = el("div"); bt.appendChild(el("h1", null, M.title)); bt.appendChild(el("p", null, M.subtitle || "Microlearning module")); brand.appendChild(bt);
  head.appendChild(brand);
  var chips = el("div", "row");
  [P].concat(P.also || []).forEach(function (p) { if (p.code) chips.appendChild(el("span", "chip hi", p.code)); });
  if (M.minutes) chips.appendChild(el("span", "chip", "About " + M.minutes + " min"));
  head.appendChild(chips);
  app.appendChild(head);

  var intro = el("section", "stack");
  intro.appendChild(el("span", "eyebrow", M.scenario ? "Walk-through scenario" : "Microlearning"));
  intro.appendChild(el("h2", null, M.headline));
  if (M.lead) intro.appendChild(el("p", "muted", M.lead));
  if (M.draft) intro.appendChild(el("p", "notice small", "Draft: sections marked \"coming soon\" are placeholders. Fill them in or remove them in content.js before sharing."));
  app.appendChild(intro);

  /* scenario pages: switch between the facilitator and student versions (kept in the link as ?mode=student) */
  if (M.scenario) {
    var bar = el("div", "mode-toggle"), modes = [["facilitator", "Facilitator"], ["student", "Student"]];
    bar.setAttribute("role", "group"); bar.setAttribute("aria-label", "Version");
    var cur = /[?&]mode=student\b/.test(location.search) ? "student" : "facilitator";
    var mbtn = modes.map(function (m) { var b = el("button", null, m[1]); b.type = "button"; b.addEventListener("click", function () { setMode(m[0], true); }); bar.appendChild(b); return b; });
    var mnote = el("p", "small muted");
    var setMode = function (m, push) {
      cur = m; document.body.classList.toggle("mode-student", m === "student"); document.body.classList.toggle("mode-facilitator", m !== "student");
      mbtn.forEach(function (b, k) { b.setAttribute("aria-pressed", String(modes[k][0] === m)); });
      mnote.textContent = m === "student" ? "Student version: answer each break point with the tiles and flash cards, then compare at the debrief." : "Facilitator version: prompts, expected AO reasoning and teaching points at every break point.";
      if (push && window.history && history.replaceState) history.replaceState(null, "", location.pathname + (m === "student" ? "?mode=student" : "") + location.hash);
    };
    intro.appendChild(bar); intro.appendChild(mnote); setMode(cur, false);
  }

  /* links to the other pages built on the same protocol (shared/related.js) */
  var relCodes = [P.code].concat(M.relatedCodes || []), rel = [], seen = {};
  relCodes.forEach(function (c) { ((window.RELATED || {})[c] || []).forEach(function (r) {
    var here = location.pathname.replace(/index\.html$/, "");
    if (seen[r.href] || here === r.href || here.slice(-r.href.length) === r.href) return; seen[r.href] = 1; rel.push(r); }); });
  if (rel.length) {
    var rb = el("div", "related");
    rb.appendChild(el("span", "eyebrow", "Built on the same protocol"));
    rel.forEach(function (r) { var a = el("a", "rel-card"); a.href = r.href; a.appendChild(el("span", "chip hi", r.kind)); a.appendChild(el("strong", null, r.title)); if (r.text) a.appendChild(el("span", "small muted", r.text)); rb.appendChild(a); });
    intro.appendChild(rb);
  }

  var stack = el("div", "stack");
  app.appendChild(stack);

  if (M.session) {
    var fp = panel("Running this session without an instructor", { numbered: false, cls: "facilitator", chip: "Facilitator" });
    if (M.session.intro) fp.body.appendChild(para(M.session.intro));
    var ol = el("ol", "steps");
    M.session.steps.forEach(function (s) { ol.appendChild(titled(s.t + (s.time ? " (" + s.time + ")" : ""), s.text)); });
    fp.body.appendChild(ol);
    stack.appendChild(fp);
  }

  /* M.flow: panels are open sections that fade in as you scroll; a panel with collapsed:true stays a toggle */
  var flowN = 0;
  function flowSection(p) {
    var sec = el("section", "flow stack"), h = el("div", "flow-head");
    flowN++; h.appendChild(el("span", "num" + (p.optional ? " opt" : ""), p.optional ? "+" : String(flowN))); h.appendChild(el("h2", null, p.title));
    sec.appendChild(h);
    var body = el("div", "stack");
    p.blocks.forEach(function (b) { var part = el("div", "stack"); renderBlock(b, part); if (part.children.length) body.appendChild(part); });
    sec.appendChild(body); return sec;
  }
  (M.panels || defaultPanels()).forEach(function (p) {
    if (M.flow && !p.collapsed) { stack.appendChild(flowSection(p)); return; }
    var d = panel(p.title, { open: p.open && !M.flow, optional: p.optional, chip: p.chip, numbered: M.flow ? !!p.optional : true });
    p.blocks.forEach(function (b) { renderBlock(b, d.body); });
    if (p.skipIfEmpty && !d.body.children.length) return;
    stack.appendChild(d);
  });
  if (M.flow) {
    var bar = el("div", "scrollbar"); bar.setAttribute("aria-hidden", "true"); bar.appendChild(el("span")); document.body.appendChild(bar);
    var fill = bar.firstChild;
    function prog() { var h = document.documentElement.scrollHeight - window.innerHeight; fill.style.width = (h > 0 ? Math.min(100, window.scrollY / h * 100) : 0) + "%"; }
    window.addEventListener("scroll", prog, { passive: true }); prog();
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ("IntersectionObserver" in window && !calm) {
      /* fade the small pieces (a paragraph, a box, a quiz question, a checker question) rather than whole
         blocks, so a long quiz or checker keeps fading in all the way down; nothing is marked inside a marked piece */
      var picked = [];
      app.querySelectorAll(".flow-head, .flow .video, .flow audio, .flow .box, .flow .tiles, .flow .tilebar, .flow .hint, .flow .flash, .flow .steps > li, " +
        ".flow .points > li, .flow .bp-head, .flow .choices, .flow .ask, .flow .tool > .row, .flow .scenario, .flow .q, .flow form > .row, .flow .tablewrap, .flow .stack > h3, .flow .stack > p, .flow .stack > .row, .flow .stack > .eyebrow, .stack > details.panel")
        .forEach(function (n) { if (!picked.some(function (p) { return p.contains(n); })) picked.push(n); });
      document.documentElement.classList.add("reveal-on");
      var io = new IntersectionObserver(function (es) {
        var k = 0;
        es.forEach(function (e) { if (!e.isIntersecting) return; e.target.style.transitionDelay = Math.min(k++ * 70, 280) + "ms"; e.target.classList.add("in"); io.unobserve(e.target); });
      }, { rootMargin: "0px 0px -6% 0px" });
      picked.forEach(function (n) { n.classList.add("reveal"); io.observe(n); });
    }
  }

  /* ---------- footer ---------- */
  function sourceLine(p) { return (p.code || "") + (p.name ? " " + p.name : "") + (p.version ? ", " + p.version : ""); }
  var foot = el("footer", "foot small muted");
  foot.appendChild(el("strong", null, M.title));
  foot.appendChild(el("span", null, "Based on SA Ambulance Service " + [P].concat(P.also || []).map(sourceLine).join(" and ")));
  if (P.exported) foot.appendChild(el("span", null, "Protocol text as exported " + P.exported + ". Always check the current version at clinical.saambulance.sa.gov.au"));
  (M.footerNotes || []).forEach(function (t) { foot.appendChild(el("span", null, t)); });
  foot.appendChild(el("span", null, M.disclaimer || "Training resource only. It does not replace the protocol or advice from the EOC Clinician."));
  foot.appendChild(el("span", null, "© DSY Productions | LEP Training"));
  app.appendChild(foot);
  document.title = M.title + (M.scenario ? " scenario" : "") + " - DSY Training";
})();
