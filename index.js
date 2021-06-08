const { Client, Collection, MessageEmbed, Guild } = require("discord.js")

const fs = require("fs")
const client = new Client({
  disableEveryone: "true" // This makes sure that the bot does not mention everyone
});
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/")
const config = require("./config.json")// enter your bot prefix in the config.json file
const mongoose = require("mongoose")
const prefixModel = require("./database/guildData/prefix")
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

mongoose.connect(config.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

['command'].forEach(handler => {
  require(`./handler/${handler}`)(client)
})

client.on("ready", ()=> {
  client.user.setPresence({ status: 'online' });
  client.user.setActivity("Hello", {type: "STREAMING"});
  console.log(`Logged in as ${client.user.tag}`)
});
/** ERROR HANDLING */
client.on("warn", (info) => console.log(info));

client.on("error", console.error);

client.on('uncaughtException', (err) => {
  console.log("Uncaught Exception: " + err)
  process.exit(1)
});
process.on('unhandledRejection', (reason, promise) => {
  console.log('[FATAL] Possibly Unhandled Rejection at: Promise ', promise, ' reason: ', reason.message);
});


// MAIN MESSAGE EVENT
client.on('message', async (message) => {
  const data = await prefixModel.findOne({
    GuildID: message.guild.id
  }, (error) => {
    if (error) {
      console.log(error)
    }
  })
  if (data) {
    var PREFIX = data.Prefix
  } else {
    PREFIX = "!";
  }
  client.prefix = PREFIX;

  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
      return message.channel.send("Couldn't find that command!")
    }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.run(client, message, args);
  } catch (error) {
    console.error(error);
    let embed2000 = new MessageEmbed()
   .setDescription("There was an error executing that command.")
   .setColor("BLUE")
    message.channel.send(embed2000).catch(console.error);
  }
});

// Auto-Role is here!

client.on("guildMemberAdd", async(member)=>{
  const roleData = require("./database/guildData/autorole")
  const data = await roleData.findOne({
      GuildID: member.guild.id,
  }).catch(err=>console.log(err));
  
  if (data) {
      let role = data.Role;
      let arole = member.guild.roles.cache.get(role);
    if (role) {
      member.roles.add(arole)
    } else if (!role) {
        return;
    }
  } else if (!data) {
      return;
  }
});

// Welcome Here!
const welcomeData = require("./database/guildData/welcome")
const welcomemsg = require("./database/guildData/joinmsg")
client.on(`guildMemberAdd`, async (member) => {

  const data = await welcomeData.findOne({
    GuildID: member.guild.id
  })

  if (data) {
    var channel = data.Welcome

    var data2 = await welcomemsg.findOne({
      GuildID: member.guild.id
    })
    if (data2) {
      var joinmessage = data2.JoinMsg;

      joinmessage = joinmessage.replace("{user.mention}", `${member}`)
      joinmessage = joinmessage.replace("{user.name}", `${member.user.tag}`)
      joinmessage = joinmessage.replace("{server}", `${member.guild.name}`)
      joinmessage = joinmessage.replace("{membercount}", `${member.guild.memberCount}`)

      let embed20 = new MessageEmbed()
        .setDescription(joinmessage)
        .setColor("GREEN")
      member.guild.channels.cache.get(channel).send(embed20);
    }
  } else if (data2) {
    return;
  } else if (!data) {
    return;
}
});

client.login(config.BOT_TOKEN)//Enter your bot token here
