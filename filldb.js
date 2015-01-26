'use strict';

var BPromise = require('bluebird');
var id3tagger = require('./id3');
var glob = require('glob');
var path = require('path');
var song = require('./models/song');
var artist = require('./models/artist');

var match = path.join(process.argv[2], '/**/*.mp3');
var files = glob.sync(match);

BPromise
  .map(files, function (filePath) {
    return id3tagger(filePath);
  })
  .then(function(data) {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(function(err) {
    console.log(err);
  });
