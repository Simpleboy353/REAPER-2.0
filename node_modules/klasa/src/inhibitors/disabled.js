const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

	run(message, command) {
		if (!command.enabled) throw message.language.get('INHIBITOR_DISABLED_GLOBAL');
		if (message.guildSettings.disabledCommands.includes(command.name)) throw message.language.get('INHIBITOR_DISABLED_GUILD');
	}

};
