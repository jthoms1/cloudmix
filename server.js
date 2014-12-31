'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var port = process.env.PORT || 5858;
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
  connection: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.dbname
  }
});
var bookshelf = require('bookshelf')(knex);
// Require models
var models = require('./models')(bookshelf);


var api = require('./api')(models);
app.use('/api', api.router, api.responder);


app.route('/login')
.get(function(req, res) {
  res.send('this is the login form');
})
.post(function(req, res) {
  res.send('processing the login form!');
});


app.listen(port);
console.log('Magic happens on port ' + port);

