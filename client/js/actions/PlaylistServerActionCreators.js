'use strict';

var ServerAction = require('../constants/Constants.js').PlaylistServer;
var AppDispatcher = require('../dispatchers/Dispatcher.js');

var PlaylistServerActionCreators = {

  /**
   * @param {array} playlists Array of all playlists
   */
  receiveAll(playlists) {
    AppDispatcher.handleAction({
      actionType: ServerAction.RECEIVE_ALL_PLAYLISTS,
      playlists: playlists
    });
  },

  /**
   * @param {array} playlists Array of all playlists
   */
  receiveCreated(playlists) {
    AppDispatcher.handleAction({
      actionType: ServerAction.RECEIVE_CREATED_PLAYLISTS,
      playlists: playlists
    });
  },

  /**
   * @param {array} playlists Array of all playlists
   */
  receiveUpdated(playlists) {
    AppDispatcher.handleAction({
      actionType: ServerAction.RECEIVE_UPDATED_PLAYLISTS,
      playlists: playlists
    });
  },

  /**
   * @param {array} playlistSongs Array of all playlists
   */
  receiveCreatedPlaylistSongs(playlistSongs) {
    AppDispatcher.handleAction({
      actionType: ServerAction.RECEIVE_CREATED_PLAYLIST_SONGS,
      playlistSongs: playlistSongs
    });
  }
};

module.exports = PlaylistServerActionCreators;
