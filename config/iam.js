'use strict';

module.exports = function(models) {
  return function (iam) {
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

      new models.User(attrs)
        .fetch()
        .then(function(user) {
            cb(null, user);
          })
          .catch(cb);
    });
  };
};
