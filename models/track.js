'use strict';

var us = require('underscore.string');
var tableName = 'track';

module.exports = function(bookshelf, models) {

  var model = models[us.classify(tableName)] = bookshelf.Model.extend({
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
