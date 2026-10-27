// To add a new section: save its data file in this folder (copy section2-mindset.js as a starting point)
// and add the file name to this list. The slide show, presenter view and printable guide all pick it up.
window.DRIVE_SECTIONS = [];
(function () {
  var files = [
    'section2-mindset.js',
    'section3-vehicles.js',
    'section4-practical.js',
    'section5-manoeuvring.js',
    'section6-policies-law.js',
    'section7-emergency.js'
  ];
  files.forEach(function (f) {
    document.write('<script src="data/' + f + '" charset="utf-8"><\/script>');
  });
})();
