const Discord = module.require("discord.js");

module.exports = {
    name: "contact",
    description: "Contact the Mod Team For Inifinity Bot",
    run: async(client, message, args) => {
    message.delete();
    const msg = args.join(" ");
    if (!msg) {
    return message.channel.send(`Missing Arguments: \`No Message Found to Send\``)
    }
        const guild = client.guilds.cache.get("725273882625572895");
        message.channel.send("Thanks for contacting. Our Mod Team will reply to you shortly");
        const channel = guild.channels.cache.find(c => c.name === `${message.author.tag}`);
        if (!channel) {
        guild.channels.create(`${message.author.tag}`, {type: "text"});
        }
        const embed = new Discord.MessageEmbed()
        .setTitle("User Contact")
        .setDescription(`${msg}`)
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()
        .setColor("RANDOM");

    channel.send(embed);
}
}
