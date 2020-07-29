const { Extendable } = require('klasa');
const { TextChannel, DMChannel, User, APIMessage } = require('discord.js');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: [TextChannel, DMChannel, User] });
	}

	sendCode(code, content, options = {}) {
		return this.send(APIMessage.transformOptions(content, options, { code }));
	}

	sendEmbed(embed, content, options = {}) {
		return this.send(APIMessage.transformOptions(content, options, { embed }));
	}

	sendFile(attachment, name, content, options = {}) {
		return this.send(APIMessage.transformOptions(content, options, { files: [{ attachment, name }] }));
	}

	sendFiles(files, content, options = {}) {
		return this.send(APIMessage.transformOptions(content, options, { files }));
	}

	sendLocale(key, args = [], options = {}) {
		if (!Array.isArray(args)) [options, args] = [args, []];
		const language = this.guild ? this.guild.language : this.client.languages.default;
		return this.send(APIMessage.transformOptions(language.get(key, ...args), undefined, options));
	}

	sendMessage(content, options) {
		return this.send(content, options);
	}

};
