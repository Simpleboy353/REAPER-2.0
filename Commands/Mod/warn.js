const Discord = module.require("discord.js");
const { measureText } = require("jimp");
const warns = require("../Owner/models/warns");
const { findOne } = require("../Owner/models/warns");
const warn = require("../Owner/models/warns")

module.exports = {
    name: "warn",
    description: "Warn a user for a disencouraging act!",
    run: async(client, message, args) => {
      if (!message.member.hasPermission("MANAGE_SERVER")) {
        return message.channel.send("You don't have enough Permissions!");
      }
      const target = message.mentions.members.first();
      if (!target) {
        return message.channel.send("You need to mention someone!");
      }
      const warnings = 1;
      const data = await findOne({
        GuildID: message.guild.id,
        UserID: target.id
      })
      if (data) {
         data.Warns += warnings
      }
      message.channel.send(`**${target.user.username}** has been warned! Total Warnings: **${data.Warns}**`)
      if (!data) {
        let newData = new warns({
          GuildID: message.guild.id,
          UserID: target.id,
          Warns: 1
        })
        message.channel.send(`**${target.user.username}** has been warned! Total Warnings: **${data.Warns}**`)
      }
    }
}