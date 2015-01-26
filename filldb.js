'use strict';

var BPromise = require('bluebird');
var id3tagger = require('./id3');
var glob = require('glob');
var path = require('path');
var Song = require('./models/song');
var Artist = require('./models/artist');
var Album = require('./models/album');

var match = path.join(process.argv[2], '/**/*.mp3');
var files = glob.sync(match);

function findOrCreate (model) {
  return model.fetch()
  .then(function (data) {
    if (data) {
      return BPromise.resolve(data);
    }
    return model.save();
  });
}

BPromise
  .map(files, function (filePath) {
    return id3tagger(filePath);
  })
  .each(function(data) {
    return findOrCreate(Artist.forge(data.albumArtist))
    .then(function(artist) {
      data.albumArtist = artist;

      return findOrCreate(Album.forge({
        'name': data.album.name,
        'year': parseInt(data.album.year, 10),
        'artist_id': data.albumArtist.id
      }));
    })
    .then(function(album) {
      data.album = album;

      return findOrCreate(Song.forge({
        'name': data.song.name,
        'duration': data.song.duration,
        'album_order': parseInt(data.song.album_order, 10),
        'artist_id': data.albumArtist.id,
        'album_id': data.album.id
      }));
    });
  })
  .catch(function(err) {
    throw err;
  });
