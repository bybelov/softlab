var gulp    = require('gulp'),
    config  = require('../config.js'),
    critical = require('critical');


gulp.task('critical', function (cb) {
  critical.generate({
    inline: true,
    base: 'build',
    src: 'main-page.html',
    dest: 'main-page-critical.html',
    minify: true,
    width: 1920,
    height: 1080
  });
});