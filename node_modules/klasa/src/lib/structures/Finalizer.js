const Piece = require('./base/Piece');

/**
 * Base class for all Klasa Finalizers. See {@tutorial CreatingFinalizers} for more information how to use this class
 * to build custom finalizers.
 * @tutorial CreatingFinalizers
 * @extends {Piece}
 */
class Finalizer extends Piece {

	/**
	 * Run a finalizer and catch any uncaught promises
	 * @since 0.5.0
	 * @param {KlasaMessage} message The message that called the command
	 * @param {Command} command The command this finalizer is for (may be different than message.command)
	 * @param {?KlasaMessage|KlasaMessage[]} response The bot's response message, if one is returned
	 * @param {Stopwatch} runTime The time it took to generate the command
	 * @private
	 */
	async _run(message, command, response, runTime) {
		try {
			await this.run(message, command, response, runTime);
		} catch (err) {
			this.client.emit('finalizerError', message, command, response, runTime, this, err);
		}
	}

	/**
	 * The run method to be overwritten in actual finalizers
	 * @since 0.0.1
	 * @param {KlasaMessage} message The message used to trigger this finalizer
	 * @param {Command} command The command this finalizer is for (may be different than message.command)
	 * @param {?KlasaMessage|KlasaMessage[]} response The bot's response message, if one is returned
	 * @param {Stopwatch} runTime The time it took to generate the command
	 * @returns {void}
	 * @abstract
	 */
	run() {
		// Defined in extension Classes
		throw new Error(`The run method has not been implemented by ${this.type}:${this.name}.`);
	}

}

module.exports = Finalizer;
