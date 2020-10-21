const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/welcome");

module.exports = {
  name: "setjoinmsg",
  description: "Change the welcome message per server!",
  run: async (client, message, args) => {
    const data = await prefixModel.findOne({
      GuildID: message.guild.id
    });

    const msg = args.join(" ");
    if (!msg)
      return message.channel.send('You need to enter a message');

    if (data) {
      await prefixModel.findOneAndRemove({
        GuildID: message.guild.id
      });

      message.channel.send(`Welcome Channel set to ${msg}!`);

      let newData = new prefixModel({
        WelcomeMsg: args.join(" "),
        GuildID: message.guild.id
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`Welcome Message set to ${msg}!`);

      let newData = new prefixModel({
        WelcomeMsg: args.join(" "),
        GuildID: message.guild.id
      });
      newData.save();
    }
  }
}