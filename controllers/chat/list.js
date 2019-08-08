const asyncMiddleware = require('../../middleware/asyncMiddleware');

const list = ({ users, chats }) =>
  asyncMiddleware(async (req, res, next) => {
    let allchats = await chats.findAll({ include: [{ model: users }] });
    if (allchats.length === 0) return res.status(404).json({ message: 'Chats is empty' });
    res.status(200).json(allchats);
  });

module.exports = { list };
