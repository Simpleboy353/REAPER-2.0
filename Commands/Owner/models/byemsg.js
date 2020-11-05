const mongoose = require('mongoose');

const ByeMsgSchema = new mongoose.Schema({
  ByeMsg: {
    type: String
  },
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('byemsg', ByeMsgSchema);
