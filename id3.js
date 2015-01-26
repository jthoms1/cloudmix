'use strict';

var Promise = require('bluebird');
var probe = Promise.promisify(require('node-ffprobe'));

module.exports = function (trackPath) {
  return probe(trackPath).then(function(probeData) {
    console.log(probeData);
    var data = {};
    data.albumArtist = {
      name: probeData.metadata.album_artist
    };
    data.songArtist = {
      name: probeData.metadata.artist
    };
    data.album = {
      name: probeData.metadata.album,
      year: probeData.metadata.date
    };
    data.song = {
      name: probeData.metadata.title,
      'album_order': probeData.metadata.track,
      duration: probeData.format.duration
    };

    return data;
  });
};
