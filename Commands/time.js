const Discord = module.require("discord.js");

module.exports = {
	name: "time",
	description: "Just for testing",
	run: async(client, message, args) => {
                const test = new Discord.MessageEmbed()
		.setDescription("Starting Test");
                message.channel.send(test);
		message.test.edit(("First line"), 2000)
		message.test.edit(("Second line"), 2000)
		message.test.edit(("Last message"), 2000)
		message.test.edit(("Finished Test"), 2000)
    }
}
