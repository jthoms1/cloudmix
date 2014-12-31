'use strict';

var us = require('underscore.string');
var tableName = 'tag';

module.exports = function(bookshelf, models) {

  var model = models[us.classify(tableName)] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    // Define Relationships
    track: function () {
      return this.hasMany(models.Track, 'playlist_id');
    },
    user: function () {
      return this.belongsTo(models.User, 'user_id');
    }
  });

  return model;
};
