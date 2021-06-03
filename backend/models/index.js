const User = require('./user');
const Message = require('./message');
const Img = require('./image');
const Comment = require('./comment');

async function loadModel() {
  await User.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null)
  await User.sync({force:true});
  await Message.sync({force:true});
  await Comment.sync({force:true});
  await Img.sync({force: true});
  await User.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null)
};
// loadModel();

module.exports = {User, Message, Img, Comment};