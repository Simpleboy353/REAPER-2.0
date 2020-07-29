const { Event } = require('klasa');

module.exports = class extends Event {

	run(message, command, response, timer, finalizer, error) {
		this.client.emit('wtf', `[FINALIZER] ${finalizer.path}\n${error ?
			error.stack ? error.stack : error : 'Unknown error'}`);
	}

};
