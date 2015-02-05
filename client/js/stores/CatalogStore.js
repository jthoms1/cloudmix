'use strict';

let BaseStore = require('./BaseStore');
let API = require('../util/API');
let assign = require('object-assign');
let List = require('immutable').List;

let _catalog = List([]);

let CatalogStore = assign(BaseStore.prototype, {
  setCatalog(catalog) {
    _catalog = List(catalog);
  },
  getCatalog() {
    let self = this;

    if (_catalog.length) {
      return _catalog;
    }

    API.list('songs').then(function(catalog) {
      _catalog = List(catalog);
      self.emitChange();
    });

    return null;
  }
});

module.exports = CatalogStore;
