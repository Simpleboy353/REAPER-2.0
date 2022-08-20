const Discord = module.require("discord.js");

module.exports = {
  name: "illegal",
  description: "Provide a text to Trump for making it illegal",
  botPerms: ["EmbedLinks", "ManageMessages"],
  run: async (client, message, args) => {
    let meow = message.content.split(" ").slice(1);
    let args1 = meow.join(" ");
    let illegal =
      `https://storage.googleapis.com/is-now-illegal.appspot.com/gifs/` +
      args1.toUpperCase() +
      `.gif`;
    if (!args1) {
      return message.reply(
        "You need to provide some text for making it illegal"
      );
    }
    if (meow.length > 1) {
      return message.reply("Only one thing can be made illegal at a time");
    }
    const emb = new Discord.EmbedBuilder();
    emb.setTitle("Trump has now made " + meow + " illegal!");
    emb.setImage(illegal);
    message.channel.send({
      embed: emb,
    });
  },
};