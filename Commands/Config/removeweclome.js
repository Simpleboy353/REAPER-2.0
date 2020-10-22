const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/welcome");

module.exports = {
  name: "removewelcome",
  description: "Remove the welcome channel per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    const data = await prefixModel.findOne({
      GuildID: message.guild.id
    });

    if (data) {
      await prefixModel.findOneAndUpdate({
        State: "No",
        GuildID: message.guild.id
      });

      message.channel.send(`Welcome logs have been stopped!`);

      let newData = new prefixModel({
        State: "No",
        GuildID: message.guild.id
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`Welcome logs have been stopped!`);

      let newData = new prefixModel({
        State: "No",
        GuildID: message.guild.id
      });
      newData.save();
    }
  }
}