/**
 * REAPER 2.0 - Main Bot Entry Point
 * 
 * This is the core initialization file for the REAPER Discord bot. It:
 * - Instantiates the Discord bot client with proper configuration
 * - Loads all commands, events, and slash commands from handler functions
 * - Configures the music player for audio playback
 * - Sets up global error handling for uncaught exceptions and promise rejections
 * - Establishes database connections and utility functions
 */

const fs = require("fs");
const chalk = require("chalk");

// Discord.js core components:
// - Client: Main bot instance that connects to Discord
// - Collection: Map-like data structure for storing commands, aliases, etc.
// - GatewayIntentBits: Permission flags that determine which Discord events the bot receives
// - EmbedBuilder: Creates rich formatted messages (embeds) for better message presentation
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require("discord.js");

// Configuration values loaded from config.json file:
// - BOT_TOKEN: Discord bot authentication token
// - DEFAULT_PREFIX: Command prefix (e.g., "!" for "!help")
// - ERROR_LOGS_CHANNEL: Discord channel ID where bot errors are logged
// - YT_COOKIE: YouTube cookie for bypassing playback restrictions
const { DEFAULT_PREFIX, BOT_TOKEN, ERROR_LOGS_CHANNEL, YT_COOKIE } = require("./config.json");
// Handler functions that load features into the bot:
// - loadCommands: Imports all prefix-based commands (e.g., "!help", "!play")
// - loadEvents: Registers bot event listeners (e.g., message events, member joins)
// - loadSlashCommands: Imports all Discord slash commands (e.g., "/help", "/play")
// - loadPlayerEvents: Registers music player specific events (track end, queue update, etc.)
// [When testing this old version showed to perform well]
const { loadCommands } = require("./handler/loadCommands");
const { loadEvents } = require("./handler/loadEvents");
const { loadSlashCommands } = require("./handler/loadSlashCommands")
const { loadPlayerEvents } = require("./handler/loadPlayerEvents");

// Third-party feature modules:
// - DiscordTogether: Enables Discord's built-in watch-together activities (YouTube, Poker, etc.)
// - Player: Music player engine from discord-player library for audio playback
// - Enmap: Persistent key-value database for storing music preferences and data
const { DiscordTogether } = require('discord-together');
const { Player } = require('discord-player');
const Enmap = require("enmap");


// ==== Create the Discord client (the bot instance) ====
const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  intents: 47007
});
// ==== Custom utility/function imports ====
// Helper modules that provide reusable functionality across the entire bot:
const { checkValid } = require("./functions/validation/checkValid");
const Embeds = require("./functions/embeds/Embeds");
const Logger = require("./functions/Logger/Logger");
const Util = require("./functions/util/Util");

// --- Attach features to the client so they're accessible anywhere via `client.x` ---
// These Collections and features are attached to the client object so any command/event can access them
client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");
client.setMaxListeners(0);
// Store YouTube cookie for music playback
const Cookie = YT_COOKIE;
// Attach utility modules to client for global access
client.logger = Logger;
client.utils = Util;
client.say = Embeds;
// ==== Set up the music player ====
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
// Attach player instance to client for access from commands/events
client.player = player;
// Create persistent database for storing music-related data (favorites, playlists, user preferences)
client.db = new Enmap({ name: "musicdb" });
// ==== Load all bot features ====
loadCommands(client);
loadEvents(client);
loadPlayerEvents(client);
loadSlashCommands(client);
checkValid();


// ==== Global Error Handling ====
// These handlers catch critical errors that would otherwise crash the bot
// Uncaught exceptions: Errors thrown in synchronous code that weren't caught by any try/catch
// Without this handler, the bot process would crash and need manual restart
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);


 // Log the error to Discord's error logging channel for bot owner visibility

  const exceptionembed = new EmbedBuilder()
  .setTitle("Uncaught Exception")
  .setDescription(`${err}`)
  .setColor("Red")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [exceptionembed] })
});

// Unhandled promise rejections: Async errors in .then()/.catch() or async/await without error handling
// These are often database errors, API call failures, or other async operations that failed
process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );
  
  // Log rejection details to Discord for debugging and monitoring
   const rejectionembed = new EmbedBuilder()
  .setTitle("Unhandled Promise Rejection")
  .addFields([
    { name: "Promise", value: `${promise}` },
    { name: "Reason", value: `${reason.message}` },
  ])
  .setColor("Red")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [rejectionembed] })
});

// -- Log the bot in ---
// Authenticate with Discord using the bot token from config.json
// The .then() callback fires when connection is successful
client.login(BOT_TOKEN).then(() => {
  // Print confirmation message showing bot's tag (Username#Discriminator or Username#0000 format)
  console.log(
    chalk.bgBlueBright.black(
      ` Successfully logged in as: ${client.user.tag}`
    )
  );
});
