'use strict';

let BaseStore = require('./BaseStore');
let AppDispatcher = require('../dispatchers/Dispatcher');
let SongServerActions = require('../constants/Constants').SongServer;
let API = require('../utils/ApiUtils');
let List = require('immutable').List;
let assign = require('object-assign');

let _songs = List([]);

let SongStore = assign(BaseStore, {

  setSongs(songs) {
    _songs = List(songs);
    this.emitChange();
  },

  getSongs(forceUpdate=false) {
    if (!forceUpdate) {
      return _songs;
    }

    API.get('songs').then(songs => {
      this.setSongs(songs);
    });

    return null;
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
    case SongServerActions.RECEIVE_ALL_SONGS:
      SongStore.setSongs(payload.action.songs);
      break;
    }
  })
});

module.exports = SongStore;
