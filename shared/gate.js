/* DSY site gate. Put as the first script in a page's <head>:
     <script src="/shared/gate.js" data-level="student"></script>
   data-level: student (any signed-in, approved person), facilitator (facilitators and leaders), leader,
   mdt (student when the link has self=1, else facilitator), stations (facilitator for #setup and #print, else student).
   It uses the same Supabase sign-in as /training/ (shared on this site), so people sign in once per browser.
   This is a front door, not a vault: the page files are still public on GitHub. Real protection for facilitator
   answers means serving them from the database. window.DSY_GATE.ready resolves with { role, name, facilitator }. */
(function () {
  "use strict";
  var URL_ = "https://ekaodnbnpsuayvmxvxbm.supabase.co";
  var KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYW9kbmJucHN1YXl2bXh2eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxMzQsImV4cCI6MjEwNzM0ODEzNH0.q3lTeCQAQjYeMUNl6lwsrxUAsTijJikABW4Ua2N4bmI";
  var STORE = "sb-ekaodnbnpsuayvmxvxbm-auth-token", CACHE = "dsy-gate-role", CACHE_HOURS = 12;
  var RANK = { member: 1, facilitator: 2, leader: 3 }, NEED = { student: 1, facilitator: 2, leader: 3 };
  var rule = (document.currentScript && document.currentScript.getAttribute("data-level")) || "student";
  var me = null, resolveReady, overlay = null;
  var ready = new Promise(function (res) { resolveReady = res; });
  window.DSY_GATE = { ready: ready };

  var firstHash = location.hash;   /* the MDT page clears its own hash once it has read it */
  function levelNow() {
    if (rule === "mdt") return /(^|[#&])self=1(&|$)/.test(firstHash + "&" + location.hash) ? "student" : "facilitator";
    if (rule === "stations") return /^#(setup|print)$/.test(location.hash) ? "facilitator" : "student";
    return NEED[rule] ? rule : "student";
  }

  /* hide the page until the check is done */
  var css = document.createElement("style");
  css.textContent = "html.dsy-gate body{visibility:hidden}.dsy-gate-box{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:24px;" +
    "background:#f4f6f1;color:#1d2a24;font:16px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif}" +
    "@media(prefers-color-scheme:dark){.dsy-gate-box{background:#141b17;color:#e8eee9}}" +
    ".dsy-gate-box div{max-width:26rem}.dsy-gate-box h1{font-size:1.4rem;margin:0 0 .5rem}.dsy-gate-box p{margin:0 0 1rem}" +
    ".dsy-gate-box a,.dsy-gate-box button{display:inline-block;margin:0 .5rem .5rem 0;padding:.6rem 1.1rem;border-radius:999px;border:0;background:#1f5b43;color:#fff;font:inherit;text-decoration:none;cursor:pointer}" +
    ".dsy-gate-box a.alt{background:transparent;color:inherit;box-shadow:inset 0 0 0 1px currentColor}";
  document.head.appendChild(css);
  document.documentElement.classList.add("dsy-gate");

  function show() { document.documentElement.classList.remove("dsy-gate"); if (overlay) { overlay.remove(); overlay = null; } }
  function box(title, text, links) {
    if (overlay) overlay.remove();
    overlay = document.createElement("div"); overlay.className = "dsy-gate-box";
    var d = document.createElement("div"), h = document.createElement("h1"), p = document.createElement("p");
    h.textContent = title; p.textContent = text; d.appendChild(h); d.appendChild(p);
    links.forEach(function (l) {
      var a = document.createElement(l.href ? "a" : "button"); a.textContent = l.text;
      if (l.href) a.href = l.href; else a.addEventListener("click", l.click);
      if (l.alt) a.className = "alt"; d.appendChild(a);
    });
    overlay.appendChild(d); document.documentElement.appendChild(overlay);
  }
  function toSignin() {
    location.replace("/signin/?next=" + encodeURIComponent(location.pathname + location.search + location.hash));
  }
  function retryBox(msg) {
    box("Could not check your sign-in", msg, [{ text: "Try again", click: function () { location.reload(); } }, { text: "Learn on your own", href: "/hub/learn/", alt: true }]);
  }

  function readSession() {
    try { var s = JSON.parse(localStorage.getItem(STORE) || "null"); return s && s.access_token && s.user ? s : null; } catch (e) { return null; }
  }
  function refresh(s) {
    return fetch(URL_ + "/auth/v1/token?grant_type=refresh_token", { method: "POST", headers: { apikey: KEY, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: s.refresh_token }) })
      .then(function (r) { if (!r.ok) throw { status: r.status }; return r.json(); })
      .then(function (j) {
        if (!j.expires_at) j.expires_at = Math.floor(Date.now() / 1000) + (j.expires_in || 3600);
        try { localStorage.setItem(STORE, JSON.stringify(j)); } catch (e) {}
        return j;
      });
  }
  function fetchProfile(s, cols) {
    cols = cols || "full_name,role,must_change_password";
    return fetch(URL_ + "/rest/v1/profiles?select=" + cols + "&id=eq." + encodeURIComponent(s.user.id), { headers: { apikey: KEY, Authorization: "Bearer " + s.access_token } })
      .then(function (r) {
        if (r.status === 401 || r.status === 403) throw { status: r.status };
        if (r.status === 400 && cols.indexOf("must_change_password") > -1) return fetchProfile(s, "full_name,role");   /* column not added yet */
        if (!r.ok) throw new Error("profile");
        return r.json();
      })
      .then(function (rows) { return Array.isArray(rows) ? (rows[0] || { full_name: "", role: "member" }) : rows; });
  }
  function cached(uid) {
    try { var c = JSON.parse(localStorage.getItem(CACHE) || "null"); if (c && c.uid === uid && Date.now() - c.t < CACHE_HOURS * 3600000) return c; } catch (e) {}
    return null;
  }

  function decide() {
    if (!me) return;
    var need = levelNow();
    if (RANK[me.role] >= NEED[need]) { show(); return; }
    document.documentElement.classList.add("dsy-gate");
    box(need === "leader" ? "Leaders only" : "Facilitators only",
      "This page is for facilitators. Your account is set up for students, so the learning pages are open to you. Ask your lead instructor if you should have facilitator access.",
      [{ text: "Learn on your own", href: "/hub/learn/" }, { text: "Sign out", href: "/signin/?out=1", alt: true }]);
  }

  function start() {
    var s = readSession();
    if (!s) return toSignin();
    var step = (s.expires_at || 0) * 1000 < Date.now() + 60000 ? refresh(s) : Promise.resolve(s);
    step.then(function (s2) {
      return fetchProfile(s2).then(function (p) {
        try { localStorage.setItem(CACHE, JSON.stringify({ uid: s2.user.id, role: p.role, name: p.full_name, t: Date.now() })); } catch (e) {}
        return p;
      });
    }).then(function (p) {
      if (p.must_change_password) return location.replace("/signin/?change=1&next=" + encodeURIComponent(location.pathname + location.search + location.hash));
      me = { role: p.role, name: p.full_name };
      decide(); resolveReady({ role: me.role, name: me.name, facilitator: RANK[me.role] >= 2 });
    }).catch(function (e) {
      if (e && (e.status === 400 || e.status === 401 || e.status === 403)) return toSignin();
      var c = cached(s.user.id);      /* offline or Supabase unreachable: trust the last answer for a while */
      if (c) { me = { role: c.role, name: c.name }; decide(); resolveReady({ role: me.role, name: me.name, facilitator: RANK[me.role] >= 2 }); }
      else retryBox("The sign-in service did not answer. Check your connection and try again.");
    });
  }

  window.addEventListener("hashchange", decide);
  try { start(); } catch (e) { retryBox("Something went wrong checking your sign-in."); }
})();
