'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var util = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var dir = {
  dev: 'public/',
  prod: 'publish/',
  src: 'client/'
};

gulp.task('css', function() {
  var destination = (util.env.production ? dir.prod : dir.dev) + 'css/';

  gulp.src('./' + dir.src + 'less/styles.less')
    .pipe(less())
    .on('error', function(err) { console.log(err.message); })
    .pipe(gulp.dest(destination));
});

gulp.task('browserify', function() {
  var destination = (util.env.production ? dir.prod : dir.dev) + 'js/';

  // create new bundle
  var b = browserify();
  b.transform(babelify);
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
