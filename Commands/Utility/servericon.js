const Discord = module.require("discord.js");

module.exports = {
  name: "servericon",
  description: "Displays the Server Icon",
  botPerms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    const server = message.guild;
    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name}'s Icon`)
      .setDescription(
        `[Icon Link](${server.iconURL({
          size: 2048,
          dynamic: true,
          format: "png",
        })})`
      )
      .setImage(server.iconURL({ size: 2048, dynamic: true, format: "png" }))
      .setColor("RANDOM");
    message.channel.send({ embeds: [embed] });
    message.delete();
  },
};
