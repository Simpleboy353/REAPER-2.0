const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/messages");

module.exports = {
  name: "messagelogs",
  description: "Change the messagelogs channel per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    if (!args[0]) {
      return message.channel.send("`Usage: =messagelogs <#channel|off>`")
    }
    if (message.mentions.channels.first()) {
    const data = await prefixModel.findOne({
      GuildID: message.guild.id
    });

    if (!message.mentions.channels.first())
      return message.channel.send('Mention a channel!');

    if (data) {
      await prefixModel.findOneAndRemove({
        GuildID: message.guild.id
      });

      message.channel.send(`Message Logs Channel set to ${message.mentions.channels.first()}`);

      let newData = new prefixModel({
        Message: message.mentions.channels.first().id,
        GuildID: message.guild.id
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`Message Logs Channel set to ${message.mentions.channels.first()}`);

      let newData = new prefixModel({
        Message: message.mentions.channels.first().id,
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

        return message.channel.send(`Message logs have been stopped!`);

      } else if (!data2) {
        return message.channel.send(`Message Logs aren't setup!`)
      }
    }
  }
}