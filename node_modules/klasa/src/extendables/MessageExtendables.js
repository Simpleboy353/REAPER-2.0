const { Extendable } = require('klasa');
const { Permissions: { FLAGS }, DMChannel, TextChannel } = require('discord.js');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: [DMChannel, TextChannel] });
	}

	get attachable() {
		return !this.guild || (this.postable && this.permissionsFor(this.guild.me).has(FLAGS.ATTACH_FILES, false));
	}

	get embedable() {
		return !this.guild || (this.postable && this.permissionsFor(this.guild.me).has(FLAGS.EMBED_LINKS, false));
	}

	get postable() {
		return !this.guild || this.permissionsFor(this.guild.me).has([FLAGS.VIEW_CHANNEL, FLAGS.SEND_MESSAGES], false);
	}

	get readable() {
		return !this.guild || this.permissionsFor(this.guild.me).has(FLAGS.VIEW_CHANNEL, false);
	}

};
