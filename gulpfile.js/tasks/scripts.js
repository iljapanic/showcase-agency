var config       = require('../config/scripts');
var browserSync  = require('browser-sync');
var gulp         = require('gulp');
var handleErrors = require('../handleErrors');

var concat       = require('gulp-concat');
var sourcemaps   = require('gulp-sourcemaps');


gulp.task('scripts', function() {
    return gulp.src(config.src)
    	.pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});
