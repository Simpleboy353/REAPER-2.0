const Discord = require("discord.js");

module.exports = {
    name:"unlock",
    description: "Unlocks a Channel",
    run: async (client, message, args) =>{
    if(!message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`You don't have enough Permission to Lock a Channel`);
    }
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() =>{
            message.channel.send('The Channel has been Unlocked Successfully!');
        });
    }
    }