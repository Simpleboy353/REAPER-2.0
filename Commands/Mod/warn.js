const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/warns");

module.exports = {
  name: "warn",
  description: "Warn Users And Add their warnings everytime they are warned!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_SERVER")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    const target = message.mentions.members.first();
    if (!target) {
      return message.channel.send("Mention a user!")
    }
    let warnadd = 1;
    const data = await prefixModel.findOne({
      UserID: target.id,
      GuildID: message.guild.id,
    });

    if (data) {
      let newwarns = data.Warns+=1
      const warndata = await prefixModel.findOneAndUpdate({
      Warns: newwarns
      })
      warndata.save();
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