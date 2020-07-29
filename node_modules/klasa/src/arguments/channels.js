const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {

	constructor(...args) {
		super(...args, { aliases: ['...channel'] });
	}

	get base() {
		return this.store.get('channel');
	}

};
