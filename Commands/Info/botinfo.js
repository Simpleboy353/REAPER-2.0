const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const client = new Discord.Client();
module.exports = {
    name: "botinfo",
    description: "Shows the bot info",
    run: async (client, message, args) => {
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        let embed = new Discord.MessageEmbed()
        .setAuthor("Infinity#4967's Info", client.user.avatarURL())
        .setColor("RANDOM")
            .setDescription(`**Bot Name: **Infinity \n**Owner: **๖ۣۜℜⱥjͥƤuͣtͫ#5915 \n**Total Categories: **8 \n**Total Commands: **141 \n**Users:** ${client.users.cache.size} \n**Servers:** ${client.guilds.cache.size} \n**Channels:** ${client.channels.cache.size} \n**Uptime and Ping: **${duration} / ${Math.round(client.ws.ping)}ms \n**State: **Under Development \n**Online Status: **Up 24/7 (Except during Maintenance)`)
        .addField("Some Useful Links", "**Get Infinity's Invite Link** **[Here](https://discord.com/api/oauth2/authorize?client_id=733670294086221865&permissions=8&scope=bot)** \n**Need Help? Join Infinity's** **[Support Server](https://discord.gg/mqWprFc)** **for assistance**")
        .setFooter("Regards, Infinity Bot Team");
    message.channel.send(embed);
    }
}
