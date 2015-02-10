'use strict';

let BaseStore = require('./BaseStore');
let AppDispatcher = require('../dispatchers/Dispatcher');
let SongServerActions = require('../constants/Constants').SongServer;
let API = require('../utils/ApiUtils');
let Immutable = require('immutable');
let assign = require('object-assign');

let _songs = Immutable.fromJS([]);

let SongStore = assign({}, BaseStore, {

  get(songId) {
    return _songs.find(song => song.id === songId);
  },

  set(songs) {
    _songs = Immutable.fromJS(songs);
    this.emitChange();
  },

  getAll(forceUpdate=false) {
    if (!forceUpdate) {
      return _songs;
    }

    API.get('songs').then(songs => {
      this.set(songs);
    });

    return null;
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
    case SongServerActions.RECEIVE_ALL_SONGS:
      SongStore.set(payload.action.songs);
      break;
    }
  })
});

module.exports = SongStore;
