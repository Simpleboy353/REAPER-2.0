const Discord = require("discord.js");

module.exports = {
  name: "announce",
  description: "Make an Announcemnet in your Server",
  userPerms: ["ManageMessages"],
  botPerms: ["EmbedLinks", "ManageMessages"],
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

    let embed = new Discord.EmbedBuilder()
      .setTitle(`<:ann:748176925792665721> New Server Announcement`)
      .setDescription(args.slice(1).join(" "), {
        allowedMentions: { parse: ["users"] },
      })
      .setColor("Random")
      .setFooter(`Announcement by ${message.author.username}`);
    anchannel.send({ embeds: [embed] });

    let anembed = new Discord.EmbedBuilder()
      .setTitle("Done!")
      .setDescription(`Announcement has been sent to ${anchannel}`)
      .setColor("Random");

    message.channel.send({ embeds: [anembed] });
    message.delete();
  },
};
