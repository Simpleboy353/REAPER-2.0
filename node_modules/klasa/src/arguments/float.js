const { Argument } = require('klasa');

module.exports = class extends Argument {

	constructor(...args) {
		super(...args, { aliases: ['num', 'number'] });
	}

	run(arg, possible, message) {
		const { min, max } = possible;
		const number = parseFloat(arg);
		if (isNaN(number)) throw message.language.get('RESOLVER_INVALID_FLOAT', possible.name);
		return this.constructor.minOrMax(this.client, number, min, max, possible, message) ? number : null;
	}

};
