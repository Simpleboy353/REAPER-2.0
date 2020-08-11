const discord = require("discord.js");
const { Client } = require('discord.js');
const client = new Client();
const ms = require("ms");

module. exports = {
    name:'clear',
    description:'delete the given number of messages',
    execute(message, args) {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) { 
            return message.channel.send("I don't have the permission to execute this command!")
        }
if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("You need the `MANAGE MESSAGES` permission to execute this command.")
}
let messageArray = message.content.split(" ");
const amount = parseInt(args[0]) + 1;

if (isNaN(amount)) {
    return message.channel.send(`${message.author.username}, you can only clear messages from 1-99`)
} else if (amount <= 1 || amount > 100) {

    return message.channel.send(`${message.author.username}, you can only clear messages from 1-99`)
}

message.channel.bulkDelete(amount, true)
   message.channel.bulkDelete(amount);
   var msg = await message.channel.send(`Cleared ${amount} messages`);

let time = '2s'
setTimeout(function(){
msg.delete();
}, ms(time));

}
}
