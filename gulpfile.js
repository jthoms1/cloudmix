'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var browserify = require('browserify');
var to5ify = require('6to5ify');
var sass = require('gulp-sass');
//var dotify = require('gulp-dotify');
//var header = require('gulp-header');
//var footer = require('gulp-footer');
//var minifyCSS = require('gulp-minify-css');
//var minifyHTML = require('gulp-minify-html');
var source = require('vinyl-source-stream');

var dir = {
  dev: 'public/',
  prod: 'publish/',
  src: 'client/'
};

gulp.task('css', function() {
  var destination = (util.env.production ? dir.prod : dir.dev) + 'css/';

  gulp.src(dir.src + 'css/main.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(gulp.dest(destination));
});

gulp.task('browserify', function() {
  var destination = (util.env.production ? dir.prod : dir.dev) + 'js/';

  // create new bundle
  var b = browserify();
  b.transform(to5ify);
  b.add('./' + dir.src + 'js/app.js');
  // start bundling
  return b.bundle()
    .on('error', function(err) {
      // print the error (can replace with gulp-util)
      console.log(err.message);
      // end this stream
      this.emit('end');
    })
    .pipe(source('app.js'))
    // pipe other plugin here if you want
    .pipe(gulp.dest(destination));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify', 'css']);

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(dir.src + '**/*.*', ['default']);
});
