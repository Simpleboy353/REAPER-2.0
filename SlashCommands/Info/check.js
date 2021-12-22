const userRepData = require("../../database/guildData/userRep")
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "check",
	description: "Shows the amount of Reps the user has gained!",
	options: [
		{
			name: "user",
			description: "Shows the amount of General Rep the user has gained!",
			type: "USER",
			required: true
		}
	],
	run: async(client, interaction, args)=> {
		const user = await interaction.options.getUser('user');

		const data = await userRepData.findOne({
			GuildID: interaction.guild.id,
			UserID: user.id
		}).catch(console.error);

		const embed = new MessageEmbed()
		.setTitle(`${user.username}'s Reputation`)
		.setColor("GREEN")
		.setThumbnail(user.displayAvatarURL())

		if (data) {
			embed.setDescription(`General Rep(s): \`${data.GeneralRep}\`\nTrade Rep(s): \`${data.TradeRep}\``)
		} else {
			embed.setDescription(`General Rep(s): \`0\`\nTrade Rep(s): \`0\``)
		}

		await interaction.reply({ embeds: [embed], ephemeral: true })
	}
}