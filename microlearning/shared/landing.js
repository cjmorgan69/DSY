/* Landing pages. window.LANDING configures the page (all keys optional):
     hub: [{ href, eyebrow, title, text, list, tone, soon, chip, go }]  shows group tiles instead of a module list
       (chip and go replace the module count and the "Open" label, for a tile that is not a module group)
     modules: ["slug", ...]   the modules to list (default window.MODULE_LIST); base: path prefix to the module folders
     title, subtitle, intro, logo, back: { href, label }, empty, footer: ["line", ...]
   A module list is built by loading each module's content.js. */
(function () {
  "use strict";
  var app = document.getElementById("app");
  var cfg = window.LANDING || {}, base = cfg.base || "";
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function load(slug) {
    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = base + slug + "/content.js?v=" + (window.ASSET_VERSION || "");
      s.onload = function () { var m = window.MODULE; window.MODULE = null; s.remove(); resolve(m ? { slug: slug, m: m } : { slug: slug, error: true }); };
      s.onerror = function () { s.remove(); resolve({ slug: slug, error: true }); };
      document.head.appendChild(s);
    });
  }
  // one at a time, because every content.js writes to window.MODULE
  function loadAll(list) {
    var out = [];
    return list.reduce(function (p, slug) { return p.then(function () { return load(slug).then(function (r) { out.push(r); }); }); }, Promise.resolve()).then(function () { return out; });
  }

  function questions(m) {
    if (m.quiz) return m.quiz.length;
    var n = 0;
    (m.panels || []).forEach(function (p) { p.blocks.forEach(function (b) { if (b.quiz) n += b.quiz.questions.length; }); });
    return n;
  }
  function hasVideo(m) {
    if (m.video && m.video.src) return true;
    return (m.panels || []).some(function (p) { return p.blocks.some(function (b) { return b.video && b.video.src; }); });
  }
  function hasTool(m) { return !!m.tool || (m.panels || []).some(function (p) { return p.blocks.some(function (b) { return b.tool || b.chooser || b.checklist; }); }); }

  function card(r) {
    var m = r.m, P = m.protocol || {};
    var a = el("a", "card"); a.href = base + r.slug + "/";
    a.appendChild(el("span", "eyebrow", [P].concat(P.also || []).map(function (p) { return p.code; }).filter(Boolean).join(" + ") || "Module"));
    a.appendChild(el("h2", null, m.title));
    a.appendChild(el("p", "muted", m.headline));
    var chips = el("div", "row");
    if (m.minutes) chips.appendChild(el("span", "chip", "About " + m.minutes + " min"));
    if (hasVideo(m)) chips.appendChild(el("span", "chip hi", "Video"));
    if (hasTool(m)) chips.appendChild(el("span", "chip hi", "Interactive"));
    var q = questions(m); if (q) chips.appendChild(el("span", "chip", q + " question quiz"));
    a.appendChild(chips);
    var ver = [P].concat(P.also || []).map(function (p) { return p.code && p.version ? p.code + " " + p.version : ""; }).filter(Boolean).join("; ");
    if (ver) a.appendChild(el("span", "small muted", "Based on " + ver));
    a.appendChild(el("span", "go", "Open module"));
    return a;
  }

  var head = el("header", "top");
  var brand = el("div", "brand"); var lg = el("div", "brand-icon"), li = el("img"); li.src = new URL(cfg.logo || "dsy-logo.png", document.currentScript.src).href; li.alt = "DSY Training"; li.width = li.height = 40; lg.appendChild(li); brand.appendChild(lg);
  var bt = el("div"); bt.appendChild(el("h1", null, cfg.title || "Microlearning")); bt.appendChild(el("p", null, cfg.subtitle || "Short modules built on SAAS clinical protocols")); brand.appendChild(bt);
  head.appendChild(brand);
  if (cfg.back) { var bk = el("a", "link", cfg.back.label || "All microlearning"); bk.href = cfg.back.href; head.appendChild(bk); }
  app.textContent = ""; app.appendChild(head);

  var intro = el("section", "stack");
  intro.appendChild(el("p", "muted", cfg.intro || "Pick a module. Each one takes about 25 minutes, works on a phone, and can be done on your own or as a team session. Every module says which protocol and version it follows."));
  app.appendChild(intro);

  function footer() {
    var foot = el("footer", "foot small muted");
    (cfg.footer || ["Training resources only. They do not replace the current protocol or advice from the EOC Clinician."]).forEach(function (t) { foot.appendChild(el("span", null, t)); });
    if (!cfg.footer) {
      var l = el("a", null, "SAAS Clinical app"); l.href = "https://clinical.saambulance.sa.gov.au"; l.target = "_blank"; l.rel = "noopener";
      var s2 = el("span"); s2.appendChild(document.createTextNode("Always check the current version in the ")); s2.appendChild(l);
      foot.appendChild(s2);
    }
    foot.appendChild(el("span", null, "\u00a9 DSY Productions | LEP Training"));
    app.appendChild(foot);
  }

  if (cfg.hub) {
    var tiles = el("div", "cards hub"); app.appendChild(tiles);
    cfg.hub.forEach(function (h) {
      var a = el("a", "card hub-tile" + (h.tone ? " tone-" + h.tone : "") + (h.soon ? " soon" : "")); a.href = h.href;
      if (h.eyebrow) a.appendChild(el("span", "eyebrow", h.eyebrow));
      a.appendChild(el("h2", null, h.title));
      if (h.text) a.appendChild(el("p", "muted", h.text));
      var chips = el("div", "row"), n = (h.list || []).length;
      chips.appendChild(el("span", "chip" + (n || h.chip ? " hi" : ""), h.chip || (h.soon || !n ? "Coming soon" : n + (n === 1 ? " module" : " modules"))));
      a.appendChild(chips);
      a.appendChild(el("span", "go", h.go || (h.soon || !n ? "Have a look" : "Open")));
      tiles.appendChild(a);
    });
    footer();
    return;
  }

  var holder = el("div", "stack"); app.appendChild(holder);
  holder.appendChild(el("p", "muted", "Loading modules..."));

  loadAll(cfg.modules || window.MODULE_LIST || []).then(function (rs) {
    holder.textContent = "";
    var ok = rs.filter(function (r) { return !r.error; });
    if (!ok.length) { holder.appendChild(el("div", "panel empty", cfg.empty || "No modules found.")); return; }

    var search;
    if (ok.length > 5) {
      search = el("input"); search.type = "search"; search.placeholder = "Search modules"; search.setAttribute("aria-label", "Search modules");
      holder.appendChild(search);
    }
    var cards = el("div", "cards"); holder.appendChild(cards);
    var items = ok.map(function (r) {
      var c = card(r); cards.appendChild(c);
      return { el: c, text: (r.m.title + " " + r.m.headline + " " + ((r.m.protocol || {}).code || "")).toLowerCase() };
    });
    var none = el("div", "panel empty", "No modules match."); none.hidden = true; holder.appendChild(none);
    if (search) search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase(), shown = 0;
      items.forEach(function (i) { var on = !q || i.text.indexOf(q) > -1; i.el.hidden = !on; if (on) shown++; });
      none.hidden = shown > 0;
    });
    rs.filter(function (r) { return r.error; }).forEach(function (r) { console.warn("Module failed to load:", r.slug); });
  });

  footer();
})();
