const Discord = module.require("discord.js");

module.exports = {
    name: "cat",
    description: "Another fun command",
    run: async(client, message, args) => {
    let link = `https://api.alexflipnote.dev/cats`;

    const embed = new Discord.MessageEmbed()
    .setColor("#800080")
    .setImage(link);
    message.channel.send(embed);
    }
}
