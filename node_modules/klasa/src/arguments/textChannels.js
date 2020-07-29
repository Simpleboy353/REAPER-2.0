const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {

	constructor(...args) {
		super(...args, { aliases: ['...textChannel'] });
	}

	get base() {
		return this.store.get('textChannel');
	}

};
