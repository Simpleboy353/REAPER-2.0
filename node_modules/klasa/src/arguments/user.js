const { Argument } = require('klasa');

module.exports = class extends Argument {

	constructor(...args) {
		super(...args, { aliases: ['mention'] });
	}

	async run(arg, possible, message) {
		const user = this.constructor.regex.userOrMember.test(arg) ? await this.client.users.fetch(this.constructor.regex.userOrMember.exec(arg)[1]).catch(() => null) : null;
		if (user) return user;
		throw message.language.get('RESOLVER_INVALID_USER', possible.name);
	}

};
