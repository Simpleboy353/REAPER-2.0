const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const { joinVoiceChannel } = require("@discordjs/voice")
const { QueueRepeatMode } = require('discord-player');
const { waitForDebugger } = require('inspector');

module.exports = {
    name: "track",
    description: "Listen to music in your server!",
    subCommands: ["play", "pause", "previoustrack", "info", "jump", "lyrics", "loop", "mute", "move", "queue", "remove", "resume", "seek", "shuffle", "skip", "stop", "volume", "unmute"],
    category: "Music",
    options: [
        {
            name: "clearqueue",
            description: "Deltes the music queue an leave the voice channel!",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "play",
            description: "Plays a song",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "song",
                    description: "Song to play",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                }
            ]
        },
        {
            name: "pause",
            description: "Pauses the current song",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "previoustrack",
            description: "play the previous track again!",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "info",
            description: "Get info for the current or a specific song in the queue!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "index",
                    description: "Index of the song in the queue!",
                    required: false,
                    type: ApplicationCommandOptionType.Number,
                }
            ]
        },
        {
            name: "jump",
            description: "Jump to a specific song in the queue!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "index",
                    description: "Provide the index number of the song!",
                    required: true,
                    type: ApplicationCommandOptionType.Number,
                }
            ]
        },
        {
            name: "lyrics",
            description: "Get the lyrics for a song!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "query",
                    description: "The song to get the lyrics for!",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                }
            ]
        },
        {
            name: "loop",
            description: "Loop a song or the whole queue!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "mode",
                    description: "choose a new loop mode to chnage!",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                    choices: [
                        {
                            name: "Off",
                            value: "off"
                        },
                        {
                            name: "Track",
                            value: "track"
                        },
                        {
                            name: "Queue",
                            value: "queue"
                        },
                        {
                            name: "Autoplay",
                            value: "autoplay"
                        }
                    ]
                }
            ]
        },
        {
            name: "mute",
            description: "Mutes the volume!",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "move",
            description: "Change the position of songs in the queue!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "from",
                    description: "The position to move the song from!",
                    required: true,
                    type: ApplicationCommandOptionType.Number,
                },
                {
                    name: "to",
                    description: "The position to move the song to!",
                    required: true,
                    type: ApplicationCommandOptionType.Number,
                }
            ]
        },
        {
            name: "queue",
            description: "Shows the music queue for your server!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "page",
                    description: "Page number of the queue!",
                    required: false,
                    type: ApplicationCommandOptionType.Number,
                }
            ]
        },
        {
            name: "remove",
            description: "Remove a song from the queue!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "index",
                    description: "Index of the song to remove!",
                    required: true,
                    type: ApplicationCommandOptionType.Number,
                }
            ]
        },
        {
            name: "resume",
            description: "Resume the queue",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "seek",
            description: "Seek to a specific postion of the current song!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "duration",
                    description: "The duration of the song <mm:ss>",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                }
            ]
        },
        {
            name: "shuffle",
            description: "Shuffle the queue!",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "skip",
            description: "Skip the current song in the queue!",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "stop",
            description: "Stop the music and leave the voice channel!",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "volume",
            description: "Change the volume of the music!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "amount",
                    description: "The amount of volume of increase!",
                    required: true,
                    type: ApplicationCommandOptionType.Number,
                }
            ]
        },
        {
            name: "unmute",
            description: "UInmutes the volume!",
            type: ApplicationCommandOptionType.Subcommand
        }
    ],
    userPerms: ["Connect", "ViewChannel"],
    noUserPermsMessage: `You need the \`Connect\` and \`View Channel\` permissions to use these commands!`,
    botPerms: ["ViewChannel", "Connect", "Speak"],
    noBotPermsMessage: `I am missing one of the following permissions: \`Connect\`, \`View Channel\`, \`Speak\``,
    run: async(client, interaction, args) => {

    await interaction.deferReply();
        if (interaction.options.getSubcommand() === "clearqueue") {
            const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing)
             return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

        if (!client.utils.canModifyQueue(interaction)) return;

        if (queue.tracks.length < 1)
             return client.say.warnMessage(interaction, "There is currently no song in the queue.");

        queue.clear();

        return client.say.infoMessage(interaction, "Cleared the queue.");
        } else if (interaction.options.getSubcommand() === "play") {
            if (!client.utils.havePermissions(interaction))
      return client.say.errorMessage(interaction, "I need **\`EMBED_LINKS\`** permission.");

    const string = await interaction.options.getString("song", true);

    const guildQueue = client.player.getQueue(interaction.guild.id);

    const channel = await interaction.member?.voice?.channel;

    if (!channel)
      return client.say.warnMessage(interaction, "You have to join a voice channel first.");

    if (guildQueue && channel.id !== interaction.guild.me.voice.channelId)
      return client.say.warnMessage(interaction, "I'm already playing in a different voice channel!");

    if (!channel?.viewable)
      return client.say.warnMessage(interaction, "I need **\`VIEW_CHANNEL\`** permission.");
    if (!channel?.joinable)
      return client.say.warnMessage(interaction, "I need **\`CONNECT_CHANNEL\`** permission.");
    /**if (!channel?.speakable)
      return client.say.warnMessage(interaction, "I need **\`SPEAK\`** permission.");
    if (channel?.full)
      return client.say.warnMessage(interaction, "Can't join, the voice channel is full."); */

    let result = await client.player.search(string, { requestedBy: interaction.user }).catch(() => {});
    if (!result || !result.tracks.length)
      return client.say.errorMessage(interaction, `No result was found for \`${string}\`.`);

    let queue;
    if (guildQueue) {
      queue = guildQueue;
      queue.metadata = interaction;
    } else {
      queue = await client.player.createQueue(interaction.guild, {
        ytdlOptions: {
            quality: "highest",
            filter: "audioonly",
            highWaterMark: 1 << 25,
            dlChunkSize: 0
        },
        metadata: interaction
      });
    }

    try {
      if (queue.connection) return;
      else await queue.connect(channel);
      const embed = new EmbedBuilder()
      .setDescription(`👍 Joined ${interaction.member.voice.channel.toString()}`)
      .setColor(queue.guild.members.me.displayColor || "#00FFFF");

      await interaction.editReply({ embeds: [embed]})
      
    } catch (error) {
      client.logger.error("JOIN", error);
      client.player.deleteQueue(interaction.guild.id);
      return client.say.errorMessage(interaction, `Could not join your voice channel!\n\`${error}\``);
    }

    result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);

    if (!queue.playing) await queue.play();
        } else if (interaction.options.getSubcommand() === "pause") {
            const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.canModifyQueue(interaction)) return;

    if (queue.connection.paused)
      return client.say.warnMessage(interaction, "The song is already paused.");

    queue.setPaused(true);
    return client.say.infoMessage(interaction, "Paused the current song.");
        } else if (interaction.options.getSubcommand() === "previoustrack") {
            const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.canModifyQueue(interaction)) return;

    if (queue.previousTracks.length <= 1)
      return client.say.warnMessage(interaction, "No previous track was found.");

    queue.back();

    return client.say.infoMessage(interaction, "Backed to the previous song.");

        } else if (interaction.options.getSubcommand() === "info") {

            const index = interaction.options.getNumber("index", false);

            const queue = client.player.getQueue(interaction.guild.id);
        
            if (!queue || !queue.current)
              return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
        
            let song = queue.current;
        
            if (index) {
              songNum = (index - 1);
        
              if (!queue.tracks[songNum] || songNum > queue.tracks.length || songNum < 0)
                return client.say.errorMessage(interaction, "Provided Song Index does not exist.");
        
              song = queue.tracks[songNum]
            }
        
            const embed = new EmbedBuilder()
              .setColor(interaction.guild.members.me.displayColor || "#00FFFF")
              .setTitle(`${song.title}`)
              .setURL(`${song.url}`)
              .setImage(`${song.thumbnail}`);
        
            if (song === queue.current) {
              embed.setAuthor(`Now playing 🎶`)
                .setDescription(`~ Played by: ${song.requestedBy.toString()}
        ${queue.createProgressBar()}`)
        .setImage(`${song.thumbnail}`);
            } else {
              embed.setAuthor("Songinfo 🎵")
                .setDescription(`~ Requested by: ${song.requestedBy.toString()}
        Duration: ${song.duration}
        Position in queue: ${index}`);
            }
        
            return interaction.editReply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);

        } else if (interaction.options.getSubcommand() === "jump") {

            const index = interaction.options.getNumber("index", true);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.canModifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return client.say.errorMessage(interaction, "There is currently no song in the queue.");

    if (!index || index > queue.tracks.length || index < 1 || !queue.tracks[index])
      return client.say.errorMessage(interaction, "Provided song index does not exist.");

    queue.jump(index);

    return client.say.infoMessage(interaction, `Jumped to song \`${index}\`.`);
        } else if (interaction.options.getSubcommand() === "lyrics") {
            const songName = interaction.options.getString("query", true);

            const songNameFormated = songName
            .toLowerCase()
            .replace(/\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq\)/g, "");

            try {
            const result = await lyricsClient.search(`${songNameFormated}`);

            if (!result || !result.lyrics)
                return client.say.errorMessage(interaction, "No lyrics were found for this song.");

            const embed = client.say.baseEmbed(interaction)
                .setTitle(`${songName}`)
                .setDescription(`${result.lyrics.slice(0, 4090)}...`);

            return interaction.editReply({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
            } catch {
            return client.say.errorMessage(interaction, "No lyrics were found for this song.");
            }
        } else if (interaction.options.getSubcommand() === "loop") {
            const arg = interaction.options.getString("mode", false);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.canModifyQueue(interaction)) return;

    let md = "none";
    if (queue.repeatMode === 3) {
      md = "autoplay";
    } else if (queue.repeatMode == 2) {
      md = "queue";
    } else if (queue.repeatMode == 1) {
      md = "track";
    } else if (queue.repeatMode == 0) {
      md = "off";
    }

    const embed = client.say.rootEmbed(interaction)
      .setDescription(`Loop mode is set to: \`${md}\`.`)
      .setFooter(`Use \'\/loop <off|track|queue|autoplay>\' to change loop mode.`);

    if (!arg)
      return interaction.editReply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);

    let mode;
    switch (arg) {
      case "off":
        queue.setRepeatMode(QueueRepeatMode.OFF);
        mode = "Turned off loop mode.";
        break;
      case "track":
        queue.setRepeatMode(QueueRepeatMode.TRACK);
        mode = "Repeating track activated";
        break;
      case "queue":
        queue.setRepeatMode(QueueRepeatMode.QUEUE);
        mode = "Looping queue enabled.";
        break;
      case "autoplay":
        queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
        mode = "Autoplay mode activated.";
        break;
      default:
        return interaction.editReply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
    }

    return client.say.infoMessage(interaction, `${mode}`);

        } else if (interaction.options.getSubcommand() === "mute") {

        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing)
          return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
    
        if (!client.utils.canModifyQueue(interaction)) return;
    
        if (queue.volume === 0)
          return client.say.warnMessage(interaction, "The song is already muted.");
    
        queue.mute();
        return client.say.infoMessage(interaction, "Muted the playback.");

        } else if (interaction.options.getSubcommand() === "move") {

            const fr = await interaction.options.getNumber("from", true);
    let to = await interaction.options.getNumber("to") ?? 1;
    to = to - 1;

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.canModifyQueue(interaction)) return;

    if (queue.tracks.length < 3)
      return client.say.warnMessage(interaction, "Need at least \`3\` songs in the queue to use this command.");

    if (!fr || !to || fr < 0 || to < 0 || fr > queue.tracks.length || !queue.tracks[fr] || to > queue.tracks.length || !queue.tracks[to])
      return client.say.warnMessage(interaction, "Provided Song Index does not exist.");

    if (fr === to)
      return client.say.warnMessage(interaction, "The song is already in this position.");

    const song = queue.tracks[fr];
    queue.splice(fr, 1);
    queue.splice(to, 0, song);

    return client.say.infoMessage(interaction, `**[${song.title}](${song.url})** has been moved to the **position ${to}** in the queue.`);
        } else if (interaction.options.getSubcommand() === "queue") {
            let page = interaction.options.getNumber("page", false) ?? 1;

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!queue.tracks.length)
      return client.say.warnMessage(interaction, "There is currently no song in the queue.");

    const multiple = 10;

    const maxPages = Math.ceil(queue.tracks.length / multiple);

    if (page < 1 || page > maxPages) page = 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.tracks.slice(start, end);

    const embed = client.say.rootEmbed(interaction)
      .setDescription(`${tracks.map((song, i) => `${start + (++i)} - [${song.title}](${song.url}) ~ [${song.requestedBy.toString()}]`).join("\n")}`)
      .setFooter(`Page ${page} of ${maxPages} | song ${start + 1} to ${end > queue.tracks.length ? `${queue.tracks.length}` : `${end}`} of ${queue.tracks.length}`, interaction.user.displayAvatarURL({ dynamic: true }));

    return interaction.editReply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
        } else if (interaction.options.getSubcommand() === "remove") {
            const sNum = interaction.options.getNumber("index", true);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.canModifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return client.say.warnMessage(interaction, "There's no song to remove in the queue.");

    const index = (sNum - 1);

    if (!index || index < 0 || index > queue.tracks.length || !queue.tracks[index])
      return client.say.warnMessage(interaction, "Provided Song Index does not exist.");

    queue.remove(index);

    return client.say.infoMessage(interaction, `Removed track \`${sNum}\`.`);
        
        } else if (interaction.options.getSubcommand() === "resume") {
            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            if (!queue.connection.paused)
              return client.say.warnMessage(interaction, "The song is not paused.");
        
            queue.setPaused(false);
            return client.say.infoMessage(interaction, "Resumed the corrent song.");
        } else if (interaction.options.getSubcommand() === "seek") {
            let timeString = interaction.options.getString("duration", true);

            const queue = client.player.getQueue(interaction.guild.id);
        
            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            const song = queue.current;
        
            if (song.live)
              return client.say.warnMessage(interaction, "Can't seek this song.");
        
            if (isNaN(timeString) && !timeString.includes(":"))
              return client.say.errorMessage(interaction, "Provide a valid duration to seek.");
        
            if (!isNaN(timeString)) timeString = `00:${timeString}`;
        
            const time = client.utils.toMilliSeconds(timeString);
        
            if (!time || isNaN(time) || time > song.durationMS || time < 0)
              return client.say.warnMessage(interaction, "Provide a valid duration to seek.");
        
            queue.seek(time);
        
            return client.say.infoMessage(interaction, `Seeked to \`${timeString}\`.`);
        } else if (interaction.options.getSubcommand() === "shuffle") {
            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            if (queue.tracks.length < 3)
              return client.say.warnMessage(interaction, "Need at least \`3\` songs in the queue to shuffle.");
        
            queue.shuffle();
        
            return client.say.infoMessage(interaction, "Shuffled the queue.");
        } else if (interaction.options.getSubcommand() === "skip") {
            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            if (queue.tracks.length < 1 && queue.repeatMode !== 3)
              return client.say.warnMessage(interaction, "No more songs in the queue to skip.");
        
            queue.skip();
        
            return client.say.infoMessage(interaction, "Skipped to the next song.");
        } else if (interaction.options.getSubcommand() === "stop") {
            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            queue.stop();
        
            return client.say.infoMessage(interaction, "Stopped the music.");
        } else if (interaction.options.getSubcommand() === "volume") {
            const newVol = interaction.options.getNumber("amount", false);

            const queue = client.player.getQueue(interaction.guild.id);
        
            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            if (!newVol) {
              const embed = client.say.rootEmbed(interaction)
                .setDescription(`Volume is at \`${queue.volume}%\`.`)
                .setFooter(`Use \'\/volume <1-200>\' to change the volume.`);
        
              return interaction.editReply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
            }
        
            if (!Number.isInteger(newVol) || newVol > 200 || newVol < 0)
              return client.say.warnMessage(interaction, "Provide a valid number between 1 to 200.");
        
            queue.setVolume(newVol);
        
            return client.say.infoMessage(interaction, `Volume is updated to \`${queue.volume}%\`.`);
        } else if (interaction.options.getSubcommand() === "unmute") {
            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            if (queue.volume > 0)
              return client.say.warnMessage(interaction, "The song is already unmuted.");
        
            queue.unmute();
            return client.say.infoMessage(interaction, "Unmuted the playback.");
        }
    }
}
