const { MessageEmbed } = module.require("discord.js");
const ms = require("ms");
const discord = require("discord.js");


module.exports = {
	name: "tempmute",
	category: "info",
	description: "Returns latency and API ping",
    run: async(client, message, args) => {
		const user = message.mentions.members.first();
        if(!message.member.hasPermission("MANAGE_ROLES")) {
			return message.channel.send("You dont have perms to use that commands");
		}
		if(!message.guild.me.hasPermission("ADMINISTRATOR")) {
			return message.channel.send("I don't have enough permissions");
		}
		const role = message.guild.roles.cache.find(ro => ro.name === "Muted");
		if(!role) {
			message.guild.roles.create({
				data:{
					name: "muted",
					color: "GRAY",
				},
			});
		}
		if(!user) {
			return message.channel.send("you need to specify the user");
		}
		if (user.id === message.owner.id) {
			return message.channel.send("You can use any Mod Command against the Server Owner")
		}
		const time = args[1];
		if(!time) {
			return message.channel.send("How many are you going to mute that person ()");
		}
		const reason = args.splice(2).join(" ");
		if(!reason) {
			return message.channel.send("With what reason are you going to tempmute?:");
		}
		const mtembde = new MessageEmbed()
			.setTitle("Action: Tempmute")
			.setColor("RANDOM")
			.addField("User:", user)
			.addField("Reason", reason)
			.addField("Moderator:", message.member.displayName)
			.addField("Time", time, true);
		const mtuembde = new MessageEmbed()
			.setTitle("YOU HAVE BEEN MUTED!!")
			.setColor("RANDOM")
			.addField("Reason", reason)
			.addField("Moderator:", message.member.displayName)
			.addField("Time", time, true);
		user.send(mtuembde);
		message.channel.send(mtembde);
		user.roles.add(role);
		setTimeout(function() {
			user.roles.remove(role);
			user.send(`You are now unmuted! We hope you Follow the Rules next time`);
		}, ms(time));
	},
};