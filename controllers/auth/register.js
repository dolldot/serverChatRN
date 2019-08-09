const asyncMiddleware = require('../../middleware/asyncMiddleware'),
  SECRET_KEY = 'kalem',
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const register = ({ users }) =>
  asyncMiddleware(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let username = req.body.username;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password);

    let user = await users.findOne({ where: { email: email } });

    if (!user) {
      let newUser = await users.create({
        username: username,
        email: email,
        password: password
      });

      const accessToken = jwt.sign({ id: newUser.id }, SECRET_KEY);
      return res.status(201).json({ access_token: accessToken });
    }
    res.status(400).json({ message: 'Email has been registered' });
  });

module.exports = { register };
