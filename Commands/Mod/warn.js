const warns = require("../Owner/models/warns");
const { MesssageEmbed } = require("discord.js")
module.exports = {
  name: "warn",
  description: "Warn a user",
  category: "Moderation",
  usage: "<prefix>warn <user> <reason>",
  run: async (bot, message, args) => {
    let user = message.mentions.users.first();
    if (!user) return message.channel.send(`❌ ${message.author}, How can I warn, you didn't mention anyone.`);
    if (!args.slice(1).join(" "))
      return message.channel.send(`❌ ${message.author.username}, You need to specify a reason for warn!`);
    warns.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          let newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: args.slice(1).join(" "),
              },
            ],
          });
          newWarns.save();
          message.channel.send(`**${user.tag} has been warned. Reason: ${args.slice(1).join(" ")}. Total warnings: 1**`);
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: args.slice(1).join(" "),
          });
          data.save();
          message.channel.send(`**${user.tag} has been warned. Reason: ${args.slice(1).join(" ")}. Total warnings: ${data.Warns.length}**`);
        }
      }
    );
  },
};