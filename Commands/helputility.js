const Discord = require("discord.js");

module.exports = {
    name: "helputility",
    description: "Get Utility Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .addField("Utility Commands", "`avatar` \n`announce <message>` \n`clear <amount>` \n`giverole <@user> <rolename>` \n`prefix` \n`removerole <@user> <rolename>` \n`say <message>`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}