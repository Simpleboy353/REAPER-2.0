const { Event } = require('klasa');

module.exports = class extends Event {

	run(err) {
		this.client.emit('error', `Disconnected | ${err.code}: ${err.reason}`);
	}

};
