const Piece = require('./Piece');

/**
 * The common class for all pieces with aliases
 * @see Command
 * @see Argument
 * @see Serializer
 */
class AliasPiece extends Piece {

	/**
	 * @typedef {PieceOptions} AliasPieceOptions
	 * @property {string[]} [aliases=[]] The aliases for this piece
	 */

	/**
	 * @since 0.0.1
	 * @param {Store} store The store this piece is for
	 * @param {string[]} file The path from the pieces folder to the extendable file
	 * @param {string} directory The base directory to the pieces folder
	 * @param {AliasPieceOptions} [options={}] The options for this piece
	 */
	constructor(store, file, directory, options = {}) {
		super(store, file, directory, options);

		/**
		 * The aliases for this piece
		 * @since 0.5.0
		 * @type {string[]}
		 */
		this.aliases = options.aliases;
	}

	/**
	 * Defines the JSON.stringify behavior of this argument.
	 * @since 0.5.0
	 * @returns {Object}
	 */
	toJSON() {
		return {
			...super.toJSON(),
			aliases: this.aliases.slice(0)
		};
	}

}

module.exports = AliasPiece;
