const Discord = module.require("discord.js");

module.exports = {
  name: "bad",
  description: "Another fun command",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    let avatar = message.mentions.users.size
      ? message.mentions.users
          .first()
          .avatarURL({ format: "png", dynamic: true, size: 2048 })
      : message.author.avatarURL({ format: "png", dynamic: true, size: 2048 });

    if (!avatar) {
      return message.channel.send("`Usage: =bad <user>`");
    }
   const link = await client.images.image.bad({ image: avatar })
    message.channel.send({ files: [{ attachment: link }] });
  },
};
