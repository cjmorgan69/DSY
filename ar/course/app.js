/* AR course bookings (Supabase version, 13 Nov 2026).
   Students: see their days, book or switch dates, join a waiting list, say they can't make a day, add to calendar.
   Facilitators: groups, dates (add, edit, cancel), the roll (present, late, left early, absent + note),
   students (paste IDs), progress (print a record), recent changes, and group setup (days and their material).
   Booking rules live in the database functions (supabase/course-setup.sql); facilitators edit the tables directly. */
(function () {
  "use strict";
  var SB_URL = "https://ekaodnbnpsuayvmxvxbm.supabase.co";
  var SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYW9kbmJucHN1YXl2bXh2eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxMzQsImV4cCI6MjEwNzM0ODEzNH0.q3lTeCQAQjYeMUNl6lwsrxUAsTijJikABW4Ua2N4bmI";
  var sb = window.supabase.createClient(SB_URL, SB_KEY);
  var app = document.getElementById("app");
  var S = { me: null, home: null, cohorts: [], cohortId: null, d: null, draft: {}, adding: false, naOpen: {} };
  var ATT = { present: "Present", late: "Late", left_early: "Left early", absent: "Absent" };
  var DONE = { present: 1, late: 1 };

  /* ------------------------------ helpers ------------------------------ */
  function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function $(id) { return document.getElementById(id); }
  function hm(t) { return t ? String(t).slice(0, 5) : ""; }
  function toDate(iso) { var p = String(iso).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtDate(iso) { return iso ? toDate(iso).toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : ""; }
  function shortDate(iso) { return iso ? toDate(iso).toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" }) : ""; }
  function fmtStamp(ts) { var d = new Date(ts); return d.toLocaleDateString("en-AU", { day: "numeric", month: "short" }) + " " + d.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" }); }
  function todayIso() { return new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Adelaide" }); }
  function timeText(w) { var a = hm(w.start || w.start_time), b = hm(w.end || w.end_time); return a ? a + (b ? "–" + b : "") : "Time to be confirmed"; }
  function toast(msg, bad) {
    var t = $("toast"); t.textContent = msg; t.className = bad ? "bad" : ""; t.hidden = false;
    clearTimeout(toast.h); toast.h = setTimeout(function () { t.hidden = true; }, 3500);
  }
  function fail(e) { console.error(e); toast((e && (e.message || e.error_description)) || "Something went wrong. Try again.", true); }
  function busy(on) { document.body.classList.toggle("busy", !!on); }
  function q(p) { return p.then(function (r) { if (r.error) throw r.error; return r.data; }); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  function whenBox(iso) {
    var d = toDate(iso);
    return '<div class="when"><span class="dow">' + d.toLocaleDateString("en-AU", { weekday: "short" }) + '</span><span class="dom">' + d.getDate() +
      '</span><span class="mon">' + d.toLocaleDateString("en-AU", { month: "short" }) + "</span></div>";
  }
  function icsLink(w, title, course) {
    var day = String(w.date).replace(/-/g, ""), st = hm(w.start || w.start_time), en = hm(w.end || w.end_time), lines;
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    if (st) {
      var s = day + "T" + st.replace(":", "") + "00", e;
      if (en) e = day + "T" + en.replace(":", "") + "00";
      else { var h = +st.slice(0, 2) + 4; e = day + "T" + pad(Math.min(h, 23)) + st.slice(3, 5) + "00"; }
      lines = ["DTSTART:" + s, "DTEND:" + e];
    } else {
      var n = toDate(w.date); n.setDate(n.getDate() + 1);
      lines = ["DTSTART;VALUE=DATE:" + day, "DTEND;VALUE=DATE:" + n.getFullYear() + pad(n.getMonth() + 1) + pad(n.getDate())];
    }
    var clean = function (t) { return String(t || "").replace(/[\\;,]/g, function (c) { return "\\" + c; }).replace(/\n/g, "\\n"); };
    var body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//DSY Training//AR course//EN", "BEGIN:VEVENT",
      "UID:" + w.id + "@dsytraining.com", "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z"]
      .concat(lines, ["SUMMARY:" + clean(course + ": " + title), "LOCATION:" + clean(w.location), "DESCRIPTION:" + clean(w.notes),
        "END:VEVENT", "END:VCALENDAR"]).join("\r\n");
    return '<a class="btn ghost" href="data:text/calendar;charset=utf-8,' + encodeURIComponent(body) + '" download="ar-day-' + esc(w.day || w.day_number) + '.ics">Add to calendar</a>';
  }
  function header(sub, extra) {
    return '<header class="top"><div class="brand"><div class="brand-icon"><img src="/microlearning/shared/dsy-logo.png" alt="" width="40" height="40"></div><div><h1>' + esc(sub.title) + "</h1><p>" + esc(sub.line) + "</p></div></div>" +
      '<div class="row">' + (extra || "") + '<a class="link" href="/signin/?out=1">Sign out</a></div></header>';
  }
  function tracker(states) {
    return '<ol class="days">' + states.map(function (x) { return '<li class="' + x.state + '" title="Day ' + x.day + '">' + x.day + "</li>"; }).join("") + "</ol>" +
      '<div class="legend"><span><i class="done"></i>Done</span><span><i class="booked"></i>Booked</span><span><i class="part"></i>Left early</span><span><i></i>To book</span></div>';
  }

  /* ------------------------------ routing ------------------------------ */
  function route() {
    var h = location.hash.slice(1);
    if (!S.me) return;
    if (h !== S.lastHash) { S.draft = {}; S.lastHash = h; }
    if (h === "student" || !S.me.facilitator) return loadStudent();
    if (!S.d) return loadFacilitator();
    renderFac();
  }
  window.addEventListener("hashchange", route);

  DSY_GATE.ready.then(function (me) {
    S.me = me;
    return sb.auth.getUser().then(function (r) { S.uid = r.data && r.data.user && r.data.user.id; });
  }).then(route).catch(fail);

  /* ============================== STUDENT ============================== */
  function loadStudent() {
    busy(true);
    q(sb.rpc("course_home")).then(function (h) { S.home = h; renderStudent(); }).catch(function (e) {
      app.innerHTML = '<main class="wrap"><div class="panel pad stack"><h2>Could not load your course</h2><p class="muted">' + esc(e.message) + '</p><button class="btn" onclick="location.reload()">Try again</button></div></main>';
    }).then(function () { busy(false); });
  }
  function studentDays(h) {
    var nums = {};
    h.days.forEach(function (d) { nums[d.day] = 1; });
    h.workshops.forEach(function (w) { nums[w.day] = 1; });
    var max = h.cohort.total_days || 0, list = Object.keys(nums).map(Number);
    for (var i = 1; i <= max; i++) if (!nums[i]) list.push(i);
    list.sort(function (a, b) { return a - b; });
    var today = h.today;
    return list.map(function (day) {
      var ws = h.workshops.filter(function (w) { return w.day === day; }), state = "open", doneOn = null;
      ws.forEach(function (w) {
        if (DONE[w.attended]) { state = "done"; doneOn = w; }
        else if (state !== "done" && w.attended === "left_early") state = "part";
        else if (state === "open" && w.my === "confirmed" && !w.cancelled && w.date >= today) state = "booked";
      });
      var meta = h.days.filter(function (d) { return d.day === day; })[0] || { title: "", links: [] };
      return { day: day, state: state, title: meta.title, links: meta.links || [], ws: ws, doneOn: doneOn };
    });
  }
  function linksHtml(links) {
    if (!links || !links.length) return "";
    return '<div class="links">' + links.map(function (l) { return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label || l.url) + "</a>"; }).join("") + "</div>";
  }
  function renderStudent() {
    var h = S.home, me = S.me;
    var facLink = me.facilitator ? '<a class="link" href="#dates">Facilitator view</a>' : "";
    if (!h.enrolled) {
      app.innerHTML = '<main class="wrap">' + header({ title: "AR course", line: h.name || "" }, facLink) +
        '<section class="panel pad stack"><h2>You are not on a course group yet</h2><p class="muted">Your facilitator adds you to a group using your ambulance ID' +
        (h.staff_id ? " (" + esc(h.staff_id) + ")" : "") + '. Once you are added, your course days and dates show here.</p></section></main>';
      return;
    }
    var days = studentDays(h), done = days.filter(function (x) { return x.state === "done"; }).length;
    var total = h.cohort.total_days || days.length, today = h.today, title = function (d) { return "Day " + d.day + (d.title ? " · " + d.title : ""); };
    var html = '<main class="wrap">' + header({ title: h.cohort.course_name, line: h.student.first_name + " " + h.student.last_name + " · " + h.cohort.name }, facLink);

    html += '<section class="panel pad stack"><div class="dayhead"><h2>Your progress</h2><span class="count">' + done + " of " + total + " days</span></div>" + tracker(days) +
      (done >= total && total ? '<div class="done-badge">Course days complete. Well done.</div>' : "") + "</section>";

    // dates the facilitator cancelled under a booking
    days.forEach(function (x) {
      x.ws.forEach(function (w) {
        if (w.cancelled && w.my === "confirmed" && w.date >= today && x.state !== "done") {
          html += '<div class="na-sent"><div><b>Your ' + esc(title(x)) + " date on " + esc(fmtDate(w.date)) + " has been cancelled.</b><span>Choose another date below, or tell your facilitator you can't make it.</span></div></div>";
        }
      });
    });

    var next = null;
    days.forEach(function (x) { x.ws.forEach(function (w) { if (w.my === "confirmed" && !w.cancelled && w.date >= today && (!next || w.date < next.w.date)) next = { w: w, x: x }; }); });
    if (next) {
      html += '<section class="stack"><h2>Your next day</h2><div class="panel pad next stack"><span class="eyebrow">' + esc(fmtDate(next.w.date)) + " · " + esc(timeText(next.w)) + "</span>" +
        "<h3>" + esc(title(next.x)) + "</h3>" + (next.w.location ? "<p>" + esc(next.w.location) + "</p>" : "") + (next.w.notes ? '<p class="muted small">' + esc(next.w.notes) + "</p>" : "") +
        linksHtml(next.x.links) + '<div class="row">' + icsLink(next.w, title(next.x), h.cohort.course_name) + "</div></div></section>";
    }

    html += '<section class="stack"><h2>Course days</h2>';
    days.forEach(function (x) {
      var chip = { done: '<span class="chip good">Done</span>', booked: '<span class="chip hi">Booked</span>', part: '<span class="chip warn">Left early</span>', open: '<span class="chip">To book</span>' }[x.state];
      html += '<div class="stack"><div class="dayhead"><h3>' + esc(title(x)) + "</h3>" + chip + "</div>" + linksHtml(x.links);
      if (x.state === "done") {
        html += '<p class="muted small">Done on ' + esc(fmtDate(x.doneOn.date)) + ".</p></div>";
        return;
      }
      var bookedHere = x.ws.some(function (w) { return w.my === "confirmed" && !w.cancelled && w.date >= today; });
      var list = x.ws.filter(function (w) { return w.date >= today && (!w.cancelled || w.my === "confirmed"); });
      if (!list.length) html += '<p class="muted small">No dates yet for this day.</p>';
      else {
        html += '<ul class="panel sessions">' + list.map(function (w) {
          var full = w.capacity != null && w.booked >= w.capacity, act = "", info = [];
          if (w.cancelled) info.push('<span class="chip bad">Cancelled</span>');
          else if (w.capacity != null) info.push('<span class="chip' + (full ? " warn" : "") + '">' + (full ? "Full" : (w.capacity - w.booked) + " place" + (w.capacity - w.booked === 1 ? "" : "s") + " left") + "</span>");
          if (w.my === "confirmed" && !w.cancelled) {
            info.push('<span class="chip good">You are booked</span>');
            act = w.can_cancel ? '<button class="btn danger" data-act="cancel" data-id="' + w.id + '">Cancel</button>'
              : '<span class="small muted">Less than ' + h.cohort.cutoff_hours + " h away: contact your facilitator to change</span>";
          } else if (w.my === "waitlist") {
            info.push('<span class="chip hi">Waiting list #' + w.my_place + "</span>");
            act = '<button class="btn ghost" data-act="cancel" data-id="' + w.id + '">Leave list</button>';
          } else if (!w.cancelled) {
            if (full) act = bookedHere ? "" : '<button class="btn ghost" data-act="wait" data-id="' + w.id + '">Join waiting list</button>';
            else act = '<button class="btn" data-act="book" data-id="' + w.id + '">' + (bookedHere ? "Switch to this date" : "Book") + "</button>";
          }
          return '<li class="session' + (w.cancelled ? " cancelled" : "") + '">' + whenBox(w.date) + '<div class="what"><span class="t">' + esc(timeText(w)) + "</span>" +
            (w.location ? '<span class="small muted">' + esc(w.location) + "</span>" : "") + (w.notes ? '<span class="small muted">' + esc(w.notes) + "</span>" : "") +
            '<span class="row">' + info.join("") + '</span></div><div class="act">' + act + "</div></li>";
        }).join("") + "</ul>";
      }
      var na = h.unavailable.filter(function (u) { return u.day === x.day; })[0];
      if (na) {
        html += '<div class="na-sent"><div><b>You told your facilitator you can\'t make any of these dates.</b>' + (na.note ? '<span class="muted">"' + esc(na.note) + '"</span>' : "") +
          '</div><button class="btn ghost" data-act="na-withdraw" data-day="' + x.day + '">Take back</button></div>';
      } else if (!bookedHere && list.length) {
        if (S.naOpen[x.day]) {
          html += '<div class="na-form"><b>Can\'t make any of the Day ' + x.day + ' dates?</b><span class="small muted">Your facilitator will see this and may add another date.</span>' +
            '<textarea id="na-' + x.day + '" maxlength="300" placeholder="Optional note, e.g. working every Saturday in March"></textarea>' +
            '<div class="na-actions"><button class="btn" data-act="na-send" data-day="' + x.day + '">Send</button><button class="btn ghost" data-act="na-toggle" data-day="' + x.day + '">Never mind</button></div></div>';
        } else html += '<button class="link na-link" data-act="na-toggle" data-day="' + x.day + '">Can\'t make any of these dates?</button>';
      }
      html += "</div>";
    });
    html += "</section>";
    html += '<p class="small muted">Cancelling or changing a date closes ' + h.cohort.cutoff_hours + " hours before it starts. If a full date frees up, the first person on its waiting list is booked automatically.</p></main>";
    app.innerHTML = html;
  }
  function studentCall(name, args, msg) {
    busy(true);
    q(sb.rpc(name, args)).then(function (h) { S.home = h; S.naOpen = {}; renderStudent(); if (msg) toast(msg); }).catch(fail).then(function () { busy(false); });
  }

  /* ============================ FACILITATOR ============================ */
  function loadFacilitator(keepTab) {
    busy(true);
    return q(sb.from("course_cohorts").select("*").order("created_at", { ascending: false })).then(function (cs) {
      S.cohorts = cs;
      var saved = store("dsy-course-cohort");
      S.cohortId = cs.some(function (c) { return c.id === S.cohortId; }) ? S.cohortId : cs.some(function (c) { return c.id === saved; }) ? saved : (cs.filter(function (c) { return !c.archived; })[0] || cs[0] || {}).id || null;
      return loadCohort();
    }).catch(function (e) {
      app.innerHTML = '<main class="wrap"><div class="panel pad stack"><h2>Could not load the course</h2><p class="muted">' + esc(e.message) +
        '</p><p class="small muted">If this says a table does not exist, the database setup (supabase/course-setup.sql) has not been run yet.</p></div></main>';
    }).then(function () { busy(false); });
  }
  function loadCohort() {
    if (!S.cohortId) { S.d = { none: true }; renderFac(); return Promise.resolve(); }
    store("dsy-course-cohort", S.cohortId);
    var id = S.cohortId, d = {};
    return Promise.all([
      q(sb.from("course_days").select("*").eq("cohort_id", id).order("day_number")),
      q(sb.from("course_workshops").select("*").eq("cohort_id", id).order("date").order("start_time")),
      q(sb.from("course_students").select("*").eq("cohort_id", id).order("first_name")),
      q(sb.from("course_events").select("*").eq("cohort_id", id).order("at", { ascending: false }).limit(150)),
      q(sb.rpc("course_account_status", { p_cohort: id }))
    ]).then(function (r) {
      d.days = r[0]; d.workshops = r[1]; d.students = r[2]; d.events = r[3]; d.accounts = {};
      (r[4] || []).forEach(function (a) { d.accounts[a.student_id] = a; });
      var wids = d.workshops.map(function (w) { return w.id; }), sids = d.students.map(function (s) { return s.id; });
      return Promise.all([
        wids.length ? q(sb.from("course_bookings").select("*").in("workshop_id", wids)) : [],
        wids.length ? q(sb.from("course_attendance").select("*").in("workshop_id", wids)) : [],
        sids.length ? q(sb.from("course_unavailable").select("*").in("student_id", sids).eq("status", "open")) : []
      ]);
    }).then(function (r) {
      d.bookings = r[0]; d.attendance = r[1]; d.unavailable = r[2];
      index(d); S.d = d; renderFac();
    });
  }
  function index(d) {
    d.cohort = S.cohorts.filter(function (c) { return c.id === S.cohortId; })[0];
    d.byStudent = {}; d.students.forEach(function (s) { d.byStudent[s.id] = s; });
    d.book = {}; d.bookings.forEach(function (b) { d.book[b.workshop_id + "|" + b.student_id] = b; });
    d.att = {}; d.attendance.forEach(function (a) { d.att[a.workshop_id + "|" + a.student_id] = a; });
    d.active = d.students.filter(function (s) { return s.active; });
    var nums = {}; d.days.forEach(function (x) { nums[x.day_number] = 1; }); d.workshops.forEach(function (w) { nums[w.day_number] = 1; });
    for (var i = 1; i <= (d.cohort.total_days || 0); i++) nums[i] = 1;
    d.dayList = Object.keys(nums).map(Number).sort(function (a, b) { return a - b; });
    d.dayTitle = {}; d.days.forEach(function (x) { d.dayTitle[x.day_number] = x.title; });
  }
  function nameOf(s) { return s ? (s.first_name + " " + s.last_name).trim() || s.staff_id : "Someone"; }
  function dayLabel(d, n) { return "Day " + n + (d.dayTitle[n] ? " · " + d.dayTitle[n] : ""); }
  function counts(d, w) {
    var c = { booked: 0, wait: 0, marked: 0, present: 0 };
    d.active.forEach(function (s) {
      var b = d.book[w.id + "|" + s.id], a = d.att[w.id + "|" + s.id];
      if (b && b.status === "confirmed") c.booked++;
      if (b && b.status === "waitlist") c.wait++;
      if (a) { c.marked++; if (DONE[a.status]) c.present++; }
    });
    return c;
  }
  function facStates(d, s) {
    return d.dayList.map(function (n) {
      var state = "open", on = null, today = todayIso();
      d.workshops.forEach(function (w) {
        if (w.day_number !== n) return;
        var a = d.att[w.id + "|" + s.id], b = d.book[w.id + "|" + s.id];
        if (a && DONE[a.status]) { state = "done"; on = w; }
        else if (state !== "done" && a && a.status === "left_early") state = "part";
        else if (state === "open" && b && b.status === "confirmed" && !w.cancelled && w.date >= today) state = "booked";
      });
      return { day: n, state: state, on: on };
    });
  }
  function seenKey() { return "dsy-course-seen:" + S.cohortId; }
  function newEvents(d) { var t = store(seenKey()) || ""; return d.events.filter(function (e) { return e.at > t; }); }

  function renderFac() {
    var d = S.d, h = location.hash.slice(1) || "dates", m;
    var picker = S.cohorts.length ? '<select id="cohort" aria-label="Group">' + S.cohorts.map(function (c) {
      return '<option value="' + c.id + '"' + (c.id === S.cohortId ? " selected" : "") + ">" + esc(c.name) + (c.archived ? " (archived)" : "") + "</option>";
    }).join("") + "</select>" : "";
    var html = '<main class="wrap">' + header({ title: "AR course bookings", line: "Facilitator · " + (S.me.name || "") }, '<a class="link" href="#student">Student view</a>');
    if (d.none || h === "new") {
      html += newGroupForm(d.none);
      app.innerHTML = html + "</main>"; return;
    }
    var nNew = newEvents(d).length;
    html += '<div class="row no-print">' + picker + '<a class="link" href="#new">+ New group</a></div>';
    if ((m = /^w=(.+)$/.exec(h))) { html += workshopScreen(d, m[1]); app.innerHTML = html + "</main>"; return; }
    var tabs = [["dates", "Dates"], ["students", "Students"], ["progress", "Progress"], ["changes", "Changes"], ["setup", "Setup"]];
    html += '<div class="tabs many" role="tablist">' + tabs.map(function (t) {
      return '<button role="tab" data-tab="' + t[0] + '" aria-selected="' + (h === t[0]) + '">' + t[1] + (t[0] === "changes" && nNew && h !== "changes" ? '<span class="n">' + nNew + "</span>" : "") + "</button>";
    }).join("") + "</div>";
    if (h === "students") html += studentsTab(d);
    else if (h === "progress") html += progressTab(d);
    else if (h === "changes") html += changesTab(d);
    else if (h === "setup") html += setupTab(d);
    else html += datesTab(d);
    app.innerHTML = html + "</main>";
    if (h === "changes" && d.events.length) store(seenKey(), d.events[0].at);
  }

  /* ---- Dates ---- */
  function workshopForm(d, w) {
    w = w || {};
    var opts = d.dayList.map(function (n) { return '<option value="' + n + '"' + (n === w.day_number ? " selected" : "") + ">" + esc(dayLabel(d, n)) + "</option>"; }).join("");
    var next = (d.dayList[d.dayList.length - 1] || 0) + 1;
    return '<div class="grid2">' +
      '<div class="field"><label for="f-day">Course day</label><select id="f-day">' + opts + '<option value="' + next + '"' + (!d.dayList.length ? " selected" : "") + ">Day " + next + " (new)</option></select></div>" +
      '<div class="field"><label for="f-date">Date</label><input id="f-date" type="date" value="' + esc(w.date || "") + '"></div>' +
      '<div class="field"><label for="f-start">Start</label><input id="f-start" type="time" value="' + esc(hm(w.start_time)) + '"></div>' +
      '<div class="field"><label for="f-end">Finish</label><input id="f-end" type="time" value="' + esc(hm(w.end_time)) + '"></div>' +
      '<div class="field"><label for="f-loc">Location</label><input id="f-loc" value="' + esc(w.location || "") + '" placeholder="e.g. Cummins station"></div>' +
      '<div class="field"><label for="f-cap">Places (blank = no limit)</label><input id="f-cap" type="number" min="1" inputmode="numeric" value="' + esc(w.capacity == null ? "" : w.capacity) + '"></div>' +
      '</div><div class="field"><label for="f-notes">Notes for students</label><input id="f-notes" value="' + esc(w.notes || "") + '" placeholder="e.g. bring lunch, wear uniform"></div>';
  }
  function readWorkshopForm() {
    var cap = $("f-cap").value.trim();
    var w = { day_number: +$("f-day").value, date: $("f-date").value, start_time: $("f-start").value || null, end_time: $("f-end").value || null,
      location: $("f-loc").value.trim(), capacity: cap ? +cap : null, notes: $("f-notes").value.trim(), updated_at: new Date().toISOString() };
    if (!w.date) throw new Error("Choose a date.");
    return w;
  }
  function datesTab(d) {
    var html = "", today = todayIso();
    var cant = d.unavailable.filter(function (u) { var s = d.byStudent[u.student_id]; return s && s.active && facStates(d, s).filter(function (x) { return x.day === u.day_number && x.state !== "done"; }).length; });
    if (cant.length) {
      html += '<section class="stack"><div class="dayhead"><h2>Can\'t make a day</h2><span class="chip warn">' + cant.length + '</span></div><ul class="panel sessions">' +
        cant.map(function (u) {
          return '<li class="person"><div class="who"><b>' + esc(nameOf(d.byStudent[u.student_id])) + "</b><span class=\"small muted\">" + esc(dayLabel(d, u.day_number)) + " · sent " + esc(fmtStamp(u.sent_at)) + "</span>" +
            (u.note ? '<span class="small">"' + esc(u.note) + '"</span>' : "") + '</div><button class="btn ghost" data-act="na-clear" data-sid="' + u.student_id + '" data-day="' + u.day_number + '">Clear</button></li>';
        }).join("") + '</ul><p class="small muted">Add another date for that day: they drop off this list when they book it.</p></section>';
    }
    if (S.adding) {
      html += '<section class="panel pad stack"><h2>Add a date</h2>' + workshopForm(d) + '<div class="row"><button class="btn" data-act="w-add">Save date</button><button class="btn ghost" data-act="w-add-toggle">Close</button></div></section>';
    } else html += '<button class="btn wide" data-act="w-add-toggle">+ Add a date</button>';
    if (!d.workshops.length) return html + '<p class="muted">No dates yet. Add the first one above.</p>';
    var up = d.workshops.filter(function (w) { return w.date >= today; }), past = d.workshops.filter(function (w) { return w.date < today; }).reverse();
    function row(w) {
      var c = counts(d, w), chips = [];
      if (w.cancelled) chips.push('<span class="chip bad">Cancelled</span>');
      chips.push('<span class="chip' + (w.capacity != null && c.booked >= w.capacity ? " warn" : "") + '">' + c.booked + (w.capacity != null ? " / " + w.capacity : "") + " booked</span>");
      if (c.wait) chips.push('<span class="chip hi">' + c.wait + " waiting</span>");
      if (w.date < today || c.marked) chips.push('<span class="chip' + (c.marked ? " good" : " bad") + '">' + (c.marked ? c.present + " present" : "Roll not marked") + "</span>");
      return '<li><a class="session tap' + (w.cancelled ? " cancelled" : "") + '" href="#w=' + w.id + '" style="color:inherit;text-decoration:none">' + whenBox(w.date) +
        '<div class="what"><span class="t">' + esc(dayLabel(d, w.day_number)) + '</span><span class="small muted">' + esc(timeText(w)) + (w.location ? " · " + esc(w.location) : "") +
        '</span><span class="row">' + chips.join("") + '</span></div><span class="go">›</span></a></li>';
    }
    if (up.length) html += '<section class="stack"><h2>Coming up</h2><ul class="panel sessions">' + up.map(row).join("") + "</ul></section>";
    if (past.length) html += '<section class="stack"><h2>Finished</h2><ul class="panel sessions">' + past.map(row).join("") + "</ul></section>";
    return html;
  }
  function workshopScreen(d, id) {
    var w = d.workshops.filter(function (x) { return x.id === id; })[0];
    if (!w) return '<a class="link back" href="#dates">‹ All dates</a><p class="muted">That date was not found.</p>';
    var c = counts(d, w), anyRows = d.bookings.some(function (b) { return b.workshop_id === w.id; }) || d.attendance.some(function (a) { return a.workshop_id === w.id; });
    var html = '<a class="link back" href="#dates">‹ All dates</a>';
    html += '<section class="panel pad stack' + (w.cancelled ? " cancelled" : "") + '"><div class="dayhead"><h2>' + esc(dayLabel(d, w.day_number)) + "</h2>" + (w.cancelled ? '<span class="chip bad">Cancelled</span>' : "") + "</div>" +
      '<p class="muted">' + esc(fmtDate(w.date)) + " · " + esc(timeText(w)) + (w.location ? " · " + esc(w.location) : "") + "</p>" +
      '<details><summary class="link">Edit this date</summary><div class="stack" style="margin-top:.75rem">' + workshopForm(d, w) +
      '<div class="row"><button class="btn" data-act="w-save" data-id="' + w.id + '">Save changes</button>' +
      (w.cancelled ? '<button class="btn ghost" data-act="w-restore" data-id="' + w.id + '">Restore date</button>' : '<button class="btn danger" data-act="w-cancel" data-id="' + w.id + '">Cancel this date</button>') +
      (anyRows ? "" : '<button class="btn danger" data-act="w-delete" data-id="' + w.id + '">Delete</button>') + "</div>" +
      '<p class="small muted">Cancelling keeps the record: booked students see the date is cancelled and are asked to choose another. Delete is only offered while nobody has booked.</p></div></details></section>';

    var list = d.active.slice().map(function (s) {
      var b = d.book[w.id + "|" + s.id], a = d.att[w.id + "|" + s.id], dr = S.draft[s.id];
      return { s: s, b: b && b.status !== "cancelled" ? b.status : null, status: dr ? dr.status : a ? a.status : "", note: dr ? dr.note : a ? a.note : "",
        na: d.unavailable.some(function (u) { return u.student_id === s.id && u.day_number === w.day_number; }) };
    });
    var rank = { confirmed: 0, waitlist: 1 };
    list.sort(function (x, y) { var a = rank[x.b] == null ? 2 : rank[x.b], b = rank[y.b] == null ? 2 : rank[y.b]; return a - b || nameOf(x.s).localeCompare(nameOf(y.s)); });
    var marked = list.filter(function (x) { return x.status; }).length;
    html += '<section class="stack"><div class="dayhead"><h2>Roll</h2><span class="count">' + c.booked + " booked · " + marked + " marked</span></div>";
    if (!list.length) html += '<p class="muted">No students in this group yet (Students tab).</p>';
    html += '<ul class="panel sessions">' + list.map(function (x) {
      var chip = x.b === "confirmed" ? '<span class="chip good">Booked</span>' : x.b === "waitlist" ? '<span class="chip hi">Waiting list</span>' : x.na ? '<span class="chip warn">Can\'t make it</span>' : '<span class="chip">Not booked</span>';
      var toggle = x.b === "confirmed" ? '<button class="link small" data-act="fac-unbook" data-sid="' + x.s.id + '" data-id="' + w.id + '">Remove booking</button>'
        : '<button class="link small" data-act="fac-book" data-sid="' + x.s.id + '" data-id="' + w.id + '">Book them</button>';
      return '<li class="person"><div class="who"><b>' + esc(nameOf(x.s)) + '</b><span class="row">' + chip + toggle + "</span></div>" +
        '<div class="seg4">' + Object.keys(ATT).map(function (k) {
          return '<button class="' + k + '" aria-pressed="' + (x.status === k) + '" data-act="mark" data-sid="' + x.s.id + '" data-st="' + k + '">' + ATT[k] + "</button>";
        }).join("") + '</div><input class="note" data-sid="' + x.s.id + '" value="' + esc(x.note) + '" placeholder="Note (optional), e.g. missed the birth station" maxlength="300"></li>';
    }).join("") + "</ul>";
    html += '<div class="savebar"><button class="btn wide" data-act="roll-save" data-id="' + w.id + '">Save roll</button></div>' +
      '<p class="small muted">Present and Late count as the day done. Left early shows in yellow so you can follow up. Tap a selected button again to clear it.</p></section>';
    return html;
  }

  /* ---- Students ---- */
  function studentsTab(d) {
    var lead = S.me.role === "leader";
    var html = '<section class="panel pad stack"><h2>Add students</h2><div class="field"><label for="f-people">One per line: ambulance ID, first name, last name</label>' +
      '<textarea id="f-people" placeholder="1234567, Sam, Smith&#10;7654321, Alex, Jones"></textarea></div><button class="btn" data-act="add-students">Add to ' + esc(d.cohort.name) + "</button>" +
      '<p class="small muted">' + (lead ? "As a leader, adding someone also puts their ID on the DSY access list so they can create an account."
        : "IDs that are not on the DSY access list yet need a leader to add them (Grant access), or a leader can add the students here.") +
      " Students create their account at dsytraining.com/signin/ (Create account, with their ambulance ID), then open this page.</p></section>";
    if (!d.students.length) return html + '<p class="muted">No students yet.</p>';
    html += '<ul class="panel sessions">' + d.students.slice().sort(function (a, b) { return (b.active - a.active) || nameOf(a).localeCompare(nameOf(b)); }).map(function (s) {
      var a = d.accounts[s.id] || {}, chip = a.account ? '<span class="chip good">Signed up</span>' : a.allowed ? '<span class="chip warn">Can create account</span>' : '<span class="chip bad">Not on access list</span>';
      return '<li class="person"><div class="who"><b>' + esc(nameOf(s)) + (s.active ? "" : " (removed)") + '</b><span class="row"><span class="small muted">ID ' + esc(s.staff_id) + "</span>" + chip + "</span></div>" +
        '<button class="btn ' + (s.active ? "danger" : "ghost") + '" data-act="s-active" data-sid="' + s.id + '" data-on="' + (!s.active) + '">' + (s.active ? "Remove" : "Add back") + "</button></li>";
    }).join("") + "</ul>";
    return html;
  }

  /* ---- Progress ---- */
  function progressTab(d) {
    var total = d.cohort.total_days || d.dayList.length;
    var html = '<div class="row no-print"><button class="btn ghost" onclick="window.print()">Print attendance record</button></div>' +
      '<div class="legend no-print"><span><i class="done"></i>Done</span><span><i class="booked"></i>Booked</span><span><i class="part"></i>Left early</span><span><i></i>Not done</span></div>';
    html += '<ul class="panel sessions no-print">' + d.active.map(function (s) {
      var st = facStates(d, s), done = st.filter(function (x) { return x.state === "done"; }).length;
      var todo = st.filter(function (x) { return x.state !== "done"; }).map(function (x) { return x.day; });
      return '<li class="person"><div class="who"><b>' + esc(nameOf(s)) + "</b>" +
        '<ol class="days mini">' + st.map(function (x) { return '<li class="' + x.state + '" title="Day ' + x.day + '">' + x.day + "</li>"; }).join("") + "</ol>" +
        '<span class="small muted">' + (done >= total && total ? "" : "Still to do: Day " + todo.join(", ")) + "</span></div>" +
        (done >= total && total ? '<span class="chip good">Complete</span>' : '<span class="count">' + done + " / " + total + "</span>") + "</li>";
    }).join("") + "</ul>";
    // printable record
    html += '<div class="print-only"><h2>' + esc(d.cohort.course_name) + " · " + esc(d.cohort.name) + '</h2><p class="small">Attendance record printed ' + esc(fmtDate(todayIso())) + '</p><table class="record"><thead><tr><th>Student</th><th>ID</th>' +
      d.dayList.map(function (n) { return "<th>Day " + n + "</th>"; }).join("") + "<th>Done</th></tr></thead><tbody>" +
      d.active.map(function (s) {
        var st = facStates(d, s);
        return "<tr><td>" + esc(nameOf(s)) + "</td><td>" + esc(s.staff_id) + "</td>" + st.map(function (x) {
          var cell = "";
          d.workshops.forEach(function (w) {
            if (w.day_number !== x.day) return;
            var a = d.att[w.id + "|" + s.id];
            if (a) cell += (cell ? "<br>" : "") + esc(shortDate(w.date)) + " " + esc(ATT[a.status]) + (a.note ? "<br><i>" + esc(a.note) + "</i>" : "");
          });
          return "<td>" + (cell || "–") + "</td>";
        }).join("") + "<td>" + st.filter(function (x) { return x.state === "done"; }).length + " / " + total + "</td></tr>";
      }).join("") + "</tbody></table></div>";
    return html;
  }

  /* ---- Changes ---- */
  function changesTab(d) {
    if (!d.events.length) return '<p class="muted">Nothing yet. Bookings, cancellations, waiting lists and "can\'t make it" notes show here as students make them.</p>';
    var seen = store(seenKey()) || "", wById = {};
    d.workshops.forEach(function (w) { wById[w.id] = w; });
    var words = { booked: "booked", switched: "switched to", cancelled: "cancelled", waitlist: "joined the waiting list for", promoted: "moved up from the waiting list onto",
      left_waitlist: "left the waiting list for", cant_make: "can't make any date for", withdrew: "took back their can't-make note for" };
    return '<ul class="panel sessions">' + d.events.map(function (e) {
      var w = wById[e.workshop_id];
      return '<li class="event' + (e.at > seen ? " new" : "") + '"><span class="t">' + esc(fmtStamp(e.at)) + "</span><span><b>" + esc(nameOf(d.byStudent[e.student_id])) + "</b> " +
        esc(words[e.kind] || e.kind) + " " + esc(dayLabel(d, e.day_number)) + (w ? " (" + esc(shortDate(w.date)) + ")" : "") + (e.detail ? ': "' + esc(e.detail) + '"' : "") + "</span></li>";
    }).join("") + "</ul>";
  }

  /* ---- Setup ---- */
  function linksText(links) { return (links || []).map(function (l) { return (l.label ? l.label + " | " : "") + l.url; }).join("\n"); }
  function parseLinks(t) {
    return t.split("\n").map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
      var i = l.lastIndexOf("|"); return i > -1 ? { label: l.slice(0, i).trim(), url: l.slice(i + 1).trim() } : { label: "", url: l };
    }).filter(function (l) { return /^(https?:\/\/|\/)/.test(l.url); });
  }
  function setupTab(d) {
    var c = d.cohort;
    var html = '<section class="panel pad stack"><h2>Group</h2><div class="grid2">' +
      '<div class="field"><label for="g-name">Group name</label><input id="g-name" value="' + esc(c.name) + '"></div>' +
      '<div class="field"><label for="g-course">Course name (students see this)</label><input id="g-course" value="' + esc(c.course_name) + '"></div>' +
      '<div class="field"><label for="g-total">Days to complete</label><input id="g-total" type="number" min="1" inputmode="numeric" value="' + esc(c.total_days || "") + '"></div>' +
      '<div class="field"><label for="g-cut">Students can cancel up to (hours before)</label><input id="g-cut" type="number" min="0" inputmode="numeric" value="' + esc(c.cancel_cutoff_hours) + '"></div></div>' +
      '<label class="check"><input type="checkbox" id="g-arch"' + (c.archived ? " checked" : "") + "> Archived (finished group: students no longer see it)</label>" +
      '<button class="btn" data-act="g-save">Save group</button></section>';
    html += '<section class="panel pad stack"><h2>Course days</h2><p class="small muted">A title for each day and links to its material (one per line, "Label | link"). Students see them under the day. ' +
      "Classroom slide shows are facilitators only, so students can't open those links; skills stations are open to students.</p>";
    var rows = d.dayList.length ? d.dayList : [1];
    html += rows.map(function (n) {
      var x = d.days.filter(function (y) { return y.day_number === n; })[0] || {};
      return '<div class="stack day-edit" data-day="' + n + '"><b>Day ' + n + '</b><div class="field"><input class="d-title" value="' + esc(x.title || "") + '" placeholder="Title, e.g. Medical Conditions"></div>' +
        '<div class="field"><textarea class="d-links" placeholder="Day 6 skills stations | /stations/ar-day6/">' + esc(linksText(x.links)) + "</textarea></div></div>";
    }).join("");
    html += '<div class="row"><button class="btn" data-act="d-save">Save days</button><button class="btn ghost" data-act="d-add">+ Add a day</button></div></section>';
    return html;
  }
  function newGroupForm(first) {
    var copy = S.cohortId ? '<label class="check"><input type="checkbox" id="n-copy" checked> Copy the course days, titles and links from ' + esc((S.d.cohort || {}).name || "the current group") + "</label>" : "";
    return '<section class="panel pad stack"><h2>' + (first ? "Set up your first group" : "New group") + '</h2><div class="grid2">' +
      '<div class="field"><label for="n-name">Group name</label><input id="n-name" placeholder="e.g. AR course 2027 group 1"></div>' +
      '<div class="field"><label for="n-total">Days to complete</label><input id="n-total" type="number" min="1" inputmode="numeric" value="' + esc(S.d && S.d.cohort && S.d.cohort.total_days || "") + '"></div>' +
      '<div class="field"><label for="n-cut">Students can cancel up to (hours before)</label><input id="n-cut" type="number" min="0" inputmode="numeric" value="48"></div></div>' + copy +
      '<div class="row"><button class="btn" data-act="g-create">Create group</button>' + (first ? "" : '<a class="link" href="#dates">Cancel</a>') + "</div></section>";
  }

  /* ------------------------------ actions ------------------------------ */
  function refresh(msg) { return loadCohort().then(function () { if (msg) toast(msg); }); }
  function act(p) { busy(true); return p.catch(fail).then(function () { busy(false); }); }

  app.addEventListener("change", function (e) {
    if (e.target.id === "cohort") { S.cohortId = e.target.value; S.draft = {}; act(loadCohort()); }
  });
  app.addEventListener("input", function (e) {
    if (e.target.classList.contains("note")) {
      var sid = e.target.getAttribute("data-sid"), cur = S.draft[sid] || currentMark(sid);
      S.draft[sid] = { status: cur.status, note: e.target.value };
    }
  });
  function currentMark(sid) {
    var m = /^#w=(.+)$/.exec(location.hash), a = m && S.d.att[m[1] + "|" + sid];
    return { status: a ? a.status : "", note: a ? a.note : "" };
  }

  app.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act],[data-tab]");
    if (!t) return;
    if (t.hasAttribute("data-tab")) { location.hash = t.getAttribute("data-tab"); return; }
    var a = t.getAttribute("data-act"), id = t.getAttribute("data-id"), sid = t.getAttribute("data-sid"), day = +t.getAttribute("data-day");
    var d = S.d;

    // student
    if (a === "book") return studentCall("course_book", { p_workshop: id, p_waitlist: false }, "Booked");
    if (a === "wait") return studentCall("course_book", { p_workshop: id, p_waitlist: true }, "You are on the waiting list");
    if (a === "cancel") { if (confirm("Cancel this?")) studentCall("course_cancel", { p_workshop: id }, "Cancelled"); return; }
    if (a === "na-toggle") { S.naOpen[day] = !S.naOpen[day]; return renderStudent(); }
    if (a === "na-send") return studentCall("course_cant_make", { p_day: day, p_note: ($("na-" + day) || {}).value || "", p_withdraw: false }, "Sent to your facilitator");
    if (a === "na-withdraw") return studentCall("course_cant_make", { p_day: day, p_note: "", p_withdraw: true }, "Taken back");

    // facilitator
    if (a === "w-add-toggle") { S.adding = !S.adding; return renderFac(); }
    if (a === "w-add") {
      return act(Promise.resolve().then(function () {
        var w = readWorkshopForm(); w.cohort_id = S.cohortId;
        return q(sb.from("course_workshops").insert(w));
      }).then(function () { S.adding = false; return refresh("Date added"); }));
    }
    if (a === "w-save") {
      return act(Promise.resolve().then(function () {
        var w = readWorkshopForm();
        return q(sb.from("course_workshops").update(w).eq("id", id));
      }).then(function () { return q(sb.rpc("course_promote", { p_workshop: id })); }).then(function () { return refresh("Saved"); }));
    }
    if (a === "w-cancel") {
      var c = counts(d, d.workshops.filter(function (w) { return w.id === id; })[0]);
      if (!confirm("Cancel this date?" + (c.booked ? " " + c.booked + " booked student(s) will see it is cancelled and be asked to choose another date." : ""))) return;
      return act(q(sb.from("course_workshops").update({ cancelled: true, updated_at: new Date().toISOString() }).eq("id", id)).then(function () { return refresh("Date cancelled"); }));
    }
    if (a === "w-restore") return act(q(sb.from("course_workshops").update({ cancelled: false, updated_at: new Date().toISOString() }).eq("id", id)).then(function () { return refresh("Date restored"); }));
    if (a === "w-delete") {
      if (!confirm("Delete this date?")) return;
      return act(q(sb.from("course_workshops").delete().eq("id", id)).then(function () { location.hash = "dates"; return refresh("Deleted"); }));
    }
    if (a === "mark") {
      var st = t.getAttribute("data-st"), cur = S.draft[sid] || currentMark(sid);
      S.draft[sid] = { status: cur.status === st ? "" : st, note: cur.note };
      return renderFac();
    }
    if (a === "roll-save") {
      var ups = [], dels = [];
      Object.keys(S.draft).forEach(function (k) {
        var dr = S.draft[k];
        if (dr.status) ups.push({ workshop_id: id, student_id: k, status: dr.status, note: dr.note || "", marked_by: S.uid, marked_at: new Date().toISOString() });
        else dels.push(k);
      });
      if (!ups.length && !dels.length) return toast("No changes to save");
      return act(Promise.all([
        ups.length ? q(sb.from("course_attendance").upsert(ups)) : null,
        dels.length ? q(sb.from("course_attendance").delete().eq("workshop_id", id).in("student_id", dels)) : null
      ]).then(function () { S.draft = {}; return refresh("Roll saved"); }));
    }
    if (a === "fac-book" || a === "fac-unbook") {
      var row = { workshop_id: id, student_id: sid, status: a === "fac-book" ? "confirmed" : "cancelled", updated_at: new Date().toISOString() };
      if (a === "fac-book") row.booked_at = row.updated_at;
      return act(q(sb.from("course_bookings").upsert(row)).then(function () {
        if (a === "fac-unbook") return q(sb.rpc("course_promote", { p_workshop: id }));
      }).then(function () { return refresh(a === "fac-book" ? "Booked" : "Booking removed"); }));
    }
    if (a === "na-clear") return act(q(sb.from("course_unavailable").update({ status: "cleared" }).eq("student_id", sid).eq("day_number", day)).then(function () { return refresh("Cleared"); }));
    if (a === "add-students") {
      var people = $("f-people").value.split("\n").map(function (l) { return l.split(/\s*[,\t]\s*/); }).filter(function (p) { return p[0] && p[0].trim(); })
        .map(function (p) { return { staff_id: p[0].trim(), first_name: (p[1] || "").trim(), last_name: (p.slice(2).join(" ") || "").trim() }; });
      if (!people.length) return toast("Paste at least one line", true);
      return act(q(sb.rpc("course_add_students", { p_cohort: S.cohortId, p_people: people })).then(function () { return refresh(people.length + " added"); }));
    }
    if (a === "s-active") return act(q(sb.from("course_students").update({ active: t.getAttribute("data-on") === "true" }).eq("id", sid)).then(function () { return refresh("Saved"); }));
    if (a === "g-save") {
      return act(q(sb.from("course_cohorts").update({ name: $("g-name").value.trim() || d.cohort.name, course_name: $("g-course").value.trim() || d.cohort.course_name,
        total_days: +$("g-total").value || null, cancel_cutoff_hours: +$("g-cut").value || 0, archived: $("g-arch").checked }).eq("id", S.cohortId))
        .then(function () { return loadFacilitator(); }).then(function () { toast("Saved"); }));
    }
    if (a === "d-add") {
      var eds = document.querySelectorAll(".day-edit"), last = eds[eds.length - 1], n = +last.getAttribute("data-day") + 1, el = last.cloneNode(true);
      el.setAttribute("data-day", n); el.querySelector("b").textContent = "Day " + n;
      el.querySelector(".d-title").value = ""; el.querySelector(".d-links").value = "";
      last.parentNode.insertBefore(el, last.nextSibling); el.querySelector(".d-title").focus(); return;
    }
    if (a === "d-save") {
      var rows = [].map.call(document.querySelectorAll(".day-edit"), function (el) {
        return { cohort_id: S.cohortId, day_number: +el.getAttribute("data-day"), title: el.querySelector(".d-title").value.trim(), links: parseLinks(el.querySelector(".d-links").value) };
      });
      return act(q(sb.from("course_days").upsert(rows)).then(function () { return refresh("Days saved"); }));
    }
    if (a === "g-create") {
      var name = $("n-name").value.trim();
      if (!name) return toast("Give the group a name", true);
      var copyFrom = $("n-copy") && $("n-copy").checked ? S.cohortId : null, oldDays = copyFrom && S.d.days ? S.d.days : [];
      return act(q(sb.from("course_cohorts").insert({ name: name, total_days: +$("n-total").value || null, cancel_cutoff_hours: +$("n-cut").value || 0 }).select().single()).then(function (c) {
        S.cohortId = c.id;
        if (oldDays.length) return q(sb.from("course_days").insert(oldDays.map(function (x) { return { cohort_id: c.id, day_number: x.day_number, title: x.title, links: x.links }; })));
      }).then(function () { location.hash = "setup"; return loadFacilitator(); }).then(function () { toast("Group created"); }));
    }
  });
})();
