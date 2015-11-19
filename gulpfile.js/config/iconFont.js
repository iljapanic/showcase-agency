var config = require('./')
var fontConfig = require('./fonts')

module.exports = {
  name: 'Icons font',
  src: config.sourceAssets + '/icons/*.svg',
  dest: fontConfig.dest,
  sassDest: config.sourceAssets + '/sass/utils',
  template: './gulpfile.js/tasks/iconFont/template.scss',
  sassOutputName: '_icons.scss',
  fontPath: '../fonts',
  className: 'icon',
  options: {
    fontName: 'icons',
    appendCodepoints: true,
    normalize: true,
    fontHeight: 1000
  }
}
