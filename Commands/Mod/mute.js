const { MessageEmbed } = module.require("discord.js");

module.exports= {
	name: "mute",
	description:"Mute members in one shot",
	category:"moderation",
	usage: "=mute <@user> <reason >",
	run: async(client, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES")) {
		return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
	}

	if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
		return message.channel.send(`**${message.author.username}**, I do not have enough Permissions`)	
	}
	const user = message.mentions.members.first();

	if (!user) {
		return message.channel.send(`**${message.author.username}**, Please mention the member who you want to mute`)
	}

	if(user.id === message.guild.owner.id) {
	    return message.channel.send("You cannot mute the Server Owner")
	}
	 
	if (user.id === message.author.id) {
		return message.channel.send(`**${message.author.username}**, You can't mute yourself`)
	}

	let reason = args.slice(1).join(" ")
	
	let muterole = message.guild.roles.cache.find(x => x.name === "Muted")

	if(!muterole) {
		return message.channel.send("This Server has no role named as `Muted`")
	}

	if (user.roles.cache.has(muterole)) {
		return message.channel.send(`Given User is already muted`)
	}

	user.roles.add(muterole)

	const embed = new MessageEmbed()
	.setTitle("Muted!")
	.setColor("RANDOM")
	.setDescription(
		`Action: Muted \nUser:${user} \nReason: ${reason} \nModerator: ${message.member} `
	);
	message.channel.send(embed);
}
};