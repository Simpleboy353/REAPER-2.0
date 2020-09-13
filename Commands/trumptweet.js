const Discord = module.require("discord.js");

module.exports = {
    name: "trumptweet",
    description: "Make Trump Tweet any message",
    run: async(client, message, args) => {
    const text = args.join(" ");
    if (!text) {
        return message.channel.send("Trump Says: \`What to tweet about ?\`")
    }
    const link = `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}.png`;
    const embed = new Discord.MessageEmbed()
    .setImage(link)
    .setColor("RANDOM");
return message.channel.send(embed);
    }
}