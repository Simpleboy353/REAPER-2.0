const Discord = require("discord.js");

module.exports = async (member, message) => {

  const channel = member.guilds.channels.cache.find(ch => ch.name === "bye" || "😓〢exit" || "╰✩┨bye" || "🔅》sayonara");
  if (channel) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Goodbye!")
      .setDescription(`${member} Just left the Server! Hope they return soon!`)
      .setColor("GREEN");

    channel.send(embed);
  } else if (!channel) {
    return;
  }
}