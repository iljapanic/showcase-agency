var config = require('./')

module.exports = {
    watch: config.sourceDirectory + '/htdocs/**/*.html',
    src: [config.sourceDirectory + '/htdocs/**/*.html'],
    dest: config.publicDirectory
}