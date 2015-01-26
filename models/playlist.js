'use strict';

var bookshelf = require('../database');
var path = require('path');
var tableName = path.basename(__filename, path.extname(__filename));

module.exports = bookshelf.Model.extend({
  tableName: 'cloudmix.' + tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  tracks: function () {
    var Track = require('./track');
    return this.hasMany(Track, 'playlist_id');
  },
  songs: function () {
    var Song = require('./song');
    var Track = require('./track');
    return this.hasMany(Song).through(Track);
  },
  user: function () {
    var User = require('./user');
    return this.belongsTo(User, 'user_id');
  }
});
