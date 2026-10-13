/* Builds a microlearning page from window.MODULE (see README.md). All text goes in through textContent. */
(function () {
  "use strict";
  var M = window.MODULE;
  if (!M) return;
  var app = document.getElementById("app");

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function add(parent) { for (var i = 1; i < arguments.length; i++) if (arguments[i]) parent.appendChild(arguments[i]); return parent; }
  function list(items, cls) { var ul = el("ul", cls || "points"); items.forEach(function (t) { ul.appendChild(el("li", null, t)); }); return ul; }
  function para(text) { return el("p", null, text); }
  function isAudio(u) { return /\.(mp3|m4a|wav|ogg)(\?|$)/i.test(u); }
  function isVideoFile(u) { return /\.(mp4|webm)(\?|$)/i.test(u); }

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

  /* media: video or audio, or a labelled placeholder while the module is in draft */
  function slot(kind, cfg, fallbackTitle) {
    cfg = cfg || {};
    if (cfg.src) {
      if (kind === "audio" || isAudio(cfg.src)) { var a = el("audio"); a.controls = true; a.preload = "none"; a.src = cfg.src; return a; }
      var wrap = el("div", "video");
      if (isVideoFile(cfg.src)) { var v = el("video"); v.controls = true; v.preload = "metadata"; v.src = cfg.src; if (cfg.poster) v.poster = cfg.poster; wrap.appendChild(v); }
      else { var f = el("iframe"); f.src = cfg.src; f.title = cfg.title || fallbackTitle; f.loading = "lazy"; f.allowFullscreen = true; wrap.appendChild(f); }
      return wrap;
    }
    if (cfg.link) { var la = el("a", "link", cfg.linkLabel || "Open"); la.href = cfg.link; la.target = "_blank"; la.rel = "noopener"; return la; }
    if (!M.draft) return null;
    var s = el("div", "slot");
    s.appendChild(el("strong", null, (kind === "audio" ? "Audio" : "Video") + " coming soon: " + (cfg.title || fallbackTitle)));
    if (cfg.notes) s.appendChild(el("span", "small", cfg.notes));
    return s;
  }

  /* ---------- header ---------- */
  var P = M.protocol || {};
  var head = el("header", "top");
  var brand = el("div", "brand");
  brand.appendChild(el("div", "brand-icon", "+"));
  var bt = el("div"); bt.appendChild(el("h1", null, M.title)); bt.appendChild(el("p", null, M.subtitle || "Microlearning module")); brand.appendChild(bt);
  head.appendChild(brand);
  var chips = el("div", "row");
  if (P.code) chips.appendChild(el("span", "chip hi", P.code));
  if (M.minutes) chips.appendChild(el("span", "chip", "About " + M.minutes + " min"));
  head.appendChild(chips);
  app.appendChild(head);

  var intro = el("section", "stack");
  intro.appendChild(el("span", "eyebrow", "Microlearning"));
  intro.appendChild(el("h2", null, M.headline));
  if (M.lead) intro.appendChild(el("p", "muted", M.lead));
  if (M.draft) intro.appendChild(el("p", "notice small", "Draft: sections marked \"coming soon\" are placeholders. Fill them in or remove them in content.js before sharing."));
  app.appendChild(intro);

  var stack = el("div", "stack");
  app.appendChild(stack);

  /* ---------- facilitator guide ---------- */
  if (M.session) {
    var fp = panel("Running this session without an instructor", { numbered: false, cls: "facilitator", chip: "Facilitator" });
    if (M.session.intro) fp.body.appendChild(para(M.session.intro));
    var ol = el("ol", "steps");
    M.session.steps.forEach(function (s) {
      var li = el("li"); li.appendChild(el("span", "t", s.t + (s.time ? " (" + s.time + ")" : ""))); if (s.text) { li.appendChild(document.createElement("br")); li.appendChild(document.createTextNode(s.text)); }
      ol.appendChild(li);
    });
    fp.body.appendChild(ol);
    stack.appendChild(fp);
  }

  /* ---------- 1 introduction ---------- */
  var ip = panel("Introduction", { open: true });
  var vid = slot("video", M.video, M.title + " introduction");
  if (vid) ip.body.appendChild(vid);
  (M.intro || []).forEach(function (t) { ip.body.appendChild(para(t)); });
  stack.appendChild(ip);

  /* ---------- 2 key points ---------- */
  if (M.keyPoints && M.keyPoints.length) {
    var kp = panel(M.keyPointsTitle || "Key points");
    M.keyPoints.forEach(function (k) {
      var box = el("div", "box" + (k.tone ? " " + k.tone : ""));
      box.appendChild(el("h3", null, k.title));
      if (k.text) box.appendChild(para(k.text));
      if (k.steps) { var o = el("ol", "steps"); k.steps.forEach(function (s) { var li = el("li"); li.appendChild(el("span", "t", s.t)); if (s.text) { li.appendChild(document.createElement("br")); li.appendChild(document.createTextNode(s.text)); } o.appendChild(li); }); box.appendChild(o); }
      if (k.items) box.appendChild(list(k.items, "points" + (k.tone === "no" ? " no" : "")));
      kp.body.appendChild(box);
    });
    stack.appendChild(kp);
  }

  /* ---------- 3 decision aid + scenarios ---------- */
  if (M.tool) {
    var T = M.tool, tp = panel(T.title);
    if (T.intro) tp.body.appendChild(el("p", "muted", T.intro));
    var form = el("form", "tool"); form.noValidate = true;
    T.fields.forEach(function (f) {
      var ask = el("div", "ask"); ask.appendChild(el("span", "q-t", f.label));
      if (f.hint) ask.appendChild(el("span", "small muted", f.hint));
      if (f.type === "yesno") {
        var o = el("div", "opts");
        [["yes", "Yes"], ["no", "No"]].forEach(function (p) {
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
    tp.body.appendChild(form); tp.body.appendChild(out);

    function read() {
      var v = {}, ok = true;
      T.fields.forEach(function (f) {
        if (f.type === "yesno") { var c = form.querySelector('input[name="' + f.id + '"]:checked'); if (!c) { ok = false; v[f.id] = null; } else v[f.id] = c.value === "yes"; }
        else { var raw = form.elements[f.id].value; var x = parseFloat(raw); if (raw === "" || isNaN(x)) { ok = false; v[f.id] = null; } else v[f.id] = x; }
      });
      return ok ? v : null;
    }
    function show(v) {
      out.textContent = ""; out.hidden = false;
      if (!v) { out.appendChild(el("p", "result bad", "Answer every question to see the outcome.")); return; }
      var r = T.evaluate(v), box = el("div", "outcome" + (r.tone ? " " + r.tone : ""));
      box.appendChild(el("h3", null, r.headline));
      if (r.alerts && r.alerts.length) { var al = el("div", "box warn"); al.appendChild(list(r.alerts)); box.appendChild(al); }
      if (r.why && r.why.length) { box.appendChild(el("span", "eyebrow", "Because")); box.appendChild(list(r.why)); }
      if (r.actions && r.actions.length) { box.appendChild(el("span", "eyebrow", "What the protocol says to do")); box.appendChild(list(r.actions)); }
      if (r.note) box.appendChild(el("p", "small muted", r.note));
      out.appendChild(box);
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); show(read()); });
    form.addEventListener("reset", function () { out.hidden = true; out.textContent = ""; });
    if (T.disclaimer) tp.body.appendChild(el("p", "small muted", T.disclaimer));

    if (T.scenarios && T.scenarios.length) {
      tp.body.appendChild(el("h3", null, "Practise with scenarios"));
      if (T.scenariosNote) tp.body.appendChild(el("p", "small muted", T.scenariosNote));
      var sc = el("div");
      T.scenarios.forEach(function (s, i) {
        var row = el("div", "scenario"), w = el("div", "what");
        w.appendChild(el("strong", null, (i + 1) + ". " + s.title)); w.appendChild(el("span", null, s.text));
        var b = el("button", "link", "Run through the checker"); b.type = "button";
        b.addEventListener("click", function () {
          form.reset(); out.hidden = true;
          T.fields.forEach(function (f) {
            var val = s.values[f.id];
            if (f.type === "yesno") form.querySelector('input[name="' + f.id + '"][value="' + (val ? "yes" : "no") + '"]').checked = true;
            else form.elements[f.id].value = val;
          });
          show(read()); form.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        add(row, w, b); sc.appendChild(row);
      });
      tp.body.appendChild(sc);
    }
    stack.appendChild(tp);
  }

  /* ---------- 4 reference ---------- */
  if (M.reference && M.reference.length) {
    var rp = panel(M.referenceTitle || "Reference");
    M.reference.forEach(function (r) {
      var box = el("div", "stack"); box.appendChild(el("h3", null, r.title));
      if (r.text) box.appendChild(el("p", "muted", r.text));
      if (r.table) {
        var wrap = el("div", "tablewrap"), t = el("table"), th = el("tr");
        r.table.head.forEach(function (h) { th.appendChild(el("th", null, h)); });
        t.appendChild(add(el("thead"), th));
        var tb = el("tbody");
        r.table.rows.forEach(function (row) { var tr = el("tr"); row.forEach(function (c) { tr.appendChild(el("td", null, c)); }); tb.appendChild(tr); });
        t.appendChild(tb); wrap.appendChild(t); box.appendChild(wrap);
      }
      if (r.items) box.appendChild(list(r.items));
      rp.body.appendChild(box);
    });
    if (M.links) { var lr = el("div", "row"); M.links.forEach(function (l) { var a = el("a", "link", l.label); a.href = l.href; a.target = "_blank"; a.rel = "noopener"; lr.appendChild(a); }); rp.body.appendChild(lr); }
    stack.appendChild(rp);
  }

  /* ---------- 5 knowledge check ---------- */
  if (M.quiz && M.quiz.length) {
    var qp = panel("Knowledge check");
    qp.body.appendChild(el("p", "muted", "Questions drawn from " + (P.code || "the protocol") + ". Pick an answer for each, then check."));
    var qf = el("form");
    M.quiz.forEach(function (q, i) {
      var d = el("div", "q"); d.appendChild(el("span", "t", (i + 1) + ". " + q.q));
      q.options.forEach(function (opt, j) {
        var l = el("label", "check"), r = el("input"); r.type = "radio"; r.name = "q" + i; r.value = j;
        l.appendChild(r); l.appendChild(document.createTextNode(" " + opt)); d.appendChild(l);
      });
      d.appendChild(el("span", "result")); d.appendChild(el("span", "why"));
      qf.appendChild(d);
    });
    var qr = el("div", "row"), sub = el("button", "btn", "Check answers"), rst = el("button", "link", "Start again"), sc2 = el("span", "chip");
    sub.type = "submit"; rst.type = "reset"; sc2.hidden = true; add(qr, sub, rst, sc2); qf.appendChild(qr);
    function clear() {
      qf.querySelectorAll(".check").forEach(function (l) { l.classList.remove("right", "wrong"); });
      qf.querySelectorAll(".result").forEach(function (r) { r.textContent = ""; r.className = "result"; });
      qf.querySelectorAll(".why").forEach(function (w) { w.textContent = ""; });
      sc2.hidden = true;
    }
    qf.addEventListener("reset", clear);
    qf.addEventListener("submit", function (e) {
      e.preventDefault(); clear();
      var score = 0, blocks = qf.querySelectorAll(".q");
      M.quiz.forEach(function (q, i) {
        var picked = qf.querySelector('input[name="q' + i + '"]:checked'), r = blocks[i].querySelector(".result"), w = blocks[i].querySelector(".why");
        if (!picked) { r.textContent = "Choose an answer"; r.classList.add("bad"); return; }
        var ok = +picked.value === q.answer; if (ok) score++;
        picked.closest(".check").classList.add(ok ? "right" : "wrong");
        r.textContent = ok ? "Correct" : "Not quite. The answer is: " + q.options[q.answer]; r.classList.add(ok ? "good" : "bad");
        if (q.why) w.textContent = q.why;
      });
      sc2.textContent = "Score " + score + "/" + M.quiz.length + " (" + Math.round(score / M.quiz.length * 100) + "%)";
      sc2.className = "chip " + (score === M.quiz.length ? "good" : "warn"); sc2.hidden = false;
    });
    qp.body.appendChild(qf); stack.appendChild(qp);
  }

  /* ---------- 6 optional practical ---------- */
  if (M.practical) {
    var pp = panel(M.practical.title || "Practical", { optional: true, chip: "Optional" });
    if (M.practical.intro) pp.body.appendChild(para(M.practical.intro));
    if (M.practical.equipment) { var eb = el("div", "box"); eb.appendChild(el("h3", null, "What you need")); eb.appendChild(list(M.practical.equipment)); pp.body.appendChild(eb); }
    if (M.practical.steps) { var po = el("ol", "steps"); M.practical.steps.forEach(function (s) { var li = el("li"); li.appendChild(el("span", "t", s.t)); if (s.text) { li.appendChild(document.createElement("br")); li.appendChild(document.createTextNode(s.text)); } po.appendChild(li); }); pp.body.appendChild(po); }
    if (M.practical.good) { var gb = el("div", "box"); gb.appendChild(el("h3", null, "What good looks like")); gb.appendChild(list(M.practical.good)); pp.body.appendChild(gb); }
    if (M.practical.note) pp.body.appendChild(el("p", "small muted", M.practical.note));
    stack.appendChild(pp);
  }

  /* ---------- 7 further learning ---------- */
  var pod = slot("audio", M.podcast, "further learning");
  if (pod || (M.furtherLinks && M.furtherLinks.length)) {
    var fl = panel("Further learning", { optional: true, chip: "Optional" });
    if (M.podcast && M.podcast.summary) fl.body.appendChild(para(M.podcast.summary));
    if (pod) fl.body.appendChild(pod);
    (M.furtherLinks || []).forEach(function (l) { var a = el("a", "link", l.label); a.href = l.href; a.target = "_blank"; a.rel = "noopener"; fl.body.appendChild(a); });
    stack.appendChild(fl);
  }

  /* ---------- footer ---------- */
  var foot = el("footer", "foot small muted");
  foot.appendChild(el("strong", null, M.title));
  foot.appendChild(el("span", null, "Based on SA Ambulance Service " + (P.code || "") + (P.name ? " " + P.name : "") + (P.version ? ", " + P.version : "")));
  if (P.exported) foot.appendChild(el("span", null, "Protocol text as exported " + P.exported + ". Always check the current version at clinical.saambulance.sa.gov.au"));
  foot.appendChild(el("span", null, "Training resource only. It does not replace the protocol or advice from the EOC Clinician."));
  foot.appendChild(el("span", null, "© DSY Productions | LEP Training"));
  app.appendChild(foot);
  document.title = M.title + " - DSY Training";
})();
