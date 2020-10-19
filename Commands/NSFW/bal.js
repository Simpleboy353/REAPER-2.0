const mongoose = module.require("mongoose");
const config = module.require('../config.json');
const Discord = require("discord.js");

mongoose.connect(config.mongoPass, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
})

const Data = require("../models/data.js")
const { model } = require("../models/data.js")

module.exports = {
    name: "bal",
    description: "Bruh Just for testing!",
    run: async(client, message, args) => {
        Data.findOne({
          id: message.author.id  
        },(err,data)=>{
            if(!data){
                const newD = new Data ({
                    id: message.author.id,
                    Money:100,
                    daily:0,
                    Bank:0,
                })
                newD.save().catch(err => console.log(err));
                let user = message.mentions.users.first() || message.author;
                return message.channel.send({embed:{color:"RANDOM",description:`${user.tag} you have been given 100 coins as starter!`}})
            }else{
                let user = message.mentions.users.first() || message.author;
                let embed = new Discord.MessageEmbed()
                .setTitle(`${user.username}'s balance`)
                .setDescription(`Money: ${data.Money}\nBank: ${data.Bank}`)
                .setColor("RANDOM")
                message.channel.send(embed);
            }
        })
    }
}