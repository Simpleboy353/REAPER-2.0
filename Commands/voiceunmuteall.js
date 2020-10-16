const discord = require("discord.js");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports = {
    name: "voiceunmuteall",
    description: "Unmutes all the users in a voice channel",
    run = async (bot, message, args) => {
    var a = message.id;
    let b;
    if (!message.member.hasPermission('MUTE_MEMBERS')) return message.reply("You do not have the permission to do that!");
    if (!message.member.voice.channel) return message.reply("You are not in a voice channel!");
    let channel = message.member.voice.channel;
    for (let memberi of channel.members) {
        await memberi[1].voice.setMute(false);
    }
    message.channel.send("Unmuted! Hope you won!!").then((msg) => {
        b = msg.id;
    });
    message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
    message.channel.messages.fetch(b).then(msg => msg.delete({ timeout: 3000 }));
}
};