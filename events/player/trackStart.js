const { MessageEmbed } = require("discord.js");
const { QueueRepeatMode } = require('discord-player')

module.exports = async(queue, track, client) => {
    if (!client.utils.havePermissions(queue.metadata.channel)) return;

    const embed = new MessageEmbed()
      .setTitle("Now playing")
      .setColor(queue.guild.me.displayColor || "BLUE")
      .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`)
      .setImage(`${track.thumbnail}`);

    let embedreact =  await queue.metadata.editReply({ embeds: [embed] });
        await embedreact.react("⏯");
        await embedreact.react("⏭");
        await embedreact.react("🔇");
      await embedreact.react("🔉");
      await embedreact.react("🔊");
      await embedreact.react("🔁");
      await embedreact.react("⏹");
    const filter = (reaction, user) => user.id !== client.user.id;
    var collector = embedreact.createReactionCollector(filter, {
      time: track.durationMS  > 0 ? track.durationMS  * 1000 : 600000
    });
     collector.on("collect", (reaction, user) => {
      if (!queue) return;
      if (user.bot) return;
      switch (reaction.emoji.name) {
    case "⏯":
      reaction.users.remove(user).catch(console.error);
      if (!client.utils.canModifyQueue) return;
       if (queue.connection.paused){
       queue.setPaused(false);
           queue.metadata.followUp({ content: "resumed the song.", ephemeral: true })
      }else{
        queue.setPaused(true);
      return queue.metadata.followUp({ content: "paused the song!", ephemeral: true });}
      break;
      case "⏭":
      reaction.users.remove(user).catch(console.error);
      if (!client.utils.canModifyQueue) return;
       if (queue.tracks.length < 1 && queue.repeatMode !== 3) {
        return queue.metadata.followUp({ content: "Hey, the queue is empty.", ephemeral: true })
       }
      queue.skip();
      return queue.metadata.followUp({ content: "playing next song!", ephemeral: true });
      break;
      case "🔇":
      reaction.users.remove(user).catch(console.error);
      if (!client.utils.canModifyQueue) return;
      if (queue.volume === 0){
        queue.setVolume(100);
           queue.metadata.followUp({ content: "Unmuted the song.", ephemeral: true })
      }else{
        queue.setVolume(0);
      return queue.metadata.followUp({ content: "Muted the song!", ephemeral: true });}
      break;
      case "🔊":
      reaction.users.remove(user).catch(console.error);
      if (!client.utils.canModifyQueue) return;
      if (queue.volume === 200)
          return queue.metadata.followUp({ content: "Why are you trying adding the volume over 200%?", ephemeral: true })
    
     queue.setVolume(queue.volume + 10);
      return queue.metadata.followUp({ content: `increased 10%! Current Volume:${queue.volume}`, ephemeral: true });
      break;
      case "🔉":
      reaction.users.remove(user).catch(console.error);
      if (!client.utils.canModifyQueue) return;
      if (queue.connection.paused)
              return queue.metadata.followUp({ content: "You can't hear the song right? because your volume is 0.", ephemeral: true })
     queue.setVolume(queue.volume - 10);
      return queue.metadata.followUp({ content: `Decreased 10%! Current Volume:${queue.volume}`, ephemeral: true });
      break;
      case "⏹":
      reaction.users.remove(user).catch(console.error);
      if (!client.utils.canModifyQueue) return;
     if (!queue || !queue.playing)
              return queue.metadata.followUp({ content: "Are we even playing some thing?.", ephemeral: true })
     queue.stop();
      return queue.metadata.followUp({ content: "Stopped the song!", ephemeral: true });
      break;
       case "🔁":
      reaction.users.remove(user).catch(console.error);
      if (!client.utils.canModifyQueue) return;
      if (queue.repeatMode === 0){
        queue.setRepeatMode(QueueRepeatMode.TRACK)
           queue.metadata.followUp({ content: "Track Looped.", ephemeral: true })
      }else if(queue.repeatMode === 1){
        queue.setRepeatMode(QueueRepeatMode.QUEUE)
       queue.metadata.followUp({ content: "Queue Looped!", ephemeral: true });
      }else if(queue.repeatMode === 2){
        queue.setRepeatMode(QueueRepeatMode.AUTOPLAY)
       queue.metadata.followUp({ content: "Autoplay on!", ephemeral: true });}
       else if(queue.repeatMode === 3){
        queue.setRepeatMode(QueueRepeatMode.OFF)
       queue.metadata.followUp({ content: "Turned off loop!", ephemeral: true });}
      break;
};
