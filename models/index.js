'use strict';

var fs = require('fs');
var path = require('path');
var models = {};

// Find all models from the current directory
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  // Foreach model create a
  .forEach(function(file) {
    var ext = path.extname(file);
    var fileWithoutExt = file.slice(0, -ext.length);
    models[fileWithoutExt] = require(path.join(__dirname, fileWithoutExt));
  });

module.exports = models;
