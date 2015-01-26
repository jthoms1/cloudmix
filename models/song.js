'use strict';

var bookshelf = require('../database');
var path = require('path');
var tableName = path.basename(__filename, path.extname(__filename));

module.exports = bookshelf.Model.extend({
  tableName: 'cloudmix.' + tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  tag: function () {
    var Tag = require('./tag');
    return this.belongsToMany(Tag, 'song_tag');
  },
  playlistSong: function () {
    var PlaylistSong = require('./playlist_song');
    return this.hasMany(PlaylistSong, 'song_id');
  },
  playlist: function () {
    var Playlist = require('./playlist');
    var PlaylistSong = require('./playlist_song');
    return this.hasMany(Playlist).through(PlaylistSong);
  },
  artist: function () {
    var Artist = require('./artist');
    return this.belongsTo(Artist, 'artist_id');
  },
  album: function () {
    var Album = require('./album');
    return this.belongsTo(Album, 'album_id');
  }
});
