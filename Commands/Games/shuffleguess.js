const { ShuffleGuess } = require("weky");

module.exports = {
	name: "shuffleguess",
	description: "Shuffle a word and guess it.",
	run: async(client, message, args)=>{
		await ShuffleGuess({
			message: message,
			embed: {
				title: 'Shuffle Guess | Weky Development',
				color: '#5865F2',
				footer: 'Reaper Games',
				timestamp: true
			},
			word: ['voice'],
			button: { cancel: 'Cancel', reshuffle: 'Reshuffle' },
			startMessage:
				'I shuffled a word it is **`{{word}}`**. You have **{{time}}** to find the correct word!',
			winMessage:
				'GG, It was **{{word}}**! You gave the correct answer in **{{time}}.**',
			loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
			incorrectMessage: "No {{author}}! The word isn't `{{answer}}`",
			othersMessage: 'Only <@{{author}}> can use the buttons!',
			time: 60000
		});
	}
}