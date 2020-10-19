const { Client, Collection } = require("discord.js")

const fs = require("fs")
const client = new Client({
  disableEveryone: "true" // This makes sure that the bot does not mention everyone
});
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/")
const config = require("./config.json") // enter your bot prefix in the config.json file
const prefix = config.DEFAULT_PREFIX;

['command'].forEach(handler => {
  require(`./handler/${handler}`)(client);
})
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on("message", async message => {
  client.prefix = prefix;
  if (message.author.bot) return; // This line makes sure that the bot does not respond to other bots
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return; // This line makes sure that the bot does not respond to other messages with the bots prefix
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command)
    command.run(client, message, args);
})

client.login(process.env.token)//Enter your bot token here
