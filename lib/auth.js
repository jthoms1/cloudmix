/*eslint-disable new-cap */

'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(models) {
  router.post('/login', function (req, res) {
    var email = req.body.username;
    var pass = req.body.password;

    models.User.login(email, pass)
      .then(function () {
        return req.createUserSession();
      })
      .then(function () {
        res.redirect('/');
      })
      .catch(function() {
      });
  });
  router.get('/logout', function (req, res) {
    req.destroyUserSession();
    res.redirect('/');
  });
};
