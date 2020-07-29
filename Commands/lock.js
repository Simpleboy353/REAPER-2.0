const Discord = require("discord.js");

module.exports = {
    name: "lock",
    description: "Locks a channel",
    run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS", "MANAGE_SERVER")) {
    return message.channel.send("You don't have enough Permissions to use this command")
    }
    message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
    }).then(() => {
        message.channel.send(`This channel has been Locked by ${message.member}`);
    })
    }
}