const ytld = require("ytdl-core");
const { youtubeApiKey } = require("../../../config.json");
const YtApi = require("simple-youtube-api");
const { MessageEmbed } = require("discord.js");
const youtube = new YtApi(youtubeApiKey);

module.exports = {
  name: "play",
  description: "Play a song",
  aliases: ["p"],
  category: "music",
  usage: "play <youtube link | song name>",
  run: async(client, message, args, serverQueue, queue) =>{
    const lang = await client.getGuildLang(message.guild.id);
    const voiceChannel = message.member.voice.channel;
    const search = args[0];

    if (!search) {
      return message.channel.send(lang.MUSIC.PROVIDE_SEARCH);
    }

    if (!voiceChannel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    const vcMembers = voiceChannel.members;
    if (vcMembers.has(client.user.id)) {
      return message.channel.send(lang.MUSIC.ALREADY_IN_VC);
    }

    const perms = voiceChannel.permissionsFor(message.client.user);

    if (!perms.has("CONNECT") || !perms.has("SPEAK")) {
      return message.channel.send(lang.MUSIC.NO_PERMS);
    }

    let song = null;
    let songInfo = null;

    // check if URL
    try {
      if (
        new RegExp(
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi
        ).test(args.join(" "))
      ) {
        songInfo = await ytld.getInfo(args[0]);
      } else {
        const results = await youtube.searchVideos(args.join(" "), 1);

        if (!results[0]?.id) {
          return message.channel.send("There were no songs found");
        }

        const url = `https://youtu.be/${encodeURIComponent(results[0].id)}`;
        songInfo = await ytld.getInfo(url);
      }
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        duration: songInfo.videoDetails.lengthSeconds,
        uploadedBy: songInfo.videoDetails.author.name,
        uploadedAt: songInfo.videoDetails.uploadDate,
        views: songInfo.videoDetails.viewCount
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
        likes: songInfo.videoDetails.likes
          ?.toString()
          ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
        dislikes: songInfo.videoDetails.dislikes
          ?.toString()
          ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
        videoId: songInfo.videoDetails.videoId,
        requestedBy: message.author,
      };
    } catch (e) {
      console.log(e);
      console.log("PLAY ARGS:", args);
      return message.channel.send(lang.GLOBAL.ERROR);
    }

    if (!serverQueue || serverQueue.songs.length <= 0) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 3,
        playing: true,
        nowPlaying: null,
        id: message.channel.id,
      };

      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        // TODO: check if client is already in the voice chat
        const connection = await voiceChannel.join();
        queueConstruct.connection = connection;

        queueConstruct.nowPlaying = queueConstruct.songs[0];
        play(message.guild, queueConstruct.songs[0], queue, message, lang);
      } catch (e) {
        console.log(e);
      }
    } else {
      serverQueue.songs.push(song);
      const embed3 = new MessageEmbed()
        .setTitle(song.title)
        .setURL(song.url)
        .setAuthor(
          lang.MUSIC.ADDED_TO_QUEUE.replace(
            "{songs}",
            serverQueue.songs.length - 1
          )
        )
        .setImage(song.thumbnail)
        .setDescription(`${lang.MUSIC.DURATION}: ${song.duration}s`);

      serverQueue.textChannel.send({ embed3 });
    }
  },
};

function play(guild, song, queue, message, lang) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  serverQueue.nowPlaying = serverQueue.songs[0];

  const dispatcher = serverQueue.connection
    .play(ytld(song.url), { bitrate: 96 })
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0], queue, message, lang);
    })
    .on("error", (e) => console.log(e));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.connection.voice.setSelfDeaf(true);

  const embed2 = new MessageEmbed()
    .setTitle(song.title)
    .setURL(song.url)
    .setAuthor(`🎵 ${lang.MUSIC.NOW_PLAYING}`)
    .setImage(`https://i.ytimg.com/vi/${song.videoId}/hqdefault.jpg`)
    .setDescription(`${lang.MUSIC.REQUESTED_BY} ${song.requestedBy}`)
    .setFooter(
      `${lang.MUSIC.DURATION}: ${song.duration} ${lang.MUSIC.SECONDS} | ${lang.MUSIC.VOLUME
      }: ${serverQueue.volume * 10}%`
    );

  serverQueue.textChannel.send({ embed2 });
}