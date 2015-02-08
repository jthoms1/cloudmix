'use strict';

let BaseStore = require('./BaseStore');
let AppDispatcher = require('../dispatchers/Dispatcher');
let PlaylistActions = require('../constants/Constants').Playlist;
let List = require('immutable').List;

let _playlists = List([]);

/**
  * @param {string} playlistId The unique id of the playlist object
  */
function _removePlaylist(playlistId) {
  let index = _playlists.findIndex(playlist => playlist.id === playlistId);
  _playlists = _playlists.delete(index);
}

/**
  * @param {object} playlist The playlist object to be added
  */
function _addPlaylist(playlist) {
  _playlists = _playlists.push(playlist);
}

/**
  * @param {string} playlistId The unique id of the playlist object
  * @param {object} playlist The playlist object to be updated
  */
function _updatePlaylist(playlistId, playlist) {
  let playlistIndex = _playlists.findIndex(playlist => playlist.id === playlistId);
  _playlists = _playlists.set(index, playlist);
}

/**
  * @param {string} playlistId The unique id of the playlist object
  * @param {string} songId The unique id of the song object
  */
function _addSong(playlistId, songId) {
  let playlistIndex = _playlists.findIndex(playlist => playlist.id === playlistId);
  let playlist = _playlists.get(playlistIndex).links.songs.push(songId);
  _playlists = _playlists.set(playlistIndex, playlist);
}

/**
  * @param {string} playlistId The unique id of the playlist object
  * @param {integer} songInex The unique id of the song object
  */
function _removeSong(playlistId, songIndex) {
  let playlistIndex = _playlists.findIndex(playlist => playlist.id === playlistId);
  let playlist = _playlists.get(playlistIndex);
  let songArray = playlist.links.songs;

  playlist.links.songs = songArray.splice(songlindex,1);
  _playlists = _playlists.set(playlistIndex, playlist);
}

let PlaylistStore = Object.assign(BaseStore, {

  set(playlists) {
    _playlists = List(playlists);
    this.emitChange();
  },

  get(playlistId) {
    return _playlists.find(playlist => playlist.id === playlistId);
  },

  getAll(forceUpdate=false) {
    if (!forceUpdate && _playlists.length) {
      return _playlists;
    }

    API.get('playlists').then(playlists => {
      this.set(playlists);
    });

    return null;
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
    case PlaylistActions.ADD_PLAYLIST:
      _addPlaylist(payload.action.playlist);
      break;

    case PlaylistActions.UPDATE_PLAYLIST:
      _updatePlaylist(payload.action.playlistId, payload.action.playlist);
      break;

    case PlaylistActions.REMOVE_PLAYLIST:
      _removePlaylist(payload.action.playlistId);
      break;

    case PlaylistActions.ADD_SONG:
      _addSong(payload.action.playlistId, payload.action.songId);
      break;

    case PlaylistActions.REMOVE_SONG:
      _removeSong(payload.action.playlistId, payload.action.songIndex);
      break;
    }

    PlaylistStore.emitChange();

    return true;
  })
});

module.exports = PlaylistStore;
