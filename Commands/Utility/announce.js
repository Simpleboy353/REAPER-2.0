const Discord = require("discord.js");

module.exports = {
  name: "announce",
  description: "Make an Announcemnet in your Server",
  userPerms: ["MANAGE_MESSAGES"],
  botPerms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    const anchannel = message.mentions.channels.first();
    if (!anchannel) {
      return message.channel.send("`Usage: =announce <channel> <msg>`");
    }
    if (!args.slice(1).join(" ")) {
      return message.channel.send(
        "Please add some text to make an Announcement"
      );
    }

    let embed = new Discord.MessageEmbed()
      .setTitle(`<:ann:748176925792665721> New Server Announcement`)
      .setDescription(args.slice(1).join(" "), {
        allowedMentions: { parse: ["users"] },
      })
      .setColor("RANDOM")
      .setFooter(`Announcement by ${message.author.username}`);
    anchannel.send({ embeds: [embed] });

    let anembed = new Discord.MessageEmbed()
      .setTitle("Done!")
      .setDescription(`Announcement has been sent to ${anchannel}`)
      .setColor("RANDOM");

    message.channel.send({ embeds: [anembed] });
    message.delete();
  },
};
