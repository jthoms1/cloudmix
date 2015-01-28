'use strict';

var AppConstants = require('../constants/CloudmixConstants.js');
var AppDispatcher = require('../dispatchers/CloudmixAppDispatcher.js');

var AppActions = {
  addTrack: function(track) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_TRACK,
      track: track
    });
   },
   removeTrack: function(index) {
     AppDispatcher.handleViewAction({
       actionType: AppConstants.REMOVE_TRACK,
       index: index
     });
   },
   reorderTrack: function(index) {
     AppDispatcher.handleViewAction({
       actionType: AppConstants.REORDER_TRACK,
       index: index
     });
   }
};

module.exports = AppActions;
