'use strict';

const bookshelf = require('../database');
const path = require('path');
const tableName = path.basename(__filename, path.extname(__filename));

module.exports = bookshelf.Model.extend({
  tableName: tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  playlist() {
    const Playlist = require('./playlist');
    return this.belongsTo(Playlist, 'playlist_id');
  },
  song() {
    const Song = require('./song');
    return this.hasOne(Song, 'song_id');
  }
});
