const Discord = module.require("discord.js")
const joinModel = require("../../database/guildData/joinmsg");

module.exports = {
  name: "joinmessage",
  description: "Change the welcome message per server!",
  aliases: ["joinmsg", "welcomemsg", "jmsg"],
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You dont have enough Permissions!")
    }
    const text = args.join(" ");
    if (!args[0]) {
      return message.channel.send(`\`Usage: ${message.client.prefix}joinmessage <Text|off>\``)
    }
    if (text !== "off") {
      const data = await joinModel.findOne({
        GuildID: message.guild.id
      });

      if (data) {
        await joinModel.findOneAndRemove({
          GuildID: message.guild.id
        });
        let newData = new joinModel({
          JoinMsg: args.join(" "),
          GuildID: message.guild.id
        });
        newData.save();
        message.channel.send(`Join Message set to ${newData.JoinMsg}`);

      } else if (!data) {

        let newData = new joinModel({
          JoinMsg: args.join(" "),
          GuildID: message.guild.id
        });
        newData.save();
        message.channel.send(`Join Message set to ${newData.JoinMsg}`);

      }
    } else if (text === "off") {
      const data2 = await joinModel.findOne({
        GuildID: message.guild.id
      });

      if (data2) {
        await joinModel.findOneAndRemove({
          GuildID: message.guild.id
        });

        return message.channel.send(`Join Message has been turned off!`);

      } else if (!data2) {
        return message.channel.send(`Join Message isn't setup!`)
      }
    }
  }
}
