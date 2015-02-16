'use strict';

var express = require('express');
var app = express();
require('node-jsx').install();

module.exports = function() {
  app.get('/', require('./routes').index);

  return app;
};
