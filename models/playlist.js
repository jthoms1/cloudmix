'use strict';

const bookshelf = require('../database');
const path = require('path');
const tableName = path.basename(__filename, path.extname(__filename));

module.exports = bookshelf.Model.extend({
  tableName: tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  playlistSongs() {
    const Track = require('./playlist_song');
    return this.hasMany(Track, 'playlist_id');
  },
  songs() {
    const Song = require('./song');
    const PlaylistSong = require('./playlist_song');
    return this.hasMany(Song).through(PlaylistSong);
  },
  user() {
    const User = require('./user');
    return this.belongsTo(User, 'user_id');
  }
});
