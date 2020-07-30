const Discord = module.require('discord.js');

module.exports = {
    name: "poll",
    description: "Start a Poll",
    run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_SERVER')) {
    return message.channel.send("You don't have enough Permissions")
    }
    if (args === 0) {
    return message.channel.send("Enter some text for the Poll")
    }
    let embed = new Discord.MessageEmbed()
    .setTitle("Poll Time")
    .setDescription(`${args}`.split(',').join(' '))
    .setFooter(`Started by ${message.author.username}`)
    .setColor("RANDOM");
    message.channel.send(embed)
    .then(function (message, str) {
        message.react("👍")
        message.react("👎")
      }).catch(function () {});
}
}