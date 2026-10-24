/* Protocol Chase: a maze game for phones. When a ghost catches the player, or the player eats a power dot, a question
   pops up with a short countdown. Questions are taken from the Knowledge check quiz of each microlearning module
   (../<slug>/content.js, listed in ../modules.js), so every clinical statement comes from the protocol that module
   was built on. The game itself (maze, rules, scoring) is DSY-written.
   ?m=stroke,asthma preselects modules; ?t=8 sets the answer time. */
(function () {
  "use strict";

  var MAP = [
    "###################",
    "#........#........#",
    "#o##.###.#.###.##o#",
    "#.................#",
    "#.##.#.#####.#.##.#",
    "#....#...#...#....#",
    "####.### # ###.####",
    "   #.#   B   #.#   ",
    "####.# ##-## #.####",
    "    .  #GGG#  .    ",
    "####.# ##### #.####",
    "   #.#       #.#   ",
    "####.# ##### #.####",
    "#........#........#",
    "#.##.###.#.###.##.#",
    "#o.#.....P.....#.o#",
    "##.#.#.#####.#.#.##",
    "#....#...#...#....#",
    "#.######.#.######.#",
    "#.................#",
    "###################"
  ];
  var COLS = 19, ROWS = 21;
  var START = { x: 9, y: 15 }, EXIT = { x: 9, y: 7 }, HOME = [{ x: 9, y: 9 }, { x: 8, y: 9 }, { x: 10, y: 9 }];
  var DX = [1, 0, -1, 0], DY = [0, 1, 0, -1];   // 0 right, 1 down, 2 left, 3 up
  var GHOSTS = [
    { color: "#ff5a5a", corner: { x: 17, y: -2 } },
    { color: "#ff9ad5", corner: { x: 1, y: -2 } },
    { color: "#4fe3ee", corner: { x: 17, y: 22 } },
    { color: "#ffb347", corner: { x: 1, y: 22 } }
  ];
  var GROUPS = [{ key: "ao", label: "Ambulance Officer" }, { key: "paramedic", label: "Paramedic" }, { key: "rn", label: "Rural nursing" }];
  var TIMES = [5, 8, 12];
  var LIVES = 3, DOUBLE_SECS = 10, IMMUNE_SECS = 2.5;

  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var params = new URLSearchParams(location.search);

  /* ---------- Questions ---------- */
  var MODS = {};          // slug -> { title, code, questions }
  var chosen = {}, answerTime = 12;

  function load(slug) {
    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = "../" + slug + "/content.js?v=" + (window.ASSET_VERSION || "");
      s.onload = function () { var m = window.MODULE; window.MODULE = null; s.remove(); resolve(m); };
      s.onerror = function () { s.remove(); resolve(null); };
      document.head.appendChild(s);
    });
  }
  function extract(slug, m) {
    var out = [], P = m.protocol || {};
    function add(list) {
      (list || []).forEach(function (q) {
        if (q && q.q && q.options && q.options.length > 1 && typeof q.answer === "number")
          out.push({ q: q.q, options: q.options, answer: q.answer, why: q.why || "", slug: slug, topic: m.title, code: P.code || "" });
      });
    }
    if (m.quiz) add(m.quiz);
    else (m.panels || []).forEach(function (p) { (p.blocks || []).forEach(function (b) { if (b.quiz) add(b.quiz.questions); }); });
    return out;
  }
  // every content.js writes to window.MODULE, so load one at a time
  function loadAll(slugs) {
    return slugs.reduce(function (p, slug) {
      return p.then(function () { return load(slug).then(function (m) { if (m) MODS[slug] = { title: m.title, code: (m.protocol || {}).code || "", questions: extract(slug, m) }; }); });
    }, Promise.resolve());
  }

  /* ---------- Menu ---------- */
  function buildMenu() {
    var lists = window.MODULE_LISTS || { ao: [] }, all = [];
    GROUPS.forEach(function (g) { (lists[g.key] || []).forEach(function (s) { all.push(s); }); });
    var pre = (params.get("m") || "").split(",").filter(Boolean);
    var t = parseInt(params.get("t") || store("dsy-chase-secs"), 10);
    if (TIMES.indexOf(t) >= 0) answerTime = t;

    loadAll(all).then(function () {
      showBoard($("board"), "all");
      var box = $("topics"); box.textContent = "";
      GROUPS.forEach(function (g) {
        var slugs = (lists[g.key] || []).filter(function (s) { return MODS[s] && MODS[s].questions.length; });
        if (!slugs.length) return;
        var wrap = el("div", "group"), head = el("div", "group-head"), chips = el("div", "chips");
        head.appendChild(el("span", null, g.label));
        var btn = el("button", null, "All");
        btn.type = "button";
        btn.onclick = function () {
          var allOn = slugs.every(function (s) { return chosen[s]; });
          slugs.forEach(function (s) { chosen[s] = !allOn; });
          renderChips();
        };
        head.appendChild(btn);
        slugs.forEach(function (s) {
          if (pre.length ? pre.indexOf(s) >= 0 : g.key === "ao") chosen[s] = true;
          var c = el("button", "chip", MODS[s].title);
          c.type = "button"; c.dataset.slug = s;
          c.appendChild(el("small", null, String(MODS[s].questions.length)));
          c.onclick = function () { chosen[s] = !chosen[s]; renderChips(); };
          chips.appendChild(c);
        });
        wrap.appendChild(head); wrap.appendChild(chips); box.appendChild(wrap);
      });
      renderChips();
    });

    var tb = $("times");
    TIMES.forEach(function (n) {
      var c = el("button", "chip", n + " seconds");
      c.type = "button"; c.dataset.t = n;
      c.onclick = function () { answerTime = n; store("dsy-chase-secs", String(n)); renderTimes(); };
      tb.appendChild(c);
    });
    renderTimes();
    var best = store("dsy-chase-best");
    if (best) $("best").textContent = "Best score on this device: " + best;
    $("start").onclick = startGame;
  }
  function renderChips() {
    var n = 0;
    Array.prototype.forEach.call(document.querySelectorAll("#topics .chip"), function (c) {
      var on = !!chosen[c.dataset.slug]; c.classList.toggle("on", on);
      if (on) n += MODS[c.dataset.slug].questions.length;
    });
    $("start").disabled = !n;
    $("start").textContent = n ? "Start (" + n + " questions)" : "Choose at least one protocol";
  }
  function renderTimes() {
    Array.prototype.forEach.call(document.querySelectorAll("#times .chip"), function (c) { c.classList.toggle("on", +c.dataset.t === answerTime); });
  }

  /* ---------- Maze ---------- */
  var grid, dotsLeft;
  function buildGrid() {
    grid = MAP.map(function (r) { return r.replace(/[BP]/g, " ").split(""); });
    // cells the player cannot reach are drawn as empty space and never walked on
    var seen = {}, stack = [[START.x, START.y]]; seen[START.x + "," + START.y] = 1;
    while (stack.length) {
      var p = stack.pop();
      for (var d = 0; d < 4; d++) {
        var c = (p[0] + DX[d] + COLS) % COLS, r = p[1] + DY[d];
        if (r < 0 || r >= ROWS || seen[c + "," + r] || " .o".indexOf(grid[r][c]) < 0) continue;
        seen[c + "," + r] = 1; stack.push([c, r]);
      }
    }
    dotsLeft = 0;
    for (var y = 0; y < ROWS; y++) for (var x = 0; x < COLS; x++) {
      var ch = grid[y][x];
      if (ch === " " && !seen[x + "," + y]) grid[y][x] = "v";
      if (ch === "." || ch === "o") dotsLeft++;
    }
  }
  function cell(c, r) { if (r < 0 || r >= ROWS) return "#"; return grid[r][(c + COLS) % COLS]; }
  function open(c, r) { var ch = cell(c, r); return ch === " " || ch === "." || ch === "o"; }

  /* ---------- Game state ---------- */
  var S = {}, player, ghosts = [], floats = [], pool = [], poolI = 0;

  function startGame() {
    pool = [];
    Object.keys(chosen).forEach(function (s) { if (chosen[s]) pool = pool.concat(MODS[s].questions); });
    if (!pool.length) return;
    shuffle(pool); poolI = 0;
    S = { score: 0, lives: LIVES, level: 1, asked: 0, right: 0, missed: [], doubleT: 0, chain: 0, secs: answerTime,
      protocols: Object.keys(MODS).filter(function (s) { return chosen[s]; }) };
    $("menu").hidden = true; $("game").hidden = false; $("over").hidden = true;
    window.scrollTo(0, 0);
    fit();
    newLevel();
  }
  function newLevel() { buildGrid(); drawWalls(); resetActors(); }
  function resetActors() {
    player = { x: START.x, y: START.y, dir: 2, face: 2, next: 2, anim: 0 };
    ghosts = GHOSTS.map(function (g, i) {
      var h = i === 0 ? EXIT : HOME[(i - 1) % 3];
      return { id: i, color: g.color, corner: g.corner, x: h.x, y: h.y, dir: 2, state: i === 0 ? "out" : "house",
        release: [0, 1.5, 5, 9][i], fright: false, bob: i };
    });
    S.modeT = 0; S.frightT = 0; S.immuneT = 0; S.state = "ready"; S.readyT = 1.6;
  }

  function speedPlayer() { return Math.min(5.4 + 0.3 * (S.level - 1), 7); }
  function speedGhost() { return Math.min(4.6 + 0.35 * (S.level - 1), 6.8); }
  function frightSecs() { return Math.max(3, 7.5 - 0.6 * (S.level - 1)); }
  function mult() { return S.doubleT > 0 ? 2 : 1; }

  // Move along the grid, stopping at each tile centre to let `choose` pick the next direction.
  function step(e, dist, choose) {
    var guard = 0;
    while (dist > 1e-9 && guard++ < 20) {
      var cx = Math.round(e.x), cy = Math.round(e.y);
      if (Math.abs(e.x - cx) < 1e-6 && Math.abs(e.y - cy) < 1e-6) {
        e.x = (cx + COLS) % COLS; e.y = cy;
        choose(e);
        if (e.dir < 0) return;
      }
      var tx = e.x, ty = e.y;
      if (DX[e.dir] > 0) tx = Math.floor(e.x) + 1; else if (DX[e.dir] < 0) tx = Math.ceil(e.x) - 1;
      if (DY[e.dir] > 0) ty = Math.floor(e.y) + 1; else if (DY[e.dir] < 0) ty = Math.ceil(e.y) - 1;
      var d = Math.abs(tx - e.x) + Math.abs(ty - e.y);
      if (dist >= d) { e.x = tx; e.y = ty; dist -= d; }
      else { e.x += DX[e.dir] * dist; e.y += DY[e.dir] * dist; dist = 0; }
    }
  }
  function choosePlayer(p) {
    if (p.next >= 0 && open(p.x + DX[p.next], p.y + DY[p.next])) p.dir = p.next;
    else if (p.dir >= 0 && !open(p.x + DX[p.dir], p.y + DY[p.dir])) p.dir = -1;
    if (p.dir >= 0) p.face = p.dir;
  }
  function setDir(d) {
    if (!player) return;
    player.next = d;
    if (player.dir >= 0 && d === (player.dir + 2) % 4) { player.dir = d; player.face = d; }   // reverse at once
  }

  function ghostTarget(g) {
    var px = Math.round(player.x), py = Math.round(player.y), f = player.face < 0 ? 2 : player.face;
    if (g.state === "eyes") return EXIT;
    var scatter = (S.modeT % 27) < 7;
    if (scatter) return g.corner;
    if (g.id === 0) return { x: px, y: py };
    if (g.id === 1) return { x: px + 4 * DX[f], y: py + 4 * DY[f] };
    if (g.id === 2) { var a = ghosts[0], ax = px + 2 * DX[f], ay = py + 2 * DY[f]; return { x: 2 * ax - a.x, y: 2 * ay - a.y }; }
    return Math.hypot(g.x - px, g.y - py) > 8 ? { x: px, y: py } : g.corner;
  }
  function chooseGhost(g) {
    if (g.state === "eyes" && g.x === EXIT.x && g.y === EXIT.y) {
      var h = HOME[g.id % 3]; g.state = "house"; g.x = h.x; g.y = h.y; g.release = 1; g.dir = -1; return;
    }
    var back = (g.dir + 2) % 4, opts = [];
    for (var d = 0; d < 4; d++) if (d !== back && open(g.x + DX[d], g.y + DY[d])) opts.push(d);
    if (!opts.length) opts = [back];
    if (g.fright) { g.dir = opts[Math.floor(Math.random() * opts.length)]; return; }
    var t = ghostTarget(g), best = opts[0], bd = Infinity;
    opts.forEach(function (d) { var dd = Math.hypot(g.x + DX[d] - t.x, g.y + DY[d] - t.y); if (dd < bd) { bd = dd; best = d; } });
    g.dir = best;
  }
  function updateGhost(g, dt) {
    if (g.state === "house") {
      g.bob += dt; g.release -= dt;
      if (g.release <= 0) { g.state = "out"; g.x = EXIT.x; g.y = EXIT.y; g.dir = Math.random() < 0.5 ? 0 : 2; g.fright = false; }
      return;
    }
    var sp = g.state === "eyes" ? 11 : g.fright ? 3 : speedGhost();
    step(g, sp * dt, chooseGhost);
  }

  function update(dt) {
    if (S.state === "ready") { S.readyT -= dt; if (S.readyT <= 0) S.state = "play"; return; }
    if (S.state === "clear") { S.readyT -= dt; if (S.readyT <= 0) { S.level++; newLevel(); } return; }
    if (S.state !== "play") return;

    if (S.frightT > 0) { S.frightT -= dt; if (S.frightT <= 0) ghosts.forEach(function (g) { g.fright = false; }); }
    else S.modeT += dt;
    if (S.doubleT > 0) S.doubleT -= dt;
    if (S.immuneT > 0) S.immuneT -= dt;

    var wasMoving = player.dir >= 0;
    step(player, speedPlayer() * dt, choosePlayer);
    if (player.dir < 0 && player.next >= 0) choosePlayer(player);
    if (wasMoving || player.dir >= 0) player.anim += dt;

    var cx = (Math.round(player.x) + COLS) % COLS, cy = Math.round(player.y), ch = cell(cx, cy);
    if (ch === "." || ch === "o") {
      grid[cy][cx] = " "; dotsLeft--;
      if (ch === ".") S.score += 10 * mult();
      else { S.score += 50 * mult(); ask("power"); }
      if (!dotsLeft && S.state === "play") { S.state = "clear"; S.readyT = 1.8; return; }
      if (S.state !== "play") return;
    }

    for (var i = 0; i < ghosts.length; i++) {
      var g = ghosts[i];
      updateGhost(g, dt);
      if (g.state !== "out") continue;
      var dx = Math.abs(g.x - player.x); dx = Math.min(dx, COLS - dx);
      if (dx + Math.abs(g.y - player.y) > 0.75) continue;
      if (g.fright) {
        var pts = 200 * Math.pow(2, Math.min(S.chain, 3)); S.chain++;
        S.score += pts; g.state = "eyes"; g.fright = false;
        floats.push({ x: g.x, y: g.y, text: String(pts), t: 1 });
      } else if (S.immuneT <= 0) { ask("ghost", g); return; }
    }
  }

  /* ---------- Questions in play ---------- */
  var Q = null, quizStart = 0, hiddenAt = 0;
  function nextQuestion() {
    if (poolI >= pool.length) { shuffle(pool); poolI = 0; }
    var q = pool[poolI++], order = q.options.map(function (_, i) { return i; });
    // keep the order when an option points at the others ("both", "all of the above")
    if (!q.options.some(function (o) { return /\b(above|below|both|all of|none of|neither)\b/i.test(o); })) shuffle(order);
    return { q: q, order: order };
  }
  function ask(kind, ghost) {
    S.state = "quiz";
    var n = nextQuestion();
    Q = { kind: kind, ghost: ghost, q: n.q, order: n.order, done: false, right: false };
    $("qKind").textContent = kind === "ghost" ? "Caught! Answer to keep your life" : "Power dot! Answer to power up";
    $("qTopic").textContent = n.q.topic + (n.q.code ? " · " + n.q.code : "");
    $("qText").textContent = n.q.q;
    var box = $("qOpts"); box.textContent = "";
    n.order.forEach(function (oi) {
      var b = el("button", null, n.q.options[oi]);
      b.type = "button"; b.dataset.i = oi;
      b.onclick = function () { answer(oi); };
      box.appendChild(b);
    });
    $("qResult").hidden = true; $("qWhy").hidden = true; $("qGo").hidden = true;
    $("qBar").style.width = "100%"; $("qBar").parentNode.classList.remove("low");
    $("quiz").hidden = false;
    quizStart = performance.now();
  }
  function tickQuiz(now) {
    if (!Q || Q.done) return;
    var left = answerTime - (now - quizStart) / 1000;
    $("qBar").style.width = Math.max(0, left / answerTime * 100) + "%";
    $("qBar").parentNode.classList.toggle("low", left < 2);
    if (left <= 0) answer(-1);
  }
  function answer(i) {
    if (!Q || Q.done) return;
    Q.done = true; Q.right = i === Q.q.answer;
    S.asked++;
    if (Q.right) S.right++;
    else if (!S.missed.some(function (m) { return m === Q.q; })) S.missed.push(Q.q);
    Array.prototype.forEach.call($("qOpts").children, function (b) {
      var bi = +b.dataset.i; b.disabled = true;
      if (bi === Q.q.answer) b.classList.add("right"); else if (bi === i) b.classList.add("wrong");
    });
    var r = $("qResult"), msg;
    if (Q.kind === "ghost") msg = Q.right ? "Immunity! Dots score double for " + DOUBLE_SECS + " seconds." : (i < 0 ? "Time's up: life lost." : "Life lost.");
    else msg = Q.right ? "Power up! Chase the ghosts. Dots score double while it lasts." : (i < 0 ? "Time's up: no power this time." : "No power this time.");
    r.textContent = msg; r.className = "result " + (Q.right ? "ok" : "bad"); r.hidden = false;
    if (Q.q.why) { $("qWhy").textContent = Q.q.why; $("qWhy").hidden = false; }
    var go = $("qGo"); go.hidden = false; go.disabled = true;
    go.textContent = Q.kind === "ghost" && !Q.right && S.lives <= 1 ? "See results" : "Continue";
    setTimeout(function () { go.disabled = false; }, 600);
  }
  function resumeFromQuiz() {
    var q = Q; Q = null; $("quiz").hidden = true;
    if (q.kind === "ghost") {
      if (q.right) {
        q.ghost.state = "eyes"; q.ghost.fright = false;
        S.immuneT = IMMUNE_SECS; S.doubleT = DOUBLE_SECS; S.state = "play";
        floats.push({ x: player.x, y: player.y - 0.6, text: "x2", t: 1.2 });
      } else {
        S.lives--;
        if (S.lives <= 0) return gameOver();
        resetActors();
      }
    } else {
      if (q.right) {
        S.frightT = frightSecs(); S.chain = 0; S.doubleT = Math.max(S.doubleT, S.frightT);
        ghosts.forEach(function (g) { if (g.state === "out") { g.fright = true; g.dir = (g.dir + 2) % 4; } });
      }
      S.state = dotsLeft ? "play" : "clear";
      if (!dotsLeft) S.readyT = 1.8;
    }
    last = performance.now();
  }

  function gameOver() {
    S.state = "over";
    var best = +(store("dsy-chase-best") || 0), isBest = S.score > best;
    if (isBest) store("dsy-chase-best", String(S.score));
    $("oTitle").textContent = isBest && S.score ? "New best score!" : "Game over";
    $("oScore").textContent = S.score;
    $("oStats").textContent = "Level " + S.level + ". Questions right: " + S.right + " of " + S.asked + ".";
    $("oSave").hidden = !S.score || !DB.supabaseUrl;
    $("oName").value = store("dsy-chase-name") || "";
    $("oSaveBtn").disabled = false; $("oSaveBtn").textContent = "Add to leaderboard";
    $("oSaveMsg").textContent = ""; $("oBoard").textContent = "";
    var box = $("oMissed"); box.textContent = "";
    if (S.missed.length) {
      box.appendChild(el("h2", null, "Worth another look"));
      S.missed.forEach(function (q) {
        var d = el("div", "missed");
        d.appendChild(el("p", "topic", q.topic + (q.code ? " · " + q.code : "")));
        d.appendChild(el("p", null, q.q));
        d.appendChild(el("p", "a", "Answer: " + q.options[q.answer]));
        if (q.why) d.appendChild(el("p", "why", q.why));
        var a = el("a", null, "Open the " + q.topic + " module");
        a.href = "../" + q.slug + "/"; d.appendChild(a);
        box.appendChild(d);
      });
    }
    $("over").hidden = false; $("over").scrollTop = 0;
  }

  /* ---------- Leaderboard (Supabase table public.game_scores: anyone can read and add, nobody can edit) ---------- */
  var DB = window.TRAINING_APP || {};
  function api(path, opts) {
    opts = opts || {};
    opts.headers = Object.assign({ apikey: DB.supabaseKey, Authorization: "Bearer " + DB.supabaseKey, "Content-Type": "application/json" }, opts.headers || {});
    return fetch(DB.supabaseUrl + "/rest/v1/" + path, opts).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); });
  }
  function fetchBoard(period) {
    var q = "game_scores?select=id,player,score,level,correct,asked,answer_secs,protocols,created_at&game=eq.protocol-chase&order=score.desc,created_at.asc&limit=20";
    if (period === "month") { var d = new Date(); q += "&created_at=gte." + encodeURIComponent(new Date(d.getFullYear(), d.getMonth(), 1).toISOString()); }
    return api(q);
  }
  function protocolNames(list) {
    return list.map(function (s) { return MODS[s] ? MODS[s].title + (MODS[s].code ? " (" + MODS[s].code.replace(/-/g, "\u2011") + ")" : "") : s; }).join(", ");
  }
  // box gets All time / This month buttons and the top 20; mine = id of the row to highlight
  function showBoard(box, period, mine) {
    if (!DB.supabaseUrl) return;
    box.textContent = "";
    var tabs = el("div", "chips board-tabs");
    [["all", "All time"], ["month", "This month"]].forEach(function (t) {
      var b = el("button", "chip" + (t[0] === period ? " on" : ""), t[1]);
      b.type = "button"; b.onclick = function () { showBoard(box, t[0], mine); };
      tabs.appendChild(b);
    });
    box.appendChild(tabs);
    var list = el("ol", "board"); list.appendChild(el("li", "muted", "Loading...")); box.appendChild(list);
    fetchBoard(period).then(function (rows) {
      list.textContent = "";
      if (!rows.length) list.appendChild(el("li", "muted", "No scores yet. Be the first."));
      rows.forEach(function (r, i) {
        var li = el("li", r.id === mine ? "me" : null);
        var top = el("div", "row1");
        top.appendChild(el("span", "rank", String(i + 1)));
        top.appendChild(el("span", "who", r.player));
        top.appendChild(el("b", null, String(r.score)));
        li.appendChild(top);
        li.appendChild(el("p", "meta", "Level " + r.level + " \u00b7 " + r.correct + " of " + r.asked + " right \u00b7 " + r.answer_secs + " s to answer"));
        li.appendChild(el("p", "protos", protocolNames(r.protocols)));
        list.appendChild(li);
      });
      if (mine && !rows.some(function (r) { return r.id === mine; })) list.appendChild(el("li", "muted", "Your score is saved but not in this top 20 yet."));
    }).catch(function () { list.textContent = ""; list.appendChild(el("li", "muted", "The leaderboard could not be loaded. Check your connection.")); });
  }
  function saveScore() {
    var name = $("oName").value.replace(/\s+/g, " ").trim().slice(0, 24);
    if (!name) { $("oSaveMsg").textContent = "Type a name first."; $("oName").focus(); return; }
    store("dsy-chase-name", name);
    var btn = $("oSaveBtn"); btn.disabled = true; btn.textContent = "Saving...";
    api("game_scores", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({
      player: name, score: S.score, level: Math.min(S.level, 99), correct: S.right, asked: S.asked, answer_secs: S.secs, protocols: S.protocols
    }) }).then(function (rows) {
      btn.textContent = "Saved"; $("oSaveMsg").textContent = "";
      showBoard($("oBoard"), "all", rows && rows[0] && rows[0].id);
      showBoard($("board"), "all");
    }).catch(function () {
      btn.disabled = false; btn.textContent = "Add to leaderboard";
      $("oSaveMsg").textContent = "Could not save. Check your connection and try again.";
    });
  }
  $("oSaveBtn").onclick = saveScore;
  $("oName").addEventListener("keydown", function (e) { if (e.key === "Enter") saveScore(); });

  /* ---------- Drawing ---------- */
  var cv = $("cv"), ctx = cv.getContext("2d"), walls = document.createElement("canvas"), T = 16, dpr = 1;
  function fit() {
    dpr = Math.min(window.devicePixelRatio || 1, 3);
    var padH = $("pad").offsetHeight ? $("pad").offsetHeight + 10 : 124;
    var w = Math.min(window.innerWidth - 16, 560), h = window.innerHeight - 44 - padH - 24;
    T = Math.max(10, Math.floor(Math.min(w / COLS, h / ROWS)));
    cv.width = COLS * T * dpr; cv.height = ROWS * T * dpr;
    cv.style.width = COLS * T + "px"; cv.style.height = ROWS * T + "px";
    if (grid) drawWalls();
  }
  function walkable(c, r) { if (r < 0 || r >= ROWS) return false; var ch = grid[r][(c + COLS) % COLS]; return ch !== "#" && ch !== "v"; }
  function drawWalls() {
    walls.width = cv.width; walls.height = cv.height;
    var w = walls.getContext("2d");
    w.setTransform(dpr, 0, 0, dpr, 0, 0);
    w.fillStyle = "#0b1410"; w.fillRect(0, 0, COLS * T, ROWS * T);
    w.lineWidth = Math.max(2, T / 7); w.lineCap = "round"; w.strokeStyle = "#4aa37c";
    for (var y = 0; y < ROWS; y++) for (var x = 0; x < COLS; x++) {
      var ch = grid[y][x];
      if (ch === "-") { w.fillStyle = "#ff9ad5"; w.fillRect(x * T, y * T + T * 0.4, T, T * 0.2); continue; }
      if (ch === "v") { w.fillStyle = "#173f2f"; w.fillRect(x * T, y * T, T, T); continue; }
      if (ch !== "#") continue;
      w.fillStyle = "#173f2f"; w.fillRect(x * T, y * T, T, T);
      var x0 = x * T, y0 = y * T, x1 = x0 + T, y1 = y0 + T;
      w.beginPath();
      if (walkable(x, y - 1) || cell(x, y - 1) === "G") { w.moveTo(x0, y0); w.lineTo(x1, y0); }
      if (walkable(x, y + 1) || cell(x, y + 1) === "G") { w.moveTo(x0, y1); w.lineTo(x1, y1); }
      if ((x > 0 && walkable(x - 1, y)) || cell(x - 1, y) === "G") { w.moveTo(x0, y0); w.lineTo(x0, y1); }
      if ((x < COLS - 1 && walkable(x + 1, y)) || cell(x + 1, y) === "G") { w.moveTo(x1, y0); w.lineTo(x1, y1); }
      w.stroke();
    }
  }
  function drawGhost(g, t) {
    var cx = (g.x + 0.5) * T, cy = (g.y + 0.5) * T + (g.state === "house" ? Math.sin(g.bob * 6) * T * 0.12 : 0), r = T * 0.45;
    if (g.state !== "eyes") {
      var flash = g.fright && S.frightT < 2 && Math.floor(t * 6) % 2;
      ctx.fillStyle = g.fright ? (flash ? "#f4f6f1" : "#2b4bff") : g.color;
      ctx.beginPath();
      ctx.arc(cx, cy - r * 0.15, r, Math.PI, 0);
      ctx.lineTo(cx + r, cy + r * 0.85);
      var wv = Math.floor(t * 8) % 2 ? 0.2 : -0.2;
      for (var k = 3; k >= 0; k--) ctx.lineTo(cx - r + (2 * r / 3) * k, cy + r * (k % 2 ? 0.85 + wv * 0.3 : 0.6));
      ctx.closePath(); ctx.fill();
      if (g.fright) {
        ctx.fillStyle = flash ? "#e0705f" : "#ffd9a0";
        ctx.fillRect(cx - r * 0.45, cy - r * 0.3, r * 0.22, r * 0.22); ctx.fillRect(cx + r * 0.23, cy - r * 0.3, r * 0.22, r * 0.22);
        return;
      }
    }
    var d = g.dir < 0 ? 2 : g.dir, ox = DX[d] * r * 0.15, oy = DY[d] * r * 0.15;
    [-0.38, 0.38].forEach(function (s) {
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx + s * r, cy - r * 0.25, r * 0.27, 0, 7); ctx.fill();
      ctx.fillStyle = "#1a2a8a"; ctx.beginPath(); ctx.arc(cx + s * r + ox, cy - r * 0.25 + oy, r * 0.13, 0, 7); ctx.fill();
    });
  }
  function draw(t) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(walls, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#f4ead0";
    for (var y = 0; y < ROWS; y++) for (var x = 0; x < COLS; x++) {
      var ch = grid[y][x];
      if (ch === ".") { ctx.beginPath(); ctx.arc((x + 0.5) * T, (y + 0.5) * T, Math.max(1.5, T * 0.1), 0, 7); ctx.fill(); }
      else if (ch === "o" && Math.floor(t * 3) % 2 === 0) {
        ctx.fillStyle = "#f0bd3a"; ctx.beginPath(); ctx.arc((x + 0.5) * T, (y + 0.5) * T, T * 0.32, 0, 7); ctx.fill(); ctx.fillStyle = "#f4ead0";
      }
    }
    ghosts.forEach(function (g) { drawGhost(g, t); });

    // player: blinks while immune
    if (!(S.immuneT > 0 && Math.floor(t * 10) % 2)) {
      var px = (player.x + 0.5) * T, py = (player.y + 0.5) * T, mouth = 0.08 + 0.25 * Math.abs(Math.sin(player.anim * 12)), a = [0, 0.5, 1, 1.5][player.face] * Math.PI;
      ctx.fillStyle = "#f0bd3a";
      ctx.beginPath(); ctx.moveTo(px, py); ctx.arc(px, py, T * 0.45, a + mouth * Math.PI, a - mouth * Math.PI + 2 * Math.PI); ctx.closePath(); ctx.fill();
    }

    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    floats = floats.filter(function (f) { return f.t > 0; });
    floats.forEach(function (f) {
      ctx.globalAlpha = Math.min(1, f.t * 2); ctx.fillStyle = "#4fe3ee"; ctx.font = "700 " + Math.round(T * 0.8) + "px system-ui, sans-serif";
      ctx.fillText(f.text, (f.x + 0.5) * T, (f.y + 0.5) * T - (1 - f.t) * T); ctx.globalAlpha = 1;
    });
    if (S.state === "ready" || S.state === "clear") {
      ctx.fillStyle = "#f0bd3a"; ctx.font = "700 " + Math.round(T * 1.1) + "px 'Bricolage Grotesque', system-ui, sans-serif";
      ctx.fillText(S.state === "ready" ? (S.level > 1 && S.readyT > 1.2 ? "LEVEL " + S.level : "READY!") : "MAZE CLEAR!", 9.5 * T, 11.5 * T);
    }
  }
  var hudCache = {};
  function hud() {
    function set(id, v) { if (hudCache[id] !== v) { hudCache[id] = v; $(id).textContent = v; } }
    set("score", String(S.score)); set("level", String(S.level));
    $("mult").hidden = !(S.doubleT > 0);
    if (S.doubleT > 0) set("multT", Math.ceil(S.doubleT) + "s");
    if (hudCache.lives !== S.lives) {
      hudCache.lives = S.lives; var l = $("lives"); l.textContent = "";
      for (var i = 0; i < S.lives; i++) l.appendChild(el("i"));
    }
  }

  /* ---------- Loop and input ---------- */
  var last = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if ($("game").hidden || !grid) { last = now; return; }
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (S.state === "quiz") tickQuiz(now);
    else if (S.state !== "paused" && S.state !== "over") {
      update(dt);
      floats.forEach(function (f) { f.t -= dt; });
    }
    draw(now / 1000); hud();
  }

  var touch = null;
  var stage = $("stage");
  stage.addEventListener("touchstart", function (e) { var p = e.touches[0]; touch = { x: p.clientX, y: p.clientY }; e.preventDefault(); }, { passive: false });
  stage.addEventListener("touchmove", function (e) {
    e.preventDefault(); if (!touch) return;
    var p = e.touches[0], dx = p.clientX - touch.x, dy = p.clientY - touch.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 16) return;
    setDir(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 0 : 2) : (dy > 0 ? 1 : 3));
    touch = { x: p.clientX, y: p.clientY };
  }, { passive: false });
  stage.addEventListener("touchend", function () { touch = null; });
  Array.prototype.forEach.call(document.querySelectorAll(".pad button"), function (b) {
    b.addEventListener("pointerdown", function (e) { e.preventDefault(); setDir(+b.dataset.d); });
  });
  document.addEventListener("keydown", function (e) {
    var k = { ArrowRight: 0, ArrowDown: 1, ArrowLeft: 2, ArrowUp: 3, d: 0, s: 1, a: 2, w: 3 }[e.key];
    if (k !== undefined && !$("game").hidden && S.state !== "quiz") { setDir(k); e.preventDefault(); }
    if (e.key === "p" || e.key === "Escape") togglePause();
    if (S.state === "quiz" && Q && !Q.done && /^[1-4]$/.test(e.key)) { var b = $("qOpts").children[+e.key - 1]; if (b) b.click(); }
  });

  var pausedFrom = null;
  function togglePause() {
    if (S.state === "play" || S.state === "ready") { pausedFrom = S.state; S.state = "paused"; $("paused").hidden = false; }
    else if (S.state === "paused") { S.state = pausedFrom; $("paused").hidden = true; last = performance.now(); }
  }
  $("pause").onclick = togglePause;
  $("resume").onclick = togglePause;
  $("quit").onclick = function () { $("paused").hidden = true; gameOver(); };
  $("qGo").onclick = resumeFromQuiz;
  $("again").onclick = startGame;
  $("toMenu").onclick = function () { $("over").hidden = true; $("game").hidden = true; $("menu").hidden = false; S.state = "over";
    var best = store("dsy-chase-best"); if (best) $("best").textContent = "Best score on this device: " + best; };
  // leaving the app pauses play and holds the question timer
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { hiddenAt = performance.now(); if (S.state === "play" || S.state === "ready") togglePause(); }
    else { if (S.state === "quiz" && hiddenAt) quizStart += performance.now() - hiddenAt; hiddenAt = 0; }
  });
  window.addEventListener("resize", function () { if (!$("game").hidden) fit(); });

  buildMenu();
  requestAnimationFrame(frame);
})();
