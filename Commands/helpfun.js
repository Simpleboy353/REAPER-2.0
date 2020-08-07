const Discord = require("discord.js");

module.exports = {
    name: "helpfun",
    description: "Get Fun Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Fun Commands")
        .setDescription("`8ball`, `ascii`, `clap`, `cowsay`, `dab`, `emojify`, `fliptext`, `howgay`, `infinite`, `kill`, `penis`, `reverse`, `roast`, `slap`, `trivia`, `urban`, `vaportext`, `yomama`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}
