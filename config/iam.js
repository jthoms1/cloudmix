'use strict';

var User = require('../models/user');

module.exports = function (iam) {
  iam.getUserToken(function(user, cb) {
    var token = {
      id: user.id
    };

    cb(undefined, token);
  });

  iam.getUserFromToken(function(token, cb) {
    var attrs = {
      id: token.id
    };

    new User(attrs)
      .fetch()
      .then(function(user) {
          cb(null, user);
        })
        .catch(cb);
  });
};
