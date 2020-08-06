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
.setTitle('Welcome to the Help Section \nPrefix for your Server: '+prefix)
.addField(`<a:gears:718041649330258011> Configuration: `, "`helpconfig`", true)
.addField(`<a:diceRoll3:740932268910051468> Fun: `, "`helpfun`", true)
.addField(`<:camera:265405712694378496> Image: `, "`helpimage`", true)
.addField(`<:info:711229464746524702> Info: `, "`helpinfo`", true)
.addField(`<a:ban:716558809773899826> Moderation: `, "`helpmod`", true)
.addField(`<:utility:740933607094353951> Utility: `, "`helputility`", true)
.setColor("RANDOM");

message.channel.send(embed);
    }
}


