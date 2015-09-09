'use strict';

const bookshelf = require('../database');
const path = require('path');
const tableName = path.basename(__filename, path.extname(__filename));

module.exports = bookshelf.Model.extend({
  tableName: tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  tag() {
    const Tag = require('./tag');
    return this.belongsToMany(Tag, 'song_tag');
  },
  playlistSong() {
    const PlaylistSong = require('./playlist_song');
    return this.hasMany(PlaylistSong, 'song_id');
  },
  playlist() {
    const Playlist = require('./playlist');
    const PlaylistSong = require('./playlist_song');
    return this.hasMany(Playlist).through(PlaylistSong);
  },
  artist() {
    const Artist = require('./artist');
    return this.belongsTo(Artist, 'artist_id');
  },
  album() {
    const Album = require('./album');
    return this.belongsTo(Album, 'album_id');
  }
});
