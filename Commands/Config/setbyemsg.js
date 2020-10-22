const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/bye");

module.exports = {
  name: "setbyemsg",
  description: "Change the goodbye message per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    const data = await prefixModel.findOne({
      GuildID: message.guild.id
    });
    const msg = args.join(" ");
    if (!msg)
      return message.channel.send('Enter a message');

    if (data) {
      await prefixModel.findOneAndUpdate({
        ByeMsg: args.join(" "),
        GuildID: message.guild.id
      });

     return  message.channel.send(`Goodbye Message set to ${msg}`);

    } else if (!data) {
      let newData = new prefixModel({
        ByeMsg: args.join(" "),
        GuildID: message.guild.id
      });
      newData.save();

     return  message.channel.send(`Goodbye Message set to ${msg}`);

    }
  }
}