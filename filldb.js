'use strict';

var id3tagger = require('./id3');
var glob = require('glob');

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

glob('data/*.mp3', {}, function (err, files) {
  console.log(files, models);
});
