const Discord = module.require("discord.js");

module.exports = {
  name: "userid",
  botPerms: ["EmbedLinks"],
  run: async (client, message, args) => {
    var mention = message.mentions.users.first();
    if (!mention) return message.channel.send("Mention a user to get their ID");
    message.channel.send(mention.id);
  },
};
