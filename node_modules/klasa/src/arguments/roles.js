const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {

	constructor(...args) {
		super(...args, { aliases: ['...role'] });
	}

	get base() {
		return this.store.get('role');
	}

};
