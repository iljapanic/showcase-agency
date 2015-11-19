var config       = require('../config/sass');
var browserSync  = require('browser-sync');
var gulp         = require('gulp');
var handleErrors = require('../handleErrors');

var autoprefixer = require('gulp-autoprefixer');
var cmq          = require('gulp-combine-media-queries');
var minify 		 = require('gulp-minify-css');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

gulp.task('sass', function () {
	return gulp.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(sass(config.settings))
		.on('error', handleErrors)
		.pipe(sourcemaps.write())
	    .pipe(autoprefixer(config.autoprefixer))
		.pipe(cmq())
	    .pipe(minify({keepSpecialComments: '0'}))
	    .pipe(gulp.dest(config.dest))
	    .pipe(browserSync.reload({stream:true}))
});




