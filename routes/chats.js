const express = require('express'),
  router = express.Router(),
  db = require('../config/db'),
  asyncMiddleware = require('../middleware/asyncMiddleware'),
  authMiddleware = require('../middleware/authMiddleware');

router.get(
  '/',
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    let chats = await db.chats.findAll({ include: [{ model: db.users }] });
    if (chats.length === 0) return res.status(404).json({ message: 'Chats is empty' });
    res.status(200).json(chats);
  })
);

router.get(
  '/user/:id',
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    let id = req.params.id;

    let chats = await db.chats.findAll({
      include: [{ model: db.users }],
      where: { userId: id }
    });
    if (chats.length === 0)
      return res.status(404).json({ message: 'User is not post any chat yet' });
    res.status(200).json(chats);
  })
);

router.get(
  '/:id',
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    let id = req.params.id;

    let chats = await db.chats.findOne({
      include: [{ model: db.users }],
      where: { id: id }
    });
    if (!chats) return res.status(404).json({ message: 'Cannot find any chat with given id' });
    res.status(200).json(chats);
  })
);

router.post(
  '/',
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    let text = req.body.text;

    await db.chats.create({
      userId: res.locals.user,
      text: text
    });

    let chats = await db.chats.findAll({
      include: [{ model: db.users }]
    });
    res.status(201).json(chats);
  })
);

router.put(
  '/:id',
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    let id = req.params.id;
    let text = req.body.text;

    let update = await db.chats.update(
      {
        userId: res.locals.user,
        text: text
      },
      { where: { id: id } }
    );

    if (update[0] === 0)
      return res.status(404).json({ message: 'Update failed, Cannot find any chat with given id' });

    let chat = await db.chats.findOne({
      include: [{ model: db.users }],
      where: { id: id }
    });
    res.status(200).json(chat);
  })
);

router.delete(
  '/:id',
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    let id = req.params.id;

    let chat = await db.chats.findOne({
      where: { id: id }
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    await chat.destroy();
    res.status(200).json({ message: 'deleted' });
  })
);

router.get(
  '*',
  asyncMiddleware(async (req, res, next) => {
    res.status(403).json({ message: 'Please login or register' });
  })
);

module.exports = router;
