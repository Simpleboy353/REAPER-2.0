const mongoose = module.require("mongoose");
const config = module.require('../config.json');
const Discord = require("discord.js");

mongoose.connect(config.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Data = require("../models/data.js")
const { model } = require("../models/data.js")

module.exports = {
    name: "checkwarnings",
    description: "Bruh Just for testing!",
    run: async (client, message, args) => {
        const target = message.mentions.members.first();
        Data.findOne({
            id: target.id
        }, (err, data) => {
            if (!data) {
                const newD = new Data({
                    id: target.id,
                    warns: 0,
                })
                newD.save().catch(err => console.log(err));
                return message.channel.send({ embed: { color: "RANDOM", description: `${target.displayName} has no warnigs!` } })
            } else {
                let user = message.mentions.members.first();
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Warnings`)
                    .setDescription(`${user.displayName} has ${data.warns} warning(s)!`)
                    .setColor("RANDOM")
                message.channel.send(embed);
            }
        })
    }
}