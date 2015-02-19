'use strict';

let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

const CHANGE_EVENT = 'change';

let BaseStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

module.exports = BaseStore;
