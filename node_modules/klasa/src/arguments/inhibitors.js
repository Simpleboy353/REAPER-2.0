const { MultiArgument } = require('klasa');

module.exports = class extends MultiArgument {

	constructor(...args) {
		super(...args, { aliases: ['...inhibitor'] });
	}

	get base() {
		return this.store.get('inhibitor');
	}

};
