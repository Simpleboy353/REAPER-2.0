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
  useFindAndModify: false,
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
    const prefix = config.DEFAULT_PREFIX;

    if (!message.content.startsWith(prefix)) return;
    const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    commandfile.run(client, message, args);
}
});
const welcomeData = require("./Commands/Owner/models/welcome")

client.on(`guildMemberAdd`, async (member) => {
  const avatar = member.user.avatarURL;

  const data = await welcomeData.findOne({
    GuildID: member.guild.id
  })

  if (data) {

    let embed = new MessageEmbed()
      .setTitle("Welcome")
      .setThumbnail(avatar)
      .setDescription(`${member}, Welcome to **${member.guild.name}**! We hope you like our Server! Enjoy your stay here!`)
      .setFooter(`We are now ${member.guild.members.cache.size} members!`)
      .setThumbnail(member.user.avatarURL())
      .setColor("GREEN");

    let channel = data.Welcome

    member.guild.channels.cache.get(channel).send(embed);
  } else if (data) {
    return;
  }
})


const byeData = require("./Commands/Owner/models/bye")

client.on(`guildMemberRemove`, async(member) => {
  const avatar = member.user.avatarURL;

  const data = await byeData.findOne({
    GuildID: member.guild.id
  })

  if (data) {

    const avatar = member.user.avatarURL;
    let embed = new MessageEmbed()
    .setTitle("Goodbye")
    .setThumbnail(avatar)
    .setDescription(`**${member.user.username}** just left the server! We hope they return back soon!`)
    .setFooter(`We are now ${member.guild.members.cache.size} members left`)
    .setThumbnail(member.user.avatarURL())
    .setColor("GREEN");

   let channel = data.Bye

  member.guild.channels.cache.get(channel).send(embed);
  } else if (data) {
    return;
  }
})

client.on(`guildCreate`, guild =>{
  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  })
  const embed = new MessageEmbed()
  .setTitle("Thanks for Inviting!")
  .setDescription("Hello Everyone, I am Infinity, A multi-purpose Discord Bot \n\nMy default Prefix is `=` but you can change it accordingly. To get my Commands List type `=help`\n\nIf you want to report any error, you can use the `=report` command and if you want to suggest features for me, you can use the `=suggest` command!")
  .addField("Some Useful Links", "Get my Invite Link [Here](https://discord.com/oauth2/authorize?client_id=733670294086221865&permissions=1584921983&scope=bot)\nNeed Assistance? Join my [Support Server](https://discord.gg/mqWprFc) Now!")
  .setColor("GREEN")
   defaultChannel.send(embed);
})

const messageData = require("./Commands/Owner/models/messages")

client.on(`messageDelete`, async(message)=> {
  const data = await messageData.findOne({
    GuildID: message.guild.id
  })

  if (data) {

    if (message.author.bot) {
    return;
    }
    let embed = new MessageEmbed()
    .setTitle("🗑️ Message Deleted")
    .setDescription(`Message deleted in <#${message.channel.id}> by ${message.author}`)
    .addField(`Message Content`, message.content,true)
    .setTimestamp()
    .setColor("GREEN");

    let channel = data.Message

    message.guild.channels.cache.get(channel).send(embed);
  } else if (!data) {
    return;
  }
})

client.on(`messageUpdate`, async(oldMessage, newMessage)=> {
  const data = await messageData.findOne({
    GuildID: newMessage.guild.id
  })

  if (data) {

    if (newMessage.author.bot) {
    return;
    }

    let embed = new MessageEmbed()
    .setTitle("📝 Message Edited")
    .setDescription(`Message Edited in <#${newMessage.channel.id}> by ${newMessage.author}`)
    .addField("Old Message", oldMessage.content, true)
    .addField("New Message", newMessage.content, true)
    .setTimestamp()
    .setColor("GREEN")

    let channel = data.Message

    newMessage.guild.channels.cache.get(channel).send(embed);
  } else if (!data) {
    return;
  }
});

const modData = require("./Commands/Owner/models/modlogs")
client.on("guildBanAdd", async(guild, user)=>{
  const data = await modData.findOne({
    GuildID: guild.id
  })
  if (data) {
    let embed = new MessageEmbed()
    .setDescription(`${user} was banned from the server!`)
      .setFooter(`ID: ${user.id}`)
      .setColor("RED")
      .setTimestamp()

    let channel = data.Mod
    guild.channels.cache.get(channel).send(embed)
  } else if (!data) {
    return;
  }
});
client.on("guildBanRemove", async (guild, user) => {
  const data = await modData.findOne({
    GuildID: guild.id
  })
  if (data) {
    let embed = new MessageEmbed()
      .setDescription(`${user} was unbanned from the server!`)
      .setFooter(`ID: ${user.id}`)
      .setColor("GREEN")
      .setTimestamp()

    let channel = data.Mod
    guild.channels.cache.get(channel).send(embed)
  } else if (!data) {
    return;
  }
});

// sends message when important (externally editable) user statuses change (for example nickname)
// user in a guild has been updated
client.on('guildMemberUpdate', async (oldMember, newMember)=>  {
  const data = await modData.findOne({
    GuildID: newMember.guild.id
  })
  const guild = newMember.guild;
  // declare changes

  if (data) {
   const  modlogs = data.Mod
  var Changes = {
    unknown: 0,
    addedRole: 1,
    removedRole: 2,
    username: 3,
    nickname: 4,
    avatar: 5
  }
  var change = Changes.unknown

  // check if roles were removed
  var removedRole = ''
  oldMember.roles.every(function (value) {
    if (newMember.roles.cache.find('id', value.id) == null) {
      change = Changes.removedRole
      removedRole = value.name
    }
  })

  // check if roles were added
  var addedRole = ''
  newMember.roles.every(function (value) {
    if (oldMember.roles.cache.find('id', value.id) == null) {
      change = Changes.addedRole
      addedRole = value.name
    }
  })

  // check if username changed
  if (newMember.user.username != oldMember.user.username) {
    change = Changes.username
  }
  // check if nickname changed
  if (newMember.nickname != oldMember.nickname) {
    change = Changes.nickname
  }
  // check if avatar changed
  if (newMember.user.avatarURL != oldMember.user.avatarURL) {
    change = Changes.avatar
  }
  // post in the guild's log channel
    switch (change) {
      case Changes.addedRole:
        let embed = new MessageEmbed()
        .setTitle("User Updates")
        .setDescription(`**User Role Added** ` + newMember + `: ` + addedRole)
        .setColor("GREEN")
        .setTimestamp();
        newMember.guild.channels.cache.get(modlogs).send(embed)
        break
      case Changes.removedRole:
        let embed1 = new MessageEmbed()
          .setTitle("User Updates")
          .setDescription('**[User Role Removed]** ' + newMember + ': ' + removedRole)
          .setColor("RED")
          .setTimestamp();
        newMember.guild.channels.cache.get(modlogs).send(embed1)
        break
      case Changes.username:
        let embed2 = new MessageEmbed()
          .setTitle("User Updates")
          .setDescription('**[User Username Changed]** ' + newMember + ': Username changed from ' +
            oldMember.user.username + '#' + oldMember.user.discriminator + ' to ' +
            newMember.user.username + '#' + newMember.user.discriminator)
          .setColor("RED")
          .setTimestamp();
        newMember.guild.channels.cache.get(modlogs).send(embed2);
        break
      case Changes.nickname:
        let embed3 = new MessageEmbed()
          .setTitle("User Updates")
          .setDescription('**[User Nickname Changed]** ' + newMember + ': ' +
            (oldMember.nickname != null ? 'Changed nickname from ' + oldMember.nickname +
              +newMember.nickname : 'Set nickname') + ' to ' +
            (newMember.nickname != null ? newMember.nickname + '.' : 'original username.'))
          .setColor("RED")
          .setTimestamp();
        newMember.guild.channels.cache.get(modlogs).send(embed3);
        break
      case Changes.avatar:
        let embed4 = new MessageEmbed()
          .setTitle("User Updates")
          .setDescription('**[User Avatar Changed]** ' + newMember)
          .setColor("RED")
          .setTimestamp();
        newMember.guild.channels.cache.get(modlogs).send(embed4);
        break;
    }
  } else if (!data) {
    return;
  }
})

client.login(process.env.token)//Enter your bot token here
