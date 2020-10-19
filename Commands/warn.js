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
  usage: "warn <@user> <raeson>",
  run: async(message, args) => {

    const target = message.mentions.members.first();
    
    if(!message.member.hasPermission("MANAGE_SERVER")) {
      return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
    }
    
    if(!message.mentions.members.first()) {
      return message.channel.send(`**${message.author.username}**, Please mention the person who you want to warn`)
    }
    
    if (message.mentions.members.first().id === message.guild.owner.id) {
      return message.channel.send("You cannot warn the Server Owner")
    }
    
    if(message.mentions.members.first().id === message.author.id) {
     return message.channel.send(`**${message.author.username}**, You can not warn yourself`)
    }
    var warn = 1;
    Data.findOne({
      guildID: message.guild.id,
      id: message.mentions.members.first().id,
    }), (err, data) => {
      if (!data) {
        const newD = new Data({
          guildID: message.guild.id,
          id: message.mentions.members.first().id,
          warns: warn,
        })
        newD.save().catch(err => console.log(err));
        return message.channel.send(`**${target.displayName}** was warned by **${message.author.username}**. **${target.displayName}** now has **${data.warns}** warning(s)!`)
      }else{
        data.warns += warn
        data.save().catch(err => console.log(err));
        message.channel.send(`**${target.displayName}** was warned by **${message.author.username}**. **${target.displayName}** now has **${data.warns}** warning(s)!`);
          }
       }  
    }
}