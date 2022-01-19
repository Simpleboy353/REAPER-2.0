const rep = require("../../database/guildData/userRep")
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "rep",
	description: "Change a user's rep points count",
	options: [
		{
			name: "add",
			description: "Adds a rep to a user",
			type: "SUB_COMMAND",
			options: [
				{
					name: "user",
					description: "The user to add a rep to",
					type: "USER",
					required: true
				},
				{
					name: "amount",
					description: "The amount of rep to add",
					type: "NUMBER",
					required: true
				},
				{
					name: "type",
					description: "The type of rep to add (General or Trade)",
					type: "STRING",
					required: true
				},
			],
		},
		{
			name: "remove",
			description: "Removes a rep from a user",
			type: "SUB_COMMAND",
			options: [
				{
					name: "user",
					description: "The user to remove a rep from",
					type: "USER",
					required: true
				},
				{
					name: "amount",
					description: "The amount of rep to remove",
					type: "NUMBER",
					required: true
				},
				{
					name: "type",
					description: "The type of rep to remove (General or Trade)",
					type: "STRING",
					required: true
				},
			],
		},
	],
	run: async(client, interaction, args)=>{

		let newUserData; // For creating a new user's data

		if (interaction.options.getSubcommand() === "add") {
			const user = interaction.options.getUser("user");
			const amount = interaction.options.getNumber("amount");
			const type = interaction.options.getString("type");

			const data = await rep.findOne({
				GuildID: interaction.guild.id,
				UserID: user.id,
			})

			if (data) {
				if (type.toLowerCase() === "general") {
					data.GeneralRep += amount;
				} else if (type.toLowerCase() === "trade") {
					data.TradeRep += amount;
				} else {
					return interaction.reply("Invalid type!");
				}
				await data.save().catch(console.error);
			} else if (!data) {
				if (type.toLowerCase() === "general") {
					newUserData = new rep({
						GuildID: interaction.guild.id,
						UserID: user.id,
						GeneralRep: 1
					})
				} else if (type.toLowerCase() === "trade") {
					newUserData = new rep({
						GuildID: interaction.guild.id,
						UserID: user.id,
						TradeRep: 1
					})
				}
				await newUserData.save().catch(console.error);
			}

			return interaction.reply(`Added ${amount} ${type} reps to ${user}`)
		} else if (interaction.options.getSubcommand() === "remove") {
			const user = await interaction.options.getUser("user");
			const amount = await interaction.options.getNumber("amount");
			const type = await interaction.options.getString("type");

			const data = await rep.findOne({
				GuildID: interaction.guild.id,
				UserID: user.id
			})

			if (data) {
				if (type.toLowerCase() === "general") {
					data.GeneralRep -= amount;
				} else if (type.toLowerCase() === "trade") {
					data.TradeRep -= amount;
				} else {
					return interaction.reply("Invalid type");
				}
				await data.save().catch(console.error);
			}

			await interaction.reply(`Removed ${amount} ${type} reps from ${user}`)
		}
	}
}