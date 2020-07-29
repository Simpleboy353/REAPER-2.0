const { Argument } = require('klasa');

module.exports = class extends Argument {

	get date() {
		return this.store.get('date');
	}

	get duration() {
		return this.store.get('duration');
	}

	run(arg, possible, message) {
		let date;
		try {
			date = this.date.run(arg, possible, message);
		} catch (err) {
			try {
				date = this.duration.run(arg, possible, message);
			} catch (error) {
				// noop
			}
		}
		if (date && !isNaN(date.getTime()) && date.getTime() > Date.now()) return date;
		throw message.language.get('RESOLVER_INVALID_TIME', possible.name);
	}

};
