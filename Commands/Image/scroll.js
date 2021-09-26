const Discord = module.require("discord.js");
const Jimp = require("jimp");
const cooldown = new Set();

module.exports = {
  name: "scroll",
  description: "Another Fun Command",
  botPerms: ["ATTTACH_FILES"],
  run: async (client, message, args) => {
    if (message.channel.type === "dm") return;
    let text = args.join(" ");
    if (!text) {
      return message.reply("You need to provide some text!");
    }
    const link = await client.images.image.scroll({ text: text })
    message.channel.send({
      files: [
        {
          attachment: link
        },
      ],
    });
  },
};