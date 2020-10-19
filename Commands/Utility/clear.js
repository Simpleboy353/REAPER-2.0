const discord = module.require("discord.js");
const { Client } = require('discord.js');
const client = new Client();

module. exports = {
    name:'clear',
    description:'delete the given number of messages',
    run: async(client, message, args) => {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) { 
            return message.channel.send("I don't have the permission to execute this command!")
        }
if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("You need the `MANAGE MESSAGES` permission to execute this command.")
}
const fetched = message.channel || message.mentions.members.first();
let messageArray = message.content.split(" ");
const amount = parseInt(args[0]) + 1;

if (isNaN(amount)) {
    return message.channel.send(`${message.author.username}, you can only clear messages from 1-99`)
} else if (amount <= 1 || amount > 100) {

    return message.channel.send(`${message.author.username}, you can only clear messages from 1-99`)
}

fetched.bulkDelete(amount, true)
   fetched.bulkDelete(amount);

}
}
