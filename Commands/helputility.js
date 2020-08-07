const Discord = require("discord.js");

module.exports = {
    name: "helputility",
    description: "Get Utility Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Moderation Commands")
        .setDescription("`avatar`, `announce`, `clear`, `createrole`, `delchannel`, `giverole`, `newtext`, `newvoice`, `nickname`, `poll`, `removerole`, `say`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}
