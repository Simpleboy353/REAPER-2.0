const Discord = module.require("discord.js");

module.exports = {
	name: "time",
	description: "Just for testing",
	run: async(client, message, args) => {
		message.channel.send("Starting Test")
		message.edit(("First line"), 2000)
		message.edit(("Second line"), 2000)
		message.edit(("Last message"), 2000)
		message.edit(("Finished Test"), 2000)
    }
}
