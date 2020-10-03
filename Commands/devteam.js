const Discord = module.require("discord.js");

module.exports = {
    name: "devteam",
    description: "Get the list for my dev team",
    run: async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("My Dev Team")
        .setDescription("__**MAIN DEV AND OWNER**__\n<@661501985517862972> | _๖ۣۜℜⱥjͥƤuͣtͫ_\n\n__**BASE CODE EDITOR**__\n<@661501985517862972> | _๖ۣۜℜⱥjͥƤuͣtͫ_\n\n__**MUSIC CODE EDITOR**__\n<@549930183126286359> | SYNDROME\n\n__**DB HELPER**__\n<@728211572446461973> | GHOST RAZOR")
        .setColor("RANDOM");
        message.channel.send(embed);
    }
}