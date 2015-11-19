var config = require('./')

module.exports = {
    src: config.sourceAssets + "/sass/**/**/**/*.{sass,scss}",
    dest: config.publicAssets + '/css',
    autoprefixer: {
		browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4'],
		cascade: false
	},
    settings: {
        imagePath: 'assets/img' // Used by the image-url helper
    }
}