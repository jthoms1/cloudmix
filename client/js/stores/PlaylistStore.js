'use strict';

let BaseStore = require('./BaseStore');
let AppDispatcher = require('../dispatchers/CloudmixAppDispatcher');
let PlaylistActions = require('../constants/CloudmixConstants').Playlist;
let assign = require('object-assign');
let List = require('immutable').List;

let _playlistTracks = List([]);

function _removeTrack(index) {
  _playlistTracks = _playlistTracks.splice(index, 1);
}

function _addTrack(track) {
  if (_playlistTracks.findIndex(track) === -1) {
    _playlistTracks = _playlistTracks.push(track);
  }
}

let PlaylistStore = assign(BaseStore, {
  getTracks() {
    return _playlistTracks;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
    case PlaylistActions.ADD_TRACK:
      _addTrack(payload.action.track);
      break;

    case PlaylistActions.REMOVE_TRACK:
      _removeTrack(payload.action.index);
      break;
    }
    PlaylistStore.emitChange();

    return true;
  })
});

module.exports = PlaylistStore;
