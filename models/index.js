'use strict';

var fs = require('fs');
var path = require('path');
var inflection = require('inflection');
inflection.lowerize = function (str) {
  return str.substring( 0, 1 ).toLowerCase() + str.substring( 1 );
};

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
    var resourceName = inflection.transform(fileWithoutExt, ['pluralize', 'camelize', 'lowerize']);
    models[resourceName] = require(path.join(__dirname, fileWithoutExt));
  });

module.exports = models;
