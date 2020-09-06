const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  category: "utility",
description: "Shows info about a server",
usage: "[command]",
run: async (client, message, args) => {
//command
let servericon = message.guild.iconURL;
let verifLevels = {
        "NONE": "None",
        "LOW": "Low",
        "MEDIUM": "Medium",
        "HIGH": "(╯°□°）╯︵  ┻━┻ (High)",
        "VERY_HIGH": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻ (Very High)"
    };
let region = {
        "brazil": "🇧🇷 Brazil",
        "eu-central": "🇪🇺 Central Europe",
        "singapore": "🇸🇬 Singapore",
        "us-central": "🇺🇸 U.S. Central",
        "sydney": "🇦🇺 Sydney",
        "us-east": "🇺🇸 U.S. East",
        "us-south": "🇺🇸 U.S. South",
        "us-west": "🇺🇸 U.S. West",
        "eu-west": "🇪🇺 Western Europe",
        "vip-us-east": "🇺🇸 VIP U.S. East",
        "london": "🇬🇧 London",
        "amsterdam": "🇳🇱 Amsterdam",
        "hongkong": "🇭🇰 Hong Kong",
        "russia": "🇷🇺 Russia",
        "southafrica": "🇿🇦  South Africa",
        "india": "🇮🇳 India"
    };
const serverembed = new Discord.MessageEmbed()
.setTitle(message.guild.name)
.setColor("RANDOM")
.setThumbnail(servericon)
.addField("Owner", `${message.guild.owner}`, true)
.addField("Region", region[message.guild.region], true)
.addField("Verification Level", verifLevels[message.guild.verificationLevel], true)
.addField("Total Channels", message.guild.channels.cache.size, true)
.addField("AFK Channel", message.guild.afkChannel, true)
.addField("AFK Timeout", message.guild.afkTimeout, true)
.addField("Total Roles", message.guild.roles.cache.size, true)
.addField("Total Members", message.guild.memberCount, true)
.addField("Created On", message.guild.createdAt, true)
.setThumbnail(message.guild.iconURL(), true)
.setFooter(`ID: ${message.guild.id}`, message.guild.iconURL())
.setTimestamp();
message.channel.send(serverembed);
}
};
