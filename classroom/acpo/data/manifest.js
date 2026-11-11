// ACPO case night. The slides are built from the live content files, not copied:
//   /microlearning/acpo/content.js  (intro video and the protocol)
//   /modules/APO/content.js        (Kevin's walk-through: story, break points, decision tiles, debrief)
// so a correction to the module or the walk-through shows up here too. Both files set window.MODULE, so each is
// saved under its own name straight after it loads. build.js then turns them into slide sections.
window.DRIVE_SECTIONS = [];
(function () {
  var v = '?v=20261111d';
  document.write('<script src="/microlearning/acpo/content.js' + v + '" charset="utf-8"><\/script>');
  document.write('<script>window.AP_ML = window.MODULE;<\/script>');
  document.write('<script src="/modules/APO/content.js' + v + '" charset="utf-8"><\/script>');
  document.write('<script>window.AP_WT = window.MODULE;<\/script>');
  document.write('<script src="data/build.js' + v + '" charset="utf-8"><\/script>');
})();
