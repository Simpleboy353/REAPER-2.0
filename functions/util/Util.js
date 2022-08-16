const DJS = require("discord.js");

/**
 * @param {DJS.Client} client
 * @param {DJS.DiscordAPIError | DJS.HTTPError | Error } error
 * @param {"warning" | "error"} type
 */
async function sendErrorLog(client, error, type) {
  try {
    if (
      error.message?.includes("Missing Access") ||
      error.message?.includes("Missing Permissions")
    ) return;

    if (
      error.stack?.includes?.("DeprecationWarning: Listening to events on the Db class")
    ) return;

    const { ERROR_LOGS_CHANNEL } = require("../../config.json");
    const channelId = ERROR_LOGS_CHANNEL;
    if (!channelId) {
      return client.logger.error("ERR_LOG", error?.stack || `${error}`);
    }

    const channel = (client.channels.cache.get(channelId) ||
      (await client.channels.fetch(channelId)));

    if (!channel || !havePermissions(channel)) {
      return client.logger.error("ERR_LOG", error?.stack || `${error}`);
    }

    const webhooks = await channel.fetchWebhooks();
    const hook = webhooks.first();

    if (!hook) {
      return client.logger.error("ERR_LOG", error?.stack || `${error}`);
    }

    const code = error.code || "N/A";
    const httpStatus = error.httpStatus || "N/A";
    const requestData = error.requestData ?? { json: {} };
    const name = error.name || "N/A";
    let stack = error.stack || error;
    let jsonString;

    try {
      jsonString = JSON.stringify(requestData.json, null, 2);
    } catch {
      jsonString = "";
    }

    if (jsonString?.length >= 4096) {
      jsonString = jsonString ? `${jsonString?.substr(0, 4090)}...` : "";
    }

    if (typeof stack === "object") stack = JSON.stringify(stack);

    if (typeof stack === "string" && stack.length >= 4096) {
      console.error(stack);
      stack = "An error occurred but was too long to send to Discord, check your console.";
    }

    const { codeBlock } = require("@discordjs/builders");

    const embed = new DJS.EmbedBuilder()
      .setTitle("An error occurred")
      .addFields([
        { name: "Name", value: name },
        { name: "Code", value: code.toString() },
        { name: "httpStatus", value: httpStatus.toString() },
        { name: "Timestamp", value: client.logger.now },
        { name: "Request data", value: codeBlock(jsonString?.substr(0, 1020)) }
      ])
      .setDescription(`${codeBlock(stack)}`)
      .setColor(type === "error" ? "Red" : "Orange");

    await hook.send({ embeds: [embed] });
  } catch (e) {
    console.error({ error });
    console.error(e);
  }
}

/**
 * Check if the client has the default permissions
 * @param {DJS.Interaction | DJS.TextChannel} resolveable
 * @returns {boolean}
 */
function havePermissions(resolveable) {
  const ch = "channel" in resolveable ? resolveable.channel : resolveable;
  if (ch instanceof DJS.ThreadChannel || ch instanceof DJS.DMChannel) return true;
  return (
    ch.permissionsFor(resolveable.guild.members.me)?.has("ViewChannel") &&
    ch.permissionsFor(resolveable.guild.members.me)?.has("SendMessages") &&
    ch.permissionsFor(resolveable.guild.members.me)?.has("EmbedLinks")
  );
}

/**
 * @param {string} str
 * @returns {string}
 */
function toCapitalize(str) {
  if ((str === null) || (str === "")) {
    return false;
  } else {
    str = str.toString();
  }

  return str.replace(/\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() +
        txt.substr(1).toLowerCase();
    });
}

/**
 * @param {number | string} n
 * @returns {string}
 */
function formatNumber(n) {
  return Number.parseFloat(String(n)).toLocaleString("be-BE");
}

/**
 * @param {number} int
 * @returns {string}
 */
function formatInt(int) {
  return (int < 10 ? `0${int}` : int);
}

/**
 * Format duration to string
 * @param {number} millisec Duration in milliseconds
 * @returns {string}
 */
function formatDuration(millisec) {
  if (!millisec || !Number(millisec)) return "00:00";
  const seconds = Math.round((millisec % 60000) / 1000);
  const minutes = Math.floor((millisec % 3600000) / 60000);
  const hours = Math.floor(millisec / 3600000);
  if (hours > 0) return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
  if (minutes > 0) return `${formatInt(minutes)}:${formatInt(seconds)}`;
  return `00:${formatInt(seconds)}`;
};


/**
 * Convert formatted duration to seconds
 * @param {string} formatted duration input
 * @returns {number}
 */
function toMilliSeconds(input) {
  if (!input) return 0;
  if (typeof input !== "string") return Number(input) || 0;
  if (input.match(/:/g)) {
    const time = input.split(":").reverse();
    let s = 0;
    for (let i = 0; i < 3; i++)
      if (time[i]) s += Number(time[i].replace(/[^\d.]+/g, "")) * Math.pow(60, i);
    if (time.length > 3) s += Number(time[3].replace(/[^\d.]+/g, "")) * 24 * 60 * 60;
    return Number(s * 1000);
  } else {
    return Number(input.replace(/[^\d.]+/g, "") * 1000) || 0;
  }
}


/**
 * Parse number from input
 * @param {*} input Any
 * @returns {number}
 */
function parseNumber(input) {
  if (typeof input === "string") return Number(input.replace(/[^\d.]+/g, "")) || 0;
  return Number(input) || 0;
}

/**
 * @param {string} string
 * @returns {string}
 */
function codeContent(string, extension = "") {
  return `\`\`\`${extension}\n${string}\`\`\``;
}

/**
 * Check if modify queue
 * @param {Interaction} interaction
 * @returns {boolean}
 */
function canModifyQueue(interaction) {
  const memberChannelId = interaction.member.voice.channelId;
  const clientChannelId = interaction.guild.members.me.voice.channelId;

  if (!memberChannelId) {

    const embed1 = new DJS.EmbedBuilder()
      .setDescription("You need to join a voice channel first!")
      .setColor("Orange");

    return interaction.editReply({ ephemeral: true, embeds: [embed1], allowedMentions: { repliedUser: false } }).catch(console.error);
  }

  if (memberChannelId !== clientChannelId) {

    const embed2 = new DJS.EmbedBuilder()
      .setDescription("You must be in the same voice channel as me!")
      .setColor("ORANGE");

    return interaction.editReply({ ephemeral: true, embeds: [embed2], allowedMentions: { repliedUser: false } }).catch(console.error);
  }

  return true;
}

module.exports = {
  sendErrorLog,
  havePermissions,
  toCapitalize,
  formatNumber,
  formatInt,
  formatDuration,
  toMilliSeconds,
  parseNumber,
  codeContent,
  canModifyQueue
};
