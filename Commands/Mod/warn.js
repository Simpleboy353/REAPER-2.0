const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/warns");

module.exports = {
  name: "warn",
  description: "Change the prefix per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_SERVER")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    const target = message.mentions.members.first();
    if (!target) {
      return message.channel.send("Mention a user!")
    }
    const data = await prefixModel.findOne({
      UserID: target.id,
      GuildID: message.guild.id,
    });

    if (data) {
      data.Warns +=1
      data.save();
      message.channel.send(`**${target.user.username}** has been warned! Total Warnings: ${data.Warns}`);
    } else if (!data) {
      let newData = new prefixModel({
        Warns: 1,
        UserID: target.id,
        GuildID: message.guild.id,
      });
      newData.save();
      message.channel.send(`**${target.user.username}** has been warned!`)
    }
  }
}