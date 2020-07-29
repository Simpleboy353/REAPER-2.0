const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

	async run(message, command) {
		const { broke, permission } = await this.client.permissionLevels.run(message, command.permissionLevel);
		if (!permission) throw broke ? message.language.get('INHIBITOR_PERMISSIONS') : true;
	}

};
