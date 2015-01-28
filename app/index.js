'use strict';

var path = require('path');
var express = require('express');
var app = express();
var reactViews = require('express-react-views');

app.set('view engine', 'js');
app.engine('js', reactViews.createEngine({
  jsx: {
    extension: '.js'
  }
}));
app.set('views', path.join(__dirname, '/views'));

module.exports = function () {

  app.get('/', require('./routes').index);
  app.get('/', function (req, res) {
    res.send('Why hello there.');
  });

  return app;
};
