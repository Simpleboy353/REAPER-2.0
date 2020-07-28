const discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  execute(message, args) {
    
    if(!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, You do not have perms to unban someone`)
    }
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, I do not have perms to unban someone`)
    }
    
    const target = message.mentions.members.first();
    
    if(!target) {
      return message.channel.send(`**${message.author.username}**, Please mention the person who you want to unban.`)
    }
    
    if(target.id === message.author.id) {
      return message.channel.send(`**${message.author.username}**, You can not Unban yourself!`)
    }
    
   
    
   if(!args[1]) {
     return message.channel.send(`**${message.author.username}**, Please Give Reason To Unban Member`)
   }
    
    let embed = new discord.MessageEmbed()
    .setTitle("Action :Unban")
    .setDescription(`Unbanned ${target} (${target.id})`)
    .setColor("#ff2050")
    .setThumbnail(target.avatarURL)
    .setFooter(`Unbanned by ${message.author.tag}`);
    
    message.channel.send(embed)
    target.unban(args[1])
    
  }
}