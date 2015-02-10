'use strict';

var PlaylistAction = require('../constants/Constants.js').Playlist;
var AppDispatcher = require('../dispatchers/Dispatcher.js');
var PlaylistUtils = require('../utils/PlaylistUtils.js');

var PlaylistActionCreators = {

  /**
    * @param {string} playlistId The unique id of the playlist object
    * @param {integer} songInex The unique id of the song object
    */
  create(playlist) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.ADD_PLAYLIST,
      playlist: playlist
    });
    PlaylistUtils.create(playlist);
  },

  /**
    * @param {string} playlistId The unique id of the playlist object
    * @param {integer} songInex The unique id of the song object
    */
  update(playlistId, playlist) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.UPDATE_PLAYLIST,
      playlistId: playlistId,
      playlist: playlist
    });
    PlaylistUtils.update(playlistId, playlist);
  },

  /**
    * @param {string} playlistId The unique id of the playlist object
    * @param {integer} songInex The unique id of the song object
    */
  destroy(playlistId) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.REMOVE_PLAYLIST,
      playlistId: playlistId
    });
    PlaylistUtils.destroy(playlistId);
  },

  /**
    * @param {string} playlistId The unique id of the playlist object
    * @param {integer} songInex The unique id of the song object
    */
  addSong(playlistId, songId) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.ADD_PLAYLIST_SONG,
      playlistId: playlistId,
      songId: songId
    });
    PlaylistUtils.createPlaylistSong(playlistId, songId);
  },

  /**
    * @param {string} playlistId The unique id of the playlist object
    * @param {integer} songInex The unique id of the song object
    */
  removeSong(playlistId, songIndex) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.REMOVE_PLAYLIST_SONG,
      playlistId: playlistId,
      songIndex: songIndex
    });
    PlaylistUtils.destroyPlaylistSong(playlistId, songIndex);
  }
};

module.exports = PlaylistActionCreators;
