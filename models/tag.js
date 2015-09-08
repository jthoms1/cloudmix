'use strict';

var bookshelf = require('../database');
var path = require('path');
var tableName = path.basename(__filename, path.extname(__filename));

module.exports = bookshelf.Model.extend({
  tableName: tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  songs: function() {
    var Song = require('./song');
    return this.belongsToMany(Song, 'song_tag');
  }
});
