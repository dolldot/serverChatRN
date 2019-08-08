const express = require('express'),
  router = express.Router(),
  db = require('../config/db'),
  asyncMiddleware = require('../middleware/asyncMiddleware'),
  authMiddleware = require('../middleware/authMiddleware');

router.get(
  '/all',
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    let users = await db.users.findAll();
    if (users.length === 0) return res.status(404).json({ message: 'Users is empty' });
    res.status(200).json(users);
  })
);

router.get(
  '/',
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    let user = await db.users.findOne({
      where: { id: res.locals.user }
    });
    res.status(200).json(user);
  })
);

router.put(
  '/',
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let update = await db.users.update(
      {
        username: username,
        email: email,
        password: password
      },
      { where: { id: res.locals.user } }
    );

    if (update[0] === 0) return res.status(401).json({ message: 'Unauthorized' });

    let user = await db.users.findOne({
      where: { id: res.locals.user }
    });
    res.status(200).json(user);
  })
);

router.delete(
  '/',
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    await db.users.destroy({
      where: { id: res.locals.user }
    });

    res.status(200).json({ message: 'Deleted user and all its chats' });
  })
);

router.get(
  '*',
  asyncMiddleware(async (req, res, next) => {
    res.status(403).json({ message: 'Please login or register' });
  })
);

module.exports = router;
