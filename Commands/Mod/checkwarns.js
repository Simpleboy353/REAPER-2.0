const warns = require("../Owner/models/warns");
const { MessageEmbed, Message } = require("discord.js");
module.exports = {
  name: "warns",
  description: "Get a user's warns in the guild!",
  category: "Moderation",
  usage: "<prefix>warns <user>",
  aliases: ["warnings", "infractions"],
  run: async (bot, message, args) => {
    let user = message.mentions.members.first();
    if (!user) return message.channel.send(`❌ ${message.author}, How can I check warns, you didn't mention anyone.`);
    warns.find(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data.length)
          return message.channel.send(
            `${user.user.tag} has not got any warns in this guild!`
          );
        let Embed = new MessageEmbed()
          .setTitle(`${user.user.tag}'s warns in ${message.guild.name}.. `)
          .setColor("0193FC")
          .setDescription(data.map((d) => {
            return d.Warns.map((w, i) =>
              `**${i} - Moderator: ${message.guild.members.cache.get(w.Moderator).user.tag} Reason: ${w.Reason}**`).join("\n");
          }));
        message.channel.send(Embed);
      }
    );
  },
};