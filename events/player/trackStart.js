const { EmbedBuilder , ButtonBuilder, ActionRowBuilder, ButtonStyle} = require("discord.js");
const { QueueRepeatMode } = require('discord-player')
const { wait } = require("node:timers/promises")

module.exports = async(queue, track, client) => {
    
  if (!client.utils.havePermissions(queue.metadata.channel)) return;

  const embed = new EmbedBuilder()
  .setTitle("Now playing")
  .setColor(queue.guild.members.me.displayColor || "BLUE")
  .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]\n${queue.createProgressBar()}`)
  .setImage(`${track.thumbnail}`);

  const playPause = new ButtonBuilder()
  .setCustomId("playPause")
  .setStyle(ButtonStyle.Primary)
  .setEmoji("⏯")

  const skip = new ButtonBuilder()
  .setCustomId("skip")
  .setStyle(ButtonStyle.Success)
  .setEmoji("⏭")

  const repeatThis = new ButtonBuilder()
  .setCustomId("repeatThis")
  .setStyle(ButtonStyle.Success)
  .setEmoji("🔂")

  const repeat = new ButtonBuilder()
  .setCustomId("repeat")
  .setStyle(ButtonStyle.Success)
  .setEmoji("🔁")

  const stop = new ButtonBuilder()
  .setCustomId("stop")
  .setStyle(ButtonStyle.Danger)
  .setEmoji("⏹")

  const shuffle = new ButtonBuilder()
  .setCustomId("shuffle")
  .setStyle(ButtonStyle.Primary)
  .setEmoji("🔀")

  const volumeLess = new ButtonBuilder()
  .setCustomId("volumeLess")
  .setStyle(ButtonStyle.Secondary)
  .setEmoji("🔉")

  const volumeMore = new ButtonBuilder()
  .setCustomId("volumeMore")
  .setStyle(ButtonStyle.Secondary)
  .setEmoji("🔊")

  // A row cannot have more than 4 components!
  const controlRow1 = new ActionRowBuilder()
  .addComponents([playPause, skip, shuffle, stop])

  const controlRow2 = new ActionRowBuilder()
  .addComponents([volumeLess, repeat, repeatThis, volumeMore])

  await queue.metadata.channel.send({ embeds: [embed], components: [controlRow1, controlRow2] }).then(async(msg)=>{
  
    client.db.set(`playingembed_${queue.metadata.guild.id}`, msg.id);
    client.db.set(`playingchannel_${queue.metadata.guild.id}`, queue.metadata.channel.id);
    /**
     * Function to delete the message after the stop button is used
     */
    async function usedStop() {
      await msg.delete()
    }
    // Delete message after song has ended!
    setTimeout(async function(){
      if (msg && !msg.deleted) {
        return await usedStop();
      } else {
        return;
      }
    }, track.durationMS)
       
  const filter = (user) => !user.bot || user.id === queue.metadata.member.id;

  const collector = await msg.createMessageComponentCollector(filter, {
    time: track.duration > 0 ? track.duration * 1000 : 60_000
  });

  collector.on("collect", async(button) => {
    if (!queue) return;
    if (!track.durationMS) {
      collector.stop();
    }

    switch (button.customId) {

      case "playPause":
        await button.deferUpdate();
        if (!client.utils.canModifyQueue(queue.metadata)) return;

        if (!queue.connection.paused) {
          queue.setPaused(true);
          return queue.metadata.followUp({ content: "Paused the music!", ephemeral: true })
        } else if (queue.connection.paused) {
          queue.setPaused(false);
          return queue.metadata.followUp({ content: "Resumed the music!", ephemeral: true })
        }
        break;
      
      case "skip":
        await button.deferUpdate();
        if (!client.utils.canModifyQueue(queue.metadata)) return;

        if (queue.tracks.length < 3 && queue.repeatMode !== 3) {
          return queue.metadata.followUp({ content: "No more songs in the queue to skip!", ephemeral: true })
        } else {
          queue.skip();
          usedStop();
          queue.metadata.followUp({ content: "Skipped the current song!", ephemeral: true })
        }
        break;

      case "repeat":
        await button.deferUpdate();
        if (!client.utils.canModifyQueue(queue.metadata)) return;
        if (!queue.repeatMode || queue.repeatMode !== QueueRepeatMode.QUEUE) {
          queue.setRepeatMode(QueueRepeatMode.QUEUE)
          queue.metadata.followUp({ content: "Loop mode has been enabled!", ephemeral: true})
        } else if (queue.repeatMode === QueueRepeatMode.QUEUE) {
          queue.setRepeatMode(QueueRepeatMode.OFF)
          queue.metadata.followUp({ content: "Loop mode has been disabled!", ephemeral: true})
        }
        break;

      case "repeatThis":
        await button.deferUpdate();
        if (!client.utils.canModifyQueue(queue.metadata)) return;
        if (!queue.repeatMode || queue.repeatMode !== QueueRepeatMode.TRACK) {
          queue.setRepeatMode(QueueRepeatMode.TRACK)
          queue.metadata.followUp({ content: "Repeating current song now!", ephemeral: true})
        } else if (queue.repeatMode === QueueRepeatMode.TRACK) {
          queue.setRepeatMode(QueueRepeatMode.OFF)
          queue.metadata.followUp({ content: "Repeating current song now!", ephemeral: true})
        }
        break;

      case "stop":
        await button.deferUpdate();
        if (!client.utils.canModifyQueue(queue.metadata)) return;
        queue.stop();
        queue.metadata.followUp({ content: "Stopped the music!", ephemeral: true })
        usedStop();
        collector.stop();
        break;
        
      case "shuffle":
        await button.deferUpdate();
        if (!client.utils.canModifyQueue(queue.metadata)) return;
        if (queue.tracks.length < 3) return queue.metadata.followUp({ content: "Need atleast `3` songs in the queue to shuffle!", ephemeral: true})
        queue.shuffle();
        queue.metadata.followUp({ content: "Shuffled the queue!", ephemeral: true})
        break;
        
      case "volumeLess":
        await button.deferUpdate();
        if (!client.utils.canModifyQueue(queue.metadata)) return;
        let vol;
        if (queue.volume === 0) return queue.metadata.followUp({ content: "Volume cannot be lower than 0!", ephemeral: true})
        if (queue.volume - 10 <= 0) vol = 0
        else vol = queue.volume - 10;
        queue.setVolume(Number(vol));
        queue.metadata.followUp({ content: `Volume set to ${queue.volume}%`, ephemeral: true})
        break;
        
      case "volumeMore":
        await button.deferUpdate();
        if (!client.utils.canModifyQueue(queue.metadata)) return;
        let volume;
        if (queue.volume === 130) return queue.metadata.followUp({ content: "Volume cannot be higher than 130!", ephemeral: true})
        if (queue.volume + 10 >= 130) volume = 130;
        else volume = queue.volume + 10;
        queue.setVolume(Number(volume));
        queue.metadata.followUp({ content: `Volume set to ${queue.volume}%`, ephemeral: true})
        break;

      default: return;
    }
  });

    collector.on("end", () => {
      console.log("Queue ended!")
    })
  });
}
