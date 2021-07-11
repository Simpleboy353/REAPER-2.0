const prefixModel = require("../../database/guildData/prefix");

module.exports = async (message, client) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
    return;

  const sDoc = await prefixModel.findOne(
    {
      GuildID: message.guild.id,
    },
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );

  let p = sDoc ? sDoc.prefix : client.prefix;

  // mentioned bot
  if (message.content.startsWith(`<@!${client.user.id}>`)) {
    return message.channel.send(
      `My prefix in this server is \`${p}\`\n\nTo get a list of commands, type \`${p}help\``
    );
  }
};
