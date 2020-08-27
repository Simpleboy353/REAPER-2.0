const Discord = module.require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'help',
    description: 'Shows Command List',
    run: async(message, args) => {

    const embed = new Discord.MessageEmbed()
.setTitle('Commands List')
.setDescription("Available Categories: ")
.addField(`⚙ __**Configuration**__: `, "`=helpconfig`\nConfigure the bot as per your Server")
.addField(`🎲 __**Fun**__: `, "`=helpfun`\nUse these commands to have some fun in your Server")
.addField(`📷 __**Image**__: `, "`=helpimage`\nManipulate Images with these commands")
.addField(`ℹ __**Info**__: `, "`=helpinfo`\nHave some info relating the Server, Users or Our Bot")
.addField(`🛡 __**Moderation**__: `, "`=helpmod`\nIssues relating some users? Use these Commands")
.addField(`<:utility:748177830134808597> __**Utility**__: `, "`=helputility`\nSome Simple Utility Commands")
.setColor("RANDOM");

message.channel.send(embed);
    }
}


