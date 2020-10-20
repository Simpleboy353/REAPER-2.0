const { Client, Collection, MessageEmbed } = require("discord.js")

const fs = require("fs")
const client = new Client({
  disableEveryone: "true" // This makes sure that the bot does not mention everyone
});
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/")
const config = require("./config.json") // enter your bot prefix in the config.json file
const mongoose = require("mongoose")
const prefix = require("./Commands/Owner/models/prefix");

mongoose.connect(config.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

['command'].forEach(handler => {
  require(`./handler/${handler}`)(client);
})
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('ready', () => {
  client.user.setPresence({ status: 'online' });
  const activities_list = [
    { msg: "Infinity Rocks", type: "STREAMING" },
    { msg: "music for your server!", type: "PLAYING" },
    { msg: "=help", type: "LISTENING" },
    { msg: "Helping You make your Server Better", type: "PLAYING" },
    { msg: `with ${client.users.cache.size} users in ${client.guilds.cache.size} servers!`, type: "PLAYING" },
  ];// creates an arraylist containing phrases you want your bot to switch through.
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 
      client.user.setActivity(activities_list[index].msg, {
        type: activities_list[index].type,
      }); // sets bot's activities to one of the phrases in the arraylist.
  }, 10000); // Runs this every 10 seconds.});
});

client.on('message', async (message) => {
  if (message.author.bot) return;

  //Getting the data from the model
  const data = await prefix.findOne({
    GuildID: message.guild.id
  });

  const messageArray = message.content.split(' ');
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  //If there was a data, use the database prefix BUT if there is no data, use the default prefix which you have to set!
  if (data) {
    const prefix = data.Prefix;

    if (!message.content.startsWith(prefix)) return;
    const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    commandfile.run(client, message, args);
  } else if (!data) {
    //set the default prefix here
    const prefix = "!";

    if (!message.content.startsWith(prefix)) return;
    const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    commandfile.run(client, message, args);

  const embed = new MessageEmbed()
    .setTitle('Commands List')
    .setDescription("Available Categories: ")
    .addField(`<a:ColorDino:726964382009131099> __**Fun**__: `, "`=help fun`\nUse these commands to have some fun in your Server")
    .addField(`<:cam:748544442478100511> __**Image**__: `, "`=help image`\nManipulate Images with these commands")
    .addField(`<:inf:748544269798866964> __**Info**__: `, "`=help info`\nHave some info relating the Server, Users or Our Bot")
    .addField(`<:mod:748544387499294841> __**Moderation**__: `, "`=help mod`\nIssues relating some users? Use these Commands")
    .addField(`<:music:761893108442071060> __**Music**__: `, "`=help music`\nRelax and listen to some music!")
    .addField(`<:utility:748177830134808597> __**Utility**__: `, "`=help utility`\nSome Simple Utility Commands")
    .setColor("RANDOM");
  if (message.content === "=help"){
    message.channel.send(embed)
  }

  const embed1 = new MessageEmbed()
    .setTitle("Fun Commands")
    .setDescription("`8ball`, `ascii`, `clap`, `clyde`, `cowsay`, `dab`, `emojify`, `fliptext`, `gif`, `greentext`, `hack`, `howgay`, `hug`, `joke`, `kill`, `orangetext`, `penis`, `pokeimg`, `respect`, `reverse`, `roast`, `sacrifice`, `slap`, `spam`, `trivia`, `urban`, `vaportext`, `yomama`")
    .setColor("RANDOM");

  if (message.content === "=help fun") {
    message.channel.send(embed1)
  }

  const embed2 = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Image Commands")
    .setDescription("`achievement`, `amazeme`, `amiajoke`, `bad`, `catsay`, `challenge`, `changemymind`, `creatememe`, `didyoumean`, `drake`, `facts`, `illegal`, `jokeoverhead`, `meme`, `pornhub`, `rip`, `scroll`, `tableflip`, `textimage`, `trash`, `trigger`, `trumptweet`, `wasted`, `wideavatar`");

  if (message.content === "=help image") {
    message.channel.send(embed2)
  }


  const embed3 = new MessageEmbed()
    .setTitle("Info Commands")
    .setDescription("`botinfo`, `devteam`, `emojiid`, `help`, `invite`, `ping`, `report`, `userinfo`, `userid`, `serverinfo`, `suggest`")
    .setColor("RANDOM");

  if (message.content === "=help info") {
    message.channel.send(embed3)
  }

  const embed4 = new MessageEmbed()
    .setTitle("Moderation Commands")
    .setDescription("`kick`, `ban`, `softban`, `mute`, `unmute`, `tempmute`, `massaddrole`, `massremoverole`, `slowmode`, `voicekick`, `voicemute`, `voiceunmute`, `voicemuteall`, `voiceunmuteall`, `deafen`, `undeafen`, `deafenall`, `undeafenall`")
    .setColor("RANDOM");

  if (message.content === "=help mod") {
    message.channel.send(embed4)
  }

  const embed5 = new MessageEmbed()
    .setTitle("Music Commands")
    .setDescription("`play [p]`, `pause`, `resume [r]`, `skip [s]`, `shuffle`, `skipto [st]`, `search`, `stop`, `queue [q]`, `np`, `playlist [pl]`, `volume`, `pruning`, `remove`, `lyrics [ly]`, `loop [l]`")
    .setColor("RANDOM");

  if (message.content === "=help music") {
    message.channel.send(embed5)
  }

  const embed6 = new MessageEmbed()
    .setTitle("Utility Commands")
    .setDescription("`addemoji`, `avatar`, `announce`, `clear`, `createrole`, `delchannel`, `delrole`, `emoji`, `emojiid`, `enlargemoji`, `esay`, `giverole`, `google`, `imdb`, `lock`, `newtext`, `newvoice`, `nickname`, `playstore`, `poll`, `react`, `removerole`, `say`, `servericon`, `suggestion`, `timedlockdown`, `unlock`, `weather`, `wiki`, `youtube`")
    .setColor("RANDOM");

  if (message.content === "=help utility") {
    message.channel.send(embed6)
  }

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command)
    command.run(client, message, args);
}
})

client.login(process.env.token)//Enter your bot token here
