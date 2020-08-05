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
.addField(`Configuration: `, "`helpconfig`", true)
.addField(`Fun: `, "`helpfun`", true)
.addField(`Image: `, "`helpimage`", true)
.addField(`Info: `, "`helpinfo`", true)
.addField(`Moderation: `, "`helpmod`", true)
.addField(`Utility: `, "`helputility`", true)
.setColor("RANDOM");

message.channel.send(embed);
    }
}


