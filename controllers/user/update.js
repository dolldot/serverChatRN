const asyncMiddleware = require('../../middleware/asyncMiddleware');

const update = ({ users }) =>
  asyncMiddleware(async (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let update = await users.update(
      {
        username: username,
        email: email,
        password: password
      },
      { where: { id: res.locals.user } }
    );

    if (update[0] === 0) return res.status(401).json({ message: 'Unauthorized' });

    let user = await users.findOne({
      where: { id: res.locals.user }
    });
    res.status(200).json(user);
  });

module.exports = { update };
