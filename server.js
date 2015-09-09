'use strict';

const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const morgan = require('morgan');
const site = require('./app');
const bodyParser = require('body-parser');
const path = require('path');
let app = express();

const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV || 'development';

// Setup middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (environment === 'development') {
  console.log('Running in dev mode.');
}

// Setup redis connection info
const redisConf = require('./config/redis');
let redisClient = require('redis').createClient(redisConf.port, redisConf.host);
app.use(session({
  store: new RedisStore({ client: redisClient }),
  name: 'cloudmix.sid',
  secret: '8b9f1a13d558c663ad474fe69cd3a004387c008b',
  resave: false,
  saveUninitialized: true
}));

app.use('/api', require('bookshelf-jsonapi')(require('./models')));
app.use('/auth', require('./lib/auth'));
//app.use(site());

app.listen(port);
console.log('Magic happens on port ' + port);
