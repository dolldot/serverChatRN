const asyncMiddleware = require('../../middleware/asyncMiddleware'),
  SECRET_KEY = 'kalem',
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const login = ({ users }) =>
  asyncMiddleware(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let email = req.body.email;
    let password = req.body.password;

    let user = await users.findOne({ where: { email: email } });

    if (!user) return res.status(404).json({ message: 'User not found, check your email!' });
    let pass = user.password;
    let datapass = bcrypt.compareSync(password, pass);
    if (!datapass) return res.status(401).json({ message: 'Password incorrect!' });

    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    res.status(200).json({ access_token: accessToken });
  });

module.exports = { login };
