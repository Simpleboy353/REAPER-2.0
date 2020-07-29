const { Monitor, Stopwatch } = require('klasa');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, { ignoreOthers: false });
		this.ignoreEdits = !this.client.options.commandEditing;
	}

	async run(message) {
		if (message.guild && !message.guild.me) await message.guild.members.fetch(this.client.user);
		if (!message.channel.postable) return undefined;
		if (!message.commandText && message.prefix === this.client.mentionPrefix) {
			return message.sendLocale('PREFIX_REMINDER', [message.guildSettings.prefix.length ? message.guildSettings.prefix : undefined]);
		}
		if (!message.commandText) return undefined;
		if (!message.command) return this.client.emit('commandUnknown', message, message.commandText, message.prefix, message.prefixLength);
		this.client.emit('commandRun', message, message.command, message.args);

		return this.runCommand(message);
	}

	async runCommand(message) {
		const timer = new Stopwatch();
		if (this.client.options.typing) message.channel.startTyping();
		try {
			await this.client.inhibitors.run(message, message.command);
			try {
				await message.prompter.run();
				try {
					const subcommand = message.command.subcommands ? message.params.shift() : undefined;
					const commandRun = subcommand ? message.command[subcommand](message, message.params) : message.command.run(message, message.params);
					timer.stop();
					const response = await commandRun;
					this.client.finalizers.run(message, message.command, response, timer);
					this.client.emit('commandSuccess', message, message.command, message.params, response);
				} catch (error) {
					this.client.emit('commandError', message, message.command, message.params, error);
				}
			} catch (argumentError) {
				this.client.emit('argumentError', message, message.command, message.params, argumentError);
			}
		} catch (response) {
			this.client.emit('commandInhibited', message, message.command, response);
		}
		if (this.client.options.typing) message.channel.stopTyping();
	}

};
