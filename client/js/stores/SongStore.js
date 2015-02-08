'use strict';

let BaseStore = require('./BaseStore');
let API = require('../util/API');
let List = require('immutable').List;

let _songs = List([]);

let SongStore = Object.assign(BaseStore.prototype, {

  setSongs(songs) {
    _songs = List(songs);
    this.emitChange();
  },

  getSongs(forceUpdate=false) {
    if (!forceUpdate && _songs.length) {
      return _songs;
    }

    API.get('songs').then(songs => {
      this.setSongs(songs);
    });

    return null;
  }
});

module.exports = SongStore;
