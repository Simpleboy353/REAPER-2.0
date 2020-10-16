const Discord = module.require("discord.js");

module.exports = {
    name: "voicemutes",
    description: "mute a user from a voice channel",
    run: async (client, message, args) => {
        if (!message.guild.me.hasPermission(["ADMINISTRATOR"])) {
            return message.channel.send("I Don't Have Proper Permissions To Use This Command!");
        }
        if (!message.mentions.members.first()) {
            return message.channel.send(`Please Mention User That You Want To mute From Voice Channel!`);
        }
        let { channel } = message.mentions.members.first().voice;

        if (!channel) {
            return message.channel.send(`User Is Not In Any Voice Channel!`);
        }
        message.mentions.members.first().voice.mute();

        message.channel.send(`User Has Been Mutes From Voice Channel!`)
    }
};
