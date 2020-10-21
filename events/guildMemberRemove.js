const Discord = require("discord.js");

module.exports = async (member, message) => {
    let embed = new Discord.MessageEmbed()
      .setTitle("Goodbye!")
      .setDescription(`${member} Just left the Server! Hope they return soon!`)
      .setColor("GREEN");

    member.guild.channels.cache.find(ch => ch.name === "bye" || "😓〢exit" || "╰✩┨bye" || "🔅》sayonara").send(embed);
  };