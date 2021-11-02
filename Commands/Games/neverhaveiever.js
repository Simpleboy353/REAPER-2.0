const { NeverHaveIEver } = require("weky");

module.exports = {
	name: "neverhaveiever",
	description: "Never have I ever",
	run: async(client, message, args) => {
		await NeverHaveIEver({
			message: message,
			embed: {
				title: 'Never Have I Ever | Weky Development',
				color: '#5865F2',
				footer: 'Reaper Games',
				timestamp: true
			},
			thinkMessage: 'I am thinking',
			othersMessage: 'Only <@{{author}}> can use the buttons!',
			buttons: { optionA: 'Yes', optionB: 'No' }
		});
	}
}