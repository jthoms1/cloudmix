'use strict';

let SongServerActionCreators = require('../actions/SongServerActionCreators');
let API = require('./ApiUtils');

module.exports = {
  /**
   *
   */
  getSongs() {
    API.get('songs', {
        'include': ['album.artist'].join(),
        'limit': 0
      })
      .then(function (catalogList) {
        SongServerActionCreators.receiveAll(catalogList);
      });
  }
};
