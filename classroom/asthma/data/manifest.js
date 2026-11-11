// Asthma case night. The slides are built from the live content files, not copied:
//   /microlearning/asthma/content.js  (intro video and key points)
//   /modules/asthma-ao/content.js        (Karen's walk-through: story, break points, decision tiles, debrief)
// so a correction to the module or the walk-through shows up here too. Both files set window.MODULE, so each is
// saved under its own name straight after it loads. build.js then turns them into slide sections.
window.DRIVE_SECTIONS = [];
(function () {
  var v = '?v=20261111f';
  document.write('<script src="/microlearning/asthma/content.js' + v + '" charset="utf-8"><\/script>');
  document.write('<script>window.AS_ML = window.MODULE;<\/script>');
  document.write('<script src="/modules/asthma-ao/content.js' + v + '" charset="utf-8"><\/script>');
  document.write('<script>window.AS_WT = window.MODULE;<\/script>');
  document.write('<script src="data/build.js' + v + '" charset="utf-8"><\/script>');
})();
