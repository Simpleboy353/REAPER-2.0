const { Client, Collection, MessageEmbed, Guild } = require("discord.js")

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

  if (message.content === `<@${client.user.id}>`) {
    let embed100 = new MessageEmbed()
      .setTitle("Thanks for the Ping!")
      .setDescription("Hello Everyone, I am Infinity, A multi-purpose Discord Bot \n\nMy default Prefix is `=` but you can change it accordingly. To get my Commands List type `=help`\n\nIf you want to report any error, you can use the `=report` command and if you want to suggest features for me, you can use the `=suggest` command!")
      .addField("Some Useful Links", "Get my Invite Link [Here](https://discord.com/oauth2/authorize?client_id=733670294086221865&permissions=1584921983&scope=bot)\nNeed Assistance? Join my [Support Server](https://discord.gg/mqWprFc) Now!")
      .setColor("GREEN")
    message.channel.send(embed100);
  }

  if (message.content === `<@!${client.user.id}>`) {
    let embed101 = new MessageEmbed()
      .setTitle("Thanks for the Ping!")
      .setDescription("Hello Everyone, I am Infinity, A multi-purpose Discord Bot \n\nMy default Prefix is `=` but you can change it accordingly. To get my Commands List type `=help`\n\nIf you want to report any error, you can use the `=report` command and if you want to suggest features for me, you can use the `=suggest` command!")
      .addField("Some Useful Links", "Get my Invite Link [Here](https://discord.com/oauth2/authorize?client_id=733670294086221865&permissions=1584921983&scope=bot)\nNeed Assistance? Join my [Support Server](https://discord.gg/mqWprFc) Now!")
      .setColor("GREEN")
    message.channel.send(embed101);
  }
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
    const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.find(command => command.aliases.includes(cmd.slice(prefix.length)));
    commandfile.run(client, message, args);

  } else if (!data) {
    //set the default prefix here
    const prefix = config.DEFAULT_PREFIX;

    if (!message.content.startsWith(prefix)) return;
    const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.find(command => command.aliases.includes(cmd.slice(prefix.length)));
    commandfile.run(client, message, args);
}
});
const welcomeData = require("./Commands/Owner/models/welcome")
const modData2 = require("./Commands/Owner/models/modlogs")
const welcomemsg = require("./Commands/Owner/models/joinmsg")
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
    member.guild.channels.cache.get(channel).send(`**${member}**, ${data2.JoinMsg}`);
      const { createCanvas, loadImage, registerFont } = require('canvas');
      const request = require('node-superfetch');
      const path = require('path');
      registerFont(path.join(__dirname, '.', 'cores', 'fonts', 'Heroes Legend.ttf'), { family: 'Heroes Legend' });
      const firstAvatarURL = member.user.displayAvatarURL({ format: 'png', size: 512 });
      try {
        const firstAvatarData = await request.get(firstAvatarURL);
        const firstAvatar = await loadImage(firstAvatarData.body);
        const base = await loadImage(path.join(__dirname, '.', 'cores', 'img', 'welcome.png'));
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(firstAvatar, -6, 35, 400, 400);
        ctx.drawImage(base, 0, 0);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#40e9ff';
        ctx.font = '24px Heroes Legend';
        ctx.fillStyle = 'black';
        ctx.fillText(member.user.tag, 358, 288);
        ctx.font = '18px Heroes Legend';
        ctx.fillStyle = 'white';
        ctx.fillText(member.guild.name, 408, 358)


        var errorlogs = client.channels.cache.get("747750993583669258")
        member.guild.channels.cache.get(channel).send({ files: [{ attachment: canvas.toBuffer(), name: 'welcome.png' }] });
      } catch (err) {
        return errorlogs.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
      }
    }
   } else if (data2) {
     return;
   } else if (!data) {
     return;
   }
  })
   client.on("guildMemberAdd", async(member)=>{
  const data = await welcomeData.findOne({
  GuildID: member.guild.id
})
const data2 = await welcomemsg.findOne({
  GuildID: member.guild.id
})
 if (data) {

  if (!data2) {
   const { createCanvas, loadImage, registerFont } = require('canvas');
   const request = require('node-superfetch');
   const path = require('path');
   registerFont(path.join(__dirname, '.', 'cores', 'fonts', 'Heroes Legend.ttf'), { family: 'Heroes Legend' });
   const firstAvatarURL = member.user.displayAvatarURL({ format: 'png', size: 512 });
   try {
     const firstAvatarData = await request.get(firstAvatarURL);
     const firstAvatar = await loadImage(firstAvatarData.body);
     const base = await loadImage(path.join(__dirname, '.', 'cores', 'img', 'welcome.png'));
     const canvas = createCanvas(base.width, base.height);
     const ctx = canvas.getContext('2d');
     ctx.drawImage(firstAvatar, -6, 35, 400, 400);
     ctx.drawImage(base, 0, 0);
     ctx.textAlign = 'left';
     ctx.textBaseline = 'top';
     ctx.fillStyle = '#40e9ff';
     ctx.font = '24px Heroes Legend';
     ctx.fillStyle = 'black';
     ctx.fillText(member.user.tag, 358, 288);
     ctx.font = '18px Heroes Legend';
     ctx.fillStyle = 'white';
     ctx.fillText(member.guild.name, 408, 358)
     let channel = data.Welcome
     member.guild.channels.cache.get(channel).send(`${member}, Welcome to **${member.guild.name}**! We hope you like our Server! Enjoy Your Stay here!`)
     member.guild.channels.cache.get(channel).send({ files: [{ attachment: canvas.toBuffer(), name: 'welcome.png' }] });

     var errorlogs = client.channels.cache.get("747750993583669258")
   } catch (err) {
     return errorlogs.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
   }
  } else if (data2) {
    return;
  }
 } else if (!data) {
   return;
 }
});


const byeData = require("./Commands/Owner/models/bye")
const byemsg = require("./Commands/Owner/models/byemsg")
client.on(`guildMemberRemove`, async (member) => {
  const avatar = member.user.avatarURL;

  const data = await byeData.findOne({
    GuildID: member.guild.id
  })
  if (data) {

    const data2 = await byemsg.findOne({
      GuildID: member.guild.id
    })
  if (data2) {
    let embed = new MessageEmbed()
      .setDescription(`**${member.user.tag}** ${data2.ByeMsg}`)
      .setColor("GREEN");

    let channel = data.Bye

    member.guild.channels.cache.get(channel).send(embed);

   } else if (!data2) {
   let embed2 = new MessageEmbed()
   .setTitle("Goodbye")
   .setThumbnail(member.user.avatarURL())
   .setDescription (`**${member.user.tag}** just left the server! We hope they return back soon!`)
   .setFooter(`We now have ${member.guild.memberCount} members!`)
   .setThumbnail(member.user.avatarURL())
   .setColor("GREEN")

   let byechannel = data.Bye

member.guild.channels.cache.get(byechannel).send(embed2);
   }
  } else if (!data) {
    return;
  }
})

client.on(`guildCreate`, guild =>{
  const embed = new MessageEmbed()
  .setTitle("Thanks for Inviting!")
  .setDescription("Hello Everyone, I am Infinity, A multi-purpose Discord Bot \n\nMy default Prefix is `=` but you can change it accordingly. To get my Commands List type `=help`\n\nIf you want to report any error, you can use the `=report` command and if you want to suggest features for me, you can use the `=suggest` command!")
  .addField("Some Useful Links", "Get my Invite Link [Here](https://discord.com/oauth2/authorize?client_id=733670294086221865&permissions=1584921983&scope=bot)\nNeed Assistance? Join my [Support Server](https://discord.gg/mqWprFc) Now!")
  .setColor("GREEN")
   guild.systemChannel.send(embed);

  let logschannel = client.channels.cache.get('772716407628365834')
  let embed2 = new MessageEmbed()
    .setTitle("DataBase Updates")
    .setDescription("Server Added to Database")
    .addField(`Server Name`, `${guild.name}`)
    .addField(`Server ID`, `${guild.id}`)
    .addField(`Data Stats`, "Data has been Successully Created")
    .setColor("GREEN")
    .setThumbnail();

  logschannel.send(embed2)
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
  const avatar = newMember.user.avatarURL;
  // declare changes

  if (data) {
   const  modlogs = data.Mod
  var Changes = {
    AddedRoles: 1,
    username: 2,
    nickname: 3,
    avatar: 4
  }
  var change = Changes.unknown

  // check if roles were removed
  if (newMember.roles.cache.size != oldMember.roles.cache.size) {
   change = Changes.AddedRoles
  }
  // check if username changed
  if (newMember.user.username != oldMember.user.username) {
    change = Changes.username
  }
  // check if nickname changed
  if (newMember.nickname != oldMember.nickname) {
    change = Changes.nickname
  }
  // check if avatar changed
  if (newMember.user.displayAvatarURL() != oldMember.user.displayAvatarURL()) {
    change = Changes.avatar
  }
  // post in the guild's log channel
    switch (change) {
      case Changes.AddedRoles:
        let embed = new MessageEmbed()
        .setTitle(newMember.user.tag)
        .setThumbnail(avatar)
        .setDescription(`**📝 User Roles Updated**`)
        .addField(`New Roles`, `<@&${newMember._roles.join(">  <@&")}>`, true)
          .setColor("GREEN")
          .setThumbnail(newMember.user.avatarURL())
          .setTimestamp()
        newMember.guild.channels.cache.get(modlogs).send(embed)
        break
      case Changes.username:
        let embed2 = new MessageEmbed()
          .setTitle(oldMember.user.tag)
          .setThumbnail(avatar)
          .addField(`📝 User Username Changed`, `${oldMember.user.tag} => ${newMember.user.tag}`)
          .setColor("GREEN")
          .setThumbnail(newMember.user.avatarURL())
          .setTimestamp();
        newMember.guild.channels.cache.get(modlogs).send(embed2);
        break
      case Changes.nickname:
        var oldnickname = oldMember.nickname === null ? "None" : oldMember.nickname;
        var newnickname = newMember.nickname === null ? "None" : newMember.nickname;
        let embed3 = new MessageEmbed()
        .setThumbnail(avatar)
          .setTitle(oldMember.user.tag)
          .addField(`📝 User Nickname Changed`, `${oldnickname} => ${newnickname}`)
          .setColor("GREEN")
          .setThumbnail(newMember.user.avatarURL())
          .setTimestamp();
        newMember.guild.channels.cache.get(modlogs).send(embed3);
        break
      case Changes.avatar:
        let embed4 = new MessageEmbed()
          .setTitle(newMember.user.tag)
          .addField(`🖼️ User Avatar Changed`, `[Before](${oldMember.user.displayAvatarURL({ size: 2048, dynamic: true, format: "png" })}) >> [After](${user.displayAvatarURL({ size: 2048, dynamic: true, format: "png" })})`)
          .setColor("GREEN")
          .setThumbnail(newMember.user.avatarURL())
          .setTimestamp();
        newMember.guild.channels.cache.get(modlogs).send(embed4);
        break;
    }
  } else if (!data) {
    return;
  }
})

client.on(`guildUpdate`, async(oldGuild, newGuild) => {
  const data = await modData.findOne({
    GuildID: newGuild.id
  })

  var icon = newGuild.iconURL;

  if (data) {
    let modlogs = data.Mod
    var changes  = {
      name: 1,
      icon: 2,
      veriflvl: 3,
      verify: 4
    }
 var change = changes.unknown

 if (oldGuild.name != newGuild.name)
 change = changes.name

 if (oldGuild.verificationLevel != newGuild.verificationLevel)
 change = changes.veriflvl
  
 if (oldGuild.icon != newGuild.icon)
 change = changes.icon

 if (oldGuild.verified != newGuild.verified) {
  change = changes.verify
 }

 switch(change) {
   case changes.name:
     let embed = new MessageEmbed()
     .setTitle("📝 Server Updates")
     .setThumbnail(icon)
     .addField(`Server Name Changed`,`${oldGuild.name} => ${newGuild.name}`)
     .setTimestamp()
     .setThumbnail(newGuild.iconURL())
     .setColor("GREEN")
  newGuild.channels.cache.get(modlogs).send(embed)
    break
     case changes.veriflvl:
     let embed2 = new MessageEmbed()
       .setTitle("📝 Server Updates")
       .setThumbnail(icon)
       .addField(`Server Verification Level Changed`, `${oldGuild.verificationLevel} => ${newGuild.verificationLevel}`)
       .setTimestamp()
       .setThumbnail(newGuild.iconURL())
       .setColor("GREEN")
     newGuild.channels.cache.get(modlogs).send(embed2)
     break
     case changes.icon:
     let embed3 = new MessageEmbed()
       .setTitle("📝 Server Updates")
       .setThumbnail(icon)
       .addField(`Server Icon Changed`, `[Old Icon](${oldGuild.iconURL({ size: 2048, dynamic: true, format: "png" })}) => [New Icon](${newGuild.iconURL({size: 2048, dynamic: true, format: "png"})})`)
       .setTimestamp()
       .setThumbnail(newGuild.iconURL())
       .setColor("GREEN")
     newGuild.channels.cache.get(modlogs).send(embed3)
     break
     case changes.verify:
     let embed4 = new MessageEmbed()
       .setTitle("📝 Server Updates")
       .setThumbnail(icon)
       .addField(`Verified`, `${oldGuild.verified} => ${newGuild.verified}`)
       .setTimestamp()
       .setThumbnail(newGuild.iconURL())
       .setColor("GREEN")
     newGuild.channels.cache.get(modlogs).send(embed4)
     break

   }
  }
})
client.on(`roleUpdate`, async(oldRole, newRole)=> {
  const data = await modData.findOne({
    GuildID: newRole.guild.id
  })

  if (data) {
    let modlogs = data.Mod
    var changes = {
      name: 1,
      hoisted: 2,
      color: 3,
      mention: 4
    }
     
    var change = changes.unknown

    if (newRole.name != oldRole.name) {
      change = changes.name
    }
    if (newRole.hoist != oldRole.hoist) {
      change = changes.hoisted
    }
    if (newRole.hexColor != oldRole.hexColor) {
      change = changes.color
    }
    if (newRole.mentionable != oldRole.mentionable) {
      change = changes.mention
    }
    switch (change) {
      case changes.name:
        let embed = new MessageEmbed()
        .setTitle("📝 Role Updates")
        .setDescription(`Updated ${oldRole} role`)
        .addField(`Name`, `${oldRole.name} => ${newRole.name}`)
        .setColor("GREEN")
        .setTimestamp()

        newRole.guild.channels.cache.get(modlogs).send(embed)
        break
        case changes.hoisted:
        var oldhoiststate = oldRole.hoist ? "Yes" : "No"
        var newhoiststate = newRole.hoist ? "Yes" : "No"
          let embed2 = new MessageEmbed()
          .setTitle("📝 Role Updates")
          .setDescription(`Updated ${oldRole} role`)
          .addField(`Hoisted`, `${oldhoiststate} => ${newhoiststate}`)
          .setColor("GREEN")
          .setTimestamp()
          newRole.guild.channels.cache.get(modlogs).send(embed2)
          break
          case changes.color:
        let embed3 = new MessageEmbed()
          .setTitle("📝 Role Updates")
          .setDescription(`Updated ${oldRole} role`)
          .addField(`Color`,`[${oldRole.hexColor}](https://www.color-hex.com/color/${oldRole.hexColor.slice(1)}) => [${newRole.hexColor}](https://www.color-hex.com/color/${newRole.hexColor.slice(1)})`)
          .setColor("GREEN")
          .setTimestamp()
        newRole.guild.channels.cache.get(modlogs).send(embed3)
        break
        case changes.mention:
        var oldmentionstate = oldRole.mentionable ? "Yes" : "No"
        var newmentionstate = newRole.mentionable ? "Yes" : "No"
        let embed4 = new MessageEmbed()
          .setTitle("📝 Role Updates")
          .setDescription(`Updated ${oldRole} role`)
          .addField(`Mentionable`, `${oldmentionstate} => ${newmentionstate}`)
          .setColor("GREEN")
          .setTimestamp()
        newRole.guild.channels.cache.get(modlogs).send(embed4)
        break
    }
  } else if (!data) {
    return;
  }
})
client.on(`roleCreate`, async(role)=>{
  const data = await modData.findOne({
    GuildID: role.guild.id
  })
  if (data) {
    let embed = new MessageEmbed()
    .setTitle("📝 Role Created")
    .setDescription(`Name: ${role.name}\nColor: ${role.hexColor}\nHoisted: ${role.hoist}\nMentionable: ${role.mentionable}`)
    .setColor("GREEN")
    .setTimestamp()

    let channel = data.Mod

    role.guild.channels.cache.get(channel).send(embed)
  } else if (!data) {
    return;
  }
})
client.on(`roleDelete`, async (role) => {
  const data = await modData.findOne({
    GuildID: role.guild.id
  })
  if (data) {
    let embed = new MessageEmbed()
      .setTitle("🗑️ Role Deleted")
      .setDescription(`Name: ${role.name}\nColor: ${role.hexColor}\nHoisted: ${role.hoist}\nMentionable: ${role.mentionable}`)
      .setColor("RED")
      .setTimestamp()

    let channel = data.Mod

    role.guild.channels.cache.get(channel).send(embed)
  } else if (!data) {
    return;
  }
})
client.on(`voiceStateUpdate`, async(oldUser, newUser)=>{
  const data = await modData.findOne({
    GuildID: newUser.guild.id
  })
  if (data) {
    let oldMember = oldUser.member
    let newMember = newUser.member
    let oldUserChannel = oldMember.voice.channel
    let newUserChannel = newMember.voice.channel
    let modlogs = data.Mod
    var changes = {
      deafened: 1,
      muted: 2,
      join: 3,
      leave: 4
    }

    var change = changes.unknown

    if (newUser.deaf != oldUser.deaf) {
      change = changes.deafened
    }
    if (newUser.mute != oldUser.mute) {
      change = changes.muted
    }
    if (!oldUserChannel == undefined && newUserChannel != undefined) {
      change = changes.join
    }
    if (oldUserChannel != undefined && newUserChannel == undefined) {
      change = changes.leave
    }
    switch (change) {
      case changes.deafened:
        var oldstate = oldUser.deaf === undefined ? "None" : oldUser.deaf ? "Yes" : "No"
        var newstate = newUser.deaf === undefined ? "None" : newUser.deaf ? "Yes" : "No"
        let embed = new MessageEmbed()
        .setTitle(":loud_sound: Voice State Updates")
        .setDescription(`Voice State Updated For ${newMember}`)
        .addField(`Deafened`, `${oldstate} => ${newstate}`)
        .setColor("RED")
        .setTimestamp()

        newUser.guild.channels.cache.get(modlogs).send(embed)
        break
          case changes.muted:
           var oldState = oldUser.mute === undefined ? "None" : oldUser.mute ? "Yes" : "No"
           var newState = newUser.mute === undefined ? "None" : newUser.mute ? "Yes" : "No"
           let embed1 = new MessageEmbed()
           .setTitle(":loud_sound: Voice State Updates")
           .setDescription(`Voice State Updated For ${newMember}`)
           .addField(`Muted`, `${oldState} => ${newState}`)
           .setColor("RED")
           .setTimestamp()

        newUser.guild.channels.cache.get(modlogs).send(embed1)
        break
          case changes.join:
         let embed7 = new MessageEmbed()
         .setTitle(":loud_sound: Voice State Updates")
         .setDescription(`${newMember} joined voice channel ${newMember.voice.channel} (${newMember.voice.channel.name})`)
         .setColor("GREEN")
         .setTimestamp()

        newUser.guild.channels.cache.get(modlogs).send(embed7)
        break
          case changes.leave:
         let embed8 = new MessageEmbed()
         .setTitle(":loud_sound: Voice State Updates")
         .setDescription(`${newMember} left the voice channel ${oldMember.voice.channel} (${oldMember.voice.channel.name})`)
         .setColor("RED")
         .setTimestamp()
        newUser.guild.channels.cache.get(modlogs).send(embed8)
        break
    }
  } else if (!data) {
    return;
  }
})
client.on("channelCreate", async(newChannel)=>{
  const data = await modData.findOne({
    GuildID: newChannel.guild.id
  })
  if (data) {
    let embed = new MessageEmbed()
    .setTitle("📝 Channel Created")
    .setDescription(`Name: \`${newChannel.name}\`\nID: \`${newChannel.id}\`\nType: \`${newChannel.type}\``)
    .setColor("GREEN")
    .setTimestamp()

    let modlogs = data.Mod
    newChannel.guild.channels.cache.get(modlogs).send(embed)
  } else if (!data) {
    return;
  }
})
client.on("channelDelete", async (newChannel) => {
  const data = await modData.findOne({
    GuildID: newChannel.guild.id
  })
  if (data) {
    let embed = new MessageEmbed()
      .setTitle("🗑️ Channel Deleted")
      .setDescription(`Name: \`${newChannel.name}\`\nID: \`${newChannel.id}\`\nType: \`${newChannel.type}\``)
      .setColor("RED")
      .setTimestamp()

    let modlogs = data.Mod
    newChannel.guild.channels.cache.get(modlogs).send(embed)
  } else if (!data) {
    return;
  }
})
client.on(`channelUpdate`, async(oldChannel, newChannel)=>{
  const data = await modData.findOne({
    GuildID: newChannel.guild.id
  })
  if (data) {
    let modlogs = data.Mod
    var changes = {
      name: 1,
      topic: 2,
      type: 3
    }
    var change = changes.unknown

    if (newChannel.name != oldChannel.name) {
      change = changes.name
    }
    if (newChannel.topic != oldChannel.topic) {
      change = changes.topic
    }
    if (newChannel.type != oldChannel.type) {
      change = changes.type
    }
    switch (change) {
      case changes.name:
        let embed = new MessageEmbed()
        .setTitle("📝 Channel Updated")
        .addField(`Channel Renamed`, `${oldChannel.name} => ${newChannel.name}`)
        .setColor("GREEN")
        .setTimestamp()

        newChannel.guild.channels.cache.get(modlogs).send(embed)
        break
      case changes.topic:
        let embed2 = new MessageEmbed()
          .setTitle("📝 Channel Updated")
          .setDescription(`${newChannel}'s Topic Changed`)
          .addField(`Old Topic`, `${oldChannel.topic}`)
          .addField(`New Topic`, `${newChannel.topic}`)
          .setColor("GREEN")
          .setTimestamp()

        newChannel.guild.channels.cache.get(modlogs).send(embed2)
        break
      case changes.name:
        let embed3 = new MessageEmbed()
          .setTitle("📝 Channel Updated")
          .addField(`${newChannel}'s Type Changed`, `${oldChannel.type} => ${newChannel.type}`)
          .setColor("GREEN")
          .setTimestamp()

        newChannel.guild.channels.cache.get(modlogs).send(embed3)
        break
    }
  } else if (!data) {
    return;
  }
})
const roleData = require("./Commands/Owner/models/autorole")
client.on("guildMemberAdd", async(member)=>{
  const data = await roleData.findOne({
    GuildID: member.guild.id
  })

  if (data) {
    const autorole = data.Role
    member.roles.add(autorole);
  } else if (!data) {
    return;
  }
})
client.on("guildMemberAdd", async(member)=>{
  const data = await modData.findOne({
    GuildID: member.guild.id
  })
  if (data) {
    let avatar = member.user.avatarURL;
    let modlogs = data.Mod
    let embed = new MessageEmbed()
    .setTitle(":inbox_tray: Member Joined")
    .setThumbnail(avatar)
    .setDescription(`User: ${member.user.username}\nID: ${member.user.id}\nServer Member Count: ${member.guild.members.cache.size}`)
    .setColor("GREEN")
    .setThumbnail(member.user.avatarURL())
    .setTimestamp()

    member.guild.channels.cache.get(modlogs).send(embed)
  } else if (!data) {
     return;
  }
})

client.on("guildMemberRemove", async (member) => {
  const data = await modData.findOne({
    GuildID: member.guild.id
  })
  if (data) {
    let avatar = member.user.avatarURL;
    let modlogs = data.Mod
    let embed = new MessageEmbed()
      .setTitle(":outbox_tray: Member Left")
      .setThumbnail(avatar)
      .setDescription(`User: ${member.user.username}\nID: ${member.user.id}\nServer Member Count: ${member.guild.members.cache.size}`)
      .setColor("RED")
      .setThumbnail(member.user.avatarURL())
      .setTimestamp()

    member.guild.channels.cache.get(modlogs).send(embed)
  } else if (!data) {
    return;
  }
})
client.on("guildDelete", async(guild)=>{
  let logschannel = client.channels.cache.get("772716407628365834")
  let embed = new MessageEmbed()
  .setTitle("DataBase Updates")
  .setDescription("Server Removed From Database")
  .addField(`Server Name`, `${guild.name}`)
  .addField(`Server ID`, `${guild.id}`)
  .addField(`Data Stats`, "Data has been Successully Deleted!")
  .setColor("GREEN")
  .setThumbnail();

  logschannel.send(embed)
  const data = await prefix.findOne({
    GuildID: guild.id
  })
  const data2 = await welcomeData.findOne({
    GuildID: guild.id
  })
  const data3 = await byeData.findOne({
    GuildID: guild.id
  })
  const data4 = await messageData.findOne({
    GuildID: guild.id
  })
  const data5 = await modData.findOne({
    GuildID: guild.id
  })
  const data6 = await roleData.findOne({
    GuildID: guild.id
  })
  if (data) {
    let newD = await prefix.findOneAndDelete({
      GuildID: guild.id
    })
  } else if (!data) {
    return;
  }
  if (data2) {
    let newD = await welcomeData.findOneAndDelete({
      GuildID: guild.id
    })
  } else if (!data2) {
    return;
  }
  if (data3) {
    let newD = await byeData.findOneAndDelete({
      GuildID: guild.id
    })
  } else if (!data3) {
    return;
  }
  if (data4) {
    let newD = await messageData.findOneAndDelete({
      GuildID: guild.id
    })
  } else if (!data4) {
    return;
  }
  if (data5) {
    let newD = await modData.findOneAndDelete({
      GuildID: guild.id
    })
  } else if (!data5) {
    return;
  }
  if (data6) {
    let newD = await roleData.findOneAndDelete({
      GuildID: guild.id
    })
  } else if (!data6) {
    return;
  }
});
client.login(process.env.token)//Enter your bot token here
