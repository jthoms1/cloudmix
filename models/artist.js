'use strict';

const bookshelf = require('../database');
const path = require('path');
const tableName = path.basename(__filename, path.extname(__filename));

module.exports = bookshelf.Model.extend({
  tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  songs() {
    const Song = require('./song');
    return this.hasMany(Song, 'artist_id');
  },
  albums() {
    const Album = require('./album');
    return this.hasMany(Album, 'artist_id');
  }
});
