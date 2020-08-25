const Discord = module.require("discord.js");

module.exports = {
    name: "report",
    description: "Report a bug",
    run: async(client, message, args) => {
        const reportchannel = client.channels.cache.get("747699213814464522")
        const report = args.join(" ");
        if (!report) {
            return message.channel.send("Enter the Description of the bug you encountered!");
        }
        message.channel.send(`${message.author}, Your Report has been Successfully Submitted. Our Mod Team will reply to you as soon as possible`)
        const embed = new Discord.MessageEmbed()
        .setTitle("New Bug Report")
        .setDescription(`${report} \n\nBy: ${message.author.tag}`)
        .setFooter(`User ID: ${message.author.id}`)
        .setColor("RANDOM");

        reportchannel.send(embed);
    }
}