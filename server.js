'use strict';

var express = require('express');
var morgan = require('morgan');
var billyapi = require('./api');
var site = require('./app');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var port = process.env.PORT || 8080;
var environment = process.env.NODE_ENV || 'development';

// Setup middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (environment === 'development') {
  console.log('Running in dev mode.');
}

// Setup database connection info
var dbConfig = require('./config/dbc.json');
var knex = require('knex')({
  client: 'pg',
  debug: true,
  connection: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.dbname
  }
});
var bookshelf = require('bookshelf')(knex);
var models = require('./models')(bookshelf);

app.use('/api', billyapi(models));
app.use(site(models));

app.listen(port);
console.log('Magic happens on port ' + port);

