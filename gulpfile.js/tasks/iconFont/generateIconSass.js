var gulp         = require('gulp');
var config       = require('../../config/iconFont');
var swig         = require('gulp-swig');
var rename       = require('gulp-rename');
var handleErrors = require('../../handleErrors');

module.exports = function(codepoints, options) {
  gulp.src(config.template)
    .pipe(swig({
      data: {
        icons: codepoints.map(function(icon) {
          return {
            name: icon.name,
            code: icon.codepoint.toString(16)
          }
        }),

        fontName: config.options.fontName,
        fontPath: config.fontPath,
        className: config.className,
        comment: 'DO NOT EDIT DIRECTLY!  Generated by gulp/tasks/iconFont.js  from ' + config.template
      }
    }))
    .on('error', handleErrors)
    .pipe(rename(config.sassOutputName))
    .pipe(gulp.dest(config.sassDest));
};
