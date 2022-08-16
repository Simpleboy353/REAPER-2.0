const Discord = module.require("discord.js");

module.exports = {
  name: "delchannel",
  description: "Delete Channels From your Server",
  userPerms: ["ManageChannels"],
  botPerms: ["EmbedLinks", "ManageChannels"],
  run: async (client, message, args) => {
    const fetchedChannel = message.mentions.channels.first();
    if (!fetchedChannel) {
      return message.channel.send("`Usage: =delchannel <channel>`");
    }
    fetchedChannel.delete();

    const embed = new Discord.EmbedBuilder()
      .setTitle("Channel Updates")
      .setDescription("Channel has been deleted")
      .setColor("Random");

    await message.channel.send({ embeds: [embed] });
  },
};
