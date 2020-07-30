const Discord = require("discord.js");

module.exports = {
    name: "helpinfo",
    description: "Get Info Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .addField("Info Commands", "`help`, `invite`, `ping`, `userinfo`, `userid`, `serverinfo`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}