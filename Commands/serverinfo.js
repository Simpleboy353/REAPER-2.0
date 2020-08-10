const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  category: "utility",
description: "Shows info about a server",
usage: "[command]",
run: async (client, message, args) => {
//command
let servericon = message.guild.iconURL;
let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
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
.setTitle("Server Information")
.setColor("RANDOM")
.setThumbnail(servericon)
.addField("Server Name", message.guild.name)
.addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
.addField("Region", region[message.guild.region], true)
.addField("Channels", message.guild.channels.cache.size, true)
.addField("Verification Level", message.guild.verificationLevel, true)
.addField("Roles", message.guild.roles.cache.size, true)
.addField("Created On", message.guild.createdAt)
.addField("You Joined", message.member.joinedAt)
.addField("Total Members", message.guild.memberCount)
.setThumbnail(message.guild.iconURL())
.setTimestamp();
message.channel.send(serverembed);
}
};
