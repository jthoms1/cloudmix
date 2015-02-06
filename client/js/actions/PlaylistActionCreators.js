'use strict';

var PlaylistAction = require('../constants/Constants.js').Playlist;
var AppDispatcher = require('../dispatchers/Dispatcher.js');
var PlaylistUtils = require('../utils/PlaylistUtils.js');

var PlaylistActionCreators = {

  addPlaylistSong: function(playlist, song) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.ADD_TRACK,
      playlist: playlist,
      song: song
    });
    PlaylistUtils.addPlaylistSong(playlist, song);
  },

  removePlaylistSong: function(playlistSong) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.REMOVE_TRACK,
      playlistSong: playlistSong
    });
   PlaylistUtils.removePlaylistSong(playlistSong);
  }
};

module.exports = PlaylistActionCreators;
