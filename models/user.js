'use strict';

var inflection = require('inflection');
var tableName = 'user';
var modelName = inflection.classify(tableName);
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

module.exports = function(bookshelf, models) {

  var model = models[modelName] = bookshelf.Model.extend({
    tableName: 'cloudmix.' + tableName,
    idAttribute: 'id',
    hasTimestamps: ['created_at', 'updated_at'],

    // Define Relationships
    playlist: function () {
      return this.hasMany(models.Playlist, 'playlist_id');
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

  return model;
};
