const asyncMiddleware = require('../../middleware/asyncMiddleware');

const remove = ({ chats }) =>
  asyncMiddleware(async (req, res, next) => {
    let id = req.params.id;

    let chat = await chats.findOne({
      where: { id: id }
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    await chat.destroy();
    res.status(200).json({ message: 'deleted' });
  });

module.exports = { remove };
