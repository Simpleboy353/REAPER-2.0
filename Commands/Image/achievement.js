const Discord = module.require("discord.js");
const Jimp = require("jimp");

module.exports = {
  name: "achievement",
  description: "Another Fun Command",
  botPerms: ["ATTTACH_FILES"],
  run: async (client, message, args) => {
    if (message.channel.type === "dm") return;
    let text = args.join(" ");
    if (!text) {
      return message.reply("`Usage: =achievement <txt>`");
    }
    const link = await client.images.image.achievement({ text: text })
    message.channel.send({
      files: [
        {
          attachment: link
        },
      ],
    });
  },
};