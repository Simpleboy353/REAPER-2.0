const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { emitter: process });
		if (this.client.options.production) this.unload();
	}

	run(err) {
		if (!err) return;
		this.client.emit('error', `Uncaught Promise Error: \n${err.stack || err}`);
	}

};
