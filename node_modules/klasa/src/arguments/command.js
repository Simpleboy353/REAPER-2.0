const { Argument } = require('klasa');

module.exports = class extends Argument {

	constructor(...args) {
		super(...args, { aliases: ['cmd'] });
	}

	run(arg, possible, message) {
		const command = this.client.commands.get(arg.toLowerCase());
		if (command) return command;
		throw message.language.get('RESOLVER_INVALID_PIECE', possible.name, 'command');
	}

};
