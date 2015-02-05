'use strict';

var PlaylistAction = require('../constants/CloudmixConstants.js').Playlist;
var AppDispatcher = require('../dispatchers/CloudmixAppDispatcher.js');

var PlaylistActionCreators = {
  addTrack: function(track) {
    AppDispatcher.handleAction({
      actionType: PlaylistAction.ADD_TRACK,
      track: track
    });
   },
   removeTrack: function(index) {
     AppDispatcher.handleAction({
       actionType: PlaylistAction.REMOVE_TRACK,
       index: index
     });
   },

};

module.exports = PlaylistActionCreators;
