const Discord = module.require("discord.js");

module.exports = {
    name: "servericon",
    description: "Displays the Server Icon",
    run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name}'s Icon`)
    .setImage(message.guild.displayIconURL({size: 2048, dynamic: true, format: "png"}))
    .setColor("RANDOM");
 message.channel.send(embed);
}
}
