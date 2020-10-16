const discord = require("discord.js");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports = {
    name: "undeafen",
    description: "Undeafen users from voice channels",
    run: async (bot, message, args) => {
    var a = message.id;
    if (!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send("You do not have the permission to do that!");
    if (!message.member.voice.channel) return message.channel.send("You are not in a voice channel!");
    var user = message.mentions.members.first();

    if (!user) return message.channel.send("Whom do you wanna mute?");
    let channel = message.member.voice.channel;
    var found = 0;
    for (let memberi of channel.members) {
        if (memberi[1] == user) {
            found++;
        }
    }
    if (found == 1) {
        await user.voice.setDeaf(false);
        message.channel.send(`User has been undeafened!`);
        message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
    }
    else {
        message.channel.send("You are not in the same channel!!");
        message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
    }
}
};