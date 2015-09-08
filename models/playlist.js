'use strict';

var bookshelf = require('../database');
var path = require('path');
var tableName = path.basename(__filename, path.extname(__filename));

module.exports = bookshelf.Model.extend({
  tableName: tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  playlistSongs: function () {
    var Track = require('./playlist_song');
    return this.hasMany(Track, 'playlist_id');
  },
  songs: function () {
    var Song = require('./song');
    var PlaylistSong = require('./playlist_song');
    return this.hasMany(Song).through(PlaylistSong);
  },
  user: function () {
    var User = require('./user');
    return this.belongsTo(User, 'user_id');
  }
});
