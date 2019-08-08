var jwt = require('jsonwebtoken');
const SECRET_KEY = 'kalem';

module.exports = (req, res, next) => {
  try {
    let header = req.headers['authorization'];
    if (typeof header === 'undefined') {
      return res.status(403).json({ message: 'FORBIDDEN' });
    }

    let token = header.split(' ')[1];
    jwt.verify(token, SECRET_KEY, function(err, decoded) {
      if (err) {
        return res.status(401).json({ message: 'Token Not Valid' });
      }
      res.locals.user = decoded.id;
      next();
    });
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
