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

['command'].forEach(handler => {
  require(`./handler/${handler}`)(client);
})

mongoose.connect(config.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

client.on("ready", ()=> {
  client.user.setPresence({ status: 'online' });
  client.user.setActivity("Hello", {type: "STREAMING"});
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', async (message) => {
  const data = prefixModel.findOne({ GuildID: message.guild.id })
  if (data) {
   var prefix = data.Prefix;
  } else if (!data) {
   prefix = config.DEFAULT_PREFIX;
  }
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

client.login("YOUR_TOP_SECRET_BOT_TOKEN!")//Enter your bot token here
