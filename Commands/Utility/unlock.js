const Discord = module.require("discord.js");

module.exports = {
  name: "unlock",
  description: "Unlocks a Channel",
  userPerms: ["ManageChannels"],
  botPerms: ["EmbedLinks", "ManageChannels", "ManageMessages"],
  run: async (client, message, args) => {
    message.channel.overwritePermissions([
      {
        id: message.guild.id,
        null: ["SEND_MESSAGES"],
      },
    ]);
    const embed = new Discord.EmbedBuilder()
      .setTitle("Channel Updates")
      .setDescription(`🔓 ${message.channel}  has been Unlocked`)
      .setColor("Random");
    await message.channel.send({ embeds: [embed] });
    message.delete();
  },
};
