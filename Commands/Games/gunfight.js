module.exports = {
	name: 'gunfight',
  description: "First one to shoot wins!",
	aliases: ['gf'],
	run: async (client, message, args) => {
		const opponent = message.mentions.users.first();
		const positions = {
			three: '_ _        :levitate: :point_right:      **3**        :point_left: :levitate:',
			two: '_ _        :levitate: :point_right:      **2**        :point_left: :levitate:',
			one: '_ _        :levitate: :point_right:      **1**        :point_left: :levitate:',
			go: '_ _        :levitate: :point_right:      **GO!**        :point_left: :levitate:',
			ended1: '_ _     :levitate: :point_right:      **STOP!**        :skull_crossbones: :levitate:',
			ended2: '_ _     :levitate: :skull_crossbones:      **STOP!**        :point_left: :levitate:',
		};

		const componentsArray = [
			{
				type: 1,
				components: [
					{
						type: 2,
						label: 'Shoot!',
						custom_id: 'shoot1',
						style: 'PRIMARY',
						disabled: true,
					},
					{
						type: 2,
						label: '\u200b',
						custom_id: 'id lol useless',
						style: 'SECONDARY',
						disabled: true,
					},
					{
						type: 2,
						label: 'Shoot!',
						custom_id: 'shoot2',
						style: 'DANGER',
						disabled: true,
					},
				],
			},
		];

		const msg = await message.channel.send({
			content: positions.three,
			components: componentsArray,
		});

		function countdown() {
			setTimeout(() => {
				msg.edit({
					content: positions.two,
					components: componentsArray,
				});
			}, 1000);
			setTimeout(() => {
				msg.edit({
					content: positions.one,
					components: componentsArray,
				});
			}, 2000);
			setTimeout(() => {
				componentsArray[0].components[0].disabled = false;
				componentsArray[0].components[2].disabled = false;
				msg.edit({
					content: positions.go,
					components: componentsArray,
				});
			}, 3000);
		}
		countdown();

		const filter = button => {
			return button.user.id == message.author.id || button.user.id == opponent.id;
		};

		const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

		componentsArray[0].components[0].disabled = true;
		componentsArray[0].components[2].disabled = true;

		if(button.customId === 'shoot1' && button.user.id == message.author.id) {
			msg.edit({
				content: positions.ended1,
				components: componentsArray,
			});
			return button.reply({ content: `<@${message.author.id}> won!` });
		}
		else if(button.customId === 'shoot2' && button.user.id == opponent.id) {
			msg.edit({
				content: positions.ended1,
				components: componentsArray,
			});
			return button.reply({ content: `<@${opponent.id}> won!` });
		}
	},
};