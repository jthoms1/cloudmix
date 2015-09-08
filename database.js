var BPromise = require('bluebird');
var dbConfig = require('./config/database');
var knex = require('knex')({
  client: 'pg',
  debug: true,
  connection: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.dbname
  },
  pool: {
    afterCreate: function(connection, callback) {
      var command = 'SET SESSION SCHEMA \'' + dbConfig.schema + '\';';
      BPromise.promisify(connection.query, connection)(command, [])
        .then(function() {
          callback(null, connection);
        });
    }
  }
});

module.exports = require('bookshelf')(knex);
