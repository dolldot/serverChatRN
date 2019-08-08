const asyncMiddleware = require('../../middleware/asyncMiddleware');

const list = ({ users }) =>
  asyncMiddleware(async (req, res, next) => {
    let allusers = await users.findAll();
    if (allusers.length === 0) return res.status(404).json({ message: 'Users is empty' });
    res.status(200).json(allusers);
  });

module.exports = { list };
