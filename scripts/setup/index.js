var fs = require('fs');
var initCss = require('./init-css');
var manifest = require('./extension-manifest');

function addDepsToFolder(fn) {
  fs.writeFileSync('dist/init.css', initCss);
  fs.writeFileSync('dist/manifest.json', manifest);

  fn();
}

fs.stat('dist', function (err) {
  if (err) {
    fs.mkdir('dist', function (err) {
      if (!err) addDepsToFolder(function () {
        console.log('Setup dependencies added to dist folder');
      });
    });

    return;
  }
});
