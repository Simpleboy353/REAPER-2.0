const { MessageEmbed } = require("discord.js");
const { QueueRepeatMode } = require('discord-player')

module.exports = async(queue, track, client) => {
    if (!client.utils.havePermissions(queue.metadata.channel)) return;

    const embed = new MessageEmbed()
      .setTitle("Now playing")
      .setColor(queue.guild.me.displayColor || "BLUE")
      .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`)
      .setImage(`${track.thumbnail}`);

    await queue.metadata.channel.send({ embeds: [embed] });
};
