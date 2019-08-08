const asyncMiddleware = require('../../middleware/asyncMiddleware');

const user = ({ users, chats }) =>
  asyncMiddleware(async (req, res, next) => {
    let allchats = await chats.findAll({
      include: [{ model: users.scope('withoutPassword') }],
      where: { userId: res.locals.user }
    });
    if (allchats.length === 0)
      return res.status(404).json({ message: 'User is not post any chat yet' });
    res.status(200).json(allchats);
  });

module.exports = { user };
