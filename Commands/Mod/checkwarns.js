const Discord = module.require("discord.js");
const warnData = require("../Owner/models/warns")

module.exports  = {
  name: "checkwarns",
  description: "Check the mentioned User's Warn Count",
  run: async(client, message, args) => {
    let user = message.mentions.members.first();
    if (!user) {
      return message.channel.send("Mention Someone")
    }
    let data = await warnData.findOne({
      UserID: user.id,
      GuildID: message.guild.id
    })
    if (data) {
      message.channel.send(`**${message.mentions.members.first().username}** has ${data.Warns} warnings!`)
    }
    if (!data) {
      message.channel.send(`**${message.mentions.members.first().username}** has no warnings!`)
    }
  }
}