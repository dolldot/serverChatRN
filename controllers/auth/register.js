const asyncMiddleware = require('../../middleware/asyncMiddleware'),
  SECRET_KEY = 'kalem',
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs');

const register = ({ users }) =>
  asyncMiddleware(async (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password);

    let newUser = await users.create({
      username: username,
      email: email,
      password: password
    });

    const accessToken = jwt.sign({ id: newUser.id }, SECRET_KEY);
    res.status(201).json({ access_token: accessToken });
  });

module.exports = { register };
