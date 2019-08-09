const express = require('express');
const api = express.Router();
const { check } = require('express-validator');

const { login } = require('./login');
const { register } = require('./register');

module.exports = models => {
  api.post('/login', [check('email').isEmail()], login(models));
  api.post(
    '/register',
    [
      check('username').isLength({ min: 3 }),
      check('email').isEmail(),
      check('password').isLength({ min: 4 })
    ],
    register(models)
  );

  return api;
};
