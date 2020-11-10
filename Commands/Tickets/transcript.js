const ticketModel = require("../Owner/models/tickets/ticket");
const guildModel = require("../Owner/models/tickets/guild");
const fetchAll = require("discord-fetch-all");
const fs = require("fs");
const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "transcript",
  description: "get a transcript of a ticket!",
  cooldown: 3,
  async execute(message) {
    const ticketDoc = await ticketModel.findOne({ guild: message.guild.id });
    const guildDoc = await guildModel.findOne({ Guild: message.guild.id });
    const e = message.member;
    const user = await message.guild.members.cache.get(e.id);

    if (
      user.id === ticketDoc.owner ||
      message.member.hasPermission("MANAGE_MESSAGES")
    ) {
      const channel = await message.guild.channels.cache.get(
        ticketDoc.channelID
      );
      if (message.channel.id !== channel.id)
        return message.channel.send(
          "Please only use this command in a ticket!"
        );
      const msgsArray = await fetchAll.messages(message.channel, {
        reverseArray: true,
      });
      const content = msgsArray.map(
        (m) =>
          `${m.author.tag} - ${m.embeds.length ? m.embeds[0].description : m.content
          }`
      );

      fs.writeFileSync("transcript.txt", content.join("\n"));

      message.channel
        .send(new MessageAttachment("transcript.txt", "transcript.txt"))
        .then(async () => {
          await fs.unlinkSync("transcript.txt");
        });
    } else {
      message.channel.send("You don't have permissions to do this!");
    }
  },
};