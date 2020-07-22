const Discord = require("discord.js");

module.exports = {
    name: "helpmod",
    description: "Get Moderation Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .addField("Moderation Commands", "`kick <@user <reason>` \n`ban <@user> <reason>` \n`softban <@user> <reason>` \n`mute <@user> <reason>` \n`unmute <@user> <reason>` \n`tempmute <@user> <reason>` \n`warn <@user> <reason>`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}