const { Argument } = require('klasa');

module.exports = class extends Argument {

	run(arg, possible, message) {
		const role = this.constructor.regex.role.test(arg) ? message.guild.roles.cache.get(this.constructor.regex.role.exec(arg)[1]) : null;
		if (role) return role;
		throw message.language.get('RESOLVER_INVALID_ROLE', possible.name);
	}

};
