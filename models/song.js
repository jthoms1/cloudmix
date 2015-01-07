'use strict';

var inflection = require('inflection');
var tableName = 'song';
var modelName = inflection.classify(tableName);

module.exports = function(bookshelf, models) {

  var model = models[modelName] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    // Define Relationships
    tag: function () {
      return this.belongsToMany(models.Tag, 'song_tag');
    },
    playlistSong: function () {
      return this.hasMany(models.PlaylistSong, 'song_id');
    },
    playlist: function () {
      return this.hasMany(models.Playlist).through(models.PlaylistSong);
    },
    artist: function () {
      return this.belongsTo(models.Artist, 'artist_id');
    },
    album: function () {
      return this.belongsTo(models.Album, 'album_id');
    }
  });

  return model;
};
