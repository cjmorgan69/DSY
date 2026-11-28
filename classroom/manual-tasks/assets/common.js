// Shared helpers used by the slide show, presenter view and printable guide.
(function () {
  var D = window.DRIVE = { sections: window.DRIVE_SECTIONS || [] };

  // Busy slides are split in two so the text can be larger (owner, 28 Nov 2026; same rules as the case-night
  // decks in /classroom/case-night/assets/common.js). The estimate below is the text size at which a slide fits;
  // under MIN it becomes "Title (1 of 2)" and "Title (2 of 2)". The notes stay with the first half.
  var MIN = { bullets: 44, table: 38, compare: 40 };
  function txt(p) { return typeof p === 'string' ? p : (p.t || p.h || '') + ' ' + (p.text || '') + ' ' + (p.sub || []).join(' '); }
  function lines(s, chars) { return Math.max(1, Math.ceil(String(s).length / chars)); }
  function listH(list, w, f) { return list.reduce(function (a, p) { return a + lines(txt(p), w / (0.5 * f)) * 1.25 * f + 0.45 * f; }, 0); }
  function fitSize(sl) {
    for (var f = sl.type === 'table' ? (sl.fs || 48) : 60; f > 24; f -= 2) {
      var h;
      if (sl.type === 'bullets') h = listH(sl.points, sl.callout ? 1000 : 1660, f);
      else if (sl.type === 'compare') h = 1.6 * f + Math.max(listH(sl.left.points, 700 - 0.9 * f, 0.9 * f), listH(sl.right.points, 700 - 0.9 * f, 0.9 * f)) + 2 * f + (sl.callout ? 3 * f : 0);
      else {
        var cols = (sl.head || sl.rows[0]).length, cw = 1700 / cols;
        h = (sl.head ? 1 : 0) * 1.6 * f + sl.rows.reduce(function (a, r) {
          return a + Math.max.apply(null, r.map(function (c) { return lines(c, (cw - 0.8 * f) / (0.5 * f)); })) * 1.25 * f + 0.76 * f;
        }, 0) + (sl.callout ? 3 * f : 0);
      }
      if (h <= 760) return f;
    }
    return 24;
  }
  function busy(sl) {
    if (sl.type === 'bullets' && sl.points && sl.points.length >= 4) return fitSize(sl) < MIN.bullets;
    if (sl.type === 'table' && sl.rows && sl.rows.length >= 4) return fitSize(sl) < MIN.table;
    if (sl.type === 'compare' && sl.left && sl.right && sl.left.points && sl.right.points &&
        sl.left.points.length + sl.right.points.length >= 4) return fitSize(sl) < MIN.compare;
    return false;
  }
  // Split a list in two, preferring a break at a heading point ("What to do:") near the middle.
  function halfAt(list) {
    var mid = Math.ceil(list.length / 2), best = mid;
    for (var d = 1; d <= 2; d++) [mid - d, mid + d].forEach(function (k) {
      if (best === mid && !/:$/.test(txt(list[mid]).trim()) && k > 0 && k < list.length && /:$/.test(txt(list[k]).trim())) best = k;
    });
    return best;
  }
  function copy(sl) { var c = {}; for (var k in sl) c[k] = sl[k]; return c; }
  D.sections.forEach(function (sec) {
    var out = [];
    (sec.slides || []).forEach(function (sl) {
      var parts = null;
      if (busy(sl)) {
        if (sl.type === 'compare') {
          parts = [0, 1].map(function (i) {
            var c = copy(sl);
            ['left', 'right'].forEach(function (side) {
              var p = sl[side].points, h = Math.ceil(p.length / 2), q = copy(sl[side]);
              q.points = i ? p.slice(h) : p.slice(0, h); c[side] = q;
            });
            if (!i) delete c.callout;
            // One side has nothing left for this half: show the other side as a dot-point slide instead.
            var empty = !c.left.points.length ? 'left' : !c.right.points.length ? 'right' : '';
            if (empty) {
              var full = c[empty === 'left' ? 'right' : 'left'];
              c = { type: 'bullets', title: c.title, points: [full.head.replace(/:?\s*$/, ':')].concat(full.points), notes: c.notes, callout: c.callout ? { text: c.callout.text } : undefined };
              if (!c.callout) delete c.callout;
            }
            return c;
          });
        } else {
          var key = sl.type === 'table' ? 'rows' : 'points', h = halfAt(sl[key]);
          parts = [sl[key].slice(0, h), sl[key].slice(h)].map(function (part, i) {
            var c = copy(sl); c[key] = part;
            if (sl.type === 'table' ? !i : i) delete c.callout;
            return c;
          });
        }
      } else if ((sl.type === 'cards' || sl.type === 'numbered') && sl.items && sl.items.length > 4 && JSON.stringify(sl.items).length > 700) {
        var half = Math.ceil(sl.items.length / 2);
        parts = [sl.items.slice(0, half), sl.items.slice(half)].map(function (part, i) {
          var c = copy(sl); c.items = part;
          if (sl.type === 'cards') c.cols = part.length === 4 ? 2 : Math.min(part.length, 3);
          if (sl.type === 'numbered') c.start = i ? half : 0;
          if (i) delete c.callout;
          return c;
        });
      }
      if (!parts) { out.push(sl); return; }
      parts.forEach(function (c, i) {
        c.title = sl.title + ' (' + (i + 1) + ' of 2)';
        if (i) c.notes = { time: 1 };
        out.push(c);
      });
    });
    sec.slides = out;
  });

  D.secName = function (sec) { return sec.name || ('Lesson ' + sec.number); };

  D.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };

  // Flat list of every slide across all sections, in order.
  D.flat = function () {
    var out = [];
    D.sections.forEach(function (sec, si) {
      sec.slides.forEach(function (s, i) { out.push({ sec: sec, si: si, s: s, i: i, n: i + 1 }); });
    });
    return out;
  };

  D.vimeoEmbed = function (v) { return 'https://player.vimeo.com/video/' + v.id + '?h=' + v.hash + '&badge=0&autopause=0&app_id=58479'; };
  D.vimeoUrl = function (v) { return 'https://vimeo.com/' + v.id + '/' + v.hash; };

  D.title = function (s) {
    return s.title || s.kicker || (s.text ? s.text.replace(/\s+/g, ' ').slice(0, 60) : 'Slide');
  };

  // Plain-text lines shown on the slide (used by the printable guide).
  D.slideText = function (s) {
    var out = [];
    function pts(arr, indent) {
      (arr || []).forEach(function (p) {
        if (typeof p === 'string') out.push((indent ? '– ' : '') + p);
        else { out.push((indent ? '– ' : '') + p.t); pts(p.sub, true); }
      });
    }
    if (s.text) out.push(s.text);
    if (s.sub) out.push(s.sub);
    if (s.subtitle) out.push(s.subtitle);
    (s.lines || []).forEach(function (l) { out.push(l); });
    if (s.intro) out.push(s.intro);
    pts(s.points);
    if (s.left) { out.push(s.left.head + ':'); pts(s.left.points, true); }
    if (s.right) { out.push(s.right.head + ':'); pts(s.right.points, true); }
    (s.items || []).forEach(function (it) {
      if (typeof it === 'string') out.push(it);
      else out.push(it.h + (it.t ? ' – ' + it.t : ''));
    });
    if (s.ring) out.push(s.ring.head + ': ' + s.ring.text);
    (s.lights || []).forEach(function (l) { out.push(l.name + ': ' + l.text); });
    if (s.callout) out.push((s.callout.head ? s.callout.head + ': ' : '') + s.callout.text);
    return out;
  };

  function list(cls, head, arr) {
    if (!arr || !arr.length) return '';
    return '<div class="nblock ' + cls + '"><h4>' + head + '</h4><ul>' +
      arr.map(function (x) { return '<li>' + D.esc(x) + '</li>'; }).join('') + '</ul></div>';
  }

  // Facilitator notes as HTML (docked notes panel + presenter view).
  D.notesHTML = function (s) {
    var n = s.notes || {}, h = '';
    if (n.time) h += '<div class="ntime">Suggested time: ' + n.time + ' min</div>';
    h += list('say', 'Say', n.say);
    h += list('ask', 'Ask the group', n.ask);
    if (n.activity) h += '<div class="nblock act"><h4>Activity</h4><p>' + D.esc(n.activity) + '</p></div>';
    if (s.video) {
      h += '<div class="nblock vid"><h4>Video' + (s.video.length ? ' (' + D.esc(s.video.length) + ')' : '') + '</h4><p class="small">' + D.esc(s.video.file || '') + '</p>';
      if (s.video.url) h += '<p class="small"><a href="' + D.esc(s.video.url) + '" target="_blank" rel="noopener">Open in the eLearning lesson</a> (saaslearn login needed)</p>';
      h += '</div>';
    }
    if (s.vimeo) {
      h += '<div class="nblock vid"><h4>Video' + (s.vimeo.length ? ' (' + D.esc(s.vimeo.length) + ')' : '') + '</h4>';
      if (n.videoSummary && n.videoSummary.length) {
        h += '<p class="small">What the video covers (from Vimeo auto-captions, check before relying on it):</p><ul>' +
          n.videoSummary.map(function (x) { return '<li>' + D.esc(x) + '</li>'; }).join('') + '</ul>';
      } else {
        h += '<p class="small">No captions are available for this video. Preview it before the session and add the key points here.</p>';
      }
      h += '<p class="small"><a href="' + D.vimeoUrl(s.vimeo) + '" target="_blank" rel="noopener">Open on Vimeo</a></p></div>';
    }
    if (n.tip) h += '<div class="nblock tip"><h4>Tip</h4><p>' + D.esc(n.tip) + '</p></div>';
    if (!h) h = '<p class="small">No notes for this slide.</p>';
    return h;
  };
})();
