const fs = require("fs");
const chalk = require("chalk");

const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { DEFAULT_PREFIX, BOT_TOKEN, ERROR_LOGS_CHANNEL, YT_COOKIE } = require("./config.json");
const { loadCommands } = require("./handler/loadCommands");
const { loadEvents } = require("./handler/loadEvents");
const { loadSlashCommands } = require("./handler/loadSlashCommands")
const { loadPlayerEvents } = require("./handler/loadPlayerEvents");
const { DiscordTogether } = require('discord-together');
const { Player } = require('discord-player');
const Enmap = require("enmap");

const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  intents: 47007
});
const { checkValid } = require("./functions/validation/checkValid");
const Embeds = require("./functions/embeds/Embeds");
const Logger = require("./functions/Logger/Logger");
const Util = require("./functions/util/Util");

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
const player = new Player(client, {
  leaveOnEnd: true,
  leaveOnStop: true,
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
});

client.player = player;
client.db = new Enmap({ name: "musicdb" });

loadCommands(client);
loadEvents(client);
loadPlayerEvents(client);
loadSlashCommands(client);
checkValid();

// Error Handling

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);

  const exceptionembed = new EmbedBuilder()
  .setTitle("Uncaught Exception")
  .setDescription(`${err}`)
  .setColor("Red")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [exceptionembed] })
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );

   const rejectionembed = new EmbedBuilder()
  .setTitle("Unhandled Promise Rejection")
  .addFields([
    { name: "Promise", value: `${promise}` },
    { name: "Reason", value: `${reason.message}` },
  ])
  .setColor("Red")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [rejectionembed] })
});

client.login(BOT_TOKEN).then(() => {
  console.log(
    chalk.bgBlueBright.black(
      ` Successfully logged in as: ${client.user.tag}`
    )
  );
});
