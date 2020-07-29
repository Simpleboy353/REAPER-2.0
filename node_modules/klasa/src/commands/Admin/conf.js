const { Command, util: { toTitleCase, codeBlock } } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permissionLevel: 6,
			guarded: true,
			subcommands: true,
			description: language => language.get('COMMAND_CONF_SERVER_DESCRIPTION'),
			usage: '<set|show|remove|reset> (key:key) (value:value) [...]',
			usageDelim: ' '
		});

		this
			.createCustomResolver('key', (arg, possible, message, [action]) => {
				if (action === 'show' || arg) return arg;
				throw message.language.get('COMMAND_CONF_NOKEY');
			})
			.createCustomResolver('value', (arg, possible, message, [action]) => {
				if (!['set', 'remove'].includes(action) || arg) return arg;
				throw message.language.get('COMMAND_CONF_NOVALUE');
			});
	}

	show(message, [key]) {
		const path = this.client.gateways.guilds.getPath(key, { avoidUnconfigurable: true, errors: false, piece: null });
		if (!path) return message.sendLocale('COMMAND_CONF_GET_NOEXT', [key]);
		if (path.piece.type === 'Folder') {
			return message.sendLocale('COMMAND_CONF_SERVER', [
				key ? `: ${key.split('.').map(toTitleCase).join('/')}` : '',
				codeBlock('asciidoc', message.guild.settings.list(message, path.piece))
			]);
		}
		return message.sendLocale('COMMAND_CONF_GET', [path.piece.path, message.guild.settings.resolveString(message, path.piece)]);
	}

	async set(message, [key, ...valueToSet]) {
		const status = await message.guild.settings.update(key, valueToSet.join(' '), message.guild, { avoidUnconfigurable: true, action: 'add' });
		return this.check(message, key, status) || message.sendLocale('COMMAND_CONF_UPDATED', [key, message.guild.settings.resolveString(message, status.updated[0].piece)]);
	}

	async remove(message, [key, ...valueToRemove]) {
		const status = await message.guild.settings.update(key, valueToRemove.join(' '), message.guild, { avoidUnconfigurable: true, action: 'remove' });
		return this.check(message, key, status) || message.sendLocale('COMMAND_CONF_UPDATED', [key, message.guild.settings.resolveString(message, status.updated[0].piece)]);
	}

	async reset(message, [key]) {
		const status = await message.guild.settings.reset(key, message.guild, true);
		return this.check(message, key, status) || message.sendLocale('COMMAND_CONF_RESET', [key, message.guild.settings.resolveString(message, status.updated[0].piece)]);
	}

	check(message, key, { errors, updated }) {
		if (errors.length) return message.sendMessage(String(errors[0]));
		if (!updated.length) return message.sendLocale('COMMAND_CONF_NOCHANGE', [key]);
		return null;
	}

};
