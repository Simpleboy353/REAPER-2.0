const clientEvent = (event) => require(`../events/client/${event}`);
const guildEvent = (event) => require(`../events/guild/${event}`);
const otherEvent = (event) => require(`../events/functions/${event}`);
const Discord = require("discord.js");

function loadEvents(client) {
  const cooldowns = new Discord.Collection();

  // client events
  client.on("ready", () => clientEvent("ready")(client));
  client.on("messageCreate", (m) => clientEvent("mention")(m, client));

  // guild events
  client.on("messageCreate", (m) => guildEvent("command")(m, cooldowns));

  // other events
  client.on("messageCreate", (m) => otherEvent("antilinks")(m));
  client.on("guildMemberAdd", (m) => guildEvent("autorole")(m));
  client.on("guildMemberAdd", (m) => guildEvent("welcome")(m));
  client.on("guildMemberRemove", (m) => guildEvent("goodbye")(m));

  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
}

module.exports = {
  loadEvents,
};