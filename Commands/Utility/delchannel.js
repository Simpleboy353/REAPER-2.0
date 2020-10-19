const Discord = module.require("discord.js");

module.exports = {
	name: "delchannel",
	description: "Delete Channels From your Server",
	run: async(client, message, args) => {
	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
	return message.channel.send("You don't have enough Permissions")
	}
        const fetchedChannel = message.mentions.channels.first();
	if (!fetchedChannel) {
	return message.channel.send("`Usage: =delchannel <channel>`")
        }
	fetchedChannel.delete()

	const embed = new Discord.MessageEmbed()
	.setTitle("Channel Updates")
	.setDescription ("Channel has been deleted")
	.setColor("RANDOM");
	
	await message.channel.send(embed);
}
}
