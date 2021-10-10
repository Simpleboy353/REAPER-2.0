require("dotenv").config({ path: "src/.env" });

const fs = require("fs");
const chalk = require("chalk");

const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const { DEFAULT_PREFIX, BOT_TOKEN, ERROR_LOGS_CHANNEL, ALEXFLIPNOTE_API_KEY, YT_COOKIE } = require("./config.json");
const { loadCommands } = require("./handler/loadCommands");
const { loadEvents } = require("./handler/loadEvents");
const { loadSlashCommands } = require("./handler/loadSlashCommands")
const { loadPlayerEvents } = require("./handler/loadPlayerEvents");
const { DiscordTogether } = require('discord-together')
const { Player } = require('discord-player')
const Enmap = require("enmap")

const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});
const { checkValid } = require("./functions/validation/checkValid")
const Embeds = require("./functions/embeds/Embeds")
const Logger = require("./functions/Logger/Logger")
const Util = require("./functions/util/Util")

const alexClient = require("alexflipnote.js")
client.images = new alexClient(ALEXFLIPNOTE_API_KEY)
client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");
client.setMaxListeners(0);
const Cookie = YT_COOKIE;
client.logger = Logger;
client.utils = Util;
client.say = Embeds;
client.player = new Player(client, {
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmpty: false,
  leaveOnEmptyCooldown: 60000,
  autoSelfDeaf: true,
  initialVolume: 130,
  ytdlDownloadOptions: {
    requestOptions: {
      headers: {
        cookie: Cookie,
      }
    }
  },
})

client.player.use("YOUTUBE_DL", require("@discord-player/downloader").Downloader);
client.db = new Enmap({ name: "musicdb" });

loadCommands(client);
loadEvents(client);
loadPlayerEvents(client);
loadSlashCommands(client);
checkValid();

// Error Handling

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);

  const exceptionembed = new MessageEmbed()
  .setTitle("Uncaught Exception")
  .setDescription(`${err}`)
  .setColor("RED")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [exceptionembed] })
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );

   const rejectionembed = new MessageEmbed()
  .setTitle("Unhandled Promise Rejection")
  .addField("Promise", `${promise}`)
  .addField("Reason", `${reason.message}`)
  .setColor("RED")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [rejectionembed] })
});

client.login(BOT_TOKEN).then(() => {
  console.log(
    chalk.bgBlueBright.black(
      ` Successfully logged in as: ${client.user.username}#${client.user.discriminator} `
    )
  );
});
