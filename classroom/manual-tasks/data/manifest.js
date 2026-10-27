// To add a new lesson: save its data file in this folder (copy lesson1-human-body.js as a starting point)
// and add the file name to this list. The slide show, presenter view and printable guide all pick it up.
window.DRIVE_SECTIONS = [];
(function () {
  var files = [
    'lesson1-human-body.js',
    'lesson2-postures.js',
    'lesson3-ambulant.js',
    'lesson4b-equipment.js',
    'lesson5-bariatric.js',
    'lesson6-hazardous.js',
    'lesson7-legal.js',
    'optional-stryker.js'
    // , 'lesson6-something.js'
  ];
  files.forEach(function (f) {
    document.write('<script src="data/' + f + '?v=20261028g" charset="utf-8"><\/script>');
  });
})();
