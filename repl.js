'use strict';

var repl = require('repl');
var util = require('util');
var db = require('./models');
var moment = require('moment');
var promisify = require('repl-promised').promisify;

var envName = process.env.NODE_ENV || 'dev';

// open the repl session
var replServer = repl.start({
  prompt: 'Cloudmix (' + envName + ') > '
});

// attach my modules to the repl context
replServer.context.db = db;
replServer.context.moment = moment;
replServer.context.tovalue = (value) =>
  console.log(util.inspect(value.toJSON(), {
    depth: null,
    colors: true
  }));
promisify(replServer);
