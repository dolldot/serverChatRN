const express = require('express'),
  router = express.Router(),
  db = require('../config/db'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  asyncMiddleware = require('../middleware/asyncMiddleware'),
  SECRET_KEY = 'kalem';

router.post(
  '/login',
  asyncMiddleware(async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await db.users.findOne({ where: { email: email } });

    if (!user) return res.status(404).json({ message: 'User not found, check your email!' });
    let pass = user.password;
    let datapass = bcrypt.compareSync(password, pass);
    if (!datapass) return res.status(401).json({ message: 'Password incorrect!' });

    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    res.status(200).json({ access_token: accessToken });
  })
);

router.get(
  '*',
  asyncMiddleware(async (req, res, next) => {
    res.status(403).json({ message: 'Please login or register' });
  })
);

module.exports = router;
