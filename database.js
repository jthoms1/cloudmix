const BPromise = require('bluebird');
const dbConfig = require('./config/database');
const knex = require('knex')({
  client: 'pg',
  debug: true,
  connection: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.dbname
  },
  pool: {
    afterCreate: (connection, callback) => {
      let command = 'SET SESSION SCHEMA \'' + dbConfig.schema + '\';';
      BPromise.promisify(connection.query, connection)(command, [])
        .then(() => callback(null, connection));
    }
  }
});

module.exports = require('bookshelf')(knex);
