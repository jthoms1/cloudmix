'use strict';

var BPromise = require('bluebird');
var id3tagger = require('./id3');
var glob = require('glob');
var path = require('path');
var Song = require('./models/song');
var Artist = require('./models/artist');

var match = path.join(process.argv[2], '/**/*.mp3');
var files = glob.sync(match);

function findOrCreate (model) {
  model.fetch()
  .then(function (data) {
    if (data) return BPromise.resolve(data);
    return model.save();
  });
}

BPromise
  .map(files, function (filePath) {
    return id3tagger(filePath);
  })
  .each(function(data) {
    return findOrCreate(Artist.forge(data.albumArtist));
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });
