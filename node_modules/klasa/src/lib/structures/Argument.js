const AliasPiece = require('./base/AliasPiece');
const { MENTION_REGEX } = require('../util/constants');

/**
 * Base class for all Klasa Arguments. See {@tutorial CreatingArguments} for more information how to use this class
 * to build custom arguments.
 * @tutorial CreatingArguments
 * @extends AliasPiece
 */
class Argument extends AliasPiece {

	/**
	 * The run method to be overwritten in actual Arguments
	 * @since 0.5.0
	 * @param {string} argument The string argument string to resolve
	 * @param {Possible} possible This current usage possible
	 * @param {KlasaMessage} message The message that triggered the command
	 * @abstract
	 */
	async run() {
		// Defined in extension Classes
		throw new Error(`The run method has not been implemented by ${this.type}:${this.name}.`);
	}

	/**
	 * Checks min and max values
	 * @since 0.5.0
	 * @param {KlasaClient} client The client of this bot
	 * @param {number} value The value to check against
	 * @param {?number} min The minimum value
	 * @param {?number} max The maximum value
	 * @param {Possible} possible The id of the current possible usage
	 * @param {KlasaMessage} message The message that triggered the command
	 * @param {string} suffix An error suffix
	 * @returns {boolean}
	 * @private
	 */
	static minOrMax(client, value, min = null, max = null, possible, message, suffix) {
		suffix = suffix ? (message ? message.language : client.languages.default).get(suffix) : '';
		if (min !== null && max !== null) {
			if (value >= min && value <= max) return true;
			if (min === max) throw (message ? message.language : client.languages.default).get('RESOLVER_MINMAX_EXACTLY', possible.name, min, suffix);
			throw (message ? message.language : client.languages.default).get('RESOLVER_MINMAX_BOTH', possible.name, min, max, suffix);
		} else if (min !== null) {
			if (value >= min) return true;
			throw (message ? message.language : client.languages.default).get('RESOLVER_MINMAX_MIN', possible.name, min, suffix);
		} else if (max !== null) {
			if (value <= max) return true;
			throw (message ? message.language : client.languages.default).get('RESOLVER_MINMAX_MAX', possible.name, max, suffix);
		}
		return true;
	}

}

/**
 * Standard regular expressions for matching mentions and snowflake ids
 * @since 0.5.0
 * @type {Object}
 * @property {RegExp} userOrMember Regex for users or members
 * @property {RegExp} channel Regex for channels
 * @property {RegExp} emoji Regex for custom emojis
 * @property {RegExp} role Regex for roles
 * @property {RegExp} snowflake Regex for simple snowflake ids
 * @static
 */
Argument.regex = MENTION_REGEX;

module.exports = Argument;
