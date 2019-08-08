const express = require('express');
const api = express.Router();

const { login } = require('./login');

module.exports = models => {
  api.post('/login', login(models));

  return api;
};
