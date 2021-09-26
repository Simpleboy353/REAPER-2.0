const Discord = module.require("discord.js");
const Jimp = require("jimp");
const cooldown = new Set();

module.exports = {
  name: "challenge",
  description: "Another Fun Command",
  botPerms: ["ATTTACH_FILES"],
  run: async (client, message, args) => {
    if (message.channel.type === "dm") return;
    let text = args.join(" ");
    if (!text) {
      return message.reply("`Usage: =challenge <text>`");
    }
    const link = await client.images.image.challenge({ text: text })
    message.channel.send({
      files: [
        {
          attachment: link
        },
      ],
    });
  },
};