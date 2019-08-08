const asyncMiddleware = require('../../middleware/asyncMiddleware');

const remove = ({ users }) =>
  asyncMiddleware(async (req, res, next) => {
    await users.destroy({
      where: { id: res.locals.user }
    });

    res.status(200).json({ message: 'Deleted user and all its chats' });
  });

module.exports = { remove };
