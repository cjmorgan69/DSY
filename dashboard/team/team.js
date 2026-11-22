/* Team dashboard for a team's Volunteer Team Leader (VTL), /dashboard/team/ (owner, 22 Nov 2026).
   One team only: roster (next 7 operational days and who is on), dispatches, volunteer contribution and training for
   that team, plus the weather. A VTL sees their own team (Supabase team_vtls, my_access().vtl); a leader can pick any
   team to see what its VTL sees. Data: roster = DSY_ROSTER_DATA (roster_coverage / roster_team_bookings), dispatch =
   rpc team_dispatch, contribution = rpc team_contribution, training = sessions (RLS lets a VTL read their team's),
   weather = Open-Meteo. SQL in supabase/vtl-setup.sql. Run node .claude/tools/stamp.js when this changes. */
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
  function isoOf(ms) { var p = parts(new Date(ms)); return p.year + "-" + p.month + "-" + p.day; }
  function addDays(iso, n) { var d = new Date(iso + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
  function dOf(iso) { return new Date(iso + "T12:00:00Z"); }
  function nice(iso) { var d = dOf(iso); return DAYS[d.getUTCDay()] + " " + d.getUTCDate() + " " + MON[d.getUTCMonth()]; }
  function t12(t) { var p = String(t).split(":"), h = +p[0], m = p[1]; return (h % 12 || 12) + (m === "00" ? "" : ":" + m) + (h < 12 ? "am" : "pm"); }
  function mins(t) { var p = String(t).split(":"); return +p[0] * 60 + +p[1]; }
  function hm(ms) { return new Intl.DateTimeFormat("en-AU", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(ms)).replace(" ", ""); }
  function errMsg(e) { return esc((e && e.message) || e); }

  /* ---------- clock ---------- */
  function tick() {
    var now = new Date(), h = +parts(now).hour;
    $("time").textContent = new Intl.DateTimeFormat("en-AU", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true }).format(now);
    $("date").textContent = new Intl.DateTimeFormat("en-AU", { timeZone: TZ, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now);
    $("hello").textContent = (h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening") + (window.__name ? ", " + window.__name : "");
  }
  tick(); setInterval(tick, 1000);
  if (window.DSY_GATE) window.DSY_GATE.ready.then(function (g) { window.__name = String(g.name || "").split(" ")[0]; tick(); });

  /* ---------- which team ---------- */
  var team = null;   // { id, name, cluster }
  var CL_URL = {
    "Lower Eyre": "https://script.google.com/macros/s/AKfycbxEboPS9reZI5OpUMdlriag0QeAJzIyXFZ2Jy0z_4qBJLEK054R5bDcJgyWAW2YSP6l/exec",
    "Central Eyre": "https://script.google.com/macros/s/AKfycbwbeUGYW4VaBC8i0k228ASyRQt-B4_7pKKr5F3O5L-CrCmTH0hnx48pN7QTqkjXrfwRDA/exec",
    "West Coast": "https://script.google.com/macros/s/AKfycbxrcfdjF7kUZQBkHuw2mqrYXhqz54VrK9Agv-zzOyBG8BbAbC-lrDkY6zGK91VAwB_z/exec"
  };
  var CL_DIR = { "Lower Eyre": "lowereyre", "Central Eyre": "centraleyre", "West Coast": "westcoast" };
  function rosterTeam(name) {
    var T = window.DSY_ROSTER_TEAMS || {}, k = String(name || "").toLowerCase();
    for (var id in T) if (id !== "test" && T[id].name.toLowerCase() === k) return { id: id, name: T[id].name, cluster: T[id].cluster, api: T[id].apiUrl };
    return null;
  }
  function start() {
    Promise.all([sb.rpc("my_access"), sb.from("groups").select("id,name,cluster").eq("type", "team").order("name")]).then(function (r) {
      var a = r[0].data || {}, groups = r[1].data || [];
      var leader = a.role === "leader";
      if (a.vtl && !leader) { team = { id: a.vtl.group_id, name: a.vtl.team, cluster: a.vtl.cluster }; }
      else if (leader) {
        var saved = store("dsy-teamdash-team"), pick = groups.filter(function (g) { return g.id === saved; })[0] ||
          (a.vtl && groups.filter(function (g) { return g.id === a.vtl.group_id; })[0]) || groups[0];
        if (!pick) { $("tName").textContent = "No teams found"; return; }
        team = { id: pick.id, name: pick.name, cluster: pick.cluster };
        var sel = $("teamPick"); sel.hidden = false;
        sel.innerHTML = groups.map(function (g) { return '<option value="' + esc(g.id) + '"' + (g.id === team.id ? " selected" : "") + ">" + esc(g.name) + "</option>"; }).join("");
        sel.addEventListener("change", function () {
          var g = groups.filter(function (x) { return x.id === sel.value; })[0]; if (!g) return;
          team = { id: g.id, name: g.name, cluster: g.cluster }; store("dsy-teamdash-team", g.id);
          town = null; selHour = null; loadAll();
        });
        $("leadNote").hidden = false;
      } else { $("tName").textContent = "Your account is not a Volunteer Team Leader"; return; }
      loadAll();
    }).catch(function (e) { $("tName").textContent = "Could not load your team: " + ((e && e.message) || e); });
  }

  /* ---------- roster: next 7 operational days (8am to 8am) and who is on ---------- */
  var week = null, bookings = null, selHour = null;   // selHour = [dayIndex, hourIndex]
  function opDate() { var p = parts(); var d = p.year + "-" + p.month + "-" + p.day; return +p.hour < 8 ? addDays(d, -1) : d; }
  function loadRoster() {
    var rt = rosterTeam(team.name), url = CL_URL[team.cluster], d0 = opDate(), myTeam = team.id;
    week = null; bookings = null;
    $("rHeat").innerHTML = '<div class="skel"></div>'; $("cBody").innerHTML = '<p class="note">Loading names from the roster…</p>';
    $("rLink").href = rt && CL_DIR[rt.cluster] ? "/modules/rosters/" + CL_DIR[rt.cluster] + "/" + rt.id + "/" : "/";
    if (!rt || !url) { $("rHeat").innerHTML = '<p class="err">This team has no roster set up.</p>'; $("cBody").innerHTML = ""; return; }
    var dates = []; for (var i = 0; i < 7; i++) dates.push(addDays(d0, i));
    Promise.all(dates.map(function (date) {
      return window.DSY_ROSTER_DATA.coverage(url, date).then(function (d) {
        if (!d.ok || !Array.isArray(d.teams) || !Array.isArray(d.hours)) throw new Error(d.error || "unexpected reply");
        var ti = -1; d.teams.forEach(function (t, k) { if (String(t.name).toLowerCase() === rt.name.toLowerCase()) ti = k; });
        return { date: date, hours: d.hours.map(function (h) { return { label: h.label, start: h.start, end: h.end, date: h.calendarDate, c: ti > -1 && h.counts ? h.counts[ti] : null }; }) };
      }).catch(function (e) { return { date: date, err: e.message || String(e) }; });
    })).then(function (w) { if (team.id !== myTeam) return; week = w; drawRoster(); drawCrew(); });
    window.DSY_ROSTER_DATA.bookings(rt.name, rt.api).then(function (d) {
      if (team.id !== myTeam) return;
      if (!Array.isArray(d.bookings)) throw new Error(d.error || "unexpected reply");
      bookings = d.bookings; drawCrew();
    }).catch(function (e) { if (team.id === myTeam) $("cBody").innerHTML = '<p class="err">Could not load the names: ' + errMsg(e) + "</p>"; });
  }
  function drawRoster() {
    if (!week) return;
    var now = Date.now(), okDays = week.filter(function (d) { return d.hours; });
    if (!okDays.length) { $("rHeat").innerHTML = '<p class="err">Could not load the roster: ' + esc(week[0].err) + "</p>"; $("rStats").innerHTML = ""; return; }
    var today = week[0].hours || [], ni = -1, gaps = 0, full = 0, one = 0;
    today.forEach(function (h, i) { if (Date.parse(h.start) <= now && now < Date.parse(h.end)) ni = i; });
    today.forEach(function (h, i) { if (i < Math.max(ni, 0)) return; if (h.c === 0) gaps++; else if (h.c === 1) one++; else if (h.c >= 2) full++; });
    var nowC = ni > -1 ? today[ni].c : null;
    var wkGaps = 0; okDays.forEach(function (d) { d.hours.forEach(function (h) { if (h.c === 0 && Date.parse(h.end) > now) wkGaps++; }); });
    $("rStats").innerHTML = '<div class="stat' + (nowC === 0 ? " red" : nowC === 1 ? " yel" : "") + '"><b>' + (nowC == null ? "–" : nowC) + '</b><span>crew on now</span></div>' +
      '<div class="stat red"><b>' + gaps + '</b><span>hours with no crew left today</span></div>' +
      '<div class="stat yel"><b>' + one + '</b><span>hours with one crew left today</span></div>' +
      '<div class="stat"><b>' + wkGaps + '</b><span>uncovered hours in 7 days</span></div>';
    var hours = okDays[0].hours;
    var html = "<table><thead><tr><th></th>" + hours.map(function (h, i) { return '<th class="' + (i === ni ? "now" : "") + '">' + (i % 2 === 0 || i === ni ? esc(String(+String(h.label).slice(0, 2))) : "") + "</th>"; }).join("") + "</tr></thead><tbody>";
    week.forEach(function (d, di) {
      html += "<tr><th>" + (di === 0 ? "Today" : esc(nice(d.date))) + "</th>";
      if (!d.hours) { html += '<td class="gap" colspan="' + hours.length + '"><span class="note">not loaded</span></td></tr>'; return; }
      d.hours.forEach(function (h, i) {
        var c = h.c, cls = c == null ? "n" : c >= 2 ? "g" : c === 1 ? "y" : "r", sel = selHour && selHour[0] === di && selHour[1] === i;
        html += '<td data-d="' + di + '" data-i="' + i + '" class="' + cls + (di === 0 && i === ni ? " now" : "") + (sel ? " sel" : "") + '" title="' + esc(nice(h.date) + " " + h.label + ": " + (c == null ? "no data" : c + " crew")) + '">' + (c ? c : "") + "</td>";
      });
      html += "</tr>";
    });
    $("rHeat").innerHTML = html + "</tbody></table>";
    var bad = week.filter(function (d) { return d.err; });
    $("rNote").textContent = "Each row is an operational day, 8am to 8am. Numbers are crew booked each hour." + (bad.length ? " Not loaded: " + bad.map(function (d) { return nice(d.date); }).join(", ") + "." : "");
  }
  function drawCrew() {
    var at = Date.now(), title = "On shift now";
    if (selHour && week && week[selHour[0]] && week[selHour[0]].hours) { var h = week[selHour[0]].hours[selHour[1]]; at = Date.parse(h.start) + 1000; title = "On shift " + nice(h.date) + " at " + h.label; }
    $("cTitle").textContent = title; $("cNow").hidden = !selHour;
    if (!bookings) return;
    var on = bookings.filter(function (x) { return Date.parse(x.start) <= at && at < Date.parse(x.end); }).sort(function (a, c) { return String(a.user).localeCompare(String(c.user)); });
    var html = on.length ? '<div class="ct"><ul>' + on.map(function (x) {
      return "<li><b>" + esc(x.user) + "</b>" + (x.clinicalLevel ? "<em>" + esc(x.clinicalLevel) + "</em>" : "") + (x.restriction && x.restriction !== "N" ? "<em>" + esc(x.restriction) + "</em>" : "") + "<small>to " + hm(Date.parse(x.end)) + "</small></li>";
    }).join("") + "</ul></div>" : '<div class="ct none"><span class="nc">No crew booked</span></div>';
    var now = Date.now(), until = now + 7 * 864e5;
    var next = bookings.filter(function (x) { return Date.parse(x.start) > now && Date.parse(x.start) < until; }).sort(function (a, c) { return Date.parse(a.start) - Date.parse(c.start); });
    html += '<h3 style="font-size:1rem;margin-top:.4rem">Coming shifts · next 7 days</h3>';
    html += next.length ? '<ul class="ulist">' + next.slice(0, 25).map(function (x) {
      var s = Date.parse(x.start), e = Date.parse(x.end);
      return '<li><span class="w">' + esc(nice(isoOf(s))) + "</span><span class=\"x\"><b>" + esc(x.user) + "</b>" + (x.clinicalLevel ? "<em>" + esc(x.clinicalLevel) + "</em>" : "") + "<br><span class=\"note\">" + hm(s) + " to " + hm(e) + (isoOf(e) !== isoOf(s) ? " " + esc(nice(isoOf(e))) : "") + "</span></span></li>";
    }).join("") + "</ul>" + (next.length > 25 ? '<p class="note">+ ' + (next.length - 25) + " more on the roster.</p>" : "") : '<p class="note">No shifts booked in the next 7 days.</p>';
    $("cBody").innerHTML = html;
  }
  $("rHeat").addEventListener("click", function (e) {
    var td = e.target.closest("td[data-i]"); if (!td) return;
    var k = [+td.dataset.d, +td.dataset.i]; selHour = selHour && selHour[0] === k[0] && selHour[1] === k[1] ? null : k; drawRoster(); drawCrew();
  });
  $("cNow").addEventListener("click", function () { selHour = null; drawRoster(); drawCrew(); });

  /* ---------- dispatch: this team's jobs, last 7 days ---------- */
  function loadDispatch() {
    var t = todayIso(), from = addDays(t, -6), myTeam = team.id;
    $("dBody").innerHTML = '<div class="skel"></div>';
    sb.rpc("team_dispatch", { p_group: team.id, p_from: from, p_to: t }).then(function (r) {
      if (team.id !== myTeam) return; if (r.error) throw r.error; drawDispatch(r.data || [], from, t);
    }).catch(function (e) { $("dBody").innerHTML = '<p class="err">Could not load the dispatch feed: ' + errMsg(e) + "</p>"; });
  }
  function drawDispatch(jobs, from, t) {
    var towns = {}, p1 = 0;
    jobs.forEach(function (j) { towns[j.locality || "No town"] = (towns[j.locality || "No town"] || 0) + 1; if (+j.priority === 1) p1++; });
    var top = Object.keys(towns).sort(function (a, b) { return towns[b] - towns[a]; })[0];
    var html = '<div class="stats"><div class="stat"><b>' + jobs.length + '</b><span>jobs in 7 days</span></div><div class="stat"><b>' + jobs.filter(function (j) { return j.job_date === t; }).length +
      '</b><span>today so far</span></div><div class="stat red"><b>' + p1 + '</b><span>priority 1</span></div>' +
      (top ? '<div class="stat"><b style="font-size:1.1rem">' + esc(top) + '</b><span>busiest town (' + towns[top] + ")</span></div>" : "") + "</div>";
    html += '<div class="raxis"><div></div><div><span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>12am</span></div></div><div class="roads">';
    var p = parts(), nowM = +p.hour * 60 + +p.minute;
    for (var i = 0; i < 7; i++) {
      var iso = addDays(from, i), dd = dOf(iso), js = jobs.filter(function (j) { return j.job_date === iso; });
      html += '<div class="rrow"><div class="lab"><b>' + (iso === t ? "Today" : DAYS[dd.getUTCDay()]) + "</b><span>" + dd.getUTCDate() + " " + MON[dd.getUTCMonth()] + " · " + js.length + '</span></div><div class="road">' +
        '<div class="nt" style="left:0;width:25%"></div><div class="nt" style="left:75%;width:25%"></div>' + (js.length ? "" : '<div class="q">quiet day</div>') +
        js.map(function (j) { return '<span class="ab" style="left:' + (mins(j.job_time) / 14.4).toFixed(2) + '%;--tc:#15803d" title="' + esc(String(j.job_time).slice(0, 5) + " " + j.job_type + " · " + (j.locality || "") + " · P" + j.priority + " · " + j.unit) + '">🚑</span>'; }).join("") +
        (iso === t ? '<div class="nowl" style="left:' + (nowM / 14.4).toFixed(2) + '%"></div>' : "") + "</div></div>";
    }
    html += "</div>";
    var recent = jobs.slice().reverse().slice(0, 8);
    if (recent.length) html += '<ul class="ulist">' + recent.map(function (j) {
      return '<li><span class="w">' + esc(nice(j.job_date)) + " " + esc(String(j.job_time).slice(0, 5)) + '</span><span class="x">' + (j.priority ? '<span class="' + (+j.priority === 1 ? "p1" : "") + '">P' + j.priority + "</span> · " : "") +
        esc(j.job_type || "") + (j.locality ? " · " + esc(j.locality) : "") + ' <span class="note">' + esc(j.unit) + "</span></span></li>";
    }).join("") + "</ul>";
    html += '<p class="note">From the SAAS paging feed, captured by a scheduled run, so today may be incomplete. Shaded = before 6am / after 6pm.</p>';
    $("dBody").innerHTML = html;
  }

  /* ---------- volunteer contribution: this team only ---------- */
  var PERIODS = [{ id: "month", label: "This month" }, { id: "last", label: "Last month" }, { id: "d30", label: "30 days" }, { id: "all", label: "All" }];
  var period = store("dsy-teamdash-period") || "month", para = false, vRows = [];
  if (!PERIODS.some(function (p) { return p.id === period; })) period = "month";
  function adlMidnight(y, m) {   // the 1st of a month at midnight in Adelaide, as an ISO string
    var guess = Date.UTC(y, m - 1, 1), p = parts(new Date(guess));
    var off = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - guess;
    return new Date(guess - off).toISOString();
  }
  function range(id) {
    var p = parts(), y = +p.year, m = +p.month;
    if (id === "month") return { from: adlMidnight(y, m), to: null };
    if (id === "last") return { from: adlMidnight(m === 1 ? y - 1 : y, m === 1 ? 12 : m - 1), to: adlMidnight(y, m) };
    if (id === "d30") return { from: new Date(Date.now() - 30 * 864e5).toISOString(), to: null };
    return { from: null, to: null };
  }
  function loadContrib() {
    var rg = range(period), myTeam = team.id;
    $("vBody").innerHTML = '<p class="note">Loading…</p>';
    sb.rpc("team_contribution", { p_group: team.id, p_from: rg.from, p_to: rg.to }).then(function (r) {
      if (team.id !== myTeam) return; if (r.error) throw r.error; vRows = r.data || []; drawContrib();
    }).catch(function (e) { $("vBody").innerHTML = '<p class="err">Could not load: ' + errMsg(e) + "</p>"; });
  }
  function isPara(r) { return String(r.levels || "").split(", ").every(function (l) { return l === "PARA"; }); }
  function drawContrib() {
    var c = $("vPeriod"); c.innerHTML = "";
    PERIODS.forEach(function (p) {
      var b = document.createElement("button"); b.type = "button"; b.className = "chip2"; b.textContent = p.label; b.setAttribute("aria-pressed", p.id === period ? "true" : "false");
      b.addEventListener("click", function () { period = p.id; store("dsy-teamdash-period", p.id); loadContrib(); }); c.appendChild(b);
    });
    var rows = vRows.filter(function (r) { return para || !isPara(r); });
    var hrs = rows.reduce(function (s, r) { return s + +r.hours; }, 0);
    var html = '<div class="stats"><div class="stat"><b>' + rows.length + '</b><span>people rostered</span></div><div class="stat"><b>' + Math.round(hrs).toLocaleString("en-AU") +
      '</b><span>hours on roster</span></div><div class="stat"><b>' + rows.reduce(function (s, r) { return s + r.shifts; }, 0) + '</b><span>shifts</span></div></div>';
    if (!rows.length) { $("vBody").innerHTML = html + '<p class="note">No roster bookings in this period.</p>'; return; }
    var maxH = Math.max.apply(null, rows.map(function (r) { return +r.hours; })) || 1;
    html += '<table class="ctb"><thead><tr><th>Name</th><th class="n">Shifts</th><th class="n">Hours</th><th class="n">Jobs paged</th></tr></thead><tbody>' + rows.map(function (r) {
      return "<tr><td><b>" + esc(r.member_name) + "</b><small>" + esc(r.levels || "") + '</small><div class="bar"><i style="width:' + (100 * r.hours / maxH).toFixed(1) + '%"></i></div></td><td class="n">' + r.shifts +
        '</td><td class="n"><b>' + (+r.hours).toLocaleString("en-AU") + '</b></td><td class="n"><b>' + r.jobs + "</b>" + (r.p1_jobs ? '<span class="p1">' + r.p1_jobs + " P1</span>" : "") + "</td></tr>";
    }).join("") + "</tbody></table>";
    html += '<p class="note">Hours rostered (past part of shifts only) and jobs paged to the team while each person was rostered on. The pager feed can\'t tell who turned out.</p>';
    $("vBody").innerHTML = html;
  }
  $("vPara").addEventListener("change", function () { para = this.checked; drawContrib(); });

  /* ---------- training sessions: this team, next 2 months ---------- */
  function hasLesson(s) { return !!s.lesson_id || (Array.isArray(s.lesson_ids) && s.lesson_ids.length > 0); }
  function loadSessions() {
    var t = todayIso(), end = addDays(t, 60), myTeam = team.id;
    $("tBody").innerHTML = '<div class="skel"></div>';
    sb.from("sessions").select("id,session_date,start_time,end_time,location,session_type,topic,facilitator_name,lesson_id,lesson_ids").eq("group_id", team.id)
      .gte("session_date", t).lte("session_date", end).order("session_date").order("start_time").then(function (r) {
        if (team.id !== myTeam) return; if (r.error) throw r.error; drawSessions(r.data || [], t);
      }).catch(function (e) { $("tBody").innerHTML = '<p class="err">Could not load sessions: ' + errMsg(e) + "</p>"; });
  }
  function drawSessions(rows, t) {
    var nowM = mins(parts().hour + ":" + parts().minute);
    rows = rows.filter(function (s) { return s.session_date > t || mins(s.end_time || s.start_time) > nowM; });
    if (!rows.length) { $("tBody").innerHTML = '<div class="banner"><b>No sessions booked in the next 2 months</b><span class="small">Your Team Leader adds them in the training app.</span></div>'; return; }
    var n = rows[0], days = Math.round((dOf(n.session_date) - dOf(t)) / 864e5);
    var when = days === 0 ? (mins(n.start_time) < 17 * 60 ? "Today" : "Tonight") : days === 1 ? "Tomorrow" : "In " + days + " days";
    var html = '<div class="banner"><span class="eyebrow">Next session · ' + when + "</span><b>" + esc(n.topic || (n.session_type === "team" ? "Team training" : "Team Leader visit")) + "</b>" +
      '<span class="small">' + nice(n.session_date) + ", " + t12(n.start_time) + (n.end_time ? " to " + t12(n.end_time) : "") + (n.location ? " · " + esc(n.location) : "") + " · " + (n.session_type === "team" ? "Team-led" : "Leader-led") +
      (n.facilitator_name ? " · " + esc(n.facilitator_name) : "") + "</span>" + (hasLesson(n) ? "" : '<span class="small"><b style="font-size:inherit;font-family:inherit">No lesson yet</b></span>') + "</div>";
    html += '<ul class="slist">' + rows.slice(0, 8).map(function (s) {
      var dd = dOf(s.session_date);
      return '<li><div class="dt"><span>' + DAYS[dd.getUTCDay()] + "</span><b>" + dd.getUTCDate() + "</b><span>" + MON[dd.getUTCMonth()] + '</span></div><div class="t"><b>' + esc(s.topic || (s.session_type === "team" ? "Team training" : "Team Leader visit")) +
        "</b><span>" + t12(s.start_time) + " · " + (s.session_type === "team" ? "Team-led" : "Leader-led") + (s.facilitator_name ? " · " + esc(s.facilitator_name) : "") + (s.location ? " · " + esc(s.location) : "") + "</span></div>" +
        (hasLesson(s) ? '<span class="tag ok">Lesson set</span>' : '<span class="tag need">Needs lesson</span>') + "</li>";
    }).join("") + "</ul>";
    if (rows.length > 8) html += '<p class="note">+ ' + (rows.length - 8) + " more in the next 2 months.</p>";
    $("tBody").innerHTML = html;
  }

  /* ---------- weather (starts on the team's own town) ---------- */
  var TOWNS = [
    ["Tumby Bay", -34.375, 136.103], ["Port Neill", -34.118, 136.350], ["Cummins", -34.264, 135.727], ["Coffin Bay", -34.620, 135.468], ["Port Lincoln", -34.726, 135.858],
    ["Cleve", -33.700, 136.494], ["Cowell", -33.682, 136.921], ["Lock", -33.567, 135.757], ["Elliston", -33.648, 134.889], ["Wudinna", -33.049, 135.463],
    ["Kimba", -33.141, 136.418], ["Streaky Bay", -32.797, 134.212], ["Port Kenny", -33.171, 134.687]
  ];
  var town = null;
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
      e.addEventListener("click", function () { town = x[0]; drawTowns(); loadWeather(); }); b.appendChild(e);
    });
  }
  function loadWeather() {
    if (!town) town = TOWNS.some(function (z) { return z[0] === team.name; }) ? team.name : "Tumby Bay";
    drawTowns();
    var x = TOWNS.filter(function (z) { return z[0] === town; })[0];
    var u = "https://api.open-meteo.com/v1/forecast?latitude=" + x[1] + "&longitude=" + x[2] +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant" +
      "&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&timezone=Australia%2FAdelaide&forecast_days=7";
    $("wxBody").innerHTML = '<div class="skel"></div>';
    fetch(u).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); }).then(function (w) {
      var c = w.current, d = w.daily, t = todayIso(), warn = [];
      var html = '<div class="now-w"><span class="ic">' + wmo(c.weather_code)[0] + "</span><div><b>" + Math.round(c.temperature_2m) + '°</b> <span class="muted small">feels ' + Math.round(c.apparent_temperature) + "°</span>" +
        '<div class="small muted">' + esc(town) + " now · " + wmo(c.weather_code)[1] + " · wind " + compass(c.wind_direction_10m) + " " + Math.round(c.wind_speed_10m) + " km/h</div></div></div>";
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
    }).catch(function (e) { $("wxBody").innerHTML = '<p class="err">Could not load the weather: ' + errMsg(e) + "</p>"; });
  }

  /* ---------- start and refresh ---------- */
  function loadAll() {
    $("tName").textContent = team.name + " · " + team.cluster;
    document.title = team.name + " team dashboard";
    loadRoster(); loadDispatch(); loadContrib(); loadSessions(); loadWeather();
    $("updated").textContent = "Updated " + hm(Date.now());
  }
  $("refresh").addEventListener("click", function () { if (team) loadAll(); });
  setInterval(function () { if (team && document.visibilityState === "visible") loadAll(); }, 10 * 60 * 1000);
  start();
})();
