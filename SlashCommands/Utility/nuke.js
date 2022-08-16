const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "nuke",
    description: "nuke the channel",
     botPerms: ["Administrator"],
    userPerms: ["Administrator"],
   options: [
                {
                    name: 'channel',
                    description: 'channel to nuke',
                    required: true,
                    type: ApplicationCommandOptionType.Channel
                }
            ],
             run: async(client, interaction, args) => {
      const channeltonuke = interaction.options.getChannel('channel') || interaction.channel;
			interaction.reply(`Nuking ${channeltonuke}`);
			const position = channeltonuke.position;
			const newChannel = await channeltonuke.clone();
			await channeltonuke.delete();
			newChannel.setPosition(position);
      newChannel.send(`Channel Nuked by ${interaction.member}`);
			return newChannel.send("https://media1.tenor.com/images/e275783c9a40b4551481a75a542cdc79/tenor.gif?itemid=3429833")
  }
}
