const prefixModel = require("../../database/guildData/prefix");

module.exports = async (message, client) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
    return;

  const { DEFAULT_PREFIX } = require("../../config.json")

  const prefixData = await prefixModel.findOne({
      GuildID: message.guild.id,
    }).catch(err=>console.log(err))
  
    if (prefixData) {
      var PREFIX = prefixData.Prefix
    } else if (!prefixData) {
      PREFIX = DEFAULT_PREFIX
    }
    client.prefix = PREFIX;

  // mentioned bot
  if (message.content ===`<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
    return message.channel.send(
      `My prefix in this server is \`${PREFIX}\`\n\nTo get a list of commands, type \`${PREFIX}help\``
    );
  }
};
