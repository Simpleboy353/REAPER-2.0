const { parse } = require('url');
const { Argument } = require('klasa');

module.exports = class extends Argument {

	constructor(...args) {
		super(...args, { aliases: ['url'] });
	}

	run(arg, possible, message) {
		const res = parse(arg);
		const hyperlink = res.protocol && res.hostname ? arg : null;
		if (hyperlink !== null) return hyperlink;
		throw message.language.get('RESOLVER_INVALID_URL', possible.name);
	}

};
