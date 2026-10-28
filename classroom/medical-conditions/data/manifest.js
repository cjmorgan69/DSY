// Medical Conditions (Ambulance Responder) workshop, AR course Day 6. To add a part: save its data file in this folder and add
// the file name to this list. The slide show, presenter view and printable guide all pick it up.
window.DRIVE_SECTIONS = [];
(function () {
  var files = [
    'part1-welcome.js',
    'part2-asthma.js',
    'part3-anaphylaxis.js',
    'part4-chest-pain.js',
    'part5-diabetes.js',
    'part6-stroke-seizures.js',
    'part7-mental-health.js',
    'part8-other.js',
    'part9-birth.js',
    'part10-close.js'
  ];
  files.forEach(function (f) {
    document.write('<script src="data/' + f + '?v=20261028a" charset="utf-8"><\/script>');
  });
})();
