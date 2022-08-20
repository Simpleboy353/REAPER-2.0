const { EmbedBuilder } = module.require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: "trumptweet",
  aliases: ["trump"],
  usage: "trumptweet <message>",
  description:
    "Display's a custom tweet from Donald Trump with the message provided.",
  botPerms: ["AttachFiles"],
  run: async (client, message, args) => {
    let tweet = args.join(" ");
    if (!tweet) {
      return message.channel.send("Mr. President Says: `What to tweet ?`");
    }
    if (tweet.length > 68) tweet = tweet.slice(0, 65) + "...";

    const user = message.mentions.members.first();

    if (tweet.includes(user)) {
      tweet = tweet.replace(user, user.user.username)
    }
    try {
      const res = await fetch("https://nekobot.xyz/api/imagegen?type=trumptweet&text=" + tweet);
      const img = (await res.json()).message;
      message.channel.send({
        files: [{ attachment: img, name: "trumptweet.png" }],
      });
    } catch (err) {
      console.log(err);
      message.channel.send(err);
    }
  },
};
