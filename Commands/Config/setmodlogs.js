const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/modlogs");

module.exports = {
  name: "setmodlogs",
  description: "Change the modlogs channel per server!",
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

      message.channel.send(`Mod Logs Channel set to ${message.mentions.channels.first()}`);

      let newData = new prefixModel({
        Mod: message.mentions.channels.first().id,
        GuildID: message.guild.id
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`Mod Logs Channel set to ${message.mentions.channels.first()}`);

      let newData = new prefixModel({
        Mod: message.mentions.channels.first().id,
        GuildID: message.guild.id
      });
      newData.save();
    }
  }
}