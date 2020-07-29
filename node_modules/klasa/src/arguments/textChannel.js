const { Argument } = require('klasa');

module.exports = class extends Argument {

	async run(arg, possible, message) {
		const channel = this.constructor.regex.channel.test(arg) ? await this.client.channels.fetch(this.constructor.regex.channel.exec(arg)[1]).catch(() => null) : null;
		if (channel && channel.type === 'text') return channel;
		throw message.language.get('RESOLVER_INVALID_CHANNEL', possible.name);
	}

};
