const { Argument } = require('klasa');

module.exports = class extends Argument {

	run(arg, possible, message) {
		const inhibitor = this.client.inhibitors.get(arg);
		if (inhibitor) return inhibitor;
		throw message.language.get('RESOLVER_INVALID_PIECE', possible.name, 'inhibitor');
	}

};
