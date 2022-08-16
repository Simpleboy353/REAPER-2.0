
const roleData = require("../../database/guildData/autorole");

module.exports = {
  name: "autorole",
  description: "Change autorole per server!",
  args: "Yes",
  usage: "!autorole <Role|off>",
  aliases: ["ar", "joinrole"],
  userPerms: ["ManageRoles"],
  botPerms: ["ManageRoles"],

  run: async (client, message, args) => {
   
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