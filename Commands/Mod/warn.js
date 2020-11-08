const warns = require("../Owner/models/warns");
const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "warn",
  description: "Warn a user",
  category: "Moderation",
  usage: "<prefix>warn <user> <reason>",
  run: async (bot, message, args) => {
    let user = message.mentions.users.first();
    if (!user) return message.channel.send(`❌ ${message.author}, How can I warn, you didn't mention anyone.`);
    let reason = args.slice(1).join(" ")
    if (!reason)
      reason = "Unspecified";
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
                Reason: reason,
              },
            ],
          });
          newWarns.save();
          let embed = new MessageEmbed()
            .setTitle("Warn")
            .setDescription(`
User: ${user}
Moderator: ${message.author}
Reason: ${reason}
Total Warns: 1`)
            .setColor("RED")
            .setTimestamp()
          message.channel.send(embed);
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: args.slice(1).join(" "),
          });
          data.save();
          let embed2 = new MessageEmbed()
          .setTitle("Warn")
          .setDescription(`
User: ${user}
Moderator: ${message.author}
Reason: ${reason}
Total Warns: ${data.Warns.length}`)
          .setColor("RED")
          .setTimestamp()
          message.channel.send(embed2);
        }
      }
    );
  },
};