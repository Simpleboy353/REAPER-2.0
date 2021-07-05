const prefixModel = require("../../database/guildData/antilink");

module.exports = {
  name: "antilink",
  description: "Setup antilink per server!",
  userPerms: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send(
        `Usage: \`${message.client.prefix}antilink <on|off>\``
      );
    }
    if (args[0] === "On" || args[0] === "on") {
      const data = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (data) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });

        message.channel.send(`Antilink is now active!`);

        let newData = new prefixModel({
          GuildID: message.guild.id,
        });
        newData.save();
      } else if (!data) {
        message.channel.send(`Antilink is now active`);

        let newData = new prefixModel({
          GuildID: message.guild.id,
        });
        newData.save();
      }
    } else if (args[0] === "off" || args[0] === "Off") {
      const data2 = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (data2) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });

        return message.channel.send(`Antilink has been turned off!`);
      } else if (!data2) {
        return message.channel.send(`Antilink isn't setup!`);
      }
    }
  },
};
