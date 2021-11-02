const { GuessThePokemon } = require("weky");

module.exports = {
	name: "guesspokemon",
	description: "Guess the pokemon",
	run: async(client, message, args)=>{
		await GuessThePokemon({
			message: message,
			embed: {
				title: 'Guess The Pokémon | Weky Development',
				description:
					'**Type:**\n{{type}}\n\n**Abilities:**\n{{abilities}}\n\nYou only have **{{time}}** to guess the pokémon.',
				color: '#5865F2',
				footer: 'Reaper Games',
				timestamp: true
			},
			thinkMessage: 'I am thinking',
			othersMessage: 'Only <@{{author}}> can use the buttons!',
			winMessage:
				'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
			loseMessage: 'Better luck next time! It was a **{{answer}}**.',
			time: 60000,
			incorrectMessage: "No {{author}}! The pokémon isn't `{{answer}}`",
			buttonText: 'Cancel'
		});
	}
}