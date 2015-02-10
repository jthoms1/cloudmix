'use strict';

let BaseStore = require('./BaseStore');
let AppDispatcher = require('../dispatchers/Dispatcher');
let SongServerActions = require('../constants/Constants').SongServer;
let Immutable = require('immutable');
let assign = require('object-assign');

let _songs = Immutable.fromJS([]);

/**
 * @param {array} songs The complete list of songs.
 */
function _setAll(songs) {
  _songs = Immutable.fromJS(songs);
}

/**
 * SongStore - Contains all songs
 */
let SongStore = assign({}, BaseStore, {

  get(songId) {
    return _songs.find(song => song.id === songId);
  },

  getAll(forceUpdate=false) {
    if (!forceUpdate) {
      return _songs;
    }

    return null;
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
    case SongServerActions.RECEIVE_ALL_SONGS:
      _setAll(payload.action.songs);
      break;
    }

    SongStore.emitChange();
  })
});

module.exports = SongStore;
