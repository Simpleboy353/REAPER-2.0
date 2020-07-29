const Finalizer = require('./Finalizer');
const Store = require('./base/Store');

/**
 * Stores all finalizers for use in Klasa.
 * @extends Store
 */
class FinalizerStore extends Store {

	/**
	 * Constructs our FinalizerStore for use in Klasa
	 * @since 0.0.1
	 * @param {KlasaClient} client The Klasa client
	 */
	constructor(client) {
		super(client, 'finalizers', Finalizer);
	}

	/**
	 * Runs all of our finalizers after a command is ran successfully.
	 * @since 0.0.1
	 * @param {KlasaMessage} message The message that called the command
	 * @param {Command} command The command this finalizer is for (may be different than message.command)
	 * @param {KlasaMessage|any} response The response of the command
	 * @param {StopWatch} timer The timer run from start to queue of the command
	 * @returns {void}
	 */
	run(message, command, response, timer) {
		for (const finalizer of this.values()) if (finalizer.enabled) finalizer._run(message, command, response, timer);
	}

}

module.exports = FinalizerStore;
