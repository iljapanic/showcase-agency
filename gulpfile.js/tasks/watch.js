var gulp     = require('gulp');

var fonts    = require('../config/fonts');
var html     = require('../config/html');
var svg   	 = require('../config/svgSprites');
var images   = require('../config/images');
var sass     = require('../config/sass');
var scripts  = require('../config/scripts');

var watch    = require('gulp-watch');



gulp.task('watch', ['browserSync'], function() {

	watch(fonts.src, function() { gulp.start('fonts'); });
	watch(html.watch, function() { gulp.start('html'); });
	watch(svg.src, function() { gulp.start('svgSprite'); });
	watch(images.src, function() { gulp.start('images'); });
	watch(sass.src, function() { gulp.start('sass'); });
	watch(scripts.src, function() { gulp.start('scripts'); });
	watch(scripts.src_plugins, function() { gulp.start('scriptsPlugins'); });

});
