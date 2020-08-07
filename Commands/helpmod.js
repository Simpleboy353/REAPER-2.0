const Discord = require("discord.js");

module.exports = {
    name: "helpmod",
    description: "Get Moderation Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Moderation Commands")
        .setDescription("`kick`, `ban`, `softban`, `mute`, `unmute`, `tempmute`, `warn`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}
