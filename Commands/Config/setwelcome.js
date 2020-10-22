const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/welcome");

module.exports = {
  name: "setwelcome",
  description: "Change the welcome channel per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    const data = await prefixModel.findOne({
      GuildID: message.guild.id
    });

    if (!message.mentions.channels.first())
      return message.channel.send('Mention a channel!');

    if (data) {
      await prefixModel.findOneAndRemove({
        GuildID: message.guild.id
      });

      message.channel.send(`Welcome Channel set to ${message.mentions.channels.first()}`);

      let newData = new prefixModel({
        Welcome: message.mentions.channels.first().id,
        GuildID: message.guild.id
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`Welcome Channel set to ${message.mentions.channels.first()}`);

      let newData = new prefixModel({
        Welcome: message.mentions.channels.first().id,
        GuildID: message.guild.id
      });
      newData.save();
    }
  }
}