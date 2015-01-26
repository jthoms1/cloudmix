'use strict';

var bookshelf = require('../database');
var path = require('path');
var tableName = path.basename(__filename, path.extname(__filename));

module.exports = bookshelf.Model.extend({
  tableName: 'cloudmix.' + tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  playlist: function () {
    var Playlist = require('./playlist');
    return this.belongsTo(Playlist, 'playlist_id');
  },
  song: function () {
    var Song = require('./song');
    return this.hasOne(Song, 'song_id');
  }
});

