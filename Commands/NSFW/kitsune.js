const Discord = module.require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();


module.exports = {
  name: "kitsune",
  description: "Sends kitsune pictures.",
  run: async (client, message, args) => {
    var errMessage = "This is not an NSFW Channel";
    if (!message.channel.nsfw) {
      message.react("💢");

      return message.reply(errMessage).then((msg) => {
        setTimeout(() => msg.delete(), 3000);
      });
    }

    const image = await nsfw.kitsune();
    const embed = new Discord.EmbedBuilder()
    .setTitle(`Kitsune`)
    .setColor("Green")
    .setImage(image);
    message.channel.send({ embeds: [embed] });
  },
};
