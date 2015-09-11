/*eslint-disable new-cap */

'use strict';

const express = require('express');
let router = express.Router();

module.exports = (models) => {
  router.post('/login', (req, res) => {
    const email = req.body.username;
    const pass = req.body.password;

    models.User.login(email, pass)
      .then(() => req.createUserSession())
      .then(() => res.redirect('/')
      .catch(() => {});
  });

  router.get('/logout', (req, res) => {
    req.destroyUserSession();
    res.redirect('/');
  });

  return router;
};
