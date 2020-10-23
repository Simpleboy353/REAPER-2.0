const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/welcome");

module.exports = {
  name: "welcomeoff",
  description: "Remove the welcome channel per server!",
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

      return message.channel.send(`Welcome logs have been stopped!`);

    } else if (!data) {
      return message.channel.send(`Welcome Logs aren't setup!`)
    }
  }
}