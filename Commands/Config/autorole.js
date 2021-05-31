const Discord = module.require("discord.js")
const roleData = require("../../database/guildData/autorole");

module.exports = {
  name: "autorole",
  description: "Change autorole per server!",
  permissions: "MANAGE_ROLES",
  botPermissions: "MANAGE_ROLES",
  args: "Yes",
  usage: "!autorole <Role|off>",
  aliases: ["ar", "joinrole"],
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
     return message.channel.send("You dont have enough Permissions!")
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I Don't have the `Manage Roles` Permission, required for Autorole!")
     }
    if (!args[0]) {
      return message.channel.send(`\`Usage: ${message.client.prefix}autorole <@role|off>\``)
    }
    if (message.mentions.roles.first()) {
      const data = await roleData.findOne({
        GuildID: message.guild.id
      });

      if (data) {
        await roleData.findOneAndRemove({
          GuildID: message.guild.id
        });

        message.channel.send(`Autorole is active and role set to ${message.mentions.roles.first()}`);

        let newData = new roleData({
          Role: message.mentions.roles.first().id,
          GuildID: message.guild.id
        });
        newData.save();
      } else if (!data) {
        message.channel.send(`Autorole is active and role set to ${message.mentions.roles.first()}`);

        let newData = new roleData({
          Role: message.mentions.roles.first().id,
          GuildID: message.guild.id
        });
        newData.save();
      }
    } else if (args[0] === "off") {
      const data2 = await roleData.findOne({
        GuildID: message.guild.id
      });

      if (data2) {
        await roleData.findOneAndRemove({
          GuildID: message.guild.id
        });

        return message.channel.send(`Autorole has been turned off!`);

      } else if (!data2) {
        return message.channel.send(`Autorole isn't setup!`)
      }
    }
  }
}