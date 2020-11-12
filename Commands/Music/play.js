const { play } = require("../../include/play");
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID } = require("../../config.json");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const scdl = require("soundcloud-downloader");
const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "play",
  cooldown: 3,
  aliases: ["p"],
  description: "Plays audio from YouTube or Soundcloud",
  run: async(client, message, args) => {
    const { channel } = message.member.voice;
    const embed5 = new Discord.MessageEmbed()
      .setDescription(`You need to join a voice channel first!`)
      .setColor("BLUE")
    const embed6 = new Discord.MessageEmbed()
      .setDescription(`You must be in the same channel as ${message.client.user}`)
      .setColor("BLUE")

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel) return message.channel.send(embed5).catch(console.error);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.channel.send(embed6).catch(console.error);

    const embed4 = new Discord.MessageEmbed()
      .setDescription("Usage: =play <YouTube URL | Video Name | Soundcloud URL>")
      .setColor("BLUE");

    if (!args.length)
      return message
        .channel.send(embed4)
        .catch(console.error);

    const embed7 = new Discord.MessageEmbed()
      .setDescription(`Cannot connect to voice channel, missing permissions`)
      .setColor("BLUE")
    const embed8 = new Discord.MessageEmbed()
      .setDescription(`I cannot speak in this voice channel, make sure I have proper permissions!`)
      .setColor("BLUE")

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send(embed7);
    if (!permissions.has("SPEAK"))
      return message.channel.send(embed8);

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(message, args);
    }

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let songInfo = null;
    let song = null;
    const embed9 = new Discord.MessageEmbed()
      .setDescription(`Couldn't find that SoundCloud Track!`)
      .setColor("BLUE")
    const embed10 = new Discord.MessageEmbed()
      .setDescription(`There was an error playing that SoundCloud Track!`)
      .setColor("BLUE")

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds
        };
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    } else if (scRegex.test(url)) {
      try {
        const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
        song = {
          title: trackInfo.title,
          url: trackInfo.permalink_url,
          duration: trackInfo.duration
        };
      } catch (error) {
        if (error.statusCode === 404)
          return message.channel.send(embed9).catch(console.error);
        return message.channel.send(embed10).catch(console.error);
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1);
        songInfo = await ytdl.getInfo(results[0].url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds
        };
      } catch (error) {
        console.error(error);
        const embed11 = new Discord.MessageEmbed()
          .setDescription("No video was found with a matching title")
          .setColor("RED")
        return message.channel.send(embed11).catch(console.error);
      }
    }
    const embed = new Discord.MessageEmbed()
      .setDescription(`✅ **[${song.title}](${song.url})** added to queue [${message.author}]`)
      .setColor("RANDOM");

    if (serverQueue) {
      serverQueue.songs.push(song);
      return serverQueue.textChannel
        .send(embed)
        .catch(console.error);
    }

    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);

    try {
      queueConstruct.connection = await channel.join();
      await queueConstruct.connection.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0], message);
    } catch (error) {
      console.error(error);
      message.client.queue.delete(message.guild.id);
      const embed12 = new Discord.MessageEmbed()
        .setDescription(`Could not join the channel: ${error}`)
        .setColor("BLUE")
      return message.channel.send(embed12).catch(console.error);
    }
  }
};
