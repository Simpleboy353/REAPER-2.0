const mongoose = require("mongoose")
const config = require("../../config.json")
const {MessageEmbed} = require("discord.js")
const ms = require('parse-ms')

mongoose.connect(config.mongoPass,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const Data = require('../../models/serverdata.js')


module.exports = {
    name: "prefix",
    description: "Change the bot prefix",
    run: async (client, message, args) => {
        Data.findOne({
            gid:message.guild.id
        },(err,data)=>{
            if(err) console.log(err);
            if(!data){
const newD = new Data({
              gid:message.guild.id,
          gname:message.guild.name,
              gprefix:"&"
           })
newD.save().catch(err => console.log(err));
}else{
     if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to set prefix!"); //If The Author Doesnt Have Manage guild permission return a message
      if(!args[0]) return message.channel.send("Please specify a prefix!"); //If there isn't a prefix then return a message
      
    let oldp = data.gprefix;
    
       data.gprefix = data.gprefix.replace(oldp, args[0]);;
    data.save().catch(err => console.log(err));
      message.channel.send(`Prefix has been set to **${args[0]}**!`); //send message to that channel
      return; //return
    }
    }
                     )
    }
}
