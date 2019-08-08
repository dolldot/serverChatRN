const express = require('express');
const { errorHandler } = require('../middleware/errorHandler');
const { users, chats } = require('../config/db');

const Auth = require('../controllers/auth');
const User = require('../controllers/user');
const Chat = require('../controllers/chat');

const models = { users, chats };
const router = express();

router.use('/auth', Auth(models));
router.use('/users', User(models));
router.use('/chats', Chat(models));

router.use(errorHandler);

module.exports = router;
