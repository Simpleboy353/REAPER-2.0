const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {

	constructor(...args) {
		super(...args, { aliases: ['...language'] });
	}

	get base() {
		return this.store.get('language');
	}

};
