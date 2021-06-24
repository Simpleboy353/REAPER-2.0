const mongoose = require('mongoose');

const LeaveMsgSchema = new mongoose.Schema({
  ByeMsg: {
    type: String
  },
  GuildID: String
});

const ByeModel = module.exports = mongoose.model('leavemsg', LeaveMsgSchema);
