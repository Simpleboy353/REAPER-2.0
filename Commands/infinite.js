const Discord = module.require("discord.js");

module.exports = {
	name: "infinite",
	description: "Another fun command",
	run: async(client, message, args) => {
		let msg = args.join(" ");
		if (!msg) {
		return message.channel.send("Error : No Text Found")
        }
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send(`${msg}`)
        message.channel.send("Looks like an infinite loop has been created \nPlease wait untill I fix it!")
	message.channel.send(("Done!! Fixed!!"), 2000)
}
}
