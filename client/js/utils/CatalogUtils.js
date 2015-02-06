'use strict';

let CatalogActionCreators = require('../actions/CatalogActionCreators');
let API = require('./ApiUtils');

module.exports = {
  getCatalog() {
    API.get('songs', {
        'include': ['album.artist'].join(),
        'limit': 0
      })
      .then(function (catalogList) {
        CatalogActionCreators.receiveAll(catalogList);
      });
  }
};
