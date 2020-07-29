const Piece = require('./base/Piece');

/**
 * Base class for all Klasa Inhibitors. See {@tutorial CreatingInhibitors} for more information how to use this class
 * to build custom inhibitors.
 * @tutorial CreatingInhibitors
 * @extends Piece
 */
class Inhibitor extends Piece {

	/**
	 * @typedef {PieceOptions} InhibitorOptions
	 * @property {boolean} [spamProtection=false] If this inhibitor is meant for spamProtection (disables the inhibitor while generating help)
	 */

	/**
	 * @since 0.0.1
	 * @param {InhibitorStore} store The Inhibitor Store
	 * @param {string} file The path from the pieces folder to the inhibitor file
	 * @param {string} directory The base directory to the pieces folder
	 * @param {InhibitorOptions} [options={}] Optional Inhibitor settings
	 */
	constructor(store, file, directory, options = {}) {
		super(store, file, directory, options);

		/**
		 * If this inhibitor is meant for spamProtection (disables the inhibitor while generating help)
		 * @since 0.0.1
		 * @type {boolean}
		 */
		this.spamProtection = options.spamProtection;
	}

	/**
	 * The async wrapper for running inhibitors
	 * @since 0.5.0
	 * @param {KlasaMessage} message The message that triggered this inhibitor
	 * @param {Command} command The command to run
	 * @returns {(void|string)}
	 * @private
	 */
	async _run(message, command) {
		try {
			return await this.run(message, command);
		} catch (err) {
			return err;
		}
	}

	/**
	 * The run method to be overwritten in actual inhibitors
	 * @since 0.0.1
	 * @param {KlasaMessage} message The message that triggered this inhibitor
	 * @param {Command} command The command to run
	 * @returns {(void|string)}
	 * @abstract
	 */
	async run() {
		// Defined in extension Classes
		throw new Error(`The run method has not been implemented by ${this.type}:${this.name}.`);
	}

	/**
	 * Defines the JSON.stringify behavior of this inhibitor.
	 * @returns {Object}
	 */
	toJSON() {
		return {
			...super.toJSON(),
			spamProtection: this.spamProtection
		};
	}

}

module.exports = Inhibitor;
