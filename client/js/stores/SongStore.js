'use strict';

let AppDispatcher = require('../dispatchers/CloudmixAppDispatcher');
let ActionTypes = require('../constants/CloudmixConstants').ActionTypes;
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');
let List = require('immutable').List;

const CHANGE_EVENT = 'change';

let _catalog = List([
  {id: 1, title: 'Song 1'},
  {id: 2, title: 'Song 2'},
  {id: 3, title: 'Song 3'},
  {id: 4, title: 'Song 4'},
  {id: 5, title: 'Song 5'},
  {id: 6, title: 'Song 6'}
]);
let _playlistTracks = List([
  {id: 4, title: 'Song 4'},
  {id: 5, title: 'Song 5'},
  {id: 6, title: 'Song 6'}
]);

function _removeTrack(index) {
  _playlistTracks = _playlistTracks.splice(index, 1);
}

function _reorderTrack() {

}

function _addTrack(track) {
  if (_playlistTracks.findIndex(track) === -1) {
    _playlistTracks = _playlistTracks.push(track);
  }
}


let SongStore = assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getTracks() {
    return _playlistTracks;
  },

  getCatalog() {
    return _catalog;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action; // this is our action from handleViewAction
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
    SongStore.emitChange();

    return true;
  })
});

module.exports = SongStore;
