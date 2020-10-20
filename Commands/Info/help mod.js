const Discord = module.require("discord.js");

module.exports = {
  name: "help mod",
  description: "Get Mod Commands",
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("Moderation Commands")
      .setDescription("`kick`, `ban`, `softban`, `mute`, `unmute`, `tempmute`, `massaddrole`, `massremoverole`, `slowmode`, `voicekick`, `voicemute`, `voiceunmute`, `voicemuteall`, `voiceunmuteall`, `deafen`, `undeafen`, `deafenall`, `undeafenall`")
      .setColor("RANDOM");
    message.channel.send(embed)
  }
}