'use strict';

var inflection = require('inflection');
var tableName = 'album';
var modelName = inflection.classify(tableName);

module.exports = function(bookshelf, models) {

  var model = models[modelName] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    // Define Relationships
    songs: function () {
      return this.hasMany(models.Song, 'album_id');
    },
    artist: function () {
      return this.belongsTo(models.Artist, 'artist_id');
    }
  });

  return model;
};
