'use strict';

var us = require('underscore.string');
var tableName = 'album';

module.exports = function(bookshelf, models) {

  var model = models[us.classify(tableName)] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    // Define Relationships
    songs: function () {
      return this.hasMany(models.Song, 'album_id');
    }
  });

  return model;
};
