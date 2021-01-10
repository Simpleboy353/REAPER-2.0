const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
    Role: {
       type: String,
       unique: true,
       required: true,
     },
    GuildID: {
       type: String,
       unique: true,
       required: true,
     },
});

const roleModel = module.exports = mongoose.model("autorole", roleSchema)
