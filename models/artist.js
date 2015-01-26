'use strict';

var bookshelf = require('../database');
var path = require('path');
var tableName = path.basename(__filename, path.extname(__filename));

module.exports = bookshelf.Model.extend({
  tableName: 'cloudmix.' + tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  songs: function () {
    var Song = require('./song');
    return this.hasMany(Song, 'artist_id');
  },
  albums: function () {
    var Album = require('./album');
    return this.hasMany(Album, 'artist_id');
  }
});
