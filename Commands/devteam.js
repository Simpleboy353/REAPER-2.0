const Discord = module.require("discord.js");

module.exports = {
    name: "devteam",
    description: "Get the list for my dev team",
    run: async(client, message, args) => {
        const avatar = client.user.avatarURL;
        const embed = new Discord.MessageEmbed()
        .setAuthor("Infinity's Developers", client.user.avatarURL())
        .setThumbnail(avatar)
        .setDescription("**MY DEV TEAM**\n\n__**MAIN DEV AND OWNER**__\n<@661501985517862972> | _๖ۣۜℜⱥjͥƤuͣtͫ_\n\n__**BASE CODE EDITOR**__\n<@661501985517862972> | _๖ۣۜℜⱥjͥƤuͣtͫ_\n\n__**MUSIC CODE EDITOR**__\n<@549930183126286359> | SYNDROME\n\n__**MANAGER**__\n<@587828386466889730> | FRAWZTY\n\n**DB EDITOR**__\n<@728211572446461973> | GHOST RAZOR")
        .setThumbnail(client.user.avatarURL())
        .setColor("RANDOM");
        message.channel.send(embed);
    }
}