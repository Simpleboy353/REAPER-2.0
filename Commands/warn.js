const discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "warn",
  category: "moderation",
  description: "warn anyone in one shot xD",
  usage: "kick <@user> <raeson>",
  run: async(message, args) => {
    
    if(!message.member.hasPermission("MANAGE_SERVER")) {
      return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
    }
    
    if(!message.guild.me.hasPermission("MANAGE_SERVER")) {
      return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`)
    }
    
    let target = message.mentions.members.first();
    
    if(!args[0]) {
      return message.channel.send(`**${message.author.username}**, Please mention the person who you want to warn`)
    }
    
    if (target.id === message.guild.owner.id) {
      return message.channel.send("You cannot warn the Server Owner")
    }
    
    if(target.id === message.author.id) {
     return message.channel.send(`**${message.author.username}**, You can not warn yourself`)
    }
    
let reason = args.slice(1).join(" ");
    if (!reason) reason = "-";
    
    const embed = new MessageEmbed()
      .setTitle("WARN MEMBER")
      .setColor("RANDOM")
      .setThumbnail(target.user.displayAvatarURL)
      .setDescription(
        `Action : Warn \nReason: ${reason} \nUser: ${target } \nModerator: ${message.member}`
      )
      .setTimestamp();
    
    message.channel.send(embed)
     
  }
}