const asyncMiddleware = require('../../middleware/asyncMiddleware');

const create = ({ users, chats }) =>
  asyncMiddleware(async (req, res, next) => {
    let text = req.body.text;

    await chats.create({
      userId: res.locals.user,
      text: text
    });

    let chat = await chats.findAll({
      include: [{ model: users }]
    });
    res.status(201).json(chat);
  });

module.exports = { create };
