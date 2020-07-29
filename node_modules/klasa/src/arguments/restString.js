const { Argument } = require('klasa');

module.exports = class extends Argument {

	constructor(...args) {
		super(...args, { name: '...string', aliases: ['...str'] });
	}

	get stringArg() {
		return this.store.get('string');
	}

	run(arg, possible, message) {
		if (!arg) throw message.language.get('RESOLVER_INVALID_STRING', possible.name);
		const { args, usage: { usageDelim } } = message.prompter;
		const index = args.indexOf(arg);
		const rest = args.splice(index, args.length - index).join(usageDelim);
		args.push(rest);
		return this.stringArg.run(rest, possible, message);
	}

};
