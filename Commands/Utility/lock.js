const Discord = module.require("discord.js");

module.exports = {
  name: "lock",
  description: "Locks a Channel",
  userPerms: ["ManageChannels"],
  botPerms: ["EmbedLinks", "ManageChannels"],
  run: async (client, message, args) => {
      const role = message.guild.roles.cache.find(r => r.name === '@everyone')

      message.channel.permissionOverwrites.create(role, { SendMessages: false });

      const embed = new Discord.EmbedBuilder()
          .setTitle("Channel Updates")
          .setDescription(`🔒 ${message.channel} has been Locked`)
          .setColor("Random");
      await message.channel.send({ embeds: [embed] });
      message.delete();
  },
};
