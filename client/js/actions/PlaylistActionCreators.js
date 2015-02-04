'use strict';

var ActionTypes = require('../constants/CloudmixConstants.js').ActionTypes;
var AppDispatcher = require('../dispatchers/CloudmixAppDispatcher.js');

var PlaylistActionCreators = {
  addTrack: function(track) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.ADD_TRACK,
      track: track
    });
   },
   removeTrack: function(index) {
     AppDispatcher.handleViewAction({
       actionType: ActionTypes.REMOVE_TRACK,
       index: index
     });
   },
   reorderTrack: function(index) {
     AppDispatcher.handleViewAction({
       actionType: ActionTypes.REORDER_TRACK,
       index: index
     });
   }
};

module.exports = PlaylistActionCreators;
