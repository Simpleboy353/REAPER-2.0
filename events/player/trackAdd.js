const { EmbedBuilder } = require("discord.js");

module.exports = async(queue, track) => {
    if (!queue.playing || queue.tracks.length <= 0) return;

    const embed = new EmbedBuilder()
      .setTitle(`Track queued - Position ${queue.tracks.indexOf(track) +1}`)
      .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`)
      .setColor(queue.guild.members.me.displayColor || "#00FFFF");

    queue.metadata.editReply({ embeds: [embed], allowedMentions: { repliedUser: false } }).then(async(msg)=>{
      setTimeout(function(){
        msg.delete();
      }, 10000);
    })

};
