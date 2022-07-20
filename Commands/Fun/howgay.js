const Discord = module.require("discord.js");

module.exports = {
  name: "howgay",
  description: "Just for fun command",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    let target = message.mentions.members
      || message.mentions.members.first();

    let rng = Math.floor(Math.random() * 101);

    const howgayembed = new Discord.EmbedBuilder()
      .setTitle(`Gay Machine Calculator`)
      .setDescription(`${target.user.username} is ` + rng + "% Gay🌈")
      .setColor("GREEN");

    message.channel.send({ embeds: [howgayembed] });
  },
};
