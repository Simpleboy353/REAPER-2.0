const Discord = module.require("discord.js");

module.exports = {
	name: "time",
	description: "Just for testing",
	run: async(client, message, args) => {
                let edit = message.edit()
                const test = new Discord.MessageEmbed()
                .setColor("RANDOM")
		.setDescription("Starting Test");
                message.channel.send(test);
		message.edit.test(("First line"), 2000)
		message.edit.test(("Second line"), 2000)
		message.edit.test(("Last message"), 2000)
		message.edit.test(("Finished Test"), 2000)
    }
}
