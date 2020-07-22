const Discord = require("discord.js");

module.exports = {
    name: "helpfun",
    description: "Get Fun Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .addField("Fun Commands", "`8ball <message>` \n`amazeme` \n`ascii <text>` \n`emojify <text>` \n`fliptext <text>` \n`trivia`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}