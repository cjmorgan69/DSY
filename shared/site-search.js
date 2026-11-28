/* DSY site search (owner, 27 Nov 2026): one search box on /dashboard/, /dashboard/wide/ and /dashboard/team/.
   Put <div class="dsy-search"></div> where the box goes and load this script after supabase-js.
   Results, grouped:
     Topics     hub/topics.js, with a link to every part (module, walk-through, stations, slides, MDT, PCR, customiser)
     Protocols  the 34 AO protocols: SAAS PDF and the DSY topic, if there is one
     People     Supabase site_search_people(): leaders anyone, a Volunteer Team Leader their own team only
     Training   lessons (leaders) and upcoming training sessions (whatever the person can already read)
     Pages      every page on the site the person can open (shared/search-index.js, made by .claude/tools/search-index.js)
   The page index loads the first time the box is used. Uses window.DSY_SB (the page's Supabase client) when set. */
(function () {
  "use strict";
  var INDEX_SRC = "/shared/search-index.js?v=20261128u";
  var SB_URL = "https://ekaodnbnpsuayvmxvxbm.supabase.co";
  var SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYW9kbmJucHN1YXl2bXh2eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxMzQsImV4cCI6MjEwNzM0ODEzNH0.q3lTeCQAQjYeMUNl6lwsrxUAsTijJikABW4Ua2N4bmI";
  var PDF = "https://clinical.saambulance.sa.gov.au/assets/pdf/home/";
  var TZ = "Australia/Adelaide";

  /* Other words people type for a topic. Search words only: they decide what is found, they say nothing clinical. */
  var ALSO = {
    breath: ["asthma", "acpo"], breathe: ["asthma", "acpo"], breathless: ["asthma", "acpo"], breathing: ["asthma", "acpo"], sob: ["asthma", "acpo"],
    wheeze: ["asthma"], wheezing: ["asthma"], puffer: ["asthma", "salbutamol"], ventolin: ["salbutamol", "asthma"],
    heart: ["chest", "cardiac", "acpo"], cardiac: ["chest", "acpo", "cardiac"], acs: ["chest"], gtn: ["chest", "gtn"], aspirin: ["chest", "aspirin"],
    allergy: ["anaphylaxis"], allergic: ["anaphylaxis"], sting: ["anaphylaxis"], bee: ["anaphylaxis"], epipen: ["anaphylaxis", "adrenaline"],
    snake: ["envenomation", "snake"], bite: ["envenomation", "bite"], spider: ["envenomation"],
    sugar: ["hypoglycaemia"], diabetic: ["hypoglycaemia"], diabetes: ["hypoglycaemia"], bgl: ["hypoglycaemia"], hypo: ["hypoglycaemia", "hypo"],
    cva: ["stroke"], tia: ["stroke"], fit: ["seizures", "faint-or-fit", "fit"], seizure: ["seizures", "fit"],
    fall: ["falls"], fell: ["falls"], vomit: ["nausea", "vomiting"], vomiting: ["nausea", "vomiting"],
    refuse: ["refusal"], refused: ["refusal"], refusing: ["refusal"],
    crash: ["mva", "crash"], mvc: ["mva"], rollover: ["mva", "rollover"], car: ["mva", "car"],
    neck: ["spinal", "neck"], spine: ["spinal"], fever: ["sepsis", "fever"], infection: ["sepsis", "infection"],
    dementia: ["dementia", "behaviour"], behaviour: ["dementia", "behaviour", "behavioural"],
    fire: ["bushfire", "burns", "burnover", "fire"], burn: ["burns", "burnover"], pain: ["pain"],
    shift: ["roster", "shift"], shifts: ["roster", "shift"], password: ["password", "passwords"], login: ["sign"], signin: ["sign"]
  };

  /* little words left out of a search ("can't breathe", "how do I add a person") */
  var SKIP = " a an the of to in on at for and or is it my me i do does how what can cant cannot not no with who where when ";

  var css = ".dsy-search{position:relative}" +
    ".dsy-search .ss-box{display:flex;align-items:center;gap:.5rem;background:var(--surface,#fff);border:1px solid var(--line,#d5ddd6);border-radius:14px;padding:.35rem .5rem .35rem .8rem;box-shadow:0 4px 14px -10px rgba(0,0,0,.35)}" +
    ".dsy-search .ss-box:focus-within{border-color:var(--brand,#1f5b43);box-shadow:0 0 0 3px color-mix(in srgb,var(--brand,#1f5b43) 18%,transparent)}" +
    ".dsy-search .ss-ic{opacity:.6;font-size:1rem}" +
    ".dsy-search input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--ink,#1d2a24);font:inherit;font-size:16px;padding:.45rem 0}" +
    ".dsy-search input::-webkit-search-cancel-button{-webkit-appearance:none;display:none}" +
    ".dsy-search .ss-x{border:0;background:transparent;color:var(--muted,#5b6b62);font:inherit;font-size:1.1rem;cursor:pointer;padding:.2rem .45rem;border-radius:8px}" +
    ".dsy-search .ss-out{margin-top:.5rem;background:var(--surface,#fff);border:1px solid var(--line,#d5ddd6);border-radius:14px;padding:.4rem .9rem .8rem;max-height:70vh;overflow:auto}" +
    ".dsy-search .ss-out[hidden]{display:none}" +
    ".dsy-search h3{margin:.8rem 0 .3rem;font-size:.75rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted,#5b6b62);font-weight:600}" +
    ".dsy-search ul{list-style:none;margin:0;padding:0}" +
    ".dsy-search li{padding:.45rem 0;border-top:1px solid color-mix(in srgb,var(--line,#d5ddd6) 70%,transparent)}" +
    ".dsy-search li:first-child{border-top:0}" +
    ".dsy-search li a.ss-t{color:var(--ink,#1d2a24);font-weight:600;text-decoration:none}" +
    ".dsy-search li a.ss-t:hover{text-decoration:underline}" +
    ".dsy-search .ss-tag{display:inline-block;margin-left:.4rem;font-size:.72rem;padding:.05rem .45rem;border-radius:999px;background:color-mix(in srgb,var(--muted,#5b6b62) 14%,transparent);color:var(--muted,#5b6b62);vertical-align:1px}" +
    ".dsy-search .ss-d{display:block;font-size:.85rem;color:var(--muted,#5b6b62);margin-top:.1rem}" +
    ".dsy-search .ss-l{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.35rem}" +
    ".dsy-search .ss-l a{font-size:.8rem;padding:.2rem .6rem;border-radius:999px;border:1px solid var(--line,#d5ddd6);color:var(--brand,#1f5b43);text-decoration:none;background:color-mix(in srgb,var(--brand,#1f5b43) 5%,transparent)}" +
    ".dsy-search .ss-l a:hover{background:color-mix(in srgb,var(--brand,#1f5b43) 14%,transparent)}" +
    ".dsy-search .ss-none,.dsy-search .ss-wait{font-size:.9rem;color:var(--muted,#5b6b62);margin:.6rem 0 0}" +
    ".dsy-search .ss-more{margin-top:.4rem;border:0;background:transparent;color:var(--brand,#1f5b43);font:inherit;font-size:.85rem;cursor:pointer;padding:.2rem 0}" +
    ".dsy-search mark{background:color-mix(in srgb,#f0bd3a 40%,transparent);color:inherit;border-radius:3px}" +
    "@media (prefers-color-scheme: dark){.dsy-search .ss-l a{color:#8fd3ad}}";

  var IDX = null, idxWait = null, access = null, accessWait = null, sb = null;

  function client() {
    if (sb) return sb;
    sb = window.DSY_SB || (window.supabase && window.supabase.createClient(SB_URL, SB_KEY));
    return sb;
  }
  function loadIndex() {
    if (IDX) return Promise.resolve(IDX);
    if (idxWait) return idxWait;
    idxWait = new Promise(function (res, rej) {
      var s = document.createElement("script"); s.src = INDEX_SRC; s.async = true;
      s.onload = function () { IDX = prep(window.DSY_SEARCH_INDEX || { topics: [], protocols: [], pages: [] }); res(IDX); };
      s.onerror = function () { idxWait = null; rej(new Error("Could not load the search list.")); };
      document.head.appendChild(s);
    });
    return idxWait;
  }
  /* who is searching: leader, vtl (or facilitator), member */
  function who() {
    if (access) return Promise.resolve(access);
    if (accessWait) return accessWait;
    var c = client();
    accessWait = (c ? c.rpc("my_access") : Promise.resolve({})).then(function (r) {
      var d = (r && r.data) || {};
      access = { leader: d.role === "leader", vtl: !!d.vtl, fac: d.role === "facilitator" || d.role === "leader" || !!d.vtl };
      return access;
    }, function () { access = { leader: false, vtl: false, fac: false }; return access; });
    return accessWait;
  }
  function canOpen(g, a) {
    if (a.leader) return true;
    if (g === "leader") return false;
    if (g === "vtl") return a.vtl;
    if (g === "facilitator") return a.fac;
    return true;
  }

  function flat(s) { return " " + String(s || "").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ") + " "; }
  function prep(o) {
    o.topics.forEach(function (t) { t._t = flat(t.t + " " + t.id); t._o = flat(t.p + " " + t.pt + " " + t.gr); });
    o.protocols.forEach(function (p) { p._t = flat(p.n + " " + p.c + " " + p.c.replace(/^CPP-0*/, "cpp ").replace(/-AO$/, "")); p._o = flat(p.tp || ""); });
    o.pages.forEach(function (p) { p._t = flat(p.t); p._o = flat(p.s + " " + p.d + " " + p.h + " " + p.u.replace(/[\/_-]+/g, " ")); p._k = flat(p.k); });
    return o;
  }
  function terms(q) {
    var ws = flat(q).trim().split(" ").filter(function (w) { return w.length > 1 || /\d/.test(w); });
    var kept = ws.filter(function (w) { return SKIP.indexOf(" " + w + " ") < 0; });
    return (kept.length ? kept : ws).slice(0, 8)
      .map(function (w) { return [w].concat(ALSO[w] || []); });
  }
  function has(hay, w) { return hay.indexOf(" " + w) > -1; }
  /* score an item: every typed word (or one of its other words) has to be found somewhere */
  function score(item, ts) {
    var total = 0;
    for (var i = 0; i < ts.length; i++) {
      var best = 0, alts = ts[i];
      for (var j = 0; j < alts.length; j++) {
        var w = alts[j], f = j ? 0.6 : 1, s = 0;
        if (has(item._t, w)) s = has(item._t, w + " ") ? 12 : 9;
        else if (has(item._o, w)) s = 4;
        else if (item._k && has(item._k, w.length >= 5 ? w : w + " ")) s = 1.5;   /* page text: short words must match whole */
        if (s * f > best) best = s * f;
      }
      if (!best) return 0;
      total += best;
    }
    if (item._t.trim() === ts.map(function (a) { return a[0]; }).join(" ")) total += 10;
    return total;
  }
  function top(list, ts, n, filt) {
    return list.map(function (x) { return { x: x, s: (!filt || filt(x)) ? score(x, ts) : 0 }; })
      .filter(function (r) { return r.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, n).map(function (r) { return r.x; });
  }

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function link(href, text, cls) {
    var a = el("a", cls, text); a.href = href;
    if (/^https?:/.test(href) && href.indexOf(location.host) < 0) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }
  function mark(node, text, ts) {
    /* text with the typed words highlighted (as text nodes: nothing from the data is read as HTML) */
    var words = ts.map(function (a) { return a[0]; }).filter(function (w) { return w.length > 1; });
    if (!words.length) { node.appendChild(document.createTextNode(text)); return node; }
    var re = new RegExp("(" + words.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "ig"), last = 0, m;
    text = String(text);
    while ((m = re.exec(text))) {
      if (m.index > last) node.appendChild(document.createTextNode(text.slice(last, m.index)));
      node.appendChild(el("mark", null, m[0])); last = m.index + m[0].length;
      if (!m[0].length) re.lastIndex++;
    }
    if (last < text.length) node.appendChild(document.createTextNode(text.slice(last)));
    return node;
  }
  function section(out, title) { var h = el("h3", null, title), ul = el("ul"); out.appendChild(h); out.appendChild(ul); return ul; }

  function mount(host) {
    if (host.getAttribute("data-ready")) return;
    host.setAttribute("data-ready", "1");
    host.setAttribute("role", "search");
    var box = el("div", "ss-box"), ic = el("span", "ss-ic", "🔎"), inp = el("input"), x = el("button", "ss-x", "×"), out = el("div", "ss-out");
    ic.setAttribute("aria-hidden", "true");
    inp.type = "search"; inp.placeholder = host.getAttribute("data-placeholder") || "Search DSY: a topic, protocol, person or page";
    inp.setAttribute("aria-label", "Search the DSY site"); inp.autocomplete = "off"; inp.spellcheck = false; inp.maxLength = 80;
    x.type = "button"; x.setAttribute("aria-label", "Clear the search"); x.hidden = true;
    out.hidden = true; out.setAttribute("aria-live", "polite");
    box.appendChild(ic); box.appendChild(inp); box.appendChild(x); host.appendChild(box); host.appendChild(out);

    var timer = 0, run = 0;
    function clear() { inp.value = ""; out.hidden = true; out.textContent = ""; x.hidden = true; }
    x.addEventListener("click", function () { clear(); inp.focus(); });
    inp.addEventListener("keydown", function (e) { if (e.key === "Escape") clear(); });
    inp.addEventListener("focus", function () { loadIndex().catch(function () {}); who(); }, { once: true });
    inp.addEventListener("input", function () {
      x.hidden = !inp.value; clearTimeout(timer);
      if (inp.value.trim().length < 2) { out.hidden = true; out.textContent = ""; return; }
      timer = setTimeout(go, 220);
    });

    function go() {
      var q = inp.value.trim(), me = ++run, ts = terms(q);
      if (!ts.length) return;
      Promise.all([loadIndex(), who()]).then(function (r) {
        if (me !== run) return;
        draw(q, ts, r[0], r[1], me);
      }, function (e) { out.hidden = false; out.textContent = ""; out.appendChild(el("p", "ss-none", e.message)); });
    }

    function draw(q, ts, o, a, me) {
      out.textContent = ""; out.hidden = false;
      var any = false;

      /* topics */
      var tps = top(o.topics, ts, 4);
      if (tps.length) {
        any = true; var ul = section(out, "Topics");
        tps.forEach(function (t) {
          var li = el("li"), first = t.l[0];
          var ta = mark(link(first ? first[1] : "/hub/run/", "", "ss-t"), t.t, ts); li.appendChild(ta);
          if (t.p) li.appendChild(el("span", "ss-tag", t.p));
          li.appendChild(mark(el("span", "ss-d"), [t.pt, t.gr].filter(Boolean).join(" · "), ts));
          var ls = el("div", "ss-l");
          t.l.forEach(function (l) { ls.appendChild(link(l[1], l[0])); });
          li.appendChild(ls); ul.appendChild(li);
        });
      }

      /* protocols */
      var shown = {}; tps.forEach(function (t) { shown[t.id] = 1; });
      var prs = top(o.protocols, ts, 4);
      if (prs.length) {
        any = true; var pu = section(out, "SAAS protocols (AO)");
        prs.forEach(function (p) {
          var li = el("li"), href = PDF + encodeURIComponent(p.n + " - AO.pdf");
          li.appendChild(mark(link(href, "", "ss-t"), p.n, ts)); li.appendChild(el("span", "ss-tag", p.c));
          var t = p.tp && o.topics.filter(function (x) { return x.id === p.tp; })[0];
          li.appendChild(el("span", "ss-d", t ? "DSY training: " + t.t : "No DSY topic yet"));
          var ls = el("div", "ss-l"); ls.appendChild(link(href, "Protocol PDF ↗"));
          if (t && t.l[0]) ls.appendChild(link(t.l[0][1], "DSY " + t.l[0][0].toLowerCase()));
          li.appendChild(ls); pu.appendChild(li);
        });
      }

      /* people and training: live, filled in when they arrive */
      var live = el("div"); out.appendChild(live);

      /* pages */
      var pgs = top(o.pages, ts, 40, function (p) { return canOpen(p.g, a); });
      if (pgs.length) {
        any = true; var gu = section(out, "Pages");
        var put = function (from, to) {
          pgs.slice(from, to).forEach(function (p) {
            var li = el("li");
            li.appendChild(mark(link(p.u, "", "ss-t"), p.t, ts)); li.appendChild(el("span", "ss-tag", p.s));
            if (p.d) li.appendChild(mark(el("span", "ss-d"), p.d, ts));
            gu.appendChild(li);
          });
        };
        put(0, 8);
        if (pgs.length > 8) {
          var more = el("button", "ss-more", "Show " + (pgs.length - 8) + " more pages"); more.type = "button";
          more.addEventListener("click", function () { put(8, 40); more.remove(); });
          out.appendChild(more);
        }
      }

      var wait = el("p", "ss-wait", (a.leader || a.vtl) ? "Looking for people and training sessions…" : "Looking for training sessions…");
      live.appendChild(wait);
      liveResults(q, ts, a).then(function (res) {
        if (me !== run) return;
        wait.remove();
        if (res.people.length) {
          any = true; var pu = section(live, "People");
          res.people.forEach(function (p) {
            var li = el("li"), href = a.leader ? "/access/?q=" + encodeURIComponent(p.staff_id || p.full_name || p.name) : (p.roster_url || "");
            li.appendChild(mark(href ? link(href, "", "ss-t") : el("b", "ss-t"), p.name || p.full_name || "(no name)", ts));
            if (p.clinical_level) li.appendChild(el("span", "ss-tag", p.clinical_level));
            if (p.role === "leader") li.appendChild(el("span", "ss-tag", "Team Leader"));
            if (p.vtl_team) li.appendChild(el("span", "ss-tag", "VTL"));
            var bits = [];
            if (p.name && p.full_name && p.name !== p.full_name) bits.push(p.full_name);
            if (p.staff_id) bits.push("ID " + p.staff_id);
            bits.push(p.teams || "No team");
            li.appendChild(mark(el("span", "ss-d"), bits.join(" · "), ts));
            if (a.leader && p.roster_url) { var ls = el("div", "ss-l"); ls.appendChild(link(href, "People page")); ls.appendChild(link(p.roster_url, "Team roster")); li.appendChild(ls); }
            pu.appendChild(li);
          });
        }
        if (res.sessions.length || res.lessons.length) {
          any = true; var tu = section(live, "Training");
          res.sessions.forEach(function (s) {
            var li = el("li"), href = a.leader ? "/training/#session=" + s.id : "/training/";
            li.appendChild(mark(link(href, "", "ss-t"), s.topic || "Training session", ts));
            li.appendChild(el("span", "ss-tag", "Session"));
            li.appendChild(mark(el("span", "ss-d"), [when(s), s.team, s.location].filter(Boolean).join(" · "), ts));
            tu.appendChild(li);
          });
          res.lessons.forEach(function (l) {
            var li = el("li"), u = (String(l.resources || "").match(/https?:\/\/[^\s"'<>)\]]+/) || [])[0];
            li.appendChild(mark(link(u || "/training/#lessons", "", "ss-t"), l.title, ts));
            li.appendChild(el("span", "ss-tag", "Lesson"));
            if (l.summary) li.appendChild(mark(el("span", "ss-d"), String(l.summary).slice(0, 140), ts));
            tu.appendChild(li);
          });
        }
        if (!any) live.appendChild(el("p", "ss-none", "Nothing found for “" + q + "”. Try a shorter word, a protocol number (e.g. CPP-050) or part of a name."));
      });
      if (!any && !(a.leader || a.vtl)) { /* the live part will add the "nothing found" line */ }
    }
  }

  function when(s) {
    try {
      var d = new Date(s.session_date + "T12:00:00");
      var t = new Intl.DateTimeFormat("en-AU", { weekday: "short", day: "numeric", month: "short" }).format(d);
      if (s.start_time) { var hm = s.start_time.slice(0, 5).split(":"), h = +hm[0]; t += ", " + ((h % 12) || 12) + ":" + hm[1] + (h < 12 ? " am" : " pm"); }
      return t;
    } catch (e) { return s.session_date; }
  }

  var groupsWait = null;
  function groups(c) {
    if (!groupsWait) groupsWait = c.from("groups").select("id,name").then(function (r) {
      var m = {}; (r.data || []).forEach(function (g) { m[g.id] = g.name; }); return m;
    }, function () { return {}; });
    return groupsWait;
  }
  function liveResults(q, ts, a) {
    var c = client(), none = { people: [], sessions: [], lessons: [] };
    if (!c) return Promise.resolve(none);
    var safe = q.replace(/[^A-Za-z0-9 '\-]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60);
    if (safe.length < 2) return Promise.resolve(none);
    var like = "%" + safe.replace(/\s+/g, "%") + "%";
    var today = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
    var people = (a.leader || a.vtl) ? c.rpc("site_search_people", { p_q: safe }).then(function (r) { return r.data || []; }, function () { return []; }) : Promise.resolve([]);
    var lessons = a.leader ? c.from("lessons").select("id,title,summary,resources").or("title.ilike." + like + ",summary.ilike." + like).order("title").limit(6)
      .then(function (r) { return r.data || []; }, function () { return []; }) : Promise.resolve([]);
    var sessions = Promise.all([
      c.from("sessions").select("id,group_id,session_date,start_time,topic,location").gte("session_date", today)
        .order("session_date").order("start_time").limit(200).then(function (r) { return r.data || []; }, function () { return []; }),
      groups(c)
    ]).then(function (r) {
      var gm = r[1];
      var rows = r[0].map(function (s) { s.team = gm[s.group_id] || ""; s._t = flat(s.topic); s._o = flat(s.team + " " + s.location); return s; });
      return top(rows, ts, 5).sort(function (x, y) { return x.session_date < y.session_date ? -1 : x.session_date > y.session_date ? 1 : 0; });
    }, function () { return []; });
    return Promise.all([people, sessions, lessons]).then(function (r) { return { people: r[0], sessions: r[1], lessons: r[2] }; });
  }

  function start() {
    if (!document.getElementById("dsy-search-css")) { var st = document.createElement("style"); st.id = "dsy-search-css"; st.textContent = css; document.head.appendChild(st); }
    Array.prototype.forEach.call(document.querySelectorAll(".dsy-search"), mount);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
