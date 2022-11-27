const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const suggestData = require("../../database/guildData/suggestions");

module.exports = {
	name: "suggestion",
	description: "Make a sugestion for the server",
	options: [
		{
			name: "create",
			description: "Create a new suggestion",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "suggestion",
					description: "The suggesstion you want to make",
					required: true,
					type: ApplicationCommandOptionType.String
				}
			],
		},
		{
			name: "approve",
			description: "Approve a suggestion",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "id",
					description: "Suggestion Message ID",
					required: true,
					type: ApplicationCommandOptionType.String
				}
			]
		},
		{
			name: "deny",
			description: "Deny a suggestion",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "messageid",
					description: "Suggestion Message ID",
					required: true,
					type: ApplicationCommandOptionType.String
				}
			]
		}
	],
	run: async(client, interaction, args) => {

		await interaction.deferReply();

		const data = await suggestData.findOne({
			GuildID: interaction.guild.id,
		})

		if (!data) return interaction.followUp("Suggestions system isn't setup for this server!")

		if (interaction.options.getSubcommand() === "create") {
			const suggestion = await interaction.options.getString("suggestion");

			const channel = await data.SuggestChannel;

			let suggestionChannel = await interaction.guild.channels.cache.find(ch => ch.id === channel);

			if (!suggestionChannel) return interaction.followUp("Couldn't find the suggestions channel for this server!");

			const suggestEmbed = new EmbedBuilder()
			.setAuthor({ name: "Approval Pending"})
			.setTitle("New Suggestion")
			.setDescription(`${suggestion}`)
			.setFooter({ text: `Submitted by: ${interaction.user.tag}`})
			.setColor("Yellow");

			await suggestionChannel.send({ embeds: [suggestEmbed] }).then(async(msg) => {

				await msg.react("👍");
        		await msg.react("👎");

				const newData = new suggestData({
					GuildID: msg.guild.id,
					Suggestion: suggestion,
					MsgID: msg.id,
					Suggester: interaction.user.id
				});

				await newData.save().catch(err=>console.log(err))

				await interaction.editReply({ content: "Your suggestion has been submitted. You will be notified when your suggestion is approved/denied", ephemeral: true})
			})

		} else if (interaction.options.getSubcommand() === "approve") {

			const messageID = await interaction.options.getString("id");

			const idData = await suggestData.findOne({
				GuildID: interaction.guild.id,
				MsgID: messageID
			});

			if (!idData) return interaction.followUp("Couldn't find the suggestion to approve!")

			let member = await interaction.guild.members.cache.find(user => user.id === idData.Suggester);

			if (!member.permissions.has("ManageServer")) return interaction.followUp("Missing Permissions");

			let suggester = await member.user.tag;

			if (!suggester) suggester = "Unknown User";

			const approveEmbed = new EmbedBuilder()
			.setAuthor({ name: "Suggestion Approved" })
			.setDescription(`${idData.Suggestion}`)
			.setFooter({ text: `Submitted by: ${suggester}`})
			.setColor("Green");

			const toSuggester = new EmbedBuilder()
			.setAuthor({ name: "Congratulations!" })
			.setDescription(`Your [suggestion](https://discord.com/channels/${interaction.guild.id}/${data.SuggestChannel}/${messageID}) (ID: ${messageID}) has been approved in [${interaction.guild.name}](https://discord.com/channels/${interaction.guild.id}/${data.SuggestChannel}/${messageID})`)
			.setColor("Green");

			await interaction.guild.channels.cache.get(data.SuggestChannel).messages.fetch(`${messageID}`).then(async(msg)=>{
				msg.edit({ embeds: [approveEmbed] });
				await member.send({ embeds: [toSuggester] });
				await suggestData.findOneAndRemove({
					GuildID: interaction.guild.id,
					MsgID: messageID
				});
			})

			await interaction.followUp("Suggestion Approved!")

		} else if (interaction.options.getSubcommand() === "deny") {
			const message = await interaction.options.getString("messageid");

			const messageData = await suggestData.findOne({
				GuildID: interaction.guild.id,
				MsgID: message
			});

			if (!messageData) return interaction.followUp("Couldn't find the suggestion to deny!")

			let user = await interaction.guild.members.cache.find(user => user.id === messageData.Suggester);

			if (!user.permissions.has("ManageServer")) return interaction.followUp("Missing Permissions");

			let smaker = await user.user.tag;

			if (!smaker) smaker = "Unknown User";

			const denyEmbed = new EmbedBuilder()
			.setAuthor({ name: "Suggestion Denied"})
			.setDescription(`${messageData.Suggestion}`)
			.setFooter({ text: `Submitted by: ${smaker}`})
			.setColor("Red");

			const toSMaker = new EmbedBuilder()
			.setAuthor({ name: "Oops!" })
			.setDescription(`Your [suggestion](https://discord.com/channels/${interaction.guild.id}/${data.SuggestChannel}/${message}) (ID: ${message}) has been denied in [${interaction.guild.name}](https://discord.com/channels/${interaction.guild.id}/${data.SuggestChannel}/${message})`)
			.setColor("Red");

			await interaction.guild.channels.cache.get(data.SuggestChannel).messages.fetch(`${message}`).then(async(msg)=>{
				msg.edit({ embeds: [denyEmbed] });
				await user.send({ embeds: [toSMaker] });
				await suggestData.findOneAndRemove({
					GuildID: interaction.guild.id,
					MsgID: message
				});
			})

			await interaction.followUp("Suggestion Denied");
		}
	}
}