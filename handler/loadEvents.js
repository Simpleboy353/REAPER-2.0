const clientEvent = (event) => require(`../events/client/${event}`);
const guildEvent = (event) => require(`../events/guild/${event}`);
const menuEvents = (event) => require(`../events/interactions/menus/${event}`)
const otherEvent = (event) => require(`../events/functions/${event}`);
const Discord = require("discord.js");

function loadEvents(client) {
  const cooldowns = new Discord.Collection();

  // client events
  client.on("ready", () => clientEvent("ready")(client));
  client.on("messageCreate", (m) => clientEvent("mention")(m, client));

  // guild events
  client.on('interactionCreate', (m) => guildEvent("interactionCreate")(m, client));
  client.on("messageCreate", (m) => guildEvent("command")(m, cooldowns));
  client.on('messageDelete', (m) => guildEvent("messageDelete")(m))
  client.on("messageUpdate", (m, n) => guildEvent("messageUpdate")(m, n));
  client.on("channelCreate", (m) => guildEvent("channelCreate")(m));
  client.on("channelDelete", (m) => guildEvent("channelDelete")(m));
  client.on("roleCreate", (m) => guildEvent("roleCreate")(m));
  client.on("roleDelete", (m) => guildEvent("roleDelete")(m));
  client.on("channelUpdate", (m, n) => guildEvent("channelUpdate")(m, n));
  client.on("roleUpdate", (m, n) => guildEvent("roleUpdate")(m, n));
  client.on("guildMemberUpdate", (m, n) => guildEvent("guildMemberUpdate")(m, n));
  client.on("guildMemberAdd", (m) => guildEvent("guildMemberAdd")(m));
  client.on("guildMemberRemove", (m) => guildEvent("guildMemberRemove")(m));
  client.on("guildBanAdd", (m) => guildEvent("guildBanAdd")(m));
  client.on("guildBanRemove", (m) => guildEvent("guildBanRemove")(m));
  client.on("voiceStateUpdate", (m, n) => guildEvent("voiceStateUpdate")(m, n));
  client.on("guildUpdate", (m, n) => guildEvent("guildUpdate")(m, n));
  client.on('threadUpdate', (m, n) => guildEvent('threadUpdate')(m, n, client));
  client.on('threadMembersUpdate', (m, n) => guildEvent('threadMembersUpdate')(m, n, client));
  client.on('threadCreate', (m) => guildEvent('threadCreate')(m, client));
  client.on('threadDelete', (m) => guildEvent('threadDelete')(m, client));


  // other events
  client.on("messageCreate", (m) => otherEvent("antilinks")(m));
  client.on("messageCreate", (m) => otherEvent("antiwords")(m));
  client.on("guildMemberAdd", (m) => otherEvent("autorole")(m));
  client.on("guildMemberAdd", (m) => otherEvent("welcome")(m));
  client.on("guildMemberRemove", (m) => otherEvent("goodbye")(m));
  client.on("messageCreate", (m) => otherEvent("rep")(m));

  // Menu Events
  client.on('interactionCreate', (m) => menuEvents("help")(m, client));
  client.on("interactionCreate", (m) => menuEvents("antilink")(m, client));
  client.on("interactionCreate", (m) => menuEvents("autorole")(m, client));
  client.on("interactionCreate", (m) => menuEvents("automod")(m, client));
  client.on('interactionCreate', (m) => menuEvents('prefix')(m, client));
  client.on("interactionCreate", (m) => menuEvents("rep")(m, client));
  client.on("interactionCreate", (m) => menuEvents("welcomeChannel")(m, client));
  client.on("interactionCreate", (m) => menuEvents("leaveChannel")(m, client));
  client.on("interactionCreate", (m) => menuEvents("welcomeMessage")(m, client));
  client.on("interactionCreate", (m) => menuEvents("leaveMessage")(m, client));
  client.on("interactionCreate", (m) => menuEvents("variables")(m, client));
  client.on("interactionCreate", (m) => menuEvents("channelUpdates")(m, client));
  client.on("interactionCreate", (m) => menuEvents("memberUpdates")(m, client));
  client.on('interactionCreate', (m) => menuEvents('messageUpdates')(m, client));
  client.on("interactionCreate", (m) => menuEvents("roleUpdates")(m, client));
  client.on("interactionCreate", (m) => menuEvents("serverUpdates")(m, client));
  client.on("interactionCreate", (m) => menuEvents("voiceStateUpdates")(m, client));
  client.on("interactionCreate", (m) => menuEvents("suggestions")(m, client));

  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
}

module.exports = {
  loadEvents,
};
