'use strict';

var us = require('underscore.string');
var tableName = 'tag';

module.exports = function(bookshelf, models) {

  var model = models[us.classify(tableName)] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    songs: function() {
      return this.belongsToMany(models.Song, 'tag_song');
    },
    albums: function() {
      return this.belongsToMany(models.Album, 'album_tag');
    }
  });

  return model;
};
