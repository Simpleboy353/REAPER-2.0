const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/bye");

module.exports = {
  name: "leavechannel",
  description: "Change the goodbye channel per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    if (!args[0]) {
      return message.channel.send("`Usage: =leavechannel <#channel|off>`")
    }
    if (message.mentions.channels.first()) {
    const data = await prefixModel.findOne({
      GuildID: message.guild.id
    });

    if (data) {
      await prefixModel.findOneAndRemove({
        GuildID: message.guild.id
      });

      message.channel.send(`Goodbye Channel set to ${message.mentions.channels.first()}`);

      let newData = new prefixModel({
        Bye: message.mentions.channels.first().id,
        GuildID: message.guild.id
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`Goodbye Channel set to ${message.mentions.channels.first()}`);

      let newData = new prefixModel({
        Bye: message.mentions.channels.first().id,
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

        message.channel.send(`Leave channel has been turned off!`);
      } else if (!data2) {
        return message.channel.send(`Leave channel isn't setup!`)
      }
    }
  }
}