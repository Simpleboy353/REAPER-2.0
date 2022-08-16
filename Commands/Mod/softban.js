const Discord = module.require("discord.js");

module.exports = {
  name: "softban",
  description: "Soft Ban a User",
  userPerms: ["BanMembers"],
  botPerms: ["EmbedLinks", "BanMembers", "ManageMessages"],
  run: async (client, message, args) => {
    message.delete();

    let banMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!banMember)
      return message.channel.send("Please provide a user to ban!");
    if (banMember.id === message.guild.owner.id)
      return message.channel.send("You cannot SoftBan the Server Owner");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!";

    banMember
      .send({
        embed: {
          color: "#ff0019",
          description: `Hello, you have been banned from ${message.guild.name} for violating Server Rules`,
        },
      })
      .then(() =>
        message.guild
          .member(banMember)
          .ban(banMember, { days: 1, reason: reason })
      )
      .then(() =>
        message.guild.members
          .unban(banMember.id)
          .catch((err) => console.log(err))
      );

    let embed = new Discord.EmbedBuilder()
      .setThumbnail(banMember.user.displayAvatarURL())
      .setColor("Random")
      .addFields([
        { name: "Moderation:", value: "SOFT BAN" },
        { name: "Banned:", value: banMember.user.username },
        { name: "Moderator:", value: message.author.username },
        { name: "Reason:", value: reason }
      ])
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
