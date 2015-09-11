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
    return this.hasMany(Song, 'album_id');
  },
  artist() {
    const Artist = require('./artist');
    return this.belongsTo(Artist, 'artist_id');
  }
});
