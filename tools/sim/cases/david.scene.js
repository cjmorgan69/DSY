/* The drawn scene for David's job: the back garden as the clinician sees it. Returns an SVG string for the state the
   engine passes in ({ S, stage, rr, people }). Tap areas carry data-tab so a tap opens that group of actions.
   What it shows from the state: his posture (leaning forward, eased back, on the stretcher), flush or pallor, the
   oxygen mask, the monitor, the EpiPen in his wife's hand until it is used, Sam on the phone, who is speaking. */
window.SIM_SCENE = function (o) {
  var S = o.S, st = o.stage, on = S.pos === "stretcher", back = S.pos === "back", speak = S.speaking;
  var skin = st === "w" ? "#e3c3ae" : "#e9b99c", flush = st === "w" ? .35 : (st === 2 ? .45 : .8);
  var breath = Math.max(1.2, 60 / (o.rr || 24)).toFixed(2);
  function tag(x, y, text, who) { var w = text.length * 7.2 + 16; return '<g' + (speak === who ? ' class="spk"' : "") + '><rect x="' + (x - w / 2) + '" y="' + (y - 13) + '" width="' + w + '" height="20" rx="10" fill="' + (speak === who ? "#f0bd3a" : "rgba(16,32,26,.78)") + '"/><text x="' + x + '" y="' + (y + 1.5) + '" text-anchor="middle" font-size="12" font-weight="600" fill="' + (speak === who ? "#1d2a24" : "#fff") + '" font-family="-apple-system,Segoe UI,sans-serif">' + text + "</text></g>"; }

  var h = '<svg viewBox="0 96 800 424" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Back garden: David on a chair, his wife beside him, your driver Sam and the kit">';
  h += "<style>.br{animation:br " + breath + "s ease-in-out infinite}@keyframes br{50%{transform:translateY(-3px)}}.spk rect{animation:sp .6s ease-in-out infinite}@keyframes sp{50%{opacity:.6}}</style>";
  h += '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc7ee"/><stop offset="1" stop-color="#d9eefb"/></linearGradient>' +
       '<linearGradient id="lawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fbf6a"/><stop offset="1" stop-color="#5f9a48"/></linearGradient></defs>';
  /* sky, hills, shed, fence, tree, garden bed */
  h += '<rect width="800" height="230" fill="url(#sky)"/><path d="M0 180 Q150 130 320 170 T640 150 T800 165 V230 H0Z" fill="#b9cf9c"/>';
  h += '<rect x="0" y="95" width="150" height="135" fill="#c9c2b2"/><path d="M-10 100 L75 55 L160 100Z" fill="#8d8478"/><rect x="48" y="140" width="52" height="90" fill="#9a8f7d"/>';
  h += '<g fill="#b08a5c">'; for (var i = 150; i < 800; i += 26) h += '<rect x="' + i + '" y="150" width="22" height="80" rx="2"/>'; h += '</g><rect x="150" y="170" width="650" height="6" fill="#94714a"/>';
  h += '<rect x="690" y="60" width="18" height="170" fill="#7a5a3c"/><circle cx="700" cy="70" r="62" fill="#5f8f52"/><circle cx="745" cy="105" r="42" fill="#6b9c5c"/><circle cx="655" cy="100" r="40" fill="#557f49"/>';
  h += '<rect x="0" y="225" width="800" height="295" fill="url(#lawn)"/>';
  h += '<ellipse cx="560" cy="238" rx="120" ry="14" fill="#6b4f35"/><g>'; [[480, 226, "#e76f8a"], [515, 222, "#f3c14b"], [550, 227, "#b784d6"], [590, 221, "#e76f8a"], [628, 226, "#f3c14b"]].forEach(function (f) { h += '<rect x="' + (f[0] - 1) + '" y="' + f[1] + '" width="2" height="14" fill="#3f7a3a"/><circle cx="' + f[0] + '" cy="' + f[1] + '" r="6" fill="' + f[2] + '"/>'; });
  h += '<ellipse cx="533" cy="205" rx="4" ry="3" fill="#2b2b2b"/><ellipse cx="531" cy="202" rx="3" ry="2" fill="#fff" opacity=".8"/><ellipse cx="604" cy="198" rx="4" ry="3" fill="#2b2b2b"/><ellipse cx="602" cy="195" rx="3" ry="2" fill="#fff" opacity=".8"/></g>';

  /* wife, left */
  h += '<g data-tab="ask"><ellipse cx="205" cy="452" rx="46" ry="9" fill="#000" opacity=".15"/>' +
       '<rect x="183" y="335" width="20" height="115" rx="8" fill="#3b4a6b"/><rect x="207" y="335" width="20" height="115" rx="8" fill="#3b4a6b"/>' +
       '<path d="M170 250 Q205 232 240 250 L236 345 H174Z" fill="#d7745f"/>' +
       '<path d="M172 256 Q150 300 164 338" stroke="#d7745f" stroke-width="17" fill="none" stroke-linecap="round"/><circle cx="164" cy="342" r="9" fill="#efc4a6"/>' +
       '<path d="M238 256 Q262 292 268 322" stroke="#d7745f" stroke-width="17" fill="none" stroke-linecap="round"/><circle cx="270" cy="326" r="9" fill="#efc4a6"/>' +
       (S.epipen == null ? '<g transform="rotate(-25 276 322)"><rect x="262" y="314" width="44" height="12" rx="5" fill="#f4d23c"/><rect x="298" y="314" width="10" height="12" rx="4" fill="#ef7d22"/><rect x="258" y="314" width="8" height="12" rx="4" fill="#2e6fd0"/></g>' : "") +
       '<rect x="196" y="226" width="18" height="22" fill="#efc4a6"/><circle cx="205" cy="205" r="30" fill="#efc4a6"/><path d="M175 205 Q172 168 205 170 Q240 168 236 208 Q228 182 205 184 Q184 184 175 205Z" fill="#8a5a3a"/>' +
       '<circle cx="195" cy="205" r="2.6" fill="#333"/><circle cx="216" cy="205" r="2.6" fill="#333"/><path d="M188 196 l12 -3 M211 193 l12 3" stroke="#6b4428" stroke-width="2"/><path d="M196 220 Q205 215 214 220" stroke="#a5534a" stroke-width="2.4" fill="none"/>' +
       tag(205, 160, "Wife", "w") + "</g>";

  /* Sam, right, in uniform */
  var phone = speak === "e" || S.calling;
  h += '<g data-tab="call"><ellipse cx="660" cy="462" rx="50" ry="9" fill="#000" opacity=".15"/>' +
       '<rect x="636" y="345" width="22" height="118" rx="8" fill="#1f4d3a"/><rect x="662" y="345" width="22" height="118" rx="8" fill="#1f4d3a"/>' +
       '<path d="M620 252 Q660 232 700 252 L696 352 H624Z" fill="#2e7d5b"/><rect x="622" y="296" width="76" height="9" fill="#e9f24a"/><rect x="622" y="322" width="76" height="5" fill="#c9ced2"/>' +
       '<path d="M622 258 Q600 300 612 344" stroke="#2e7d5b" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="612" cy="348" r="9" fill="#4d8fd6"/>' +
       (phone ? '<path d="M698 258 Q722 262 694 214" stroke="#2e7d5b" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="692" cy="210" r="9" fill="#4d8fd6"/><rect x="684" y="190" width="11" height="24" rx="3" fill="#1b1b1b"/>'
              : '<path d="M698 258 Q718 300 708 344" stroke="#2e7d5b" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="708" cy="348" r="9" fill="#4d8fd6"/>') +
       '<rect x="651" y="226" width="18" height="22" fill="#d9a987"/><circle cx="660" cy="205" r="30" fill="#d9a987"/><path d="M630 204 Q628 170 660 170 Q694 170 690 206 Q684 186 660 186 Q638 186 630 204Z" fill="#2c2620"/><path d="M688 190 q14 10 6 34" stroke="#2c2620" stroke-width="7" fill="none" stroke-linecap="round"/>' +
       '<circle cx="650" cy="206" r="2.6" fill="#333"/><circle cx="671" cy="206" r="2.6" fill="#333"/><path d="M652 220 Q660 224 668 220" stroke="#8d4b3f" stroke-width="2.4" fill="none"/>' +
       tag(660, 160, "Sam", "p") + (speak === "e" ? tag(690, 136, "EOC Clinician on speaker", "e") : "") + "</g>";

  /* David, centre */
  h += '<g data-tab="assess">';
  if (on) {
    /* stretcher, head end raised */
    h += '<ellipse cx="400" cy="470" rx="150" ry="12" fill="#000" opacity=".16"/><rect x="290" y="440" width="10" height="34" fill="#666"/><rect x="500" y="440" width="10" height="34" fill="#666"/><circle cx="295" cy="476" r="9" fill="#333"/><circle cx="505" cy="476" r="9" fill="#333"/>' +
         '<path d="M300 250 H500 L520 330 H280Z" fill="#f2c230"/><path d="M270 330 H530 L545 440 H255Z" fill="#f2c230"/><path d="M270 330 H530 L536 372 H264Z" fill="#d9a916" opacity=".5"/>' +
         '<path d="M272 372 H528 L542 438 H258Z" fill="#b53a3a"/>' +
         '<g class="br"><path d="M335 300 Q400 272 465 300 L472 380 H328Z" fill="#5b86b8"/>' +
         '<path d="M338 306 Q312 350 330 396" stroke="#5b86b8" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M462 306 Q488 350 470 396" stroke="#5b86b8" stroke-width="20" fill="none" stroke-linecap="round"/>' +
         '<circle cx="331" cy="402" r="11" fill="' + skin + '"/><circle cx="469" cy="402" r="11" fill="' + skin + '"/></g>';
    h += head(400, 252);
  } else {
    var sy = back ? 232 : 252, hy = back ? 196 : 222;          /* shoulders and head sit lower when he leans forward */
    h += '<ellipse cx="400" cy="462" rx="110" ry="12" fill="#000" opacity=".16"/>' +
         '<path d="M318 200 H482 L474 345 H326Z" fill="#f7f7f2" stroke="#d5d5cc" stroke-width="3"/><rect x="312" y="330" width="176" height="22" rx="8" fill="#f7f7f2" stroke="#d5d5cc" stroke-width="3"/>' +
         '<rect x="318" y="350" width="12" height="108" fill="#ececE4"/><rect x="470" y="350" width="12" height="108" fill="#ececE4"/>' +
         '<rect x="300" y="286" width="26" height="12" rx="5" fill="#f7f7f2" stroke="#d5d5cc" stroke-width="2"/><rect x="474" y="286" width="26" height="12" rx="5" fill="#f7f7f2" stroke="#d5d5cc" stroke-width="2"/>';
    /* legs */
    h += '<path d="M352 330 L346 372 Q344 386 358 386 L386 386 L392 330Z" fill="#b9a67c"/><path d="M448 330 L454 372 Q456 386 442 386 L414 386 L408 330Z" fill="#b9a67c"/>' +
         '<rect x="346" y="380" width="30" height="66" rx="12" fill="' + skin + '"/><rect x="424" y="380" width="30" height="66" rx="12" fill="' + skin + '"/>' +
         '<ellipse cx="359" cy="452" rx="24" ry="11" fill="#5a4632"/><ellipse cx="441" cy="452" rx="24" ry="11" fill="#5a4632"/>';
    /* torso and arms */
    h += '<g class="br"><path d="M338 ' + sy + ' Q400 ' + (sy - 24) + ' 462 ' + sy + ' L456 340 H344Z" fill="#5b86b8"/>';
    if (back) h += '<path d="M340 ' + (sy + 6) + ' Q306 262 314 290" stroke="#5b86b8" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M460 ' + (sy + 6) + ' Q494 262 486 290" stroke="#5b86b8" stroke-width="22" fill="none" stroke-linecap="round"/>' +
                   '<path d="M314 290 L348 300" stroke="' + skin + '" stroke-width="16" stroke-linecap="round"/><path d="M486 290 L452 300" stroke="' + skin + '" stroke-width="16" stroke-linecap="round"/>' + hives(330, 294) + hives(470, 294);
    else h += '<path d="M340 ' + (sy + 6) + ' Q316 300 340 330" stroke="#5b86b8" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M460 ' + (sy + 6) + ' Q484 300 460 330" stroke="#5b86b8" stroke-width="22" fill="none" stroke-linecap="round"/>' +
              '<path d="M342 332 L362 368" stroke="' + skin + '" stroke-width="16" stroke-linecap="round"/><path d="M458 332 L438 368" stroke="' + skin + '" stroke-width="16" stroke-linecap="round"/>' + hives(352, 350) + hives(448, 350) +
              '<circle cx="364" cy="372" r="11" fill="' + skin + '"/><circle cx="436" cy="372" r="11" fill="' + skin + '"/>';
    h += "</g>" + head(400, hy);
  }
  function hives(x, y) { return '<g fill="#d8433b" opacity="' + flush + '"><circle cx="' + (x - 3) + '" cy="' + (y - 4) + '" r="3.2"/><circle cx="' + (x + 4) + '" cy="' + (y + 2) + '" r="2.6"/><circle cx="' + (x - 2) + '" cy="' + (y + 6) + '" r="2.2"/></g>'; }
  function head(x, y) {
    var s = '<g class="br"><rect x="' + (x - 13) + '" y="' + (y + 28) + '" width="26" height="26" fill="' + skin + '"/>' + hives(x - 6, y + 44) + hives(x + 8, y + 42) +
      '<ellipse cx="' + x + '" cy="' + y + '" rx="38" ry="41" fill="' + skin + '"/>' +
      '<path d="M' + (x - 38) + " " + (y - 6) + " Q" + (x - 40) + " " + (y - 44) + " " + x + " " + (y - 43) + " Q" + (x + 40) + " " + (y - 44) + " " + (x + 38) + " " + (y - 6) + " Q" + (x + 26) + " " + (y - 28) + " " + x + " " + (y - 27) + " Q" + (x - 26) + " " + (y - 28) + " " + (x - 38) + " " + (y - 6) + 'Z" fill="#9c9c98"/>' +
      '<ellipse cx="' + (x - 24) + '" cy="' + (y + 10) + '" rx="11" ry="8" fill="#d8433b" opacity="' + flush * .45 + '"/><ellipse cx="' + (x + 24) + '" cy="' + (y + 10) + '" rx="11" ry="8" fill="#d8433b" opacity="' + flush * .45 + '"/>' +
      /* swollen eyes and lips: unchanged by treatment in this job */
      '<ellipse cx="' + (x - 14) + '" cy="' + (y - 5) + '" rx="10.5" ry="7.5" fill="#e59a86"/><ellipse cx="' + (x + 14) + '" cy="' + (y - 5) + '" rx="10.5" ry="7.5" fill="#e59a86"/>' +
      '<path d="M' + (x - 20) + " " + (y - 4) + " h12 M" + (x + 8) + " " + (y - 4) + ' h12" stroke="#3a2d28" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="M' + (x - 24) + " " + (y - 17) + " l16 " + (st === 2 ? 0 : 4) + " M" + (x + 24) + " " + (y - 17) + " l-16 " + (st === 2 ? 0 : 4) + '" stroke="#77736e" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M' + (x - 3) + " " + (y + 2) + " q-4 10 3 12" + '" stroke="#c98f76" stroke-width="2.4" fill="none"/>';
    if (S.o2 != null) s += '<path d="M' + (x - 22) + " " + (y + 4) + " Q" + x + " " + (y - 8) + " " + (x + 22) + " " + (y + 4) + " L" + (x + 17) + " " + (y + 36) + " Q" + x + " " + (y + 46) + " " + (x - 17) + " " + (y + 36) + 'Z" fill="#dff3ee" opacity=".82" stroke="#7fb8a8" stroke-width="2"/>' +
      '<path d="M' + (x - 22) + " " + (y + 8) + " L" + (x - 38) + " " + (y + 2) + " M" + (x + 22) + " " + (y + 8) + " L" + (x + 38) + " " + (y + 2) + '" stroke="#7fb8a8" stroke-width="2.4"/>' +
      '<rect x="' + (x - 10) + '" y="' + (y + 42) + '" width="20" height="34" rx="9" fill="#dff3ee" opacity=".85" stroke="#7fb8a8" stroke-width="2"/><path d="M' + x + " " + (y + 76) + " q-30 40 -150 120" + '" stroke="#3aa37f" stroke-width="3" fill="none"/>';
    else s += '<ellipse cx="' + x + '" cy="' + (y + 24) + '" rx="' + (st === 2 ? 9 : 10.5) + '" ry="' + (st === 2 ? 4 : 7) + '" fill="#7a2f2f"/><path d="M' + (x - 13) + " " + (y + 23) + " Q" + x + " " + (y + 12) + " " + (x + 13) + " " + (y + 23) + " Q" + x + " " + (y + (st === 2 ? 31 : 38)) + " " + (x - 13) + " " + (y + 23) + 'Z" fill="none" stroke="#d4756a" stroke-width="5.5"/>';
    return s + "</g>" + tag(x, y - 56, "David", "d");
  }
  h += "</g>";

  /* foreground: Red Kit, oxygen, monitor, stretcher handle, your gloved hands */
  h += '<g data-tab="treat"><rect x="34" y="418" width="150" height="86" rx="12" fill="#c62f2f"/><rect x="34" y="418" width="150" height="20" rx="10" fill="#a32323"/><rect x="84" y="408" width="50" height="16" rx="8" fill="none" stroke="#7d1b1b" stroke-width="6"/>' +
       '<rect x="62" y="452" width="94" height="30" rx="6" fill="#fff"/><text x="109" y="473" text-anchor="middle" font-size="17" font-weight="700" fill="#c62f2f" font-family="-apple-system,Segoe UI,sans-serif">RED KIT</text>' +
       '<rect x="196" y="440" width="64" height="64" rx="10" fill="#2f8f5f"/><rect x="216" y="424" width="24" height="22" rx="6" fill="#d9dee0"/><text x="228" y="480" text-anchor="middle" font-size="16" font-weight="700" fill="#fff" font-family="-apple-system,Segoe UI,sans-serif">O2</text>' + tag(109, 400, "Treat") + "</g>";
  h += '<g data-tab="assess"><rect x="548" y="430" width="92" height="74" rx="8" fill="#2b2f33"/><rect x="556" y="438" width="76" height="44" rx="4" fill="' + (S.monitor != null ? "#0b1511" : "#16191b") + '"/>' +
       (S.monitor != null ? '<path d="M560 462 h12 l4 -12 l5 22 l4 -10 h12 l4 -12 l5 22 l4 -10 h14" stroke="#7dffa9" stroke-width="2" fill="none"/><path d="M560 432 Q470 420 440 ' + (on ? 330 : 300) + '" stroke="#444" stroke-width="2.5" fill="none"/>' : "") +
       '<circle cx="566" cy="493" r="4" fill="#e9f24a"/><circle cx="580" cy="493" r="4" fill="#d9dee0"/>' + tag(594, 418, "Monitor") + "</g>";
  h += '<g data-tab="move"><rect x="716" y="392" width="84" height="112" rx="10" fill="#f2c230"/><rect x="716" y="392" width="84" height="26" rx="10" fill="#d9a916"/><rect x="728" y="430" width="60" height="6" fill="#7a5f0d" opacity=".4"/><rect x="728" y="446" width="60" height="6" fill="#7a5f0d" opacity=".4"/>' + tag(756, 380, on ? "Transport" : "Move") + "</g>";
  h += '<g opacity=".96"><path d="M270 520 Q282 478 318 472 Q344 470 350 492 L352 520Z" fill="#4d8fd6"/><path d="M530 520 Q518 478 482 472 Q456 470 450 492 L448 520Z" fill="#4d8fd6"/><path d="M318 472 q10 -16 20 -6 M482 472 q-10 -16 -20 -6" stroke="#3b78bd" stroke-width="6" fill="none" stroke-linecap="round"/></g>';
  return h + "</svg>";
};
