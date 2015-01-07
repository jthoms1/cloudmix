'use strict';

var inflection = require('inflection');
var tableName = 'playlist';
var modelName = inflection.classify(tableName);

module.exports = function(bookshelf, models) {

  var model = models[modelName] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    // Define Relationships
    track: function () {
      return this.hasMany(models.Track, 'playlist_id');
    },
    songs: function () {
      return this.hasMany(models.Song).through(models.Track);
    },
    user: function () {
      return this.belongsTo(models.User, 'user_id');
    }
  });

  return model;
};
