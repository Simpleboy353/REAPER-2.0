const Extendable = require('./Extendable');
const Store = require('./base/Store');

/**
 * Stores all of our extendables that extend Discord.js and Klasa structures
 * @extends Store
 */
class ExtendableStore extends Store {

	/**
	 * Constructs our ExtendableStore for use in Klasa
	 * @since 0.0.1
	 * @param {KlasaClient} client The Klasa client
	 */
	constructor(client) {
		super(client, 'extendables', Extendable);
	}

	/**
	 * Deletes an extendable from the store.
	 * @since 0.0.1
	 * @param {Extendable|string} name A extendable object or a string representing a command or alias name
	 * @returns {boolean}
	 */
	delete(name) {
		const extendable = this.resolve(name);
		if (!extendable) return false;
		extendable.disable();
		return super.delete(extendable);
	}

	/**
	 * Clears the extendable from the store and removes the extensions.
	 * @since 0.0.1
	 */
	clear() {
		for (const extendable of this.values()) this.delete(extendable);
	}

	/**
	 * Sets up an extendable in our store.
	 * @since 0.0.1
	 * @param {Extendable} piece The extendable piece we are setting up
	 * @returns {?Extendable}
	 */
	set(piece) {
		const extendable = super.set(piece);
		if (!extendable) return undefined;
		extendable.init();
		return extendable;
	}

}

module.exports = ExtendableStore;
