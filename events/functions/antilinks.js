const antilinkData = require("../../database/guildData/antilink");

module.exports = async (message) => {
  const antilink = await antilinkData.findOne({
    GuildID: message.guild.id,
  });
  if (antilink) {
    if (
      message.content.match("https://") ||
      message.content.match("discord.gg") ||
      message.content.match("www.")
    ) {
      message.delete();
      message.channel
        .send("No links allowed while anti-link is active!")
        .then((msg) => {
          let time = "2s";
          setTimeout(function () {
            msg.delete();
          }, ms(time));
        });
    }
  }
};
