'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var browserify = require('gulp-browserify');
//var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
//var dotify = require('gulp-dotify');
//var header = require('gulp-header');
//var footer = require('gulp-footer');
//var minifyCSS = require('gulp-minify-css');
//var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');

var dir = {
  dev: 'public/',
  prod: 'publish/',
  src: 'client/'
};
/*
gulp.task('css', function() {
  var destination = (util.env.production ? dir.prod : dir.dev) + 'css/';

  gulp.src(dir.src + 'css/base.scss')
    .pipe(sass())
    .pipe(util.env.production ? minifyCSS() : util.noop())
    .pipe(gulp.dest(destination));
});
*/

gulp.task('browserify', function() {
  var destination = (util.env.production ? dir.prod : dir.dev) + 'js/';

  gulp.src(dir.src + 'js/app.js')
    .pipe(browserify({transform: 'reactify'}))
    .pipe(concat('app.js'))
    .pipe(util.env.production ? uglify() : util.noop())
    .pipe(gulp.dest(destination));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify']);

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(dir.src + '**/*.*', ['default']);
});

