const Discord = require("discord.js");
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
    name: "unban",
    description: "Unban a banned member from your Server",
    run: async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_SERVER", "ADMINISTRATOR")) {
    return message.channel.send("You don't have enough Permissions to use this command")
    }
    const id = args[0];
    if (!rgx.test(id)) return message.channel.send('Invalid argument. Please Mention a user.');
    const bannedUsers = await message.guild.fetchBans();
    const user = bannedUsers.get(id).user;
    if (!user) return message.channel.send('Unable to find user. Please check the mentioned user or the provided user ID.');

    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'No reason provided';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

    await message.guild.members.unban(user, reason);
    const embed = new Discord.MessageEmbed()
      .setTitle('Unban Member')
      .setDescription(`${user.tag} was successfully unbanned.`)
      .addField('Moderator', message.member, true)
      .addField('Member', user.tag, true)
      .addField('Reason', reason)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    message.channel.send(embed);
    message.client.logger.info(`${message.guild.name}: ${message.author.tag} unbanned ${user.tag}`);
    
    // Update modlog
    this.sendModlogMessage(message, reason, { Member: user.tag });
    }
}