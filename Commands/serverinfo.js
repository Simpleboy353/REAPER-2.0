const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  category: "utility",
description: "Shows info about a server",
usage: "[command]",
run: async (client, message, args) => {
//command
let afk = message.guild.afkChannel;
let achannel = "";
if (afk) {
achannel = message.guild.afkChannel;
} else if (!afk) {
achannel = "None";
}
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
.addField("Owner", `${message.guild.owner}`)
.addField("Region", region[message.guild.region])
.addField("Verification Level", verifLevels[message.guild.verificationLevel])
.addField("Total Channels", message.guild.channels.cache.size)
.addField("AFK Channel", `${achannel}\n AFK Timeout\n${message.guild.afkTimeout}`)
.addField("Total Roles", message.guild.roles.cache.size)
.addField("Total Members", message.guild.memberCount)
.addField("Created On", message.guild.createdAt)
.setThumbnail(message.guild.iconURL())
.setFooter(`ID: ${message.guild.id}`, message.guild.iconURL())
.setTimestamp();
message.channel.send(serverembed);
}
};
