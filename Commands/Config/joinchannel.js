const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/welcome");

module.exports = {
  name: "joinchannel",
  description: "Change the welcome channel per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    if (!args[0]) {
      return message.channel.send(`\`Usage: =joinchannel <#channel|off>\``)
    }
    if (message.mentions.channels.first()) {
    const data = await prefixModel.findOne({
      GuildID: message.guild.id
    });

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
  } else if (args[0] === "off") {
      const data2 = await prefixModel.findOne({
        GuildID: message.guild.id
      });

      if (data2) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id
        });

        return message.channel.send(`Join channel has been turned off!`);

      } else if (!data2) {
        return message.channel.send(`Join channel isn't setup!`)
      }
    }
  }
}