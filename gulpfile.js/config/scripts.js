var config = require('./')

module.exports = {
    src: config.sourceAssets + '/javascript/**.js',
    src_plugins: config.sourceAssets + '/javascript/plugins/**.js',
    dest: config.publicAssets + '/js'
}