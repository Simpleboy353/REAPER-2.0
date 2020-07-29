const { Command, util: { isFunction } } = require('klasa');
const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['commands'],
			guarded: true,
			description: language => language.get('COMMAND_HELP_DESCRIPTION'),
			usage: '(Command:command)'
		});

		this.createCustomResolver('command', (arg, possible, message) => {
			if (!arg || arg === '') return undefined;
			return this.client.arguments.get('command').run(arg, possible, message);
		});
	}

	async run(message, [command]) {
		if (command) {
			const info = [
				`= ${command.name} = `,
				isFunction(command.description) ? command.description(message.language) : command.description,
				message.language.get('COMMAND_HELP_USAGE', command.usage.fullUsage(message)),
				message.language.get('COMMAND_HELP_EXTENDED'),
				isFunction(command.extendedHelp) ? command.extendedHelp(message.language) : command.extendedHelp
			].join('\n');
			return message.sendMessage(info, { code: 'asciidoc' });
		}
		const help = await this.buildHelp(message);
		const categories = Object.keys(help);
		const helpMessage = [];
		for (let cat = 0; cat < categories.length; cat++) {
			helpMessage.push(`**${categories[cat]} Commands**:`, '```asciidoc');
			const subCategories = Object.keys(help[categories[cat]]);
			for (let subCat = 0; subCat < subCategories.length; subCat++) helpMessage.push(`= ${subCategories[subCat]} =`, `${help[categories[cat]][subCategories[subCat]].join('\n')}\n`);
			helpMessage.push('```', '\u200b');
		}

		return message.author.send(helpMessage, { split: { char: '\u200b' } })
			.then(() => { if (message.channel.type !== 'dm') message.sendLocale('COMMAND_HELP_DM'); })
			.catch(() => { if (message.channel.type !== 'dm') message.sendLocale('COMMAND_HELP_NODM'); });
	}

	async buildHelp(message) {
		const help = {};

		const { prefix } = message.guildSettings;
		const commandNames = [...this.client.commands.keys()];
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

		await Promise.all(this.client.commands.map((command) =>
			this.client.inhibitors.run(message, command, true)
				.then(() => {
					if (!has(help, command.category)) help[command.category] = {};
					if (!has(help[command.category], command.subCategory)) help[command.category][command.subCategory] = [];
					const description = isFunction(command.description) ? command.description(message.language) : command.description;
					help[command.category][command.subCategory].push(`${prefix}${command.name.padEnd(longest)} :: ${description}`);
				})
				.catch(() => {
					// noop
				})
		));

		return help;
	}

};
