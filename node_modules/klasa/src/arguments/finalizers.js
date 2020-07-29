const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {

	constructor(...args) {
		super(...args, { aliases: ['...finalizer'] });
	}

	get base() {
		return this.store.get('finalizer');
	}

};
