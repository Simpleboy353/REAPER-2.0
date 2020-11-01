const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/autorole");

module.exports = {
  name: "autorole",
  description: "Change autorole per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    if (!args[0]) {
      return message.channel.send(`\`Usage: =autorole <@role|off>\``)
    }
    if (message.mentions.roles.first()) {
      const data = await prefixModel.findOne({
        GuildID: message.guild.id
      });

      if (data) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id
        });

        message.channel.send(`Autorole is active and role set to ${message.mentions.roles.first()}`);

        let newData = new prefixModel({
          Role: message.mentions.roles.first().id,
          GuildID: message.guild.id
        });
        newData.save();
      } else if (!data) {
        message.channel.send(`Autorole is active and role set to ${message.mentions.roles.first()}`);

        let newData = new prefixModel({
          Role: message.mentions.roles.first().id,
          GuildID: message.guild.id
        });
        newData.save();
      }
    } else if (args[0] === "off") {
      const data2 = await prefixModel.findOne({
        GuildID: message.guild.id
      });

      if (data2) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id
        });

        return message.channel.send(`Autorole has been turned off!`);

      } else if (!data2) {
        return message.channel.send(`Autorole isn't setup!`)
      }
    }
  }
}