const { Finalizer, RateLimitManager } = require('klasa');

module.exports = class extends Finalizer {

	constructor(...args) {
		super(...args);
		this.cooldowns = new WeakMap();
	}

	run(message, command) {
		if (command.cooldown <= 0 || this.client.owners.has(message.author)) return;

		try {
			this.getCooldown(message, command).drip();
		} catch (err) {
			this.client.emit('error', `${message.author.username}[${message.author.id}] has exceeded the RateLimit for ${message.command}`);
		}
	}

	getCooldown(message, command) {
		let cooldownManager = this.cooldowns.get(command);
		if (!cooldownManager) {
			cooldownManager = new RateLimitManager(command.bucket, command.cooldown * 1000);
			this.cooldowns.set(command, cooldownManager);
		}
		return cooldownManager.acquire(message.guild ? message[command.cooldownLevel].id : message.author.id);
	}

};
