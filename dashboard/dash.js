/* Dashboard logic, shared by /dashboard/ (phone and tablet) and /dashboard/wide/ (widescreen).
   Both pages use the same element ids; each page has its own layout and styles. Run node .claude/tools/stamp.js when this changes (it bumps the tag in both). */
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

  /* ---------- Google Calendar link ----------
     Saved on the signed-in leader's DSY account (private table user_settings, only they can read it; 16 Nov 2026), so it follows them to any device and
     is never shared with another leader on the same computer. A link saved the old way (on this device) is moved to the
     account once. Blank = the normal Google Calendar for whoever is signed into Google. */
  var GDEF = "https://calendar.google.com/calendar/r", gUid = null, gUrl = null;
  function setG() { $("gcal").href = gUrl || GDEF; }
  setG();
  function saveG(v) {
    gUrl = v || null; setG();
    if (!gUid) return Promise.resolve();
    return sb.from("user_settings").upsert({ user_id: gUid, gcal_url: gUrl, updated_at: new Date().toISOString() }).then(function (r) { if (r.error) alert("The calendar link didn't save: " + r.error.message); });
  }
  sb.auth.getSession().then(function (x) {
    var u = x.data && x.data.session && x.data.session.user; if (!u) return;
    gUid = u.id;
    return sb.from("user_settings").select("gcal_url").eq("user_id", gUid).then(function (r) {
      gUrl = (r.data && r.data[0] && r.data[0].gcal_url) || null;
      var old = store("dsy-dash-gcal");
      if (old) { store("dsy-dash-gcal", null); if (!gUrl && /^https:\/\//i.test(old)) return saveG(old); }
      setG();
    });
  });
  $("gcalSet").addEventListener("click", function () { $("gUrl").value = gUrl || ""; $("gDlg").showModal(); });
  $("gDlg").addEventListener("close", function () {
    if ($("gDlg").returnValue !== "save") return;
    var v = $("gUrl").value.trim();
    if (v && !/^https:\/\//i.test(v)) { alert("Please paste a link that starts with https://"); return; }
    saveG(v);
  });

  /* ---------- roster coverage ---------- */
  var CLUSTERS = [
    { key: "lowereyre", name: "Lower Eyre", url: "https://script.google.com/macros/s/AKfycbxEboPS9reZI5OpUMdlriag0QeAJzIyXFZ2Jy0z_4qBJLEK054R5bDcJgyWAW2YSP6l/exec" },
    { key: "centraleyre", name: "Central Eyre", url: "https://script.google.com/macros/s/AKfycbwbeUGYW4VaBC8i0k228ASyRQt-B4_7pKKr5F3O5L-CrCmTH0hnx48pN7QTqkjXrfwRDA/exec" },
    { key: "westcoast", name: "West Coast", url: "https://script.google.com/macros/s/AKfycbxrcfdjF7kUZQBkHuw2mqrYXhqz54VrK9Agv-zzOyBG8BbAbC-lrDkY6zGK91VAwB_z/exec" }
  ];
  var EXCLUDED = ["summer bay"];
  var RF = "dsy-dash-cluster", rFilter = store(RF) || "all", rData = null, selHour = null, crew = null, crewErr = [];
  /* Rolling window (owner, 22 Nov 2026): 3 hours back to 21 hours ahead of the current hour. The rosters answer one
     operational day (8am to 8am) at a time, so the two days the window touches are loaded and joined. */
  var HOUR = 3600000, rHourKey = null;
  /* Look ahead (owner, 24 Nov 2026): rOffset 0 is the rolling 24 hours; 1 to 7 are whole operational days (8am to 8am),
     1 being the one that starts at the next 8am. One small request per cluster per day. */
  var rOffset = 0, RMAX = 7, rSeq = 0;
  function opDateAt(ms) { var p = parts(new Date(ms)); var d = p.year + "-" + p.month + "-" + p.day; return +p.hour < 8 ? addDays(d, -1) : d; }
  function dayAt(ms) { var p = parts(new Date(ms)); return nice(p.year + "-" + p.month + "-" + p.day); }
  function hourKey() { var p = parts(); return p.year + p.month + p.day + p.hour; }
  function loadRoster() {
    var now = Date.now(), days = [opDateAt(now - 3 * HOUR)], d2 = opDateAt(now + 21 * HOUR), off = rOffset, seq = ++rSeq;
    if (off > 0) days = [addDays(opDateAt(now), off)];
    else if (d2 !== days[0]) days.push(d2);
    rHourKey = hourKey(); drawNav();
    return Promise.all(CLUSTERS.map(function (c) {
      var ctl = new AbortController(), to = setTimeout(function () { ctl.abort(); }, 30000);
      /* Apps Script, or Supabase for teams that have moved (modules/rosters/shared/roster-data.js) */
      return Promise.all(days.map(function (date) {
        return window.DSY_ROSTER_DATA.coverage(c.url, date, { signal: ctl.signal })
          .then(function (d) { if (!d.ok || !Array.isArray(d.teams) || !Array.isArray(d.hours)) throw new Error(d.error || "unexpected reply"); return d; });
      }))
        .then(function (ds) { return { c: c, d: ds }; })
        .catch(function (e) { return { c: c, err: e.name === "AbortError" ? "timed out" : e.message }; })
        .finally(function () { clearTimeout(to); });
    })).then(function (res) {
      if (seq !== rSeq) return;   // a newer day was asked for while this one loaded
      var ok = res.filter(function (r) { return r.d; });
      if (!ok.length) { $("rHeat").innerHTML = '<p class="err">Could not load the rosters: ' + esc(res.map(function (r) { return r.c.name + " " + r.err; }).join("; ")) + "</p>"; $("rStats").innerHTML = ""; return; }
      /* the hours in the window, in order, from every day loaded */
      var seen = {}, hours = [];
      ok.forEach(function (r) { r.d.forEach(function (d) { d.hours.forEach(function (h) {
        var t = Date.parse(h.start); if (seen[t]) return; seen[t] = 1; hours.push(h);
      }); }); });
      hours.sort(function (a, b) { return Date.parse(a.start) - Date.parse(b.start); });
      var ni = -1; hours.forEach(function (h, i) { if (Date.parse(h.start) <= now && now < Date.parse(h.end)) ni = i; });
      if (off === 0) { var first = Math.max(0, (ni < 0 ? 0 : ni) - 3); hours = hours.slice(first, first + 24); }
      var teams = [];
      ok.forEach(function (r) {
        var by = {}, names = [];
        r.d.forEach(function (d) {
          var col = {}; d.teams.forEach(function (t, i) { var k = String(t.name || "").trim().toLowerCase(); col[k] = i; if (names.indexOf(t.name) < 0) names.push(t.name); });
          d.hours.forEach(function (h) { var t = Date.parse(h.start); by[t] = by[t] || {}; Object.keys(col).forEach(function (k) { by[t][k] = h.counts[col[k]]; }); });
        });
        names.forEach(function (name) {
          var k = String(name || "").trim().toLowerCase();
          if (EXCLUDED.indexOf(k) > -1) return;
          teams.push({ cluster: r.c, name: name, counts: hours.map(function (h) { var row = by[Date.parse(h.start)]; return row && row[k] != null ? row[k] : null; }) });
        });
      });
      rData = { hours: hours, teams: teams, problems: res.filter(function (r) { return r.err; }), date: days[0], off: off };
      if (selHour != null && selHour >= hours.length) selHour = null;
      drawRoster(); drawCrew();
    });
  }
  function drawNav() {
    var nav = $("rNav"); if (!nav) return;
    var day = rOffset ? nice(addDays(opDateAt(Date.now()), rOffset)) : "";
    $("hRoster").textContent = rOffset ? "Roster · " + day + ", 8am to 8am" : "Roster · next 24 hours";
    nav.innerHTML = '<button type="button" class="chip2" data-roff="' + (rOffset - 1) + '"' + (rOffset ? "" : " disabled") + '>‹ Back</button>' +
      '<button type="button" class="chip2" data-roff="0" aria-pressed="' + (rOffset === 0) + '">Now</button>' +
      '<span class="rday">' + (rOffset ? esc(day) + " (day " + rOffset + " of " + RMAX + ")" : "Rolling 24 hours") + "</span>" +
      '<button type="button" class="chip2" data-roff="' + (rOffset + 1) + '"' + (rOffset < RMAX ? "" : " disabled") + ">" + (rOffset ? "Next day ›" : "From 8am ›") + "</button>";
  }
  if ($("rNav")) $("rNav").addEventListener("click", function (e) {
    var b = e.target.closest("[data-roff]"); if (!b || b.disabled) return;
    var o = Math.max(0, Math.min(RMAX, +b.getAttribute("data-roff"))); if (o === rOffset) return;
    rOffset = o; selHour = null; $("rHeat").innerHTML = '<div class="skel"></div>'; $("rStats").innerHTML = ""; loadRoster(); drawCrew();
  });
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
      ? '<div class="stat"><b>' + g + '</b><span>teams fully crewed now</span></div><div class="stat yel"><b>' + y + '</b><span>one crew now</span></div><div class="stat red"><b>' + r + '</b><span>no crew now</span></div><div class="stat"><b>' + gapH + '</b><span>uncovered team-hours ahead</span></div>'
      : rData.off ? '<div class="stat red"><b>' + gapH + '</b><span>uncovered team-hours this day</span></div><div class="stat"><b>' +
        teams.filter(function (t) { return t.counts.some(function (v) { return v === 0; }); }).length + " of " + teams.length + '</b><span>teams with a gap</span></div>' : "";
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
    var note = rData.off ? "Operational day " + nice(rData.date) + ", 8am to 8am. Numbers are crew booked each hour. Bookings can still change." : rData.hours.length ? "Rolling 24 hours, " + hm(Date.parse(rData.hours[0].start)) + " " + dayAt(Date.parse(rData.hours[0].start)) + " to " + hm(Date.parse(rData.hours[rData.hours.length - 1].end)) + " " + dayAt(Date.parse(rData.hours[rData.hours.length - 1].end)) + " (3 hours back, 21 ahead). Numbers are crew booked each hour." : "No hours in the roster window.";
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
      return window.DSY_ROSTER_DATA.bookings(t.name, t.api, { signal: ctl.signal })
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
    else if (rOffset && rData && rData.off === rOffset && rData.hours.length) { var h0 = rData.hours[0]; at = Date.parse(h0.start) + 1000; title = "On shift at " + h0.label + " (" + nice(h0.calendarDate) + "). Tap an hour to change"; }
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

  /* ---------- relief cover (16 Nov 2026): a relief Team Leader sees the covered leader's tasks too ---------- */
  var cover = [], coverName = {};
  sb.rpc("my_access").then(function (r) {
    if (r.error || !r.data) return;
    cover = r.data.covering || []; cover.forEach(function (c) { coverName[c.id] = c.name || "the leader"; });
    if (!cover.length) return;
    var until = function (c) { return new Intl.DateTimeFormat("en-AU", { timeZone: TZ, weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }).format(new Date(c.until)); };
    var b = document.createElement("div"); b.className = "banner warn"; b.setAttribute("role", "status");
    b.innerHTML = "<span><b style=\"font-size:inherit\">Relief cover:</b> you're covering for " + cover.map(function (c) { return esc(c.name || "a leader") + (c.cluster ? " (" + esc(c.cluster) + ")" : "") + " until " + esc(until(c)); }).join("; ") +
      '. Their tasks are on your list. <a href="/dashboard/relief/">Relief cover</a></span>';
    var grid = document.querySelector(".grid"), main = document.querySelector("main");
    if (grid) grid.parentNode.insertBefore(b, grid);              // phone and tablet dashboard
    else if (main) { b.style.gridColumn = "1 / -1"; main.insertBefore(b, main.firstChild); }   // widescreen
    if (typeof drawTasks === "function" && tasks.length) drawTasks();
  });

  /* ---------- tasks (Supabase public.dashboard_tasks: each leader sees only their own, plus a covered leader's) ---------- */
  var tasks = [], showDone = false;
  function loadTasks() {
    return sb.from("dashboard_tasks").select("id,title,due_date,done,done_at,created_at,created_by").order("created_at")
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
        '<span class="tt" tabindex="0" title="Tap to edit">' + esc(x.title) + (coverName[x.created_by] ? ' <small class="muted">· ' + esc(coverName[x.created_by]) + "'s</small>" : "") + "</span>" + (x.done ? "<span></span>" : dueTag(x.due_date, t)) +
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

  /* ---------- suggestions from Team Leaders (Supabase public.platform_suggestions, 18 Nov 2026) ----------
     Any leader adds one and sees them all; the lead instructor sets the status and replies; an author can withdraw
     their own while it is still new. The database enforces the same rules (supabase/suggestions-setup.sql). */
  var sRows = [], sNames = {}, sLead = false, sMe = null;
  var SLABEL = { "new": "New", "planned": "Planned", "done": "Done", "not now": "Not now" };
  function loadSugg() {
    if (!$("sList")) return Promise.resolve();
    return Promise.all([
      sb.from("platform_suggestions").select("*").order("created_at", { ascending: false }).limit(60),
      sb.rpc("my_access"),
      sb.auth.getSession()
    ]).then(function (r) {
      if (r[0].error) throw r[0].error;
      sRows = r[0].data || [];
      sLead = !!(r[1].data && r[1].data.real_leader && !r[1].data.cluster);
      sMe = r[2].data && r[2].data.session && r[2].data.session.user && r[2].data.session.user.id;
      var ids = sRows.map(function (x) { return x.created_by; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; });
      return ids.length ? sb.from("profiles").select("id,full_name").in("id", ids).then(function (q) { (q.data || []).forEach(function (p) { sNames[p.id] = p.full_name || "A leader"; }); }) : null;
    }).then(drawSugg).catch(function (e) {
      $("sList").innerHTML = '<li class="err">' + (/platform_suggestions/.test(String(e && e.message)) ? "Suggestions aren't switched on yet." : "Could not load suggestions: " + esc(e.message || e)) + "</li>";
    });
  }
  function drawSugg() {
    var n = sRows.filter(function (x) { return x.status === "new"; }).length;
    $("sCount").textContent = sRows.length ? sRows.length + " · " + n + " new" : "";
    if (!sRows.length) { $("sList").innerHTML = '<li class="tempty">No suggestions yet. Be the first.</li>'; return; }
    $("sList").innerHTML = sRows.map(function (x) {
      var d = new Intl.DateTimeFormat("en-AU", { timeZone: TZ, day: "numeric", month: "short" }).format(new Date(x.created_at));
      var who = x.created_by === sMe ? "You" : (sNames[x.created_by] || "A leader");
      var acts = "";
      if (sLead) {
        acts = '<div class="sa"><select data-sstatus="' + x.id + '" aria-label="Status">' + Object.keys(SLABEL).map(function (k) { return '<option value="' + k + '"' + (x.status === k ? " selected" : "") + ">" + SLABEL[k] + "</option>"; }).join("") +
          '</select><button type="button" data-sreply="' + x.id + '">' + (x.reply ? "Edit reply" : "Reply") + '</button><button type="button" data-sdel="' + x.id + '">Delete</button></div>';
      } else if (x.created_by === sMe && x.status === "new") {
        acts = '<div class="sa"><button type="button" data-sdel="' + x.id + '">Withdraw</button></div>';
      }
      return '<li><span class="sb">' + esc(x.body) + '</span><span class="sm"><span class="st ' + x.status.replace(" ", "") + '">' + SLABEL[x.status] + "</span>" + esc(who) + " · " + esc(x.area) + " · " + d + "</span>" +
        (x.reply ? '<span class="sr"><b>Reply:</b> ' + esc(x.reply) + "</span>" : "") + acts + "</li>";
    }).join("");
  }
  function suggErr(r) { if (r && r.error) alert("That didn't save: " + r.error.message); return loadSugg(); }
  if ($("sForm")) {
    $("sForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var body = $("sText").value.trim(); if (body.length < 3) return;
      sb.from("platform_suggestions").insert({ body: body, area: $("sArea").value }).then(function (r) { if (!r.error) $("sText").value = ""; return suggErr(r); });
    });
    $("sList").addEventListener("change", function (e) {
      var id = e.target.getAttribute("data-sstatus"); if (!id) return;
      sb.from("platform_suggestions").update({ status: e.target.value, updated_at: new Date().toISOString() }).eq("id", id).then(suggErr);
    });
    $("sList").addEventListener("click", function (e) {
      var rid = e.target.getAttribute("data-sreply"), did = e.target.getAttribute("data-sdel");
      if (rid) {
        var x = sRows.filter(function (y) { return y.id === rid; })[0], v = prompt("Reply (leave empty to remove it):", (x && x.reply) || "");
        if (v === null) return;
        sb.from("platform_suggestions").update({ reply: v.trim() || null, updated_at: new Date().toISOString() }).eq("id", rid).then(suggErr);
      } else if (did) {
        if (!confirm(sLead ? "Delete this suggestion?" : "Withdraw your suggestion?")) return;
        sb.from("platform_suggestions").delete().eq("id", did).then(suggErr);
      }
    });
  }

  /* ---------- shortcut tile: lesson count ---------- */
  function loadLessonCount() {
    if (!$("lessonCount")) return Promise.resolve(); /* the phone dashboard has no Lessons tile (25 Nov 2026) */
    return sb.from("lessons").select("id", { count: "exact", head: true }).then(function (r) {
      if (!r.error && r.count != null) $("lessonCount").textContent = $("lessonCount").hasAttribute("data-short") ? String(r.count) : r.count + " lessons in the library";
    });
  }

  /* ---------- training sessions ---------- */
  function hasLesson(s) { return !!s.lesson_id || (Array.isArray(s.lesson_ids) && s.lesson_ids.length > 0); }
  // Training clusters (16 Nov 2026): a leader with a cluster sees their own cluster's sessions first, with an
  // "All clusters" switch; a leader with no cluster (the lead instructor) sees everything.
  var myCl = null, tView = null, tCache = null;
  function loadSessions() {
    var t = todayIso(), end = addDays(t, 60);
    return Promise.all([
      sb.from("sessions").select("id,group_id,session_date,start_time,end_time,location,session_type,topic,facilitator_name,lesson_id,lesson_ids").gte("session_date", t).lte("session_date", end).order("session_date").order("start_time"),
      sb.from("groups").select("id,name,cluster"),
      sb.rpc("my_access").then(function (x) { return { data: [{ cluster: (x.data && x.data.cluster) || null }] }; })
    ]).then(function (r) {
      if (r[0].error) throw r[0].error;
      var gn = {}, gc = {}; (r[1].data || []).forEach(function (g) { gn[g.id] = g.name; gc[g.id] = g.cluster; });
      myCl = (r[2].data && r[2].data[0] && r[2].data[0].cluster) || null;
      if (tView === null) tView = myCl || "all";
      tCache = [r[0].data || [], gn, gc, t];
      drawCluster();
    }).catch(function (e) { $("tBody").innerHTML = '<p class="err">Could not load sessions: ' + esc(e.message || e) + "</p>"; });
  }
  function drawCluster() {
    if (!tCache) return;
    var rows = tCache[0].filter(function (s) { var c = tCache[2][s.group_id]; return tView === "all" || !c || c === tView; });
    drawSessions(rows, tCache[1], tCache[3]);
    if (!myCl) return;
    $("tBody").insertAdjacentHTML("afterbegin", '<div class="chips" role="group" aria-label="Cluster"><button type="button" class="chip2" data-tview="' + esc(myCl) + '" aria-pressed="' + (tView === myCl) + '">' + esc(myCl) +
      '</button><button type="button" class="chip2" data-tview="all" aria-pressed="' + (tView === "all") + '">All clusters</button></div>');
  }
  $("tBody").addEventListener("click", function (e) { var b = e.target.closest("[data-tview]"); if (b) { tView = b.getAttribute("data-tview"); drawCluster(); } });
  function drawSessions(rows, gn, t) {
    var nowM = mins(parts().hour + ":" + parts().minute);
    rows = rows.filter(function (s) { return s.session_date > t || mins(s.end_time || s.start_time) > nowM; });
    var html = "";
    if (!rows.length) { $("tBody").innerHTML = '<div class="banner"><b>No sessions booked in the next 2 months</b><span class="small">Add them in Team training.</span></div>'; return; }
    var n = rows[0], days = Math.round((dOf(n.session_date) - dOf(t)) / 864e5);
    var when = days === 0 ? "Tonight" : days === 1 ? "Tomorrow" : "In " + days + " days";
    if (days === 0 && mins(n.start_time) < 17 * 60) when = "Today";
    html += '<a class="banner golink" href="/training/#session=' + encodeURIComponent(n.id) + '"><span class="eyebrow">Next session · ' + when + '</span><b>' + esc(gn[n.group_id] || "Team") + (n.topic ? " · " + esc(n.topic) : "") + "</b>" +
      '<span class="small">' + nice(n.session_date) + ", " + t12(n.start_time) + (n.end_time ? " to " + t12(n.end_time) : "") + (n.location ? " · " + esc(n.location) : "") + " · " + (n.session_type === "team" ? "Team-led" : "Leader-led") +
      (n.facilitator_name ? " · " + esc(n.facilitator_name) : "") + "</span>" + (hasLesson(n) ? "" : '<span class="small"><b style="font-size:inherit;font-family:inherit">No lesson yet</b>: pick one in Team training.</span>') + '<span class="small go">Open in the planner →</span></a>';
    var soon = rows.filter(function (s) { return s.session_date <= addDays(t, 27); }), need = soon.filter(function (s) { return !hasLesson(s); });
    if (need.length) html += '<div class="banner warn"><span><b style="font-size:1rem">' + need.length + " of " + soon.length + "</b> sessions in the next 4 weeks have no lesson. " +
      '<a href="/training/">Allocate lessons →</a></span></div>';
    else if (soon.length) html += '<div class="banner"><span class="small">Every session in the next 4 weeks has a lesson. 👍</span></div>';
    // 4-week calendar from this week's Monday
    var d0 = dOf(t), k = (d0.getUTCDay() + 6) % 7, mon = addDays(t, -k);
    html += '<div class="cal">' + ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(function (x) { return '<div class="dn">' + x + "</div>"; }).join("");
    for (var i = 0; i < 28; i++) {
      var iso = addDays(mon, i), dd = dOf(iso), on = rows.filter(function (s) { return s.session_date === iso; });
      /* one session: the whole day opens it; several: each bar opens its own (22 Nov 2026) */
      var one = on.length === 1, tag = one ? "a" : "div";
      html += "<" + tag + (one ? ' href="/training/#session=' + encodeURIComponent(on[0].id) + '"' : "") + ' class="d' + (iso < t ? " past" : "") + (iso === t ? " today" : "") + (on.length ? " has" : "") + '" title="' + esc(on.map(function (s) { return (gn[s.group_id] || "") + " " + t12(s.start_time) + (hasLesson(s) ? "" : " (no lesson)"); }).join("\n")) + '"><em>' +
        dd.getUTCDate() + (dd.getUTCDate() === 1 || i === 0 ? " " + MON[dd.getUTCMonth()] : "") + "</em>" + on.map(function (s) { return one ? '<i class="' + (hasLesson(s) ? "" : "nl") + '"></i>' : '<a class="bar' + (hasLesson(s) ? "" : " nl") + '" href="/training/#session=' + encodeURIComponent(s.id) + '" title="' + esc((gn[s.group_id] || "") + " " + t12(s.start_time)) + '"></a>'; }).join("") + "</" + tag + ">";
    }
    html += '</div><div class="legend"><span><i style="background:var(--brand)"></i>lesson set</span><span><i style="background:var(--y)"></i>needs a lesson</span></div>';
    html += '<ul class="slist">' + rows.slice(0, 6).map(function (s) {
      var dd = dOf(s.session_date);
      return '<li><a class="srow" href="/training/#session=' + encodeURIComponent(s.id) + '"><div class="dt"><span>' + DAYS[dd.getUTCDay()] + "</span><b>" + dd.getUTCDate() + "</b><span>" + MON[dd.getUTCMonth()] + '</span></div><div class="t"><b>' + esc(gn[s.group_id] || "Team") + (s.topic ? " · " + esc(s.topic) : "") +
        "</b><span>" + t12(s.start_time) + " · " + (s.session_type === "team" ? "Team-led" : "Leader-led") + (s.location ? " · " + esc(s.location) : "") + "</span></div>" +
        (hasLesson(s) ? '<span class="tag ok">Lesson set</span>' : '<span class="tag need">Needs lesson</span>') + "</a></li>";
    }).join("") + "</ul>";
    if (rows.length > 6) html += '<p class="note">+ ' + (rows.length - 6) + ' more in the next 2 months.</p>';
    $("tBody").innerHTML = html;
  }

  /* ---------- dispatch (paging feed) ---------- */
  var TEAMS = {"CU":["Cummins","#0e9f8e"],"TB":["Tumby Bay","#15803d"],"PT":["Port Neill","#0369a1"],"CF":["Coffin Bay","#b45309"],"CL":["Cleve","#be123c"],"CW":["Cowell","#8a5cf6"],"CO":["Team leader","#475569"],"KI":["Kimba","#4d7c0f"],"LK":["Lock","#a16207"],"EL":["Elliston","#e0752b"],"SB":["Streaky Bay","#2f7fe0"],"PK":["Port Kenny","#d6457f"],"WU":["Wudinna","#0e7490"],"CD":["Ceduna","#94a3b8"],"PL":["Port Lincoln","#64748b"]};
  var EXTRA = ["#b45309", "#15803d", "#be123c", "#0369a1", "#7c3aed", "#4d7c0f"];
  function codeOf(j) { return String(j.unit || "").replace(/\d+$/, ""); }
  // Port Lincoln (PL) and Ceduna (CD) crews are hidden when the page loads; the button in the tile shows them.
  var HIDE_CREWS = { PL: "Port Lincoln", CD: "Ceduna" }, showHidden = false, dCache = null;
  function loadDispatch() {
    var t = todayIso(), from = addDays(t, -6);
    return sb.from("paging_jobs").select("job_key,job_date,job_time,locality,job_type,priority,unit").gte("job_date", from).lte("job_date", t).order("job_time")
      .then(function (r) { if (r.error) throw r.error; dCache = [r.data || [], from, t]; drawDispatch(dCache[0], from, t); })
      .catch(function (e) { $("dBody").innerHTML = '<p class="err">Could not load the dispatch feed: ' + esc(e.message || e) + "</p>"; });
  }
  function drawDispatch(all, from, t) {
    var jobs = showHidden ? all : all.filter(function (j) { return !HIDE_CREWS[codeOf(j)]; }), hidden = all.length - jobs.length;
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
    if (showHidden || hidden) html += '<div class="chips"><button type="button" class="chip2" id="dToggle" aria-pressed="' + showHidden + '">' +
      (showHidden ? "Hide Port Lincoln and Ceduna crews" : "Show Port Lincoln and Ceduna crews (" + hidden + (hidden === 1 ? " job)" : " jobs)")) + "</button></div>";
    html += '<p class="note">From the SAAS paging feed for the Eyre Peninsula, captured by a scheduled run, so today may be incomplete. Tap the full screen for job details.</p>';
    $("dBody").innerHTML = html;
  }
  $("dBody").addEventListener("click", function (e) {
    if (!e.target.closest("#dToggle") || !dCache) return;
    showHidden = !showHidden; drawDispatch(dCache[0], dCache[1], dCache[2]);
  });

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

  /* ---------- Ask DSY (17 Nov 2026) ----------
     How-to questions for Team Leaders, answered by the edge function ask-dsy from the live user guides only.
     The last few turns are kept on the page (not saved) so a follow-up question makes sense. */
  var aHist = [], aBusy = false;
  function aFormat(t) {
    var link = function (s) {
      return s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
        .replace(/(https:\/\/[^\s<)]+[^\s<).,])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
        .replace(/(^|[\s(])(\/(?:userguides|dashboard|training|access|signin|dispatch|modules|microlearning|hub)\/[^\s<)]*[^\s<).,])/g, '$1<a href="$2">$2</a>');
    };
    var html = "", list = null;
    esc(t).split(/\n+/).forEach(function (line) {
      var m = line.match(/^\s*(\d+[.)]|[-*•])\s+(.*)$/);
      if (m) {
        var kind = /\d/.test(m[1]) ? "ol" : "ul";
        if (list !== kind) { if (list) html += "</" + list + ">"; html += "<" + kind + ">"; list = kind; }
        html += "<li>" + link(m[2]) + "</li>";
      } else {
        if (list) { html += "</" + list + ">"; list = null; }
        if (line.trim()) html += "<p>" + link(line) + "</p>";
      }
    });
    return html + (list ? "</" + list + ">" : "");
  }
  function aAdd(cls, html) { var d = document.createElement("div"); d.className = "amsg " + cls; d.innerHTML = html; $("aLog").appendChild(d); $("aLog").scrollTop = $("aLog").scrollHeight; return d; }
  $("aForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var q = $("aQ").value.trim(); if (!q || aBusy) return;
    aBusy = true; $("aGo").disabled = true; $("aQ").value = "";
    aAdd("q", esc(q));
    var wait = aAdd("a", '<p class="note">Looking in the guides…</p>');
    sb.functions.invoke("ask-dsy", { body: { question: q, history: aHist.slice(-6) } }).then(function (r) {
      var d = r.data;
      if (!d && r.error && r.error.context && r.error.context.json) return r.error.context.json().catch(function () { return null; });
      return d;
    }).then(function (d) {
      if (d && d.ok) {
        wait.innerHTML = aFormat(d.answer);
        aHist.push({ role: "user", content: q }, { role: "assistant", content: d.answer });
      } else {
        wait.classList.add("err"); wait.innerHTML = "<p>" + esc((d && d.message) || "Ask DSY didn't answer. Try again in a minute.") + "</p>";
      }
    }).catch(function () {
      wait.classList.add("err"); wait.innerHTML = "<p>Ask DSY didn't answer. Check your reception and try again.</p>";
    }).then(function () { aBusy = false; $("aGo").disabled = false; $("aClear").hidden = false; });
  });
  $("aClear").addEventListener("click", function () { aHist = []; $("aLog").innerHTML = ""; $("aClear").hidden = true; $("aQ").focus(); });

  /* ---------- start and refresh ---------- */
  function stamp() { $("updated").textContent = "Updated " + new Intl.DateTimeFormat("en-AU", { timeZone: TZ, hour: "numeric", minute: "2-digit" }).format(new Date()); }
  function loadAll() { stamp(); loadRoster(); loadCrew(); loadTasks(); loadLessonCount(); loadSessions(); loadDispatch(); loadWeather(); loadSugg(); }
  drawTowns();
  (window.DSY_GATE ? window.DSY_GATE.ready : Promise.resolve({})).then(function (me) {
    if (me && me.name) { window.__name = String(me.name).split(" ")[0]; tick(); }
    loadAll();
    setInterval(function () { if (!rOffset && hourKey() !== rHourKey) { selHour = null; loadRoster(); } else { drawRoster(); drawCrew(); } }, 60000);   // move the "now" outline; slide the window on the hour
    setInterval(function () { stamp(); loadRoster(); loadCrew(); loadSessions(); loadDispatch(); if (!document.querySelector("#tList [contenteditable=true]") && document.activeElement !== $("tTitle")) loadTasks(); }, 10 * 60000);
    setInterval(loadWeather, 60 * 60000);
  });
  $("refresh").addEventListener("click", loadAll);
})();
