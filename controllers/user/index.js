const express = require('express');
const api = express.Router();
const auth = require('../../middleware/authMiddleware');

const { get } = require('./get'),
  { list } = require('./list'),
  { update } = require('./update'),
  { remove } = require('./remove');

module.exports = models => {
  api.get('/', auth, get(models));
  api.get('/all', auth, list(models));
  api.put('/', auth, update(models));
  api.delete('/', auth, remove(models));

  return api;
};
