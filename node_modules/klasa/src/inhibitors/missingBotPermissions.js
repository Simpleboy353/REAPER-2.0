const { Inhibitor, util } = require('klasa');
const { Permissions, Permissions: { FLAGS } } = require('discord.js');

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args);
		this.impliedPermissions = new Permissions(515136).freeze();
		// VIEW_CHANNEL, SEND_MESSAGES, SEND_TTS_MESSAGES, EMBED_LINKS, ATTACH_FILES,
		// READ_MESSAGE_HISTORY, MENTION_EVERYONE, USE_EXTERNAL_EMOJIS, ADD_REACTIONS

		this.friendlyPerms = Object.keys(FLAGS).reduce((obj, key) => {
			obj[key] = util.toTitleCase(key.split('_').join(' '));
			return obj;
		}, {});
	}

	run(message, command) {
		const missing = message.channel.type === 'text' ?
			message.channel.permissionsFor(this.client.user).missing(command.requiredPermissions, false) :
			this.impliedPermissions.missing(command.requiredPermissions, false);

		if (missing.length) throw message.language.get('INHIBITOR_MISSING_BOT_PERMS', missing.map(key => this.friendlyPerms[key]).join(', '));
	}

};
