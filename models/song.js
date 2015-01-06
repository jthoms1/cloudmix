'use strict';

var us = require('underscore.string');
var tableName = 'song';

module.exports = function(bookshelf, models) {

  var model = models[us.classify(tableName)] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    // Define Relationships
    tag: function () {
      return this.belongsToMany(models.Tag, 'tag_song');
    },
    tracks: function () {
      return this.hasMany(models.Track, 'song_id');
    },
    playlists: function () {
      return this.hasMany(models.Playlist).through(models.Track);
    }
  });

  return model;
};
