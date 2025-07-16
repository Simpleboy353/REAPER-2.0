/**
 * ABOUT THIS COMMAND
 *
 * This command displays information about the bot, its origins, and its contributors.
 *
 * [Your Bot Name] is a modified instance of the Reaper-2.0 bot originally created by Simpleboy353.
 * Source: https://github.com/Simpleboy353/Reaper-2.0
 *
 * While not legally required under the GPL-3.0 license, we kindly ask that credit to the original developer
 * (Simpleboy353) be preserved in forks or modified versions as a courtesy to the project's origins.
 *
 * This comment is informational only and does not impose any restrictions beyond those in the GPL-3.0 license.
 */

const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  name: "botinfo",
  description: "Shows the bot info",
  botPerms: ["EmbedLinks"],
  run: async (client, message, args) => {
    const duration = moment
      .duration(client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");

    let embed = new Discord.EmbedBuilder()
      .setTitle("REAPER-,2.0's Info")
      .setColor("Random")
      .setDescription(
        `**Bot Name: **Reaper \n**Owner: **[YOUR_NAME_HERE] \n**Total Categories: **8 \n**Total Commands: **${client.commands.size} \n**Users:** ${
          client.users.cache.size
        } \n**Servers:** ${client.guilds.cache.size} \n**Channels:** ${
          client.channels.cache.size
        } \n**Uptime:** ${duration}`
      )
      .addFields([
        { name: "About Reaper-2.0",
          value: "Reaper-2.0 is an open-source multi-purpose discord bot with features like moderation, music, logging, welcomer and so much more!\nYou can find the link to the [GitHub Repo Here](https://github.com/Simpleboy353/REAPER-2.0)"
        },
        { name: "Some Useful Links",
          value: "**Get your own bot!** **[Here](https://github.com/Simpleboy353/REAPER-2.0)** \n**Need Help? Join our ** **[Support/Development Server](https://infinitybot.tk/support)** **for assistance**"
        }
      ])
    message.channel.send({ embeds: [embed] });
  },
};
