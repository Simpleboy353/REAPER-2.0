const Discord = require("discord.js");

module.exports = {
    name: "helputility",
    description: "Get Utility Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .addField("Utility Commands", "`avatar`, `announce`, `clear`, `createrole`, `giverole`, `newtext`, `nickname`, `poll`, `removerole`, `say`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}
