var AppDispatcher = require('../dispatchers/CloudmixAppDispatcher');
var ActionTypes = require('../constants/CloudmixConstants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var lodash = require('lodash');

var CHANGE_EVENT = "change";

var _catalog = [
  {id:1, title: 'Song 1'},
  {id:2, title: 'Song 2'},
  {id:3, title: 'Song 3'},
  {id:4, title: 'Song 4'},
  {id:5, title: 'Song 5'},
  {id:6, title: 'Song 6'}
];
var _playlistTracks = [
  {id:4, title: 'Song 4'},
  {id:5, title: 'Song 5'},
  {id:6, title: 'Song 6'}
];

function _removeTrack(index) {
  _playlistTracks.splice(index, 1);
}

function _reorderTrack(index) {
  _playlistTracks[index].qty++;
}

function _addTrack(track) {
  if (lodash.findIndex(_playlistTracks, track) === -1) {
    _playlistTracks.push(track);
  }
}


var PlaylistStore = assign(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getTracks: function() {
    return _playlistTracks;
  },

  getCatalog: function () {
    return _catalog;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action; // this is our action from handleViewAction
    switch (action.actionType) {
    case ActionTypes.ADD_TRACK:
      _addTrack(payload.action.track);
      break;

    case ActionTypes.REMOVE_TRACK:
      _removeTrack(payload.action.index);
      break;

    case ActionTypes.REORDER_TRACK:
      _reorderTrack(payload.action.index);
      break;
    }
    PlaylistStore.emitChange();

    return true;
  })
});

module.exports = PlaylistStore;
