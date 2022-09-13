const Discord = module.require("discord.js");
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: "unlock",
  description: "Unlocks a Channel",
  userPerms: ["ManageChannels"],
  botPerms: ["EmbedLinks", "ManageChannels", "ManageMessages"],
  run: async (client, message, args) => {
      const role = message.guild.roles.cache.find(r => r.name === '@everyone')

      message.channel.permissionOverwrites.create(role, { SendMessages: true });

      const embed = new Discord.EmbedBuilder()
          .setTitle("Channel Updates")
          .setDescription(`🔓 ${message.channel}  has been Unlocked`)
          .setColor("Random");
      await message.channel.send({ embeds: [embed] });
      message.delete();
  },
};
