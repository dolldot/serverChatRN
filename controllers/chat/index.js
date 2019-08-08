const express = require('express');
const api = express.Router();
const auth = require('../../middleware/authMiddleware');

const { get } = require('./get'),
  { list } = require('./list'),
  { update } = require('./update'),
  { create } = require('./create'),
  { remove } = require('./remove');

module.exports = models => {
  api.get('/:id', auth, get(models));
  api.get('/', auth, list(models));
  api.post('/', auth, create(models));
  api.put('/:id', auth, update(models));
  api.delete('/:id', auth, remove(models));

  return api;
};
