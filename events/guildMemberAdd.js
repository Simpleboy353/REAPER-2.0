const Discord = require("discord.js");

module.exports=async(member, message)=> {

   let embed = new Discord.MessageEmbed()
  .setTitle("Welcome!")
  .setDescription(`Welcome to the Server, ${member}! Hope you like our Server!`)
  .setColor("GREEN");

     member.guildchannels.cache.find(ch => ch.name === "welcome" || "😁〢entrance" || "╭✩┨welcome" || "🔅》welcome-to-server").send(embed);
  }