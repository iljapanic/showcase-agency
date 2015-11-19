var config       = require('../config/svgSprites');
var browserSync  = require('browser-sync');
var gulp         = require('gulp');
var handleErrors = require('../handleErrors');

var svgSprite   = require('gulp-svg-sprite');

gulp.task('svgSprite', function () {
    return gulp.src(config.src)
        .pipe(svgSprite(config.settings))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});