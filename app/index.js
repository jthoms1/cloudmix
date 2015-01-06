'use strict';

var express = require('express');
var app = express();

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

module.exports = function (models) {
  console.log(models);

  app.get('/', require('./routes').index);

  return app;
};
