const asyncMiddleware = require('../../middleware/asyncMiddleware');

const update = ({ users, chats }) =>
  asyncMiddleware(async (req, res, next) => {
    let id = req.params.id;
    let text = req.body.text;

    let update = await chats.update(
      {
        userId: res.locals.user,
        text: text
      },
      { where: { id: id } }
    );

    if (update[0] === 0)
      return res.status(404).json({ message: 'Update failed, Cannot find any chat with given id' });

    let chat = await chats.findOne({
      include: [{ model: users }],
      where: { id: id }
    });
    res.status(200).json(chat);
  });

module.exports = { update };
