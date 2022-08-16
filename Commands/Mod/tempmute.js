const { EmbedBuilder } = module.require("discord.js");
const ms = require("ms");
const discord = require("discord.js");

module.exports = {
  name: "tempmute",
  category: "info",
  description: "Returns latency and API ping",
  userPerms: ["ManageRoles"],
  botPerms: ["EmbedLinks", "ManageRoles"],
  run: async (client, message, args) => {
    const user = message.mentions.members.first();

    const role = message.guild.roles.cache.find((ro) => ro.name === "Muted");
    if (!role) {
      message.guild.roles.create({
        data: {
          name: "muted",
          color: "GRAY",
        },
      });
    }
    if (!user) {
      return message.channel.send("you need to specify the user");
    }
    if (user.id === message.owner.id) {
      return message.channel.send(
        "You can use any Mod Command against the Server Owner"
      );
    }
    const time = args[0];
    if (!time) {
      return message.channel.send(
        "How many are you going to mute that person ()"
      );
    }
    const reason = args.slice(1).join(" ");
    if (!reason) {
      return message.channel.send(
        "With what reason are you going to tempmute?:"
      );
    }
    const mtembde = new EmbedBuilder()
      .setTitle("Action: Tempmute")
      .setColor("RANDOM")
      .addFields([
        { name: "User:", value: userm },
        { name: "Reason", value: reason },
        { name: "Moderator:", value: message.member.displayName },
        { name: "Time", value: time }
      ]);
    const mtuembde = new EmbedBuilder()
      .setTitle("YOU HAVE BEEN MUTED!!")
      .setColor("RANDOM")
      .addFields([
        { name: "Reason", value: reason },
        { name: "Moderator:", value: message.member.displayName },
        { name: "Time", value: time },
      ]);
    user.send({ embeds: [mtuembde] });
    message.channel.send({ embeds: [mtembde] });
    user.roles.add(role);
    setTimeout(function () {
      user.roles.remove(role);
      user.send(`You are now unmuted! We hope you Follow the Rules next time`);
    }, ms(time));
  },
};
