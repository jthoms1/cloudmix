'use strict';

let BaseStore = require('./BaseStore');
let AppDispatcher = require('../dispatchers/Dispatcher');
let PlaylistActions = require('../constants/Constants').Playlist;
let assign = require('object-assign');
let List = require('immutable').List;

let _playlists = List([]);

function _removeSong(playlistId, playlistSongIndex) {
  let playlist = _playlists.find(function () { return playlist.id === playlistId })
  playlist
  playlist = playlists.splice(index, 1);

}

function _addSong(playlistId, song) {
  let playlist = _playlists.find(function () { return playlist.id === playlistId })
  if (playlists.findIndex(song) === -1) {
    _playlists = _playlists.push(song);
  }
}

let PlaylistStore = assign(BaseStore, {
  getPlaylistSongs(playlistId) {
    return _playlists.filter(;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
    case PlaylistActions.ADD_TRACK:
      _addSong(payload.action.track);
      break;

    case PlaylistActions.REMOVE_TRACK:
      _removeSong(payload.action.index);
      break;
    }
    PlaylistStore.emitChange();

    return true;
  })
});

module.exports = PlaylistStore;
