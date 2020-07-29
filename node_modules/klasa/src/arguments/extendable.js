const { Argument } = require('klasa');

module.exports = class extends Argument {

	run(arg, possible, message) {
		const extendable = this.client.extendables.get(arg);
		if (extendable) return extendable;
		throw message.language.get('RESOLVER_INVALID_PIECE', possible.name, 'extendable');
	}

};
