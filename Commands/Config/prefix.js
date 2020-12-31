const prefixModel = require("../../database/guildData/prefix.js");

module.exports = {
   name: "prefix",
   description: "Setup the bot's prefix for the current guild",
   aliases: ["botsymbol"],
   run: async(client, message, args)=>{
   if (message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You don't have the required Permissions!`)
   
   if (!args) return message.channel.send(`No Prefix Specified!`)
   
   if (args.length > 5) return message.channel.send(`Prefix cannot be longer than 5 characters!`)
   
   if (args.join(" ") === "@here" || args.join(" ") === "@everyone") return message.channel.send(`You cannot use mentions as prefix!`)
   
   var newPrefix = args.join(" ");
   
   const data = prefixModel.findOne({ GuildID: message.guild.id })
   
   if (data) {
      let newD = prefixModel.findOneAndUpdate({ Prefix: newPrefix, GuildID: message.guild.id })
      ;(await newD).save();
      
      return message.channel.send(`Successfully changed the prefix to ${newPrefix}`)
      } else if (!data) {
         let newData = new prefixModel({ Prefix: newPrefix, GuildID: message.guild.id })
         ;(await newData).save();
         
         return message.channel.send(`Successfully changed the prefix to ${newPrefix}`)
      }
   }
}
