'use strict';

var express = require('express');
var session = require('express-session');
var morgan = require('morgan');
var billyapi = require('./api');
var site = require('./app');
var bodyParser = require('body-parser');
var path = require('path');
var iam = require('iam');
var app = express();
var port = process.env.PORT || 8080;
var environment = process.env.NODE_ENV || 'development';

// Setup middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  name: 'cloudmix.sid',
  secret: '8b9f1a13d558c663ad474fe69cd3a004387c008b',
  resave: false,
  saveUninitialized: true
}));

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

iam.configure(require('./config/iam')(models));
app.use(iam.middleware());
app.use('/api', billyapi(models));
app.use(site(models));
app.get('/login', function (req, res) {
});

app.listen(port);
console.log('Magic happens on port ' + port);

