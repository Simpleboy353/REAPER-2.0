const Discord = require("discord.js");

module.exports = {
    name: "announce",
    description: "Make an Announcemnet in your Server",
    run: async (clinet, message, args) => {
        const ann = args.join(" ");
        const anchannel = message.mentions.channels.first();
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("You don't have enogh Permissions")
        }
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("I don't have enough Permissions")
        }
        if (!anchannel) {
        return message.channel.send("Mention a channel")
        }
        if (!ann) {
        return message.channel.send("Please add some text to make an Announcement")
        }

        let embed = new Discord.MessageEmbed()
        .setTitle("New Server Announcement")
        .setDescription(`${ann}`)
        .setColor("RANDOM")
        .setFooter(`Announcement by ${message.author.username}`);
        anchannel.send(embed);
    
        let anembed = new Discord.MessageEmbed))
        .setTitle("Done!")
        .setDescription (`Announcement has been sent to ${anchannel}`)
        .setColor("RANDOM");

        message.channel.send(anembed);
        message.delete();
    }
}
