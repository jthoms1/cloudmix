'use strict';

var path = require('path');
var express = require('express');
var app = express();

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.set('views', path.join(__dirname, '/views'));

module.exports = function () {

  app.get('/', require('./routes').index);
  app.get('/', function (req, res) {
    res.send('Why hello there.');
  });

  return app;
};
