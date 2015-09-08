'use strict';

var express = require('express');
var app = express();

module.exports = function() {
  app.get('/', require('./routes').index);

  return app;
};
