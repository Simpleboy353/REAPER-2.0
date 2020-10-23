const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/modlogs");

module.exports = {
  name: "modlogsoff",
  description: "Remove the messagelogs channel per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    const data = await prefixModel.findOne({
      GuildID: message.guild.id
    });

    if (data) {
      await prefixModel.findOneAndRemove({
        GuildID: message.guild.id
      });

      return message.channel.send(`Mod logs have been stopped!`);

    } else if (!data) {
      return message.channel.send(`Mod Logs aren't setup!`)
    }
  }
}