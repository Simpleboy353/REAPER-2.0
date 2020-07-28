const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require("ms");

exports.run = async (client, message, [time, reason]) => {
  if (!client.lockit) { client.lockit = []; }
  let validUnlocks = ["release", "unlock", "u"];
  if (!time) { return message.reply("Please enter a valid period in s; m; h; d"); }

  const Lockembed = new Discord.MessageEmbed()
    .setColor(0xDD2E44)
    .setTimestamp()
    .setTitle("🔒 MOD LOCK [LOCKDOWN] 🔒")
    .setDescription(`This Channel has been lock by ${message.author.tag} for ${time}`);
    if (reason != null) { Lockembed.addField("Reason : ", reason); }

  const Unlockembed = new Discord.MessageEmbed()
    .setColor(0xDD2E44)
    .setTimestamp()
    .setTitle("🔓 MOD LOCK [UNLOCK] 🔓")
    .setDescription("This channel is now unlock");

  if (message.channel.permissionsFor(message.author.id).has("MUTE_MEMBERS") === false) { 
    const embed = new new Discord.MessageEmbed()
      .setColor(0xDD2E44)
      .setTimestamp()
      .setTitle("❌ ERROR ❌")
      .setDescription("You can\'t do that");
    return message.channel.send({embed});  
  }  

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, { SEND_MESSAGES: null }).then(() => {
      message.channel.send({embed: Unlockembed});
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => { console.log(error); });
  } else {
    message.channel.overwritePermissions(message.guild.id, { SEND_MESSAGES: false }).then(() => {
      message.channel.send({embed: Lockembed}).then(() => {
        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send({embed: Unlockembed})).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));
      }).catch(error => { console.log(error); });
    });
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["ld", "lock"],
  permLevel: 2,
  botPerms: ["MANAGE_ROLES", "EMBED_LINKS", "ADMINISTRATOR"]
};
  
exports.help = {
  name: "lockdown",
  description: "Locks or unlocks the channel.",
  usage: "[time:str] [reason:str]",
  usageDelim: " | "
};