/* One reminder switch for the whole DSY site (owner, 22 Nov 2026).
   Put <div class="dsy-reminders"></div> anywhere in a page (also in parts drawn later) and load this script:
     <script src="/shared/reminders.js?v=..." defer></script>
   Signed-in people see "🔔 Turn on reminders" (or "Reminders are on · Send a test · Turn off"). Turning it on anywhere
   turns it on for the whole site on that device: one push subscription on the service worker /sw.js (scope "/"),
   saved with roster_push_subscribe(..., p_scope "/"). That device then gets every reminder that applies to the person:
   the team roster reminder (24 hours before the roster is sent) and the training session reminder (12 hours before).
   Older roster-only subscriptions (service worker /modules/rosters/sw.js) count as on, are moved over quietly when the
   phone allows it, and are removed by Turn off. On iPhone, push works only in a Home Screen app (iOS 16.4+).
   Uses the same sign-in as the rest of the site (the Supabase session in localStorage); no other script needed. */
(function () {
  "use strict";
  if (window.DSY_REMINDERS) return;
  var URL_ = "https://ekaodnbnpsuayvmxvxbm.supabase.co";
  var KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYW9kbmJucHN1YXl2bXh2eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxMzQsImV4cCI6MjEwNzM0ODEzNH0.q3lTeCQAQjYeMUNl6lwsrxUAsTijJikABW4Ua2N4bmI";
  var STORE = "sb-ekaodnbnpsuayvmxvxbm-auth-token";
  var OLD_SCOPE = "/modules/rosters/";
  var FOCUS = " If no banner appears, look in Notification Centre: a Focus (Sleep, Do Not Disturb) hides banners.";
  var state = { checked: false, root: null, old: null, note: "", busy: false };

  var css = document.createElement("style");
  css.textContent = ".dsy-reminders{display:flex;flex-wrap:wrap;align-items:center;gap:.1rem .9rem;font-size:.85rem}" +
    ".dsy-reminders:empty{display:none}.dsy-reminders button{background:none;border:0;padding:.35rem 0;margin:0;font:inherit;font-weight:600;" +
    "color:var(--brand,#1f5b43);text-decoration:underline;text-underline-offset:2px;cursor:pointer;min-height:0;border-radius:0}" +
    ".dsy-reminders .dsy-rem-note{flex-basis:100%;font-weight:400;color:var(--muted,#5d6b63)}";
  document.head.appendChild(css);

  /* ---- sign-in (same store as gate.js and supabase-js) ---- */
  function session() {
    try { var s = JSON.parse(localStorage.getItem(STORE) || "null"); return s && s.access_token && s.user ? s : null; } catch (e) { return null; }
  }
  function token() {
    var s = session(); if (!s) return Promise.reject(new Error("Please sign in first."));
    if ((s.expires_at || 0) * 1000 > Date.now() + 60000) return Promise.resolve(s.access_token);
    return fetch(URL_ + "/auth/v1/token?grant_type=refresh_token", { method: "POST", headers: { apikey: KEY, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: s.refresh_token }) })
      .then(function (r) { if (!r.ok) throw new Error("Please sign in again."); return r.json(); })
      .then(function (j) { if (!j.expires_at) j.expires_at = Math.floor(Date.now() / 1000) + (j.expires_in || 3600); try { localStorage.setItem(STORE, JSON.stringify(j)); } catch (e) {} return j.access_token; });
  }
  function call(path, body) {
    return token().then(function (t) {
      return fetch(URL_ + path, { method: "POST", headers: { apikey: KEY, Authorization: "Bearer " + t, "Content-Type": "application/json" }, body: JSON.stringify(body || {}) });
    }).then(function (r) {
      return r.text().then(function (txt) {
        var j = null; try { j = txt ? JSON.parse(txt) : null; } catch (e) {}
        if (!r.ok) throw new Error((j && (j.message || j.error)) || "That didn't work.");
        return j;
      });
    });
  }
  var rpc = function (fn, args) { return call("/rest/v1/rpc/" + fn, args); };

  /* ---- devices ---- */
  function supported() { return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window; }
  function subOf(scope) {
    return navigator.serviceWorker.getRegistration(scope).then(function (reg) {
      if (!reg || new URL(reg.scope).pathname !== scope) return null;
      return reg.pushManager.getSubscription();
    });
  }
  function check() {
    if (!supported()) { state.root = state.old = null; state.checked = true; return Promise.resolve(); }
    return Promise.all([subOf("/").catch(function () { return null; }), subOf(OLD_SCOPE).catch(function () { return null; })])
      .then(function (r) { state.root = r[0]; state.old = r[1]; state.checked = true; });
  }
  function keyBytes(b64) { var p = (b64 + "===".slice((b64.length + 3) % 4)).replace(/-/g, "+").replace(/_/g, "/"); return Uint8Array.from(atob(p), function (c) { return c.charCodeAt(0); }); }
  function subscribeRoot() {
    var reg;
    return navigator.serviceWorker.register("/sw.js", { scope: "/" }).then(function (r) { reg = r; return navigator.serviceWorker.ready; })
      .then(function () { return rpc("roster_push_public_key"); })
      .then(function (k) {
        if (!k) return call("/functions/v1/roster-remind", { mode: "key" }).then(function (j) { return j && j.public_key; });
        return k;
      })
      .then(function (k) { if (!k) throw new Error("Reminders are not set up yet."); return reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(k) }); })
      .then(function (sub) {
        var d = sub.toJSON();
        return rpc("roster_push_subscribe", { p_endpoint: d.endpoint, p_p256dh: d.keys.p256dh, p_auth: d.keys.auth, p_page: location.pathname, p_scope: "/" });
      });
  }
  function dropOld() {
    var old = state.old; if (!old) return Promise.resolve();
    return rpc("roster_push_unsubscribe", { p_endpoint: old.endpoint }).catch(function () {}).then(function () { return old.unsubscribe(); }).catch(function () {});
  }
  function turnOn() {
    if (!supported()) {
      alert(/iPhone|iPad|iPod/.test(navigator.userAgent)
        ? "On an iPhone, add DSY Training to your Home Screen first:\n\n1. Open your Team page in Safari (dsytraining.com/teams).\n2. Tap the Share button, then \"Add to Home Screen\".\n3. Open DSY Training from the new icon, sign in, and tap \"Turn on reminders\".\n\n(Needs iOS 16.4 or later.)"
        : "This browser can't show notifications. Try Chrome or Safari.");
      return Promise.resolve("");
    }
    return Notification.requestPermission().then(function (perm) {
      if (perm !== "granted") return "Notifications are blocked for DSY Training. Allow them in your phone's settings, then try again.";
      return subscribeRoot().catch(function (e) { throw new Error("This device couldn't turn on reminders (" + ((e && e.message) || "unknown reason") + ")."); }).then(dropOld).then(function () {
        return test().catch(function () {}).then(function () { return "Reminders are on: your team's roster reminder, and one 12 hours before each training session. A test is on its way." + FOCUS; });
      });
    });
  }
  function turnOff() {
    var subs = [state.root, state.old].filter(Boolean);
    return Promise.all(subs.map(function (s) {
      return rpc("roster_push_unsubscribe", { p_endpoint: s.endpoint }).catch(function () {}).then(function () { return s.unsubscribe(); });
    })).then(function () { return "Reminders are off on this device."; });
  }
  function test() {
    return call("/functions/v1/roster-remind", state.root ? { mode: "test", kind: "dsy" } : { mode: "test" }).then(function (j) {
      if (!j || !j.sent) throw new Error("The test could not be sent to this device.");
      return "Test sent." + FOCUS;
    });
  }
  /* A roster-only device moves to the whole-site switch the next time a page opens, if the phone allows it quietly. */
  function upgrade() {
    if (!state.old || state.root || !supported() || Notification.permission !== "granted" || !session()) return Promise.resolve();
    return subscribeRoot().then(dropOld).then(check).catch(function () {});
  }

  /* ---- drawing ---- */
  function html() {
    if (!session()) return "";
    var on = !!(state.root || state.old);
    return (on
      ? "<span>\u{1F514} Reminders are on</span><button type=\"button\" data-rem=\"test\">Send a test</button><button type=\"button\" data-rem=\"off\">Turn off</button>"
      : "<button type=\"button\" data-rem=\"on\">\u{1F514} Turn on reminders</button>") +
      (state.note ? "<span class=\"dsy-rem-note\"></span>" : "");
  }
  function draw(el) {
    el.dataset.remDrawn = "1";
    el.innerHTML = state.checked ? html() : "";
    var n = el.querySelector(".dsy-rem-note"); if (n) n.textContent = state.note;
  }
  function drawAll() { Array.prototype.forEach.call(document.querySelectorAll(".dsy-reminders"), draw); }
  function act(kind) {
    if (state.busy) return; state.busy = true;
    var job = kind === "on" ? turnOn() : kind === "off" ? turnOff() : test();
    job.then(function (note) { state.note = note || ""; }, function (e) { state.note = (e && e.message) || "That didn't work."; })
      .then(check).then(function () { state.busy = false; drawAll(); });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".dsy-reminders [data-rem]"); if (!b) return;
    e.preventDefault(); act(b.dataset.rem);
  });

  function start() {
    check().then(upgrade).then(drawAll);
    new MutationObserver(function () {
      Array.prototype.forEach.call(document.querySelectorAll(".dsy-reminders:not([data-rem-drawn])"), draw);
    }).observe(document.body, { childList: true, subtree: true });
    window.addEventListener("storage", function (e) { if (e.key === STORE) drawAll(); });
  }
  window.DSY_REMINDERS = { refresh: function () { return check().then(drawAll); } };
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
