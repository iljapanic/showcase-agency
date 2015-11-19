var browserSync  = require('browser-sync');
var config 		 = require('../config/html');
var fileinclude  = require('gulp-file-include');
var gulp 		 = require('gulp');
var handleErrors = require('../handleErrors');


gulp.task('html', function() {
	return gulp.src(config.src)
  		.pipe(fileinclude())
  		.on('error', handleErrors)
		.pipe(gulp.dest(config.dest))
  		.pipe(browserSync.reload({stream:true}));
});
