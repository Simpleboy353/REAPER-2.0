const Discord = require("discord.js");

module.exports=async(member)=> {

   let embed = new Discord.MessageEmbed()
  .setTitle("Welcome!")
  .setDescription(`Welcome to the Server, ${member}! Hope you like our Server!`)
  .setColor("GREEN");

     member.guild.channels.cache.find(ch => ch.name === "welcome").send(embed);
  }