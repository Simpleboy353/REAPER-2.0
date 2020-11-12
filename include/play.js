const ytdlDiscord = require("ytdl-core-discord");
const scdl = require("soundcloud-downloader");
const { canModifyQueue } = require("../util/EvobotUtil");
const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  async play(song, message) {
    const { PRUNING, SOUNDCLOUD_CLIENT_ID } = require("../config.json");
    const queue = message.client.queue.get(message.guild.id);

    if (!song) {
      const embed = new Discord.MessageEmbed()
        .setDescription("🚫 Music queue ended.")
        .setColor("RED");

      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      return queue.textChannel.send(embed).catch(console.error);
    }

    let stream = null;
    let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

    try {
      if (song.url.includes("youtube.com")) {
        stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
      } else if (song.url.includes("soundcloud.com")) {
        try {
          stream = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined);
        } catch (error) {
          stream = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined);
          streamType = "unknown";
        }
      }
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      console.error(error);
      const errorembed = new Discord.MessageEmbed()
        .setDescription(`Error: ${error.message ? error.message : error}`)
        .setColor("BLUE")
      return message.channel.send(errorembed);
    }

    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

    const dispatcher = queue.connection
      .play(stream, { type: streamType })
      .on("finish", () => {
        if (collector && !collector.ended) collector.stop();

        if (queue.loop) {
          // if loop is on, push the song back at the end of the queue
          // so it can repeat endlessly
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], message);
        } else {
          // Recursively play the next song
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 100);
    const embed1 = new Discord.MessageEmbed()
      .setDescription(`🎶 Started playing: **[${song.title}](${song.url}) [${message.author}]**`)
      .setColor("BLUE");

    try {
      var playingMessage = await queue.textChannel.send(embed1);
      await playingMessage.react("⏭️");
      await playingMessage.react("⏯️");
      await playingMessage.react("🔁");
      await playingMessage.react("⏹️");
    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000
    });

    collector.on("collect", (reaction, user) => {
      if (!queue) return;
      const member = message.guild.member(user);

      switch (reaction.emoji.name) {
        case "⏭️":
          queue.playing = true;
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.connection.dispatcher.end();
          const embed2 = new Discord.MessageEmbed()
            .setDescription(`⏭️ Skipped the song`)
            .setColor("BLUE");
          queue.textChannel.send(embed2).catch(console.error);
          collector.stop();
          break;

        case "⏯️":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.playing) {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.pause(true);
            const embed3 = new Discord.MessageEmbed()
              .setDescription(`⏸️ Paused the music.`)
              .setColor("BLUE");
            queue.textChannel.send(embed3).catch(console.error);
          } else {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.resume();
            const embed4 = new Discord.MessageEmbed()
              .setDescription(`▶️ Resumed the music!`)
              .setColor("BLUE")
            queue.textChannel.send(embed4).catch(console.error);
          }
          break;

        case "🔁":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.loop = !queue.loop;
          const embed5 = new Discord.MessageEmbed()
            .setDescription(`Loop is now ${queue.loop ? "**on**" : "**off**"}`)
            .setColor("BLUE")
          queue.textChannel.send(embed5).catch(console.error);
          break;

        case "⏹️":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.songs = [];
          const embed6 = new Discord.MessageEmbed()
            .setDescription(`⏹️ Stopped the music!`)
            .setColor("BLUE")
          queue.textChannel.send(embed6).catch(console.error);
          try {
            queue.connection.dispatcher.end();
          } catch (error) {
            console.error(error);
          }
          collector.stop();
          break;

        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });

    collector.on("end", () => {
      playingMessage.reactions.removeAll().catch(console.error);
      if (PRUNING && playingMessage && !playingMessage.deleted) {
        playingMessage.delete({ timeout: 3000 }).catch(console.error);
      }
    });
  }
};
