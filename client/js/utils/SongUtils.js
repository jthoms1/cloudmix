'use strict';

let SongServerActionCreators = require('../actions/SongServerActionCreators');
let API = require('./ApiUtils');

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
        SongServerActionCreators.receiveAll(songs);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
