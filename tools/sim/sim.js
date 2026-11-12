/* DSY treatment simulator engine. PROTOTYPE, 12 Nov 2026.
   A first-person job: the student talks (browser speech recognition) or taps, the people in the scene answer with
   recorded voices, and the patient's obs change with time and treatment by the rules in the case file.
   The engine holds no clinical content: the case file (cases/<id>.js) supplies the lines, obs model, actions,
   rules and debrief, and cases/<id>.scene.js draws the picture. See README.md. */
(function () {
  "use strict";
  var C = window.SIM_CASE, M = C.model, $ = function (id) { return document.getElementById(id); };
  var TAG = (document.currentScript && (document.currentScript.src.match(/[?&]v=([\w]+)/) || [])[1]) || "1";
  var S, V, actions, busy = false, ended = false, started = false, modal = null, muted = false, ticker = null, lastTab = null;
  var au = new Audio(); au.preload = "auto";
  var TABS = [["ask", "Ask"], ["assess", "Assess"], ["treat", "Treat"], ["call", "Call"], ["move", "Move"]];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function clock(t, secs) {
    var p = C.start.split(":"), base = (+p[0]) * 3600 + (+p[1]) * 60 + Math.round(t), h = Math.floor(base / 3600) % 24, m = Math.floor(base / 60) % 60, s = base % 60;
    return (h < 10 ? "0" : "") + h + (secs ? ":" : "") + (m < 10 ? "0" : "") + m + (secs ? ":" + (s < 10 ? "0" : "") + s : "");
  }

  /* ---------- patient model ---------- */
  function reset() {
    S = { t: 0, doses: [], o2: null, pos: "chair", monitor: null, done: {}, log: [], flags: [], sets: [], shown: {}, measuredBeforeEpi: 0 };
    V = { hr: M.start.hr, sbp: M.start.sbp, dbp: M.start.dbp, spo2: M.start.spo2, rr: M.start.rr };
  }
  function step(dt) {                      // dt in seconds
    var keys = ["hr", "sbp", "dbp", "spo2", "rr"], min = dt / 60;
    if (!S.doses.length) keys.forEach(function (k) { V[k] += M.drift[k] * min; });
    else { var tg = S.doses.length > 1 ? M.dose2 : M.dose1, a = 1 - Math.exp(-min / M.tau); keys.forEach(function (k) { V[k] += (tg[k] - V[k]) * a; }); }
    V.spo2 = Math.max(70, V.spo2); V.rr = Math.min(44, V.rr); V.hr = Math.min(160, V.hr);
  }
  function raw() { return V; }
  function vit() {                         // what a measurement shows now
    var o = S.o2 == null ? 0 : Math.min(1, (S.t - S.o2) / 60) * M.oxygen, flat = S.pos === "flat";
    return { hr: Math.round(V.hr), sbp: Math.round(V.sbp), dbp: Math.round(V.dbp), rr: Math.round(V.rr + (flat ? M.flat.rr : 0)),
      spo2: Math.min(99, Math.round(V.spo2 + o + (flat ? M.flat.spo2 : 0))) };
  }
  function stage() {
    var n = S.doses.length;
    if (!n) return S.t >= M.nudgeMin * 60 ? "w" : 0;
    var settled = S.t - S.doses[n - 1].t >= 120;
    return n === 1 ? (settled ? 1 : 0) : (settled ? 2 : 1);
  }

  /* ---------- speech out ---------- */
  var bubbleTimer = null;
  function bubble(who, text, sticky) {
    var b = $("bubble"); clearTimeout(bubbleTimer);
    b.className = "bubble show who-" + (who || "n");
    b.innerHTML = (who ? "<b>" + esc(C.people[who]) + "</b>" : "") + "<span>" + esc(text) + "</span>";
    if (!sticky) bubbleTimer = setTimeout(function () { b.className = "bubble"; }, 6000);
  }
  function readTime(text) { return 900 + text.length * 48; }
  function say(id) {
    var L = C.lines[id]; if (!L) return Promise.resolve();
    S.speaking = L.who; draw(); bubble(L.who, L.text, true);
    return new Promise(function (res) {
      var doneOnce = false, fallback;
      function done() { if (doneOnce) return; doneOnce = true; clearTimeout(fallback); au.onended = au.onerror = null; S.speaking = null; draw(); bubble(L.who, L.text); res(); }
      if (muted) { fallback = setTimeout(done, readTime(L.text)); return; }
      au.onended = done; au.onerror = function () { fallback = setTimeout(done, readTime(L.text)); };
      au.src = C.audio + id + ".mp3?v=" + TAG;
      var p = au.play(); if (p && p.catch) p.catch(function () { clearTimeout(fallback); fallback = setTimeout(done, readTime(L.text)); });
      fallback = setTimeout(done, 20000);
    });
  }
  function info(text) { bubble(null, text, true); return new Promise(function (res) { setTimeout(function () { bubble(null, text); res(); }, Math.min(3500, readTime(text) * 0.6)); }); }

  /* ---------- record ---------- */
  function note(text) { S.log.push({ t: S.t, text: text }); }
  function flag(text, src) { S.flags.push({ t: S.t, text: text, src: src }); }
  function measure(keys) {
    var v = vit(), set = { t: S.t, o2: S.o2 != null }, parts = [];
    keys.forEach(function (k) {
      if (k === "bp") { set.bp = v.sbp + "/" + v.dbp; S.shown.bp = { v: set.bp, t: S.t }; parts.push("BP " + set.bp); }
      else { set[k] = v[k]; S.shown[k] = { v: v[k], t: S.t }; parts.push((k === "spo2" ? "SpO2 " : k.toUpperCase() + " ") + v[k] + (k === "spo2" ? "%" + (set.o2 ? " O2" : " RA") : "")); }
    });
    if (S.epipen == null) S.measuredBeforeEpi += keys.length;
    var last = S.sets[S.sets.length - 1];
    if (last && S.t - last.t <= 150) keys.forEach(function (k) { last[k] = set[k]; }); else S.sets.push(set);
    note(parts.join(", ")); mon();
  }

  /* ---------- modals (voice can answer them) ---------- */
  function openModal(o, opts) {
    return new Promise(function (res) {
      modal = { opts: opts, pick: function (i) { modal = null; $("modal").className = "modal"; res(i); } };
      $("modal").innerHTML = '<div class="mbox"><h3>' + esc(o.title) + "</h3>" + (o.body ? "<p>" + esc(o.body) + "</p>" : "") +
        opts.map(function (x, i) { return '<button class="mopt' + (x.primary ? " primary" : "") + (x.quiet ? " quiet" : "") + '" data-i="' + i + '">' + esc(x.label) + "</button>"; }).join("") +
        (SR ? '<button class="mmic" id="mmic">' + MIC + " Say it</button>" : "") + "</div>";
      $("modal").className = "modal show";
    });
  }
  function confirmBox(o) {
    return openModal(o, [{ label: o.yes || "Confirm", primary: true, say: ["confirm", "\\byes\\b", "yep", "yeah", "do it", "go ahead", "give it", "use it", "correct", "affirm"] },
                         { label: o.no || "Cancel", quiet: true, say: ["cancel", "\\bno\\b", "nope", "stop", "wait", "don.?t"] }]).then(function (i) { return i === 0; });
  }
  function choose(o) { return openModal(o, o.options); }

  /* ---------- running an action ---------- */
  function advance(secs) { for (var left = secs; left > 0; left -= 5) { step(Math.min(5, left)); } S.t += secs; mon(); }
  function tickEvents() { return Promise.resolve(ended ? null : C.tick(api)); }
  function run(a) {
    if (busy || ended || !started) return;
    busy = true; hideSheet(); document.body.classList.add("busy");
    var doing = $("doing"); doing.textContent = a.label + (a.secs ? "  +" + (a.secs >= 60 ? Math.round(a.secs / 60) + " min" : a.secs + " s") : ""); doing.className = "doing show";
    S.count = (S.count || 0) + 1;
    setTimeout(function () {
      advance(a.secs || 0); doing.className = "doing";
      Promise.resolve().then(function () { return a.run(api); }).then(tickEvents).catch(function (e) { console.error(e); })
        .then(function () { busy = false; document.body.classList.remove("busy"); draw(); mon(); if (!ended && lastTab && a.tab === "ask") showSheet(lastTab); });
    }, a.secs ? 900 : 100);
  }
  function end(outcome) { ended = true; S.outcome = outcome; clearInterval(ticker); stopListening(); setTimeout(debrief, outcome === "collapse" ? 1200 : 400); return Promise.resolve(); }

  var api = { get S() { return S; }, vit: vit, raw: raw, stage: stage, say: say, info: info, note: note, flag: flag, measure: measure,
    confirm: confirmBox, choose: choose, end: end, advance: advance, clock: function (t) { return clock(t); } };

  /* ---------- speech in ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition, rec = null, listening = false;
  var MIC = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 15a3.5 3.5 0 0 0 3.5-3.5v-6a3.5 3.5 0 0 0-7 0v6A3.5 3.5 0 0 0 12 15Zm6-3.5a1 1 0 1 0-2 0 4 4 0 0 1-8 0 1 1 0 1 0-2 0 6 6 0 0 0 5 5.9V20H8.5a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2H13v-2.6a6 6 0 0 0 5-5.9Z"/></svg>';
  function norm(s) { return " " + String(s).toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9.' ]+/g, " ").replace(/\s+/g, " ").trim() + " "; }
  function best(list, text) {                // list of { say: [patterns] }; longest match wins
    var hit = -1, len = 0;
    list.forEach(function (x, i) { (x.say || []).forEach(function (p) { var m = text.match(new RegExp(p, "i")); if (m && m[0].length > len) { len = m[0].length; hit = i; } }); });
    return hit;
  }
  function heard(text, final) {
    $("heard").textContent = "“" + text.trim() + "”";
    if (!final) return;
    var t = norm(text);
    if (modal) { var i = best(modal.opts, t); if (i >= 0) modal.pick(i); else $("heard").textContent += "  Not sure which. Tap one."; return; }
    if (busy) return;
    var vis = actions.filter(function (a) { return !a.when || a.when(); }), k = best(vis, t);
    if (k < 0) k = best(actions, t) >= 0 ? -2 : -1;
    if (k >= 0) { $("heard").textContent += "  → " + vis[k].label; run(vis[k]); }
    else $("heard").textContent += k === -2 ? "  Already done." : "  Not sure what you want. Try again or use the buttons.";
  }
  function stopListening() { if (rec && listening) { try { rec.stop(); } catch (e) {} } }
  function listen() {
    if (!SR) return;
    if (listening) { stopListening(); return; }
    try { au.pause(); } catch (e) {}
    rec = new SR(); rec.lang = "en-AU"; rec.interimResults = true; rec.maxAlternatives = 1; rec.continuous = false;
    var got = "";
    rec.onstart = function () { listening = true; document.body.classList.add("listening"); $("heard").textContent = "Listening…"; };
    rec.onresult = function (e) { var s = "", fin = false; for (var i = 0; i < e.results.length; i++) { s += e.results[i][0].transcript; if (e.results[i].isFinal) fin = true; } got = s; heard(s, false); if (fin) { rec.onresult = null; stopListening(); } };
    rec.onerror = function (e) { $("heard").textContent = e.error === "not-allowed" || e.error === "service-not-allowed" ? "The microphone is blocked. Allow it for this site in Settings, or use the buttons." : (e.error === "no-speech" ? "Didn't hear anything. Tap the microphone and try again." : "Voice didn't work (" + e.error + "). Use the buttons."); };
    rec.onend = function () { listening = false; document.body.classList.remove("listening"); if (got) heard(got, true); };
    try { rec.start(); } catch (e) { $("heard").textContent = "Voice didn't start. Use the buttons."; }
  }

  /* ---------- screen ---------- */
  function mon() {
    if (!S) return;
    $("clock").textContent = clock(S.t, true);
    var v = vit(), live = S.monitor != null;
    function tile(k, label, unit, liveVal) {
      var sh = S.shown[k], val = live && liveVal != null ? liveVal : (sh ? sh.v : "--"), sub = live && liveVal != null ? "live" : (sh ? clock(sh.t) : "not taken");
      return '<div class="tile' + (val === "--" ? " empty" : "") + '"><i>' + label + "</i><b>" + val + "</b><u>" + (val === "--" ? sub : unit + " · " + sub) + "</u></div>";
    }
    $("mon").innerHTML = tile("hr", "HR", "/min", v.hr) + tile("bp", "BP", "mmHg", null) + tile("spo2", "SpO2", "%" + (S.o2 != null ? " O2" : " air"), v.spo2) + tile("rr", "RR", "/min", null);
  }
  function draw() { if (S && window.SIM_SCENE) $("scene").innerHTML = window.SIM_SCENE({ S: S, stage: stage(), rr: vit().rr, people: C.people }); }
  function showSheet(tab) {
    lastTab = tab;
    var list = actions.filter(function (a) { return a.tab === tab && (!a.when || a.when()); });
    $("sheet").innerHTML = '<div class="sheethead"><b>' + esc(TABS.filter(function (t) { return t[0] === tab; })[0][1]) + '</b><button id="sheetx" aria-label="Close">Close</button></div>' +
      list.map(function (a) { return '<button class="sact" data-a="' + a.id + '"><span>' + esc(a.label) + "</span>" + (a.secs ? "<em>" + (a.secs >= 60 ? Math.round(a.secs / 60) + " min" : a.secs + " s") + "</em>" : "") + "</button>"; }).join("");
    $("sheet").className = "sheet show"; if ($("sheet").scrollIntoView) $("sheet").scrollIntoView({ block: "nearest", behavior: "smooth" });
    Array.prototype.forEach.call(document.querySelectorAll(".stab"), function (b) { b.classList.toggle("on", b.getAttribute("data-tab") === tab); });
  }
  function hideSheet() { $("sheet").className = "sheet"; Array.prototype.forEach.call(document.querySelectorAll(".stab"), function (b) { b.classList.remove("on"); }); }
  function showNotes() {
    openModal({ title: "Your notes so far", body: S.log.length ? "" : "Nothing recorded yet." }, [{ label: "Close", quiet: true, say: ["close", "ok", "back"] }]);
    var box = document.querySelector(".mbox p") || document.querySelector(".mbox h3");
    box.insertAdjacentHTML("afterend", '<ul class="notes">' + S.log.map(function (l) { return "<li><b>" + clock(l.t) + "</b> " + esc(l.text) + "</li>"; }).join("") + "</ul>");
  }

  function start() {
    reset(); actions = C.actions(api); started = true; ended = false; busy = true;
    document.body.className = "playing busy"; $("intro").hidden = true; $("debrief").hidden = true; $("play").hidden = false;
    $("heard").textContent = SR ? "Tap the microphone and speak, or use the buttons." : "Voice input isn't available in this browser: use the buttons. (It works in Safari on iPhone and iPad, and in Chrome.)";
    draw(); mon(); window.scrollTo(0, 0);
    clearInterval(ticker);
    ticker = setInterval(function () { if (!busy && !modal && !ended && !listening) { step(1); S.t += 1; mon(); if (S.t % 5 === 0) { busy = true; tickEvents().then(function () { busy = false; draw(); }); } } }, 1000);
    say("w_arrive").then(function () { busy = false; document.body.classList.remove("busy"); });
  }

  function debrief() {
    var items = C.debrief(api), ok = items.filter(function (i) { return i.status === "ok"; }).length, SRC = C.sources;
    var icon = { ok: "✓", late: "!", no: "✕" }, word = { ok: "Done", late: "Late or partly", no: "Missed" };
    var h = '<div class="dhead"><p class="eyebrow">Debrief · ' + esc(C.title) + "</p><h1>" +
      (S.outcome === "collapse" ? "David became unresponsive" : "You left the scene at " + clock(S.t)) + "</h1><p>" +
      (S.outcome === "collapse" ? "He had no adrenaline and kept getting worse. On a real job you would now start resuscitation (CPP-004-AO). The simulator stops here: run it again." :
        ok + " of " + items.length + " expected steps done. Sim time on scene: " + Math.round(S.t / 60) + " minutes.") + "</p></div>";
    h += '<h2>Against the protocol</h2><ul class="dcheck">' + items.map(function (i) {
      return '<li class="' + i.status + '"><span class="ic" title="' + word[i.status] + '">' + icon[i.status] + "</span><div><b>" + esc(i.text) + '</b> <span class="src">' + esc(SRC[i.src] || i.src) + "</span><p>" + esc(i.detail) + "</p></div></li>"; }).join("") + "</ul>";
    if (S.flags.length) h += "<h2>Stopped or corrected</h2><ul class=\"dcheck\">" + S.flags.map(function (f) { return '<li class="no"><span class="ic">!</span><div><b>' + clock(f.t) + '</b> <span class="src">' + esc(SRC[f.src] || f.src) + "</span><p>" + esc(f.text) + "</p></div></li>"; }).join("") + "</ul>";
    h += "<h2>Your timeline</h2><ul class=\"notes\">" + S.log.map(function (l) { return "<li><b>" + clock(l.t) + "</b> " + esc(l.text) + "</li>"; }).join("") + "</ul>";
    if (S.sets.length) h += '<h2>Obs you recorded</h2><div class="tablewrap"><table><tr><th>Time</th><th>HR</th><th>BP</th><th>SpO2</th><th>RR</th></tr>' + S.sets.map(function (s) {
      return "<tr><td>" + clock(s.t) + "</td><td>" + (s.hr || "") + "</td><td>" + (s.bp || "") + "</td><td>" + (s.spo2 ? s.spo2 + "% " + (s.o2 ? "O2" : "RA") : "") + "</td><td>" + (s.rr || "") + "</td></tr>"; }).join("") + "</table></div>";
    if (S.outcome !== "collapse") h += '<h2>Now hand over (ISBAR)</h2><p class="muted">Say it out loud from your timeline. The walk-through has a worked example.</p><div class="tablewrap"><table>' + C.isbar.map(function (r) { return "<tr><th>" + r[0] + "</th><td>" + esc(r[1]) + "</td></tr>"; }).join("") + "</table></div>";
    h += '<div class="dbtns"><button class="sbig" id="again">Run it again</button><a class="sbig ghost" href="' + C.pcr + '">Write the PCR</a><a class="sbig ghost" href="' + C.walk + '">Walk-through</a><a class="sbig ghost" href="' + C.module + '">Microlearning</a></div>';
    h += '<p class="muted small">Prototype. The checks come from ' + esc(C.protocol) + " and the walk-through. How fast David changes, the time each action costs and the wording of this debrief are written by DSY, not SAAS: check them with your lead instructor.</p>";
    $("debrief").innerHTML = h; $("debrief").hidden = false; $("play").hidden = true; document.body.className = "ended"; window.scrollTo(0, 0);
  }

  function intro() {
    $("intro").innerHTML = '<p class="eyebrow">Treatment simulator · prototype</p><h1>' + esc(C.title) + '</h1><p class="lead">' + esc(C.brief.role) + "</p>" +
      '<div class="mdt"><b>MDT</b><ul>' + C.brief.mdt.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="how"><h2>How it works</h2><ul><li><b>Talk or tap.</b> Tap the microphone and say what you want to do or ask (“What happened?”, “Take a blood pressure”, “Call the EOC Clinician”), or use the buttons.</li>' +
      "<li><b>Everything takes time.</b> The clock runs, and each action adds to it. David changes with time and with what you do.</li>" +
      "<li><b>Medicines are checked.</b> Sam repeats each one back and you confirm it.</li>" +
      "<li><b>Finish</b> by getting him on the stretcher and transporting. Then you get a debrief against the protocol.</li></ul>" +
      '<p class="muted small">Turn your sound on. Voice input sends what you say to your phone’s speech service (Apple or Google): don’t say real patient details.</p></div>' +
      '<p class="scene-txt">' + esc(C.brief.scene) + '</p><button class="sbig" id="start">Start: walk into the garden</button>' +
      '<p class="muted small">' + esc(C.protocol) + ". The patient, voices and timings are a training scenario written by DSY.</p>";
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button, [data-tab], a") : null; if (!t) return;
    if (t.id === "start" || t.id === "again") { start(); return; }
    if (t.id === "mic" || t.id === "mmic") { listen(); return; }
    if (t.id === "sheetx") { hideSheet(); lastTab = null; return; }
    if (t.id === "notesbtn") { if (!busy && !modal) showNotes(); return; }
    if (t.id === "mute") { muted = !muted; t.textContent = muted ? "Sound off" : "Sound on"; if (muted) { try { au.pause(); if (au.onended) au.onended(); } catch (x) {} } return; }
    if (t.id === "endbtn") { if (!busy && !modal) confirmBox({ title: "End the job here?", body: "You will go to the debrief without transporting.", yes: "End and debrief", no: "Keep going" }).then(function (y) { if (y) end("stopped"); }); return; }
    if (t.classList.contains("mopt")) { if (modal) modal.pick(+t.getAttribute("data-i")); return; }
    if (t.classList.contains("sact")) { var id = t.getAttribute("data-a"); $("heard").textContent = ""; run(actions.filter(function (a) { return a.id === id; })[0]); return; }
    var tab = t.getAttribute("data-tab"); if (tab && started && !ended && !busy) { if ($("sheet").className.indexOf("show") > 0 && lastTab === tab) { hideSheet(); lastTab = null; } else showSheet(tab); }
  });

  $("tabs").innerHTML = TABS.slice(0, 2).map(tabBtn).join("") + '<button id="mic" class="mic" aria-label="Speak"' + (SR ? "" : " disabled") + ">" + MIC + "</button>" + TABS.slice(2).map(tabBtn).join("");
  function tabBtn(t) { return '<button class="stab" data-tab="' + t[0] + '">' + t[1] + "</button>"; }
  intro();
  window.SIM = { api: api, start: start, heard: heard, state: function () { return S; } };   // for testing
})();
