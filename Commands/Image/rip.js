const Discord = module.require("discord.js");

module.exports = {
    name: 'rip',
    description: "R.I.P. Any user",
    run: async (client, message, args) => {
    const state = "enabled";
    if (state ===  "disabled") {
        return message.channel.send("The Command has Been Disabled!")
    }
    const mention = message.mentions.members.first();
    if (!mention) {
        return message.channel.send("Please Mention Someone to R.I.P. Them!");
    }
    
        message.channel.send({ files: [{ attachment:`https://vacefron.nl/api/grave?user=${mention.user.avatarURL()}`, name: "rip.png"}]});
    }
}