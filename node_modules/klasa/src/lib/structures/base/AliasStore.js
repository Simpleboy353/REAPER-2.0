const { Collection } = require('discord.js');
const Store = require('./Store');

/**
 * The common base for all stores with aliases
 * @see CommandStore
 * @see ArgumentStore
 * @see SerializerStore
 * @extends Store
 */
class AliasStore extends Store {

	constructor(...args) {
		super(...args);

		/**
		 * The different aliases that represent the arguments in this store.
		 * @since 0.5.0
		 * @type external:Collection
		 */
		this.aliases = new Collection();
	}

	/**
	 * Returns an AliasPiece in the store if it exists by its name or by an alias.
	 * @since 0.5.0
	 * @param {string} name A argument or alias name
	 * @returns {?AliasPiece}
	 */
	get(name) {
		return super.get(name) || this.aliases.get(name);
	}

	/**
	 * Returns a boolean if the AliasPiece or alias is found within the store.
	 * @since 0.5.0
	 * @param {string} name A command or alias name
	 * @returns {boolean}
	 */
	has(name) {
		return super.has(name) || this.aliases.has(name);
	}

	/**
	 * Sets up an AliasPiece in our store.
	 * @since 0.5.0
	 * @param {AliasPiece} piece The command piece we are setting up
	 * @returns {?AliasPiece}
	 */
	set(piece) {
		const aliasPiece = super.set(piece);
		if (!aliasPiece) return undefined;
		for (const alias of aliasPiece.aliases) this.aliases.set(alias, aliasPiece);
		return aliasPiece;
	}

	/**
	 * Deletes an AliasPiece from the store.
	 * @since 0.5.0
	 * @param {AliasPiece|string} name An AliasPiece object or a string representing an AliasPiece or alias name
	 * @returns {boolean} whether or not the delete was successful.
	 */
	delete(name) {
		const aliasPiece = this.resolve(name);
		if (!aliasPiece) return false;
		for (const alias of aliasPiece.aliases) this.aliases.delete(alias);
		return super.delete(aliasPiece);
	}

	/**
	 * Clears the AliasPieces and aliases from this store
	 * @since 0.5.0
	 * @returns {void}
	 */
	clear() {
		super.clear();
		this.aliases.clear();
	}

}

module.exports = AliasStore;
