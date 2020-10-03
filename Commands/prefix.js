const mongoose = module.require("mongoose");
const config = module.require('../config.json');
const Discord = require("discord.js");

mongoose.connect(config.mongoPass, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
})

const Data = require("../models/data.js")
const data = require("../models/data.js")

module.exports = {
    name: "prefix",
    description: "Bruh Just for testing!",
    run: async(client, message, args) => {
        Data.findOne({
          id: message.author.id  
        },(err,data)=>{
            if(!data){
                const newD = new Data ({
                    guildID: message.guild.id,
                    prefix: config.DEFAULT_PREFIX,
                })
                newD.save().catch(err => console.log(err));
                let server = message.guild.id;
                const msg = new Discord.MessageEmbed()
                .setDescription ("Server added to DataBase, you can use the commands in this server!")
                .setColor("RANDOM");
                return message.channel.send(msg);
            }else{
                data.prefix = args[0];
                data.save().catch(err => console.log(err));
                message.channel.send(`Updated the prefix to ${args[0]}!`)
            }
        })
    }
}
