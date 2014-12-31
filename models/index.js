'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(bookshelf) {

  var models = {};

  // Find all models from the current directory
  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    // Foreach model create a
    .forEach(function(file) {
      require(path.join(__dirname, file))(bookshelf, models);
    });

  return models;
};
