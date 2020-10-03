const Discord = module.require("discord.js");

module.exports = {
    name: "helpmusic",
    description: "Get music commands",
    run: async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Music Commands")
        .setDescription("`play [p]`, `pause`, `resume [r]`, `skip [s]`, `shuffle`, `skipto [st]`, `search`, `queue [q]`, `np`, `playlist [pl]`, `volume`, `pruning`, `remove`, `lyrics [ly]`, `loop [l]`")
        .setColor("RANDOM")
        message.channel.send(embed);
    }
}