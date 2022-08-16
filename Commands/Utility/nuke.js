module.exports = {
    name: "nuke",
    description: "nuke",
     botPerms: ["Administrator"],
    userPerms: ["Administrator"],
             run: async(client, message, args) => {
        const channeltonuke =message.mentions.channels.first() || message.channel;
      message.channel.send(`Nuking ${channeltonuke}`);
			const position = message.channel.position;
			const newChannel = await message.channel.clone();
			await message.channel.delete();
			newChannel.setPosition(position);
      newChannel.send(`Channel Nuked by ${message.member}`);
			return newChannel.send("https://media1.tenor.com/images/e275783c9a40b4551481a75a542cdc79/tenor.gif?itemid=3429833")
   }
}
