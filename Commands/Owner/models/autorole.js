const mongoose = require('mongoose');

const AutoRoleSchema = new mongoose.Schema({
  Role: {
    type: String
  },
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('autorole', AutoRoleSchema);
