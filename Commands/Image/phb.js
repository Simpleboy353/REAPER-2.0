const Discord = module.require("discord.js");
const Jimp = require("jimp");
const cooldown = new Set();

module.exports = {
  name: "phb",
  description: "Another Fun Command",
  botPerms: ["ATTTACH_FILES", "MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    let splitText = args.join(" ").slipt("/")
    let text = splitText[0]
    if (!text) return message.channel.send("Proper usage: =phb text/text")
    let text2 = splitText[1]
    if (!text2) return message.channel.send("Proper usage: =phb text/text")
    const link = await client.images.image.pornhub({ text1: text, text2: text2 })
    message.channel.send({
      files: [
        {
          attachment: link
        },
      ],
    });
    message.delete();
  },
};
