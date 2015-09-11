'use strict';

var BPromise = require('bluebird');
var probe = BPromise.promisify(require('node-ffprobe'));

module.exports = (trackPath) => (
  probe(trackPath)
    .then(probeData => (
      Promise.resolve({
        albumArtist: {
          name: probeData.metadata.album_artist
        }
        songArtist: {
          name: probeData.metadata.artist
        }
        album: {
          name: probeData.metadata.album,
          year: probeData.metadata.date
        }
        song: {
          name: probeData.metadata.title,
          'album_order': probeData.metadata.track,
          duration: probeData.format.duration
        }
      });
    );
);
