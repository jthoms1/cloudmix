'use strict';

const bookshelf = require('../database');
const path = require('path');
const tableName = path.basename(__filename, path.extname(__filename));

const BPromise = require('bluebird');
const bcrypt = BPromise.promisifyAll(require('bcrypt'));

module.exports = bookshelf.Model.extend({
  tableName: tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  playlist() {
    const Playlist = require('./playlist');
    return this.hasMany(Playlist, 'playlist_id');
  }
}, {
  login: BPromise.method((email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are both required');
    }
    return new this({email: email.toLowerCase().trim()})
      .fetch({require: true})
      .tap(function(customer) {
        return bcrypt.compare(customer.get('password'), password);
      });
  })
});
