'use strict';

var Playlist = require('../../models/playlist');
var Song = require('../../models/song');
var BPromise = require('bluebird');

exports.index = function(req, res) {
  BPromise
    .all([Playlist.fetchAll(), Song.fetchAll()])
    .then(function(data) {
      res.render('index', {
        playlists: data[0].toJSON(),
        songs: data[1].toJSON()
      });
    });
};
