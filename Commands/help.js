const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'help',
    description: 'Shows Command List',
    execute(message, args) {

        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8")); //Read File
        if(!prefixes[message.guild.id]){  //If there is no string that is startwith prefixes[msg.guild.id]
           prefixes[message.guild.id] = { //Let prefixes[msg.guild.id] be
            prefix: '=' //Prefix = Default Prefix Which is on confiฌ.json
           }
        }

        let prefix = prefixes[message.guild.id].prefix; //Let prefix be prefixes[msg.guild.id].prefix

    const embed = new Discord.MessageEmbed()
.setTitle('Commands List')
.setDescription("Available Categories: ")
.addField(`⚙ __**Configuration**__: `, "`=helpconfig`\nConfigure the bot as per your Server")
.addField(`🎲 __**Fun**__: `, "`=helpfun`\nUse these commands to have some fun in your Server")
.addField(`📷 __**Image**__: `, "`=helpimage`\nManipulate Images with these commands")
.addField(`ℹ __**Info**__: `, "`=helpinfo`\nHave some info relating the Server, Users or Our Bot")
.addField(`🛡 __**Moderation**__: `, "`=helpmod`\nIssues relating some users? Use these Commands")
.addField(`🛠 __**Utility**__: `, "`=helputility`\nSome Simple Utility Commands")
.setFooter("Bot made by _๖ۣۜℜⱥjͥƤuͣtͫ_#5915")
.setColor("RANDOM");

message.channel.send(embed);
    }
}


