// Refusal against advice case night. The slides are built from the live content files, not copied:
//   /microlearning/refusal/content.js  (the protocol, VIRCA and the pathways)
//   /modules/refusal-ao/content.js     (Sam's walk-through: story, break points, decision tiles, debrief)
// so a correction to the module or the walk-through shows up here too. Both files set window.MODULE, so each is
// saved under its own name straight after it loads. build.js then turns them into slide sections.
window.DRIVE_SECTIONS = [];
(function () {
  var v = '?v=20261128r';
  document.write('<script src="/microlearning/refusal/content.js' + v + '" charset="utf-8"><\/script>');
  document.write('<script>window.RF_ML = window.MODULE;<\/script>');
  document.write('<script src="/modules/refusal-ao/content.js' + v + '" charset="utf-8"><\/script>');
  document.write('<script>window.RF_WT = window.MODULE;<\/script>');
  document.write('<script src="data/build.js' + v + '" charset="utf-8"><\/script>');
})();
