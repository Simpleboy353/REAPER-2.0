const discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const mongoose = require("mongoose"); 

mongoose.connect(config.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const Data = require("../models/data.js")
const { model } = require("../models/data.js")

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
    Data.findOne({
      id: target.id
    }), (err, data) => {
      if (!data) {
        const newD = new Data({
          id: target.id,
          warns: 1,
        })
        newD.save().catch(err => console.log(err));
        return message.channel.send(`**${target.displayName}** was warned by **${message.author.username}**. **${target.displayName}** now has **${data.warns}** warning(s)!`)
      }else{
        data.warns += 1
        data.save().catch(err => console.log(err));
        message.channel.send(`**${target.displayName}** was warned by **${message.author.username}**. **${target.displayName}** now has **${data.warns}** warning(s)!`);
          }
       }  
    }
}