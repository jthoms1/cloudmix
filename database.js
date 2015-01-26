var dbConfig = require('./config/database');
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

module.exports = bookshelf;
