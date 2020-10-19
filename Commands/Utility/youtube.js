const Discord = module.require("discord.js");

module.exports = {
    name: "youtube",
    description: "Search For results on Youtube",
    run: async(client, message, args) => {
    const text = args.join(' ');
    const search = args.join('+');
    if (!text) {
    return message.channel.send("Enter some text to search for")
    }
    const embed = new Discord.MessageEmbed()
    .setTitle("YT Search")
    .addField(`You Searched for`, `${text}`)
    .addField(`Results`, `[Here's What I found](https://youtube.com/results?search_query=${search})`)
    .setColor("RANDOM");
    message.channel.send(embed);
    }
}