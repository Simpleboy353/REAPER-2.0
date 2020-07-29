const { Argument } = require('klasa');

module.exports = class extends Argument {

	run(arg, possible, message) {
		const emoji = this.constructor.regex.emoji.test(arg) ? this.client.emojis.cache.get(this.constructor.regex.emoji.exec(arg)[1]) : null;
		if (emoji) return emoji;
		throw message.language.get('RESOLVER_INVALID_EMOJI', possible.name);
	}

};
