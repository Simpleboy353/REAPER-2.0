const { Argument } = require('klasa');

module.exports = class extends Argument {

	async run(arg, possible, message) {
		const member = this.constructor.regex.userOrMember.test(arg) ? await message.guild.members.fetch(this.constructor.regex.userOrMember.exec(arg)[1]).catch(() => null) : null;
		if (member) return member;
		throw message.language.get('RESOLVER_INVALID_MEMBER', possible.name);
	}

};
