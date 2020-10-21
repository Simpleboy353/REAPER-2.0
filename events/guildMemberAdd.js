const Discord = require("discord.js");

module.exports=async(member, message)=> {

  const channel = member.guilds.channels.cache.find(ch => ch.name === "welcome" || "😁〢entrance" || "╭✩┨welcome" || "🔅》welcome-to-server");
   if (channel){
   let embed = new Discord.MessageEmbed()
  .setTitle("welcome!")
  .setDescription(`Welcome to the Server, ${member}! Hope you like our Server!`)
  .setColor("GREEN");

  channel.send(embed);
  } else if (!channel) {
    return;
  }
}