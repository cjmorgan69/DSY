// Shared helpers used by the slide show, presenter view and printable guide.
(function () {
  var D = window.DRIVE = { sections: window.DRIVE_SECTIONS || [] };

  D.secName = function (sec) { return sec.name || ('Part ' + sec.number); };

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

  D.vimeoEmbed = function (v) { return 'https://player.vimeo.com/video/' + v.id + '?' + (v.hash ? 'h=' + v.hash + '&' : '') + 'badge=0&autopause=0&app_id=58479'; };
  D.vimeoUrl = function (v) { return 'https://vimeo.com/' + v.id + (v.hash ? '/' + v.hash : ''); };
  // Online video on a slide: Vimeo ({ vimeo: { id, hash, length } }) or YouTube ({ youtube: { id, length } }).
  D.vid = function (s) {
    if (s.youtube) return { v: s.youtube, site: 'YouTube', embed: 'https://www.youtube-nocookie.com/embed/' + s.youtube.id + '?rel=0', url: 'https://www.youtube.com/watch?v=' + s.youtube.id };
    if (s.vimeo) return { v: s.vimeo, site: 'Vimeo', embed: D.vimeoEmbed(s.vimeo), url: D.vimeoUrl(s.vimeo) };
    return null;
  };

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
    if (s.head && s.rows) out.push(s.head.join(' | '));
    (s.rows || []).forEach(function (r) { out.push(r.join(' | ')); });
    if (s.station) out.push('Station page: dsytraining.com/stations/ar-day6/#' + s.station);
    if (s.source) out.push(s.source);
    if (s.img) out.push('[Picture: ' + (s.caption || s.img) + ']');
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
      h += '<div class="nblock vid"><h4>Video' + (s.video.length ? ' (' + D.esc(s.video.length) + ')' : '') + '</h4><p class="small">' + D.esc(s.video.file || '') + (s.video.where ? ' (' + D.esc(s.video.where) + ')' : '') + '</p>';
      if (s.video.url) h += '<p class="small"><a href="' + D.esc(s.video.url) + '" target="_blank" rel="noopener">Open in the eLearning lesson</a> (saaslearn login needed)</p>';
      h += '</div>';
    }
    var ov = D.vid(s);
    if (ov) {
      h += '<div class="nblock vid"><h4>Video' + (ov.v.length ? ' (' + D.esc(ov.v.length) + ')' : '') + '</h4>';
      if (n.videoSummary && n.videoSummary.length) {
        h += '<p class="small">What the video covers:</p><ul>' +
          n.videoSummary.map(function (x) { return '<li>' + D.esc(x) + '</li>'; }).join('') + '</ul>';
      } else {
        h += '<p class="small">Preview it before the session.</p>';
      }
      h += '<p class="small"><a href="' + ov.url + '" target="_blank" rel="noopener">Open on ' + ov.site + '</a></p></div>';
    }
    if (n.tip) h += '<div class="nblock tip"><h4>Tip</h4><p>' + D.esc(n.tip) + '</p></div>';
    if (!h) h = '<p class="small">No notes for this slide.</p>';
    return h;
  };
})();
