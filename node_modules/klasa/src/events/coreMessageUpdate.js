const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'messageUpdate' });
	}

	async run(old, message) {
		if (this.client.ready && !old.partial && old.content !== message.content) this.client.monitors.run(message);
	}

};
