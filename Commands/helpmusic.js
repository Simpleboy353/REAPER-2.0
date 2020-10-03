const Discord = module.require("discord.js");

module.exports = {
    name: "helpmusic",
    description: "Get music commands",
    run: async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Music Commands")
        .setDescription("`play`, `pause`, `resume`, `skip`, `shuffle`, `skipto`, `search`, `queue`, `np`, `playlist`, `volume`, `pruning`, `remove`, `lyrics`, `loop`")
        .setColor("RANDOM")
        message.channel.send(embed);
    }
}