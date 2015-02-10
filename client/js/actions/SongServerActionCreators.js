'use strict';

var ServerAction = require('../constants/Constants.js').SongServer;
var AppDispatcher = require('../dispatchers/Dispatcher.js');

var SongServerActionCreators = {

  /**
    * @param {array} playlists Array of all playlists
    */
  receiveAllSongs(songs) {
    AppDispatcher.handleAction({
      actionType: ServerAction.RECEIVE_ALL_SONGS,
      songs: songs
    });
  }
};

module.exports = SongServerActionCreators;
