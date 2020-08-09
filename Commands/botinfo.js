const Discord = require("discord.js");

module.exports = {
    name: "botinfo",
    description: "Shows the bot info",
    run: async (client, message, args) => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Bot Info")
        .setColor("RANDOM")
        .setDescription("**Bot Name: **REAPER 2.0 (BETA) \n**Owner: **๖ۣۜℜⱥjͥƤuͣtͫ#5915 \n**Total Categories: **6 \n**Total Commands: **60 \n**State: **Under Development \n**Online Status: **Up 24/7 (Except during Maintenance)")
        .addField("Some Useful Links", "**Get Infinity's Invite Link** **[Here](https://discord.com/api/oauth2/authorize?client_id=733670294086221865&permissions=8&scope=bot)** \n**Looking for a Music Bot? Try Our** **[Beats](https://discord.com/api/oauth2/authorize?client_id=730683152720199700&permissions=37223745&scope=bot) Bot**")
        .setFooter("Regards, Infinity Bot Team");
    message.channel.send(embed);
    }
}
