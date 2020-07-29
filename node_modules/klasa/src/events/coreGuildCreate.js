const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'guildCreate' });
	}

	run(guild) {
		if (!guild.available) return;
		if (this.client.settings.guildBlacklist.includes(guild.id)) {
			guild.leave();
			this.client.emit('warn', `Blacklisted guild detected: ${guild.name} [${guild.id}]`);
		}
	}

};
