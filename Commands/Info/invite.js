const Discord = require("discord.js");

module.exports = {
  name: "invite",
  description: "Get the bot's",
  botPerms: ["EmbedLinks"],
  run: async (client, message, args) => {
    let embed = new Discord.EmbedBuilder()
      .setTitle("Invite Me")
      .setColor("Random")
      .setDescription(
        "**Get Infinity's Invite Link [Here](https://discord.com/oauth2/authorize?client_id=733670294086221865&permissions=1584921983&scope=bot)**\n**Need assistance? Join our [Support Server](https://discord.gg/mqWprFc) now!**"
      )
    message.channel.send({ embeds: [embed] });
  },
};
