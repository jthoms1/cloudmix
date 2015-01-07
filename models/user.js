'use strict';

var inflection = require('inflection');
var tableName = 'user';
var modelName = inflection.classify(tableName);

module.exports = function(bookshelf, models) {

  var model = models[modelName] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    // Define Relationships
    playlist: function () {
      return this.hasMany(models.Playlist, 'playlist_id');
    }
  });

  return model;
};
