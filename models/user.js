'use strict';

const bookshelf = require('../database');
const path = require('path');
const tableName = path.basename(__filename, path.extname(__filename));
const bcrypt = require('bcrypt-nodejs');

module.exports = bookshelf.Model.extend({
  tableName: tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  playlist() {
    const Playlist = require('./playlist');
    return this.hasMany(Playlist, 'playlist_id');
  },
  verifyPassword() {
    return bcrypt.compareSync(password, this.password);
  }
}, {
  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
});
