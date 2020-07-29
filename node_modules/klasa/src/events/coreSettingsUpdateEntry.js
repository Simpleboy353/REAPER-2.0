const { Event } = require('klasa');
const gateways = ['users', 'clientStorage'];

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'settingsUpdateEntry' });
	}

	run(settings) {
		if (gateways.includes(settings.gateway.type)) {
			this.client.shard.broadcastEval(`
				if (String(this.options.shards) !== '${this.client.options.shards}') {
					const entry = this.gateways.${settings.gateway.type}.get('${settings.id}');
					if (entry) {
						entry._patch(${JSON.stringify(settings)});
						entry._existsInDB = true;
					}
				}
			`);
		}
	}

	init() {
		if (!this.client.shard) this.disable();
	}

};
