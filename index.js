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

client.login("YOUR_TOKEN_HERE")//Enter your bot token here
