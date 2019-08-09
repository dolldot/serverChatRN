const asyncMiddleware = require('../../middleware/asyncMiddleware');

const get = ({ users }) =>
  asyncMiddleware(async (req, res, next) => {
    let user = await users.scope('withoutPassword').findOne({
      where: { id: res.locals.user }
    });
    if (user.length === 0) return res.status(404).json({ message: 'Users is empty' });
    res.status(200).json(user);
  });

module.exports = { get };
