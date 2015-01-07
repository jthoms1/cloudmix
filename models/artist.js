'use strict';

var inflection = require('inflection');
var tableName = 'artist';
var modelName = inflection.classify(tableName);

module.exports = function(bookshelf, models) {

  var model = models[modelName] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    // Define Relationships
    song: function () {
      return this.hasMany(models.Song, 'artist_id');
    },
    album: function () {
      return this.hasMany(models.Album, 'artist_id');
    }
  });

  return model;
};
