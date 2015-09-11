'use strict';

const BPromise = require('bluebird');
const id3tagger = require('./id3');
const glob = require('glob');
const path = require('path');
const Song = require('../models/song');
const Artist = require('../models/artist');
const Album = require('../models/album');

const match = path.join(process.argv[2], '/**/*.mp3');
const files = glob.sync(match);

function findOrCreate(model) {
  return model.fetch()
  .then((data) => {
    if (data) {
      return BPromise.resolve(data);
    }
    return model.save();
  });
}

BPromise
  .map(files, id3tagger)
  .each((data) =>
    findOrCreate(Artist.forge(data.albumArtist))
      .then((artist) => {
        data.albumArtist = artist;

        return findOrCreate(Album.forge({
          'name': data.album.name,
          'year': parseInt(data.album.year, 10),
          'artist_id': data.albumArtist.id
        }));
      })
      .then((album) => {
        data.album = album;

        return findOrCreate(Song.forge({
          'name': data.song.name,
          'duration': data.song.duration,
          'album_order': parseInt(data.song.album_order, 10),
          'artist_id': data.albumArtist.id,
          'album_id': data.album.id
        }));
      });
  )
  .catch((err) => throw err);
