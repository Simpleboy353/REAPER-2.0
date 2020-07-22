const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kick anyone with one shot xD",
  usage: "kick <@user> <raeson>",
  execute(message, args) {
    
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
    }
    
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`)
    }
    
    let target = message.mentions.members.first();
    
    if(!args[0]) {
      return message.channel.send(`**${message.author.username}**, Please mention the person who you want to kick`)
    }
    
    if(target.id === message.author.id) {
     return message.channel.send(`**${message.author.username}**, You can not kick yourself`)
    }
    
let reason = args.slice(1).join(" ");
    if (!reason) reason = "-";
    
    const embed = new MessageEmbed()
      .setTitle("KICK MEMBER")
      .setColor("RANDOM")
      .setThumbnail(target.user.displayAvatarURL)
      .setDescription(
        `Action : Kick \nReason: ${reason} \nUser: ${target } \nModerator: ${message.member}`
      )
      .setTimestamp();
    
    message.channel.send(embed)
    
    target.kick(args[0]);
     
  }
}