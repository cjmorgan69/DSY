/* Customisable walk-through scenarios: fills a scenario template from Supabase (public.scenarios) with local
   details. Only the fields listed in the scenario's `fields` can change; every other word, observation, dose and
   decision stays exactly as approved. Used by /scenarios/ (the form) and /scenarios/view/ (the scenario page),
   and by Node for the round-trip check (module.exports).

   Template syntax, inside any string of the template:
     {{key}}                 a field or derived value ({{key|fallback}} when the field is blank)
     {{t+N}} {{a+N}} {{h+N}} a 24-hour clock time: N minutes after (or {{h-N}} before) dispatch, arrival or hospital arrival
     {{#key}}...{{/key}}     shown when key is filled in; {{^key}}...{{/key}} when it is blank
     {{#key=value}}...{{/key}} shown when key equals value (sections can be nested) */
(function () {
  "use strict";

  var SCENE_MINUTES = 14; // arrival to leaving the scene, unless the template sets sceneMinutes

  function toMinutes(hhmm) { var m = /^(\d{1,2}):?(\d{2})$/.exec(hhmm || ""); return m ? (+m[1] % 24) * 60 + (+m[2] % 60) : null; }
  function clock(min) { min = ((min % 1440) + 1440) % 1440; var h = Math.floor(min / 60), m = min % 60; return (h < 10 ? "0" : "") + h + (m < 10 ? "0" : "") + m; }

  /* keep each value to what its field allows; anything else falls back to the default */
  function clean(fields, input) {
    var v = {};
    fields.forEach(function (f) {
      var raw = input && input[f.key] != null ? String(input[f.key]).trim() : "";
      var val = f.default != null ? f.default : "";
      if (f.type === "number") {
        var n = parseInt(raw, 10);
        if (!isNaN(n)) val = Math.min(f.max, Math.max(f.min, n));
      } else if (f.type === "time") {
        var t = toMinutes(raw);
        if (t != null) {
          var lo = f.min ? toMinutes(f.min) : null, hi = f.max ? toMinutes(f.max) : null;
          if (lo != null && hi != null && lo > hi) {
            // a range across midnight (for example 22:00 to 05:00): outside it, move to the nearer end
            if (t < lo && t > hi) t = (t - hi) < (lo - t) ? hi : lo;
          } else {
            if (lo != null && t < lo) t = lo;
            if (hi != null && t > hi) t = hi;
          }
          val = clock(t).replace(/^(\d\d)/, "$1:");
        }
      } else if (f.type === "choice") {
        if (f.options.some(function (o) { return o.value === raw; })) val = raw;
      } else if (raw) {
        val = raw.replace(/[^A-Za-z0-9 '’.\-()&,]/g, "").replace(/\s+/g, " ").slice(0, f.max || 30).trim() || val;
      } // a blank text field keeps its default (often "", which shows the template's fallback)
      v[f.key] = val;
    });
    return v;
  }

  /* values worked out from the fields: time of day, daylight, which help is closer */
  function derive(v, scene) {
    var d = {}, t0 = toMinutes(v.dispatch) || 0;
    var hr = t0 / 60;
    d.tod = hr >= 6 && hr < 19.5 ? "day" : hr >= 19.5 && hr < 23 ? "evening" : "night";
    var light = v.season === "summer" ? hr >= 6.25 && hr < 20.25 : hr >= 7.25 && hr < 17.5;
    d.dark = light ? "" : "yes";
    d.sky = (v.season || "winter") + "-" + (light ? "light" : "dark");
    d.Season = v.season ? v.season.charAt(0).toUpperCase() + v.season.slice(1) : "Winter";
    d.Partner = v.partner ? v.partner.charAt(0).toUpperCase() + v.partner.slice(1) : "";
    var tr = +v.transport, bk = +v.backup_mins;
    d.closer = tr < bk ? "hospital" : tr > bk ? "backup" : "same";
    d.transport_hi = tr + 5; // for "about 35 to 40 minutes"
    d._t = t0; d._a = t0 + (+v.response || 0); d._h = d._a + (scene || SCENE_MINUTES) + tr;
    return d;
  }

  function fillString(s, ctx) {
    if (s.indexOf("{{") < 0) return s;
    var section = /\{\{([#^])(\w+)(?:=([^}]+?))?\}\}((?:(?!\{\{[#^])[\s\S])*?)\{\{\/\2\}\}/;
    for (var guard = 0; section.test(s) && guard < 200; guard++) {
      s = s.replace(section, function (_, kind, key, eq, body) {
        var val = ctx[key] == null ? "" : String(ctx[key]);
        var on = eq != null ? val === eq : val !== "";
        return (kind === "#" ? on : !on) ? body : "";
      });
    }
    return s.replace(/\{\{([tah])([+-]\d+)\}\}/g, function (_, base, n) { return clock(ctx["_" + base] + +n); })
            .replace(/\{\{(\w+)(?:\|([^}]*))?\}\}/g, function (_, key, fb) {
              var val = ctx[key] == null ? "" : String(ctx[key]);
              return val !== "" ? val : (fb != null ? fb : "");
            });
  }

  function fillDeep(node, ctx) {
    if (typeof node === "string") return fillString(node, ctx);
    if (Array.isArray(node)) return node.map(function (n) { return fillDeep(n, ctx); });
    if (node && typeof node === "object") { var o = {}; Object.keys(node).forEach(function (k) { o[k] = fillDeep(node[k], ctx); }); return o; }
    return node;
  }

  /* returns the MODULE object for module.js, with a note saying what was changed */
  function build(row, input) {
    var v = clean(row.fields, input), ctx = derive(v, row.template.sceneMinutes);
    Object.keys(v).forEach(function (k) { ctx[k] = v[k]; });
    var M = fillDeep(row.template, ctx);
    delete M.sceneMinutes;
    var changed = row.fields.filter(function (f) { return String(v[f.key]) !== String(f.default != null ? f.default : ""); });
    if (changed.length) {
      M.footerNotes = (M.footerNotes || []).concat(["Customised version: " + changed.map(function (f) { return f.label; }).join("; ") +
        " changed with the DSY scenario customiser. The clinical content (observations, treatment, doses and decisions) is the approved scenario, unchanged."]);
    }
    return M;
  }

  /* form values <-> link: /scenarios/view/#s=<slug>&patient=...; only values that differ from the default go in */
  function toHash(slug, fields, v) {
    var parts = ["s=" + encodeURIComponent(slug)];
    fields.forEach(function (f) {
      var d = f.default != null ? String(f.default) : "";
      if (v[f.key] != null && String(v[f.key]) !== d) parts.push(f.key + "=" + encodeURIComponent(v[f.key]));
    });
    return "#" + parts.join("&");
  }
  function fromHash(hash) {
    var out = {};
    (hash || "").replace(/^#/, "").split("&").forEach(function (p) {
      if (!p) return; var i = p.indexOf("="), k = i < 0 ? p : p.slice(0, i);
      try { out[k] = i < 0 ? "" : decodeURIComponent(p.slice(i + 1).replace(/\+/g, " ")); } catch (e) { /* bad link part: ignore */ }
    });
    return out;
  }

  /* Supabase REST read (the public anon key from /training/config.js; row-level security allows reading published rows) */
  function fetchScenarios(select, slug) {
    var C = window.TRAINING_APP;
    var url = C.supabaseUrl + "/rest/v1/scenarios?published=eq.true&order=title&select=" + select + (slug ? "&slug=eq." + encodeURIComponent(slug) : "");
    return fetch(url, { headers: { apikey: C.supabaseKey, Authorization: "Bearer " + C.supabaseKey } })
      .then(function (r) { if (!r.ok) throw new Error("Could not load scenarios (" + r.status + ")"); return r.json(); });
  }

  var api = { build: build, clean: clean, toHash: toHash, fromHash: fromHash, fetchScenarios: fetchScenarios, fillString: fillString };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else window.SCENARIO = api;
})();
