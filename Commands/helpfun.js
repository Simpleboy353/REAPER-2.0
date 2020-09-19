const Discord = require("discord.js");

module.exports = {
    name: "helpfun",
    description: "Get Fun Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Fun Commands")
        .setDescription("`8ball`, `ascii`, `clap`, `clyde`, `cowsay`, `dab`, `emojify`, `fliptext`, `gif`, `greentext`, `hack`, `howgay`, `hug`, `joke`, `kill`, `orangetext`, `penis`, `pokeimg`, `respect`, `reverse`, `roast`, `sacrifice`, `slap`, `spam`, `trivia`, `urban`, `vaportext`, `yomama`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}
