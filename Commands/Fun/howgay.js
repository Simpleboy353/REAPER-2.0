const Discord = module.require("discord.js");

module.exports = {
  name: "howgay",
  description: "Just for fun command",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    let target = message.mentions.users.first();

    let rng = Math.floor(Math.random() * 101);

    const howgayembed = new Discord.EmbedBuilder()
      .setTitle(`Gay Machine Calculator`)
      .setDescription(`${target.username} is ` + rng + "% Gay🌈")
      .setColor("Green");

    await message.channel.send({ embeds: [howgayembed] });
  },
};
