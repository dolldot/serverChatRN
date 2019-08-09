const express = require('express');
const api = express.Router();

const { login } = require('./login');
const { register } = require('./register');

module.exports = models => {
  api.post('/login', login(models));
  api.post('/register', register(models));

  return api;
};
