const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/bye");

module.exports = {
  name: "leavemessage",
  description: "Change the leave message per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    const text = args.join(" ");
    if (!args[0]) {
      return message.channel.send(`\`Usage: =leavemessage <Text|off>\``)
    }
    if (text) {
      const data = await prefixModel.findOne({
        GuildID: message.guild.id
      });

      if (data) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id
        });
        let newData = new prefixModel({
          ByeMsg: args.join(" "),
          GuildID: message.guild.id
        });
        newData.save();
        message.channel.send(`Leave Message set to \n${data.ByeMsg}`);

      } else if (!data) {

        let newData = new prefixModel({
          ByeMsg: args.join(" "),
          GuildID: message.guild.id
        });
        newData.save();
        message.channel.send(`Leave Message set to \n${data.ByeMsg}`);

      }
    } else if (args[0] === "off") {
      const data2 = await prefixModel.findOne({
        GuildID: message.guild.id
      });

      if (data2) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id
        });

        return message.channel.send(`Leave Message has been turned off!`);

      } else if (!data2) {
        return message.channel.send(`Leave Message isn't setup!`)
      }
    }
  }
}