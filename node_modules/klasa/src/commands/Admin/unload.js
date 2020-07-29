const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['u'],
			permissionLevel: 10,
			guarded: true,
			description: language => language.get('COMMAND_UNLOAD_DESCRIPTION'),
			usage: '<Piece:piece>'
		});
	}

	async run(message, [piece]) {
		if ((piece.type === 'event' && piece.name === 'message') || (piece.type === 'monitor' && piece.name === 'commandHandler')) {
			return message.sendLocale('COMMAND_UNLOAD_WARN');
		}
		piece.unload();
		if (this.client.shard) {
			await this.client.shard.broadcastEval(`
				if (String(this.options.shards) !== '${this.client.options.shards}') this.${piece.store}.get('${piece.name}').unload();
			`);
		}
		return message.sendLocale('COMMAND_UNLOAD', [piece.type, piece.name]);
	}

};
