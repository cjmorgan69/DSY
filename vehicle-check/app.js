/* Vehicle check app (/vehicle-check/). Screens, by address:
     #            the vehicle: what to check next, the areas and their sections
     #s=<id>      check one section (a locker, drawer, door ...)
     #stock       the stock-to-order list
     #history     the last 100 section checks
     #guide       kit guide: every item with what it is for, its protocols and procedures, and AO scope (item-info.js)
   Data: checklist.js (the form), Supabase tables vehicles, vehicle_checks, vehicle_stock_needs and the view
   vehicle_section_status (supabase/vehicle-check-setup.sql). Sign-in comes from /shared/gate.js. */
(function () {
  "use strict";
  var DB = window.TRAINING_APP, LISTS = window.VEHICLE_CHECKLISTS || {};
  var STORE = "sb-ekaodnbnpsuayvmxvxbm-auth-token", PICK = "dsy-vc-vehicle", DRAFT = "dsy-vc-draft-";
  var BUSY_MIN = 20;                    /* an unfinished check counts as "being checked now" for this long */
  var app = document.getElementById("app");
  var me = { name: "", uid: "", facilitator: false };
  var vehicles = [], vehicle = null, list = null, sections = {}, order = [];
  var status = {}, busy = {}, needCount = 0, timer = null, openCheck = null;

  /* ---------- small helpers ---------- */
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function btn(cls, text, fn) { var b = el("button", cls, text); b.type = "button"; b.addEventListener("click", fn); return b; }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function toast(msg, bad) {
    var t = el("div", "toast" + (bad ? " err" : ""), msg); t.setAttribute("role", "status"); document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, bad ? 6000 : 3000);
  }
  function when(iso) {
    var d = new Date(iso), now = new Date(), time = d.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" });
    if (d.toDateString() === now.toDateString()) return "today " + time;
    return d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" }) + " " + time;
  }
  function daysAgo(iso) { return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000); }
  function first(name) { return String(name || "Someone").split(" ")[0]; }
  function itemLabel(it) { return it.desc ? it.name + ": " + it.desc : it.name; }

  /* ---------- item information (item-info.js) ---------- */
  var INFO = window.VEHICLE_ITEM_INFO || null;
  function infoFor(it, sectionId) {
    if (!INFO) return null;
    var f = INFO.lookup(it, sectionId);
    return f && (f.what || f.docs.length || f.note || f.flag) ? f : null;
  }
  function scopeClass(sc) { return /^Not/.test(sc) ? "bad" : /consult|only/i.test(sc) ? "warn" : /^AO/.test(sc) ? "good" : ""; }
  function infoPanel(f) {
    var box = el("div", "info");
    var top = el("div", "row"); top.appendChild(el("span", "chip " + scopeClass(f.scope), f.scope)); box.appendChild(top);
    if (f.what) box.appendChild(el("p", null, f.what));
    if (f.docs.length) {
      var ul = el("ul", "docs");
      f.docs.forEach(function (c) {
        var li = el("li"), u = INFO.url(c), a = el(u ? "a" : "span", null);
        a.appendChild(el("b", null, c + " ")); a.appendChild(document.createTextNode(INFO.docs[c] || ""));
        if (u) { a.href = u; a.target = "_blank"; a.rel = "noopener"; }
        li.appendChild(a);
        if (INFO.review[c]) li.appendChild(el("span", "small muted", " review " + INFO.review[c]));
        ul.appendChild(li);
      });
      box.appendChild(ul);
    } else if (!/Non-clinical/.test(f.scope)) box.appendChild(el("p", "small muted", "Not named in an AO protocol or procedure."));
    if (f.note) box.appendChild(el("p", "small", f.note));
    if (f.flag) box.appendChild(el("p", "small", f.flag));
    return box;
  }

  /* ---------- Supabase REST with the site's sign-in ---------- */
  function session() { try { return JSON.parse(localStorage.getItem(STORE) || "null"); } catch (e) { return null; } }
  function refresh() {
    var s = session();
    return fetch(DB.supabaseUrl + "/auth/v1/token?grant_type=refresh_token", { method: "POST", headers: { apikey: DB.supabaseKey, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: s && s.refresh_token }) })
      .then(function (r) { if (!r.ok) throw new Error("Please sign in again."); return r.json(); })
      .then(function (j) { if (!j.expires_at) j.expires_at = Math.floor(Date.now() / 1000) + (j.expires_in || 3600); localStorage.setItem(STORE, JSON.stringify(j)); return j; });
  }
  function api(method, path, body, again) {
    var s = session() || {};
    var h = { apikey: DB.supabaseKey, Authorization: "Bearer " + s.access_token };
    if (body !== undefined) { h["Content-Type"] = "application/json"; h.Prefer = "return=representation"; }
    return fetch(DB.supabaseUrl + "/rest/v1/" + path, { method: method, headers: h, body: body === undefined ? undefined : JSON.stringify(body) })
      .then(function (r) {
        if (r.status === 401 && !again) return refresh().then(function () { return api(method, path, body, true); });
        if (!r.ok) return r.json().catch(function () { return {}; }).then(function (j) { throw new Error(j.message || "The database did not accept that (" + r.status + ")."); });
        return r.status === 204 ? null : r.json().catch(function () { return null; });
      });
  }
  function fail(e) { toast((e && e.message) || "Something went wrong. Check your connection and try again.", true); }

  /* ---------- checklist ---------- */
  function useList(key) {
    list = LISTS[key] || LISTS.vs30; sections = {}; order = [];
    list.areas.forEach(function (a) {
      a.sections.forEach(function (s) {
        var seen = {};
        s.area = a;
        s.list = s.items.map(function (r) {
          var id = slug(r[0] + " " + r[1]); while (seen[id]) id += "-2"; seen[id] = 1;
          return { id: id, key: s.id + "." + id, name: r[0], desc: r[1], qty: r[2] };
        });
        sections[s.id] = s; order.push(s);
      });
    });
  }
  function isDue(s) {
    var st = status[s.id];
    return !st || Date.now() - new Date(st.completed_at).getTime() > vehicle.check_every_days * 86400000;
  }
  function someoneElse(s) { var b = busy[s.id]; return b && b.checked_by !== me.uid ? b : null; }
  /* what to prompt for: never checked first (in the form's order), then the one checked longest ago */
  function nextDue(inArea, not) {
    var c = order.filter(function (s) { return s !== not && isDue(s) && !someoneElse(s) && (!inArea || s.area === inArea); });
    var never = c.filter(function (s) { return !status[s.id]; });
    if (never.length) return never[0];
    c.sort(function (a, b) { return new Date(status[a.id].completed_at) - new Date(status[b.id].completed_at); });
    return c[0] || null;
  }

  /* ---------- loading ---------- */
  function loadVehicles() {
    return api("GET", "vehicles?select=*&active=is.true&order=name").then(function (rows) {
      vehicles = rows || [];
      var id = null; try { id = localStorage.getItem(PICK); } catch (e) {}
      vehicle = vehicles.filter(function (v) { return v.id === id; })[0] || null;
      if (vehicle) useList(vehicle.checklist);
    });
  }
  function loadStatus() {
    if (!vehicle) return Promise.resolve();
    var v = "vehicle_id=eq." + vehicle.id, since = new Date(Date.now() - BUSY_MIN * 60000).toISOString();
    return Promise.all([
      api("GET", "vehicle_section_status?select=section,completed_at,checked_by_name,short_count&" + v),
      api("GET", "vehicle_checks?select=id,section,checked_by,checked_by_name,started_at&completed_at=is.null&started_at=gte." + encodeURIComponent(since) + "&" + v),
      api("GET", "vehicle_stock_needs?select=id&status=neq.restocked&" + v)
    ]).then(function (r) {
      status = {}; busy = {};
      (r[0] || []).forEach(function (x) { status[x.section] = x; });
      (r[1] || []).forEach(function (x) { busy[x.section] = x; });
      needCount = (r[2] || []).length;
    });
  }

  /* ---------- screen: the vehicle ---------- */
  function pickVehicle(id) {
    try { localStorage.setItem(PICK, id); } catch (e) {}
    vehicle = vehicles.filter(function (v) { return v.id === id; })[0] || null;
    if (vehicle) useList(vehicle.checklist);
    route();
  }
  function vehiclePanel() {
    var p = el("section", "panel pad stack"), row = el("div", "vehicle"), lab = el("label", null, "Vehicle"), sel = el("select");
    if (!vehicle) { var o0 = el("option", null, "Choose the vehicle you are checking"); o0.value = ""; sel.appendChild(o0); }
    vehicles.forEach(function (v) { var o = el("option", null, v.name); o.value = v.id; if (vehicle && v.id === vehicle.id) o.selected = true; sel.appendChild(o); });
    sel.addEventListener("change", function () { if (sel.value) pickVehicle(sel.value); });
    lab.appendChild(sel); row.appendChild(lab); p.appendChild(row);
    if (me.facilitator) {
      var tools = el("div", "row");
      tools.appendChild(btn("linkbtn", "Add a vehicle", function () {
        var name = (prompt("Name of the vehicle (for example the station and call sign)") || "").trim();
        if (!name) return;
        api("POST", "vehicles", { name: name.slice(0, 60) }).then(function (rows) { return loadVehicles().then(function () { pickVehicle(rows[0].id); }); }).catch(fail);
      }));
      if (vehicle) {
        tools.appendChild(btn("linkbtn", "Rename", function () {
          var name = (prompt("New name for this vehicle", vehicle.name) || "").trim();
          if (!name || name === vehicle.name) return;
          api("PATCH", "vehicles?id=eq." + vehicle.id, { name: name.slice(0, 60) }).then(loadVehicles).then(route).catch(fail);
        }));
        tools.appendChild(btn("linkbtn", "Check every " + vehicle.check_every_days + " days", function () {
          var n = parseInt(prompt("How often should every section be checked? (days, 1 to 90)", vehicle.check_every_days), 10);
          if (!(n >= 1 && n <= 90)) return;
          api("PATCH", "vehicles?id=eq." + vehicle.id, { check_every_days: n }).then(loadVehicles).then(route).catch(fail);
        }));
      }
      p.appendChild(tools);
    }
    return p;
  }
  function chipFor(s) {
    var st = status[s.id], b = busy[s.id];
    if (b) return el("span", "chip hi", b.checked_by === me.uid ? "You started this" : first(b.checked_by_name) + " is checking this now");
    if (!st) return el("span", "chip warn", "Never checked");
    if (isDue(s)) return el("span", "chip warn", "Not checked for " + daysAgo(st.completed_at) + " days");
    return el("span", "chip good", "Checked " + when(st.completed_at) + ", " + first(st.checked_by_name));
  }
  function drawHome() {
    app.textContent = "";
    app.appendChild(vehiclePanel());
    if (!vehicle) {
      if (!vehicles.length) app.appendChild(el("p", "notice", me.facilitator ? "No vehicles yet. Add one above." : "No vehicles have been set up yet. Ask your team leader to add one."));
      return;
    }
    var done = order.filter(function (s) { return !isDue(s); }).length, nx = nextDue();
    var prog = el("section", "panel pad stack");
    prog.appendChild(el("h2", null, done + " of " + order.length + " sections checked"));
    var bar = el("div", "bar"), fill = el("i"); fill.style.width = Math.round(100 * done / order.length) + "%"; bar.appendChild(fill); prog.appendChild(bar);
    prog.appendChild(el("p", "small muted", "In the last " + vehicle.check_every_days + " days. " + list.title + " checklist. Several people can check at once: each take a different area."));
    var links = el("div", "row");
    var a1 = el("a", "btn" + (needCount ? "" : " ghost"), "Stock to order" + (needCount ? " (" + needCount + ")" : "")); a1.href = "#stock"; links.appendChild(a1);
    var a2 = el("a", "btn ghost", "History"); a2.href = "#history"; links.appendChild(a2);
    if (INFO) { var a3 = el("a", "btn ghost", "Kit guide"); a3.href = "#guide"; links.appendChild(a3); }
    prog.appendChild(links); app.appendChild(prog);

    var card = el("section", "panel nextcard");
    if (nx) {
      var w = el("div", "what");
      w.appendChild(el("span", "eyebrow", "Check this next"));
      w.appendChild(el("span", "t", nx.name));
      w.appendChild(el("span", "small muted", status[nx.id] ? "Last checked " + when(status[nx.id].completed_at) + " (" + daysAgo(status[nx.id].completed_at) + " days ago)" : "Not checked yet on this vehicle"));
      card.appendChild(w);
      var go = el("a", "btn", "Start"); go.href = "#s=" + nx.id; card.appendChild(go);
    } else {
      card.appendChild(el("p", null, done === order.length ? "Every section has been checked in the last " + vehicle.check_every_days + " days." : "The sections left are being checked by someone else right now."));
    }
    app.appendChild(card);

    list.areas.forEach(function (a) {
      var box = el("section", "panel area"), head = el("div", "head"), left = a.sections.filter(isDue).length;
      var hh = el("div"); hh.appendChild(el("h2", null, a.name)); hh.appendChild(el("p", "small muted", a.hint)); head.appendChild(hh);
      head.appendChild(el("span", "chip" + (left ? " warn" : " good"), left ? left + " to check" : "All checked"));
      box.appendChild(head);
      var ul = el("ul", "list");
      a.sections.forEach(function (s) {
        var li = el("li"), row = el("a", "item sec" + (isDue(s) ? " due" : "")); row.href = "#s=" + s.id;
        var w = el("div", "what"); w.appendChild(el("span", "t", s.name)); w.appendChild(el("span", "small muted", s.list.length + (s.list.length === 1 ? " item" : " items")));
        row.appendChild(w);
        var act = el("div", "act"); act.appendChild(chipFor(s));
        if (status[s.id] && status[s.id].short_count) act.appendChild(el("span", "chip bad", status[s.id].short_count + " short"));
        row.appendChild(act); li.appendChild(row); ul.appendChild(li);
      });
      box.appendChild(ul); app.appendChild(box);
    });
    app.appendChild(el("p", "small muted", "Source: " + list.source + ". The areas are DSY's grouping of the form's sections."));
  }

  /* ---------- screen: one section ---------- */
  function draftKey(s) { return DRAFT + vehicle.id + "-" + s.id; }
  function releaseClaim() {
    if (!openCheck) return Promise.resolve();
    var id = openCheck.id; openCheck = null;
    return api("DELETE", "vehicle_checks?id=eq." + id + "&completed_at=is.null").catch(function () {});
  }
  function drawSection(s) {
    var marks = {}, note = "", shown = {};
    try { var d = JSON.parse(localStorage.getItem(draftKey(s)) || "null"); if (d) { marks = d.marks || {}; note = d.note || ""; } } catch (e) {}
    function keep() { try { localStorage.setItem(draftKey(s), JSON.stringify({ marks: marks, note: note })); } catch (e) {} }

    app.textContent = "";
    var back = el("a", "linkbtn back", "← All sections"); back.href = "#"; app.appendChild(back);
    var head = el("section", "panel pad stack");
    head.appendChild(el("span", "eyebrow", vehicle.name + " · " + s.area.name));
    head.appendChild(el("h2", null, s.name));
    var other = someoneElse(s);
    if (other) head.appendChild(el("p", "notice", first(other.checked_by_name) + " started checking this section at " + when(other.started_at) + ". Pick another section unless they have stopped."));
    if (s.note) head.appendChild(el("p", "small muted", s.note));
    head.appendChild(el("p", "small muted", "Tap OK when the full quantity is there. Tap Short when something is missing, and say how many to order."));
    var allOk = btn("btn ghost", "Everything else is here", function () { s.list.forEach(function (it) { if (!marks[it.id]) marks[it.id] = { s: "ok" }; }); keep(); paint(); });
    head.appendChild(allOk); app.appendChild(head);

    var box = el("section", "panel"), ul = el("ul", "items"); box.appendChild(ul); app.appendChild(box);
    var msg = el("p", "err"); msg.setAttribute("role", "alert");

    function paint(showMissing) {
      ul.textContent = "";
      s.list.forEach(function (it) {
        var m = marks[it.id], li = el("li"); if (showMissing && !m) li.className = "unmarked"; li.id = "it-" + it.id;
        var w = el("div", "what"); w.appendChild(el("span", "t", it.name));
        if (it.desc) w.appendChild(el("span", "small muted", it.desc));
        if (it.qty) { var q = el("span", "small"); q.appendChild(document.createTextNode("Quantity: ")); q.appendChild(el("span", "qty", it.qty)); w.appendChild(q); }
        li.appendChild(w);
        var f = infoFor(it, s.id);
        if (f) {
          var ib = btn("about", "i", function () { shown[it.id] = !shown[it.id]; paint(); });
          ib.setAttribute("aria-label", "About " + itemLabel(it)); ib.setAttribute("aria-expanded", shown[it.id] ? "true" : "false");
          li.appendChild(ib);
        }
        var mk = el("div", "mark");
        var ok = btn("ok", "OK", function () { marks[it.id] = { s: "ok" }; keep(); paint(); });
        var sh = btn("short", "Short", function () { if (!m || m.s !== "short") marks[it.id] = { s: "short", n: 1, note: "" }; keep(); paint(); });
        ok.setAttribute("aria-pressed", m && m.s === "ok" ? "true" : "false"); ok.setAttribute("aria-label", "OK: " + itemLabel(it));
        sh.setAttribute("aria-pressed", m && m.s === "short" ? "true" : "false"); sh.setAttribute("aria-label", "Short: " + itemLabel(it));
        mk.appendChild(ok); mk.appendChild(sh); li.appendChild(mk);
        if (m && m.s === "short") {
          var sb = el("div", "shortbox"), st = el("div", "step"), num = el("b", null, String(m.n));
          st.appendChild(el("span", "small", "Order"));
          st.appendChild(btn(null, "−", function () { m.n = Math.max(1, m.n - 1); num.textContent = m.n; keep(); }));
          st.appendChild(num);
          st.appendChild(btn(null, "+", function () { m.n = Math.min(999, m.n + 1); num.textContent = m.n; keep(); }));
          sb.appendChild(st);
          var nt = el("input"); nt.type = "text"; nt.maxLength = 300; nt.placeholder = "Note (optional): damaged, expired, size ..."; nt.value = m.note || "";
          nt.setAttribute("aria-label", "Note for " + itemLabel(it));
          nt.addEventListener("input", function () { m.note = nt.value; keep(); });
          sb.appendChild(nt); li.appendChild(sb);
        }
        if (f && shown[it.id]) li.appendChild(infoPanel(f));
        ul.appendChild(li);
      });
      var left = s.list.filter(function (it) { return !marks[it.id]; }).length;
      allOk.hidden = !left;
      allOk.textContent = left === s.list.length ? "Everything is here" : "Everything else is here";
    }
    paint();

    var extra = el("section", "panel pad stack"), nl = el("label", null, "Anything else to report (optional)"), ta = el("textarea");
    ta.maxLength = 1000; ta.value = note; ta.addEventListener("input", function () { note = ta.value; keep(); });
    nl.appendChild(ta); extra.appendChild(nl); extra.appendChild(msg); app.appendChild(extra);

    var bar = el("div", "savebar"), save = btn("btn", "Save this section", function () {
      var missing = s.list.filter(function (it) { return !marks[it.id]; });
      if (missing.length) {
        msg.textContent = missing.length + (missing.length === 1 ? " item is" : " items are") + " not marked yet.";
        paint(true); document.getElementById("it-" + missing[0].id).scrollIntoView({ block: "center" }); return;
      }
      msg.textContent = ""; save.disabled = true; save.textContent = "Saving...";
      saveSection(s, marks, note.trim()).then(function () {
        try { localStorage.removeItem(draftKey(s)); } catch (e) {}
        return loadStatus();
      }).then(function () { drawSaved(s); }).catch(function (e) { save.disabled = false; save.textContent = "Save this section"; fail(e); });
    });
    bar.appendChild(save); app.appendChild(bar);

    /* tell the rest of the crew this section is being checked */
    if (!openCheck || openCheck.section !== s.id) {
      releaseClaim().then(function () {
        return api("POST", "vehicle_checks", { vehicle_id: vehicle.id, section: s.id, checked_by: me.uid, checked_by_name: me.name });
      }).then(function (rows) { openCheck = { id: rows[0].id, section: s.id }; }).catch(function () {});
    }
    window.scrollTo(0, 0);
  }
  function saveSection(s, marks, note) {
    var shorts = s.list.filter(function (it) { return marks[it.id].s === "short"; });
    var body = { completed_at: new Date().toISOString(), results: marks, short_count: shorts.length, note: note || null, checked_by_name: me.name };
    var step = openCheck && openCheck.section === s.id
      ? api("PATCH", "vehicle_checks?id=eq." + openCheck.id, body)
      : api("POST", "vehicle_checks", Object.assign({ vehicle_id: vehicle.id, section: s.id, checked_by: me.uid }, body));
    return step.then(function (rows) {
      if (!rows || !rows[0]) return api("POST", "vehicle_checks", Object.assign({ vehicle_id: vehicle.id, section: s.id, checked_by: me.uid }, body));
      return rows;
    }).then(function (rows) {
      var checkId = rows[0].id; openCheck = null;
      /* bring the stock-to-order list into line with this check */
      return api("GET", "vehicle_stock_needs?select=id,item_key,status&status=neq.restocked&vehicle_id=eq." + vehicle.id + "&section=eq." + s.id).then(function (open) {
        var byKey = {}, jobs = [], now = new Date().toISOString();
        (open || []).forEach(function (n) { byKey[n.item_key] = n; });
        s.list.forEach(function (it) {
          var m = marks[it.id], n = byKey[it.key];
          if (m.s === "short" && n) jobs.push(api("PATCH", "vehicle_stock_needs?id=eq." + n.id, { qty: m.n, note: m.note || null, check_id: checkId, updated_at: now, updated_by_name: me.name }));
          else if (m.s === "short") jobs.push(api("POST", "vehicle_stock_needs", { vehicle_id: vehicle.id, section: s.id, item_key: it.key, item: itemLabel(it), qty: m.n, note: m.note || null, check_id: checkId, reported_by: me.uid, reported_by_name: me.name }));
          else if (n) jobs.push(api("PATCH", "vehicle_stock_needs?id=eq." + n.id, { status: "restocked", updated_at: now, updated_by_name: me.name }));
        });
        return Promise.all(jobs);
      });
    });
  }
  function drawSaved(s) {
    app.textContent = "";
    var p = el("section", "panel pad stack"), st = status[s.id] || {};
    p.appendChild(el("span", "chip good", "Saved"));
    p.appendChild(el("h2", null, s.name + " checked"));
    p.appendChild(el("p", "muted", st.short_count ? st.short_count + (st.short_count === 1 ? " item was" : " items were") + " added to the stock-to-order list." : "Everything was there."));
    app.appendChild(p);
    var nx = nextDue(s.area, s) || nextDue(null, s);
    if (nx) {
      var card = el("section", "panel nextcard"), w = el("div", "what");
      w.appendChild(el("span", "eyebrow", nx.area === s.area ? "Next in this area" : "Not checked yet"));
      w.appendChild(el("span", "t", nx.name));
      w.appendChild(el("span", "small muted", status[nx.id] ? "Last checked " + daysAgo(status[nx.id].completed_at) + " days ago" : "Not checked yet on this vehicle"));
      card.appendChild(w);
      var go = el("a", "btn", "Start"); go.href = "#s=" + nx.id; card.appendChild(go); app.appendChild(card);
    } else {
      app.appendChild(el("p", "notice", "That was the last section due. The whole vehicle is checked."));
    }
    var row = el("div", "row");
    var b1 = el("a", "btn ghost", "All sections"); b1.href = "#"; row.appendChild(b1);
    var b2 = el("a", "btn ghost", "Stock to order" + (needCount ? " (" + needCount + ")" : "")); b2.href = "#stock"; row.appendChild(b2);
    app.appendChild(row); window.scrollTo(0, 0);
  }

  /* ---------- screen: stock to order ---------- */
  function drawStock() {
    app.textContent = "";
    var back = el("a", "linkbtn back", "← All sections"); back.href = "#"; app.appendChild(back);
    var head = el("section", "panel pad stack");
    head.appendChild(el("span", "eyebrow", vehicle.name)); head.appendChild(el("h2", null, "Stock to order"));
    head.appendChild(el("p", "small muted", "Items marked Short in a check land here. A line closes when the item is next checked as OK, or when you tap Restocked."));
    app.appendChild(head);
    var hold = el("div", "stack"); app.appendChild(hold); hold.appendChild(el("p", "muted", "Loading..."));
    api("GET", "vehicle_stock_needs?select=*&status=neq.restocked&vehicle_id=eq." + vehicle.id + "&order=reported_at").then(function (rows) {
      rows = rows || []; needCount = rows.length; hold.textContent = "";
      var patch = function (n, body) {
        body.updated_at = new Date().toISOString(); body.updated_by_name = me.name;
        return api("PATCH", "vehicle_stock_needs?id=eq." + n.id, body).then(drawStock).catch(fail);
      };
      if (!rows.length) hold.appendChild(el("p", "notice", "Nothing to order. Every item was present at its last check."));
      else {
        var tools = el("div", "row");
        tools.appendChild(btn("btn", "Copy the list", function () {
          var text = "Stock to order: " + vehicle.name + " (" + new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) + ")\n" +
            rows.map(function (n) { return n.qty + " x " + n.item + (sections[n.section] ? " [" + sections[n.section].name + "]" : "") + (n.note ? " - " + n.note : "") + (n.status === "ordered" ? " (ordered)" : ""); }).join("\n");
          (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () { toast("List copied. Paste it into a message or email."); }, function () { prompt("Copy the list", text); });
        }));
        if (rows.some(function (n) { return n.status === "open"; })) tools.appendChild(btn("btn ghost", "Mark all as ordered", function () {
          api("PATCH", "vehicle_stock_needs?status=eq.open&vehicle_id=eq." + vehicle.id, { status: "ordered", updated_at: new Date().toISOString(), updated_by_name: me.name }).then(drawStock).catch(fail);
        }));
        hold.appendChild(tools);
        var box = el("section", "panel area"), ul = el("ul", "list");
        rows.forEach(function (n) {
          var li = el("li"), row = el("div", "item need" + (n.status === "ordered" ? " ordered" : "")), w = el("div", "what");
          w.appendChild(el("span", "t", n.item));
          w.appendChild(el("span", "small muted", (sections[n.section] ? sections[n.section].name : "Added by hand") + " · " + first(n.reported_by_name) + ", " + when(n.reported_at)));
          if (n.note) w.appendChild(el("span", "small", n.note));
          if (n.status === "ordered") w.appendChild(el("span", "chip hi", "Ordered"));
          row.appendChild(w);
          var act = el("div", "act"), st = el("div", "step");
          st.appendChild(btn(null, "−", function () { if (n.qty > 1) patch(n, { qty: n.qty - 1 }); })); st.lastChild.setAttribute("aria-label", "One fewer " + n.item);
          st.appendChild(el("b", null, String(n.qty)));
          st.appendChild(btn(null, "+", function () { patch(n, { qty: n.qty + 1 }); })); st.lastChild.setAttribute("aria-label", "One more " + n.item);
          act.appendChild(st);
          act.appendChild(btn("btn ghost small", n.status === "ordered" ? "Not ordered" : "Ordered", function () { patch(n, { status: n.status === "ordered" ? "open" : "ordered" }); }));
          act.appendChild(btn("btn small", "Restocked", function () { patch(n, { status: "restocked" }); }));
          row.appendChild(act); li.appendChild(row); ul.appendChild(li);
        });
        box.appendChild(ul); hold.appendChild(box);
      }
      var add = el("section", "panel pad stack"); add.appendChild(el("h3", null, "Add something else"));
      var form = el("form", "addrow"), l1 = el("label", null, "Item"), i1 = el("input"), l2 = el("label", null, "How many"), i2 = el("input");
      i1.type = "text"; i1.maxLength = 200; i1.required = true; l1.appendChild(i1);
      i2.type = "number"; i2.min = 1; i2.max = 999; i2.value = 1; i2.inputMode = "numeric"; l2.appendChild(i2); l2.style.flex = "0 1 7rem";
      var sub = el("button", "btn", "Add"); sub.type = "submit";
      form.appendChild(l1); form.appendChild(l2); form.appendChild(sub);
      form.addEventListener("submit", function (e) {
        e.preventDefault(); var name = i1.value.trim(); if (!name) return;
        api("POST", "vehicle_stock_needs", { vehicle_id: vehicle.id, section: "manual", item_key: "manual." + Date.now(), item: name, qty: Math.min(999, Math.max(1, parseInt(i2.value, 10) || 1)), reported_by: me.uid, reported_by_name: me.name }).then(drawStock).catch(fail);
      });
      add.appendChild(form); hold.appendChild(add);
    }).catch(function (e) { hold.textContent = ""; hold.appendChild(el("p", "err", e.message)); });
  }

  /* ---------- screen: history ---------- */
  /* ---------- screen: kit guide ---------- */
  function drawGuide() {
    app.textContent = "";
    var back = el("a", "linkbtn back", "\u2190 All sections"); back.href = "#"; app.appendChild(back);
    var head = el("section", "panel pad stack");
    head.appendChild(el("span", "eyebrow", list.title)); head.appendChild(el("h2", null, "Kit guide"));
    head.appendChild(el("p", "small muted", "What each item is for, the AO protocols (CPP) and procedures (CPPRO) that name it, and AO scope. Tap a document to open it. Summaries are DSY's plain-English reading of the SAAS documents (Nov 2026): the protocol always wins."));
    var lab = el("label", null, "Find an item"), q = el("input"); q.type = "search"; q.placeholder = "For example tourniquet, i-gel, glucagon";
    lab.appendChild(q); head.appendChild(lab); app.appendChild(head);
    var hold = el("div", "stack"); app.appendChild(hold);
    function draw() {
      var term = q.value.trim().toLowerCase(); hold.textContent = "";
      list.areas.forEach(function (a) {
        a.sections.forEach(function (s) {
          var groups = [];
          s.list.forEach(function (it) {
            var f = infoFor(it, s.id); if (!f || !f.what) return;
            var hay = (itemLabel(it) + " " + f.what + " " + f.docs.join(" ") + " " + s.name).toLowerCase();
            if (term && hay.indexOf(term) < 0) return;
            var g = groups.filter(function (x) { return x.f === f; })[0];
            if (g) g.items.push(it); else groups.push({ f: f, items: [it] });
          });
          if (!groups.length) return;
          var box = el("section", "panel area"), hd = el("div", "head"); hd.appendChild(el("h2", null, s.name)); hd.appendChild(el("span", "small muted", a.name)); box.appendChild(hd);
          var ul = el("ul", "items");
          groups.forEach(function (g) {
            var li = el("li"), w = el("div", "what");
            g.items.forEach(function (it) { w.appendChild(el("span", "t", itemLabel(it) + (it.qty ? " (" + it.qty + ")" : ""))); });
            li.appendChild(w); li.appendChild(infoPanel(g.f)); ul.appendChild(li);
          });
          box.appendChild(ul); hold.appendChild(box);
        });
      });
      if (!hold.childNodes.length) hold.appendChild(el("p", "notice", "Nothing matches that."));
    }
    var t = null; q.addEventListener("input", function () { clearTimeout(t); t = setTimeout(draw, 150); });
    draw(); window.scrollTo(0, 0);
  }

  function drawHistory() {
    app.textContent = "";
    var back = el("a", "linkbtn back", "← All sections"); back.href = "#"; app.appendChild(back);
    var head = el("section", "panel pad stack");
    head.appendChild(el("span", "eyebrow", vehicle.name)); head.appendChild(el("h2", null, "Check history"));
    head.appendChild(el("p", "small muted", "The last 100 section checks, newest first.")); app.appendChild(head);
    var hold = el("div", "stack"); app.appendChild(hold); hold.appendChild(el("p", "muted", "Loading..."));
    api("GET", "vehicle_checks?select=id,section,completed_at,checked_by_name,short_count,note,results&completed_at=not.is.null&order=completed_at.desc&limit=100&vehicle_id=eq." + vehicle.id).then(function (rows) {
      hold.textContent = "";
      if (!rows || !rows.length) { hold.appendChild(el("p", "notice", "No checks recorded for this vehicle yet.")); return; }
      var box = el("section", "panel area"), ul = el("ul", "list");
      rows.forEach(function (c) {
        var s = sections[c.section], li = el("li"), row = el("div", "item"), w = el("div", "what");
        w.appendChild(el("span", "t", s ? s.name : c.section));
        w.appendChild(el("span", "small muted", when(c.completed_at) + " · " + (c.checked_by_name || "")));
        if (c.short_count && s) {
          var names = s.list.filter(function (it) { return c.results[it.id] && c.results[it.id].s === "short"; }).map(function (it) { return itemLabel(it) + " (" + c.results[it.id].n + ")"; });
          w.appendChild(el("span", "small", "Short: " + names.join(", ")));
        }
        if (c.note) w.appendChild(el("span", "small", "Note: " + c.note));
        row.appendChild(w);
        row.appendChild(el("span", "chip " + (c.short_count ? "bad" : "good"), c.short_count ? c.short_count + " short" : "All there"));
        li.appendChild(row); ul.appendChild(li);
      });
      box.appendChild(ul); hold.appendChild(box);
    }).catch(function (e) { hold.textContent = ""; hold.appendChild(el("p", "err", e.message)); });
  }

  /* ---------- routing ---------- */
  function route() {
    clearInterval(timer); timer = null;
    var h = location.hash.replace(/^#/, ""), m = /^s=(.+)$/.exec(h), s = m && vehicle && sections[m[1]];
    if (!s) releaseClaim();
    if (!vehicle) { drawHome(); return; }
    if (h === "stock") return drawStock();
    if (h === "history") return drawHistory();
    if (h === "guide" && INFO) return drawGuide();
    loadStatus().then(function () {
      if (s) return drawSection(s);
      drawHome();
      timer = setInterval(function () { if (!document.hidden) loadStatus().then(drawHomeKeepScroll).catch(function () {}); }, 20000);
    }).catch(function (e) { app.textContent = ""; app.appendChild(vehiclePanel()); app.appendChild(el("p", "err", e.message)); });
  }
  function drawHomeKeepScroll() { var y = window.scrollY; drawHome(); window.scrollTo(0, y); }
  window.addEventListener("hashchange", route);

  (window.DSY_GATE ? window.DSY_GATE.ready : Promise.resolve({})).then(function (g) {
    var s = session();
    me = { name: g.name || "", uid: s && s.user ? s.user.id : "", facilitator: !!g.facilitator };
    document.getElementById("who").textContent = me.name;
    return loadVehicles();
  }).then(route).catch(function (e) { app.textContent = ""; app.appendChild(el("p", "err", (e && e.message) || "Could not load the vehicle check.")); });
})();
