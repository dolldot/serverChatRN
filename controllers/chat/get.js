const asyncMiddleware = require('../../middleware/asyncMiddleware');

const get = ({ users, chats }) =>
  asyncMiddleware(async (req, res, next) => {
    let id = req.params.id;

    let chat = await chats.findOne({
      include: [{ model: users.scope('withoutPassword') }],
      where: { id: id }
    });
    if (!chat) return res.status(404).json({ message: 'Cannot find any chat with given id' });
    res.status(200).json(chat);
  });

module.exports = { get };
