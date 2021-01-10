const roleData = require("../../../database/guildData/autorole")

module.exports = {
   name: "autorole",
   description: "Setup Auto-role per guild!",
   aliases: ['joinrole', 'arole', 'ar'],
   run: async(client, message, args)=>{
      if (!message.member.hasPermission("MANAGE_ROLES")) {
         return message.channel.send(`Not enough Permissions!`)
      }
      if (!args) {
         return message.channel.send(`Usage: ${message.client.prefix}autorole <Role|off>`)
      }
      
      const data = await roleData.findOne({
         GuildID: message.guild.id,
      }).catch(err=> console.log(err))
      
      if (message.mentions.roles.first()) {
          if (data) {
             if (data.Role === message.mentions.roles.first().id) {
                let role = message.guild.roles.cache.get(message.mentions.role.first().id)
                return message.channel.send(`Autorole is already set to \`@${role.name}\``)
             } else if (data.Role !== message.mentions.roles.first().id) {
                   await roleData.findOneAndRemove({
                       GuildID: message.guild.id,
                   }).catch(err=> console.log(err))
                   
                   let newD = new roleData({
                      Role: message.mentions.roles.first().id,
                      GuildID: message.guild.id,
                   }).catch(err=>console.log(err))
                   
                   newD.save().catch(err=>console.log(err))
                   
                   return message.channel.send(`AutoRole set to ${message.mentions.roles.first()}`)
             }
          } else if (!data) {
          
          let newData = new roleData({
             Role: message.mentions.roles.first().id,
             GuildID: message.guild.id,
          }).catch(err=>console.log(err))
          
          newData.save().catch(err=>console.log(err));
          
          return message.channel.send(`AutoRole set to ${message.mentions.roles.first()}`)
          }
      } else if (args[0] === "off") {
         if (data) {
          let newData = await roleData.findOneAndRemove({
              GuildID: message.guild.id,
          }).catch(err=>console.log(err));
          
              newData.save().catch(err=>console.log(err));
            return message.channel.send(`Autorole has been stopped!`)
         } else if (!data) {
            return message.channel.send(`Autorole isn't setup!`)
         }
      }
   }
}
