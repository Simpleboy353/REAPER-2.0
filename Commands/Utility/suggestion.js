const Discord = module.require("discord.js");

module.exports = {
    name: "suggestion",
    description: "Anything",
    run: async(client, message, args) => {
    const msg = args.join(" ");
    message.delete();
    if (!msg) {
        return message.channel.send("Add a suggestion please");
    }
    const suggestionchannel = message.guild.channels.cache.find(c => c.name === "suggestions")
    if (!suggestionchannel) {
        return message.channel.send('This Server has no channel named "suggestions", if the channel exists with some other name, I recommend you to change the channel name to `suggestions`')
    }
    await message.channel.send(`${message.author}, Your Suggestion has been submitted!`);

    const embed = new Discord.MessageEmbed()
    .setTitle("New Suggestion")
    .setDescription(`${msg}`)
    .setFooter(`Suggested by ${message.author.tag}`)
    .setColor("RANDOM");

    suggestionchannel.send(embed)
    .then(function (message, str) {
        message.react(":yes:747387883123376181")
        message.react(":no:747388029202595881")
      }).catch(function () {});
    }
}