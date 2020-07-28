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
.setTitle('Welcome to the help section \nPrefix for your Server: '+prefix)
.addField(`Moderation: `, "`helpmod`")
.addField(`Info: `, "`helpinfo`")
.addField(`Utility: `, "`helputility`")
.addField(`Fun: `, "`helpfun`")
.addField(`Configuration: `, "`helpconfig`")
.setColor("RANDOM");

message.channel.send(embed);
    }
}


