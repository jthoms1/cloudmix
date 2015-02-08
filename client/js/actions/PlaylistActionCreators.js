'use strict';

var PlaylistAction = require('../constants/Constants.js').Playlist;
var AppDispatcher = require('../dispatchers/Dispatcher.js');
var PlaylistUtils = require('../utils/PlaylistUtils.js');

var PlaylistActionCreators = {

  create(playlist) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.ADD_PLAYLIST,
      playlist: playlist
    });
    PlaylistUtils.create(playlist);
  },

  update(playlistId, playlist) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.UPDATE_PLAYLIST,
      playlistId: playlistId,
      playlist: playlist
    });
    PlaylistUtils.update(playlistId, playlist);
  },

  destroy(playlistId) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.REMOVE_PLAYLIST,
      playlistId: playlistId
    });
    PlaylistUtils.destroy(playlistId);
  },

  addSong(playlistId, songId) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.ADD_SONG,
      playlistId: playlistId,
      songId: songId
    });
    PlaylistUtils.createPlaylistSong(playlistId, songId);
  },

  removeSong(playlistId, songIndex) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.REMOVE_SONG,
      playlistId: playlistId,
      songIndex: songIndex
    });
    PlaylistUtils.destroyPlaylistSong(playlistId, songIndex);
  }
};

module.exports = PlaylistActionCreators;
