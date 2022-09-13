const { EmbedBuilder, ActionRowBuilder, ButtonStyle, MessageActionRow, ButtonBuilder } = require('discord.js');

module.exports = {
	name: 'football',
	aliases: [],
	run: async (client, message, args) => {
		const positions = {
			left: '_ _                   🥅🥅🥅\n_ _                   🕴️\n      \n_ _                         ⚽',
			middle: '_ _                   🥅🥅🥅\n_ _                        🕴️\n      \n_ _                         ⚽',
			right: '_ _                   🥅🥅🥅\n_ _                              🕴️\n      \n_ _                         ⚽',
		};
		let randomized = Math.floor(Math.random() * Object.keys(positions).length);
		let gameEnded = false;
		let randomPos = positions[Object.keys(positions)[randomized]];

		const goal = await message.reply({
			content: positions.randomPos,
			components: [
				action = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('left')
							.setLabel('Left')
							.setStyle(ButtonStyle.Secondary),
						new ButtonBuilder()
							.setCustomId('middle')
							.setLabel('middle')
							.setStyle(ButtonStyle.Primary),
						new ButtonBuilder()
							.setCustomId('right')
							.setLabel('right')
							.setStyle(ButtonStyle.Secondary),
					)
			],
		});

		function update() {
			randomized = Math.floor(Math.random() * Object.keys(positions).length);
			randomPos = positions[Object.keys(positions)[randomized]];

			goal.edit({
				content: randomPos,
			});
		}
		setInterval(() => {
			if(gameEnded === false) return update();
		}, 1000);

		client.on('interactionCreate', async (interaction) => {
			if (interaction.isButton()) {
				if (interaction.customId !== Object.keys(positions)[randomized]) {
					gameEnded = true;
					goal.edit({
						content: positions.ended1,
						components: [
							action = new ActionRowBuilder()
								.addComponents(
									new ButtonBuilder()
										.setCustomId('left')
										.setLabel('Left')
										.setStyle(ButtonStyle.Secondary)
										.setDisabled(true),
									new ButtonBuilder()
										.setCustomId('middle')
										.setLabel('middle')
										.setStyle(ButtonStyle.Primary)
										.setDisabled(true),
									new ButtonBuilder()
										.setCustomId('right')
										.setLabel('right')
										.setStyle(ButtonStyle.Secondary)
										.setDisabled(true),
								)
						],
					});
					await message.channel.send({ content: 'You won!' });
				}
				else {
					gameEnded = true;
					goal.edit({
						content: positions.ended1,
						components: [
							action = new ActionRowBuilder()
								.addComponents(
									new ButtonBuilder()
										.setCustomId('left')
										.setLabel('Left')
										.setStyle(ButtonStyle.Secondary)
										.setDisabled(true),
									new ButtonBuilder()
										.setCustomId('middle')
										.setLabel('middle')
										.setStyle(ButtonStyle.Primary)
										.setDisabled(true),
									new ButtonBuilder()
										.setCustomId('right')
										.setLabel('right')
										.setStyle(ButtonStyle.Secondary)
										.setDisabled(true),
								)
						],
					});
					return message.channel.send({ content: 'You lose...' });
				}
			}
		});
	},
};