const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/messages");

module.exports = {
  name: "messagelogsoff",
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

      return message.channel.send(`Message logs have been stopped!`);

    } else if (!data) {
      return message.channel.send(`Message Logs aren't setup!`)
    }
  }
}