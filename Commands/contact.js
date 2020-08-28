const Discord = module.require("discord.js");

module.exports = {
    name: "contact.js",
    description: "Contact the Mod Team For Inifinity Bot",
    run: async(client, message, args) => {
    message.delete();
    const msg = args.join(" ");
    if (!msg) {
    return message.channel.send(`Missing Arguments: \`No Message Found to Send\``)
    }
        const guild = client.guilds.cache.get("725273882625572895");
        message.channel.send("Thanks for contacting. Our Mod Team will reply to you shortly");
        const channel = guild.channels.cache.find(`${message.author.tag}`)
        const embed = new Discord.MessageEmbed()
        .setTitle("User Contact")
        .setDescription(`${msg}`)
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()
        .setColor("RANDOM");

        if (channel) {
        channel.send(embed)
        } else if (!channel) {
        const channel1 = guild.channels.create(`${message.author.tag}`, {type: "text"});
        channel1.send(embed)
        }
}
}