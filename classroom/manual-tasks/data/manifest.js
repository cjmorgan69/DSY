// To add a new lesson: save its data file in this folder (copy lesson1-human-body.js as a starting point)
// and add the file name to this list. The slide show, presenter view and printable guide all pick it up.
window.DRIVE_SECTIONS = [];
(function () {
  var files = [
    'lesson1-human-body.js'
    // , 'lesson2-something.js'
  ];
  files.forEach(function (f) {
    document.write('<script src="data/' + f + '?v=20261028a" charset="utf-8"><\/script>');
  });
})();
