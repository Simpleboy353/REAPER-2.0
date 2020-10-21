const Discord = require("discord.js");

module.exports = async (member) => {
    let embed = new Discord.MessageEmbed()
      .setTitle("Goodbye!")
      .setDescription(`${member} Just left the Server! Hope they return soon!`)
      .setColor("GREEN");

    member.guild.channels.cache.find(ch => ch.name === "bye").send(embed);
  };