const Discord = module.require("discord.js");

module.exports = {
    name: "partnerships",
    description: "Shows Info Relating Partner Servers and Bots",
    run: async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Infinity Partners")
        .addField(`**__Partner Servers__**`, `**__[/r/Champions](https://discord.gg/UnEU6Pc)__**\n**__[Infinity's Infinite Loop](https://discord.gg/X9PAszD)__**`)
        .addField(`**__Partner Bots__**`, `**__[Beats](https://discord.com/oauth2/authorize?client_id=730683152720199700&permissions=37223745&scope=bot)__**`)
        .setFooter(`Contact __**๖ۣۜℜⱥjͥƤuͣtͫ_#5915**__ to become a partner`)
        .setColor("RANDOM");
    message.channel.send(embed);
    }
}