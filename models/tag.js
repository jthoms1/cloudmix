'use strict';

var inflection = require('inflection');
var tableName = 'tag';
var modelName = inflection.classify(tableName);

module.exports = function(bookshelf, models) {

  var model = models[modelName] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    song: function() {
      return this.belongsToMany(models.Song, 'song_tag');
    }
  });

  return model;
};
