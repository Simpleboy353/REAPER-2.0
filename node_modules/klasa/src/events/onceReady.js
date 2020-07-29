const { Event, util } = require('klasa');
const { Team } = require('discord.js');
let retries = 0;

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true,
			event: 'ready'
		});
	}

	async run() {
		try {
			await this.client.fetchApplication();
		} catch (err) {
			if (++retries === 3) return process.exit();
			this.client.emit('warning', `Unable to fetchApplication at this time, waiting 5 seconds and retrying. Retries left: ${retries - 3}`);
			await util.sleep(5000);
			return this.run();
		}

		if (!this.client.options.owners.length) {
			if (this.client.application.owner instanceof Team) this.client.options.owners.push(...this.client.application.owner.members.keys());
			else this.client.options.owners.push(this.client.application.owner.id);
		}

		this.client.mentionPrefix = new RegExp(`^<@!?${this.client.user.id}>`);

		this.client.settings = this.client.gateways.clientStorage.get(this.client.user.id, true);
		// Added for consistency with other datastores, Client#clients does not exist
		this.client.gateways.clientStorage.cache.set(this.client.user.id, this.client);
		await this.client.gateways.sync();

		// Init all the pieces
		await Promise.all(this.client.pieceStores.filter(store => !['providers', 'extendables'].includes(store.name)).map(store => store.init()));
		util.initClean(this.client);
		this.client.ready = true;

		// Init the schedule
		await this.client.schedule.init();

		if (this.client.options.readyMessage !== null) {
			this.client.emit('log', util.isFunction(this.client.options.readyMessage) ? this.client.options.readyMessage(this.client) : this.client.options.readyMessage);
		}

		return this.client.emit('klasaReady');
	}

};
