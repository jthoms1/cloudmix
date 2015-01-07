'use strict';

var inflection = require('inflection');
var tableName = 'playlist_song';
var modelName = inflection.classify(tableName);

module.exports = function(bookshelf, models) {

  var model = models[modelName] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    // Define Relationships
    playlist: function () {
      return this.belongsTo(models.Playlist, 'playlist_id');
    },
    song: function () {
      return this.hasOne(models.Song, 'song_id');
    }
  });

  return model;
};
