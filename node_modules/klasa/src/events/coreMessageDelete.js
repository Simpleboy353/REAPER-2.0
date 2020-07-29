const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'messageDelete' });
	}

	run(message) {
		if (message.command && message.command.deletable) {
			for (const msg of message.responses) {
				msg.delete();
			}
		}
	}

};
