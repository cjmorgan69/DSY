/* Dashboard logic, shared by /dashboard/ (phone and tablet) and /dashboard/wide/ (widescreen).
   Both pages use the same element ids; each page has its own layout and styles. Bump the ?v= tag in both when this changes. */
(function () {
  "use strict";
  var TZ = "Australia/Adelaide";
  var SB_URL = "https://ekaodnbnpsuayvmxvxbm.supabase.co";
  var SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYW9kbmJucHN1YXl2bXh2eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxMzQsImV4cCI6MjEwNzM0ODEzNH0.q3lTeCQAQjYeMUNl6lwsrxUAsTijJikABW4Ua2N4bmI";
  var sb = window.supabase.createClient(SB_URL, SB_KEY);
  var $ = function (id) { return document.getElementById(id); };
  var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function parts(d) {
    var o = {}; new Intl.DateTimeFormat("en-AU", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(d || new Date()).forEach(function (p) { o[p.type] = p.value; }); return o;
  }
  function todayIso() { var p = parts(); return p.year + "-" + p.month + "-" + p.day; }
  function addDays(iso, n) { var d = new Date(iso + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
  function dOf(iso) { return new Date(iso + "T12:00:00Z"); }
  function nice(iso) { var d = dOf(iso); return DAYS[d.getUTCDay()] + " " + d.getUTCDate() + " " + MON[d.getUTCMonth()]; }
  function t12(t) { var p = String(t).split(":"), h = +p[0], m = p[1]; return (h % 12 || 12) + (m === "00" ? "" : ":" + m) + (h < 12 ? "am" : "pm"); }
  function mins(t) { var p = String(t).split(":"); return +p[0] * 60 + +p[1]; }

  /* ---------- clock ---------- */
  function tick() {
    var now = new Date(), p = parts(now);
    $("time").textContent = new Intl.DateTimeFormat("en-AU", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true }).format(now).replace(" ", " ");
    $("date").textContent = new Intl.DateTimeFormat("en-AU", { timeZone: TZ, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now);
    var h = +p.hour, greet = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
    $("hello").textContent = greet + (window.__name ? ", " + window.__name : "");
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Google Calendar link ---------- */
  var GKEY = "dsy-dash-gcal";
  function setG() { var u = store(GKEY); $("gcal").href = u || "https://calendar.google.com/calendar/r"; }
  setG();
  $("gcalSet").addEventListener("click", function () { $("gUrl").value = store(GKEY) || ""; $("gDlg").showModal(); });
  $("gDlg").addEventListener("close", function () {
    if ($("gDlg").returnValue !== "save") return;
    var v = $("gUrl").value.trim();
    if (v && !/^https:\/\//i.test(v)) { alert("Please paste a link that starts with https://"); return; }
    store(GKEY, v || null); setG();
  });

  /* ---------- roster coverage ---------- */
  var CLUSTERS = [
    { key: "lowereyre", name: "Lower Eyre", url: "https://script.google.com/macros/s/AKfycbxEboPS9reZI5OpUMdlriag0QeAJzIyXFZ2Jy0z_4qBJLEK054R5bDcJgyWAW2YSP6l/exec" },
    { key: "centraleyre", name: "Central Eyre", url: "https://script.google.com/macros/s/AKfycbwbeUGYW4VaBC8i0k228ASyRQt-B4_7pKKr5F3O5L-CrCmTH0hnx48pN7QTqkjXrfwRDA/exec" },
    { key: "westcoast", name: "West Coast", url: "https://script.google.com/macros/s/AKfycbxrcfdjF7kUZQBkHuw2mqrYXhqz54VrK9Agv-zzOyBG8BbAbC-lrDkY6zGK91VAwB_z/exec" }
  ];
  var EXCLUDED = ["summer bay"];
  var RF = "dsy-dash-cluster", rFilter = store(RF) || "all", rData = null, selHour = null, crew = null, crewErr = [];
  function opDate() { var p = parts(); var d = p.year + "-" + p.month + "-" + p.day; return +p.hour < 8 ? addDays(d, -1) : d; }
  function loadRoster() {
    var date = opDate();
    return Promise.all(CLUSTERS.map(function (c) {
      var u = new URL(c.url); u.searchParams.set("action", "coverage"); u.searchParams.set("date", date); u.searchParams.set("_", Date.now());
      var ctl = new AbortController(), to = setTimeout(function () { ctl.abort(); }, 30000);
      return fetch(u.toString(), { redirect: "follow", credentials: "omit", signal: ctl.signal })
        .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
        .then(function (d) { if (!d.ok || !Array.isArray(d.teams) || !Array.isArray(d.hours)) throw new Error(d.error || "unexpected reply"); return { c: c, d: d }; })
        .catch(function (e) { return { c: c, err: e.name === "AbortError" ? "timed out" : e.message }; })
        .finally(function () { clearTimeout(to); });
    })).then(function (res) {
      var ok = res.filter(function (r) { return r.d; });
      if (!ok.length) { $("rHeat").innerHTML = '<p class="err">Could not load the rosters: ' + esc(res.map(function (r) { return r.c.name + " " + r.err; }).join("; ")) + "</p>"; $("rStats").innerHTML = ""; return; }
      var hours = ok[0].d.hours, teams = [];
      ok.forEach(function (r) {
        var by = {}; r.d.hours.forEach(function (h) { by[h.label + "|" + h.calendarDate] = h.counts; });
        r.d.teams.forEach(function (t, i) {
          if (EXCLUDED.indexOf(String(t.name || "").trim().toLowerCase()) > -1) return;
          teams.push({ cluster: r.c, name: t.name, counts: hours.map(function (h) { var c = by[h.label + "|" + h.calendarDate]; return c ? c[i] : null; }) });
        });
      });
      rData = { hours: hours, teams: teams, problems: res.filter(function (r) { return r.err; }), date: date };
      if (selHour != null && selHour >= hours.length) selHour = null;
      drawRoster(); drawCrew();
    });
  }
  function drawRoster() {
    if (!rData) return;
    var now = Date.now(), ni = -1;
    rData.hours.forEach(function (h, i) { if (Date.parse(h.start) <= now && now < Date.parse(h.end)) ni = i; });
    var fb = $("rFilter"); fb.innerHTML = "";
    [{ key: "all", name: "All clusters" }].concat(CLUSTERS).forEach(function (c) {
      var b = document.createElement("button"); b.type = "button"; b.className = "chip2"; b.textContent = c.name;
      b.setAttribute("aria-pressed", rFilter === c.key ? "true" : "false");
      b.addEventListener("click", function () { rFilter = c.key; store(RF, c.key); drawRoster(); drawCrew(); }); fb.appendChild(b);
    });
    var teams = rData.teams.filter(function (t) { return rFilter === "all" || t.cluster.key === rFilter; });
    var g = 0, y = 0, r = 0, gapH = 0;
    teams.forEach(function (t) {
      var c = ni > -1 ? t.counts[ni] : null; if (c != null) { if (c >= 2) g++; else if (c === 1) y++; else r++; }
      t.counts.forEach(function (v, i) { if (v === 0 && i >= Math.max(ni, 0)) gapH++; });
    });
    $("rStats").innerHTML = ni > -1
      ? '<div class="stat"><b>' + g + '</b><span>teams fully crewed now</span></div><div class="stat yel"><b>' + y + '</b><span>one crew now</span></div><div class="stat red"><b>' + r + '</b><span>no crew now</span></div><div class="stat"><b>' + gapH + '</b><span>uncovered team-hours left today</span></div>'
      : "";
    var html = "<table><thead><tr><th></th>";
    rData.hours.forEach(function (h, i) { html += '<th class="' + (i === ni ? "now" : "") + '">' + (i % 2 === 0 || i === ni ? esc(String(+h.label.slice(0, 2))) : "") + "</th>"; });
    html += "</tr></thead><tbody>";
    var last = null;
    teams.forEach(function (t) {
      if (rFilter === "all" && t.cluster.key !== last) { html += '<tr><th class="cl">' + esc(t.cluster.name) + '</th><td class="gap" colspan="' + rData.hours.length + '"></td></tr>'; last = t.cluster.key; }
      var rl = rosterLink(t.name);
      html += "<tr><th>" + (rl ? '<a href="' + rl + '">' + esc(t.name) + "</a>" : esc(t.name)) + "</th>";
      t.counts.forEach(function (c, i) {
        var cls = c == null ? "n" : c >= 2 ? "g" : c === 1 ? "y" : "r";
        html += '<td data-i="' + i + '" class="' + cls + (i === ni ? " now" : "") + (i === selHour ? " sel" : "") + '" title="' + esc(t.name + " " + rData.hours[i].label + ": " + (c == null ? "no data" : c + " crew")) + '">' + (c ? c : "") + "</td>";
      });
      html += "</tr>";
    });
    $("rHeat").innerHTML = html + "</tbody></table>";
    var note = "Operational day " + nice(rData.date) + ", 8am to 8am. Numbers are crew booked each hour.";
    if (rData.problems.length) note += " Not loaded: " + rData.problems.map(function (p) { return p.c.name + " (" + p.err + ")"; }).join(", ") + ".";
    $("rNote").textContent = note;
  }

  /* ---------- who is on shift (each team's own roster, getBookings) ---------- */
  function rosterTeams() {
    var T = window.DSY_ROSTER_TEAMS || {}, out = [];
    Object.keys(T).forEach(function (id) { if (id !== "test" && EXCLUDED.indexOf(T[id].name.toLowerCase()) < 0) out.push({ id: id, name: T[id].name, cluster: T[id].cluster, api: T[id].apiUrl }); });
    return out;
  }
  var CL_DIR = { "Lower Eyre": "lowereyre", "Central Eyre": "centraleyre", "West Coast": "westcoast" };
  function rosterLink(name) {
    var t = rosterTeams().filter(function (x) { return x.name.toLowerCase() === String(name).toLowerCase(); })[0];
    return t && CL_DIR[t.cluster] ? "/modules/rosters/" + CL_DIR[t.cluster] + "/" + t.id + "/" : "";
  }
  function loadCrew() {
    var teams = rosterTeams();
    if (!teams.length) { $("cBody").innerHTML = '<p class="err">Team list did not load.</p>'; return Promise.resolve(); }
    return Promise.all(teams.map(function (t) {
      var ctl = new AbortController(), to = setTimeout(function () { ctl.abort(); }, 60000);
      return fetch(t.api, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "getBookings", team: t.name }), redirect: "follow", credentials: "omit", signal: ctl.signal })
        .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
        .then(function (d) { if (!Array.isArray(d.bookings)) throw new Error(d.error || "unexpected reply"); return { t: t, b: d.bookings }; })
        .catch(function (e) { return { t: t, err: e.name === "AbortError" ? "timed out" : e.message }; })
        .finally(function () { clearTimeout(to); });
    })).then(function (res) {
      crew = {}; crewErr = [];
      res.forEach(function (r) { if (r.err) crewErr.push(r.t.name + " (" + r.err + ")"); else crew[r.t.name.toLowerCase()] = r.b; });
      drawCrew();
    });
  }
  function hm(ms) { return new Intl.DateTimeFormat("en-AU", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(ms)).replace(" ", ""); }
  function drawCrew() {
    var at = Date.now(), title = "On shift now";
    if (selHour != null && rData) { var h = rData.hours[selHour]; at = Date.parse(h.start) + 1000; title = "On shift at " + h.label + " (" + nice(h.calendarDate) + ")"; }
    $("cTitle").textContent = title; $("cNow").hidden = selHour == null;
    if (!crew) return;
    var teams = rosterTeams().filter(function (t) { return rFilter === "all" || CL_DIR[t.cluster] === rFilter; });
    var empty = [];
    var html = '<div class="crew">' + teams.map(function (t) {
      var b = crew[t.name.toLowerCase()];
      if (!b) return '<div class="ct"><h3>' + esc(t.name) + '</h3><span class="note">Not loaded</span></div>';
      var on = b.filter(function (x) { return Date.parse(x.start) <= at && at < Date.parse(x.end); })
        .sort(function (a, c) { return String(a.user).localeCompare(String(c.user)); });
      var link = rosterLink(t.name);
      if (!on.length) { empty.push(link ? '<a href="' + link + '">' + esc(t.name) + "</a>" : esc(t.name)); return ""; }
      return '<div class="ct"><h3>' + (link ? '<a href="' + link + '">' + esc(t.name) + "</a>" : esc(t.name)) + "<span>" + esc(t.cluster) + "</span></h3>" +
        (on.length ? "<ul>" + on.map(function (x) {
          return "<li><b>" + esc(x.user) + "</b>" + (x.clinicalLevel ? "<em>" + esc(x.clinicalLevel) + "</em>" : "") + (x.restriction && x.restriction !== "N" ? "<em>" + esc(x.restriction) + "</em>" : "") +
            "<small>to " + hm(Date.parse(x.end)) + "</small></li>";
        }).join("") + "</ul>" : '<span class="nc">No crew booked</span>') + "</div>";
    }).join("") + "</div>";
    if (html === '<div class="crew"></div>') html = "";
    if (empty.length) html += '<div class="ct none"><span class="nc">No crew booked</span><span class="small">' + empty.join(", ") + "</span></div>";
    if (crewErr.length) html += '<p class="note">Not loaded: ' + esc(crewErr.join(", ")) + ".</p>";
    html += '<p class="note">From each team\'s roster when the dashboard opened. Tap a team name to open its roster.</p>';
    $("cBody").innerHTML = html;
  }
  $("rHeat").addEventListener("click", function (e) {
    var td = e.target.closest("td[data-i]"); if (!td) return;
    var i = +td.dataset.i; selHour = selHour === i ? null : i; drawRoster(); drawCrew();
  });
  $("cNow").addEventListener("click", function () { selHour = null; drawRoster(); drawCrew(); });

  /* ---------- tasks (Supabase public.dashboard_tasks, leaders only) ---------- */
  var tasks = [], showDone = false;
  function loadTasks() {
    return sb.from("dashboard_tasks").select("id,title,due_date,done,done_at,created_at").order("created_at")
      .then(function (r) { if (r.error) throw r.error; tasks = r.data || []; drawTasks(); })
      .catch(function (e) { $("tList").innerHTML = '<p class="err">Could not load tasks: ' + esc(e.message || e) + "</p>"; });
  }
  function taskErr(e) { alert("That didn't save: " + (e && e.message || e) + ". Refresh and try again."); loadTasks(); }
  function dueTag(d, t) {
    if (!d) return "";
    var n = Math.round((dOf(d) - dOf(t)) / 864e5);
    var txt = n === 0 ? "Today" : n === 1 ? "Tomorrow" : n === -1 ? "Yesterday" : n < 0 ? (-n) + " days late" : n < 7 ? DAYS[dOf(d).getUTCDay()] : nice(d);
    return '<span class="due' + (n < 0 ? " late" : n <= 2 ? " soon" : "") + '" title="Due ' + nice(d) + '">' + txt + "</span>";
  }
  function drawTasks() {
    var t = todayIso();
    var open = tasks.filter(function (x) { return !x.done; }).sort(function (a, b) {
      if (a.due_date && b.due_date) return a.due_date < b.due_date ? -1 : a.due_date > b.due_date ? 1 : 0;
      if (a.due_date) return -1; if (b.due_date) return 1; return a.created_at < b.created_at ? -1 : 1;
    });
    var done = tasks.filter(function (x) { return x.done; }).sort(function (a, b) { return String(b.done_at) < String(a.done_at) ? -1 : 1; }).slice(0, 20);
    var late = open.filter(function (x) { return x.due_date && x.due_date < t; }).length;
    $("tCount").textContent = open.length ? open.length + " to do" + (late ? " · " + late + " overdue" : "") : "";
    function row(x) {
      return '<li data-id="' + x.id + '"' + (x.done ? ' class="done"' : "") + '><input type="checkbox" aria-label="Done"' + (x.done ? " checked" : "") + '>' +
        '<span class="tt" tabindex="0" title="Tap to edit">' + esc(x.title) + "</span>" + (x.done ? "<span></span>" : dueTag(x.due_date, t)) +
        '<button class="del" type="button" aria-label="Delete task" title="Delete">×</button></li>';
    }
    var html = open.length ? '<ul class="tasks">' + open.map(row).join("") + "</ul>" : '<p class="tempty">Nothing to do. 🎉</p>';
    if (done.length) {
      html += '<button class="tmore" type="button" id="tToggle">' + (showDone ? "Hide done" : "Show done (" + done.length + ")") + "</button>";
      if (showDone) html += '<ul class="tasks">' + done.map(row).join("") + "</ul>";
    }
    $("tList").innerHTML = html;
  }
  function byId(id) { return tasks.filter(function (x) { return x.id === id; })[0]; }
  $("tForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var title = $("tTitle").value.trim(), due = $("tDue").value || null; if (!title) return;
    $("tTitle").value = ""; $("tDue").value = "";
    sb.from("dashboard_tasks").insert({ title: title, due_date: due }).select("id,title,due_date,done,done_at,created_at")
      .then(function (r) { if (r.error) throw r.error; tasks = tasks.concat(r.data); drawTasks(); }).catch(taskErr);
    $("tTitle").focus();
  });
  $("tList").addEventListener("click", function (e) {
    if (e.target.id === "tToggle") { showDone = !showDone; drawTasks(); return; }
    var li = e.target.closest("li[data-id]"); if (!li) return;
    var x = byId(li.dataset.id); if (!x) return;
    if (e.target.matches("input[type=checkbox]")) {
      x.done = e.target.checked; x.done_at = x.done ? new Date().toISOString() : null; drawTasks();
      sb.from("dashboard_tasks").update({ done: x.done, done_at: x.done_at }).eq("id", x.id).then(function (r) { if (r.error) taskErr(r.error); });
    } else if (e.target.closest(".del")) {
      if (!confirm('Delete "' + x.title + '"?')) return;
      tasks = tasks.filter(function (y) { return y !== x; }); drawTasks();
      sb.from("dashboard_tasks").delete().eq("id", x.id).then(function (r) { if (r.error) taskErr(r.error); });
    } else if (e.target.closest(".tt") && !e.target.isContentEditable) {
      var sp = e.target.closest(".tt"); sp.contentEditable = "true"; sp.focus();
      var rg = document.createRange(); rg.selectNodeContents(sp); rg.collapse(false); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(rg);
      function finish(save) {
        sp.removeEventListener("blur", onBlur); sp.removeEventListener("keydown", onKey);
        var v = sp.textContent.trim().slice(0, 300);
        if (save && v && v !== x.title) { x.title = v; sb.from("dashboard_tasks").update({ title: v }).eq("id", x.id).then(function (r) { if (r.error) taskErr(r.error); }); }
        drawTasks();
      }
      function onBlur() { finish(true); }
      function onKey(k) { if (k.key === "Enter") { k.preventDefault(); sp.blur(); } else if (k.key === "Escape") { sp.removeEventListener("blur", onBlur); finish(false); } }
      sp.addEventListener("blur", onBlur); sp.addEventListener("keydown", onKey);
    }
  });

  /* ---------- shortcut tile: lesson count ---------- */
  function loadLessonCount() {
    return sb.from("lessons").select("id", { count: "exact", head: true }).then(function (r) {
      if (!r.error && r.count != null) $("lessonCount").textContent = $("lessonCount").hasAttribute("data-short") ? String(r.count) : r.count + " lessons in the library";
    });
  }

  /* ---------- training sessions ---------- */
  function hasLesson(s) { return !!s.lesson_id || (Array.isArray(s.lesson_ids) && s.lesson_ids.length > 0); }
  function loadSessions() {
    var t = todayIso(), end = addDays(t, 60);
    return Promise.all([
      sb.from("sessions").select("id,group_id,session_date,start_time,end_time,location,session_type,topic,facilitator_name,lesson_id,lesson_ids").gte("session_date", t).lte("session_date", end).order("session_date").order("start_time"),
      sb.from("groups").select("id,name")
    ]).then(function (r) {
      if (r[0].error) throw r[0].error;
      var gn = {}; (r[1].data || []).forEach(function (g) { gn[g.id] = g.name; });
      drawSessions(r[0].data || [], gn, t);
    }).catch(function (e) { $("tBody").innerHTML = '<p class="err">Could not load sessions: ' + esc(e.message || e) + "</p>"; });
  }
  function drawSessions(rows, gn, t) {
    var nowM = mins(parts().hour + ":" + parts().minute);
    rows = rows.filter(function (s) { return s.session_date > t || mins(s.end_time || s.start_time) > nowM; });
    var html = "";
    if (!rows.length) { $("tBody").innerHTML = '<div class="banner"><b>No sessions booked in the next 2 months</b><span class="small">Add them in the training app.</span></div>'; return; }
    var n = rows[0], days = Math.round((dOf(n.session_date) - dOf(t)) / 864e5);
    var when = days === 0 ? "Tonight" : days === 1 ? "Tomorrow" : "In " + days + " days";
    if (days === 0 && mins(n.start_time) < 17 * 60) when = "Today";
    html += '<div class="banner"><span class="eyebrow">Next session · ' + when + '</span><b>' + esc(gn[n.group_id] || "Team") + (n.topic ? " · " + esc(n.topic) : "") + "</b>" +
      '<span class="small">' + nice(n.session_date) + ", " + t12(n.start_time) + (n.end_time ? " to " + t12(n.end_time) : "") + (n.location ? " · " + esc(n.location) : "") + " · " + (n.session_type === "team" ? "Team-led" : "Leader-led") +
      (n.facilitator_name ? " · " + esc(n.facilitator_name) : "") + "</span>" + (hasLesson(n) ? "" : '<span class="small"><b style="font-size:inherit;font-family:inherit">No lesson yet</b>: pick one in the training app.</span>') + "</div>";
    var soon = rows.filter(function (s) { return s.session_date <= addDays(t, 27); }), need = soon.filter(function (s) { return !hasLesson(s); });
    if (need.length) html += '<div class="banner warn"><span><b style="font-size:1rem">' + need.length + " of " + soon.length + "</b> sessions in the next 4 weeks have no lesson. " +
      '<a href="/training/">Allocate lessons →</a></span></div>';
    else if (soon.length) html += '<div class="banner"><span class="small">Every session in the next 4 weeks has a lesson. 👍</span></div>';
    // 4-week calendar from this week's Monday
    var d0 = dOf(t), k = (d0.getUTCDay() + 6) % 7, mon = addDays(t, -k);
    html += '<div class="cal">' + ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(function (x) { return '<div class="dn">' + x + "</div>"; }).join("");
    for (var i = 0; i < 28; i++) {
      var iso = addDays(mon, i), dd = dOf(iso), on = rows.filter(function (s) { return s.session_date === iso; });
      html += '<div class="d' + (iso < t ? " past" : "") + (iso === t ? " today" : "") + '" title="' + esc(on.map(function (s) { return (gn[s.group_id] || "") + " " + t12(s.start_time) + (hasLesson(s) ? "" : " (no lesson)"); }).join("\n")) + '"><em>' +
        dd.getUTCDate() + (dd.getUTCDate() === 1 || i === 0 ? " " + MON[dd.getUTCMonth()] : "") + "</em>" + on.map(function (s) { return '<i class="' + (hasLesson(s) ? "" : "nl") + '"></i>'; }).join("") + "</div>";
    }
    html += '</div><div class="legend"><span><i style="background:var(--brand)"></i>lesson set</span><span><i style="background:var(--y)"></i>needs a lesson</span></div>';
    html += '<ul class="slist">' + rows.slice(0, 6).map(function (s) {
      var dd = dOf(s.session_date);
      return '<li><div class="dt"><span>' + DAYS[dd.getUTCDay()] + "</span><b>" + dd.getUTCDate() + "</b><span>" + MON[dd.getUTCMonth()] + '</span></div><div class="t"><b>' + esc(gn[s.group_id] || "Team") + (s.topic ? " · " + esc(s.topic) : "") +
        "</b><span>" + t12(s.start_time) + " · " + (s.session_type === "team" ? "Team-led" : "Leader-led") + (s.location ? " · " + esc(s.location) : "") + "</span></div>" +
        (hasLesson(s) ? '<span class="tag ok">Lesson set</span>' : '<span class="tag need">Needs lesson</span>') + "</li>";
    }).join("") + "</ul>";
    if (rows.length > 6) html += '<p class="note">+ ' + (rows.length - 6) + ' more in the next 2 months.</p>';
    $("tBody").innerHTML = html;
  }

  /* ---------- dispatch (paging feed) ---------- */
  var TEAMS = { CU: ["Cummins", "#0e9f8e"], CO: ["CO", "#8a5cf6"], EL: ["EL", "#e0752b"], SB: ["SB", "#2f7fe0"], PK: ["PK", "#d6457f"], PL: ["Port Lincoln", "#64748b"] };
  var EXTRA = ["#b45309", "#15803d", "#be123c", "#0369a1", "#7c3aed", "#4d7c0f"];
  function codeOf(j) { return String(j.unit || "").replace(/\d+$/, ""); }
  function loadDispatch() {
    var t = todayIso(), from = addDays(t, -6);
    return sb.from("paging_jobs").select("job_key,job_date,job_time,locality,job_type,priority,unit").gte("job_date", from).lte("job_date", t).order("job_time")
      .then(function (r) { if (r.error) throw r.error; drawDispatch(r.data || [], from, t); })
      .catch(function (e) { $("dBody").innerHTML = '<p class="err">Could not load the dispatch feed: ' + esc(e.message || e) + "</p>"; });
  }
  function drawDispatch(jobs, from, t) {
    var colour = {}, ei = 0;
    function team(c) { if (TEAMS[c]) return TEAMS[c]; if (!colour[c]) colour[c] = [c || "?", EXTRA[ei++ % EXTRA.length]]; return colour[c]; }
    var towns = {}, used = {}, p1 = 0;
    jobs.forEach(function (j) { towns[j.locality || "No town"] = (towns[j.locality || "No town"] || 0) + 1; used[codeOf(j)] = 1; if (+j.priority === 1) p1++; });
    var top = Object.keys(towns).sort(function (a, b) { return towns[b] - towns[a]; })[0];
    var todayN = jobs.filter(function (j) { return j.job_date === t; }).length;
    var html = '<div class="stats"><div class="stat"><b>' + jobs.length + '</b><span>jobs in 7 days</span></div><div class="stat"><b>' + todayN + '</b><span>today so far</span></div><div class="stat red"><b>' + p1 + '</b><span>priority 1</span></div>' +
      (top ? '<div class="stat"><b style="font-size:1.1rem">' + esc(top) + '</b><span>busiest town (' + towns[top] + ")</span></div>" : "") + "</div>";
    html += '<div class="raxis"><div></div><div><span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>12am</span></div></div><div class="roads">';
    var p = parts(), nowM = +p.hour * 60 + +p.minute;
    for (var i = 0; i < 7; i++) {
      var iso = addDays(from, i), dd = dOf(iso), js = jobs.filter(function (j) { return j.job_date === iso; });
      html += '<div class="rrow"><div class="lab"><b>' + (iso === t ? "Today" : DAYS[dd.getUTCDay()]) + "</b><span>" + dd.getUTCDate() + " " + MON[dd.getUTCMonth()] + " · " + js.length + '</span></div><div class="road">' +
        '<div class="nt" style="left:0;width:25%"></div><div class="nt" style="left:75%;width:25%"></div>' +
        (js.length ? "" : '<div class="q">quiet day</div>') +
        js.map(function (j) { var tm = team(codeOf(j)); return '<span class="ab" style="left:' + (mins(j.job_time) / 14.4).toFixed(2) + "%;--tc:" + tm[1] + '" title="' + esc(String(j.job_time).slice(0, 5) + " " + j.job_type + " · " + (j.locality || "") + " · P" + j.priority + " · " + j.unit) + '">🚑</span>'; }).join("") +
        (iso === t ? '<div class="nowl" style="left:' + (nowM / 14.4).toFixed(2) + '%"></div>' : "") + "</div></div>";
    }
    html += '</div><div class="tl">' + Object.keys(used).map(function (c) { var tm = team(c); return '<span style="--tc:' + tm[1] + '"><i></i>' + esc(tm[0]) + "</span>"; }).join("") + "<span>Shaded = before 6am / after 6pm</span></div>";
    html += '<p class="note">From the SAAS paging feed (postcodes 5605, 5606, 5607, 5631), captured once a day at about 9am, so today may be incomplete. Tap the full screen for job details.</p>';
    $("dBody").innerHTML = html;
  }

  /* ---------- weather ---------- */
  var TOWNS = [
    ["Tumby Bay", -34.375, 136.103], ["Port Neill", -34.118, 136.350], ["Cummins", -34.264, 135.727], ["Coffin Bay", -34.620, 135.468], ["Port Lincoln", -34.726, 135.858],
    ["Cleve", -33.700, 136.494], ["Cowell", -33.682, 136.921], ["Lock", -33.567, 135.757], ["Elliston", -33.648, 134.889], ["Wudinna", -33.049, 135.463],
    ["Kimba", -33.141, 136.418], ["Streaky Bay", -32.797, 134.212], ["Port Kenny", -33.171, 134.687]
  ];
  var WK = "dsy-dash-town", town = store(WK) || "Tumby Bay";
  if (!TOWNS.some(function (x) { return x[0] === town; })) town = "Tumby Bay";
  var WMO = { 0: ["☀️", "Clear"], 1: ["🌤️", "Mostly sunny"], 2: ["⛅", "Partly cloudy"], 3: ["☁️", "Cloudy"], 45: ["🌫️", "Fog"], 48: ["🌫️", "Fog"],
    51: ["🌦️", "Drizzle"], 53: ["🌦️", "Drizzle"], 55: ["🌦️", "Drizzle"], 56: ["🌧️", "Freezing drizzle"], 57: ["🌧️", "Freezing drizzle"],
    61: ["🌧️", "Light rain"], 63: ["🌧️", "Rain"], 65: ["🌧️", "Heavy rain"], 66: ["🌧️", "Freezing rain"], 67: ["🌧️", "Freezing rain"],
    71: ["🌨️", "Snow"], 73: ["🌨️", "Snow"], 75: ["🌨️", "Snow"], 77: ["🌨️", "Snow"], 80: ["🌦️", "Showers"], 81: ["🌧️", "Showers"], 82: ["⛈️", "Heavy showers"],
    85: ["🌨️", "Snow showers"], 86: ["🌨️", "Snow showers"], 95: ["⛈️", "Thunderstorm"], 96: ["⛈️", "Storm, hail"], 99: ["⛈️", "Storm, hail"] };
  function wmo(c) { return WMO[c] || ["🌡️", ""]; }
  function compass(deg) { return ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(((deg % 360) + 360) % 360 / 45) % 8]; }
  function drawTowns() {
    var b = $("wxTowns"); b.innerHTML = "";
    TOWNS.forEach(function (x) {
      var e = document.createElement("button"); e.type = "button"; e.className = "chip2"; e.textContent = x[0]; e.setAttribute("aria-pressed", x[0] === town ? "true" : "false");
      e.addEventListener("click", function () { town = x[0]; store(WK, town); drawTowns(); loadWeather(); }); b.appendChild(e);
    });
  }
  function loadWeather() {
    var x = TOWNS.filter(function (z) { return z[0] === town; })[0];
    var u = "https://api.open-meteo.com/v1/forecast?latitude=" + x[1] + "&longitude=" + x[2] +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant" +
      "&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&timezone=Australia%2FAdelaide&forecast_days=7";
    $("wxBody").innerHTML = '<div class="skel"></div>';
    return fetch(u).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); }).then(function (w) {
      var c = w.current, d = w.daily, t = todayIso();
      var html = '<div class="now-w"><span class="ic">' + wmo(c.weather_code)[0] + "</span><div><b>" + Math.round(c.temperature_2m) + '°</b> <span class="muted small">feels ' + Math.round(c.apparent_temperature) + "°</span>" +
        '<div class="small muted">' + esc(town) + " now · " + wmo(c.weather_code)[1] + " · wind " + compass(c.wind_direction_10m) + " " + Math.round(c.wind_speed_10m) + " km/h</div></div></div>";
      var warn = [];
      html += '<div class="wdays">' + d.time.map(function (iso, i) {
        var dd = dOf(iso), hot = d.temperature_2m_max[i] >= 35 && d.wind_gusts_10m_max[i] >= 40, rain = d.precipitation_probability_max[i] || 0;
        if (hot) warn.push(nice(iso));
        return '<div class="wd' + (iso === t ? " today" : "") + (hot ? " hot" : "") + '" title="' + esc(wmo(d.weather_code[i])[1] + ", " + (d.precipitation_sum[i] || 0) + " mm, gusts " + Math.round(d.wind_gusts_10m_max[i]) + " km/h") + '">' +
          '<span class="n">' + (iso === t ? "Today" : DAYS[dd.getUTCDay()]) + '</span><span class="ic">' + wmo(d.weather_code[i])[0] + '</span><span class="hi">' + Math.round(d.temperature_2m_max[i]) + '°</span><span class="lo">' + Math.round(d.temperature_2m_min[i]) + "°</span>" +
          '<span class="rb"><i style="width:' + rain + '%"></i></span><span class="rn">' + rain + '%</span><span class="wn">' + compass(d.wind_direction_10m_dominant[i]) + " " + Math.round(d.wind_speed_10m_max[i]) + "</span></div>";
      }).join("") + "</div>";
      if (warn.length) html += '<div class="banner warn"><span class="small"><b style="font-size:inherit;font-family:inherit">Hot and windy</b> (35°+ with strong gusts): ' + esc(warn.join(", ")) + '. Check the <a href="https://www.cfs.sa.gov.au/warnings-restrictions/" target="_blank" rel="noopener">CFS fire danger</a>.</span></div>';
      html += '<p class="note">Rain % = chance of rain. Wind = direction and top speed in km/h.</p>';
      $("wxBody").innerHTML = html;
    }).catch(function (e) { $("wxBody").innerHTML = '<p class="err">Could not load the weather: ' + esc(e.message || e) + "</p>"; });
  }

  /* ---------- start and refresh ---------- */
  function stamp() { $("updated").textContent = "Updated " + new Intl.DateTimeFormat("en-AU", { timeZone: TZ, hour: "numeric", minute: "2-digit" }).format(new Date()); }
  function loadAll() { stamp(); loadRoster(); loadCrew(); loadTasks(); loadLessonCount(); loadSessions(); loadDispatch(); loadWeather(); }
  drawTowns();
  (window.DSY_GATE ? window.DSY_GATE.ready : Promise.resolve({})).then(function (me) {
    if (me && me.name) { window.__name = String(me.name).split(" ")[0]; tick(); }
    loadAll();
    setInterval(function () { drawRoster(); drawCrew(); }, 60000);   // move the "now" outline
    setInterval(function () { stamp(); loadRoster(); loadCrew(); loadSessions(); loadDispatch(); if (!document.querySelector("#tList [contenteditable=true]") && document.activeElement !== $("tTitle")) loadTasks(); }, 10 * 60000);
    setInterval(loadWeather, 60 * 60000);
  });
  $("refresh").addEventListener("click", loadAll);
})();
