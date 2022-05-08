const Discord = module.require("discord.js");

module.exports = {
  name: "kiss",
  description: "kiss user",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    var member = message.mentions.members.first();
    var images = [
      "https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.gif",
      "https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.gif",
      "https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.giff",
      "https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.gif",
    ];
    var image = Math.floor(Math.random() * images.length);
    if (!member) return message.channel.send("You need to mention someone");
    let kissEmbed = new Discord.MessageEmbed()
      .setTitle(
        `${message.author.username} You can't kiss yourself, do you want me to kiss you? but im not a gay!!`
      )
      .setImage(String([images[image]]))
      .setColor(0xf000ff);
    if (member.id === message.author.id) return message.channel.send(kissEmbed);
    let HugEmbed2 = new Discord.MessageEmbed()
      .setTitle(
        `${message.author.username} Kiss ${member.user.username}, Sweet. love you <3`
      )
      .setImage(String([images[image]]))
      .setColor(0xf000ff);
    return message.channel.send({ embeds: [HugEmbed2] });
  },
};
