'use strict';

let SongServerActionCreators = require('../actions/SongServerActionCreators');
let API = require('./ApiUtils');
let converter = require('jsonapi2simple');

module.exports = {
  /**
   *
   */
  getAll() {
    API.get('songs', {
        'include': ['album.artist'].join(),
        'limit': 0
      })
      .then(function(songs) {
        songs = converter.toSimple(songs);
        SongServerActionCreators.receiveAll(songs);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
