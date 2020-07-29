const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {

	constructor(...args) {
		super(...args, { aliases: ['...message'] });
	}

	get base() {
		return this.store.get('message');
	}

};
