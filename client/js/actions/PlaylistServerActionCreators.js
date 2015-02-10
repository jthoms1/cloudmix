'use strict';

var ServerAction = require('../constants/Constants.js').Server;
var AppDispatcher = require('../dispatchers/Dispatcher.js');

var PlaylistServerActionCreators = {

  /**
   * @param {array} playlists Array of all playlists
   */
  receiveAllPlaylists(playlists) {
    AppDispatcher.handleAction({
      actionType: ServerAction.RECEIVE_ALL_PLAYLISTS,
      playlists: playlists
    });
  },

  /**
   * @param {array} playlists Array of all playlists
   */
  receiveCreatedPlaylists(playlists) {
    AppDispatcher.handleAction({
      actionType: ServerAction.RECEIVE_CREATED_PLAYLISTS,
      playlists: playlists
    });
  },

  /**
   * @param {array} playlists Array of all playlists
   */
  receiveUpdatedPlaylists(playlists) {
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
