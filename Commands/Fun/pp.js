const Discord = module.require("discord.js");

module.exports = {
  name: "pp",
  description: "Another fun Command",
  botPerms: ["EmbedLinks"],
  run: async (client, message, args) => {
    let target = message.mentions.users.first();

    if (!target) return message.channel.send("Mention someone!")

    var ppSize = Math.floor(Math.random() * 10) * "=";

    const ppSizeEmbed = new Discord.EmbedBuilder()
      .setTitle(`PP Size Calculator`)
      .setDescription(`${target.username}'s pp: 8` + ppSize + "D")
      .setColor("Blue");

    message.channel.send({ embeds: [ppSizeEmbed] });
  },
};
