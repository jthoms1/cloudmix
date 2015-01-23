'use strict';

var bookshelf = require('../database');
var path = require('path');
var tableName = path.basename(__filename, path.extname(__filename));

var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

module.exports = bookshelf.Model.extend({
  tableName: 'cloudmix.' + tableName,
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  // Define Relationships
  playlist: function () {
    var Playlist = require('./playlist');
    return this.hasMany(Playlist, 'playlist_id');
  }
}, {
  login: Promise.method(function(email, password) {
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

