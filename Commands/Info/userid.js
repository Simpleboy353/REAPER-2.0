const Discord = module.require("discord.js");

module.exports = {
  name: "userid",
  botPerms: ["EmbedLinks"],
  run: async (client, message, args) => {
    var mention = message.guild.member(message.mentions.users.first());
    if (!mention) return message.channel.send("Mention a user to get their ID");
    const lolicon = mention.user.avatarURL;
    const lolid = new Discord.EmbedBuilder()
      .setThumbnail(mention.user.avatarURL)
      .setColor("Random")
      .setTitle("Here is " + `${mention.user.username}\'s ID`)
      .setDescription(`${mention.id}`)
      .setThumbnail(lolicon);
    message.channel.send({ embeds: [lolid] });
  },
};
